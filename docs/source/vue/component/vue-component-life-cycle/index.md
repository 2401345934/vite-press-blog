---
createTime: 2022/10/24
tag: 'Vue源码'
---
# 组件的生命周期

* setup 函数替代了 vue2 中的 beforeCreate created 钩子函数

## vue3 钩子函数 vs vue2 钩子函数

* setup => beforeCreate
* setup => created
* onBeforeMount => beforeMount
* onMounted => mounted
* onBeforeUpdate => beforeUpdate
* onUpdated => updated
* onBeforeUnmount => beforeDestroy
* onUnmounted => destroyed
* onActivated => activated
* onDeactivated => deactivated
* onErrorCaptured => errorCaptured
* onRenderTracked => renderTracked
* onRenderTriggered => renderTtiggered

## 注册钩子函数

* 都是通过 createHook 注册
* 会返回一个函数 内部通过 injectHook 注册钩子函数

```ts
export function injectHook(
  type: LifecycleHooks,
  hook: Function & { __weh?: Function },
  target: ComponentInternalInstance | null = currentInstance,
  prepend: boolean = false
): Function | undefined {
  if (target) {
    const hooks = target[type] || (target[type] = [])
    // cache the error handling wrapper for injected hooks so the same hook
    // can be properly deduped by the scheduler. "__weh" stands for "with error
    // handling".
    const wrappedHook =
      hook.__weh ||
      (hook.__weh = (...args: unknown[]) => {
        if (target.isUnmounted) {
          return
        }
        // disable tracking inside all lifecycle hooks
        // since they can potentially be called inside effects.
        pauseTracking()
        // Set currentInstance during hook invocation.
        // This assumes the hook does not synchronously trigger other hooks, which
        // can only be false when the user does something really funky.
        setCurrentInstance(target)
        const res = callWithAsyncErrorHandling(hook, target, type, args)
        unsetCurrentInstance()
        resetTracking()
        return res
      })
    if (prepend) {
      hooks.unshift(wrappedHook)
    } else {
      hooks.push(wrappedHook)
    }
    return wrappedHook
  } else if (__DEV__) {
    const apiName = toHandlerKey(ErrorTypeStrings[type].replace(/ hook$/, ''))
    warn(
      `${apiName} is called when there is no active component instance to be ` +
        `associated with. ` +
        `Lifecycle injection APIs can only be used during execution of setup().` +
        (__FEATURE_SUSPENSE__
          ? ` If you are using async setup(), make sure to register lifecycle ` +
            `hooks before the first await statement.`
          : ``)
    )
  }
}
```

## injectHook

* 对用户注册的钩子函数 hook 做了一层封装
* 然后添加到一个数组中 并把数组保存到当前组件的实例的 target 上
* 不同类型的钩子函数会被保存到组件实例的不同属性上

```ts
export const createHook =
  <T extends Function = () => any>(lifecycle: LifecycleHooks) =>
  (hook: T, target: ComponentInternalInstance | null = currentInstance) =>
    // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
    (!isInSSRComponentSetup || lifecycle === LifecycleHooks.SERVER_PREFETCH) &&
    injectHook(lifecycle, (...args: unknown[]) => hook(...args), target)
```

## onBeforeMount 和 onMounted

* onBeforeMount 注册的 beforeMount 钩子函数 会在组件挂载之前执行
* onMounted 注册的 mounted 钩子函数会在组件挂载之后执行
* 在执行 patch 挂载组件之前 会检测组件实例是否有已注册的beforeMount 钩子函数 bm
  * 如果有 则通过 invokeArrayFns 执行  这里是一个数组 会遍历执行  因为用户可以注册多个 beforemount 函数
* 在执行 patch 挂载组件之后 会检测组件实例是否有已注册的 mounted 钩子函数 m
  * 如果有 则通过 quenePostRenderEffect  执行

## onBeforeUpdate 和 onUpdated

* onBeforeUpdate 注册的 beforeUpdate 钩子函数 会在组件更新之前执行
* onUpdated 注册的 updated 钩子函数会在组件更新之后执行
* 在执行 patch 更新组件之前 会检测组件实例是否有已注册的 beforeUpdate  钩子函数 bu
  * 如果有 则通过 invokeArrayFns 执行  
* 在执行 patch 更新组件之后 会检测组件实例是否有已注册的 updated 钩子函数 u
  * 如果有 则通过 quenePostRenderEffect  执行
* 父组件的更新不一定会导致子组件的更新 因为 vue js 更新的颗粒度是 组件级别的

## onBeforeUnmount 和 onUnmounted

* onBeforeUnmount 注册的 beforeUnMount 钩子函数 会在组件销毁之前执行
* onUnmounted 注册的 unmounted 钩子函数会在组件销毁之后执行
* 组件的销毁整体逻辑 其实就是 清理组件实例上绑定的 effects 副作用函数 和注册的副作用渲染函数 update 并且调用 unmount 销毁子树
* unmount 会遍历子树 通过递归的方式 销毁子节点
  * 遇到组件节点执行 unmountComponent
  * 遇到普通元素 删除 DOM元素
  * 组件的销毁过程和渲染过程类似 都是递归
* 在组件销毁之前 会检测组件实例是否有已注册的 beforeUnMount  钩子函数 bum
  * 如果有 则通过 invokeArrayFns 执行  
* 在组件销毁之后 会检测组件实例是否有已注册的 unmounted 钩子函数 um
  * 如果有 则通过 quenePostRenderEffect  把它 推入数组
  * 组件的销毁是组件更新的一个分支逻辑  也是在 nextTick 之后执行的
  * 会等待当前任务执行之后 在同一个事件循环内执行所有的 umounted 钩子函数

## onErrorCaptured

* 是在 调用 handleError 函数 中执行的 钩子函数
* handleError 会从当前报错的组件的父组件实例开始 尝试查找 已注册的 errorCaptured 钩子函数
* 如果找到了 遍历执行判断 errorCaptured 钩子函数是否返回值是 true 若是 则说明这个错误已经得到正确的处理 结束遍历
* 如果找不到 会继续遍历 在遍历完当前组件实例的 errorCaptured 钩子函数 如果还没有找到 就会找它的父组件实例 直到查找完毕
* 如果整条链路都没处理 errorCaptured 钩子函数 通过 logError  向通知台输出 未处理的错误
  * 开发环境 会导致程序崩溃   为了给开发者足够强的提醒
  * errorCaptured 本质是捕获来自 子孙组件的错误 返回 true 就是 阻止错误向上传播
* 可以在根组件 注册一个 errorCaptured 钩子函数 用于捕获所有子孙组件的错误 根据错误类型 上报错误信息 统计

## 总结

* vue js 组件的生命周期包括 创建 更新 销毁等阶段 在此我们可以注入一些生命周期钩子函数执行自己的代码逻辑
![图片](../../../assets/vue/life-cycle.png)
