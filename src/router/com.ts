const Layout = () => import('../components/layout/index.vue')

export default [
    {
        path: '/com',
        component: Layout,
        children: [
            {
                path: '',
                name: 'com',
                component: () => import('../view/Com.vue')
            }
        ]
    }
]