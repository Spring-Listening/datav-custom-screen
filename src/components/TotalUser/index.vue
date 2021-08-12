<!--
 * @Descripttion:
 * @version:
 * @Author: chunwen (chunwen.zou@caibeitv.com)
 * @Date: 2021-07-21 20:31:14
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-22 15:03:43
-->
<template>
  <div class="total-user-container">
    <div class="total-user-content">
      <div class="title">
        <span>外卖用户总数</span>
        <span>User Total Count</span>
      </div>
      <count-to class="total" :startVal="startVal" :endVal="todayUser" :duration="1000" />
      <div class="process-data">
        <span class="day-strence">
          每日增长率：
          <count-to
            :startVal="growthLastDay"
            :endVal="startPercent"
            suffix="%"
            :decimals="2"
            :duration="1000"
        /></span>
        <span class="month-strence">
          每月增长率：
          <count-to
            :startVal="growthLastMonth"
            :endVal="startPercent2"
            suffix="%"
            :decimals="2"
            :duration="1000"
        /></span>
        <div class="process-box">
          <span class="percentage"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'totalUser',
  props: {
    todayUser: Number,
    growthLastDay: {
      type: Number,
      default: 0
    },
    growthLastMonth: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const startVal = ref(0)
    const startPercent = ref(0)
    const startPercent2 = ref(0)
    const updateStartVal = () => {
      startVal.value = props.todayUser
      startPercent.value = props.growthLastDay
      startPercent2.value = props.growthLastMonth
    }
    return {
      startVal,
      startPercent,
      startPercent2,
      updateStartVal
    }
  }
})
</script>
<style lang="scss" scoped>
.total-user-container {
  width: 100%;
  height: 100%;
  box-shadow: 0 10px 10px rgb(0 0 0 / 30%);
  .total-user-content {
    padding: 20px 40px;
    box-sizing: border-box;
    .title {
      display: flex;
      flex-direction: column;
      span:first-child {
        font-size: 32px;
        font-weight: bold;
      }
      span:last-child {
        font-size: 16px;
        letter-spacing: 1px;
        margin-top: 10px;
      }
    }
    .total {
      font-family: DIN;
      font-size: 68px;
      font-weight: bolder;
      letter-spacing: 2px;
    }
    .process-data {
      font-size: 28px;
      font-family: DIN;
      letter-spacing: 2px;
      .day-strence {
        color: #c5fb79;
      }
      .month-strence {
        color: #63a900;
      }
      .process-box {
        width: 100%;
        height: 16px;
        background: #eee;
        margin-top: 28px;
        .percentage {
          display: block;
          height: 15px;
          width: 50%;
          background: #999;
        }
      }
    }
  }
}
</style>
