---
createTime: 2022/10/30
tag: 'Vue源码'
---
# 生成 AST

## vue3 的编译场景

* web 编译
* SSR 编译

## compile

* web 端主要是通过 compile 函数实现模版编译
* compile 拥有两个参数
  * template 待编译的模版字符串
  * options 一些配置信息
* compile 内部通过 baseCompile 函数完成编译工作 可以看到 baseCompile 在参数 options 的基础上又拓展了一些配置

```ts
export function compileSFCScript(
  src: string,
  options?: Partial<SFCScriptCompileOptions>,
  parseOptions?: SFCParseOptions
) {
  const { descriptor } = parse(src, parseOptions)
  return compileScript(descriptor, {
    ...options,
    id: mockId
  })
}
```

## baseCompile

* 主要做了三件事
  * 解析 template 生成 AST  抽象语法树
  * AST 转换
  * 生成代码

```ts
// we name it `baseCompile` so that higher order compilers like
// @vue/compiler-dom can export `compile` while re-exporting everything else.
export function baseCompile(
  template: string | RootNode,
  options: CompilerOptions = {}
): CodegenResult {
  const onError = options.onError || defaultOnError
  const isModuleMode = options.mode === 'module'
  /* istanbul ignore if */
  if (__BROWSER__) {
    if (options.prefixIdentifiers === true) {
      onError(createCompilerError(ErrorCodes.X_PREFIX_ID_NOT_SUPPORTED))
    } else if (isModuleMode) {
      onError(createCompilerError(ErrorCodes.X_MODULE_MODE_NOT_SUPPORTED))
    }
  }

  const prefixIdentifiers =
    !__BROWSER__ && (options.prefixIdentifiers === true || isModuleMode)
  if (!prefixIdentifiers && options.cacheHandlers) {
    onError(createCompilerError(ErrorCodes.X_CACHE_HANDLER_NOT_SUPPORTED))
  }
  if (options.scopeId && !isModuleMode) {
    onError(createCompilerError(ErrorCodes.X_SCOPE_ID_NOT_SUPPORTED))
  }

  const ast = isString(template) ? baseParse(template, options) : template
  const [nodeTransforms, directiveTransforms] =
    getBaseTransformPreset(prefixIdentifiers)

  if (!__BROWSER__ && options.isTS) {
    const { expressionPlugins } = options
    if (!expressionPlugins || !expressionPlugins.includes('typescript')) {
      options.expressionPlugins = [...(expressionPlugins || []), 'typescript']
    }
  }

  transform(
    ast,
    extend({}, options, {
      prefixIdentifiers,
      nodeTransforms: [
        ...nodeTransforms,
        ...(options.nodeTransforms || []) // user transforms
      ],
      directiveTransforms: extend(
        {},
        directiveTransforms,
        options.directiveTransforms || {} // user transforms
      )
    })
  )

  return generate(
    ast,
    extend({}, options, {
      prefixIdentifiers
    })
  )
}
```

## 生成 AST

* 在计算机科学中  AST 是源代码语法结构的一种抽象表示
* 以树状的形式表示编程语言的语法结构
* 树上的每一个节点都表示源代码中的一种结构
* AST 是树状结构 对于树中的每个节点
  * type字段描述节点类型
  * tag 字段描述节点标签
  * props 字段描述节点属性
  * loc 字段描述节点代码位置相关信息
  * chilren 字段指向子节点对象数组
* AST 中的节点可以完整的描述在模版中所映射的节点信息
* AST 对象的根节点其实是一个虚拟节点  不会映射到一个具体节点 还包含了一些其他属性
  * 会在后续转换到时候赋值
  * 在生成代码的时候用到

## 如果通过模版字符串生成 AST

* baseParse 函数完成
* 用于两个参数
  * content 要编译的模版字符串
  * options 编译的相关配置
* 主要做了三件事
  * 创建解析上下文
  * 解析子节点
  * 创建AST 根节点

```ts
export function baseParse(
  content: string,
  options: ParserOptions = {}
): RootNode {
  const context = createParserContext(content, options)
  const start = getCursor(context)
  return createRoot(
    parseChildren(context, TextModes.DATA, []),
    getSelection(context, start)
  )
}

```
