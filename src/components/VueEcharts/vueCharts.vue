<!--
 * @Descripttion:
 * @version:
 * @Author: chunwen (chunwen.zou@caibeitv.com)
 * @Date: 2021-07-21 14:36:04
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-10 17:26:00
-->
<template>
  <div class="vue-echarts-container" :id="uuid"></div>
</template>
<script>
import { defineComponent, onMounted, watch, ref } from 'vue'
import * as Echarts from 'echarts'
import { v4 as uuidv4 } from 'uuid'

export default defineComponent({
  name: 'vueEcharts',
  props: {
    options: {
      type: Object,
      default: () => {}
    },
    theme: {
      type: [String, Object],
      default: 'dark'
    }
  },
  setup(ctx) {
    let dom
    let chart
    const uuid = ref(uuidv4())
    const initCharts = () => {
      if (!chart) {
        // eslint-disable-next-line prefer-destructuring
        dom = document.getElementsByClassName('vue-echarts-container')[0]
        chart = Echarts.init(dom, ctx.theme)
      }
      chart.setOption(ctx.options)
    }
    onMounted(() => {
      initCharts()
    })
    watch(
      () => ctx.options,
      () => {
        console.log('vue-echarts更新')
        initCharts()
      }
    )
    return {
      uuid
    }
  }
})
</script>
<style lang="scss" scoped>
.vue-echarts-container {
  width: 100%;
  height: 100%;
}
</style>
