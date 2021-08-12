/*
 * @Descripttion:
 * @version:
 * @Author: chunwen (chunwen.zou@caibeitv.com)
 * @Date: 2021-07-21 18:08:05
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-11 15:22:53
 */
import request from '../utils/request'

export function getUserData() {
  return request({
    url: '/screen/data',
    method: 'get'
  })
}

export function getMapData() {
  return request({
    url: '/screen/map',
    method: 'get'
  })
}

export function getFlags() {
  return request({
    url: 'https://cdn.jsdelivr.net/npm/emoji-flags@1.3.0/data.json',
    method: 'get'
  })
}

export function getAnimateData() {
  return request({
    url:
      'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/asset/data/life-expectancy-table.json',
    method: 'get'
  })
}
