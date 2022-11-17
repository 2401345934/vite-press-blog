---
createTime: 2022/11/17
tag: '场景题'
---
# 前端水印功能

## 实现水印功能

几种实现方案
------

### 基于原图生成水印图片（后端）

这种方案就是将 **原图片** 添加水印之后生成了 **新图片**，后续在前端页面进行展示是后端接口不返回原图片，而是返回带有水印的图片即可。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9c3d3f291b4f4ad1a8dfc90d97714eed~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

这种方式最大的优点就是安全，因为 **水印图片** 是后端生成的，前端只需要负责展示即可，不需考虑多余的问题，且即便在前端页面保存对应图片，拿到的仍然不是原图片。

### 基于 DOM 实现水印效果（前端）

自定义指令钩子非常多，但实际上能使用到的不多，比如最常用的就是 `mounted`、`updated`，在这我们只需要通过 `mounted` 即可实现对应的功能，并且核心代码比较简单。

**核心内容**

* 创建一个 `watermark` 的 `DOM` 节点，即 `div` 元素，用于包裹对应的 `img` 便于展示水印内容
* 在创建一个 `waterbg` 的 `DOM` 节点，即 `div` 元素
  * 将 `waterbg` 节点作为 `watermark` 的 **子节点**，并进行 **绝对定位** 保证 `waterbg` 在 **最上层显示**
  * 将对应的 **水印标记** 作为 `waterbg` 节点的 **背景图片** 展示
  * 为 `waterbg` 节点设置 `pointer-events: none;` 实现 **点击穿透**
* 将 `watermark` 节点通过 `insertBefore(...)` 插入到 `img` 标签的前一个位置
* 再将 `img` 标签移动到 `watermark` 节点节中，这样就保证了新创建的 `watermark` 节点的位置一定是在原本 `img` 挂载的位置

**效果和代码如下**

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3665bb22644b400a9924b12cc92ca41a~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

```js
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import directives from './directives'

createApp(App)
    .use(directives)
    .mount('#app');

// src/directives/index.ts
import type { App } from 'vue'
import watermark from './waterMark'

export default function installDirective(app: App) {
    app.directive(watermark.name, watermark.directives);
} 

// src/directives/waterMark.ts
import waterBgImg from '../assets/water-bg.png'

const directives: any = {
    mounted(el: HTMLElement) {
        el.onload = () => {
            const { clientWidth, clientHeight, parentElement } = el;

            const waterMark: HTMLElement = document.createElement('div');
            const waterBg: HTMLElement = document.createElement('div');

            waterMark.className = `water-mark`;// 方便自定义展示结果

            // 创建 waterMark 父元素
            waterMark.setAttribute('style', `
            display: inline-block;
            overflow: hidden;
            position: relative;
            width: ${clientWidth}px; 
            height: ${clientHeight}px;`);

            // 创建 waterBg 背景元素
            waterBg.className = `water-mark-bg`;// 方便自定义展示结果
            waterBg.setAttribute('style', `
            position: absolute;
            pointer-events: none;
            width: 100%;
            height: 100%;
            opacity: 0.2;
            background-image: url(${waterBgImg}); 
            background-repeat: repeat;`);

            // 为 waterMark 添加对应的子元素
            waterMark.appendChild(waterBg);
            // 将 waterMark 插入到对应的位置
            parentElement?.insertBefore(waterMark, el);
            // 将图片元素移动到 waterMark 中
            waterMark.appendChild(el);
        }
    }
}

export default {
    name: 'watermark',
    directives
}

```

**优化实现方式**

在上述的实现方式中，实际上至少有两点可优化的点：

* 所有的样式直接以 **字符串** 形式出现在 `JavaScript` 代码中
  * 可以将对应的静态样式部分处理在 `css` 中，由 `.water-mark` 来管理
* 多余的 `waterBg` 被创建出来
  * 其实完全没必要单独创建这个节点元素，可以直接基于 `.water-mark` 对应节点的伪类元素来实现

