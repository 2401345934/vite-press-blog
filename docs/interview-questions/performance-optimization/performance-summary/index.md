---
createTime: 2022/12/07
tag: '性能优化'
---
# 最全的前端性能定位总结

### 性能优化的意义

#### 1\. 性能是留住用户很重要的一环

* **pinterest** 重建了他们的页面以实现性能，使感知等待时间减少了 **40％**，从而将搜索引擎流量和注册量提高了 **15％**。

* 通过将平均页面加载时间减少 850 毫秒，**COOK** 发现他们能够将转化率提高 7％，将跳出率降低 7％，并将每个页面的页面数量增加 10％。

* **BBC** 发现，他们在网站加载的每**一秒钟**内就会损失 **10％** 的用户。

* **DoubleClick by Google** 发现，如果网页加载时间超过 **3** 秒，则会有 **53％** 的用户放弃移动网站的访问。

#### 2\. 性能是改善转换率至关重要的一环

* 对于 **Mobify**，主页加载速度每减少 100 毫秒，基于会话的转换增加 1.11％，平均年收入增加近 **380,000** 美元。此外，结账页面加载速度减少 100 毫秒，基于会话的转换增加了 1.55％，从而使年均收入增长近 **530,000** 美元
* **DoubleClick** 发现在 5 秒内加载网站的发布商的广告收入是在 19 秒内加载的网站的**两倍**。. 当 **AutoAnything** 将页面加载时间缩短一半时，他们的销售额增长了 **12-13％**。

