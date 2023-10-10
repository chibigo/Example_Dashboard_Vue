
export const routes = [
    {
        path: '/',
        name: '',
        component: () => import('@/components/Layout/index.vue'), 
        meta: {
            checkAuth: true,
        },
        children: [
            {
                path:'',
                name:'dashboard',
                component: ()=> import('@/views/DashBoard/index.vue'),
            },
            {
                path:'/category',
                name:'category',
                component: () => import('@/views/CategoryView.vue')
            },
            {
                path:'/product',
                name:'product',
                component: () => import('@/views/ProductView.vue')
            },
            {
                path:'/member',
                name:'member',
                component: () => import('@/views/MemberView.vue')
            },
            {
                path:'/setting',
                name:'setting',
                component: () => import('@/views/SettingView.vue')
            },
        ]
    },
    {
        path:'/login',
        name:'login',
        component: () => import('@/views/Login/index.vue')
    }
]
// export default routes