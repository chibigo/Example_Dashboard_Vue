
export const routes = [
    {
        path:'/',
        name:'dashboard',
        component: ()=> import('@/views/DashboardView.vue')
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
    }
]
// export default routes