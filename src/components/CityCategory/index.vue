<!--
 * @Descripttion:
 * @version:
 * @Author: chunwen (chunwen.zou@caibeitv.com)
 * @Date: 2021-07-25 16:08:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-25 16:41:41
-->
<template>
  <div class="city-category-container">
    <div class="scroll-box">
      <div
        :class="{ 'scroll-item': true, active: index == selectIndex }"
        v-for="(item, index) in data"
        :key="item"
        @click="handleClick(index)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'

export default defineComponent({
  setup() {
    const data = ['上海', '北京', '深圳', '广州', '重庆', '成都', '杭州', '厦门', '东莞']
    const selectIndex = ref(0)
    let timer
    const play = () => {
      timer = setInterval(() => {
        if (selectIndex.value === data.length - 1) {
          selectIndex.value = 0
        } else {
          selectIndex.value += 1
        }
      }, 2000)
    }
    const handleClick = index => {
      selectIndex.value = index
    }
    onMounted(() => {
      play()
    })
    onUnmounted(() => {
      clearTimeout(timer)
    })
    return {
      data,
      play,
      selectIndex,
      handleClick
    }
  }
})
</script>
<style lang="scss" scoped>
.city-category-container {
  width: 100%;
  height: 100%;
  .scroll-box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    .scroll-item {
      flex: 1;
      font-size: 28px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      &:hover {
        background: #83a748c9;
        cursor: pointer;
      }
      &.active {
        background: #90a0ae;
      }
    }
  }
}
</style>
