---
createTime: 2022/10/30
tag: 'Vue源码'
---
# 创建 AST 根节点

* 子节点解析完毕  baseParse 过程就剩最后一步创建 AST 根节点

## createRoot

* createRoot 会返回一个 js 对象作为 AST 的根节点
  * type ： 0 表示是一个根节点类型
  * children： 就是前面解析的 子节点 nodes 数组
* 根节点还添加了其他的属性

```ts
function createRoot(options: Partial<RootNode> = {}): RootNode {
  return {
    type: NodeTypes.ROOT,
    children: [],
    helpers: [],
    components: [],
    directives: [],
    imports: [],
    hoists: [],
    cached: 0,
    temps: 0,
    codegenNode: createSimpleExpression(`null`, false),
    loc: locStub,
    ...options
  }
}
```
