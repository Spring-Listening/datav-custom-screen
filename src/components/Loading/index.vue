<!--
 * @Descripttion:
 * @version:
 * @Author: chunwen (chunwen.zou@caibeitv.com)
 * @Date: 2021-07-14 19:25:18
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-20 17:44:01
-->
<template>
  <div class="loading-container">
    <svg :width="width" :height="height" viewBox="0 0 50 50" preserveAspectRatio="xMinyMin meet">
      <circle
        cx="25"
        cy="25"
        r="22"
        fill="none"
        stroke-width="3"
        :stroke="outsideColor"
        stroke-dasharray="34 34"
        stroke-linecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 25 25;360 25 25"
          :dur="`${duration}s`"
          repeatCount="indefinite"
        ></animateTransform>
        <animate
          attributeName="stroke"
          :values="outsideColorAnimation"
          :dur="`${+duration * 2}s`"
          repeatCount="indefinite"
        ></animate>
      </circle>
      <circle
        cx="25"
        cy="25"
        r="12"
        fill="none"
        stroke-width="3"
        :stroke="insideColor"
        stroke-dasharray="19 19"
        stroke-linecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="360 25 25;0 25 25"
          :dur="`${duration}s`"
          repeatCount="indefinite"
        ></animateTransform>
        <animate
          attributeName="stroke"
          :values="insideColorAnimation"
          :dur="`${+duration * 2}s`"
          repeatCount="indefinite"
        ></animate>
      </circle>
    </svg>
    <div class="text">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'Loading',
  props: {
    width: {
      type: [String, Number],
      default: 50
    },
    height: {
      type: [String, Number],
      default: 50
    },
    outsideColor: {
      type: String,
      default: '#3be6cb'
    },
    insideColor: {
      type: String,
      default: '#02bcfe'
    },
    duration: {
      type: [Number, String],
      default: 2
    }
  },
  setup(ctx) {
    const outsideColorAnimation = computed(
      () => `${ctx.outsideColor};${ctx.insideColor};${ctx.outsideColor}`
    )
    const insideColorAnimation = computed(
      () => `${ctx.insideColor};${ctx.outsideColor};${ctx.insideColor}`
    )
    return {
      outsideColorAnimation,
      insideColorAnimation
    }
  }
})
</script>
<style lang="scss" scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .text {
    padding-top: 12px;
    font-size: 24px;
  }
}
</style>
