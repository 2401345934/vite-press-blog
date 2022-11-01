---
createTime: 2022/10/29
tag: 'hooks'
---
# 常用hooks

## useAfter

```javascript
/*
 * 后置装饰器，按照AOP原则为功能动态注入一个后置函数，默认同步
 * */
const useAfter = (fn, afterFn, isSync = true) => {
  return async (...args) => {
    const ret = isSync ? await fn.apply(this, args) : fn.apply(this, args)

    if (!Array.isArray(afterFn)) {
      afterFn.apply(this, args)
    } else if (isSync) {
      for (const v of afterFn) {
        // eslint-disable-next-line no-await-in-loop
        await Promise.resolve(v.apply(this, args))
      }
    } else {
      afterFn.forEach(v => v.apply(this, args))
    }

    return ret
  }
}

/*
 * 使用方式：useAfter(fn, afterFn, [true | false])(params)
 * */

```

## useBefore

```javascript
/*
 * 前置装饰器，按照AOP原则为功能动态注入一个前置函数，默认同步
 * */
const useBefore = (fn, beforeFn, isAsync = false) => {
  return async (...args) => {
    if (!Array.isArray(beforeFn)) {
      isAsync ? beforeFn.apply(this, args) : await beforeFn.apply(this, args)
    } else if (isAsync) {
      beforeFn.forEach(v => v.apply(this, args))
    } else {
      for (const v of beforeFn) {
        // eslint-disable-next-line no-await-in-loop
        await Promise.resolve(v.apply(this, args))
      }
    }

    return fn.apply(this, args)
  }
}

/*
 * 使用方式：useBefore(fn, beforeFn, true)(params)
 * */
```

## 责任链 Chain

```javascript
/*
 * 责任链 类
 * */
class Chain {
  constructor(fn) {
    this.fn = fn
    this.successor = null
  }

  // 设置责任链
  setNextSuccessor(successor) {
    this.successor = successor
    return this.successor
  }

  // 设置每个节点的调用方式
  async passRequest(...args) {
    // eslint-disable-next-line prefer-spread
    const ret = await this.fn.apply(this, args)
    if (ret === 'nextSuccessor') {
      return (
        // eslint-disable-next-line prefer-spread
        this.successor && this.successor.passRequest.apply(this.successor, args)
      )
    }
    return ret
  }
}

```

## 防抖 useDebounce

```javascript

/*
 * 防抖
 * */

/**
 * 防抖
 * @param {*} func
 * @param {*} wait
 * @param {*} immediate
 */
const debounce = (func, wait, immediate) => {
  /** 调用debounce声明一下变量 * */
  let timeout
  let args
  let context
  let timestamp
  let resullt
  /** 初次由return函数调用, 后面自己递归调用 * */
  const later = function () {
    const now = new Date().getTime()
    // 记录在wait时间内上一次执行return函数的时间间隔
    const last = now - timestamp
    // 时间间隔小于wait,继续递归调用
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 用于immediate==false在结束边界调用
      if (!immediate) {
        resullt = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }
  return function () {
    context = this
    // eslint-disable-next-line prefer-rest-params
    args = arguments
    timestamp = new Date().getTime()
    const exec = immediate && !timeout
    // 初次timeout不存在,设置延时调用later
    if (!timeout) timeout = setTimeout(later, wait)
    // 用于immediate==true在开始边界调用
    if (exec) {
      resullt = func.apply(context, args)
      context = args = null
    }
    return resullt
  }
}

const useDebounce = debounce(
  cb => {
    cb()
  },
  3e2,
  true,
)

/*
 * 使用方式：useDebounce(() => {})
 * */
```

## useDelay

```javascript
/*
 * 延时
 * */
const useDelay = wait => new Promise(resolve => setTimeout(resolve, wait))

/*
 * 使用方式：await useDelay(1e3)
 * */

```

## useLock

```javascript
/*
 * 锁机制-> 解决多次连续触发接口问题，防双击
 * 默认情况下，需要原函数返回一个promise以达到promise决议后将locking重置为false，而如果没有返回值，locking将会被立即重置
 * 在一些不方便返回promise或者请求结束还要进行其它动作之后才能重置locking的地方，提供了第二个参数manual，允许你可以手动调用一个done函数来重置locking，这个done函数会放在原函数参数列表的末尾
 * */
const useLock = (fn, manual = false) => {
  let locking = false
  return (...args) => {
    if (locking) return
    locking = true
    let done = () => {
      locking = false
    }

    if (manual) return fn.call(this, ...args, done)

    let promise = fn.call(this, ...args)
    Promise.resolve(promise).then(done).catch(done)
    return promise
  }
}

// const useLock = lock(cb => {
//   return cb()
// }, false)

/*
 * 使用方式：useLock(fn)
 * fn 为return 的一个Promise
 * 特殊说明：组件上使用时请注意this指向，建议使用方式 useLock(fn.bind(this))
 * */
```

## 责任链 Middleware

