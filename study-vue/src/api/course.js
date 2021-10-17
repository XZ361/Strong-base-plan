// 接口，模拟异步数据调用，
// 结合Vue工程化进行接口的模块化管理
import axios from "axios";

export function getCourses() {
    // axios插件在执行操作后会直接返回promise请求
    return axios.get('/api/course').then(res=>res.data);
    // return new Promise(resolve => {
    //     setTimeout(() => {
    //         resolve([{ name: 'web全栈',price: '8999' }, { name: 'web高级',price:8999 }])
    //     }, 2000);
    // })
}