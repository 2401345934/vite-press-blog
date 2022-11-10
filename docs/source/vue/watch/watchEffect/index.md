---
createTime: 2022/10/24
tag: 'Vue源码'
---
# watchEffect API

## watchEffect

* 作用是注册 一个副作用函数 副作用函数内部可以访问响应式对象
* 当响应式对象变化 立即执行这个函数

## watchEffect 和 watch  的不同

* 监听的源不同
  * watch 可以监听一个或者多个响应式对象 还可以监听一个 getter 函数
  * watchEffect 监听的是一个普通函数 只要内部访问了 响应式对象即可 这个函数不需要返回响应式对象
* 没有回调函数
  * watchEffect 没有回调函数 在副作用函数内部 响应式对象发生变化 会再次执行这个副作用函数
* 立即执行
  * watchEffect 在创建好 watcher 后 立即执行他的副作用函数
  * watch  需要配置 immediate 为 true 才会立即执行
* 内部也是通过 doWatch 函数实现的
* getter 函数就是对 source 函数 简单封装  会先判断组件的实例是否已经注销 然后每次执行 source 函数前执行 cleanup 清理函数

```ts
// Simple effect.
export function watchEffect(
  effect: WatchEffect,
  options?: WatchOptionsBase
): WatchStopHandle {
  return doWatch(effect, null, options)
}
```

## 注册无效回调函数 onInvalidate

* 可以利用 watchEffect 注册一个副作用函数  有一个 onInvalidate 参数
* 函数内部通过 preformAsyncOperation 执行某些异步操作 并且访问了 id 这个响应式对象  
* 然后通过 onInvalidate 注册一个回调函数
* 检测 响应式数据发生变化的时候 会触发 getter 函数 执行 cleanup 函数
* 当 watcher 被销毁的时候 执行 onStop 函数 两者都会执行注册的无效回调函数 fn
