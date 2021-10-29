// main是整个项目的单入口文件
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
// 注册事件总线
Vue.prototype.$bus = new Vue();

new Vue({
  router,
  store,  //可以通过$store来访问全局的store实例
  render: h => h(App)
}).$mount('#app')
