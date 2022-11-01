---
createTime: 2022/10/24
tag: 'Vue源码'
---
# watch API 的实现原理

## watch API 用法

* watch API 可以监听一个 getter 函数  但是必须返回一个响应式对象
  * 当响应式对象更新后 会执行对应的回调函数
* watch API 也可以直接监听一个响应式对象
  * 当响应式对象更新后 会执行对应的回调函数
* watch API 可以直接监听多个响应式对象  数组的形式 任意一个响应式对象更新后 都会执行回调函数

## watch API 实现原理

* 当监听对象或者函数发生变化的时候   监听器自动执行某个回调函数
* watch 函数 拥有三个参数
  * source 表示监听的数据源
  * cb       表示数据变化后执行的回调函数
  * options 一些配置项
* watch 函数 内部调用了 doWatch 函数
  * 调用前会在非生产环境判断第二个参数 cb 是不是 函数  不是发出警告
  * 告诉用户 应该使用 watchEffect API

### 标准化 source

* source 可以是 getter 函数 也可以是响应式对象 甚至是响应式对象数组
  * 所以需要标准化 source
* source 标准化主要是根据 source 类型 生成标准化后的 getter 函数
* 如果 source 是 ref 对象 创建一个访问 source.value 的 getter 函数
* 如果 source是 reactive 对象 创建一个访问 source 的 getter 函数 设置 deep 为 true
* 如果 source 是一个函数 进一步判断第二个参数 cb 是否存在
* 如果 source 是一个数组 生成的 getter 函数内部通过 source.map 函数映射出有一个新的数组 会判断每个数组元素类型
* 如果 source 不满足上面条件 则在非生产环境下 发出警告 source 类型不合法
* 如果 deep 为 true 生成的 getter 函数被 traverse 函数包装一个  

### traverse

* 通过递归的方式访问 value 的每一个子属性
* deep 属于 watcher 的一个配置选项

### 创建 job

* 处理完 watch 第一个 参数 source 之后 开始处理 cb
* cb 是一个回调函数 有三个参数
  * newValue : 新值
  * oldValue : 老值
  * onInvalidate : 注册的无效回调函数
* 如果cb 存在 会先执行 effect.run 函数求的新值 实例就是执行前面创建的 getter 函数求新值
* 进行判断 如果 deep 深度或者 是 forckTrigger 强制更新 或者 新旧值发生了变化
  * 执行回调函数 cb  传入参数 newValue  oldValue
  * 第一次执行的时候如果旧值没变化 就是 undefined
  * 执行完回调函数 cb 后 再把 oldValue 更新成 newValue 为了做下一次的对比

### 创建 scheduler

* scheduler 创建逻辑收到了第三个参数 options 中的 flush 的值影响 有三种状态 决定  watcher 回调函数执行时机
  * flush 是 sync  表示是一个同步的 watcher 数据变化同步执行 回调函数
  * flush 是 post  表示 回调函数通过 queuePostRenderEffect 方式在组件更新之后执行
  * flush 是 pre  表示 回调函数通过 queuePreFlushCb 方式在组件更新之前执行 如果组件没挂载 就在组件挂载之前通过一定的调度执行

### 创建 effect

* wachter 内部都会 创建 effect 对象

#### effect.run 的执行

* 当回调函数 cb 存在 immediate 为 false 首次执行 effect.run 函数求 旧值
* 函数内部执行 getter 函数 访问响应式数据做依赖收集
* 此时的 activeEffect 就是 wacher 内部创建的 effect 对象 后续数据更新的时候 就可以触发 effect 对象的 scheduler 函数 执行 job 函数

#### 配置了 immediate

* 创建完 wacher 就会立刻直接 job 函数  
* oldValue 还是初始值 在 job 执行时候也会执行 effect.run
* 进而执行 getter 函数 做依赖收集  求的新值

### 返回销毁函数

* 会返回一个 销毁函数  是 watch 执行后返回的函数 可以通过调用 来停止对数据的监听
* 销毁函数 内部会执行 effect.stop 函数 让 effect 失活  清理 effect 的相关依赖
  * 就可以停止了对数据的监听
  * 如果在组件注册的 watcher  也会移除组件 effects 对 effect 饮用

## 总结

* watch 内部设计很巧妙 可以监听数据的变化 内部创建了 effect 对象
* 首次执行  effect.run 做依赖收集 然后在数据发生变化的时候
* 以某种调度方式执行回调函数
