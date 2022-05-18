// 实现数组的响应式
//  对原有的数组方法实现一个更新通知
const orginalProto = Array.prototype;
// 备份一个新的数组原型/克隆一份,修改备份
const arrayProto = Object.create(orginalProto);
// 1：替换数组原型中呐7个方法
['push','pop','shift','unshift'].forEach(method => {
  // 对备份原型上的数组方法进行覆盖

  arrayProto[method] = function(){
    // 覆盖之前进行原始的数组操作
    orginalProto[method].apply(this,arguments)

    // 通知更新
    console.log("数组执行："+method+' 操作');
  }
 })

// js中监听数据变更需要Object.defineProperty()函数
// 给一个obj定义一个响应式的属性
// 先定义一个defineReactive函数
function defineReactive(obj, key, val) {
  // 递归
  //2 val如果是个对象，就需要递归处理
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
        // 3新值如果是对象，仍然需要递归遍历处理
        observe(newVal)
        // update()
      }
    },
  });
}

// 实际开发中一个对象可能有多个属性，这时候不能一次次去执行defineReactive()
// 需要自动化处理这种情况，遍历obj的所有属性，给每个key都实现响应式
// 遍历响应式处理
function observe(obj) {
  // typeof 判断如果返回非对象或者是null,那么可以判断obj是基本数据类型
  // 不做处理
  if (typeof obj !== "object" || obj == null) {
    return obj;
  }
  // 判断传入obj类型，做相应处理
  if (Array.isArray(obj)) {
    // todo，设置下obj的原型
    // 覆盖实例原型，替换7个变更操作
    obj.__proto__ = arrayProto
   
    // 对数组内部元素执行响应化处理
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
       // 如果传入的obj数组中有其他的数组和对象，则需要进行递归处理
      observe(obj[i])
    }
  } else {
    //  2要处理的一定是对象object
    Object.keys(obj).forEach((key) => defineReactive(obj, key, obj[key]));
  }
}

// 4
function set(obj, key, val) {
  defineReactive(obj, key, val)
}

//----------------------------test-------------------------
//1 简单数据
const obj2 = {}
// 测试下响应式拦截函数
defineReactive(obj2,'foo','foo')
// obj2.foo

//2 复杂数据类型
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
// 3新值是对象的类型，需要进行响应式处理
obj.baz = {
  n: 10
}
// 可以正常拦截复杂数据
obj.baz.n
// 4复杂数据类型添加新的属性
// obj.dong = 'dong'

// 由于新的属性没有进行响应式处理，所以需要一个set方法
set(obj, 'dong', 'dong')
obj.dong

const arr = [1,2,3,40]

arr.push(5)
console.log(arr)
