---
createTime: 2022/10/23
tag: 'Vue源码'
---
# shallowReactive API

* reactive  和 shallowReactive 主要区别相当于 baseHandlers 和 collectionHandlers 的区别
* 对于普通对象和数组类型数据的 Proxy 处理器对象  shallowReactive 函数传入的是 baseHandlers 的值是  shallowReactiveHandlers

## shallowReactiveHandlers

* 是基于 mutableHandlers 的基础上进行拓展
* 修改了 get 和 set 函数的实现  实际执行的是 shallowGet shallowSet

## shallowGet

* 也是通过  createGetter 第二个参数传递是 true
* 第二个参数传递是 true   即使 返回的 res 的值是对象类型 也不会通过递归变成响应式  只会把对象的最外层属性变成响应式
* 在初始化 props 到过程中  就是对 instance.props 求值后 就是通过 shallowReactive 把它变成响应式
