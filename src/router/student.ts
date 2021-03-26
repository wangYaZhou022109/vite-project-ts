const Layout = () => import('../components/layout/index.vue')

export default [
    {
        path: '/student',
        component: Layout,
        children: [
            {
                path: '',
                name: 'stuList',
                component: () => import('../view/student/List.vue')
            },
            {
                path: ':id',
                name: 'stuDetail',
                component: () => import('../view/student/Detail.vue')
            }
        ]
    }
]