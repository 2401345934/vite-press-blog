---
createTime: 2022/10/09
tag: '面试题'
---
# 字节前端面试题

## 写 React / Vue 项目时为什么要在列表组件中写 key，其作用是什么？

* key 是给每一个 vnode 的唯一 id,可以依靠 key,更准确,更快的拿到 oldVnode 中对应的 vnode 节点

## 什么是防抖和节流？有什么区别？如何实现？

```javascript

// 防抖——触发高频事件后 n 秒后函数只会执行一次，如果 n 秒内高频事件再次被触发，则重新计算时间；
function debounce (fn) {
  let timeout = null; // 创建一个标记用来存放定时器的返回值
  return function () {
    clearTimeout(timeout); // 每当用户输入的时候把前一个 setTimeout clear 掉
    timeout = setTimeout(() => { // 然后又创建一个新的 setTimeout, 这样就能保证输入字符后的 interval 间隔内如果还有字符输入的话，就不会执行 fn 函数
      fn.apply(this, arguments);
    }, 500);
  };
}
function sayHi () {
  console.log('防抖成功');
}
var inp = document.getElementById('inp');
inp.addEventListener('input', debounce(sayHi)); // 防抖
// 节流——高频事件触发，但在 n 秒内只会执行一次，所以节流会稀释函数的执行频率。
function throttle (fn) {
  let canRun = true; // 通过闭包保存一个标记
  return function () {
    if (!canRun) return; // 在函数开头判断标记是否为 true，不为 true 则 return
    canRun = false; // 立即设置为 false
    setTimeout(() => { // 将外部传入的函数的执行放在 setTimeout 中
      fn.apply(this, arguments);
      // 最后在 setTimeout 执行完毕后再把标记设置为 true(关键) 表示可以执行下一次循环了。当定时器没有执行的时候标记永远是 false，在开头被 return 掉
      canRun = true;
    }, 500);
  };
}
function sayHi (e) {
  console.log(e.target.innerWidth, e.target.innerHeight);
}
window.addEventListener('resize', throttle(sayHi));
```

## 介绍下 Set、Map、WeakSet 和 WeakMap 的区别？

* Set——对象允许你存储任何类型的唯一值，无论是原始值或者是对象引用
* WeakSet——成员都是对象；成员都是弱引用，可以被垃圾回收机制回收，可以
* 用来保存 DOM 节点，不容易造成内存泄漏；
* Map——本质上是键值对的集合，类似集合；可以遍历，方法很多，可以跟各种数据格式转换。
* WeakMap——只接受对象最为键名（null 除外），不接受其他类型的值作为键名；键名是弱引用，键值可以是任意的，键名所指向的对象可以被垃圾回收，此时键名是无效的；不能遍历，方法有 get、set、has、delete。

## 介绍下深度优先遍历和广度优先遍历，如何实现？

* 深度优先遍历——是指从某个顶点出发，首先访问这个顶点，然后找出刚访问这个结点的第一个未被访问的邻结点，然后再以此邻结点为顶点，继续找它的下一个顶点进行访问。重复此步骤，直至所有结点都被访问完为止。
* 广度优先遍历——是从某个顶点出发，首先访问这个顶点，然后找出刚访问这个结点所有未被访问的邻结点，访问完后再访问这些结点中第一个邻结点的所有结点，重复此方法，直到所有结点都被访问完为止。

```javascript

//1.深度优先遍历的递归写法 
function deepTraversal (node) {
  let nodes = []
  if (node != null) {
    nodes.push[node]
    let childrens = node.children
    for (let i = 0;
      i < childrens.length; i++) deepTraversal(childrens[i])
  }
  return nodes
}
//2.深度优先遍历的非递归写法
function deepTraversal (node) {
  let nodes = []
  if (node != null) {
    let stack = []
    //同来存放将来要访问的节点
    stack.push(node)
    while (stack.length != 0) {
      let item = stack.pop()
      //正在访问的节点
      nodes.push(item)
      let childrens = item.children
      for (
        let i = childrens.length - 1;
        i >= 0;
        i--
      )
        //将现在访问点的节点的子节点存入 stack，供将来访问
        stack.push(childrens[i])
    }
  }
  return nodes
}
//3.广度优先遍历的递归写法
function wideTraversal (node) {
  let nodes = [],
    i = 0
  if (node != null) {
    nodes.push(node)
    wideTraversal(node.nextElementSibling)
    node = nodes[i++]
    wideTraversal(node.firstElementChild)
  }
  return nodes
}
//4.广度优先遍历的非递归写法
 function wideTraversal (node) {
  let nodes = [], i = 0
  while (node != null) {
    nodes.push(node)
    node = nodes[i++]
    let childrens = node.children
    for (let i = 0;
      i < childrens.length;
      i++) {
      nodes.push(childrens[i])
    }
  }
  return nodes
}
```

## 请分别用深度优先思想和广度优先思想实现一个拷贝函数？

