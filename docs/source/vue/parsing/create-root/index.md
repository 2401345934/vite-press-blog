# 创建 AST 根节点

* 子节点解析完毕  baseParse 过程就剩最后一步创建 AST 根节点

## createRoot

* createRoot 会返回一个 js 对象作为 AST 的根节点
  * type ： 0 表示是一个根节点类型
  * children： 就是前面解析的 子节点 nodes 数组
* 根节点还添加了其他的属性