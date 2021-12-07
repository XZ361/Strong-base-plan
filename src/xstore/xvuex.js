/* 
1.实现插件
2.实现Store
 */

let Vue
class Store {
    constructor(options) {
        // 响应式处理的数据:state;通过借鸡生蛋
        this.state = new Vue({
            data: options.state
        })
    }
}

function install(_Vue) {
    Vue = _Vue
    // 注册$store
    Vue.mixin({
        beforeCreate() {
            if (this.$options.store) {
                Vue.prototype.$store = this.$options.store
            }
        }
    })
}
// 现在导出的就是Vuex
export default { Store, install }