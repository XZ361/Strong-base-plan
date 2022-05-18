// 给一个obj定义一个响应式的属性
function defineReactive(obj, key, val) {
  // 递归
  // val如果是个对象，就需要递归处理
  observe(val);

  // 创建Dep实例，与key一一对应
  const dep = new Dep()
  
  Object.defineProperty(obj, key, {
    get() {
      console.log("get", key);
      // 依赖关系收集
      Dep.target && dep.addDep(Dep.target)
      return val;
    },
    set(newVal) {
      if (newVal !== val) {
        console.log("set", key);
        val = newVal;
        // 新值如果是对象，仍然需要递归遍历处理
        observe(newVal);
        // update()
        dep.notify()
      }
    },
  });
}

// 遍历响应式处理
function observe(obj) {
  if (typeof obj !== "object" || obj == null) {
    return obj;
  }
// 创建observer实例
  new Observer(obj);
}

// 能够将传入对象中的所有key代理到指定对象上
function proxy(vm) {
  Object.keys(vm.$data).forEach((key) => {
    Object.defineProperty(vm, key, {
      get() {
        return vm.$data[key];
      },
      set(v) {
        vm.$data[key] = v;
      },
    });
  });
}
// top2:执行数据响应化
class Observer {
  constructor(obj) {
    // 判断传入obj类型，做相应处理
    if (Array.isArray(obj)) {
      // todo
    } else {
      this.walk(obj);
    }
  }

  walk(obj) {
    Object.keys(obj).forEach((key) => defineReactive(obj, key, obj[key]));
  }
}

// top1：实现一个类KVue,这是Vue初始化的第一步
class KVue {
  constructor(options) {
    // 0.保存选项,因为后续的操作可能会用到当前数据
    this.$options = options;
    this.$data = options.data;

    // 1.对data做响应式处理
    observe(options.data);

    // 2.代理
    proxy(this);

    // 3.编译,(兩個參數，1宿主元素，當前kVue實例)
    new Compile(options.el, this);
  }
}

// top3:创建编译类
class Compile {
  constructor(el, vm) {
    this.$vm = vm;
    this.$el = document.querySelector(el);

    // 0当前宿主存在，则执行编译
    if (this.$el) {
      // 1执行编译
      this.compile(this.$el);
    }
  }

  // 遍历node，判断节点类型，做不同处理
  compile(node) {
    // 获取当前宿主的所有子节点
    const childNodes = node.childNodes;

    Array.from(childNodes).forEach((n) => {
      // 判断类型,如果当前是一个元素，则遍历其属性
      if (this.isElement(n)) {
        // console.log('编译元素', n.nodeName);
        this.compileElement(n);

        // 如果元素节点还有子节点，则递归遍历
        if (n.childNodes.length > 0) {
          this.compile(n);
        }
      } else if (this.isInter(n)) {
        // 动态插值表达式
        // console.log('编译文本', n.textContent);
        this.compileText(n);
      }
    });
  }

  isElement(n) {
    return n.nodeType === 1;
  }

  // 判断节点是形如{{ooxx}}插值表达式
  isInter(n) {
    return n.nodeType === 3 && /\{\{(.*)\}\}/.test(n.textContent);
  }

  // 编译插值文本 {{ooxx}}
  compileText(n) {
    // 获取表达式
    // n.textContent = this.$vm[RegExp.$1];
    this.update(n, RegExp.$1, "text");
  }

  // 编译元素：遍历它的所有特性，看是否k-开头指令，或者@事件
  compileElement(n) {
    const attrs = n.attributes;
    // Array.from()方法将类数组转换为数组，即返回一个浅拷贝数组
    Array.from(attrs).forEach((attr) => {
      // k-text="xxx"
      // name = k-text,value = xxx
      const attrName = attr.name;
      const exp = attr.value;
      //判断是KVue 指令
      if (this.isDir(attrName)) {
        // 执行特定指令处理函数,拿出指令
        const dir = attrName.substring(2);
        // 当前Kvue中指令存在，则执行该指令
        this[dir] && this[dir](n, exp);
      }
      
      // 事件处理
      if(this.isEvent(attrName)){
        // @click="onClick"
        const dir=attrName.substring(1)
        this.eventHandler(n,exp,dir)
      }
    });
  }
  //参数：节点，指令值表达式，以及处理指令
  update(node, exp, dir) {
    // 1.init 初始化
    const fn = this[dir + 'Updater']
    fn && fn(node, this.$vm[exp])

    // 2.update 建立更新函数
    new Watcher(this.$vm, exp, val => {
      fn && fn(node, val)
    })
  }

  // k-text
  text(node, exp) {
    // node.textContext = this.$vm[exp]
    this.update(node, exp, "text");
  }

  textUpdater(node, val) {
    node.textContent = val;
  }

  // k-html
  html(node, exp) {
    // node.innerHTML = this.$vm[exp]
    this.update(node, exp, "html");
  }

  htmlUpdater(node, val) {
    node.innerHTML = val;
  }
  
  isDir(attrName) {
    return attrName.startsWith("k-");
  }
  // k-on  or @ 事件处理
  isEvent(dir) {
    return dir.indexOf('@')==0
  }
  eventHandler(node,exp,dir) {
    //methods:{onClick:function(){}}
    const fn = this.$vm.$options.methods && this.$vm.$options.methods[exp]
    node.addEventListener(dir,fn.bind(this.$vm))
  }
  // k-model="xx"
  model(node,exp){
    // update方法是单向的，只完成赋值和更新
    this.update(node,exp,'model')
    // 事件监听
    node.addEventListener('input',e=>{
      // 新的值赋值给数据即可 
      this.$vm[exp] = e.target.value       
    })
  }
  modelUpdater(node,value){
    // input框的value赋值
    node.value = value
  }

}

// top4:负责dom更新
class Watcher {
  // 1:参数：当前KVue实例，关联的key,关联的更新函数
  constructor(vm, key, updater) {
    this.vm = vm;
    this.key = key;
    this.updater = updater;

    // 保存下当前的watcher实例
    Dep.target = this
    // 触发一下get
    this.vm[this.key]
    Dep.target = null
  }

  // 将来会被Dep类调用
  update() {
    this.updater.call(this.vm, this.vm[this.key]);
  }
}

// top5：保存watcher实例的依赖类
class Dep {
  constructor() {
    //1 可以保存相关watcher
    this.deps = []
  }
  // 2此处dep就是Watcher的实例
  addDep(dep) {
    // 创建依赖关系时调用
    this.deps.push(dep)
  }
  // 3执行更新
  notify() {
    this.deps.forEach(dep => dep.update())
  }
}