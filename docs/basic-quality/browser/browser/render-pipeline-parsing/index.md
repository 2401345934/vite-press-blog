---
createTime: 2022/11/13
tag: '浏览器'
---
# 浏览器渲染流水线解析

1\. 渲染流水线
---------

![Browser Render Pipeline](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/3/27/1626538c7ec13e07~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.image)

上图显示了 Chrome 一个高度简化后的渲染流水线示意图：

1. 最底层的是 Chrome 最核心的部分 Blink，负责JS的解析执行，HTML/CSS解析，DOM操作，排版，图层树的构建和更新等任务；
2. Layer Compositor（图层合成器）接收 Blink 的输入，负责图层树的管理，图层的滚动，旋转等矩阵变幻，图层的分块，光栅化，纹理上传等任务；
3. Display Compositor 接收 Layer Compositor 的输入，负责输出最终的 OpenGL 绘制指令，将网页内容通过 GL 贴图操作绘制到目标窗口上，如果忽略掉操作系统本身的窗口合成器，也可以简单认为是绘制在显示屏上；

> 当我们说 Compositor，在没有加修饰语的情况下，一般都是指 Layer Compositor。另外术语 Child Compositor（子合成器）也是指 Layer Compositor，相对于作为 Parent 的 Display Compositor 而言。

### 1.1 进程与线程

一个 Chrome 浏览器一般会有一个 Browser 进程，一个 GPU 进程，和多个 Renderer 进程，通常每个 Renderer 进程对应一个页面。在特殊架构（Android WebView）或者特定配置下，Browser 进程可以兼作 GPU 进程或者 Renderer 进程（意味着没有独立的 GPU 或者 Renderer 进程），但是 Browser 跟 Renderer，Browser 跟 GPU，Renderer 跟 GPU 之间的系统架构和通讯方式基本保持不变，线程架构也是同样。

1. Blink 主要运行在 Renderer 进程的 Renderer 线程，我们通常会称之为内核主线程；
2. Layer Compositor 主要运行在 Renderer 进程的 Compositor 线程；
3. Display Compositor 主要运行在 Browser 进程的 UI 线程；

> Display Compositor 未来应该会移到 GPU 进程的主 GPU 线程，当然对父子合成器进行调度的部分仍然是在 Browser 进程的 UI 线程。

### 1.2 帧

所有的渲染流水线都会有帧的概念，帧这个概念抽象描述了渲染流水线下级模块往上级模块输出的绘制内容相关数据的封装。我们可以看到 Blink 输出 Main Frame 给 Layer Compositor，Layer Compositor 输出 Compositor Frame 给 Display Compositor，Display Compositor 输出 GL Frame 给 Window。我们觉得一个动画是否流畅，最终取决于 GL Frame 的帧率（也就是目标窗口的绘制更新频率），而觉得一个触屏操作是否响应即时，取决于从 Blink 处理事件到 Window 更新的整个过程的耗时（理论上应该还要加上事件从 Browser 发送给 Compositor，再发送给 Blink 的这个过程的耗时）。

#### 1.1.1 Main Frame

Main Frame 包含了对网页内容的描述，主要以绘图指令的形式，或者可以简单理解为某个时间点对整个网页的一个矢量图快照（可以局部更新）。当前版本的 Chrome，图层化的决策仍然由 Blink 来负责，Blink 需要决定如何根据网页的 DOM 树来生成一颗图层树，并以 DisplayList 的形式记录每个图层的内容（未来图层化决策应该会转移到 Layer Compositor，Blink 只输出 DisplayList 树和 DisplayList 节点的关键属性，同时 DisplayList 不再以图层作为单位，而是以每个排版对象作为单位）。

图层化决策一般由以下几个因素决定：

