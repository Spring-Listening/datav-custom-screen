<!--
 * @Descripttion:
 * @version:
 * @Author: chunwen (chunwen.zou@caibeitv.com)
 * @Date: 2021-07-18 18:27:05
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-20 16:34:20
-->
<template>
  <div class="container-box" id="imooc-screen-container" :ref="refName">
    <template v-if="ready">
      <slot></slot>
    </template>
  </div>
</template>
<script>
import { defineComponent, ref, getCurrentInstance, onMounted, onUnmounted, nextTick } from 'vue'
import { debounce } from '@/utils'

export default defineComponent({
  name: 'Container',
  props: {
    options: {
      type: Object,
      default: () => {}
    }
  },
  setup(ctx) {
    const refName = 'container'
    const width = ref(0)
    const height = ref(0)
    const originalWidth = ref(0)
    const originalHeight = ref(0)
    const ready = ref(false)
    let context
    let dom

    const initSize = () =>
      new Promise(resolve => {
        nextTick(() => {
          // 获取大屏的真实尺寸
          if (ctx.options && ctx.options.width && ctx.options.height) {
            width.value = ctx.options.width
            height.value = ctx.options.height
          } else {
            console.log('options======', dom.clientWidth)

            width.value = dom.clientWidth
            height.value = dom.clientHeight
          }
          // 获取画布尺寸
          if (!originalWidth.value || !originalHeight.value) {
            originalWidth.value = window.screen.width
            originalHeight.value = window.screen.height
          }
          console.log('获取大屏的真实尺寸', width.value, height.value)
          console.log('获取画布尺寸', originalWidth.value, originalHeight.value)
        })
        resolve()
      })
    const updateSize = () => {
      nextTick(() => {
        if (width.value && height.value) {
          dom.style.width = `${width.value}px`
          dom.style.height = `${height.value}px`
        } else {
          dom.style.width = `${originalWidth.value}px`
          dom.style.height = `${originalHeight.value}px`
        }
      })
    }
    const updateScale = () => {
      nextTick(() => {
        // 获取真实的视口尺寸
        const currentWidth = document.body.clientWidth
        const currentHeight = document.body.clientHeight
        console.log('获取真实的视口尺寸', currentWidth, currentHeight)

        const realWidth = width.value || originalWidth.value
        const realHeight = height.value || originalHeight.value
        console.log('真实尺寸', realWidth, realHeight)

        const widthScale = currentWidth / realWidth
        const heightScale = currentHeight / realHeight

        console.log(widthScale, heightScale)
        dom.style.transform = `scale(${widthScale}, ${heightScale})`
      })
    }
    const onResize = async e => {
      console.log(e)
      await initSize()
      updateSize()
      updateScale()
    }
    onMounted(async () => {
      context = getCurrentInstance()
      dom = context.ctx.$refs[refName]
      await initSize()
      updateSize()
      updateScale()

      window.addEventListener('resize', debounce(100, onResize))
      ready.value = true
    })
    onUnmounted(() => {
      window.removeEventListener('resize', onResize)
    })
    return {
      refName,
      ready,
      width,
      height,
      originalWidth,
      originalHeight
    }
  }
})
</script>
<style lang="scss" scoped>
.container-box {
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  transform-origin: left top;
  z-index: 999;
}
</style>
