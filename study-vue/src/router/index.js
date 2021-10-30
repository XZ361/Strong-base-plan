import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/course/:name',
    name: 'Detail',
    component: () => import('../views/Detail.vue')
  },
  {
  // 会匹配所有路径
    path: '*',
    component: () => import('../views/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 全局守卫
// router.beforeEach((to,from,next) => {
//   // 判断路由是否需要全局守卫
//   // meta数据
//   if(to.meta.auth){
//     // 是否登录
//     if (window.isLogin){
//       next();
//     } else {
//       next('/login?redirect=' + to.fullPath);
//     }
//   } else {
//     next();
//   }
// })

router.beforeEach((to,from,next) => {
  // 判断逻辑：
  // 是否登录
  if(store.state.user.isLogin){
    // 已经登录，还去登录页面，就重定向到首页
    if (to.path === '/login'){
      next('/');
    } else {
      // 已经登陆，去的不是登录页，直接放行
      next();
    }
  } else {
    // 未登录，去的是登录页，直接放行
    if (to.path === '/login'){
      next();
    } else {
      next('/login?redirect=' + to.fullPath);
    }
  }
})

export default router
