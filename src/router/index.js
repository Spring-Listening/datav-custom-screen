/*
 * @Descripttion:
 * @version:
 * @Author: chunwen (chunwen.zou@caibeitv.com)
 * @Date: 2021-07-12 14:12:33
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-06 16:02:03
 */
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('@/views/Test.vue')
  },
  {
    path: '/scroll',
    name: 'Scroll',
    component: () => import('@/views/betterScroll')
  },
  {
    path: '/map',
    name: 'Map',
    component: () => import('@/views/mapTest')
  },
  {
    path: '/virtual-list',
    name: 'VirtualList',
    component: () => import('@/views/virtualList')
  },
  {
    path: '/earth',
    name: 'Earth',
    component: () => import('@/views/rotatingEarth')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
