<!--
 * @Descripttion:
 * @version:
 * @Author: chunwen (chunwen.zou@caibeitv.com)
 * @Date: 2021-08-11 15:14:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-11 19:47:36
-->
<template>
  <div class="animate-bar-container">
    <div id="animate-bar"></div>
  </div>
</template>
<script>
import { defineComponent, onMounted, ref, watch } from 'vue'
import * as Echarts from 'echarts'

export default defineComponent({
  name: 'AnimateBar',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const options = ref({})
    const countryColors = {
      Australia: '#00008b',
      Canada: '#f00',
      China: '#ffde00',
      Cuba: '#002a8f',
      Finland: '#003580',
      France: '#ed2939',
      Germany: '#000',
      Iceland: '#003897',
      India: '#f93',
      Japan: '#bc002d',
      'North Korea': '#024fa2',
      'South Korea': '#000',
      'New Zealand': '#00247d',
      Norway: '#ef2b2d',
      Poland: '#dc143c',
      Russia: '#d52b1e',
      Turkey: '#e30a17',
      'United Kingdom': '#00247d',
      'United States': '#b22234'
    }

    const update = datas => {
      const myChart = Echarts.init(document.getElementById('animate-bar'))
      const flags = datas[0]
      const data = datas[1]
      const years = []
      for (let i = 1; i < data.length; i += 1) {
        if (years.length === 0 || years[years.length - 1] !== data[i][4]) {
          years.push(data[i][4])
        }
      }

      function getFlag(countryName) {
        if (!countryName) {
          return ''
        }
        return (
          flags.find(function(item) {
            return item.name === countryName
          }) || {}
        ).emoji
      }
      const startIndex = 10
      const startYear = years[startIndex]

      const option = {
        grid: {
          top: 18,
          bottom: 40,
          left: 180,
          right: 80
        },
        xAxis: {
          max: 'dataMax',
          axisLabel: {
            color: '#fff',
            fontSize: 18
          }
        },
        dataset: {
          source: data.slice(1).filter(function(d) {
            return d[4] === startYear
          })
        },
        yAxis: {
          type: 'category',
          inverse: true,
          max: 10,
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: 18,
              color: '#fff'
            },
            formatter(value) {
              return `${value}{flag|${getFlag(value)}}`
            },
            rich: {
              flag: {
                fontSize: 25,
                padding: 5
              }
            }
          },
          animationDuration: 300,
          animationDurationUpdate: 300
        },
        series: [
          {
            realtimeSort: true,
            seriesLayoutBy: 'column',
            type: 'bar',
            barWidth: 24,
            itemStyle: {
              color(param) {
                return countryColors[param.value[3]] || '#5470c6'
              }
            },
            encode: {
              x: 0,
              y: 3
            },
            label: {
              show: true,
              precision: 1,
              position: 'right',
              valueAnimation: true,
              fontFamily: 'monospace',
              color: '#fff',
              fontSize: 20
            }
          }
        ],
        // Disable init animation.
        animationDuration: 0,
        animationDurationUpdate: 2000,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear',
        graphic: {
          elements: [
            {
              type: 'text',
              right: 100,
              bottom: 60,
              style: {
                text: startYear,
                font: 'bolder 80px monospace',
                fill: 'rgba(100, 100, 100, 0.25)'
              },
              z: 100
            }
          ]
        }
      }
      myChart.setOption(option)

      function updateYear(year) {
        const source = data.slice(1).filter(function(d) {
          return d[4] === year
        })
        option.series[0].data = source
        option.graphic.elements[0].style.text = year
        myChart.setOption(option)
      }

      for (let i = 10; i < years.length - 1; i += 1) {
        setTimeout(() => {
          updateYear(years[i + 1])
        }, (i - startIndex) * 2000)
      }
    }
    watch(
      () => props.data,
      data => {
        options.value = data
      }
    )
    onMounted(() => {
      console.log('onnMounteed', props.data)
      update(props.data)
    })
    return {
      options
    }
  }
})
</script>
<style lang="scss" scoped>
.animate-bar-container {
  width: 100%;
  height: 100%;
  background: #2b2c2e;
  #animate-bar {
    width: 100%;
    height: 100%;
  }
}
</style>
