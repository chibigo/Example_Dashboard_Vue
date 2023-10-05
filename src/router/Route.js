
export const routes = [
    {
        path:'/',
        name:'home',
        component: ()=> import('@/views/HomeView.vue')
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