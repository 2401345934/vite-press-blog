---
createTime: 2022/10/23
tag: 'Vue源码'
---
# 响应式实现的优化 Vue3.2 版本

## 依赖收集的优化

* 之前每次执行副作用函数 都需要先执行 cleanup 清除依赖  然后在副作用函数执行的过程重新收集依赖
  * 过程涉及大量的对集合 set 对添加和删除操作 存在优化空间
* 为了减少集合的添加和删除操作 标识了每个依赖集合的状态 比如：新收集的 还是收集过的

## 设计的全局变量

* effectTrackDepth
  * 执行 effect函数的深度
* trackOpBit
  * 标识依赖的收集状态
* maxMarkerBits
  * 最大标记的位数
* effectTrackDepth

## effect 函数实现优化

* 内部使用 ReactiveEffect 类创建了  _effect实例 并且让函数返回 runner 指向 ReactiveEffect类的 run 函数
* 也就是说在执行副作用函数 effect 的时候 实际执行的就是 run 函数
* 收集的依赖也从 effect 函数 变成了 _effect 对象
* 当 run 函数执行的时候 cleanup 函数 不是再默认执行 会通过 包装好的函数 fn 执行前 先执行       trackOpBit = 1 << ++effectTrackDepth 记录 trackOpBit
* 然后看递归的深度是否超过了 maxMarkerBirts 如果超过 执行老的 cleanup 逻辑
* 没超过 执行 initDepMarkers 给依赖打标记

## 优化结果

* 相比于优化前 每次执行 effect 函数 都需要清空依赖 添加依赖的过程
* 优化后 每次执行 effect 函数 标记依赖的状态 不会重复收集已经收集的依赖 执行 effect 函数之后 还会移除已被收集但在新一轮没有被收集的依赖
* 优化了减少对于 dep 依赖集合的操作 自然的性能提高了

## trackOpBit 的设计

* 标记依赖的 trackOpBit 每次执行计算的时候采用了 左移运算符 trackOpBit = 1 << ++effectTrackDepth  并且在赋值 的时候做了运算
* 为什么要这样 ？
  * 因为 effect 执行会有递归的情况 可以通过这种方式记下每个层级的依赖标记情况
* 在判断 dep 是否已经收集了当前层的依赖 使用了 wasTracked 函数
  * 内部通过 与运算 的结果是否大于 0 来判断当前层级依赖是否已经收集过了
