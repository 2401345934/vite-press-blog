---
createTime: 2022/10/19
tag: 'React源码'
---
# 协调与调度

## render阶段作用是什么？

   根据一次更新中产生的新状态值，通过 React.createElement ，替换成新的状态，得到新的 React element 对象，新的 element 对象上，保存了最新状态值。 createElement 会产生一个全新的props。到此 render 函数使命完成了。

## React 几种控制 render 方法

* 第一种就是从父组件直接隔断子组件的渲染，经典的就是 memo，缓存 element 对象。
* 第二种就是组件从自身来控制是否 render ，比如：PureComponent ，shouldComponentUpdate 。

## 缓存React.element对象

``` tsx
/*子组件*/
function Children ({ number }){
    console.log('子组件渲染')
    return <div>let us learn React!  { number } </div>
}
/*父组件*/
export default class Index extends React.Component{
    constructor(props){
        super(props)
        this.state={
            numberA:0,
            numberB:0,
        }
        this.component =  <Children number={this.state.numberA} />
    }
    controllComponentRender=()=>{ /*通过此函数判断*/
        const { props } = this.component
        if(props.number !== this.state.numberA ){ /*只有 numberA 变化的时候，重新创建 element 对象*/
            return this.component = React.cloneElement(this.component,{ number:this.state.numberA })
        }
        return this.component
    }
    render(){
       return <div>
          { this.controllComponentRender()  }
          <button onClick={ ()=> this.setState({ numberA:this.state.numberA + 1 }) } >改变numberA</button>
          <button onClick={ ()=> this.setState({ numberB:this.state.numberB + 1 }) }  >改变numberB</button>
       </div>
    }
}
```

* 首先把 Children 组件对应的 element 对象，挂载到组件实例的 component 属性下。
* 通过 controllComponentRender 控制渲染 Children 组件，如果 numberA 变化了，证明 Children的props 变化了，那么通过 cloneElement 返回新的 element 对象，并重新赋值给 component ，如果没有变化，那么直接返回缓存的 component 。

## useMemo

``` tsx
const cacheSomething = useMemo(create,deps)
```

* create：第一个参数为一个函数，函数的返回值作为缓存值，如上 demo 中把 Children 对应的 element 对象，缓存起来。
* deps： 第二个参数为一个数组，存放当前 useMemo 的依赖项，在函数组件下一次执行的时候，会对比 deps 依赖项里面的状态，是否有改变，如果有改变重新执行 create ，得到新的缓存值。
* cacheSomething：返回值，执行 create 的返回值。如果 deps 中有依赖项改变，返回的重新执行 create 产生的值，否则取上一次缓存值。

### useMemo原理

useMemo 会记录上一次执行 create 的返回值，并把它绑定在函数组件对应的 fiber 对象上，只要组件不销毁，缓存值就一直存在，但是 deps 中如果有一项改变，就会重新执行 create ，返回值作为新的值记录到 fiber 对象上。

### useMemo应用场景

* 可以缓存 element 对象，从而达到按条件渲染组件，优化性能的作用。
* 如果组件中不期望每次 render 都重新计算一些值,可以利用 useMemo 把它缓存起来。
* 可以把函数和属性缓存起来，作为 PureComponent 的绑定方法，或者配合其他Hooks一起使用。

## PureComponent

纯组件是一种发自组件本身的渲染优化策略，当开发类组件选择了继承 PureComponent ，就意味这要遵循其渲染规则。规则就是浅比较 state 和 props 是否相等。

* 对于 props ，PureComponent 会浅比较 props 是否发生改变，再决定是否渲染组件
* 对于 state ，如上也会浅比较处理
* 浅比较只会比较基础数据类型，对于引用类型，比如 demo 中 state 的 obj ，单纯的改变 obj 下属性是不会促使组件更新的，因为浅比较两次 obj 还是指向同一个内存空间，想要解决这个问题也容易，浅拷贝就可以解决，将如上 changeObjNumber 这么修改。这样就是重新创建了一个 obj ，所以浅比较会不相等，组件就会更新了。

### PureComponent 原理及其浅比较原则

原型链上会有 isPureReactComponent 属性。

