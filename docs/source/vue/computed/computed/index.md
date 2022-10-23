# computed API

* 如果传递给 computed 是一个函数 就会默认是 getter 函数 不能修改 只能获取
* 可以传递一个对象   就可以修改了
  * get 读取逻辑 一个函数
  * set 修改逻辑 一个函数

## computed

* 拥有单个参数 getterOrOptions  可以是 getter 函数 也可以是一个对象
* 首先会先标准化参数 拿到计算属性对应的 getter 函数和 setter函数
* 如果值传递了 getter 函数 在开发环境下 修改了计算属性的值 就会执行对应的 setter 函数 提醒该计算属性的值是只读的
* compupted 函数返回了 ComputeRefImpl 的实例 在构造器内部 通过 new ReactiveEffect 方式创建了副作用实例 effect

## ReactiveEffect

* 第一个参数 fn 函数在后续执行 effect.run 会执行这个 fn 函数
* 第二个参数 scheduler 函数 在后续执行派发通知的时候好 会通知 effect 依赖执行对应的 scheduler 函数
* 在 ComputeRefImpl 内部 对实例的 value 属性创建了 getter 和 setter 当 computed 对象的 value 属性被访问过之后 触发 getter 函数 对计算属性本身进行依赖收集
* 然后判断是否 _dirtry 如果是 执行 effect.run 函数重置_dirtry 的值
* 当我们直接设置 computed 对象的值 会触发 setter 执行 compunted 函数内部定义的 setter 函数