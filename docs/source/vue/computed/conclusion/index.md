---
createTime: 2022/11/02
tag: 'Vue源码'

---
# 计算属性 computed 总结

* 计算属性的本质其实就是响应式对象  通常会依赖单个或者多个响应式对象的值
* 计算属性也支持嵌套 可以由其他计算属性的值计算的来
* 计算属性的核心就是 延时计算和缓存 当依赖发生变化 仅仅标记计算属性内部的 _dirtry  计算属性不会重新计算
  * 当计算属性值被访问的时候 就会判断内部的 _dirtry 值 如果为 false 则直接返回上一次的计算结果
  * 如果为 true 运行内部的 effect.run 函数 重新计算