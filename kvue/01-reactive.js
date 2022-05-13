// js中监听数据变更需要Object.defineProperty()函数
// 给一个obj定义一个响应式的属性
// 先定义一个defineReactive函数
function defineReactive(obj, key, val) {
  // 递归
  // val如果是个对象，就需要递归处理
  observe(val)
  
  // 利用get/set来对obj进行拦截
  Object.defineProperty(obj, key, {
    get() {
      // 日志记录
      console.log("get", key);
      // 返回当前对象对应属性的值
      return val;
    },
    set(newVal) {
      if (newVal !== val) {
        console.log("set", key);
        val = newVal;
        // 新值如果是对象，仍然需要递归遍历处理
        observe(newVal)
        // update()
      }
    },
  });
}

// 遍历响应式处理
function observe(obj) {
  if (typeof obj !== "object" || obj == null) {
    return obj;
  }

  Object.keys(obj).forEach((key) => defineReactive(obj, key, obj[key]));
}

function set(obj, key, val) {
  defineReactive(obj, key, val)
}

//----------------------------test-------------------------
const obj2 = {}
// 测试下响应式拦截函数
defineReactive(obj2,'foo','foo')
obj2.foo

const obj = {
  foo: 'foo',
  bar: 'bar',
  baz: {
    n: 1
  }
};
// defineReactive(obj, "foo", "foo");
observe(obj)
// obj.foo;
// obj.baz = {
//   n: 10
// }
// obj.baz.n
// obj.dong = 'dong'
set(obj, 'dong', 'dong')
obj.dong
