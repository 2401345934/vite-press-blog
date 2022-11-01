---
createTime: 2022/10/29
tag: '性能优化'
---
# 前端性能监控Performance

懒加载和预加载的目的都是为了提高用户的体验，二者行为是相反的，一个是延迟加载，另一个是提前加载。懒加载对缓解服务器压力有一定作用，预加载则会增长服务器前端压力缓存。

## 懒加载 lazyload

* 懒加载：又叫延迟加载、按需加载，当我们打开一个网页，优先展示的首屏图片就先加载，而其他的图片，等到需要去展示的时候再去请求图片资源。
* 目的：更好的加载页面的首屏内容，对于含有不少图片的比较长的网页来讲，能够加载的更快，避免了首次打开时，一次性加载过多图片资源，是对网页性能的一种优化方式。
* 原理：浏览器解析到img标签的src有值，才会去发起请求，那么就可以让图片需要展示时，才对其src赋值真正的图片地址。

### 实现代码

```html

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>图片懒加载</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      img {
        margin: 50px;
        width: 400px;
        height: 200px;
      }
    </style>
  </head>
  <body>
    <div class="img-container">
      <img
        src="loading.gif"
        alt=""
        data-src="1.jpg"
        class="lazyload"
        />
    </div>
    <div class="img-container">
      <img
        src="loading.gif"
        alt=""
        data-src="2.jpg"
        class="lazyload"
        />
    </div>
    <div class="img-container">
      <img
        src="loading.gif"
        alt=""
        data-src="3.jpg"
        class="lazyload"
        />
    </div>
    <div class="img-container">
      <img
        src="loading.gif"
        alt=""
        data-src="4.jpg"
        class="lazyload"
        />
    </div>
    <div class="img-container">
      <img
        src="loading.gif"
        alt=""
        data-src="5.jpg"
        class="lazyload"
        />
    </div>
    ​
    <script>
      const imgs = [...document.querySelectorAll(".lazyload")]; //img元素转换成数组
      lazyload();  //初始调用一次
      window.addEventListener("scroll", lazyload, false);  //监听滚动时也调用lazyload函数，冒泡阶段
      //懒加载
      function lazyload() {
        for (let i = 0; i < imgs.length; i++) {
          const $img = imgs[i];          //每次循环拿到每一个img元素
          if (isInVisibleArea($img)) {   //判断img元素是否在可视区域内
            $img.src = $img.dataset.src; //用data-src替换src属性
            imgs.splice(i, 1);           //对应该索引的元素删掉
            i--;  
          }
        }
      }
      // 判断DOM元素是否在可视区域内，返回true/false
      function isInVisibleArea($el) {
        const rect = $el.getBoundingClientRect();
        console.log(rect);
        return rect.bottom > 0 && rect.top < window.innerHeight && rect.right > 0 && rect.left < window.innerWidth;
      }
    </script>
  </body>
</html>

```

### 实现细节

#### 1 如何加载图片

用img的data-src属性存放真正需要显示的图片的路径，当页面滚动直到图片出现在可视区域时，将data-src中的图片地址值赋值给src属性值。

#### 2 如何判断一个元素出现在可视区域

监听滚动事件，用getBoundingClientRect()获取DOM元素在页面的位置，该函数返回rect对象，如下图所示，如果rect.bottom为负数，rect.top大于页面高度，或者rect.right为负数，或者rect.left大于页面宽度，则认为元素已不在页面的可视区域。

```javascript
const rect = element.getBoundingClientRect();

```

* rect.top：元素上边到视窗上边的距离;
* rect.bottom：元素下边到视窗上边的距离;
* rect.left：元素左边到视窗左边的距离;
* rect.right：元素右边到视窗左边的距离;
* window.innerHeight：视窗高度
* window.innerWidth： 视窗宽度

### 实现效果

利用开发者工具我们可以看到如下截图：

* 最初打开页面：只显示前两张图片，后面三张图片还没有出现在当前页面

由于后面三张还没有出现，那么就保持loading.gif，这样就节省了加载的时间，当我们继续滚动直到出现页面底部，通过开发者工具看到如下的截图：

## 预加载 preload

