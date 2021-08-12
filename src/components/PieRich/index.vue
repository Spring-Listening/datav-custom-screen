<!--
 * @Descripttion:
 * @version:
 * @Author: chunwen (chunwen.zou@caibeitv.com)
 * @Date: 2021-08-10 14:10:22
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-11 20:40:18
-->
<template>
  <div class="pie-rich-container">
    <div id="pie-chart"></div>
  </div>
</template>
<script>
import { defineComponent, onMounted, ref } from 'vue'
import * as Echarts from 'echarts'

export default defineComponent({
  setup() {
    const options = ref({})
    const update = () => {
      options.value = {
        legend: {
          show: false
        },
        series: [
          {
            name: '面积模式',
            type: 'pie',
            tooltip: {},
            radius: ['10%', '40%'],
            center: ['25%', '25%'],
            roseType: 'area',
            color: [
              '#5470c6',
              '#91cc75',
              '#fac858',
              '#ee6666',
              '#73c0de',
              '#3ba272',
              '#fc8452',
              '#9a60b4'
            ],
            itemStyle: {
              borderRadius: 8,
              borderWidth: 2,
              borderColor: '#2b2c2e'
            },
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 40, name: 'rose 1' },
              { value: 38, name: 'rose 2' },
              { value: 32, name: 'rose 3' },
              { value: 30, name: 'rose 4' },
              { value: 28, name: 'rose 5' },
              { value: 26, name: 'rose 6' },
              { value: 22, name: 'rose 7' },
              { value: 18, name: 'rose 8' }
            ]
          },
          {
            name: '访问来源',
            type: 'pie',
            center: ['75%', '25%'],
            radius: [90, '40%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#2b2c2e',
              borderWidth: 3
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                color: '#fff',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: '搜索引擎' },
              { value: 735, name: '直接访问' },
              { value: 580, name: '邮件营销' },
              { value: 484, name: '联盟广告' },
              { value: 300, name: '视频广告' }
            ]
          },
          {
            name: '访问来源',
            type: 'pie',
            tooltip: {},
            center: ['25%', '75%'],
            radius: [0, '40%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: 30,
                color: '#fff',
                fontWeight: 'bold'
              }
            },
            itemStyle: {
              borderRadius: 8,
              borderWidth: 2,
              borderColor: '#2b2c2e'
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: '搜索引擎' },
              { value: 735, name: '直接访问' },
              { value: 580, name: '邮件营销' },
              { value: 484, name: '联盟广告' },
              { value: 300, name: '视频广告' }
            ]
          },
          {
            name: '访问来源',
            type: 'pie',
            center: ['75%', '75%'],
            selectedMode: 'single',
            radius: [0, '18%'],
            label: {
              position: 'inner',
              fontSize: 18,
              fontWeight: 500
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1548, name: '搜索引擎' },
              { value: 775, name: '直达' },
              { value: 679, name: '营销广告', selected: true }
            ]
          },
          {
            name: '访问来源',
            type: 'pie',
            center: ['75%', '75%'],
            radius: ['25%', '45%'],
            labelLine: {
              length: 30
            },
            itemStyle: {
              borderRadius: 8,
              borderWidth: 2,
              borderColor: '#2b2c2e'
            },
            label: {
              show: false
              // formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
              // backgroundColor: '#F6F8FC',
              // borderColor: '#8C8D8E',
              // borderWidth: 1,
              // borderRadius: 4,

              // rich: {
              //   a: {
              //     color: '#6E7079',
              //     lineHeight: 22,
              //     align: 'center'
              //   },
              //   hr: {
              //     borderColor: '#8C8D8E',
              //     width: '100%',
              //     borderWidth: 1,
              //     height: 0
              //   },
              //   b: {
              //     color: '#4C5058',
              //     fontSize: 14,
              //     fontWeight: 'bold',
              //     lineHeight: 33
              //   },
              //   per: {
              //     color: '#fff',
              //     backgroundColor: '#4C5058',
              //     padding: [3, 4],
              //     borderRadius: 4
              //   }
              // }
            },
            data: [
              { value: 1048, name: '百度' },
              { value: 335, name: '直达' },
              { value: 310, name: '邮件营销' },
              { value: 251, name: '谷歌' },
              { value: 234, name: '联盟广告' },
              { value: 147, name: '必应' },
              { value: 135, name: '视频广告' },
              { value: 102, name: '其他' }
            ]
          }
        ]
      }
      const myChart = Echarts.init(document.getElementById('pie-chart'))
      myChart.setOption(options.value)
    }
    onMounted(() => {
      update()
    })
    return {
      options
    }
  }
})
</script>
<style lang="scss" scoped>
.pie-rich-container {
  width: 100%;
  height: 100%;
  background: #2b2c2e;
  #pie-chart {
    width: inherit;
    height: inherit;
  }
}
</style>