1. 特殊元素如 Plugin，Video，Canvas（WebGL）；
2. 维护正确的层级关系来保证绘制顺序是正确的，[比如 Overlap 的计算](https://link.juejin.cn/?target=http%3A%2F%2Fblog.csdn.net%2Frogeryi%2Farticle%2Fdetails%2F52956161 "http://blog.csdn.net/rogeryi/article/details/52956161")；
3. 减少图层树的结构变更，减少图层内容的变更（目前 Blink 网页内容的变更是以图层为原子单位的，如果以一个元素为根节点生成图层，该元素的某些 CSS 属性如 Transform 的变更不会引起所属图层内容的变更）；

> 第三点是可以被页端所直接控制来优化图层结构及 Main Frame 性能，像传统的 translate3d hack 和新的 CSS 属性 will-change。

#### 1.2.2 Compositor Frame

Layer Compositor 接收 Blink 生成的 Main Frame，并转换成合成器内部的图层树结构（因为图层化决策仍然由 Blink 负责，所以这里的转换基本上可以认为是生成一棵同样的树，再对逐个图层的进行拷贝）。

Layer Compositor 需要为每个图层进行分块，为每个分块分配 Resource（Texture 的封装），然后安排光栅化任务。

当 Layer Compositor 接收到来自 Browser 的绘制请求时，它会为当前可见区域的每个图层的每个分块生成一个 Draw Quad 的绘制指令（矩形绘制，指令实际上指定了坐标，大小，变换矩阵等属性），所有的 Draw Quad 指令和对应的 Resource 的集合就构成了 Compositor Frame。Compositor Frame 被发送往 Browser，并最终到达 Display Compositor（未来也可以直接发给 Display Compositor）。

#### 1.2.3 GL Frame

Display Compositor 将 Compositor Frame 的每个 Draw Quad 绘制指令转换一个 GL 多边形绘图指令，使用对应 Resource 封装的 Texture 对目标窗口进行贴图，这些 GL 绘图指令的集合就构成了一个 GL Frame，最终由 GPU 执行这些 GL 指令完成网页在窗口上占据的可见区域的绘制。

### 1.3 调度

Chrome 渲染流水线的调度是基于请求和状态机响应，调度的最上级中枢运行在 Browser UI 线程，它按显示器的 VSync（垂直同步）周期向 Layer Compositor 发出输出下一帧的请求，而 Layer Compositor 根据自身状态机的状态决定是否需要 Blink 输出下一帧。

Display Compositor 则比较简单，它持有一个 Compositor Frame 的队列不断的进行取出和绘制，输出的频率唯二地取决于 Compositor Frame 的输入频率和自身绘制 GL Frame 的耗时。基本上可以认为 Layer Compositor 和 Display Compositor 是生产者和消费者的关系。

2\. 网页动画
--------

动画可以看做是一个连续的帧序列的组合。我们把网页的动画分成两大类 —— 一类是合成器动画，一类是非合成器动画（UC 内部也将其称为内核动画，虽然这不是 Chrome 官方的术语）。

1. 合成器动画顾名思义，动画的每一帧都是由 Layer Compositor 生成并输出的，合成器自身驱动着整个动画的运行，在动画的过程中，不需要新的 Main Frame 输入；
2. 内核动画，每一帧都是由 Blink 生成，都需要产生一个新的 Main Frame；

### 2.1 合成器动画

合成器动画又可以分为两类：

1. 合成器本身触发并运行的，比如最常见的网页惯性滚动，包括整个网页或者某个页内可滚动元素的滚动；
2. Blink 触发然后交由合成器运行，比如说传统的 CSS Translation 或者新的 Animation API，如果它们触发的动画经由 Blink 判断可以交由合成器运行；

> Blink 触发的动画，如果是 Transform 和 Opacity 属性的动画基本上都可以由合成器运行，因为它们没有改变图层的内容。不过即使可以交由合成器运行，它们也需要产生一个新的 Main Frame 提交给合成器来触发这个动画，如果这个 Main Frame 包含了大量的图层变更，也会导致触发的瞬间卡顿，页端事先对图层结构进行优化可以避免这个问题。

### 2.2 非合成器动画

非合成器动画也可以分为两类：

1. 使用 CSS Translation 或者 Animation API 创建的动画，但是无法由合成器运行；
2. 使用 Timer 或者 RAF 由 JS 驱动的动画，比较典型的就是 Canvas/WebGL 游戏，这种动画实际上是由页端自己定义的，浏览器本身并没有对应的动画的概念，也就是说浏览器本身是不知道这个动画什么时候开始，是否正在运行，什么时候结束，这些完全是页端自己的内部逻辑；

合成器动画和非合成器动画在渲染流水线上有较大的差异，后者更复杂，流水线更长。上面四种动画的分类，按渲染流水线的复杂程度和理论性能排列（复杂程度由低到高，理论性能由高到低）：

1. 合成器本身触发并运行的动画；
2. Blink 触发，合成器运行的动画；
3. Blink 触发，无法由合成器运行的动画；
4. 由 Timer/RAF 驱动的 JS 动画；

长久以来，浏览器渲染流水线的设计都主要是为了合成器动画的性能而优化，甚至在某种程度上导致内核动画性能的下降，比如说合成器的异步光栅化机制。不过这两年，随着对 WebApp 渲染性能包括 WebGL 性能的重视，并且随着主流移动设备的硬件性能持续提升，合成器动画的性能也已经基本不成问题，Chrome 的渲染流水线已经更多地针对内核动画的性能进行优化，甚至会导致在某些特定状况下合成器动画性能的下降，比方说倾向于为了[维持图层树的稳定性，减少变更，而生成更多的图层](https://link.juejin.cn/?target=http%3A%2F%2Fblog.csdn.net%2Frogeryi%2Farticle%2Fdetails%2F52956161 "http://blog.csdn.net/rogeryi/article/details/52956161")。不过总的说来，目前 Chrome 的渲染流水线，在主流的移动设备上，大部分场景下，两者性能都能获得一个较好的平衡。

3\. 动画性能分析基础
------------

这里的性能分析主要是针对移动设备，以桌面处理器的性能，大部分场景下都不存在性能问题。目前移动设备的屏幕刷新率基本上都是 60hz，而浏览器跟其它应用一样，需要跟屏幕刷新保持垂直同步，也就是动画帧率的上限是 60 帧，这也是我们能够达到的最理想的结果。不过考虑浏览器本身的复杂程度，可能有很多后台任务在运行，而且操作系统本身也可能同时运行其它后台任务，并且移动平台要考虑能耗和散热，CPU/GPU 的调度策略会频繁地发生变化，要完全锁定 60 帧是非常困难的。

> 如果上限超过 60 帧，实际平均帧率超过 60 反而不难，但是如果上限是 60 帧，垂直同步下要锁定 60 帧是非常困难的，要求每一帧的各个环节耗时都要保持非常稳定。

一般而言：

1. 帧率在 55 ～ 60 之间已经可以认为是非常优秀的水平，这时用户几乎感觉不到卡顿；
2. 帧率在 50 ～ 55 之间可以认为是良好的水平，用户感觉到轻微卡顿，但整体来说还是比较流畅；

要达到 50 帧以上的水平，我们就需要对动画在渲染流水线的每个重要环节进行性能计算，需要知道这些环节最长允许的耗时上限和网页影响这些环节耗时的主要原因，虽然实际上很难完全锁定 60 帧，但是一般来说性能分析/优化还是会以 60 帧为目标来倒推各个环节的最大耗时。

> 如果是场景比较复杂的 Canvas/WebGL 游戏，以 30 帧为目标帧率是一个合理的诉求。

### 3.1 光栅化机制

在对动画性能进行分析之前，需要先说明一下目前的 Chrome 的光栅化机制。合成器会监控是否需要安排新的光栅化任务，当需要光栅化调度时：

1. 合成器找到所有在当前可见区域的图层；
2. 合成器找到这些图层在当前可见区域的分块；
3. 合成器检查这些分块是否需要光栅化，如果需要，生成一个对应的光栅化任务并分配所需要的 Resource 放入任务队列里面；
4. Renderer 进程会预先创建一个或者多个 Worker 线程（移动平台一般是两个），这些线程会从任务队列里面顺序取出每一个光栅化任务并运行；
5. 光栅化任务运行后，会通知合成器，合成器根据需要检查哪些任务已经完成，已经完成的任务， Resource 会转交给对应的分块；

> 实际的光栅化区域会比当前可见区域要更大一些，一般是增加一个分块大小单位，对不可见区域的预光栅化有助于提升合成器动画的性能和减少出现空白的几率。

从上可知，合成器的光栅化调度完全是异步的，合成器在 Compositor 线程需要执行的就是安排光栅化任务和检查哪些任务已经完成，Compositor 线程本身不会被真正运行光栅化任务的 Worker 线程所阻塞。

4 合成器动画性能分析和优化指南
----------------

### 4.1 动画流水线

![Compositor Animation](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/3/27/162653a1865ab859~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.image)

> 上图显示了合成器动画的渲染流水线示意图，根据 Android WebView 平台的实现进行绘制，其它平台可能略微不同，但对后面的性能分析，在大部分情况下影响不大

整个流水线的大概过程是：

1. 位于 Browser 进程 UI 线程的窗口管理器接收到来自操作系统的屏幕刷新垂直同步信号（VSync），开始准备输出新的一帧，它首先给位于 Renderer 进程 Compositor 线程的 Layer Compositor 发送一个 Begin Frame 消息；
2. Layer Compositor 接收到 Begin Frame 消息后，更新合成器内部的状态机，开始准备输出 Compositor Frame，在这个过程中的一个重要动作就是 Animate，合成器会检查当前是否有正在运行的动画，然后运行这些动画，并根据动画运行的结果改变关联图层的对应属性（比如惯性滚动动画改变图层的 Scroll Offset，Transform 动画改变图层的 Transform），Animate 的结果会发送回给 UI 线程告诉其是否有动画正在运行，需要更新窗口；
3. 如果 UI 线程确定合成器需要更新窗口，则会发送一个 Draw 消息请求合成器输出下一帧 Compositor Frame；
4. 合成器按下面的过程产生新的 Compositor Frame 并发送给 Display Compositor； 4.1 合成器找出在当前可见区域内显示的图层； 4.2 合成器找出这些图层在可见区域内的分块； 4.3 如果该分块已经有分配 Resource（说明此分块已经完成光栅化），则产生一个 Draw Quad 的命令置入 Compositor Frame 中，如果没有则跳过；
5. Display Compositor 接受到新的 Compositor Frame 后，对 Compositor Frame 进行 Render，将每一个 Draw Quad 命令转换成一个 GL Draw Call，然后 GPU 执行所有的 GL 指令完成最后的窗口绘制；

上述流程的一些关键点是：

1. Draw 的过程中，合成器不会等待可见的分块光栅化完成，这让合成器充分利用了异步光栅化的机制来提升性能，但是也会造成动画过程中可能会出现空白的分块，比如快速滚动页面有时会看到空白区域；
2. 在合成器动画过程中，Layer Compositor 和 Display Compositor 是异步并发的，在 Display Compositor 输出 GL Frame N 的时候，Layer Compositor 已经可以开始输出下一帧 Compositor Frame N + 1；

### 4.2 动画耗时分析

1. Begin Frame 的耗时一般很短，大概 1 ～ 2 毫秒左右；
2. Draw 的耗时也不长，一般不超过 5 毫秒，耗时主要取决于网页的图层复杂度，总的来说合成器动画过程中 Compositor 线程的开销一般都不会构成性能瓶颈；
3. Render 的耗时也不长，一般也是不超过 5 毫秒，耗时主要取决于当前可见区域内的可见分块的数量；
4. GPU 部分的耗时比较长，耗时主要取决于当前可见区域内的可见分块的总面积，也就是绘制的总面积，一旦 Render + GPU 部分的耗时大于 16.7 毫秒，动画就会出现掉帧；

总的来说影响合成器动画性能的最关键因素就是过度绘制系数（Overdraw，可以理解为绘制的面积和可见区域面积的比例），如果网页本身存在大量图层堆叠情况，导致过度绘制系数过高，就会严重影响合成器动画的性能。经验显示，过度绘制系数比较理想的值是在 2 以内，一般建议不超过 3，这样可以保证在中低端的移动设备上也有不错的性能表现。

另外，合成器动画过程中，Compositor 和 GPU 线程是前台线程，它们虽然理论上不会被 Worker 和 Renderer 线程阻塞，但是在真实的运行场景中，移动设备的 CPU/GPU 和内存带宽等硬件资源是有限的，如果 Worker 和 Renderer 线程处于高负荷状态下，也会导致前台的 Compositor 和 GPU 线程阻塞，最终导致合成器动画掉帧。

这种现象常见于：

1. 网页在合成器动画比如惯性滚动过程中，有大量的 JS 加载图片或者其它内容，并频繁地对 DOM 树进行操作；
2. 网页的图层树非常复杂，并且其结构在合成器动画过程中频繁发生变化，导致大量的光栅化任务在 Worker 线程运行；

### 4.3 动画性能优化 Checklist

根据上述的耗时分析，我们可以给出一个页端优化合成器动画性能的简单 Checklist：

1. 检查网页的图层结构是否合理，包括深度和数量，一般来说深度在 10 以内，数量在 100 以内是比较合理的值；
2. 检查网页的合成器动画，包括网页的惯性滚动，各种图层的淡入/淡出等动画，在动画过程中，是否同时存在大量的网络加载和 DOM 操作，网页图层结构是否保持稳定；
3. 当网页处于任一滚动位置上时，它的当前过度绘制系数是否合理；

> 如何判断网页的图层结构是否稳定，一般而言，如果是位于叶子节点的图层增加或者移除，对整个图层结构影响并不大，但是如果是中间节点的图层增加或者移除，对图层结构的影响就比较大了，并且越是接近根节点，影响就越大。
>
> 现在的页端都会大量使用异步加载来优化加载性能和流量，但是容易出现导致动画掉帧的现象。要平衡好这一点意味着需要实现一个加载和关联 DOM 操作的调度器，如果检查到动画正在运行，则停止加载或者通过节流阀机制降低加载的并发数量和频率，同时可以通过事先生成相应的 DOM 节点和图层作为占位符来避免加载后的图层结构发生剧烈变化。

5 非合成器动画性能分析和优化指南
-----------------

前面已经我们已经把非合成器动画区分为 Blink 触发，无法由合成器运行的动画和由 Timer/RAF 驱动的 JS 动画两类，因为前者可以认为是后者的一个简化版本，所以这一章主要讨论 Timer/RAF 驱动的 JS 动画。

### 5.1 动画流水线

![Blink Animation](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/3/27/162653ad7a1f039c~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.image)

从上图可以看出非合成器动画的流水线比合成器动画更长更复杂，并且非合成器动画的后半段跟合成器动画是一致的。

1. JavaScipt 部分是页端实现的逻辑，可能包含了计算的部分，和调用浏览器提供的 API 的部分（修改 DOM 树，CSS 属性等），最终改变了网页的内容；
2. 网页内容被改变会导致 Blink 生成新的 MainFrame，MainFrame 包括了重排版，更新图层树，和重新记录发生变更的图层的内容，生成新的 DisplayList，等等；
3. Blink 生成新的 MainFrame 后需要向合成器发起 Commit 的请求，合成器在 Commit 过程中根据 MainFrame 生成自身的图层树，Blink 在 Commit 的过程中保持阻塞状态，Commit 完成后再继续运行；
4. 合成器实际上有两棵图层树，新提交的 MainFrame 生成的是 Pending 树，用于绘制 Draw 的是 Active 树，只有当 Pending 树当前可见区域部分的分块全部完成 Rasterize 后，才会进入 Active 步骤，在 Active 的过程中，Pending 树相对于 Active 树的变更部分才会被同步到 Active 树；
5. Active 后，合成器会向 UI 线程的窗口管理器发起重绘请求，窗口管理器会在下一个 VSync 的时候开始绘制新的一帧，后面的流程就跟合成器动画是一样的了；

上述流程的一些关键点是：

1. 在合成器动画中，分块没有完成光栅化，出现空白是被允许的，这样浏览器可以更好地保证合成器动画的帧率，但是在非合成器动画中出现空白是不被允许的，因为新的 MainFrame 常常会带来大面积的变更，如果允许空白的话可能会出现非常不好的视觉效果。这样就导致合成器需要使用两棵图层树来构建一个类似双缓冲的机制，只有当 Pending 树在后台完成可见区域的光栅化时才被允许同步到 Active 树；
2. 在非合成器动画过程中，Main Frame N，Main Frame N Active；Compositor Frame N，GL Frame N 这四个 Block 基本上可以认为是可以并发运行的（唯一会阻塞的环节是 Commit，不过 Commit 耗时一般不长），理论上我们要实现 60 帧的非合成器动画，只需要保证其中每个 Block 的耗时总和小于 16.7 毫秒即可。当然实际的状况下，在移动设备上很难实现这么多线程完全并发运行，加上过多线程带来的互相通讯的开销，使得每个 Block 的最大允许耗时实际上是小于 16.7 毫秒的；

### 5.2 动画耗时分析和优化指南

1. JavaScipt 的耗时是由页端自己的逻辑决定的，一般超过 10 毫秒就基本上很难实现 60 帧的非合成器动画了；
2. MainFrame 的耗时主要取决于网页 DOM 树，图层树的复杂程度和变化程度，在变更很小，比如只有几个元素的内容发生变化，图层树不变的情况下，一般耗时都是在 3 ～ 5 毫秒左右，如果变更很大，几十甚至几百都是有可能的；
3. Commit 的耗时主要取决于图层树的复杂程度，一般耗时都很短，大概 2 ~ 3 毫秒上下；
4. Rasterize 的耗时范围变化极大，取决于网页内容的复杂程度和新 MainFrame 在当前可见区域内网页内容发生变化的总面积，另外图片解码也发生在这个阶段，而图片解码也是光栅化耗时最多的一个环节，光栅化的耗时从几毫秒到几百毫秒都有可能（图片在第一次被光栅化时被解码，一直在可见区域内的图片不会被反复重解码）；
5. Active 跟 Commit 的耗时类似，主要取决于图层树的复杂程度，一般耗时很短，大概 2 ~ 3 毫秒上下；

总的来说对非合成器动画性能影响最大的通常是 JavaScript 和 Rasterize，要实现高性能的非合成器动画，页端需要很小心地控制 JavaScript 部分的耗时，并避免在每一帧中引入大面积的网页内容变化和大幅度的图层结构变化。另外非合成器动画的后半段就是合成器动画，所以对合成器动画的性能优化要求也同样适应于非合成器动画。

另外对于 WebGL 来说，当在 JavaScript 里面调用 WebGL API 时，这些命令只是被 Chrome 缓存起来，并不会在 Renderer 线程调用真正的 GL API，所以 WebGL API 在 JavaScript 部分的耗时只是一个 JS Binding 调用的 Overhead，最终绘制 WebGL 内容的 GPU 耗时实际上是被包含在最后的 GPU 的步骤里面。但是在移动平台上一个 JS Binding 调用的 Overhead 是相当高的，大概在 0.01 毫秒这个范围，所以每一帧超过 1000 个 WebGL API 调用的 WebGL 游戏，性能阻塞的瓶颈有很大概率会出现在 JavaScript 也就是 CPU 上，而不是 GPU。
