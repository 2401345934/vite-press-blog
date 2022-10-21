
# 组件的 props

## props 配置的标准化

* 标准化 props 的配置是通过 normalizePropsOptions 函数完成的
* normalizePropsOptions 会先处理 mixin 和 extends 两个特殊属性 都是拓展组件的定义 需要对其定义的 props 递归执行 normalizePropsOptions
* 会对定义不同形式的 props 进行转换 最终返回标准化结果
* 会用 comp._props 进行缓存 对一个组件重复执行 normalizePropsOptions 会返回 缓存的结果
* 最后使用 instance.propsOptions 存储标准化结果 方便后续统一处理

## props 值的初始化

* 有了标准化的 props 配置 还需要根据配置对父组件传递的 props 数据做一些求值和验证 然后把结果 赋值到组件的实例上 过程就是 props 的初始化
* 初始化就是 通过 initProps 函数完成的
* initProps 主要是 设置 props 的值 验证 props 是否合法 把 props 变成响应式的 然后添加到实例的 instance.props上

## 设置props

* 通过 setFullProps 实现
* setFullProps 主要目的就是遍历 props 数据求值 以及对需要转换的 props 求值
* 该过程就是遍历 rawProps 获取每个 key 对应的值并赋值给 props 或者 attrs
* 因为我们在标准化 props  配置的过程中已经把 props 定义的 key 转换成了 驼峰形式
* 然后对比查看传递的props数据是否已经在配置中定义
  * 如果已经定义 就把值赋值到 props 对象中
  * 如果没有定义 判断这个 key 是否为非事件派发相关
  * 若是 则把它的值赋到 attrs 对象中作为普通属性

## 验证props

* validateProp 函数用来检测 props 求的的值 是否合法 如不匹配则会抛出警告
* validateProp 首先验证 required 情况  然后验证 prop 值的类型

## 响应式处理

* 通过 shallowReactive API变成响应式

## props 的更新

* props 数据的更新 会触发组件的重新

## 触发子组件的重新渲染

* 组件的重新渲染会触发 patch 流程 然后遍历子节点 递归 patch 遇到组件节点 执行 updateComponent 函数
* 会执行 shouldUpdateComponent 函数判断是否需要更新 内部会对 props 进行对比
* 这是触发子组件重新渲染的原因  
* 然后也需要更新 子组件实例的 instance.props

## 更新 instance.props

* 其实就是执行 componentUpdateFn 组件副作用函数
* 在更新组件的时候 会判断是否有 instance.next 代表新的组件 vnode
* 如果有 会执行 updateComponentPreRender 更新组件 vnode 节点信息
* updateComponentPreRender 其中会执行 updateProps 更新 props 数据
* updateProps 把父组件渲染时获得的 props 新值 更新到子组件实例的 instnace.props 中
  * 只需要对比 动态的 props 数据更新
  * 静态的 props 会跳过

## 把 instance.props 变成响应式的

* 为什么使用 shallowReactive 而不是 reactive
* shallowReactive 不会递归执行 reactive 只劫持最外一层对象的属性
* shallowReactive 性能更好 props 更新过程只需要修改最外层属性

## 对象类型 props 数据的更新

* 对象类型的 props 数据变化 也会触发子组件的重新渲染
* 子组件的渲染过程中 访问 对象props 相当于 子组件的渲染副作用函数 render  effect 订阅了这个数据的变化
* 当修改 props 得数据的时候 就会触发 render effect 的再次执行 从而导致子组件的重新渲染

## 总结

* props 在组件设置是一个非常重要的特性 允许组件的使用者在外层传递 props
* 组件内部就可以根据 props 实现各种功能
* 由于编写 props 到方式非常灵活 需要对他进行一层标准化 方便后续处理
* props 的初始化流程 包括props 的求值 验证 已经响应式处理
* 当组件传入的 props 数据发生变化 会触发子组件的重新渲染
