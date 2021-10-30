// import { resolve } from 'core-js/fn/promise';
import Vue from 'vue'
import Vuex from 'vuex'
import user from "./user";
Vue.use(Vuex)
// 数据仓库
export default new Vuex.Store({
  modules: {
    user
  }
})
