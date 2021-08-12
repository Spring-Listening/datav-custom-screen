<!--
 * @Descripttion:
 * @version:
 * @Author: chunwen (chunwen.zou@caibeitv.com)
 * @Date: 2021-08-06 11:13:33
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-06 11:17:27
-->
<template>
  <div id="app">
    <VirtualList :listData="data" :itemSize="100" />
  </div>
</template>

<script>
import VirtualList from '@/components/VirtualList'

const d = []
for (let i = 0; i < 1000; i += 1) {
  d.push({ id: i, value: i })
}

export default {
  name: 'App',
  data() {
    return {
      data: d
    }
  },
  components: {
    VirtualList
  }
}
</script>

<style>
html {
  height: 100%;
}
body {
  height: 100%;
  margin: 0;
}
#app {
  height: 100%;
}
</style>
