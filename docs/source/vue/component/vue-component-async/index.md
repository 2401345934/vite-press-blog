---
createTime: 2022/10/24
tag: 'Vue源码'
---
# 异步组件

``` ts
defineAsyncComponent
function defineAsyncComponent(
  source: AsyncComponentLoader | AsyncComponentOptions
): Component

type AsyncComponentLoader = () => Promise<Component>

interface AsyncComponentOptions {
  loader: AsyncComponentLoader
  loadingComponent?: Component
  errorComponent?: Component
  delay?: number
  timeout?: number
  suspensible?: boolean
  onError?: (
    error: Error,
    retry: () => void,
    fail: () => void,
    attempts: number
  ) => any
}
```

* 用来定义 异步组件   允许传入一个工厂函数
* 接受返回的 promise 工厂函数 从服务端成功加载异步组件之后 应执行 resolove 回调函数
  * 如果加载失败  执行 reject 回调函数
* defineAsyncComponent 函数只有单个参数 source 可以是工厂函数 也可以是一个对象  
* defineAsyncComponent 会将参数标准化成一个对象 并且把 loader 属性指向这个函数
* defineAsyncComponent 主要做了三件事  渲染占位节点 加载异步 javascript 模块 以及 获取组件对象 以及重新渲染组件

## 渲染占位节点

* defineAsyncComponent 返回的是 defineComponent 函数执行的结果
* defineComponent 函数做的也是标准化  如果传递的 options 是一个函数 那么返回一个对象  让 options 函数指向其 setup 属性
* 因此 defineAsyncComponent 函数的返回值就是一个带 setup 属性的对象 其实就是一个组件对象
* 由于 setup函数返回的是一个函数  这个函数就是该组件的渲染函数
* 普通的异步组件初次会被渲染成一个注释节点

## 加载异步 javascript 模块

* 除了把异步组件渲染成注释节点 setup函数内部还调用了 load 函数来加载异步 js模块
* load 函数内部主要是通过执行用户定义的 工厂函数 loader 来发送请求
  * 会返回一个 promise 对象
  * 加载成功 会在 then 函数 中获得组件的模块 comp  如果组件是通过 export defalut 导出的 可以通过 comp.default 获取它的真实组件对象 赋值给 resolveComp
  * 如果组件对象 comp 不是函数类型 也不是对象类型 抛出错误

## 重新渲染组件

* 在调用 load  会修改响应式对象 loaded 来触发异步组件的重新渲染
* 当异步组件重新渲染后 会再次执行组件的 render 函数
* 最终是调用了 createInnerComp 函数创建一个 vnode 对象 就可以渲染了

## 高级用法

* defineAsyncComponent 可以接受一个对象
  * loader 工厂函数
  * loadingComponent : 加载异步组件时要使用的组件
  * errorComponent : 加载失败的时候要使用的组件
  * delay: 在显示 loadingComponent 之前的延迟 单位 ms
  * timeout： 超出时间 显示 error 组件
  * onError ： 函数 返回错误信息

## loading组件

* defineAsyncComponent
  * loadingComponent : 加载异步组件时要使用的组件

## error组件

* defineAsyncComponent 可以接受一个对象
  * errorComponent : 加载失败的时候要使用的组件

## 只加载一次

* defineAsyncComponent 内部会通过 一个变量 pendingRequest
* 即使初始化多次 变量还是共享的
* 第一次执行 load 函数 pendingRequest 还是 null 会执行 loader 函数加载异步组件 并把返回值赋给 pendingRequest
* 第二次执行的时候 发现 pendingRequest 有值 直接返回 上一次的结果 不会再次调用 loader 函数

