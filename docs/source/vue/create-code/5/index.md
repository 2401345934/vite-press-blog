---
createTime: 2022/11/10
tag: 'Vue源码'
---

# 生成资源声明代码

## 在渲染函数内部 先生成资源声明代码

```ts
 // generate asset resolution statements
  if (ast.components.length) {
    genAssets(ast.components, 'component', context)
    if (ast.directives.length || ast.temps > 0) {
      newline()
    }
  }
  if (ast.directives.length) {
    genAssets(ast.directives, 'directive', context)
    if (ast.temps > 0) {
      newline()
    }
  }
 if (__COMPAT__ && ast.filters && ast.filters.length) {
    newline()
    genAssets(ast.filters, 'filter', context)
    newline()
  }

  if (ast.temps > 0) {
    push(`let`)
    for (let i = 0; i < ast.temps; i++) {
      push(`${i > 0 ?`, `: ``}_temp${i}`)
    }
  }
```

## genAssets

* 接下来通过 genAssets 生成自定义组件声明代码
* 函数内部调用了 helper函数 就是从 helperNameMap 查找对应的字符串  
* 会遍历 assets 数组 生成自定义组件声明代码  
* 过程中 会通过  toValidAssetId 包装
* 处理后 运行时就可以 通过 resolveComponent 解析到注册的自定义组件对象了 在后面创建组件 vnode 的时候 当作参数传入
* 生成资源声明代码之后就需要创建vnode 树的表达式 render 函数最终返回的是 vnode 树

```ts

function genAssets(
  assets: string[],
  type: 'component' | 'directive' | 'filter',
  { helper, push, newline, isTS }: CodegenContext
) {
  const resolver = helper(
    __COMPAT__ && type === 'filter'
      ? RESOLVE_FILTER
      : type === 'component'
      ? RESOLVE_COMPONENT
      : RESOLVE_DIRECTIVE
  )
  for (let i = 0; i < assets.length; i++) {
    let id = assets[i]
    // potential component implicit self-reference inferred from SFC filename
    const maybeSelfReference = id.endsWith('__self')
    if (maybeSelfReference) {
      id = id.slice(0, -6)
    }
    push(
      `const ${toValidAssetId(id, type)} = ${resolver}(${JSON.stringify(id)}${
maybeSelfReference ?`, true`: `` 
      })${isTS ? `!`: ``}`
    )
    if (i < assets.length - 1) {
      newline()
    }
  }
}

```

```ts

export function toValidAssetId(
  name: string,
  type: 'component' | 'directive' | 'filter'
): string {
  // see issue#4422, we need adding identifier on validAssetId if variable `name` has specific character
  return `_${type}_${name.replace(/[^\w]/g, (searchValue, replaceValue) => {
    return searchValue === '-' ? '_' : name.charCodeAt(replaceValue).toString()
  })}`
}
```
