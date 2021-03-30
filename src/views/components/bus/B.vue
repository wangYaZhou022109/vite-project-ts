<template>
  <div class="title">B组件</div>
  <div class="title">当前结果：{{ number }}</div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, inject } from 'vue'
import { Emitter } from 'mitt'

export default defineComponent({
  setup() {
    const bus = inject('bus') as Emitter
    const number = ref(0)

    const changeNumber = (value: number) => {
      number.value = value
    }

    onMounted(() => {
      bus.on<any>('change-number', changeNumber)
    })

    onUnmounted(() => {
      bus.off<any>('change-number', changeNumber)
    })

    return { number }
  }
})
</script>

<style lang="less" scoped></style>
