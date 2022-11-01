---
createTime: 2022/11/01
tag: 'Vue源码'
---
# 遍历 AST 节点

* 通过 traverseNode 函数完成
* 递归遍历 ast 节点 针对每个节点执行一系列的转换函数  有些还会设计退出函数
* 当执行完函数后 会返回一个或多个退出函数
* vue 内置了很多转换函数  处理指令  表达式 元素节点  文本节点等不同的特性

## element 节点转换函数

* transformElement 函数 实现
* 会返回一个退出函数  会在该元素节点的子节点逻辑处理完毕之后 退出
* 判断这个节点是不是一个 block 节点
  * 为了运行时的更新优化 vue3 设计了一个 block tree 的概念
  * 将模版基于动态节点指令进行切割的嵌套区块
  * 每个区块需要一个 array 追踪自身包含的动态节点
  * 借助 block 节点 将 node 的更新性能 由模版整体大小提升为了 动态内容的数量相关 极大的优化了 diff
* 然后处理节点的 props
  * 从 props 对象进一步解析出指令 vnodeDirectives 动态属性  dynamicPropsNames 以及更新标识 patchFlag
  * patchFlag 主要用于标识节点更新的类型  
* 处理节点的 chilren
  * 对于组件节点而言 如果有子节点 说明就是组件的插槽会有一些内置组件的处理逻辑
  * 对于一个普通元素节点来说 直接把节点的 chilren 属性 拿给  vnodeChilren 就行
  * 当节点只有一个子节点 并且是一个普通文本节点 插值 表达式  就直接把值 赋值给 vnodeChildren

## 表达式节点转换函数

* transformExporession 函数实现
* 主要就是转换插值和元素节点中的动态表达式
* 内部主要通过 processExporession 函数完成
* 模版 执行 parse 生成的表达式节点 node.content 是一个简单的表达式
  * 通过 processExporession 处理后 变成了一个复合表达式的对象
* processExporession 内部依赖了 @babel/parse 解析表达式生成 ast 节点
  * 依赖了 estree-walker 遍历了 ast 节点 然后分析判断是否需要对节点添加前缀
  * 接着修改 ast 节点 转换生成新的表达式对象
* 因为 @babel/parse 通常是在 node js 使用 本身体积很大  所以生产环境web端不会引入这个库 因为生产环境也不需要对表达式进行转换
  * web 生产环境 运行时编译会使用 with 方式

## Text 节点转换函数

* transformText 函数实现
* 只处理 根节点 元素节点 v-for 以及 v-if 分支相关节点
* 会返回一个退出函数  因为要保证所有表达式节点都已经处理完毕才执行转换逻辑
* 目的就是 合并一些相邻的文本节点 然后为内部每一个文本节点创建一个代码生成节点  
* 在内部 静态文本节点和动态插值节点都被看作成一个文本节点 所以函数首先遍历节点的子节点 然后把子节点相邻的文本节点合并成一个
* 合并完子文本节点后 判断是不是只带有单个文本子元素的纯元素节点 且元素上不存在自定义指令 那么不需要转换 因为  运行时可用通过设置元素的 textContent 直接更新文本
