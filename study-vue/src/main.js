// main是整个项目的单入口文件
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
 // 注册事件总线
Vue.prototype.$bus = new Vue();

new Vue({
  render: h => h(App),
}).$mount('#app')
