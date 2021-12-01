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
let Vue

class VueRouter {
    constructor() {
        Vue
    }
}

// 插件要实现install方法
VueRouter.install = function(_Vue) {
    // 该函数会接受一个形参，该形参是Vue的构造函数
    Vue = _Vue
}

export default VueRouter