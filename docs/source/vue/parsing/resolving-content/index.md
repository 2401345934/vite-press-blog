---
createTime: 2022/10/30
tag: 'Vue源码'
---
# 创建解析上下文

## createParserContext

* 解析上下文实际就是一个 js 对象 维护着解析过程中的上下文
* options 表示 解析相关配置
  * 会根据传入的配置和默认的配置做一些合并
  * 在后续解析的过程中 会始终维护和更新这个解析上下文
  * 表示当前解析的状态
* 创建完解析上下文之后 开始解析子节点

```ts
function createParserContext(
  content: string,
  rawOptions: ParserOptions
): ParserContext {
  const options = extend({}, defaultParserOptions)

  let key: keyof ParserOptions
  for (key in rawOptions) {
    // @ts-ignore
    options[key] =
      rawOptions[key] === undefined
        ? defaultParserOptions[key]
        : rawOptions[key]
  }
  return {
    options,
    column: 1,
    line: 1,
    offset: 0,
    originalSource: content,
    source: content,
    inPre: false,
    inVPre: false,
    onWarn: options.onWarn
  }
}
```
