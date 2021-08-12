<!--
 * @Descripttion:
 * @version:
 * @Author: chunwen (chunwen.zou@caibeitv.com)
 * @Date: 2021-08-04 16:47:18
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-05 10:19:44
-->
<template>
  <div class="scroll-container">
    <ul>
      <li v-for="(item, index) in list" :key="item.time" :class="{ grey: index % 2 == 0 }">
        <span>{{ item.name }}</span>
        <span>{{ item.age }}</span>
        <span>{{ item.time }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import { defineComponent, nextTick, onMounted, ref } from 'vue'
import BScroll from '@better-scroll/core'
import MouseWheel from '@better-scroll/mouse-wheel'

BScroll.use(MouseWheel)
export default defineComponent({
  name: 'Scroll',
  setup() {
    const list = ref([])
    const scroll = ref({})
    const calcList = () => {
      for (let i = 0; i < 8; i += 1) {
        list.value.push({
          name: `呵呵 + ${i}`,
          age: Math.floor(Math.random() * 10 + 20),
          time: new Date()
        })
      }
    }
    const initScroll = () => {
      console.log(document.querySelector('.scroll-container'))
      scroll.value = new BScroll('.scroll-container', {
        mouseWheel: true,
        snap: true,
        scrollX: true,
        scrollY: false,
        momentum: false
      })
    }
    onMounted(() => {
      calcList()
      nextTick(() => {
        initScroll()
      })
    })
    return {
      list
    }
  }
})
</script>
<style lang="scss" scoped>
.scroll-container {
  width: 500px;
  height: 600px;
  background: #eee;
  overflow: hidden;
  ul {
    margin: 0;
    padding: 0;
    display: flex;
    li {
      list-style: none;
      line-height: 32px;
    }
    .grey {
      background: pink;
    }
  }
}
</style>
