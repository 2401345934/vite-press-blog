✨新增(components): 新增了注册chartgpt (09a7b00)
✨新增(config): 更新lock  ...`,l:"CHANGELOG/index.html",a:"small-3-0-1-2024-04-08-small"},"0.1":{t:"1.0.0 (2022-11-20)",p:`
⚡️性能(webpack): 修复令牌 (ab89e15)
✨新增(components): 新增补充组件 (542888 ...`,l:"CHANGELOG/index.html#_1-0-0-2022-11-20",a:"_1-0-0-2022-11-20"},"1.0":{t:"# 浏览器的缓存策略",p:`缓存可以说是性能优化中简单高效的一种优化方式了，它可以显著减少网络传输所带来的损耗。
对于一个数据请求来说，可以分为发起网络 ...`,l:"basic-quality/browser/browser/browser-cache/index.html",a:"浏览器的缓存策略"},"1.1":{t:"缓存位置",p:`从缓存位置上来说分为四种，并且各自有优先级，当依次查找缓存且都没有命中的时候，才会去请求网络
Service Worker  ...`,l:"basic-quality/browser/browser/browser-cache/index.html#缓存位置",a:"缓存位置"},"1.2":{t:"Service Worker",p:"Service Worker 的缓存与浏览器其他内建的缓存机制不同，它可以让我们自由控制缓存哪些文件、如何匹配缓存、如何读取 ...",l:"basic-quality/browser/browser/browser-cache/index.html#service-worker",a:"service-worker"},"1.3":{t:"Memory Cache",p:`!图片
Memory Cache 也就是内存中的缓存，读取内存中的数据肯定比磁盘快。但是内存缓存虽然读取高效，可是缓存持续性 ...`,l:"basic-quality/browser/browser/browser-cache/index.html#memory-cache",a:"memory-cache"},"1.4":{t:"Disk Cache",p:"Disk Cache 也就是存储在硬盘中的缓存，读取速度慢点，但是什么都能存储到磁盘中，比之 Memory Cache 胜在 ...",l:"basic-quality/browser/browser/browser-cache/index.html#disk-cache",a:"disk-cache"},"1.5":{t:"Push Cache",p:"Push Cache 是 HTTP/2 中的内容，当以上三种缓存都没有命中时，它才会被使用。并且缓存时间也很短暂，只在会话（ ...",l:"basic-quality/browser/browser/browser-cache/index.html#push-cache",a:"push-cache"},"1.6":{t:"网络请求 fetch",p:`如果所有缓存都没有命中的话，那么只能发起请求来获取资源了。
`,l:"basic-quality/browser/browser/browser-cache/index.html#网络请求-fetch",a:"网络请求-fetch"},"1.7":{t:"缓存策略",p:`通常浏览器缓存策略分为两种：强缓存和协商缓存，并且缓存策略都是通过设置 HTTP Header 来实现的。
`,l:"basic-quality/browser/browser/browser-cache/index.html#缓存策略",a:"缓存策略"},"1.8":{t:"强缓存",p:"强缓存可以通过设置两种 HTTP Header 实现：Expires 和 Cache-Control 。强缓存表示在缓存期间 ...",l:"basic-quality/browser/browser/browser-cache/index.html#强缓存",a:"强缓存"},"1.9":{t:"Expires",p:`Expires: Wed, 22 Oct 2018 08:41:00 GMT
Expires 是 HTTP/1 的产物，表示 ...`,l:"basic-quality/browser/browser/browser-cache/index.html#expires",a:"expires"},"1.10":{t:"Cache-control",p:`!图片
Cache-control: max-age=30
Cache-Control 出现于 HTTP/1.1，优先级高于 ...`,l:"basic-quality/browser/browser/browser-cache/index.html#cache-control",a:"cache-control"},"1.11":{t:"协商缓存",p:`!图片
如果缓存过期了，就需要发起请求验证资源是否有更新。协商缓存可以通过设置两种 HTTP Header 实现：Last- ...`,l:"basic-quality/browser/browser/browser-cache/index.html#协商缓存",a:"协商缓存"},"1.12":{t:"Last-Modified 和 If-Modified-Since",p:"Last-Modified 表示本地文件最后修改日期，If-Modified-Since 会将 Last-Modified  ...",l:"basic-quality/browser/browser/browser-cache/index.html#last-modified-和-if-modified-since",a:"last-modified-和-if-modified-since"},"1.13":{t:"ETag 和 If-None-Match",p:"ETag 类似于文件指纹，If-None-Match 会将当前 ETag 发送给服务器，询问该资源 ETag 是否变动，有变 ...",l:"basic-quality/browser/browser/browser-cache/index.html#etag-和-if-none-match",a:"etag-和-if-none-match"},"1.14":{t:"last-modified 和 etag 有什么区别",p:"",l:"basic-quality/browser/browser/browser-cache/index.html#last-modified-和-etag-有什么区别",a:"last-modified-和-etag-有什么区别"},"1.15":{t:"last-modified",p:`
静态文件的 last-modified 一般会根据文件的最后修改时间生成

`,l:"basic-quality/browser/browser/browser-cache/index.html#last-modified",a:"last-modified"},"1.16":{t:"etag",p:`
是根据文件的内容有没有变化进行更新
如果仅仅是修改时间变了 但是内容没变 不会更新
当文件更改时，etag 值必须改变。
 ...`,l:"basic-quality/browser/browser/browser-cache/index.html#etag",a:"etag"},"1.17":{t:"Etag主要为了解决Last-Modified无法解决的一些问题",p:`
一些文件也许周期性的更改,但是它的内容并不改变(仅仅改变的是修改时间),这个时候我们不希望客户端认为这个文件被修改了,而重 ...`,l:"basic-quality/browser/browser/browser-cache/index.html#etag主要为了解决last-modified无法解决的一些问题",a:"etag主要为了解决last-modified无法解决的一些问题"},"1.18":{t:"如果 http 响应头中 ETag 值改变了，是否意味着文件内容一定已经更改 ？",p:`不一定，由服务器中 ETag 的生成算法决定。
比如 nginx 中的 etag 由 last_modified 与 con ...`,l:"basic-quality/browser/browser/browser-cache/index.html#如果-http-响应头中-etag-值改变了-是否意味着文件内容一定已经更改",a:"如果-http-响应头中-etag-值改变了-是否意味着文件内容一定已经更改"},"1.19":{t:"实际场景应用缓存策略",p:`单纯了解理论而不付诸于实践是没有意义的，接下来我们来通过几个场景学习下如何使用这些理论。
`,l:"basic-quality/browser/browser/browser-cache/index.html#实际场景应用缓存策略",a:"实际场景应用缓存策略"},"1.20":{t:"频繁变动的资源",p:"对于频繁变动的资源，首先需要使用 Cache-Control: no-cache 使浏览器每次都请求服务器，然后配合 ETa ...",l:"basic-quality/browser/browser/browser-cache/index.html#频繁变动的资源",a:"频繁变动的资源"},"1.21":{t:"代码文件",p:`这里特指除了 HTML 外的代码文件，因为 HTML 文件一般不缓存或者缓存时间很短。
一般来说，现在都会使用工具来打包代码 ...`,l:"basic-quality/browser/browser/browser-cache/index.html#代码文件",a:"代码文件"},"1.22":{t:"示例 nginx",p:`# 强缓存时效为30s，30s后默认使用协商缓存，此时缓存时效优先级 &gt; max-age
location / {
  ...`,l:"basic-quality/browser/browser/browser-cache/index.html#示例-nginx",a:"示例-nginx"},"2.0":{t:"# 从输入一个 URL 地址到浏览器完成渲染的整个过程",p:"",l:"basic-quality/browser/browser/browser-open-url/index.html",a:"从输入一个-url-地址到浏览器完成渲染的整个过程"},"2.1":{t:"简单版",p:"",l:"basic-quality/browser/browser/browser-open-url/index.html#简单版",a:"简单版"},"2.2":{t:"这里可以按照进程来分",p:`
浏览器主进程： 用户输入判断

处理输入信息
判断是 URL 还是 关键字
如果是关键字 会按照默认地址组装出一个 URL ...`,l:"basic-quality/browser/browser/browser-open-url/index.html#这里可以按照进程来分",a:"这里可以按照进程来分"},"2.3":{t:"复杂版",p:`
用户输入URL，浏览器会根据用户输入的信息判断是搜索还是网址，如果是搜索内容，就将搜索内容+默认搜索引擎合成新的URL；如 ...`,l:"basic-quality/browser/browser/browser-open-url/index.html#复杂版",a:"复杂版"},"3.0":{t:"# 浏览器进程",p:"",l:"basic-quality/browser/browser/browser-process/index.html",a:"浏览器进程"},"3.1":{t:"浏览器四大进程",p:`
Browser进程：浏览器的主进程（负责协调、主控），只有一个。

负责浏览器界面显示，与用户交互。如前进，后退等
负责各 ...`,l:"basic-quality/browser/browser/browser-process/index.html#浏览器四大进程",a:"浏览器四大进程"},"3.2":{t:"浏览器多进程的优势",p:`相比于单进程浏览器，多进程有如下优点：

避免单个page crash影响整个浏览器
避免第三方插件crash影响整个浏览器 ...`,l:"basic-quality/browser/browser/browser-process/index.html#浏览器多进程的优势",a:"浏览器多进程的优势"},"3.3":{t:"渲染进程包括哪些线程",p:"",l:"basic-quality/browser/browser/browser-process/index.html#渲染进程包括哪些线程",a:"渲染进程包括哪些线程"},"3.4":{t:"GUI渲染线程 （渲染主线程）",p:`
负责渲染浏览器界面，解析HTML，CSS，构建DOM树和 RenderObject 树，布局和绘制等。
当界面需要重绘（R ...`,l:"basic-quality/browser/browser/browser-process/index.html#gui渲染线程-渲染主线程",a:"gui渲染线程-渲染主线程"},"3.5":{t:"JS引擎线程(单线程)",p:`
也称为JS内核，负责处理Javascript脚本程序。（例如常常听到的谷歌浏览器的V8引擎，新版火狐的JaegerMonk ...`,l:"basic-quality/browser/browser/browser-process/index.html#js引擎线程-单线程",a:"js引擎线程-单线程"},"3.6":{t:"事件触发线程",p:`
归属于渲染进程而不是JS引擎，用来控制事件轮询（可以理解，JS引擎自己都忙不过来，需要浏览器另开线程协助）
当JS引擎执行 ...`,l:"basic-quality/browser/browser/browser-process/index.html#事件触发线程",a:"事件触发线程"},"3.7":{t:"定时触发器线程",p:`
定时器setInterval与setTimeout所在线程
浏览器定时计数器并不是由JavaScript引擎计数的,（因为 ...`,l:"basic-quality/browser/browser/browser-process/index.html#定时触发器线程",a:"定时触发器线程"},"3.8":{t:"异步http请求线程",p:`
用于处理请求XMLHttpRequest，在连接后是通过浏览器新开一个线程请求。如ajax，是浏览器新开一个http线程
 ...`,l:"basic-quality/browser/browser/browser-process/index.html#异步http请求线程",a:"异步http请求线程"},"4.0":{t:"# 浏览器缓存机浏览器的组成 & 内核组成制",p:"",l:"basic-quality/browser/browser/composition/index.html",a:"浏览器缓存机浏览器的组成-内核组成制"},"4.1":{t:"浏览器组成",p:"",l:"basic-quality/browser/browser/composition/index.html#浏览器组成",a:"浏览器组成"},"4.2":{t:"主要由7部分组成",p:`
User Interface（用户界面）：所能看到的界面部分；
Browser engine（浏览器引擎）：在用户界面和渲 ...`,l:"basic-quality/browser/browser/composition/index.html#主要由7部分组成",a:"主要由7部分组成"},"4.3":{t:"内核",p:`主要分成两部分：渲染引擎(layout engineer或Rendering Engine)和JS引擎
`,l:"basic-quality/browser/browser/composition/index.html#内核",a:"内核"},"4.4":{t:"渲染引擎",p:`
负责取得网页的内容（HTML、XML、图像等等）、整理讯息（例如加入CSS等），以及计算网页的显示方式，然后会输出至显示器 ...`,l:"basic-quality/browser/browser/composition/index.html#渲染引擎",a:"渲染引擎"},"4.5":{t:"JS引擎",p:`
解析和执行javascript来实现网页的动态效果
最开始渲染引擎和JS引擎并没有区分的很明确，后来JS引擎越来越独立，内 ...`,l:"basic-quality/browser/browser/composition/index.html#js引擎",a:"js引擎"},"4.6":{t:"常见的浏览器内核有哪些",p:`
Trident内核：IE,MaxThon,TT,The World,360,搜狗浏览器等。[又称MSHTML]
Gecko ...`,l:"basic-quality/browser/browser/composition/index.html#常见的浏览器内核有哪些",a:"常见的浏览器内核有哪些"},"5.0":{t:"# 浏览器的 5 种 Observer",p:"",l:"basic-quality/browser/browser/observer/index.html",a:"浏览器的-5-种-observer"},"5.1":{t:"IntersectionObserver",p:"",l:"basic-quality/browser/browser/observer/index.html#intersectionobserver",a:"intersectionobserver"},"5.2":{t:"一个元素从不可见到可见，从可见到不可见",p:"IntersectionObserver 可以监听一个元素和可视区域相交部分的比例，然后在可视比例达到某个阈值的时候触发回调 ...",l:"basic-quality/browser/browser/observer/index.html#一个元素从不可见到可见-从可见到不可见",a:"一个元素从不可见到可见-从可见到不可见"},"5.3":{t:"这有啥用？",p:"这太有用了。我们在做一些数据采集的时候，希望知道某个元素是否是可见的，什么时候可见的，就可以用这个 api 来监听，还有做图 ...",l:"basic-quality/browser/browser/observer/index.html#这有啥用",a:"这有啥用"},"5.4":{t:"MutationObserver",p:"",l:"basic-quality/browser/browser/observer/index.html#mutationobserver",a:"mutationobserver"},"5.5":{t:"监听一个普通 JS 对象的变化，我们会用 Object.defineProperty 或者 Proxy",p:`而监听元素的属性和子节点的变化，我们可以用 MutationObserver：
MutationObserver 可以监听对 ...`,l:"basic-quality/browser/browser/observer/index.html#监听一个普通-js-对象的变化-我们会用-object-defineproperty-或者-proxy",a:"监听一个普通-js-对象的变化-我们会用-object-defineproperty-或者-proxy"},"5.6":{t:"这有啥用？",p:"比如文章水印被人通过 devtools 去掉了，那么就可以通过 MutationObserver 监听这个变化，然后重新加上 ...",l:"basic-quality/browser/browser/observer/index.html#这有啥用",a:"这有啥用"},"5.7":{t:"ResizeObserver",p:"",l:"basic-quality/browser/browser/observer/index.html#resizeobserver",a:"resizeobserver"},"5.8":{t:"窗口我们可以用 addEventListener 监听 resize 事件，那元素呢？",p:`元素可以用 ResizeObserver 监听大小的改变，当 width、height 被修改时会触发回调。
const r ...`,l:"basic-quality/browser/browser/observer/index.html#窗口我们可以用-addeventlistener-监听-resize-事件-那元素呢",a:"窗口我们可以用-addeventlistener-监听-resize-事件-那元素呢"},"5.9":{t:"PerformanceObserver",p:`浏览器提供了 performance 的 api 用于记录一些时间点、某个时间段、资源加载的耗时等。
我们希望记录了 per ...`,l:"basic-quality/browser/browser/observer/index.html#performanceobserver",a:"performanceobserver"},"5.10":{t:"ReportingObserver",p:`当浏览器运行到过时（deprecation）的 api 的时候，会在控制台打印一个过时的报告:
浏览器还会在一些情况下对网页 ...`,l:"basic-quality/browser/browser/observer/index.html#reportingobserver",a:"reportingobserver"},"5.11":{t:"总结",p:"监听用户的交互行为，我们会用 addEventListener 来监听 click、mousedown、keydown、in ...",l:"basic-quality/browser/browser/observer/index.html#总结",a:"总结"},"5.12":{t:"浏览器提供了这 5 种 Observer",p:`
IntersectionObserver：监听元素可见性变化，常用来做元素显示的数据采集、图片的懒加载
MutationO ...`,l:"basic-quality/browser/browser/observer/index.html#浏览器提供了这-5-种-observer",a:"浏览器提供了这-5-种-observer"},"6.0":{t:"# 浏览器渲染原理",p:"",l:"basic-quality/browser/browser/render/index.html",a:"浏览器渲染原理"},"6.1":{t:"浏览器是如何渲染页面",p:`
当浏览器的网络线程收到 HTML 文档，会产生一个渲染任务，并将其传递给渲染主线程的消息队列。
在事件循环机制的作用下，渲 ...`,l:"basic-quality/browser/browser/render/index.html#浏览器是如何渲染页面",a:"浏览器是如何渲染页面"},"6.2":{t:"渲染流水线",p:`!图片
`,l:"basic-quality/browser/browser/render/index.html#渲染流水线",a:"渲染流水线"},"6.3":{t:"什么是 reflow? 回流",p:`
reflow 的本质就是重新计算 layout 树。
当进行了会影响布局树的操作后，需要重新计算布局树，会引发 layou ...`,l:"basic-quality/browser/browser/render/index.html#什么是-reflow-回流",a:"什么是-reflow-回流"},"6.4":{t:"什么是 repaint? 重绘",p:`
repaint 的本质就是重新根据分层信息计算了绘制指令
当改动了可见样式后，就需要重新计算，会引发 repaint。
由 ...`,l:"basic-quality/browser/browser/render/index.html#什么是-repaint-重绘",a:"什么是-repaint-重绘"},"6.5":{t:"为什么 transform 性能高",p:`
因为 transform 既不会影响布局也不影响绘制指令，它影响的只是渲染流程的最后一个「draw」阶段
由于 draw  ...`,l:"basic-quality/browser/browser/render/index.html#为什么-transform-性能高",a:"为什么-transform-性能高"},"7.0":{t:"# 浏览器渲染流水线解析",p:`1. 渲染流水线
!Browser Render Pipeline
上图显示了 Chrome 一个高度简化后的渲染流水线示意 ...`,l:"basic-quality/browser/browser/render-pipeline-parsing/index.html",a:"浏览器渲染流水线解析"},"7.1":{t:"1.1 进程与线程",p:"一个 Chrome 浏览器一般会有一个 Browser 进程，一个 GPU 进程，和多个 Renderer 进程，通常每个  ...",l:"basic-quality/browser/browser/render-pipeline-parsing/index.html#_1-1-进程与线程",a:"_1-1-进程与线程"},"7.2":{t:"1.2 帧",p:"所有的渲染流水线都会有帧的概念，帧这个概念抽象描述了渲染流水线下级模块往上级模块输出的绘制内容相关数据的封装。我们可以看到  ...",l:"basic-quality/browser/browser/render-pipeline-parsing/index.html#_1-2-帧",a:"_1-2-帧"},"7.3":{t:"1.1.1 Main Frame",p:"Main Frame 包含了对网页内容的描述，主要以绘图指令的形式，或者可以简单理解为某个时间点对整个网页的一个矢量图快照（ ...",l:"basic-quality/browser/browser/render-pipeline-parsing/index.html#_1-1-1-main-frame",a:"_1-1-1-main-frame"},"7.4":{t:"1.2.2 Compositor Frame",p:"Layer Compositor 接收 Blink 生成的 Main Frame，并转换成合成器内部的图层树结构（因为图层化 ...",l:"basic-quality/browser/browser/render-pipeline-parsing/index.html#_1-2-2-compositor-frame",a:"_1-2-2-compositor-frame"},"7.5":{t:"1.2.3 GL Frame",p:"Display Compositor 将 Compositor Frame 的每个 Draw Quad 绘制指令转换一个 G ...",l:"basic-quality/browser/browser/render-pipeline-parsing/index.html#_1-2-3-gl-frame",a:"_1-2-3-gl-frame"},"7.6":{t:"1.3 调度",p:"Chrome 渲染流水线的调度是基于请求和状态机响应，调度的最上级中枢运行在 Browser UI 线程，它按显示器的 VS ...",l:"basic-quality/browser/browser/render-pipeline-parsing/index.html#_1-3-调度",a:"_1-3-调度"},"7.7":{t:"2.1 合成器动画",p:`合成器动画又可以分为两类：

合成器本身触发并运行的，比如最常见的网页惯性滚动，包括整个网页或者某个页内可滚动元素的滚动；
 ...`,l:"basic-quality/browser/browser/render-pipeline-parsing/index.html#_2-1-合成器动画",a:"_2-1-合成器动画"},"7.8":{t:"2.2 非合成器动画",p:`非合成器动画也可以分为两类：

使用 CSS Translation 或者 Animation API 创建的动画，但是无法 ...`,l:"basic-quality/browser/browser/render-pipeline-parsing/index.html#_2-2-非合成器动画",a:"_2-2-非合成器动画"},"7.9":{t:"3.1 光栅化机制",p:"在对动画性能进行分析之前，需要先说明一下目前的 Chrome 的光栅化机制。合成器会监控是否需要安排新的光栅化任务，当需要光 ...",l:"basic-quality/browser/browser/render-pipeline-parsing/index.html#_3-1-光栅化机制",a:"_3-1-光栅化机制"},"7.10":{t:"4.1 动画流水线",p:`!Compositor Animation

上图显示了合成器动画的渲染流水线示意图，根据 Android WebView  ...`,l:"basic-quality/browser/browser/render-pipeline-parsing/index.html#_4-1-动画流水线",a:"_4-1-动画流水线"},"7.11":{t:"4.2 动画耗时分析",p:`
Begin Frame 的耗时一般很短，大概 1 ～ 2 毫秒左右；
Draw 的耗时也不长，一般不超过 5 毫秒，耗时主 ...`,l:"basic-quality/browser/browser/render-pipeline-parsing/index.html#_4-2-动画耗时分析",a:"_4-2-动画耗时分析"},"7.12":{t:"4.3 动画性能优化 Checklist",p:`根据上述的耗时分析，我们可以给出一个页端优化合成器动画性能的简单 Checklist：

检查网页的图层结构是否合理，包括深 ...`,l:"basic-quality/browser/browser/render-pipeline-parsing/index.html#_4-3-动画性能优化-checklist",a:"_4-3-动画性能优化-checklist"},"7.13":{t:"5.1 动画流水线",p:`!Blink Animation
从上图可以看出非合成器动画的流水线比合成器动画更长更复杂，并且非合成器动画的后半段跟合成器 ...`,l:"basic-quality/browser/browser/render-pipeline-parsing/index.html#_5-1-动画流水线",a:"_5-1-动画流水线"},"7.14":{t:"5.2 动画耗时分析和优化指南",p:`
JavaScipt 的耗时是由页端自己的逻辑决定的，一般超过 10 毫秒就基本上很难实现 60 帧的非合成器动画了；
Ma ...`,l:"basic-quality/browser/browser/render-pipeline-parsing/index.html#_5-2-动画耗时分析和优化指南",a:"_5-2-动画耗时分析和优化指南"},"8.0":{t:"# 浏览器存储",p:"",l:"basic-quality/browser/browser/storage/index.html",a:"浏览器存储"},"8.1":{t:"cookie vs localStorage vs sessionStorage",p:"",l:"basic-quality/browser/browser/storage/index.html#cookie-vs-localstorage-vs-sessionstorage",a:"cookie-vs-localstorage-vs-sessionstorage"},"8.2":{t:"cookie",p:`
cookie是客户端的解决方案，是一种网络服务器存储在计算机或移动设备上的纯文本文件，是服务器发送到Web浏览器上的一小块 ...`,l:"basic-quality/browser/browser/storage/index.html#cookie",a:"cookie"},"8.3":{t:"cookie的用处",p:`
会话管理：用户账号密码
个性化：用户偏好设置
追踪：记录和分析用户行为

`,l:"basic-quality/browser/browser/storage/index.html#cookie的用处",a:"cookie的用处"},"8.4":{t:"cookie的特点",p:`
大小限制在4KB以内
都会消耗网络的带宽
不加密则不安全
使用JS操作Cookie比较复杂

`,l:"basic-quality/browser/browser/storage/index.html#cookie的特点",a:"cookie的特点"},"8.5":{t:"localStorage",p:`只读的localStorage允许访问一个Document的对象Storage，存储的数据将保存在浏览器会话中。
addev ...`,l:"basic-quality/browser/browser/storage/index.html#localstorage",a:"localstorage"},"8.6":{t:"异同",p:"",l:"basic-quality/browser/browser/storage/index.html#异同",a:"异同"},"8.7":{t:"生命周期",p:`
cookie：可设置失效时间，没有设置的话，默认是关闭浏览器后失效
localStorage：除非被手动清除，否则将会永久 ...`,l:"basic-quality/browser/browser/storage/index.html#生命周期",a:"生命周期"},"8.8":{t:"存放数据大小",p:`
cookie：4KB左右
localStorage和sessionStorage：可以保存5MB的信息。

`,l:"basic-quality/browser/browser/storage/index.html#存放数据大小",a:"存放数据大小"},"8.9":{t:"http请求",p:`
cookie：每次都会携带在HTTP头中，如果使用cookie保存过多数据会带来性能问题
localStorage和ses ...`,l:"basic-quality/browser/browser/storage/index.html#http请求",a:"http请求"},"8.10":{t:"易用性",p:`
cookie：需要程序员自己封装，源生的Cookie接口不友好
localStorage和sessionStorage：源 ...`,l:"basic-quality/browser/browser/storage/index.html#易用性",a:"易用性"},"8.11":{t:"应用场景",p:`
从安全性来说，因为每次http请求都会携带cookie信息，这样无形中浪费了带宽，所以cookie应该尽可能少的使用，另外 ...`,l:"basic-quality/browser/browser/storage/index.html#应用场景",a:"应用场景"},"8.12":{t:"浏览器支持情况",p:`localStorage和sessionStorage是html5才应用的新特性，可能有些浏览器并不支持，这里要注意。
se ...`,l:"basic-quality/browser/browser/storage/index.html#浏览器支持情况",a:"浏览器支持情况"},"8.13":{t:"localStorage和sessionStorage",p:"",l:"basic-quality/browser/browser/storage/index.html#localstorage和sessionstorage",a:"localstorage和sessionstorage"},"8.14":{t:"两者的共同点在于",p:`
存储大小均为5M左右
都有同源策略限制
仅在客户端中保存，不参与和服务器的通信

`,l:"basic-quality/browser/browser/storage/index.html#两者的共同点在于",a:"两者的共同点在于"},"8.15":{t:"两者的不同点在于",p:`
生命周期 —— 数据可以存储多少时间

localStorage: 存储的数据是永久性的，除非用户人为删除否则会一直存在。 ...`,l:"basic-quality/browser/browser/storage/index.html#两者的不同点在于",a:"两者的不同点在于"},"9.0":{t:"# $i  控制台中安装插件",p:"",l:"basic-quality/browser/chrome-dev/skills/$i-install/index.html",a:"i-控制台中安装插件"},"9.1":{t:"下载插件",p:"https://chrome.google.com/webstore/detail/console-importer/hga ...",l:"basic-quality/browser/chrome-dev/skills/$i-install/index.html#下载插件",a:"下载插件"},"9.2":{t:"注意 有的网站屏蔽了",p:"",l:"basic-quality/browser/chrome-dev/skills/$i-install/index.html#注意-有的网站屏蔽了",a:"注意-有的网站屏蔽了"},"10.0":{t:"# 浏览器代码片段",p:"",l:"basic-quality/browser/chrome-dev/skills/DevTools-Snippets/index.html",a:"浏览器代码片段"},"10.1":{t:"使用方式",p:`
打开开发者工具
command + p 打开搜索
! + 代码片段的名字 选择某个代码片段

`,l:"basic-quality/browser/chrome-dev/skills/DevTools-Snippets/index.html#使用方式",a:"使用方式"},"10.2":{t:"添加代码片段",p:`
打开开发者工具
选择 source 选项卡 或者 源代码选项卡
选择 Snippets 或者代码段
新建代码段 取个名字
 ...`,l:"basic-quality/browser/chrome-dev/skills/DevTools-Snippets/index.html#添加代码片段",a:"添加代码片段"},"10.3":{t:"分享我自己常用的代码片段",p:"",l:"basic-quality/browser/chrome-dev/skills/DevTools-Snippets/index.html#分享我自己常用的代码片段",a:"分享我自己常用的代码片段"},"10.4":{t:"colors",p:`获取页面所有的颜色
// allcolors.js
// https://github.com/bgrins/devtool ...`,l:"basic-quality/browser/chrome-dev/skills/DevTools-Snippets/index.html#colors",a:"colors"},"10.5":{t:"cookies",p:`获取页面所有的 cookies
// viewcookies.js
// https://github.com/bgrins ...`,l:"basic-quality/browser/chrome-dev/skills/DevTools-Snippets/index.html#cookies",a:"cookies"},"10.6":{t:"cssprettifier",p:`css 格式化
// cssprettifier.js
// https://github.com/bgrins/devto ...`,l:"basic-quality/browser/chrome-dev/skills/DevTools-Snippets/index.html#cssprettifier",a:"cssprettifier"},"10.7":{t:"cssreload",p:`页面 css 颜色重新随机加载
// cssreload.js
// https://github.com/bgrins/d ...`,l:"basic-quality/browser/chrome-dev/skills/DevTools-Snippets/index.html#cssreload",a:"cssreload"},"10.8":{t:"formcontrols",p:`页面所有的 from 表单和表格打印
// formcontrols.js
// https://github.com/bg ...`,l:"basic-quality/browser/chrome-dev/skills/DevTools-Snippets/index.html#formcontrols",a:"formcontrols"},"10.9":{t:"jq",p:`给当前环境添加 jq
// jquerify.js
// https://github.com/bgrins/devtool ...`,l:"basic-quality/browser/chrome-dev/skills/DevTools-Snippets/index.html#jq",a:"jq"},"10.10":{t:"log",p:`增加 log 方法
// log.js
// https://github.com/bgrins/devtools-snip ...`,l:"basic-quality/browser/chrome-dev/skills/DevTools-Snippets/index.html#log",a:"log"},"10.11":{t:"performance",p:`打印当前页面的 performance
// performance.js
// https://github.com/bg ...`,l:"basic-quality/browser/chrome-dev/skills/DevTools-Snippets/index.html#performance",a:"performance"},"10.12":{t:"tags",p:`获取页面所有的 标签数量
function getTagCount() {
  const tags = document. ...`,l:"basic-quality/browser/chrome-dev/skills/DevTools-Snippets/index.html#tags",a:"tags"},"10.13":{t:"urlquerystring",p:`获取当前路径的拼接参数
// querystringvalues.js
// https://github.com/bgri ...`,l:"basic-quality/browser/chrome-dev/skills/DevTools-Snippets/index.html#urlquerystring",a:"urlquerystring"},"10.14":{t:"varglobal",p:`在console中打印全局变量，用于检测全局变量的内存泄露。
/*
 log-globals
 by Sindre Sorh ...`,l:"basic-quality/browser/chrome-dev/skills/DevTools-Snippets/index.html#varglobal",a:"varglobal"},"11.0":{t:"# DevTools Tips",p:"",l:"basic-quality/browser/chrome-dev/skills/DevTools-tips/index.html",a:"devtools-tips"},"11.1":{t:"Elements",p:"这个功能肯定是大家经常用到的，我们可以通过它来可视化所有的 DOM 标签，可以查看任何 DOM 的属性，接下来我们就来学习一 ...",l:"basic-quality/browser/chrome-dev/skills/DevTools-tips/index.html#elements",a:"elements"},"11.2":{t:"Element 状态",p:"你可能会在开发中遇到这么一个场景：给一个 a 标签设置了多种状态下的样式，但是如果手动去改变状态的话就有点麻烦，这时候这个  ...",l:"basic-quality/browser/chrome-dev/skills/DevTools-tips/index.html#element-状态",a:"element-状态"},"11.3":{t:"快速定位 Element",p:"通常页面都是可以滚动的，那么如果想查看的元素不在当前窗口的话，你还需要滚动页面才能找到元素，这时候这个 Tips 就能帮你解 ...",l:"basic-quality/browser/chrome-dev/skills/DevTools-tips/index.html#快速定位-element",a:"快速定位-element"},"11.4":{t:"DOM 断点",p:"给 JS 打断点想必各位都听过，但是 DOM 断点知道的人应该就少了。如果你想查看一个 DOM 元素是如何通过 JS 更改的 ...",l:"basic-quality/browser/chrome-dev/skills/DevTools-tips/index.html#dom-断点",a:"dom-断点"},"11.5":{t:"查看事件",p:"我们还可以通过 DevTools 来查看页面中添加了多少的事件。假如当你发现页面滚动起来有性能上的问题时，就可以查看一下有多 ...",l:"basic-quality/browser/chrome-dev/skills/DevTools-tips/index.html#查看事件",a:"查看事件"},"11.6":{t:"找到之前查看过的 DOM 元素",p:"不知道你是否遇到过这样的问题，找不到之前查看过的 DOM 元素在哪里了，需要一个个去找这就有点麻烦了，这时候你就可以使用这个 ...",l:"basic-quality/browser/chrome-dev/skills/DevTools-tips/index.html#找到之前查看过的-dom-元素",a:"找到之前查看过的-dom-元素"},"11.7":{t:"Debugging",p:`给 JS 打断点想必大家都会，但是打断点也是有一个不为人知的 Tips 的。
for (let index = 0; ind ...`,l:"basic-quality/browser/chrome-dev/skills/DevTools-tips/index.html#debugging",a:"debugging"},"12.0":{t:"# 使用 control (按钮) 来移动元素",p:"如果你只是想移动你当前选中的元素，在 DOM 结构中往上挪一点或者往下挪一点，而不是拖动和放置，你同样可以使用[ctrl]  ...",l:"basic-quality/browser/chrome-dev/skills/control/index.html",a:"使用-control-按钮-来移动元素"},"13.0":{t:"# 拖动 & 放置 元素",p:"当你想看看页面的某一部分在 DOM 树的不同位置的显示效果时，只需要拖动放置它(到指定的位置)，就像在机器上的其他任何地方一 ...",l:"basic-quality/browser/chrome-dev/skills/drag-element/index.html",a:"拖动-放置-元素"},"14.0":{t:"# $0",p:"",l:"basic-quality/browser/chrome-dev/skills/get-element/index.html",a:"_0"},"14.1":{t:"首先选中某个元素",p:`然后在 控制台 直接  $0 就可以拿到
`,l:"basic-quality/browser/chrome-dev/skills/get-element/index.html#首先选中某个元素",a:"首先选中某个元素"},"15.0":{t:"# 快速隐藏元素  h",p:`
通过 'h' 来隐藏元素
按一下 'h' 就可以隐藏你在元素面板中选择的元素。再次按下 'h' 可以使它出现。某些的时候这 ...`,l:"basic-quality/browser/chrome-dev/skills/hidden-element/index.html",a:"快速隐藏元素-h"},"16.0":{t:"# 将下方代码粘贴到 浏览器控制台中 运行即可",p:`var Vue, walker, node;
walker = document.createTreeWalker(docu ...`,l:"basic-quality/browser/chrome-dev/skills/open-prod-vue-devtool/index.html",a:"将下方代码粘贴到-浏览器控制台中-运行即可"},"17.0":{t:"# elements， logs， sources & network 中的查找",p:"DevTools 中的前4个主要的面板，每一个都支持 [ctrl] + [f] 快捷方式，你可以使用对应的查询方式来查找信息 ...",l:"basic-quality/browser/chrome-dev/skills/search/index.html",a:"elements-logs-sources-network-中的查找"},"18.0":{t:"# Store as global (存储为一个全局变量)",p:`
如果你在 console 中打印了一堆数据 (例如你在 App 中计算出来的一个数组) ，然后你想对这些数据做一些额外的操 ...`,l:"basic-quality/browser/chrome-dev/skills/store-global/index.html",a:"store-as-global-存储为一个全局变量"},"19.0":{t:"# 浏览器基础知识点及常考面试题",p:"",l:"basic-quality/browser/interview-questions/index.html",a:"浏览器基础知识点及常考面试题"},"19.1":{t:"事件机制",p:`涉及面试题：事件的触发过程是怎么样的？知道什么是事件代理嘛？
`,l:"basic-quality/browser/interview-questions/index.html#事件机制",a:"事件机制"},"19.2":{t:"事件触发三阶段",p:`事件触发有三个阶段：

window 往事件触发处传播，遇到注册的捕获事件会触发
传播到事件触发处时触发注册的事件
从事件触 ...`,l:"basic-quality/browser/interview-questions/index.html#事件触发三阶段",a:"事件触发三阶段"},"19.3":{t:"注册事件",p:"通常我们使用 addEventListener 注册事件，该函数的第三个参数可以是布尔值，也可以是对象。对于布尔值 useC ...",l:"basic-quality/browser/interview-questions/index.html#注册事件",a:"注册事件"},"19.4":{t:"事件代理",p:`如果一个节点中的子节点是动态生成的，那么子节点需要注册事件的话应该注册在父节点上
&lt;ul id=&quot;ul&qu ...`,l:"basic-quality/browser/interview-questions/index.html#事件代理",a:"事件代理"},"19.5":{t:"跨域",p:`涉及面试题：什么是跨域？为什么浏览器要使用同源策略？你有几种方式可以解决跨域问题？了解预检请求嘛？
因为浏览器出于安全考虑， ...`,l:"basic-quality/browser/interview-questions/index.html#跨域",a:"跨域"},"19.6":{t:"JSONP",p:"JSONP 的原理很简单，就是利用 script 标签没有跨域限制的漏洞。通过 script 标签指向一个需要访问的地址并提 ...",l:"basic-quality/browser/interview-questions/index.html#jsonp",a:"jsonp"},"19.7":{t:"CORS",p:`CORS 需要浏览器和后端同时支持。IE 8 和 9 需要通过 XDomainRequest 来实现。
浏览器会自动进行 C ...`,l:"basic-quality/browser/interview-questions/index.html#cors",a:"cors"},"19.8":{t:"简单请求",p:`以 Ajax 为例，当满足以下条件时，会触发简单请求

使用下列方法之一：


GET
HEAD
POST


Conten ...`,l:"basic-quality/browser/interview-questions/index.html#简单请求",a:"简单请求"},"19.9":{t:"复杂请求",p:`那么很显然，不符合以上条件的请求就肯定是复杂请求了。
对于复杂请求来说，首先会发起一个预检请求，该请求是 option 方法 ...`,l:"basic-quality/browser/interview-questions/index.html#复杂请求",a:"复杂请求"},"19.10":{t:"document.domain",p:`该方式只能用于二级域名相同的情况下，比如 a.test.com 和 b.test.com 适用于该方式。
只需要给页面添加  ...`,l:"basic-quality/browser/interview-questions/index.html#document-domain",a:"document-domain"},"19.11":{t:"postMessage",p:`这种方式通常用于获取嵌入页面中的第三方页面数据。一个页面发送消息，另一个页面判断来源并接收消息
// 发送消息端
windo ...`,l:"basic-quality/browser/interview-questions/index.html#postmessage",a:"postmessage"},"19.12":{t:"存储",p:`涉及面试题：有几种方式可以实现存储功能，分别有什么优缺点？什么是 Service Worker？
`,l:"basic-quality/browser/interview-questions/index.html#存储",a:"存储"},"19.13":{t:"cookie，localStorage，sessionStorage，indexDB",p:`我们先来通过表格学习下这几种存储方式的区别



特性
cookie
localStorage
sessionStorage ...`,l:"basic-quality/browser/interview-questions/index.html#cookie-localstorage-sessionstorage-indexdb",a:"cookie-localstorage-sessionstorage-indexdb"},"19.14":{t:"Service Worker",p:"Service Worker 是运行在浏览器背后的独立线程，一般可以用来实现缓存功能。使用 Service Worker的话 ...",l:"basic-quality/browser/interview-questions/index.html#service-worker",a:"service-worker"},"20.0":{t:"# JS运行9大概念",p:"",l:"basic-quality/browser/v8/js-run/index.html",a:"js运行9大概念"},"20.1":{t:"记住这张图",p:`!图片
`,l:"basic-quality/browser/v8/js-run/index.html#记住这张图",a:"记住这张图"},"20.2":{t:"解释这张图",p:`
首先，我打算对这张图中要表达的内容做一个综述，然后再分别举例解释上述概念。
一段JS代码的执行分为编译阶段和执行阶段。
在 ...`,l:"basic-quality/browser/v8/js-run/index.html#解释这张图",a:"解释这张图"},"20.3":{t:"概念1：变量提升",p:`foo()
function foo() {
  console.log('foo')
}

console.log(a)
 ...`,l:"basic-quality/browser/v8/js-run/index.html#概念1-变量提升",a:"概念1-变量提升"},"20.4":{t:"概念2：执行上下文",p:`执行上下文就是JS代码的执行环境，在JS编译阶段创建，用于变量的存储和查询。JS中存在三种执行上下文：

全局执行上下文：编 ...`,l:"basic-quality/browser/v8/js-run/index.html#概念2-执行上下文",a:"概念2-执行上下文"},"20.5":{t:"概念3：调用栈",p:`
多个执行上下文会放在一个栈结构中进行管理，由于该结构可以表达函数的调用关系，因此被称作函数调用栈，简称调用栈。
在执行上下 ...`,l:"basic-quality/browser/v8/js-run/index.html#概念3-调用栈",a:"概念3-调用栈"},"20.6":{t:"概念4：作用域",p:`作用域是变量的定义区域，等同于执行上下文。不同类型的作用域访问范围不同。ES6以前，JS只有两种作用域：

函数作用域：函数 ...`,l:"basic-quality/browser/v8/js-run/index.html#概念4-作用域",a:"概念4-作用域"},"20.7":{t:"概念5：块状作用域",p:`var因为变量提升不支持块状作用域，所谓块状就是一对大括号组成的区域，比如：
//if块
if(1){}

//while块 ...`,l:"basic-quality/browser/v8/js-run/index.html#概念5-块状作用域",a:"概念5-块状作用域"},"20.8":{t:"概念6：作用域链",p:`
作用域链是不同作用域之间的变量查找顺序。
在上下文内部，从词法环境栈顶开始，从栈顶到栈底，再到变量环境。
在上下文之间，通 ...`,l:"basic-quality/browser/v8/js-run/index.html#概念6-作用域链",a:"概念6-作用域链"},"20.9":{t:"概念7：词法作用域",p:`
词法作用域指代的是我们刚才描述的JS中应用的变量查找规则，所以词法作用域全称应该是词法作用域链。
为什么叫词法作用域呢？
 ...`,l:"basic-quality/browser/v8/js-run/index.html#概念7-词法作用域",a:"概念7-词法作用域"},"20.10":{t:"概念8：闭包",p:"在执行上下文之间，有时会插入一个闭包，因为根据词法作用域的规则，内部函数总是可以访问其外部函数中声明的变量，如果外部函数在返 ...",l:"basic-quality/browser/v8/js-run/index.html#概念8-闭包",a:"概念8-闭包"},"20.11":{t:"概念9：this",p:"",l:"basic-quality/browser/v8/js-run/index.html#概念9-this",a:"概念9-this"},"20.12":{t:"首先我们讨论一下为什么要有this？",p:`var a = 1
var obj = {
  a: 2,
  foo: function() {
    console. ...`,l:"basic-quality/browser/v8/js-run/index.html#首先我们讨论一下为什么要有this",a:"首先我们讨论一下为什么要有this"},"21.0":{t:"# JavaScript是怎么被运行起来的?",p:"",l:"basic-quality/browser/v8/start/index.html",a:"javascript是怎么被运行起来的"},"21.1":{t:"Web应用的生命周期",p:`典型客户端Web应用的生命周期从用户在浏览器地址栏输入一串 URL，或单击一个链接开始。
首先当我们输入了URL,www.b ...`,l:"basic-quality/browser/v8/start/index.html#web应用的生命周期",a:"web应用的生命周期"},"21.2":{t:"什么是v8",p:`

v8是谷歌的开源高性能JavaScript和WebAssembly引擎,使用c++编写。目前主要使用于 Chrome 浏 ...`,l:"basic-quality/browser/v8/start/index.html#什么是v8",a:"什么是v8"},"21.3":{t:"V8 是怎么执行 JavaScript 代码的",p:`参考下面的流程图，以及官方的流程图
!图片
!图片

首先Blink将ja代码交给v8引擎,以ASCLL,LATIN1,UT ...`,l:"basic-quality/browser/v8/start/index.html#v8-是怎么执行-javascript-代码的",a:"v8-是怎么执行-javascript-代码的"},"21.4":{t:"Ignition解释器",p:"Ignition是一台寄存器机器，每个字节码将其输入和输出指定为显式寄存器操作数，这与堆栈机器相反，在堆栈机器中，每个字节码 ...",l:"basic-quality/browser/v8/start/index.html#ignition解释器",a:"ignition解释器"},"21.5":{t:"Turbofan 优化编译器",p:"TurboFan 将尖端的中间表示与多层翻译和优化管道相结合，以生成比以前使用 CrankShaft JIT 更优质的机器代 ...",l:"basic-quality/browser/v8/start/index.html#turbofan-优化编译器",a:"turbofan-优化编译器"},"21.6":{t:"什么是抽象语法树",p:`
在计算机科学中，抽象语法树（Abstract Syntax Tree，AST），或简称语法树（Syntax tree），是 ...`,l:"basic-quality/browser/v8/start/index.html#什么是抽象语法树",a:"什么是抽象语法树"},"21.7":{t:"抽象语法书生成过程",p:"词法分析 : 词法分析，也称之为扫描（scanner），简单来说就是把一段代码进行拆分，一个一个字母的来读取字符，然后与定义 ...",l:"basic-quality/browser/v8/start/index.html#抽象语法书生成过程",a:"抽象语法书生成过程"},"21.8":{t:"什么是执行上下文",p:`
执行上下文是一种规范，用于跟踪ECMAScript实现对代码的运行时评估。
全局执行上下文在 V8 的生存周期内是不会被销 ...`,l:"basic-quality/browser/v8/start/index.html#什么是执行上下文",a:"什么是执行上下文"},"21.9":{t:"执行上下文的类型",p:`
全局执行上下文: 这是默认的或基本的执行上下文。任何不在函数内部的代码位于全局执行上下文中。他在编译阶段便创建一个 Glo ...`,l:"basic-quality/browser/v8/start/index.html#执行上下文的类型",a:"执行上下文的类型"},"21.10":{t:"骗人的小鬼",p:`eval函数:在Eval函数内部执行的代码也会获得它自己的执行上下文
function foo(str, age) {
   ...`,l:"basic-quality/browser/v8/start/index.html#骗人的小鬼",a:"骗人的小鬼"},"21.11":{t:"执行栈",p:`

执行栈,在其他编程语言中也被用为调用栈,是一个具有后进先出数据结构的栈，它用于存储代码执行期间创建的所有执行上下文。

 ...`,l:"basic-quality/browser/v8/start/index.html#执行栈",a:"执行栈"},"21.12":{t:"如何创建执行上下文",p:`执行上下文的创建分为两个阶段,第一阶段是创建阶段,第二个阶段是执行阶段
`,l:"basic-quality/browser/v8/start/index.html#如何创建执行上下文",a:"如何创建执行上下文"},"21.13":{t:"执行阶段",p:`执行阶段所要理解的东西不是很多,在这里先提前说了。
在这个阶段，所有这些变量的赋值都完成了，代码也最终执行了。
`,l:"basic-quality/browser/v8/start/index.html#执行阶段",a:"执行阶段"},"21.14":{t:"创建阶段",p:"在创建阶段,V8引擎只是扫描所有代码,但是不执行。它创建作用域,并且为其作用域内的每个变量和函数都分配内存。之后还初始化th ...",l:"basic-quality/browser/v8/start/index.html#创建阶段",a:"创建阶段"},"21.15":{t:"什么是 词法环境(Lexical Environments)",p:"中文理解就是词法环境是一种规范类型，用于根据ECMAScript代码的词法嵌套结构定义标识符与特定变量和函数的关联。词汇环境 ...",l:"basic-quality/browser/v8/start/index.html#什么是-词法环境-lexical-environments",a:"什么是-词法环境-lexical-environments"},"21.16":{t:"什么是 环境记录(Environment Records)",p:`环境记录是在词法环境中存放变量和函数声明的地方。
环境记录可分为两种类型:
声明性环境记录:声明性环境变量存储了作用域中的变 ...`,l:"basic-quality/browser/v8/start/index.html#什么是-环境记录-environment-records",a:"什么是-环境记录-environment-records"},"21.17":{t:"全局环境记录(Global Environment Records)",p:`全局环境记录在逻辑上是单个记录，但它被指定为封装对象环境记录和声明性环境记录的组合。
全局环境记录的对象环境记录组件包含所有 ...`,l:"basic-quality/browser/v8/start/index.html#全局环境记录-global-environment-records",a:"全局环境记录-global-environment-records"},"21.18":{t:"什么是作用域",p:"作用域是一套规则,用于确定在何处以及如何查找变量(标识符)。如果查找的目的对变量进行赋值,那么就会使用LHS查询,如果目的是 ...",l:"basic-quality/browser/v8/start/index.html#什么是作用域",a:"什么是作用域"},"21.19":{t:"作用域和执行上下文是什么关系",p:`执行下上下文，简单概括来说就是全局代码执行期间,JS引擎就会创建一个栈来存储管理所有的执行上下文对象。
作用域是在JavaS ...`,l:"basic-quality/browser/v8/start/index.html#作用域和执行上下文是什么关系",a:"作用域和执行上下文是什么关系"},"22.0":{t:"# 计算机组成原理",p:"",l:"basic-quality/computer-composition/index.html",a:"计算机组成原理"},"22.1":{t:"1、计算机的工作原理",p:"首先，计算机最基本的5大组成部分如下图，分别为：输入设备(比如键盘), 存储器(比如内存), 运算器(cpu), 控制器(c ...",l:"basic-quality/computer-composition/index.html#_1、计算机的工作原理",a:"_1、计算机的工作原理"},"22.2":{t:"工作原理如下",p:"",l:"basic-quality/computer-composition/index.html#工作原理如下",a:"工作原理如下"},"22.3":{t:"1.1 控制器 ---> 控制输入设备 ----> 指令流向内存",p:`当我们输入数据的时候，cpu里的控制器会让输入设备把这些指令存储到存储器(内存)上。
!图片
`,l:"basic-quality/computer-composition/index.html#_1-1-控制器-控制输入设备-指令流向内存",a:"_1-1-控制器-控制输入设备-指令流向内存"},"22.4":{t:"1.2 控制器分析指令 ---> 控制存储器 ---> 把数据送到运算器",p:`控制器分析指令之后， 此时让存储器把数据发送到运算器里(控制器和运算器都在cpu里面)
这里需要注意，存储器既能存储数据，还 ...`,l:"basic-quality/computer-composition/index.html#_1-2-控制器分析指令-控制存储器-把数据送到运算器",a:"_1-2-控制器分析指令-控制存储器-把数据送到运算器"},"22.5":{t:"1.3 控制器控制运算器做数据的运算 并且将运算结果返回存储器",p:`!图片
`,l:"basic-quality/computer-composition/index.html#_1-3-控制器控制运算器做数据的运算-并且将运算结果返回存储器",a:"_1-3-控制器控制运算器做数据的运算-并且将运算结果返回存储器"},"22.6":{t:"1.4 控制器控制存储器将结果返回给输出设备",p:`!图片
从接下来，我们更近一步，看看计算机内部，CPU是怎么跟存储器交互的。
`,l:"basic-quality/computer-composition/index.html#_1-4-控制器控制存储器将结果返回给输出设备",a:"_1-4-控制器控制存储器将结果返回给输出设备"},"22.7":{t:"2、CPU及其工作过程",p:`CPU中比较重要的两个部件是运算器和控制器，我们先来看看运算器的主要作用
`,l:"basic-quality/computer-composition/index.html#_2、cpu及其工作过程",a:"_2、cpu及其工作过程"},"22.8":{t:"2.1 运算器主要部件",p:`!图片
如上图，运算器里最重要的部件是ALU，中文叫算术逻辑单元，用来进行算术和逻辑运算的。其它的MQ,ACC这些我们不用管 ...`,l:"basic-quality/computer-composition/index.html#_2-1-运算器主要部件",a:"_2-1-运算器主要部件"},"22.9":{t:"2.2 控制器主要部件",p:`!图片
控制器中最重要的部件是CU（控制单元），只要是分析指令，给出控制信号。
IR（指令寄存器），存放当前需要执行的指令
 ...`,l:"basic-quality/computer-composition/index.html#_2-2-控制器主要部件",a:"_2-2-控制器主要部件"},"22.10":{t:"2.3 举例 - 取数指令执行过程",p:`!图片
`,l:"basic-quality/computer-composition/index.html#_2-3-举例-取数指令执行过程",a:"_2-3-举例-取数指令执行过程"},"22.11":{t:"首先，是取指令的过程如下",p:`!图片


第一步，PC，也就是存放指令地址的地方，我们要知道下一条指令是什么，就必须去存储器拿，CPU才知道接下来做什么。 ...`,l:"basic-quality/computer-composition/index.html#首先-是取指令的过程如下",a:"首先-是取指令的过程如下"},"22.12":{t:"3、计算机编程语言",p:`我们看看机器语言，怎么表示存放一个数的指令，例如下图
!图片

其中第一个0000，表示的是汇编语言里的LOAD，也就是加载 ...`,l:"basic-quality/computer-composition/index.html#_3、计算机编程语言",a:"_3、计算机编程语言"},"22.13":{t:"高级语言一般有两种方式转换为机器语言",p:`
一种是直接借助编译器，将高级语言转换为二进制代码，比如c，这样c运行起来就特别快，因为编译后是机器语言，直接就能在系统上跑 ...`,l:"basic-quality/computer-composition/index.html#高级语言一般有两种方式转换为机器语言",a:"高级语言一般有两种方式转换为机器语言"},"22.14":{t:"4、进制转换",p:`接下来4.3这个小节会解释为什么0.1 + 0.2 等于0.3
`,l:"basic-quality/computer-composition/index.html#_4、进制转换",a:"_4、进制转换"},"22.15":{t:"4.1 二进制如何转化为十进制",p:"例如2进制101.1如何转化为10进制。（有些同学觉得可以用parseInt('101.1', 2)，这个是不行的，因为pa ...",l:"basic-quality/computer-composition/index.html#_4-1-二进制如何转化为十进制",a:"_4-1-二进制如何转化为十进制"},"22.16":{t:"4.2 十进制整数转为二进制",p:"JS里面可以用toString(2)这个方法来转换。如果要用通用的方法，例如：将十进制数（29）转换成二进制数， 算法如下： ...",l:"basic-quality/computer-composition/index.html#_4-2-十进制整数转为二进制",a:"_4-2-十进制整数转为二进制"},"22.17":{t:"4.3 十进制小数转为二进制",p:`方式是采用“乘2取整，顺序排列”法。具体做法是：

用2乘十进制小数，可以得到积，将积的整数部分取出-
再用2乘余下的小数部 ...`,l:"basic-quality/computer-composition/index.html#_4-3-十进制小数转为二进制",a:"_4-3-十进制小数转为二进制"},"22.18":{t:"如: 十进制 0.25 转为二进制",p:`0.25 2 = 0.5 取出整数部分：0
0.52 = 1.0 取出整数部分1
即十进制0.25的二进制为 0.01 (  ...`,l:"basic-quality/computer-composition/index.html#如-十进制-0-25-转为二进制",a:"如-十进制-0-25-转为二进制"},"22.19":{t:"接下来看0.2",p:"0.2化二进制是 0.22=0.4,整数位为0 0.42=0.8,整数位为0 0.82=1.6,整数位为1,去掉整数位得0. ...",l:"basic-quality/computer-composition/index.html#接下来看0-2",a:"接下来看0-2"},"22.20":{t:"5、定点数和浮点数",p:`首先，什么是定点数呢？
`,l:"basic-quality/computer-composition/index.html#_5、定点数和浮点数",a:"_5、定点数和浮点数"},"22.21":{t:"5.1 定点数",p:`!图片
如上图，举例纯整数的二进制1011和-1011，如果是整数，符号位用0表示，如果是负数符号为用1表示
!图片
同理， ...`,l:"basic-quality/computer-composition/index.html#_5-1-定点数",a:"_5-1-定点数"},"22.22":{t:"5.2 浮点数",p:`浮点数怎么表示呢？
!图片
上面是十进制的科学计数法，从中我们需要了解几个概念，一个是尾数，基数和阶码

尾数必须是纯小数， ...`,l:"basic-quality/computer-composition/index.html#_5-2-浮点数",a:"_5-2-浮点数"},"22.23":{t:"所以浮点数的通用表示格式如下",p:`!图片

S代表尾数
r代表基数
j代表阶码
这里需要注意的是，浮点数的加减运算，并不是像我们上面介绍的那样简单，会经过以下 ...`,l:"basic-quality/computer-composition/index.html#所以浮点数的通用表示格式如下",a:"所以浮点数的通用表示格式如下"},"22.24":{t:"6、局部性原理和catche(缓存)",p:`先看下图
!图片
（说明一下，MDR和MAR虽然逻辑上属于主存，但是在电路实现的时候，MDR和MAR离CPU比较近）
上图是 ...`,l:"basic-quality/computer-composition/index.html#_6、局部性原理和catche-缓存",a:"_6、局部性原理和catche-缓存"},"22.25":{t:"7、I/O设备的演变",p:"",l:"basic-quality/computer-composition/index.html#_7、i-o设备的演变",a:"_7、i-o设备的演变"},"22.26":{t:"I/O是什么呢？",p:"输入/输出（Input /Output ,简称I/O），指的是一切操作、程序或设备与计算机之间发生的数据传输过程。 复制代码 ...",l:"basic-quality/computer-composition/index.html#i-o是什么呢",a:"i-o是什么呢"},"22.27":{t:"接着看第二阶段",p:`!图片

为了解决第一阶段CPU要等待I/O设备，串行的工作方式，所有I/O设备通过I/O总线来跟CPU打交道，一旦某个I/ ...`,l:"basic-quality/computer-composition/index.html#接着看第二阶段",a:"接着看第二阶段"},"22.28":{t:"第三阶段，CPU通过通道控制部件来管理I/O设备，CPU不需要帮它安排任务，只需要简单的发出启动和停止类似的命令，通道部件就会自动的安排相应的I/O设备工作",p:"",l:"basic-quality/computer-composition/index.html#第三阶段-cpu通过通道控制部件来管理i-o设备-cpu不需要帮它安排任务-只需要简单的发出启动和停止类似的命令-通道部件就会自动的安排相应的i-o设备工作",a:"第三阶段-cpu通过通道控制部件来管理i-o设备-cpu不需要帮它安排任务-只需要简单的发出启动和停止类似的命令-通道部件就会自动的安排相应的i-o设备工作"},"23.0":{t:"# 计算机网络基础知识",p:"",l:"basic-quality/computer-networks/index.html",a:"计算机网络基础知识"},"23.1":{t:"1、计算机网络概念（简单扫一眼即可）",p:"计算机网络：是一个将分散的、具有独立功能的计算机系统，通过通信设备与线路连接起来，由功能完善的软件实现资源共享和信息传递的系 ...",l:"basic-quality/computer-networks/index.html#_1、计算机网络概念-简单扫一眼即可",a:"_1、计算机网络概念-简单扫一眼即可"},"23.2":{t:"2、衡量计算机网络的性能的指标",p:`这些内容主要是为了学习后面具体的协议，以及分析这些协议的报文时，需要掌握的基本概念。
`,l:"basic-quality/computer-networks/index.html#_2、衡量计算机网络的性能的指标",a:"_2、衡量计算机网络的性能的指标"},"23.3":{t:"2.1 速率",p:"速率就是数据传输（数据是指0和1）的速率，比如你用迅雷下载，1兆每秒，来衡量目前数据传输的快慢。它是计算机网络中最重要的一个 ...",l:"basic-quality/computer-networks/index.html#_2-1-速率",a:"_2-1-速率"},"23.4":{t:"2.2 带宽",p:"在计算机网络中，网络带宽是指在单位时间（一般指的是1秒钟）内能传输的数据量，比如说你家的电信网络是100兆比特，意思是，一秒 ...",l:"basic-quality/computer-networks/index.html#_2-2-带宽",a:"_2-2-带宽"},"23.5":{t:"2.3 吞吐量",p:`吞吐量表示在单位时间内通过某个网络（或信道、接口）的数据量。
`,l:"basic-quality/computer-networks/index.html#_2-3-吞吐量",a:"_2-3-吞吐量"},"23.6":{t:"以上三点，我们举个案例",p:`
一条路每秒最多能过100辆车（宽带就相当于100辆/秒）。
而并不是每秒都会有100辆车过，假如第一秒有0辆，第二秒有10 ...`,l:"basic-quality/computer-networks/index.html#以上三点-我们举个案例",a:"以上三点-我们举个案例"},"23.7":{t:"2.4 时延",p:`时延是指数据（报文/分组/比特流）从网络（或链路）的一端传送到另一端所需的时间。单位是s。 时延分一下几种：
`,l:"basic-quality/computer-networks/index.html#_2-4-时延",a:"_2-4-时延"},"23.8":{t:"（1）发送时延",p:`!图片
就是说我跟你说话，从我开始说，到说话结束这段时间，就是发送时延。
`,l:"basic-quality/computer-networks/index.html#_1-发送时延",a:"_1-发送时延"},"23.9":{t:"（2）传播时延",p:`!图片
如gif图所示，信道上第一个比特开始，到最后一个比特达到主机接口需要的时间就是传播时延。
`,l:"basic-quality/computer-networks/index.html#_2-传播时延",a:"_2-传播时延"},"23.10":{t:"（3）排队时延",p:`
分组在经过网络传输时，要经过很多的路由器。
但分组在进入路由器后要先在输入队列中排队等待处理。
在路由器确定了转发接口后， ...`,l:"basic-quality/computer-networks/index.html#_3-排队时延",a:"_3-排队时延"},"23.11":{t:"（4）处理时延",p:"路由器或主机在收到数据包时，要花费一定时间进行处理，例如分析数据包的首部、进行首部差错检验，查找路由表为数据包选定准发接口， ...",l:"basic-quality/computer-networks/index.html#_4-处理时延",a:"_4-处理时延"},"23.12":{t:"（5）往返时间（RTT）",p:"在计算机网络中，往返时间也是一个重要的性能指标，它表示从发送方发送数据开始，到发送方收到来自接收方的确认（接受方收到数据后便 ...",l:"basic-quality/computer-networks/index.html#_5-往返时间-rtt",a:"_5-往返时间-rtt"},"23.13":{t:"（6）时延带宽积",p:`是指传播时延乘以带宽
`,l:"basic-quality/computer-networks/index.html#_6-时延带宽积",a:"_6-时延带宽积"},"23.14":{t:"3、正文开始！OSI参考模型",p:`OSI参考模型是网络互连的七层框架, 这里不详细介绍了，每一层的具体内容会在后面介绍，这里只需要有一个初步的印象。
如下图所 ...`,l:"basic-quality/computer-networks/index.html#_3、正文开始-osi参考模型",a:"_3、正文开始-osi参考模型"},"23.15":{t:"4、物理层",p:"",l:"basic-quality/computer-networks/index.html#_4、物理层",a:"_4、物理层"},"23.16":{t:"4.1 物理层有啥用？",p:"对于物理层，有人会说，这不就是网线吗，比如家里连接路由器的网线，电线杆上的光纤？其实不然，物理层更多的是规定一种标准，他并不 ...",l:"basic-quality/computer-networks/index.html#_4-1-物理层有啥用",a:"_4-1-物理层有啥用"},"23.17":{t:"那物理层到底有哪些主要任务呢？",p:`
比如说，规定了电气特性，信号的电平用+10V - +15V表示二进制的0，用-10V - -15V表示二进制的1，只要条网 ...`,l:"basic-quality/computer-networks/index.html#那物理层到底有哪些主要任务呢",a:"那物理层到底有哪些主要任务呢"},"23.18":{t:"4.2 光纤宽带上网是以什么样的形式传输数据呢？",p:`
首先计算机网卡传输出来的数据是电信号，光纤传输的是光脉冲信号，有光脉冲表示1，无光脉冲表示0。
而可见光的频率大约是10的 ...`,l:"basic-quality/computer-networks/index.html#_4-2-光纤宽带上网是以什么样的形式传输数据呢",a:"_4-2-光纤宽带上网是以什么样的形式传输数据呢"},"23.19":{t:"4.3 物理层设备中继器",p:"",l:"basic-quality/computer-networks/index.html#_4-3-物理层设备中继器",a:"_4-3-物理层设备中继器"},"23.20":{t:"为什么需要中继器呢？",p:`因为再线路上传输的信号功率会逐渐衰减，衰减到一定程度时将造成信号失真，因此会导致接收错误。
!图片
中继器可以对信号进行再生 ...`,l:"basic-quality/computer-networks/index.html#为什么需要中继器呢",a:"为什么需要中继器呢"},"23.21":{t:"5、数据链路层",p:"",l:"basic-quality/computer-networks/index.html#_5、数据链路层",a:"_5、数据链路层"},"23.22":{t:"5.1 数据链路层是做什么的呢？",p:`我们用一个小故事来举例
!图片

网络层是个大Boss， 负责给数据链路层这个小秘书下达任务，让小秘把5份文件给B公司，小秘 ...`,l:"basic-quality/computer-networks/index.html#_5-1-数据链路层是做什么的呢",a:"_5-1-数据链路层是做什么的呢"},"23.23":{t:"5.2 数据链路层的主要功能",p:"",l:"basic-quality/computer-networks/index.html#_5-2-数据链路层的主要功能",a:"_5-2-数据链路层的主要功能"},"23.24":{t:"(1) 封装成帧 数据链路层并不是无脑转发boss的信息，她要把文件编号封装一下。封装的网络数据包，在链路层就叫数据帧",p:`!图片
`,l:"basic-quality/computer-networks/index.html#_1-封装成帧-数据链路层并不是无脑转发boss的信息-她要把文件编号封装一下。封装的网络数据包-在链路层就叫数据帧",a:"_1-封装成帧-数据链路层并不是无脑转发boss的信息-她要把文件编号封装一下。封装的网络数据包-在链路层就叫数据帧"},"23.25":{t:"(2)透明传输",p:"透明传输是指不管boss下达的任何信息，比如文件里有裁掉这个秘书的信息，秘书都要原原本本的传输。帧的数据部分可能有跟帧首部完 ...",l:"basic-quality/computer-networks/index.html#_2-透明传输",a:"_2-透明传输"},"23.26":{t:"(3)差错控制",p:"差错控制是在文件送到B公司小秘书手里的时候，快递包上写着5个文件，秘书一看只有3个文件，就会让傻子重新发送有没有送到的文件。 ...",l:"basic-quality/computer-networks/index.html#_3-差错控制",a:"_3-差错控制"},"23.27":{t:"(4)差错纠正",p:`差错纠正是链路层知道1，2，3，4，5个文件，丢失的两个文件到底是哪两个，并且能通过重新发送没有的文件来纠正。
还有一些是故 ...`,l:"basic-quality/computer-networks/index.html#_4-差错纠正",a:"_4-差错纠正"},"23.28":{t:"(5)流量控制 比如说发送方发送速度特别快，接收方接收速度特别慢，会造成传输出错",p:"这里需要注意的是，传输层TCP也有流量控制功能，区别在于TCP是端到端的流量控制，链路层是点到点（比如一个路由器到下一个路由 ...",l:"basic-quality/computer-networks/index.html#_5-流量控制-比如说发送方发送速度特别快-接收方接收速度特别慢-会造成传输出错",a:"_5-流量控制-比如说发送方发送速度特别快-接收方接收速度特别慢-会造成传输出错"},"23.29":{t:"6 以太网和无线网",p:"以太网是一种局域网技术，其规定了访问控制方法、传输控制协议、网络拓扑结构、传输速率等，完成数据链路层和物理层的一些内容，它采 ...",l:"basic-quality/computer-networks/index.html#_6-以太网和无线网",a:"_6-以太网和无线网"},"23.30":{t:"6.1 以太网的帧格式",p:`!图片

其中目的地址和源地址指的是MAC地址，即设备的物理地址。MAC地址用于标示网卡，每个网卡都具有唯一的MAC 地址
 ...`,l:"basic-quality/computer-networks/index.html#_6-1-以太网的帧格式",a:"_6-1-以太网的帧格式"},"23.31":{t:"6.2 以太网的特点",p:`
无连接。发送方和接收方不建立连接。
不可靠。接收方不向发送方进行确认，差错帧直接丢弃。

`,l:"basic-quality/computer-networks/index.html#_6-2-以太网的特点",a:"_6-2-以太网的特点"},"23.32":{t:"6.3 以太网的拓扑结构",p:`跟以太网相关的拓扑结构有星型和总线型。
`,l:"basic-quality/computer-networks/index.html#_6-3-以太网的拓扑结构",a:"_6-3-以太网的拓扑结构"},"23.33":{t:"星型拓扑如下",p:`!图片
`,l:"basic-quality/computer-networks/index.html#星型拓扑如下",a:"星型拓扑如下"},"23.34":{t:"总线型拓扑如下",p:`!图片
互联网初期，以太网的总线型拓扑比较普遍。随着总线型以太网上的站点数目增多,可靠性也会随之下降,而随着大规模集成电路以 ...`,l:"basic-quality/computer-networks/index.html#总线型拓扑如下",a:"总线型拓扑如下"},"23.35":{t:"6.4 网卡",p:"计算机传出的数据，经过网卡，就会变为以太网的帧，还会完成一些链路管理（CDMA/CD的实现），以及编码和译码（编码译码我不太 ...",l:"basic-quality/computer-networks/index.html#_6-4-网卡",a:"_6-4-网卡"},"23.36":{t:"6.5 无线局域网",p:`无线局域网WLAN是利用无线电波、激光和红外线等无线通信技术来构建的局域网。
无线局域网我们只介绍一下典型的网络结构。
!图 ...`,l:"basic-quality/computer-networks/index.html#_6-5-无线局域网",a:"_6-5-无线局域网"},"23.37":{t:"6.6 CSMA/CD协议",p:`因为这个协议是以太网所使用的，所以我们只需要记住一些特点就行了。

每一个站在发送数据之前以及发送数据时以及发送数据时都要检 ...`,l:"basic-quality/computer-networks/index.html#_6-6-csma-cd协议",a:"_6-6-csma-cd协议"},"23.38":{t:"6.7 链路层的设备",p:"",l:"basic-quality/computer-networks/index.html#_6-7-链路层的设备",a:"_6-7-链路层的设备"},"23.39":{t:"（1）网桥",p:"网桥根据MAC帧的目的地址进行转发和过滤。当网桥收到一个帧时，并不会向所有接口转发此帧，而是先检查此帧的目的MAC地址，然后 ...",l:"basic-quality/computer-networks/index.html#_1-网桥",a:"_1-网桥"},"23.40":{t:"（2）以太网交换机",p:`谈到交换机，就不得不提两个概念，冲突域和广播域

冲突域： 是指同一时间只能由一台设备发送信息的范围。
广播域：如果站点发出 ...`,l:"basic-quality/computer-networks/index.html#_2-以太网交换机",a:"_2-以太网交换机"},"23.41":{t:"7、 网络层",p:`概念走一走，看一看，瞄一眼就行啦！
`,l:"basic-quality/computer-networks/index.html#_7、-网络层",a:"_7、-网络层"},"23.42":{t:"7.1 网络层概念",p:"网络层主要任务是将分组(分组的概念是大多数计算机网络都不能连续地传送任意长的数据，所以实际上网络系统把数据分割成小块，然后逐 ...",l:"basic-quality/computer-networks/index.html#_7-1-网络层概念",a:"_7-1-网络层概念"},"23.43":{t:"7.2 学习网络层需要了解的概念",p:"",l:"basic-quality/computer-networks/index.html#_7-2-学习网络层需要了解的概念",a:"_7-2-学习网络层需要了解的概念"},"23.44":{t:"7.2.1 分组交换",p:"当主机H1要向另一主机H2发送数据（报文）时，首先将数据划分成若干个等长的分组，然后将这些分组一个接一个地发往里与H1相联的 ...",l:"basic-quality/computer-networks/index.html#_7-2-1-分组交换",a:"_7-2-1-分组交换"},"23.45":{t:"7.2.2 数据报",p:"数据报是通过网络传输的数据的基本单元，包含一个报头（header）和数据本身。说白了，就是带地址的数据，比如你的写了一句微信 ...",l:"basic-quality/computer-networks/index.html#_7-2-2-数据报",a:"_7-2-2-数据报"},"23.46":{t:"7.2.3 数据报格式",p:`!图片

首部的固定部分是20字节，共20 * 8 = 160比特（1字节=8比特）
0 - 4 比特是版本号，版本有ipv ...`,l:"basic-quality/computer-networks/index.html#_7-2-3-数据报格式",a:"_7-2-3-数据报格式"},"23.47":{t:"7.2.4 IP分片",p:"",l:"basic-quality/computer-networks/index.html#_7-2-4-ip分片",a:"_7-2-4-ip分片"},"23.48":{t:"为什么要分片呢？",p:"链路层数据帧封装的数据大小是有限制的，以太网的MTU（MTU是指一种通信协议的某一层上面所能通过的最大数据包大小）是1500 ...",l:"basic-quality/computer-networks/index.html#为什么要分片呢",a:"为什么要分片呢"},"23.49":{t:"7.2.5 ip地址分类",p:`!图片
`,l:"basic-quality/computer-networks/index.html#_7-2-5-ip地址分类",a:"_7-2-5-ip地址分类"},"23.50":{t:"ip地址有5种",p:`A类：1.0.0.0~126.255.255.255 B类：128.0.0.0~191.255.255.255
C类：192 ...`,l:"basic-quality/computer-networks/index.html#ip地址有5种",a:"ip地址有5种"},"23.51":{t:"7.2.6 网络地址转换(NAT)",p:"在ip地址分类里面，我们知道私有ip地址是不能跟外网交互的，在小公司大多数计算机的地址都是192.168网段，都是私有ip地 ...",l:"basic-quality/computer-networks/index.html#_7-2-6-网络地址转换-nat",a:"_7-2-6-网络地址转换-nat"},"23.52":{t:"7.2.7 子网划分和子网掩码",p:`首先要明白，为什么要划分子网？
首先大家要知道： 总体来说，划分子网不但没有增加可用IP地址，而且减少了可用IP地址，因为每 ...`,l:"basic-quality/computer-networks/index.html#_7-2-7-子网划分和子网掩码",a:"_7-2-7-子网划分和子网掩码"},"23.53":{t:"7.3 ARP协议",p:"",l:"basic-quality/computer-networks/index.html#_7-3-arp协议",a:"_7-3-arp协议"},"23.54":{t:"为什么需要ARP协议呢？",p:`我们简单回顾一下以太网的帧的格式
!图片
上图有一个源地址和目的地址，这两个地址都是指的mac地址，mac地址是什么呢？简单 ...`,l:"basic-quality/computer-networks/index.html#为什么需要arp协议呢",a:"为什么需要arp协议呢"},"23.55":{t:"7.4 DHCP协议",p:"DHCP（动态主机配置协议）是一个局域网的网络协议。指的是由服务器控制一段lP地址范围，客户机登录服务器时就可以自动获得服务 ...",l:"basic-quality/computer-networks/index.html#_7-4-dhcp协议",a:"_7-4-dhcp协议"},"23.56":{t:"大致工作过程（了解即可）",p:`!图片
`,l:"basic-quality/computer-networks/index.html#大致工作过程-了解即可",a:"大致工作过程-了解即可"},"23.57":{t:"7.5 ICMP协议",p:`ICMP协议是一个网络层协议。 为什么我们需要ICMP协议呢？
一个新搭建好的网络，往往需要先进行一个简单的测试，来验证网络 ...`,l:"basic-quality/computer-networks/index.html#_7-5-icmp协议",a:"_7-5-icmp协议"},"23.58":{t:"ICMP协议的功能主要有",p:`
确认IP包是否成功到达目标地址
通知在发送过程中IP包被丢弃的原因 我们举一个例子：
!图片

主机H2收到主机H1的一个 ...`,l:"basic-quality/computer-networks/index.html#icmp协议的功能主要有",a:"icmp协议的功能主要有"},"23.59":{t:"7.6 网络设备路由器简介",p:`路由器是一种具有多个输入端口和多个输出端口的专用计算机，其任务是转发和分组。
如下图所示，分别由转发和分组功能的说明。
!图 ...`,l:"basic-quality/computer-networks/index.html#_7-6-网络设备路由器简介",a:"_7-6-网络设备路由器简介"},"23.60":{t:"8 传输层知识",p:"传输层是只有计算机才有的层次，主要提供是进程间逻辑通信 + 可靠传输或者不可靠的功能。比如你的QQ跟你异地女友的QQ视频聊天 ...",l:"basic-quality/computer-networks/index.html#_8-传输层知识",a:"_8-传输层知识"},"23.61":{t:"8.1 端口号有什么用",p:`端口号可以用来标识同一个主机上通信的不同应用程序（就是哪个应用程序在使用这个端口）。
那为什么一个端口只能分配给一个应用程序 ...`,l:"basic-quality/computer-networks/index.html#_8-1-端口号有什么用",a:"_8-1-端口号有什么用"},"23.62":{t:"8.2 UDP协议",p:`UDP协议是参考模型中一种无连接的传输层协议，提供面向事务的简单不可靠信息传送服务。
`,l:"basic-quality/computer-networks/index.html#_8-2-udp协议",a:"_8-2-udp协议"},"23.63":{t:"（1） UDP协议的特点",p:`

UDP是无连接的，减少开销和发送数据之前的时间延迟。大家都知道TCP的三次握手和四次分手，这个是需要时间花销的，但是UD ...`,l:"basic-quality/computer-networks/index.html#_1-udp协议的特点",a:"_1-udp协议的特点"},"23.64":{t:"（2）UDP首部",p:`!图片

16位端口号占了2B，也就是16位，说明端口号的范围是0 - 65535。源端口号可以没有，因为不希望收到对方的回 ...`,l:"basic-quality/computer-networks/index.html#_2-udp首部",a:"_2-udp首部"},"23.65":{t:"8.3 TCP协议",p:`TCP协议简单来说是一种位于传输层的，面向连接的、可靠的、基于字节流的传输层通信协议 TCP协议的特点:


TCP是面向连 ...`,l:"basic-quality/computer-networks/index.html#_8-3-tcp协议",a:"_8-3-tcp协议"},"23.66":{t:"TCP报文的首部格式",p:`如下图所示，我们看一下比较重要的一些首部字段，这里我们介绍固定的20字节的TCP首部
!图片

源端口和目的端口分别是指发送 ...`,l:"basic-quality/computer-networks/index.html#tcp报文的首部格式",a:"tcp报文的首部格式"},"23.67":{t:"控制位 作用",p:`ACK 置1时表示确认号合法，为0的时候表示数据段不包含确认信息，确认号被忽略
PSH 置1时请求的数据段在接收方得到后就可 ...`,l:"basic-quality/computer-networks/index.html#控制位-作用",a:"控制位-作用"},"23.68":{t:"8.3.3 TCP建立连接",p:`如下图所示，分别来了解一下建立连接的过程：
!图片

首先客户端要发送一个数据包告诉服务器要建立连接，根据上面我们了解到的控 ...`,l:"basic-quality/computer-networks/index.html#_8-3-3-tcp建立连接",a:"_8-3-3-tcp建立连接"},"23.69":{t:"8.3.4 TCP释放连接",p:`如下图所示，分别来了解一下释放连接的过程：
!图片

客户端发起请求，请求断开链接。FIN=1，seq=u。u是之前传送过来 ...`,l:"basic-quality/computer-networks/index.html#_8-3-4-tcp释放连接",a:"_8-3-4-tcp释放连接"},"23.70":{t:"8.3.5 TCP3次握手4次挥手常见面试题",p:`为什么连接的时候是三次握手，关闭的时候却是四次握手？

关闭连接时，服务器收到对方的FIN报文时，仅仅表示对方不再发送数据了 ...`,l:"basic-quality/computer-networks/index.html#_8-3-5-tcp3次握手4次挥手常见面试题",a:"_8-3-5-tcp3次握手4次挥手常见面试题"},"23.71":{t:"以下是网上普遍的解答",p:`
若建立连接只需两次握手，客户端并没有太大的变化，仍然需要获得服务端的应答后才进入ESTABLISHED状态，而服务端在收到 ...`,l:"basic-quality/computer-networks/index.html#以下是网上普遍的解答",a:"以下是网上普遍的解答"},"23.72":{t:"什么是SYN洪泛攻击？",p:`
SYN洪泛攻击就是利用TCP协议的特性（三次握手）。
攻击者发送TCP的 SYN，SYN是TCP三次握手中第一个数据包，而 ...`,l:"basic-quality/computer-networks/index.html#什么是syn洪泛攻击",a:"什么是syn洪泛攻击"},"23.73":{t:"8.3.6 TCP如何实现可靠传输",p:`主要通过以下四种方式实现可靠传输机制：

校验。伪首部是为了增加TCP校验和的检错能力：通过伪首部的目的IP地址来检查TCP ...`,l:"basic-quality/computer-networks/index.html#_8-3-6-tcp如何实现可靠传输",a:"_8-3-6-tcp如何实现可靠传输"},"23.74":{t:"8.3.7 TCP的流量控制",p:"",l:"basic-quality/computer-networks/index.html#_8-3-7-tcp的流量控制",a:"_8-3-7-tcp的流量控制"},"23.75":{t:"为什么需要流量控制呢？",p:`比如发送方发送速度非常快，接收方接收速度特别慢，这样就会发生严重的丢包现象。
TCP通过滑动窗口的机制来实现流量控制。简单来 ...`,l:"basic-quality/computer-networks/index.html#为什么需要流量控制呢",a:"为什么需要流量控制呢"},"23.76":{t:"8.3.8 TCP的拥塞控制",p:`这部分我也觉得文字部分太生硬了，开始我也不怎么理解，看来一个视频之后我了解了基本原理，这里我文字版和视频地址都放上来。
视频 ...`,l:"basic-quality/computer-networks/index.html#_8-3-8-tcp的拥塞控制",a:"_8-3-8-tcp的拥塞控制"},"23.77":{t:"文字版如下",p:`
如果网络出现拥塞，分组将会丢失，此时发送方会继续重传，从而导致网络拥塞程度更高。因此当出现拥塞时，应当控制发送方的速率。这 ...`,l:"basic-quality/computer-networks/index.html#文字版如下",a:"文字版如下"},"23.78":{t:"慢开始与拥塞避免",p:`
发送的最初执行慢开始，令 cwnd = 1，发送方只能发送 1 个报文段；当收到确认后，将 cwnd 加倍，因此之后发送方 ...`,l:"basic-quality/computer-networks/index.html#慢开始与拥塞避免",a:"慢开始与拥塞避免"},"23.79":{t:"快重传与快恢复",p:`
在接收方，要求每次接收到报文段都应该对最后一个已收到的有序报文段进行确认。例如已经接收到 M1 和 M2，此时收到 M4， ...`,l:"basic-quality/computer-networks/index.html#快重传与快恢复",a:"快重传与快恢复"},"23.80":{t:"9、应用层",p:"",l:"basic-quality/computer-networks/index.html#_9、应用层",a:"_9、应用层"},"23.81":{t:"9.1 应用层有啥用？",p:`应用层对应用程序的通信提供服务。

区分是发送报文还是接收报文
定义报文类型的语法，比如某字段的意思，例如http中cont ...`,l:"basic-quality/computer-networks/index.html#_9-1-应用层有啥用",a:"_9-1-应用层有啥用"},"23.82":{t:"9.2 应用层常见的模型",p:`第一种是客户端/服务器模型，也就是C/S架构。比如电子邮件、web都是。
!图片
第二种是P2P模型，每个主机既可以提供服务 ...`,l:"basic-quality/computer-networks/index.html#_9-2-应用层常见的模型",a:"_9-2-应用层常见的模型"},"23.83":{t:"9.3 短链接和长链接",p:"而TCP连接有两种工作方式：短连接方式（Short-Live Connection）和长连接方式（Long-Live Con ...",l:"basic-quality/computer-networks/index.html#_9-3-短链接和长链接",a:"_9-3-短链接和长链接"},"23.84":{t:"短连接方式",p:`
当客户端有请求时，会建立一个TCP连接，接收到服务器响应后，就断开连接。下次有请求时，再建立连接，收到响应后，再断开。如此 ...`,l:"basic-quality/computer-networks/index.html#短连接方式",a:"短连接方式"},"23.85":{t:"长连接方式",p:"\n客户端和服务器建立TCP连接后，会一直使用这条连接进行数据交互，直到没有数据传输或异常断开。在空闲期间，通常会使用``心跳 ...",l:"basic-quality/computer-networks/index.html#长连接方式",a:"长连接方式"},"23.86":{t:"9.4 DNS",p:"什么是DNS说白了就是将域名转化为ip，比如www.qq.com，这是域名，可以是网络包需要对方ip地址，域名是不能加入网络 ...",l:"basic-quality/computer-networks/index.html#_9-4-dns",a:"_9-4-dns"},"23.87":{t:"大概的通信过程如下",p:`
用户主机上运行着DNS的客户端，就是我们的PC机或者手机客户端运行着DNS客户端了
浏览器将接收到的url中抽取出域名字段 ...`,l:"basic-quality/computer-networks/index.html#大概的通信过程如下",a:"大概的通信过程如下"},"23.88":{t:"9.5 万维网和http协议",p:`万维网www是一个大规模的、联机式的信息存储所，是无数个网络站点和网页的集合。
知识盲区： 在不少人看来，互联网、因特网、万 ...`,l:"basic-quality/computer-networks/index.html#_9-5-万维网和http协议",a:"_9-5-万维网和http协议"},"23.89":{t:"URL的格式如下",p:`!图片

用户通过点击超链接获取资源，这些资源通过超文本传输协议（http）传送给使用者。
HTTP协议定义了浏览器怎样向万 ...`,l:"basic-quality/computer-networks/index.html#url的格式如下",a:"url的格式如下"},"23.90":{t:"http报文头分析",p:`!图片
下面是对各部分的简要描述：

方法(method)：客户端希望服务器对资源执行的动作，是一个单独的词，比如，GET、 ...`,l:"basic-quality/computer-networks/index.html#http报文头分析",a:"http报文头分析"},"23.91":{t:"通用头部：既可以出现在请求报文中，也可以出现在响应报文中，它提供了与报文相关的最基本的信息",p:"Connection：允许客户端和服务器指定与请求/响应连接有关的选项，http1.1默认是keep-alive Date： ...",l:"basic-quality/computer-networks/index.html#通用头部-既可以出现在请求报文中-也可以出现在响应报文中-它提供了与报文相关的最基本的信息",a:"通用头部-既可以出现在请求报文中-也可以出现在响应报文中-它提供了与报文相关的最基本的信息"},"23.92":{t:"响应头部：响应头部为客户端提供了一些额外信息，比如谁在发送响应、响应者的功能，甚至与响应相关的一些特殊指令",p:`
Age：(从最初创建开始)响应持续时间
Server：服务器应用程序软件的名称和版本
Accept-Ranges：对此资源 ...`,l:"basic-quality/computer-networks/index.html#响应头部-响应头部为客户端提供了一些额外信息-比如谁在发送响应、响应者的功能-甚至与响应相关的一些特殊指令",a:"响应头部-响应头部为客户端提供了一些额外信息-比如谁在发送响应、响应者的功能-甚至与响应相关的一些特殊指令"},"23.93":{t:"实体首部：描述主体的长度和内容，或者资源自身",p:`
Allow：列出了可以对此实体执行的请求方法
Location：告知客户端实体实际上位于何处，用于将接收端定向到资源的位置 ...`,l:"basic-quality/computer-networks/index.html#实体首部-描述主体的长度和内容-或者资源自身",a:"实体首部-描述主体的长度和内容-或者资源自身"},"23.94":{t:"实体的主体部分：该部分其实就是HTTP要传输的内容，是可选的。HTTP报文可以承载很多类型的数字数据，比如，图片、视频、HTML文档电子邮件、软件应用程序等等",p:"",l:"basic-quality/computer-networks/index.html#实体的主体部分-该部分其实就是http要传输的内容-是可选的。http报文可以承载很多类型的数字数据-比如-图片、视频、html文档电子邮件、软件应用程序等等",a:"实体的主体部分-该部分其实就是http要传输的内容-是可选的。http报文可以承载很多类型的数字数据-比如-图片、视频、html文档电子邮件、软件应用程序等等"},"24.0":{t:"# HTTP 请求跨域问题",p:"",l:"basic-quality/http/cross-domain/index.html",a:"http-请求跨域问题"},"24.1":{t:"跨域的原理跨域",p:`是指浏览器不能执行其他网站的脚本。它是由浏览器的同源策略造成的。
同源策略,是浏览器对 JavaScript 实施的安全限制 ...`,l:"basic-quality/http/cross-domain/index.html#跨域的原理跨域",a:"跨域的原理跨域"},"24.2":{t:"跨域原理",p:`即是通过各种方式，避开浏览器的安全限制。
`,l:"basic-quality/http/cross-domain/index.html#跨域原理",a:"跨域原理"},"24.3":{t:"解决方案",p:"最初做项目的时候，使用的是jsonp，但存在一些问题，使用get请求不安全，携带数据较小，后来也用过iframe，但只有主域 ...",l:"basic-quality/http/cross-domain/index.html#解决方案",a:"解决方案"},"24.4":{t:"JSONP",p:"ajax 请求受同源策略影响，不允许进行跨域请求，而 script 标签 src 属性中的链 接却可以访问跨域的 js 脚本 ...",l:"basic-quality/http/cross-domain/index.html#jsonp",a:"jsonp"},"24.5":{t:"步骤",p:`
去创建一个script标签
script的src属性设置接口地址
接口参数，必须要带一个自定义函数名，要不然后台无法返回数 ...`,l:"basic-quality/http/cross-domain/index.html#步骤",a:"步骤"},"24.6":{t:"跨域问题实际上改的是 http 里面哪个参数",p:`答：Access-Control-Allow-Origin
`,l:"basic-quality/http/cross-domain/index.html#跨域问题实际上改的是-http-里面哪个参数",a:"跨域问题实际上改的是-http-里面哪个参数"},"25.0":{t:"# HTTP请求头",p:"",l:"basic-quality/http/http-headers/index.html",a:"http请求头"},"25.1":{t:"1.1 场景",p:"如果你有了解过 Content-Disposition 这个 Response Header，那你一定知道，只需要响应头上增 ...",l:"basic-quality/http/http-headers/index.html#_1-1-场景",a:"_1-1-场景"},"25.2":{t:"1.2 介绍",p:`Content-Disposition：这个响应头可以决定内容是 预览 还是 下载。
它支持三种格式的值：

Content ...`,l:"basic-quality/http/http-headers/index.html#_1-2-介绍",a:"_1-2-介绍"},"25.3":{t:"1.3 示例",p:`为此，我特意写了一个 express 小示例。
大抵是在 express 应用下写了三个路由，如下：
const user  ...`,l:"basic-quality/http/http-headers/index.html#_1-3-示例",a:"_1-3-示例"},"25.4":{t:"2.1 场景",p:`实施：“客户反馈Bug 还是没修复。”
你：“哥，真修复了，要不你让客户清一下缓存？”
实施：“啊？客户说他不会清……”
永 ...`,l:"basic-quality/http/http-headers/index.html#_2-1-场景",a:"_2-1-场景"},"25.5":{t:"2.2 介绍",p:`Cache-Control：用来指定缓存机制。
缓存，作为前端八股文必考知识，相信大家已经耳熟能详。 常见的 Cache-C ...`,l:"basic-quality/http/http-headers/index.html#_2-2-介绍",a:"_2-2-介绍"},"25.6":{t:"2.3 实际生产如何运用？",p:`
凡是名称带有 hash 值的资源，一律可以强缓存。
（毕竟内容一旦有变化，名称的hash 也跟着变了）
凡是通过 cdn  ...`,l:"basic-quality/http/http-headers/index.html#_2-3-实际生产如何运用",a:"_2-3-实际生产如何运用"},"25.7":{t:"3.1 场景",p:`
&quot;春哥春哥，为啥我登录成功了，请求还是 401 ？&quot;


&quot;春哥春哥，为啥我存进 cooki ...`,l:"basic-quality/http/http-headers/index.html#_3-1-场景",a:"_3-1-场景"},"25.8":{t:"3.2 介绍",p:"Cookie 曾经是 Web 开发无法绕开的一道门槛，而现在它的存在感越来越弱，但海量的存量项目并不会因为技术的趋势而消失， ...",l:"basic-quality/http/http-headers/index.html#_3-2-介绍",a:"_3-2-介绍"},"25.9":{t:"3.3 开发常见问题分析",p:`

为啥你登录成功了，请求还是 401？
早期非常多的项目，使用 Cookie 作为用户身份识别的手段，比如 Spring  ...`,l:"basic-quality/http/http-headers/index.html#_3-3-开发常见问题分析",a:"_3-3-开发常见问题分析"},"26.0":{t:"# http  vs https",p:"",l:"basic-quality/http/http-https/index.html",a:"http-vs-https"},"26.1":{t:"1.http 和 https 的基本概念",p:`
http: 是一个客户端和服务器端请求和应答的标准（TCP），用于从 WWW 服务器传输超文本到本地浏览器的超文本传输协议 ...`,l:"basic-quality/http/http-https/index.html#_1-http-和-https-的基本概念",a:"_1-http-和-https-的基本概念"},"26.2":{t:"2.http 和 https 的区别及优缺点？",p:`
http 是超文本传输协议，信息是明文传输，HTTPS 协议要比 http 协议安全，https 是具有安全性的 ssl  ...`,l:"basic-quality/http/http-https/index.html#_2-http-和-https-的区别及优缺点",a:"_2-http-和-https-的区别及优缺点"},"26.3":{t:"3.https 协议的工作原理",p:"",l:"basic-quality/http/http-https/index.html#_3-https-协议的工作原理",a:"_3-https-协议的工作原理"},"26.4":{t:"客户端在使用 HTTPS 方式与 Web 服务器通信时有以下几个步骤",p:`
客户端使用 https url 访问服务器，则要求 web 服务器建立 ssl 链接。
web 服务器接收到客户端的请求之 ...`,l:"basic-quality/http/http-https/index.html#客户端在使用-https-方式与-web-服务器通信时有以下几个步骤",a:"客户端在使用-https-方式与-web-服务器通信时有以下几个步骤"},"26.5":{t:"区别",p:`
https协议需要到ca申请证书，一般免费证书较少，因而需要一定费用。
http是超文本传输协议，信息是明文传输，http ...`,l:"basic-quality/http/http-https/index.html#区别",a:"区别"},"27.0":{t:"# HTTP 及 TLS",p:"",l:"basic-quality/http/http-tls/index.html",a:"http-及-tls"},"27.1":{t:"HTTP 请求中的内容 HTTP 请求由三部分构成，分别为",p:`

请求行


首部


实体


请求行大概长这样 GET /images/logo.gif HTTP/1.1，基本由请求 ...`,l:"basic-quality/http/http-tls/index.html#http-请求中的内容-http-请求由三部分构成-分别为",a:"http-请求中的内容-http-请求由三部分构成-分别为"},"27.2":{t:"在技术上说",p:`
Get 请求能缓存，Post 不能
Post 相对 Get 安全一点点，因为Get 请求都包含在 URL 里（当然你想写到 ...`,l:"basic-quality/http/http-tls/index.html#在技术上说",a:"在技术上说"},"27.3":{t:"首部",p:`首部分为请求首部和响应首部，并且部分首部两种通用，接下来我们就来学习一部分的常用首部。
`,l:"basic-quality/http/http-tls/index.html#首部",a:"首部"},"27.4":{t:"通用首部",p:"",l:"basic-quality/http/http-tls/index.html#通用首部",a:"通用首部"},"27.5":{t:"通用字段 作用",p:`
Cache-Control 控制缓存的行为
Connection 浏览器想要优先使用的连接类型，比如 keep-alive ...`,l:"basic-quality/http/http-tls/index.html#通用字段-作用",a:"通用字段-作用"},"27.6":{t:"请求首部",p:"",l:"basic-quality/http/http-tls/index.html#请求首部",a:"请求首部"},"27.7":{t:"请求首部 作用",p:`
Accept 能正确接收的媒体类型
Accept-Charset 能正确接收的字符集
Accept-Encoding 能正 ...`,l:"basic-quality/http/http-tls/index.html#请求首部-作用",a:"请求首部-作用"},"27.8":{t:"响应首部",p:"",l:"basic-quality/http/http-tls/index.html#响应首部",a:"响应首部"},"27.9":{t:"响应首部 作用",p:`
Accept-Ranges 是否支持某些种类的范围
Age 资源在代理缓存中存在的时间
ETag 资源标识
Locatio ...`,l:"basic-quality/http/http-tls/index.html#响应首部-作用",a:"响应首部-作用"},"27.10":{t:"实体首部",p:"",l:"basic-quality/http/http-tls/index.html#实体首部",a:"实体首部"},"27.11":{t:"实体首部 作用",p:`
Allow 资源的正确请求方式
Content-Encoding 内容的编码格式
Content-Language 内容使 ...`,l:"basic-quality/http/http-tls/index.html#实体首部-作用",a:"实体首部-作用"},"27.12":{t:"TLS HTTPS 还是通过了 HTTP 来传输信息，但是信息通过 TLS 协议进行了加密。",p:`
TLS 协议位于传输层之上，应用层之下。首次进行 TLS 协议传输需要两个 RTT ，接下来可以通过 Session Re ...`,l:"basic-quality/http/http-tls/index.html#tls-https-还是通过了-http-来传输信息-但是信息通过-tls-协议进行了加密。",a:"tls-https-还是通过了-http-来传输信息-但是信息通过-tls-协议进行了加密。"},"27.13":{t:"对称加密",p:`
对称加密就是两边拥有相同的秘钥，两边都知道如何将密文加密解密。
这种加密方式固然很好，但是问题就在于如何让双方知道秘钥。因 ...`,l:"basic-quality/http/http-tls/index.html#对称加密",a:"对称加密"},"27.14":{t:"非对称加密",p:`
有公钥私钥之分，公钥所有人都可以知道，可以将数据用公钥加密，但是将数据解密必须使用私钥解密，私钥只有分发公钥的一方才知道。 ...`,l:"basic-quality/http/http-tls/index.html#非对称加密",a:"非对称加密"},"27.15":{t:"TLS 握手过程如下图",p:`!图片

客户端发送一个随机值以及需要的协议和加密方式。
服务端收到客户端的随机值，自己也产生一个随机值，并根据客户端需求的 ...`,l:"basic-quality/http/http-tls/index.html#tls-握手过程如下图",a:"tls-握手过程如下图"},"28.0":{t:"# http2.0 做了哪些改进 3.0",p:"",l:"basic-quality/http/http2-http3/index.html",a:"http2-0-做了哪些改进-3-0"},"28.1":{t:"http2.0 特性如下",p:`
二进制分帧传输
多路复用
头部压缩
服务器推送
Http3.0 相对于 Http2.0 是一种脱胎换骨的改变！
http  ...`,l:"basic-quality/http/http2-http3/index.html#http2-0-特性如下",a:"http2-0-特性如下"},"28.2":{t:"http3.0 特性如下",p:`
连接迁移
无队头阻塞
自定义的拥塞控制
前向安全和前向纠错

`,l:"basic-quality/http/http2-http3/index.html#http3-0-特性如下",a:"http3-0-特性如下"},"29.0":{t:"# http 状态码都有哪些",p:"",l:"basic-quality/http/status-code/index.html",a:"http-状态码都有哪些"},"29.1":{t:"状态码第一位数字决定了不同的响应状态，如下",p:`
1 表示消息
2 表示成功
3 表示重定向
4 表示请求错误
5 表示服务器错误

`,l:"basic-quality/http/status-code/index.html#状态码第一位数字决定了不同的响应状态-如下",a:"状态码第一位数字决定了不同的响应状态-如下"},"29.2":{t:"1xx",p:`代表请求已被接受，需要继续处理，这类响应是临时响应，只包含状态行和某些可选的响应信息，并一空行结束
常见的有：

100 （ ...`,l:"basic-quality/http/status-code/index.html#_1xx",a:"_1xx"},"29.3":{t:"2xx",p:`代表请求已成功被服务器接收，处理，并接受

200 （成功） 请求已成功，请求所希望的响应头或数据体将随此响应返回
201  ...`,l:"basic-quality/http/status-code/index.html#_2xx",a:"_2xx"},"29.4":{t:"3xx",p:`表示要完成请求，需要进一步操作，通常这些状态代码用来重定向

300 （多种选择）针对请求，服务器可执行多种操作。
301  ...`,l:"basic-quality/http/status-code/index.html#_3xx",a:"_3xx"},"29.5":{t:"4xx",p:`代表了客户端看起来可能发生了错误，妨碍了服务器的处理

400 （错误请求）服务器不理解请求的语法
401 （未授权）请求要 ...`,l:"basic-quality/http/status-code/index.html#_4xx",a:"_4xx"},"29.6":{t:"5xx",p:`表示服务器无法完成明显有效的请求。这类状态代码代表了服务器在处理请求的过程中有错误或异常状态发生

500 （服务器内部错误 ...`,l:"basic-quality/http/status-code/index.html#_5xx",a:"_5xx"},"30.0":{t:"# TCP/IP / 如何保证数据包传输的有序可靠？",p:"",l:"basic-quality/orderly-reliable-transmission/index.html",a:"tcp-ip-如何保证数据包传输的有序可靠"},"30.1":{t:"对字节流分段并进行编号然后通过 ACK 回复和超时重发这两个机制来保证",p:`
（1）为了保证数据包的可靠传递，发送方必须把已发送的数据包保留在缓冲区；
（2）并为每个已发送的数据包启动一个超时定时器； ...`,l:"basic-quality/orderly-reliable-transmission/index.html#对字节流分段并进行编号然后通过-ack-回复和超时重发这两个机制来保证",a:"对字节流分段并进行编号然后通过-ack-回复和超时重发这两个机制来保证"},"31.0":{t:"# 复盘思维",p:"",l:"basic-quality/soft-power/analyse/index.html",a:"复盘思维"},"31.1":{t:"什么是复盘？",p:`复盘，首先是一个围棋概念。在围棋中，复盘也称 “复局”。
指对局完毕后，棋手复演这盘棋的记录，以检查对局中双方招法的优劣与得 ...`,l:"basic-quality/soft-power/analyse/index.html#什么是复盘",a:"什么是复盘"},"31.2":{t:"为什么要复盘？",p:`曾子说：“吾日三省吾身：为人谋而不忠乎？与朋友交而不信乎？传不习乎？”
从曾子的角度来看，他认为每天复盘的原因，是为了做更好 ...`,l:"basic-quality/soft-power/analyse/index.html#为什么要复盘",a:"为什么要复盘"},"31.3":{t:"第一，复盘可以避免未来的失败",p:`在脑海中失败的越多，才能减少在现实中的失败。
如前文中描述的故障复盘，其实就是从线上故障中寻找原因和解法，进而避免未来再次出 ...`,l:"basic-quality/soft-power/analyse/index.html#第一-复盘可以避免未来的失败",a:"第一-复盘可以避免未来的失败"},"31.4":{t:"第二，复盘是成功的催化剂",p:"避免了失败，不代表我们一定会成功。如果想要成功，我们更要时时复盘那些成功案例。从中找出能够让我们走向成功的主要原因，并且想方 ...",l:"basic-quality/soft-power/analyse/index.html#第二-复盘是成功的催化剂",a:"第二-复盘是成功的催化剂"},"31.5":{t:"第三，复盘产生新知，新知可以传承",p:`复盘要求我们从全局视角去重新审视已经发生的事件。
在切换视角之后，即便是同一件事情也可以从中看到不同的内容，所以说复盘是一个 ...`,l:"basic-quality/soft-power/analyse/index.html#第三-复盘产生新知-新知可以传承",a:"第三-复盘产生新知-新知可以传承"},"31.6":{t:"如何复盘？",p:"",l:"basic-quality/soft-power/analyse/index.html#如何复盘",a:"如何复盘"},"31.7":{t:"首先，从复盘材料的来源看，复盘有两种方式",p:`

第一种，复盘自己的经历。


第二种，复盘别人的经历。


第一种方式-复盘自己的经历。概括下来，就是“我当时为何要这样 ...`,l:"basic-quality/soft-power/analyse/index.html#首先-从复盘材料的来源看-复盘有两种方式",a:"首先-从复盘材料的来源看-复盘有两种方式"},"31.8":{t:"其次，关于复盘的内容，可以是成功的经历，也可以是失败的经历",p:`
复盘的目的无非有二：学习成功者如何成功，学习失败者如何失败。

比如，前文故事中的故障复盘，其实就是在复盘失败的经历，避免 ...`,l:"basic-quality/soft-power/analyse/index.html#其次-关于复盘的内容-可以是成功的经历-也可以是失败的经历",a:"其次-关于复盘的内容-可以是成功的经历-也可以是失败的经历"},"31.9":{t:"再次，从复盘的过程来看，信息的全面性、客观性非常重要",p:`为了能够对整个事件有全面的把握，我们要把事件的始末梳理清楚，我们要尽可能地还原出每个人在事件中的所思所想和行动。
当然，聪明 ...`,l:"basic-quality/soft-power/analyse/index.html#再次-从复盘的过程来看-信息的全面性、客观性非常重要",a:"再次-从复盘的过程来看-信息的全面性、客观性非常重要"},"31.10":{t:"此外，复盘人数可以是一个人也可以是多人",p:`一个人复盘不难理解，毕竟有些事情只能一个人在心里慢慢复盘。
但是多人复盘却能够避免盲区，集思广益。
当然，无论一人复盘还是多 ...`,l:"basic-quality/soft-power/analyse/index.html#此外-复盘人数可以是一个人也可以是多人",a:"此外-复盘人数可以是一个人也可以是多人"},"31.11":{t:"最后，复盘一定要有指导未来的结果",p:`复盘不是空想和空谈，不能因为盘过了就抛之脑后，浪费了大量的时间，还不如不盘。
复盘之后，一定要有可以执行的动作，一定要有改进 ...`,l:"basic-quality/soft-power/analyse/index.html#最后-复盘一定要有指导未来的结果",a:"最后-复盘一定要有指导未来的结果"},"31.12":{t:"何时复盘？",p:`对于重大事件，比如故事中故障复盘，最好的复盘时间是故障发生后的一周之内，此时人们对事件的记忆还比较清晰，复盘效果最好。
对于 ...`,l:"basic-quality/soft-power/analyse/index.html#何时复盘",a:"何时复盘"},"31.13":{t:"复盘的关键点",p:`无论复盘的具体形式是怎样的，都必须遵循如下四个关键点：
`,l:"basic-quality/soft-power/analyse/index.html#复盘的关键点",a:"复盘的关键点"},"31.14":{t:"第一，复盘最怕肤浅",p:`既然是复盘，那就要想方设法弄清楚所复盘事件的前后因果，找到驱动整个事件的“底层逻辑”，要有一定的思考深度。
如果复盘只是简单 ...`,l:"basic-quality/soft-power/analyse/index.html#第一-复盘最怕肤浅",a:"第一-复盘最怕肤浅"},"31.15":{t:"第二，复盘不是追责",p:`复盘盘的是事情的始末源委，盘事情的目的是为了未来把事情做好，而不是为了给哪个人定责。
如果抱着追责的心态去复盘，那复盘的过程 ...`,l:"basic-quality/soft-power/analyse/index.html#第二-复盘不是追责",a:"第二-复盘不是追责"},"31.16":{t:"第三，复盘之后一定要有行动",p:`既然复盘是面向未来的，那么复盘之后，除了有最痛的领悟之外，一定要有行动。
若没有行动，只是在脑子里想想、嘴上说说，那怕你想出 ...`,l:"basic-quality/soft-power/analyse/index.html#第三-复盘之后一定要有行动",a:"第三-复盘之后一定要有行动"},"31.17":{t:"第四，失败要复盘，成功更要复盘",p:`我们在工作当中，更多的是复盘故障和失败，从来没有复盘过成功。
事实上，无论是成功还是失败，都只是一个事件。
如果是事件，那么 ...`,l:"basic-quality/soft-power/analyse/index.html#第四-失败要复盘-成功更要复盘",a:"第四-失败要复盘-成功更要复盘"},"31.18":{t:"其他行业的复盘工具",p:`复盘并不是互联网公司首创的，每个行业都有它的复盘方法论，这里仅列举三个例子：
第一，在我国的航天领域有所谓的“归零”，这其实 ...`,l:"basic-quality/soft-power/analyse/index.html#其他行业的复盘工具",a:"其他行业的复盘工具"},"32.0":{t:"# 提问的艺术",p:`!图片
`,l:"basic-quality/soft-power/answer/index.html",a:"提问的艺术"},"32.1":{t:"正确的提问",p:`
先自己折腾，尝试一番。如果能搞定，那感情好的；如果搞不定，这时候对问题来龙去脉有点思路了。
百度、bing、Google（ ...`,l:"basic-quality/soft-power/answer/index.html#正确的提问",a:"正确的提问"},"32.2":{t:"反例",p:`
大佬：（要介绍妹子么？回不回？）“在的，你说。”
萌新：“关于 A 这个框架中的 §№☆●◎□◆○◎★▲△■※￡¤￠℃￥ξ ...`,l:"basic-quality/soft-power/answer/index.html#反例",a:"反例"},"32.3":{t:"提问常识",p:`
要知道，Free 的正确翻译是 自由，而非 免费。即便回答你的人由时间。
要知道，愿意回答问题的人，都是 可爱 的人。
要 ...`,l:"basic-quality/soft-power/answer/index.html#提问常识",a:"提问常识"},"33.0":{t:"# 什么是架构师",p:"",l:"basic-quality/soft-power/architect/index.html",a:"什么是架构师"},"33.1":{t:"什么是架构？",p:"在我看来软件架构就是将人员、技术等资源组织起来以解决业务问题，支撑业务 增长的一种活动。可能比较抽象，我想我们可以从架构师的 ...",l:"basic-quality/soft-power/architect/index.html#什么是架构",a:"什么是架构"},"33.2":{t:"前端架构师的核心工作是降低需求增长带来的技术实现的复杂性 简称 降本增效",p:`因为运营页面需求的增长, 我们打造运营页面搭建系统来降低技术实现的复杂性
因为我们要在不同端实现相同的需求的增长, 我们开发 ...`,l:"basic-quality/soft-power/architect/index.html#前端架构师的核心工作是降低需求增长带来的技术实现的复杂性-简称-降本增效",a:"前端架构师的核心工作是降低需求增长带来的技术实现的复杂性-简称-降本增效"},"33.3":{t:"能够将业务转换成技术",p:"必须具备超强的落地能力，能够将用户的业务需求落地到技术方案，帮助研发团队开发出用户愿意使用的产品和功能。通过对业务的理解，梳 ...",l:"basic-quality/soft-power/architect/index.html#能够将业务转换成技术",a:"能够将业务转换成技术"},"33.4":{t:"能合理利用技术支撑业务",p:"",l:"basic-quality/soft-power/architect/index.html#能合理利用技术支撑业务",a:"能合理利用技术支撑业务"},"33.5":{t:"具备前瞻思维和战略思维",p:`所谓架构，我理解是综合考虑目标、业界和团队，作为合理的方案选择，既能支撑业务的发展，又能令团队满意。
`,l:"basic-quality/soft-power/architect/index.html#具备前瞻思维和战略思维",a:"具备前瞻思维和战略思维"},"34.0":{t:"# 回答的艺术",p:"",l:"basic-quality/soft-power/asking-questions/index.html",a:"回答的艺术"},"34.1":{t:"前端的应该做到",p:`
不能产品说什么就闷着头做什么 应该站到前端的角度 根据自身对业务的理解 提出专业的意见 而不是闷着头只知道写代码
要对 做 ...`,l:"basic-quality/soft-power/asking-questions/index.html#前端的应该做到",a:"前端的应该做到"},"34.2":{t:"怎么看待前端这个行业",p:`
对于前端工程师这个职位，我觉得这是和用户接触最近的一个职位，
一个产品的好坏并不是企业说的算，用户喜欢的产品才是好的产品， ...`,l:"basic-quality/soft-power/asking-questions/index.html#怎么看待前端这个行业",a:"怎么看待前端这个行业"},"35.0":{t:"# 概念化",p:`架构师通常是商业世界和技术之间的主要联系之一。
概念化，指的是通过构思，将用户的想法概念化为可以实现的事物。
`,l:"basic-quality/soft-power/conceptualization/index.html",a:"概念化"},"35.1":{t:"概念的形成",p:`当我们进入一个新的领域，它们有着与众不同的用法、发音和语境，想与这个领域建立联系，首先要充分理解这个领域的生存方式。
通产构 ...`,l:"basic-quality/soft-power/conceptualization/index.html#概念的形成",a:"概念的形成"},"35.2":{t:"正在讨论的是什么问题",p:`
所要解决的是一组什么样的问题
解决这些问题有什么常用的方案
客户希望的是什么样的结果？系统增加什么价值？
解决这些问题有什 ...`,l:"basic-quality/soft-power/conceptualization/index.html#正在讨论的是什么问题",a:"正在讨论的是什么问题"},"35.3":{t:"当对这个问题有了大致的了解之后，应该思考",p:`
真正的边界在哪里
真正的需求是什么
真正的客户是谁
存在怎么样的约束
解决方案的主要组成部分

`,l:"basic-quality/soft-power/conceptualization/index.html#当对这个问题有了大致的了解之后-应该思考",a:"当对这个问题有了大致的了解之后-应该思考"},"35.4":{t:"构思过程",p:`1.开发环境图和概率图能够为讨论的问题提供备选方案
2.在构思过程中要倾听客户的诉求
`,l:"basic-quality/soft-power/conceptualization/index.html#构思过程",a:"构思过程"},"35.5":{t:"概念具体化",p:`“二八法则”同样适用于软件开发，应该尽早制作出最小可行性产品——人们每天使用的20%的功能（关键、重要的功能）。
`,l:"basic-quality/soft-power/conceptualization/index.html#概念具体化",a:"概念具体化"},"36.0":{t:"# 估算",p:`!图片
`,l:"basic-quality/soft-power/estimate/index.html",a:"估算"},"36.1":{t:"估算要注意以下的因素",p:`
项目的成本
项目何时交付
与项目关联的风险
项目的潜在的相互依赖性
项目的未知领域
可能有什么备选方法
关于项目做了何种假 ...`,l:"basic-quality/soft-power/estimate/index.html#估算要注意以下的因素",a:"估算要注意以下的因素"},"36.2":{t:"架构方法的关键要素包括",p:`
项目相关背景信息的描述
方法与业务需求相符的说明
交付关键框图，以图形的方式说明将要构建的项目
风险、假设、问题、突出问题 ...`,l:"basic-quality/soft-power/estimate/index.html#架构方法的关键要素包括",a:"架构方法的关键要素包括"},"36.3":{t:"估算的大致流程",p:`!图片
收入登记：完成项目获得的收入。（收入）
项目估算：完成项目需要投入的成本。（成本）
项目筹资：当估算项目能获得收益时 ...`,l:"basic-quality/soft-power/estimate/index.html#估算的大致流程",a:"估算的大致流程"},"36.4":{t:"项目的类型",p:`维护、迁移、新/改进、集成、采购 （遇到迁移、新建要谨慎）
`,l:"basic-quality/soft-power/estimate/index.html#项目的类型",a:"项目的类型"},"36.5":{t:"估算策略",p:`
为未知因素和挑战指定计划
务实：不要为了获得项目而屈服
严密控制关键的因素
开发估算反馈循环
最大限度地减少组织耦合和内聚 ...`,l:"basic-quality/soft-power/estimate/index.html#估算策略",a:"估算策略"},"37.0":{t:"# 飞轮思维",p:`懈怠似乎才是常态，这是为什么呢？
因为，我们日常中的诱惑实在是太多了，而违背自己的常规生活路径的去坚持一件平常不会做的事情的 ...`,l:"basic-quality/soft-power/flywheel/index.html",a:"飞轮思维"},"37.1":{t:"亚马逊的商业飞轮",p:`起初，飞轮理论是由管理学大师吉姆·柯林斯提出的，他甚至专门写了一本名为《飞轮效应》的小册子
!5-飞轮效应.jpeg
在这本 ...`,l:"basic-quality/soft-power/flywheel/index.html#亚马逊的商业飞轮",a:"亚马逊的商业飞轮"},"37.2":{t:"飞轮思维",p:`说了这么多，到底什么是飞轮思维？
飞轮思维的核心思想是打造一个“飞轮系统”，然后通过持续推动飞轮的转动来积累足够的能量，直到 ...`,l:"basic-quality/soft-power/flywheel/index.html#飞轮思维",a:"飞轮思维"},"37.3":{t:"个人成长飞轮",p:"[从小需求做起——&gt; 高质量交付工作，自身能力提升——&gt; 获得同事信任——&gt;委以更大的需求——&gt; 获 ...",l:"basic-quality/soft-power/flywheel/index.html#个人成长飞轮",a:"个人成长飞轮"},"37.4":{t:"组合使用",p:`因为飞轮需要反复的升级和优化，所以飞轮思维可以和迭代思维组合使用。
此外，在推动飞轮时，为了减少不确定性带来的风险，我们可以 ...`,l:"basic-quality/soft-power/flywheel/index.html#组合使用",a:"组合使用"},"38.0":{t:"# 发现",p:`作为架构师，应该抓住一切机会与客户会面，双方都需要交换极其关键的信息。
`,l:"basic-quality/soft-power/found/index.html",a:"发现"},"38.1":{t:"了解客户",p:`
与销售、市场及新产品开发部门建立合作关系
与客户会谈

`,l:"basic-quality/soft-power/found/index.html#了解客户",a:"了解客户"},"38.2":{t:"与客户访问的准备",p:`
是否需要保密协议
可以以私人的方式访问他们吗
我的竞争对手有什么相关的产品

`,l:"basic-quality/soft-power/found/index.html#与客户访问的准备",a:"与客户访问的准备"},"38.3":{t:"与客户会面",p:`
客户的角色
客户所在组织的组织性质
是否理解客户的工作流程
客户这种工作方式的优劣势
是否需要与其他系统有交互或者集成
需 ...`,l:"basic-quality/soft-power/found/index.html#与客户会面",a:"与客户会面"},"38.4":{t:"了解市场",p:`a.我们进入一个市场要掌握以下因素：

我们的产品影响那些市场
整个市场的机遇是什么
解决的方案是地区性的还是全国性
这个解 ...`,l:"basic-quality/soft-power/found/index.html#了解市场",a:"了解市场"},"38.5":{t:"了解客户的客户",p:`
客户的客户是谁？他们的关注点，他们对什么比较在乎
你的产品如何帮助客户服务他们的客户
客户的销售模式
你的产品能否帮助客户 ...`,l:"basic-quality/soft-power/found/index.html#了解客户的客户",a:"了解客户的客户"},"38.6":{t:"了解你的业务",p:`
当完成一个项目时，要记下战略思路，方便下一次类似的项目可以重用
类似于“电梯演讲”每一次都是上一次的升华
为用户带尽可能多 ...`,l:"basic-quality/soft-power/found/index.html#了解你的业务",a:"了解你的业务"},"39.0":{t:"# 灰度思维",p:"",l:"basic-quality/soft-power/gray/index.html",a:"灰度思维"},"39.1":{t:"什么是灰度思维",p:`
这个世界之所以能够正常运行，很大的一部分原因就在于我们的物理定律和社会规范都是确定性的。

在确定性的世界里，太阳从东方升 ...`,l:"basic-quality/soft-power/gray/index.html#什么是灰度思维",a:"什么是灰度思维"},"39.2":{t:"首先，我们要判断问题的性质",p:"如果这个问题对于我们来说是已经解决的问题，那你多半已经轻车熟路了。除非有新的因素引入（比如，后来切库我们换了一个新的dba同 ...",l:"basic-quality/soft-power/gray/index.html#首先-我们要判断问题的性质",a:"首先-我们要判断问题的性质"},"39.3":{t:"其次，确认当前问题是否可以拆解为规模更小的等价问题",p:"只有把问题拆解成更小的问题，我们才能有效降低验证成本。同时，只有确保这些小问题是原始问题的等价问题，我们才可能从对小问题的验 ...",l:"basic-quality/soft-power/gray/index.html#其次-确认当前问题是否可以拆解为规模更小的等价问题",a:"其次-确认当前问题是否可以拆解为规模更小的等价问题"},"39.4":{t:"最后，在前面的功课都做完之后，灰度思维要求我们付诸实践",p:`在这一步，我们要设计好试验步骤并对试验结果做好假设。
比如，在dba切换的例子里，试验步骤就是我们当时拟定好的操作计划。
当 ...`,l:"basic-quality/soft-power/gray/index.html#最后-在前面的功课都做完之后-灰度思维要求我们付诸实践",a:"最后-在前面的功课都做完之后-灰度思维要求我们付诸实践"},"39.5":{t:"工作上的例子",p:"",l:"basic-quality/soft-power/gray/index.html#工作上的例子",a:"工作上的例子"},"39.6":{t:"新功能模块的灰度切流",p:`灰度切流是每个研发同学在职业生涯中都会遇到的情况，这样的例子不胜枚举，我甚至可以不重样地说上一整天。
比如，我们要发布一个支 ...`,l:"basic-quality/soft-power/gray/index.html#新功能模块的灰度切流",a:"新功能模块的灰度切流"},"39.7":{t:"蓝绿发布",p:`在代码发布的时候，并不是所有的改动都可以像前文描述的功能模块一样，有独立的开关控制流量进行灰度。
但是，这并不能阻挡工程师们 ...`,l:"basic-quality/soft-power/gray/index.html#蓝绿发布",a:"蓝绿发布"},"39.8":{t:"精益创业",p:`如果你了解精益创业，那么你一定也知道精益创业的思想背后其实也有灰度思维的影子。
精益创业的核心思想是用最小的成本验证你的点子 ...`,l:"basic-quality/soft-power/gray/index.html#精益创业",a:"精益创业"},"39.9":{t:"生活中的例子",p:"",l:"basic-quality/soft-power/gray/index.html#生活中的例子",a:"生活中的例子"},"39.10":{t:"首笔转账",p:`给别人转账时，为了避免账号输错，一般可以用一个很小的金额做一次测试转账，确定账号正确之后，再发起全额转账。
`,l:"basic-quality/soft-power/gray/index.html#首笔转账",a:"首笔转账"},"39.11":{t:"培养自己的爱好",p:`学习一门兴趣，没必要一开始就重金投入购入大量的装备，而是从入门所需的最基本原料开始。
比如，如果要学习摄影，经过前期的调研后 ...`,l:"basic-quality/soft-power/gray/index.html#培养自己的爱好",a:"培养自己的爱好"},"39.12":{t:"培养孩子的爱好",p:"家长也可以用灰度思维去帮助小孩培养兴趣。此时可以把前期报的各种兴趣班看作是看作一种灰度，家长可以想办法压低灰度的成本（比如通 ...",l:"basic-quality/soft-power/gray/index.html#培养孩子的爱好",a:"培养孩子的爱好"},"39.13":{t:"发展人际关系",p:`人际交往的过程本来就是一个相互试探的过程，试探就是灰度。
比如，臭名昭著的服从性测试就以灰度的方式展开。实际操作时，实施测试 ...`,l:"basic-quality/soft-power/gray/index.html#发展人际关系",a:"发展人际关系"},"39.14":{t:"生活处处皆可灰度",p:"最后，重要的事情值得反复提起——只要是从已知世界走向未知世界的问题，都可以使用灰度思维来处理——在做一件事情时，不妨让我们问 ...",l:"basic-quality/soft-power/gray/index.html#生活处处皆可灰度",a:"生活处处皆可灰度"},"40.0":{t:"# 前端招聘面试流程",p:`主要考察面试者编程能力（提问技术性问题）；还需要考察文化适应性和系统设计；
面试时间在30~40分钟；
`,l:"basic-quality/soft-power/interview-process/index.html",a:"前端招聘面试流程"},"40.1":{t:"1分钟：面试官大致描述下本次面试",p:"参考话术：“你好，我是今天的面试官，今天我们面试时长大概40分钟，分为以下4块内容：1、自我介绍；2、项目经历考核；3、技能 ...",l:"basic-quality/soft-power/interview-process/index.html#_1分钟-面试官大致描述下本次面试",a:"_1分钟-面试官大致描述下本次面试"},"40.2":{t:"3分钟：应聘者3分钟进行自我介绍",p:"",l:"basic-quality/soft-power/interview-process/index.html#_3分钟-应聘者3分钟进行自我介绍",a:"_3分钟-应聘者3分钟进行自我介绍"},"40.3":{t:"3~5分钟：让应聘者回答“之前都做过什么项目”、“对什么东西感兴趣”、“来第一秒有什么想法，有什么顾虑”；最近的公司职责和涉及的业务、主要技术栈、我擅长的技术、项目介绍（STAR：项目背景、任务、你的工作内容、项目亮点、结果你实现了什么学到了什么）、最近在做什么",p:`参考话术：“接下来我会问你一些业务相关问题，请在不违反当前公司原则的情况下回答，如果我的问题你不方便回答可以直接告诉我”
`,l:"basic-quality/soft-power/interview-process/index.html#_3-5分钟-让应聘者回答-之前都做过什么项目-、-对什么东西感兴趣-、-来第一秒有什么想法-有什么顾虑-最近的公司职责和涉及的业务、主要技术栈、我擅长的技术、项目介绍-star-项目背景、任务、你的工作内容、项目亮点、结果你实现了什么学到了什么-、最近在做什么",a:"_3-5分钟-让应聘者回答-之前都做过什么项目-、-对什么东西感兴趣-、-来第一秒有什么想法-有什么顾虑-最近的公司职责和涉及的业务、主要技术栈、我擅长的技术、项目介绍-star-项目背景、任务、你的工作内容、项目亮点、结果你实现了什么学到了什么-、最近在做什么"},"40.4":{t:"10~15分钟：让应聘者谈谈之前最让他感觉骄傲的一个项目",p:"面试官可以深入追问跟这个项目相关的问题。比如“这个项目最大的挑战是什么”、“几个人完成的，你在里面的角色和贡献”、“有没有出 ...",l:"basic-quality/soft-power/interview-process/index.html#_10-15分钟-让应聘者谈谈之前最让他感觉骄傲的一个项目",a:"_10-15分钟-让应聘者谈谈之前最让他感觉骄傲的一个项目"},"40.5":{t:"20分钟：具体的技术问题；（面试题）",p:`1、要有一道手写编程题：在无智能语法提示的编辑器上写（如：sublime）；
2、系统设计方面的问题：主要是让应聘者针对某个 ...`,l:"basic-quality/soft-power/interview-process/index.html#_20分钟-具体的技术问题-面试题",a:"_20分钟-具体的技术问题-面试题"},"40.6":{t:"5分钟：留给应聘者来提问",p:`我们希望应聘者较为关心的是公司文化、产品或技术，而非财务上的。
针对工作流程的参考话术：“我们采用日-周-月的工作流程，日为 ...`,l:"basic-quality/soft-power/interview-process/index.html#_5分钟-留给应聘者来提问",a:"_5分钟-留给应聘者来提问"},"41.0":{t:"# 迭代思维",p:`1.0版
师兄说，一开始的时候，我们整个支付系统只是电商系统中的小模块。就是这个代码量加起来不到一万行左右的支付模块，支持了 ...`,l:"basic-quality/soft-power/iteration/index.html",a:"迭代思维"},"41.1":{t:"迭代思维",p:`一点澄清
首先，这里我们必须纠正这个浮躁时代存在的“急于求成、一夜暴富”的错误观念。
“罗马并不是在一天建成的”。
和故事中 ...`,l:"basic-quality/soft-power/iteration/index.html#迭代思维",a:"迭代思维"},"41.2":{t:"PDCA循环",p:`什么是PDCA循环
PDCA循环首先由美国质量管理专家沃特·阿曼德·休哈特提出，而后由丰田的戴明推广，因此又称戴明环。
虽然 ...`,l:"basic-quality/soft-power/iteration/index.html#pdca循环",a:"pdca循环"},"41.3":{t:"例1",p:`在公司里，我们经常在生产环境做线上变更，比如切库、FO演练等等。在变更之前，我会做一个简单的PDCA文档，内容大概如下：

 ...`,l:"basic-quality/soft-power/iteration/index.html#例1",a:"例1"},"41.4":{t:"例2",p:`在写“工程师思维”的系列文章时，我也做了一个PDCA，大体如下：

P：写“工程师思维”系列文章，以故事的方式分享我在公司学 ...`,l:"basic-quality/soft-power/iteration/index.html#例2",a:"例2"},"41.5":{t:"例3",p:`那么，结合本文开头的故事，如果我们用PDCA循环的视角来看，建设一套庞大的支付系统需要怎么做呢？这里简单分析如下：

P：建 ...`,l:"basic-quality/soft-power/iteration/index.html#例3",a:"例3"},"41.6":{t:"1）P阶段是重中之重",p:`从PDCA循环可以看到，P阶段制定计划的合理与否，方向正确与否，直接关系到后面DCA几个阶段的正确。
我们常说“做正确的事情 ...`,l:"basic-quality/soft-power/iteration/index.html#_1-p阶段是重中之重",a:"_1-p阶段是重中之重"},"41.7":{t:"2）管理者和执行者",p:"如果你是管理者，那么在PDCA循环中，应该重点抓P阶段和C阶段。在计划阶段做好计划，让下属知道自己要干什么；在检查阶段做好检 ...",l:"basic-quality/soft-power/iteration/index.html#_2-管理者和执行者",a:"_2-管理者和执行者"},"41.8":{t:"OODA循环",p:`作为传统的迭代工具，PDCA适用于环境稳定、按部就班的事务处理场景。
然而，进入互联网时代之后，我们的工作和生活在快节奏中变 ...`,l:"basic-quality/soft-power/iteration/index.html#ooda循环",a:"ooda循环"},"41.9":{t:"应用中的组合拳",p:`本文是工程师思维的第四篇文章。截止到现在，我们已经介绍了四种工程师思维——灰度思维、复盘思维、根因思维、迭代思维。
值得一提 ...`,l:"basic-quality/soft-power/iteration/index.html#应用中的组合拳",a:"应用中的组合拳"},"41.10":{t:"本章小结",p:`胖子不是一口气吃出来的，罗马也不是一天建成的。工程师们解决问题，也不存在一蹴而就的说法。
过去所有的经验告诉我们，问题都是一 ...`,l:"basic-quality/soft-power/iteration/index.html#本章小结",a:"本章小结"},"42.0":{t:"# 管理",p:`坏消息：架构师通常被视为“管理员”的一员。
架构师的职责：（架构要平衡 业务需求和技术需求 某种意义上是开发人员与与销售人员 ...`,l:"basic-quality/soft-power/management/index.html",a:"管理"},"42.1":{t:"架构提供技术管理",p:`
管理和传达技术方向和架构方法
管理和沟通 系统的边界
帮助识别和管理项目的风险及问题
确保合适的项目治理和监管，包括标准、 ...`,l:"basic-quality/soft-power/management/index.html#架构提供技术管理",a:"架构提供技术管理"},"42.2":{t:"培养技术人才",p:`
指定架构师计划：拓展业务知识、介绍新兴技术和核心技术、架构小组讨论
建立技术论坛
鼓励技术团队成员参与当地的会议和用户组
 ...`,l:"basic-quality/soft-power/management/index.html#培养技术人才",a:"培养技术人才"},"43.0":{t:"# 结构化思维-MECE分析方法",p:"",l:"basic-quality/soft-power/mece/index.html",a:"结构化思维-mece分析方法"},"43.1":{t:"基本介绍",p:"MECE，是Mutually Exclusive Collectively Exhaustive的缩写，中文意思是“相互独立 ...",l:"basic-quality/soft-power/mece/index.html#基本介绍",a:"基本介绍"},"43.2":{t:"原则",p:`MECE即把一个工作项目分解为若干个更细的工作任务的方法。它主要有两条原则：

第一条是完整性，说的是分解工作的过程中不要漏 ...`,l:"basic-quality/soft-power/mece/index.html#原则",a:"原则"},"43.3":{t:"如果将上面人进行分类",p:`
男性，女性 【性别维度】
老年人，中年人，青年人，少年，幼儿【年龄维度】
中国人，外国人【国籍维度】
在世，离世【在世维度 ...`,l:"basic-quality/soft-power/mece/index.html#如果将上面人进行分类",a:"如果将上面人进行分类"},"43.4":{t:"步骤",p:"",l:"basic-quality/soft-power/mece/index.html#步骤",a:"步骤"},"43.5":{t:"第1步：确定范围",p:"也就是要明确当下讨论的问题到底是什么，以及我们想要达到的目的是什么。这个范围决定了问题的边界。这也让”完全穷尽“成为一种可能 ...",l:"basic-quality/soft-power/mece/index.html#第1步-确定范围",a:"第1步-确定范围"},"43.6":{t:"第2步：寻找符合MECE的切入点",p:"切入点是指你准备按什么来分，或者说大家共同的属性是什么。比如，是按颜色分、按大小分、按时间序列分还是按重要性分？在找切入点的 ...",l:"basic-quality/soft-power/mece/index.html#第2步-寻找符合mece的切入点",a:"第2步-寻找符合mece的切入点"},"43.7":{t:"第3步：考虑是否可以用MECE继续细分",p:"比如对客户的分类如果按男和女来分，的确是满足MECE原则，但仅仅这么分对于我们的营销策略有什么帮助吗？不管走到哪一步，请时刻 ...",l:"basic-quality/soft-power/mece/index.html#第3步-考虑是否可以用mece继续细分",a:"第3步-考虑是否可以用mece继续细分"},"43.8":{t:"类比划分人的问题上",p:"",l:"basic-quality/soft-power/mece/index.html#类比划分人的问题上",a:"类比划分人的问题上"},"43.9":{t:"case 1",p:`
确定我们当前思考的问题范围是全球
我们的切入点可以是：上面所说的是1，2，4，5

`,l:"basic-quality/soft-power/mece/index.html#case-1",a:"case-1"},"43.10":{t:"case 2",p:`
确定我们当前思考的问题范围是中国
我们的切入点可以是：上面所说的是1，2，4，5，6，7

`,l:"basic-quality/soft-power/mece/index.html#case-2",a:"case-2"},"43.11":{t:"case 3",p:`
假设我们当前讨论的范围是公司内部
我们的切入点可以是：1，2，4，5，6，7。还可以基于公司的一些特性进行其他的切入点。类 ...`,l:"basic-quality/soft-power/mece/index.html#case-3",a:"case-3"},"43.12":{t:"初步结论",p:`确定范围 + 关注的切入点 =》穷举问题的所有无重复无遗漏的集合。
`,l:"basic-quality/soft-power/mece/index.html#初步结论",a:"初步结论"},"43.13":{t:"切入点如何来？",p:"上面对于人的问题，这里很多都是我们可以想到的切入点，因为我们从再说一个人的时候，会有很多描述性语言，或者切入点。那么这个切入 ...",l:"basic-quality/soft-power/mece/index.html#切入点如何来",a:"切入点如何来"},"43.14":{t:"切入点：技术水平 + 业务水平 + 沟通交流 + 工作态度 + 心态 个人定位。这里的切入点是什么呢？",p:`
技术水平【本职工作能力】
业务水平【更多的是从业务串联的角度，因为这是一个检测产出的基础】
沟通交流【沟通协作，信息同步， ...`,l:"basic-quality/soft-power/mece/index.html#切入点-技术水平-业务水平-沟通交流-工作态度-心态-个人定位。这里的切入点是什么呢",a:"切入点-技术水平-业务水平-沟通交流-工作态度-心态-个人定位。这里的切入点是什么呢"},"44.0":{t:"# 防错思维",p:`
最好的防守，就是进攻。
最好的防错方式，就是一次做对。

`,l:"basic-quality/soft-power/mistake-proofing/index.html",a:"防错思维"},"44.1":{t:"如果不防错，后果很严重",p:`在之前的章节中，我介绍了“根因思维”，这是一种问题出现后进行事后补救的工程思维。
然而，经验告诉我们，问题出现事后补救的代价 ...`,l:"basic-quality/soft-power/mistake-proofing/index.html#如果不防错-后果很严重",a:"如果不防错-后果很严重"},"44.2":{t:"一行代码让人疯狂两天",p:`事故（故事）开头，还得从当时我们维护的融资系统说起。
这个融资系统负责处理用户的融资请求。
它有一个重要的功能，就是查询融资 ...`,l:"basic-quality/soft-power/mistake-proofing/index.html#一行代码让人疯狂两天",a:"一行代码让人疯狂两天"},"44.3":{t:"什么是防错思维",p:`人非圣贤，孰能无过？
既然犯错如此容易，那么我们必然就得考虑如何防止犯错。
在工程上，对于一个产品或者一种生产流程来说，在设 ...`,l:"basic-quality/soft-power/mistake-proofing/index.html#什么是防错思维",a:"什么是防错思维"},"44.4":{t:"防呆不防傻,大力出奇迹",p:`防错设计还有一个称呼——防呆设计。
防呆设计的概念源于日本，是为了避免工人在生产线上犯错、减轻工人的认知负担而做的设计。
防 ...`,l:"basic-quality/soft-power/mistake-proofing/index.html#防呆不防傻-大力出奇迹",a:"防呆不防傻-大力出奇迹"},"44.5":{t:"生活处处有防错",p:`为了让大家对防错思维和防错设计有一个更直观的认识，我们将探讨更多“防错设计”的列子。
1）有缺角的SIM卡
下图是一张SIM ...`,l:"basic-quality/soft-power/mistake-proofing/index.html#生活处处有防错",a:"生活处处有防错"},"44.6":{t:"软件工程中的防错设计",p:`首先，确定防错的具体范围
软件工程师如何做防错设计？
这是一个很大的话题，为了让这个话题变成一个可执行的指导，首先我们应该明 ...`,l:"basic-quality/soft-power/mistake-proofing/index.html#软件工程中的防错设计",a:"软件工程中的防错设计"},"44.7":{t:"1）事前：通过提前设计，直接消除错误",p:`比如，在产品设计阶段，我们能够预判出可能的犯错问题，此时就可以通过设计来避免问题的出现。
当然，预判的前提是设计者具有丰富的 ...`,l:"basic-quality/soft-power/mistake-proofing/index.html#_1-事前-通过提前设计-直接消除错误",a:"_1-事前-通过提前设计-直接消除错误"},"44.8":{t:"2）事中：即使犯错也不会导致问题",p:`当然，事前拦截并不一定都能成功，所以我们希望即便在事前出了问题，在事中也不会危及系统的运行。
比如，在API服务中，我们会加 ...`,l:"basic-quality/soft-power/mistake-proofing/index.html#_2-事中-即使犯错也不会导致问题",a:"_2-事中-即使犯错也不会导致问题"},"44.9":{t:"3）事后：犯错能被快速发现和修复",p:"如果在事前和事中都没能有效防错，那么我们只能在事后进行防错布局了——因为在事后环节问题已经发生了，而我们又无法主动避免问题（ ...",l:"basic-quality/soft-power/mistake-proofing/index.html#_3-事后-犯错能被快速发现和修复",a:"_3-事后-犯错能被快速发现和修复"},"44.10":{t:"组合使用",p:"防错思维是一个非常底层的思维工具，只要涉及到设计、计划、沟通、执行等可能存在预期和实际不符的场景，防错思维就一定有用武之地。 ...",l:"basic-quality/soft-power/mistake-proofing/index.html#组合使用",a:"组合使用"},"45.0":{t:"# 合作关系",p:`项目能力——&gt;技术能力——&gt;想象力能力，前者都是后者的基础。
`,l:"basic-quality/soft-power/relations-cooperation/index.html",a:"合作关系"},"45.1":{t:"第一部分：项目能力",p:"",l:"basic-quality/soft-power/relations-cooperation/index.html#第一部分-项目能力",a:"第一部分-项目能力"},"45.2":{t:"第一章 ：合作关系",p:`合作关系是确立了相互信任的一种关系，这是即使面对对手也要一起追求某个目标的意愿。
作为架构师要与以下人建立合作关系
!图片
`,l:"basic-quality/soft-power/relations-cooperation/index.html#第一章-合作关系",a:"第一章-合作关系"},"45.3":{t:"合作关系的关键特征",p:`一致、信任、语境、协作和关系
`,l:"basic-quality/soft-power/relations-cooperation/index.html#合作关系的关键特征",a:"合作关系的关键特征"},"45.4":{t:"一致",p:`
确定要和那些人建立合作关系
找出在某些领域的思想领袖，多听取他们的意见，便于模型的搭建
确定可信的建议者
社区评审，运用社 ...`,l:"basic-quality/soft-power/relations-cooperation/index.html#一致",a:"一致"},"45.5":{t:"信任",p:`1.“报喜又报忧”是建立信任的一部分
2.对于信息得公开要谨慎，对用户的机密信息要保密
3.在 寻求指导或者批准时要披露以下 ...`,l:"basic-quality/soft-power/relations-cooperation/index.html#信任",a:"信任"},"45.6":{t:"语境",p:`1.在设计解决方案的时候，你往往不能当个孤胆英雄，要让“关键人物”参与方案的决策。方案既要满足当前的业务需求，也要
为公司下 ...`,l:"basic-quality/soft-power/relations-cooperation/index.html#语境",a:"语境"},"45.7":{t:"协作",p:`1.寻找导师：在寻找导师的时候要确定自己向从指导关系中学到什么
2.成为导师：计划自己想要实现的目标，要给被指导者停供真实的 ...`,l:"basic-quality/soft-power/relations-cooperation/index.html#协作",a:"协作"},"45.8":{t:"关系",p:`1.合作是通过关系确立和维护的。
2.躲避组织中的刻薄鬼
`,l:"basic-quality/soft-power/relations-cooperation/index.html#关系",a:"关系"},"46.0":{t:"# 根因思维",p:"",l:"basic-quality/soft-power/returning/index.html",a:"根因思维"},"46.1":{t:"初识root cause",p:`!工程师思维_10.jpg

根因，也就是一个事件的根本原因（root cause）。

判断一个工程师成熟与否的方法之一， ...`,l:"basic-quality/soft-power/returning/index.html#初识root-cause",a:"初识root-cause"},"46.2":{t:"什么是根因分析？",p:"一个问题发生了，在问题发生的那一刻，我们看到的都只是问题的外在表象，而引起问题发生的真正原因，往往被表象所掩盖，隐藏在一环套 ...",l:"basic-quality/soft-power/returning/index.html#什么是根因分析",a:"什么是根因分析"},"46.3":{t:"如何进行根因分析？",p:`实际上，应用根因思维最基本的方式，就是根因分析法。而典型的根因分析法当属丰田的5-why分析法了。
丰田5-why分析法
5 ...`,l:"basic-quality/soft-power/returning/index.html#如何进行根因分析",a:"如何进行根因分析"},"46.4":{t:"两类问题",p:`下面，我们将从日常工作和生活中遇到的两类不同类型的问题展开，继续对根因分析法的探讨。
在进入讨论之前，我想解释一下问题分类的 ...`,l:"basic-quality/soft-power/returning/index.html#两类问题",a:"两类问题"},"46.5":{t:"由果到因再由因到果",p:`通过5-why分析法，我们从结果推到了根因，我们甚至采取了行动，一劳永逸地解决了这个问题，真是皆大欢喜。
但请务必注意，这还 ...`,l:"basic-quality/soft-power/returning/index.html#由果到因再由因到果",a:"由果到因再由因到果"},"46.6":{t:"时间的洗礼",p:`
根因思维说起来似乎简单，但是实际操作起来，其实非常吃经验。

以笔者曾从事过的支付业务为例，在这个领域里，你不摸爬滚打个三 ...`,l:"basic-quality/soft-power/returning/index.html#时间的洗礼",a:"时间的洗礼"},"46.7":{t:"本章小结",p:`根因思维和根因分析法，是我们在日常中处理问题时必然会使用的思维工具。
根因思维认为引起问题的原因是由一个前后咬合的因果链构成 ...`,l:"basic-quality/soft-power/returning/index.html#本章小结",a:"本章小结"},"47.0":{t:"# 计算机网络分层结构",p:"",l:"basic-quality/structure-computer-networks/index.html",a:"计算机网络分层结构"},"47.1":{t:"一、几种分层结构",p:`!图片
`,l:"basic-quality/structure-computer-networks/index.html#一、几种分层结构",a:"一、几种分层结构"},"47.2":{t:"二、OSI参考模型",p:`

目的：支持异构网络系统的互联互通（制定一个标准）


7层结构
!图片


巧记：物链网输会示用（一个叫淑慧的人试用物联 ...`,l:"basic-quality/structure-computer-networks/index.html#二、osi参考模型",a:"二、osi参考模型"},"47.3":{t:"1. 应用层",p:`
用户与网络的界面
所有能和用户交互产生网络流量的程序
典型应用层服务：文件传输（FTP）、电子邮件（SMTP）、万维网（H ...`,l:"basic-quality/structure-computer-networks/index.html#_1-应用层",a:"_1-应用层"},"47.4":{t:"2. 表示层",p:`
处理两种通信系统中交换信息的表示方式
比如说，数据格式变换（编码格式之间的转换，使得不同主机之间即使在不同的编码格式上，也 ...`,l:"basic-quality/structure-computer-networks/index.html#_2-表示层",a:"_2-表示层"},"47.5":{t:"3. 会话层",p:`
向表示层实体/用户进程提供建立连接并在连接上有序地传输数据
建立连接（建立一个session）
建立同步（SYN）
功能一 ...`,l:"basic-quality/structure-computer-networks/index.html#_3-会话层",a:"_3-会话层"},"47.6":{t:"4. 传输层",p:`
负责主机中两个进程的通信，即端对端的通信。传输单位是报文段或用户数据报。（因为是端口号之间的通信，因此是端对端）
下面的几 ...`,l:"basic-quality/structure-computer-networks/index.html#_4-传输层",a:"_4-传输层"},"47.7":{t:"5. 网络层",p:`
主要任务：把分组从源端传送到目的端，为分组交换网上的不同主机提供通信服务。（数据过大时进行切割）（实现网际互联）
传输单位 ...`,l:"basic-quality/structure-computer-networks/index.html#_5-网络层",a:"_5-网络层"},"47.8":{t:"6. 数据链路层",p:`

把网络层传下来的数据包组装成帧。


传输单位是帧。


功能一：成帧。（定义帧的开始和结束）


功能二：差错控制。帧 ...`,l:"basic-quality/structure-computer-networks/index.html#_6-数据链路层",a:"_6-数据链路层"},"47.9":{t:"7. 物理层",p:`
将比特流转换为电信号进行传输。
物理传输单位是比特。
透明传输：不管给什么比特流，都转发。
功能一：定义接口特性。（物理上 ...`,l:"basic-quality/structure-computer-networks/index.html#_7-物理层",a:"_7-物理层"},"47.10":{t:"三、TCP/IP模型",p:`!图片
!图片
`,l:"basic-quality/structure-computer-networks/index.html#三、tcp-ip模型",a:"三、tcp-ip模型"},"47.11":{t:"四、5层参考模型",p:`!图片
!图片
`,l:"basic-quality/structure-computer-networks/index.html#四、5层参考模型",a:"四、5层参考模型"},"48.0":{t:"# TCP",p:"TCP 基本是和 UDP 反着来，建立连接断开连接都需要先需要进行握手。在传输数据的过程中，通过各种算法保证数据的可靠性，当 ...",l:"basic-quality/tcp/index.html",a:"tcp"},"48.1":{t:"头部",p:`从这个图上我们就可以发现 TCP 头部比 UDP 头部复杂的多。
!图片
对于 TCP 头部来说，以下几个字段是很重要的

 ...`,l:"basic-quality/tcp/index.html#头部",a:"头部"},"48.2":{t:"状态机",p:`TCP 的状态机是很复杂的，并且与建立断开连接时的握手息息相关，接下来就来详细描述下两种握手。
!图片
在这之前需要了解一个 ...`,l:"basic-quality/tcp/index.html#状态机",a:"状态机"},"48.3":{t:"建立连接三次握手",p:"首先假设主动发起请求的一端称为客户端，被动连接的一端称为服务端。不管是客户端还是服务端，TCP 连接建立完后都能发送和接收数 ...",l:"basic-quality/tcp/index.html#建立连接三次握手",a:"建立连接三次握手"},"48.4":{t:"第一次握手",p:`客户端向服务端发送连接请求报文段。该报文段中包含自身的数据通讯初始序号。请求发送后，客户端便进入 SYN-SENT 状态。
`,l:"basic-quality/tcp/index.html#第一次握手",a:"第一次握手"},"48.5":{t:"第二次握手",p:"服务端收到连接请求报文段后，如果同意连接，则会发送一个应答，该应答中也会包含自身的数据通讯初始序号，发送完成后便进入 SYN ...",l:"basic-quality/tcp/index.html#第二次握手",a:"第二次握手"},"48.6":{t:"第三次握手",p:"当客户端收到连接同意的应答后，还要向服务端发送一个确认报文。客户端发完这个报文段后便进入 ESTABLISHED 状态，服务 ...",l:"basic-quality/tcp/index.html#第三次握手",a:"第三次握手"},"48.7":{t:"断开链接四次握手",p:`!图片
TCP 是全双工的，在断开连接时两端都需要发送 FIN 和 ACK。
`,l:"basic-quality/tcp/index.html#断开链接四次握手",a:"断开链接四次握手"},"48.8":{t:"第一次握手",p:`若客户端 A 认为数据发送完成，则它需要向服务端 B 发送连接释放请求。
`,l:"basic-quality/tcp/index.html#第一次握手",a:"第一次握手"},"48.9":{t:"第二次握手",p:"B 收到连接释放请求后，会告诉应用层要释放 TCP 链接。然后会发送 ACK 包，并进入 CLOSE_WAIT 状态，此时表 ...",l:"basic-quality/tcp/index.html#第二次握手",a:"第二次握手"},"48.10":{t:"第三次握手",p:`B 如果此时还有没发完的数据会继续发送，完毕后会向 A 发送连接释放请求，然后 B 便进入 LAST-ACK 状态。
PS： ...`,l:"basic-quality/tcp/index.html#第三次握手",a:"第三次握手"},"48.11":{t:"第四次握手",p:"A 收到释放请求后，向 B 发送确认应答，此时 A 进入 TIME-WAIT 状态。该状态会持续 2MSL（最大段生存期，指 ...",l:"basic-quality/tcp/index.html#第四次握手",a:"第四次握手"},"48.12":{t:"ARQ 协议",p:"ARQ 协议也就是超时重传机制。通过确认和超时机制保证了数据的正确送达，ARQ 协议包含停止等待 ARQ 和连续 ARQ 两 ...",l:"basic-quality/tcp/index.html#arq-协议",a:"arq-协议"},"48.13":{t:"停止等待 ARQ",p:"",l:"basic-quality/tcp/index.html#停止等待-arq",a:"停止等待-arq"},"48.14":{t:"正常传输过程",p:"只要 A 向 B 发送一段报文，都要停止发送并启动一个定时器，等待对端回应，在定时器时间内接收到对端应答就取消定时器并发送下 ...",l:"basic-quality/tcp/index.html#正常传输过程",a:"正常传输过程"},"48.15":{t:"报文丢失或出错",p:"在报文传输的过程中可能会出现丢包。这时候超过定时器设定的时间就会再次发送丢失的数据直到对端响应，所以需要每次都备份发送的数据 ...",l:"basic-quality/tcp/index.html#报文丢失或出错",a:"报文丢失或出错"},"48.16":{t:"ACK 超时或丢失",p:"对端传输的应答也可能出现丢失或超时的情况。那么超过定时器时间 A 端照样会重传报文。这时候 B 端收到相同序号的报文会丢弃该 ...",l:"basic-quality/tcp/index.html#ack-超时或丢失",a:"ack-超时或丢失"},"48.17":{t:"连续 ARQ",p:"在连续 ARQ 中，发送端拥有一个发送窗口，可以在没有收到应答的情况下持续发送窗口内的数据，这样相比停止等待 ARQ 协议来 ...",l:"basic-quality/tcp/index.html#连续-arq",a:"连续-arq"},"48.18":{t:"累计确认",p:"连续 ARQ 中，接收端会持续不断收到报文。如果和停止等待 ARQ 中接收一个报文就发送一个应答一样，就太浪费资源了。通过累 ...",l:"basic-quality/tcp/index.html#累计确认",a:"累计确认"},"48.19":{t:"滑动窗口",p:`在上面小节中讲到了发送窗口。在 TCP 中，两端其实都维护着窗口：分别为发送端窗口和接收端窗口。
发送端窗口包含已发送但未收 ...`,l:"basic-quality/tcp/index.html#滑动窗口",a:"滑动窗口"},"48.20":{t:"Zero 窗口",p:"在发送报文的过程中，可能会遇到对端出现零窗口的情况。在该情况下，发送端会停止发送数据，并启动 persistent time ...",l:"basic-quality/tcp/index.html#zero-窗口",a:"zero-窗口"},"48.21":{t:"拥塞处理",p:"拥塞处理和流量控制不同，后者是作用于接收方，保证接收方来得及接受数据。而前者是作用于网络，防止过多的数据拥塞网络，避免出现网 ...",l:"basic-quality/tcp/index.html#拥塞处理",a:"拥塞处理"},"48.22":{t:"慢开始算法",p:"慢开始算法，顾名思义，就是在传输开始时将发送窗口慢慢指数级扩大，从而避免一开始就传输大量数据导致网络拥塞。想必大家都下载过资 ...",l:"basic-quality/tcp/index.html#慢开始算法",a:"慢开始算法"},"48.23":{t:"拥塞避免算法",p:`拥塞避免算法相比简单点，每过一个 RTT 窗口大小只加一，这样能够避免指数级增长导致网络拥塞，慢慢将大小调整到最佳值。
在传 ...`,l:"basic-quality/tcp/index.html#拥塞避免算法",a:"拥塞避免算法"},"48.24":{t:"快速重传",p:"快速重传一般和快恢复一起出现。一旦接收端收到的报文出现失序的情况，接收端只会回复最后一个顺序正确的报文序号。如果发送端收到三 ...",l:"basic-quality/tcp/index.html#快速重传",a:"快速重传"},"48.25":{t:"TCP Taho 实现如下**",p:`
将阈值设为当前拥塞窗口的一半
将拥塞窗口设为 1 MSS
重新开始慢开始算法

`,l:"basic-quality/tcp/index.html#tcp-taho-实现如下",a:"tcp-taho-实现如下"},"48.26":{t:"TCP Reno 实现如下**",p:`
拥塞窗口减半
将阈值设为当前拥塞窗口
进入快恢复阶段（重发对端需要的包，一旦收到一个新的 ACK 答复就退出该阶段），这种 ...`,l:"basic-quality/tcp/index.html#tcp-reno-实现如下",a:"tcp-reno-实现如下"},"48.27":{t:"TCP New Ren 改进后的快恢复",p:"TCP New Reno 算法改进了之前 TCP Reno 算法的缺陷。在之前，快恢复中只要收到一个新的 ACK 包，就会退 ...",l:"basic-quality/tcp/index.html#tcp-new-ren-改进后的快恢复",a:"tcp-new-ren-改进后的快恢复"},"48.28":{t:"总结",p:`
建立连接需要三次握手，断开连接需要四次握手
滑动窗口解决了数据的丢包、顺序不对和流量控制问题
拥塞窗口实现了对流量的控制， ...`,l:"basic-quality/tcp/index.html#总结",a:"总结"},"49.0":{t:"# TCP三次握手 TCP 四次挥手",p:"",l:"basic-quality/tcp-three-tcp-four/index.html",a:"tcp三次握手-tcp-四次挥手"},"49.1":{t:"TCP三次握手",p:`
第一次握手：建立连接时，客户端发送syn包（syn=j）到服务器，并进入SYN_SENT状态，等待服务器确认；SYN：同步 ...`,l:"basic-quality/tcp-three-tcp-four/index.html#tcp三次握手",a:"tcp三次握手"},"49.2":{t:"TCP 四次挥手",p:`
客户端进程发出连接释放报文，并且停止发送数据。释放数据报文首部，FIN=1，其序列号为seq=u（等于前面已经传送过来的数 ...`,l:"basic-quality/tcp-three-tcp-four/index.html#tcp-四次挥手",a:"tcp-四次挥手"},"50.0":{t:"# TCP和UDP的区别",p:`
TCP是面向链接的，而UDP是面向无连接的。
TCP仅支持单播传输，UDP 提供了单播，多播，广播的功能。
TCP的三次握 ...`,l:"basic-quality/tcp-udp/index.html",a:"tcp和udp的区别"},"50.1":{t:"一、TCP/IP网络模型",p:"计算机与网络设备要相互通信，双方就必须基于相同的方法。比如，如何探测到通信目标、由哪一边先发起通信、使用哪种语言进行通信、怎 ...",l:"basic-quality/tcp-udp/index.html#一、tcp-ip网络模型",a:"一、tcp-ip网络模型"},"50.2":{t:"二、UDP",p:"UDP协议全称是用户数据报协议，在网络中它与TCP协议一样用于处理数据包，是一种无连接的协议。在OSI模型中，在第四层——传 ...",l:"basic-quality/tcp-udp/index.html#二、udp",a:"二、udp"},"50.3":{t:"它有以下几个特点",p:"",l:"basic-quality/tcp-udp/index.html#它有以下几个特点",a:"它有以下几个特点"},"50.4":{t:"1. 面向无连接",p:"首先 UDP 是不需要和 TCP一样在发送数据前进行三次握手建立连接的，想发数据就可以开始发送了。并且也只是数据报文的搬运工 ...",l:"basic-quality/tcp-udp/index.html#_1-面向无连接",a:"_1-面向无连接"},"50.5":{t:"2. 有单播，多播，广播的功能",p:`UDP 不止支持一对一的传输方式，同样支持一对多，多对多，多对一的方式，也就是说 UDP 提供了单播，多播，广播的功能。
`,l:"basic-quality/tcp-udp/index.html#_2-有单播-多播-广播的功能",a:"_2-有单播-多播-广播的功能"},"50.6":{t:"3. UDP是面向报文的",p:"发送方的UDP对应用程序交下来的报文，在添加首部后就向下交付IP层。UDP对应用层交下来的报文，既不合并，也不拆分，而是保留 ...",l:"basic-quality/tcp-udp/index.html#_3-udp是面向报文的",a:"_3-udp是面向报文的"},"50.7":{t:"4. 不可靠性",p:`首先不可靠性体现在无连接上，通信都不需要建立连接，想发就发，这样的情况肯定不可靠。
并且收到什么数据就传递什么数据，并且也不 ...`,l:"basic-quality/tcp-udp/index.html#_4-不可靠性",a:"_4-不可靠性"},"50.8":{t:"5. 头部开销小，传输数据报文时是很高效的",p:`!图片
UDP 头部包含了以下几个数据：

两个十六位的端口号，分别为源端口（可选字段）和目标端口
整个数据报文的长度
整个 ...`,l:"basic-quality/tcp-udp/index.html#_5-头部开销小-传输数据报文时是很高效的",a:"_5-头部开销小-传输数据报文时是很高效的"},"50.9":{t:"三、TCP",p:"当一台计算机想要与另一台计算机通讯时，两台计算机之间的通信需要畅通且可靠，这样才能保证正确收发数据。例如，当你想查看网页或查 ...",l:"basic-quality/tcp-udp/index.html#三、tcp",a:"三、tcp"},"50.10":{t:"1. TCP连接过程",p:`!图片
如下图所示，可以看到建立一个TCP连接的过程为（三次握手的过程）:
`,l:"basic-quality/tcp-udp/index.html#_1-tcp连接过程",a:"_1-tcp连接过程"},"50.11":{t:"第一次握手",p:`客户端向服务端发送连接请求报文段。该报文段中包含自身的数据通讯初始序号。请求发送后，客户端便进入 SYN-SENT 状态。
`,l:"basic-quality/tcp-udp/index.html#第一次握手",a:"第一次握手"},"50.12":{t:"第二次握手",p:"服务端收到连接请求报文段后，如果同意连接，则会发送一个应答，该应答中也会包含自身的数据通讯初始序号，发送完成后便进入 SYN ...",l:"basic-quality/tcp-udp/index.html#第二次握手",a:"第二次握手"},"50.13":{t:"第三次握手",p:`!图片
当客户端收到连接同意的应答后，还要向服务端发送一个确认报文。客户端发完这个报文段后便进入 ESTABLISHED 状 ...`,l:"basic-quality/tcp-udp/index.html#第三次握手",a:"第三次握手"},"50.14":{t:"2. TCP断开链接",p:`!图片
TCP 是全双工的，在断开连接时两端都需要发送 FIN 和 ACK。
`,l:"basic-quality/tcp-udp/index.html#_2-tcp断开链接",a:"_2-tcp断开链接"},"50.15":{t:"第一次握手",p:`若客户端 A 认为数据发送完成，则它需要向服务端 B 发送连接释放请求。
`,l:"basic-quality/tcp-udp/index.html#第一次握手",a:"第一次握手"},"50.16":{t:"第二次握手",p:"B 收到连接释放请求后，会告诉应用层要释放 TCP 链接。然后会发送 ACK 包，并进入 CLOSE_WAIT 状态，此时表 ...",l:"basic-quality/tcp-udp/index.html#第二次握手",a:"第二次握手"},"50.17":{t:"第三次握手",p:`B 如果此时还有没发完的数据会继续发送，完毕后会向 A 发送连接释放请求，然后 B 便进入 LAST-ACK 状态。
`,l:"basic-quality/tcp-udp/index.html#第三次握手",a:"第三次握手"},"50.18":{t:"第四次握手",p:`

A 收到释放请求后，向 B 发送确认应答，此时 A 进入 TIME-WAIT 状态。


该状态会持续 2MSL（最大段 ...`,l:"basic-quality/tcp-udp/index.html#第四次握手",a:"第四次握手"},"50.19":{t:"3. TCP协议的特点",p:"",l:"basic-quality/tcp-udp/index.html#_3-tcp协议的特点",a:"_3-tcp协议的特点"},"50.20":{t:"面向连接",p:"面向连接，是指发送数据之前必须在两端建立连接。建立连接的方法是“三次握手”，这样能建立可靠的连接。建立连接，是为数据的可靠传 ...",l:"basic-quality/tcp-udp/index.html#面向连接",a:"面向连接"},"50.21":{t:"仅支持单播传输",p:`每条TCP传输连接只能有两个端点，只能进行点对点的数据传输，不支持多播和广播传输方式。
`,l:"basic-quality/tcp-udp/index.html#仅支持单播传输",a:"仅支持单播传输"},"50.22":{t:"面向字节流",p:`TCP不像UDP一样那样一个个报文独立地传输，而是在不保留报文边界的情况下以字节流方式进行传输。
`,l:"basic-quality/tcp-udp/index.html#面向字节流",a:"面向字节流"},"50.23":{t:"可靠传输",p:"对于可靠传输，判断丢包，误码靠的是TCP的段编号以及确认号。TCP为了保证报文传输的可靠，就给每个包一个序号，同时序号也保证 ...",l:"basic-quality/tcp-udp/index.html#可靠传输",a:"可靠传输"},"50.24":{t:"提供拥塞控制",p:`当网络出现拥塞的时候，TCP能够减小向网络注入数据的速率和数量，缓解拥塞
`,l:"basic-quality/tcp-udp/index.html#提供拥塞控制",a:"提供拥塞控制"},"50.25":{t:"TCP提供全双工通信",p:"TCP允许通信双方的应用程序在任何时候都能发送数据，因为TCP连接的两端都设有缓存，用来临时存放双向通信的数据。当然，TCP ...",l:"basic-quality/tcp-udp/index.html#tcp提供全双工通信",a:"tcp提供全双工通信"},"50.26":{t:"四、TCP和UDP的比较",p:"",l:"basic-quality/tcp-udp/index.html#四、tcp和udp的比较",a:"四、tcp和udp的比较"},"50.27":{t:"1. 对比",p:"",l:"basic-quality/tcp-udp/index.html#_1-对比",a:"_1-对比"},"50.28":{t:"UDP TCP",p:`
是否连接 无连接 面向连接
是否可靠 不可靠传输，不使用流量控制和拥塞控制 可靠传输，使用流量控制和拥塞控制
连接对象个数 ...`,l:"basic-quality/tcp-udp/index.html#udp-tcp",a:"udp-tcp"},"50.29":{t:"五、TCP 和 UDP 应用场景",p:`

UDP的应用场景：即时通信。面向数据报方式；网络数据大多为短消息；拥有大量客户端；对数据安全性无特殊要求；网络负担重但对 ...`,l:"basic-quality/tcp-udp/index.html#五、tcp-和-udp-应用场景",a:"五、tcp-和-udp-应用场景"},"50.30":{t:"六、运行在TCP 或UDP的应用层协议分析",p:"",l:"basic-quality/tcp-udp/index.html#六、运行在tcp-或udp的应用层协议分析",a:"六、运行在tcp-或udp的应用层协议分析"},"50.31":{t:"运行在TCP协议上的协议",p:`
HTTP（Hypertext Transfer Protocol，超文本传输协议），主要用于普通浏览。
HTTPS（HTT ...`,l:"basic-quality/tcp-udp/index.html#运行在tcp协议上的协议",a:"运行在tcp协议上的协议"},"50.32":{t:"运行在UDP协议上的协议",p:`
BOOTP（Boot Protocol，启动协议），应用于无盘设备。
NTP（Network Time Protocol， ...`,l:"basic-quality/tcp-udp/index.html#运行在udp协议上的协议",a:"运行在udp协议上的协议"},"50.33":{t:"运行在TCP和UDP协议上",p:`
DNS（Domain Name Service，域名服务），用于完成地址查找，邮件转发等工作。
ECHO（Echo Pro ...`,l:"basic-quality/tcp-udp/index.html#运行在tcp和udp协议上",a:"运行在tcp和udp协议上"},"50.34":{t:"总结",p:`
TCP向上层提供面向连接的可靠服务 ，UDP向上层提供无连接不可靠服务。
虽然 UDP 并没有 TCP 传输来的准确，但是 ...`,l:"basic-quality/tcp-udp/index.html#总结",a:"总结"},"51.0":{t:"# UDP",p:"首先 UDP 协议是面向无连接的，也就是说不需要在正式传递数据之前先连接起双方。然后 UDP 协议只是数据报文的搬运工，不保 ...",l:"basic-quality/udp/index.html",a:"udp"},"51.1":{t:"面向无连接",p:`首先 UDP 是不需要和 TCP 一样在发送数据前进行三次握手建立连接的，想发数据就可以开始发送了。
并且也只是数据报文的搬 ...`,l:"basic-quality/udp/index.html#面向无连接",a:"面向无连接"},"51.2":{t:"不可靠性",p:`首先不可靠性体现在无连接上，通信都不需要建立连接，想发就发，这样的情况肯定不可靠。
并且收到什么数据就传递什么数据，并且也不 ...`,l:"basic-quality/udp/index.html#不可靠性",a:"不可靠性"},"51.3":{t:"高效",p:"虽然 UDP 协议不是那么的可靠，但是正是因为它不是那么的可靠，所以也就没有 TCP 那么复杂了，需要保证数据不丢失且有序到 ...",l:"basic-quality/udp/index.html#高效",a:"高效"},"51.4":{t:"传输方式",p:`UDP 不止支持一对一的传输方式，同样支持一对多，多对多，多对一的方式，也就是说 UDP 提供了单播，多播，广播的功能。
`,l:"basic-quality/udp/index.html#传输方式",a:"传输方式"},"51.5":{t:"适合使用的场景",p:"UDP 虽然对比 TCP 有很多缺点，但是正是因为这些缺点造就了它高效的特性，在很多实时性要求高的地方都可以看到 UDP 的 ...",l:"basic-quality/udp/index.html#适合使用的场景",a:"适合使用的场景"},"51.6":{t:"UDP vs TCP",p:`
UDP 相比 TCP 简单的多，不需要建立连接，不需要验证数据报文，不需要流量控制，只会把想发的数据报文一股脑的丢给对端
 ...`,l:"basic-quality/udp/index.html#udp-vs-tcp",a:"udp-vs-tcp"},"52.0":{t:"# 数组",p:"",l:"data-structures-algorithms/array/index.html",a:"数组"},"52.1":{t:"Map 的妙用——两数求和问题",p:`
真题描述： 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他 ...`,l:"data-structures-algorithms/array/index.html#map-的妙用——两数求和问题",a:"map-的妙用——两数求和问题"},"52.2":{t:"示例",p:`
给定 nums = [2, 7, 11, 15], target = 9
因为 nums[0] + nums[1] = 2 ...`,l:"data-structures-algorithms/array/index.html#示例",a:"示例"},"52.3":{t:"思路分析",p:"",l:"data-structures-algorithms/array/index.html#思路分析",a:"思路分析"},"52.4":{t:"一个“淳朴”的解法",p:"这道题相信很多同学看一眼就很快能得出一个最基本的思路：两层循环来遍历同一个数组；第一层循环遍历的值记为 a，第二层循环时遍历 ...",l:"data-structures-algorithms/array/index.html#一个-淳朴-的解法",a:"一个-淳朴-的解法"},"52.5":{t:"对“淳朴”解法的反思",p:"大家以后做算法题的时候，要有这样的一种本能：当发现自己的代码里有两层循环时，先反思一下，能不能用空间换时间，把它优化成一层循 ...",l:"data-structures-algorithms/array/index.html#对-淳朴-解法的反思",a:"对-淳朴-解法的反思"},"52.6":{t:"编码实现",p:`/**
 * @param {number[]} nums
 * @param {number} target
 * @re ...`,l:"data-structures-algorithms/array/index.html#编码实现",a:"编码实现"},"52.7":{t:"合并两个有序数组",p:`
真题描述：给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成 ...`,l:"data-structures-algorithms/array/index.html#合并两个有序数组",a:"合并两个有序数组"},"52.8":{t:"示例",p:`
输入:
nums1 = [1,2,3,0,0,0], m = 3 nums2 = [2,5,6], n = 3
输出:

 ...`,l:"data-structures-algorithms/array/index.html#示例",a:"示例"},"52.9":{t:"思路分析",p:"",l:"data-structures-algorithms/array/index.html#思路分析",a:"思路分析"},"52.10":{t:"标准解法",p:`这道题没有太多的弯弯绕绕，标准解法就是双指针法。首先我们定义两个指针，各指向两个数组生效部分的尾部：
!图片
每次只对指针所 ...`,l:"data-structures-algorithms/array/index.html#标准解法",a:"标准解法"},"52.11":{t:"这里有一点需要解释一下",p:"为什么是从后往前填补？因为是要把所有的值合并到 nums1 里，所以说我们这里可以把 nums1 看做是一个“容器”。但是这 ...",l:"data-structures-algorithms/array/index.html#这里有一点需要解释一下",a:"这里有一点需要解释一下"},"52.12":{t:"编码实现",p:`/**
 * @param {number[]} nums1
 * @param {number} m
 * @param  ...`,l:"data-structures-algorithms/array/index.html#编码实现",a:"编码实现"},"52.13":{t:"三数求和问题",p:`
双指针法能处理的问题多到你想不到。不信来瞅瞅两数求和它儿子——三数求和问题！
俗话说，青出于蓝而胜于蓝，三数求和虽然和两数 ...`,l:"data-structures-algorithms/array/index.html#三数求和问题",a:"三数求和问题"},"52.14":{t:"示例",p:`
给定数组 nums = [-1, 0, 1, 2, -1, -4]，
满足要求的三元组集合为： [ [-1, 0, 1], ...`,l:"data-structures-algorithms/array/index.html#示例",a:"示例"},"52.15":{t:"思路分析",p:`
三数之和延续两数之和的思路，我们可以把求和问题变成求差问题——固定其中一个数，在剩下的数中寻找是否有两个数和这个固定数相加 ...`,l:"data-structures-algorithms/array/index.html#思路分析",a:"思路分析"},"52.16":{t:"编码实现",p:`/**
 * @param {number[]} nums
 * @return {number[][]}
 */
cons ...`,l:"data-structures-algorithms/array/index.html#编码实现",a:"编码实现"},"52.17":{t:"在区间范围内统计奇数数目",p:`不能被0整除的数为奇数,那么求两个数之间的奇数个数,以0为开始,然后相减即可
//规律
var countOdds = fu ...`,l:"data-structures-algorithms/array/index.html#在区间范围内统计奇数数目",a:"在区间范围内统计奇数数目"},"52.18":{t:"去掉最低工资和最高工资后的工资平均值",p:`var average = function(salary) {
  // 先算 最大最小的和
   const sumOt ...`,l:"data-structures-algorithms/array/index.html#去掉最低工资和最高工资后的工资平均值",a:"去掉最低工资和最高工资后的工资平均值"},"53.0":{t:"# 二叉树",p:"",l:"data-structures-algorithms/binary-tree/index.html",a:"二叉树"},"53.1":{t:"前序遍历",p:"",l:"data-structures-algorithms/binary-tree/index.html#前序遍历",a:"前序遍历"},"53.2":{t:"先序遍历 递归",p:`var preorderTraversal = function (root) {
  const treeNodeList ...`,l:"data-structures-algorithms/binary-tree/index.html#先序遍历-递归",a:"先序遍历-递归"},"53.3":{t:"先序遍历 非递归",p:`var preorderTraversal = function (root, res = []) {
  const st ...`,l:"data-structures-algorithms/binary-tree/index.html#先序遍历-非递归",a:"先序遍历-非递归"},"53.4":{t:"中序遍历",p:"",l:"data-structures-algorithms/binary-tree/index.html#中序遍历",a:"中序遍历"},"53.5":{t:"中序遍历 递归",p:`var inorderTraversal = function (root) {
  const treeNodeList  ...`,l:"data-structures-algorithms/binary-tree/index.html#中序遍历-递归",a:"中序遍历-递归"},"53.6":{t:"中序遍历 非递归",p:`var inorderTraversal = function (root, res = []) {
  const sta ...`,l:"data-structures-algorithms/binary-tree/index.html#中序遍历-非递归",a:"中序遍历-非递归"},"53.7":{t:"后序遍历",p:"",l:"data-structures-algorithms/binary-tree/index.html#后序遍历",a:"后序遍历"},"53.8":{t:"后序遍历 递归",p:`var postorderTraversal = function (root) {
  const treeNodeLis ...`,l:"data-structures-algorithms/binary-tree/index.html#后序遍历-递归",a:"后序遍历-递归"},"53.9":{t:"后序遍历 非递归",p:`var postorderTraversal = function (root, res = []) {
  const s ...`,l:"data-structures-algorithms/binary-tree/index.html#后序遍历-非递归",a:"后序遍历-非递归"},"53.10":{t:"二叉树的层序遍历",p:`// 需要返回 [[1], [2,3], [4,5]]

// 时间复杂度 O(n) n为树的节点数
// 空间复杂度 O( ...`,l:"data-structures-algorithms/binary-tree/index.html#二叉树的层序遍历",a:"二叉树的层序遍历"},"53.11":{t:"二叉树的最小深度",p:`// 给一个二叉树，需要你找出其最小的深度， 从根节点到叶子节点的距离
// 时间复杂度O(n) n是树的节点数量
// 空 ...`,l:"data-structures-algorithms/binary-tree/index.html#二叉树的最小深度",a:"二叉树的最小深度"},"53.12":{t:"二叉树的最大深度",p:`// 给一个二叉树，需要你找出其最大的深度，从根节点到叶子节点的距离

// 时间复杂度 O(n) n为树的节点数
// 空 ...`,l:"data-structures-algorithms/binary-tree/index.html#二叉树的最大深度",a:"二叉树的最大深度"},"54.0":{t:"# 入门介绍",p:"",l:"data-structures-algorithms/introduction/index.html",a:"入门介绍"},"54.1":{t:"常见的数据结构",p:`数组、字典、链表、栈、队列、散列表、二叉树、堆、跳表、图、Trie树
`,l:"data-structures-algorithms/introduction/index.html#常见的数据结构",a:"常见的数据结构"},"54.2":{t:"常见的算法",p:`递归、排序、二分查找、搜索、哈希算法、贪心算法、分治算法、回溯算法、动态规划、字符串匹配算法等
`,l:"data-structures-algorithms/introduction/index.html#常见的算法",a:"常见的算法"},"55.0":{t:"# 排序",p:"",l:"data-structures-algorithms/sort/index.html",a:"排序"},"55.1":{t:"归并排序",p:`// 时间复杂度 O(nlogn) 分需要劈开数组，所以是logn， 合则是n
// 空间复杂度 O(n)
Array.pr ...`,l:"data-structures-algorithms/sort/index.html#归并排序",a:"归并排序"},"55.2":{t:"快速排序",p:`// 时间复杂度 O(nlogN)
// 空间复杂度 O(1)
Array.prototype.quickSort = fu ...`,l:"data-structures-algorithms/sort/index.html#快速排序",a:"快速排序"},"55.3":{t:"插入排序",p:`// 时间复杂度 O(n ^ 2)
Array.prototype.insertionSort = function ()  ...`,l:"data-structures-algorithms/sort/index.html#插入排序",a:"插入排序"},"55.4":{t:"选择排序",p:`// 时间复杂度：O(n ^ 2) n为数组长度
// 空间复杂度：O(1)
Array.prototype.selecti ...`,l:"data-structures-algorithms/sort/index.html#选择排序",a:"选择排序"},"55.5":{t:"冒泡排序",p:`// 时间复杂度 O(n ^ 2) n为数组长度
// 空间复杂度 O(1)
Array.prototype.bubbleS ...`,l:"data-structures-algorithms/sort/index.html#冒泡排序",a:"冒泡排序"},"56.0":{t:"# 空间复杂度",p:"",l:"data-structures-algorithms/space-complexity/index.html",a:"空间复杂度"},"56.1":{t:"含义",p:`和时间复杂度一样，空间复杂度也是用大 O 表示，比如 O(1)、 O(n)...
`,l:"data-structures-algorithms/space-complexity/index.html#含义",a:"含义"},"56.2":{t:"作用",p:`它用来定义描述算法运行过程中临时占用的存储空间大小
占用越少 代码写的就越好
`,l:"data-structures-algorithms/space-complexity/index.html#作用",a:"作用"},"56.3":{t:"O(1)： 单个变量，所以占用永远是 O(1)",p:`let i = 0
i += 1

`,l:"data-structures-algorithms/space-complexity/index.html#o-1-单个变量-所以占用永远是-o-1",a:"o-1-单个变量-所以占用永远是-o-1"},"56.4":{t:"O(n)： 声明一个数组， 添加 n 个值， 相当于占用了 n 个空间单元",p:`const arr = []
for (let i = 0; i &lt; n; i += 1) {
  arr.push( ...`,l:"data-structures-algorithms/space-complexity/index.html#o-n-声明一个数组-添加-n-个值-相当于占用了-n-个空间单元",a:"o-n-声明一个数组-添加-n-个值-相当于占用了-n-个空间单元"},"56.5":{t:"O(n^2)： 类似一个矩阵的概念，就是二维数组的意思",p:`const arr = []
for (let i = 0; i &lt; n; i += 1) {
  arr.push( ...`,l:"data-structures-algorithms/space-complexity/index.html#o-n-2-类似一个矩阵的概念-就是二维数组的意思",a:"o-n-2-类似一个矩阵的概念-就是二维数组的意思"},"57.0":{t:"# 字符串",p:"",l:"data-structures-algorithms/string/index.html",a:"字符串"},"57.1":{t:"回文字符串的衍生问题",p:"",l:"data-structures-algorithms/string/index.html#回文字符串的衍生问题",a:"回文字符串的衍生问题"},"57.2":{t:"真题描述：给定一个非空字符串 s，最多删除一个字符。判断是否能成为回文字符串",p:`
示例 1: 输入: &quot;aba&quot;
输出: True
示例 2:
输入: &quot;abca&quot; ...`,l:"data-structures-algorithms/string/index.html#真题描述-给定一个非空字符串-s-最多删除一个字符。判断是否能成为回文字符串",a:"真题描述-给定一个非空字符串-s-最多删除一个字符。判断是否能成为回文字符串"},"57.3":{t:"思路分析",p:`
如何判断自己解决回文类问题的解法是否“高效”？其中一个很重要的标准，就是看你对回文字符串的对称特性利用得是否彻底。
字符串 ...`,l:"data-structures-algorithms/string/index.html#思路分析",a:"思路分析"},"57.4":{t:"编码实现",p:`const validPalindrome = function(s) {
    // 缓存字符串的长度
    cons ...`,l:"data-structures-algorithms/string/index.html#编码实现",a:"编码实现"},"57.5":{t:"字符串匹配问题——正则表达式初相见",p:"",l:"data-structures-algorithms/string/index.html#字符串匹配问题——正则表达式初相见",a:"字符串匹配问题——正则表达式初相见"},"57.6":{t:"真题描述： 设计一个支持以下两种操作的数据结构",p:`

void addWord(word)


bool search(word)


search(word) 可以搜索文字 ...`,l:"data-structures-algorithms/string/index.html#真题描述-设计一个支持以下两种操作的数据结构",a:"真题描述-设计一个支持以下两种操作的数据结构"},"57.7":{t:"思路分析",p:`
这道题要求字符串既可以被添加、又可以被搜索，这就意味着字符串在添加时一定要被存在某处。键值对存储，我们用 Map（或对象字 ...`,l:"data-structures-algorithms/string/index.html#思路分析",a:"思路分析"},"58.0":{t:"# 时间复杂度",p:"",l:"data-structures-algorithms/time-complexity/index.html",a:"时间复杂度"},"58.1":{t:"含义",p:`其实就是一个函数，用大 O 表示， 比如 O(1)、 O(n)...
`,l:"data-structures-algorithms/time-complexity/index.html#含义",a:"含义"},"58.2":{t:"作用",p:`它的作用就是用来定义描述算法的运行时间
`,l:"data-structures-algorithms/time-complexity/index.html#作用",a:"作用"},"58.3":{t:"O(1)",p:`let i = 0
i += 1

`,l:"data-structures-algorithms/time-complexity/index.html#o-1",a:"o-1"},"58.4":{t:"O(n)： 如果是 O(1) + O(n) 则还是 O(n)",p:`for (let i = 0; i &lt; n; i += 1) {
  console.log(i)
}

`,l:"data-structures-algorithms/time-complexity/index.html#o-n-如果是-o-1-o-n-则还是-o-n",a:"o-n-如果是-o-1-o-n-则还是-o-n"},"58.5":{t:"O(n^2)： O(n) \\* O(n), 也就是双层循环，自此类推： O(n^3)",p:`for (let i = 0; i &lt; n; i += 1) {
  for (let j = 0; j &lt; n ...`,l:"data-structures-algorithms/time-complexity/index.html#o-n-2-o-n-o-n-也就是双层循环-自此类推-o-n-3",a:"o-n-2-o-n-o-n-也就是双层循环-自此类推-o-n-3"},"59.0":{t:"# 树",p:"",l:"data-structures-algorithms/tree/index.html",a:"树"},"59.1":{t:"广度优先遍历",p:`// ● 先访问离根节点最近的节点, 如果有兄弟节点就会先遍历兄弟节点，再去遍历自己的子节点
// ● 口诀
//   ○  ...`,l:"data-structures-algorithms/tree/index.html#广度优先遍历",a:"广度优先遍历"},"60.0":{t:"# hard-line-breaks",p:`软换行（Soft line breaks）
换行符不在行内代码或 HTML 标签内，前面没有两个或以上的空格，将解析为软换行 ...`,l:"engineering/Markdown/details/index.html",a:"hard-line-breaks"},"61.0":{t:"适配方案分析",p:`看了网上的各种方案，目前大家采用的大概有 3 种👇



方案
实现方式
优点
缺点




vm vh
1.按照设计稿的 ...`,l:"engineering/adapter/data-screen/index.html",a:"适配方案分析"},"61.1":{t:"方案一：vw vh",p:"",l:"engineering/adapter/data-screen/index.html#方案一-vw-vh",a:"方案一-vw-vh"},"61.2":{t:"上效果",p:`!ezgif.com-gif-maker (1).gif
当屏幕的尺寸比例刚好是 16:9 时
!vwh02.jpg
当屏幕 ...`,l:"engineering/adapter/data-screen/index.html#上效果",a:"上效果"},"61.3":{t:"实现思路",p:`按照设计稿的尺寸，将px按比例计算转为vw和vh，转换公式如下
假设设计稿尺寸为 19201080（做之前一定问清楚 ui  ...`,l:"engineering/adapter/data-screen/index.html#实现思路",a:"实现思路"},"61.4":{t:"话不多说，上代码",p:"",l:"engineering/adapter/data-screen/index.html#话不多说-上代码",a:"话不多说-上代码"},"61.5":{t:"css 方案 - sass",p:`util.scss
// 使用 scss 的 math 函数，https://sass-lang.com/documenta ...`,l:"engineering/adapter/data-screen/index.html#css-方案-sass",a:"css-方案-sass"},"61.6":{t:"css 方案 - less",p:`utils.less
@charset &quot;utf-8&quot;;

// 默认设计稿的宽度
@designWid ...`,l:"engineering/adapter/data-screen/index.html#css-方案-less",a:"css-方案-less"},"61.7":{t:"定义 js 样式处理函数",p:`// 定义设计稿的宽高
const designWidth = 1920;
const designHeight = 108 ...`,l:"engineering/adapter/data-screen/index.html#定义-js-样式处理函数",a:"定义-js-样式处理函数"},"61.8":{t:"屏幕变化后，图表自动调整",p:`这种使用方式有个弊端，就是屏幕尺寸发生变化后，需要手动刷新一下才能完成自适应调整
为了解决这个问题，你需要在各个图表中监听页 ...`,l:"engineering/adapter/data-screen/index.html#屏幕变化后-图表自动调整",a:"屏幕变化后-图表自动调整"},"61.9":{t:"图表字体、间距、位移等尺寸自适应",p:"echarts 的字体大小只支持具体数值（像素），不能用百分比或者 vw 等尺寸，一般字体不会去做自适应，当宽高比跟 ui  ...",l:"engineering/adapter/data-screen/index.html#图表字体、间距、位移等尺寸自适应",a:"图表字体、间距、位移等尺寸自适应"},"61.10":{t:"方案二：scale",p:`通过 css 的 scale 属性，根据屏幕大小，对图表进行整体的等比缩放，从而达到自适应效果
`,l:"engineering/adapter/data-screen/index.html#方案二-scale",a:"方案二-scale"},"61.11":{t:"上效果",p:`!sceen-scale.gif
当屏幕的尺寸比例刚好是 16:9 时，页面能刚好全屏展示，内容占满显示器
!sceen-d ...`,l:"engineering/adapter/data-screen/index.html#上效果",a:"上效果"},"61.12":{t:"话不多说，上代码",p:`html 部分
&lt;div className=&quot;screen-wrapper&quot;&gt;
    & ...`,l:"engineering/adapter/data-screen/index.html#话不多说-上代码",a:"话不多说-上代码"},"61.13":{t:"实现思路",p:`如何缩放
当屏幕宽高比 &lt; 设计稿宽高比，我们需要缩放的比例是屏幕宽度 / 设计稿宽度
当屏幕宽高比 &gt; 设计稿 ...`,l:"engineering/adapter/data-screen/index.html#实现思路",a:"实现思路"},"61.14":{t:"偷懒方法-插件",p:"v-scale-screen是使用 css 属性 transform 实现缩放效果的一个大屏自适应组件，通过 scale 进 ...",l:"engineering/adapter/data-screen/index.html#偷懒方法-插件",a:"偷懒方法-插件"},"61.15":{t:"方案三：rem + vw wh",p:"",l:"engineering/adapter/data-screen/index.html#方案三-rem-vw-wh",a:"方案三-rem-vw-wh"},"61.16":{t:"上效果",p:`!rem.gif
当屏幕的尺寸比例刚好是 16:9 时，页面能刚好全屏展示，内容占满显示器
!rem01.jpg
当屏幕的尺 ...`,l:"engineering/adapter/data-screen/index.html#上效果",a:"上效果"},"61.17":{t:"实现思路",p:`关于 rem
rem(font size of the root element)，是 css3 中新增的一个大小单位，即相 ...`,l:"engineering/adapter/data-screen/index.html#实现思路",a:"实现思路"},"61.18":{t:"实现方案",p:`第一点：获得 rem 的基准值

首先安装 @njleonzhang/postcss-px-to-rem 这个包

npm  ...`,l:"engineering/adapter/data-screen/index.html#实现方案",a:"实现方案"},"61.19":{t:"参考资料",p:`

推荐一个echarts 的案列网站，需要什么直接图表直接在上面去找，可以省去很多查 echarts 配置的时间
全网ec ...`,l:"engineering/adapter/data-screen/index.html#参考资料",a:"参考资料"},"62.0":{t:"# 🔥 手撕babel插件-消灭console",p:"",l:"engineering/ast/delete-console/index.html",a:"🔥-手撕babel插件-消灭console"},"62.1":{t:"窥探",p:`我们的目的是去除console.log，我们首先需要通过ast查看语法树的结构。我们以下面的console为例：

注意 因 ...`,l:"engineering/ast/delete-console/index.html#窥探",a:"窥探"},"62.2":{t:"初见AST",p:`AST是对源码的抽象，字面量、标识符、表达式、语句、模块语法、class语法都有各自的AST。
我们这里只说下本文章中所使用 ...`,l:"engineering/ast/delete-console/index.html#初见ast",a:"初见ast"},"62.3":{t:"Program",p:`
program 是代表整个程序的节点，它有 body 属性代表程序体，存放 statement 数组，就是具体执行的语句的 ...`,l:"engineering/ast/delete-console/index.html#program",a:"program"},"62.4":{t:"ExpressionStatement",p:`
statement 是语句，它是可以独立执行的单位，expression是表达式，它俩唯一的区别是表达式执行完以后有返回值 ...`,l:"engineering/ast/delete-console/index.html#expressionstatement",a:"expressionstatement"},"62.5":{t:"CallExpression",p:`
expression 是表达式，CallExpression表示调用表达式，console.log就是一个调用表达式。

 ...`,l:"engineering/ast/delete-console/index.html#callexpression",a:"callexpression"},"62.6":{t:"MemberExpression",p:`
Member Expression通常是用于访问对象成员的。他有几种形式：

a.b
a[&quot;b&quot;]
n ...`,l:"engineering/ast/delete-console/index.html#memberexpression",a:"memberexpression"},"62.7":{t:"Identifier",p:`
Identifer 是标识符的意思，变量名、属性名、参数名等各种声明和引用的名字，都是Identifer。

我们这里的c ...`,l:"engineering/ast/delete-console/index.html#identifier",a:"identifier"},"62.8":{t:"StringLiteral",p:`
表示字符串字面量。

我们这里的log就是一个字符串字面量
StringLiteral有一个属性value 表示字符串的值 ...`,l:"engineering/ast/delete-console/index.html#stringliteral",a:"stringliteral"},"62.9":{t:"公共属性",p:`
每种 AST 都有自己的属性，但是它们也有一些公共的属性：



type：AST节点的类型


start、end、lo ...`,l:"engineering/ast/delete-console/index.html#公共属性",a:"公共属性"},"62.10":{t:"如何写一个babel插件？",p:`babel插件是作用在第二阶段即transform阶段。
transform阶段有@babel/traverse，可以遍历A ...`,l:"engineering/ast/delete-console/index.html#如何写一个babel插件",a:"如何写一个babel插件"},"62.11":{t:"构造visitor方法",p:`
path 是记录遍历路径的 api，它记录了父子节点的引用，还有很多增删改查 AST 的 api

!4.jpg
+ co ...`,l:"engineering/ast/delete-console/index.html#构造visitor方法",a:"构造visitor方法"},"62.12":{t:"去除所有console",p:`我们将所有的console.log去掉

path.get 表示获取某个属性的path


path.matchesPatt ...`,l:"engineering/ast/delete-console/index.html#去除所有console",a:"去除所有console"},"62.13":{t:"增加env api",p:`一般去除console.log都是在生产环境执行 所以增加env参数

AST的第二个参数opt中有插件传入的配置

+   ...`,l:"engineering/ast/delete-console/index.html#增加env-api",a:"增加env-api"},"62.14":{t:"增加exclude api",p:"我们上面去除了所有的console，不管是error、warning、table都会清除，所以我们加一个exclude ap ...",l:"engineering/ast/delete-console/index.html#增加exclude-api",a:"增加exclude-api"},"62.15":{t:"增加commentWords api",p:`某些时候 我们希望一些console 不被删除 我们可以给他添加一些注释 比如
//no remove
console.lo ...`,l:"engineering/ast/delete-console/index.html#增加commentwords-api",a:"增加commentwords-api"},"62.16":{t:"细节完善",p:`我们大致完成了插件 我们引进项目里面进行测试
console.log(&quot;测试1&quot;);
//no remo ...`,l:"engineering/ast/delete-console/index.html#细节完善",a:"细节完善"},"62.17":{t:"对于后缀注释",p:`我们可以判断后缀注释是否与当前的调用表达式处于同一行，如果不是同一行，则不将其归纳为后缀注释
 if (hasTrailin ...`,l:"engineering/ast/delete-console/index.html#对于后缀注释",a:"对于后缀注释"},"62.18":{t:"对于前缀注释",p:"那么对于前缀注释 我们应该怎么做呢 因为我们在后缀注释的节点中添加了一个变量belongCurrentLine，表示该注释是 ...",l:"engineering/ast/delete-console/index.html#对于前缀注释",a:"对于前缀注释"},"62.19":{t:"发布到线上",p:`我现已将代码发布到线上
`,l:"engineering/ast/delete-console/index.html#发布到线上",a:"发布到线上"},"62.20":{t:"安装",p:`yarn add @parrotjs/babel-plugin-console


`,l:"engineering/ast/delete-console/index.html#安装",a:"安装"},"62.21":{t:"使用",p:`举个例子：新建.babelrc
{
    &quot;plugins&quot;:[[&quot;../dist/inde ...`,l:"engineering/ast/delete-console/index.html#使用",a:"使用"},"63.0":{t:"# AST（抽象语法树） 到底是什么？",p:"抽象语法树（Abstract Syntax Tree，AST）是源代码语法结构的一种抽象表示，它以树状的形式表现编程语言的语 ...",l:"engineering/ast/start/index.html",a:"ast-抽象语法树-到底是什么"},"64.0":{t:"# AST 广泛应用 & 手写编译器",p:`手写编译器
该小节分为两个部分：设计篇和原理篇。
设计篇侧重整体设计，原理篇则是手撕代码，侧重编码实现，在阅读过程中建议将重 ...`,l:"engineering/ast/widely-used/index.html",a:"ast-广泛应用-手写编译器"},"64.1":{t:"设计篇",p:"",l:"engineering/ast/widely-used/index.html#设计篇",a:"设计篇"},"64.2":{t:"整体流程",p:`一个完整的编译器整体执行过程可以分为三个步骤：

Parsing(解析过程)：这个过程要经词法分析、语法分析、构建AST（抽 ...`,l:"engineering/ast/widely-used/index.html#整体流程",a:"整体流程"},"64.3":{t:"Parsing(解析)",p:`解析过程分为2个步骤：词法分析、语法分析。
词法分析是使用tokenizer(分词器)或者lexer(词法分析器)，将源码拆 ...`,l:"engineering/ast/widely-used/index.html#parsing-解析",a:"parsing-解析"},"64.4":{t:"Transformation(转化)",p:"这个过程主要是改写AST（抽象语法树），或者根据当前AST（抽象语法树）生成一个新的AST（抽象语法树），这个过程可以是相同 ...",l:"engineering/ast/widely-used/index.html#transformation-转化",a:"transformation-转化"},"64.5":{t:"Code Generation(生成代码)",p:"最后就是代码生成阶段了，其实就是将生成的新AST树再转回代码的过程。大部分的代码生成器主要过程是，不断的访问Transfor ...",l:"engineering/ast/widely-used/index.html#code-generation-生成代码",a:"code-generation-生成代码"},"64.6":{t:"原理篇",p:`接下来按照上述步骤，开始手写编译器。
`,l:"engineering/ast/widely-used/index.html#原理篇",a:"原理篇"},"64.7":{t:"生成Tokens",p:"第一步: 将代码解析为tokens。这个过程需要tokenzier(分词器)函数，整体思路就是通过遍历字符串的方式，对每个字 ...",l:"engineering/ast/widely-used/index.html#生成tokens",a:"生成tokens"},"64.8":{t:"生成AST",p:`第二步： 将生成好的tokens转化为AST。现在需要定义parser函数，接收上一步处理好的tokens：
functio ...`,l:"engineering/ast/widely-used/index.html#生成ast",a:"生成ast"},"64.9":{t:"遍历和访问生成好的AST",p:"现在已经有AST了，然后我们希望能够通过访问器访问不同的节点，当遇到不同的节点的时候，调用访问器的不同函数，大致设计成这样： ...",l:"engineering/ast/widely-used/index.html#遍历和访问生成好的ast",a:"遍历和访问生成好的ast"},"64.10":{t:"Transformer转化",p:"现在已经生成好AST了。在这一步需要使用到转换器，帮助我们将刚才生成的AST转化为新的AST。在转化之前，必须要明确转化后的 ...",l:"engineering/ast/widely-used/index.html#transformer转化",a:"transformer转化"},"64.11":{t:"新代码生成",p:`最后一步： 新代码生成。到这一步就是用新的AST，遍历其每一个节点，根据指定规则生成最终新的代码。
function cod ...`,l:"engineering/ast/widely-used/index.html#新代码生成",a:"新代码生成"},"64.12":{t:"小试牛刀：使用Babel修改函数名",p:`上面铺垫了这么多，现在开始进入实战演习。
要求：借助 Babel 给函数重命名。
//源代码
const hello = ( ...`,l:"engineering/ast/widely-used/index.html#小试牛刀-使用babel修改函数名",a:"小试牛刀-使用babel修改函数名"},"64.13":{t:"初露锋芒：手写简易版babel-plugin-transform-es2015-arrow-functions",p:"接下来尝试稍微难度大一点的，手写箭头函数转换插件 babel-plugin-transform-es2015-arrow-f ...",l:"engineering/ast/widely-used/index.html#初露锋芒-手写简易版babel-plugin-transform-es2015-arrow-functions",a:"初露锋芒-手写简易版babel-plugin-transform-es2015-arrow-functions"},"64.14":{t:"崭露头角：手写复杂版babel-plugin-transform-es2015-arrow-functions",p:`在上面中，我们虽然实现了基本的转换，但还有一些场景并没有考虑进来：

比如箭头函数使用简写的语法，该如何处理？
比如箭头函数 ...`,l:"engineering/ast/widely-used/index.html#崭露头角-手写复杂版babel-plugin-transform-es2015-arrow-functions",a:"崭露头角-手写复杂版babel-plugin-transform-es2015-arrow-functions"},"64.15":{t:"初战告捷：手写一个`console.log`插件",p:"场景：在开发阶段，我们通常会打印一些console.log进行调试。但随着项目的日常迭代，console.log也越来越多， ...",l:"engineering/ast/widely-used/index.html#初战告捷-手写一个-console-log-插件",a:"初战告捷-手写一个-console-log-插件"},"64.16":{t:"大展身手：手写监控系统中的日志上传插件",p:"场景：在监控系统的日志上传过程中，我们需要往每个函数的作用域中添加一行日志执行函数，也就是这样（但这里要注意的是，函数的定义 ...",l:"engineering/ast/widely-used/index.html#大展身手-手写监控系统中的日志上传插件",a:"大展身手-手写监控系统中的日志上传插件"},"64.17":{t:"大展神威：实现简易版`ESLint`",p:"相信大家在工作中都肯定使用过 ESLint，今天我们就来扒一扒它的工作原理。本节会带着大家手写一个简易版的ESLint，整体 ...",l:"engineering/ast/widely-used/index.html#大展神威-实现简易版-eslint",a:"大展神威-实现简易版-eslint"},"64.18":{t:"一鸣惊人：实现代码压缩",p:`代码压缩一般是在项目打包上线阶段做的，平时大家可能更多的是直接使用插件，今天也来趴一趴它的工作原理。
压缩其实也很简单，就是 ...`,l:"engineering/ast/widely-used/index.html#一鸣惊人-实现代码压缩",a:"一鸣惊人-实现代码压缩"},"64.19":{t:"厚积薄发：实现按需加载插件",p:`相信大家在工作中肯定都用过 Lodash 这个工具库，它是一个一致性、模块化、高性能的 JavaScript 实用工具库。
 ...`,l:"engineering/ast/widely-used/index.html#厚积薄发-实现按需加载插件",a:"厚积薄发-实现按需加载插件"},"64.20":{t:"一战成名：实现`TypeScript`的类型校验",p:`此节难度较高，还是有一定的难度，不过既然大家都能坚持到这里，相信一定也没有问题！！！
这里先说一个题外话，项目中做TS文件的 ...`,l:"engineering/ast/widely-used/index.html#一战成名-实现-typescript-的类型校验",a:"一战成名-实现-typescript-的类型校验"},"64.21":{t:"赋值场景",p:`源代码：
var age:number=&quot;12&quot;;


校验思路：

第一步：获取拿到声明的类型（num ...`,l:"engineering/ast/widely-used/index.html#赋值场景",a:"赋值场景"},"64.22":{t:"先声明再赋值场景",p:`源代码：
let sourceCode = \`
  var age:number;
  age = &quot;12&quo ...`,l:"engineering/ast/widely-used/index.html#先声明再赋值场景",a:"先声明再赋值场景"},"64.23":{t:"泛型场景",p:`由于整体较复杂，我们此小节不写代码，整体理解思路即可，重在理解。
源代码：
  function join&lt;T, W& ...`,l:"engineering/ast/widely-used/index.html#泛型场景",a:"泛型场景"},"64.24":{t:"1、尽量避免遍历抽象语法树（AST）",p:`遍历 AST 的代价很昂贵，并且很容易做出非必要的遍历，可能是数以千计甚或上万次的多余操作。
Babel 尽可能的对此做出了 ...`,l:"engineering/ast/widely-used/index.html#_1、尽量避免遍历抽象语法树-ast",a:"_1、尽量避免遍历抽象语法树-ast"},"64.25":{t:"2、优化嵌套的访问者对象",p:`当你嵌套访问者时，直接把它们嵌套式的写进代码里看起来很合理。
const MyVisitor = {
  FunctionD ...`,l:"engineering/ast/widely-used/index.html#_2、优化嵌套的访问者对象",a:"_2、优化嵌套的访问者对象"},"64.26":{t:"3、留意嵌套结构",p:`有时候在考虑一些转换时，你可能会忘记某些结构是可以嵌套的。
举例来说，假设我们要从 Foo ClassDeclaration ...`,l:"engineering/ast/widely-used/index.html#_3、留意嵌套结构",a:"_3、留意嵌套结构"},"65.0":{t:"# GitLab CI 从入门到实践",p:"",l:"engineering/cicd/gitlab-cicd/index.html",a:"gitlab-ci-从入门到实践"},"65.1":{t:"一、Gitlab CI 是什么？",p:"现代持续的软件开发导致了开发者需要持续的build, test 和 deploy 重复的代码更改，这些重复的过程非常的繁琐， ...",l:"engineering/cicd/gitlab-cicd/index.html#一、gitlab-ci-是什么",a:"一、gitlab-ci-是什么"},"65.2":{t:"二、如何使用？",p:"",l:"engineering/cicd/gitlab-cicd/index.html#二、如何使用",a:"二、如何使用"},"65.3":{t:"Gitlab CI的使用主要需要2大步骤",p:"",l:"engineering/cicd/gitlab-cicd/index.html#gitlab-ci的使用主要需要2大步骤",a:"gitlab-ci的使用主要需要2大步骤"},"65.4":{t:"步骤一：配置runner",p:`
我们可以简单的把Gitlab runner给理解成.gitlab-ci.yml 文件内容的执行者，.gitlab-ci.y ...`,l:"engineering/cicd/gitlab-cicd/index.html#步骤一-配置runner",a:"步骤一-配置runner"},"65.5":{t:" ",p:"",l:"engineering/cicd/gitlab-cicd/index.html#",a:""},"65.6":{t:"使用shared runner",p:`无需多余操作，请确保shared runner选项被enable了即可直接使用公共runner。（如下）
!图片



`,l:"engineering/cicd/gitlab-cicd/index.html#使用shared-runner",a:"使用shared-runner"},"65.7":{t:" ",p:"",l:"engineering/cicd/gitlab-cicd/index.html#",a:""},"65.8":{t:"自己配置runner",p:`
部署Gitlab runner官方文档：Run GitLab Runner in a container | GitLab ...`,l:"engineering/cicd/gitlab-cicd/index.html#自己配置runner",a:"自己配置runner"},"65.9":{t:"A. 安装docker",p:`brew install --cask docker

`,l:"engineering/cicd/gitlab-cicd/index.html#a-安装docker",a:"a-安装docker"},"65.10":{t:"B. 启动Gitlab runner container",p:`起一个docker container来执行Gitlab Runner镜像
  docker run -d --name g ...`,l:"engineering/cicd/gitlab-cicd/index.html#b-启动gitlab-runner-container",a:"b-启动gitlab-runner-container"},"65.11":{t:"C. 注册runner到Gitlab",p:"只用docker起一个gitlab runner不能将我们当前使用的gitlab repository和上一步创建的runn ...",l:"engineering/cicd/gitlab-cicd/index.html#c-注册runner到gitlab",a:"c-注册runner到gitlab"},"65.12":{t:"步骤二：创建`.gitlab-ci.yml`文件",p:`
在mono repo的根目录创建一个文件, 命名为.gitlab-ci.yml, 并将其push到master分支。
gi ...`,l:"engineering/cicd/gitlab-cicd/index.html#步骤二-创建-gitlab-ci-yml-文件",a:"步骤二-创建-gitlab-ci-yml-文件"},"65.13":{t:"三、如何编写.gitlab-ci.yml文件？",p:`首先，让我们先来熟悉下yaml的常见写法，以及对比下它与json有什么不同。
Yaml Syntax写法详情具体请见 =&g ...`,l:"engineering/cicd/gitlab-cicd/index.html#三、如何编写-gitlab-ci-yml文件",a:"三、如何编写-gitlab-ci-yml文件"},"65.14":{t:"YAML语法",p:"",l:"engineering/cicd/gitlab-cicd/index.html#yaml语法",a:"yaml语法"},"65.15":{t:"数组写法",p:`{
    &quot;array&quot;: [&quot;red&quot;, &quot;blue&quot;, & ...`,l:"engineering/cicd/gitlab-cicd/index.html#数组写法",a:"数组写法"},"65.16":{t:"对象写法",p:`{
  &quot;student1&quot;: {
    &quot;name&quot;: &quot;小明&quo ...`,l:"engineering/cicd/gitlab-cicd/index.html#对象写法",a:"对象写法"},"65.17":{t:"流水线环节梳理",p:`流水线的流程，根据配置的.gitlab-ci.yml文件可以分为如下几个环节：


在单个的流水线任务执行之前进行配置


 ...`,l:"engineering/cicd/gitlab-cicd/index.html#流水线环节梳理",a:"流水线环节梳理"},"65.18":{t:"结构图",p:`!图片
单个流水线任务的形式可以参考如下示例，具体字段释义可以暂时忽略，会在之后详解：
# 这个my_job的任务名是可以自 ...`,l:"engineering/cicd/gitlab-cicd/index.html#结构图",a:"结构图"},"65.19":{t:"script",p:`需要被运行的脚本。以数组形式配置。
pipeline_job:
  ......
  script:
    - cd &l ...`,l:"engineering/cicd/gitlab-cicd/index.html#script",a:"script"},"65.20":{t:"before\\_script",p:`在所有的流水线任务执行之前需要执行的脚本，或者单个流水线任务中的script执行之前执行某些script
`,l:"engineering/cicd/gitlab-cicd/index.html#before-script",a:"before-script"},"65.21":{t:"variables变量",p:`在Gitlab-CI中，变量大致可分为三类：


Gitlab给我们预先定义的变量，比如CI_COMMIT_BRANCH.
 ...`,l:"engineering/cicd/gitlab-cicd/index.html#variables变量",a:"variables变量"},"65.22":{t:"image",p:"CI流水线运行环境的docker镜像(任何相关的代码运行环境镜像皆可)，比如字节某内部工具e***的镜像，里面装了nvm管理 ...",l:"engineering/cicd/gitlab-cicd/index.html#image",a:"image"},"65.23":{t:"stages",p:"Gitlab CI允许我们进行自定义的流水线阶段配置，我们可以将自己的流水线自我划分为若干stages，然后在不同的stag ...",l:"engineering/cicd/gitlab-cicd/index.html#stages",a:"stages"},"65.24":{t:"stage",p:`stage为stages的一个子项，在我们自定义单个流水线任务时可以配置
`,l:"engineering/cicd/gitlab-cicd/index.html#stage",a:"stage"},"65.25":{t:"cache",p:`缓存多个流水线任务之间共用的文件，目录， etc...
cache:
  key: cache-node-modules
  ...`,l:"engineering/cicd/gitlab-cicd/index.html#cache",a:"cache"},"65.26":{t:"retry",p:`一个job可以被重新执行的最大数量。必须是个正整数, 0-2, 2为最大值
when可设置在特定失败原因的情况下执行
job ...`,l:"engineering/cicd/gitlab-cicd/index.html#retry",a:"retry"},"65.27":{t:"only & except only: 设置流水线任务执行时机",p:`
except: 设置流水线任务不执行时机

可配置选项（常用的几个）：



&lt;分支名&gt;
特定分支change ...`,l:"engineering/cicd/gitlab-cicd/index.html#only-except-only-设置流水线任务执行时机",a:"only-except-only-设置流水线任务执行时机"},"65.28":{t:"rules:if",p:`此字段可以在单个流水线job或者workflow字段下进行配置。
rules关键词下可以进行if语句配置，如果if满足的话可 ...`,l:"engineering/cicd/gitlab-cicd/index.html#rules-if",a:"rules-if"},"65.29":{t:"workflow",p:"需要和rules配合用来控制整个pipeline的行为，比如整个流水线执行与否。整个流水线正常运行的前提是其rules配置中 ...",l:"engineering/cicd/gitlab-cicd/index.html#workflow",a:"workflow"},"65.30":{t:"when",p:`这个关键字和stage需要配合使用。如果一个stage fail掉了，那么我们应该期待下个stage怎么办呢？
(When  ...`,l:"engineering/cicd/gitlab-cicd/index.html#when",a:"when"},"65.31":{t:"tags",p:`这个是设定Gitlab 在执行脚本时使用哪个runner
`,l:"engineering/cicd/gitlab-cicd/index.html#tags",a:"tags"},"65.32":{t:"注意事项",p:"配置时有些关键字比如workflow，rules什么的会显示报错 XXX config conatins unknown k ...",l:"engineering/cicd/gitlab-cicd/index.html#注意事项",a:"注意事项"},"65.33":{t:"模块化写法",p:`
随着流水线任务的变多，把所有的任务都写在.gitlab-ci.yml文件中会显得很臃肿
解决方法是拆分多个任务到不同的模块 ...`,l:"engineering/cicd/gitlab-cicd/index.html#模块化写法",a:"模块化写法"},"65.34":{t:"四、Demo配置+运行示例",p:`
下面让我们来配合运行示例看一看文件配置是如何生效的

`,l:"engineering/cicd/gitlab-cicd/index.html#四、demo配置-运行示例",a:"四、demo配置-运行示例"},"65.35":{t:"流水线Demo1(基础用法)",p:`# .gitlab-ci.yml
# 镜像为node的环境镜像，如果用的是别的环境可以更改为别的项目环境的镜像
image: ...`,l:"engineering/cicd/gitlab-cicd/index.html#流水线demo1-基础用法",a:"流水线demo1-基础用法"},"65.36":{t:"流水线Demo2(详细示例)",p:`# .gitlab-ci.yml
image: node:latest
# # 在运行所有任务之前执行如下脚本
before ...`,l:"engineering/cicd/gitlab-cicd/index.html#流水线demo2-详细示例",a:"流水线demo2-详细示例"},"66.0":{t:"# gitlab CiCd",p:"",l:"engineering/cicd/gitlab-cicd-start/index.html",a:"gitlab-cicd"},"66.1":{t:"GitLabCI",p:`
轻量级，不需要复杂的安装手段。
配置简单，与gitlab可直接适配。
实时构建日志十分清晰，UI交互体验很好
使用 YAM ...`,l:"engineering/cicd/gitlab-cicd-start/index.html#gitlabci",a:"gitlabci"},"66.2":{t:"CI  持续集成",p:`
合并开发人员正在开发编写的所有代码一种做法
一天之内多次合并提交代码
从存储库货生产环境中进行构建和自动化测试 保证没有问 ...`,l:"engineering/cicd/gitlab-cicd-start/index.html#ci-持续集成",a:"ci-持续集成"},"66.3":{t:"CD 连续交付",p:`
通常可以自动将更改自动推送到 发布系统 随时软件发布到生产环境
持续部署 会更进一步  并自动将更改推送到生产中。

会在 ...`,l:"engineering/cicd/gitlab-cicd-start/index.html#cd-连续交付",a:"cd-连续交付"},"66.4":{t:"大致可以分为几个阶段",p:`
第一阶段  编译阶段

一般都会先build 开始编译
代码测试 单元测试
可以在本阶段进行 打包 在第二阶段直接用 但是 ...`,l:"engineering/cicd/gitlab-cicd-start/index.html#大致可以分为几个阶段",a:"大致可以分为几个阶段"},"67.0":{t:"# 基于GitLab+docker的前端自动化构建部署(CI/CD)流程",p:`什么是CI/CD？
CICD 是 持续集成（Continuous Integration）和持续部署（Continuous  ...`,l:"engineering/cicd/gitlab-docker-cicd/index.html",a:"基于gitlab-docker的前端自动化构建部署-ci-cd-流程"},"67.1":{t:"持续集成：CI",p:"持续集成指在和向远程仓库 push 代码后，在这次提交合并入主分支前进行一系列测试，构建等流程。假设现在有个应用的代码存储在 ...",l:"engineering/cicd/gitlab-docker-cicd/index.html#持续集成-ci",a:"持续集成-ci"},"67.2":{t:"持续部署：CD",p:"持续部署在持续集成的基础上更进一步，指将推送指仓库默认分支的部署至产品环境。如果这部分需要手动触发，这就是一个持续交付（Co ...",l:"engineering/cicd/gitlab-docker-cicd/index.html#持续部署-cd",a:"持续部署-cd"},"67.3":{t:"1.首先用docker+nginx部署项目",p:`docker下配置nginx部署vue项目步骤：
1.docker pull nginx 下载nginx
2.在/data  ...`,l:"engineering/cicd/gitlab-docker-cicd/index.html#_1-首先用docker-nginx部署项目",a:"_1-首先用docker-nginx部署项目"},"67.4":{t:"2.在gitlab新建的项目的CI/CD配置中填写需要发布到服务器的相关信息",p:`

`,l:"engineering/cicd/gitlab-docker-cicd/index.html#_2-在gitlab新建的项目的ci-cd配置中填写需要发布到服务器的相关信息",a:"_2-在gitlab新建的项目的ci-cd配置中填写需要发布到服务器的相关信息"},"67.5":{t:"2.1Gitlab上项目中CI/CD中的variables变量配置（用在.yml里的，防止代码中泄露服务器信息）",p:`!
`,l:"engineering/cicd/gitlab-docker-cicd/index.html#_2-1gitlab上项目中ci-cd中的variables变量配置-用在-yml里的-防止代码中泄露服务器信息",a:"_2-1gitlab上项目中ci-cd中的variables变量配置-用在-yml里的-防止代码中泄露服务器信息"},"67.6":{t:"2.2接下来在服务器上操作，配置免密登录",p:"生产密钥对: ssh-keygen -t rsa，配置让gitlab服务器和前端代码服务器之间可以免密登录具体免密登录操作如 ...",l:"engineering/cicd/gitlab-docker-cicd/index.html#_2-2接下来在服务器上操作-配置免密登录",a:"_2-2接下来在服务器上操作-配置免密登录"},"67.7":{t:"2.3服务器上用docker安装gitlab-runner",p:`用docker安装gitlab-runner:
docker pull gitlab/gitlab-runner:lates ...`,l:"engineering/cicd/gitlab-docker-cicd/index.html#_2-3服务器上用docker安装gitlab-runner",a:"_2-3服务器上用docker安装gitlab-runner"},"67.8":{t:"2.4服务器上用docker注册gitlab-runner",p:`! docker注册runner
docker run --rm -t -i -v /srv/gitlab-runner/c ...`,l:"engineering/cicd/gitlab-docker-cicd/index.html#_2-4服务器上用docker注册gitlab-runner",a:"_2-4服务器上用docker注册gitlab-runner"},"67.9":{t:"3.将你所需要发布的项目下新建一个.gitlab-ci.yml文件，让gitlab去执行自动化流程",p:`!
`,l:"engineering/cicd/gitlab-docker-cicd/index.html#_3-将你所需要发布的项目下新建一个-gitlab-ci-yml文件-让gitlab去执行自动化流程",a:"_3-将你所需要发布的项目下新建一个-gitlab-ci-yml文件-让gitlab去执行自动化流程"},"67.10":{t:"3.1gitlab-ci.yml文件",p:`//做缓存的
cache:
  key: \${CI_PROJECT_NAME}
  paths:
    - node_mo ...`,l:"engineering/cicd/gitlab-docker-cicd/index.html#_3-1gitlab-ci-yml文件",a:"_3-1gitlab-ci-yml文件"},"67.11":{t:"3.2变量说明",p:`SERVER_DEMO_HOST：目标CICD服务器IP地址
SERVER_DEMO_PATH：服务器上nginx指向的静态 ...`,l:"engineering/cicd/gitlab-docker-cicd/index.html#_3-2变量说明",a:"_3-2变量说明"},"67.12":{t:"3.3注意",p:"在webpack项目中配置导出的文件名为你需要同步的文件夹的名称，并且访问路径按需为相对路径，或者绝对路径，具体看项目需求。 ...",l:"engineering/cicd/gitlab-docker-cicd/index.html#_3-3注意",a:"_3-3注意"},"67.13":{t:"4.打包构建，提交代码，触发钩子执行自动化构建发布",p:`

`,l:"engineering/cicd/gitlab-docker-cicd/index.html#_4-打包构建-提交代码-触发钩子执行自动化构建发布",a:"_4-打包构建-提交代码-触发钩子执行自动化构建发布"},"67.14":{t:"提交代码触发CI/CD流程",p:`然后在gitlab项目中的CI/CD流水线中能看到自己的刚刚触发的CI/CD任务，如下图所示
`,l:"engineering/cicd/gitlab-docker-cicd/index.html#提交代码触发ci-cd流程",a:"提交代码触发ci-cd流程"},"67.15":{t:"!image.png",p:`点击状态或者阶段都可以进入构建发布详情页面查看内容
!image.png
`,l:"engineering/cicd/gitlab-docker-cicd/index.html#image-png",a:"image-png"},"67.16":{t:"构建：build",p:`!image.png
`,l:"engineering/cicd/gitlab-docker-cicd/index.html#构建-build",a:"构建-build"},"67.17":{t:"发布：deploy",p:`!image.png
至此，大功告成，妈妈再也不用担心我发布线上代码耗费时间和出错了
自动化构建发布（CI/CD）的优势
项 ...`,l:"engineering/cicd/gitlab-docker-cicd/index.html#发布-deploy",a:"发布-deploy"},"68.0":{t:"# 基于 Docker ( Gitlab、Gitlab Runner ) 搭建一整套自动化CI、CD流程，完成从代码提交到自动打包编译到自动部署运行",p:"",l:"engineering/cicd/gitlab-two-docker-cicd/index.html",a:"基于-docker-gitlab、gitlab-runner-搭建一整套自动化ci、cd流程-完成从代码提交到自动打包编译到自动部署运行"},"68.1":{t:"一、安装 Docker",p:`linux服务器使用curl下载快速安装的shell脚本
curl -fsSL get.docker.com -o get- ...`,l:"engineering/cicd/gitlab-two-docker-cicd/index.html#一、安装-docker",a:"一、安装-docker"},"68.2":{t:"二、基于 Docker 安装 Gitlab",p:"",l:"engineering/cicd/gitlab-two-docker-cicd/index.html#二、基于-docker-安装-gitlab",a:"二、基于-docker-安装-gitlab"},"68.3":{t:"1\\. 一键安装命令",p:`docker run --detach \\
  --hostname localhost \\
  --publish 443 ...`,l:"engineering/cicd/gitlab-two-docker-cicd/index.html#_1-一键安装命令",a:"_1-一键安装命令"},"68.4":{t:"2\\. 安装完成后通过域名或服务器ip访问",p:`通过root用户登陆
root用户默认密码，通过
docker exec -it gitlab sh

shell命令方式进 ...`,l:"engineering/cicd/gitlab-two-docker-cicd/index.html#_2-安装完成后通过域名或服务器ip访问",a:"_2-安装完成后通过域名或服务器ip访问"},"68.5":{t:"三、基于 Docker 安装 Gitlab Runner、",p:`Gitlab Runner 就是提供我们的CI、CD能力的工具。
`,l:"engineering/cicd/gitlab-two-docker-cicd/index.html#三、基于-docker-安装-gitlab-runner、",a:"三、基于-docker-安装-gitlab-runner、"},"68.6":{t:"1\\. 一键安装运行 Gitlab Runner",p:`docker run -d --name gitlab-runner --restart always \\
  -v /ho ...`,l:"engineering/cicd/gitlab-two-docker-cicd/index.html#_1-一键安装运行-gitlab-runner",a:"_1-一键安装运行-gitlab-runner"},"68.7":{t:"2\\. 查看Gitlab Runner配置信息",p:"安装好Gitlab Runner后，它只是在容器内运行的一个服务，我们需要让它与Gitlab关联起来，此时需要注册Gitla ...",l:"engineering/cicd/gitlab-two-docker-cicd/index.html#_2-查看gitlab-runner配置信息",a:"_2-查看gitlab-runner配置信息"},"68.8":{t:"3\\. 注册Gitlab Runner",p:`运行注册命令
docker run --rm -v /home/gitlab-runner/config:/etc/gitl ...`,l:"engineering/cicd/gitlab-two-docker-cicd/index.html#_3-注册gitlab-runner",a:"_3-注册gitlab-runner"},"68.9":{t:"四、编写 .gitlab-ci.yml 提供CI、CD配置项",p:"",l:"engineering/cicd/gitlab-two-docker-cicd/index.html#四、编写-gitlab-ci-yml-提供ci、cd配置项",a:"四、编写-gitlab-ci-yml-提供ci、cd配置项"},"68.10":{t:"1\\. 提供前端编译、构建功能",p:`在项目根目录下创建一个.gitlab-ci.yml的文件，写入如下
image: node:16.13.2-slim

st ...`,l:"engineering/cicd/gitlab-two-docker-cicd/index.html#_1-提供前端编译、构建功能",a:"_1-提供前端编译、构建功能"},"68.11":{t:"2\\. nginx配置文件编写",p:`在项目根目录创建nginx.conf文件，把这个文件复制到容器内作为nginx配置文件，写入以下内容
server {
   ...`,l:"engineering/cicd/gitlab-two-docker-cicd/index.html#_2-nginx配置文件编写",a:"_2-nginx配置文件编写"},"68.12":{t:"3\\. Dockerfile文件编写",p:`在项目根目录下创建Dockerfile文件，runner会根据这个文件创建一个的docker镜像，文件写入以下内容
FROM ...`,l:"engineering/cicd/gitlab-two-docker-cicd/index.html#_3-dockerfile文件编写",a:"_3-dockerfile文件编写"},"68.13":{t:"4\\. 使用docker自动部署前端项目",p:`首先是.gitlab-ci.yml文件编写
image: node:16.13.2-slim

stages: # 分段
  ...`,l:"engineering/cicd/gitlab-two-docker-cicd/index.html#_4-使用docker自动部署前端项目",a:"_4-使用docker自动部署前端项目"},"69.0":{t:"# Eslint + Prettier + Husky + Commitlint+ Lint-staged 规范前端工程代码规范",p:"",l:"engineering/code-specification/index.html",a:"eslint-prettier-husky-commitlint-lint-staged-规范前端工程代码规范"},"69.1":{t:"1.代码规范",p:"",l:"engineering/code-specification/index.html#_1-代码规范",a:"_1-代码规范"},"69.2":{t:"代码检查工具",p:`Eslint 项目集成
npm i eslint -D

npx eslint --init


init 命令会自动生成  ...`,l:"engineering/code-specification/index.html#代码检查工具",a:"代码检查工具"},"69.3":{t:"代码风格工具",p:`prettier 项目集成
npm i prettier eslint-config-prettier eslint-plu ...`,l:"engineering/code-specification/index.html#代码风格工具",a:"代码风格工具"},"69.4":{t:"2.git规范",p:"Git 有很多的 hooks, 让我们在不同的阶段,对代码进行不同的操作,控制提交到仓库的代码的规范性,和准确性, 以下只是 ...",l:"engineering/code-specification/index.html#_2-git规范",a:"_2-git规范"},"69.5":{t:"2.1 提交的代码规范",p:`pre-commit 描述: 通过钩子函数,判断提交的代码是否符合规范
`,l:"engineering/code-specification/index.html#_2-1-提交的代码规范",a:"_2-1-提交的代码规范"},"69.6":{t:"2.2 提交的信息规范",p:`commit-msg 描述: 通过钩子函数,判断 commit 信息是否符合规范
`,l:"engineering/code-specification/index.html#_2-2-提交的信息规范",a:"_2-2-提交的信息规范"},"69.7":{t:"2.3 提交的代码影响",p:`pre-push 描述: 通过钩子,执行测试,避免对以前的内容造成影响
`,l:"engineering/code-specification/index.html#_2-3-提交的代码影响",a:"_2-3-提交的代码影响"},"69.8":{t:"工具",p:`husky 操作 git 钩子的工具
lint-staged 本地暂存代码检查工具
commitlint commit 信息 ...`,l:"engineering/code-specification/index.html#工具",a:"工具"},"69.9":{t:"安装流程",p:`
1.安装代码校验依赖

npm i lint-staged husky -D

在package.json中添加脚本
np ...`,l:"engineering/code-specification/index.html#安装流程",a:"安装流程"},"69.10":{t:"类型 描述",p:`
build 编译相关的修改，例如发布版本、对项目构建或者依赖的改动
chore 其他修改, 比如改变构建流程、或者增加依赖 ...`,l:"engineering/code-specification/index.html#类型-描述",a:"类型-描述"},"69.11":{t:"3.测试",p:"",l:"engineering/code-specification/index.html#_3-测试",a:"_3-测试"},"69.12":{t:"单元测试",p:`jest 测试三部曲
input&amp;output
`,l:"engineering/code-specification/index.html#单元测试",a:"单元测试"},"69.13":{t:"配置jest 前往 jest 文档,根据需求添加内容",p:`
www.jestjs.cn/docs/gettin…
提交代码的测试运行

npx husky add .husky/pr ...`,l:"engineering/code-specification/index.html#配置jest-前往-jest-文档-根据需求添加内容",a:"配置jest-前往-jest-文档-根据需求添加内容"},"70.0":{t:"# GitHub Pages部署报错：JavaScript heap out of memory",p:`!image-20220309180119580
经过百度，发现原因是node使用的堆内存超出了V8引擎允许的最大值。
分析 ...`,l:"engineering/deployment/pages-js-memory/index.html",a:"github-pages部署报错-javascript-heap-out-of-memory"},"71.0":{t:"# Git Submodules 介绍",p:"",l:"engineering/git/Submodules/index.html",a:"git-submodules-介绍"},"71.1":{t:"特点",p:`
因为暴露的是源代码，引用方必须有子模块的读权限，所以适合团队内、组织内协作或个人开发。
通常允许引用方开发者修改子模块代码 ...`,l:"engineering/git/Submodules/index.html#特点",a:"特点"},"71.2":{t:"适用场景",p:`
团队、组织内部协作。
引用方时常需要修改共享代码。

`,l:"engineering/git/Submodules/index.html#适用场景",a:"适用场景"},"71.3":{t:"为什么有 submodules？",p:"解决公共代码问题。如果某些文件，在项目A和项目B中都会用到，例如组件库，那么这些文件可以作为 submodules 来管理， ...",l:"engineering/git/Submodules/index.html#为什么有-submodules",a:"为什么有-submodules"},"71.4":{t:"了解 Git Submodules",p:`有2个概念：主项目、submodule（子模块）。这两者各自都是完整的 Git 仓库。
`,l:"engineering/git/Submodules/index.html#了解-git-submodules",a:"了解-git-submodules"},"71.5":{t:"如何让一个Git仓库变为另一个Git仓库的 submodule",p:`
创建Git仓库A。
创建Git仓库B。
在Git仓库A中，通过git submodule add ...(仓库B的地址，即 ...`,l:"engineering/git/Submodules/index.html#如何让一个git仓库变为另一个git仓库的-submodule",a:"如何让一个git仓库变为另一个git仓库的-submodule"},"71.6":{t:"注意事项",p:"执行操作后，会在当前父项目下新建个文件夹，名字就是 submodule 仓库的名字。这个文件夹里面的内容，是 submodu ...",l:"engineering/git/Submodules/index.html#注意事项",a:"注意事项"},"71.7":{t:"submodule 的父子关系存在哪里",p:`关系是保存在主项目的 Git 仓库中。
被当作 submodule 的 Git 仓库，其实不知道自己变成了 submodul ...`,l:"engineering/git/Submodules/index.html#submodule-的父子关系存在哪里",a:"submodule-的父子关系存在哪里"},"71.8":{t:"submodule 的父子关系信息怎么存",p:`.gitmodules 文件
父子关系的信息保存在主项目的 .gitmodules 文件，如果不是新加 submodule， ...`,l:"engineering/git/Submodules/index.html#submodule-的父子关系信息怎么存",a:"submodule-的父子关系信息怎么存"},"71.9":{t:"submodule 的版本号",p:`主项目还保存了对应 submodule 的版本号（commit id），没有冗余存储 submodule 的代码。
`,l:"engineering/git/Submodules/index.html#submodule-的版本号",a:"submodule-的版本号"},"71.10":{t:"submodule 开发常用操作",p:"",l:"engineering/git/Submodules/index.html#submodule-开发常用操作",a:"submodule-开发常用操作"},"71.11":{t:"如何给 submodule 仓库提交更新",p:"",l:"engineering/git/Submodules/index.html#如何给-submodule-仓库提交更新",a:"如何给-submodule-仓库提交更新"},"71.12":{t:"方法一，像普通仓库一样更新",p:`之前说过，submodule 仓库也是个普通的 Git 仓库，它并不知道自己有多少个爸爸。
我们可以直接git clone  ...`,l:"engineering/git/Submodules/index.html#方法一-像普通仓库一样更新",a:"方法一-像普通仓库一样更新"},"71.13":{t:"方法二，在主项目中更新",p:`例如主项目在文件夹A，A里面包含：
.git文件夹
READMD.md主项目的ReadMe文件。
B文件夹，是个 submo ...`,l:"engineering/git/Submodules/index.html#方法二-在主项目中更新",a:"方法二-在主项目中更新"},"71.14":{t:"注意事项",p:"当你在文件夹B中做commit后，文件夹B里面就有了新的 commit id。此时主项目A中所记录的 submodule 的 ...",l:"engineering/git/Submodules/index.html#注意事项",a:"注意事项"},"71.15":{t:"如何在主项目仓库，拉取 submodule 的更新",p:"",l:"engineering/git/Submodules/index.html#如何在主项目仓库-拉取-submodule-的更新",a:"如何在主项目仓库-拉取-submodule-的更新"},"71.16":{t:"方法一，cd submodule 后 git pull",p:`在 submodule 中，所有git操作就当作一个普通的 Git 仓库就行，你可以切换分支、提交代码、拉取更新等。
这个方 ...`,l:"engineering/git/Submodules/index.html#方法一-cd-submodule-后-git-pull",a:"方法一-cd-submodule-后-git-pull"},"71.17":{t:"方法二，主项目执行git submodule update --remote [submodule文件夹相对路径]",p:`这个方法会自动拉取submodule的主分支（通常叫master或main）的最新版本。效果跟方法一一致。
如果你不带参数[ ...`,l:"engineering/git/Submodules/index.html#方法二-主项目执行git-submodule-update-remote-submodule文件夹相对路径",a:"方法二-主项目执行git-submodule-update-remote-submodule文件夹相对路径"},"71.18":{t:"注意事项，更新后需提交主项目变更",p:`当我们更新子项目后，相当于是把主项目记录的 submodule 的 commit id 给更新了，需要提交下主项目的变更。
`,l:"engineering/git/Submodules/index.html#注意事项-更新后需提交主项目变更",a:"注意事项-更新后需提交主项目变更"},"71.19":{t:"方法三，主项目执行 git submodule update [submodule文件夹相对路径]",p:"注意，这个方法会使 submodule 的分支处于主项目里指定的 commit id。可能并不是拉 submodule 的  ...",l:"engineering/git/Submodules/index.html#方法三-主项目执行-git-submodule-update-submodule文件夹相对路径",a:"方法三-主项目执行-git-submodule-update-submodule文件夹相对路径"},"71.20":{t:"如何 clone 包含 submodule 的仓库",p:"",l:"engineering/git/Submodules/index.html#如何-clone-包含-submodule-的仓库",a:"如何-clone-包含-submodule-的仓库"},"71.21":{t:"方法一，按需clone submodule",p:`
先git clone 主项目仓库并进入主项目文件夹，这时候submodule的文件夹都是空的。
执行git submodu ...`,l:"engineering/git/Submodules/index.html#方法一-按需clone-submodule",a:"方法一-按需clone-submodule"},"71.22":{t:"合并第2、3步骤",p:`第2、3步可以合并。使用以下命令：
git submodule update --init [submodule的文件夹的相 ...`,l:"engineering/git/Submodules/index.html#合并第2、3步骤",a:"合并第2、3步骤"},"71.23":{t:"方法二，一次性clone所有 submodule",p:`
先git clone 主项目仓库，这时候submodule的文件夹都是空的。
执行git submodule init。
 ...`,l:"engineering/git/Submodules/index.html#方法二-一次性clone所有-submodule",a:"方法二-一次性clone所有-submodule"},"71.24":{t:"合并第2、3步骤",p:`git submodule update --init

合并第1、2、3步骤
git clone --recurse-su ...`,l:"engineering/git/Submodules/index.html#合并第2、3步骤",a:"合并第2、3步骤"},"71.25":{t:"如何创建 submodule 关系",p:`cd到主项目，执行：
git submodule add ...(另一仓库地址，即git clone时后面那串东西)

下面 ...`,l:"engineering/git/Submodules/index.html#如何创建-submodule-关系",a:"如何创建-submodule-关系"},"72.0":{t:"# Actions",p:`GitHub Actions
GitHub Actions 是一个持续集成 (Continuous integration) ...`,l:"engineering/github/actions/index.html",a:"actions"},"72.1":{t:"Workflows（工作流）",p:"工作流是一个可配置的自动化的程序。创建一个工作流，你需要定义一个 YAML 文件，当你的仓库触发某个事件的时候，工作流就会运 ...",l:"engineering/github/actions/index.html#workflows-工作流",a:"workflows-工作流"},"72.2":{t:"事件（Events）",p:"事件是指仓库触发运行工作流的具体的行为，比如创建一个 pull request，新建一个 issue、或者推送一个 comm ...",l:"engineering/github/actions/index.html#事件-events",a:"事件-events"},"72.3":{t:"任务（Jobs）",p:"任务是在同一个运行器上执行的一组步骤（steps）。一个步骤（steps）要么是一个shell 脚本（script）要么是一 ...",l:"engineering/github/actions/index.html#任务-jobs",a:"任务-jobs"},"72.4":{t:"动作（Actions）",p:"动作是 GitHub Actions 平台的一个自定义的应用，它会执行一个复杂但是需要频繁重复的作业。使用动作可以减少重复代 ...",l:"engineering/github/actions/index.html#动作-actions",a:"动作-actions"},"72.5":{t:"运行器（Runners）",p:"一个运行器是一个可以运行工作流的服务。每一个运行器一次只运行一个单独的任务。GitHub 提供 Ubuntu Linux，M ...",l:"engineering/github/actions/index.html#运行器-runners",a:"运行器-runners"},"73.0":{t:"# 代码同步 Github 和 Gitee",p:`Gitee 导入仓库
上篇我们已经在 Github 创建了博客仓库，现在我们在 Gitee 绑定 Github 账号后，选择 ...`,l:"engineering/github/github-gitee/index.html",a:"代码同步-github-和-gitee"},"74.0":{t:"# 实现 npm script 跨平台兼容",p:"到目前为止，如果你在 Linux、Mac 平台做开发，所有的 npm script 都会顺利运行，但是 Windows 下面 ...",l:"engineering/npm/cross-platform/index.html",a:"实现-npm-script-跨平台兼容"},"74.1":{t:"文件系统操作的跨平台兼容",p:"npm script 中涉及到的文件系统操作包括文件和目录的创建、删除、移动、复制等操作，而社区为这些基本操作也提供了跨平台 ...",l:"engineering/npm/cross-platform/index.html#文件系统操作的跨平台兼容",a:"文件系统操作的跨平台兼容"},"74.2":{t:"第 1 步，添加开发依赖",p:`npm i rimraf cpr make-dir-cli -D
# npm install rimraf cpr make ...`,l:"engineering/npm/cross-platform/index.html#第-1-步-添加开发依赖",a:"第-1-步-添加开发依赖"},"74.3":{t:"第 2 步，改造涉及文件系统操作的 npm script",p:`  &quot;scripts&quot;: {
-    &quot;cover:cleanup&quot;: &quot ...`,l:"engineering/npm/cross-platform/index.html#第-2-步-改造涉及文件系统操作的-npm-script",a:"第-2-步-改造涉及文件系统操作的-npm-script"},"74.4":{t:"用 cross-var 引用变量",p:"",l:"engineering/npm/cross-platform/index.html#用-cross-var-引用变量",a:"用-cross-var-引用变量"},"74.5":{t:"第 1 步，安装 cross-var 为开发依赖",p:`npm i cross-var -D
# npm install cross-var --save-dev
# yarn a ...`,l:"engineering/npm/cross-platform/index.html#第-1-步-安装-cross-var-为开发依赖",a:"第-1-步-安装-cross-var-为开发依赖"},"74.6":{t:"第 2 步，改写引用变量 npm script，具体 diff 如下",p:` &quot;scripts&quot;: {
     &quot;cover:cleanup&quot;: &quot; ...`,l:"engineering/npm/cross-platform/index.html#第-2-步-改写引用变量-npm-script-具体-diff-如下",a:"第-2-步-改写引用变量-npm-script-具体-diff-如下"},"74.7":{t:"用 cross-env 设置环境变量",p:"在 node.js 脚本和 npm script 使用环境变量也是比较常见的，比如我们在运行测试时，需要加上 NODE_EN ...",l:"engineering/npm/cross-platform/index.html#用-cross-env-设置环境变量",a:"用-cross-env-设置环境变量"},"74.8":{t:"第 1 步，添加 cross-env 到开发依赖",p:`npm i cross-env -D
# npm install cross-env --save-dev
# yarn a ...`,l:"engineering/npm/cross-platform/index.html#第-1-步-添加-cross-env-到开发依赖",a:"第-1-步-添加-cross-env-到开发依赖"},"74.9":{t:"第 2 步，改写使用了环境变量的 npm script",p:`  &quot;scripts&quot;: {
-    &quot;test&quot;: &quot;NODE_ENV ...`,l:"engineering/npm/cross-platform/index.html#第-2-步-改写使用了环境变量的-npm-script",a:"第-2-步-改写使用了环境变量的-npm-script"},"74.10":{t:"关于 npm script 的跨平台兼容，还有几点需要大家注意",p:`
所有使用引号的地方，建议使用双引号，并且加上转义；
没做特殊处理的命令比如 eslint、stylelint、mocha、 ...`,l:"engineering/npm/cross-platform/index.html#关于-npm-script-的跨平台兼容-还有几点需要大家注意",a:"关于-npm-script-的跨平台兼容-还有几点需要大家注意"},"75.0":{t:"# 运行多个 npm script 的各种姿势",p:"",l:"engineering/npm/more-script/index.html",a:"运行多个-npm-script-的各种姿势"},"75.1":{t:"让多个 npm script 串行？&&",p:"在我们运行测试之前确保我们的代码都通过代码检查会是比较不错的实践，这也是让多个 npm script 串行的典型用例，实现方 ...",l:"engineering/npm/more-script/index.html#让多个-npm-script-串行",a:"让多个-npm-script-串行"},"75.2":{t:"让多个 npm script 并行？ &",p:"在严格串行的情况下，我们必须要确保代码中没有编码规范问题才能运行测试，在某些时候可能并不是我们想要的，因为我们真正需要的是， ...",l:"engineering/npm/more-script/index.html#让多个-npm-script-并行",a:"让多个-npm-script-并行"},"75.3":{t:"wait",p:`npm 内置支持的多条命令并行跟 js 里面同时发起多个异步请求非常类似，它只负责触发多条命令，而不管结果的收集
加上 wa ...`,l:"engineering/npm/more-script/index.html#wait",a:"wait"},"75.4":{t:"有没有更好的管理方式？  npm-run-all",p:`用如下命令将 npm-run-all 添加到项目依赖中：
`,l:"engineering/npm/more-script/index.html#有没有更好的管理方式-npm-run-all",a:"有没有更好的管理方式-npm-run-all"},"75.5":{t:"下载依赖",p:`npm i npm-run-all -D

`,l:"engineering/npm/more-script/index.html#下载依赖",a:"下载依赖"},"75.6":{t:"使用",p:`npm-run-all xxx1 xxx2 xxx3

npm-run-all 还支持通配符匹配分组的 npm script ...`,l:"engineering/npm/more-script/index.html#使用",a:"使用"},"75.7":{t:"如何让多个 npm script 并行执行？",p:`npm-run-all --parallel xxx:* 

`,l:"engineering/npm/more-script/index.html#如何让多个-npm-script-并行执行",a:"如何让多个-npm-script-并行执行"},"76.0":{t:"# 用 node.js 脚本替代复杂的 npm script",p:"",l:"engineering/npm/node/index.html",a:"用-node-js-脚本替代复杂的-npm-script"},"76.1":{t:"1. 安装 shelljs 依赖",p:`使用如下命令安装 shelljs 到项目依赖中：
npm i shelljs -D

此外，我们计划使用 chalk 来给输 ...`,l:"engineering/npm/node/index.html#_1-安装-shelljs-依赖",a:"_1-安装-shelljs-依赖"},"76.2":{t:"2. 创建 Node.js 脚本",p:`touch scripts/cover.js

`,l:"engineering/npm/node/index.html#_2-创建-node-js-脚本",a:"_2-创建-node-js-脚本"},"76.3":{t:"3. 用 Node.js 实现同等功能",p:"shelljs 为我们提供了各种常见命令的跨平台支持，比如 cp、mkdir、rm、cd 等命令，此外，理论上你可以在 No ...",l:"engineering/npm/node/index.html#_3-用-node-js-实现同等功能",a:"_3-用-node-js-实现同等功能"},"77.0":{t:"# 实现命令行自动补全",p:"当 npm script 里面积累的命令越来越多时，重度命令行用户肯定会好奇，能不能实现类似 bash、zsh 里面的命令自 ...",l:"engineering/npm/npm-auto/index.html",a:"实现命令行自动补全"},"77.1":{t:"把 npm completion 集成到 shell 中",p:`npm 自身提供了自动完成工具 completion，将其集成到 bash 或者 zsh 里也非常容易
官方文档里面的集成方 ...`,l:"engineering/npm/npm-auto/index.html#把-npm-completion-集成到-shell-中",a:"把-npm-completion-集成到-shell-中"},"77.2":{t:"更高级的自动完成",p:"人类对于效率的追求是永无止境的，工程师更是如此，npm 命令补全到目前为止显然还不够高效，能不能补全 package.jso ...",l:"engineering/npm/npm-auto/index.html#更高级的自动完成",a:"更高级的自动完成"},"77.3":{t:"1. 在 npm install 时自动根据历史安装过的包给出补全建议",p:`!图片
`,l:"engineering/npm/npm-auto/index.html#_1-在-npm-install-时自动根据历史安装过的包给出补全建议",a:"_1-在-npm-install-时自动根据历史安装过的包给出补全建议"},"77.4":{t:"2. 在 npm uninstall 时候根据 package.json 里面的声明给出补全建议",p:`!图片
`,l:"engineering/npm/npm-auto/index.html#_2-在-npm-uninstall-时候根据-package-json-里面的声明给出补全建议",a:"_2-在-npm-uninstall-时候根据-package-json-里面的声明给出补全建议"},"77.5":{t:"3. 在 npm run 时补全建议中列出命令细节",p:`!图片
`,l:"engineering/npm/npm-auto/index.html#_3-在-npm-run-时补全建议中列出命令细节",a:"_3-在-npm-run-时补全建议中列出命令细节"},"78.0":{t:"# npm ci和npm install区别",p:"npm大家肯定都使用过，可能会有一些不经常使用的命令，npm ci和npm install都可以用来安装依赖，他们之间有什么 ...",l:"engineering/npm/npm-ci/index.html",a:"npm-ci和npm-install区别"},"78.1":{t:"由此我们知道，当我们进行CI/CD或生产发布时，最好使用`npm ci`，它会严格按照package-lock.json中指定版本进行安装，并且会对比package-lock.json和package.json依赖，防止由错误的依赖版本造成的故障",p:"",l:"engineering/npm/npm-ci/index.html#由此我们知道-当我们进行ci-cd或生产发布时-最好使用-npm-ci-它会严格按照package-lock-json中指定版本进行安装-并且会对比package-lock-json和package-json依赖-防止由错误的依赖版本造成的故障",a:"由此我们知道-当我们进行ci-cd或生产发布时-最好使用-npm-ci-它会严格按照package-lock-json中指定版本进行安装-并且会对比package-lock-json和package-json依赖-防止由错误的依赖版本造成的故障"},"79.0":{t:"# 使用 npm script 的钩子",p:"为了方便开发者自定义，npm script 的设计者为命令的执行增加了类似生命周期的机制，具体来说就是 pre 和 post ...",l:"engineering/npm/npm-hook/index.html",a:"使用-npm-script-的钩子"},"80.0":{t:"# npm 安装流程",p:`!图片
`,l:"engineering/npm/npm-install/index.html",a:"npm-安装流程"},"80.1":{t:"第一步",p:"执行安装命令之后，npm 首先会去查找 npm 的配置信息。 其中，我们最熟悉的就是安装时候的源信息。npm 会在项目中查找 ...",l:"engineering/npm/npm-install/index.html#第一步",a:"第一步"},"80.2":{t:"第二步",p:"获取完配置文件之后，就会构建依赖树。 首先会检查下项目中是否有 package-lock.json 🔐文件：存在 lock ...",l:"engineering/npm/npm-install/index.html#第二步",a:"第二步"},"80.3":{t:"第三步",p:"在有了依赖树之后，就可以根据依赖树下载完整的依赖资源。 在下载之前，会先检查下是否有缓存资源，如果存在缓存资源的话，那么直接 ...",l:"engineering/npm/npm-install/index.html#第三步",a:"第三步"},"80.4":{t:"第四步",p:"会生成 package-lock.json 文件。 那么这个文件是干什么的呢？我们都知道，在 package.json 文件 ...",l:"engineering/npm/npm-install/index.html#第四步",a:"第四步"},"81.0":{t:"# npm plubilsh 发包",p:`前言

学会发包可以避免我们在项目开发中重复造轮子的现象；当我们开发了通用的组件或者工具库后可以将其发布到npm上，这样在我 ...`,l:"engineering/npm/npm-release/index.html",a:"npm-plubilsh-发包"},"81.1":{t:"1\\. 准备项目工程并编写组件",p:`
创建一个基础模板（这里我通过vite创建一个react模板，node版本要求：14.18+，16+ ）

npm: npm ...`,l:"engineering/npm/npm-release/index.html#_1-准备项目工程并编写组件",a:"_1-准备项目工程并编写组件"},"81.2":{t:"2\\. 配置vite.config.ts",p:`
下载path

npm: npm install path -D

or

yarn: yarn add path -D
 ...`,l:"engineering/npm/npm-release/index.html#_2-配置vite-config-ts",a:"_2-配置vite-config-ts"},"81.3":{t:"3\\. 配置npm",p:`
终端执行命令

npm init


根据命令行提示输入对应信息


package name: 包名，发到npm上的名称 ...`,l:"engineering/npm/npm-release/index.html#_3-配置npm",a:"_3-配置npm"},"81.4":{t:"4\\. 发布",p:`
没有npm账号的可以先去npm官网注册一个或者通过npm adduser命令注册
完成上面步骤后我们先登录npm账号，执行 ...`,l:"engineering/npm/npm-release/index.html#_4-发布",a:"_4-发布"},"81.5":{t:"5\\. 使用",p:`
在另一个项目中npm install 包名或者yarn add 包名
使用方式

import { XButton } f ...`,l:"engineering/npm/npm-release/index.html#_5-使用",a:"_5-使用"},"81.6":{t:"6\\. 填坑",p:`虽然包发布成功了，但是前面说过还有一些坑需要填，这些坑刚刚也看见了，都是在使用的时候出现的

样式问题


将包下载到另一个 ...`,l:"engineering/npm/npm-release/index.html#_6-填坑",a:"_6-填坑"},"81.7":{t:"7\\. 更新包",p:`
首先更新包版本npm version patch（因为我们是修复bug，所以我们只需更新修复版本号）
再次执行发包命令np ...`,l:"engineering/npm/npm-release/index.html#_7-更新包",a:"_7-更新包"},"82.0":{t:"# 在 npm script 中使用变量",p:"npm 为加高效的执行 npm script 做了大量的优化，创建并运行 npm script 命令 里面讲到的环境变量特性 ...",l:"engineering/npm/npm-var/index.html",a:"在-npm-script-中使用变量"},"82.1":{t:"使用预定义变量",p:"首先我们来看预定义变量，通过运行 npm run env 就能拿到完整的变量列表，这个列表非常长，这里我使用 npm run ...",l:"engineering/npm/npm-var/index.html#使用预定义变量",a:"使用预定义变量"},"83.0":{t:"# 文件变化时自动运行 npm script",p:"",l:"engineering/npm/npm-watch/index.html",a:"文件变化时自动运行-npm-script"},"83.1":{t:"单元测试自动化",p:"幸运的是，mocha 本身支持 --watch 参数，即在代码变化时自动重跑所有的测试，我们只需要在 scripts 对象中 ...",l:"engineering/npm/npm-watch/index.html#单元测试自动化",a:"单元测试自动化"},"83.2":{t:"代码检查自动化",p:"我们使用的代码检查工具 stylelint、eslint、jsonlint 不全支持 watch 模式，这里我们需要借助 o ...",l:"engineering/npm/npm-watch/index.html#代码检查自动化",a:"代码检查自动化"},"83.3":{t:"1. 安装项目依赖",p:`npm i onchange -D
# npm install onchange --save-dev
# yarn add ...`,l:"engineering/npm/npm-watch/index.html#_1-安装项目依赖",a:"_1-安装项目依赖"},"83.4":{t:"2. 添加 npm script",p:`按照如下提示添加 watch:lint 和 watch 两个子命令：
+    &quot;watch&quot;: &qu ...`,l:"engineering/npm/npm-watch/index.html#_2-添加-npm-script",a:"_2-添加-npm-script"},"83.5":{t:"关于改动的几点说明",p:`
watch:lint 里面的文件匹配模式可以使用通配符，但是模式两边使用了转义的双引号，这样是跨平台兼容的；
watch: ...`,l:"engineering/npm/npm-watch/index.html#关于改动的几点说明",a:"关于改动的几点说明"},"84.0":{t:"# 给 npm script 传递参数和添加注释",p:"",l:"engineering/npm/parameter-script/index.html",a:"给-npm-script-传递参数和添加注释"},"84.1":{t:"给 npm script 传递参数 --",p:"eslint 内置了代码风格自动修复模式，只需给它传入 --fix 参数即可，在 scripts 中声明检查代码命令的同时你 ...",l:"engineering/npm/parameter-script/index.html#给-npm-script-传递参数",a:"给-npm-script-传递参数"},"84.2":{t:"给 npm script 添加注释",p:"",l:"engineering/npm/parameter-script/index.html#给-npm-script-添加注释",a:"给-npm-script-添加注释"},"84.3":{t:"第一种",p:"package.json 中可以增加 // 为键的值，注释就可以写在对应的值里面，npm 会忽略这种键，比如，我们想要给 t ...",l:"engineering/npm/parameter-script/index.html#第一种",a:"第一种"},"84.4":{t:"第二种",p:"直接在 script 声明中做手脚，因为命令的本质是 shell 命令（适用于 linux 平台），我们可以在命令前面加上注 ...",l:"engineering/npm/parameter-script/index.html#第二种",a:"第二种"},"84.5":{t:"调整 npm script 运行时日志输出",p:"在运行 npm script 出现问题时你需要有能力去调试它，某些情况下你需要让 npm script 以静默的方式运行，这 ...",l:"engineering/npm/parameter-script/index.html#调整-npm-script-运行时日志输出",a:"调整-npm-script-运行时日志输出"},"84.6":{t:"默认日志输出级别",p:`即不加任何日志控制参数得到的输出，可能是你最常用的，能看到执行的命令、命令执行的结果。
`,l:"engineering/npm/parameter-script/index.html#默认日志输出级别",a:"默认日志输出级别"},"84.7":{t:"显示尽可能少的有用信息",p:"结合其他工具调用 npm script 的时候比较有用，需要使用 --loglevel silent，或者 --silent ...",l:"engineering/npm/parameter-script/index.html#显示尽可能少的有用信息",a:"显示尽可能少的有用信息"},"84.8":{t:"显示尽可能多的运行时状态",p:"排查脚本问题的时候比较有用，需要使用 --loglevel verbose，或者 --verbose，或者更简单的 -d 来 ...",l:"engineering/npm/parameter-script/index.html#显示尽可能多的运行时状态",a:"显示尽可能多的运行时状态"},"85.0":{t:"# 30 秒搭建一个 npm 私服库",p:"",l:"engineering/npm/private/index.html",a:"_30-秒搭建一个-npm-私服库"},"85.1":{t:"下载依赖  verdaccio",p:`sudo npm i -g verdaccio

`,l:"engineering/npm/private/index.html#下载依赖-verdaccio",a:"下载依赖-verdaccio"},"85.2":{t:"下载完成之后会提供一个命令",p:` /usr/local/lib/node_modules/verdaccio/bin/verdaccio

`,l:"engineering/npm/private/index.html#下载完成之后会提供一个命令",a:"下载完成之后会提供一个命令"},"85.3":{t:"执行",p:` /usr/local/lib/node_modules/verdaccio/bin/verdaccio

`,l:"engineering/npm/private/index.html#执行",a:"执行"},"85.4":{t:"执行之后",p:"",l:"engineering/npm/private/index.html#执行之后",a:"执行之后"},"85.5":{t:"提供一个本地服务地址",p:`http://localhost:4873/

`,l:"engineering/npm/private/index.html#提供一个本地服务地址",a:"提供一个本地服务地址"},"85.6":{t:"然后按照这个步骤 登陆",p:`npm address --registry &lt;http://localhost:4873/&gt;

`,l:"engineering/npm/private/index.html#然后按照这个步骤-登陆",a:"然后按照这个步骤-登陆"},"85.7":{t:"发布包",p:`npm publish --registry &lt;http://localhost:4873/&gt;

`,l:"engineering/npm/private/index.html#发布包",a:"发布包"},"85.8":{t:"发布一个私有域名的包",p:`npm publish --access=public

`,l:"engineering/npm/private/index.html#发布一个私有域名的包",a:"发布一个私有域名的包"},"86.0":{t:"# 初识 npm script",p:"",l:"engineering/npm/start-script/index.html",a:"初识-npm-script"},"86.1":{t:"用 npm init 快速创建项目",p:"开始探索 npm script 之前，我们先聊聊这些 scripts 所依赖的文件 package.json，以它为基础的  ...",l:"engineering/npm/start-script/index.html#用-npm-init-快速创建项目",a:"用-npm-init-快速创建项目"},"86.2":{t:"初始化 package.json 时的字段默认值是可以自己配置的",p:`我上面的默认版本号是 0.1.0，而 npm 默认的版本号是 0.0.1，可以用下面的命令去修改默认配置：
npm conf ...`,l:"engineering/npm/start-script/index.html#初始化-package-json-时的字段默认值是可以自己配置的",a:"初始化-package-json-时的字段默认值是可以自己配置的"},"86.3":{t:"用 npm run 执行任意命令",p:"npm 是如何管理和执行各种 scripts 的呢？作为 npm 内置的核心功能之一，npm run 实际上是 npm ru ...",l:"engineering/npm/start-script/index.html#用-npm-run-执行任意命令",a:"用-npm-run-执行任意命令"},"86.4":{t:"创建自定义 npm script",p:`在新项目或者任何现有项目中添加 eslint 自定义脚本的步骤如下：
`,l:"engineering/npm/start-script/index.html#创建自定义-npm-script",a:"创建自定义-npm-script"},"86.5":{t:"1. 准备被检查的代码",p:`const str = 'some value';

function fn(){
    console.log('som ...`,l:"engineering/npm/start-script/index.html#_1-准备被检查的代码",a:"_1-准备被检查的代码"},"86.6":{t:"2. 添加 eslint 依赖",p:`执行如下命令将 eslint 添加为 devDependencies：
npm install eslint -D

`,l:"engineering/npm/start-script/index.html#_2-添加-eslint-依赖",a:"_2-添加-eslint-依赖"},"86.7":{t:"3. 初始化 eslint 配置",p:`用 eslint 做检查需要配置规则集，存放规则集的文件就是配置文件，使用如下文件生成配置文件：
./node_module ...`,l:"engineering/npm/start-script/index.html#_3-初始化-eslint-配置",a:"_3-初始化-eslint-配置"},"86.8":{t:"4. 添加 eslint 命令",p:`在 package.json 的 scripts 字段中新增命令 eslint：
{
  &quot;scripts&quo ...`,l:"engineering/npm/start-script/index.html#_4-添加-eslint-命令",a:"_4-添加-eslint-命令"},"86.9":{t:"5. 运行 eslint 命令",p:`执行 npm run eslint
`,l:"engineering/npm/start-script/index.html#_5-运行-eslint-命令",a:"_5-运行-eslint-命令"},"87.0":{t:"# 解读 packager",p:`
package.json 是前端每个项目都有的 json 文件，位于项目的根目录。许多脚手架在搭建项目时也会自动帮我们自动 ...`,l:"engineering/package/package-start/index.html",a:"解读-packager"},"87.1":{t:"描述配置",p:`主要是项目的基本信息，包括名称，版本，描述，仓库，作者等，部分会展示在 npm 官网上
!图片
`,l:"engineering/package/package-start/index.html#描述配置",a:"描述配置"},"87.2":{t:"name",p:`项目的名称，如果是第三方包的话，其他人可以通过该名称使用 npm install 进行安装。
&quot;name&quot ...`,l:"engineering/package/package-start/index.html#name",a:"name"},"87.3":{t:"version",p:`项目的版本号，开源项目的版本号通常遵循 semver 语义化规范，具体规则如下图所示：
!图片
简单介绍一下：

代表主版本 ...`,l:"engineering/package/package-start/index.html#version",a:"version"},"87.4":{t:"repository",p:`项目的仓库地址以及版本控制信息。
&quot;repository&quot;: {
  &quot;type&quot;: ...`,l:"engineering/package/package-start/index.html#repository",a:"repository"},"87.5":{t:"description",p:`项目的描述，会展示在 npm 官网，让别人能快速了解该项目。
&quot;description&quot;: &quot; ...`,l:"engineering/package/package-start/index.html#description",a:"description"},"87.6":{t:"keywords",p:`一组项目的技术关键词，比如 Ant Design 组件库的 keywords 如下：
&quot;keywords&quot ...`,l:"engineering/package/package-start/index.html#keywords",a:"keywords"},"87.7":{t:"homepage",p:`项目主页的链接，通常是项目 github 链接，项目官网或文档首页。
&quot;homepage&quot;: &quot ...`,l:"engineering/package/package-start/index.html#homepage",a:"homepage"},"87.8":{t:"bugs",p:`项目 bug 反馈地址，通常是 github issue 页面的链接。
&quot;bugs&quot;: &quot;ht ...`,l:"engineering/package/package-start/index.html#bugs",a:"bugs"},"87.9":{t:"license",p:"项目的开源许可证。项目的版权拥有人可以使用开源许可证来限制源码的使用、复制、修改和再发布等行为。常见的开源许可证有 BSD、 ...",l:"engineering/package/package-start/index.html#license",a:"license"},"87.10":{t:"author",p:`项目作者。
&quot;author&quot;: &quot;minghhui&quot;,

`,l:"engineering/package/package-start/index.html#author",a:"author"},"87.11":{t:"文件配置",p:`包括项目所包含的文件，以及入口等信息。
`,l:"engineering/package/package-start/index.html#文件配置",a:"文件配置"},"87.12":{t:"files",p:`项目在进行 npm 发布时，可以通过 files 指定需要跟随一起发布的内容来控制 npm 包的大小，避免安装时间太长。
发 ...`,l:"engineering/package/package-start/index.html#files",a:"files"},"87.13":{t:"type",p:"在 node 支持 ES 模块后，要求 ES 模块采用 .mjs 后缀文件名。只要遇到 .mjs 文件，就认为它是 ES 模 ...",l:"engineering/package/package-start/index.html#type",a:"type"},"87.14":{t:"main",p:"项目发布时，默认会包括 package.json，license，README 和main 字段里指定的文件，因为 main ...",l:"engineering/package/package-start/index.html#main",a:"main"},"87.15":{t:"browser",p:"main 字段里指定的入口文件在 browser 和 Node 环境中都可以使用。如果只想在 web 端使用，不允许在 se ...",l:"engineering/package/package-start/index.html#browser",a:"browser"},"87.16":{t:"module",p:`同样，项目也可以指定 ES 模块的入口文件，这就是 module 字段的作用。
&quot;module&quot;: &q ...`,l:"engineering/package/package-start/index.html#module",a:"module"},"87.17":{t:"exports",p:`node 在 14.13 支持在 package.json 里定义 exports 字段，拥有了条件导出的功能。
expor ...`,l:"engineering/package/package-start/index.html#exports",a:"exports"},"87.18":{t:"workspaces",p:"项目的工作区配置，用于在本地的根目录下管理多个子项目。可以自动地在 npm install 时将 workspaces 下面 ...",l:"engineering/package/package-start/index.html#workspaces",a:"workspaces"},"87.19":{t:"脚本配置",p:"",l:"engineering/package/package-start/index.html#脚本配置",a:"脚本配置"},"87.20":{t:"scripts",p:`指定项目的一些内置脚本命令，这些命令可以通过 npm run 来执行。通常包含项目开发，构建 等 CI 命令，比如：
&qu ...`,l:"engineering/package/package-start/index.html#scripts",a:"scripts"},"87.21":{t:"config",p:`config 用于设置 scripts 里的脚本在运行时的参数。比如设置 port 为 3001：
&quot;config ...`,l:"engineering/package/package-start/index.html#config",a:"config"},"87.22":{t:"依赖配置",p:`项目可能会依赖其他包，需要在 package.json 里配置这些依赖的信息。
`,l:"engineering/package/package-start/index.html#依赖配置",a:"依赖配置"},"87.23":{t:"dependencies",p:`运行依赖，也就是项目生产环境下需要用到的依赖。比如 react，vue，状态管理库以及组件库等。
使用 npm instal ...`,l:"engineering/package/package-start/index.html#dependencies",a:"dependencies"},"87.24":{t:"devDependencies",p:"开发依赖，项目开发环境需要用到而运行时不需要的依赖，用于辅助开发，通常包括项目工程化工具比如 webpack，vite，es ...",l:"engineering/package/package-start/index.html#devdependencies",a:"devdependencies"},"87.25":{t:"peerDependencies",p:`同伴依赖，一种特殊的依赖，不会被自动安装，通常用于表示与另一个包的依赖与兼容性关系来警示使用者。
比如我们安装 A，A 的正 ...`,l:"engineering/package/package-start/index.html#peerdependencies",a:"peerdependencies"},"87.26":{t:"optionalDependencies",p:"可选依赖，顾名思义，表示依赖是可选的，它不会阻塞主功能的使用，安装或者引入失败也无妨。这类依赖如果安装失败，那么 npm 的 ...",l:"engineering/package/package-start/index.html#optionaldependencies",a:"optionaldependencies"},"87.27":{t:"peerDependenciesMeta",p:`同伴依赖也可以使用 peerDependenciesMeta 将其指定为可选的。
&quot;peerDependencie ...`,l:"engineering/package/package-start/index.html#peerdependenciesmeta",a:"peerdependenciesmeta"},"87.28":{t:"bundleDependencies",p:`打包依赖。它的值是一个数组，在发布包时，bundleDependencies 里面的依赖都会被一起打包。
比如指定 reac ...`,l:"engineering/package/package-start/index.html#bundledependencies",a:"bundledependencies"},"87.29":{t:"overrides",p:`overrides 可以重写项目依赖的依赖，及其依赖树下某个依赖的版本号，进行包的替换。
`,l:"engineering/package/package-start/index.html#overrides",a:"overrides"},"87.30":{t:"发布配置",p:`主要是和项目发布相关的配置。
`,l:"engineering/package/package-start/index.html#发布配置",a:"发布配置"},"87.31":{t:"private",p:`如果是私有项目，不希望发布到公共 npm 仓库上，可以将 private 设为 true。
&quot;private&qu ...`,l:"engineering/package/package-start/index.html#private",a:"private"},"87.32":{t:"publishConfig",p:`顾名思义，publishConfig 就是 npm 包发布时使用的配置。
比如在安装依赖时指定了 registry 为 ta ...`,l:"engineering/package/package-start/index.html#publishconfig",a:"publishconfig"},"87.33":{t:"系统配置",p:"和项目关联的系统配置，比如 node 版本或操作系统兼容性之类。这些要求只会起到提示警告的作用，即使用户的环境不符合要求，也 ...",l:"engineering/package/package-start/index.html#系统配置",a:"系统配置"},"87.34":{t:"engines",p:`一些项目由于兼容性问题会对 node 或者包管理器有特定的版本号要求，比如：
&quot;engines&quot;: {
 ...`,l:"engineering/package/package-start/index.html#engines",a:"engines"},"87.35":{t:"os",p:"在 linux 上能正常运行的项目可能在 windows 上会出现异常，使用 os 字段可以指定项目对操作系统的兼容性要求。 ...",l:"engineering/package/package-start/index.html#os",a:"os"},"87.36":{t:"cpu",p:`指定项目只能在特定的 CPU 体系上运行。
&quot;cpu&quot;: [&quot;x64&quot;, &quot ...`,l:"engineering/package/package-start/index.html#cpu",a:"cpu"},"87.37":{t:"第三方配置",p:`一些第三方库或应用在进行某些内部处理时会依赖这些字段，使用它们时需要安装对应的第三方库。
`,l:"engineering/package/package-start/index.html#第三方配置",a:"第三方配置"},"87.38":{t:"types 或者 typings",p:`指定 TypeScript 的类型定义的入口文件
&quot;types&quot;: &quot;./index.d.ts ...`,l:"engineering/package/package-start/index.html#types-或者-typings",a:"types-或者-typings"},"87.39":{t:"unpkg",p:`可以让 npm 上所有的文件都开启 CDN 服务。
比如 vue package.json 的 unpkg 定义为 dist ...`,l:"engineering/package/package-start/index.html#unpkg",a:"unpkg"},"87.40":{t:"jsdelivr",p:`与 unpkg 类似，vue 通过如下的配置
&quot;jsdelivr&quot;: &quot;dist/vue.gl ...`,l:"engineering/package/package-start/index.html#jsdelivr",a:"jsdelivr"},"87.41":{t:"browserslist",p:"设置项目的浏览器兼容情况。babel 和 autoprefixer 等工具会使用该配置对代码进行转换。当然你也可以使用 .b ...",l:"engineering/package/package-start/index.html#browserslist",a:"browserslist"},"87.42":{t:"sideEffects",p:`显示设置某些模块具有副作用，用于 webpack 的 tree-shaking 优化。
比如在项目中整体引入 Ant Des ...`,l:"engineering/package/package-start/index.html#sideeffects",a:"sideeffects"},"87.43":{t:"lint-staged",p:"lint-staged 是用于对 git 的暂存区的文件进行操作的工具，比如可以在代码提交前执行 lint 校验，类型检查， ...",l:"engineering/package/package-start/index.html#lint-staged",a:"lint-staged"},"88.0":{t:"# packager-version",p:"",l:"engineering/package/package-version/index.html",a:"packager-version"},"88.1":{t:"解决问题",p:`
每次提交代码自动修改 package.json 的version 版本
配合 changelog 使用更佳

`,l:"engineering/package/package-version/index.html#解决问题",a:"解决问题"},"88.2":{t:"使用方式",p:`
项目根目录增加 version.mjs 文件
下载依赖

yarn add prompts zx -D


package ...`,l:"engineering/package/package-version/index.html#使用方式",a:"使用方式"},"89.0":{t:"# 前端B端权限控制【资源权限，数据权限】",p:"",l:"engineering/permissions/tob-permissions/index.html",a:"前端b端权限控制【资源权限-数据权限】"},"89.1":{t:"1\\. 基本介绍",p:`
资源权限：菜单导航栏 &amp; 页面 &amp; 按钮 资源可见权限。
数据权限：对于页面上的数据操作，同一个人同一个页 ...`,l:"engineering/permissions/tob-permissions/index.html#_1-基本介绍",a:"_1-基本介绍"},"89.2":{t:"2\\. 权限数据录入与展示",p:"采用树结构进行处理。唯一需要处理的是父子节点的联动关系处理。这里因为不同的公司或者系统可能对于这部分的数据录入方式不同，所以 ...",l:"engineering/permissions/tob-permissions/index.html#_2-权限数据录入与展示",a:"_2-权限数据录入与展示"},"89.3":{t:"3.用户资源权限流程图",p:`!image.png
`,l:"engineering/permissions/tob-permissions/index.html#_3-用户资源权限流程图",a:"_3-用户资源权限流程图"},"89.4":{t:"4 前端权限控制",p:"前端控制权限也是分为两部分，菜单页面 与 按钮。因为前端权限控制的实现，会因为后台接口形式有所影响，但是大体方向是相同。还是 ...",l:"engineering/permissions/tob-permissions/index.html#_4-前端权限控制",a:"_4-前端权限控制"},"89.5":{t:"4.1.1 路由权限 【代码地址 demo地址】",p:`这里是有两种做法：

第一种，控制路由的配置，当然不是路由配置文件里去配置。而是生效的路由配置里去做。
第二种，完全不做这里 ...`,l:"engineering/permissions/tob-permissions/index.html#_4-1-1-路由权限-【代码地址-demo地址】",a:"_4-1-1-路由权限-【代码地址-demo地址】"},"89.6":{t:"4.1.2 路由权限 菜单可见权限",p:`参照上面的方式，这里的菜单可见权限不用做其他的操作。
4.2 按钮权限 【代码地址 demo地址】
按钮权限上就涉及到两块， ...`,l:"engineering/permissions/tob-permissions/index.html#_4-1-2-路由权限-菜单可见权限",a:"_4-1-2-路由权限-菜单可见权限"},"89.7":{t:"背景",p:"数据权限是对于业务组件内部表格组件的数据进行的数据操作权限。列表数据可能归属于不同的数据类型，所以具有不同的数据操作权限。对 ...",l:"engineering/permissions/tob-permissions/index.html#背景",a:"背景"},"89.8":{t:"总体思路",p:`场景：
比如在商品列表中，每条商品记录后面的“操作”一栏下用三个按钮：【编辑】、【上架/下架】、【删除】，而对于某一个用户， ...`,l:"engineering/permissions/tob-permissions/index.html#总体思路",a:"总体思路"},"89.9":{t:"按钮【actType】属性定义",p:"每个数据操作的按钮上加一个属性 “actType”代表这个按钮的动作类型（如：编辑、删除、审核等），这个属性是资权限的接口返 ...",l:"engineering/permissions/tob-permissions/index.html#按钮【acttype】属性定义",a:"按钮【acttype】属性定义"},"89.10":{t:"业务接口返回权限类型字段【permissionType】",p:"对于有权限控制的业务数据，列表接口或者详情接口都会返回一个“permissionType”的字段，这个字段代表当前用户对于这 ...",l:"engineering/permissions/tob-permissions/index.html#业务接口返回权限类型字段【permissiontype】",a:"业务接口返回权限类型字段【permissiontype】"},"89.11":{t:"怎么控制按钮的可用状态？",p:"现在列表上有三个按钮，【编辑】、【收货】、【完结】，它们对应的“actType”分别为2、4、64，某一条数据的permis ...",l:"engineering/permissions/tob-permissions/index.html#怎么控制按钮的可用状态",a:"怎么控制按钮的可用状态"},"89.12":{t:"前端的js数据进行&判断",p:`需要进行数据转换

data.toString(2): 将数据进行2进制转换成二进制字符串。
parseInt(permis ...`,l:"engineering/permissions/tob-permissions/index.html#前端的js数据进行-判断",a:"前端的js数据进行-判断"},"89.13":{t:"代码修改",p:`接口mock返回数据
response = [{
      &quot;type&quot;: 3,
      &quo ...`,l:"engineering/permissions/tob-permissions/index.html#代码修改",a:"代码修改"},"90.0":{t:"# 处理浏览器默认样式",p:"     html, body, ul, li, ol, dl, dd, dt, p, h1, h2, h3, h4, h5 ...",l:"engineering/project-structures/commonly-css-base/index.html",a:"处理浏览器默认样式"},"91.0":{t:"# 常用 less mixins",p:`//表单元素垂直居中对齐（也可设置顶对齐，底对齐）
.form-element-v-align(@alignment: mi ...`,l:"engineering/project-structures/commonly-less/index.html",a:"常用-less-mixins"},"92.0":{t:"# 常用scss mixins",p:`/显示多行，省略号 
@mixin ellipsis($row:1) {
    /* 显示两行，省略号 */
    te ...`,l:"engineering/project-structures/commonly-scss/index.html",a:"常用scss-mixins"},"93.0":{t:"# 整理的一些前后端协同工作",p:"",l:"engineering/project-structures/synergy/index.html",a:"整理的一些前后端协同工作"},"93.1":{t:"1. 数据字典使用",p:`数据字典提供统一查询接口

查询所有字典接口
查询单个字典数据集合
查询部分字典数据集合

结构如下
{
 'dicCode ...`,l:"engineering/project-structures/synergy/index.html#_1-数据字典使用",a:"_1-数据字典使用"},"93.2":{t:"2. BFF层说明",p:`基本结构：
数据结构基本按照页面功能结构。
举例：入库详情页面：

红色框字段：均为一级属性字段。
蓝色框为数组结构字段：蓝 ...`,l:"engineering/project-structures/synergy/index.html#_2-bff层说明",a:"_2-bff层说明"},"93.3":{t:"3. 接口查询字段需明确",p:"列表查询接口对于查询条件的匹配需要明确。是使用qp-querystring-eq还是qp-querystring-like， ...",l:"engineering/project-structures/synergy/index.html#_3-接口查询字段需明确",a:"_3-接口查询字段需明确"},"93.4":{t:"4. 接口文本展示",p:`接口返回字段 code 转换文本的方式处理。
举例：返回的订单列表当中，在数据库当中，trade表会关联存储一个用户code ...`,l:"engineering/project-structures/synergy/index.html#_4-接口文本展示",a:"_4-接口文本展示"},"93.5":{t:"5. 复杂数据结构处理",p:"",l:"engineering/project-structures/synergy/index.html#_5-复杂数据结构处理",a:"_5-复杂数据结构处理"},"93.6":{t:"6. 日期格式处理",p:"",l:"engineering/project-structures/synergy/index.html#_6-日期格式处理",a:"_6-日期格式处理"},"93.7":{t:"7. 错误文本展示",p:`错误文本展示，对于后端返回的错误信息前端如何处理。

前端显示所有后端返回的错误信息
前端不显示后端返回的错误信息
前端需要 ...`,l:"engineering/project-structures/synergy/index.html#_7-错误文本展示",a:"_7-错误文本展示"},"93.8":{t:"8. 权限处理",p:`
资源权限
数据权限
接口权限

`,l:"engineering/project-structures/synergy/index.html#_8-权限处理",a:"_8-权限处理"},"94.0":{t:"# vite-press 搭建个人博客",p:`现在几乎每个人都会有自己的博客 那么我们今天也来尝试一下
`,l:"engineering/project-structures/vite-press/index.html",a:"vite-press-搭建个人博客"},"94.1":{t:"vitepress 官网",p:`https://vitepress.vuejs.org/
`,l:"engineering/project-structures/vite-press/index.html#vitepress-官网",a:"vitepress-官网"},"94.2":{t:"创建我们自己的个人博客",p:"",l:"engineering/project-structures/vite-press/index.html#创建我们自己的个人博客",a:"创建我们自己的个人博客"},"94.3":{t:"创建项目",p:`mkdir blog &amp;&amp; cd blog &amp;&amp; npm init -y 

这样我们就创建 ...`,l:"engineering/project-structures/vite-press/index.html#创建项目",a:"创建项目"},"94.4":{t:"初始化 git",p:`git init 

`,l:"engineering/project-structures/vite-press/index.html#初始化-git",a:"初始化-git"},"94.5":{t:"下载依赖",p:`yarn add --dev vitepress vue

`,l:"engineering/project-structures/vite-press/index.html#下载依赖",a:"下载依赖"},"94.6":{t:"修改 package.json",p:`{
  ...
  &quot;scripts&quot;: {
    &quot;docs:dev&quot;: &qu ...`,l:"engineering/project-structures/vite-press/index.html#修改-package-json",a:"修改-package-json"},"94.7":{t:"就可以直接启动项目了",p:`yarn docs:dev

`,l:"engineering/project-structures/vite-press/index.html#就可以直接启动项目了",a:"就可以直接启动项目了"},"94.8":{t:"添加我们的第一个页面",p:`.
├─ docs
│  ├─ getting-started.md
│  └─ index.md
└─ package.j ...`,l:"engineering/project-structures/vite-press/index.html#添加我们的第一个页面",a:"添加我们的第一个页面"},"94.9":{t:"推荐一个博客模版",p:`https://github.com/2401345934/vitepress-template
`,l:"engineering/project-structures/vite-press/index.html#推荐一个博客模版",a:"推荐一个博客模版"},"94.10":{t:"推荐一个自己的博客",p:`https://2401345934.github.io/vite-press-blog/
感兴趣的小伙伴可以直接 fork ...`,l:"engineering/project-structures/vite-press/index.html#推荐一个自己的博客",a:"推荐一个自己的博客"},"95.0":{t:"# 手把手教你搭建一个生产级的vite SSR项目",p:`
本文不对SSR原理深入解释

!
`,l:"engineering/project-structures/vite-ssr/index.html",a:"手把手教你搭建一个生产级的vite-ssr项目"},"95.1":{t:"技术选型",p:`以上思维导图第一列是我们的目标，第二列是我选择的技术栈。
通过目标导向技术栈，每个目标都对应了许多不同的技术栈，我只是把我选 ...`,l:"engineering/project-structures/vite-ssr/index.html#技术选型",a:"技术选型"},"95.2":{t:"开始搭建",p:`有了选型了，那我们可以快速搭建项目模板了
`,l:"engineering/project-structures/vite-ssr/index.html#开始搭建",a:"开始搭建"},"95.3":{t:"初始化",p:`推荐使用 vite-plugin-ssrcli初始化项目
npm init vite-plugin-ssr@latest

 ...`,l:"engineering/project-structures/vite-ssr/index.html#初始化",a:"初始化"},"95.4":{t:"ESM",p:`我们全程使用ESM规范开发，package.json 中设置 type
&quot;type&quot;: &quot;mo ...`,l:"engineering/project-structures/vite-ssr/index.html#esm",a:"esm"},"95.5":{t:"pnpm",p:`pnpm相对npm速度快很多，且做了依赖优化。package.json中 限制只能使用 pnpm
&quot;scripts ...`,l:"engineering/project-structures/vite-ssr/index.html#pnpm",a:"pnpm"},"95.6":{t:"eslint",p:`eslint可以根据规则校验代码是否符合规范
eslint看团队或个人习惯，这里给个例子
`,l:"engineering/project-structures/vite-ssr/index.html#eslint",a:"eslint"},"95.7":{t:"安装",p:"pnpm add eslint eslint-define-config eslint-plugin-react eslin ...",l:"engineering/project-structures/vite-ssr/index.html#安装",a:"安装"},"95.8":{t:"vscode插件",p:`eslint插件ID：dbaeumer.vscode-eslint
为了方便大家都安装了这些插件，我把插件写在了 .vsco ...`,l:"engineering/project-structures/vite-ssr/index.html#vscode插件",a:"vscode插件"},"95.9":{t:"配置 (.eslintrc.cjs)",p:`const { defineConfig } = require('eslint-define-config')

modu ...`,l:"engineering/project-structures/vite-ssr/index.html#配置-eslintrc-cjs",a:"配置-eslintrc-cjs"},"95.10":{t:"eslint ignore",p:`设置不需要eslint处理的文件
*.sh
node_modules
*.woff
*.ttf
.vscode
.local ...`,l:"engineering/project-structures/vite-ssr/index.html#eslint-ignore",a:"eslint-ignore"},"95.11":{t:"prettier",p:`prettier可以格式化代码，也可按照团队或个人风格相应修改
`,l:"engineering/project-structures/vite-ssr/index.html#prettier",a:"prettier"},"95.12":{t:"安装",p:`pnpm add prettier -D

`,l:"engineering/project-structures/vite-ssr/index.html#安装",a:"安装"},"95.13":{t:"配置 (.pretterrc.cjs)",p:`/** @type {import('prettier').Config} */
module.exports = {
   ...`,l:"engineering/project-structures/vite-ssr/index.html#配置-pretterrc-cjs",a:"配置-pretterrc-cjs"},"95.14":{t:"commitlint",p:`commitlint可以根据规则检查我们的git commit是否符合规范
`,l:"engineering/project-structures/vite-ssr/index.html#commitlint",a:"commitlint"},"95.15":{t:"安装",p:`pnpm add @commitlint/config-conventional @commitlint/cli -D

`,l:"engineering/project-structures/vite-ssr/index.html#安装",a:"安装"},"95.16":{t:"配置(commitlint.config.cjs)",p:`module.exports = {
  extends: ['@commitlint/config-conventiona ...`,l:"engineering/project-structures/vite-ssr/index.html#配置-commitlint-config-cjs",a:"配置-commitlint-config-cjs"},"95.17":{t:"手动添加commit msg",p:`!
手动添加只适合咱们了解原理，为了团队协作和减少开发负担，我们尽量选择自动添加
`,l:"engineering/project-structures/vite-ssr/index.html#手动添加commit-msg",a:"手动添加commit-msg"},"95.18":{t:"自动添加commit msg",p:`目前市面上比较流行的是 husky，我个人喜欢使用 simple-git-hooks。
`,l:"engineering/project-structures/vite-ssr/index.html#自动添加commit-msg",a:"自动添加commit-msg"},"95.19":{t:"安装",p:`pnpm add simple-git-hooks -D


`,l:"engineering/project-structures/vite-ssr/index.html#安装",a:"安装"},"95.20":{t:"配置",p:`在package.json的hook中触发 simple-git-hooks 初始化
&quot;scripts&quot; ...`,l:"engineering/project-structures/vite-ssr/index.html#配置",a:"配置"},"95.21":{t:"配合tsconfig path设置路径别名",p:`resolve: {
  alias: [
    { find: '@', replacement: path.resol ...`,l:"engineering/project-structures/vite-ssr/index.html#配合tsconfig-path设置路径别名",a:"配合tsconfig-path设置路径别名"},"95.22":{t:"服务端路由与客户端路由",p:`服务端路由适合简单，页面之间没有关联的项目，页面跳转时都会经历一次服务端渲染
客户端渲染适合复杂，页面之间有关联的项目，首次 ...`,l:"engineering/project-structures/vite-ssr/index.html#服务端路由与客户端路由",a:"服务端路由与客户端路由"},"95.23":{t:"使用方式",p:`import { navigate } from 'vite-plugin-ssr/client/router'

navi ...`,l:"engineering/project-structures/vite-ssr/index.html#使用方式",a:"使用方式"},"95.24":{t:"安装",p:`pnpm add http-proxy-middleware -D


`,l:"engineering/project-structures/vite-ssr/index.html#安装",a:"安装"},"95.25":{t:"使用",p:`const proxy = import.meta.VITE_PROXY
if (proxy) {
  const { cr ...`,l:"engineering/project-structures/vite-ssr/index.html#使用",a:"使用"},"95.26":{t:"重置样式 + 引入tailwindcss",p:`@import 'antd/dist/reset.css';
@tailwind base;
@tailwind compo ...`,l:"engineering/project-structures/vite-ssr/index.html#重置样式-引入tailwindcss",a:"重置样式-引入tailwindcss"},"95.27":{t:"tailwind配置",p:"",l:"engineering/project-structures/vite-ssr/index.html#tailwind配置",a:"tailwind配置"},"95.28":{t:"响应式布局",p:`/** @type {import('tailwindcss').Config} */
module.exports = { ...`,l:"engineering/project-structures/vite-ssr/index.html#响应式布局",a:"响应式布局"},"95.29":{t:"postcss配置",p:`postcss插件执行顺序是从上到下，所以 autoprefixer（一个处理css浏览器兼容的插件）放在最后
module ...`,l:"engineering/project-structures/vite-ssr/index.html#postcss配置",a:"postcss配置"},"95.30":{t:"移动端兼容",p:`现在流行三种布局方案

响应式
pxtorem自适应
pxtoviewport自适应

`,l:"engineering/project-structures/vite-ssr/index.html#移动端兼容",a:"移动端兼容"},"95.31":{t:"响应式",p:`响应式是比较麻烦的，因为需要针对不同的分辨率增加css代码，维护成本和难度相比自适应布局更难
但tailwind使得响应式布 ...`,l:"engineering/project-structures/vite-ssr/index.html#响应式",a:"响应式"},"95.32":{t:"pxtorem方案",p:`需要配合动态rem使用。监听窗口变化同时设置rem。
pxtorem相对比pxtoviewport，前者可以做到限制最大宽度 ...`,l:"engineering/project-structures/vite-ssr/index.html#pxtorem方案",a:"pxtorem方案"},"95.33":{t:"pxtoviewport方案",p:`module.exports = {
  plugins: {
    'tailwindcss/nesting': {}, ...`,l:"engineering/project-structures/vite-ssr/index.html#pxtoviewport方案",a:"pxtoviewport方案"},"95.34":{t:"响应式 + 自适应",p:`一种奇怪的组合，但有可能真的会遇到这种需求。此时我们可以这样做：
`,l:"engineering/project-structures/vite-ssr/index.html#响应式-自适应",a:"响应式-自适应"},"95.35":{t:"第一步",p:`正常如上配置 pxtorem / pxtoviewport
`,l:"engineering/project-structures/vite-ssr/index.html#第一步",a:"第一步"},"95.36":{t:"第二步",p:`如果不希望转换，就用大写PX。如果希望转化，就用小写px
class=&quot;lg:text-[length:16PX] ...`,l:"engineering/project-structures/vite-ssr/index.html#第二步",a:"第二步"},"95.37":{t:"第三步",p:`经过pxtorem/pxtoviewport的 convertUnitOnEnd处理后，把 PX转成 px
扩展
至此，我们 ...`,l:"engineering/project-structures/vite-ssr/index.html#第三步",a:"第三步"},"95.38":{t:"light.css",p:`html {
  --color-primary: blue;
}


`,l:"engineering/project-structures/vite-ssr/index.html#light-css",a:"light-css"},"95.39":{t:"dark.css",p:`html[class*='dark'] {
  --color-primary: green;
}


`,l:"engineering/project-structures/vite-ssr/index.html#dark-css",a:"dark-css"},"95.40":{t:"tailwind dark配置",p:`const path = require('node:path')
const fs = require('fs-extra ...`,l:"engineering/project-structures/vite-ssr/index.html#tailwind-dark配置",a:"tailwind-dark配置"},"95.41":{t:"antd",p:"",l:"engineering/project-structures/vite-ssr/index.html#antd",a:"antd"},"95.42":{t:"获取当前网页的主题",p:`export enum Theme {
  dark = 'dark',
  light = 'light',
}

con ...`,l:"engineering/project-structures/vite-ssr/index.html#获取当前网页的主题",a:"获取当前网页的主题"},"95.43":{t:"文本国际化",p:`i18next有非常丰富的社区生态
由于我们是SSR国际化，所以需要在服务端跟客户端语言同步，那么服务端就需要在收到客户端请 ...`,l:"engineering/project-structures/vite-ssr/index.html#文本国际化",a:"文本国际化"},"95.44":{t:"i18next",p:"",l:"engineering/project-structures/vite-ssr/index.html#i18next",a:"i18next"},"95.45":{t:"服务端",p:`在服务端只用i18next来侦测语言，不需要locale资源
import i18next from 'i18next'
i ...`,l:"engineering/project-structures/vite-ssr/index.html#服务端",a:"服务端"},"95.46":{t:"客户端和服务端渲染",p:"服务端拿到客户端语言后，也需要注水相应的语言。此时服务端跟客户端语言已经一致了，那么服务端就可以使用客户端的i18next实 ...",l:"engineering/project-structures/vite-ssr/index.html#客户端和服务端渲染",a:"客户端和服务端渲染"},"95.47":{t:"react-i18next",p:"在 i18next 初始化的时候使用到了 react-i18next，它带来的能力是SSR(I18nextProvider) ...",l:"engineering/project-structures/vite-ssr/index.html#react-i18next",a:"react-i18next"},"95.48":{t:"国际化 vscode插件",p:`至此，国际化已经可以使用。为了更方便看到国际化的结果，我们可以使用vscode插件：lokalise.i18n-ally
`,l:"engineering/project-structures/vite-ssr/index.html#国际化-vscode插件",a:"国际化-vscode插件"},"95.49":{t:"配置",p:`.vscode/setting.json
{
  &quot;i18n-ally.localesPaths&quot;: [ ...`,l:"engineering/project-structures/vite-ssr/index.html#配置",a:"配置"},"96.0":{t:"# vue3+vite+ts+vuex+vue-router+Element-plus+tailwindcss+mock 搭建完整项目",p:"",l:"engineering/project-structures/vue3-project/index.html",a:"vue3-vite-ts-vuex-vue-router-element-plus-tailwindcss-mock-搭建完整项目"},"96.1":{t:"一，介绍",p:`Vite（法语单词，“快” 的意思）是一种新型的前端构建工具
最初是配合 Vue3.0 一起使用的，后来适配了各种前端项目， ...`,l:"engineering/project-structures/vue3-project/index.html#一-介绍",a:"一-介绍"},"96.2":{t:"2.2.2 新增路由页面",p:"为了方便演示，我们再新增两个路由页面。熟悉，创建views文件夹，把需要展示的页面创建完成。然后，我们在router/ind ...",l:"engineering/project-structures/vue3-project/index.html#_2-2-2-新增路由页面",a:"_2-2-2-新增路由页面"},"96.3":{t:"2.4.1 引入element-plus",p:"我们可以引入整个 element-plus，也可以根据需要仅引入部分组件。如果是全部引入，只需要在main.js 添加如下代 ...",l:"engineering/project-structures/vue3-project/index.html#_2-4-1-引入element-plus",a:"_2-4-1-引入element-plus"},"96.4":{t:"2.4.2 添加配置",p:"引入 Element Plus后，我们可以添加一个全局配置对象。该对象目前支持 size 与 zIndex 字段。size  ...",l:"engineering/project-structures/vue3-project/index.html#_2-4-2-添加配置",a:"_2-4-2-添加配置"},"96.5":{t:"2.4.3 配置proxy 和 alias",p:`如果要在Vite中使用alias别名配置和proxy代理配置，那么需要在vite.config.ts文件中进行单独的配置。
 ...`,l:"engineering/project-structures/vue3-project/index.html#_2-4-3-配置proxy-和-alias",a:"_2-4-3-配置proxy-和-alias"},"96.6":{t:"安装",p:"npm install -D tailwindcss@latest postcss@latest autoprefixer@ ...",l:"engineering/project-structures/vue3-project/index.html#安装",a:"安装"},"96.7":{t:"介绍",p:`mock.js 官网：mockjs.com/
目前的大部分公司的项目都是采用的前后端分离, 后端接口的开发和前端人员是同时进 ...`,l:"engineering/project-structures/vue3-project/index.html#介绍",a:"介绍"},"96.8":{t:"使用",p:"",l:"engineering/project-structures/vue3-project/index.html#使用",a:"使用"},"96.9":{t:"①下载",p:`npm install mockjs


`,l:"engineering/project-structures/vue3-project/index.html#_1下载",a:"_1下载"},"96.10":{t:"②引入",p:`Mock.js暴露了一个全局的Mock对象, 我们只需要将Mock对象引入到文件中, 调用Mock对象的方法即可
Commo ...`,l:"engineering/project-structures/vue3-project/index.html#_2引入",a:"_2引入"},"96.11":{t:"③Mock.js的规范",p:`'list|1-10': [{
  'id|+1': 1
}]


上面的代码被称为数据模板, 用于告诉Mock.js生成什 ...`,l:"engineering/project-structures/vue3-project/index.html#_3mock-js的规范",a:"_3mock-js的规范"},"96.12":{t:"Mock.mock()",p:`Mock.mock()方法是用来根据数据模板生成模拟数据, 我常用到的是以下两种传参方式:
Mock.mock(templa ...`,l:"engineering/project-structures/vue3-project/index.html#mock-mock",a:"mock-mock"},"96.13":{t:"Mock.Random",p:`Mock.Random是Mock.js提供一个工具类, 用于生成常用的几种数据.
生成布尔值
//使用@占位符的方式
 le ...`,l:"engineering/project-structures/vue3-project/index.html#mock-random",a:"mock-random"},"96.14":{t:"在 Vite2 与 Vue3 中使用Mockjs来模拟数据",p:`
安装mockjs

npm install mockjs --save-dev



安装vite-plugin-mock ...`,l:"engineering/project-structures/vue3-project/index.html#在-vite2-与-vue3-中使用mockjs来模拟数据",a:"在-vite2-与-vue3-中使用mockjs来模拟数据"},"97.0":{t:"# 从0搭建 Vite 3 + Vue 3",p:`
基础搭建
代码规范
提交规范
自动部署

`,l:"engineering/project-structures/vue3-vite/index.html",a:"从0搭建-vite-3-vue-3"},"97.1":{t:"技术栈",p:`
⚡️ Vite 3 - 构建工具（就是快！）
🖖 Vue 3 - 渐进式 JavaScript 框架
🚦 Vue Ro ...`,l:"engineering/project-structures/vue3-vite/index.html#技术栈",a:"技术栈"},"97.2":{t:"基础搭建",p:`构建项目雏形
确保你安装了最新版本的 Node.js，然后在命令行中运行以下命令：
# npm 6.x
npm create ...`,l:"engineering/project-structures/vue3-vite/index.html#基础搭建",a:"基础搭建"},"97.3":{t:"安装依赖",p:`npm i vue-router@4

`,l:"engineering/project-structures/vue3-vite/index.html#安装依赖",a:"安装依赖"},"97.4":{t:"创建路由配置文件",p:`在 src/router 目录下新建 index.js 文件与 modules 文件夹
└── src/
    ├── r ...`,l:"engineering/project-structures/vue3-vite/index.html#创建路由配置文件",a:"创建路由配置文件"},"97.5":{t:"挂载路由配置",p:`在 main.js 文件中挂载路由配置
import { createApp } from 'vue';

import A ...`,l:"engineering/project-structures/vue3-vite/index.html#挂载路由配置",a:"挂载路由配置"},"97.6":{t:"安装依赖",p:`npm i pinia

`,l:"engineering/project-structures/vue3-vite/index.html#安装依赖",a:"安装依赖"},"97.7":{t:"创建仓库配置文件",p:`在 src/store 目录下新建 index.js 文件与 modules 文件夹
└── src/
    ├── st ...`,l:"engineering/project-structures/vue3-vite/index.html#创建仓库配置文件",a:"创建仓库配置文件"},"97.8":{t:"挂载 Pinia 配置",p:`在 main.js 文件中挂载 Vuex 配置
import { createApp } from 'vue';

impo ...`,l:"engineering/project-structures/vue3-vite/index.html#挂载-pinia-配置",a:"挂载-pinia-配置"},"97.9":{t:"安装依赖",p:`npm i tdesign-vue-next


`,l:"engineering/project-structures/vue3-vite/index.html#安装依赖",a:"安装依赖"},"97.10":{t:"基础使用",p:`import { createApp } from 'vue';

import TDesign from 'tdesign ...`,l:"engineering/project-structures/vue3-vite/index.html#基础使用",a:"基础使用"},"97.11":{t:"按需引入",p:`使用 unplugin-vue-components 和 unplugin-auto-import 来实现自动导入：
npm ...`,l:"engineering/project-structures/vue3-vite/index.html#按需引入",a:"按需引入"},"97.12":{t:"安装依赖",p:`npm i axios


`,l:"engineering/project-structures/vue3-vite/index.html#安装依赖",a:"安装依赖"},"97.13":{t:"请求配置",p:`在 utils 目录下创建 request.js 文件，配置好适合自己业务的请求拦截和响应拦截：
└── src/
 ├── ...`,l:"engineering/project-structures/vue3-vite/index.html#请求配置",a:"请求配置"},"97.14":{t:"模拟演示",p:`在需要使用接口的地方，引入对应的业务模型文件，参考如下：



集成 CSS 预处理器 Less
本项目使用 CSS 预处理 ...`,l:"engineering/project-structures/vue3-vite/index.html#模拟演示",a:"模拟演示"},"97.15":{t:"安装依赖",p:`npm i less -D


`,l:"engineering/project-structures/vue3-vite/index.html#安装依赖",a:"安装依赖"},"97.16":{t:"如何使用",p:`在 \`\` 样式标签中引用 lang=&quot;less&quot; 即可。




CSS 命名规范推荐 BEM 命名规范 ...`,l:"engineering/project-structures/vue3-vite/index.html#如何使用",a:"如何使用"},"97.17":{t:"全局样式",p:`在 src/style 目录下创建 variables.less 全局样式文件：
└── src/
    ├── styl ...`,l:"engineering/project-structures/vue3-vite/index.html#全局样式",a:"全局样式"},"97.18":{t:"样式穿透",p:`官方文档
在 Vue3 中，改变了以往样式穿透的语法，如果继续使用 ::v-deep、/deep/、&gt;&gt;&gt; ...`,l:"engineering/project-structures/vue3-vite/index.html#样式穿透",a:"样式穿透"},"97.19":{t:"代码规范",p:"随着前端应用逐渐变得大型化和复杂化，在同一个项目中有多个人员参与时，每个人的前端能力程度不等，他们往往会用不同的编码风格和习 ...",l:"engineering/project-structures/vue3-vite/index.html#代码规范",a:"代码规范"},"97.20":{t:"安装依赖",p:`
图片 - ESLint 本体
图片 - 改善 ESLint 规范编写体验
图片 - 适用于 Vue 文件的 ESLint  ...`,l:"engineering/project-structures/vue3-vite/index.html#安装依赖",a:"安装依赖"},"97.21":{t:"安装插件",p:`Visual Studio Code 编辑器使用 ESLint 配置需要下载插件 ESLint 。
!ESLint
JetB ...`,l:"engineering/project-structures/vue3-vite/index.html#安装插件",a:"安装插件"},"97.22":{t:"创建 ESLint 配置文件",p:`在项目根目录创建 .eslintrc.js 文件，并填入以下内容：
const { defineConfig } = req ...`,l:"engineering/project-structures/vue3-vite/index.html#创建-eslint-配置文件",a:"创建-eslint-配置文件"},"97.23":{t:"创建 ESLint 过滤规则",p:`在项目根目录添加一个 .eslintignore 文件，内容如下：
dist
node_modules
!.prettier ...`,l:"engineering/project-structures/vue3-vite/index.html#创建-eslint-过滤规则",a:"创建-eslint-过滤规则"},"97.24":{t:"安装依赖",p:`npm i prettier -D

`,l:"engineering/project-structures/vue3-vite/index.html#安装依赖",a:"安装依赖"},"97.25":{t:"安装插件",p:"Visual Studio Code 编辑器使用 Prettier 配置需要下载插件 Prettier - Code for ...",l:"engineering/project-structures/vue3-vite/index.html#安装插件",a:"安装插件"},"97.26":{t:"创建 Prettier 配置文件",p:`Prettier 支持多种格式的配置文件，比如 .json、.yml、.yaml、.js等。
在项目根目录创建 .prett ...`,l:"engineering/project-structures/vue3-vite/index.html#创建-prettier-配置文件",a:"创建-prettier-配置文件"},"97.27":{t:"创建 Prettier 过滤规则",p:`在项目根目录添加一个 .prettierignore 文件，内容如下：

`,l:"engineering/project-structures/vue3-vite/index.html#创建-prettier-过滤规则",a:"创建-prettier-过滤规则"},"97.28":{t:"OS",p:`.DS_Store
.idea
.editorconfig
pnpm-lock.yaml
.npmrc
Ignored su ...`,l:"engineering/project-structures/vue3-vite/index.html#os",a:"os"},"97.29":{t:"Local",p:`.husky
`,l:"engineering/project-structures/vue3-vite/index.html#local",a:"local"},"97.30":{t:"Built-files",p:`.cache
dist

解决 Prettier 和 ESLint 冲突
-----------------------

 ...`,l:"engineering/project-structures/vue3-vite/index.html#built-files",a:"built-files"},"97.31":{t:"安装依赖",p:`npm i eslint-plugin-prettier eslint-config-prettier -D


`,l:"engineering/project-structures/vue3-vite/index.html#安装依赖",a:"安装依赖"},"97.32":{t:"修改 ESLint 配置文件",p:"修改 .eslintrc.js 文件，在 extends 中添加 plugin:prettier/recommended 规 ...",l:"engineering/project-structures/vue3-vite/index.html#修改-eslint-配置文件",a:"修改-eslint-配置文件"},"97.33":{t:"安装依赖",p:`
Stylelint - Stylelint 本体
stylelint-config-prettier - 关闭 Style ...`,l:"engineering/project-structures/vue3-vite/index.html#安装依赖",a:"安装依赖"},"97.34":{t:"安装插件",p:`Visual Studio Code 编辑器使用 Stylelint 配置需要下载插件 Stylelint 。
!Style ...`,l:"engineering/project-structures/vue3-vite/index.html#安装插件",a:"安装插件"},"97.35":{t:"创建 Stylelint 配置文件",p:`在项目根目录创建 .stylelintrc.js 文件，并填入以下内容：
module.exports = {
  root ...`,l:"engineering/project-structures/vue3-vite/index.html#创建-stylelint-配置文件",a:"创建-stylelint-配置文件"},"97.36":{t:"创建 Stylelint 过滤规则",p:`在项目根目录添加一个 .stylelintignore 文件，内容如下：
# .stylelintignore
# 旧的不需 ...`,l:"engineering/project-structures/vue3-vite/index.html#创建-stylelint-过滤规则",a:"创建-stylelint-过滤规则"},"97.37":{t:"启用 Vue 文件支持",p:`Stylelint v14 版本默认不支持 vue 文件中的 style 代码自动检测，详情查看官方迁移指南
`,l:"engineering/project-structures/vue3-vite/index.html#启用-vue-文件支持",a:"启用-vue-文件支持"},"97.38":{t:"安装依赖",p:`
stylelint-config-html - 解析 vue 文件
postcss-html - 使用 stylelint ...`,l:"engineering/project-structures/vue3-vite/index.html#安装依赖",a:"安装依赖"},"97.39":{t:"修改 Stylelint 配置文件",p:`修改 .stylelintrc.js 文件，添加如下配置：
module.exports = {
  overrides:  ...`,l:"engineering/project-structures/vue3-vite/index.html#修改-stylelint-配置文件",a:"修改-stylelint-配置文件"},"97.40":{t:"修改 Visual Studio Code 工作区配置",p:`Visual Studio Code 在 settings.json 设置文件中，增加以下代码：
{
  &quot;sty ...`,l:"engineering/project-structures/vue3-vite/index.html#修改-visual-studio-code-工作区配置",a:"修改-visual-studio-code-工作区配置"},"97.41":{t:"配置 husky",p:`
注意：本项目使用 husky 6.x 版本，6.x 版本配置方式跟之前版本有较大差异，当发现配置方法不一致时，一切以 hu ...`,l:"engineering/project-structures/vue3-vite/index.html#配置-husky",a:"配置-husky"},"97.42":{t:"配置 lint-staged",p:"lint-staged 一般结合 husky 来使用，它可以让 husky 的 hook 触发的命令只作用于 git 暂存区 ...",l:"engineering/project-structures/vue3-vite/index.html#配置-lint-staged",a:"配置-lint-staged"},"97.43":{t:"安装依赖",p:`npm i lint-staged -D


`,l:"engineering/project-structures/vue3-vite/index.html#安装依赖",a:"安装依赖"},"97.44":{t:"新增配置",p:`在 package.json 里增加 lint-staged 配置项：
{
  &quot;lint-staged&quot ...`,l:"engineering/project-structures/vue3-vite/index.html#新增配置",a:"新增配置"},"97.45":{t:"修改触发命令",p:`修改 .husky/pre-commit 文件触发命令为：
npx lint-staged


!pre-commit
经过 ...`,l:"engineering/project-structures/vue3-vite/index.html#修改触发命令",a:"修改触发命令"},"97.46":{t:"提交规范",p:"多人协作项目中，在提交代码环节，也存在一种情况：不能保证每个人对提交信息的准确描述，因此会出现提交信息紊乱、风格不一致的情况 ...",l:"engineering/project-structures/vue3-vite/index.html#提交规范",a:"提交规范"},"97.47":{t:"Header",p:`Header 部分包括三个字段 type（必需）、scope（可选）和 subject（必需）。
&lt;type&gt;( ...`,l:"engineering/project-structures/vue3-vite/index.html#header",a:"header"},"97.48":{t:"Body",p:`body 是对本次 commit 的详细描述，可以分成多行。
跟 subject 类似，用动词开头，body 应该说明修改的 ...`,l:"engineering/project-structures/vue3-vite/index.html#body",a:"body"},"97.49":{t:"Footer",p:`如果本次提交的代码是突破性的变更或关闭缺陷，则 Footer 必需，否则可以省略。


突破性的变更
当前代码与上一个版本有 ...`,l:"engineering/project-structures/vue3-vite/index.html#footer",a:"footer"},"97.50":{t:"参考例子",p:`

feat
feat(browser): onUrlChange event (popstate/hashchange/p ...`,l:"engineering/project-structures/vue3-vite/index.html#参考例子",a:"参考例子"},"97.51":{t:"安装依赖",p:`npm install -D cz-git


`,l:"engineering/project-structures/vue3-vite/index.html#安装依赖",a:"安装依赖"},"97.52":{t:"指定适配器",p:`修改 package.json 文件，添加 config 指定使用的适配器
{
  &quot;scripts&quot;: ...`,l:"engineering/project-structures/vue3-vite/index.html#指定适配器",a:"指定适配器"},"97.53":{t:"自定义配置（可选）",p:`cz-git 与 commitlint 进行联动给予校验信息，所以可以编写于 commitlint 配置文件之中。
例如：( ...`,l:"engineering/project-structures/vue3-vite/index.html#自定义配置-可选",a:"自定义配置-可选"},"97.54":{t:"全局使用",p:`
全局安装的好处在于：在任何项目下都可以利用 cz 或 git cz 命令启动命令行工具，生成标准化 commit mess ...`,l:"engineering/project-structures/vue3-vite/index.html#全局使用",a:"全局使用"},"97.55":{t:"安装全局依赖",p:`npm install -g cz-git commitizen


`,l:"engineering/project-structures/vue3-vite/index.html#安装全局依赖",a:"安装全局依赖"},"97.56":{t:"全局配置适配器类型",p:`echo '{ &quot;path&quot;: &quot;cz-git&quot; }' &gt; ~/.czrc

 ...`,l:"engineering/project-structures/vue3-vite/index.html#全局配置适配器类型",a:"全局配置适配器类型"},"97.57":{t:"自定义配置（可选）",p:`方式一： 编辑 ~/.czrc 文件以 json 形式添加配置，例如：
{
  &quot;path&quot;: &quo ...`,l:"engineering/project-structures/vue3-vite/index.html#自定义配置-可选",a:"自定义配置-可选"},"97.58":{t:"安装",p:`
@commitlint/cli - Commitlint 本体
@commitlint/config-convention ...`,l:"engineering/project-structures/vue3-vite/index.html#安装",a:"安装"},"97.59":{t:"配置",p:`在项目根目录创建 commitlint.config.js 文件，并填入以下内容：
module.exports = {
  ...`,l:"engineering/project-structures/vue3-vite/index.html#配置",a:"配置"},"97.60":{t:"自动部署",p:`本章节将介绍如何使用 CI（Continuous Integration 持续集成）服务来完成项目部署工作。
常见的 CI  ...`,l:"engineering/project-structures/vue3-vite/index.html#自动部署",a:"自动部署"},"97.61":{t:"创建 GitHub 仓库",p:`因为 GitHub Actions 只对 GitHub 仓库有效，所以创建 GitHub 仓库来托管项目代码。
!创建 Gi ...`,l:"engineering/project-structures/vue3-vite/index.html#创建-github-仓库",a:"创建-github-仓库"},"98.0":{t:"# 数据埋点起步",p:"",l:"engineering/sdk/buried-point/index.html",a:"数据埋点起步"},"98.1":{t:"认识数据埋点 SDK",p:`
SDK 全称是 Software Development Kit 即 软件开发工具包，一般都是一些软件工程师为特定的软件包 ...`,l:"engineering/sdk/buried-point/index.html#认识数据埋点-sdk",a:"认识数据埋点-sdk"},"98.2":{t:"用户行为",p:`用户行为就是在网页应用中进行的一系列操作，但用户的操作有很多种，都需要记录下来是不可能的，一般需要记录用户的以下几种行为：
 ...`,l:"engineering/sdk/buried-point/index.html#用户行为",a:"用户行为"},"98.3":{t:"错误警告",p:"页面中代码运行产生的错误，可能会导致用户核心操作流程被中断，为了避免大量用户受到影响，我们需要获取 生产环境的错误数据，这样 ...",l:"engineering/sdk/buried-point/index.html#错误警告",a:"错误警告"},"98.4":{t:"页面性能",p:"页面性能其实也是前端性能优化中一个需要考虑和优化的点，毕竟如果一个网站老是发生 白屏、交互卡顿、页面资源加载时间长 等问题， ...",l:"engineering/sdk/buried-point/index.html#页面性能",a:"页面性能"},"98.5":{t:"设计前端数据埋点 SDK",p:"这里只我们考虑数据埋点的核心内容，因此不会涉及得肯定没有那么全面，而一开始也不可能设计得全面，只要保证核心功能，那么在基于核 ...",l:"engineering/sdk/buried-point/index.html#设计前端数据埋点-sdk",a:"设计前端数据埋点-sdk"},"98.6":{t:"应用的唯一标识 — options.AppId",p:"数据埋点 SDK 作为一个通用的工具集，是可供多个系统进行使用的，而这就意味着需要去保证每个应用的唯一性，一般来讲，在初始化 ...",l:"engineering/sdk/buried-point/index.html#应用的唯一标识-—-options-appid",a:"应用的唯一标识-—-options-appid"},"98.7":{t:"数据发送格式 — data",p:`由于需要收集的数据类型包含多种，最好能够定义一种比较通用的数据格式，便于更友好地进行数据收集。
这里简单定义一下数据格式，大 ...`,l:"engineering/sdk/buried-point/index.html#数据发送格式-—-data",a:"数据发送格式-—-data"},"98.8":{t:"统计 PV 和 UV — 自动触发埋点",p:"关于 PV 和 UV 在上述已经做过介绍了，本质上这两个数据统计都可在一个上报类型为 action 数据发送中获得，主要看监 ...",l:"engineering/sdk/buried-point/index.html#统计-pv-和-uv-—-自动触发埋点",a:"统计-pv-和-uv-—-自动触发埋点"},"98.9":{t:"统计用户点击按钮 — 交互式触发埋点",p:"假设我们希望记录某些按钮的使用次数的数据，可以在 document 上监听 click 事件，目的利用事件冒泡以便于不需要侵 ...",l:"engineering/sdk/buried-point/index.html#统计用户点击按钮-—-交互式触发埋点",a:"统计用户点击按钮-—-交互式触发埋点"},"98.10":{t:"全局错误",p:`全局错误，即未被捕获的错误，可以通过 window.onerror 事件来捕获，然后进行错误数据上报，大致如下：
windo ...`,l:"engineering/sdk/buried-point/index.html#全局错误",a:"全局错误"},"98.11":{t:"局部错误",p:"局部错误，即通过 try...catch、promise.then、promise.catch 等捕获的错误，大致使用如下： ...",l:"engineering/sdk/buried-point/index.html#局部错误",a:"局部错误"},"98.12":{t:"接口请求错误",p:"接口请求错误，即在二次封装请求 API 中进行请求和接收响应时的错误，为了方便这里以 axios 来举例子，我们可以在它的  ...",l:"engineering/sdk/buried-point/index.html#接口请求错误",a:"接口请求错误"},"98.13":{t:"组件级错误",p:"组件级错误，即使用 Vue / React 框架组件时发生的错误，完全可以使用它们在官方文档中提到的错误捕获方式来捕获并上报 ...",l:"engineering/sdk/buried-point/index.html#组件级错误",a:"组件级错误"},"99.0":{t:"# 从0到1搭建前端监控平台",p:`文章分成以下六部分来介绍：


自研监控平台解决了哪些痛点，实现了什么亮点功能？


相比sentry等监控方案，自研监控的 ...`,l:"engineering/sdk/monitoring-platform/index.html",a:"从0到1搭建前端监控平台"},"99.1":{t:"定位源码",p:`项目出错，要是能定位到源码就好了，可线上的项目都是打包后的代码，也不能把 .map 文件放到线上
监控平台通过 source ...`,l:"engineering/sdk/monitoring-platform/index.html#定位源码",a:"定位源码"},"99.2":{t:"播放录屏",p:"多数场景下，定位到具体的源码，就可以定位bug，但如果是用户做了异常操作，或者是在某些复杂操作下才出现的bug，仅仅通过定位 ...",l:"engineering/sdk/monitoring-platform/index.html#播放录屏",a:"播放录屏"},"99.3":{t:"记录用户行为",p:`通过 定位源码 + 播放录屏 这套组合，还原错误应该够用了，同时监控平台也提供了 记录用户行为 这种方式
假如用户做了很多操 ...`,l:"engineering/sdk/monitoring-platform/index.html#记录用户行为",a:"记录用户行为"},"99.4":{t:"监控目的",p:`!title.png
`,l:"engineering/sdk/monitoring-platform/index.html#监控目的",a:"监控目的"},"99.5":{t:"异常分析",p:`按照 5W1H 法则来分析前端异常，需要知道以下信息

What，发⽣了什么错误：JS错误、异步错误、资源加载、接口错误等
 ...`,l:"engineering/sdk/monitoring-platform/index.html#异常分析",a:"异常分析"},"99.6":{t:"错误捕获方式",p:`1）try/catch
只能捕获代码常规的运行错误，语法错误和异步错误不能捕获到
示例：
// 示例1：常规运行时错误，可以 ...`,l:"engineering/sdk/monitoring-platform/index.html#错误捕获方式",a:"错误捕获方式"},"99.7":{t:"Vue 错误",p:`Vue项目中，window.onerror 和 error 事件不能捕获到常规的代码错误
异常代码：
export defa ...`,l:"engineering/sdk/monitoring-platform/index.html#vue-错误",a:"vue-错误"},"99.8":{t:"React 错误",p:"从 react16 开始，官方提供了 ErrorBoundary 错误边界的功能，被该组件包裹的子组件，render 函数报 ...",l:"engineering/sdk/monitoring-platform/index.html#react-错误",a:"react-错误"},"99.9":{t:"跨域问题",p:"如果当前页面中，引入了其他域名的JS资源，如果资源出现错误，error 事件只会监测到一个 script error 的异常 ...",l:"engineering/sdk/monitoring-platform/index.html#跨域问题",a:"跨域问题"},"99.10":{t:"接口错误",p:"接口监控的实现原理：针对浏览器内置的 XMLHttpRequest、fetch 对象，利用 AOP 切片编程重写该方法，实现 ...",l:"engineering/sdk/monitoring-platform/index.html#接口错误",a:"接口错误"},"99.11":{t:"设计思路",p:`1、通过Breadcrumb类来创建用户行为的对象，来存储和管理所有的用户行为
2、通过重写或添加相应的事件，完成用户行为数 ...`,l:"engineering/sdk/monitoring-platform/index.html#设计思路",a:"设计思路"},"99.12":{t:"页面跳转",p:"通过监听路由的变化来判断页面跳转，路由有history、hash两种模式，history模式可以监听popstate事件，h ...",l:"engineering/sdk/monitoring-platform/index.html#页面跳转",a:"页面跳转"},"99.13":{t:"用户点击",p:`给 document 对象添加click事件，并上报
function domReplace() {
  document. ...`,l:"engineering/sdk/monitoring-platform/index.html#用户点击",a:"用户点击"},"99.14":{t:"资源加载",p:`获取页面中加载的资源信息，比如它们的 url 是什么、加载了多久、是否来自缓存等，最终生成 资源加载瀑布图
!waterfa ...`,l:"engineering/sdk/monitoring-platform/index.html#资源加载",a:"资源加载"},"99.15":{t:"long task",p:`执行时间超过50ms的任务，被称为 long task 长任务
获取页面的长任务列表：
const entryHandler ...`,l:"engineering/sdk/monitoring-platform/index.html#long-task",a:"long-task"},"99.16":{t:"memory页面内存",p:`performance.memory 可以显示此刻内存占用情况，它是一个动态值，其中：


jsHeapSizeLimit  ...`,l:"engineering/sdk/monitoring-platform/index.html#memory页面内存",a:"memory页面内存"},"99.17":{t:"首屏加载时间",p:`首屏加载时间和首页加载时间不一样，首屏指的是屏幕内的dom渲染完成的时间
比如首页很长需要好几屏展示，这种情况下屏幕以外的元 ...`,l:"engineering/sdk/monitoring-platform/index.html#首屏加载时间",a:"首屏加载时间"},"99.18":{t:"整体架构",p:`!sdkProcess.jpg
整体架构使用 发布-订阅 设计模式，这样设计的好处是便于后续扩展与维护，如果想添加新的hoo ...`,l:"engineering/sdk/monitoring-platform/index.html#整体架构",a:"整体架构"},"99.19":{t:"SDK 入口",p:`src/index.js
对外导出init事件，配置了vue、react项目的不同引入方式
vue项目在Vue.config ...`,l:"engineering/sdk/monitoring-platform/index.html#sdk-入口",a:"sdk-入口"},"99.20":{t:"事件发布与订阅",p:`通过添加监听事件来捕获错误，利用 AOP 切片编程，重写接口请求、路由监听等功能，从而获取对应的数据
src/load.js ...`,l:"engineering/sdk/monitoring-platform/index.html#事件发布与订阅",a:"事件发布与订阅"},"99.21":{t:"用户行为收集",p:`core/breadcrumb.js
创建用户行为类，stack用来存储用户行为，当长度超过限制时，最早的一条数据会被覆盖掉 ...`,l:"engineering/sdk/monitoring-platform/index.html#用户行为收集",a:"用户行为收集"},"99.22":{t:"数据上报方式",p:`支持图片打点上报和fetch请求上报两种方式
图片打点上报的优势：
1）支持跨域，一般而言，上报域名都不是当前域名，上报的接 ...`,l:"engineering/sdk/monitoring-platform/index.html#数据上报方式",a:"数据上报方式"},"99.23":{t:"数据上报时机",p:`优先使用 requestIdleCallback，利用浏览器空闲时间上报，其次使用微任务上报
!queue.png
监控SD ...`,l:"engineering/sdk/monitoring-platform/index.html#数据上报时机",a:"数据上报时机"},"100.0":{t:"# 前端录屏+定位源码",p:`web-see 前端监控方案，提供了 前端录屏+定位源码 方式，让bug无处藏身
这是前端监控的第二篇，该篇讲解如何实现错误 ...`,l:"engineering/sdk/source-bug/index.html",a:"前端录屏-定位源码"},"100.1":{t:"SourceMap 文件",p:`先了解下 SourceMap 的基本内容
例如 app.a2a3ceec.js 代码如下：
var add=function ...`,l:"engineering/sdk/source-bug/index.html#sourcemap-文件",a:"sourcemap-文件"},"100.2":{t:"source-map-js 库",p:`代码还原，这里主要使用 source-map-js 库，下面介绍下如何使用
示例代码：
import sourceMap f ...`,l:"engineering/sdk/source-bug/index.html#source-map-js-库",a:"source-map-js-库"},"100.3":{t:"error-stack-parser 库",p:`通过第一篇文章的介绍，我们知道可以通过多种方式来捕获报错
比如 error事件、unhandledrejection事件、v ...`,l:"engineering/sdk/source-bug/index.html#error-stack-parser-库",a:"error-stack-parser-库"},"100.4":{t:"示例演示",p:`下载 web-see-demo 安装并运行
1）点击 js错误 按钮，会执行 HomeView.vue 文件中的 codeE ...`,l:"engineering/sdk/source-bug/index.html#示例演示",a:"示例演示"},"100.5":{t:"流程总结",p:`!sourcemap.png
如上图所示，定位源码流程总结：
1、项目中引入监控 SDK，打包后将js文件发布到服务器上
2 ...`,l:"engineering/sdk/source-bug/index.html#流程总结",a:"流程总结"},"100.6":{t:"rrweb 使用",p:`先介绍下在vue中如何使用
录制示例：
import { record } from 'rrweb';
// events存 ...`,l:"engineering/sdk/source-bug/index.html#rrweb-使用",a:"rrweb-使用"},"100.7":{t:"rrweb 原理浅析",p:`rrweb 主要由 rrweb 、 rrweb-player 和 rrweb-snapshot 三个库组成：
1）rrweb ...`,l:"engineering/sdk/source-bug/index.html#rrweb-原理浅析",a:"rrweb-原理浅析"},"100.8":{t:"压缩数据",p:`如果一直录屏，数据量是巨大的
实测下来，录制10s的时长，数据大小约为 8M 左右（页面的不同复杂度、用户不同操作的频率都会 ...`,l:"engineering/sdk/source-bug/index.html#压缩数据",a:"压缩数据"},"100.9":{t:"何时上报录屏数据",p:`一般关注的是，页面报错的时候用户做了哪些操作，所以目前只把报错前10s的录屏上报到服务端
如何只上报报错时的录屏信息呢 ？
 ...`,l:"engineering/sdk/source-bug/index.html#何时上报录屏数据",a:"何时上报录屏数据"},"101.0":{t:"基于rem的适配方案",p:`
`,l:"engineering/vite/screen-adaptation/index.html",a:"基于rem的适配方案"},"101.1":{t:"rem是什么？",p:"rem是指相对于根元素的字体大小的单位，在日常开发过程中我们通常把根元素（html/body）的字体设置为10px,方便于我 ...",l:"engineering/vite/screen-adaptation/index.html#rem是什么",a:"rem是什么"},"101.2":{t:"适用场景",p:`不固定宽高比的Web应用，适用于绝大部分业务场景 !px2rem.gif
`,l:"engineering/vite/screen-adaptation/index.html#适用场景",a:"适用场景"},"101.3":{t:"项目实战",p:`
安装依赖

npm i postcss-pxtorem autoprefixer amfe-flexible --save ...`,l:"engineering/vite/screen-adaptation/index.html#项目实战",a:"项目实战"},"101.4":{t:"适用场景",p:`固定宽高比的Web应用，如大屏或者固定窗口业务应用 !scale.gif
`,l:"engineering/vite/screen-adaptation/index.html#适用场景",a:"适用场景"},"101.5":{t:"项目实战",p:`
新建resize.ts/js文件 !QQ图片20220927111729.png

import { ref } from ...`,l:"engineering/vite/screen-adaptation/index.html#项目实战",a:"项目实战"},"102.0":{t:"# Vite 入门篇",p:`本文为稀土掘金技术社区首发签约文章，14天内禁止转载，14天后未获授权禁止转载，侵权必究！
相信大部分兄弟都体验过 Vite ...`,l:"engineering/vite/start/index.html",a:"vite-入门篇"},"102.1":{t:"对 CSS 的处理",p:`CSS Modules
在不同模块中定义相同类名，会导致样式被覆盖，这时候就要用到 CSS module 。以 .modul ...`,l:"engineering/vite/start/index.html#对-css-的处理",a:"对-css-的处理"},"102.2":{t:"对静态资源的处理",p:`

将资源引入为 URL 。默认情况下引入一个静态资源，会返回这个资源的 URL 路径，也就是绝对路径。
import im ...`,l:"engineering/vite/start/index.html#对静态资源的处理",a:"对静态资源的处理"},"102.3":{t:"对 JSON 的处理",p:`JSON 文件可以被直接导入。同时也支持具名导入，帮助我们更好地利用 treeshaking ：
// 导入整个对象
imp ...`,l:"engineering/vite/start/index.html#对-json-的处理",a:"对-json-的处理"},"102.4":{t:"对 Vue 的处理",p:`Vite 为 Vue 提供第一优先级支持，直接使用相应的插件就好了：
Vue 3 支持：@vitejs/plugin-vue ...`,l:"engineering/vite/start/index.html#对-vue-的处理",a:"对-vue-的处理"},"102.5":{t:"对 TS 的处理",p:"Vite 天然支持引入 .ts 文件。Vite 使用 esbuild 将 TypeScript 转译到 JavaScript ...",l:"engineering/vite/start/index.html#对-ts-的处理",a:"对-ts-的处理"},"103.0":{t:"# 从0搭建一个WebRTC，实现多房间多对多通话，并实现屏幕录制",p:`为什么要使用WebRTC
WebRTC全称Web Real-Time Communication，是一种实时音视频的技术，它 ...`,l:"engineering/webRTC/screen-recording/index.html",a:"从0搭建一个webrtc-实现多房间多对多通话-并实现屏幕录制"},"103.1":{t:"enumerateDevices",p:"第一个要介绍的API是enumerateDevices，是请求一个可用的媒体输入和输出设备的列表，例如麦克风，摄像机，耳机设 ...",l:"engineering/webRTC/screen-recording/index.html#enumeratedevices",a:"enumeratedevices"},"103.2":{t:"getUserMedia",p:`这个API顾名思义，就是去获取用户的Meida的，那我们直接执行这个API来看看效果

ps: 由于掘金的代码片段的ifra ...`,l:"engineering/webRTC/screen-recording/index.html#getusermedia",a:"getusermedia"},"103.3":{t:"视频参数配置",p:`interface MediaTrackConstraintSet {
    // 画面比例
    aspectRati ...`,l:"engineering/webRTC/screen-recording/index.html#视频参数配置",a:"视频参数配置"},"103.4":{t:"音频参数配置",p:`interface MediaTrackConstraintSet {
    // 是否开启AGC自动增益，可以在原有音量 ...`,l:"engineering/webRTC/screen-recording/index.html#音频参数配置",a:"音频参数配置"},"103.5":{t:"一对一的流程",p:`我们建立一对一的链接需要知道后流程是怎么流转的，接下来上一张图，便可以清晰的了解
!1825097218-5db028f8d ...`,l:"engineering/webRTC/screen-recording/index.html#一对一的流程",a:"一对一的流程"},"103.6":{t:"初始化",p:`首先启动fastify服务，接下来在Vue项目安装socket.io-client@4然后连接服务端的socket
impo ...`,l:"engineering/webRTC/screen-recording/index.html#初始化",a:"初始化"},"103.7":{t:"创建offer",p:`开始创建RTCPeerConnection，这里采用google的公共stun服务
const peerConnect =  ...`,l:"engineering/webRTC/screen-recording/index.html#创建offer",a:"创建offer"},"103.8":{t:"处理offer",p:"B需要监听socket里面的offer事件并创建RTCPeerConnection，将这个offer设置到远端，接下来来创建 ...",l:"engineering/webRTC/screen-recording/index.html#处理offer",a:"处理offer"},"103.9":{t:"处理answer",p:`服务端广播answer
socket.on('offer', async (offer, callback) =&gt; { ...`,l:"engineering/webRTC/screen-recording/index.html#处理answer",a:"处理answer"},"103.10":{t:"处理ICE-candidate",p:`接下来A会获取到ICE候选信息，需要发送给B
peerConnect.onicecandidate = (candidate ...`,l:"engineering/webRTC/screen-recording/index.html#处理ice-candidate",a:"处理ice-candidate"},"103.11":{t:"处理音视频数据",p:`peerConnect.ontrack = (track: RTCTrackEvent) =&gt; {
    if (t ...`,l:"engineering/webRTC/screen-recording/index.html#处理音视频数据",a:"处理音视频数据"},"103.12":{t:"成员列表的接口",p:"在我们登录socket服务的时候我们在query参数里面有房间号，userId和昵称，我们可以通过redis记录对应的房间号 ...",l:"engineering/webRTC/screen-recording/index.html#成员列表的接口",a:"成员列表的接口"},"103.13":{t:"多对多初始化",p:`由于需要给每个人发送offer，需要对上面的初始化函数进行封装。
/**
 * 创建RTCPeerConnection
 * ...`,l:"engineering/webRTC/screen-recording/index.html#多对多初始化",a:"多对多初始化"},"103.14":{t:"获取成员列表",p:`上面实现了成员列表。接下来进入了对应的房间后需要轮询获取对应的成员列表
let userList = ref([]);
co ...`,l:"engineering/webRTC/screen-recording/index.html#获取成员列表",a:"获取成员列表"},"103.15":{t:"创建多对多的Offer和Answer",p:"在我们获取到视频流的时候，可以对在线列表里除了自己的人都创建一个RTCpeer，来进行一对一连接，从而达到多对多连接的效果。 ...",l:"engineering/webRTC/screen-recording/index.html#创建多对多的offer和answer",a:"创建多对多的offer和answer"},"103.16":{t:"getDisplayMedia",p:`这个API是在MediaDevices里面的一个方法，是用来获取屏幕共享的。

这个 MediaDevices  接口的 g ...`,l:"engineering/webRTC/screen-recording/index.html#getdisplaymedia",a:"getdisplaymedia"},"103.17":{t:"MediaRecorder",p:"获取到屏幕共享流后，需要使用 MediaRecorder这个api来对流进行录制，接下来我们先获取屏幕流,同时创建一个Mei ...",l:"engineering/webRTC/screen-recording/index.html#mediarecorder",a:"mediarecorder"},"104.0":{t:"# WebRTC 的应用场景",p:`
WebRTC (Web Real-Time Communications) 是一项实时通讯技术，它允许网络应用或者站点，在 ...`,l:"engineering/webRTC/start/index.html",a:"webrtc-的应用场景"},"105.0":{t:"<HomeBackgrount></HomeBackgrount>",p:"",l:"index.html",a:"homebackgrount-homebackgrount"},"106.0":{t:"!图片",p:"",l:"interview-questions/css/start/index.html",a:"图片"},"106.1":{t:"基础",p:"",l:"interview-questions/css/start/index.html#基础",a:"基础"},"106.2":{t:"语法",p:`CSS 的核心功能是将 CSS 属性设定为特定的值。一个属性与值的键值对被称为声明（declaration）。

color ...`,l:"interview-questions/css/start/index.html#语法",a:"语法"},"106.3":{t:"@规则",p:"CSS 规则是样式表的主体，通常样式表会包括大量的规则列表。但有时候也需要在样式表中包括其他的一些信息，比如字符集，导入其它 ...",l:"interview-questions/css/start/index.html#规则",a:"规则"},"106.4":{t:"@charset",p:"@charset 用于定义样式表使用的字符集。它必须是样式表中的第一个元素。如果有多个 @charset 被声明，只有第一个 ...",l:"interview-questions/css/start/index.html#charset",a:"charset"},"106.5":{t:"@import",p:`@import 用于告诉 CSS 引擎引入一个外部样式表。
link 和 @import 都能导入一个样式文件，它们有什么区 ...`,l:"interview-questions/css/start/index.html#import",a:"import"},"106.6":{t:"@supports",p:`@supports 用于查询特定的 CSS 是否生效，可以结合 not、and 和 or 操作符进行后续的操作。
/* 如果 ...`,l:"interview-questions/css/start/index.html#supports",a:"supports"},"106.7":{t:"层叠性",p:"层叠样式表，这里的层叠怎么理解呢？其实它是 CSS 中的核心特性之一，用于合并来自多个源的属性值的算法。比如说针对某个 HT ...",l:"interview-questions/css/start/index.html#层叠性",a:"层叠性"},"106.8":{t:"选择器",p:"CSS 选择器无疑是其核心之一，对于基础选择器以及一些常用伪类必须掌握。下面列出了常用的选择器。 想要获取更多选择器的用法可 ...",l:"interview-questions/css/start/index.html#选择器",a:"选择器"},"106.9":{t:"基础选择器",p:`
标签选择器：h1
类选择器：.checked
ID 选择器：#picker
通配选择器：*

属性选择器

[attr]： ...`,l:"interview-questions/css/start/index.html#基础选择器",a:"基础选择器"},"106.10":{t:"组合选择器",p:`
相邻兄弟选择器：A + B
普通兄弟选择器：A ~ B
子选择器：A &gt; B
后代选择器：A B

`,l:"interview-questions/css/start/index.html#组合选择器",a:"组合选择器"},"106.11":{t:"伪类",p:`条件伪类

:lang()：基于元素语言来匹配页面元素；
:dir()：匹配特定文字书写方向的元素；
:has()：匹配包含 ...`,l:"interview-questions/css/start/index.html#伪类",a:"伪类"},"106.12":{t:"伪元素",p:`
::before：在元素前插入内容；
::after：在元素后插入内容；

`,l:"interview-questions/css/start/index.html#伪元素",a:"伪元素"},"106.13":{t:"优先级",p:`!图片
优先级就是分配给指定的 CSS 声明的一个权重，它由匹配的选择器中的每一种选择器类型的数值决定。为了记忆，可以把权重 ...`,l:"interview-questions/css/start/index.html#优先级",a:"优先级"},"106.14":{t:"继承性",p:`!图片
在 CSS 中有一个很重要的特性就是子元素会继承父元素对应属性计算后的值。比如页面根元素 html 的文本颜色默认是 ...`,l:"interview-questions/css/start/index.html#继承性",a:"继承性"},"106.15":{t:"文档流",p:"在 CSS 的世界中，会把内容按照从左到右、从上到下的顺序进行排列显示。正常情况下会把页面分割成一行一行的显示，而每行又可能 ...",l:"interview-questions/css/start/index.html#文档流",a:"文档流"},"106.16":{t:"盒模型",p:"在 CSS 中任何元素都可以看成是一个盒子，而一个盒子是由 4 部分组成的：内容（content）、内边距（padding） ...",l:"interview-questions/css/start/index.html#盒模型",a:"盒模型"},"106.17":{t:"视觉格式化模型",p:"视觉格式化模型（Visual formatting model）是用来处理和在视觉媒体上显示文档时使用的计算规则。CSS 中 ...",l:"interview-questions/css/start/index.html#视觉格式化模型",a:"视觉格式化模型"},"106.18":{t:"outer display type",p:"对外显示方面，盒子类型可以分成 2 类：block-level box（块级盒子） 和 inline-level box（行 ...",l:"interview-questions/css/start/index.html#outer-display-type",a:"outer-display-type"},"106.19":{t:"inner display type",p:"对内方面，其实就是把元素当成了容器，里面包裹着文本或者其他子元素。container box 的类型依据 display 的 ...",l:"interview-questions/css/start/index.html#inner-display-type",a:"inner-display-type"},"106.20":{t:"格式化上下文",p:"格式化上下文（Formatting Context）是 CSS2.1 规范中的一个概念，大概说的是页面中的一块渲染区域，规定 ...",l:"interview-questions/css/start/index.html#格式化上下文",a:"格式化上下文"},"106.21":{t:"BFC",p:`块格式化上下文，它是一个独立的渲染区域，只有块级盒子参与，它规定了内部的块级盒子如何布局，并且与这个区域外部毫不相干。
!图 ...`,l:"interview-questions/css/start/index.html#bfc",a:"bfc"},"106.22":{t:"IFC",p:"IFC 的形成条件非常简单，块级元素中仅包含内联级别元素，需要注意的是当IFC中有块级元素插入时，会产生两个匿名块将父元素分 ...",l:"interview-questions/css/start/index.html#ifc",a:"ifc"},"106.23":{t:"层叠上下文",p:"在电脑显示屏幕上的显示的页面其实是一个三维的空间，水平方向是 X 轴，竖直方向是 Y 轴，而屏幕到眼睛的方向可以看成是 Z  ...",l:"interview-questions/css/start/index.html#层叠上下文",a:"层叠上下文"},"106.24":{t:"值和单位",p:`CSS 的声明是由属性和值组成的，而值的类型有许多种：

数值：长度值 ，用于指定例如元素 width、border-wid ...`,l:"interview-questions/css/start/index.html#值和单位",a:"值和单位"},"106.25":{t:"px",p:"屏幕分辨率是指在屏幕的横纵方向上的像素点数量，比如分辨率 1920×1080 意味着水平方向含有 1920 个像素数，垂直方 ...",l:"interview-questions/css/start/index.html#px",a:"px"},"106.26":{t:"em",p:`em 是 CSS 中的相对长度单位中的一个。居然是相对的，那它到底是相对的谁呢？它有 2 层意思：

在 font-size ...`,l:"interview-questions/css/start/index.html#em",a:"em"},"106.27":{t:"rem",p:`rem(root em) 和 em 一样，也是一个相对长度单位，不过 rem 相对的是 HTML 的根元素 html。
re ...`,l:"interview-questions/css/start/index.html#rem",a:"rem"},"106.28":{t:"vw/vh",p:`vw 和 vh 分别是相对于屏幕视口宽度和高度而言的长度单位：

1vw = 视口宽度均分成 100 份中 1 份的长度；
 ...`,l:"interview-questions/css/start/index.html#vw-vh",a:"vw-vh"},"106.29":{t:"颜色体系",p:`CSS 中用于表示颜色的值种类繁多，足够构成一个体系，所以这里就专门拿出一个小节来讲解它。
根据 CSS 颜色草案 中提到的 ...`,l:"interview-questions/css/start/index.html#颜色体系",a:"颜色体系"},"106.30":{t:"颜色关键字",p:"颜色关键字（color keywords）是不区分大小写的标识符，它表示一个具体的颜色，比如 white（白），黑（blac ...",l:"interview-questions/css/start/index.html#颜色关键字",a:"颜色关键字"},"106.31":{t:"transparent 关键字",p:"transparent 关键字表示一个完全透明的颜色，即该颜色看上去将是背景色。从技术上说，它是带有 alpha 通道为最小 ...",l:"interview-questions/css/start/index.html#transparent-关键字",a:"transparent-关键字"},"106.32":{t:"currentColor 关键字",p:"currentColor 会取当前元素继承父级元素的文本颜色值或声明的文本颜色值，即 computed 后的 color 值 ...",l:"interview-questions/css/start/index.html#currentcolor-关键字",a:"currentcolor-关键字"},"106.33":{t:"RGB\\[A\\] 颜色",p:`RGB[A] 颜色是由 R(red)-G(green)-B(blue)-A(alpha) 组成的色彩空间。
!图片
在 CS ...`,l:"interview-questions/css/start/index.html#rgb-a-颜色",a:"rgb-a-颜色"},"106.34":{t:"HSL\\[A\\] 颜色",p:`HSL[A] 颜色是由色相(hue)-饱和度(saturation)-亮度(lightness)-不透明度组成的颜色体系。
 ...`,l:"interview-questions/css/start/index.html#hsl-a-颜色",a:"hsl-a-颜色"},"106.35":{t:"媒体查询",p:`媒体查询是指针对不同的设备、特定的设备特征或者参数进行定制化的修改网站的样式。
你可以通过给 &lt;link&gt; 加上 ...`,l:"interview-questions/css/start/index.html#媒体查询",a:"媒体查询"},"106.36":{t:"自定义属性",p:"之前我们通常是在预处理器里才可以使用变量，而现在 CSS 里也支持了变量的用法。通过自定义属性就可以在想要使用的地方引用它。 ...",l:"interview-questions/css/start/index.html#自定义属性",a:"自定义属性"},"106.37":{t:"1px 边框解决方案",p:"Retina 显示屏比普通的屏幕有着更高的分辨率，所以在移动端的 1px 边框就会看起来比较粗，为了美观通常需要把这个线条细 ...",l:"interview-questions/css/start/index.html#_1px-边框解决方案",a:"_1px-边框解决方案"},"106.38":{t:"清除浮动",p:`什么是浮动：浮动元素会脱离文档流并向左/向右浮动，直到碰到父元素或者另一个浮动元素。
为什么要清楚浮动，它造成了什么问题？
 ...`,l:"interview-questions/css/start/index.html#清除浮动",a:"清除浮动"},"106.39":{t:"BFC 清除浮动",p:`前面介绍 BFC 的时候提到过，计算 BFC 高度的时候浮动子元素的高度也将计算在内，利用这条规则就可以清楚浮动。
假设一个 ...`,l:"interview-questions/css/start/index.html#bfc-清除浮动",a:"bfc-清除浮动"},"106.40":{t:"通过 clear 清除浮动",p:`我先把结论贴出来：
.clearfix {
    zoom: 1;
}
.clearfix::after {
    co ...`,l:"interview-questions/css/start/index.html#通过-clear-清除浮动",a:"通过-clear-清除浮动"},"106.41":{t:"消除浏览器默认样式",p:"针对同一个类型的 HTML 标签，不同的浏览器往往有不同的表现，所以在网站制作的时候，开发者通常都是需要将这些浏览器的默认样 ...",l:"interview-questions/css/start/index.html#消除浏览器默认样式",a:"消除浏览器默认样式"},"106.42":{t:"长文本处理",p:`默认：字符太长溢出了容器
!图片
字符超出部分换行
!图片
字符超出位置使用连字符
!图片
单行文本超出省略
!图片
多行文 ...`,l:"interview-questions/css/start/index.html#长文本处理",a:"长文本处理"},"106.43":{t:"水平垂直居中",p:`让元素在父元素中呈现出水平垂直居中的形态，无非就 2 种情况：

单行的文本、inline 或者 inline-block  ...`,l:"interview-questions/css/start/index.html#水平垂直居中",a:"水平垂直居中"},"106.44":{t:"单行的文本、inline 或 inline-block 元素",p:`水平居中
此类元素需要水平居中，则父级元素必须是块级元素(block level)，且父级元素上需要这样设置样式：
.par ...`,l:"interview-questions/css/start/index.html#单行的文本、inline-或-inline-block-元素",a:"单行的文本、inline-或-inline-block-元素"},"106.45":{t:"固定宽高的块级盒子",p:`方法一：absolute + 负 margin
!图片
方法二：absolute + margin auto
!图片
方法三 ...`,l:"interview-questions/css/start/index.html#固定宽高的块级盒子",a:"固定宽高的块级盒子"},"106.46":{t:"不固定宽高的块级盒子",p:"这里列了 6 种方法，参考了颜海镜 写的文章 ，其中的两种 line-height 和 writing-mode 方案看后让 ...",l:"interview-questions/css/start/index.html#不固定宽高的块级盒子",a:"不固定宽高的块级盒子"},"106.47":{t:"常用布局",p:"",l:"interview-questions/css/start/index.html#常用布局",a:"常用布局"},"106.48":{t:"两栏布局（边栏定宽主栏自适应）",p:`针对以下这些方案写了几个示例： codepen demo
方法一：float + overflow（BFC 原理）
!图片
 ...`,l:"interview-questions/css/start/index.html#两栏布局-边栏定宽主栏自适应",a:"两栏布局-边栏定宽主栏自适应"},"106.49":{t:"三栏布局（两侧栏定宽主栏自适应）",p:`针对以下这些方案写了几个示例： codepen demo
方法一：圣杯布局
!图片
方法二：双飞翼布局
!图片
方法三：fl ...`,l:"interview-questions/css/start/index.html#三栏布局-两侧栏定宽主栏自适应",a:"三栏布局-两侧栏定宽主栏自适应"},"106.50":{t:"多列等高布局",p:`结合示例阅读更佳：codepen demo
方法一：padding + 负margin
!图片
方法二：设置父级背景图片
! ...`,l:"interview-questions/css/start/index.html#多列等高布局",a:"多列等高布局"},"106.51":{t:"三行布局（头尾定高主栏自适应）",p:`列了 4 种方法，都是基于如下的 HTML 和 CSS 的，结合示例阅读效果更佳：codepen demo
&lt;div  ...`,l:"interview-questions/css/start/index.html#三行布局-头尾定高主栏自适应",a:"三行布局-头尾定高主栏自适应"},"107.0":{t:"# 适配器模式",p:"",l:"interview-questions/design-patterns/adapter/index.html",a:"适配器模式"},"107.1":{t:"场景",p:"当我们使用第三方库的时候，常常会遇到当前接口和第三方接口不匹配的情况，比如使用一个 Table 的组件，它要求我们返回的表格 ...",l:"interview-questions/design-patterns/adapter/index.html#场景",a:"场景"},"107.2":{t:"适配器模式",p:`看一下 维基百科 给的定义：

In software engineering, the adapter pattern i ...`,l:"interview-questions/design-patterns/adapter/index.html#适配器模式",a:"适配器模式"},"107.3":{t:"代码实现",p:"回到开头接口不匹配的问题上，Table 组件提供了一个 responseProcessor 的钩子，我们只需要通过这个钩子将 ...",l:"interview-questions/design-patterns/adapter/index.html#代码实现",a:"代码实现"},"107.4":{t:"更多场景",p:"除了应对数据格式不一致的问题，通过适配器模式我们还可以为上层提供统一接口，来解决兼容性问题。最典型的例子就是 jQuery  ...",l:"interview-questions/design-patterns/adapter/index.html#更多场景",a:"更多场景"},"107.5":{t:"易混设计模式",p:`适配器模式和代理模式在代码结构上很像，代理模式也是对原对象进行包装处理。区别在于它们的意图不同：


适配器模式是为了解决两 ...`,l:"interview-questions/design-patterns/adapter/index.html#易混设计模式",a:"易混设计模式"},"108.0":{t:"# 装饰器模式",p:"",l:"interview-questions/design-patterns/agent/index.html",a:"装饰器模式"},"108.1":{t:"场景",p:`微信小程序定义一个页面是通过微信提供的 Page 方法，然后传入一个配置对象进去。
Page({
  data: { //  ...`,l:"interview-questions/design-patterns/agent/index.html#场景",a:"场景"},"108.2":{t:"装饰器模式",p:`看下维基百科的定义。

装饰器（修饰）模式，是面向对象程式领域中，一种动态地往一个类别中添加新的行为的设计模式。就功能而言， ...`,l:"interview-questions/design-patterns/agent/index.html#装饰器模式",a:"装饰器模式"},"108.3":{t:"代码实现",p:"回到文章最开头的场景，我们需要为每个页面加载的时候上报一些自定义数据。其实我们只需要引入一个装饰函数，将传入的 option ...",l:"interview-questions/design-patterns/agent/index.html#代码实现",a:"代码实现"},"108.4":{t:"易混设计模式",p:`如果之前看过 代理模式
但还是有很大的不同点：
代理模式中，我们是直接将原对象封装到代理对象之中，对于业务方并不关系原始对象 ...`,l:"interview-questions/design-patterns/agent/index.html#易混设计模式",a:"易混设计模式"},"109.0":{t:"# 代理模式",p:"",l:"interview-questions/design-patterns/decorator/index.html",a:"代理模式"},"109.1":{t:"场景",p:`平常业务开发中， 对于网络请求，我们一般会封装成一个模块，并且暴露 get、post 方法供大家使用。
// src/uti ...`,l:"interview-questions/design-patterns/decorator/index.html#场景",a:"场景"},"109.2":{t:"代理模式",p:`贴一下 维基百科的一些解释：

`,l:"interview-questions/design-patterns/decorator/index.html#代理模式",a:"代理模式"},"109.3":{t:" ",p:"",l:"interview-questions/design-patterns/decorator/index.html#",a:""},"109.4":{t:"What problems can the Proxy design pattern solve?",p:`

The access to an object should be controlled.
Additional fun ...`,l:"interview-questions/design-patterns/decorator/index.html#what-problems-can-the-proxy-design-pattern-solve",a:"what-problems-can-the-proxy-design-pattern-solve"},"109.5":{t:" ",p:"",l:"interview-questions/design-patterns/decorator/index.html#",a:""},"109.6":{t:"What solution does the Proxy design pattern describe?",p:`
Define a separate Proxy object that

can be used as substitut ...`,l:"interview-questions/design-patterns/decorator/index.html#what-solution-does-the-proxy-design-pattern-describe",a:"what-solution-does-the-proxy-design-pattern-describe"},"109.7":{t:"代码实现",p:"回到最开始的场景：现在有了一个新需求，我们需要将第一次请求中，后端返回请求中的 graytype 字段塞到后续请求中的 he ...",l:"interview-questions/design-patterns/decorator/index.html#代码实现",a:"代码实现"},"110.0":{t:"# 观察者模式",p:"",l:"interview-questions/design-patterns/observer/index.html",a:"观察者模式"},"110.1":{t:"场景",p:"假设我们在开发一款外卖网站，进入网站的时候，第一步需要去请求后端接口得到用户的常用外卖地址。然后再去请求其他接口、渲染页面。 ...",l:"interview-questions/design-patterns/observer/index.html#场景",a:"场景"},"110.2":{t:"设计模式定义",p:`可以看下 维基百科的介绍：

The observer pattern is a software design patte ...`,l:"interview-questions/design-patterns/observer/index.html#设计模式定义",a:"设计模式定义"},"110.3":{t:"代码实现",p:`回到开头的场景，我们可以利用观察者模式将获取地址后的一系列后续操作解耦出来。

// 页面里有三个模块 A，B，C 需要拿到 ...`,l:"interview-questions/design-patterns/observer/index.html#代码实现",a:"代码实现"},"111.0":{t:"# 发布订阅模式",p:"",l:"interview-questions/design-patterns/release-subscription/index.html",a:"发布订阅模式"},"111.1":{t:"场景",p:"假设我们在开发一款外卖网站，进入网站的时候，第一步需要去请求后端接口得到用户的常用外卖地址。然后再去请求其他接口、渲染页面。 ...",l:"interview-questions/design-patterns/release-subscription/index.html#场景",a:"场景"},"111.2":{t:"设计模式定义",p:`回忆一下观察者模式：

The observer pattern is a software design pattern  ...`,l:"interview-questions/design-patterns/release-subscription/index.html#设计模式定义",a:"设计模式定义"},"111.3":{t:"代码实现",p:`让我们改造下开头写的观察者模式的代码：
地址模块：
import { EventBus } from &quot;./eve ...`,l:"interview-questions/design-patterns/release-subscription/index.html#代码实现",a:"代码实现"},"111.4":{t:"特殊情况",p:"实际工程中可能遇到一些特殊场景，由于 emit 一般在一个异步事件中执行，如果这个异步事件突然执行的变快了，就可能造成某个事 ...",l:"interview-questions/design-patterns/release-subscription/index.html#特殊情况",a:"特殊情况"},"112.0":{t:"# 策略模式",p:"",l:"interview-questions/design-patterns/strategy/index.html",a:"策略模式"},"112.1":{t:"场景",p:`进入一个营销活动页面，会根据后端下发的不同 type ，前端页面展示不同的弹窗。
async getMainData() { ...`,l:"interview-questions/design-patterns/strategy/index.html#场景",a:"场景"},"112.2":{t:"策略模式",p:`看下 维基百科 的定义。

策略模式作为一种软件设计模式，指对象有某个行为，但是在不同的场景中，该行为有不同的实现算法。比如 ...`,l:"interview-questions/design-patterns/strategy/index.html#策略模式",a:"策略模式"},"112.3":{t:"优化代码",p:`将所有弹窗方法从业务代码 getMainData 中抽离出来，只暴露一个打开弹窗的函数供业务调用。
import { ope ...`,l:"interview-questions/design-patterns/strategy/index.html#优化代码",a:"优化代码"},"112.4":{t:"更多场景",p:"表单验证也是一个典型场景，常用的，我们需要验证用户输入字段是否是数字、是否必填、是否是数组，还有自定义的一些验证，同样可以通 ...",l:"interview-questions/design-patterns/strategy/index.html#更多场景",a:"更多场景"},"113.0":{t:"# docker 概念",p:"富 Web 时代，应用变得越来越强大，与此同时也越来越复杂。集群部署、隔离环境、灰度发布以及动态扩容缺一不可，而容器化则成为 ...",l:"interview-questions/docker/concept/index.html",a:"docker-概念"},"113.1":{t:"一、讲个故事",p:`为了更好的理解 Docker 是什么，我们先来讲个故事：
我需要盖一个房子，于是我搬石头、砍木头、画图纸、盖房子。一顿操作， ...`,l:"interview-questions/docker/concept/index.html#一、讲个故事",a:"一、讲个故事"},"113.2":{t:"二、虚拟机与容器",p:`开始之前，我们来做一些基础知识的储备：
1.虚拟机：虚拟化硬件
虚拟机 Virtual Machine 指通过软件模拟的具有 ...`,l:"interview-questions/docker/concept/index.html#二、虚拟机与容器",a:"二、虚拟机与容器"},"113.3":{t:"三、认识 Docker",p:`!Docker
1.概念
Docker 是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的容器中， ...`,l:"interview-questions/docker/concept/index.html#三、认识-docker",a:"三、认识-docker"},"113.4":{t:"四、核心概念",p:`1.Build, Ship and Run（搭建、运输、运行）；
2.Build once, Run anywhere（一次 ...`,l:"interview-questions/docker/concept/index.html#四、核心概念",a:"四、核心概念"},"113.5":{t:"五、安装 Docker",p:`1.命令行安装
Homebrew 的 Cask 已经支持 Docker for Mac，因此可以很方便的使用 Homebre ...`,l:"interview-questions/docker/concept/index.html#五、安装-docker",a:"五、安装-docker"},"113.6":{t:"六、快速开始",p:`安装完 Docker 之后，我们先打个实际项目的镜像，边学边用。
1.首先需要大致了解一下我们将会用到的 11 个命令


 ...`,l:"interview-questions/docker/concept/index.html#六、快速开始",a:"六、快速开始"},"113.7":{t:"七、常规操作",p:`到这里，恭喜你已经完成了 Docker 的入门项目！如果还想继续深入，不妨接着往下看看。
1.参数使用


FROM

指定 ...`,l:"interview-questions/docker/concept/index.html#七、常规操作",a:"七、常规操作"},"113.8":{t:"八、最佳实践",p:`在掌握 Docker 常规操作之后，我们很容易就可以打出自己想要的项目镜像。然而不同的操作打出的镜像也是千差万别。
究竟是什 ...`,l:"interview-questions/docker/concept/index.html#八、最佳实践",a:"八、最佳实践"},"114.0":{t:"# docker 起步",p:`docker 使应用部署更加轻量，可移植，可扩展，更好的环境隔离也更大程度地避免了生产环境与测试环境不一致的巨大尴尬
`,l:"interview-questions/docker/start/index.html",a:"docker-起步"},"114.1":{t:"认识Docker",p:`!图片
`,l:"interview-questions/docker/start/index.html#认识docker",a:"认识docker"},"114.2":{t:"术语",p:`docker 的架构图如下
!图片
`,l:"interview-questions/docker/start/index.html#术语",a:"术语"},"114.3":{t:"从图中可以看出几个组成部分",p:`
docker client: 即 docker 命令行工具
docker host: 宿主机，docker daemon  ...`,l:"interview-questions/docker/start/index.html#从图中可以看出几个组成部分",a:"从图中可以看出几个组成部分"},"114.4":{t:"安装 Docker",p:"",l:"interview-questions/docker/start/index.html#安装-docker",a:"安装-docker"},"114.5":{t:"软件安装",p:`
在本地安装 docker/docker-compose，通过 Docker Desktop下载 docker 后，双击安装 ...`,l:"interview-questions/docker/start/index.html#软件安装",a:"软件安装"},"114.6":{t:"命令行安装",p:`
Homebrew 的 Cask 已经支持 Docker for Mac，因此可以很方便的使用 Homebrew Cask  ...`,l:"interview-questions/docker/start/index.html#命令行安装",a:"命令行安装"},"114.7":{t:"使用Docker启动一个vue项目",p:"",l:"interview-questions/docker/start/index.html#使用docker启动一个vue项目",a:"使用docker启动一个vue项目"},"114.8":{t:"新建项目",p:`使用Vue 脚手架构建项目
npm init vue@latest

给项目起个名字，叫做docker-demo-vue
然 ...`,l:"interview-questions/docker/start/index.html#新建项目",a:"新建项目"},"114.9":{t:"新建 Dockerfile",p:`在docker-demo-vue根目录下执行：
touch Dockerfile

此时的项目目录结构是这样的：
!图片
`,l:"interview-questions/docker/start/index.html#新建-dockerfile",a:"新建-dockerfile"},"114.10":{t:"拉取 Nginx 镜像",p:`
首先打开你的Docker，默认会启动。
控制台拉取 Nginx 镜像：

docker pull nginx

出现下面的 ...`,l:"interview-questions/docker/start/index.html#拉取-nginx-镜像",a:"拉取-nginx-镜像"},"114.11":{t:"在根目录创建 Nginx 配置文件",p:`touch default.conf

写入：
server {
    listen       80;
    serv ...`,l:"interview-questions/docker/start/index.html#在根目录创建-nginx-配置文件",a:"在根目录创建-nginx-配置文件"},"114.12":{t:"配置镜像",p:`打开Dockerfile文件，写入：
FROM nginx  
COPY dist/ /usr/share/nginx/ht ...`,l:"interview-questions/docker/start/index.html#配置镜像",a:"配置镜像"},"114.13":{t:"构建镜像",p:`Docker 通过 build 命令来构建镜像：
docker build -t docker-demo-vue .

!图 ...`,l:"interview-questions/docker/start/index.html#构建镜像",a:"构建镜像"},"114.14":{t:"运行容器",p:`docker run -d -p 3000:80 --name docker-vue docker-demo-vue

`,l:"interview-questions/docker/start/index.html#运行容器",a:"运行容器"},"114.15":{t:"参数解释",p:`
-d 设置容器在后台运行
-p 表示端口映射，把本机的 3000 端口映射到 container 的 80 端口（这样外网 ...`,l:"interview-questions/docker/start/index.html#参数解释",a:"参数解释"},"114.16":{t:"访问项目",p:`可以在浏览器中看到对应的页面，跟我们前面创建项目的时候看到的界面是一样的
也可以使用curl -v -i localhost ...`,l:"interview-questions/docker/start/index.html#访问项目",a:"访问项目"},"114.17":{t:"发布镜像",p:`
如果你想为社区贡献力量，那么需要将镜像发布，方便其他开发者使用。
发布镜像需要如下步骤：
登陆 dockerhub，注册账 ...`,l:"interview-questions/docker/start/index.html#发布镜像",a:"发布镜像"},"114.18":{t:"底层原理简介",p:`docker 底层使用了一些 linux 内核的特性，大概有 namespace，cgroups 和 ufs。
`,l:"interview-questions/docker/start/index.html#底层原理简介",a:"底层原理简介"},"114.19":{t:"namespace",p:`docker 使用 linux namespace 构建隔离的环境，它由以下 namespace 组成

pid: 隔离进程 ...`,l:"interview-questions/docker/start/index.html#namespace",a:"namespace"},"114.20":{t:"进阶技巧总结",p:"",l:"interview-questions/docker/start/index.html#进阶技巧总结",a:"进阶技巧总结"},"114.21":{t:"镜像仓库与拉取",p:`
大部分时候，我们不需要自己构建镜像，我们可以在官方镜像仓库 Docker Hub拉取镜像。
可以简单使用命令 docker ...`,l:"interview-questions/docker/start/index.html#镜像仓库与拉取",a:"镜像仓库与拉取"},"114.22":{t:"构建镜像与发布",p:`但并不是所有的镜像都可以在镜像仓库中找到，另外我们也需要为我们自己的业务应用去构建镜像。
使用 docker build 构 ...`,l:"interview-questions/docker/start/index.html#构建镜像与发布",a:"构建镜像与发布"},"114.23":{t:"Dockerfile",p:`在使用 docker 部署自己应用时，往往需要独立构建镜像。
docker 使用 Dockerfile 作为配置文件构建镜像 ...`,l:"interview-questions/docker/start/index.html#dockerfile",a:"dockerfile"},"114.24":{t:"FROM",p:`基于一个旧有的基础镜像，格式如下。
FROM &lt;image&gt; [AS &lt;name&gt;]

# 在多阶段 ...`,l:"interview-questions/docker/start/index.html#from",a:"from"},"114.25":{t:"ADD",p:`把宿主机的文件或目录加入到镜像的文件系统中。
ADD [--chown=&lt;user&gt;:&lt;group&gt; ...`,l:"interview-questions/docker/start/index.html#add",a:"add"},"114.26":{t:"RUN",p:`在镜像中执行命令，由于 ufs 的文件系统，它会在当前镜像的顶层新增一层。
RUN &lt;command&gt;

RUN ...`,l:"interview-questions/docker/start/index.html#run",a:"run"},"114.27":{t:"CMD",p:`指定容器如何启动。
一个 Dockerfile 中只允许有一个 CMD
# exec form, this is the p ...`,l:"interview-questions/docker/start/index.html#cmd",a:"cmd"},"114.28":{t:"容器",p:`镜像与容器的关系，类似于代码与进程的关系。

docker run 创建容器
docker stop 停止容器
docker ...`,l:"interview-questions/docker/start/index.html#容器",a:"容器"},"114.29":{t:"创建容器",p:`基于 nginx 镜像创建一个最简单的容器：启动一个最简单的 http 服务
使用 docker run 来启动容器，doc ...`,l:"interview-questions/docker/start/index.html#创建容器",a:"创建容器"},"114.30":{t:"容器管理",p:`docker ps 列出所有容器
$ docker ps
CONTAINER ID        IMAGE         ...`,l:"interview-questions/docker/start/index.html#容器管理",a:"容器管理"},"114.31":{t:"容器测试",p:`如果某时某个容器出现问题，可直接进入容器内部进行调试。
docker exec -it &lt;container_name ...`,l:"interview-questions/docker/start/index.html#容器测试",a:"容器测试"},"114.32":{t:"docker compose",p:"在 docker compose v2 中，使用了 docker compose 命令去替代了 docker-compose ...",l:"interview-questions/docker/start/index.html#docker-compose",a:"docker-compose"},"115.0":{t:"# 2022 年前端大事记",p:`[1-11] Chrome 开始实施私有网络控制策略
私有网络请求指的是目标服务器的 IP 地址比请求发起者获取的 IP 地 ...`,l:"interview-questions/event/2022/index.html",a:"_2022-年前端大事记"},"116.0":{t:"# git 常用命令",p:"",l:"interview-questions/git/commands/index.html",a:"git-常用命令"},"116.1":{t:"常用命令",p:`
stash：存储临时代码。
reset --soft：软回溯，回退 commit 的同时保留修改内容。
cherry-pi ...`,l:"interview-questions/git/commands/index.html#常用命令",a:"常用命令"},"116.2":{t:"查询配置信息",p:`
列出当前配置：git config --list
列出repository配置：git config --local -- ...`,l:"interview-questions/git/commands/index.html#查询配置信息",a:"查询配置信息"},"116.3":{t:"第一次使用git，配置用户信息",p:`
配置用户名：git config --global user.name &quot;your name&quot;
配置用 ...`,l:"interview-questions/git/commands/index.html#第一次使用git-配置用户信息",a:"第一次使用git-配置用户信息"},"116.4":{t:"其他配置",p:`
配置解决冲突时使用哪种差异分析工具，比如要使用vimdiff：git config --global merge.tool ...`,l:"interview-questions/git/commands/index.html#其他配置",a:"其他配置"},"117.0":{t:"# git 本地仓库上的操作&gitignore",p:"",l:"interview-questions/git/gitignore-localRepository/index.html",a:"git-本地仓库上的操作-gitignore"},"117.1":{t:"git 本地仓库上的操作",p:`
查看本地仓库关联的远程仓库：git remote；在克隆完每个远程仓库后，远程仓库默认为origin;加上-v的参数后，会 ...`,l:"interview-questions/git/gitignore-localRepository/index.html#git-本地仓库上的操作",a:"git-本地仓库上的操作"},"117.2":{t:"gitignore",p:"一般我们总会有些文件无需纳入 Git 的管理，也不希望它们总出现在未跟踪文件列表。通常都是些自动生成的文件，比如日志文件，或 ...",l:"interview-questions/git/gitignore-localRepository/index.html#gitignore",a:"gitignore"},"118.0":{t:"# 储藏 stash",p:"",l:"interview-questions/git/stash/index.html",a:"储藏-stash"},"118.1":{t:"stash 储藏",p:`git stash : 将全部未保存的代码添加到储藏
`,l:"interview-questions/git/stash/index.html#stash-储藏",a:"stash-储藏"},"118.2":{t:"保存当前代码",p:`
git stash: 快速储藏代码，默认储藏名称为&quot;WIP on branch_name ： latest_co ...`,l:"interview-questions/git/stash/index.html#保存当前代码",a:"保存当前代码"},"118.3":{t:"查看stash代码",p:`
git stash list: 查看stash列表
git stash show: 查看第一个储藏做了哪些改动(并不是改动 ...`,l:"interview-questions/git/stash/index.html#查看stash代码",a:"查看stash代码"},"118.4":{t:"应用stash代码",p:`* git stash apply stash@{num}: 应用列表中的储藏
* git stash pop: 应用第一个 ...`,l:"interview-questions/git/stash/index.html#应用stash代码",a:"应用stash代码"},"118.5":{t:"删除stash代码",p:"* git stash drop stash@{num}: 删除stash list中的储藏，例如删除第二个：git sta ...",l:"interview-questions/git/stash/index.html#删除stash代码",a:"删除stash代码"},"118.6":{t:"以stash储藏创建一个分支",p:`
创建新分支branchName，并切换到此分支，分支的状态与stash储藏时的状态一致，此时新分支应用的stash代码进了 ...`,l:"interview-questions/git/stash/index.html#以stash储藏创建一个分支",a:"以stash储藏创建一个分支"},"118.7":{t:"如图，展示了几个常用的stash命令",p:`!图片
`,l:"interview-questions/git/stash/index.html#如图-展示了几个常用的stash命令",a:"如图-展示了几个常用的stash命令"},"119.0":{t:"# git 工作区&暂存区的操作命令",p:"",l:"interview-questions/git/workspace-temporary/index.html",a:"git-工作区-暂存区的操作命令"},"119.1":{t:"工作区",p:`git init
`,l:"interview-questions/git/workspace-temporary/index.html#工作区",a:"工作区"},"119.2":{t:"从远程克隆仓库",p:`git clone XXX
`,l:"interview-questions/git/workspace-temporary/index.html#从远程克隆仓库",a:"从远程克隆仓库"},"119.3":{t:"提交",p:`
提交工作区所有文件到暂存区：git add .
提交工作区中指定文件到暂存区：git add file1 file2 .. ...`,l:"interview-questions/git/workspace-temporary/index.html#提交",a:"提交"},"119.4":{t:"撤销",p:`
删除工作区文件，并且也从暂存区删除对应文件的记录：git rm file1 file2
从暂存区中删除文件，但是工作区依然 ...`,l:"interview-questions/git/workspace-temporary/index.html#撤销",a:"撤销"},"119.5":{t:"更新文件",p:`
重命名文件，并将已改名文件提交到暂存区：git mv [file-original] [file-renamed];

`,l:"interview-questions/git/workspace-temporary/index.html#更新文件",a:"更新文件"},"119.6":{t:"查询信息",p:`
查询当前工作区所有文件的状态：git status;
比较工作区中当前文件和暂存区之间的差异，也就是修改之后还没有暂存的内 ...`,l:"interview-questions/git/workspace-temporary/index.html#查询信息",a:"查询信息"},"119.7":{t:"暂存区",p:"",l:"interview-questions/git/workspace-temporary/index.html#暂存区",a:"暂存区"},"119.8":{t:"提交文件到版本库",p:`
将暂存区中的文件提交到本地仓库中，即打上新版本：git commit -m &quot;commit_info&quot; ...`,l:"interview-questions/git/workspace-temporary/index.html#提交文件到版本库",a:"提交文件到版本库"},"119.9":{t:"查看信息",p:`
比较暂存区与上一版本的差异：git diff --cached
指定文件在暂存区和本地仓库的不同：git diff fil ...`,l:"interview-questions/git/workspace-temporary/index.html#查看信息",a:"查看信息"},"119.10":{t:"打标签",p:"Git 使用的标签有两种类型：轻量级的（lightweight）和含附注的（annotated） 。轻量级标签就像是个不会变 ...",l:"interview-questions/git/workspace-temporary/index.html#打标签",a:"打标签"},"119.11":{t:"分支管理",p:`
创建分支：git branch branch-name，如 git branch testing
从当前所处的分支切换到其 ...`,l:"interview-questions/git/workspace-temporary/index.html#分支管理",a:"分支管理"},"120.0":{t:"# DOCTYPE",p:`1.DOCTYPE 是什么
DOCTYPE 是一种通用标记语言的文档声明类型，它主要作用是告诉浏览器的解析器，应该以什么样的 ...`,l:"interview-questions/html/doctype/index.html",a:"doctype"},"120.1":{t:"HTML 5",p:"因为 HTML 5 不基于 SGML，所以不需要引用DTD，但是需要DOCTYPE来规范浏览器的行为，让浏览器按照 W3C  ...",l:"interview-questions/html/doctype/index.html#html-5",a:"html-5"},"120.2":{t:"HTML 4.01",p:"\n\nStrict 严格```\n&lt;!DOCTYPE HTML PUBLIC &quot;-//W3C//DTD HTML ...",l:"interview-questions/html/doctype/index.html#html-4-01",a:"html-4-01"},"120.3":{t:"XML 1.0 Strict 严格```",p:"&lt;!DOCTYPE html PUBLIC &quot;-//W3C//DTD XHTML 1.0 Strict//E ...",l:"interview-questions/html/doctype/index.html#xml-1-0-strict-严格",a:"xml-1-0-strict-严格"},"120.4":{t:"如何区分",p:`浏览器解析时到底使用严格模式还是混杂模式，与网页中的 DTD 直接相关。
严格 DTD ——严格模式 。如果文档包含严格的  ...`,l:"interview-questions/html/doctype/index.html#如何区分",a:"如何区分"},"120.5":{t:"意义",p:"严格模式与混杂模式存在的意义与其来源密切相关，如果说只存在严格模式，那么许多旧网站必然受到影响，如果只存在混杂模式，那么会回 ...",l:"interview-questions/html/doctype/index.html#意义",a:"意义"},"120.6":{t:"常见区别",p:`严格模式下 —— W3C 标准的盒模型 怪异模式下 —— IE 盒模型
`,l:"interview-questions/html/doctype/index.html#常见区别",a:"常见区别"},"121.0":{t:"# 作为前端，你必须要知道的meta标签知识",p:`概览
meta标签一般放在整个html页面的head部分，在MDN中对他这样定义：

meta是文档级元数据元素，用来表示那 ...`,l:"interview-questions/html/meta/index.html",a:"作为前端-你必须要知道的meta标签知识"},"121.1":{t:"author",p:`用来表示网页的作者的名字，例如某个组织或者机构。
&lt;meta name=&quot;author&quot; cont ...`,l:"interview-questions/html/meta/index.html#author",a:"author"},"121.2":{t:"description",p:`是一段简短而精确的、对页面内容的描述。以头条和taobao的description标签为例：
!图片
!图片
`,l:"interview-questions/html/meta/index.html#description",a:"description"},"121.3":{t:"keywords",p:"与页面内容相关的关键词，使用逗号分隔。某些搜索引擎在遇到这些关键字时，会用这些关键字对文档进行分类。 还是以头条和taoba ...",l:"interview-questions/html/meta/index.html#keywords",a:"keywords"},"121.4":{t:"viewpoint",p:`为 viewport（视口）的初始大小提供指示。目前仅用于移动设备。
可能你也发现了，我们在vscode中自动生成html的 ...`,l:"interview-questions/html/meta/index.html#viewpoint",a:"viewpoint"},"121.5":{t:"robots",p:`表示爬虫对此页面的处理行为，或者说，应当遵守的规则，是用来做搜索引擎抓取的。
它的content可以为：

all:搜索引擎 ...`,l:"interview-questions/html/meta/index.html#robots",a:"robots"},"121.6":{t:"renderer",p:`用来指定双核浏览器的渲染方式，比如360浏览器，我们可以通过这个设置来指定360浏览器的渲染方式
&lt;meta name ...`,l:"interview-questions/html/meta/index.html#renderer",a:"renderer"},"121.7":{t:"X-UA-Compatible",p:`我们最常见的http-equiv值可能就是X-UA-Compatible了，它常常长这个样子：
!图片
它是用来是做IE浏览 ...`,l:"interview-questions/html/meta/index.html#x-ua-compatible",a:"x-ua-compatible"},"121.8":{t:"content-type",p:`用来声明文档类型和字符集
!图片
`,l:"interview-questions/html/meta/index.html#content-type",a:"content-type"},"121.9":{t:"x-dns-prefetch-control",p:"一般来说，HTML页面中的a标签会自动启用DNS提前解析来提升网站性能，但是在使用https协议的网站中失效了，我们可以设置 ...",l:"interview-questions/html/meta/index.html#x-dns-prefetch-control",a:"x-dns-prefetch-control"},"121.10":{t:"cache-control、Pragma、Expires",p:`和缓存相关的设置，但是遗憾的是这些往往不生效，我们一般都通过http headers来设置缓存策略
`,l:"interview-questions/html/meta/index.html#cache-control、pragma、expires",a:"cache-control、pragma、expires"},"122.0":{t:"# HTML简介",p:`1. 什么是HTML？

超文本标记语言（Hyper Text Markup Language），是用来描述网页的一种语言。 ...`,l:"interview-questions/html/start/index.html",a:"html简介"},"122.1":{t:"标题标签",p:`通过 &lt;h1&gt; - &lt;h6&gt; 标签进行定义的。
&lt;h1&gt; 定义最大的标题。 &lt;h6 ...`,l:"interview-questions/html/start/index.html#标题标签",a:"标题标签"},"122.2":{t:"段落标签",p:`把文字有条理的分段显示，该标签用于定义段落
&lt;p&gt;我是一个段落标签&lt;/p&gt;

特点：

打空格没用， ...`,l:"interview-questions/html/start/index.html#段落标签",a:"段落标签"},"122.3":{t:"水平线标签",p:`&lt;hr /&gt;是单标签

`,l:"interview-questions/html/start/index.html#水平线标签",a:"水平线标签"},"122.4":{t:"换行标签",p:`强制文本换行
abc &lt;br/&gt; efg

显示为：
abc
efg
特点：

是个单标签
只是简单开始新的一行 ...`,l:"interview-questions/html/start/index.html#换行标签",a:"换行标签"},"122.5":{t:"文本格式化标签",p:`
突出重要性，比普通文字更重要

在网页中，有时需要把文字设置为粗体、斜体或者下划线等效果，这时就需要用到HTML中的文本格 ...`,l:"interview-questions/html/start/index.html#文本格式化标签",a:"文本格式化标签"},"122.6":{t:"图像标签",p:`用于定义html页面中的图像，是个单标签
&lt;img src=&quot;图像URL&quot; alt=&quot;图 ...`,l:"interview-questions/html/start/index.html#图像标签",a:"图像标签"},"122.7":{t:"路径",p:`
相对路径：以引用文件所在的位置为基础建立出的目录路径（文件相对于html页面的位置）
绝对路径：从盘符开始的路径（或者完整 ...`,l:"interview-questions/html/start/index.html#路径",a:"路径"},"122.8":{t:"超链接标签",p:`用于定义链接，作用是从一个页面跳转到另一个页面
anchor：锚
 &lt;a href=&quot;跳转目标&quot;  ...`,l:"interview-questions/html/start/index.html#超链接标签",a:"超链接标签"},"122.9":{t:"HTML中的注释和特殊字符",p:`        &lt;!--注释--&gt;(键盘使用ctrl+/ 快捷加注释)

常用特殊字符：



特殊字符
描述
 ...`,l:"interview-questions/html/start/index.html#html中的注释和特殊字符",a:"html中的注释和特殊字符"},"122.10":{t:"表格标签",p:`显示、展示数据，不是用来布置页面
    &lt;table&gt;
 &lt;tr&gt;
  &lt;td&gt;单元格 ...`,l:"interview-questions/html/start/index.html#表格标签",a:"表格标签"},"122.11":{t:"表头单元格标签",p:`一般表头单元格位于表格的第一行或第一列，表头单元格中的文本内容加粗居中显示
th标签 表示html表格的表头部分（table ...`,l:"interview-questions/html/start/index.html#表头单元格标签",a:"表头单元格标签"},"122.12":{t:"表格结构标签",p:`可能表格很长，为了更好的表示表格标签的语义，可以将表格分割成表格头部和表格主体两大部分。
thead标签 表格的头部区域（所 ...`,l:"interview-questions/html/start/index.html#表格结构标签",a:"表格结构标签"},"122.13":{t:"合并单元格",p:`合并单元格的方式：

跨行合并：rowspan=&quot;合并单元格的个数&quot;
跨列合并：colspan=&quo ...`,l:"interview-questions/html/start/index.html#合并单元格",a:"合并单元格"},"122.14":{t:"列表标签",p:`用来布局
特点: 整齐、整洁、有序

列表可以分为三大类：无序列表、有序列表、自定义列表

`,l:"interview-questions/html/start/index.html#列表标签",a:"列表标签"},"122.15":{t:"无序列表",p:`ul标签 表示html页面中的无序列表，一般以项目符号呈现列表项，而列表项使用 li 定义
        &lt;ul&g ...`,l:"interview-questions/html/start/index.html#无序列表",a:"无序列表"},"122.16":{t:"有序列表",p:`ol标签 用于定义有序列表，列表排序以数字来显示，并且使用 li标签 来定义列表项
        &lt;ol&gt;
  ...`,l:"interview-questions/html/start/index.html#有序列表",a:"有序列表"},"122.17":{t:"自定义列表",p:`
通常在网页底部使用。

用于对术语或者名词进行解释和描述，自定义列表的列表项前没有任何项目符号
        &lt;d ...`,l:"interview-questions/html/start/index.html#自定义列表",a:"自定义列表"},"122.18":{t:"表单标签",p:`使用表单是为了 收集用户信息
在网页中我们也要跟用户进行交互，收集用户资料，此时就需要表单

表单的组成（常见于注册页面）
 ...`,l:"interview-questions/html/start/index.html#表单标签",a:"表单标签"},"122.19":{t:"表单域",p:`包含表单元素的区域
在html标签中，form标签 用于定义表单域，以实现用户信息的收集和传递。
form标签 会把它范围内 ...`,l:"interview-questions/html/start/index.html#表单域",a:"表单域"},"122.20":{t:"表单控件（表单元素）",p:`在表单域中定义的表单元素就是 允许用户在表单中输入或选择的内容控件

input 输入表单元素
select 下拉表单元素
 ...`,l:"interview-questions/html/start/index.html#表单控件-表单元素",a:"表单控件-表单元素"},"122.21":{t:"input表单元素",p:`包含一个type属性，根据不同的type属性值，输入的字段有很多种形式
 &lt;input type=&quot;属性值& ...`,l:"interview-questions/html/start/index.html#input表单元素",a:"input表单元素"},"122.22":{t:"label标签",p:`label标签为input元素定义标注（标签）
label标签用于绑定一个表单元素，当点击label标签内的文本时，浏览器会 ...`,l:"interview-questions/html/start/index.html#label标签",a:"label标签"},"122.23":{t:"select下拉表单元素",p:`页面中如果有多个选项让用户选择，并且想要节约空间时使用。
&lt;select&gt;
 &lt;option&gt;选项1 ...`,l:"interview-questions/html/start/index.html#select下拉表单元素",a:"select下拉表单元素"},"122.24":{t:"textarea文本域标签",p:`用户输入内容较多时使用，常见于留言板、评论。
textarea标签是用于定义多行文本输入的控件。
&lt;textarea  ...`,l:"interview-questions/html/start/index.html#textarea文本域标签",a:"textarea文本域标签"},"123.0":{t:"# 13个很酷但很少有人知道的HTML元素",p:`1. meter &amp; progress
元素是显示进度条的语义正确方式。
除了在已知范围内显示标量测量值外，它还允许 ...`,l:"interview-questions/html/tag/index.html",a:"_13个很酷但很少有人知道的html元素"},"123.1":{t:"注意",p:`
建议不仅限于文本，还可以与颜色，日期，时间甚至范围输入一起使用。
虽然建议的默认样式看起来很简陋。但是我们可以使用CSS设 ...`,l:"interview-questions/html/tag/index.html#注意",a:"注意"},"124.0":{t:"# 如何理解 JS 的异步？",p:`
JS是一门单线程的语言，这是因为它运行在浏览器的渲染主线程中，而渲染主线程只有一个。
而渲染主线程承担着诸多的工作，渲染页 ...`,l:"interview-questions/js/async/index.html",a:"如何理解-js-的异步"},"125.0":{t:"# 浅拷贝与深拷贝",p:`浅拷贝与深拷贝


浅拷贝是创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型 ...`,l:"interview-questions/js/copy/index.html",a:"浅拷贝与深拷贝"},"125.1":{t:"1.Object.assign()",p:`Object.assign() 方法可以把任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回目标对象。
let obj ...`,l:"interview-questions/js/copy/index.html#_1-object-assign",a:"_1-object-assign"},"125.2":{t:"2.函数库lodash的\\_.clone方法",p:`该函数库也有提供_.clone用来做 Shallow Copy,后面我们会再介绍利用这个库实现深拷贝。
var _ = re ...`,l:"interview-questions/js/copy/index.html#_2-函数库lodash的-clone方法",a:"_2-函数库lodash的-clone方法"},"125.3":{t:"3.展开运算符",p:"展开运算符是一个 es6 / es2015特性，它提供了一种非常方便的方式来执行浅拷贝，这与 Object.assign ( ...",l:"interview-questions/js/copy/index.html#_3-展开运算符",a:"_3-展开运算符"},"125.4":{t:"4.Array.prototype.concat()",p:`let arr = [1, 3, {
    username: 'kobe'
    }];
let arr2 = arr ...`,l:"interview-questions/js/copy/index.html#_4-array-prototype-concat",a:"_4-array-prototype-concat"},"125.5":{t:"5.Array.prototype.slice()",p:`let arr = [1, 3, {
    username: ' kobe'
    }];
let arr3 = ar ...`,l:"interview-questions/js/copy/index.html#_5-array-prototype-slice",a:"_5-array-prototype-slice"},"125.6":{t:"1.JSON.parse(JSON.stringify())",p:`let arr = [1, 3, {
    username: ' kobe'
}];
let arr4 = JSON.p ...`,l:"interview-questions/js/copy/index.html#_1-json-parse-json-stringify",a:"_1-json-parse-json-stringify"},"125.7":{t:"2.函数库lodash的\\_.cloneDeep方法",p:`该函数库也有提供_.cloneDeep用来做 Deep Copy
var _ = require('lodash');
va ...`,l:"interview-questions/js/copy/index.html#_2-函数库lodash的-clonedeep方法",a:"_2-函数库lodash的-clonedeep方法"},"125.8":{t:"3.jQuery.extend()方法",p:`jquery 有提供一個$.extend可以用来做 Deep Copy
$.extend(deepCopy, target, ...`,l:"interview-questions/js/copy/index.html#_3-jquery-extend-方法",a:"_3-jquery-extend-方法"},"125.9":{t:"4.手写递归方法",p:`递归方法实现深度克隆原理：遍历对象、数组直到里边都是基本数据类型，然后再去复制，就是深度拷贝。
有种特殊情况需注意就是对象存 ...`,l:"interview-questions/js/copy/index.html#_4-手写递归方法",a:"_4-手写递归方法"},"126.0":{t:"# 九种跨域方式实现原理",p:"",l:"interview-questions/js/cross-domain/index.html",a:"九种跨域方式实现原理"},"126.1":{t:"一、什么是跨域？",p:`
`,l:"interview-questions/js/cross-domain/index.html#一、什么是跨域",a:"一、什么是跨域"},"126.2":{t:"1.什么是同源策略及其限制内容？",p:"同源策略是一种约定，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，浏览器很容易受到XSS、CSRF等攻击。所谓同源 ...",l:"interview-questions/js/cross-domain/index.html#_1-什么是同源策略及其限制内容",a:"_1-什么是同源策略及其限制内容"},"126.3":{t:"4.websocket",p:"Websocket是HTML5的一个持久化的协议，它实现了浏览器与服务器的全双工通信，同时也是跨域的一种解决方案。WebSo ...",l:"interview-questions/js/cross-domain/index.html#_4-websocket",a:"_4-websocket"},"126.4":{t:"5\\. Node中间件代理(两次跨域)",p:`实现原理：同源策略是浏览器需要遵循的标准，而如果是服务器向服务器请求就无需遵循同源策略。 代理服务器，需要做以下几个步骤：
 ...`,l:"interview-questions/js/cross-domain/index.html#_5-node中间件代理-两次跨域",a:"_5-node中间件代理-两次跨域"},"126.5":{t:"6.nginx反向代理",p:`实现原理类似于Node中间件代理，需要你搭建一个中转nginx服务器，用于转发请求。
使用nginx反向代理实现跨域，是最简 ...`,l:"interview-questions/js/cross-domain/index.html#_6-nginx反向代理",a:"_6-nginx反向代理"},"126.6":{t:"7.window.name + iframe",p:"window.name属性的独特之处：name值在不同的页面（甚至不同域名）加载后依旧存在，并且可以支持非常长的 name  ...",l:"interview-questions/js/cross-domain/index.html#_7-window-name-iframe",a:"_7-window-name-iframe"},"126.7":{t:"8.location.hash + iframe",p:"实现原理： a.html欲与c.html跨域相互通信，通过中间页b.html来实现。 三个页面，不同域之间利用iframe的 ...",l:"interview-questions/js/cross-domain/index.html#_8-location-hash-iframe",a:"_8-location-hash-iframe"},"126.8":{t:"9.document.domain + iframe该方式只能用于二级域名相同的情况下，比如 `a.test.com` 和 `b.test.com` 适用于该方式**。 只需要给页面添加 `document.domain ='test.com'` 表示二级域名都相同就可以实现跨域。",p:`实现原理：两个页面都通过js强制设置document.domain为基础主域，就实现了同域。
我们看个例子：页面a.zf1. ...`,l:"interview-questions/js/cross-domain/index.html#_9-document-domain-iframe该方式只能用于二级域名相同的情况下-比如-a-test-com-和-b-test-com-适用于该方式-。-只需要给页面添加-document-domain-test-com-表示二级域名都相同就可以实现跨域。",a:"_9-document-domain-iframe该方式只能用于二级域名相同的情况下-比如-a-test-com-和-b-test-com-适用于该方式-。-只需要给页面添加-document-domain-test-com-表示二级域名都相同就可以实现跨域。"},"127.0":{t:"# 从ES6到ES10",p:"",l:"interview-questions/js/es/index.html",a:"从es6到es10"},"127.1":{t:"历史版本",p:`至发稿日为止有九个ECMA-262版本发表。其历史版本如下：

1997年6月：第一版
1998年6月：修改格式，使其与IS ...`,l:"interview-questions/js/es/index.html#历史版本",a:"历史版本"},"127.2":{t:"发展标准",p:"TC39（Technical Committee 39）是一个推动JavaScript发展的委员会，它的成语来自各个主流浏览 ...",l:"interview-questions/js/es/index.html#发展标准",a:"发展标准"},"127.3":{t:"Let 和 Const",p:"在ES6以前，JS只有var一种声明方式，但是在ES6之后，就多了let跟const这两种方式。用var定义的变量没有块级作 ...",l:"interview-questions/js/es/index.html#let-和-const",a:"let-和-const"},"127.4":{t:"类（Class）",p:`在ES6之前，如果我们要生成一个实例对象，传统的方法就是写一个构造函数，例子如下：
function Person(name ...`,l:"interview-questions/js/es/index.html#类-class",a:"类-class"},"127.5":{t:"箭头函数（Arrow function）",p:"箭头函数表达式的语法比函数表达式更简洁，并且没有自己的this，arguments，super或 new.target。这些 ...",l:"interview-questions/js/es/index.html#箭头函数-arrow-function",a:"箭头函数-arrow-function"},"127.6":{t:"函数参数默认值（Function parameter defaults）",p:`在ES6之前，如果我们写函数需要定义初始值的时候，需要这么写：
function config (data) {
    v ...`,l:"interview-questions/js/es/index.html#函数参数默认值-function-parameter-defaults",a:"函数参数默认值-function-parameter-defaults"},"127.7":{t:"模板字符串（Template string）",p:`在ES6之前，如果我们要拼接字符串，则需要像这样：
var name = 'kris'
var age = 24
var i ...`,l:"interview-questions/js/es/index.html#模板字符串-template-string",a:"模板字符串-template-string"},"127.8":{t:"解构赋值（Destructuring assignment）",p:`我们通过解构赋值, 可以将属性/值从对象/数组中取出,赋值给其他变量。
比如我们需要交换两个变量的值，在ES6之前我们可能需 ...`,l:"interview-questions/js/es/index.html#解构赋值-destructuring-assignment",a:"解构赋值-destructuring-assignment"},"127.9":{t:"模块化（Module）",p:"在ES6之前，JS并没有模块化的概念，有的也只是社区定制的类似CommonJS和AMD之类的规则。例如基于CommonJS的 ...",l:"interview-questions/js/es/index.html#模块化-module",a:"模块化-module"},"127.10":{t:"扩展操作符（Spread operator）",p:"扩展操作符可以在函数调用/数组构造时, 将数组表达式或者string在语法层面展开；还可以在构造字面量对象时, 将对象表达式 ...",l:"interview-questions/js/es/index.html#扩展操作符-spread-operator",a:"扩展操作符-spread-operator"},"127.11":{t:"对象属性简写（Object attribute shorthand）",p:`在ES6之前，如果我们要将某个变量赋值为同样名称的对象元素，则需要：
var cat = 'Miaow'
var dog = ...`,l:"interview-questions/js/es/index.html#对象属性简写-object-attribute-shorthand",a:"对象属性简写-object-attribute-shorthand"},"127.12":{t:"Promise",p:`Promise 是ES6提供的一种异步解决方案，比回调函数更加清晰明了。
Promise 翻译过来就是承诺的意思，这个承诺会 ...`,l:"interview-questions/js/es/index.html#promise",a:"promise"},"127.13":{t:"for...of",p:"for...of语句在可迭代对象（包括 Array，Map，Set，String，TypedArray，arguments  ...",l:"interview-questions/js/es/index.html#for-of",a:"for-of"},"127.14":{t:"Symbol",p:"symbol 是一种基本数据类型，Symbol()函数会返回symbol类型的值，该类型具有静态属性和静态方法。它的静态属性 ...",l:"interview-questions/js/es/index.html#symbol",a:"symbol"},"127.15":{t:"迭代器（Iterator）/ 生成器（Generator）",p:"迭代器（Iterator）是一种迭代的机制，为各种不同的数据结构提供统一的访问机制。任何数据结构只要内部有 Iterator ...",l:"interview-questions/js/es/index.html#迭代器-iterator-生成器-generator",a:"迭代器-iterator-生成器-generator"},"127.16":{t:"Set/WeakSet",p:`Set 对象允许你存储任何类型的唯一值，无论是原始值或者是对象引用。
所以我们可以通过Set实现数组去重
const num ...`,l:"interview-questions/js/es/index.html#set-weakset",a:"set-weakset"},"127.17":{t:"Map/WeakMap",p:`Map 对象保存键值对。任何值(对象或者原始值) 都可以作为一个键或一个值。
例子如下，我们甚至可以使用NaN来作为键值：
 ...`,l:"interview-questions/js/es/index.html#map-weakmap",a:"map-weakmap"},"127.18":{t:"Proxy/Reflect",p:`Proxy 对象用于定义基本操作的自定义行为（如属性查找，赋值，枚举，函数调用等）。
Reflect 是一个内置的对象，它提 ...`,l:"interview-questions/js/es/index.html#proxy-reflect",a:"proxy-reflect"},"127.19":{t:"Regex对象的扩展",p:"",l:"interview-questions/js/es/index.html#regex对象的扩展",a:"regex对象的扩展"},"127.20":{t:"正则新增符号",p:`

i 修饰符
// i 修饰符
/[a-z]/i.test('\\u212A') // false
/[a-z]/iu.te ...`,l:"interview-questions/js/es/index.html#正则新增符号",a:"正则新增符号"},"127.21":{t:"字符串方法的实现改为调用`RegExp`方法",p:`
String.prototype.match 调用 RegExp.prototype[Symbol.match]
Stri ...`,l:"interview-questions/js/es/index.html#字符串方法的实现改为调用-regexp-方法",a:"字符串方法的实现改为调用-regexp-方法"},"127.22":{t:"正则新增属性",p:`

RegExp.prototype.sticky 表示是否有y修饰符
/hello\\d/y.sticky // true
 ...`,l:"interview-questions/js/es/index.html#正则新增属性",a:"正则新增属性"},"127.23":{t:"Math对象的扩展",p:`

二进制表示法 : 0b或0B开头表示二进制(0bXX或0BXX)


二进制表示法 : 0b或0B开头表示二进制(0bX ...`,l:"interview-questions/js/es/index.html#math对象的扩展",a:"math对象的扩展"},"127.24":{t:"Array对象的扩展",p:`

Array.prototype.from：转换具有Iterator接口的数据结构为真正数组，返回新数组。
console ...`,l:"interview-questions/js/es/index.html#array对象的扩展",a:"array对象的扩展"},"127.25":{t:"Array.prototype.includes()",p:`includes() 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false。
代 ...`,l:"interview-questions/js/es/index.html#array-prototype-includes",a:"array-prototype-includes"},"127.26":{t:"幂运算符\\*\\*",p:`幂运算符**，具有与Math.pow()一样的功能，代码如下：
console.log(2**10) // 1024
con ...`,l:"interview-questions/js/es/index.html#幂运算符",a:"幂运算符"},"127.27":{t:"模板字符串（Template string）",p:`自ES7起，带标签的模版字面量遵守以下转义序列的规则：

Unicode字符以&quot;\\u&quot;开头，例如\\u00 ...`,l:"interview-questions/js/es/index.html#模板字符串-template-string",a:"模板字符串-template-string"},"127.28":{t:"async/await",p:"虽然Promise可以解决回调地狱的问题，但是链式调用太多，则会变成另一种形式的回调地狱 —— 面条地狱，所以在ES8里则出 ...",l:"interview-questions/js/es/index.html#async-await",a:"async-await"},"127.29":{t:"Object.values()",p:"Object.values()方法返回一个给定对象自身的所有可枚举属性值的数组，值的顺序与使用for...in循环的顺序相同 ...",l:"interview-questions/js/es/index.html#object-values",a:"object-values"},"127.30":{t:"Object.entries()",p:"Object.entries()方法返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 for...in 循环遍历该对 ...",l:"interview-questions/js/es/index.html#object-entries",a:"object-entries"},"127.31":{t:"padStart()",p:"padStart() 方法用另一个字符串填充当前字符串(重复，如果需要的话)，以便产生的字符串达到给定的长度。填充从当前字符 ...",l:"interview-questions/js/es/index.html#padstart",a:"padstart"},"127.32":{t:"padEnd()",p:"padEnd() 方法会用一个字符串填充当前字符串（如果需要的话则重复填充），返回填充后达到指定长度的字符串。从当前字符串的 ...",l:"interview-questions/js/es/index.html#padend",a:"padend"},"127.33":{t:"函数参数结尾逗号（Function parameter lists and calls trailing commas）",p:`在ES5里就添加了对象的尾逗号，不过并不支持函数参数，但是在ES8之后，便开始支持这一特性，代码如下：
// 参数定义
fu ...`,l:"interview-questions/js/es/index.html#函数参数结尾逗号-function-parameter-lists-and-calls-trailing-commas",a:"函数参数结尾逗号-function-parameter-lists-and-calls-trailing-commas"},"127.34":{t:"ShareArrayBuffer（因安全问题，暂时在Chrome跟FireFox中被禁用）",p:"SharedArrayBuffer 对象用来表示一个通用的，固定长度的原始二进制数据缓冲区，类似于 ArrayBuffer  ...",l:"interview-questions/js/es/index.html#sharearraybuffer-因安全问题-暂时在chrome跟firefox中被禁用",a:"sharearraybuffer-因安全问题-暂时在chrome跟firefox中被禁用"},"127.35":{t:"Atomics对象",p:`Atomics对象 提供了一组静态方法用来对 SharedArrayBuffer 对象进行原子操作。
方法如下：


Ato ...`,l:"interview-questions/js/es/index.html#atomics对象",a:"atomics对象"},"127.36":{t:"Object.getOwnPropertyDescriptors()",p:"Object.getOwnPropertyDescriptors() 方法用来获取一个对象的所有自身属性的描述符。代码如下： ...",l:"interview-questions/js/es/index.html#object-getownpropertydescriptors",a:"object-getownpropertydescriptors"},"127.37":{t:"for await...of",p:"for await...of 语句会在异步或者同步可迭代对象上创建一个迭代循环，包括 String，Array，Array- ...",l:"interview-questions/js/es/index.html#for-await-of",a:"for-await-of"},"127.38":{t:"模板字符串（Template string）",p:`ES9开始，模板字符串允许嵌套支持常见转义序列，移除对ECMAScript在带标签的模版字符串中转义序列的语法限制。
不过， ...`,l:"interview-questions/js/es/index.html#模板字符串-template-string",a:"模板字符串-template-string"},"127.39":{t:"正则表达式反向(lookbehind)断言",p:`首先我们得先知道什么是断言(Assertion)。
**断言(Assertion)**是一个对当前匹配位置之前或之后的字符的 ...`,l:"interview-questions/js/es/index.html#正则表达式反向-lookbehind-断言",a:"正则表达式反向-lookbehind-断言"},"127.40":{t:"正则表达式 Unicode 转义",p:"正则表达式中的Unicode转义符允许根据Unicode字符属性匹配Unicode字符。 它允许区分字符类型，例如大写和小写 ...",l:"interview-questions/js/es/index.html#正则表达式-unicode-转义",a:"正则表达式-unicode-转义"},"127.41":{t:"正则表达式 s/dotAll 模式",p:`在以往的版本里，JS的正则的.只能匹配emoji跟行终结符以外的所有文本，例如：
let regex = /./;

reg ...`,l:"interview-questions/js/es/index.html#正则表达式-s-dotall-模式",a:"正则表达式-s-dotall-模式"},"127.42":{t:"正则表达式命名捕获组",p:"在以往的版本里，JS的正则分组是无法命名的，所以容易混淆。例如下面获取年月日的例子，很容易让人搞不清哪个是月份，哪个是年份: ...",l:"interview-questions/js/es/index.html#正则表达式命名捕获组",a:"正则表达式命名捕获组"},"127.43":{t:"对象扩展操作符",p:"ES6中添加了数组的扩展操作符，让我们在操作数组时更加简便，美中不足的是并不支持对象扩展操作符，但是在ES9开始，这一功能也 ...",l:"interview-questions/js/es/index.html#对象扩展操作符",a:"对象扩展操作符"},"127.44":{t:"Promise.prototype.finally()",p:"finally()方法会返回一个Promise，当promise的状态变更，不管是变成rejected或者fulfilled ...",l:"interview-questions/js/es/index.html#promise-prototype-finally",a:"promise-prototype-finally"},"127.45":{t:"Array.prototype.flat() / flatMap()",p:`flat() 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。
flatM ...`,l:"interview-questions/js/es/index.html#array-prototype-flat-flatmap",a:"array-prototype-flat-flatmap"},"127.46":{t:"String.prototype.trimStart() / trimLeft() / trimEnd() / trimRight()",p:"在ES5中，我们可以通过trim()来去掉字符首尾的空格，但是却无法只去掉单边的，但是在ES10之后，我们可以实现这个功能。 ...",l:"interview-questions/js/es/index.html#string-prototype-trimstart-trimleft-trimend-trimright",a:"string-prototype-trimstart-trimleft-trimend-trimright"},"127.47":{t:"Object.fromEntries()",p:`Object.fromEntries() 方法把键值对列表转换为一个对象，它是Object.entries()的反函数。
例 ...`,l:"interview-questions/js/es/index.html#object-fromentries",a:"object-fromentries"},"127.48":{t:"Symbol.prototype.description",p:"description 是一个只读属性，它会返回Symbol对象的可选描述的字符串。与 Symbol.prototype.t ...",l:"interview-questions/js/es/index.html#symbol-prototype-description",a:"symbol-prototype-description"},"127.49":{t:"String.prototype.matchAll",p:"matchAll() 方法返回一个包含所有匹配正则表达式的结果及分组捕获组的迭代器。并且返回一个不可重启的迭代器。例子如下： ...",l:"interview-questions/js/es/index.html#string-prototype-matchall",a:"string-prototype-matchall"},"127.50":{t:"Function.prototype.toString() 返回注释与空格",p:"在以往的版本中，Function.prototype.toString()得到的字符串是去掉空白符号的，但是从ES10开始会 ...",l:"interview-questions/js/es/index.html#function-prototype-tostring-返回注释与空格",a:"function-prototype-tostring-返回注释与空格"},"127.51":{t:"try-catch",p:`在以往的版本中，try-catch里catch后面必须带异常参数，例如：
    // ES10之前
try {
      ...`,l:"interview-questions/js/es/index.html#try-catch",a:"try-catch"},"127.52":{t:"BigIntBigInt** 是一种内置对象，它提供了一种方法来表示大于 `253 - 1` 的整数。这原本是 Javascript中可以用 `Number` 表示的最大数字。BigInt 可以表示任意大的整数。",p:`可以用在一个整数字面量后面加 n 的方式定义一个 BigInt ，如：10n，或者调用函数BigInt()。
在以往的版本中 ...`,l:"interview-questions/js/es/index.html#bigintbigint-是一种内置对象-它提供了一种方法来表示大于-253-1-的整数。这原本是-javascript中可以用-number-表示的最大数字。bigint-可以表示任意大的整数。",a:"bigintbigint-是一种内置对象-它提供了一种方法来表示大于-253-1-的整数。这原本是-javascript中可以用-number-表示的最大数字。bigint-可以表示任意大的整数。"},"127.53":{t:"globalThis",p:`globalThis属性包含类似于全局对象 this值。所以在全局环境下，我们有：
globalThis === this  ...`,l:"interview-questions/js/es/index.html#globalthis",a:"globalthis"},"127.54":{t:"import 语句",p:"静态的 import 语句用于导入由另一个模块导出的绑定。无论是否声明了 严格模式，导入的模块都运行在严格模式下。在浏览器中 ...",l:"interview-questions/js/es/index.html#import-语句",a:"import-语句"},"127.55":{t:"私有元素与方法",p:`在ES10之前，如果我们要实现一个简单的计数器组件，我们可能会这么写：
// web component 写法
class  ...`,l:"interview-questions/js/es/index.html#私有元素与方法",a:"私有元素与方法"},"128.0":{t:"# 阐述一下 JS 的事件循环",p:`
事件循环又叫做消息循环，是浏览器渲染主线程的工作方式。
官方叫做 event loop  浏览器叫做 message lo ...`,l:"interview-questions/js/event-loop/index.html",a:"阐述一下-js-的事件循环"},"129.0":{t:"# for-in vs for-of",p:"",l:"interview-questions/js/forIn-forOf/index.html",a:"for-in-vs-for-of"},"129.1":{t:"for...in的特点",p:`
for … in 循环返回的值都是数据结构的 键值名(即下标)。
遍历对象返回的对象的key值,遍历数组返回的数组的下标( ...`,l:"interview-questions/js/forIn-forOf/index.html#for-in的特点",a:"for-in的特点"},"129.2":{t:"代码示例",p:`
function Foo() {
 this[99] = 'test-100'
 this[1] = 'test-1'
  ...`,l:"interview-questions/js/forIn-forOf/index.html#代码示例",a:"代码示例"},"129.3":{t:"for… in遍历数组的毛病",p:`
index索引为字符串型数字，不能直接进行几何运算
遍历顺序有可能不是按照实际数组的内部顺序
使用for… in会遍历数组 ...`,l:"interview-questions/js/forIn-forOf/index.html#for-in遍历数组的毛病",a:"for-in遍历数组的毛病"},"129.4":{t:"for… of 特点",p:`for… of 循环用来获取一对键值对中的 值,而 for… in 获取的是 键名

一个数据结构只要部署了Symbol.i ...`,l:"interview-questions/js/forIn-forOf/index.html#for-of-特点",a:"for-of-特点"},"129.5":{t:"代码示例",p:`var obj={
　　a:1,
　　b:2,
　　c:3
}
for (var key of Object.keys(ob ...`,l:"interview-questions/js/forIn-forOf/index.html#代码示例",a:"代码示例"},"129.6":{t:"for... of遍历类数组对象代码示例",p:`  // 字符串
  var str = &quot;hello&quot;;
  for (let s of str) { ...`,l:"interview-questions/js/forIn-forOf/index.html#for-of遍历类数组对象代码示例",a:"for-of遍历类数组对象代码示例"},"129.7":{t:"总结",p:`
无论是for...in还是for...of语句都是迭代一些东西。它们之间的主要区别在于它们的迭代方式。
对于for...  ...`,l:"interview-questions/js/forIn-forOf/index.html#总结",a:"总结"},"129.8":{t:"总结来说",p:`for... of 常用于遍历数组
for... in 常用于遍历对象
`,l:"interview-questions/js/forIn-forOf/index.html#总结来说",a:"总结来说"},"130.0":{t:"# JSON stringify 特性",p:"",l:"interview-questions/js/json-stringify/index.html",a:"json-stringify-特性"},"130.1":{t:"JSON.stringify()",p:"",l:"interview-questions/js/json-stringify/index.html#json-stringify",a:"json-stringify"},"130.2":{t:"JSON.stringify() 第一大特性总结",p:`
undefined、任意的函数以及 symbol 作为对象属性值时 JSON.stringify() 对跳过（忽略）它们进 ...`,l:"interview-questions/js/json-stringify/index.html#json-stringify-第一大特性总结",a:"json-stringify-第一大特性总结"},"130.3":{t:"JSON.stringify() 第二大特性",p:`
非数组对象的属性不能保证以特定的顺序出现在序列化后的字符串中。

const data = {
  a: &quot;aa ...`,l:"interview-questions/js/json-stringify/index.html#json-stringify-第二大特性",a:"json-stringify-第二大特性"},"130.4":{t:"JSON.stringify() 第三大特性",p:`
转换值如果有 toJSON() 函数，该函数返回什么值，序列化结果就是什么值，并且忽略其他属性的值。

JSON.stri ...`,l:"interview-questions/js/json-stringify/index.html#json-stringify-第三大特性",a:"json-stringify-第三大特性"},"130.5":{t:"JSON.stringify()第四大特性",p:`
JSON.stringify() 将会正常序列化 Date 的值。

JSON.stringify({ now: new  ...`,l:"interview-questions/js/json-stringify/index.html#json-stringify-第四大特性",a:"json-stringify-第四大特性"},"130.6":{t:"JSON.stringify() 第五大特性",p:`NaN 和 Infinity 格式的数值及 null 都会被当做 null。

JSON.stringify(NaN)
// ...`,l:"interview-questions/js/json-stringify/index.html#json-stringify-第五大特性",a:"json-stringify-第五大特性"},"130.7":{t:"JSON.stringify() 第六大特性",p:`关于基本类型的序列化：

布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。

JSON.stringi ...`,l:"interview-questions/js/json-stringify/index.html#json-stringify-第六大特性",a:"json-stringify-第六大特性"},"130.8":{t:"JSON.stringify() 第七大特性",p:`关于对象属性的是否可枚举：

其他类型的对象，包括 Map/Set/WeakMap/WeakSet，仅会序列化可枚举的属性。 ...`,l:"interview-questions/js/json-stringify/index.html#json-stringify-第七大特性",a:"json-stringify-第七大特性"},"130.9":{t:"JSON.stringify() 第八大特性",p:"我们都知道实现深拷贝最简单粗暴的方式就是序列化：JSON.parse(JSON.stringify())，这个方式实现深拷贝 ...",l:"interview-questions/js/json-stringify/index.html#json-stringify-第八大特性",a:"json-stringify-第八大特性"},"130.10":{t:"JSON.stringify() 第九大特性",p:`
所有以 symbol 为属性键的属性都会被完全忽略掉，即便 replacer 参数中强制指定包含了它们。

JSON.st ...`,l:"interview-questions/js/json-stringify/index.html#json-stringify-第九大特性",a:"json-stringify-第九大特性"},"130.11":{t:"JSON.stringify() 第二个参数和第三个参数",p:"",l:"interview-questions/js/json-stringify/index.html#json-stringify-第二个参数和第三个参数",a:"json-stringify-第二个参数和第三个参数"},"130.12":{t:"强大的第二个参数",p:`
作为函数时，它有两个参数，键（key）和值（value），函数类似就是数组方法 map、filter 等方法的回调函数，对 ...`,l:"interview-questions/js/json-stringify/index.html#强大的第二个参数",a:"强大的第二个参数"},"130.13":{t:"华丽的第三个参数",p:`
如果是一个数字, 则在字符串化时每一级别会比上一级别缩进多这个数字值的空格（最多10个空格）；
如果是一个字符串，则每一级 ...`,l:"interview-questions/js/json-stringify/index.html#华丽的第三个参数",a:"华丽的第三个参数"},"131.0":{t:"# 常用的js 函数 -手写",p:"",l:"interview-questions/js/my-js/index.html",a:"常用的js-函数-手写"},"131.1":{t:"手写 map",p:`function myMap (fn,content)  {
    let arr = Array.prototype.s ...`,l:"interview-questions/js/my-js/index.html#手写-map",a:"手写-map"},"131.2":{t:"手写 filter",p:`function myFilter (fn,content)  {
    let arr = Array.prototyp ...`,l:"interview-questions/js/my-js/index.html#手写-filter",a:"手写-filter"},"131.3":{t:"手写 some",p:`function mySome (fn,content)  {
    let arr = Array.prototype. ...`,l:"interview-questions/js/my-js/index.html#手写-some",a:"手写-some"},"131.4":{t:"手写 every",p:`function myEvery (fn,content)  {
    let arr = Array.prototype ...`,l:"interview-questions/js/my-js/index.html#手写-every",a:"手写-every"},"131.5":{t:"手写 find",p:`function myFind (fn,content)  {
    let arr = Array.prototype. ...`,l:"interview-questions/js/my-js/index.html#手写-find",a:"手写-find"},"131.6":{t:"手写 findIndex",p:`function myFindIndex (fn,content)  {
    let arr = Array.proto ...`,l:"interview-questions/js/my-js/index.html#手写-findindex",a:"手写-findindex"},"131.7":{t:"手写 new",p:`function myNew(){
  // 1. 创建一个空对象
  let targetObj={}
  let [co ...`,l:"interview-questions/js/my-js/index.html#手写-new",a:"手写-new"},"131.8":{t:"手写 call",p:`Function.prototype.myCall = function (content) {
    if(typeof ...`,l:"interview-questions/js/my-js/index.html#手写-call",a:"手写-call"},"131.9":{t:"手写 apply",p:`Function.prototype.myApply = function (content) {
    if(typeo ...`,l:"interview-questions/js/my-js/index.html#手写-apply",a:"手写-apply"},"131.10":{t:"手写 bind",p:`Function.prototype.myBind = function (context) {
  if (typeof  ...`,l:"interview-questions/js/my-js/index.html#手写-bind",a:"手写-bind"},"131.11":{t:"手写instanceof",p:`function myInstanceof(left, right) {
  let prototype = right.p ...`,l:"interview-questions/js/my-js/index.html#手写instanceof",a:"手写instanceof"},"132.0":{t:"# 手写 promise",p:"",l:"interview-questions/js/my-promise/index.html",a:"手写-promise"},"132.1":{t:"MyPromise",p:`class MyPromise {
  // 定义 promise 状态
  static PENDING = 'pendi ...`,l:"interview-questions/js/my-promise/index.html#mypromise",a:"mypromise"},"132.2":{t:"Promise.race",p:`Promise.myRace = function (promises) {
  return new Promise((r ...`,l:"interview-questions/js/my-promise/index.html#promise-race",a:"promise-race"},"132.3":{t:"Promise.any",p:`Promise.myAny = function (promises) {
  return new Promise((re ...`,l:"interview-questions/js/my-promise/index.html#promise-any",a:"promise-any"},"132.4":{t:"Promise.all",p:`Promise.myAll = function (promises) {
  return new Promise((re ...`,l:"interview-questions/js/my-promise/index.html#promise-all",a:"promise-all"},"133.0":{t:"# 跨页面通信",p:"",l:"interview-questions/js/page-communication/index.html",a:"跨页面通信"},"133.1":{t:"1. BroadCast Channel",p:"BroadCast Channel 可以帮我们创建一个用于广播的通信频道。当所有页面都监听同一频道的消息时，其中某一个页面通 ...",l:"interview-questions/js/page-communication/index.html#_1-broadcast-channel",a:"_1-broadcast-channel"},"133.2":{t:"2. Service Worker",p:"Service Worker 是一个可以长期运行在后台的 Worker，能够实现与页面的双向通信。多页面共享间的 Servi ...",l:"interview-questions/js/page-communication/index.html#_2-service-worker",a:"_2-service-worker"},"133.3":{t:"3. LocalStorage",p:"LocalStorage 作为前端最常用的本地存储，大家应该已经非常熟悉了；但StorageEvent这个与它相关的事件有些 ...",l:"interview-questions/js/page-communication/index.html#_3-localstorage",a:"_3-localstorage"},"133.4":{t:"4. Shared Worker",p:"Shared Worker 是 Worker 家族的另一个成员。普通的 Worker 之间是独立运行、数据互不相通；而多个  ...",l:"interview-questions/js/page-communication/index.html#_4-shared-worker",a:"_4-shared-worker"},"133.5":{t:"5. IndexedDB",p:"除了可以利用 Shared Worker 来共享存储数据，还可以使用其他一些“全局性”（支持跨页面）的存储方案。例如 Ind ...",l:"interview-questions/js/page-communication/index.html#_5-indexeddb",a:"_5-indexeddb"},"133.6":{t:"6. window.open + window.opener",p:"当我们使用window.open打开页面时，方法会返回一个被打开页面window的引用。而在未显示指定noopener时，被 ...",l:"interview-questions/js/page-communication/index.html#_6-window-open-window-opener",a:"_6-window-open-window-opener"},"133.7":{t:"二、非同源页面之间的通信",p:"上面我们介绍了七种前端跨页面通信的方法，但它们大都受到同源策略的限制。然而有时候，我们有两个不同域名的产品线，也希望它们下面 ...",l:"interview-questions/js/page-communication/index.html#二、非同源页面之间的通信",a:"二、非同源页面之间的通信"},"133.8":{t:"总结",p:"",l:"interview-questions/js/page-communication/index.html#总结",a:"总结"},"133.9":{t:"对于同源页面，常见的方式包括",p:`
广播模式：Broadcast Channe / Service Worker / LocalStorage + Stora ...`,l:"interview-questions/js/page-communication/index.html#对于同源页面-常见的方式包括",a:"对于同源页面-常见的方式包括"},"134.0":{t:"# 细说前端路由的hash模式和 history模式",p:"",l:"interview-questions/js/router/index.html",a:"细说前端路由的hash模式和-history模式"},"134.1":{t:"为什么要用",p:"AJAX局部刷新，导致浏览器的URL不会发生任何变化而完成了请求，从而破坏了用户浏览体验。同时本次浏览的页面内容在用户下次使 ...",l:"interview-questions/js/router/index.html#为什么要用",a:"为什么要用"},"134.2":{t:"前端路由实现方式",p:"在单页面web网页中, 单纯的浏览器地址改变, 网页不会重载，如单纯的hash网址改变网页不会变化，因此我们的路由主要是通过 ...",l:"interview-questions/js/router/index.html#前端路由实现方式",a:"前端路由实现方式"},"134.3":{t:"1.hash模式",p:"使用window.location.hash属性及窗口的onhashchange事件，可以实现监听浏览器地址hash值变化， ...",l:"interview-questions/js/router/index.html#_1-hash模式",a:"_1-hash模式"},"134.4":{t:"2.history模式",p:`概述
window.history 属性指向 History 对象，它表示当前窗口的浏览历史。当发生改变时，只会改变页面的路 ...`,l:"interview-questions/js/router/index.html#_2-history模式",a:"_2-history模式"},"135.0":{t:"# JS 中的计时器能做到精确计时吗？为什么？",p:`
不行，因为：计算机硬件没有原子钟，使用 cpu 计时器做的 所以 无法做到精确计时
操作系统的计时函数本身就有少量偏差，由 ...`,l:"interview-questions/js/timer-accurate/index.html",a:"js-中的计时器能做到精确计时吗-为什么"},"136.0":{t:"# URL 转码 和解码",p:"",l:"interview-questions/js/url-encryption-to-decrypt/index.html",a:"url-转码-和解码"},"136.1":{t:"1. escape 和 unescape",p:`
escape()不能直接用于URL编码，它的真正作用是返回一个字符的Unicode编码值。
采用unicode字符集对指定 ...`,l:"interview-questions/js/url-encryption-to-decrypt/index.html#_1-escape-和-unescape",a:"_1-escape-和-unescape"},"136.2":{t:"escape不编码字符有69个：*，+，-，.，/，@，_，0-9，a-z，A-Z",p:`escape()函数用于js对字符串进行编码，不常用。
　var url = &quot;http://localhost: ...`,l:"interview-questions/js/url-encryption-to-decrypt/index.html#escape不编码字符有69个-0-9-a-z-a-z",a:"escape不编码字符有69个-0-9-a-z-a-z"},"136.3":{t:"2. encodeURI 和 decodeURI 把URI字符串采用UTF-8编码格式转化成escape各式的字符串。",p:"",l:"interview-questions/js/url-encryption-to-decrypt/index.html#_2-encodeuri-和-decodeuri-把uri字符串采用utf-8编码格式转化成escape各式的字符串。",a:"_2-encodeuri-和-decodeuri-把uri字符串采用utf-8编码格式转化成escape各式的字符串。"},"136.4":{t:"encodeURI不编码字符有82个：!，#，$，&，'，(，)，*，+，,，-，.，/，:，;，=，?，@，_，~，0-9，a-z，A-Z",p:`
encodeURI()用于整个url编码

　　var url = &quot;http://localhost:8080 ...`,l:"interview-questions/js/url-encryption-to-decrypt/index.html#encodeuri不编码字符有82个-0-9-a-z-a-z",a:"encodeuri不编码字符有82个-0-9-a-z-a-z"},"136.5":{t:"3. encodeURIComponent 和 decodeURIComponent",p:"",l:"interview-questions/js/url-encryption-to-decrypt/index.html#_3-encodeuricomponent-和-decodeuricomponent",a:"_3-encodeuricomponent-和-decodeuricomponent"},"136.6":{t:"与encodeURI()的区别是，它用于对URL的组成部分进行个别编码，而不用于对整个URL进行编码",p:"因此，&quot;; / ? : @ &amp; = + $ , #&quot;，这些在encodeURI()中不被编码的符 ...",l:"interview-questions/js/url-encryption-to-decrypt/index.html#与encodeuri-的区别是-它用于对url的组成部分进行个别编码-而不用于对整个url进行编码",a:"与encodeuri-的区别是-它用于对url的组成部分进行个别编码-而不用于对整个url进行编码"},"136.7":{t:"例1",p:"　　var url = &quot;http://localhost:8080/pro?a=1&amp;b=张三&amp;c ...",l:"interview-questions/js/url-encryption-to-decrypt/index.html#例1",a:"例1"},"136.8":{t:"例2",p:`
　var url = &quot;&lt;http://localhost:8080/pp?a=1&amp;b&gt;=& ...`,l:"interview-questions/js/url-encryption-to-decrypt/index.html#例2",a:"例2"},"137.0":{t:"# 硬链接和软链接",p:"众所周知，Unix/Linux系统中一切皆文件。可见，文件在Linux系统中非常重要。我们平常比较直观的对于文件的感受肯定是 ...",l:"interview-questions/linux/soft-hard/index.html",a:"硬链接和软链接"},"137.1":{t:"文件重命名或文件移动",p:"文件重命名和文件移动对于Linux系统来说都是文件绝对路径的更改。对硬链接来说，文件重命名或文件移动不会改变链接指向，而对软 ...",l:"interview-questions/linux/soft-hard/index.html#文件重命名或文件移动",a:"文件重命名或文件移动"},"137.2":{t:"文件删除",p:"rm命令或者nodejs的unlink其实是将inode的链接数减1。对于前文的硬链接，删除test_hard.txt使得i ...",l:"interview-questions/linux/soft-hard/index.html#文件删除",a:"文件删除"},"137.3":{t:"链接文件和文件夹",p:`软链接可以链接文件和文件夹，但硬链接只能链接文件。
`,l:"interview-questions/linux/soft-hard/index.html#链接文件和文件夹",a:"链接文件和文件夹"},"137.4":{t:"不同文件系统创建链接",p:"软链接可以跨不同的文件系统创建，但是硬链接不行，因为硬链接是共用一个inode，而不同的文件系统有不同的inode tabl ...",l:"interview-questions/linux/soft-hard/index.html#不同文件系统创建链接",a:"不同文件系统创建链接"},"137.5":{t:"硬链接",p:`
文件备份：为了防止重要的文件被误删，文件备份是一种好的办法，但拷贝文件会带来磁盘空间的消耗。硬链接能不占用磁盘空间实现文件 ...`,l:"interview-questions/linux/soft-hard/index.html#硬链接",a:"硬链接"},"137.6":{t:"软链接",p:`
快捷方式：对于路径很深的文件，查找起来不太方便。利用软链接在桌面创建快捷方式，可以迅速打开并编辑文件。
灵活切换程序版本： ...`,l:"interview-questions/linux/soft-hard/index.html#软链接",a:"软链接"},"138.0":{t:"# 基础知识",p:"",l:"interview-questions/nginx/basis/index.html",a:"基础知识"},"138.1":{t:"基础命令",p:"",l:"interview-questions/nginx/basis/index.html#基础命令",a:"基础命令"},"138.2":{t:"列出 nginx 相关软件包",p:`yum list | grep nginx


yum list：列出所有软件清单
yum list installed：列 ...`,l:"interview-questions/nginx/basis/index.html#列出-nginx-相关软件包",a:"列出-nginx-相关软件包"},"138.3":{t:"安装 nginx",p:`yum install nginx

`,l:"interview-questions/nginx/basis/index.html#安装-nginx",a:"安装-nginx"},"138.4":{t:"查看 nginx 版本信息",p:`nginx -v

`,l:"interview-questions/nginx/basis/index.html#查看-nginx-版本信息",a:"查看-nginx-版本信息"},"138.5":{t:"列出 nginx 相关目录",p:`rpm -ql nginx

`,l:"interview-questions/nginx/basis/index.html#列出-nginx-相关目录",a:"列出-nginx-相关目录"},"138.6":{t:"全格式显示所有 nginx 运行进程",p:`ps -ef | grep nginx


ps：列出系统中当前运行的进程
-ef：-e 显示所有，-f 全格式显示，也可使 ...`,l:"interview-questions/nginx/basis/index.html#全格式显示所有-nginx-运行进程",a:"全格式显示所有-nginx-运行进程"},"138.7":{t:"开机自启",p:"",l:"interview-questions/nginx/basis/index.html#开机自启",a:"开机自启"},"138.8":{t:"设置开机自启",p:`systemctl enable nginx

`,l:"interview-questions/nginx/basis/index.html#设置开机自启",a:"设置开机自启"},"138.9":{t:"关闭开机自启",p:`systemctl disable nginx

可用 reboot 重启服务器，配合 ps -ef | grep ngin ...`,l:"interview-questions/nginx/basis/index.html#关闭开机自启",a:"关闭开机自启"},"138.10":{t:"启动 & 停止 & 重启 & 重载",p:"",l:"interview-questions/nginx/basis/index.html#启动-停止-重启-重载",a:"启动-停止-重启-重载"},"138.11":{t:"启动 nginx",p:`systemctl start nginx ｜ nginx

`,l:"interview-questions/nginx/basis/index.html#启动-nginx",a:"启动-nginx"},"138.12":{t:"停止 nginx",p:`systemctl stop nginx | nginx -s stop

`,l:"interview-questions/nginx/basis/index.html#停止-nginx",a:"停止-nginx"},"138.13":{t:"重启 nginx",p:`systemctl restart nginx | nginx -s reopen

`,l:"interview-questions/nginx/basis/index.html#重启-nginx",a:"重启-nginx"},"138.14":{t:"重载 nginx，更改 nginx 配置后需执行",p:`systemctl reload nginx | nginx -s reload

`,l:"interview-questions/nginx/basis/index.html#重载-nginx-更改-nginx-配置后需执行",a:"重载-nginx-更改-nginx-配置后需执行"},"138.15":{t:"杀死单个进程",p:`kill -9 PID（进程ID）

`,l:"interview-questions/nginx/basis/index.html#杀死单个进程",a:"杀死单个进程"},"138.16":{t:"查看 nginx 最终配置",p:`nginx -T

`,l:"interview-questions/nginx/basis/index.html#查看-nginx-最终配置",a:"查看-nginx-最终配置"},"138.17":{t:"检查配置项是否有问题，每次更改完先检查后重载",p:"",l:"interview-questions/nginx/basis/index.html#检查配置项是否有问题-每次更改完先检查后重载",a:"检查配置项是否有问题-每次更改完先检查后重载"},"138.18":{t:"当前目录下",p:`nginx -t

`,l:"interview-questions/nginx/basis/index.html#当前目录下",a:"当前目录下"},"138.19":{t:"不在当前目录",p:`nginx -t -c &lt;配置路径&gt;

`,l:"interview-questions/nginx/basis/index.html#不在当前目录",a:"不在当前目录"},"138.20":{t:"配置文件",p:`nginx.conf 文件默认配置
!图片
`,l:"interview-questions/nginx/basis/index.html#配置文件",a:"配置文件"},"138.21":{t:"上文日志格式中所涉及变量含义如下",p:`
变量 含义
$remote_addr 客户端地址
$remote_user 已经过验证的用户名
$time_local 通 ...`,l:"interview-questions/nginx/basis/index.html#上文日志格式中所涉及变量含义如下",a:"上文日志格式中所涉及变量含义如下"},"138.22":{t:"静态资源配置",p:`server {
  listen 80;
  server_name static.deeruby.com;

  loc ...`,l:"interview-questions/nginx/basis/index.html#静态资源配置",a:"静态资源配置"},"138.23":{t:"root 与 alias 区别",p:`
图中静态资源所在目录为：/home/static；root 查找静态资源的路径为其填写路径拼接 location 路径，a ...`,l:"interview-questions/nginx/basis/index.html#root-与-alias-区别",a:"root-与-alias-区别"},"138.24":{t:"autoindex",p:`开启 autoindex 可访问文件根目录
`,l:"interview-questions/nginx/basis/index.html#autoindex",a:"autoindex"},"138.25":{t:"反向代理",p:"",l:"interview-questions/nginx/basis/index.html#反向代理",a:"反向代理"},"138.26":{t:"我们在服务器上跑一个 node 项目，配置用 域名 来代替 ip + 端口 访问",p:`server {
  listen       80;
  server_name  nginx.deeruby.com;
 ...`,l:"interview-questions/nginx/basis/index.html#我们在服务器上跑一个-node-项目-配置用-域名-来代替-ip-端口-访问",a:"我们在服务器上跑一个-node-项目-配置用-域名-来代替-ip-端口-访问"},"138.27":{t:"解决跨域",p:"tips：实际工作中，解决跨域一般为后端配置 CORS，详见笔者 20分钟，巩固你的HTTP知识体系 这篇文章中 HTTP请 ...",l:"interview-questions/nginx/basis/index.html#解决跨域",a:"解决跨域"},"138.28":{t:"hosts 配置",p:`127.0.0.1       nginx.deeruby.com

`,l:"interview-questions/nginx/basis/index.html#hosts-配置",a:"hosts-配置"},"138.29":{t:"nginx 配置",p:`server {
  listen       80;
  server_name  nginx.deeruby.com;
 ...`,l:"interview-questions/nginx/basis/index.html#nginx-配置",a:"nginx-配置"},"138.30":{t:"HTTPS",p:"",l:"interview-questions/nginx/basis/index.html#https",a:"https"},"138.31":{t:"配置HTTPS",p:`server {
  listen 443 ssl;                                     ...`,l:"interview-questions/nginx/basis/index.html#配置https",a:"配置https"},"138.32":{t:"访问 HTTP 自动跳转至 HTTPS",p:`server {
  listen       80;
  server_name  sso.deeruby.com;
   ...`,l:"interview-questions/nginx/basis/index.html#访问-http-自动跳转至-https",a:"访问-http-自动跳转至-https"},"138.33":{t:"rewrite",p:`rewrite   &lt;regex&gt;    &lt;replacement&gt;       [flag]
   ...`,l:"interview-questions/nginx/basis/index.html#rewrite",a:"rewrite"},"138.34":{t:"图片防盗链",p:`
引言：referer请求头用于识别访问来源，以此来配置防盗链。
valid_referers：设置可访问资源的规则，其不允 ...`,l:"interview-questions/nginx/basis/index.html#图片防盗链",a:"图片防盗链"},"138.35":{t:"访问限制",p:`location /static {
  root /home;
  allow 39.xxx.xxx.xxx;  # al ...`,l:"interview-questions/nginx/basis/index.html#访问限制",a:"访问限制"},"138.36":{t:"禁用请求方法",p:`仅允许使用 GET、POST、HEAD、OPTIONS 这四种请求，使用其余请求返回403
if ($request_met ...`,l:"interview-questions/nginx/basis/index.html#禁用请求方法",a:"禁用请求方法"},"138.37":{t:"缓存",p:`expires 7d;  # 缓存7天
expires -1;  # 不缓存

`,l:"interview-questions/nginx/basis/index.html#缓存",a:"缓存"},"138.38":{t:"PC端和移动端使用不同项目",p:`location / {
  root /home/static/pc;
  if ($http_user_agent ~* ...`,l:"interview-questions/nginx/basis/index.html#pc端和移动端使用不同项目",a:"pc端和移动端使用不同项目"},"138.39":{t:"负载均衡",p:`upstream backserver {              # 存放负载均衡所需变量
  ip_hash;     ...`,l:"interview-questions/nginx/basis/index.html#负载均衡",a:"负载均衡"},"138.40":{t:"限速限流",p:`limit_conn 连接频率限制：TCP连接
limit_conn_zone $binary_remote_addr zo ...`,l:"interview-questions/nginx/basis/index.html#限速限流",a:"限速限流"},"138.41":{t:"其它",p:"",l:"interview-questions/nginx/basis/index.html#其它",a:"其它"},"138.42":{t:"开启gzip",p:`gzip on;

`,l:"interview-questions/nginx/basis/index.html#开启gzip",a:"开启gzip"},"139.0":{t:"# Nginx",p:"",l:"interview-questions/nginx/start/index.html",a:"nginx"},"139.1":{t:"正向代理",p:`

一个位于客户端和原始服务器(origin server)之间的服务器，为了从原始服务器取得内容，客户端向代理发送一个请求 ...`,l:"interview-questions/nginx/start/index.html#正向代理",a:"正向代理"},"139.2":{t:"反向代理",p:`

运行方式是代理服务器接受网络上的连接请求。它将请求转发给内部网络上的服务器，并将从服务器上得到的结果返回给网络上请求连接 ...`,l:"interview-questions/nginx/start/index.html#反向代理",a:"反向代理"},"139.3":{t:"负载均衡",p:`
多在高并发情况下需要使用。其原理就是将数据流量分摊到多个服务器执行，减轻每台服务器的压力，多台服务器（集群）完成工作任务， ...`,l:"interview-questions/nginx/start/index.html#负载均衡",a:"负载均衡"},"139.4":{t:"动静分离",p:`
nginx 提供的动静分离是指把动态请求和静态请求分离开，合适的服务器处理相应的请求，使整个服务器系统的性能、效率更高。
 ...`,l:"interview-questions/nginx/start/index.html#动静分离",a:"动静分离"},"140.0":{t:"# require加载器实现原理",p:`1. 概述
人们常说node并不是一门新的编程语言，他只是javascript的运行时，运行时你可以简单地理解为运行java ...`,l:"interview-questions/node/require/index.html",a:"require加载器实现原理"},"140.1":{t:"1\\. eval",p:`const name = 'yd';
const str = 'const a = 123; console.log(nam ...`,l:"interview-questions/node/require/index.html#_1-eval",a:"_1-eval"},"140.2":{t:"2\\. new Function",p:"new Function接收的是一个要执行的字符串，返回的是一个新的函数，调用这个新的函数字符串就会执行了。如果这个函数需要 ...",l:"interview-questions/node/require/index.html#_2-new-function",a:"_2-new-function"},"140.3":{t:"3\\. vm 内置模块",p:`虽然外部定义了hello，但是str是一个独立的模块，并不在hello变量，所以会直接报错。
// 引入vm模块， 不需要安 ...`,l:"interview-questions/node/require/index.html#_3-vm-内置模块",a:"_3-vm-内置模块"},"140.4":{t:"1\\. path模块",p:`用于处理文件路径。
basename: 基础路径, 有文件路径就不是基础路径，基础路劲是1.js
extname: 获取扩展 ...`,l:"interview-questions/node/require/index.html#_1-path模块",a:"_1-path模块"},"140.5":{t:"2\\. fs模块",p:"用于操作文件或者文件夹，比如文件的读写，新增，删除等。常用方法有readFile和readFileSync，分别是异步读取文 ...",l:"interview-questions/node/require/index.html#_2-fs模块",a:"_2-fs模块"},"140.6":{t:"1\\. 导入相关模块，创建一个Require方法",p:"",l:"interview-questions/node/require/index.html#_1-导入相关模块-创建一个require方法",a:"_1-导入相关模块-创建一个require方法"},"140.7":{t:"2\\. 抽离通过Module.\\_load方法，用于加载模块",p:"",l:"interview-questions/node/require/index.html#_2-抽离通过module-load方法-用于加载模块",a:"_2-抽离通过module-load方法-用于加载模块"},"140.8":{t:"3\\. Module.resolveFilename 根据相对路径，转换成绝对路径",p:"",l:"interview-questions/node/require/index.html#_3-module-resolvefilename-根据相对路径-转换成绝对路径",a:"_3-module-resolvefilename-根据相对路径-转换成绝对路径"},"140.9":{t:"4\\. 缓存模块 Module.\\_cache，同一个模块不要重复加载，提升性能",p:"",l:"interview-questions/node/require/index.html#_4-缓存模块-module-cache-同一个模块不要重复加载-提升性能",a:"_4-缓存模块-module-cache-同一个模块不要重复加载-提升性能"},"140.10":{t:"5\\. 创建模块 id: 保存的内容是 exports = 相当于this",p:"",l:"interview-questions/node/require/index.html#",a:""},"140.11":{t:"6\\. 利用tryModuleLoad(module, filename) 尝试加载模块",p:"",l:"interview-questions/node/require/index.html#_6-利用trymoduleload-module-filename-尝试加载模块",a:"_6-利用trymoduleload-module-filename-尝试加载模块"},"140.12":{t:"7\\. Module.\\_extensions使用读取文件",p:"",l:"interview-questions/node/require/index.html#_7-module-extensions使用读取文件",a:"_7-module-extensions使用读取文件"},"140.13":{t:"8\\. Module.wrap: 把读取到的js包裹一个函数",p:"",l:"interview-questions/node/require/index.html#_8-module-wrap-把读取到的js包裹一个函数",a:"_8-module-wrap-把读取到的js包裹一个函数"},"140.14":{t:"9\\. 将拿到的字符串使用runInThisContext运行字符串",p:"",l:"interview-questions/node/require/index.html#_9-将拿到的字符串使用runinthiscontext运行字符串",a:"_9-将拿到的字符串使用runinthiscontext运行字符串"},"140.15":{t:"10\\. 让字符串执行并将this改编成exports",p:"",l:"interview-questions/node/require/index.html#_10-让字符串执行并将this改编成exports",a:"_10-让字符串执行并将this改编成exports"},"141.0":{t:"# 需要了解的nodejs知识（工具模块）",p:"",l:"interview-questions/node/understand-start/index.html",a:"需要了解的nodejs知识-工具模块"},"141.1":{t:"Util",p:`Node.js 的工具模块
`,l:"interview-questions/node/understand-start/index.html#util",a:"util"},"141.2":{t:"常用的判断属性，在util.types对象",p:`
isDate：判断是否是日期格式的变量
isAnyArrayBuffer：判断是否是buffer isAsyncFunct ...`,l:"interview-questions/node/understand-start/index.html#常用的判断属性-在util-types对象",a:"常用的判断属性-在util-types对象"},"141.3":{t:"常用的方法和属性",p:`
format:格式化字符串
inspect: 将对象转为字符串
isDeepStrictEqual：判断两个字符是否强相等 ...`,l:"interview-questions/node/understand-start/index.html#常用的方法和属性",a:"常用的方法和属性"},"141.4":{t:"DNS",p:`Node.js DNS 模块用于解析域名

DNS(Domain Name System): 域名系统、

组成：他是由解析 ...`,l:"interview-questions/node/understand-start/index.html#dns",a:"dns"},"141.5":{t:"OS",p:`Node.js OS 模块提供了一些基本系统操作函数
`,l:"interview-questions/node/understand-start/index.html#os",a:"os"},"141.6":{t:"常用的方法和属性",p:`
networkInterfaces获取网络信息
cpus：获取系统的CPU内核细腻，返回个数组
totalmem：系统总共 ...`,l:"interview-questions/node/understand-start/index.html#常用的方法和属性",a:"常用的方法和属性"},"141.7":{t:"Path",p:`nodejs用来处理文件路径的工具模块，主要处理绝对路径，相对路径
`,l:"interview-questions/node/understand-start/index.html#path",a:"path"},"141.8":{t:"常用的方法和属性",p:`const path = require('path')

//属性- 平台路径的分隔符
const sep =path.s ...`,l:"interview-questions/node/understand-start/index.html#常用的方法和属性",a:"常用的方法和属性"},"142.0":{t:"# 常用操作",p:"",l:"interview-questions/npm/common-operations/index.html",a:"常用操作"},"142.1":{t:"登录",p:`npm login || npm adduser
npm login
npm adduser

`,l:"interview-questions/npm/common-operations/index.html#登录",a:"登录"},"142.2":{t:"docs 查看某个包的文档",p:"",l:"interview-questions/npm/common-operations/index.html#docs-查看某个包的文档",a:"docs-查看某个包的文档"},"142.3":{t:"查看某个包的文档",p:`npm docs [package-name]

`,l:"interview-questions/npm/common-operations/index.html#查看某个包的文档",a:"查看某个包的文档"},"142.4":{t:"查看某个包的官网",p:`npm home [package-name]

`,l:"interview-questions/npm/common-operations/index.html#查看某个包的官网",a:"查看某个包的官网"},"142.5":{t:"info  查看一个包的详细信息",p:`npm v [package-name]
# or
npm view [package-name]
npm info [pa ...`,l:"interview-questions/npm/common-operations/index.html#info-查看一个包的详细信息",a:"info-查看一个包的详细信息"},"142.6":{t:"star 收藏项目",p:"",l:"interview-questions/npm/common-operations/index.html#star-收藏项目",a:"star-收藏项目"},"142.7":{t:"主要是用来收藏项目",p:`npm star  [package-name]

`,l:"interview-questions/npm/common-operations/index.html#主要是用来收藏项目",a:"主要是用来收藏项目"},"142.8":{t:"取消收藏",p:`npm unstar [package-name]

`,l:"interview-questions/npm/common-operations/index.html#取消收藏",a:"取消收藏"},"142.9":{t:"查看收藏列表",p:`npm stars

`,l:"interview-questions/npm/common-operations/index.html#查看收藏列表",a:"查看收藏列表"},"142.10":{t:"versions 查看某个包的所有版本",p:`npm v [package-name] versions

`,l:"interview-questions/npm/common-operations/index.html#versions-查看某个包的所有版本",a:"versions-查看某个包的所有版本"},"142.11":{t:"本地开发的 npm 包如何调试",p:`npm install . -g

// 在某个项目中安装本地包
npm install ../Path/xxPackage ...`,l:"interview-questions/npm/common-operations/index.html#本地开发的-npm-包如何调试",a:"本地开发的-npm-包如何调试"},"142.12":{t:"publish 发布包",p:`首先，你得在本地登录
登录完成后，发布自己开发的工具包，只需简单的三步！
注意:使用淘宝源会报错，要改回默认源
`,l:"interview-questions/npm/common-operations/index.html#publish-发布包",a:"publish-发布包"},"142.13":{t:"记得每次发布前，修改下版本号",p:`npm version [版本号]
然后当前目录执行npm publish就好了
npm publish

`,l:"interview-questions/npm/common-operations/index.html#记得每次发布前-修改下版本号",a:"记得每次发布前-修改下版本号"},"142.14":{t:"取消发布包",p:`npm unpublish [package-name] -f

`,l:"interview-questions/npm/common-operations/index.html#取消发布包",a:"取消发布包"},"142.15":{t:"取消发布包的指定版本",p:`npm unpublish [package-name]@version

`,l:"interview-questions/npm/common-operations/index.html#取消发布包的指定版本",a:"取消发布包的指定版本"},"142.16":{t:"deprecate 弃用包",p:"",l:"interview-questions/npm/common-operations/index.html#deprecate-弃用包",a:"deprecate-弃用包"},"142.17":{t:"弃用整个包",p:`npm deprecate package-name  '弃用信息'

`,l:"interview-questions/npm/common-operations/index.html#弃用整个包",a:"弃用整个包"},"142.18":{t:"弃用包的单个版本",p:`npm deprecate package-name@version  '弃用信息'

`,l:"interview-questions/npm/common-operations/index.html#弃用包的单个版本",a:"弃用包的单个版本"},"142.19":{t:"取消弃用操作",p:"",l:"interview-questions/npm/common-operations/index.html#取消弃用操作",a:"取消弃用操作"},"142.20":{t:"将弃用消息改为空字符串即可",p:`npm deprecate package-name ''

`,l:"interview-questions/npm/common-operations/index.html#将弃用消息改为空字符串即可",a:"将弃用消息改为空字符串即可"},"142.21":{t:"其他操作",p:"",l:"interview-questions/npm/common-operations/index.html#其他操作",a:"其他操作"},"142.22":{t:"查看项目中那些包过时",p:`npm outdated

`,l:"interview-questions/npm/common-operations/index.html#查看项目中那些包过时",a:"查看项目中那些包过时"},"142.23":{t:"查看本地中那些包过时",p:`npm outdated  -g  --depth=0

`,l:"interview-questions/npm/common-operations/index.html#查看本地中那些包过时",a:"查看本地中那些包过时"},"142.24":{t:"列出 node_modules 中的所有包",p:`ls node_modules
dir node_modules

`,l:"interview-questions/npm/common-operations/index.html#列出-node-modules-中的所有包",a:"列出-node-modules-中的所有包"},"142.25":{t:"审计项目中所有包的安全漏洞",p:`npm audit

`,l:"interview-questions/npm/common-operations/index.html#审计项目中所有包的安全漏洞",a:"审计项目中所有包的安全漏洞"},"142.26":{t:"这个命令依赖 package-lock.json 文件,所以如果你用的是yarn需要使用下面的命令",p:`yarn audit

`,l:"interview-questions/npm/common-operations/index.html#这个命令依赖-package-lock-json-文件-所以如果你用的是yarn需要使用下面的命令",a:"这个命令依赖-package-lock-json-文件-所以如果你用的是yarn需要使用下面的命令"},"142.27":{t:"执行后会列出有问题的包",p:`
Critical 需要立即解决的!
High 需要尽快解决!
Moderate 在时间允许的情况下解决
Low 随便你,不 ...`,l:"interview-questions/npm/common-operations/index.html#执行后会列出有问题的包",a:"执行后会列出有问题的包"},"142.28":{t:"检测一下当前镜像源的延迟",p:`npm ping

`,l:"interview-questions/npm/common-operations/index.html#检测一下当前镜像源的延迟",a:"检测一下当前镜像源的延迟"},"142.29":{t:"检测当前 node 和 npm 存在的问题 👇",p:`npm doctor

`,l:"interview-questions/npm/common-operations/index.html#检测当前-node-和-npm-存在的问题-👇",a:"检测当前-node-和-npm-存在的问题-👇"},"143.0":{t:"# link 创建软链",p:"",l:"interview-questions/npm/link/index.html",a:"link-创建软链"},"143.1":{t:"使用软链 npm link",p:"主要是平时开发时，有npm包需要在本地调试好了再发布。发一版测一版，或者把代码复制粘贴到项目文件夹里去调试，很不优雅。软链就 ...",l:"interview-questions/npm/link/index.html#使用软链-npm-link",a:"使用软链-npm-link"},"143.2":{t:"1. 什么是软链？",p:`简单说就是为开发的模块(待发布的npm包)创造一个全局链接，在主项目里链接这个依赖的模块，进行测试。
`,l:"interview-questions/npm/link/index.html#_1-什么是软链",a:"_1-什么是软链"},"143.3":{t:"2. 如何创建、使用、去除软链？",p:"",l:"interview-questions/npm/link/index.html#_2-如何创建、使用、去除软链",a:"_2-如何创建、使用、去除软链"},"143.4":{t:"2.1 先在对应npm包的文件创建一个全局的链接",p:`cd ~/projects/package-project npm link

`,l:"interview-questions/npm/link/index.html#_2-1-先在对应npm包的文件创建一个全局的链接",a:"_2-1-先在对应npm包的文件创建一个全局的链接"},"143.5":{t:"2.2 然后再想要使用该包的项目里使用这个软链",p:`Tips: 注意这里的packageName一定要对应你的npm包package.json里的name字段值。
cd ~/p ...`,l:"interview-questions/npm/link/index.html#_2-2-然后再想要使用该包的项目里使用这个软链",a:"_2-2-然后再想要使用该包的项目里使用这个软链"},"143.6":{t:"2.3 用完了如何去除软链呢？",p:"下边两步的顺序，我自己试了下，颠倒顺序其实也没报错。但是既然有同学提出来了，我觉得逻辑上先unlink包再删掉全局link可 ...",l:"interview-questions/npm/link/index.html#_2-3-用完了如何去除软链呢",a:"_2-3-用完了如何去除软链呢"},"143.7":{t:"2.31 先在使用npm包的项目的文件目录下解除特定的链接",p:`npm unlink packageName

`,l:"interview-questions/npm/link/index.html#_2-31-先在使用npm包的项目的文件目录下解除特定的链接",a:"_2-31-先在使用npm包的项目的文件目录下解除特定的链接"},"143.8":{t:"2.32 再在npm包所在的文件目录下去除全局链接",p:`npm unlink

到这里其实就OK了
`,l:"interview-questions/npm/link/index.html#_2-32-再在npm包所在的文件目录下去除全局链接",a:"_2-32-再在npm包所在的文件目录下去除全局链接"},"143.9":{t:"2.33 强制解除创建的某个特定全局链接",p:`sudo npm rm --global packageName

`,l:"interview-questions/npm/link/index.html#_2-33-强制解除创建的某个特定全局链接",a:"_2-33-强制解除创建的某个特定全局链接"},"143.10":{t:"2.34 查看所有创建的全局链接名称",p:`npm ls --global --depth 0

`,l:"interview-questions/npm/link/index.html#_2-34-查看所有创建的全局链接名称",a:"_2-34-查看所有创建的全局链接名称"},"144.0":{t:"# npm run xxx",p:"",l:"interview-questions/npm/npm-run-xxx/index.html",a:"npm-run-xxx"},"144.1":{t:"运行 npm run xxx 的时候发生了什么？",p:`
pm run xxx的时候，首先会去项目的package.json文件里找scripts 里找对应的xxx，然后执行 xx ...`,l:"interview-questions/npm/npm-run-xxx/index.html#运行-npm-run-xxx-的时候发生了什么",a:"运行-npm-run-xxx-的时候发生了什么"},"144.2":{t:"node_modules/bin中 有三个vue-cli-service文件。为什么会有三个文件呢？",p:"",l:"interview-questions/npm/npm-run-xxx/index.html#node-modules-bin中-有三个vue-cli-service文件。为什么会有三个文件呢",a:"node-modules-bin中-有三个vue-cli-service文件。为什么会有三个文件呢"},"144.3":{t:"unix 系默认的可执行文件，必须输入完整文件名",p:`vue-cli-service
`,l:"interview-questions/npm/npm-run-xxx/index.html#unix-系默认的可执行文件-必须输入完整文件名",a:"unix-系默认的可执行文件-必须输入完整文件名"},"144.4":{t:"windows cmd 中默认的可执行文件，当我们不添加后缀名时，自动根据 pathext 查找文件",p:`vue-cli-service.cmd
`,l:"interview-questions/npm/npm-run-xxx/index.html#windows-cmd-中默认的可执行文件-当我们不添加后缀名时-自动根据-pathext-查找文件",a:"windows-cmd-中默认的可执行文件-当我们不添加后缀名时-自动根据-pathext-查找文件"},"144.5":{t:"Windows PowerShell 中可执行文件，可以跨平台",p:`vue-cli-service.ps1
`,l:"interview-questions/npm/npm-run-xxx/index.html#windows-powershell-中可执行文件-可以跨平台",a:"windows-powershell-中可执行文件-可以跨平台"},"144.6":{t:"总结",p:`
运行 npm run xxx的时候，npm 会先在当前目录的 node_modules/.bin 查找要执行的程序，如果找 ...`,l:"interview-questions/npm/npm-run-xxx/index.html#总结",a:"总结"},"145.0":{t:"# npm",p:"",l:"interview-questions/npm/start/index.html",a:"npm"},"145.1":{t:"npm 中的依赖包",p:"",l:"interview-questions/npm/start/index.html#npm-中的依赖包",a:"npm-中的依赖包"},"145.2":{t:"依赖包分类",p:`
dependencies - 业务依赖
devDependencies - 开发依赖
peerDependencies - ...`,l:"interview-questions/npm/start/index.html#依赖包分类",a:"依赖包分类"},"145.3":{t:"项目版本号管理",p:"package.json中的version字段代表的是该项目的版本号。每当项目发布新版本时，需要将version字段进行相应 ...",l:"interview-questions/npm/start/index.html#项目版本号管理",a:"项目版本号管理"},"145.4":{t:"预发版本",p:"",l:"interview-questions/npm/start/index.html#预发版本",a:"预发版本"},"145.5":{t:"当前版本号为 1.2.3",p:`npm version prepatch  // 版本号变为 1.2.4-0，也就是 1.2.4 版本的第一个预发布版本
n ...`,l:"interview-questions/npm/start/index.html#当前版本号为-1-2-3",a:"当前版本号为-1-2-3"},"145.6":{t:"在git环境中，执行npm version修改完版本号以后，还会默认执行git add->git commit->git tag操作",p:`
如果git工作区还有未提交的修改，npm version将会执行失败，可以加上-f/--force后缀来强制执行。
如果不 ...`,l:"interview-questions/npm/start/index.html#在git环境中-执行npm-version修改完版本号以后-还会默认执行git-add-git-commit-git-tag操作",a:"在git环境中-执行npm-version修改完版本号以后-还会默认执行git-add-git-commit-git-tag操作"},"146.0":{t:"# HTML优化",p:"",l:"interview-questions/performance-optimization/html/index.html",a:"html优化"},"146.1":{t:"DNS 预解析",p:`DNS 解析也是需要时间的，可以通过预解析的方式来预先获得域名所对应的 IP。
&lt;link rel=&quot;dns ...`,l:"interview-questions/performance-optimization/html/index.html#dns-预解析",a:"dns-预解析"},"146.2":{t:"图片加载优化",p:"对于能够显示 WebP 格式的浏览器尽量使用 WebP 格式。因为 WebP 格式具有更好的图像数据压缩算法，能带来更小的图 ...",l:"interview-questions/performance-optimization/html/index.html#图片加载优化",a:"图片加载优化"},"146.3":{t:"预加载",p:`
元素的 rel 属性的属性值preload能够让你在你的HTML页面中 元素内部书写一些声明式的资源获取请求，可以指明哪些 ...`,l:"interview-questions/performance-optimization/html/index.html#预加载",a:"预加载"},"146.4":{t:"预渲染",p:`可以通过预渲染将下载的文件预先在后台渲染，可以使用以下代码开启预渲染
&lt;link rel=&quot;prerende ...`,l:"interview-questions/performance-optimization/html/index.html#预渲染",a:"预渲染"},"146.5":{t:"懒执行",p:`
懒执行就是将某些逻辑延迟到使用时再计算。该技术可以用于首屏优化，对于某些耗时逻辑并不需要在首屏就使用的，就可以使用懒执行。 ...`,l:"interview-questions/performance-optimization/html/index.html#懒执行",a:"懒执行"},"146.6":{t:"懒加载",p:`
懒加载就是将不关键的资源延后加载。
懒加载的原理就是只加载自定义区域（通常是可视区域，但也可以是即将进入可视区域）内需要加 ...`,l:"interview-questions/performance-optimization/html/index.html#懒加载",a:"懒加载"},"146.7":{t:"CDN",p:"我们可以将静态资源尽量使用 CDN 加载，由于浏览器对于单个域名有并发请求上限，可以考虑使用多个 CDN 域名。并且对于 C ...",l:"interview-questions/performance-optimization/html/index.html#cdn",a:"cdn"},"147.0":{t:"# 图片懒加载",p:`一、实现原理
&lt;img&gt;标签本身有一个loading属性来决定是否执行懒加载，但是实测中发现该属性在Edge浏览 ...`,l:"interview-questions/performance-optimization/img-lazy/index.html",a:"图片懒加载"},"147.1":{t:"1、浏览器屏幕坐标系",p:`!image-20221103101645081
存在两种坐标系：

相对于窗口window，从窗口的（顶部，左部）开始计算 ...`,l:"interview-questions/performance-optimization/img-lazy/index.html#_1、浏览器屏幕坐标系",a:"_1、浏览器屏幕坐标系"},"147.2":{t:"2、获取节点坐标：getBoundingClinetRect",p:"方法 elem.getBoundingClientRect() 返回最小矩形的窗口坐标，该矩形将 elem 作为内建 DOM ...",l:"interview-questions/performance-optimization/img-lazy/index.html#_2、获取节点坐标-getboundingclinetrect",a:"_2、获取节点坐标-getboundingclinetrect"},"147.3":{t:"3、获取窗口尺寸",p:`窗口有两种定义，一种是当前窗口的实际大小（可能因为被缩小而变化），另外一种是屏幕的大小（固定值）
第一种，获取当前窗口实际大 ...`,l:"interview-questions/performance-optimization/img-lazy/index.html#_3、获取窗口尺寸",a:"_3、获取窗口尺寸"},"147.4":{t:"4、判断节点是否在可视范围",p:`function isInView(elem){
    if(elem.getBoundingClientRect().t ...`,l:"interview-questions/performance-optimization/img-lazy/index.html#_4、判断节点是否在可视范围",a:"_4、判断节点是否在可视范围"},"147.5":{t:"5、Intersection Observer",p:`该接口提供了一种异步观察目标元素与其祖先元素或顶级文档视窗 (viewport) 交叉状态的方法
该接口可以方便的检测元素的 ...`,l:"interview-questions/performance-optimization/img-lazy/index.html#_5、intersection-observer",a:"_5、intersection-observer"},"148.0":{t:"# 何减少卡顿的代码",p:`聊网站性能的文章有很多，通常为了提高js性能，避不开这两点：
不要阻塞主线程 减少长耗时
该怎么做呢？很明显，精简js代码有 ...`,l:"interview-questions/performance-optimization/js/reduce-stuttering-code/index.html",a:"何减少卡顿的代码"},"148.1":{t:"使用代码延迟任务执行",p:"为了拆分长任务，开发者经常使用定时器_setTimeout_。通过把方法传递给_setTimeout_，也就等同于重新创建了 ...",l:"interview-questions/performance-optimization/js/reduce-stuttering-code/index.html#使用代码延迟任务执行",a:"使用代码延迟任务执行"},"148.2":{t:"使用asycn、await来创造让步点",p:`在本文会出现一个新词让步，这个词的定义、用法和意义可以通过代码和介绍进行阐述。

重点提示


当_让步_于主线程后，浏览器 ...`,l:"interview-questions/performance-optimization/js/reduce-stuttering-code/index.html#使用asycn、await来创造让步点",a:"使用asycn、await来创造让步点"},"148.3":{t:"只在必要时让步",p:`假如有一堆的任务，但是只想在用户交互的时候才让步，该怎么办？正好有这种api--isInputPending
isInput ...`,l:"interview-questions/performance-optimization/js/reduce-stuttering-code/index.html#只在必要时让步",a:"只在必要时让步"},"148.4":{t:"专门编排优先级的api",p:"目前在书写本文时该api提供postTask的功能，对于所有的chromium浏览器和firefox均可使用。postTas ...",l:"interview-questions/performance-optimization/js/reduce-stuttering-code/index.html#专门编排优先级的api",a:"专门编排优先级的api"},"148.5":{t:"内置不中断的让步方法",p:"还有一个编排api目前还在提议阶段，还没有内置到任何浏览器中。它的用法和本章和开始讲到的yieldToMain这个方法类似。 ...",l:"interview-questions/performance-optimization/js/reduce-stuttering-code/index.html#内置不中断的让步方法",a:"内置不中断的让步方法"},"149.0":{t:"# 减少引用类型内存访问",p:"",l:"interview-questions/performance-optimization/js/reference-memory-access/index.html",a:"减少引用类型内存访问"},"149.1":{t:"案例",p:"",l:"interview-questions/performance-optimization/js/reference-memory-access/index.html#案例",a:"案例"},"149.2":{t:"请看为何 aaaaa 比 bbbbb 慢",p:`
{
  (function () {
    let sum = [0]
    console.time(&quot;a ...`,l:"interview-questions/performance-optimization/js/reference-memory-access/index.html#请看为何-aaaaa-比-bbbbb-慢",a:"请看为何-aaaaa-比-bbbbb-慢"},"149.3":{t:"运行",p:"",l:"interview-questions/performance-optimization/js/reference-memory-access/index.html#运行",a:"运行"},"149.4":{t:"原因",p:`
消除不必要的内存访问

对于一个函数  内部变量一般是存储在寄存器中  可以把寄存器看成一个 CPU 和内存之间的一个缓存 ...`,l:"interview-questions/performance-optimization/js/reference-memory-access/index.html#原因",a:"原因"},"150.0":{t:"# 前端性能监控Performance",p:"懒加载和预加载的目的都是为了提高用户的体验，二者行为是相反的，一个是延迟加载，另一个是提前加载。懒加载对缓解服务器压力有一定 ...",l:"interview-questions/performance-optimization/lazyload-preload/index.html",a:"前端性能监控performance"},"150.1":{t:"懒加载 lazyload",p:`
懒加载：又叫延迟加载、按需加载，当我们打开一个网页，优先展示的首屏图片就先加载，而其他的图片，等到需要去展示的时候再去请求 ...`,l:"interview-questions/performance-optimization/lazyload-preload/index.html#懒加载-lazyload",a:"懒加载-lazyload"},"150.2":{t:"实现代码",p:`
&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
  &lt; ...`,l:"interview-questions/performance-optimization/lazyload-preload/index.html#实现代码",a:"实现代码"},"150.3":{t:"实现细节",p:"",l:"interview-questions/performance-optimization/lazyload-preload/index.html#实现细节",a:"实现细节"},"150.4":{t:"1 如何加载图片",p:"用img的data-src属性存放真正需要显示的图片的路径，当页面滚动直到图片出现在可视区域时，将data-src中的图片地 ...",l:"interview-questions/performance-optimization/lazyload-preload/index.html#_1-如何加载图片",a:"_1-如何加载图片"},"150.5":{t:"2 如何判断一个元素出现在可视区域",p:"监听滚动事件，用getBoundingClientRect()获取DOM元素在页面的位置，该函数返回rect对象，如下图所示 ...",l:"interview-questions/performance-optimization/lazyload-preload/index.html#_2-如何判断一个元素出现在可视区域",a:"_2-如何判断一个元素出现在可视区域"},"150.6":{t:"实现效果",p:`利用开发者工具我们可以看到如下截图：

最初打开页面：只显示前两张图片，后面三张图片还没有出现在当前页面

由于后面三张还没 ...`,l:"interview-questions/performance-optimization/lazyload-preload/index.html#实现效果",a:"实现效果"},"150.7":{t:"预加载 preload",p:`预加载：提前加载所需要的图片资源，加载完毕后会缓存到本地，当需要时可以立刻显示出来。
目的：看完一张图片，再看下一张时，会有 ...`,l:"interview-questions/performance-optimization/lazyload-preload/index.html#预加载-preload",a:"预加载-preload"},"150.8":{t:"实现方法",p:"",l:"interview-questions/performance-optimization/lazyload-preload/index.html#实现方法",a:"实现方法"},"150.9":{t:"1 通过CSS",p:"",l:"interview-questions/performance-optimization/lazyload-preload/index.html#_1-通过css",a:"_1-通过css"},"150.10":{t:"步骤",p:`
创建用来预加载的标签
给标签使用背景图，背景图的路径是需要预加载的图片资源，并将图片移到看不见的地方，或缩小到看不见。
当 ...`,l:"interview-questions/performance-optimization/lazyload-preload/index.html#步骤",a:"步骤"},"150.11":{t:"2 通过JavaScript",p:"",l:"interview-questions/performance-optimization/lazyload-preload/index.html#_2-通过javascript",a:"_2-通过javascript"},"150.12":{t:"步骤",p:`
将需要预加载的图片资源的 URL 保存在数组里
循环遍历 URL 数组执行以下步骤，直到结束
创建一个 image 对象  ...`,l:"interview-questions/performance-optimization/lazyload-preload/index.html#步骤",a:"步骤"},"150.13":{t:"实现效果",p:"",l:"interview-questions/performance-optimization/lazyload-preload/index.html#实现效果",a:"实现效果"},"150.14":{t:"总结对比",p:"",l:"interview-questions/performance-optimization/lazyload-preload/index.html#总结对比",a:"总结对比"},"150.15":{t:"懒加载 预加载",p:`定义 延迟加载、按需加载 提前加载、不需要也提前加载
目的 更好更快地加载页面首屏内容，网页性能优化 让用户无需等待，获得直 ...`,l:"interview-questions/performance-optimization/lazyload-preload/index.html#懒加载-预加载",a:"懒加载-预加载"},"151.0":{t:"# 前端性能监控Performance",p:"",l:"interview-questions/performance-optimization/performance/index.html",a:"前端性能监控performance"},"151.1":{t:"一、为什么需要性能监控",p:"web 的性能一定程度上影响了用户留存率，Google DoubleClick 研究表明：如果一个移动端页面加载时长超过 3 ...",l:"interview-questions/performance-optimization/performance/index.html#一、为什么需要性能监控",a:"一、为什么需要性能监控"},"151.2":{t:"二、监控什么",p:`首先我们需要知道应该监控些什么呢？有哪些具体的指标？
Google 开发者提出了一种 RAIL 模型来衡量应用性能，即：Re ...`,l:"interview-questions/performance-optimization/performance/index.html#二、监控什么",a:"二、监控什么"},"151.3":{t:"我们可转化为三个方面来看",p:`
响应速度：页面初始访问速度 + 交互响应速度
页面稳定性：页面出错率，如资源加载错误，JS 执行报错
外部服务调用：网络请 ...`,l:"interview-questions/performance-optimization/performance/index.html#我们可转化为三个方面来看",a:"我们可转化为三个方面来看"},"151.4":{t:"三、性能指标",p:`Google开发者针对用户体验，提出的几个性能指标
!图片

FP：首次绘制
First Paint：标记浏览器渲染任何在视 ...`,l:"interview-questions/performance-optimization/performance/index.html#三、性能指标",a:"三、性能指标"},"151.5":{t:"4.1 属性",p:`
navigation：返回一个 PerformanceNavigation 对象。这个对象表示出现在当前浏览上下文的 na ...`,l:"interview-questions/performance-optimization/performance/index.html#_4-1-属性",a:"_4-1-属性"},"151.6":{t:"4.2 window.performance.timing属性",p:`!图片
`,l:"interview-questions/performance-optimization/performance/index.html#_4-2-window-performance-timing属性",a:"_4-2-window-performance-timing属性"},"151.7":{t:"21个属性，如下",p:`属性名 含义
connectStart 返回与服务端建立连接开始时间，如果是持久连接或者是从缓存中获取资源，则这个值等于do ...`,l:"interview-questions/performance-optimization/performance/index.html#_21个属性-如下",a:"_21个属性-如下"},"151.8":{t:"4.3 PerformanceNavigationTiming属性",p:`!图片
与1.2中timing字段一致，不同点如下：
`,l:"interview-questions/performance-optimization/performance/index.html#_4-3-performancenavigationtiming属性",a:"_4-3-performancenavigationtiming属性"},"151.9":{t:"（1）比1.2timing多以下字段",p:`属性名 含义

decodedBodySize 返回编码后字节大小
duration 即 PerformanceNaviga ...`,l:"interview-questions/performance-optimization/performance/index.html#_1-比1-2timing多以下字段",a:"_1-比1-2timing多以下字段"},"151.10":{t:"（2）比1.2timing少以下字段",p:"domLoading、navigationStart PerformanceTiming 中每个属性记录时间戳，所有的属性是 ...",l:"interview-questions/performance-optimization/performance/index.html#_2-比1-2timing少以下字段",a:"_2-比1-2timing少以下字段"},"151.11":{t:"4.4 timing各字段渲染顺序",p:`!图片
`,l:"interview-questions/performance-optimization/performance/index.html#_4-4-timing各字段渲染顺序",a:"_4-4-timing各字段渲染顺序"},"151.12":{t:"五、各指标计算方式",p:`
指标 计算方式 说明
页面加载总耗时 loadEventEnd - startTime 指页面完全加载完所用的时间，这时候 ...`,l:"interview-questions/performance-optimization/performance/index.html#五、各指标计算方式",a:"五、各指标计算方式"},"151.13":{t:"六、首屏时间",p:`我们知道首屏时间是一项重要指标，但是又很难从 performance 中拿到，来看下首屏时间计算主要有哪些方式？

用户自定 ...`,l:"interview-questions/performance-optimization/performance/index.html#六、首屏时间",a:"六、首屏时间"},"152.0":{t:"# 最全的前端性能定位总结",p:"",l:"interview-questions/performance-optimization/performance-summary/index.html",a:"最全的前端性能定位总结"},"152.1":{t:"性能优化的意义",p:"",l:"interview-questions/performance-optimization/performance-summary/index.html#性能优化的意义",a:"性能优化的意义"},"152.2":{t:"1\\. 性能是留住用户很重要的一环",p:`

pinterest 重建了他们的页面以实现性能，使感知等待时间减少了 40％，从而将搜索引擎流量和注册量提高了 15％。 ...`,l:"interview-questions/performance-optimization/performance-summary/index.html#_1-性能是留住用户很重要的一环",a:"_1-性能是留住用户很重要的一环"},"152.3":{t:"2\\. 性能是改善转换率至关重要的一环",p:`
对于 Mobify，主页加载速度每减少 100 毫秒，基于会话的转换增加 1.11％，平均年收入增加近 380,000 美 ...`,l:"interview-questions/performance-optimization/performance-summary/index.html#_2-性能是改善转换率至关重要的一环",a:"_2-性能是改善转换率至关重要的一环"},"152.4":{t:"用户角度的性能标准是什么",p:"",l:"interview-questions/performance-optimization/performance-summary/index.html#用户角度的性能标准是什么",a:"用户角度的性能标准是什么"},"152.5":{t:"著名的 2-5-8 原则",p:`

当用户能够在 2 秒以内得到响应时，会感觉系统的响应很快；


当用户在 2-5 秒之间得到响应时，会感觉系统的响应速度 ...`,l:"interview-questions/performance-optimization/performance-summary/index.html#著名的-2-5-8-原则",a:"著名的-2-5-8-原则"},"152.6":{t:"常见网站性能指标",p:`
FP 白屏（First Paint Time ）： 从页面开始加载到浏览器中检测到渲染（任何渲染）时被触发（例如背景改变， ...`,l:"interview-questions/performance-optimization/performance-summary/index.html#常见网站性能指标",a:"常见网站性能指标"},"152.7":{t:"Google Web Vitals - 使用者体验量化",p:"web-vitals: Google 于 2020 年 5 年 5 日提出了新的使用者体验量化方式，推出 Web Vital ...",l:"interview-questions/performance-optimization/performance-summary/index.html#google-web-vitals-使用者体验量化",a:"google-web-vitals-使用者体验量化"},"152.8":{t:"Performance API",p:"Performance 是一个浏览器全局对象，提供了一组 API 用于编程式地获取程序在某些节点的性能数据。它包含一组高精度 ...",l:"interview-questions/performance-optimization/performance-summary/index.html#performance-api",a:"performance-api"},"152.9":{t:"使用 `performance.timing` 信息简单计算出**网页性能数据**",p:"FP：responseStart - navigationStart 重定向耗时：redirectEnd - redirec ...",l:"interview-questions/performance-optimization/performance-summary/index.html#使用-performance-timing-信息简单计算出-网页性能数据",a:"使用-performance-timing-信息简单计算出-网页性能数据"},"152.10":{t:"使用`performance.getEntries()`获取所有资源请求的时间数据",p:`获取所有资源请求的时间数据,这个函数返回一个按 startTime 排序的对象数组
我们直接面板输出一下。 !11.png
`,l:"interview-questions/performance-optimization/performance-summary/index.html#使用-performance-getentries-获取所有资源请求的时间数据",a:"使用-performance-getentries-获取所有资源请求的时间数据"},"152.11":{t:"使用`performance.getEntriesByName(name)`获取特定名称的时间数据",p:`
比如面试过程非常喜欢问的 FCP 首屏时间如何计算呢

我们可以通过 getEntriesByName(name)提供的  ...`,l:"interview-questions/performance-optimization/performance-summary/index.html#使用-performance-getentriesbyname-name-获取特定名称的时间数据",a:"使用-performance-getentriesbyname-name-获取特定名称的时间数据"},"152.12":{t:"使用`performance.now()`精确计算程序执行时间",p:"performance.now方法返回当前网页自从performance.timing.navigationStart到当前 ...",l:"interview-questions/performance-optimization/performance-summary/index.html#使用-performance-now-精确计算程序执行时间",a:"使用-performance-now-精确计算程序执行时间"},"152.13":{t:"使用`performance.mark`以及`performance.measure`手动测量性能",p:`这块具体的代码示例 建议大家可以直接访问这里去查看
咱们如果想自定义搜集性能数据指标 做前端的性能监控系统 那么这两个 ap ...`,l:"interview-questions/performance-optimization/performance-summary/index.html#使用-performance-mark-以及-performance-measure-手动测量性能",a:"使用-performance-mark-以及-performance-measure-手动测量性能"},"152.14":{t:"Google performance 面板",p:`哈哈 大家别慌 虽然这个也叫 performance 但是这里指的是咱们浏览器的performance 面板工具
`,l:"interview-questions/performance-optimization/performance-summary/index.html#google-performance-面板",a:"google-performance-面板"},"152.15":{t:"整体结构",p:`!WX20220107-150213.png
我们第一眼可能会被这些花花绿绿的色块吓到 咱们别怕 一点点带大家分析
从上到下 ...`,l:"interview-questions/performance-optimization/performance-summary/index.html#整体结构",a:"整体结构"},"152.16":{t:"工具条区域",p:`!24.png
上面红框从左到右 咱们把鼠标放上去可以看到几个英文单词

record 记录浏览器运行中的某一个时间段的表现 ...`,l:"interview-questions/performance-optimization/performance-summary/index.html#工具条区域",a:"工具条区域"},"152.17":{t:"总览区域",p:"!WX20220107-150848.png1. FPS**: 全称 Frames Per Second，表示每秒传输帧数， ...",l:"interview-questions/performance-optimization/performance-summary/index.html#总览区域",a:"总览区域"},"152.18":{t:"火焰图",p:`!WX20220107-151346.png


Network：表示每个服务器资源的加载情况。


Frames：表示每幅 ...`,l:"interview-questions/performance-optimization/performance-summary/index.html#火焰图",a:"火焰图"},"152.19":{t:"总体报告",p:"",l:"interview-questions/performance-optimization/performance-summary/index.html#总体报告",a:"总体报告"},"152.20":{t:"Summary：表示各指标时间占用统计报表",p:`!WX20220107-155126.png
这里的颜色代表的意思和总览区域里面的 cpu颜色一样的意思 大家不清楚的可以往 ...`,l:"interview-questions/performance-optimization/performance-summary/index.html#summary-表示各指标时间占用统计报表",a:"summary-表示各指标时间占用统计报表"},"152.21":{t:"Bottom-Up：表示事件时长排序列表（倒序）",p:`!WX20220107-155339.png
这里有两列时间数据，一是&quot;Self Time&quot;代表任务自身 ...`,l:"interview-questions/performance-optimization/performance-summary/index.html#bottom-up-表示事件时长排序列表-倒序",a:"bottom-up-表示事件时长排序列表-倒序"},"152.22":{t:"Call tree：表示事件调用顺序列表",p:"!WX20220107-155349.png Call Tree 中的内容，在 Bottom-Up 中也能看到，无明显的区别 ...",l:"interview-questions/performance-optimization/performance-summary/index.html#call-tree-表示事件调用顺序列表",a:"call-tree-表示事件调用顺序列表"},"152.23":{t:"Event Log：表示事件发生的顺序列表",p:"!WX20220107-155402.png Event Log 中的内容，是按顺序记录的事件日志，数据比较多。常见的优化级 ...",l:"interview-questions/performance-optimization/performance-summary/index.html#event-log-表示事件发生的顺序列表",a:"event-log-表示事件发生的顺序列表"},"152.24":{t:"lighthouse",p:"先来介绍 lighthouse 工具，目前官方提供了 google devtools、google 插件、npm cli 方 ...",l:"interview-questions/performance-optimization/performance-summary/index.html#lighthouse",a:"lighthouse"},"152.25":{t:"Performance 性能",p:`列出了 FCP、SP、LCP、TTI、TBI、CLS 六个指标。
!lighthouse03.jpg
同时也提供可优化方案  ...`,l:"interview-questions/performance-optimization/performance-summary/index.html#performance-性能",a:"performance-性能"},"152.26":{t:"Accessibility 可访问性",p:"可访问性：指无障碍设计，也称为网站可达性。是指所创建的网站对所有用户都可用/可访问，不管用户的生理/身体能力如何、不管用户是 ...",l:"interview-questions/performance-optimization/performance-summary/index.html#accessibility-可访问性",a:"accessibility-可访问性"},"152.27":{t:"Best Practice 最佳实践",p:`实际应用中，网站的安全问题 !lighthouse06.jpg
`,l:"interview-questions/performance-optimization/performance-summary/index.html#best-practice-最佳实践",a:"best-practice-最佳实践"},"152.28":{t:"SEO 搜索引擎优化",p:`搜索引擎优化，是一种利用搜索引擎的规则提高网站在有关搜索引擎内的自然排名 !lighthouse07.jpg
`,l:"interview-questions/performance-optimization/performance-summary/index.html#seo-搜索引擎优化",a:"seo-搜索引擎优化"},"152.29":{t:"Progressive Web App 轻应用-离线应用",p:"PWA： 运用现代的 Web API 以及传统的渐进式增强策略来创建跨平台 Web 应用程序。这些应用无处不在、功能丰富，使 ...",l:"interview-questions/performance-optimization/performance-summary/index.html#progressive-web-app-轻应用-离线应用",a:"progressive-web-app-轻应用-离线应用"},"152.30":{t:"node cli lighthouse",p:`项目安装 lighthouse
npm i -g lighthouse
lighthouse https://www.tao ...`,l:"interview-questions/performance-optimization/performance-summary/index.html#node-cli-lighthouse",a:"node-cli-lighthouse"},"153.0":{t:"# 虚拟列表",p:"",l:"interview-questions/performance-optimization/virtual-list/react/index.html",a:"虚拟列表"},"153.1":{t:"介绍",p:"虚拟列表，其实就是将一个原本需要全部列表项的渲染的长列表，改为只渲染可视区域内的列表项，但滚动效果还是要和渲染所有列表项的长 ...",l:"interview-questions/performance-optimization/virtual-list/react/index.html#介绍",a:"介绍"},"153.2":{t:"虚拟列表解决的长列表渲染大量节点导致的性能问题",p:`

一次性渲染大量节点，会占用大量 GPU 资源，导致卡顿；


即使渲染好了，大量的节点也持续占用内存。列表项下的节点越多 ...`,l:"interview-questions/performance-optimization/virtual-list/react/index.html#虚拟列表解决的长列表渲染大量节点导致的性能问题",a:"虚拟列表解决的长列表渲染大量节点导致的性能问题"},"153.3":{t:"列表项高度固定",p:"",l:"interview-questions/performance-optimization/virtual-list/react/index.html#列表项高度固定",a:"列表项高度固定"},"153.4":{t:"思路讲解",p:`
 * transform 方案
 */
 */