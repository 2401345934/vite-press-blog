---
createTime: 2022/11/13
tag: '场景题,浏览器'
---
# requestAnimationFrame 和 requestIdleCallback

## requestIdleCallback

### 原理

将在浏览器的空闲时段内调用的函数排队。这使开发者能够在主事件循环上执行后台和低优先级工作，而不会影响延迟关键事件，如动画和输入响应。函数一般会按先进先调用的顺序执行，然而，如果回调函数指定了执行超时时间timeout，则有可能为了在超时前执行函数而打乱执行顺序。

### 使用方式

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ric</title>
  <style>
    * {
      width: 100%;
      height: 100%;
      text-align: center;
      margin: 0;
    }
    #div {
      position: absolute;
      height: auto;
      top: 50%;
      margin-top: -50px;
    }
  </style>
</head>
<body>
  <h3 style="display:none;">单击“ESC”退出当前状态</h3>
  <div id="div">请点击当前屏幕，获取ric的相关参数</div>
</body>
<script>
  let idleCallback = null
  let isExit = false
  function ricCB (idleDeadline) {
    // didTimeout表示是否超时
    const didTimeout = idleDeadline.didTimeout ? '超时' : '未超时'
    // timeRemaining()表示当前帧还剩余多少时间（以毫秒计算）
    // 一般一帧的时间是16.6ms，所以timeRemaining()取到的时间是小于这个值
    // 如果为0，表示当前帧已经没有时间去处理回调
    // 若强行调用回调，可能导致丢帧或者卡顿
    const timeRemaining = idleDeadline.timeRemaining()
    // 业务逻辑代码
    document.getElementById('div').innerText = `当前帧的前提下：\n是否超时:${didTimeout}; \n当前帧剩余时间${timeRemaining}ms`
  }
  document.body.onclick = function () {
    window.cancelIdleCallback(idleCallback)
    if (!isExit) {
      idleCallback = window.requestIdleCallback(ricCB)
      document.querySelector('h3').style.display = 'block'
    }
  }
  document.onkeydown = function (event) {
    // ESC 退出当前调用
    if (event.code === 'Escape') {
      isExit = true
    }
  }
</script>
</html>

```

### 演示效果

![演示结果](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc73cd924e3f4ec3b34c87c62e47015d~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

## requestAnimationFrame

### 原理

告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行

### 使用方式

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>raf</title>
  <style>
    * {
      width: 100%;
      height: 100%;
      text-align: center;
      margin: 0;
    }
    #div {
      position: fixed;
      height: auto;
      top: 50%;
      margin-top: -50px;
    }
  </style>
</head>
<body>
  <div id="div">页面将在3秒后，显示当前鼠标的实时位置</div>
  <div style="height:100%;"></div>
  <div style="height:300%; padding-right: 100%;"><div id="div1" style="margin-left: 100%;width:100px; height: 100px; background-color: cornflowerblue;"></div></div>
</body>
<script>
  let isExit = false
  let rafId = null
  function rafCB (idleDeadline) {
    if (isExit) return window.cancelAnimationFrame(rafId)
    // 业务逻辑代码
    const dom = document.getElementById('div1')
    const domRect = dom.getBoundingClientRect()
    document.getElementById('div').innerText = `蓝色框所在的位置(请注意滚动条位置)：\n距离页面左边: ${domRect.left}; \n距离页面顶部: ${domRect.top}`
    rafId = window.requestAnimationFrame(rafCB)
  }
  setTimeout(() => {
    rafId = window.requestAnimationFrame(rafCB)
  }, 3000)
  document.onkeydown = function (event) {
    // ESC 退出当前调用
    if (event.code === 'Escape') {
      isExit = true
    }
  }
</script>
</html>

```

### 演示效果