```javascript
/*
 * 中间件 类
 * */
class Middleware {
  constructor() {
    this.$cache = []
    this.$middlewares = []
    this.$events = {}
  }

  // 注册中间件
  use(...args) {
    args.forEach(item => {
      if (typeof item === 'function') {
        this.$cache.push(item)
      }
    })
    return this
  }

  /**
   * 每个中间件只有两个形参 第一是传进来的参数 第二个是调用下一个中间件的函数
   * 中间件的执行顺序是根据你注册中间件的顺序来去调用的
   */
  next(params) {
    while (this.$middlewares.length) {
      const ware = this.$middlewares.shift()
      ware.call(this, params, this.next.bind(this))
    }
  }

  /**
   * 注册事件
   * @param {String} name 事件名称
   * @param {Function (params)} callback 回调函数
   */
  on(name, callback) {
    if (typeof callback === 'function') {
      this.$events[name] = callback
    } else {
      throw new Error('事件回调必须为函数')
    }
  }

  /**
   * 触发事件
   * @param {String} name 事件名称
   * @param {Any} params 回调参数
   */
  emit(name, params) {
    if (this.$events[name]) {
      let callback = this.$events[name]
      callback.call(this, params)
    } else {
      throw new Error('没有注册这个事件')
    }
  }

  execute(params) {
    this.$middlewares = this.$cache.map(fn => {
      // 复制一份
      return fn
    })
    return this.next(params)
  }

  executeFc(params) {
    return new Promise((resolve, reject) => {
      params.promise = { resolve, reject }
      this.execute(params)
    })
  }
}
```

## useOnce

```javascript
/*
 * 让一个事件（一个函数）只允许调用一次
 * */
const useOnce = fn => {
  let called = false
  return (...args) => {
    if (!called) {
      called = true
      fn.apply(this, args)
    }
  }
}

/*
 * 使用方式：useOnce(() => {})
 * */
```

## useSafeCall

```javascript
/*
 * */
const useSafeCall = async callback => {
  if (callback && typeof callback === 'function') {
    try {
      await callback()
    } catch (err) {
      return err
    }
  }
}

/*
 * */
```

## useServices

```javascript

const isObject = (obj) => typeof obj === 'object'
const isFunction = (fn) => typeof fn === 'function'

/**
 * 判断是否为Promise
 * 参考vue-next源码的shared模块（https://github.com/vuejs/core/blob/be1e42eb923a3fdf1ae90fb6cecb0be275e3694a/packages/shared/src/index.ts）
 */
const isPromise = val => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

/**
 * 处理异步任务中间件
 * @param { Promise } promise 异步任务
 * @returns { Array<any> }
 */
const promiseMiddleware = promise => {
  try {
    return promise
      ?.then(res => [res, null])
      ?.catch(err => [null, err])
      ?.finally(() => [null, null])
  } catch (e) {
    return [null, null]
  }
}

/**
 * 获取当前请求接口
 * @example
 * example1：const [success, error] = useServices(api.fetchService())
 * example2：const [success, error] = useServices(fn)
 * example3：const [success, error] = useServices(str/obj)
 * @returns { Object }
 */
const useServices = payload => {
  let promise = null

  if (!isPromise(payload)) {
    promise = new Promise(resolve => {
      // 如果是函数，直接执行函数(同步任务)，同时把函数返回值作为Promise的成功状态参数
      // 如果是基本类型和对象，直接把参数作为Promise的成功状态参数
      let res = isFunction(payload) ? payload() : payload
      resolve(res)
    })
  }

  return promiseMiddleware(promise || payload)
}

/*
 * 使用方式：useServices(api.fetchData())
 * */
```

## 状态机 State

```js
/*
 * 状态模式 状态机
 *  */
class State {
  constructor(actions) {
    // 存储当前执行的状态
    this.currentState = []
    this.actions = actions
  }

  change(...args) {
    // 清空当前的状态
    this.currentState = []
    Object.keys(args).forEach(i => this.currentState.push(args[i]))
    return this
  }

  go(params, ...rest) {
    // 当前集合中的状态依次执行
    this.currentState.forEach(
      k => this.actions[k] && this.actions[k](params, ...rest),
    )
    return this
  }
}

export default State

```

## 节流 useThrottle

``` js

/*
 * 节流
 * */

/**
 * 节流
 * @param   {function}  func        传入函数
 * @param   {number}    wait        表示时间窗口的间隔
 * @param   {object}    options     如果想忽略开始边界上的调用，传入{leading: false}。
 *                                  如果想忽略结尾边界上的调用，传入{trailing: false}
 * @returns {function}              返回客户调用函数   返回客户调用函数
 */
function throttle(func, wait, options) {
  let timeout
  let context
  let args
  let result
  let previous = 0
  options = options || {}
  // 延时执行函数
  let later = function () {
    let now = new Date().getTime()
    // 首次执行时，如果设定了开始边界不执行选项，将上次执行时间设定为当前时间。
    previous = options.leading === false ? 0 : now
    timeout = null
    result = func.apply(context, args)
    if (!timeout) context = args = null
  }
  return function () {
    context = this
    // eslint-disable-next-line prefer-rest-params
    args = arguments
    let now = new Date().getTime()
    if (!previous && options.leading === false) previous = now
    let remaining = wait - (now - previous)
    // 延迟时间间隔remaining小于等于0，表示上次执行至此所间隔时间已经超过一个时间窗口
    // remaining大于时间窗口wait，表示客户端系统时间被调整过
    if (remaining <= 0 || remaining > wait) {
      clearTimeout(timeout)
      timeout = null
      previous = now
      result = func.apply(context, args)
      if (!timeout) context = args = null
      // 如果延迟执行不存在，且没有设定结尾边界不执行选项
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
    return result
  }
}

const useThrottle = throttle(
  cb => {
    cb()
  },
  3e2,
  true,
)

/*
 * 使用方式：useThrottle(() => {})
 * */
export default useThrottle

```