``` tsx
// react/src/ReactBaseClasses.js
function checkShouldComponentUpdate(){
     if (typeof instance.shouldComponentUpdate === 'function') {
         return instance.shouldComponentUpdate(newProps,newState,nextContext)  /*shouldComponentUpdate 逻辑*/
     }
    if (ctor.prototype && ctor.prototype.isPureReactComponent) {
        return  !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState)
    }
}
```

* isPureReactComponent 就是判断当前组件是不是纯组件的，如果是 PureComponent 会浅比较 props 和 state 是否相等。
* 还有一点值得注意的就是 shouldComponentUpdate 的权重，会大于 PureComponent。

### shallowEqual 是如何浅比较的呢

* 第一步，首先会直接比较新老 props 或者新老 state 是否相等。如果相等那么不更新组件。
* 第二步，判断新老 state 或者 props ，有不是对象，或者为 null 的，那么直接返回 false ，更新组件。
* 第三步，通过 Object.keys 将新老 props 或者新老 state 的属性名 key 变成数组，判断数组的长度是否相等，如果不相等，证明有属性增加或者减少，那么更新组件。
* 第四步，遍历老 props 或者老 state ，判断对应的新 props 或新 state ，有没有与之对应并且相等的（这个相等是浅比较），如果有一个不对应或者不相等，那么直接返回 false ，更新组件。

### shouldComponentUpdate

  shouldComponentUpdate 可以根据传入的新的 props 和 state ，或者 newContext 来确定是否更新组件

## React.memo

``` tsx
React.memo(Component,compare)
```

React.memo 可作为一种容器化的控制渲染方案，可以对比 props 变化，来决定是否渲染组件，React.memo 接受两个参数，第一个参数 Component 原始组件本身，第二个参数 compare 是一个函数，可以根据一次更新中 props 是否相同决定原始组件是否重新渲染。

### memo的几个特点是

* React.memo: 第二个参数 返回 true 组件不渲染 ， 返回 false 组件重新渲染。和 shouldComponentUpdate 相反，shouldComponentUpdate : 返回 true 组件渲染 ， 返回 false 组件不渲染。
* memo 当二个参数 compare 不存在时，会用浅比较原则处理 props ，相当于仅比较 props 版本的 pureComponent
* memo 同样适合类组件和函数组件。

## 有没有必要在乎组件不必要渲染

在正常情况下，无须过分在乎 React 没有必要的渲染，要理解执行 render 不等于真正的浏览器渲染视图，render 阶段执行是在 js 当中，js 中运行代码远快于浏览器的 Rendering 和 Painting 的，更何况 React 还提供了 diff 算法等手段，去复用真实 DOM 。
 什么时候需要注意渲染节流。
但是对于以下情况，值得开发者注意，需要采用渲染节流：

* 第一种情况数据可视化的模块组件（展示了大量的数据），这种情况比较小心因为一次更新，可能伴随大量的 diff ，数据量越大也就越浪费性能，所以对于数据展示模块组件，有必要采取 memo ， shouldComponentUpdate 等方案控制自身组件渲染。
* 第二种情况含有大量表单的页面，React 一般会采用受控组件的模式去管理表单数据层，表单数据层完全托管于 props 或是 state ，而用户操作表单往往是频繁的，需要频繁改变数据层，所以很有可能让整个页面组件高频率 render 。
* 第三种情况就是越是靠近 app root 根组件越值得注意，根组件渲染会波及到整个组件树重新 render ，子组件 render ，一是浪费性能，二是可能执行 useEffect ，componentWillReceiveProps 等钩子，造成意想不到的情况发生。

## 一些开发中的细节问题

* 开发过程中对于大量数据展示的模块，开发者有必要用 shouldComponentUpdate ，PureComponent来优化性能。
* 对于表单控件，最好办法单独抽离组件，独自管理自己的数据层，这样可以让 state 改变，波及的范围更小。
* 如果需要更精致化渲染，可以配合 immutable.js 。
* 组件颗粒化，配合 memo 等 api ，可以制定私有化的渲染空间。

## useCallback 和 useMemo 有什么区别？

* useCallback 第一个参数就是缓存的内容，
* useMemo 需要执行第一个函数，返回值为缓存的内容，
* 比起 useCallback ， useMemo 更像是缓存了一段逻辑，或者说执行这段逻辑获取的结果。那么对于缓存 element 用 useCallback 可以吗，答案是当然可以了。
