---
createTime: 2022/11/02
tag: 'Vue源码,AST'

---
# 创建根节点的代码生成节点

## createRootCodegen

* createRootCodegen 目的就是 为 root 这个虚拟的 ast 根节点创建一个代码生成节点
* 如果 root 的子节点 children 是单个元素节点 就将 root 转换成一个 block 节点 把这个 child 的 codegenNode 赋值给 root 的  codegenNode
* 如果 root 的子节点 children 是多个节点  返回一个 fragement 的代码生成节点 并赋值给 root 的 codegenNode
* createRootCodegen 完成之后 把转换 ast 节点的过程中创建的一些上下文数据赋值给 root 节点对应的属性
