---
createTime: 2022/10/24
tag: 'Vue源码'
---
# 异步任务队列的创建

## 异步任务队列的创建

* 组件的副作用函数 instance.update 在它依赖的响应数据更新后 通过 queueJob 方式再次运行
* vue 内部维护了一个异步任务队列 queue 其中的一些异步任务 比如副作用渲染函数
  * 就是通过 queueJob 的方式添加到队列 queue 中
  * 并不是只要执行 queueJob(job) 这个任务就会添加到队列中
  * 会通过 Array.include 的方式检测新添加的 job 是否已经存在队列
* 当 isFlushing 为 false 未开始执行 job 的时候  flushIndex 始终为0
  * 这个时候执行 queueJob(job) 只要保证心来的任务不在 queue 队列中即可
  * 然后当  isFlushing 为 true 的时候 也就是开始执行任务的时候  flushIndex 会递增
  * 在执行任务的时候又有新的任务进来 只需要 和queue 中未执行的任务对比
* 无论是 queueJob 还是 queueCb 最终都会执行 queueFlush 函数

### queueFlush

* vue 内部维护了 isFlushing  和 isFlushPending 变量 用来控制异步任务的刷新逻辑
* 在 queueFlush 首次执行的时候  isFlushing  和 isFlushPending 都是 false 会把  isFlushPending设置为 true
  * 通过 promise.then 的方式 在下一个 Tick 去执行 flushJobs
  * 进而执行队列中的任务
* isFlushPending 的控制 使得即使多次执行 queueFlush  也不会多次执行 flushJobs  
* 因为 js 都是单线程执行的  这样异步设计可以保证在一个 Tick 内
  * 即使多次执行 queueJob或者 queueCb 添加任务
  * 也只是在宏任务执行完毕之后的微任务阶段执行一次 flushJobs

```ts
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true
    currentFlushPromise = resolvedPromise.then(flushJobs)
  }
}
```

## 异步任务队列的执行

### flushJobs

* 一开始会把 isFlushPending 重置为 false 把 isFlushing 设置为 true 表示正在执行异步队列任务
* 执行异步任务队列之前 queue 之前 先执行 flushPreFlushCbs 处理所有预处理任务队列

```ts
function flushJobs(seen?: CountMap) {
  isFlushPending = false
  isFlushing = true
  if (__DEV__) {
    seen = seen || new Map()
  }

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child so its render effect will have smaller
  //    priority number)
  // 2. If a component is unmounted during a parent component's update,
  //    its update can be skipped.
  queue.sort(comparator)

  // conditional usage of checkRecursiveUpdate must be determined out of
  // try ... catch block since Rollup by default de-optimizes treeshaking
  // inside try-catch. This can leave all warning code unshaked. Although
  // they would get eventually shaken by a minifier like terser, some minifiers
  // would fail to do that (e.g. https://github.com/evanw/esbuild/issues/1610)
  const check = __DEV__
    ? (job: SchedulerJob) => checkRecursiveUpdates(seen!, job)
    : NOOP

  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex]
      if (job && job.active !== false) {
        if (__DEV__ && check(job)) {
          continue
        }
        // console.log(`running:`, job.id)
        callWithErrorHandling(job, null, ErrorCodes.SCHEDULER)
      }
    }
  } finally {
    flushIndex = 0
    queue.length = 0

    flushPostFlushCbs(seen)

    isFlushing = false
    currentFlushPromise = null
    // some postFlushCb queued jobs!
    // keep flushing until it drains.
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs(seen)
    }
  }
}
```

### flushPreFlushCbs

* 首先对 pendingPreFlushCbs 做了去重 赋值给 activePreFlushCbs 然后清空自己
* 遍历 activePreFlushCbs 依次执行这些任务
* 遍历过程中 还会检测循环更新
* 当 activePreFlushCbs执行完毕后 清空 activePreFlushCbs 将 preFlushIndex重置为 0
* 由于 可能在 flushPreFlushCbs 执行过程中再次添加 pendingPreFlushCbs 所以需要递归执行 flushPreFlushCbs 直到 pendingPreFlushCbs 为空

```ts
export function flushPreFlushCbs(
  seen?: CountMap,
  // if currently flushing, skip the current job itself
  i = isFlushing ? flushIndex + 1 : 0
) {
  if (__DEV__) {
    seen = seen || new Map()
  }
  for (; i < queue.length; i++) {
    const cb = queue[i]
    if (cb && cb.pre) {
      if (__DEV__ && checkRecursiveUpdates(seen!, cb)) {
        continue
      }
      queue.splice(i, 1)
      i--
      cb()
    }
  }
}
```

### flushPostFlushCbs

* flushPostFlushCbs 函数和 flushPreFlushCbs 的逻辑类似 主要就是执行一些后续处理的任务
* 还有三处不同的地方
  * 支持 flushPostFlushCbs 的嵌套执行 这种情况会导致在执行 flushPostFlushCbs 的时候 activePostFlushCbs 可能不为空
  * activePostFlushCbs 中的任务在执行前会按照 id 大小排序 保证组件的数据更新优先于用户定义的 postwachers 回调函数的执行 用户就可以在 watcher 的回调函数中 访问更新后的 $refs 中的数据
  * queue 或者 activePostFlushCbs 中的 job 在执行过程中 还会再次向 pendingPreFlushCbs pendingPostFlushCbs 或者 queue 中再次添加一些新的 job  ， 为了保证新添加的 pendingPostFlushCbs 后执行 不能再 flushPostFlushCbs 结束后执行   flushPostFlushCbs 函数

```ts
export function flushPostFlushCbs(seen?: CountMap) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)]
    pendingPostFlushCbs.length = 0

    // #1947 already has active queue, nested flushPostFlushCbs call
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped)
      return
    }

    activePostFlushCbs = deduped
    if (__DEV__) {
      seen = seen || new Map()
    }

    activePostFlushCbs.sort((a, b) => getId(a) - getId(b))

    for (
      postFlushIndex = 0;
      postFlushIndex < activePostFlushCbs.length;
      postFlushIndex++
    ) {
      if (
        __DEV__ &&
        checkRecursiveUpdates(seen!, activePostFlushCbs[postFlushIndex])
      ) {
        continue
      }
      activePostFlushCbs[postFlushIndex]()
    }
    activePostFlushCbs = null
    postFlushIndex = 0
  }
}
```

## 检查循环更新

### checkRecursiveUpdates

* flushJobs 一开始创建了 seen 是一个 map 对象  然后在 checkRecursiveUpdates 的时候
* 会把任务添加到 seen 中并记录引用计数 count  初始值 为 1 如果再次添加相同的任务 会自增 如果 count 大于了 我们定义的 限制 100 就说明可能存在无限更新的情况

```ts
function checkRecursiveUpdates(seen: CountMap, fn: SchedulerJob) {
  if (!seen.has(fn)) {
    seen.set(fn, 1)
  } else {
    const count = seen.get(fn)!
    if (count > RECURSION_LIMIT) {
      const instance = fn.ownerInstance
      const componentName = instance && getComponentName(instance.type)
      warn(
        `Maximum recursive updates exceeded${
          componentName ? ` in component <${componentName}>` : ``
        }. ` +
          `This means you have a reactive effect that is mutating its own ` +
          `dependencies and thus recursively triggering itself. Possible sources ` +
          `include component template, render function, updated hook or ` +
          `watcher source function.`
      )
      return true
    } else {
      seen.set(fn, count + 1)
    }
  }
}
```
