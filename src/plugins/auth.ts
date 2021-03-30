import { App } from 'vue'
import { useStore } from '@/store'
const auth = (permission: string) => {
  const store = useStore()
  const authJson = store.getters['SSO/AUTH']()
  if (authJson.code !== 200) return false
  const authData = authJson.data
  for (const item of authData) {
    if (permission === item.desc) {
      return item.display
    }
  }
  return false
}

export default {
  install: (app: App) => {
    app.provide('auth', auth)
    app.config.globalProperties.auth = auth
  }
}
