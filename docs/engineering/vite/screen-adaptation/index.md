---
createTime: 2022/11/08
tag: '工程化,vite,适配'
---
基于rem的适配方案
----------

### rem是什么？

rem是指相对于根元素的字体大小的单位，在日常开发过程中我们通常把根元素（html/body）的字体设置为10px,方便于我们计算（此时子元素的1rem就相当于10px）。

### 适用场景

不固定宽高比的Web应用，适用于绝大部分业务场景 ![px2rem.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dff5429951ce4068bc19ae37bdbcc6af~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

### 项目实战

1. 安装依赖

```
npm i postcss-pxtorem autoprefixer amfe-flexible --save-dev
```

> postcss-pxtorem 是PostCSS的插件，用于将像素单元生成rem单位  
> autoprefixer 浏览器前缀处理插件  
> amfe-flexible 可伸缩布局方案 替代了原先的`lib-flexible` 选用了当前众多浏览器兼容的`viewport`

2. 项目根目录创建 `postcss.config.js` 文件 ![QQ图片20220927110819.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dc6ec08fb25b44aeaa9254e725389169~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

```
module.exports = {
 plugins: {
  autoprefixer: {
   overrideBrowserslist: [
    "Android 4.1",
    "iOS 7.1",
    "Chrome > 31",
    "ff > 31",
    "ie >= 8",
    "last 10 versions", // 所有主流浏览器最近10版本用
   ],
   grid: true,
  },
  "postcss-pxtorem": {
   rootValue: 192, // 设计稿宽度的1/ 10 例如设计稿按照 1920设计 此处就为192
   propList: ["*", "!border"], // 除 border 外所有px 转 rem
   selectorBlackList: [".el-"], // 过滤掉.el-开头的class，不进行rem转换
  },
 },
};

```

3. `main.ts/js` 文件中导入依赖

```
import "amfe-flexible/index.js";

```

4. 项目重启

基于scale的适配方案
------------

在CSS3中，我们可以使用transform属性的scale()方法来实现元素的缩放效果。缩放，指的是“缩小”和“放大”的意思。

* transform: scaleX(x); / 沿x轴方向缩放/
* transform: scaleY(y); / 沿y轴方向缩放/
* transform: scale(); / 同时沿x轴和y轴缩放/

### 适用场景

固定宽高比的Web应用，如大屏或者固定窗口业务应用 ![scale.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b9efd3e99a284af9b561a9ee7c623498~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

### 项目实战

1. 新建`resize.ts/js`文件 ![QQ图片20220927111729.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/679548a8cd874f47bd8d6ae5a777e6ad~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

```
import { ref } from "vue";

export default function windowResize() {
 // * 指向最外层容器
 const screenRef = ref();
 // * 定时函数
 const timer = ref(0);
 // * 默认缩放值
 const scale = {
  width: "1",
  height: "1",
 };
    
 // * 设计稿尺寸（px）
 const baseWidth = 1920;
 const baseHeight = 1080;

 // * 需保持的比例（默认1.77778）
 const baseProportion = parseFloat((baseWidth / baseHeight).toFixed(5));
 const calcRate = () => {
  // 当前宽高比
  const currentRate = parseFloat(
   (window.innerWidth / window.innerHeight).toFixed(5)
  );
  if (screenRef.value) {
   if (currentRate > baseProportion) {
    // 表示更宽
    scale.width = (
     (window.innerHeight * baseProportion) /
     baseWidth
    ).toFixed(5);
    scale.height = (window.innerHeight / baseHeight).toFixed(5);
    screenRef.value.style.transform = `scale(${scale.width}, ${scale.height})`;
   } else {
    // 表示更高
    scale.height = (
     window.innerWidth /
     baseProportion /
     baseHeight
    ).toFixed(5);
    scale.width = (window.innerWidth / baseWidth).toFixed(5);
    screenRef.value.style.transform = `scale(${scale.width}, ${scale.height})`;
   }
  }
 };

 const resize = () => {
  clearTimeout(timer.value);
  timer.value = window.setTimeout(() => {
   calcRate();
  }, 200);
 };

 // 改变窗口大小重新绘制
 const windowDraw = () => {
  window.addEventListener("resize", resize);
 };

 // 改变窗口大小重新绘制
 const unWindowDraw = () => {
  window.removeEventListener("resize", resize);
 };

 return {
  screenRef,
  calcRate,
  windowDraw,
  unWindowDraw,
 };
}


```

2. 相关界面引入`resize.ts/js` ![QQ图片20220927112000.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/464430e5a9fc458a924482d0d3d7bb9f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

```
<template>
    <div class="screen-container">
        <div class="screen-content" ref="screenRef">
            <span class="screen-title">基于scale的适配方案</span>
            <img class="screen-img" src="https://img2.baidu.com/it/u=1297807229,3828610143&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281" alt="">
        </div>
    </div>
</template>

<script setup lang="ts">
import windowResize from '../../utils/resize';
import {onMounted, onUnmounted} from 'vue';

const { screenRef, calcRate, windowDraw, unWindowDraw } = windowResize()

onMounted(() => {
    // 监听浏览器窗口尺寸变化
    windowDraw()
    calcRate()
})

onUnmounted(() => {
    unWindowDraw();
})

</script>

<style lang="scss" scoped>
.screen-container {
    height: 100%;
    background-color: lightcyan;
    display: flex;
    justify-content: center;
    align-items: center;

    .screen-content {
        width: 1920px;
        height: 1080px;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .screen-title {
            font-size: 32px;
        }

        .screen-img {
            margin-top: 20px;
        }
    }
}
</style>

```
