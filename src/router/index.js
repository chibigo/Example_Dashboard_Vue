import { createRouter, createWebHistory } from 'vue-router'
import {routes} from './Route'
import { useAuthStore } from '../stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// if(token) {
//   router.push({name:'dashboard'})
// } else {
//   router.push({name:'login'})
// }

// router.beforeEach((to,from,next) => {
//   if (to.meta.requiresAuthModal) {
//     if(token) {
//       next("/")
//     } else {
//       next("/login")
//     }
//   }
//   // if(token) {
//   //   // next("/")
//   // }else {
//   //   // next("/login")
//   // }
// })


router.beforeEach((to, from, next) => {
  const useAuth = useAuthStore()
  if (to.meta.requestAuthen) {
    if (useAuth.auth) {
      next({ name: "dashboard" });
    } else next();
  } else {
    if (to.meta.checkAuth) {
      if (useAuth.auth) {
        next();
      } else {
        next({ name: "login" });
      }
    } else {
      next(); // Cho phép truy cập
    }
  }
});

export default router
