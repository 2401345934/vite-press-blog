---
createTime: 2022/10/23
tag: 'Vue源码'
---
# 依赖收集

* 依赖收集发生在数据的访问阶段 当数据被访问 会执行 get 函数
* get 函数 是执行 createGetter 函数的返回值  isReadonly 默认 false

## get

* get 函数主要做了 4件事
* 对特殊的 key 做了 代理  比如： __v_raw 返回原始对象 target
* 如果 target 是数组 并且命中了 arrayInstrumentations 执行内部对应函数
* 通过 Reflect.get 函数求值 并执行  track 函数收集依赖
* 对象属性访问的时候才会判断子属性的类型 决定是否要递归执行 reactive

## arrayInstrumentations

* 重写了数组中的 includes indexOf lastIndexOf 函数
* 当对响应式对象调用 这三个函数 就会 对数组的每一个 元素都进行代理 做依赖收集

## track

* 创建了全局的 targetMap作为原始数据对象的 Map
* 键是 target 值是 depsMap 用来作为依赖的 Map
* depsMap 键是 target 的key 值是 dep 集合
* dep 集合 中存储的是依赖的副作用函数
* 每次执行  track 函数 就会把当前激活副作用函数 activeEffect 作为依赖
* 收集到 与target 相关的 depsMap 对应 key 下的依赖集合 dep 中

```ts

const arrayInstrumentations = /*#__PURE__*/ createArrayInstrumentations()

function createArrayInstrumentations() {
  const instrumentations: Record<string, Function> = {}
  // instrument identity-sensitive Array methods to account for possible reactive
  // values
  ;(['includes', 'indexOf', 'lastIndexOf'] as const).forEach(key => {
    instrumentations[key] = function (this: unknown[], ...args: unknown[]) {
      const arr = toRaw(this) as any
      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, TrackOpTypes.GET, i + '')
      }
      // we run the method using the original args first (which may be reactive)
      const res = arr[key](...args)
      if (res === -1 || res === false) {
        // if that didn't work, run it again using raw values.
        return arr[key](...args.map(toRaw))
      } else {
        return res
      }
    }
  })
  // instrument length-altering mutation methods to avoid length being tracked
  // which leads to infinite loops in some cases (#2137)
  ;(['push', 'pop', 'shift', 'unshift', 'splice'] as const).forEach(key => {
    instrumentations[key] = function (this: unknown[], ...args: unknown[]) {
      pauseTracking()
      const res = (toRaw(this) as any)[key].apply(this, args)
      resetTracking()
      return res
    }
  })
  return instrumentations
}
```
