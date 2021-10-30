// import { resolve } from 'core-js/fn/promise';
import Vue from 'vue'
import Vuex from 'vuex'
import persist from './plugins/persist';
import user from "./user";
Vue.use(Vuex)
// 数据仓库
export default new Vuex.Store({
  strict:true,
  modules: {
    user
  },
  plugins:[
    persist
  ]
})
