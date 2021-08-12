/*
 * @Descripttion:
 * @version:
 * @Author: chunwen (chunwen.zou@caibeitv.com)
 * @Date: 2021-07-20 15:47:40
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-21 14:33:30
 */
export function debounce(delay, callback) {
  let task
  // eslint-disable-next-line func-names
  return function() {
    clearTimeout(task)
    task = setTimeout(() => {
      // eslint-disable-next-line prefer-rest-params
      callback.apply(this, arguments)
    }, delay)
  }
}
export default {}
