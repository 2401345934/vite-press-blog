---
createTime: 2022/12/08
tag: '工程化,SDK'
---

# 前端录屏+定位源码

[web-see](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fxy-sea%2Fweb-see "https://github.com/xy-sea/web-see") 前端监控方案，提供了 **前端录屏+定位源码** 方式，让bug无处藏身

这是前端监控的第二篇，该篇讲解如何实现错误还原功能，第一篇 [从0到1搭建前端监控平台，面试必备的亮点项目（已开源）](https://juejin.cn/post/7172072612430872584 "https://juejin.cn/post/7172072612430872584") 没有看过的小伙伴，建议先了解下

最终效果
----

在监控后台，通过报错信息列表，可以查看具体报错的源码，以及报错时的录屏回放

效果演示：

![video.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d7cec0ead4704c1eba109c3d64bb98b7~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

录屏记录了用户的所有操作，红色的线代表了鼠标的移动轨迹

定位源码
----

前端项目发布上线，代码一般都会进行压缩、混淆、甚至加密，当线上代码报错时，很难定位到具体的源码

SourceMap 完美解决了代码反解的问题，项目在打包时，除了生成最终 `XXX.js` 文件外，还会额外生成一个 `XXX.js.map` 的文件

.map 文件里包含了原始代码及其映射信息，可以利用它反解出报错信息的源码

### SourceMap 文件

先了解下 SourceMap 的基本内容

例如 `app.a2a3ceec.js` 代码如下：

```js
var add=function(x, y){return x+y;};
//# sourceMappingURL=app.a2a3ceec.js.map
```

其中 sourceMappingURL 用来说明该文件对应的map文件

对应的 `app.a2a3ceec.js.map` 代码如下：

```js
{
  version : 3, // SourceMap标准版本,最新的为3
  file: "js/app.a2a3ceec.js", // 转换后的文件名
  sourceRoot : "", // 转换前的文件所在目录，如果与转换前的文件在同一目录，该项为空
  sources: [ // 转换前的文件，该项是一个数组，表示可能存在多个文件合并
    "webpack://web-see-demo/./src/App.vue",
    "webpack://web-see-demo/./src/main.js"
  ], 
  names: [], // 转换前的所有变量名和属性名
  sourcesContent: [ // 原始文件内容
    "const add = (x,y) => {\n  return x+y;\n}"
  ],
  // 所有映射点
  mappings: "AAAA,IAAM,GAAG,GAAG,UAAC,CAAQ,EAAC,CAAQ;IAC5B,OAAO,CAAC,GAAC,CAAC,CAAC;AACb,CAAC,CAAA"
}
```

其中 sources 和 sourcesContent 是关键字段，下文的还原示例中将用到

### source-map-js 库

代码还原，这里主要使用 [source-map-js](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fsource-map "https://www.npmjs.com/package/source-map") 库，下面介绍下如何使用

示例代码：

```js
import sourceMap from 'source-map-js';

/**
* findCodeBySourceMap用于获取map文件对应的源代码
* @param { string } fileName .map文件名称
* @param { number } line 发生错误的行号
* @param { number } column 发生错误的列号
* @param { function } 回调函数，返回对应的源码
*/
const findCodeBySourceMap = async ({ fileName, line, column }, callback) => {
  // loadSourceMap 用于获取服务器上 .map 的文件内容
  let sourceData = await loadSourceMap(fileName);
  let { sourcesContent, sources } = sourceData;
  // SourceMapConsumer实例表示一个已解析的源映射
  // 可以通过在生成的源中给它一个文件位置来查询有关原始文件位置的信息
  let consumer = await new sourceMap.SourceMapConsumer(sourceData);
  // 输入错误的发生行和列，可以得到源码对应原始文件、行和列信息
  let result = consumer.originalPositionFor({
    line: Number(line),
    column: Number(column)
  });
  // 从sourcesContent得到具体的源码信息
  let code = sourcesContent[sources.indexOf(result.source)];
  ……
  callback(code)

```

本小节的[代码仓库](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fxy-sea%2Fweb-see-demo%2Fblob%2Fmain%2Fsrc%2Futils%2Fsourcemap.js "https://github.com/xy-sea/web-see-demo/blob/main/src/utils/sourcemap.js")

source-map 的还原流程：

1、从服务器获取指定.map 的文件内容

2、new 一个 SourceMapConsumer 的实例，表示一个已解析的源映射，给它一个文件位置来查询有关原始文件位置的信息

3、输入报错发生的行和列，可以得到源码对应原始文件名、行和列信息

4、从源文件的 sourcesContent 字段中，获取对应的源码信息

接下来的重点就变为：如何获取报错发生的原始文件名、行和列信息

### error-stack-parser 库

通过第一篇文章的介绍，我们知道可以通过多种方式来捕获报错

比如 error事件、unhandledrejection事件、vue 中通过Vue.config.errorHander、react中通过componentDidCatch

为了消除各浏览器的差异，使用 [error-stack-parser](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Ferror-stack-parser "https://www.npmjs.com/package/error-stack-parser") 库来提取给定错误的原始文件名、行和列信息

示例代码：

```js
import ErrorStackParser from 'error-stack-parser';

ErrorStackParser.parse(new Error('BOOM'));

// 返回值 StackFrame 堆栈列表
[
    StackFrame({functionName: 'foo', args: [], fileName: 'path/to/file.js', lineNumber: 35, columnNumber: 79, isNative: false, isEval: false}),
    StackFrame({functionName: 'Bar', fileName: 'https://cdn.somewherefast.com/utils.min.js', lineNumber: 1, columnNumber: 832, isNative: false, isEval: false, isConstructor: true}),
    StackFrame(... and so on ...)
]
```

这里简单说明下 JS 堆栈列表

堆栈示例：

```js
function c() {
  try {
    var bar = baz;
    throw new Error()
  } catch (e) {
    console.log(e.stack);
  }
}
function b() {
  c();
}
function a() {
  b();
}
a();
```

上述代码中会在执行到 c 函数的时候报错，调用栈为 a -> b -> c，如下图所示：

![stack.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/df327d21999a456dbfc0390ca019e846~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

一般我们只需要定位到 c 函数的堆栈信息，所以使用 error-stack-parser 库的时候，只取 StackFrame 数组中的第一个元素

最终代码：

```js
import ErrorStackParser from 'error-stack-parser';

// 取StackFrame数组中的第一个元素
let stackFrame = ErrorStackParser.parse(error)[0];
// 获取对应的原始文件名、行和列信息，并上报
let { fileName, columnNumber, lineNumber } = stackFrame;
```

### 示例演示

下载 [web-see-demo](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fxy-sea%2Fweb-see-demo "https://github.com/xy-sea/web-see-demo") 安装并运行

1）点击 **js错误** 按钮，会执行 HomeView.vue 文件中的 codeErr 方法

codeErr的源码为：

![codeErr.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1d1161baacbf41e792c142eb7daf3081~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

2）Vue.config.errorHander中捕获到报错信息为：

![length.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ccd49dc7b6c044c19fb86ad995bfe6c7~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

3）使用 ErrorStackParser.parse 解析后的stackFrame为：

![stackFrame.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3005695c19914239bfce98f604786042~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

4）经过 consumer.originalPositionFor 还原后的 result 结果为：

![result.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/419738f017e946b2af2e0bd4f6052194~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

5）最终拿到的源码：

![code.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ac9bd0c70154496a872fcfda1dfcc259~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

### 流程总结

![sourcemap.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/15e69b9ac2c44370adafb627c65ef26a~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

如上图所示，定位源码流程总结：

1、项目中引入监控 SDK，打包后将js文件发布到服务器上

2、将 .map 文件放到指定的地址，统一存储

3、当线上代码报错时，利用 error-stack-parser 获取具体原始文件名、行和列信息，并上报

4、利用 source-map 从 .map 文件中得到对应的源码并展示

前端录屏
----

web-see 监控通过 [rrweb](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Frrweb-io%2Frrweb "https://github.com/rrweb-io/rrweb") 提供了前端录屏的功能

### rrweb 使用

先介绍下在vue中如何使用

录制示例：

```js
import { record } from 'rrweb';
// events存储录屏信息
let events = [];
// record 用于记录 `DOM` 中的所有变更
rrweb.record({
  emit(event, isCheckout) {
    // isCheckout 是一个标识，告诉你重新制作了快照
    if (isCheckout) {
      events.push([]);
    }
    events.push(event);
  },
  recordCanvas: true, // 记录 canvas 内容
  checkoutEveryNms: 10 * 1000, // 每10s重新制作快照
  checkoutEveryNth: 200, // 每 200 个 event 重新制作快照
});

```

播放示例：

```vue
<template>
  <div ref='player'>
  </div>
</template>
<script>
import rrwebPlayer from 'rrweb-player';
import 'rrweb-player/dist/style.css';
export default {
   mounted() {
     // 将记录的变更按照对应的时间一一重放
     new rrwebPlayer(
        {
          target: this.$refs.player, // 回放所需要的HTML元素
          data: { events }
        },
        {
          UNSAFE_replayCanvas: true // 回放 canvas 内容
        }
     )
   }
}
</script>

```

### rrweb 原理浅析

rrweb 主要由 `rrweb` 、 `rrweb-player` 和 `rrweb-snapshot` 三个库组成：

1）rrweb：提供了 record 和 replay 两个方法；record 方法用来记录页面上 DOM 的变化，replay 方法支持根据时间戳去还原 DOM 的变化

2）rrweb-player：基于 svelte 模板实现，为 rrweb 提供了回放的 GUI 工具，支持暂停、倍速播放、拖拽时间轴等功能。内部调用了 rrweb 的提供的 replay 等方法

3）rrweb-snapshot：包括 snapshot 和 rebuilding 两大特性，snapshot 用来序列化 DOM 为增量快照，rebuilding 负责将增量快照还原为 DOM

rrweb 整体流程：

1）rrweb 在录制时会首先进行首屏 DOM 快照，遍历整个页面的 DOM 树，转换为 JSON 结构数据，使用增量快照的处理方式，通过 `mutationObserver` 获取 DOM 增量变化，同步转换为 JSON 数据进行存储

2）整个录制的过程会生成 unique id，来确定增量数据所对应的 DOM 节点，通过 timestamp 保证回放顺序。

3） 回放时，会创建一个 iframe 作为承载事件回放的容器，针对首屏 DOM 快照进行重建，在遍历 JSON 的同时，根据序列化后的节点数据构建出实际的 DOM 节点

4）rrweb 可以监听的用户行为包括：鼠标移动，鼠标交互，页面滚动，视窗变化、用户输入等，通过添加相应的监听事件来实现

### 压缩数据

如果一直录屏，数据量是巨大的

实测下来，录制10s的时长，数据大小约为 8M 左右（页面的不同复杂度、用户不同操作的频率都会造成大小不一样）

数据如果不经过压缩，直接传给后端，面对大量的用户，需要非常高的带宽做支持。还好，rrweb官方提供了[数据压缩函数](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Frrweb-io%2Frrweb%2Fblob%2Fmaster%2Fdocs%2Frecipes%2Foptimize-storage.zh_CN.md "https://github.com/rrweb-io/rrweb/blob/master/docs/recipes/optimize-storage.zh_CN.md")

基于 packFn 的单数据压缩，在录制时可以作为 `packFn` 传入

```js
rrweb.record({
  emit(event) {},
  packFn: rrweb.pack,
});

```

回放时，需要传入 rrweb.unpack 作为 `unpackFn` 传入

```js
const replayer = new rrweb.Replayer(events, {
  unpackFn: rrweb.unpack,
});

```

但是官方提供的压缩方式，是对每个 event 数据单独进行压缩，压缩比不高。实测下来，压缩比在70%左右，比如原来 8M 的数据，压缩后为 2.4M 左右

官方更加推荐实现将多个 event 批量一次性压缩，这样压缩效果更好

web-see 内部使用 **[pako.js](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fpako "https://www.npmjs.com/package/pako")、[js-base64](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fjs-base64 "https://www.npmjs.com/package/js-base64")** 相结合的压缩方式，实测下来，压缩比为 85% 以上，原来 8M 的数据，压缩后为 1.2M 左右

压缩代码示例：

```js
import pako from 'pako';
import { Base64 } from 'js-base64';

// 压缩
export function zip(data) {
  if (!data) return data;
  // 判断数据是否需要转为JSON
  const dataJson = typeof data !== 'string' && typeof data !== 'number' ? JSON.stringify(data) : data;
  // 使用Base64.encode处理字符编码，兼容中文
  const str = Base64.encode(dataJson);
  let binaryString = pako.gzip(str);
  let arr = Array.from(binaryString);
  let s = '';
  arr.forEach((item) => {
    s += String.fromCharCode(item);
  });
  return Base64.btoa(s);
}

```

解压代码示例：

```js
import { Base64 } from 'js-base64';
import pako from 'pako';

// 解压
export function unzip(b64Data) {
  let strData = Base64.atob(b64Data);
  let charData = strData.split('').map(function (x) {
    return x.charCodeAt(0);
  });
  let binData = new Uint8Array(charData);
  let data = pako.ungzip(binData);
  // ↓切片处理数据，防止内存溢出报错↓
  let str = '';
  const chunk = 8 * 1024;
  let i;
  for (i = 0; i < data.length / chunk; i++) {
    str += String.fromCharCode.apply(null, data.slice(i * chunk, (i + 1) * chunk));
  }
  str += String.fromCharCode.apply(null, data.slice(i * chunk));
  // ↑切片处理数据，防止内存溢出报错↑
  const unzipStr = Base64.decode(str);
  let result = '';
  // 对象或数组进行JSON转换
  try {
    result = JSON.parse(unzipStr);
  } catch (error) {
    if (/Unexpected token o in JSON at position 0/.test(error)) {
      // 如果没有转换成功，代表值为基本数据，直接赋值
      result = unzipStr;
    }
  }
  return result;
}

```

### 何时上报录屏数据

一般关注的是，页面报错的时候用户做了哪些操作，所以目前只把报错前10s的录屏上报到服务端

如何只上报报错时的录屏信息呢 ？

1）window上设置 hasError、recordScreenId 变量，hasError用来判断某段时间代码是否报错；recordScreenId 用来记录此次录屏的id

2）当页面发出报错需要上报时，判断是否开启了录屏，如果开启了，将 hasError 设为 true，同时将 window 上的 recordScreenId，存储到此次上报信息的 data 中

3）rrweb 设置10s重新制作快照的频率，每次重置录屏时，判断 hasError 是否为 true（即这段时间内是否发生报错），有的话将这次的录屏信息上报，并重置录屏信息和 recordScreenId，作为下次录屏使用

4）后台报错列表，从本次报错报的data中取出 recordScreenId 来播放录屏

录屏的代码示例：

```js
handleScreen() {
 try {
  // 存储录屏信息
  let events = [];
  record({
    emit(event, isCheckout) {
      if (isCheckout) {
        // 此段时间内发生错误，上报录屏信息
        if (_support.hasError) {
          let recordScreenId = _support.recordScreenId;
          // 重置recordScreenId，作为下次使用
          _support.recordScreenId = generateUUID();
          transportData.send({
            type: EVENTTYPES.RECORDSCREEN,
            recordScreenId,
            time: getTimestamp(),
            status: STATUS_CODE.OK,
            events: zip(events)
          });
          events = [];
          _support.hasError = false;
        } else {
          // 不上报，清空录屏
          events = [];
          _support.recordScreenId = generateUUID();
        }
      }
      events.push(event);
    },
    recordCanvas: true,
    // 默认每10s重新制作快照
    checkoutEveryNms: 1000 * options.recordScreentime
  });

```
