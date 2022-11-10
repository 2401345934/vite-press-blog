---
createTime: 2022/10/23
tag: 'Vue源码'
---
# readonly

* readonly  和 reactive 主要区别 就是执行 createReactiveObject 函数的参数 isReadonly 不同
* 其次在于 baseHandlers 和 collectionHandlers 的区别
* 对于普通对象和数组类型数据的 Proxy 处理器对象  readonly 函数传入的是 baseHandlers 的值是  readonlyHandlers
* 执行 createReactiveObject 的时候 如果 isReadonly是 true 并且传递的参数 target 已经是响应式对象了 仍然可以变只读的对象

```ts

/**
 * Creates a readonly copy of the original object. Note the returned copy is not
 * made reactive, but `readonly` can be called on an already reactive object.
 */
export function readonly<T extends object>(
  target: T
): DeepReadonly<UnwrapNestedRefs<T>> {
  return createReactiveObject(
    target,
    true,
    readonlyHandlers,
    readonlyCollectionHandlers,
    readonlyMap
  )
}

```

## readonlyHandlers

* readonlyHandlers 和 mutableHandlers 区别主要是在于 get set 和 deleteProperty 这三个函数、
* 只读的响应式对象是不允许修改或删除属性的
* 所以在非生产韩剧下 set 和 deleteProperty 函数实现都会发出警告 提示用户对象是只读的

```ts
export const readonlyHandlers: ProxyHandler<object> = {
  get: readonlyGet,
  set(target, key) {
    if (__DEV__) {
      warn(
        `Set operation on key "${String(key)}" failed: target is readonly.`,
        target
      )
    }
    return true
  },
  deleteProperty(target, key) {
    if (__DEV__) {
      warn(
        `Delete operation on key "${String(key)}" failed: target is readonly.`,
        target
      )
    }
    return true
  }
}
```

## readonlyGet

* 就是 createGetter(true) 的返回值
* readonly  和 reactive  最大区别就是 readonly 不做依赖收集 因为只读的对象不会被修改 所以不需要追踪变化

```ts
const readonlyGet = /*#__PURE__*/ createGetter(true)
```
