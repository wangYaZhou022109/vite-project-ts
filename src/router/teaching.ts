import { RouteRecordRaw } from 'vue-router'

const Layout = () => import('../components/layout/index.vue')

const teaching: RouteRecordRaw[] = [
  {
    path: '/teaching',
    name: 'teaching',
    meta: {
      title: '教研中心',
      icon: 'iconreloadtime'
    },
    component: Layout,
    redirect: { name: 'courseLesson' },
    children: [
      {
        path: 'course',
        name: 'courseLesson',
        meta: {
          title: '课程课次'
        },
        component: () => import(/* webpackChunkName: "courseLesson" */ '@/views/teaching/index.vue')
        // children: [
        //   {
        //     path: 'lesson/:id',
        //     name: 'lessonConf',
        //     meta: {
        //       title: '课次任务配置'
        //     },
        //     component: () =>
        //       import(
        //         /* webpackChunkName: "lessonConf" */ '@/views/teaching/course/lesson/Config.vue'
        //       )
        //   }
        // ]
      }
    ]
  }
]

export default teaching
