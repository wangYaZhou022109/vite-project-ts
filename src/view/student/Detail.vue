<template>
  <div class="">{{curStuId}}</div>
</template>

<script lang="ts">
import { defineComponent, computed, inject, onBeforeMount, onMounted, onUpdated, onUnmounted  } from 'vue'

export default defineComponent({
  setup (props) {
    const router = inject('Route') as any
    onBeforeMount (() => {
      console.log('onBeforeMount')
    })
    onMounted(() => {
        console.log('onMounted')
    })
    onUpdated(() => {
      console.log('onUpdated')
    })
    onUnmounted(() => {
      console.log('onUnmounted')
      
    })
    return {
      curStuId: router.currentRoute.value.params.id
    }
  }
})
</script>

<style scoped lang="less">

</style>
