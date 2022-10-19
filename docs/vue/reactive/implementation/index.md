
# 响应式的内部实现原理

## 响应式对象的实现差异

* Vue2  Object.defineProperty
* Vue3  Proxy

## reactive API

* reactive 函数拥有单个参数 target 必须是对象或者数据类型
* 内部通过了 createReactiveObject 函数执行 把 target 变成一个响应式对象

## createReactiveObject

* createReactiveObject 拥有 5个参数
  * target 表示待变成响应式对象的 对象或者数组
  * isReadonly 是否创建只读对象
  * baseHandles 表示普通对象和数组类型数据的响应式对象处理器
  * collectionHandles 表示集合类型数据的响应式处理器
  * proxyMap 表示原始对象和响应式对象的缓存映射图
* createReactiveObject 主要做
  * 判断 target 是不是对象或者数组  不是直接返回
  * 如果已经是响应式对象 再次执行 reactive 直接返回该响应式对象
    ■ 内部通过 target.__v_raw 属性判断 target 是否已经是响应式对象
  * 如果同一个原始数据多次执行 reactive 返回相同的响应式对象
  * 对 原始对象的类型进一步进行限制  会通过 getTargetType 函数判断 比如 Date 类型 RegExp 类型 promise 类型 都是不可变成响应式对象 直接返回
* 通过 proxy 劫持 target 对象 变成响应式  把 new Proxy 创建的 proxy 实例称做响应式对象
  * 如果是集合类型数据 使用 collectionHandles
  * 如果是非集合类型数据 使用 baseHandles
* 把原始对象 target 作为 key 响应式对象 proxy 作为 value 存储到 map 类型的对象 proxyMap
  * 这就是为什么多次执行 reactive 函数返回同一个对象

## mutableHandlers

* 劫持了对 proxy 对象对一些操作
* 访问对象属性会触发 get 函数
* 设置对象属性会触发 set 函数
* 删除对象属性会触发 deleteProperty 函数
* in 操作符会触发 has 函数
* Object.getOwnPropertyNames 访问对象属性触发 ownKeys 函数

## 依赖收集

* 依赖收集发生在数据的访问阶段 当数据被访问 会执行 get 函数
* get 函数 是执行 createGetter 函数的返回值  isReadonly 默认 false

## get

* get 函数主要做了 4件事
* 对特殊的 key 做了 代理  比如： __v_raw 返回原始对象 target
* 如果 target 是数组 并且命中了 arrayInstrumentations 执行内部对应函数
* 通过 Reflect.get 函数求值 并执行  track 函数收集依赖
* 对象属性访问的时候才会判断子属性的类型 决定是否要递归执行 reactive

## arrayInstrumentations

* 重写了数组中的 includes indexOf lastIndexOf 函数
* 当对响应式对象调用 这三个函数 就会 对数组的每一个 元素都进行代理 做依赖收集

## track

* 创建了全局的 targetMap作为原始数据对象的 Map
* 键是 target 值是 depsMap 用来作为依赖的 Map
* depsMap 键是 target 的key 值是 dep 集合
* dep 集合 中存储的是依赖的副作用函数
* 每次执行  track 函数 就会把当前激活副作用函数 activeEffect 作为依赖
* 收集到 与target 相关的 depsMap 对应 key 下的依赖集合 dep 中
