---
createTime: 2022/11/10
tag: '性能优化'
---
# 何减少卡顿的代码

聊网站性能的文章有很多，通常为了提高js性能，避不开这两点：

* _不要阻塞主线程_
* _减少长耗时_

该怎么做呢？很明显，精简js代码有好处，但更少的代码量是否就一定意味着用户界面的体验会更顺畅？可能会，但也可能恰恰相反。

要弄懂优化js中任务的重要性，首先需要了解什么是任务、任务的角色以及浏览器的任务处理机制。

[浏览器中的任务](https://juejin.cn/post/7159807927908302884 "https://juejin.cn/post/7159807927908302884")
--------------------------------------------------------------------------------------------------

浏览器执行的**任务**之间是相互独立的，像页面渲染，html和css的解析，以及执行js代码都属于任务的范畴。虽然开发者不能直接控制这些任务，但毫无疑问的是，浏览器中的任务主要源自开发者编写和部署的代码。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/82691a9f56a24628aeb7b70211b1946b~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

上图中的任务便是chrome DevToos性能剖析中_点击_事件触发的。从图中能看到，任务在顶端，任务下面列出了点击事件、调用的函数，此外还调用很多其他方法。

任务能影响性能的方式很多，比如在打开网站时下载js代码，浏览器会把任务放到队列中不执行，而是准备解析和编译js而防止阻塞js。之后网站上的任务才会因为用户交互驱动事件处理器、js动画以及分析收集的后台活动等js活动而触发。（web worker这种情况例外）

[什么是主线程？](https://juejin.cn/post/7159807927908302884 "https://juejin.cn/post/7159807927908302884")
--------------------------------------------------------------------------------------------------

浏览器绝大多的任务都发生在_主线程_，其主线程名称的由来也主要是因为：几乎所有js都在主线程运行。

主线程每次_只能处理一个任务_，当任务耗时超过特定时间，比如_50ms_就会被归类为_长耗时_。如果发生长耗时时存在用户交互，或者关键渲染更新时，浏览器就会延后再处理用户交互，这会直接导致用户交互或者渲染出现延迟。

![A long task in the performance profiler of Chrome's DevTools. The blocking portion of the task (greater than 50 milliseconds) is depicted with a pattern of red diagonal stripes.](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3f2f8c5b37c143c3bec8fa986740fec4~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

谷歌性能剖析中的长耗时如图所示，一般会在任务角上用红色三角形标出来，其中被阻塞的任务部分用红色细斜条纹标出来（如上图所示）。

优化_长耗时_，意味着将单个长耗时任务拆解成几个耗时相对短的小任务，可以查看下图。

![A single long task versus the same task broken up into shorter task. The long task is one large rectangle, whereas the chunked task is five smaller boxes which are collectively the same width as the long task.](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3d85f7a48e154c8aa1951c983bd046f8~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

在上图中能看到单个长任务和被拆分成了5个短任务。

为什么需要拆分任务非常重要？因为拆分长任务后，浏览器就有了更多的机会，可以去处理优先级别更高的工作，其中就包括用户交互行为。

![A depiction of how breaking up a task can facilitate a user interaction. At the top, a long task blocks an event handler from running until the task is finished. At the bottom, the chunked up task permits the event handler to run sooner than it otherwise would have.](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/26e627c549d54bfebf551eeb0ae1c84d~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

如果任务非常长，浏览器对用户交互的展示如图所示，这时候浏览器就没法_快速_处理用户交互，但拆分长任务后的从图中能看到效果就不一样。

因为_长任务_的缘故，用户交互产生的事件处理就必须排队，等待长任务执行完后才能执行。这个时候就会导致用户交互的_延迟_。当拆分成较短的任务后，事件处理器就有机会更快的触发。 因为事件处理器能够在短任务之间得以执行，也就比长任务耗时更短。在长耗时的图片中，用户可能就会感到_卡顿_；长任务拆分后，用户可能就感觉体验很_流畅_。

然而问题来了，那就是 _减少长耗时_到底该怎么做，_不要阻塞主线程_写的也不够明确。这篇文章便为你解开这些神秘的面纱。

[任务管理策略](https://juejin.cn/post/7159807927908302884 "https://juejin.cn/post/7159807927908302884")
-------------------------------------------------------------------------------------------------

软件架构中有时候会将一个任务拆分成多个函数，这不仅能增强代码可读性，也让项目更容易维护，当然这样也更容易写测试。

```
function saveSettings () {
  validateForm();
  showSpinner();
  saveToDatabase();
  updateUI();
  sendAnalytics();
}

```

在上面的例子中，该函数`saveSettings`调用了另外5个函数，包括验证表单、展示加载的动画、发送数据到后端等。理论上讲，这是很合理的架构。如果需调试这些功能，也只需要在项目中查找每个函数即可。

然而，这样也有问题，就是js并不是为每个方法开辟一个单独的任务，因为这些方法都包含在`saveSetting`这个函数中，**也就是说这五个方法在一个任务中执行**

> **重点提示**

> js遵循[执行才编译](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fdocs%2FWeb%2FJavaScript%2FEventLoop%23run-to-completion "https://developer.mozilla.org/docs/Web/JavaScript/EventLoop#run-to-completion")的原理，也就是说，只有一个任务结束才会执行下一个任务，而且**不论这个任务会阻塞主线程多久**。

![The saveSettings function as depicted in Chrome's performance profiler. While the top-level function calls five other functions, all the work takes place in one long task that blocks the main thread.](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b5f948037c0d4410855e55c5998947d7~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

`saveSetting`这个函数调用5个函数，这个函数的执行看起来就像一个特别长的长的任务。

在很多场景中，单个函数耗时可能会超过50ms，从而使得整体任务耗时更长。如果测试场景比较差，特别是在“资源受限”场景下测试的设备，每个函数可能耗时都会更久。接下来，将会分享优化的策略。

### [使用代码延迟任务执行](https://juejin.cn/post/7159807927908302884 "https://juejin.cn/post/7159807927908302884")

为了拆分长任务，开发者经常使用定时器_setTimeout_。通过把方法传递给_setTimeout_，也就等同于重新创建了一个新的任务，延迟了回调的执行，而且使用该方法，_即便是将delay时间设定成0，也是有效的_。

```
function saveSettings () {
  // Do critical work that is user-visible:
  validateForm();
  showSpinner();
  updateUI();

  // Defer work that isn't user-visible to a separate task:
  setTimeout(() => {
    saveToDatabase();
    sendAnalytics();
  }, 0);
}

```

如果需执行的函数先后关系是很明确，这个方法会非常有效，然而并不是所有场景都能使用这个方法。比如，如需要在循环中处理大数据量的数据，这个任务的耗时可能就会非常长（假设有数百万的数据量）

```
function processData () {
  for (const item of largeDataArray) {
    // Process the individual item here.
  }
}

```

此时，使用_setTimeout_就会出错，因为效率原因无法实行，而且虽然单独处理每个数据耗时很短，但整个数组可能花费特别长的时间。综合来看，setTimeout就不能算是特别有效的工具。

除了`setTimeout`的方式，确有一些api能够允许延迟代码到随后的任务中执行。其中一个方式便是使用`postMessage`替代定时器；也可以使用`requestIdleCallback`，但是需要注意这个api编排的任务的优先级别最低，而且只会在浏览器空闲时才会执行。当主线程繁忙时，通过`requestIdleCallback`这个api编排的任务可能永远不会执行。

### 使用asycn、await来创造让步点

在本文会出现一个新词`让步`，这个词的定义、用法和意义可以通过代码和介绍进行阐述。

> **重点提示**

> 当_让步_于主线程后，浏览器就有机会处理那些更重要的任务，而不是放在队列中排队。理想状态下，一旦出现用户界面级别的任务，就应该让步给主线程，让任务更快的执行完。**让步于主线程让更重要的工作能更快的完成**

分解任务后，按照浏览器内部的优先级别划分，其他的任务可能优先级别调整的会更高。一种让步于主线程的方式是配合用了setTimeout的promise。

```
function yieldToMain () {
  return new Promise(resolve => {
    setTimeout(resolve, 0);
  });
}

```

> **注意**

> 尽管这个例子在返回promise中通过setimeout来调用resolve，但此时并不是新开一个任务让promise执行后续代码，而是通过setTimeout调用。因为promise的回调属于微任务，因此不会让步于主线程。

在`saveSettings`的函数中，可以在每次`await`函数`yieldToMain`后让步于主线程：

```
async function saveSettings () {
  // Create an array of functions to run:
  const tasks = [    validateForm,    showSpinner,    saveToDatabase,    updateUI,    sendAnalytics  ]

  // Loop over the tasks:
  while (tasks.length > 0) {
    // Shift the first task off the tasks array:
    const task = tasks.shift();

    // Run the task:
    task();

    // Yield to the main thread:
    await yieldToMain();
  }
}

```

> **重要提示**

> 并不是**所有**函数调用都要让步于主线程。如果两个函数的结果在用户界面上有重要的更新，最好就不要这样做。如果可以，可以想让任务执行，然后考虑在那些不重要的函数或者能在后台运行的函数之间`让步`。

这样的好处是，就能看到单个大的长任务被拆分成了多个独立的任务。

![The same saveSettings function depicted in Chrome's performance profiler, only with yielding. The result is the once-monolithic task is now broken up into five separate tasks&ampmdash;one for each function.](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4f61f315d3c14ab69281151385cbbcaf~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

现在能看到，`saveSetting`这个函数内的函数现在成为了单独的任务。

通过使用`promise`这种方式，和手动写`setTimeout`这种定时器方式相比，在工程上有跟多的好处。让步的时间点变成了声明式，因此这种代码写起来更容易，阅读和理解也更轻松。

### [只在必要时让步](https://juejin.cn/post/7159807927908302884 "https://juejin.cn/post/7159807927908302884")

假如有一堆的任务，但是只想在用户交互的时候才让步，该怎么办？正好有这种api--`isInputPending`

`isInputPending`这个函数可以在任何时候调用，它能判断用户是否要与页面元素进行交互。调用isInputPending会返回布尔值，`true`代表要与页面元素交互，`false`则不交互。

比如说，任务队列中有很多任务，但是不想阻挡用户输入，使用`isInputPending`和自定义方法`yieldToMain`方法，就能够保证用户交互时的input不会延迟。

```
async function saveSettings () {
  // 函数队列
  const tasks = [    validateForm,    showSpinner,    saveToDatabase,    updateUI,    sendAnalytics  ];
  
  while (tasks.length > 0) {
    // 让步于用户输入
    if (navigator.scheduling.isInputPending()) {
      // 如果有用户输入在等待，则让步
      await yieldToMain();
    } else {
      // Shift the the task out of the queue:
      const task = tasks.shift();

      // Run the task:
      task();
    }
  }
}

```

在`saveSetting`执行过程中，会逐个循环队列中的任务。如果循环时`isInputPending`结果返回真，`saveSetting`就会调用`yieldToMain`函数，这样就能处理用户输入的事件，反之，就会走到队列继续执行下一个，直到队列执行完。

![A depiction of the saveSettings function running in Chrome's performance profiler. The resulting task blocks the main thread until isInputPending returns true, in which case, the task yields to the main thread.](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/58a558ebc9f14fa2ada33dce226d796d~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

`saveSetting`这个任务队列中有5个任务，但此时如果正在执行第二个任务而用户想打开某个菜单，于是点击了这个菜单，`isInputPending`就会让步，让主线程处理交互事件，同时也会稍后执行后面剩余的任务。

用户输入后`isInputPending`的返回值不一定总是“true”,这是因为操作系统需要时间来通知浏览器交互结束，也就是说其他代码可能已经开始执行，比如截图例子中的`saveToDatabase`这个方法可能已经在执行了。即便使用`isInputPending`，还是需要在每个方法限制任务中的方法数量。

使用`isInputPending`配合_让步_的策略，能让浏览器有机会响应用户的重要交互，这在很多情况下，尤其是很多执行很多任务时，能够提高页面对用户的响应能力。

另一种使用`isInputPending`的方式，特别是担心浏览器不支持该策略，就可以使用另一种结合时间的方式。

```
async function saveSettings () {
  // A task queue of functions
  const tasks = [    validateForm,    showSpinner,    saveToDatabase,    updateUI,    sendAnalytics  ];
  
  let deadline = performance.now() + 50;

  while (tasks.length > 0) {
    // Optional chaining operator used here helps to avoid
    // errors in browsers that don't support `isInputPending`:
    if (navigator.scheduling?.isInputPending() || performance.now() >= deadline) {
      // There's a pending user input, or the
      // deadline has been reached. Yield here:
      await yieldToMain();

      // Extend the deadline:
      deadline += 50;

      // Stop the execution of the current loop and
      // move onto the next iteration:
      continue;
    }

    // Shift the the task out of the queue:
    const task = tasks.shift();

    // Run the task:
    task();
  }
}

```

使用这种方式，通过结合时间来兼容不支持`isInputPending`的浏览器，尤其是使用截止时间或者在特定时间点，让工作能在适当时候中断，不论是通过让步于用户输入还是在特定时间节点。

[几个API的差异](https://juejin.cn/post/7159807927908302884 "https://juejin.cn/post/7159807927908302884")
---------------------------------------------------------------------------------------------------

目前提到的api对于拆解任务都有帮助，但也有弊端：让步与主线程则意味着延迟代码稍后执行，即该部分代码被添加到稍后的事件队列中去了。

如果能控制页面中所有的代码，就可以编排各个任务的优先级，但是第三方js脚本可能不会服从安排。实际上，也不可能真正意义上给所有的任务排优先级，而是只能让他们成堆，或者是让步于特定的用户交互行为。

幸运的是，有一个专门编排优先级的api正在开发中，相信能够解决这些问题。

### [专门编排优先级的api](https://juejin.cn/post/7159807927908302884 "https://juejin.cn/post/7159807927908302884")

目前在书写本文时该api提供`postTask`的功能，对于所有的chromium浏览器和firefox均可使用。`postTask`允许更细粒度的编排任务，该方法能让浏览器编排任务的优先级，以便地优先级别的任务能够让步于主线程。目前`postTask`使用promise，接受优先级这个参数设定。

`postTask`方法有三个优先级别：

* `background`级，适用于优先级别最低的任务
* `user-visible`级，适用于优先级别中等的任务，如果没有入参，也是该函数的默认参数。
* `user-blocking`级，适用于优先级别最高的任务。

拿下面的代码来举例，`postTask`在三处分别都是最高优先级别，其他的另外两个任务优先级别都是最低。

```
function saveSettings () {
  // Validate the form at high priority
  scheduler.postTask(validateForm, {priority: 'user-blocking'});

  // Show the spinner at high priority:
  scheduler.postTask(showSpinner, {priority: 'user-blocking'});

  // Update the database in the background:
  scheduler.postTask(saveToDatabase, {priority: 'background'});

  // Update the user interface at high priority:
  scheduler.postTask(updateUI, {priority: 'user-blocking'});

  // Send analytics data in the background:
  scheduler.postTask(sendAnalytics, {priority: 'background'});
};

```

在上面例子中，通过这些任务的优先级的编排方式，能让高浏览器级别的任务，比如用户交互等得以触发。

![The saveSettings function as depicted in Chrome's performance profiler, but using postTask. postTask splits up each function saveSettings runs, and prioritizes them such that a user interaction has a chance to run without being blocked.](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8a9475f95be547aaa548d48fc0c74a1b~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

当`saveSettings`方法在执行时，会使用`postTask`来编排每个方法。关键的用户侧任务优先级别高，当然用户并不知道的任务按照background的级别，这就可以up和提高优先级。

这是如何使用`postTask`的非常简单的例子。可以用不同的`TaskController`对象来区分，这样能在不同的人物之间共享优先级别，也能为不同的`TaskController`的实例变更优先级。

> **重点提示**

[`postTask()` is not supported in all browsers](https://link.juejin.cn/?target=https%3A%2F%2Fcaniuse.com%2Fmdn-api_scheduler_posttask "https://caniuse.com/mdn-api_scheduler_posttask"). You can use feature detection to see if it's available, or consider using [a polyfill](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fscheduler-polyfill "https://www.npmjs.com/package/scheduler-polyfill").

`postTask`并不是所有浏览器都支持。可以检测是否空，或者考虑使用`polyfill`。

### [内置不中断的让步方法](https://juejin.cn/post/7159807927908302884 "https://juejin.cn/post/7159807927908302884")

还有一个编排api目前还在提议阶段，还没有内置到任何浏览器中。它的用法和本章和开始讲到的`yieldToMain`这个方法类似。

```
async function saveSettings () {
  // Create an array of functions to run:
  const tasks = [
    validateForm,
    showSpinner,
    saveToDatabase,
    updateUI,
    sendAnalytics
  ]

  // Loop over the tasks:
  while (tasks.length > 0) {
    // Shift the first task off the tasks array:
    const task = tasks.shift();

    // Run the task:
    task();

    // Yield to the main thread with the scheduler
    // API's own yielding mechanism:
    await scheduler.yield();
  }
}

```

这和之前的代码大部分相似，但我们也能看到上面代码并没有使用`yieldToMain`，而是使用了`await scheduler.yield`方法。

![Three diagrams depicting tasks without yielding, yielding, and with yielding and continuation. Without yielding, there are long tasks. With yielding, there are more tasks that are shorter, but may be interrupted by other unrelated tasks. With yielding and continuation, there are more tasks that are shorter, but their order of execution is preserved.](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b051cc5e8ea64af0bf2aadbbb682283b~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

下面三幅图分别是不使用yield，使用yield，以及使用yield且不中断。不使用yield，出现了长耗时任务。使用yield，短任务数量变多了，而且还能被其他不相关的任务打断。使用yield且不中断，里面的短任务更多，但是执行顺序是固定的。

上面便是三种情况的效果图。使用`scheduler.yield`方法时，任务能在每次让步停止后重新开始。

使用scheduler.yield的好处是不中断，也就意味着如果是在一连串任务中yield，那么从yield的时间点开始，其他编排好的任务的执行会继续。**这就能避免第三方js脚本代码阻塞代码的执行**

[结语](https://juejin.cn/post/7159807927908302884 "https://juejin.cn/post/7159807927908302884")
---------------------------------------------------------------------------------------------

虽然管理任务富有挑战，但管理任务却能受益颇多，网站能有更快的用户交互体验。管理和调优没有万灵药，但确有一系列不同的技巧。最后总结重申一下，管理任务时主要需要考虑以下几点：

* 遇到关键任务和用户侧的任务需要让步于主线程
* 使用isInputPending来让步主线程让用户可以与页面交互
* 适应postTask来调整任务的优先级
* 最后，**每个函数尽可能地减少活动**

使用以上一个或多个方法，就能够将应用中的任务进行管理，根据用户需要调整优先级，同时能保证相对不那么重要的工作得以继续执行，这样给创造更好的用户体验，网站响应更快，使用更令人愉悦。
