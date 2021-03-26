const Layout = () => import('../components/layout/index.vue')

export default [
    {
        path: '/user',
        component: Layout,
        children: [
            {
                path: '',
                name: 'user',
                component: () => import('../view/User.vue')
            }
        ]
    }
]