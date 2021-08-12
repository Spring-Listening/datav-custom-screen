<!--
 * @Descripttion:
 * @version:
 * @Author: chunwen (chunwen.zou@caibeitv.com)
 * @Date: 2021-07-24 14:25:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-10 17:25:40
-->
<template>
  <div class="line-chart-container">
    <div class="title-wrapper">
      <div class="title">慕课外卖骑手概况</div>
      <div class="sub-title">Rider Growth rate</div>
    </div>
    <div id="line-chart"></div>
  </div>
</template>
<script>
import * as Echarts from 'echarts'

import { defineComponent, nextTick, watch } from 'vue'

const colors = [
  'rgb(209,248,139)',
  'rgb(115,201,245)',
  'rgb(59,20,255)',
  'rgb(5,20,25)',
  'rgb(124,136,146)'
]

export default defineComponent({
  name: 'LineChart',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    let myChart
    // const rider = ref({
    //   axisX: [
    //     '1月',
    //     '2月',
    //     '3月',
    //     '4月',
    //     '5月',
    //     '6月',
    //     '7月',
    //     '8月',
    //     '9月',
    //     '10月',
    //     '11月',
    //     '12月'
    //   ],
    //   orderData: {
    //     legend1: '去年骑手月人均接单',
    //     legend2: '今年骑手月人均接单',
    //     data1: ['330', '420', '560', '450', '610', '890', '720', '610', '580', '750', '770', '600'],
    //     data2: ['430', '510', '660', '550', '710', '990', '620', '550', '760', '810', '930', '720']
    //   },
    //   rateData: {
    //     legend1: '去年月新增骑手',
    //     legend2: '今年月新增骑手',
    //     data1: ['129', '223', '202', '197', '300', '112', '333', '249', '178', '322', '401', '167'],
    //     data2: ['179', '263', '282', '297', '330', '344', '222', '299', '190', '455', '566', '233']
    //   }
    // })

    const setOption = () => {
      return new Promise(resolve => {
        const { axisX, orderData, rateData } = props.data
        const legendData = [
          orderData.legend1,
          orderData.legend2,
          rateData.legend1,
          rateData.legend2
        ]
        const xAxis = axisX
        const { data1 } = orderData
        const { data2 } = orderData
        const data3 = rateData.data1
        const data4 = rateData.data2

        resolve({
          title: {},
          legend: {
            top: 20,
            right: 40,
            icon: 'circle',
            textStyle: {
              fontSize: 16,
              color: colors[4]
            },
            data: legendData
          },
          color: ['rgb(209,248,139)', 'rgb(115,201,245)', 'rgb(59,20,255)', 'rgb(50,200,25)'],
          grid: {
            top: 60,
            bottom: 30,
            left: 80,
            right: 40
          },
          xAxis: {
            type: 'category',
            data: xAxis,
            axisTick: { show: false },
            axisLabel: {
              color: colors[4],
              fontSize: 18
            },
            nameTextStyle: {
              color: 'red'
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors[4]
              }
            }
          },
          yAxis: {
            type: 'value',
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dotted'
              }
            },
            axisTick: { show: false },
            axisLabel: {
              color: colors[4],
              fontSize: 18
            },
            axisLine: {
              lineStyle: {
                color: colors[4]
              }
            }
          },
          series: [
            {
              name: legendData[0],
              type: 'line',
              stack: '骑手',
              xAxisIndex: 0,
              smooth: true,
              lineStyle: {
                width: 2
              },
              symbol: 'none',
              data: data1
            },
            {
              name: legendData[1],
              type: 'line',
              stack: '骑手',
              smooth: true,
              lineStyle: {
                width: 2
              },
              symbol: 'none',
              data: data2
            },
            {
              name: legendData[2],
              type: 'line',
              stack: '骑手',
              smooth: true,
              lineStyle: {
                width: 2
              },
              symbol: 'none',
              data: data3
            },
            {
              name: legendData[3],
              type: 'line',
              stack: '骑手',
              smooth: true,
              lineStyle: {
                width: 2
              },
              symbol: 'none',
              data: data4
            }
          ]
        })
      })
    }
    const initChart = () => {
      if (!myChart) {
        myChart = Echarts.init(document.getElementById('line-chart'))
      }
      setOption().then(option => {
        myChart.setOption(option)
      })
    }
    watch(
      () => props.data,
      () => {
        nextTick(() => {
          initChart()
        })
      }
    )
    return {
      initChart
    }
  }
})
</script>
<style lang="scss" scoped>
.line-chart-container {
  width: 100%;
  height: 100%;
  background: rgb(43, 44, 46);
  .title-wrapper {
    padding: 20px 40px 0;
    box-sizing: border-box;
    .title {
      font-size: 32px;
    }
    .sub-title {
      font-size: 16px;
      margin-top: 10px;
    }
  }
  #line-chart {
    width: 100%;
    height: 250px;
  }
}
</style>