```javascript
let _toString = Object.prototype.toString
let map = {
  array: 'Array',
  object: 'Object',
  function: 'Function',
  string: 'String',
  null: 'Null',
  undefined: 'Undefined',
  boolean: 'Boolean',
  number: 'Number'
}
let getType = (item) => {
  return _toString.call(item).slice(8, -1)
}
let isTypeOf = (item, type) => {
  return map[type] && map[type] === getType(item)
}
```

## ES5 / ES6 的继承除了写法以外还有什么区别？

* ES5 的继承实质上是先创建子类的实例对象，然后再将父类的方法添加到 this 上（Parent.apply(this)）
* ES6 的继承机制完全不同，实质上是先创建父类的实例对象 this（所以必须先调用父类的 super()方法），然后再用子类的构造函数修改 this。
* ES5 的继承时通过原型或构造函数机制来实现。
* ES6 通过 class 关键字定义类，里面有构造方法，类之间通过 extends 关键字实现继承。
* 子类必须在 constructor 方法中调用 super 方法，否则新建实例报错。因为子类没有自己的 this 对象，而是继承了父类的 this 对象，然后对其进行加工。如果不调用 super 方法，子类得不到 this 对象。
* 注意 super 关键字指代父类的实例，即父类的 this 对象。
* 注意：在子类构造函数中，调用 super 后，才可使用 this 关键字，否则报错。function 声明会提升，但不会初始化赋值。Foo 进入暂时性死区，类似于 let、const 声明变量。

## Async / Await 如何通过同步的方式实现异步

* async 起什么作用——输出的是一个 Promise 对象

## JS 异步解决方案的发展历程以及优缺点

### 1、回调函数（callback）

* 优点：解决了同步的问题（只要有一个任务耗时很长，后面的任务都必须排队
* 等着，会拖延整个程序的执行。）
* 缺点：回调地狱，不能用 try catch 捕获错误，不能 return

### 2、Promise

* 优点：解决了回调地狱的问题
* 缺点：无法取消 Promise ，错误需要通过回调函数来捕获

### 3、Generator

* 特点：可以控制函数的执行，可以配合 co 函数库使用

### 4、Async/await

* 优点：代码清晰，不用像 Promise 写一大堆 then 链，处理了回调地狱的问题
* 缺点：await 将异步代码改造成同步代码，如果多个异步操作没有依赖性而使用 await 会导致性能上的降低。

## Promise 构造函数是同步执行还是异步执行，那么 then 方法呢？

```javascript
const promise = new Promise((resolve, reject) => {
  console.log(1)
  resolve()
  console.log(2)
})
promise.then(() => {
  console.log(3)
})
console.log(4)
// 执行结果是：1243，promise 构造函数是同步执行的，then 方法是异步执行的
```

## 谈谈你对 TCP 三次握手和四次挥手的理解

### TCP三次握手

* 客户端发送syn包到服务器，等待服务器确认接收。
* 服务器确认接收syn包并确认客户的syn，并发送回来一个syn+ack的包给客户端。
* 客户端确认接收服务器的syn+ack包，并向服务器发送确认包ack，二者相互建立联系后，完成tcp三次握手。

### 四次握手

* 就是中间多了一层：等待服务器再一次响应回复相关数据的过程
* 三次握手之所以是三次是保证client和server均让对方知道自己的接收和发送能力没问题而保证的最小次数。
* 第一次client => server 只能server判断出client具备发送能力
* 第二次 server => client client就可以判断出server具备发送和接受能力。此时client还需让server知道自己接收能力没问题于是就有了第三次
* 第三次 client => server 双方均保证了自己的接收和发送能力没有问题
* 其中，为了保证后续的握手是为了应答上一个握手，每次握手都会带一个标识 seq，后续的ACK都会对这个seq进行加一来进行确认。

## React 中 setState 什么时候是同步的，什么时候是异步的？

* 由 React 控制的事件处理程序，以及生命周期函数调用 setState 不会同步更新 state 。
* React 控制之外的事件中调用 setState 是同步更新的。比如原生 js 绑定的事件，setTimeout/setInterval 等。

## React setState 笔试题，下面的代码输出什么？

```javascript

class Example extends React.Component {
  constructor() {
    super()
    this.state = {
      val: 0,
    }
  }

  componentDidMount() {
    this.setState({ val: this.state.val + 1 })
    console.log(this.state.val)
    // 第 1 次 log
    this.setState({ val: this.state.val + 1 })
    console.log(this.state.val)
    // 第 2 次 log
    setTimeout(() => {
      this.setState({ val: this.state.val + 1 })
      console.log(this.state.val)
      // 第 3 次 log
      this.setState({ val: this.state.val + 1 })
      console.log(this.state.val)
      // 第 4 次 log
    }, 0)
  }

  render() {
    return null
  }
}

// 答：
// 0, 0, 1, 2
```

## 介绍下 npm 模块安装机制？

* 发出 npm install 命令
* 查询 node_modules 目录之中是否已经存在指定模块
* 若存在，不再重新安装
* 若不存在
* npm 向 registry 查询模块压缩包的网址
* 下载压缩包，存放在根目录下的.npm 目录里
* 解压压缩包到当前项目的 node_modules 目录
