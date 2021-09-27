// 插件声明，插件实现需要install
const MyPlugin = {
    install(Vue, options){
        //heading组件
        // <heading :title="title" icon="cart">{{title}}</heading>
        // <h2 title="title"><svg><use x:href="#icon-cart"></svg></h2>
        Vue.component('heading', {
            props: {
                level: {
                    type: String,
                    required: true
                },
                title: {
                    type: String,
                    default: ''
                },
                icon: String  //icon可能有值也可能没值
            },
            render(h) { //h为createElement函数的社区通用简写
                // vue底层通过snabbdom算法实现虚拟dom
                // 子节点数组
                let children = [];
                // icon逻辑判断
                if (this.icon) {
                    // <svg class="icon"><use xlink:href="#icon-cart"></svg>
                    children.unshift(
                        h(
                            'svg',
                            { class: 'icon' },
                            [
                                h(
                                    'use',
                                    { attrs: { 'xlink:href': '#icon-' + this.icon } }
                                )
                            ]
                        )
                    )
                }
                children = children.concat(this.$slots.default);
                const VNode = h(
                    'h' + this.level,    //参数一，tagname
                    { attrs: { title: this.title } },//参数二，一个和模板中属性对应的Object
                    children   //参数三，子节点Vnode数组
                );
                console.log(VNode);
                // 返回createElement返回的VNode
                return VNode;
            }
        })
    }
}
// 判断当前环境
if(typeof window !== 'undefined' && window.Vue){
    // 插件使用，使用Vue.use()
    window.Vue.use(MyPlugin);
}