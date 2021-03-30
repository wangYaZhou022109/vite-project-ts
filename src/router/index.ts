import { createRouter, createWebHistory } from 'vue-router'
import common from './common'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes: [...routes, ...common]
})

export default router
