<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { useStore } from '@/store'
export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore()
    onBeforeMount(async () => {
      await store.dispatch('SSO/getToken')
      store.dispatch('SSO/getPermissions')
      store.dispatch('SSO/getUserInfo')
    })
    return { locale: zhCN }
  }
})
</script>

<style></style>
