---
createTime: 2022/10/25
tag: '浏览器'
---
# 浏览器缓存机浏览器的组成 & 内核组成制

## 浏览器组成

### 主要由7部分组成

* User Interface（用户界面）：所能看到的界面部分；
* Browser engine（浏览器引擎）：在用户界面和渲染引擎之间传送指令或在客户端本地缓存中读写数据等，是浏览器中各个部分之间相互通信的核心。
* Networking（网络）：实现HTTP、FTP等传输协议，完成网络调用或资源下载的模块；
* Rendering Engine（或layout engineer渲染引擎）：负责取得网页的内容（HTML、XML、图像等等）、整理讯息（例如加入 CSS 等），以及计算网页的显示方式，然后会输出至显示器或打印机。
* JavaScript Interpreter（JS 引擎/解释器）：解析 Javascript 语言，执行 javascript 语言来实现网页的动态效果，如 V8 引擎、JavaScriptCore。
* Date Persistence（数据持久化存储）：cookie、localstorage个性设置、安全证书、缓存等；
* UI Backend（UI 后端）：用来绘制基本的浏览器窗口内控件，如输入框、按钮、单选按钮等，根据浏览器不同绘制的视觉效果也不同，但功能都是一样的。

## 内核

主要分成两部分：渲染引擎(layout engineer或Rendering Engine)和JS引擎

### 渲染引擎

* 负责取得网页的内容（HTML、XML、图像等等）、整理讯息（例如加入CSS等），以及计算网页的显示方式，然后会输出至显示器或打印机。
* 浏览器的内核的不同对于网页的语法解释会有不同，所以渲染的效果也不相同。所有网页浏览器、电子邮件客户端以及其它需要编辑、显示网络内容的应用程序都需要内核

### JS引擎

* 解析和执行javascript来实现网页的动态效果
* 最开始渲染引擎和JS引擎并没有区分的很明确，后来JS引擎越来越独立，内核就倾向于只指渲染引擎

## 常见的浏览器内核有哪些

* Trident内核：IE,MaxThon,TT,The World,360,搜狗浏览器等。[又称MSHTML]
* Gecko内核：Netscape6及以上版本，FF,MozillaSuite/SeaMonkey等
* Presto内核：Opera7及以上。 [Opera内核原为：Presto，现为：Blink;]
* Webkit内核：Safari,Chrome等。 [ Chrome的Blink（WebKit的分支）]
