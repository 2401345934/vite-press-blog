---
createTime: 2022/11/17
tag: 'React,面试题'
---
# React的setState是异步的还是同步的

开发中当组件中的状态发生了变化，页面并不会重新渲染。我们必须要通过setState来告知React数据已经发生了变化，重新渲染页面。

setState异步更新
------------

先来看下面的例子：

```jsx
constructor() {
    super();
    this.state = {
      message: "Hello World",
    };
}
changeText() {
   this.setState({
      message: "Hello React",
   });
   console.log(this.state.message); // Hello World
}

```

最终打印的结果是Hello World；

可见setState是异步的操作，我们并不能在执行完setState之后立马拿到最新的state的结果

##### 那么为什么setState设计为异步呢？

* setState设计为异步，可以显著的提升性能

  * 如果每次调用setState都进行一次更新，那么意味着render函数会被频繁调用，界面重新渲染，这样效率是很低的；
  * 最好的办法是获取多个更新，之后进行批量处理；
* 如果同步更新了state，但是还没有执行render函数，那么state和props不能保持同步；

  * state和props不能保持一致性，会在开发中产生很多的问题；（比如，组件嵌套时影响子组件中的状态）

##### 如何获取异步的结果

1. setState的回调

    1. setState接受两个参数：第二个参数是一个回调函数，这个回调函数会在更新后会执行；

        ```jsx
        changeText() {
            this.setState({
              message: "Hello React",
            },()=>{
                console.log('-----',this.state.message); // Hello React
            });
          }
        
        ```

2. 也可以在生命周期函数中获取：

    ```jsx
       componentDidUpdate(prevProps, prevState, snapshot){
       console.log(this.state.message);// Hello React
       }
    
    ```

setState一定是异步的吗？
----------------

**React18版本之前**

其实可以分成两种情况：

* 在组件生命周期或React合成事件中，setState是异步的；
* 在setTimeout或者原生DOM事件中，setState是同步的

验证一：在setTimeout中的更新：

```jsx
setTimeout(() => {
      this.setState({
        message: "Hello React",
      });
      console.log(this.state.message); // Hello React
 }, 0);

```

验证二：原生DOM事件：

```js
componentDidMount() {
    const btnEl = document.querySelector("#btn");
    btnEl.addEventListener("click", () => {
      this.setState({
        message: "Hello React",
      });
      console.log(this.state.message); // Hello React
    });
  }

```

**React18版本之后**

setState默认是异步的

* 在React18之后，默认所有的操作都被放到了批处理中(异步处理)

![1668432810427.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8d5a6cf3052845259046e8e00c80e1fe~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

* 如果希望代码可以同步拿到，则需要执行特殊的flushSync操作：

    ```js
    import { flushSync } from "react-dom";
    changeText() {
        flushSync(() => {
          this.setState({
            message: "Hello React",
          });
        });
        console.log(this.state.message); // Hello React
      }
    
    ```
