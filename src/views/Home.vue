<template>
  <div class="home-container">
    <loading width="180" height="80" v-if="!ready">LOADING...</loading>
    <Container :options="{ width: 3840, height: 2160 }" v-else>
      <div class="header">
        <TopHeader />
      </div>
      <div class="separator-wrapper">
        <Separator />
      </div>
      <div class="center">
        <div class="left">
          <div class="left1">
            <TotalUser
              ref="totalUser"
              :today-user="userData.userToday"
              :growth-last-day="+userData.userGrowthLastDay || 0"
              :growth-last-month="+userData.userGrowthLastMonth || 0"
            />
          </div>
          <div class="left2">
            <AverageAge ref="averageAge" :data="ageData" :avg-age="+userData.averageAge || 0" />
          </div>
          <div class="left3">
            <TotalDevice :data="deviceData" ref="totalDevice" />
          </div>
          <div class="left4">
            <TotalGender :data="userData.gender" />
          </div>
          <div class="left5">
            <LineChart :data="userData.rider" />
          </div>
          <div class="left6">
            <BarChart :data="userData.category" />
          </div>
        </div>
        <div class="right">
          <div class="right-top1">
            <CenterHeader :data="userData" />
          </div>
          <div class="right-top2">
            <CityCategory />
          </div>
          <div class="right-bottom">
            <div class="right-left">
              <div class="right-left1">
                <ChinaMap :data="mapData" />
              </div>
              <!-- <div class="right-left2">right-left2</div> -->
              <div class="right-left3">
                <FlyBox lineColor="rgba(66, 68, 70, 0)" starColor="rgb(251,253,142)">
                  <AverageView :data="realTimeOrder" />
                </FlyBox>
              </div>
              <div class="right-left4">
                <ScheduleView></ScheduleView>
              </div>
            </div>
            <div class="right-right">
              <div class="right-right1">
                <PieRich></PieRich>
              </div>
              <div class="right-right2">
                <AnimateBar :data="animateBarData" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </div>
</template>

<script>
import { getCurrentInstance, onMounted, ref } from 'vue'
import Loading from '@/components/Loading/index.vue'
import Container from '@/components/Container'
import TopHeader from '@/components/TopHeader/index.vue'
import Separator from '@/components/Separator/index.vue'
import AverageAge from '@/components/AverageAge/index.vue'
import TotalUser from '@/components/TotalUser/index.vue'
import TotalDevice from '@/components/TotalDevice/index.vue'
import LineChart from '@/components/LineChart/index.vue'
import TotalGender from '@/components/TotalGender/index.vue'
import BarChart from '@/components/BarChart/index.vue'
import CenterHeader from '@/components/CenterHeader/index.vue'
import CityCategory from '@/components/CityCategory/index.vue'
import ChinaMap from '@/components/ChinaMap'
import AverageView from '@/components/AverageView'
import FlyBox from '@/components/FlyBox'
import ScheduleView from '@/components/ScheduleView'
import PieRich from '@/components/PieRich'
import AnimateBar from '@/components/AnimateBar'

import { useScreenData } from './useScreenData'

