/*
 * @Descripttion:
 * @version:
 * @Author: chunwen (chunwen.zou@caibeitv.com)
 * @Date: 2021-07-12 14:12:33
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-21 19:37:13
 */
import { createApp } from 'vue'
import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
import vueEcharts from '@/components/VueEcharts'
import VueCountTo from './components/VueCountTo/vue-countTo'

createApp(App)
  .use(store)
  .use(router)
  .use(vueEcharts)
  .component('CountTo', VueCountTo)
  .mount('#app')