```ts
export function defineAsyncComponent<
  T extends Component = { new (): ComponentPublicInstance }
>(source: AsyncComponentLoader<T> | AsyncComponentOptions<T>): T {
  if (isFunction(source)) {
    source = { loader: source }
  }

  const {
    loader,
    loadingComponent,
    errorComponent,
    delay = 200,
    timeout, // undefined = never times out
    suspensible = true,
    onError: userOnError
  } = source

  let pendingRequest: Promise<ConcreteComponent> | null = null
  let resolvedComp: ConcreteComponent | undefined

  let retries = 0
  const retry = () => {
    retries++
    pendingRequest = null
    return load()
  }

  const load = (): Promise<ConcreteComponent> => {
    let thisRequest: Promise<ConcreteComponent>
    return (
      pendingRequest ||
      (thisRequest = pendingRequest =
        loader()
          .catch(err => {
            err = err instanceof Error ? err : new Error(String(err))
            if (userOnError) {
              return new Promise((resolve, reject) => {
                const userRetry = () => resolve(retry())
                const userFail = () => reject(err)
                userOnError(err, userRetry, userFail, retries + 1)
              })
            } else {
              throw err
            }
          })
          .then((comp: any) => {
            if (thisRequest !== pendingRequest && pendingRequest) {
              return pendingRequest
            }
            if (__DEV__ && !comp) {
              warn(
                `Async component loader resolved to undefined. ` +
                  `If you are using retry(), make sure to return its return value.`
              )
            }
            // interop module default
            if (
              comp &&
              (comp.__esModule || comp[Symbol.toStringTag] === 'Module')
            ) {
              comp = comp.default
            }
            if (__DEV__ && comp && !isObject(comp) && !isFunction(comp)) {
              throw new Error(`Invalid async component load result: ${comp}`)
            }
            resolvedComp = comp
            return comp
          }))
    )
  }

  return defineComponent({
    name: 'AsyncComponentWrapper',

    __asyncLoader: load,

    get __asyncResolved() {
      return resolvedComp
    },

    setup() {
      const instance = currentInstance!

      // already resolved
      if (resolvedComp) {
        return () => createInnerComp(resolvedComp!, instance)
      }

      const onError = (err: Error) => {
        pendingRequest = null
        handleError(
          err,
          instance,
          ErrorCodes.ASYNC_COMPONENT_LOADER,
          !errorComponent /* do not throw in dev if user provided error component */
        )
      }

      // suspense-controlled or SSR.
      if (
        (__FEATURE_SUSPENSE__ && suspensible && instance.suspense) ||
        (__SSR__ && isInSSRComponentSetup)
      ) {
        return load()
          .then(comp => {
            return () => createInnerComp(comp, instance)
          })
          .catch(err => {
            onError(err)
            return () =>
              errorComponent
                ? createVNode(errorComponent as ConcreteComponent, {
                    error: err
                  })
                : null
          })
      }

      const loaded = ref(false)
      const error = ref()
      const delayed = ref(!!delay)

      if (delay) {
        setTimeout(() => {
          delayed.value = false
        }, delay)
      }

      if (timeout != null) {
        setTimeout(() => {
          if (!loaded.value && !error.value) {
            const err = new Error(
              `Async component timed out after ${timeout}ms.`
            )
            onError(err)
            error.value = err
          }
        }, timeout)
      }

      load()
        .then(() => {
          loaded.value = true
          if (instance.parent && isKeepAlive(instance.parent.vnode)) {
            // parent is keep-alive, force update so the loaded component's
            // name is taken into account
            queueJob(instance.parent.update)
          }
        })
        .catch(err => {
          onError(err)
          error.value = err
        })

      return () => {
        if (loaded.value && resolvedComp) {
          return createInnerComp(resolvedComp, instance)
        } else if (error.value && errorComponent) {
          return createVNode(errorComponent as ConcreteComponent, {
            error: error.value
          })
        } else if (loadingComponent && !delayed.value) {
          return createVNode(loadingComponent as ConcreteComponent)
        }
      }
    }
  }) as T
}
```

## 总结

* 异步组件本质就是一个普通的组件
* 在内部通过定义的 loader 加载器在首次渲染的时候发起一个加载异步组件的模块请求 同时被宣传成注释节点或者 loading 组件
  * 当异步组件加载成功之后 会通过修改响应式数据的值来触发组件的重新渲染 渲染真正的组件
  * 当异步组件加载失败之后 可以执行用户自定义的失败处理函数来决定是重试还是直接失败
* 如果多次重试失败或者直接失败 则会在用户配置的 errorComponent 条件下渲染 error组件
* 异步组件通过闭包的技巧确保了 多个异步组件同时加载 只发送一次请求  
  * 如果已经被加载的异步组件被再次初始化 直接获取对应的组件返回并渲染
