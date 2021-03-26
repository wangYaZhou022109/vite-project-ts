import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import common from './common'

const router = createRouter({
  history: createWebHistory(),
  routes: [...routes, ...common]
})

export default router