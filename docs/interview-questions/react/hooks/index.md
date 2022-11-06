---
createTime: 2022/11/06
tag: 'React,面试题'
---
# hooks

![深入 Hooks.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ddea1c732cfb425da5bedbb2dc1295fe~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

## 自定义Hooks是什么？

`react-hooks`是`React16.8`以后新增的钩子API，目的是增加代码的可复用性、逻辑性，最主要的是解决了**函数式组件无状态的问题**，这样既保留了函数式的简单，又解决了没有数据管理状态的缺陷

那么什么是自定义hooks呢？

`自定义hooks`是在`react-hooks`基础上的一个扩展，可以根据业务、需求去制定相应的`hooks`,将常用的逻辑进行封装，从而具备复用性

如何设计一个自定义Hooks
--------------

`hooks`本质上是一个**函数**，而这个函数主要就是**逻辑复用**，我们首先要知道一件事，`hooks`的驱动条件是什么？

其实就是`props`的修改，`useState`、`useReducer`的使用是无状态组件更新的条件，从而驱动自定义hooks

通用模式
----

自定义hooks的名称是以**use**开头，我们设计为：

> const \[ xxx, ...\] = useXXX(参数一，参数二...)

简单的小例子：usePow
-------------

我们先写一个简单的小例子来了解下`自定义hooks`

```tsx
// usePow.ts
const Index = (list: number[]) => {

  return list.map((item:number) => {
    console.log(1)
    return Math.pow(item, 2)
  })
}

export default Index;

// index.tsx
import { Button } from 'antd-mobile';
import React,{ useState } from 'react';
import { usePow } from '@/components';

const Index:React.FC<any> = (props)=> {
  const [flag, setFlag] = useState<boolean>(true)
  const data = usePow([1, 2, 3])
  
  return (
    <div>
      <div>数字：{JSON.stringify(data)}</div>
      <Button color='primary' onClick={() => {setFlag(v => !v)}}>切换</Button>
       <div>切换状态：{JSON.stringify(flag)}</div>
    </div>
  );
}

export default Index;

```

我们简单的写了个 `usePow`，我们通过 `usePow` 给所传入的数字平方, 用切换状态的按钮表示函数内部的状态，我们来看看此时的效果：

![img2.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2d21cc3b15e24a8fba7a7cf3f2a89d14~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

我们发现了一个问题，为什么点击切换按钮也会触发`console.log(1)`呢？

这样明显增加了性能开销，我们的理想状态肯定不希望做无关的渲染，所以我们做自定义 `hooks`的时候一定要注意，需要**减少性能开销**,我们为组件加入 `useMemo`试试：

```tsx
    import { useMemo } from 'react';

    const Index = (list: number[]) => {
      return useMemo(() => list.map((item:number) => {
        console.log(1)
        return Math.pow(item, 2)
      }), []) 
    }
    export default Index;

```

![img3.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d3e583fe589a4dacbb0a5a72b2e99cef~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

发现此时就已经解决了这个问题，所以要非常注意一点，一个好用的自定义`hooks`,一定要配合`useMemo`、`useCallback`等 Api 一起使用。

## 玩转React Hooks

在上述中我们讲了用 `useMemo`来处理无关的渲染，接下来我们一起来看看`React Hooks`的这些钩子的妙用（这里建议先熟知、并使用对应的`React Hooks`,才能造出好的钩子）

useMemo
-------

当一个父组件中调用了一个子组件的时候，父组件的 state 发生变化，会导致父组件更新，而子组件虽然没有发生改变，但也会进行更新。

简单的理解下，当一个页面内容非常复杂，模块非常多的时候，函数式组件会**从头更新到尾**，只要一处改变，所有的模块都会进行刷新，这种情况显然是没有必要的。

我们理想的状态是各个模块只进行自己的更新，不要相互去影响，那么此时用`useMemo`是最佳的解决方案。

这里要尤其注意一点，**只要父组件的状态更新，无论有没有对自组件进行操作，子组件都会进行更新**，`useMemo`就是为了防止这点而出现的

在讲 `useMemo` 之前，我们先说说`memo`,`memo`的作用是**结合了pureComponent纯组件和 componentShouldUpdate功能**，会对传入的props进行一次对比，然后根据第二个函数返回值来进一步判断哪些props需要更新。（具体使用会在下文讲到～）

`useMemo`与`memo`的理念上差不多，都是判断是否满足当前的限定条件来决定是否执行`callback`函数，而`useMemo`的第二个参数是一个数组，通过这个数组来判定是否更新回掉函数

这种方式可以运用在**元素、组件、上下文中**，尤其是利用在数组上，先看一个例子：

```tsx
    useMemo(() => (
        <div>
            {
                list.map((item, index) => (
                    <p key={index}>
                        {item.name}
                    </>
                )}
            }
        </div>
    ),[list])

```

从上面我们看出 `useMemo`只有在`list`发生变化的时候才会进行渲染，从而减少了不必要的开销

总结一下`useMemo`的好处：

* 可以减少不必要的循环和不必要的渲染
* 可以减少子组件的渲染次数
* 通过特地的依赖进行更新，可以避免很多不必要的开销，但要注意，有时候在配合 `useState`拿不到最新的值，这种情况可以考虑使用 `useRef`解决

useCallback
-----------

`useCallback`与`useMemo`极其类似,可以说是一模一样，唯一不同的是`useMemo`返回的是函数运行的**结果**，而`useCallback`返回的是**函数**

注意：这个函数是父组件传递子组件的一个函数，防止做无关的刷新，其次，这个组件必须配合`memo`,否则**不但不会提升性能，还有可能降低性能**

```tsx
      import React, { useState, useCallback } from 'react';
      import { Button } from 'antd-mobile';

      const MockMemo: React.FC<any> = () => {
        const [count,setCount] = useState(0)
        const [show,setShow] = useState(true)

        const  add = useCallback(()=>{
          setCount(count + 1)
        },[count])

        return (
          <div>
            <div style={{display: 'flex', justifyContent: 'flex-start'}}>
              <TestButton title="普通点击" onClick={() => setCount(count + 1) }/>
              <TestButton title="useCallback点击" onClick={add}/>
            </div>
            <div style={{marginTop: 20}}>count: {count}</div>
            <Button onClick={() => {setShow(!show)}}> 切换</Button>
          </div>
        )
      }

      const TestButton = React.memo((props:any)=>{
        console.log(props.title)
        return <Button color='primary' onClick={props.onClick} style={props.title === 'useCallback点击' ? {
        marginLeft: 20
        } : undefined}>{props.title}</Button>
      })

      export default MockMemo;

```

![img2.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5c00efe7071b40c583a3d167d073a979~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

我们可以看到，当点击切换按钮的时候，没有经过 `useCallback`封装的函数会再次刷新，而经过 `useCallback`包裹的函数不会被再次刷新

useRef
------

**useRef** 可以获取当前元素的所有属性，并且返回一个可变的ref对象，并且这个对象**只有current属性**，可设置initialValue

### 通过useRef获取对应的属性值

我们先看个案例：

```tsx
import React, { useState, useRef } from 'react';

const Index:React.FC<any> = () => {
  const scrollRef = useRef<any>(null);
  const [clientHeight, setClientHeight ] = useState<number>(0)
  const [scrollTop, setScrollTop ] = useState<number>(0)
  const [scrollHeight, setScrollHeight ] = useState<number>(0)

  const onScroll = () => {
    if(scrollRef?.current){
      let clientHeight = scrollRef?.current.clientHeight; //可视区域高度
      let scrollTop  = scrollRef?.current.scrollTop;  //滚动条滚动高度
      let scrollHeight = scrollRef?.current.scrollHeight; //滚动内容高度
      setClientHeight(clientHeight)
      setScrollTop(scrollTop)
      setScrollHeight(scrollHeight)
    }
  }

  return (
    <div >
      <div >
        <p>可视区域高度：{clientHeight}</p>
        <p>滚动条滚动高度：{scrollTop}</p>
        <p>滚动内容高度：{scrollHeight}</p>
      </div>
      <div style={{height: 200, overflowY: 'auto'}} ref={scrollRef} onScroll={onScroll} >
        <div style={{height: 2000}}></div>
      </div>
    </div>
  );
};

export default Index;

```

从上述可知，我们可以通过`useRef`来获取对应元素的相关属性，以此来做一些操作

效果： ![img1.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ce0221becc3940ec8610783afa66f5dc~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

### 缓存数据

除了获取对应的属性值外，`useRef`还有一点比较重要的特性，那就是 **缓存数据**

上述讲到我们封装一个合格的`自定义hooks`的时候需要结合**useMemo**、**useCallback**等Api，但我们控制变量的值用**useState** 有可能会导致拿到的是旧值，并且如果他们更新会带来整个组件重新执行，这种情况下，我们使用**useRef**将会是一个非常不错的选择

在`react-redux`的源码中，在hooks推出后，`react-redux`用大量的**useMemo**重做了**Provide**等核心模块，其中就是运用**useRef**来缓存数据，并且所运用的 **useRef()** 没有一个是绑定在dom元素上的，都是做数据缓存用的

可以简单的来看一下：

```tsx
    // 缓存数据
    /* react-redux 用userRef 来缓存 merge之后的 props */ 
    const lastChildProps = useRef() 
    
    // lastWrapperProps 用 useRef 来存放组件真正的 props信息 
    const lastWrapperProps = useRef(wrapperProps) 
    
    //是否储存props是否处于正在更新状态 
    const renderIsScheduled = useRef(false)

    //更新数据
    function captureWrapperProps( 
        lastWrapperProps, 
        lastChildProps, 
        renderIsScheduled, 
        wrapperProps, 
        actualChildProps, 
        childPropsFromStoreUpdate, 
        notifyNestedSubs 
    ) { 
        lastWrapperProps.current = wrapperProps 
        lastChildProps.current = actualChildProps 
        renderIsScheduled.current = false 
   }

```

我们看到 `react-redux` 用重新赋值的方法，改变了缓存的数据源，减少了不必要的更新，如过采取`useState`势必会重新渲染

### useLatest

经过上面的讲解我们知道`useRef` 可以拿到最新值，我们可以进行简单的封装，这样做的好处是：**可以随时确保获取的是最新值，并且也可以解决闭包问题**

```tsx
   import { useRef } from 'react';

   const useLatest = <T>(value: T) => {
     const ref = useRef(value)
     ref.current = value

     return ref
   };

   export default useLatest;

```

### 结合useMemo和useRef封装useCreation

**useCreation** ：是 `useMemo` 或 `useRef`的替代品。换言之，`useCreation`这个钩子增强了 `useMemo` 和 `useRef`，让这个钩子可以替换这两个钩子。（来自[ahooks-useCreation](https://link.juejin.cn/?target=https%3A%2F%2Fahooks.js.org%2Fzh-CN%2Fhooks%2Fuse-creation "https://ahooks.js.org/zh-CN/hooks/use-creation")）

* `useMemo`的值不一定是最新的值，但`useCreation`可以保证拿到的值一定是最新的值
* 对于复杂常量的创建，`useRef`容易出现潜在的的性能隐患，但`useCreation`可以避免

这里的性能隐患是指：

```tsx
   // 每次重渲染，都会执行实例化 Subject 的过程，即便这个实例立刻就被扔掉了
   const a = useRef(new Subject()) 
   // 通过 factory 函数，可以避免性能隐患
   const b = useCreation(() => new Subject(), []) 
```

接下来我们来看看如何封装一个`useCreation`,首先我们要明白以下三点：

* 第一点：先确定参数，`useCreation` 的参数与`useMemo`的一致，第一个参数是函数，第二个参数参数是可变的数组
* 第二点：我们的值要保存在 `useRef`中，这样可以将值缓存，从而减少无关的刷新
* 第三点：更新值的判断，怎么通过第二个参数来判断是否更新 `useRef`里的值。

明白了一上三点我们就可以自己实现一个`useCreation`

```tsx
import { useRef } from 'react';
import type { DependencyList } from 'react';

const depsAreSame = (oldDeps: DependencyList, deps: DependencyList):boolean => {
  if(oldDeps === deps) return true
  
  for(let i = 0; i < oldDeps.length; i++) {
    // 判断两个值是否是同一个值
    if(!Object.is(oldDeps[i], deps[i])) return false
  }

  return true
}

const useCreation = <T>(fn:() => T, deps: DependencyList)=> {

  const { current } = useRef({ 
    deps,
    obj:  undefined as undefined | T ,
    initialized: false
  })

  if(current.initialized === false || !depsAreSame(current.deps, deps)) {
    current.deps = deps;
    current.obj = fn();
    current.initialized = true;
  }

  return current.obj as T
} 

export default useCreation;

```

在`useRef`判断是否更新值通过`initialized` 和 `depsAreSame`来判断，其中`depsAreSame`通过存储在 `useRef`下的`deps`(旧值) 和 新传入的 `deps`（新值）来做对比，判断两数组的数据是否一致，来确定是否更新

### 验证 useCreation

接下来我们写个小例子，来验证下 `useCreation`是否能满足我们的要求：

```tsx
    import React, { useState } from 'react';
    import { Button } from 'antd-mobile';
    import { useCreation } from '@/components';

    const Index: React.FC<any> = () => {
      const [_, setFlag] = useState<boolean>(false)

      const getNowData = () => {
        return Math.random()
      }

      const nowData = useCreation(() => getNowData(), []);

      return (
        <div style={{padding: 50}}>
          <div>正常的函数： {getNowData()}</div>
          <div>useCreation包裹后的： {nowData}</div>
          <Button color='primary' onClick={() => {setFlag(v => !v)}}> 渲染</Button>
        </div>
      )
    }

    export default Index;

```

![useCreation.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aa5645ef84d141878142032ae2079bdc~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

我们可以看到，当我们做无关的`state`改变的时候，正常的函数也会刷新，但`useCreation`没有刷新，从而增强了渲染的性能～

useEffect
---------

`useEffect`相信各位小伙伴已经用的熟的不能再熟了，我们可以使用`useEffect`来模拟下`class`的`componentDidMount`和`componentWillUnmount`的功能。

### useMount

这个钩子不必多说，只是简化了使用`useEffect`的第二个参数：

```tsx
    import { useEffect } from 'react';

    const useMount = (fn: () => void) => {

      useEffect(() => {
        fn?.();
      }, []);
    };

    export default useMount;

```

### useUnmount

这个需要注意一个点，就是使用`useRef`来确保所传入的函数为最新的状态，所以可以结合上述讲的**useLatest**结合使用

```tsx
    import { useEffect, useRef } from 'react';

    const useUnmount = (fn: () => void) => {

      const ref = useRef(fn);
      ref.current = fn;

      useEffect(
        () => () => {
          fn?.()
        },
        [],
      );
    };

    export default useUnmount;

```

### 结合`useMount`和`useUnmount`做个小例子

```tsx
    import { Button, Toast } from 'antd-mobile';
    import React,{ useState } from 'react';
    import { useMount, useUnmount } from '@/components';

    const Child = () => {

      useMount(() => {
        Toast.show('首次渲染')
      });

      useUnmount(() => {
        Toast.show('组件已卸载')
      })

      return <div>你好，我是小杜杜</div>
    }

    const Index:React.FC<any> = (props)=> {
      const [flag, setFlag] = useState<boolean>(false)

      return (
        <div style={{padding: 50}}>
          <Button color='primary' onClick={() => {setFlag(v => !v)}}>切换 {flag ? 'unmount' : 'mount'}</Button>
          {flag && <Child />}
        </div>
      );
    }

    export default Index;

```

效果如下： ![img5.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/27b1cfa623a944eb9056b62eeafaba5f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

### useUpdate

**useUpdate**:强制更新

有的时候我们需要组件强制更新，这个时候就可以使用这个钩子：

```tsx
    import { useCallback, useState } from 'react';

    const useUpdate = () => {
      const [, setState] = useState({});

      return useCallback(() => setState({}), []);
    };

    export default useUpdate;
    
    //示例：
    import { Button } from 'antd-mobile';
    import React from 'react';
    import { useUpdate } from '@/components';


    const Index:React.FC<any> = (props)=> {
      const update = useUpdate();

      return (
        <div style={{padding: 50}}>
          <div>时间：{Date.now()}</div>
          <Button color='primary' onClick={update}>更新时间</Button>
        </div>
      );
    }

    export default Index;

```

效果如下：

![img6.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bbe4ebe0e17f439693b48eac899e3f67~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

案例
==

案例1: useReactive
----------------

**useReactive**: 一种具备**响应式**的`useState`

缘由：我们知道用`useState`可以定义变量其格式为：

`const [count, setCount] = useState<number>(0)`

通过`setCount`来设置，`count`来获取，使用这种方式才能够渲染视图

来看看正常的操作，像这样 `let count = 0; count =7` 此时`count`的值就是7，也就是说数据是响应式的

那么我们可不可以将 `useState`也写成**响应式**的呢？我可以自由设置**count的值,并且可以随时获取到count的最新值**，而不是通过`setCount`来设置。

我们来想想怎么去实现一个具备 **响应式** 特点的 `useState` 也就是 `useRective`,提出以下疑问，感兴趣的，可以先自行思考一下：

* 这个钩子的出入参该怎么设定？
* 如何将数据制作成响应式（毕竟普通的操作无法刷新视图）？
* 如何使用`TS`去写，完善其类型？
* 如何更好的去优化？

### 分析

以上四个小问题，最关键的就是`第二个`，我们如何将数据弄成**响应式**，想要弄成响应式，就必须监听到值的变化，在做出更改，也就是说，我们对这个数进行操作的时候，要进行相应的**拦截**，这时就需要`ES6`的一个知识点：**Proxy**

在这里会用到 **Proxy**和**Reflect**的点，感兴趣的可以看看我的这篇文章：[🔥花一个小时，迅速了解ES6~ES12的全部特性](https://juejin.cn/post/7068935394191998990#heading-36 "https://juejin.cn/post/7068935394191998990#heading-36")

**Proxy**：接受的参数是**对象**，所以第一个问题也解决了，入参就为对象。那么如何去刷新视图呢？这里就使用上述的**useUpdate**来强制刷新，使数据更改。

至于优化这一块，使用上文说的`useCreation`就好，再配合`useRef`来放`initialState`即可

### 代码

```
import { useRef } from 'react';
import { useUpdate, useCreation } from '../index';

const observer = <T extends Record<string, any>>(initialVal: T, cb: () => void): T => {

 const proxy = new Proxy<T>(initialVal, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver);
      return typeof res === 'object' ? observer(res, cb) : Reflect.get(target, key);
    },
    set(target, key, val) {
      const ret = Reflect.set(target, key, val);
      cb();
      return ret;
    },
  });

  return proxy;
}

const useReactive = <T extends Record<string, any>>(initialState: T):T => {
  const ref = useRef<T>(initialState);
  const update = useUpdate();

  const state = useCreation(() => {
    return observer(ref.current, () => {
      update();
    });
  }, []);

  return state
};

export default useReactive;

```

这里先说下`TS`，因为我们不知道会传递什么类型的`initialState`所以在这需要使用**泛型**，我们接受的参数是**对象**，可就是 key-value 的形式，其中 key 为 string，value 可以是 任意类型，所以我们使用 `Record<string, any>`

有不熟悉的小伙伴可以看看我的这篇文章： [一篇让你完全够用TS的指南](https://juejin.cn/post/7088304364078497800#heading-82 "https://juejin.cn/post/7088304364078497800#heading-82")（又推销一遍，有点打广告，别在意～）

再来说下`拦截这块`,我们只需要拦截**设置（set）** 和 **获取（get）** 即可，其中：

* 设置这块，需要改变是图，也就是说需要，使用**useUpdate**来强制刷新
* 获取这块，需要判断其是否为对象，是的话继续递归，不是的话返回就行

### 验证

接下来我们来验证一下我们写的 `useReactive`,我们将以 字符串、数字、布尔、数组、函数、计算属性几个方面去验证一下：

```
    import { Button } from 'antd-mobile';
    import React from 'react';
    import { useReactive } from '@/components'

    const Index:React.FC<any> = (props)=> {

      const state = useReactive<any>({
        count: 0,
        name: '小杜杜',
        flag: true,
        arr: [],
        bugs: ['小杜杜', 'react', 'hook'],
        addBug(bug:string) {
          this.bugs.push(bug);
        },
        get bugsCount() {
          return this.bugs.length;
        },
      })

      return (
        <div style={{padding: 20}}>
          <div style={{fontWeight: 'bold'}}>基本使用：</div>
           <div style={{marginTop: 8}}> 对数字进行操作：{state.count}</div>
           <div style={{margin: '8px 0', display: 'flex',justifyContent: 'flex-start'}}>
             <Button color='primary' onClick={() => state.count++ } >加1</Button>
             <Button color='primary' style={{marginLeft: 8}} onClick={() => state.count-- } >减1</Button>
             <Button color='primary' style={{marginLeft: 8}} onClick={() => state.count = 7 } >设置为7</Button>
           </div>
           <div style={{marginTop: 8}}> 对字符串进行操作：{state.name}</div>
           <div style={{margin: '8px 0', display: 'flex',justifyContent: 'flex-start'}}>
             <Button color='primary' onClick={() => state.name = '小杜杜' } >设置为小杜杜</Button>
             <Button color='primary' style={{marginLeft: 8}} onClick={() => state.name = 'Domesy'} >设置为Domesy</Button>
           </div>
           <div style={{marginTop: 8}}> 对布尔值进行操作：{JSON.stringify(state.flag)}</div>
           <div style={{margin: '8px 0', display: 'flex',justifyContent: 'flex-start'}}>
             <Button color='primary' onClick={() => state.flag = !state.flag } >切换状态</Button>
           </div>
           <div style={{marginTop: 8}}> 对数组进行操作：{JSON.stringify(state.arr)}</div>
           <div style={{margin: '8px 0', display: 'flex',justifyContent: 'flex-start'}}>
             <Button color="primary" onClick={() => state.arr.push(Math.floor(Math.random() * 100))} >push</Button>
             <Button color="primary" style={{marginLeft: 8}} onClick={() => state.arr.pop()} >pop</Button>
             <Button color="primary" style={{marginLeft: 8}} onClick={() => state.arr.shift()} >shift</Button>
             <Button color="primary" style={{marginLeft: 8}} onClick={() => state.arr.unshift(Math.floor(Math.random() * 100))} >unshift</Button>
             <Button color="primary" style={{marginLeft: 8}} onClick={() => state.arr.reverse()} >reverse</Button>
             <Button color="primary" style={{marginLeft: 8}} onClick={() => state.arr.sort()} >sort</Button>
           </div>
           <div style={{fontWeight: 'bold', marginTop: 8}}>计算属性：</div>
           <div style={{marginTop: 8}}>数量：{ state.bugsCount } 个</div>
           <div style={{margin: '8px 0'}}>
             <form
               onSubmit={(e) => {
                 state.bug ? state.addBug(state.bug) : state.addBug('domesy')
                 state.bug = '';
                 e.preventDefault();
               }}
             >
               <input type="text" value={state.bug} onChange={(e) => (state.bug = e.target.value)} />
               <button type="submit"  style={{marginLeft: 8}} >增加</button>
               <Button color="primary" style={{marginLeft: 8}} onClick={() => state.bugs.pop()}>删除</Button>
             </form>

           </div>
           <ul>
             {
               state.bugs.map((bug:any, index:number) => (
                 <li key={index}>{bug}</li>
               ))
             }
           </ul>
        </div>
      );
    }

    export default Index;

```

效果如下：

![useuse.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9571ffdbb94c478bbb34e8b37d9c454f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

案例2: useEventListener
---------------------

缘由：我们监听各种事件的时候需要做监听，如：监听点击事件、键盘事件、滚动事件等，我们将其统一封装起来，方便后续调用

说白了就是在`addEventListener`的基础上进行封装，我们先来想想在此基础上需要什么？

首先，`useEventListener`的入参可分为三个

* 第一个`event`是事件（如：click、keydown）
* 第二个回调函数（所以不需要出参）
* 第三个就是目标（是某个节点还是全局）

在这里需要注意一点就是在**销毁的时候需要移除对应的监听事件**

### 代码

```
    import { useEffect } from 'react';

    const useEventListener = (event: string, handler: (...e:any) => void, target: any = window) => {

      useEffect(() => {
        const targetElement  = 'current' in target ? target.current : window;
        const useEventListener = (event: Event) => {
          return handler(event)
        }
        targetElement.addEventListener(event, useEventListener)
        return () => {
          targetElement.removeEventListener(event, useEventListener)
        }
      }, [event])
    };

    export default useEventListener;

```

注：这里把`target`默认设置成了`window`，至于为什么要这么写：`'current' in target`是因为我们用`useRef`拿到的值都是 `ref.current`

### 支持SSR（优化）

在原本的ahooks代码中，会用到`useEffectWithTarget`，一开搞错了，以为这个是类似于`useCreation`的优化作用，其实不是，这么做的目的是为了支持`SSR`

因为`SSR`的类型是 `() => HTMLElement`， 如果将这个作为`useEffect`的参数，那么就相当于`deps`不存在，也就是有其他变量改变时，`useEffect`都会执行，所以为了全面支持`target`动态变化，才会有这个`useEffectWithTarget`的诞生～

### 详细代码

```
    import { useEffect } from 'react';
    import type { DependencyList } from 'react';
    import { useRef } from 'react';
    import useLatest from '../useLatest';
    import useUnmount from '../useUnmount';

    const depsAreSame = (oldDeps: DependencyList, deps: DependencyList):boolean => {
      for(let i = 0; i < oldDeps.length; i++) {
        if(!Object.is(oldDeps[i], deps[i])) return false
      }
      return true
    }

    const useEffectTarget = (effect: () => void, deps:DependencyList, target: any) => {

      const hasInitRef = useRef(false); // 一开始设置初始化
      const elementRef = useRef<(Element | null)[]>([]);// 存储具体的值
      const depsRef = useRef<DependencyList>([]); // 存储传递的deps
      const unmountRef = useRef<any>(); // 存储对应的effect

      // 初始化 组件的初始化和更新都会执行
      useEffect(() => {
        const targetElement  = 'current' in target ? target.current : window;

        // 第一遍赋值
        if(!hasInitRef.current){
          hasInitRef.current = true;

          elementRef.current = targetElement;
          depsRef.current = deps;
          unmountRef.current = effect();
          return
        }
        // 校验变值: 目标的值不同， 依赖值改变
        if(elementRef.current !== targetElement || !depsAreSame(deps, depsRef.current)){
          //先执行对应的函数
          unmountRef.current?.();
          //重新进行赋值
          elementRef.current = targetElement;
          depsRef.current = deps; 
          unmountRef.current = effect();
        }
      })

      useUnmount(() => {
        unmountRef.current?.();
        hasInitRef.current = false;
      })
    }

    const useEventListener = (event: string, handler: (...e:any) => void, target: any = window) => {
      const handlerRef = useLatest(handler);

      useEffectTarget(() => {
        const targetElement  = 'current' in target ? target.current : window;

        //  防止没有 addEventListener 这个属性
        if(!targetElement?.addEventListener) return;

        const useEventListener = (event: Event) => {
          return handlerRef.current(event)
        }
        targetElement.addEventListener(event, useEventListener)
        return () => {
          targetElement.removeEventListener(event, useEventListener)
        }
      }, [event], target)
    };

    export default useEventListener;

```

* 在这里只用`useEffect`是因为，在更新和初始化的情况下都需要使用
* 必须要防止没有 `addEventListener`这个属性的情况，监听的目标有可能没有加载出来

### 验证

验证一下`useEventListener`是否能够正常的使用，顺变验证一下初始化、卸载的，代码：

```
    import React, { useState, useRef } from 'react';
    import { useEventListener } from '@/components'
    import { Button } from 'antd-mobile';

    const Index:React.FC<any> = (props)=> {

      const [count, setCount] = useState<number>(0)
      const [flag, setFlag] = useState<boolean>(true)
      const [key, setKey] = useState<string>('')
      const ref = useRef(null);

      useEventListener('click', () => setCount(v => v +1), ref)
      useEventListener('keydown', (ev) => setKey(ev.key));

      return (
        <div style={{padding: 20}}>
          <Button color='primary' onClick={() => {setFlag(v => !v)}}>切换 {flag ? 'unmount' : 'mount'}</Button>
          {
            flag && <div>
              <div>数字：{count}</div>
              <button ref={ref} >加1</button>
              <div>监听键盘事件：{key}</div>
            </div>
          }

        </div>
      );
    }

    export default Index;

```

效果：

![useEvent.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9dbb36ddad2d41f9917b8db7355d283a~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

我们可以利用`useEventListener`这个钩子去封装其他钩子，如 鼠标悬停，长按事件，鼠标位置等，在这里在举一个鼠标悬停的小例子

### 小例子 useHover

**useHover**：监听 DOM 元素是否有鼠标悬停

这个就很简单了，只需要通过 `useEventListener`来监听`mouseenter`和`mouseleave`即可，在返回布尔值就行了：

```
    import { useState } from 'react';
    import useEventListener  from '../useEventListener';

    interface Options {
      onEnter?: () => void;
      onLeave?: () => void;
    }

    const useHover = (target:any, options?:Options): boolean => {

      const [flag, setFlag] = useState<boolean>(false)
      const { onEnter, onLeave } = options || {};

      useEventListener('mouseenter', () => {
        onEnter?.()
        setFlag(true)
      }, target)

      useEventListener('mouseleave', () => {
        onLeave?.()
        setFlag(false)
      }, target)

      return flag
    };

    export default useHover;

```

效果：

![useHover.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d77611b1d33647e689398e380f1fdb16~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

案例3: 有关时间的Hooks
---------------

在这里主要介绍有关时间的三个hooks,分别是：`useTimeout`、`useInterval`和`useCountDown`

### useTimeout

**useTimeout**：一段时间内，执行一次

传递参数只要函数和延迟时间即可，需要注意的是卸载的时候将定时器清除下就OK了

详细代码：

```
    import { useEffect } from 'react';
    import useLatest from '../useLatest';


    const useTimeout = (fn:() => void, delay?: number): void => {

      const fnRef = useLatest(fn)

      useEffect(() => {
        if(!delay || delay < 0) return;

        const timer = setTimeout(() => {
          fnRef.current();
        }, delay)

        return () => {
          clearTimeout(timer)
        }
      }, [delay])

    };

    export default useTimeout;

```

效果展示：

![img3.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/38ea46cb005e4b7e92979bc56ffb76f9~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

### useInterval

**useInterval**: 每过一段时间内一直执行

大体上与`useTimeout`一样，多了一个是否要首次渲染的参数`immediate`

详细代码：

```
    import { useEffect } from 'react';
    import useLatest from '../useLatest';


    const useInterval = (fn:() => void, delay?: number, immediate?:boolean): void => {

      const fnRef = useLatest(fn)

      useEffect(() => {
        if(!delay || delay < 0) return;
        if(immediate) fnRef.current();

        const timer = setInterval(() => {
          fnRef.current();
        }, delay)

        return () => {
          clearInterval(timer)
        }
      }, [delay])

    };

    export default useInterval;

```

效果展示： ![img4.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/47b323c0e8b04546a5a30f51b9eb3488~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

### useCountDown

**useCountDown**：简单控制倒计时的钩子

跟之前一样我们先来想想这个钩子需要什么：

* 我们要做倒计时的钩子首先需要一个目标时间（targetDate），控制时间变化的秒数（interval默认为1s），然后就是倒计时完成后所触发的函数（onEnd）
* 返参就更加一目了然了，返回的是两个时间差的数值（time），再详细点可以换算成对应的天、时、分等（formattedRes）

#### 详细代码

```
    import { useState, useEffect, useMemo } from 'react';
    import useLatest from '../useLatest';
    import dayjs from 'dayjs';

    type DTime = Date | number | string | undefined;

    interface Options {
      targetDate?: DTime;
      interval?: number;
      onEnd?: () => void;
    }

    interface FormattedRes {
      days: number;
      hours: number;
      minutes: number;
      seconds: number;
      milliseconds: number;
    }

    const calcTime = (time: DTime) => {
      if(!time) return 0

      const res = dayjs(time).valueOf() - new Date().getTime(); //计算差值

      if(res < 0) return 0

      return res
    }

    const parseMs = (milliseconds: number): FormattedRes => {
      return {
        days: Math.floor(milliseconds / 86400000),
        hours: Math.floor(milliseconds / 3600000) % 24,
        minutes: Math.floor(milliseconds / 60000) % 60,
        seconds: Math.floor(milliseconds / 1000) % 60,
        milliseconds: Math.floor(milliseconds) % 1000,
      };
    };

    const useCountDown = (options?: Options) => {

      const { targetDate, interval = 1000, onEnd } = options || {};

      const [time, setTime] = useState(() =>  calcTime(targetDate));
      const onEndRef = useLatest(onEnd);

      useEffect(() => {

        if(!targetDate) return setTime(0)

        setTime(calcTime(targetDate))

        const timer = setInterval(() => {
          const target = calcTime(targetDate);

          setTime(target);
          if (target === 0) {
            clearInterval(timer);
            onEndRef.current?.();
          }
        }, interval);
        return () => clearInterval(timer);
      },[targetDate, interval])

      const formattedRes = useMemo(() => {
        return parseMs(time);
      }, [time]);

      return [time, formattedRes] as const
    };

    export default useCountDown;

```

#### 验证

```
    import React, { useState } from 'react';
    import { useCountDown } from '@/components'
    import { Button, Toast } from 'antd-mobile';

    const Index:React.FC<any> = (props)=> {

      const [_, formattedRes] = useCountDown({
        targetDate: '2022-12-31 24:00:00',
      });

      const { days, hours, minutes, seconds, milliseconds } = formattedRes;

      const [count, setCount] = useState<number>();

      const [countdown] = useCountDown({
        targetDate: count,
        onEnd: () => {
          Toast.show('结束')
        },
      });

      return (
        <div style={{padding: 20}}>
          <div> 距离 2022-12-31 24:00:00 还有 {days} 天 {hours} 时 {minutes} 分 {seconds} 秒 {milliseconds} 毫秒</div>
          <div>
            <p style={{marginTop: 12}}>动态变化：</p>
            <Button color='primary' disabled={countdown !== 0} onClick={() => setCount(Date.now() + 3000)}>
              {countdown === 0 ? '开始' : `还有 ${Math.round(countdown / 1000)}s`}
            </Button>
            <Button style={{marginLeft: 8}} onClick={() => setCount(undefined)}>停止</Button>
          </div>
        </div>
      );
    }

    export default Index;

```

#### 效果展示

![img5.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f41eaef407564c86b27aac51c4539da2~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

## End

参考
--

* [ahooks](https://link.juejin.cn/?target=https%3A%2F%2Fahooks.js.org%2Fzh-CN%2Fhooks%2Fuse-request%2Findex "https://ahooks.js.org/zh-CN/hooks/use-request/index")

总结
--

简单的做下总结：

* 一个优秀的hooks一定会具备`useMemo`、`useCallback`等api优化
* 制作自定义hooks遇到传递过来的值，优先考虑使用`useRef`，再考虑用`useState`，可以直接使用`useLatest`，防止拿到的值不是最新值
* 在封装的时候，应该将存放的值放入 `useRef`中，通过一个状态去设置他的初始化，在判断什么情况下来更新所对应的值，明确入参与出参的具体意义，如`useCreation`和`useEventListener`
