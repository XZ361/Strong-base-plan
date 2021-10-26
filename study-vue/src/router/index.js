import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

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
    path: '/admin',
    name: 'Admin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.懒加载
    component: () => import(/* webpackChunkName: "about" */ '../views/Admin.vue'),
    children:[
      {
        path: '/admin/course/:name',
        name: 'Detail',
        component: () => import('../views/Detail.vue')
      }
    ],
    meta:{
      auth: true
    }
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
router.beforeEach((to,from,next) => {
  // 判断路由是否需要全局守卫
  // meta数据
  if(to.meta.auth){
    // 是否登录
    if (window.isLogin){
      next();
    } else {
      next('/login?redirect=' + to.fullPath);
    }
  } else {
    next();
  }
})

export default router
