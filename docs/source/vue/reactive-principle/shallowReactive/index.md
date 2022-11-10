---
createTime: 2022/10/23
tag: 'Vue源码'
---
# shallowReactive API

* reactive  和 shallowReactive 主要区别相当于 baseHandlers 和 collectionHandlers 的区别
* 对于普通对象和数组类型数据的 Proxy 处理器对象  shallowReactive 函数传入的是 baseHandlers 的值是  shallowReactiveHandlers

```ts
export function shallowReactive<T extends object>(
  target: T
): ShallowReactive<T> {
  return createReactiveObject(
    target,
    false,
    shallowReactiveHandlers,
    shallowCollectionHandlers,
    shallowReactiveMap
  )
}
```

## shallowReactiveHandlers

* 是基于 mutableHandlers 的基础上进行拓展
* 修改了 get 和 set 函数的实现  实际执行的是 shallowGet shallowSet

```ts
export const shallowReactiveHandlers = /*#__PURE__*/ extend(
  {},
  mutableHandlers,
  {
    get: shallowGet,
    set: shallowSet
  }
)

```

## shallowGet

* 也是通过  createGetter 第二个参数传递是 true
* 第二个参数传递是 true   即使 返回的 res 的值是对象类型 也不会通过递归变成响应式  只会把对象的最外层属性变成响应式
* 在初始化 props 到过程中  就是对 instance.props 求值后 就是通过 shallowReactive 把它变成响应式

```ts
const shallowGet = /*#__PURE__*/ createGetter(false, true)

function createGetter(isReadonly = false, shallow = false) {
  return function get(target: Target, key: string | symbol, receiver: object) {
    if (key === ReactiveFlags.IS_REACTIVE) {
      return !isReadonly
    } else if (key === ReactiveFlags.IS_READONLY) {
      return isReadonly
    } else if (key === ReactiveFlags.IS_SHALLOW) {
      return shallow
    } else if (
      key === ReactiveFlags.RAW &&
      receiver ===
        (isReadonly
          ? shallow
            ? shallowReadonlyMap
            : readonlyMap
          : shallow
          ? shallowReactiveMap
          : reactiveMap
        ).get(target)
    ) {
      return target
    }

    const targetIsArray = isArray(target)

    if (!isReadonly && targetIsArray && hasOwn(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, receiver)
    }

    const res = Reflect.get(target, key, receiver)

    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res
    }

    if (!isReadonly) {
      track(target, TrackOpTypes.GET, key)
    }

    if (shallow) {
      return res
    }

    if (isRef(res)) {
      // ref unwrapping - skip unwrap for Array + integer key.
      return targetIsArray && isIntegerKey(key) ? res : res.value
    }

    if (isObject(res)) {
      // Convert returned value into a proxy as well. we do the isObject check
      // here to avoid invalid value warning. Also need to lazy access readonly
      // and reactive here to avoid circular dependency.
      return isReadonly ? readonly(res) : reactive(res)
    }

    return res
  }
}
```
