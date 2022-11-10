---
createTime: 2022/10/23
tag: 'Vue源码'
---

# reactive API

* reactive 函数拥有单个参数 target 必须是对象或者数据类型
* 内部通过了 createReactiveObject 函数执行 把 target 变成一个响应式对象

```ts
export function reactive<T extends object>(target: T): UnwrapNestedRefs<T>
export function reactive(target: object) {
  // if trying to observe a readonly proxy, return the readonly version.
  if (isReadonly(target)) {
    return target
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  )
}

```

## createReactiveObject

* createReactiveObject 拥有 5个参数
  * target 表示待变成响应式对象的 对象或者数组
  * isReadonly 是否创建只读对象
  * baseHandles 表示普通对象和数组类型数据的响应式对象处理器
  * collectionHandles 表示集合类型数据的响应式处理器
  * proxyMap 表示原始对象和响应式对象的缓存映射图
* createReactiveObject 主要做
  * 判断 target 是不是对象或者数组  不是直接返回
  * 如果已经是响应式对象 再次执行 reactive 直接返回该响应式对象
    ■ 内部通过 target.__v_raw 属性判断 target 是否已经是响应式对象
  * 如果同一个原始数据多次执行 reactive 返回相同的响应式对象
  * 对 原始对象的类型进一步进行限制  会通过 getTargetType 函数判断 比如 Date 类型 RegExp 类型 promise 类型 都是不可变成响应式对象 直接返回
* 通过 proxy 劫持 target 对象 变成响应式  把 new Proxy 创建的 proxy 实例称做响应式对象
  * 如果是集合类型数据 使用 collectionHandles
  * 如果是非集合类型数据 使用 baseHandles
* 把原始对象 target 作为 key 响应式对象 proxy 作为 value 存储到 map 类型的对象 proxyMap
  * 这就是为什么多次执行 reactive 函数返回同一个对象

```ts

function createReactiveObject(
  target: Target,
  isReadonly: boolean,
  baseHandlers: ProxyHandler<any>,
  collectionHandlers: ProxyHandler<any>,
  proxyMap: WeakMap<Target, any>
) {
  if (!isObject(target)) {
    if (__DEV__) {
      console.warn(`value cannot be made reactive: ${String(target)}`)
    }
    return target
  }
  // target is already a Proxy, return it.
  // exception: calling readonly() on a reactive object
  if (
    target[ReactiveFlags.RAW] &&
    !(isReadonly && target[ReactiveFlags.IS_REACTIVE])
  ) {
    return target
  }
  // target already has corresponding Proxy
  const existingProxy = proxyMap.get(target)
  if (existingProxy) {
    return existingProxy
  }
  // only specific value types can be observed.
  const targetType = getTargetType(target)
  if (targetType === TargetType.INVALID) {
    return target
  }
  const proxy = new Proxy(
    target,
    targetType === TargetType.COLLECTION ? collectionHandlers : baseHandlers
  )
  proxyMap.set(target, proxy)
  return proxy
}

```

## mutableHandlers

* 劫持了对 proxy 对象对一些操作
* 访问对象属性会触发 get 函数
* 设置对象属性会触发 set 函数
* 删除对象属性会触发 deleteProperty 函数
* in 操作符会触发 has 函数
* Object.getOwnPropertyNames 访问对象属性触发 ownKeys 函数

```ts
export const mutableHandlers: ProxyHandler<object> = {
  get,
  set,
  deleteProperty,
  has,
  ownKeys
}

```
