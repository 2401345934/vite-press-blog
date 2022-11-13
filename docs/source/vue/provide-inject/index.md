---
createTime: 2022/11/13
tag: 'Vue源码'
---

# 依赖注入

## provide

* provide 就是提供数据  
* provide 函数提供的数据主要保存在组件实例的 provides 对象上
* 在创建组件实例的时候 组件实例 provides 对象直接指向父组件实例的 provides 对象
* 默认情况下 组件实例的 provides 之家指向其父组件的 provides 对象
* 调用的情况下 会一层层的往上找

```js
export function provide<T>(key: InjectionKey<T> | string | number, value: T) {
  if (!currentInstance) {
    if (__DEV__) {
      warn(`provide() can only be used inside setup().`)
    }
  } else {
    let provides = currentInstance.provides
    // by default an instance inherits its parent's provides object
    // but when it needs to provide values of its own, it creates its
    // own provides object using parent provides object as prototype.
    // this way in `inject` we can simply look up injections from direct
    // parent and let the prototype chain do the work.
    const parentProvides =
      currentInstance.parent && currentInstance.parent.provides
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides)
    }
    // TS doesn't allow symbol as index type
    provides[key as string] = value
  }
}

```

## inject

* inject 就是注入数据  注入来自其祖先组件的数据
* inject 通过注入的key  来访问其祖先组件实例中的 provides 对象对应的值
* 如果某个组件组件中执行了 provide 那么在 inject 的过程中 会先从其父组件去寻找这个 key
  * 找到就返回
  * 找不到就通过 provides 的原型去查找这个 key  
  * provides 的原型就指向它父级的 provides 对象
  * 形成了一个递归查找的过程
* inject 利用了 js 原型链的方式实现了 层层查找祖先提供的一个 key 对应的数据
  * 就是这样的机制 导致了 组件可以在中途覆盖 provide 父级提供的值
* 如果查不着数据 也没有传入默认值 就在非生产环境发出警告 提示用户找不到这个注入的数据

```ts
export function inject<T>(key: InjectionKey<T> | string): T | undefined
export function inject<T>(
  key: InjectionKey<T> | string,
  defaultValue: T,
  treatDefaultAsFactory?: false
): T
export function inject<T>(
  key: InjectionKey<T> | string,
  defaultValue: T | (() => T),
  treatDefaultAsFactory: true
): T
export function inject(
  key: InjectionKey<any> | string,
  defaultValue?: unknown,
  treatDefaultAsFactory = false
) {
  // fallback to `currentRenderingInstance` so that this can be called in
  // a functional component
  const instance = currentInstance || currentRenderingInstance
  if (instance) {
    // #2400
    // to support `app.use` plugins,
    // fallback to appContext's `provides` if the instance is at root
    const provides =
      instance.parent == null
        ? instance.vnode.appContext && instance.vnode.appContext.provides
        : instance.parent.provides

    if (provides && (key as string | symbol) in provides) {
      // TS doesn't allow symbol as index type
      return provides[key as string]
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue)
        ? defaultValue.call(instance.proxy)
        : defaultValue
    } else if (__DEV__) {
      warn(`injection "${String(key)}" not found.`)
    }
  } else if (__DEV__) {
    warn(`inject() can only be used inside setup() or functional components.`)
  }
}

```

## 对比模块化共享数据的方式

### 依赖注入和模块化共享数据的差异

* 模块化可以共享数据 但是 provide 和 inject 于模块化相比有几个不同

### 作用域不同

#### 依赖注入

* 局部范围
* 只能把数据注入这个节点为根的后代组件
* 不是这颗树上的组件不可能访问到该数据

#### 模块化共享数据

* 作用域是全局范围
* 任何地方可以引用 导出的数据

### 数据来源不同

#### 依赖注入

* 后代组件不需要知道那里注入的数据
* 只需要使用就行

#### 模块化共享数据

* 用户必须明确知道这个数据那里来的
* 那个模块定义的  从而引用

### 上下文不同

#### 依赖注入

* 提供数据的上下文就是组件实例
* 同一个组件定义可以有多个组件实例
* 可以根据不同组件上下文方式 为 后代组件提供不同数据

#### 模块化共享数据

* 没有上下文
* 仅仅为了一个模块定义数据
* 想要根据不同的情况提供不同的数据 需要提供其他 的

## 依赖注入的缺陷和应用场景

* 依赖注入是和上下文相关的 导致代码耦合在一起
  * 因为祖先组件不需要知道哪些后代组件使用它提供的数据
  * 后代组件也不知道数据注入来自于哪里
  * 后续重构不小心挪动了数据的注入 导致程序异常

## 总结

* 依赖注入的实现主要依赖实例的 provides 对象 默认情况下 子组件的  provides 对象直接指向父组件的 provides 对象
  * 当组件执行 provide 函数提供数据 会使用父级的 provides 对象作为原型对象创建自己的 provides 对象
  * 然后再给自己的 provides 对象添加新的属性值
* 当子组件 inject 注入数据的时候 会直接从它的父组件的 provides 对象查找
  * 找到就直接返回数据
  * 找不到就开始查找原型 通过 js 原型链 的方式实现了层层查找组件提供的 key 对应数据
* 依赖注入还是有负面影响
  * 会将应用程序组件与他们当前的组织方式耦合起来
  * 使得重构变得非常麻烦
  * 但是如何是组件库的场景  依赖注入是非常方便的  直接可以在入口组件进行注入