![09.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0842e36a5f134aee8acf2327bf44b473~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

### 用户角度的性能标准是什么

#### 著名的 2-5-8 原则

* 当用户能够在 2 秒以内得到响应时，会感觉系统的响应很快；

* 当用户在 2-5 秒之间得到响应时，会感觉系统的响应速度还可以；

* 当用户在 5-8 秒以内得到响应时，会感觉系统的响应速度很慢，但是还可以接受；

* 而当用户在超过 8 秒后仍然无法得到响应时，会感觉系统糟透了，或者认为系统已经失去响应，而选择离开这个 Web 站点，或者发起第二次请求。

**综上所述：一个网站的性能好坏是留住用户和实现变现的基础**

> 而我们的目标就是力争 1s，保住 2s

1s 的差距，看似微乎其微，但这 1s，浏览器实际上可以做非常多的事情 接下来让我们来看看如何对一个网站进行性能分析

### 常见网站性能指标

1. **FP 白屏（First Paint Time ）**： 从页面开始加载到浏览器中检测到渲染（任何渲染）时被触发（例如背景改变，样式应用等）

> 白屏时间过长，会让用户认为我们的页面不能用或者可用性差

![15.jpg](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ab8e2f96a2474955adbccde56794340e~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

2. **FCP 首屏（first contentful paint ）**：从页面开始加载到页面内容的任何部分呈现在屏幕上的时间。 （关注的焦点是内容，这个度量可以知道用户什么时候收到有用的信息（文本，图像等）） ![16.jpg](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0d72e9f440f84ad2aaed4913b43c891c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

3. **FMP 首次有效绘制（First Meaningful Paint ）**： 表示页面的“主要内容”，开始出现在屏幕上的时间点，这项指标因页面逻辑而异，因此上不存在任何规范。（**只是记录了加载体验的最开始**。如果页面显示的是启动图片或者 loading 动画，这个时刻对用用户而言没有意义）

4. **LCP（Largest Contentful Paint ）**：LCP 指标代表的是**视窗最大可见图片或者文本块的渲染时间**。 （可以帮助我们捕获更多的首次渲染之后的加载性能，但这项指标过于复杂，而且很难解释，也经常出错，没办法确定主要内容什么时候加载完。）

5. **长任务（Long Task）**：当一个任务执行时间超过 50ms 时消耗到的任务 （50ms 阈值是从 RAIL 模型总结出来的结论，这个是 google 研究用户感知得出的结论，类似用户的感知/耐心的阈值，超过这个阈值的任务，用户会感知到页面的卡顿）

6. **TTI （Time To Internative）**：从页面开始到它的主要子资源加载到能够快速地响应用户输入的时间。（没有耗时长任务）

7. **首次输入延时 FID （first Input Delay）**：从用户第一次与页面交互到浏览器实际能够开始处理事件的时间。（点击，输入，按键） ![19.jpg](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7dce9ea573604e9b9ed6812a04e6d5fb~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

8. **总阻塞时间 TBT（total blocking time ）**： 衡量从 FCP 到 TTI 之间主线程被阻塞时长的总和。

![20.jpg](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cb39066d4c8747e388da89780a314a05~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

![21.jpg](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/48348e5f687743538ab9752802469f7b~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

9. **DCL （DOMContentLoaded）**：当 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，无需等待样式，图像和子框架的完成加载。

10. **L（onLoaded）**：当依赖的资源，全部加载完毕之后才会触发

11. **CLS(Cumulative Layout Shift)**: 是所有布局偏移分数的汇总，凡是在页面完整生命周期内预料之外的布局偏移都包括。布局偏移发生在任意时间，当一个可见元素改变了它的位置，从一个渲染帧到下一个

![webvitals02.jpg](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a7b36aead632469da1e7a8e648152724~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

> 思考 ==**[$.ready 和 window.onLoad 有什么区别？](https://link.juejin.cn/?target=https%3A%2F%2Fblog.csdn.net%2Fzhw0596%2Farticle%2Fdetails%2F87900292 "https://blog.csdn.net/zhw0596/article/details/87900292")**\==

上面介绍了 11 种性能指标 大家没必要搞懂每一个指标的定义 我们来看看我们需要关注的**核心的几个性能指标**

### [Google Web Vitals - 使用者体验量化](https://link.juejin.cn/?target=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F149662237 "https://zhuanlan.zhihu.com/p/149662237")

web-vitals: Google 于 2020 年 5 年 5 日提出了新的使用者体验量化方式，推出 Web Vitals 是简化这个学习的曲线，大家只要观注 Web Vitals 指标表现即可；

**web-vitals 集成了 5 个指标的 api,核心指标有 3 个；**

* **LCP** 显示最大内容元素所需时间 (衡量网站初次载入速度)
* **FID** 首次输入延迟时间 (衡量网站互动顺畅程度)
* **CLS** 累计版面配置移转 (衡量网页元件视觉稳定性)

![webvitals04.jpg](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7ebffac1d1464e78a4f73a2b3063662c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

```js
<script type="module">
    import {getCLS, getFID,getFCP,getTTFB, getLCP} from 'https://unpkg.com/web-vitals?module';
    getCLS(console.log);
    getFID(console.log);
    getLCP(console.log);
    getFCP(console.log);
    getTTFB(console.log);
</script>
```

我们可以直接引用测定方法 打印出这几个关键指标

![lighthouse02.jpg](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/649e8fdaa25b4102a46326fb9775002f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

到此为止 我们知道了`LCP` `FID` `CLS` 这三大指标是比较核心的 但是如果我们想知道更多的**性能指标测定方式** 我们该怎么做呢 我们接着看

### Performance API

`Performance` 是一个浏览器全局对象，提供了一组 API 用于编程式地获取程序在某些节点的性能数据。它包含一组高精度时间定义，以及配套的相关方法。我们可以直接在浏览器控制台打印`window.performance` 结果如下

```js
// 获取 performance 数据
var performance = {
    // memory 是非标准属性，只在 Chrome 有
    // 我有多少内存
    memory: {
        usedJSHeapSize:  16100000, // JS 对象（包括V8引擎内部对象）占用的内存，一定小于 totalJSHeapSize
        totalJSHeapSize: 35100000, // 可使用的内存
        jsHeapSizeLimit: 793000000 // 内存大小限制
    },

    // 我从哪里来？
    navigation: {
        redirectCount: 0, // 如果有重定向的话，页面通过几次重定向跳转而来
        type: 0           // 0   即 TYPE_NAVIGATENEXT 正常进入的页面（非刷新、非重定向等）
                          // 1   即 TYPE_RELOAD       通过 window.location.reload() 刷新的页面
                          // 2   即 TYPE_BACK_FORWARD 通过浏览器的前进后退按钮进入的页面（历史记录）
                          // 255 即 TYPE_UNDEFINED    非以上方式进入的页面
    },
//  核心时间相关
    timing: {
        // 在同一个浏览器上下文中，前一个网页（与当前页面不一定同域）unload 的时间戳，如果无前一个网页 unload ，则与 fetchStart 值相等
        navigationStart: 1441112691935,

        // 前一个网页（与当前页面同域）unload 的时间戳，如果无前一个网页 unload 或者前一个网页与当前页面不同域，则值为 0
        unloadEventStart: 0,

        // 和 unloadEventStart 相对应，返回前一个网页 unload 事件绑定的回调函数执行完毕的时间戳
        unloadEventEnd: 0,

        // 第一个 HTTP 重定向发生时的时间。有跳转且是同域名内的重定向才算，否则值为 0
        redirectStart: 0,

        // 最后一个 HTTP 重定向完成时的时间。有跳转且是同域名内部的重定向才算，否则值为 0
        redirectEnd: 0,

        // 浏览器准备好使用 HTTP 请求抓取文档的时间，这发生在检查本地缓存之前
        fetchStart: 1441112692155,

        // DNS 域名查询开始的时间，如果使用了本地缓存（即无 DNS 查询）或持久连接，则与 fetchStart 值相等
        domainLookupStart: 1441112692155,

        // DNS 域名查询完成的时间，如果使用了本地缓存（即无 DNS 查询）或持久连接，则与 fetchStart 值相等
        domainLookupEnd: 1441112692155,

        // HTTP（TCP） 开始建立连接的时间，如果是持久连接，则与 fetchStart 值相等
        // 注意如果在传输层发生了错误且重新建立连接，则这里显示的是新建立的连接开始的时间
        connectStart: 1441112692155,

        // HTTP（TCP） 完成建立连接的时间（完成握手），如果是持久连接，则与 fetchStart 值相等
        // 注意如果在传输层发生了错误且重新建立连接，则这里显示的是新建立的连接完成的时间
        // 注意这里握手结束，包括安全连接建立完成、SOCKS 授权通过
        connectEnd: 1441112692155,

        // HTTPS 连接开始的时间，如果不是安全连接，则值为 0
        secureConnectionStart: 0,

        // HTTP 请求读取真实文档开始的时间（完成建立连接），包括从本地读取缓存
        // 连接错误重连时，这里显示的也是新建立连接的时间
        requestStart: 1441112692158,

        // HTTP 开始接收响应的时间（获取到第一个字节），包括从本地读取缓存
        responseStart: 1441112692686,

        // HTTP 响应全部接收完成的时间（获取到最后一个字节），包括从本地读取缓存
        responseEnd: 1441112692687,

        // 开始解析渲染 DOM 树的时间，此时 Document.readyState 变为 loading，并将抛出 readystatechange 相关事件
        domLoading: 1441112692690,

        // 完成解析 DOM 树的时间，Document.readyState 变为 interactive，并将抛出 readystatechange 相关事件
        // 注意只是 DOM 树解析完成，这时候并没有开始加载网页内的资源
        domInteractive: 1441112693093,

        // DOM 解析完成后，网页内资源加载开始的时间
        // 在 DOMContentLoaded 事件抛出前发生
        domContentLoadedEventStart: 1441112693093,

        // DOM 解析完成后，网页内资源加载完成的时间（如 JS 脚本加载执行完毕）
        domContentLoadedEventEnd: 1441112693101,

        // DOM 树解析完成，且资源也准备就绪的时间，Document.readyState 变为 complete，并将抛出 readystatechange 相关事件
        domComplete: 1441112693214,

        // load 事件发送给文档，也即 load 回调函数开始执行的时间
        // 注意如果没有绑定 load 事件，值为 0
        loadEventStart: 1441112693214,

        // load 事件的回调函数执行完毕的时间
        loadEventEnd: 1441112693215

        // 按照字母排序
        // connectEnd: 1441112692155,
        // connectStart: 1441112692155,
        // domComplete: 1441112693214,
        // domContentLoadedEventEnd: 1441112693101,
        // domContentLoadedEventStart: 1441112693093,
        // domInteractive: 1441112693093,
        // domLoading: 1441112692690,
        // domainLookupEnd: 1441112692155,
        // domainLookupStart: 1441112692155,
        // fetchStart: 1441112692155,
        // loadEventEnd: 1441112693215,
        // loadEventStart: 1441112693214,
        // navigationStart: 1441112691935,
        // redirectEnd: 0,
        // redirectStart: 0,
        // requestStart: 1441112692158,
        // responseEnd: 1441112692687,
        // responseStart: 1441112692686,
        // secureConnectionStart: 0,
        // unloadEventEnd: 0,
        // unloadEventStart: 0
    }
}

```

![22.jpg](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/38852de321a943fd8507c79e405390cc~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

第一次看这么多的属性，大家心里一定和这张图片一样懵逼，这是什么鬼？

咱们不慌 先来一张图解释下页面加载的几个**关键时刻**

![01.jpg](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b9af6c24b2a34f75970aaaad14098d98~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

#### 使用 `performance.timing` 信息简单计算出**网页性能数据**

* FP：responseStart - navigationStart

* 重定向耗时：redirectEnd - redirectStart

* DNS 查询耗时：domainLookupEnd - domainLookupStart

* TCP 链接耗时：connectEnd - connectStart

* HTTP 请求耗时：responseEnd - responseStart

* 解析 dom 树耗时：domComplete - domInteractive

* DOM ready 时间：domContentLoadedEventEnd - navigationStart

* onload：loadEventEnd - navigationStart

#### 使用`performance.getEntries()`获取所有资源请求的时间数据

获取所有资源请求的时间数据,这个函数返回一个按 startTime 排序的对象数组

我们直接面板输出一下。 ![11.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bea2e534d5a14550ae903af1b7cd578c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

#### 使用`performance.getEntriesByName(name)`获取特定名称的时间数据

> 比如面试过程非常喜欢问的 FCP 首屏时间如何计算呢

我们可以通过 `getEntriesByName(name)`提供的 api 去获取 FCP 数据

FCP = performance.getEntriesByName("first-contentful-paint")\[0\].startTime - navigationStart

#### 使用`performance.now()`精确计算程序执行时间

`performance.now`方法返回当前网页自从`performance.timing.navigationStart`到当前时间之间的**微秒数**（毫秒的千分之一）。也就是说，它的精度可以达到 100 万分之一秒。

那么我们可以通过两次调用 最后计算出 js 某种操作的精确耗时

```js
const start = performance.now();
doTasks(); // 这里是耗时操作
const end = performance.now();
console.log("耗时：" + (end - start) + "微秒。");
```

#### 使用`performance.mark`以及`performance.measure`手动测量性能

这块具体的代码示例 建议大家可以直接访问[这里](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FPerformance%2Fmark "https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark")去查看

咱们如果想**自定义**搜集性能数据指标 做前端的**性能监控系统** 那么这两个 api 是非常给力的

ok 上面介绍了一系列的代码层面去搜集和测定咱们前端性能指标的方法 那有一些同学可能就会问 可不可以不要看这么多的计算公式 头都大了 有木有那种一看就明白 **更简单**的方案 那么接下来介绍的就是使用**工具**在本地如何分析自己网站的性能

### Google performance 面板

哈哈 大家别慌 虽然这个也叫 performance 但是这里指的是咱们浏览器的**performance 面板工具**

#### 整体结构

![WX20220107-150213.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/439dfe1cfc4144ccbdf98a06a135f764~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

我们第一眼可能会被这些花花绿绿的色块吓到 咱们别怕 一点点带大家分析

从上到下分别为 4 个区域

1：工具条，包含录制，刷新页面分析，清除结果等一系列操作

2：总览图，高度概括随时间线的变动，包括 FPS，CPU，NET

3：火焰图，从不同的角度分析框选区域 。例如：Network，Frames, Interactions, Main 等

4：总体报告：精确到毫秒级的分析，以及按调用层级，事件分类的整理

#### 工具条区域

![24.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/895daed773974d90a7d9f3e596aaf138~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

上面红框从左到右 咱们把鼠标放上去可以看到几个英文单词

* record 记录浏览器运行中的某一个时间段的表现
* reload page 用于记录网页从最开始的加载到所有资源加载完成这个过程的性能表现。点击之后，页面会自动重新加载
* Screenshots 屏幕快照，显示动态加载的页面图片
* memory 查看多种内存占用变化

现在我们可以打开任意一个网站 点击第二个按钮 reload page 开始分析

#### 总览区域

![WX20220107-150848.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/321864679a78400b8d2d8763e7cac40e~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

**1\. FPS**: 全称 Frames Per Second，表示每秒传输帧数，是速度单位，用来分析动画的一个主要性能指标。1fps = 0.304 meter/sec(米/秒)。如上图所示，绿色竖线越高，FPS 越高。 红色表示长时间帧，可能出现卡顿掉帧。

* **不同帧的体验**：
* 帧率能够达到 50 ～ 60 FPS 的动画将会相当流畅，让人倍感舒适；
* 帧率在 30 ～ 50 FPS 之间的动画，因各人敏感程度不同，舒适度因人而异；
* 帧率在 30 FPS 以下的动画，让人感觉到明显的卡顿和不适感； 帧率波动很大的动画，亦会使人感觉到卡顿。

**2\. CPU**：CPU 资源。此面积图指示消耗 CPU 资源的事件类型。 图中颜色分别为（与**总体报告**中的 Summary 颜色数据表示一致）：

* 蓝色(Loading)：表示网络通信和 HTML 解析时间。
* 黄色(Scripting)：表示 JavaScript 执行时间。
* 紫色(Rendering)：表示样式计算和布局（重排）时间。
* 绿色(Painting)：表示重绘时间。
* 灰色(other)：表示其它事件花费的时间。
* 白色(Idle)：表示空闲时间。

**3\. NET**：每条彩色横杠表示一种资源。横杠越长，检索资源所需的时间越长。 每个横杠的浅色部分表示等待时间（从请求资源到第一个字节下载完成的时间）

#### 火焰图

![WX20220107-151346.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9d3be3011d1f43b1bb4576a7053d8f1d~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

1. Network：表示每个服务器资源的加载情况。

2. Frames：表示每幅帧的运行情况，这里可以和上面总览的 FPS 结合来看

3. Timings：

* DCL（DOMContentLoaded）表示 HTML 文档加载完成事件。当初始 HTML 文档完全加载并解析之后触发，无需等待样式、图片、子 frame 结束。作为明显的对比，load 事件是当个页面完全被加载时才触发。
* FP（First Paint）首屏绘制，页面刚开始渲染的时间。
* FCP（First ContentfulPaint）首屏内容绘制，首次绘制任何文本，图像，非空白 canvas 或 SVG 的时间点。
* FMP（First MeaningfulPaint）首屏有意义的内容绘制，这个“有意义”没有权威的规定，本质上是通过一种算法来猜测某个时间点可能是 FMP。有的理解为是最大元素绘制的时间，即同 LCP（Largest ContentfulPaint）。其中 FP、FCP、FMP 是同一条虚线，三者时间不一致。比如首次渲染过后，有可能出现 JS 阻塞，这种情况下 FCP 就会大于 FP。
* L（Onload）页面所有资源加载完成事件。
* LCP（Largest Contentful Paint ）最大内容绘制，页面上尺寸最大的元素绘制时间。

> 细心的同学可能已经发现了 这里的指标就是对应我们前面提到的**性能指标** 所以可以直接在 performance 面板来看到网页的几个核心指标的数值

4. Main：记录了渲染进程中主线程的执行记录，点击 main 可以看到某个任务执行的具体情况 是我们**分析具体函数耗时**最常看的面板 ![WX20220107-153209.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/79cc964834f54328976eaa08cdd6900f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

    首先，面板中会有很多的 Task，如果是耗时长的 Task，其右上角会**标红**，这个时候，我们可以选中标红的 Task，然后放大，看其具体的耗时点。

    放大后，这里可以看到都在做哪些操作，哪些函数耗时了多少,这里代码有压缩，看到的是压缩后的函数名。然后我们点击一下某个函数，在面板最下面，就会出现代码的信息，是哪个函数，耗时多少，在哪个文件上的第几行等。

    这样我们就很方便地**定位到耗时函数** 然后去针对性优化

5. Compositor 合成线程的执行记录，用来记录 html 绘制阶段 (Paint)结束后的图层合成操作

6. Raster 光栅化线程池，用来让 GPU 执行光栅化的任务

7. GPU 可以直观看到何时启动 GPU 加速

8. Memory 选项，在勾选后，就会显示折线图 ![WX20220107-154730.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/540a4ebc8ab14b5193a162eef4456da0~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?) 通过该图我们可以看到页面中的内存使用的情况，比如 JS Heap(堆)，如果曲线一直在增长，则说明存在内存泄露，如果相当长的一段时间，内存曲线都是没有下降的，这里是有发生内存泄露的可能的。

其实在火焰图这块 我们主要关心上诉的 **1234** 核心的点就够了 另外如果想分析**内存泄漏** 可以勾选 **memory** 选项

#### 总体报告

##### Summary：表示各指标时间占用统计报表

![WX20220107-155126.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c018bec8dde14b3f86f06742f0913144~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

这里的颜色代表的意思和**总览区域里面的 cpu**颜色一样的意思 大家不清楚的可以往上翻一下

> 这里一般来说，需要着重关注的有两个：一是黄色的区域，代表脚本执行时间，另一个是紫色的渲染时间

1.Loading 事件

| 内容 | 说明 |
| --- | --- |
| Parse HTML | 浏览器解析 HTML |
| Finish Loading | 网络请求完成 |
| Receive Data | 请求的响应数据到达事件，如果响应数据很大（拆包），可能会多次触发该事件 |
| Receive Response | 响应头报文到达时触发 |
| Send Request | 发送网络请求时触发 |

2. Scripting 事件

| 内容 | 说明 |
| --- | --- |
| AnimationFrameFired | 一个定义好的动画帧发生并开始回调处理时触发 |
| Cancel Animation Frame | 取消一个动画帧时触发 |
| GC Event | 垃圾回收时触发 |
| DOMContentLoaded | 当页面中的 DOM 内容加载并解析完毕时触发 |
| Evaluate Script | A script was evaluated. |
| Event | JS 事件 |
| Function Call | 浏览器进入 JS 引擎时触发 |
| Install Timer | 创建计时器（调用 setTimeout()和 setInterval()）时触发 |
| Request Animation Frame | A requestAnimationFrame() call scheduled a new frame |
| Remove Timer | 清除计时器触发 |
| Time | 调用 console.time() 触发 |
| Time End | 调用 console.timeEnd() 触发 |
| Timer Fired | 定时器激活回调后触发 |
| XHR Ready State Change | 当一个异步请求为就绪状态后触发 |
| XHR Load | 当一个异步请求完成加载后触发 |

3.Rendering 事件

| 内容 | 说明 |
| --- | --- |
| Invalidate layout | 当 DOM 更改导致页面布局失效时触发 |
| Layout | 页面布局计算执行时触发 |
| Recalculate style | Chrome 重新计算元素样式时触发 |
| Scroll | 内嵌的视窗滚动时触发 |

4.Painting 事件

| 内容 | 说明 |
| --- | --- |
| Composite Layers | Chrome 的渲染引擎完成图片层合并时触发 |
| Image Decode | 一个图片资源完成解码后触发 |
| Image Resize | 一个图片被修改尺寸后触发 |
| Paint | 合并后的层被绘制到对应显示区域后触发 |

5.Stystem: 系统用时

6.Idle: 空闲时间

##### Bottom-Up：表示事件时长排序列表（倒序）

![WX20220107-155339.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ce77591e156a48c58a55d1de83e27ee0~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

这里有两列时间数据，一是"Self Time"代表任务**自身执行**所消耗的时间，二是"Total Time"代表此任务及其调用的附属子任务**一共消耗**的时间。这两列数据各有不同的用处，可以按自己的需求决定按哪列数据作为排序字段。

在 Activity 的右侧，部分还带有 Source Map 链接，点击之后可以定位到相应操作对应的**代码**。使用它可以比较方便地**定位到具体的代码**。

##### Call tree：表示事件调用顺序列表

![WX20220107-155349.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5623e2224fde4a059858edfe6ec0a80e~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?) Call Tree 中的内容，在 Bottom-Up 中也能看到，无明显的区别。

##### Event Log：表示事件发生的顺序列表

![WX20220107-155402.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ba5c9e07b4114c828fe7fee49f265458~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?) Event Log 中的内容，是按顺序记录的事件日志，数据比较多。常见的优化级别中一般用不到它。如果是比较大型的应用，打开它可能会直接导致 Chrome 卡死。

ok 到这里想必大家对 performance 面板的调试都已经学会了 大家可以一边看文章一边打开自己的网站看看 是否有一些性能问题 当然除了 performance 我们还有一个更加**便捷**的工具 它自动帮我们分析好了性能 还给出了**优化建议**

### lighthouse

先来介绍 **lighthouse 工具**，目前官方提供了 google devtools、google 插件、npm cli 方式应用。

![WX20220107-160622.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d6ba17d59bbe4f61868aa6780e16654c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

我们选择 Generate report 开始分析吧！先来看看结果 一睹为快 ![WX20220107-161425.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3038a1afecd240c1ace35750e31d8126~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

我们发现 lighthouse 和 performance **区别还挺大**滴，为啥呢？ ![WX20220107-161324.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/04e745e5e9c34a449534946d3136b926~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

原来 lighthouse 默认进行了**节流处理**。我们可以不勾选节流同时也直接点击 view trace 生成对应 performance 面板的数据。 ![WX20220107-161900.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e88062b1e3a04a579221929c282b1209~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

lighthouse 主要针对 **5 个方面**做了分析。

#### Performance 性能

列出了 FCP、SP、LCP、TTI、TBI、CLS 六个指标。

![lighthouse03.jpg](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/085d8c51011d4742a37a71d21f3642fe~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

同时也提供可**优化**方案 ![lighthouse04.jpg](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/51692957fff34fc4b6072c4cccb897ef~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

#### Accessibility 可访问性

可访问性：指无障碍设计，也称为网站可达性。是指所创建的网站对所有用户都可用/可访问，不管用户的生理/身体能力如何、不管用户是以何种方式访问网站。 ![lighthouse05.jpg](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fb0d08b6f53542dc9dd932047b2cf33a~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

#### Best Practice 最佳实践

实际应用中，网站的安全问题 ![lighthouse06.jpg](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eafbb13287d84bdf8840ac006cd3132b~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

#### SEO 搜索引擎优化

搜索引擎优化，是一种利用搜索引擎的规则提高网站在有关搜索引擎内的自然排名 ![lighthouse07.jpg](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e7ba09a2f5514aeeb42ab81dee58095f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

#### Progressive Web App 轻应用-离线应用

PWA： 运用现代的 Web API 以及传统的渐进式增强策略来创建跨平台 Web 应用程序。这些应用无处不在、功能丰富，使其具有与原生应用相同的用户体验优势;

![lighthouse08.jpg](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/54ad5d80d05b4170900e5c14d989fa76~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

[如何上手搭建简易版 PWA](https://link.juejin.cn/?target=https%3A%2F%2Fsegmentfault.com%2Fa%2F1190000014639473 "https://segmentfault.com/a/1190000014639473")

那可能有的小伙伴说 我没有浏览器环境还可以使用 lighthouse 来测试性能吗 答案是 当然可以

我们再来用 **npm cli** 去实现 lighthouse 吧

### node cli lighthouse

项目安装 lighthouse

```js
npm i -g lighthouse
lighthouse https://www.taobao.com
```

结果

![error01.jpg](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ec2c6ad928af4a51a9442fa63c7bc37d~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

[有小伙伴也遇到相同问题](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FGoogleChrome%2Fchrome-launcher%2Fissues%2F214 "https://github.com/GoogleChrome/chrome-launcher/issues/214") ![lighthouse09.jpg](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cb82914283f147c49ab887116ca3701d~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

我们可以看到解决方案：需要在 **powerShell** 命令下执行

```
$env:CHROME_PATH = (Get-Process -Name chrome)[0].Path

```

[powerShell、cmd、bash 有什么区别呢？](https://link.juejin.cn/?target=https%3A%2F%2Fwww.zhihu.com%2Fquestion%2F43134881 "https://www.zhihu.com/question/43134881")有点傻傻分不清！

总结一句话就是：**powerShell 它将旧的 CMD 功能与具有内置系统管理功能的 scripting/cmdlet 指令集结合在一起，它就是最强呀！**

最后让我们来看看 cli 中 lighthouse 支持哪些命令

```js
lighthouse --help
// 命令太多，介绍常用的几个
--output             // 文档报告输出支持html、json、csv，默认html；
--view               // 数据分析结束后以html展示
--only-categories    // 分析类别包括“accessibility, best-practices, performance, pwa, seo”
--throttling-method  // 限流方式：provide当前设备环境，devtools开发模式，simulate模拟手机
--form-factor        // 支持设备，mobile，desktop

```
