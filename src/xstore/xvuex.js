/* 
1.实现插件
2.实现Store
 */

let Vue
class Store {
    constructor(options) {
        this._mutations = options.mutations
        // 响应式处理的数据:state;通过借鸡生蛋
        // this.state = new Vue({
        //     data: options.state
        // })
        // 
        // Vue内部没有采取上述方式，而是通过下面方式实现了响应式
        // 并将state对用户隐藏了起来
        this._vm = new Vue({
            data: {
                // 添加$$，Vue就不会代理
                $$state: options.state
            }
        })
        
    }
    // 可以通过get的方式获取_vm
    get state(){
        return this._vm._data.$$state
    }
    // 将来用户只读，且不能设置state
    set state(v){
        console.error('请使用replaceState方式去重置状态');
    }
    // 实现commit,修改状态：commit('add',payload)
    commit(type,payload){
        // 根据type获取mutation
        const mutation = this._mutations[type]
        if(!mutation){
            console.error('不存在mutation')
            return
        }
        mutation(this.state,payload)
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