预加载：提前加载所需要的图片资源，加载完毕后会缓存到本地，当需要时可以立刻显示出来。

目的：看完一张图片，再看下一张时，会有一段空白的加载时间，如果网络不是很好，加载的时间就会比较久，预加载可以让用户无需等待，获得直接预览的良好体验。
应用场景：看漫画时，如果我们看完 2 了 ，想看 3 ，3 却还没加载完就会大大降低体验感，而如果能在我们预览 2 这段时间里就提前加载好 3 ， 等到我们看 3 时就直接里面显示。那么就体验会好很多。参考视频讲解：进入学习

### 实现方法

### 1 通过CSS

#### 步骤

* 创建用来预加载的标签
* 给标签使用背景图，背景图的路径是需要预加载的图片资源，并将图片移到看不见的地方，或缩小到看不见。
* 当使用到已经预加载好的图片时，会直接使用缓存好的图片资源，而不需要向服务器发送请求。

```html

<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
  <title>CSS 预加载</title>
  <style>
    ul,li{
      padding:0;
      margin:0;
      list-style:none;
    }
    img {
      width: 300px;
    }
    #preImg1 {
      background-image: url('1.jpg');
      width: 0;
      height: 0;  /*隐藏用来预加载的标签*/
    }
    #preImg2 {
      background-image: url('2.jpg');
      width: 0;
      height: 0;
    }
    #preImg3 {
      background-image: url('3.jpg');
      width: 0;
      height: 0;
    }
  </style>
</head>
<body>
  <button onclick="show()">点击显示图片</button>
  <ul>
    <li id="preImg1"/>
    <li id="preImg2"/>
    <li id="preImg3"/>
  </ul>
</body>
<script>
  const show = function () {
    document.querySelector("ul").innerHTML = `
      <li><img src="1.jpg"></li>
      <li><img src="2.jpg"></li>
      <li><img src="3.jpg"></li>`
  }
</script>
</html>
```

### 2 通过JavaScript

#### 步骤

* 将需要预加载的图片资源的 URL 保存在数组里
* 循环遍历 URL 数组执行以下步骤，直到结束
* 创建一个 image 对象 new Image()
* 将 image 对象的 src 属性的值指定为预加载图片的 URL

```html

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>图片预加载</title>
    <style>
      .img-container {
        display: flex;
        align-items: center;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
      }
      img {
        width: 100%;
      }
      * {
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <div class="img-container">
      <img src="1.jpg" alt="" id="img" />
    </div>

    <script>
      const imgs = [
        "2.jpg",
        "3.jpg",
        "4.jpg",
        "5.jpg",
      ];
      let i = 0;
      const $img = document.getElementById("img");

      // 页面一开始调用preload，加载数组的第一个元素
      preload(imgs[i])
        .then((data) => {})
        .catch(() => {});

      // 点击切换
      $img.addEventListener(
        "click",
        () => {
          if (i < imgs.length) {
            $img.src = imgs[i];  // 将数组元素的src赋值给页面元素
            i++;
            if (i < imgs.length) { 
              preload(imgs[i]);  // 当索引小于数组length，预加载下一个图片
            }
          } else {
            console.log("已经是最后一张了！");  // 当 索引和 数组length相同 则数组内没元素了
          }
        },
        false
      );

      // 预加载
      function preload(src) {
        return new Promise((resolve, reject) => {
          const image = new Image();  // 创建一个新的图片标签
          image.addEventListener("load", () => resolve(image), false);  // 图片加载完成调用成功状态
          image.addEventListener("error", () => reject(), false);   // 图片加载失败调用失败状态
          image.src = src;  // 将传进来的src赋值给新的图片
        });
      }
    </script>
  </body>
</html>
```

### 实现效果

## 总结对比

### 懒加载 预加载

定义 延迟加载、按需加载 提前加载、不需要也提前加载
目的 更好更快地加载页面首屏内容，网页性能优化 让用户无需等待，获得直接预览的良好体验
缺点 需要监听图片是否显示，耗费浏览器性能 占用较多的后台资源，可能一次性加载较多的图片
应用场景 电商搜索产品时图片展示 观看漫画时，每次切换的下一张图片提前加载
