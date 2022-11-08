---
createTime: 2022/11/08
tag: '性能优化'
---
# 图片懒加载

一、实现原理
------

`<img>`标签本身有一个`loading`属性来决定是否执行懒加载，但是实测中发现该属性在Edge浏览器中并不起作用，所以需要通过脚本的方式去实现。

简单来说，还没有出现在用户可见范围内的图像资源不加载

具体来说，通过判断`<img>`标签所处的坐标是否出现在了网页视口，将`<img>`标签的`src`值替换为存放在`data-src`属性里的真正图像链接

**判断`<img>`标签是否出现在可视范围有两种实现方式：**

1. 监听`window.onscroll`事件，在回调函数中去对比每个`<img>`标签的坐标和窗口尺寸
2. 使用[Intersection Observer](https://link.juejin.cn/?target=)这个接口，判断`<img>`标签是否出现在可视范围

二、前置知识
------

### 1、浏览器屏幕坐标系

![image-20221103101645081](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/290f87672eaa42a198ec139a5843f3ca~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

存在**两种坐标系**：

* **相对于窗口window**，从窗口的（顶部，左部）开始计算，坐标变量为\*\*`clientX`和`clinetY`\*\*
* **相对于文档document**，从文档根的（顶部，左部）开始，坐标变量为\*\*`pageX`和`pageY`\*\*

页面滚动到起点时，`(pageX,pageY)`和`(clientX,clientY)`相等

页面发生滚动（即滚动条移动）之后，`(pageX,pageY) = (clientX + scrollLeft, clinetY + scrollTop)`， 其中`scrollTop/scrollLeft`代表页面节点与文档根（顶部，左部）的**滚动距离**，可通过`window.pageYOffset`或`document.body.scrollTop`或`document.documentElement.scrollTop`获取

### 2、获取节点坐标：getBoundingClinetRect

方法 `elem.getBoundingClientRect()` 返回最小矩形的窗口坐标，该矩形将 `elem` 作为内建 [DOMRect](https://link.juejin.cn/?target=https%3A%2F%2Fwww.w3.org%2FTR%2Fgeometry-1%2F%23domrect "https://www.w3.org/TR/geometry-1/#domrect") 类的对象。

主要的 `DOMRect` 属性：

* `x/y` —— 矩形原点相对于窗口的 X/Y 坐标
* `width/height` —— 矩形的 width/height（可以为负，负值表示右下角作为起点，正常是左上角作为起点）

此外，还有派生（derived）属性：

* `top/bottom` —— 顶部/底部矩形边缘的 Y 坐标
* `left/right` —— 左/右矩形边缘的 X 坐标

**width/height为正数时的示意图如下：**

![image-20221103104333989](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2a251cd511a64e689827a8f1c3bd251d~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

**width/height为正数时的示意图如下：**

![image-20221103104751579](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c29183be90f34fe58a02d6b47ce185b1~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

**总结：获取节点的坐标**

0. 相对于窗口的坐标 —— `elem.getBoundingClientRect()`。
1. 相对于文档的坐标 —— `elem.getBoundingClientRect()` 加上当前页面滚动。

### 3、获取窗口尺寸

窗口有两种定义，一种是当前窗口的实际大小（可能因为被缩小而变化），另外一种是屏幕的大小（固定值）

**第一种，获取当前窗口实际大小，使用window对象**

|  | 现代浏览器 | 老版浏览器 |
| --- | --- | --- |
| 窗口内高度（除去了菜单栏、工具栏等等） | innerHeight | document.documentElement.clientHeight 或 document.body.clientHeight |
| 窗口内宽度 | innerWidth | document.documentElement.clientWidth 或document.body.clientWidth |

**第二种，获取屏幕固定宽高**

| screen.width | 屏幕宽度 |
| --- | --- |
| screen.height | 屏幕高度 |

### 4、判断节点是否在可视范围

```js
function isInView(elem){
    if(elem.getBoundingClientRect().top <= window.innerHeight){
        return true
    }else{
        return false
    }
}

```

### 5、Intersection Observer

[该接口](https://link.juejin.cn/?target=)提供了一种异步观察目标元素与其祖先元素或顶级文档视窗 ([viewport](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FGlossary%2FViewport "https://developer.mozilla.org/zh-CN/docs/Glossary/Viewport")) 交叉状态的方法

该接口可以方便的检测元素的可视状态，应用场景广泛：

* 当页面滚动时，懒加载图片或其他内容。
* 实现“可无限滚动”网站，也就是当用户滚动网页时直接加载更多内容，无需翻页。
* 对某些元素进行埋点曝光
* 滚动到相应区域来执行相应动画或其他任务。

**构造器**

`IntersectionObserver()`，接受一个回调函数

```js
const observer = new IntersectionObserver((entries)=>{
    console.log(entries)
})
let hList = document.querySelectorAll('h3')
observer.observe(hList[0])

```

输出结果如下：

![image-20221103130154181](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aaeb6fa7ffe24d47b3b19b749ec6d26b~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

可以看到`enries`是一个`IntersectionObserverEntry`对象数组，该对象的属性如上，其中`isIntersecting`是一个Boolean值，表示被观察的节点是否与文档视窗交叉（即有没有出现在可见窗口中）

| 属性 | 说明 |
| --- | --- |
| [`IntersectionObserver.root`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FIntersectionObserver%2Froot "https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver/root") | 所监听对象的具体祖先元素 ([`element`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FElement "https://developer.mozilla.org/zh-CN/docs/Web/API/Element"))。如果未传入值或值为`null`，则默认使用顶级文档的视窗 |

| 方法 | 说明 |
| --- | --- |
| [`disconnect()`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FIntersectionObserver%2Fdisconnect "https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver/disconnect") | 使`IntersectionObserver`对象停止监听工作 |
| \[\`observe() | 开始监听一个目标元素 |
| [`unobserve()`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FIntersectionObserver%2Funobserve "https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver/unobserve") | 停止监听特定目标元素 |

**用法示例：**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Document</title>
    <style>
        h3 {
            margin: 200px;
        }
    </style>
</head>
<body>
    <div>
        <h3>测试文本1</h3>
        <h3>测试文本2</h3>
        <h3>测试文本3</h3>
        <h3>测试文本4</h3>
        <h3>测试文本5</h3>
    </div>
    <script>
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let node = entry.target
                    console.log(node.textContent + ' 出现在了窗口中')
                    observer.unobserve(node)
                }
            })
        })
        let hList = document.querySelectorAll('h3')
        hList.forEach(h => {
            observer.observe(h)
        })
    </script>
</body>
</html>

```

![image-20221103130952810](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f30394885da047b087f008ad10a4c1c0~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

三、动手实践
------

第一种方式：监听`window.onscroll`事件，在回调中判断图片是否出现在窗口可视范围，使用节流优化监听事件

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Document</title>
    <style>
        img{
            display: block;
            height: 400px;
        }
    </style>
</head>
<body>
    <div>
        <img src="https://tse4-mm.cn.bing.net/th/id/OIP-C.nRlAFygdctTCHmIWN7GxRwHaEK?pid=ImgDet&rs=1" data-src="https://qiuzcc-typora-images.oss-cn-shenzhen.aliyuncs.com/images/2022/202210141603798.JPG" alt="">
​
        <img src="https://tse4-mm.cn.bing.net/th/id/OIP-C.nRlAFygdctTCHmIWN7GxRwHaEK?pid=ImgDet&rs=1" data-src="https://qiuzcc-typora-images.oss-cn-shenzhen.aliyuncs.com/images/2022/%E9%AA%91%E8%A1%8C.jpg" alt="">
​
        <img src="https://tse4-mm.cn.bing.net/th/id/OIP-C.nRlAFygdctTCHmIWN7GxRwHaEK?pid=ImgDet&rs=1" data-src="https://qiuzcc-typora-images.oss-cn-shenzhen.aliyuncs.com/images/2022/202210141601847.jpg" alt="">
​
        <img src="https://tse4-mm.cn.bing.net/th/id/OIP-C.nRlAFygdctTCHmIWN7GxRwHaEK?pid=ImgDet&rs=1" data-src="https://qiuzcc-typora-images.oss-cn-shenzhen.aliyuncs.com/images/2022/202210121140688.jpg" alt="">
        
        <img src="https://tse4-mm.cn.bing.net/th/id/OIP-C.nRlAFygdctTCHmIWN7GxRwHaEK?pid=ImgDet&rs=1" data-src="https://qiuzcc-typora-images.oss-cn-shenzhen.aliyuncs.com/images/2022/202205270028510.png" alt="">
        
    </div>
    <script>
        function throttle(fn,delay){
            let timeoutId;
            return function(){
                let context = this
                let args = arguments
                if(!timeoutId){
                    timeoutId = setTimeout(()=>{
                        timeoutId=null
                        fn.apply(context,args)
                    },delay)
                }
            }
        }
       
        let start = 0   //start需要声明为全局变量，否则每次调用函数start都会重新刷新为0，也就失去了它的意义了
        function imgLazyLoad(){
            console.log('触发imgLazyLoad')
            let imgs = document.querySelectorAll('img')
            for(let i=start;i<imgs.length;i++){
                let img = imgs[i]
                if(img.getBoundingClientRect().top <= window.innerHeight){
                    img.src = img.dataset.src
                    start = i+1
                }
            }
        }
        window.onscroll = throttle(imgLazyLoad,250)
        imgLazyLoad()
    </script>
</body>
</html>

```

第二种方式：使用`IntersectionObserver`

```js
//替换<script>部分
function imgLazyLoad(imgs) {
    imgs.forEach(event=>{
        if(event.isIntersecting){
            const image = event.target
            image.src = image.dataset.src
            observer.unobserve(image)
            console.log('triger')
        }
    })
}
const observer = new IntersectionObserver(imgLazyLoad)
let imgs = document.querySelectorAll('img')
imgs.forEach(img => {
    observer.observe(img)
})

```

`IntersectionObserver`允许你追踪目标元素与其祖先元素或视窗的交叉状态

通过`isIntersecting`属性来判断是否出现

* `observer.observe`添加交叉监听，给每个img添加监听
* `observer.unobserve`取消交叉监听，img出现时给src赋值，并取消监听

四、性能提升效果
--------

为了放大对比效果，特意选择了体积较大的图像文件

首先是没有懒加载时的加载时间：一共花了20.7s，五张图片一共19.4M

![image-20221103112657840](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/90e0d2415652405ea3a64af27a7a4c4e~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

使用懒加载后，首次只加载前三张图片，一共花了5.03s，三张图片8.4M

![image-20221103120837216](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7b9ddf17fbb84f61a38cc0482b1515ba~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)
