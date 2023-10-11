
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
                path:'/',
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
                path:'/library',
                name:'library',
                component: () => import('@/views/LibaryFile/index.vue')
            },
            {
                path:'/setting',
                name:'setting',
                component: () => import('@/views/SettingView.vue')
            }
        ]
    },
    {
        path:'/login',
        name:'login',
        component: () => import('@/views/Login/index.vue'),
        meta: {
            requestAuthen: true,
        },
    },
    {
        path: '/404',
        name: 'PageNotFound',
        component: () => import('../views/Error404.vue')
      },
    {
        path: '/:catchAll(.*)',
        redirect: '404'
    }
]
// export default routes