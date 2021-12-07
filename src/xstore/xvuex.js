/* 
1.实现插件
2.实现Store
 */

let Vue
class Store {
    constructor(){
        Vue
    }
}

function install(_Vue){
    Vue = _Vue
}
// 现在导出的就是Vuex
export default {Store,install}