<!--
 * @Descripttion:
 * @version:
 * @Author: chunwen (chunwen.zou@caibeitv.com)
 * @Date: 2021-07-30 11:20:02
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-09 00:11:50
-->
<template>
  <div class="test-container">
    <BaseScrollList :config="config" />
  </div>
</template>
<script>
import { defineComponent, onMounted, ref } from 'vue'
import BaseScrollList from '../components/BaseScrollList'

export default defineComponent({
  components: { BaseScrollList },
  setup() {
    const config = ref({})
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
    onMounted(() => {})
    return {
      config,
      data
    }
  }
})
</script>
<style lang="scss" scoped>
.test-container {
  width: 500px;
  height: 400px;
}
</style>
