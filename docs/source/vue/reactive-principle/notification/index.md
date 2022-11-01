---
createTime: 2022/10/23
tag: 'Vue源码'
---
# 派发通知

* 派发通知发生在数据更新阶段 用 proxy 劫持了数据对象 所以当响应式对象的属性值更新的时候 会执行 set 函数
* set 函数是执行 createSetter 函数的返回值

## set

* set 函数 通过 Reflect.set 求值
* 通过 trigger 函数派发通知
* 并依据 key 是否存在与 target 上来确认通知类型 新增还是修改
* 最核心部分就是 执行 trigger 函数派发通知

## trigger

* 主要做了 4件事
  * 从 targetMap 中获取 target 对应的依赖集合 depsMap
  * 创建运行的 effects 集合
  * 根据 key 从 depsMap 中找到对应的 effects 添加到  effects 集合中
  * 遍历 effects 执行相关的副作用函数
* 因此每次一执行 trigger 函数 就是根据 target 和 key 从 targetMap 中找到所有相关的副作用函数 并遍历执行一次

## effect

* effect 内部通过执行 createReactiveEffect 函数创建一个新的 effect 函数  可以叫做 reactiveEffect 函数 并且给它添加一些新的属性
* effect 函数支持传入一个配置参数 以支持更多的功能

## reactiveEffect 副作用函数

* reactiveEffect 函数就是响应式的副作用函数 当执行 trigger 过程派发通知的时候 执行 effect 的时候就是 reactiveEffect
* 只做了两件事
  * 让全局的 reactiveEffect 指向本身
  * 执行被包装的原始函数 fn