![演示效果](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dd42180e1de741dbb88d8d4501c7c2cb~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

## requestAnimationFrame 和 requestIdleCallback 是是宏任务还是微任务

### 一、思考

要搞清楚requestAnimationFrame和requestIdleCallback是宏任务还是微任务就必须要搞清楚下面几个问题：

1. 浏览器在每一轮Event Loop事件循环中都会去渲染屏幕吗？
2. requestAnimationFrame在哪个阶段执行，是在渲染前还是渲染后？是在微任务执行前还是执行后？
3. requestIdleCallback在哪个阶段执行，是在渲染前还是渲染后？ 是在微任务执行前还是执行后？

### 二、任务的执行时机

在浏览器的Event Loop中是有多个任务队列的，每个任务队列的执行时机是不一样的，下面直接上干货，说说浏览器执行任务的顺序

1. 从task任务队列中取第一个task（比如setTimeout、setIntervel的回调，也可以将同一轮循环中的所有同步代码看作是一个宏任务），执行它。
2. 执行微任务队列里的所有微任务。
3. 浏览器判断是否更新渲染屏幕，如果需要重新绘制，则执行步骤4-13，如果不需要重新绘制，则流程回到步骤1，这样不断循环。
4. 触发resize、scroll事件，建立媒体查询（执行一个任务中如果生成了微任务，则执行完任务该后就会执行所有的微任务，然后再执行下一个任务）。
5. 建立css动画（执行一个任务中如果生成了微任务，则执行完该任务后就会执行所有的微任务，然后再执行下一个任务）。
6. 执行requestAnimationFrame回调（执行一个任务中如果生成了微任务，则执行完该任务后就会执行所有的微任务，然后再执行下一个任务）。
7. 执行 IntersectionObserver 回调（执行一个任务中如果生成了微任务，则执行完该任务后就会执行所有的微任务，然后再执行下一个任务）。
8. 更新渲染屏幕。
9. 浏览器判断当前帧是否还有空闲时间，如果有空闲时间，则执行步骤10-12。
10. 从 requestIdleCallback回调函数队列中取第一个，执行它。
11. 执行微任务队列里的所有微任务。
12. 流程回到步骤9，直到requestIdleCallback回调函数队列清空或当前帧没有空闲时间。
13. 流程回到步骤1，这样不断循环。

### 三、代码验证

我们可以写一些代码到Chrome浏览器中验证一下，看看requestAnimationFrame和requestIdleCallback的执行顺序是怎样的。

运行以下这段代码

```js
requestAnimationFrame(()=>{
    console.log(111);
    setTimeout(() => {
        console.log(222);
    });
    Promise.resolve().then(() => {
        console.log(333);
    });
})

requestAnimationFrame(() => {
    console.log(444);
    Promise.resolve().then(() => {
        console.log(555);
    });
})

```

输出结果

![](https://upload-images.jianshu.io/upload_images/18898562-e4856ec24d669731.png)

运行以下这段代码

```js
requestIdleCallback(() => {
    console.log(111);
    setTimeout(() => {
        console.log(222);
    })
    Promise.resolve().then(() => {
        console.log(333);
    })
})

requestIdleCallback(() => {
    console.log(444);
    Promise.resolve().then(() => {
        console.log(555);
    })
})

```

输出结果

![](https://upload-images.jianshu.io/upload_images/18898562-0b4b2d0773f1faf8.png)

运行以下这段代码

```js
Promise.resolve().then(() => {
    console.log(111);
    setTimeout(() => {
        console.log(222);
    })
    Promise.resolve().then(() => {
        console.log(333);
    })
})

Promise.resolve().then(() => {
    console.log(444);
    Promise.resolve().then(() => {
        console.log(555);
    })
})

```

输出结果

![](https://upload-images.jianshu.io/upload_images/18898562-a7146b4b69b8ab61.png)

### 四、总结

1. requestAnimationFrame和requestIdleCallback是和宏任务性质一样的任务，只是他们的执行时机不同而已。也有人说它们既不是宏任务也不是微任务，其实我们不必纠结这个，我们所要做的就是知道他们的执行时机就好。
2. 浏览器在每一轮Event Loop事件循环中不一定会去重新渲染屏幕，会根据浏览器刷新率以及页面性能或是否后台运行等因素判断的，浏览器的每一帧是比较固定的，会尽量保持60Hz的刷新率运行，每一帧中间可能会进行多轮事件循环。
3. requestAnimationFrame回调的执行与task和microtask无关，而是与浏览器是否渲染相关联的。它是在浏览器渲染前，在微任务执行后执行。
4. requestIdleCallback是在浏览器渲染后有空闲时间时执行，如果requestIdleCallback设置了第二个参数timeout，则会在超时后的下一帧强制执行。

## requestAnimationFrame 和 setTimeout 区别

### 前言

对于现在技术社区的现状的，我分析用户画像 觉得大部分的用户更多的是喜欢短频快的节奏文章，所以故尝试用最短时间挖掘简单的面试题，将背后的知识整理分享给大家，喜欢在后续的面试过程中，可以对你有帮助，**如果刚好是自己的知识盲区不妨帮忙点赞支持一下**

### 背景

相信大部分的开发者都使用过 `setTimeout` 这个 API, 如果没有使用过可以，使用跳转地址[setTimeout](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FsetTimeout "https://developer.mozilla.org/zh-CN/docs/Web/API/setTimeout") 但是我相信很多开发者是没有使用过`requestAnimationFrame` 这个 API的，因为我们平时开发中几乎不需要用到，相信也有朋友在 `React`。

下面我们分开介绍两个API，在正式开始之前我们不妨先学习一下如何使用 `requestAnimationFrame`

### requestAnimationFrame

顾明思议，`Request`，`Animation`，`Frame`, 在动画帧请求做件事情，具体可以看[科普文章](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FWindow%2FrequestAnimationFrame "https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame")

> **`window.requestAnimationFrame()`** 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行

#### 语法

```
window.requestAnimationFrame(callback);
```

#### 用法

一般用在操作动画帧上，在物体需要在一帧渲染之前执行某个动画。一般是更好的优化动画上

```js
const element = document.getElementById('some-element-you-want-to-animate'); // 需要移动的物体元素

let start;

function step(timestamp) {
  if (start === undefined) start = timestamp;
    
  const elapsed = timestamp - start;

  //这里使用`Math.min()`确保元素刚好停在200px的位置。
  element.style.transform = 'translateX(' + Math.min(0.1 * elapsed, 200) + 'px)'; // 每次移动 0.1 * elapsed 时间

  if (elapsed < 2000) { // 在两秒后停止动画
    window.requestAnimationFrame(step); 
  }
}

window.requestAnimationFrame(step); // 执行动画

```

#### 返回值

你没看错 `requestAnimationFrame` 是有返回值的。

一个 `long` 整数，请求 ID ，是回调列表中唯一的标识。是个非零值，没别的意义。你可以传这个值给 [`window.cancelAnimationFrame()`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FWindow%2FcancelAnimationFrame "https://developer.mozilla.org/zh-CN/docs/Web/API/Window/cancelAnimationFrame") 以取消回调函数。

`cancelAnimationFrame` 调用参数是先前调用 `window.requestAnimationFrame()`方法时候返回的ID

### setTimeout

下面介绍的 `setTimeout` 相信大部分的开发者都使用过这个API吧，而且可以说相当熟悉

#### 语法

```
var timeoutID = scope.setTimeout(function[ , delay, arg1, arg2, ...]);
var timeoutID = scope.setTimeout(function[, delay]);
var timeoutID = scope.setTimeout(code[, delay]);

```

#### 用法

用于延迟执行某个动作，或者可以循环调用自身，实现 `setInterval` 的效果,但注意需要释放 setTimeout 返回的 ID 利用`clearTimeout` 清空定时器。

```js
var timeoutID;

function delayedAlert() {
  timeoutID = window.setTimeout(slowAlert, 2000);
}

function slowAlert() {
  alert('That was really slow!');
}

function clearAlert() {
  window.clearTimeout(timeoutID);
}

```

#### 返回值

返回值`timeoutID`是一个正整数，表示定时器的编号。这个值可以传递给[`clearTimeout()`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FclearTimeout "https://developer.mozilla.org/zh-CN/docs/Web/API/clearTimeout")来取消该定时器。

这里有意思的点是 `setTimeout()`和[`setInterval()`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FsetInterval "https://developer.mozilla.org/zh-CN/docs/Web/API/setInterval")共用一个编号池，技术上，`clearTimeout()`和 [`clearInterval()`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FclearInterval "https://developer.mozilla.org/zh-CN/docs/Web/API/clearInterval") 可以互换。但是，为了避免混淆，不要混用取消定时函数。两者竟然是可以互换的

在同一个对象上（一个window或者worker），`setTimeout()`或者`setInterval()`在后续的调用不会重用同一个定时器编号。但是不同的对象使用独立的编号池。

### 两者对比

下面我们总结一下他们的差异

|  | requestAnimationFrame | setTimeout |
| --- | --- | --- |
| 语法 | window.requestAnimationFrame(callback); | setTimeout(callback, time) |
| 用法 | 用于动画帧渲染时候，优化动画渲染场景中 | 用于延迟执行某个动作的场景中 |
| 返回值 | 正整数（用于后续 cancelAnimationFrame） | 正整数 （用于后续 clearTimeout） |
| 调用周期 | 0.2 ~ 0.3 ms (大约1帧的时间) | 1 ~ 3 ms (setTimeout 第二个参数传入 0 情况下) |

所以两者其实在时间上来理解的话，是在不同的调用周期中执行，`setTimeout` 是没有办法在 0.2 ~ 0.3 ms范围内执行某个回调的，这里我们提到时间范围的概念，这里就不得不提到 `setTimeout` **最小延迟时间的概念**

### setTimeout 最小延迟时间

```
console.time('ok')
setTimeout(() => {console.timeEnd('ok')}, 0); // ok: 1.93115234375 ms 预期是 0ms 实际上 大于 1ms

```

有很多因素会导致setTimeout的回调函数执行比设定的预期值更久。

首先是浏览器之间的差异, 在浏览器中，`setTimeout()/`[`setInterval()`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FsetInterval "https://developer.mozilla.org/zh-CN/docs/Web/API/setInterval") 的每调用一次定时器的最小间隔是4ms，这通常是由于函数嵌套导致（嵌套层级达到一定深度），或者是由于已经执行的setInterval的回调函数阻塞导致的。例如：

```js
function cb() { f(); setTimeout(cb, 0); }
setTimeout(cb, 0);
```

```js
setInterval(f, 0);
```

在Chrome 和 Firefox中， 定时器的第5次调用被阻塞了；在Safari是在第6次；Edge是在第3次。Gecko 从这个版本 [version 56](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FMozilla%2FFirefox%2FReleases%2F56 "https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/56")开始对 `setInterval()` 开始采用这样的机制（`setTimeout()`已经实现，具体请参考以下内容)。

一直以来，不同浏览器中出现这种最小延迟的情况有所不同（例如Firefox） - 从其他地方调用了setInterval( )，或者在嵌套函数调用setTimeout( ) 时（嵌套级别达到特定深度时），都会出现超时延迟。

那么浏览器中实现0ms延时的定时器，这里就需要用 `window.postMessage` ，这个并不在本次内容介绍中说明.

### 小结

这篇文章到这里就结束了，水平有限难免有纰漏，欢迎纠错。最后希望帮忙点点赞，这对我创作是无比的肯定和动力。希望可以帮到你

## requestAnimationFrame 和 requestIdleCallback 和微任务 宏任务的执行时机总结

* 微任务
* 宏任务
* requestAnimationFrame 和宏任务会有几率先后执行
* requestIdleCallback
  * 不一定会执行 看浏览器空闲时间
  * 可能会执行多次
