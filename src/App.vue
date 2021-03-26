<template>
  <router-view :myRoute="router"/>
</template>

<script lang="ts">
import router from './router'
import { defineComponent, provide } from 'vue'
export default defineComponent({
  name: 'App',
  setup() {
    provide('Route', router)
    return {router }
  }
})
</script>
