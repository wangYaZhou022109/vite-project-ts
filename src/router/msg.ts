const Layout = () => import('../components/layout/index.vue')

export default [
    {
        path: '/msg',
        component: Layout,
        children: [
            {
                path: '',
                name: 'msg',
                component: () => import('../view/Msg.vue')
            }
        ]
    }
]