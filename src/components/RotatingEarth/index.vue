<!--
 * @Descripttion:
 * @version:
 * @Author: chunwen (chunwen.zou@caibeitv.com)
 * @Date: 2021-08-06 15:58:02
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-06 16:20:16
-->
<template>
  <div class="rotating-earth">
    <vue-echarts :options="options" />
  </div>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
  setup() {
    const options = ref({})
    const update = () => {
      options.value = {
        globe: {
          show: true
        }
      }
    }
    onMounted(() => {
      update()
    })
    return {
      options
    }
  }
})
</script>
<style lang="scss" scoped>
.rotating-earth {
  width: 100%;
  height: 100%;
}
</style>
