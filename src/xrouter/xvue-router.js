/* 
*spa页面不能更新：（内容改变，页面不刷新）
1：hash：（hash值变，url地址不会改变，浏览器不会刷新）
2：history Api:
*/

/* router组件中一定包含router-view、router-link组件
url变化要显示对应内容：
1.router-view：相当于一个容器或占位符，当url中的hash改变时，加载路由表中和对应hash匹配的组件
；router-link: 相当于a链接，点击会跳转到对应的组件
2.数据响应式：内容的变化一定涉及到Dom操作，如果不用操作DOM,必定用到vue的数据响应式
 */

/* 实现插件：在xrouter/index.js文件中用到了use方法，
那么use中的对象一定是个插件并且执行了install方法 
*/

// import Home from '../views/Home.vue'
// h(Home)可以直接渲染生成组件的配置对象

let Vue

class VueRouter {
    constructor(options) {
        this.options = options
    }
}

// 插件要实现install方法
VueRouter.install = function (_Vue) {
    // 该函数会接受一个形参，该形参是Vue的构造函数
    Vue = _Vue

    // 关键在于注册router实例，但是从xrouter/index.js中发现先执行install，后创建的router实例
    // 就是说install执行时，根本就不存在router实例
    Vue.prototype.$router = 

    // 注册两个组件，router-view和router-link
    Vue.component('router-view', {
        render(h) {
            // url=>component，二者之间的映射关系存放在routes中
            // 首先需要监听url中hash的变化,与路由表中对象的path做匹配，将匹配到的对象对应的组件放入router-view中，
            // 实现内容更新
            // 1.获取hash window.location.hash
            // 2.获取组件的映射表 this.$options.router.routes
            // 3.匹配渲染
            return h(Home)
        }
    })
    Vue.component('router-link', {
        props: {
            to: {
                type: String,
                required: true
            }
        },
        render(h) {
            
            // <router-link to="/about">about</router-link>
            // <a href="/about">about</a>
            return h('a', { attrs: { href: '#' + this.to } }, this.$slots.default)
            // 用jsx也可以实现上述效果,但是兼容性不好，要求当前环境支持jsx的解析
            // h
            // return <a href={'#'+this.to}>{this.$slots.default}</a>;
        }
    })
}

export default VueRouter