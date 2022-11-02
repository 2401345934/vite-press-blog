---
createTime: 2022/11/01
tag: 'Vue源码,AST'
---
# AST 转换

* 对于模版的编译会先通过 baseParse 生成一个 AST 对象
* 然后针对这个 对象进行一定的转换

## getBaseTransformPreset

* 会执行 getBaseTransformPreset 函数获取节点和指令转换的函数
* 然后调用 transform 函数做 AST 转换 把这些节点和指令转换成函数作为配置的属性参数传入

## transform

* 核心流程 主要做了四件事
* 创建 tramsform 上下文
* 遍历 AST 节点
* 静态提升
* 创建根代码生成节点
