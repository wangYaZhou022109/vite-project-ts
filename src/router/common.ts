const Layout = () => import('../components/layout/index.vue')
export default [
  {
    path: '/403',
    meta: {
      title: ''
    },
    component: Layout,
    children: [
      {
        path: '',
        name: '403',
        component: () => import('@/components/403/index.vue')
      }
    ]
  },
  {
    path: '/404',
    meta: {
      title: ''
    },
    component: Layout,
    children: [
      {
        path: '',
        name: '404',
        component: () => import('@/components/404/index.vue')
      }
    ]
  }
]
