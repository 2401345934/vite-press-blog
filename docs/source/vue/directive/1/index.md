---
createTime: 2022/11/17
tag: 'Vue源码'
---
# 自定义指令的定义

* 自定义指令本质就是一个 js 对象
* 对象上面挂载了一些 钩子函数  

## 钩子函数

### created

* 绑定元素 的 attribute 或 事件侦听器被应用之前调用
* 当指令需要添加一些事件侦听器  并且这些侦听器要在 v-on 事件侦听器之前调用 可以用 created

### beforeMount

* 当指令第一次绑定到元素
* 挂载父组件之前调用

### mounted

* 绑定元素的父组件被挂载后调用

### beforeUpdate

* 更新包含指令元素的 vnode 之前调用

### updated

* 包含指令元素的 vnode 及其子元素的 vnode 更新后调用

### beforeUnmount

* 卸载绑定元素的父组件之前调用

### unmounted

* 指令与元素解除绑定  并且 父组件已经卸载掉时候调用
