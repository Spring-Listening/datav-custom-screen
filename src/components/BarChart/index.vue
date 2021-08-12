<!--
 * @Descripttion:
 * @version:
 * @Author: chunwen (chunwen.zou@caibeitv.com)
 * @Date: 2021-07-25 11:41:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-10 17:25:30
-->
<template>
  <div class="bar-chart-container">
    <div class="title-wrapper">
      <div class="left">
        <div class="title">当前热卖品类</div>
        <div class="sub-title">Hot Categories</div>
      </div>
      <div class="right">
        <div class="sub-title">最后更新时间：{{ date }} {{ time }}</div>
      </div>
    </div>
    <div id="barChart"></div>
  </div>
</template>
<script>
import { defineComponent, watch } from 'vue'
import { clock as useClock } from '@/utils/clock'
import * as Echarts from 'echarts'

const colors = ['rgb(124,136,146)']
export default defineComponent({
  name: 'barChart',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const { time, date } = useClock()
    let chart
    let currentChart = 0
    const updateChart = () => {
      function setOption() {
        const sourceData = []
        const { data1, data2 } = props.data
        if (currentChart === 0) {
          data1.axisX.forEach((axis, index) => {
            sourceData.push([axis, data1.data1[index], data1.data2[index]])
          })
        } else {
          data2.axisX.forEach((axis, index) => {
            sourceData.push([axis, data2.data1[index], data2.data2[index]])
          })
        }
        const source = [['指标', '国内', '海外'], ...sourceData]
        console.log('source======', source)
        return {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            textStyle: {
              fontSize: 30,
              padding: 12
            }
          },
          grid: {
            left: 48,
            right: 0,
            bottom: 30,
            top: 20
          },
          color: ['rgb(209,248,138)', 'rgba(65,65,65,.5)'],
          xAxis: {
            type: 'category',
            axisTick: { show: false },
            axisLine: {
              lineStyle: {
                color: colors[0]
              }
            },
            axisLabel: {
              color: colors[0],
              fontSize: 18
            }
          },
          yAxis: {
            type: 'value',
            axisTick: { show: false },
            axisLine: {
              lineStyle: {
                color: colors[0]
              }
            },
            axisLabel: {
              color: colors[0],
              fontSize: 18
            }
          },
          dataset: { source },
          series: [
            {
              stack: 'total',
              type: 'bar',
              showBackground: true,
              barWidth: 40,
              backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
              }
            },
            {
              stack: 'total',
              type: 'bar'
            }
          ]
        }
      }
      if (!chart) {
        chart = Echarts.init(document.getElementById('barChart'))
      }
      chart.setOption(setOption())
      currentChart === 0 ? (currentChart = 1) : (currentChart = 0)
    }
    watch(
      () => props.data,
      () => {
        updateChart()
      }
    )
    return {
      time,
      date
    }
  }
})
</script>
<style lang="scss" scoped>
.bar-chart-container {
  width: 100%;
  height: 100%;
  background: rgb(43, 44, 46);
  padding: 20px 40px;
  box-sizing: border-box;
  .title-wrapper {
    display: flex;

    .right {
      flex: 1;
      text-align: right;
    }

    .title {
      font-size: 32px;
    }

    .sub-title {
      font-size: 16px;
      margin-top: 10px;
    }
  }
  #barChart {
    height: 250px;
  }
}
</style>
