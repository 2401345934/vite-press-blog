---
createTime: 2022/11/12
tag: 'Vue源码'
---

# 运行时的优化

## openBlock

* vue3 在运行时设计了一个 blockStack 和 currentBlock  
* blockStack 表示一个 block tree 因为要考虑嵌套的情况  
* currentBlock 表示当前的 block
* openBlock 就是往当前的  blockstack 添加一个新的 block  作为 currentBlock
* 主要是用来收集 动态 vnode 节点 才能在 patch 阶段只识别动态节点 避免了不必要的静态节点对比提升性能
* 动态 vnode 节点是在执行 createBaseVNode 函数创建 vnode 对象的时候搜集的

```ts
export function openBlock(disableTracking = false) {
  blockStack.push((currentBlock = disableTracking ? null : []))
}
```

## createBaseVNode

* 会通过 patchFlag 判断 vnode 是不是一个动态节点 如果是 并且 isBlockTreeEnabled 大于 0 就把它添加到 currentBlock 中
* 这就是动态收集 vnode 到过程
* 还会判断 isBlockNode 到值 如果是 true 不会添加到 currentBlock

```ts
function createBaseVNode(
  type: VNodeTypes | ClassComponent | typeof NULL_DYNAMIC_COMPONENT,
  props: (Data & VNodeProps) | null = null,
  children: unknown = null,
  patchFlag = 0,
  dynamicProps: string[] | null = null,
  shapeFlag = type === Fragment ? 0 : ShapeFlags.ELEMENT,
  isBlockNode = false,
  needFullChildrenNormalization = false
) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null
  } as VNode

  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children)
    // normalize suspense children
    if (__FEATURE_SUSPENSE__ && shapeFlag & ShapeFlags.SUSPENSE) {
      ;(type as typeof SuspenseImpl).normalize(vnode)
    }
  } else if (children) {
    // compiled element vnode - if children is passed, only possible types are
    // string or Array.
    vnode.shapeFlag |= isString(children)
      ? ShapeFlags.TEXT_CHILDREN
      : ShapeFlags.ARRAY_CHILDREN
  }

  // validate key
  if (__DEV__ && vnode.key !== vnode.key) {
    warn(`VNode created with invalid key (NaN). VNode type:`, vnode.type)
  }

  // track vnode for block tree
  if (
    isBlockTreeEnabled > 0 &&
    // avoid a block node from tracking itself
    !isBlockNode &&
    // has current parent block
    currentBlock &&
    // presence of a patch flag indicates this node needs patching on updates.
    // component nodes also should always be patched, because even if the
    // component doesn't need to update, it needs to persist the instance on to
    // the next vnode so that it can be properly unmounted later.
    (vnode.patchFlag > 0 || shapeFlag & ShapeFlags.COMPONENT) &&
    // the EVENTS flag is only for hydration and if it is the only flag, the
    // vnode should not be considered dynamic due to handler caching.
    vnode.patchFlag !== PatchFlags.HYDRATE_EVENTS
  ) {
    currentBlock.push(vnode)
  }

  if (__COMPAT__) {
    convertLegacyVModelProps(vnode)
    defineLegacyVNodeProperties(vnode)
  }

  return vnode
}
```

## createElementBlock

* 本质就是通过 setupBlock 函数封装 createBaseVNode 函数生成的 vnode 将其变成一个 block vnode
* 首先执行 createBaseVNode 创建一个 vnode 节点  最后一个参数 true 表示是一个 block vnode
* 不会把自身当作一个动态 vnode 收集到 currentBlock
* 如何执行 setupBlock 收集动态子节点 的 currentBlock 保留到当前的 block vnode 的 dynamicChildren 中方便后续 patch 过程访问动态子节点
* 最后把当前 block 恢复到 父 block  如果 父 block 存在 那么把当前 block vnode 作为动态节点去添加到父 block 中
  * 这样构造了 block tree
* block 的创建是执行了  createBlock 函数完成的

```ts
export function createElementBlock(
  type: string | typeof Fragment,
  props?: Record<string, any> | null,
  children?: any,
  patchFlag?: number,
  dynamicProps?: string[],
  shapeFlag?: number
) {
  return setupBlock(
    createBaseVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      shapeFlag,
      true /*isBlock*/
    )
  )
}
```

## patchBlockChildren

* 主要是用来遍历新的动态子节点数组 拿到对应的新旧动态子节点 执行 patch 更新子节点
* 更新子节点会遇到 是动态 vnode  还是 block vnode
  * 如果是 动态 vnode  那么它的 dynaimcChildren 为 null  由于 optimize 是 true  无需做其他
  * 如果是 block vnode  会拥有 dynaimcChildren 需要递归执行  patchBlockChildren
  * 通过递归可以完成组件下所有动态节点的更新

```ts
const patchBlockChildren: PatchBlockChildrenFn = (
    oldChildren,
    newChildren,
    fallbackContainer,
    parentComponent,
    parentSuspense,
    isSVG,
    slotScopeIds
  ) => {
    for (let i = 0; i < newChildren.length; i++) {
      const oldVNode = oldChildren[i]
      const newVNode = newChildren[i]
      // Determine the container (parent element) for the patch.
      const container =
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        oldVNode.el &&
        // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (oldVNode.type === Fragment ||
          // - In the case of different nodes, there is going to be a replacement
          // which also requires the correct parent container
          !isSameVNodeType(oldVNode, newVNode) ||
          // - In the case of a component, it could contain anything.
          oldVNode.shapeFlag & (ShapeFlags.COMPONENT | ShapeFlags.TELEPORT))
          ? hostParentNode(oldVNode.el)!
          : // In other cases, the parent container is not actually used so we
            // just pass the block element here to avoid a DOM parentNode call.
            fallbackContainer
      patch(
        oldVNode,
        newVNode,
        container,
        null,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        true
      )
    }
  }
```
