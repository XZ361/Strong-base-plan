import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 数据仓库
export default new Vuex.Store({
  state: {  //保存全局状态
    isLogin: false
  },
  mutations: {
    login(state){
      state.isLogin = true;
    },
    logout(state){
      state.isLogin = false;
    }
  },
  actions: {
  },
  modules: {
  }
})
