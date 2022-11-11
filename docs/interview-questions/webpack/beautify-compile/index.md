---
createTime: 2022/11/11
tag: 'webpack'
---
# webpack 编译时样式美化

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8004efe4a7ba4907aea01d6099ab7ab0~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

对比下没有添加特效的，如

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/65ec0f0532e94352b0e652070a6cb4cb~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

差别还是挺大的，尤其是我之前一直是用脚手架去搭项目，突然看到这种还是有点不适应的，有时候甚至都不确定是否编译完全。不过也有人喜欢这种不加修饰的，因人而异吧，那么接下来看看怎么实现的。

### webpack内置插件ProgressPlugin

因为是内置的，所以直接在webpack中引入就行 `const { ProgressPlugin } = require('webpack')`

ProgressPlugin包含一个对象ProgressPlugin({}); 结合我们上一篇写的在webpack.config.base.js中

```
const { ProgressPlugin } = require('webpack');
const handler = (percentage, message, ...args) => {
  // precentage 表示编译的百分比
  // message就是webpack打包时想告诉我们的消息
  // ...args就是一些其他消息
  console.info(percentage, message, ...args);
};

在plugin中加入ProgressPlugin这个配置
new ProgressPlugin({
      handler
    })

```

配置完就是这样的效果

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f7a4f76671b8467a880ec7cd266134e5~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?) 当然大家可以加一点修饰，console.log()中可以搞个备注啥的，例如

```
const handler = (percentage, message, ...args) => {
  console.info('进度'+percentage, '处理模块'+message, ...args);
};

```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/766a70c2844e496184b67745ad9629f4~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?) 比原来的好一点。但是ProgressPlugin配置不只是handler这一个，还有其他配置，如果想要了解可以看webpack官网。[webpack.docschina.org/plugins/pro…](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.docschina.org%2Fplugins%2Fprogress-plugin%2F%23root "https://webpack.docschina.org/plugins/progress-plugin/#root")

### WebpackBar美化

先安装WebpackBar,这个包还是很多人在用的

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6ef7d32d212d4cd592084b93e8706780~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)  
`yarn add webpackbar`

然后在webpack.config.base.js中

```
const WebpackBar = require('webpackbar');
plugins: [
new WebpackBar({
      name: '张三王五',  // 默认为webpack，可以更改
      color: "black",  // 进度条的颜色，可以自己设置
      basic: false,   // 默认为false，启用一个简单的日志报告器
      // reports: [], //默认为[]自定义配置相当于，设置了这个，其他就会失效
    })
]

```

效果

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8757db48466149e392c0bb0b28c13378~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

自定义配置reports，如果大家感兴趣可以去试试看,这是包的地址[www.npmjs.com/package/web…](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fwebpackbar "https://www.npmjs.com/package/webpackbar")

细心的朋友肯定发现了，打包结束还没有优化，还是这个样子

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d9afe57de5c64669adf3260349cf7164~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

这时候就需要这个插件了

### friendly-errors-webpack-plugin

首先下载这个包  
`yarn add friendly-errors-webpack-plugin`

然后在webpack.config.base.js中

```
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

plugins: [new FriendlyErrorsWebpackPlugin({
    compilationSuccessInfo: {
      messages: ['张三王五跑起来 http://localhost:5555']
    },
  })]

```

如图

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ee1a97e58c0b4a228cb8db62973f6fc0~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

效果是有了，但是下面这些信息还是需要删掉，在webpack5，我们需要在webpack.config.base.js配置的对外层加`stats: 'errors-only'`,webpack5之前好像是在devServer中添加quit: false.

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/20139660f19844a083f1bae341513caa~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

最后项目yarn start一下

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc7ebaafdc6049ee9c3f16da7715e060~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

这下控制台干净了，不过这也是最基础的配置。就是不知道配置这些会不会对编译速度变慢，所以我也就配置了一些基础的内容。

### 总结

编译样式美化算是弄完了，这些其实网上都可以搜的到，但是这也是我使用webpack必走的一条路，所以记录下来。原本想着是写在上一篇，但是篇幅有点长，所以另起一篇。希望在记录的同时可以帮助到大家，如果文章中有什么错误，都可以评论让我改正。
