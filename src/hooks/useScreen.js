/*
 * @Descripttion:
 * @version:
 * @Author: chunwen (chunwen.zou@caibeitv.com)
 * @Date: 2021-07-30 14:56:40
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-30 15:21:53
 */
import { onMounted, ref } from 'vue'

export default function useScreen(id) {
  const width = ref(0)
  const height = ref(0)
  let dom
  onMounted(() => {
    dom = document.getElementById(id)
    width.value = dom.clientWidth
    height.value = dom.clientHeight
  })
  return {
    width,
    height
  }
}
