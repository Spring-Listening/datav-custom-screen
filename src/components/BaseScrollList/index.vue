<!--
 * @Descripttion:
 * @version:
 * @Author: chunwen (chunwen.zou@caibeitv.com)
 * @Date: 2021-07-30 10:45:49
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-04 16:46:54
-->
<template>
  <div class="base-scroll-list-container" :id="id">
    <div
      class="base-scroll-list-header"
      :style="{ backgroundColor: config.headerBg, height: `${config.headerHeight}px` }"
    >
      <div
        class="header-item"
        v-for="(headerItem, i) in headerData"
        :key="headerItem + i"
        :style="{
          width: `${columnWidth[i]}px`,
          ...headerStyle[i]
        }"
        v-html="headerItem"
      ></div>
    </div>
    <div class="base-scroll-list-rows" id="scroll">
      <ul class="scroll-box">
        <li v-for="(item, index) in rowsData" :key="index">
          <div
            :style="{
              width: `${columnWidth[i]}px`,
              ...headerStyle[i]
            }"
            class="index"
            v-for="(k, i) in Object.keys(item)"
            :key="i"
            v-html="item[k]"
          ></div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { defineComponent, nextTick, onMounted, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import useScreen from '@/hooks/useScreen'
import cloneDeep from 'lodash/cloneDeep'
import assign from 'lodash/assign'
import BScroll from 'better-scroll'

export default defineComponent({
  name: 'BaseScrollList',
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const headerData = ref([])
    const headerStyle = ref([])
    const defaultConfig = {
      header: {
        type: Array,
        default: () => []
      },
      headerStyles: {
        type: Array,
        default: () => []
      },
      headerBg: {
        type: String,
        default: 'blue'
      },
      headerHeight: {
        type: [String, Number],
        default: 35
      },
      headerIndex: {
        type: Boolean,
        default: false
      },
      headerIndexStyle: {
        type: Object,
        default: () => {}
      },
      headerIndexContent: {
        type: String,
        default: ''
      },
      data: {
        type: Array,
        default: []
      }
    }
    const actualConfig = ref({})
    const columnWidth = ref([])
    const rowsData = ref([])
    const id = ref(0)
    id.value = `base-scroll-list-container-${uuidv4()}`
    const { width, height } = useScreen(id.value)
    const listData = ref([])
    const Bscroll = ref({})
    // const data = [
    //   { name: 'spring', age: 30, sex: '男' },
    //   { name: 'hello', age: 43, sex: '女' }
    // ]
    const handleHeader = config => {
      const _headerData = cloneDeep(config.header)
      console.log(_headerData)
      const _headerStyle = cloneDeep(config.headerStyles)
      if (_headerData.length === 0) {
        return
      }
      if (props.config.headerIndex) {
        _headerData.unshift(config.headerIndexContent)
        _headerStyle.unshift(config.headerIndexStyle)
      }
      headerData.value = _headerData
      headerStyle.value = _headerStyle

      // 计算每列的宽度
      console.log(_headerStyle)
      let useWidth = 0
      let useColumnsCount = 0
      _headerStyle.forEach(style => {
        if (style.width) {
          useWidth += +style.width.replace('px', '')
          useColumnsCount += 1
        }
      })
      console.log(useWidth)
      const avgWidth = (width.value - useWidth) / (_headerData.length - useColumnsCount)
      const _columnWidth = new Array(_headerData.length).fill(avgWidth)
      columnWidth.value = _columnWidth
      console.log(columnWidth.value)

      listData.value = props.data
    }

    const handleRows = config => {
      if (props.config.headerIndex) {
        config.data.map((item, index) => {
          if (item.length < columnWidth.value.length) {
            item.unshift(index + 1)
          }
          return item
        })
      }
    }
    const scrollAnimation = () => {
      const e = document.getElementById('scroll')
      Bscroll.value = new BScroll(e, {
        scrollY: true,
        click: true,
        snap: {
          /* 循环滚动设置 */
          loop: true,
          threshold: 0.3,
          speed: 400
        }
      })
    }
    onMounted(() => {
      const _actualConfig = assign(defaultConfig, props.config)
      rowsData.value = _actualConfig.data
      handleHeader(_actualConfig)
      handleRows(_actualConfig)
      actualConfig.value = _actualConfig
      nextTick(() => {
        scrollAnimation()
      })
    })
    return {
      id,
      width,
      height,
      headerData,
      headerStyle,
      columnWidth,
      listData,
      rowsData,
      Bscroll
    }
  }
})
</script>
<style lang="scss" scoped>
.base-scroll-list-container {
  width: 100%;
  height: 100%;
  background: #eee;
  display: flex;
  flex-direction: column;
  .base-scroll-list-header {
    display: flex;
    align-items: center;
    .header-item {
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .base-scroll-list-rows {
    flex: 1;
    height: 100%;
    overflow: auto;
    ul {
      width: 100%;
      background: #aaa;
      margin: 0;
      padding: 0;
      li {
        list-style: none;
        display: flex;
        text-align: center;
        line-height: 35px;
      }
    }
  }
}
</style>
