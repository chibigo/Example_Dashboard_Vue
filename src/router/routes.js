
const routes = [
    {
        path:'/',
        name:'home',
        component: ()=> import('@/views/HomeView.vue')
    },
    {
        path:'/product',
        name:'product',
        component: () => import('@/views/ProductView.vue')
    }
]
export default routes