---
createTime: 2022/10/23
tag: 'Vue源码'
---
# ref

* ref 函数返回执行 createRef 函数的返回值
* 在 createRef 内部 处理了嵌套 ref 的情况  和已经是响应式对象的处理 直接返回
* 接着返回了 RefImpl 对象的实例

## ref 的优化

* 主要是对 ref 对象的 value 属性执行依赖收集和派发通知的逻辑
* 在 3.2 版本 ref 的实现中 依赖收集部分由原先的 track 函数 变成了 trackRefValue

```ts

export function ref<T extends object>(
  value: T
): [T] extends [Ref] ? T : Ref<UnwrapRef<T>>
export function ref<T>(value: T): Ref<UnwrapRef<T>>
export function ref<T = any>(): Ref<T | undefined>
export function ref(value?: unknown) {
  return createRef(value, false)
}

function createRef(rawValue: unknown, shallow: boolean) {
  if (isRef(rawValue)) {
    return rawValue
  }
  return new RefImpl(rawValue, shallow)
}

class RefImpl<T> {
  private _value: T
  private _rawValue: T

  public dep?: Dep = undefined
  public readonly __v_isRef = true

  constructor(value: T, public readonly __v_isShallow: boolean) {
    this._rawValue = __v_isShallow ? value : toRaw(value)
    this._value = __v_isShallow ? value : toReactive(value)
  }

  get value() {
    trackRefValue(this)
    return this._value
  }

  set value(newVal) {
    const useDirectValue =
      this.__v_isShallow || isShallow(newVal) || isReadonly(newVal)
    newVal = useDirectValue ? newVal : toRaw(newVal)
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal
      this._value = useDirectValue ? newVal : toReactive(newVal)
      triggerRefValue(this, newVal)
    }
  }
}

```

## trackRefValue

* 直接把 ref 相关依赖保存到 dep 属性中 在 track 函数的实现 会把依赖保存在 全局的 targetMap 中
* track 函数内部可能需要多次判断和设置逻辑  而把依赖保存到 ref  对象的 dep 属性中省去了一系列判断和设置 优化了性能
* ref 实现的派发通知的部分由原先的 trigger 函数 变成了 triggerRefValue 中
* 由于可以直接从 ref 属性中获取其所有的依赖并且遍历执行 不需要执行 trigger 函数的额外逻辑 性能提高

```ts
export function trackRefValue(ref: RefBase<any>) {
  if (shouldTrack && activeEffect) {
    ref = toRaw(ref)
    if (__DEV__) {
      trackEffects(ref.dep || (ref.dep = createDep()), {
        target: ref,
        type: TrackOpTypes.GET,
        key: 'value'
      })
    } else {
      trackEffects(ref.dep || (ref.dep = createDep()))
    }
  }
}
```

## unref

* template 中访问 响应式对象 不需要 .value 访问  而是在 setupResult 处理的时候 赋值给组件实例中的 setupState 属性
* 因为初始化的过程中会创建渲染上下文代理  所以在 render 函数中访问 _ctx.xxx 就相当于 访问了 instance.setupState.xxx
* unref 的实现就是判断是不是响应式对象 如果是 直接返回 响应式的对象的 value 值 不是就直接返回 原对象

```ts
export function unref<T>(ref: T | Ref<T>): T {
  return isRef(ref) ? (ref.value as any) : ref
}
```
