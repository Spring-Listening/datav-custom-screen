/*
 * @Descripttion:
 * @version:
 * @Author: chunwen (chunwen.zou@caibeitv.com)
 * @Date: 2021-07-12 14:47:31
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-21 18:07:32
 */
import { computed, onMounted, reactive, getCurrentInstance } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default function useTest() {
  const { ctx } = getCurrentInstance()
  const route = useRoute()
  const router = useRouter()
  const data = reactive({
    count: 1,
    total: 0
  })
  console.log('执行了', router.currentRoute.value)
  // eslint-disable-next-line no-return-assign
  const handleIncrement = () => (data.count += 1)
  // eslint-disable-next-line no-return-assign
  const doubleCount = computed(() => data.count * 2)
  onMounted(() => {
    console.log('onMounted 执行', ctx)
  })
  return {
    route,
    router,
    ctx,
    data,
    doubleCount,
    handleIncrement
  }
}