export default {
  components: {
    Loading,
    Container,
    TopHeader,
    Separator,
    AverageAge,
    TotalUser,
    TotalDevice,
    LineChart,
    TotalGender,
    BarChart,
    CenterHeader,
    CityCategory,
    ChinaMap,
    AverageView,
    FlyBox,
    ScheduleView,
    PieRich,
    AnimateBar
  },
  setup() {
    const context = getCurrentInstance().ctx
    const {
      ready,
      userData,
      ageData,
      deviceData,
      realTimeOrder,
      mapData,
      animateBarData
    } = useScreenData(context, { once: false })

    const config = ref({})
    const setConfigData = () => {
      const header = ref([])
      const headerStyle = ref([])
      header.value = ['姓名', '年龄', '性别']
      headerStyle.value = [{ color: '#333' }, { color: '#333' }, { color: '#333' }]
      const data = []
      for (let i = 0; i < 15; i += 1) {
        data.push([
          `同学${i + 1}`,
          Math.floor(Math.random() * 10 + 20),
          Math.floor(Math.random() * 10000 + 10000)
        ])
      }
      config.value = {
        header,
        headerStyles: headerStyle,
        headerHeight: '40',
        headerBg: 'rgb(80, 80, 80)',
        headerIndex: true,
        headerIndexContent: '#',
        headerIndexStyle: { color: '#666', width: '50px' },
        data
      }
    }
    onMounted(() => {
      setConfigData()
    })
    return {
      ready,
      userData,
      ageData,
      deviceData,
      realTimeOrder,
      mapData,
      animateBarData,

      options: {
        xAxis: {
          data: ['a', 'b', 'c', 'd'],
          axisLabel: {
            color: '#fff',
            fontSize: 20
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: '#fff'
            }
          }
        },
        yAxis: {
          splitLine: {
            show: false
          },
          axisLabel: {
            color: '#fff',
            fontSize: 18
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: '#fff'
            }
          }
        },
        series: [
          {
            name: 'sales',
            type: 'bar',
            data: [10, 20, 15, 24],
            barWidth: 20,
            color: 'green'
          }
        ]
      },
      config
    }
  }
}
</script>
<style lang="scss" scoped>
.home-container {
  width: 100%;
  height: 100%;
  // background-color: rgb(50, 47, 48);
  background: rgb(29, 29, 29);
  color: #fff;
  font-size: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  #imooc-screen-container {
    display: flex;
    flex-direction: column;
    .header {
      height: 167px;
      margin-top: 10px;
    }
    .separator-wrapper {
      height: 10px;
    }
    .center {
      flex: 1;
      display: flex;
      .left {
        flex: 0 0 860px;
        display: flex;
        flex-direction: column;
        width: 860px;
        height: 100%;
        margin: 0 10px;
        box-sizing: border-box;
        background: rgb(60, 61, 64);
        .left1,
        .left2,
        .left3,
        .left4,
        .left5,
        .left6 {
          padding-bottom: 20px;
        }
        .left1 {
          height: 300px;
        }
        .left2 {
          height: 320px;
        }
        .left3 {
          height: 280px;
        }
        .left4 {
          height: 230px;
        }
        .left5 {
          height: 360px;
        }
        .left6 {
          height: 360px;
        }
      }
      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        height: 100%;
        margin: 0 10px 0 0;
        max-width: 2960px;
        overflow: hidden;
        .right-top1 {
          height: 206px;
          margin-bottom: 10px;
          background: grey;
        }
        .right-top2 {
          height: 48px;
          margin-bottom: 10px;
          background: grey;
        }
        .right-bottom {
          flex: 1;
          display: flex;
          .right-left {
            display: flex;
            flex-direction: column;
            width: 1917px;
            .right-left1 {
              height: 1098px;
            }
            .right-left2 {
              height: 80px;
              padding-top: 20px;
              box-sizing: border-box;
            }
            .right-left3 {
              height: 350px;
              margin-top: 10px;
              background: #2b2c2e;
              .dv-border-box-8 {
                width: 100%;
                height: 100%;
                padding: 5px;
                box-sizing: border-box;
                background: rgb(66, 68, 70);
                border-radius: 10px;
                box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3);
              }
            }
            .right-left4 {
              height: 220px;
              margin-top: 10px;
              background: grey;
            }
          }
          .right-right {
            flex: 1;
            display: flex;
            flex-direction: column;
            margin-left: 10px;
            .right-right1 {
              width: 100%;
              height: 999px;
              box-sizing: border-box;
            }
            .right-right2 {
              width: 100%;
              height: 678px;
              margin-top: 10px;
            }
          }
        }
      }
    }
  }
}
</style>
