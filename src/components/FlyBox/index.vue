<!--
 * @Descripttion:
 * @version:
 * @Author: chunwen (chunwen.zou@caibeitv.com)
 * @Date: 2021-07-14 20:17:18
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-09 00:00:11
-->
<template>
  <div class="flybox-container" ref="container">
    <svg :width="width" :height="height">
      <defs>
        <path :id="pathId" :d="path" stroke-width="4" fill="none"></path>
        <radialGradient :id="gradientId" cx="50%" cy="50%" fx="100%" fy="50%" r="50%">
          <stop offset="0%" stop-color="#fff" stop-opacity="1"></stop>
          <stop offset="100%" stop-color="#fff" stop-opacity="0"></stop>
        </radialGradient>
        <mask :id="maskId">
          <!-- <rect x="0" y="0" width="150" height="190" fill="red"></rect> -->
          <circle :r="starLength" cx="0" cy="0" :fill="`url(#${gradientId})`">
            <animateMotion
              :dur="`${duration}s`"
              :path="path"
              rotate="auto"
              repeatCount="indefinite"
            ></animateMotion>
          </circle>
        </mask>
      </defs>
      <use :href="`#${pathId}`" stroke-width="3" :stroke="lineColor"></use>
      <use
        :href="`#${pathId}`"
        stroke-width="3"
        :stroke="starColor"
        :mask="`url(#${maskId})`"
      ></use>
    </svg>
    <div class="flybox-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { onMounted, defineComponent, ref, getCurrentInstance, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'

export default defineComponent({
  name: 'FlyBox',
  props: {
    lineColor: {
      type: String,
      default: '#235fa7'
    },
    starColor: {
      type: String,
      default: '#3be6cb'
    },
    starLength: {
      type: [Number, String],
      default: 100
    },
    duration: {
      type: Number,
      default: 5
    }
  },
  setup() {
    const uuid = uuidv4()
    console.log('uuid=====', uuid)
    const pathId = `fly-box-path-${uuid}`
    const gradientId = `fly-box-gradient-${uuid}`
    const maskId = `fly-box-mask-${uuid}`
    const width = ref(0)
    const height = ref(0)
    const init = () => {
      const instance = getCurrentInstance()
      const dom = instance.ctx.$refs.container
      console.log('=-=-=-=-', dom.clientHeight)
      width.value = dom.clientWidth
      height.value = dom.clientHeight
    }
    const path = computed(
      () =>
        `M5 5 L${width.value - 5} 5 L${width.value - 5} ${height.value - 5} L5 ${height.value -
          5} Z`
    )
    console.log('path======', path)
    onMounted(() => {
      init()
    })
    return {
      width,
      height,
      path,
      pathId,
      gradientId,
      maskId
    }
  }
})
</script>
<style scoped>
.flybox-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
}
.flybox-container svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.flybox-content {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
}
</style>