优化后核心代码如下：

```js
/********* src/directives/waterMark.ts ***********/

const directives: any = {
  mounted(el: HTMLElement) {
    el.onload = () => {
      const { clientWidth, clientHeight, parentElement } = el;

      const waterMark: HTMLElement = document.createElement("div");

      // 创建 waterMark 父元素
      waterMark.setAttribute("style", `width: ${clientWidth}px; height: ${clientHeight}px;`);
      waterMark.className = `water-mark`; // 方便自定义展示结果

      // 将 waterMark 插入到对应的位置
      parentElement?.insertBefore(waterMark, el);
      // 将图片元素移动到 waterMark 中
      waterMark.appendChild(el);
    };
  },
};

export default {
  name: "watermark",
  directives,
};

/********* css 部分代码如下  ***********/ 
.water-mark {
  display: inline-block;
  overflow: hidden;
  position: relative;
}
.water-mark::after {
  pointer-events: none;
  position: absolute;
  content: ' ';
  width: 100%;
  height: 100%;
  opacity: 0.2;
  background-image: url("../assets/water-bg.png");
  background-repeat: repeat;
}

```

### 基于 Canvas 实现水印效果（前端）

基于 `Canvas` 实现方式的优点就在于能够动态的设置水印内容，相比于上一种基于固定背景图片的方式更灵活，这种方式也是 **语雀** 在使用的方式，具体效果如下：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e4abaf90c6664a59837af9ed62d9da55~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

**核心步骤**

* 通过 `canvas` 填充文本，并通过 `canvas.toDataURL("image/png");` 获取到对应的 `base64` 格式的图片
* 将这个 `base64` 格式的图片作为类名为 `water-mark` 节点的背景图
  * 利用 `background-repeat: repeat;` 让这个图重复填充背景即可
  * 为 `water-mark` 节点设置 `pointer-events: none;` 实现 **点击穿透**
  * 利用对应图片的父元素作为 `water-mark` 节点的相对定位节点，保证绝对定位的 `water-mark` 节点显式在对应图片之上

**效果和代码如下**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f9190aa805144858810da50b4aca13b~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

```js
/********* src/directives/waterMark.ts  ***********/

// 全局保存 canvas 和 div ，避免重复创建（单例模式）
const globalCanvas = null;
const globalWaterMark = null;

// 获取 toDataURL 的结果
const getDataUrl = ({
  font = "16px normal",
  fillStyle = "rgba(180, 180, 180, 0.3)",
  textAlign,
  textBaseline,
  text = "请勿外传",
}) => {
  const rotate = -20;
  const canvas = globalCanvas || document.createElement("canvas");
  const ctx = canvas.getContext("2d"); // 获取画布上下文

  ctx.rotate((rotate * Math.PI) / 180);
  ctx.font = font;
  ctx.fillStyle = fillStyle;
  ctx.textAlign = textAlign || "left";
  ctx.textBaseline = textBaseline || "middle";
  ctx.fillText(text, canvas.width / 3, canvas.height / 2);

  return canvas.toDataURL("image/png");
};

// 设置水印
const setWaterMark = (el: HTMLElement, binding: any) => {
  const { parentElement } = el;

  // 获取对应的 canvas 画布相关的 base64 url
  const url = getDataUrl(binding);

  // 创建 waterMark 父元素
  const waterMark = globalWaterMark || document.createElement("div");
  waterMark.className = `water-mark`; // 方便自定义展示结果
  waterMark.setAttribute("style", `background-image: url(${url});`);

  // 将对应图片的父容器作为定位元素
  parentElement.setAttribute("style", "position: relative;");

  // 将图片元素移动到 waterMark 中
  parentElement.appendChild(waterMark);
};

const directives: any = {
  mounted(el: HTMLElement, binding: any) {
    el.onload = setWaterMark.bind(null, el, binding.value);
  },
};

export default {
  name: "watermark",
  directives,
};

/*********  css 部分  ***********/
.water-mark {
  display: inline-block;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background-repeat: repeat;
}

```

