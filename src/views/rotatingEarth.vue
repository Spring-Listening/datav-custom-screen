<!--
 * @Descripttion:
 * @version:
 * @Author: chunwen (chunwen.zou@caibeitv.com)
 * @Date: 2021-08-06 15:59:34
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-06 17:14:25
-->
<template>
  <div class="rotating-earth-test">
    <RotatingEarth />
  </div>
</template>
<script>
import { defineComponent, onMounted, ref } from 'vue'
import RotatingEarth from '@/components/RotatingEarth'

export default defineComponent({
  components: { RotatingEarth },
  setup() {
    const options = ref({})
    const update = () => {
      options.value = {}
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
<style lang="scss" scoped></style>
