---
createTime: 2022/11/29
tag: '场景题,插件'
---
# 设计一个 JS 插件系统

**原文地址**：[css-tricks.com/designing-a…](https://css-tricks.com/designing-a-javascript-plugin-system/ "https://css-tricks.com/designing-a-javascript-plugin-system/")

前言
--

许多开源库都有插件系统，例如：[Vue](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fvue "https://www.npmjs.com/package/vue")、[jQuery](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fjquery "https://www.npmjs.com/package/jquery")、[Gatsby](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fgatsby "https://www.npmjs.com/package/gatsby")。插件是库和框架的一个常见特性，用于允许开发人员以一种安全、可伸缩的方式添加功能。那么怎么构建一个插件系统呢？让我们用JS构建一个自己的插件系统来回答这个问题。

简单的计算器示例
--------

从一个名为`BetaCalc`的示例项目开始。`BetaCalc`的目标是成为一个简单的JS计算器，其他开发者可以为其添加”按钮“。代码如下：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c8c708a017624d65aaaffcb3a82af62b~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

我们将计算器定义为简单的`对象字面量`，计算结果将使用`console.log`打印。现在功能很简单，有一个`setValue`方法，用于模拟计算器上的数字输入，其中的`console.log`模拟计算器上的显示屏，还有两个方法，用于对应计算器中的加号按钮与减号按钮。

为计算器程序添加插件系统
------------

建立插件系统第一步就是要建立一个`插件注册`方法，其他开发人员可以利用其注册插件。这个方法工作很简单：获取外部插件，抓取其`exec`函数，并将它作为一个新的方法（“按钮”）附加到计算器上：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f2e4c1e8f90147f5be3e33d4d4c31909~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

这里有一个插件的例子，它给计算器增加“平方”按钮：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/27773c9075a6425b9c38e01ae46e539c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

在许多插件系统中，插件通常由两部分组成：

1. 需要执行的代码；
2. 元数据（如：名称、描述、版本号、依赖关系等）

在我们的插件中，`exec`函数包含了**需要执行的代码**，函数名称为**元数据**。当插件注册后，`exec`函数作为方法直接附加到我们的betaCalc对象上，使它能够访问betaCalc的this。现在BetaCalc有了一个新的“平方”按钮，可以直接调用：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b8aab991ae91477ab167ac4f1761948d~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

这个系统有很多不错的地方，它是一个简单的`对象字面量`，可以传递到函数中。意味着插件可以通过npm下载，并作为ES6模块导入，可以实现简单的分发。

但现在系统还存在一些缺陷：

通过允许插件访问`BetaCalc`的`this`，插件可以读/写所有BetaCalc中的代码，虽然这对于获取和设置`currentValue`很有用，但是也很危险。如果一个插件要重新定义一个内部函数（如：`setValue`），它可能会为`BetaCalc`和其它插件产生意想不到的结果。这违反了[开闭原则](https://link.juejin.cn/?target=https%3A%2F%2Fzh.wikipedia.org%2Fwiki%2F%25E5%25BC%2580%25E9%2597%25AD%25E5%258E%259F%25E5%2588%2599 "https://zh.wikipedia.org/wiki/%E5%BC%80%E9%97%AD%E5%8E%9F%E5%88%99")，该原则规定“软件中的对象（类，模块，函数等等）应该对于扩展是开放的，但是对于修改是封闭的”。

此外，“平方”函数的工作原理会产生“副作用”。这在JS中并不罕见，但感觉并不好--尤其是当其它插件可能处于同样的内部状态时。一个更加实用的方法将大大有助于我们的系统更加安全和可预测。

一个更好的插件系统架构
-----------

再来看一个更好的插件架构，下面例子改变了计算器和它的插件API：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2108e8b5076f4c4a9e2202ecfc290340~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

这里有一些显著的变化。

首先，我们将插件系统与“核心”计算器方法（如“加号”与“减号”）分离开，将它们放入自己的插件对象中，使系统更加安全。现在插件将不能直接读写`BetaCalc`的属性--它们只能看到`BetaCalc.plugins`的属性。

其次，我们实现了一个`press`方法，它根据名称查找功能（“按钮”）函数，然后调用它。现在，当我们调用一个插件的`exec`函数时，我们将当前计算器的值`currentValue`传递给它，并期望它返回新的计算器值。

本质上，这种新的`press`方法转换成纯功能的计算器“按钮”：获取当前计算器值，执行操作，返回结果。这有很多好处：

* 简化了API
* 使测试更加容易（对于`BetaCalc`和插件本身）
* 减少了我们系统的依赖性，使它更[松耦合](https://link.juejin.cn/?target=https%3A%2F%2Fzh.wikipedia.org%2Fwiki%2F%25E6%259D%25BE%25E8%2580%25A6%25E5%2590%2588 "https://zh.wikipedia.org/wiki/%E6%9D%BE%E8%80%A6%E5%90%88")

这个新的架构比第一个示例有更多的局限性，但显然第二种方式更好，能限制插件只做我们想让它做的改变。

现在我们的计算器插件只能对`currentValue`进行操作。如果一个插件作者想要添加一些高级的功能，比如"内存"按钮或者一种追踪历史记录的方法，他们可能做不到。这里需要权衡：给插件作者太多权利可能会影响项目的稳定性，但太少的权利可能使他们很难解决他们的问题。

还能做什么
-----

还可以做很多事情来改进我们的系统。例：

1. 如果插件作者忘记定义名称或返回值，我们可以添加错误处理来通知他们；
2. 扩展插件的范围。目前`BetaCalc`插件仅可以添加一个"按钮"，我们可以为某些生命周期事件注册回调；
3. 扩展插件注册机制，目前`BetaCalc`仅支持一次注册一个"按钮"，我们可以使其支持批量注册。

设计你的插件系统
--------

如果你的项目比较大，那么可以参考一些开源的插件架构。例如[jQuery](https://link.juejin.cn/?target=https%3A%2F%2Flearn.jquery.com%2Fplugins%2Fbasic-plugin-creation%2F "https://learn.jquery.com/plugins/basic-plugin-creation/")、[Gatsby](https://link.juejin.cn/?target=https%3A%2F%2Fwww.gatsbyjs.com%2Fdocs%2Fcreating-plugins%2F "https://www.gatsbyjs.com/docs/creating-plugins/")、[D3](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fd3%2Fd3%2Fwiki%2FPlugins "https://github.com/d3/d3/wiki/Plugins")、[CKEditor](https://link.juejin.cn/?target=https%3A%2F%2Fckeditor.com%2Fdocs%2Fckeditor4%2Flatest%2Fguide%2Fplugin_sdk_intro.html "https://ckeditor.com/docs/ckeditor4/latest/guide/plugin_sdk_intro.html")或者其它。 当然你也可以熟悉[JS的设计模式](https://link.juejin.cn/?target=https%3A%2F%2Fseesparkbox.com%2Ffoundry%2Fjavascript_design_patterns "https://seesparkbox.com/foundry/javascript_design_patterns")，或者阅读[Addy Osmani的《学习JS设计模式》](https://link.juejin.cn/?target=https%3A%2F%2Faddyosmani.com%2Fresources%2Fessentialjsdesignpatterns%2Fbook%2F "https://addyosmani.com/resources/essentialjsdesignpatterns/book/")，这为你提供了许多优秀的插件架构选项。了解这些选项可以帮助你更好地平衡使用你项目所有人的需求。

除了设计模式外，你还可以利用优秀的软件开发原则来做出这类决策。如前面提到的：[开闭原则](https://link.juejin.cn/?target=https%3A%2F%2Fzh.wikipedia.org%2Fwiki%2F%25E5%25BC%2580%25E9%2597%25AD%25E5%258E%259F%25E5%2588%2599 "https://zh.wikipedia.org/wiki/%E5%BC%80%E9%97%AD%E5%8E%9F%E5%88%99")、[松耦合](https://link.juejin.cn/?target=https%3A%2F%2Fzh.wikipedia.org%2Fwiki%2F%25E6%259D%25BE%25E8%2580%25A6%25E5%2590%2588 "https://zh.wikipedia.org/wiki/%E6%9D%BE%E8%80%A6%E5%90%88")，还有一些其它相关的原则，如：[得墨忒耳定律](https://link.juejin.cn/?target=https%3A%2F%2Fzh.wikipedia.org%2Fwiki%2F%25E5%25BE%2597%25E5%25A2%25A8%25E5%25BF%2592%25E8%2580%25B3%25E5%25AE%259A%25E5%25BE%258B "https://zh.wikipedia.org/wiki/%E5%BE%97%E5%A2%A8%E5%BF%92%E8%80%B3%E5%AE%9A%E5%BE%8B")、[依赖注入](https://link.juejin.cn/?target=https%3A%2F%2Fzh.wikipedia.org%2Fwiki%2F%25E4%25BE%259D%25E8%25B5%2596%25E6%25B3%25A8%25E5%2585%25A5 "https://zh.wikipedia.org/wiki/%E4%BE%9D%E8%B5%96%E6%B3%A8%E5%85%A5")等。

看起来很多，但作为一个插件系统设计者，你必须得研究，因为没有什么比让每个人都重写他们的插件更痛苦。当你改变你开源项目的插件架构时，将使你的开源项目失去信任，会大大降低开发者为你的项目作出贡献的热度。