使用 MutationObserver 优化
----------------------

以上提到的两种前端实现方案，都存在一个问题很明显的问题，那就是用于只要用户通过 **开发者调试工具** 来稍微操作一，旧能够导致水印失效：

* 删除对应 `dom` 节点
* 设置对应 `dom` 节点的 `css` 样式

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b1542a628022405cbb8b2f6dc4dbf661~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

[**MutationObserver**](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FMutationObserver "https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver") 接口提供对 `DOM` 树监听的能力，它能够监听 `DOM` 树属性、节点本身、子节点等的变化，于是优化的思路就是使用 **MutationObserver** 去监听外部对应 `water-mark` 节点的操作，只要监听到了就重新渲染水印效果即可。

**效果和代码**

> 【**注意**】这里最容易踩坑的点就是 **MutationObserver** 中的条件写得不正确的话会导致死循环.

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/32d95a43a99c42d49cd5e0b4af64fc27~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

```js
/********* src/directives/waterMark.ts  ***********/

// 全局保存 canvas 和 div ，避免重复创建（单例模式）
const globalCanvas = null;
const globalWaterMark = null;

// watermark 样式
let style = `
display: block;
overflow: hidden;
position: absolute;
left: 0;
top: 0;
width: 100%;
height: 100%;
background-repeat: repeat;
pointer-events: none;`;

const getDataUrl = ({
  font = "16px normal",
  fillStyle = "rgba(180, 180, 180, 0.3)",
  textAlign,
  textBaseline,
  text = "请勿外传",
}) => {
  const rotate = -20;
  const canvas = globalCanvas || document.createElement("canvas");
  const ctx = canvas.getContext("2d"); // 获取画布上下文

  ctx.rotate((rotate * Math.PI) / 180);
  ctx.font = font;
  ctx.fillStyle = fillStyle;
  ctx.textAlign = textAlign || "left";
  ctx.textBaseline = textBaseline || "middle";
  ctx.fillText(text, canvas.width / 3, canvas.height / 2);

  return canvas.toDataURL("image/png");
};

const setWaterMark = (el: HTMLElement, binding: any = {}) => {
  const { parentElement } = el;

  // 获取对应的 canvas 画布相关的 base64 url
  const url = getDataUrl(binding);

  // 创建 waterMark 父元素
  const waterMark = globalWaterMark || document.createElement("div");
  waterMark.className = `water-mark`; // 方便自定义展示结果
  style = `${style}background-image: url(${url});`;
  waterMark.setAttribute("style", style);

  // 将对应图片的父容器作为定位元素
  parentElement.setAttribute("style", "position: relative;");

  // 将图片元素移动到 waterMark 中
  parentElement.appendChild(waterMark);
};

// 监听 DOM 变化
const createObserver = (el: HTMLElement, binding: any) => {
  const waterMarkEl = el.parentElement.querySelector(".water-mark");

  const observer = new MutationObserver((mutationsList) => {
    if (mutationsList.length) {
      const { removedNodes, type, target } = mutationsList[0];
      const currStyle = waterMarkEl.getAttribute("style");

      // 证明被删除了
      if (removedNodes[0] === waterMarkEl) {
        observer.disconnect();
        init(el, binding);
      } else if (
        type === "attributes" &&
        target === waterMarkEl &&
        currStyle !== style
      ) {
        waterMarkEl.setAttribute("style", style);
      }
    }
  });

  observer.observe(el.parentElement, {
    childList: true,
    attributes: true,
    subtree: true,
  });
};

// 初始化
const init = (el: HTMLElement, binding: any = {}) => {
  // 设置水印
  setWaterMark(el, binding.value);
  // 启动监控
  createObserver(el, binding.value);
};

// 定义指令配置项
const directives: any = {
  mounted(el: HTMLElement, binding: any) {
    el.onload = init.bind(null, el, binding);
  },
};

export default {
  name: "watermark",
  directives,
};

```
