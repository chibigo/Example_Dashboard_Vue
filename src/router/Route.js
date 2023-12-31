export const routes = [
  {
    path: "/",
    name: "",
    component: () => import("@/layout/index.vue"),
    meta: {
      checkAuth: true,
    },
    children: [
      {
        path: "/",
        name: "dashboard",
        component: () => import("@/views/DashBoard/index.vue"),
      },
      {
        path: "/category",
        name: "category",
        component: () => import("@/views/Category/CategoryView.vue"),
      },
      {
        path: "/product",
        name: "product",
        component: () => import("@/views/Product/ProductView.vue"),
      },
      {
        path: "/member",
        name: "member",
        component: () => import("@/views/Member/index.vue"),
      },
      {
        path: "/library",
        name: "library",
        component: () => import("@/views/LibaryFile/index.vue"),
      },
      {
        path: "/setting",
        name: "setting",
        component: () => import("@/views/SettingView.vue"),
      },
      {
        path: "/coupon",
        name: "coupon",
        component: () => import("@/views/Coupon/index.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login/index.vue"),
    meta: {
      requestAuthen: true,
    },
  },
  {
    path: "/404",
    name: "PageNotFound",
    component: () => import("../views/Error404.vue"),
  },
  {
    path: "/:catchAll(.*)",
    redirect: "404",
  },
];
// export default routes
