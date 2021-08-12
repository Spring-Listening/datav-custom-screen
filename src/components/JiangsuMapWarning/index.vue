<!--
 * @Descripttion:
 * @version:
 * @Author: chunwen (chunwen.zou@caibeitv.com)
 * @Date: 2021-08-05 16:42:46
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-10 17:25:37
-->
<template>
  <div class="jiangsu-map-container">
    <vue-echarts :options="options" theme="light"></vue-echarts>
  </div>
</template>
<script>
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import * as Echarts from 'echarts'
import cloneDeep from 'lodash/cloneDeep'

export default defineComponent({
  name: 'JiangsuMap',
  setup() {
    const options = ref({})
    let timer = null
    const update = () => {
      fetch('http://www.youbaobao.xyz/datav-res/datav/jiangsuMapData.json')
        .then(res => res.json())
        .then(data => {
          console.log(data)
          Echarts.registerMap('jiangsu', data)
          const center = []
          data.features.forEach(item => {
            if (item.properties) {
              center.push({
                key: item.properties.name,
                value: item.properties.center
              })
            }
          })
          console.log(center)
          options.value = {
            visualMap: {
              show: true,
              max: 100,
              seriesIndex: [0],
              inRange: {
                color: ['#a5dcf4', '#006edd']
              }
            },
            geo: [
              {
                map: 'jiangsu',
                zoom: 1.1,
                roam: false,
                scaleLimit: {
                  min: 0,
                  max: 3
                },
                itemStyle: {
                  areaColor: '#12235c',
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                  shadowBlur: 20,
                  shadowOffsetX: 6,
                  shadowOffsetY: 8
                }
              }
            ],
            series: [
              {
                type: 'map',
                zoom: 1.1,
                roam: false,
                scaleLimit: {
                  min: 0,
                  max: 3
                },
                mapType: 'jiangsu',
                label: {
                  show: true,
                  color: '#fff',
                  emphasis: {
                    color: 'green'
                  }
                },
                itemStyle: {
                  normal: {
                    borderColor: '#2980b9',
                    borderWidth: 1,
                    areaColor: '#12235c'
                  },
                  emphasis: {
                    areaColor: '#fa8c16',
                    borderWidth: 0
                  }
                },
                data: center.map(item => {
                  return {
                    name: item.key,
                    value: Math.random() * 100
                  }
                })
              },
              {
                type: 'effectScatter',
                data: [],
                coordinateSystem: 'geo',
                symbolSize: 14,
                itemStyle: {
                  color: '#feae21'
                },
                label: {
                  normal: {
                    show: true,
                    position: 'top',
                    formatter(params) {
                      console.log(params)
                      return `{title|${params.data.city}}\n{content|发生 xx 事件}`
                    },
                    backgroundColor: 'rgba(254, 174, 33, .8)',
                    padding: [0, 0],
                    borderRadius: 3,
                    lineHeight: 32,
                    color: '#f7fafb',
                    rich: {
                      title: {
                        padding: [0, 10, 10, 10],
                        color: '#fff'
                      },
                      content: {
                        padding: [10, 10, 0, 10],
                        color: '#fff'
                      }
                    }
                  },
                  emphasis: {
                    show: true
                  }
                }
              },
              {
                type: 'effectScatter',
                data: [],
                coordinateSystem: 'geo',
                symbolSize: 14,
                itemStyle: {
                  color: '#feae21'
                },
                label: {
                  normal: {
                    show: true,
                    position: 'top',
                    formatter(params) {
                      console.log(params)
                      return `{title|${params.data.city}}\n{content|发生 xx 事件}`
                    },
                    backgroundColor: 'rgba(233, 63, 66, .9)',
                    padding: [0, 0],
                    borderRadius: 3,
                    lineHeight: 32,
                    color: '#fff',
                    rich: {
                      title: {
                        padding: [0, 10, 10, 10],
                        color: '#fff'
                      },
                      content: {
                        padding: [10, 10, 0, 10],
                        color: '#fff'
                      }
                    }
                  },
                  emphasis: {
                    show: true
                  }
                }
              },
              {
                type: 'effectScatter',
                data: [],
                coordinateSystem: 'geo',
                symbolSize: 14,
                itemStyle: {
                  color: '#08baec'
                },
                label: {
                  normal: {
                    show: true,
                    position: 'top',
                    formatter(params) {
                      console.log(params)
                      return `{title|${params.data.city}}\n{content|发生 xx 事件}`
                    },
                    backgroundColor: 'rgba(8, 186, 236, .9)',
                    padding: [0, 0],
                    borderRadius: 3,
                    lineHeight: 32,
                    color: '#fff',
                    rich: {
                      title: {
                        padding: [0, 10, 10, 10],
                        color: '#fff'
                      },
                      content: {
                        padding: [10, 10, 0, 10],
                        color: '#fff'
                      }
                    }
                  },
                  emphasis: {
                    show: true
                  }
                }
              }
            ]
          }

          // 随机展示事件
          timer = setInterval(() => {
            const _options = cloneDeep(options.value)
            console.log(_options)
            // 初始化随机数
            for (let i = 1; i < 4; i += 1) {
              _options.series[i].data = []
            }
            // 生成城市随机数
            const cityLength = center.length
            const cityIndex = Math.floor(Math.random() * cityLength)
            const eventIndex = Math.floor(Math.random() * 3) + 1
            _options.series[eventIndex].data = [
              {
                city: center[cityIndex].key,
                value: center[cityIndex].value
              }
            ]
            options.value = _options
          }, 2000)
        })
    }

    onMounted(() => {
      update()
    })
    onUnmounted(() => timer && clearInterval(timer))
    return {
      options
    }
  }
})
</script>
<style lang="scss" scoped>
.jiangsu-map-container {
  width: 100%;
  height: 100%;
}
</style>
