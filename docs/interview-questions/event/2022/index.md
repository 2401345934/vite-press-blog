---
createTime: 2023/01/10
tag: '新事件'
---
# 2022 年前端大事记

\[1-11\] Chrome 开始实施私有网络控制策略
----------------------------

私有网络请求指的是目标服务器的 `IP` 地址比请求发起者获取的 IP 地址更私密的请求。例如，从公共网站 (`https://www.douyin.com`) 到内网网站 (`http://argus.bytedance.net`) 的请求，或从内网网站到 `localhost` 的请求。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dcb6a8f4fdf64c969f3c304e7d86cb0e~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

据 `Chrome` 统计，有数十万人遭受了针对私有网络的攻击，简单说，就是你打开一个公共的网站，这个网站里会去请求你内网里的地址，然后窃取信息。基于此类问题，`Chrome` 提出了私有网络控制策略，此策略会限制网站向私有网络上的服务器发送请求的能力。

你必须要部署下面两个 Header，否则所有私有网络访问都会失败：

* `Request`： Access-Control-Request-Private-Network: true
* `Resonse`：Access-Control-Allow-Private-Network: true

了解更多：

* [Chrome 重大更新，CORS 增加了两个新的请求头？](https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzk0MDMwMzQyOA%3D%3D%26mid%3D2247491913%26idx%3D1%26sn%3D2bb0a28358c02a8ec1832781205df72c%26chksm%3Dc2e11462f5969d74fac277131e1ba8c417ec86754b2f1b2dbe8e238ca27d5c2eaebe602ec803%26token%3D1851580176%26lang%3Dzh_CN%23rd "https://mp.weixin.qq.com/s?__biz=Mzk0MDMwMzQyOA==&mid=2247491913&idx=1&sn=2bb0a28358c02a8ec1832781205df72c&chksm=c2e11462f5969d74fac277131e1ba8c417ec86754b2f1b2dbe8e238ca27d5c2eaebe602ec803&token=1851580176&lang=zh_CN#rd")

\[1-21\] Vue 3 成为新的默认版本
------------------------

`Vue 3` 在 `2022` 年 2 月 7 日 成为新的默认版本！

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/67e77b72027645a28df392d036edd0d2~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

除了 `Vue` 核心库以外，还几乎改进了框架的每个方面。

* 基于 `Vite` 的极速构建工具链
* `<script setup>` 带来的开发体验更丝滑的组合式 `API` 语法
* `Volar` 提供的单文件组件 `TypeScript IDE` 支持
* `vue-tsc` 提供的针对单文件组件的命令行类型检查和生成
* `Pinia` 提供的更简洁的状态管理
* 新的开发者工具扩展，同时支持 `Vue 2/Vue 3`，并且提供一个插件系统来允许社区库自行扩展开 - 发者工具面板。

了解更多：[zhuanlan.zhihu.com/p/460055155](https://link.juejin.cn/?target=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F460055155 "https://zhuanlan.zhihu.com/p/460055155")

\[1-22\] document.domain 被禁用
----------------------------

自 `Chrome 101` 版本开始，`document.domain` 将变为可读属性。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0e5d6a56c12141e6a681f34b4ae2f161~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

当两个页面的 `document.domain` 都设置为二级域名的时候，浏览器就会将两个来源视为同源，利用这个方法我们可以绕过浏览器的同源策略。

也就是意味着上述这种跨域的方式被禁用了，后续可以替换为 `postMessage` 的跨域方案。

了解更多：

* [Chrome 又搞事情，这种跨域方案要被禁用了！](https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzk0MDMwMzQyOA%3D%3D%26mid%3D2247492113%26idx%3D1%26sn%3Dcacc274e8c8756582e77582388be6665%26chksm%3Dc2e1173af5969e2c3513d2e1649f0f09ac79fd011155ae0f92883e4bbb9f9bb3cdb533fee100%26token%3D1851580176%26lang%3Dzh_CN%23rd "https://mp.weixin.qq.com/s?__biz=Mzk0MDMwMzQyOA==&mid=2247492113&idx=1&sn=cacc274e8c8756582e77582388be6665&chksm=c2e1173af5969e2c3513d2e1649f0f09ac79fd011155ae0f92883e4bbb9f9bb3cdb533fee100&token=1851580176&lang=zh_CN#rd")
* [developer.chrome.com/blog/immuta…](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.chrome.com%2Fblog%2Fimmutable-document-domain%2F "https://developer.chrome.com/blog/immutable-document-domain/")

\[2-13\] Node.js 支持 Fetch API
-----------------------------

`Fetch API` 是当前最流行的跨平台 `HTTP Client API` 。

在最新的 `Node.js v17.5` 版本中，增加了对 `Fetch API` 的支持，后续无需再借助 `axios、needle、node-fetch、request` 等第三方请求库了！

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7be15fa1ac59407c9d669f17c52bf24a~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

这并不是简单的支持了一个新的原生 `HTTP` 请求库那么简单，这意味着很多之前在 `Web` 中用到 `Fetch` 的 `NPM` 包也可以在 `Node.js` 里以同样的方式工作了，这些包同样可以实现跨平台兼容了～

了解更多：

* [Node.js 可以和 Web 实现 HTTP 请求的跨平台兼容了！](https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzk0MDMwMzQyOA%3D%3D%26mid%3D2247492540%26idx%3D1%26sn%3Dbefc8069f3276f4ac360f0c8cc0c7006%26chksm%3Dc2e11697f5969f8142bdf7c5805a3bcaf5c99c5095b9c144ccbfad8d97ea11a3f26bead84aa7%26token%3D1851580176%26lang%3Dzh_CN%23rd "https://mp.weixin.qq.com/s?__biz=Mzk0MDMwMzQyOA==&mid=2247492540&idx=1&sn=befc8069f3276f4ac360f0c8cc0c7006&chksm=c2e11697f5969f8142bdf7c5805a3bcaf5c99c5095b9c144ccbfad8d97ea11a3f26bead84aa7&token=1851580176&lang=zh_CN#rd")

\[2-27\] User-Agent 携带信息即将进行删减
------------------------------

为了减轻 `User-Agent` 的身份标识作用， `Chrome` 正在逐步减少 `User-Agent` 中的信息。

以下几部分信息都会逐步缩减：

* User-Agent HTTP 请求标头
* Javascript navigator.userAgentgetter
* Javascript navigator.platformgetter
* Javascript navigator.appVersiongetter

浏览器会推荐大家使用新的 `User-Agent Client`，里面只会包括下面几部分信息：

* `Sec-CH-UA`: 浏览器名称和主要/重要版本
* `Sec-CH-UA-Mobile`: 是否为移动设备
* `Sec-CH-UA-Platform`: 操作系统名称

例如，`Chrome/99.0.2345.12` 这样的版本号将会被简化为 `Chrome/99.0.0.0` ，这大大的减轻了 UA 对用户的身份标识作用。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fe1e4c9c50d54d6196593bd16f3d7cfa~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

具体减少计划：

`Chrome 92`：使用 navigator.userAgent 、navigator.appVersion 和 navigator.platform 会在控制台打印警告。

`Chrome 95`：支持为的网站注册原始试用，开始对减少的 UA 字符串进行测试和反馈。

`Chrome 101`：User-Agent 将会减少 Chrome MINOR.BUILD.PATCH 版本信息。推荐迁移到新的 User-Agent Client。

`Chrome 107`：PC端的 User-Agent 字符串和 JS API（navigator.userAgent 、navigator.appVersion 、navigator.platform）将会直接缩减。

`Chrome 110`：移动端的的 User-Agent 字符串和 JS API 将会缩减。

`Chrome 113`：全面缩减。

了解更多：

* [mp.weixin.qq.com/s/tCuioqZO0…](https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%2FtCuioqZO0as8jafcNx4qpA "https://mp.weixin.qq.com/s/tCuioqZO0as8jafcNx4qpA")

\[3-07\] JavaScript 将新增两个原始数据类型
-------------------------------

`JavaScript` 即将推出两个新的数据类型：`Record` 和 `Tuple` ，该提案目前已经到达 `Stage: 2`。

`Record` 和 `Tuple` 在用法上和对象、数据保持一致只不过他们是只读的：

```
// Record, 一个非常不可变的类对象结构
const myRecord = #{
 name: 'ConardLi',
 age: 23
}

myRecord.name = 'xxx'; // TypeError "Cannot assign to read only property 'name' of object '[object Object]'"

// Tuple, 一个非常不可变的类数组结构
const myTuple = #['1', '2', '3']

myTuple[0] = '4' // TypeError "Cannot assign to read only property '0' of object '[object Tuple]'"


```

另外还有一个很重要的点，当我们去比较 `Record` 和 `Tuple` 的值时，只会对比它们的值，而不再对比引用。

```
console.log(#{ a: 1, b: 2 } === #{ b: 2, a: 1 });

// true

```

了解更多：[github.com/tc39/propos…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Ftc39%2Fproposal-record-tuple "https://github.com/tc39/proposal-record-tuple")

\[3-08\] Chrome/Edge/Firefox/Safari 决定合力解决 Web 兼容性问题
------------------------------------------------------

浏览器制造商 `Apple、Google、Microsoft` 和 `Mozilla` ，以及软件公司 `Bocoup` 和 `Igalia` 正在合力制定一项名为 `Interop 2022` 的 `Web` 兼容性规范，以使 `Web` 技术和代码在不同的设备和浏览器中有统一的渲染效果（利好前端开发）。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5f1678f522204c118122f78410b9cf97~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

这是有史以来第一次，所有市场上主要的浏览器供应商和利益相关者齐心协力地解决浏览器兼容性问题。此前，互相为竞争关系的浏览器厂商常常在 `Web` 技术的兼容性上出现分歧，尤其是 `IE` 还活着的时候，前端一个页面三套代码的情况十分常见。

想要跟进规范的整体进度，可以查看 [Interop 2022 dashboard](https://link.juejin.cn/?target=https%3A%2F%2Fwpt.fyi%2Finterop-2022 "https://wpt.fyi/interop-2022")

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d79b355e78c342adb2213c1080c94366~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

了解更多：[web.dev/interop-202…](https://link.juejin.cn/?target=https%3A%2F%2Fweb.dev%2Finterop-2022%2F "https://web.dev/interop-2022/")

\[3-09\] TS 团队提议为 JS 增加类型注释提案
-----------------------------

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e8d451d6b93a4acea8cdc869b9afd51a~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

在过去的 `JavaScript` 调查报告中，静态类型一直是 `JavaScript` 开发者强烈要求的一个功能。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1e5537bca275477e976933576e94545e~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

微软 `TypeScript` 团队提出了一项新的提案，在提案中希望可以为 `JavaScript` 带来可选的类型注释语法。提案的目的是让开发者能够直接运行用 `TypeScript、Flow` 或其他静态类型库编写的程序，而不需要再编译一次。

如果提案能够顺利实施，将是 `JavaScript` 语法的一个重大变革，目前提案已经到达 `Stage: 1` 阶段。

提案地址：[github.com/tc39/propos…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Ftc39%2Fproposal-type-annotations "https://github.com/tc39/proposal-type-annotations")

\[3-16\] vue-cli 的依赖项被供应链投毒
---------------------------

`vue-cli` 的依赖项 `node-ipc` 包的作者 `RIAEvangelist` 是个反战人士，他特意新建了一个 `peacenotwar` 仓库来宣传他的反战理念。

更过分的是，作者不只添加了反战标语，还在 `node-ipc 10.1.1-10.1.2` 版本中添加了恶意 `JS` 文件删除俄罗斯和白俄罗斯用户文件：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ea804c580e99407da8a1a7695509a4bb~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

攻击源码在仓库中仍可找到。源码经过压缩，简单地将一些关键字符串进行了 `base64` 编码。其行为是利用第三方服务探测用户 `IP`，针对俄罗斯和白俄罗斯 `IP`，会尝试覆盖当前目录、父目录和根目录的所有文件，把所有内容替换成 ❤。

`node-ipc` 在 `npm` 上具有周百万次的下载量，这是又一次对脆弱的 `npm` 生态进行的一次沉痛打击。

了解更多：[百万周下载量的 npm 包以反战为名进行供应链投毒！](https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzk0MDMwMzQyOA%3D%3D%26mid%3D2247493206%26idx%3D1%26sn%3D78afbf19cd2d3ebbd546109561dc306f%26chksm%3Dc2e1137df5969a6b181da9890f690b6c1ef981c2f1a42a708690b7fabe90d42d8c12a68d8b16%26token%3D508079022%26lang%3Dzh_CN%23rd "https://mp.weixin.qq.com/s?__biz=Mzk0MDMwMzQyOA==&mid=2247493206&idx=1&sn=78afbf19cd2d3ebbd546109561dc306f&chksm=c2e1137df5969a6b181da9890f690b6c1ef981c2f1a42a708690b7fabe90d42d8c12a68d8b16&token=508079022&lang=zh_CN#rd")

\[3-22\] Cookie 新增 Partitioned 属性
---------------------------------

`Chrome` 将在 100 到 103 版本启动 `Cookie CHIPS` 试用版本！

`CHIPS` 指的是具有独立分区状态的 `Cookie`，它允许开发者将 Cookie 选择到“分区”存储中，每个顶级站点都有单独的 `Cookie jar``。CHIPS` 引入了一个新的 `Cookie` 属性：`Partitioned` ，它可以让顶级上下文（顶级站点或第 `First-Party Sets`）决定哪些 `Cookie` 进行分区。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fe6713aa477c47e69f4fa46a55397b65~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

例如：在站点 A 中通过 `iframe` 嵌入了一个站点 C，正常情况下如果三方 `Cookie` 被禁用后，C 是无法在 A 站点访问到它的 `Cookie` 的。如果 C 在它的 `Cookie` 上指定了 `Partitioned` 属性，这个 `Cookie` 将保存在一个特殊的分区 jar 中。它只会在站点 A 中通过 `iframe` 嵌入站点 C 时才会生效，浏览器会判定只会在顶级站点为 A 时才发送该 `Cookie`。当用户访问一个新站点时，例如站点 B，如果也它通过 `iframe` 嵌入了站点 C，这时在站点 B 下的站点 C 是无法访问到之前在 A 下面设置的那个 `Cookie` 的。

了解更多：[谁能帮我们顺利过渡到没有三方 Cookie 的未来？](https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzk0MDMwMzQyOA%3D%3D%26mid%3D2247493309%26idx%3D1%26sn%3Db037c33a1b9d434cc502ab380d453433%26chksm%3Dc2e11396f5969a805d63be30d50dfc8367da7484da252e343d74997a82bb187544eec76b3114%26token%3D1851580176%26lang%3Dzh_CN%23rd "https://mp.weixin.qq.com/s?__biz=Mzk0MDMwMzQyOA==&mid=2247493309&idx=1&sn=b037c33a1b9d434cc502ab380d453433&chksm=c2e11396f5969a805d63be30d50dfc8367da7484da252e343d74997a82bb187544eec76b3114&token=1851580176&lang=zh_CN#rd")

\[3-29\] React 18 正式版发布
-----------------------

2022年3月29号，`React18` 正式版发布。

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/95f42a3a898142eeb26c6c266c4cbc54~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

* 新的 `ReactDOM.createRoot() API`（替换 `ReactDOM.render()`）
* 新的 `startTransition API`（用于非紧急状态更新）
* 渲染的自动批处理优化（主要解决异步回调中无法批处理的问题）
* 支持 `React.lazy` 的 全新 `SSR` 架构（支持 `<Suspense>` 组件）

了解更多：[reactjs.org/blog/2022/0…](https://link.juejin.cn/?target=https%3A%2F%2Freactjs.org%2Fblog%2F2022%2F03%2F29%2Freact-v18.html "https://reactjs.org/blog/2022/03/29/react-v18.html")

\[4-06\] Chrome 100 发布
----------------------

版本号分析可能出现的问题： [Chrome 版本即将突破100 ？这个问题不容忽视！](https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzk0MDMwMzQyOA%3D%3D%26mid%3D2247490936%26idx%3D1%26sn%3D9701cf4d62997b39954bc3374b2ceb56%26chksm%3Dc2e2e853f595614549d34fd91c9122f3114ce1e2ffd31201af648416b5e62130a1138eecc3cc%26scene%3D21%26cur_album_id%3D2160442714947911680%23wechat_redirect "https://mp.weixin.qq.com/s?__biz=Mzk0MDMwMzQyOA==&mid=2247490936&idx=1&sn=9701cf4d62997b39954bc3374b2ceb56&chksm=c2e2e853f595614549d34fd91c9122f3114ce1e2ffd31201af648416b5e62130a1138eecc3cc&scene=21&cur_album_id=2160442714947911680#wechat_redirect")

`Google` 发布了 `Web 100` 个令人激动的瞬间 ( [developer.chrome.com/100/](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.chrome.com%2F100%2F "https://developer.chrome.com/100/") )，同时也在推特上发起了 `#100CoolWebMoments` 活动。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4269155f42734fc2a39b58bcaaf6e6d9~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

`Chrome 100` 将是最后一个默认支持未删减的 `User-Agent` 字符串的版本。`Chrome` 推荐大家用新的 `User-Agent Client Hints API` 替换 `User-Agent` 字符串。

了解更多：[Chrome 100：有风险也有机遇！](https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzk0MDMwMzQyOA%3D%3D%26mid%3D2247493663%26idx%3D1%26sn%3D27aece8a3e4aa17af2244a3ecdae9f12%26chksm%3Dc2e11d34f59694226f60b760c605f57309ccec6dd2f6852c010d22f689aa41a9c79d0bcabb1a%26token%3D1851580176%26lang%3Dzh_CN%23rd "https://mp.weixin.qq.com/s?__biz=Mzk0MDMwMzQyOA==&mid=2247493663&idx=1&sn=27aece8a3e4aa17af2244a3ecdae9f12&chksm=c2e11d34f59694226f60b760c605f57309ccec6dd2f6852c010d22f689aa41a9c79d0bcabb1a&token=1851580176&lang=zh_CN#rd")

\[4-10\] ShadowRealm API 进入 statge3 阶段
--------------------------------------

`ShadowRealm API` 是一个新的 `JavaScript` 提案，目前已进入 `statge3`。

它允许一个 `JS` 运行时创建多个高度隔离的 JS 运行环境（`realm`），每个 `realm` 具有独立的全局对象和内建对象。

每个 `ShadowRealm` 实例都有自己独立的运行环境，它提供了两种方法让我们来执行运行环境中的代码：

* `.evaluate()`：同步执行代码字符串，类似 `eval()`。
* `.importValue()`：返回一个 `Promise` 对象，异步执行代码字符串。

```
const sr = new ShadowRealm();
console.assert(
  sr.evaluate(`'ab' + 'cd'`) === 'abcd'
);


```

了解更多：

* [blog.conardli.top/2022/04/10/…](https://link.juejin.cn/?target=https%3A%2F%2Fblog.conardli.top%2F2022%2F04%2F10%2Fjavascript%2Fshadowrealam%2F "https://blog.conardli.top/2022/04/10/javascript/shadowrealam/")
* [2ality.com/2022/04/sha…](https://link.juejin.cn/?target=https%3A%2F%2F2ality.com%2F2022%2F04%2Fshadow-realms.html "https://2ality.com/2022/04/shadow-realms.html")
* [dev.to/smpnjn/futu…](https://link.juejin.cn/?target=https%3A%2F%2Fdev.to%2Fsmpnjn%2Ffuture-javascript-shadowrealms-20mg "https://dev.to/smpnjn/future-javascript-shadowrealms-20mg")

\[4-17\] Change Array by copy 提案进入 `stage3`
-------------------------------------------

`Change Array by copy` 提案，目前已经处于 `stage3` 阶段。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/da258310464f4b5ca894cd8f3759e039~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

该提案为数组新增了四个非破坏性（不改变原数组）方法：

* `toSorted()`：`.sort()` 的非破坏性版本；
* `toReversed()`：`.reverse()` 的非破坏性版本；
* `with()`：对数组的某个元素赋值操作的非破坏性版本；
* `toSpliced()`：`.splice()` 的非破坏性版本。

了解更多：

* [github.com/tc39/propos…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Ftc39%2Fproposal-change-array-by-copy "https://github.com/tc39/proposal-change-array-by-copy")
* [blog.conardli.top/2022/04/17/…](https://link.juejin.cn/?target=https%3A%2F%2Fblog.conardli.top%2F2022%2F04%2F17%2Fjavascript%2Farray-method%2F "https://blog.conardli.top/2022/04/17/javascript/array-method/")

\[4-19\] HTML 新增比 iframe 更安全的 fencedframe 标签
--------------------------------------------

`Fenced frames` 是一项 [隐私沙盒](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FWICG%2Ffenced-frame "https://github.com/WICG/fenced-frame") 提案，它建议顶级站点应该对数据进行分区。

`Chrome` 从 `97` 版本开始对 `Fenced frames` 提供支持。

它是一个新的 `HTML` 标签，使用方式和 `iframe` 类似：

```
<fencedframe src="conardli.html"></fencedframe>

```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/488c01fb47ed4b8897206f2e75f80ea8~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

从对比上来看，`iframe` 还是要更灵活的，`Fenced frames` 是无法取代 `iframe` 的，但是当我们需要在同一页面上显示来自不同顶级分区的数据时，建议使用 Fenced frames 作为更私有的嵌入框架。

如果嵌入的网页是受信任的，还是用 `iframe` 即可。

了解更多：

* [blog.conardli.top/2022/04/19/…](https://link.juejin.cn/?target=https%3A%2F%2Fblog.conardli.top%2F2022%2F04%2F19%2Fweb%2Ffencedframe%2F "https://blog.conardli.top/2022/04/19/web/fencedframe/")
* [github.com/WICG/fenced…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FWICG%2Ffenced-frame "https://github.com/WICG/fenced-frame")
* [developer.chrome.com/docs/privac…](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.chrome.com%2Fdocs%2Fprivacy-sandbox%2Ffenced-frame%2F%23browser-support "https://developer.chrome.com/docs/privacy-sandbox/fenced-frame/#browser-support")

\[4-25\] Chrome 支持 Priority Hints，可控制网页资源加载优先级
----------------------------------------------

`Chrome 101` 正式发布了 `Priority Hints`，用于指定页面资源的加载优先级，即 `fetchpriority` 属性，帮助浏览器根据优先级优化加载顺序，从而优化页面加载体验。

当浏览器开始解析网页，并开始下载图片、`Script` 以及 `CSS` 等资源的时候，浏览器会为每个资源分配一个代表资源下载优先级的 `fetch priority` 标志，而默认的资源下载顺序就取决于这个优先级标志。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f5cc124ecaa542db99be7f444d0d6a21~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

另外浏览器还给我们提供了一些诸如 `async、defer、preload` 等主动干预资源下载优先级的能力，但是有些场景还是满足不了：比如网页首屏有多张轮播图，我们只希望提高第一张图片下载的优先级；`CSS、Font` 资源默认有相同的优先级，但是并不是所有 `CSS` 和 `Font` 资源都是一样重要的。

这个时候， `Priority Hints` 就派上用场了。

了解更多：[如何控制Web资源加载的优先级？](https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzk0MDMwMzQyOA%3D%3D%26mid%3D2247490994%26idx%3D1%26sn%3Dcc964d58400999c43235f76b10c1fb57%26chksm%3Dc2e2e899f595618fd3775f4634b4638870c199b065b77f89666d1f713f35186bc3097e7548ce%26token%3D714052344%26lang%3Dzh_CN%23rd "https://mp.weixin.qq.com/s?__biz=Mzk0MDMwMzQyOA==&mid=2247490994&idx=1&sn=cc964d58400999c43235f76b10c1fb57&chksm=c2e2e899f595618fd3775f4634b4638870c199b065b77f89666d1f713f35186bc3097e7548ce&token=714052344&lang=zh_CN#rd")

\[5-04\] React 计划支持 useEvent Hook（随后夭折）
---------------------------------------

`React` 的核心开发者 `Dan` 为 `React` 增加了一项新的提案 `useEvent`。

目的是为了解决下面这个场景：

```
function Chat() {
  const [text, setText] = useState('');

  // 🟡 每次 text 变化都会产生新的函数引用
  const onClick = useCallback(() => {
    sendMessage(text);
  }, [text]);

  return <SendButton onClick={onClick} />;
}

```

当我们使用 `useCallback` 包裹事件处理函数时，每次状态发生变化，都会产生一个新的引用。

```
function Chat() {
  const [text, setText] = useState('');

  // ✅ 永远是同一个函数引用
  const onClick = useEvent(() => {
    sendMessage(text);
  });

  return <SendButton onClick={onClick} />;
}

```

使用 `useEvent` 包裹事件处理函数，可以让我们每次都能获取到最新的状态，而且状态变更后不会产生新的函数引用。

提案地址：[github.com/reactjs/rfc…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Freactjs%2Frfcs%2Fblob%2Fuseevent%2Ftext%2F0000-useevent.md "https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md")

当然，这个提案最终还是在 `9` 月份夭折了，因为它最大的问题是它相当于引入了一个新的概念，会增加 `Hooks` 的使用理解成本，你可能会从要不要使用 `useCallback` 的选择中增加一个要不要使用 `useEvent` ...

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/246bd404971a40199524c5ac9b98c7d9~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

所以 `React` 团队计划发布一个不同的、范围更小的 RFC 来取代这个 RFC。

\[5-16\] 浏览器最新私有预取代理方案，LCP 提升30%
---------------------------------

为了实现更安全隐私的数据预取，`Google` 提出了一种新的数据预取方案：`Private prefetch proxy`（私有预取代理），`Google Search` 已经实施了这项方案，导航的 `LCP` 预计有 `20%-30%` 的提升！

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f880e28978d1484ebaed7a7f47286cc3~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

此方案具有较好的安全性，可防止代理抓包、防止用户识别，并且可以更好的和浏览器缓存进行结合。

了解更多：[Google 最新的性能优化方案，LCP 提升30%！](https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzk0MDMwMzQyOA%3D%3D%26mid%3D2247494414%26idx%3D1%26sn%3Dc977828b3cc847e97a758f4b64f7195c%26chksm%3Dc2e11e25f596973355041345ed2cdffb1c26d2d0138077443a1cac98338cbd28850df72e617a%26token%3D1851580176%26lang%3Dzh_CN%23rd "https://mp.weixin.qq.com/s?__biz=Mzk0MDMwMzQyOA==&mid=2247494414&idx=1&sn=c977828b3cc847e97a758f4b64f7195c&chksm=c2e11e25f596973355041345ed2cdffb1c26d2d0138077443a1cac98338cbd28850df72e617a&token=1851580176&lang=zh_CN#rd")

\[5-25\] HTML 新增 inert 属性
-------------------------

`Safari 15.5、Chrome 102、Firefox Nightly` 目前均对 `HTML inert` 属性提供了支持。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f502ad0f786b465cac2e81cc9b6167cf~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

```
<div inert>
  <label for="button2">codemmhy</label>
  <button id="button2">I am inert</button>
</div>

```

`inert` 是一个全局的 `HTML` 属性，它可以告诉浏览器忽略元素的用户输入事件，包括焦点事件和来自辅助技术的其他事件。主要是下面两种用例：

* 元素是 `DOM` 树的一部分，但在屏幕外或隐藏；
* 元素是 `DOM` 树的一部分，但应该是非交互的。

`inert` 主要是为了提升网页的可访问性，比如对于视力障碍的人，他不是依靠视觉来感知网页内容，而是借助了一些其他的辅助技术，再之前就有可能会和我们隐藏掉的内容进行一些意外的交互。

而 `inert` 可以让我们能够从选项卡顺序和可访问性树中直接删除元素，这就会避免上面的问题！

了解更多：

* [github.com/WICG/inert](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FWICG%2Finert "https://github.com/WICG/inert")
* [Chrome 102：新增两个 HTML 属性、两个 JS API !](https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzk0MDMwMzQyOA%3D%3D%26mid%3D2247494855%26idx%3D1%26sn%3D2b9ef8fd743efeca59ac9ddb8f26b261%26chksm%3Dc2e119ecf59690fad6a06dbb0cfa1306da5d92de0927f853e43605c71d9014f568d64e520121%26token%3D1558566151%26lang%3Dzh_CN%23rd "https://mp.weixin.qq.com/s?__biz=Mzk0MDMwMzQyOA==&mid=2247494855&idx=1&sn=2b9ef8fd743efeca59ac9ddb8f26b261&chksm=c2e119ecf59690fad6a06dbb0cfa1306da5d92de0927f853e43605c71d9014f568d64e520121&token=1558566151&lang=zh_CN#rd")

\[6-05\] 浏览器支持直接运行 Python 代码
----------------------------

在 `PyCon US 2022` `的主题演讲中，Anaconda` 的 `CEO` `Peter Wang` 公布了一个相当令人兴奋的项目 — `PyScript`。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a32c0812c07e4fb69ccbee0a24a86d5f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

`PyScript` 是一个 `JavaScript` 框架，可以为开发者提供了在标准 `HTML` 中嵌入编写 `Python` 代码的能力、使用 `Python` 调用 `JavaScript` 函数库，以及创建 `Python Web` 应用。

这意味着后续我们可以在浏览器直接运行 `Python` 代码。

了解更多：[pyscript.net/](https://link.juejin.cn/?target=https%3A%2F%2Fpyscript.net%2F "https://pyscript.net/")

\[6-06\] HTTP/3 标准化为 RFC 9114
-----------------------------

`IETF QUIC` 和 `HTTP` 工作组成员 `Robin Mark` 在推特上宣布，历时5年，`HTTP/3` 终于被标准化为 `RFC 9114`，这是 `HTTP` 超文本传输协议的第三个主要版本。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e7c5164e70ac426ead4d1291602051a7~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

`HTTP/3` 采用了谷歌多年探索的基于 `UDP` 的 `QUIC` 协议，原名叫 `HTTP-over-QUIC`，在 `2018` 年被 `IETF` 批准更名为 `HTTP/3`。目前，`Chrome、Firefox` 等主流浏览器均表示支持 `HTTP/3`

`IETF` 标准地址：[www.rfc-editor.org/rfc/rfc9114…](https://link.juejin.cn/?target=https%3A%2F%2Fwww.rfc-editor.org%2Frfc%2Frfc9114.html "https://www.rfc-editor.org/rfc/rfc9114.html")

\[6-13\] WWDC 2022：WebKit 发布多项新能力
---------------------------------

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c43fffcc018b49afa7a0c33ef543fb4a~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

在本届苹果全球开发者大会（`WWDC 2022`） 中，苹果宣布了 `Safari 16 beta` 版本的发行， `WebKit` 带来了诸多新的 Web 能力，包括：

* 支持 `Web Inspector Extensions`
* 支持容器查询
* 支持 `macOS` 的 `Web` 推送
* 支持 `CSS` 子网格布局
* 支持 `Flexbox Inspector`
* 可访问性、动画效果改进
* ...

了解更多：[WWDC 2022：哪些是前端开发者要关注的信息？](https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzk0MDMwMzQyOA%3D%3D%26mid%3D2247494848%26idx%3D1%26sn%3D90e7c86c1db93b0b3c2ef11026150ad4%26chksm%3Dc2e119ebf59690fd96bcb9d8ae070a2dcf0dd94bc971f23335da9d3f575274c022e6eafb8ad8%26token%3D1851580176%26lang%3Dzh_CN%23rd "https://mp.weixin.qq.com/s?__biz=Mzk0MDMwMzQyOA==&mid=2247494848&idx=1&sn=90e7c86c1db93b0b3c2ef11026150ad4&chksm=c2e119ebf59690fd96bcb9d8ae070a2dcf0dd94bc971f23335da9d3f575274c022e6eafb8ad8&token=1851580176&lang=zh_CN#rd")

\[6-15\] IE 正式宣布退役
-------------------

`27` 岁的微软 `IE` 浏览器宣告退役。6月15日晚，微软 `Edge` 浏览器在官网宣布，微软正式结束对网页浏览软件 `“Internet Explorer（IE）”` 的支持，`IE` 浏览器正式退役了。发布于 `1995` 年夏天的 `IE` ，最终在 `2022` 年的夏天，结束了它的旅程。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/843a426b744a4e57b453f691349afe09~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

了解更多：[微软官方声明](https://link.juejin.cn/?target=https%3A%2F%2Fblogs.windows.com%2Fwindowsexperience%2F2022%2F06%2F15%2Finternet-explorer-11-has-retired-and-is-officially-out-of-support-what-you-need-to-know%2F "https://blogs.windows.com/windowsexperience/2022/06/15/internet-explorer-11-has-retired-and-is-officially-out-of-support-what-you-need-to-know/")

\[6-17\] Chrome 正式支持 File Handling API、Navigation API
-----------------------------------------------------

`Chrome 102` 版本正式支持了 `File Handling API`、`Navigation API`

`File Handling API` 可以让已安装的 `PWA` 向操作系统注册文件处理程序。注册后，用户就可以单击文件然后使用已安装的 `PWA` 打开它了。这非常适合与文件交互的 `PWA` 程序，例如图像编辑器、IDE、文本编辑器等。

想要让你的 `PWA` 支持文件处理功能，你需要更新一下 `web app manifest`，添加一个 `file_handlers` 数组，其中包含有关你的 PWA 可以处理的文件类型的详细信息。你需要指定要打开的 `URL、MIME` 类型、文件类型的图标和启动类型。启动类型定义是否应在单个客户端或多个客户端中打开多个文件。

```
"file_handlers": [
  {
    "action": "/open-csv",
    "accept": {"text/csv": [".csv"]},
    "icons": [
      {
        "src": "csv-icon.png",
        "sizes": "256x256",
        "type": "image/png"
      }
    ],
    "launch_type": "single-client"
  }
]

```

然后，想要在 `PWA` 启动时访问这些文件，你需要为 `launchQueue` 对象指定一个使用者。启动被排队，直到它们被消费者处理。

```
// Access from Window.launchQueue.
launchQueue.setConsumer((launchParams) => {
  if (!launchParams.files.length) {
    // Nothing to do when the queue is empty.
    return;
  }
  for (const fileHandle of launchParams.files) {
    // Handle the file.
    openFile(fileHandle);
  }
});

```

在很多 `Web` 开发的场景下，我们需要在没有网页中的导航的情况下去更新页面的 `URL`，特别是在 `SPA` 应用里面，我们在切换了导航之后，不希望刷新网页，只更新页面中的内容。之前我们一般都是用 `History API` 去实现的。

```
let stateObj = {
    data: "ConardLi",
}

history.pushState(stateObj, "home", "bar.html")

```

但是用过的都知道，这玩意实在是太难用了，而且还很笨重，也容易出现问题。`Navigation API` 提供了一种更友好的方式来帮助我们操作网页的导航。

要使用 `Navigation API`，我们需要在全局对象上添加一个 `navigate` 监听器。

```
navigation.addEventListener('navigate', (navigateEvent) => {
  switch (navigateEvent.destination.url) {
    case 'https://blog.conardli.top/':
      navigateEvent.transitionWhile(loadIndexPage());
      break;
    case 'https://www.conardli.top/':
      navigateEvent.transitionWhile(loadCatsPage());
      break;
  }
});

```

这个事件采用了集中处理的机制：它会被所有类型的导航触发，无论是用户执行了一个动作（例如点击链接、提交表单或返回和前进）还是以代码的方式触发导航。在大多数情况下，它会让你的代码覆盖浏览器对该操作的默认行为。对于 `SPA`，这可能意味着让用户保持在同一页面上并加载或更改网站的内容。

了解更多：

* [github.com/WICG/naviga…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FWICG%2Fnavigation-api "https://github.com/WICG/navigation-api")
* [chromestatus.com/feature/572…](https://link.juejin.cn/?target=https%3A%2F%2Fchromestatus.com%2Ffeature%2F5721776357113856 "https://chromestatus.com/feature/5721776357113856")
* [Chrome 102：新增两个 HTML 属性、两个 JS API !](https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzk0MDMwMzQyOA%3D%3D%26mid%3D2247494855%26idx%3D1%26sn%3D2b9ef8fd743efeca59ac9ddb8f26b261%26chksm%3Dc2e119ecf59690fad6a06dbb0cfa1306da5d92de0927f853e43605c71d9014f568d64e520121%26token%3D1558566151%26lang%3Dzh_CN%23rd "https://mp.weixin.qq.com/s?__biz=Mzk0MDMwMzQyOA==&mid=2247494855&idx=1&sn=2b9ef8fd743efeca59ac9ddb8f26b261&chksm=c2e119ecf59690fad6a06dbb0cfa1306da5d92de0927f853e43605c71d9014f568d64e520121&token=1558566151&lang=zh_CN#rd")

\[6-24\] ECMAScript 2022 正式发布
------------------------------

`2022` 年 6 月 22 日，第 123 届 ECMA 大会批准了 `ECMAScript 2022` 语言规范，这意味着它现在正式成为标准。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/df48154fb0614bd88693e514663e2c7e~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

主要特性：

* `Top-level Await`：允许我们在 `async` 函数外面使用 `await` 关键字；
* `Object.hasOwn()`：一种更简洁、更可靠的检查属性是否直接设置在对象上的方法；
* `at()`：通过给定索引来获取数组元素；
* 正则表达式匹配索引：允许我们利用 d 字符来表示我们想要匹配字符串的开始和结束索引；
* 类的公共实例字段：允许我们使用赋值运算符 (=) 将实例属性添加到类定义中
* 类的私有实例字段、方法：只允许类内部访问；
* 类的静态公共字段：使用 static 关键字声明静态类字段。

了解更多：[262.ecma-international.org/](https://link.juejin.cn/?target=https%3A%2F%2F262.ecma-international.org%2F "https://262.ecma-international.org/")

\[6-28\] Deno 推出新一代全栈框架 Fresh
-----------------------------

`Fresh` 是一个面向 `JavaScript` 和 `TypeScript` 开发人员的全栈现代 `Web` 框架，基于 `Deno` 运行时，前端渲染基于 `Preact`，由 `Deno` 原班人马开发，它的核心是路由框架和模板引擎的组合，可在服务器上按需渲染页面。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aef53b8073154fd6981d49f7a0cd0a4a~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

`Fresh` 可以在运行时做到按需构建，代码可以直接在服务器和客户端上运行。例如将 `TypeScript` 或 `JSX` 转换为纯 `JavaScript` 都可以在运行时按需完成，可以实现非常快速的迭代和部署。

了解更多：

* [fresh.deno.dev/](https://link.juejin.cn/?target=https%3A%2F%2Ffresh.deno.dev%2F "https://fresh.deno.dev/")
* [github.com/denoland/fr…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fdenoland%2Ffresh "https://github.com/denoland/fresh")

\[7-11\] 新一代 javaScript 运行时 Bun.js 发布
-------------------------------------

近日，新一代 `javaScript` 运行时 `Bun.js` 发布了。和传统的 `Node.js` 这种传统的 `javaScript` 运行时不同，`Bun.js` 直接内置了打包器、转译器、任务运行器和 npm 客户端，这意味着你不再需要 `Webpack/Rollup/esbuild/Snowpack/Parcel/Rome/swc/babel` 就可以直接运行 `TypeScript、JSX`！

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/52f33cd3dd324c94865bd77754a8599a~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

另外，`Bun.js` 原生支持了数百个 `Node.js` 和 `Web API`，包括约 `90%` 的 `Node-API` 函数(`fs、path、Buffer` 等)。

`Bun.js` 的目标是可以在浏览器之外的其他地方运行世界上大多数 `JavaScript`，为你未来的基础架构带来性能和复杂性的增强，并通过更好、更简单的工具提高开发者的生产力！

了解更多：

* [bun.sh/](https://link.juejin.cn/?target=https%3A%2F%2Fbun.sh%2F "https://bun.sh/")
* [mp.weixin.qq.com/s/OqSYo4aig…](https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%2FOqSYo4aigAYXYfhU-iEWhg "https://mp.weixin.qq.com/s/OqSYo4aigAYXYfhU-iEWhg")

\[7-15\] Vite 3.0 发布
--------------------

`2021` 年 `2` 月，`Evan You` 式推出了 `Vite 2.0` 版本，自此之后 `Vite` 生态飞速增长，很快达到了每周 `100` 万的 `npm` 下载量，距离 `v2` 发布 `16` 个月，`Vite 3` 正式发布！

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/da1712c8c23c47c48a381a22220fbd47~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

主要更新如下：

* 全新的 `VitePress` 文档
* 开发阶段优化
  * `Vite CLI` 优化，默认端口变更为 `5173`
  * 改进 `WebSocket` 连接策略
  * 冷启动性能优化
  * `import.meta.glob` 语法更新
* 构建阶段优化
  * `SSR` 产物默认使用 `ESM`
  * 支持 `Relative Base`
* 实验功能
  * 资产路径细粒度控制
  * `Esbuild` 构建时优化
  * `HMR Partial Accept`

了解更多：[vitejs.dev/blog/announ…](https://link.juejin.cn/?target=https%3A%2F%2Fvitejs.dev%2Fblog%2Fannouncing-vite3.html "https://vitejs.dev/blog/announcing-vite3.html")

> 在今年的 12 月份，Vite 又发布了 4.0 版本，不过相比 3.0 版本更新范围较小，所以不过多介绍

\[7-16\] Chrome 对 HTTP 103 状态码提供支持
----------------------------------

`HTTP 103` 状态码 (`Early Hints`) 是一个信息性 HTTP 状态代码，可以用于在最终响应之前发送一个初步的 `HTTP` 响应，它可以算作 `HTTP/2 Server Push` 的升级改良版。

利用 `HTTP 103` 状态码，可以让服务器在服务器处理主资源的同时向浏览器发送一些关键子资源（JavaScript、CSS 或字体文件）或页面可能使用的其他来源的提示。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/24fbfa17815b4b9080d942754c2053eb~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

浏览器可以使用这些提示来预热连接，并在等待主资源响应的同时请求子资源。换句话说，`Early Hints` 可以通过提前做一些工作来帮助浏览器利用这种服务器思考时间，从而提升页面的渲染性能。

`Chrome` 宣布在 `Chrome 103` 版本对 `HTTP 103` 状态码提供了支持。

了解更多：

* [blog.conardli.top/2022/07/16/…](https://link.juejin.cn/?target=https%3A%2F%2Fblog.conardli.top%2F2022%2F07%2F16%2Fweb%2Fhttp103%2F "https://blog.conardli.top/2022/07/16/web/http103/")
* [developer.chrome.com/blog/early-…](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.chrome.com%2Fblog%2Fearly-hints%2F "https://developer.chrome.com/blog/early-hints/")
* [github.com/bashi/early…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fbashi%2Fearly-hints-explainer "https://github.com/bashi/early-hints-explainer")
* [httpd.apache.org/docs/2.4/ho…](https://link.juejin.cn/?target=https%3A%2F%2Fhttpd.apache.org%2Fdocs%2F2.4%2Fhowto%2Fhttp2.html "https://httpd.apache.org/docs/2.4/howto/http2.html")

\[7-29\] Firefox 支持了 backdrop-filter
------------------------------------

`Firefox 103` 版本正式支持了 `backdrop-filter` 属性，可以轻松实现一个毛玻璃效果。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/562e029705f54342b0f58d5b1417dc3d~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

`Firefox` 是最后一个支持 `backdrop-filter` 属性的浏览器，目前所有浏览器均已对它提供支持。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/43bfe697bc8247fd831f83045c996a99~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

了解更多：[developer.mozilla.org/en-US/docs/…](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FCSS%2Fbackdrop-filter "https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter")

\[8-03\] 容器查询和 `:has()` 属性
--------------------------

`Chrome 105` 新增了容器查询和 `:has()` 属性，这兄弟俩可以让我们能够查询父选择器的大小和样式信息，同时使子元素可以拥有响应式样式逻辑。有点类似 `@media` 查询，区别是它们根据的是容器的大小而不是视口的大小进行判断的。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f52e1faa4ef94ce09977416c495090e2~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

要使用容器查询，我们可以在卡片容器上设置 `container-type` 为 `inline-size`：

```
.ard-container {
  container-type: inline-size;
}

```

然后我们就可以使用 `@container` 将该容器的样式应用到它的任何子节点：

```
.card {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

@container (max-width: 400px) {
  .card {
    grid-template-columns: 1fr;
  }
}

```

当容器小于 `400px` 时，它就会切换到单列布局。

我们可以使用 `:has()` 伪类更进一步，它可以让我们检查父元素是否包含具有特定参数的子元素。例如，`p:has(span)` 表示一个段落选择器，你可以使用它来设置父段落本身或其中的任何内容的样式。

```
p:has(span) {
  /* magic styles */
}

figure:has(figcaption) {
  /* this figure has a figcaption */
}

```

了解更多：[developer.chrome.com/blog/has-wi…](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.chrome.com%2Fblog%2Fhas-with-cq-m105%2F "https://developer.chrome.com/blog/has-with-cq-m105/")

\[8-11\] Islands 架构框架 Astro 1.0 正式发布
------------------------------------

`Astro` 是一个新型的 `SSR` 框架，它的测试版已经运行一年多。近期 `Astro 1.0` 终于发布了正式版本！

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/263e15a53e524e6caa8f64d12a9c012d~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

`Astro` 采用了独特的 `Island` 组件架构，团队称这是一种用于构建更快网站的新型 `Web` 架构。与传统的 `SPA` 不同，`Astro` 的组件不会被打包到一个 `JavaScript` 文件中。相反，每个组件都被视为一个独立的小型应用程序，与所有其他组件隔离存在。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/05b393f68f4744859e1436f02253aeb5~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

了解更多：

* [github.com/withastro/a…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fwithastro%2Fastro "https://github.com/withastro/astro")
* [docs.astro.build/en/getting-…](https://link.juejin.cn/?target=https%3A%2F%2Fdocs.astro.build%2Fen%2Fgetting-started%2F "https://docs.astro.build/en/getting-started/")

\[8-18\] HTTP/2 Server Push 将被删除
--------------------------------

`Server Push` 即在浏览响应 `HTML` 文件的时候，服务器会同时将所需的资源文件主动推送给浏览器。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e84cc94eaad742c48e3b4737e9b149f8~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

浏览器在收到推送的资源之后会缓存到本地。等解析 `HTML` 发现需要加载对应资源的时候会直接从本地读取，不必再等待网络传输了。

虽然这听起来很神奇，但这个方案有非常大的缺陷：`Server Push` 很难避免推送浏览器已经拥有的子资源，其实很多资源在浏览器第一次请求到就已经缓存下来了。这种 “过度推动” 会导致网络带宽的使用效率降低，从而显着阻碍性能优势。总体而言，Chrome 数据显示 `HTTP2/Push` 实际上对整个网络的性能产生了负面影响。

`Chrome` 宣布将在下一个主要版本（`Chrome 106`）中将删除对其的支持。

了解更多：[developer.chrome.com/blog/removi…](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.chrome.com%2Fblog%2Fremoving-push%2F "https://developer.chrome.com/blog/removing-push/")

\[10-13\] React 新提案：use Hook
----------------------------

就在 `useEvent Hook` 刚刚夭折不久，`React` 又计划提供新一个新的 Hook：`use`，是的就叫 `use`，它可以让开发者更轻松的使用 `Suspense` 访问任意异步数据源。

正常情况下我们在 `JavaScript` 中请求异步数据一般要借助 `Promise`，对应的函数就要使用 `async` 和 `await`：

```
async function Note({id, isEditing}) {
  const note = await db.posts.get(id);
  return (
    <div>
      <h1>{note.title}</h1>
      <section>{note.body}</section>
      {isEditing ? <NoteEditor note={note} /> : null}
    </div>
  );
}

```

而新增的 `use Hook`，你可以类比为 `await`，正如 `await` 只能在 `async` 函数内部使用一样，`use` 只能在 `React` 组件和 `Hooks` 内部使用，而且你可以嵌套在条件、块和循环中使用，而无需将逻辑拆分为单独的组件，这使得我们在 `React` 中编写异步代码变得非常灵活：

```
function Note({id, shouldIncludeAuthor}) {
  const note = use(fetchNote(id));

  let byline = null;
  if (shouldIncludeAuthor) {
    const author = use(fetchNoteAuthor(note.authorId));
    byline = <h2>{author.displayName}</h2>;
  }

  return (
    <div>
      <h1>{note.title}</h1>
      {byline}
      <section>{note.body}</section>
    </div>
  );
}

```

了解更多：

* [第一个可以在条件语句中使用的原生hook诞生了](https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzkzMjIxNTcyMA%3D%3D%26mid%3D2247491296%26idx%3D1%26sn%3D82463fec673615856333e87d6460ca26%26chksm%3Dc25e7027f529f931b9a259dd94cfa7e6c0997fd9cd5d699c47e0881c6bda3955293c8f674bcb%23rd "https://mp.weixin.qq.com/s?__biz=MzkzMjIxNTcyMA==&mid=2247491296&idx=1&sn=82463fec673615856333e87d6460ca26&chksm=c25e7027f529f931b9a259dd94cfa7e6c0997fd9cd5d699c47e0881c6bda3955293c8f674bcb#rd")
* [github.com/acdlite/rfc…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Facdlite%2Frfcs%2Fblob%2Ffirst-class-promises%2Ftext%2F0000-first-class-support-for-promises.md "https://github.com/acdlite/rfcs/blob/first-class-promises/text/0000-first-class-support-for-promises.md")

\[10-13\] Lerna V6 发布
---------------------

`Lerna` 曾经是最流行的 `JS monorepo` 工具之一，在去年 `Lerna` 的核心作者提到了 `Learn` 已经基本不再维护，在今年 5 月份，`Nrwl` 宣布接管了 `Lerna` 。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f70e40b812184452a729cc1c7b90f7ac~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

随后，`Nrwl` 接管 `Lerna` 后发布了第一个全新的正式版本 `Lerna v6`，推出了新的网站，并宣布让 `Lerna` 的速度提高了 10 倍！

了解更多：[复活了！ Lerna V6 带来了哪些新东西？](https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzk0MDMwMzQyOA%3D%3D%26mid%3D2247496055%26idx%3D1%26sn%3Db60a5d97a888d9ea79be088f85e556c9%26chksm%3Dc2e1045cf5968d4a416d49ede283d1bf5d3d0f8a5b0705bb1a9abba20b1789e3b0577615ca75%23rd "https://mp.weixin.qq.com/s?__biz=Mzk0MDMwMzQyOA==&mid=2247496055&idx=1&sn=b60a5d97a888d9ea79be088f85e556c9&chksm=c2e1045cf5968d4a416d49ede283d1bf5d3d0f8a5b0705bb1a9abba20b1789e3b0577615ca75#rd")

\[10-25\] Chrome 107：支持识别渲染阻塞资源
-------------------------------

对页面性能的可靠洞察对于我们构建好的用户体验是至关重要的，在以前，我们通常会依靠一些复杂的启发式方法来确定资源是否阻塞页面的渲染。

在 `Chrome 107` ，`Performance API` 新增了一个 `renderBlockingStatus` 属性，这个属性会提供来自浏览器的直接信号，用于识别阻塞页面渲染的资源，直到它们被下载下来。

下面的代码片段显示了如何获取所有资源的列表并使用新的 `renderBlockingStatus` 属性列出所有阻塞页面渲染的资源。

```
// 获取所有资源
const res = window.performance.getEntriesByType('resource');

// 过滤出阻塞渲染的资源
const blocking =   res.filter(({renderBlockingStatus}) =>
      renderBlockingStatus === 'blocking');

```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9bfd265c591b4a72b44c897d43978d4c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

优化这些阻塞资源的加载方式（改为异步加载或增加一些预渲染优化）对于我们网站的 `Core Web Vitals` 是非常有帮助的，大家可以用起来了～

了解更多：[Chrome 最近带来了哪些有意思的新东西？](https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzk0MDMwMzQyOA%3D%3D%26mid%3D2247496177%26idx%3D1%26sn%3Df06e5435c0c511d396a7b7b6c2902f5d%26chksm%3Dc2e104daf5968dcca607e3b5c7ded0c6a9e660e7604baff83784d22c4733e55a422ad155e692%23rd "https://mp.weixin.qq.com/s?__biz=Mzk0MDMwMzQyOA==&mid=2247496177&idx=1&sn=f06e5435c0c511d396a7b7b6c2902f5d&chksm=c2e104daf5968dcca607e3b5c7ded0c6a9e660e7604baff83784d22c4733e55a422ad155e692#rd")

\[10-25\] Turbopack 发布
----------------------

在今年的 `Next.js` 大会上，伴随着 `Next.js 13` 的发布，也推出了一个新的工具：`Turbopack`。

`Turbopack` 是针对 `JavaScript` 和 `TypeScript` 优化的增量打包工具，由 `Webpack` 的创建者 `Tobias Koppers` 和 `Next.js` 团队使用 `Rust` 编写。

在刚推出的时候， `Turbopack` 给出了一份性能测试数据，数据对常见的打包工具的性能做了对比，结果显示`Turbopack` 的性能比 `Vite` 快 `10` 倍，比 `Webpack` 快 `700` 倍。

此数据一出，在前端圈引起了巨大的争议，`Vite` 的作者尤雨溪也亲自回应数据不是很客观，我们现在在 `Turbopack` 官网看到的最新数据已经有了变化，测试基准也可以随意调整（处理 `1000-30000` 个 `React` 组组件）

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/65539da545b849ccada39c19126fded7~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

可以发现在最新的测试中，相比 `Vite`，`Turbopack` 仍然有着不错的性能优势，`Turbopack` 目前只用于 `Next.js 13 Dev server`，未来还会推出独立的 `CLI` 工具，并支持其他框架，如 `Svelte` 和 `Vue`。

了解更多：[turbo.build/pack](https://link.juejin.cn/?target=https%3A%2F%2Fturbo.build%2Fpack "https://turbo.build/pack")

\[11-04\] 浏览器存储新提案：Storage Buckets API
--------------------------------------

多年来，`Web` 生态系统中已经发展出很多可用于存储的 `API`，例如 `IndexedDB、localStorage` 和 `showNotification()` 等等。

`whatwg` 新增了 `Storage` 标准通过定义存储的持久化、容量估算、过期时间等能力来整合这些 `API`。

```
// 从存储桶中访问 IndexedDB
const inboxDb = await new Promise(resolve => {
  const request = inboxBucket.indexedDB.open("messages");
  request.onupgradeneeded = () => { /* migration code */ };
  request.onsuccess = () => resolve(request.result);
  request.onerror = () => reject(request.error);
});

// 从存储桶中使用 File API
const draftFile = await draftsBucket.createFile(
    ["Attachment data"], "attachment.txt",
    { type: "text/plain", lastModified: Date.now() 
});

// 从存储桶中访问 cache API
const inboxCache = await inboxBucket.caches.open("attachments");

```

了解更多：[它的出现将统一所有浏览器存储 API ？！](https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzk0MDMwMzQyOA%3D%3D%26mid%3D2247496266%26idx%3D1%26sn%3D91e3291ee763561ac510a4a786ab8fd9%26chksm%3Dc2e10761f5968e7700d9750bb2f5bfd0db72052c8a5f9da2bcab8046949c29a860630e719483%23rd "https://mp.weixin.qq.com/s?__biz=Mzk0MDMwMzQyOA==&mid=2247496266&idx=1&sn=91e3291ee763561ac510a4a786ab8fd9&chksm=c2e10761f5968e7700d9750bb2f5bfd0db72052c8a5f9da2bcab8046949c29a860630e719483#rd")

\[11-07\] TypeScript 支持新的 satisfies 操作符
---------------------------------------

在使用 `TypeScript` 类型推断的时候，有很多情况下会让我们面临两难的选择：我们即希望确保某些表达式能够匹配某些类型，但也希望保留这个表达式的特定类型用来类型推断。这就让我们陷入了两难的境地，我们用更严格了类型约束了写出 bug 的可能性，但是却失去了类型推断的能力。

`satisfies` 关键字就是用来解决这个问题的，它既能让我们验证表达式的类型是否与某个类型匹配，也可以保留基于值进行类型推断的能力：

```
type Colors = "red" | "green" | "blue";

type RGB = [red: number, green: number, blue: number];

const palette = {
    rad: [255, 0, 0],
    // 可以捕获到错别字 rad
    green: "#00ff00",
    blue: [0, 0, 255]
} satisfies Record<Colors, string | RGB>;

// 都可以调用
const a = palette.red.at(0);
const b = palette.green.toUpperCase();

```

了解更多：[TypeScript 4.9 发布！重点新特性解读](https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzk0MDMwMzQyOA%3D%3D%26mid%3D2247496259%26idx%3D1%26sn%3D326f362cae61d048042bff25719d51b0%26chksm%3Dc2e10768f5968e7eb2ed9989aedb1fc4683397fa021be55516d7c9ea2fc0525d382f105c295c%23rd "https://mp.weixin.qq.com/s?__biz=Mzk0MDMwMzQyOA==&mid=2247496259&idx=1&sn=326f362cae61d048042bff25719d51b0&chksm=c2e10768f5968e7eb2ed9989aedb1fc4683397fa021be55516d7c9ea2fc0525d382f105c295c#rd")

\[11-08\] Rome 发布第一个稳定版本
------------------------

`Rome` 是一个使用 `Rust` 编写的格式化和 `Lint` 工具，可以用于 `JavaScript、TypeScript、JSON、HTML、Markdown` 和 `CSS` 的格式化。相比传统的 Lint 工具，它的处理速度非常快，可以在 `300毫秒 - 1秒` 内处理 `6000` 个文件。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d1dbc5bbd70d4aedaf1254228c47f58f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

但是它的野心不止于此，它的目标是将数十种前端语言工具（`Babel、ESLint、webpack、Prettier、Jest` 等）统一为一个从头开始构建的易于使用的工具。

了解更多：[rome.tools/blog/2022/1…](https://link.juejin.cn/?target=https%3A%2F%2Frome.tools%2Fblog%2F2022%2F11%2F08%2Frome-10%2F "https://rome.tools/blog/2022/11/08/rome-10/")

\[11-16\] Nuxt 3.0 稳定版发布
------------------------

`Nuxt3` 基于 `Vite、Vue3` 和 `Nitro` 等现代框架重写，具有一流的 `Typescript` 支持，经过两年多研究、社区反馈、创新和实验，终于发布稳定版本。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2ea91835cfca4129874d3a9ef75cf79d~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

了解更多：[nuxt.com/v3](https://link.juejin.cn/?target=https%3A%2F%2Fnuxt.com%2Fv3 "https://nuxt.com/v3")

\[11-29\] 新的 CSS 视口单位
---------------------

为了解决移动端网页滚动时，动态工具栏自动收缩的问题，`CSS` 工作组规定了视口的各种状态。

* `Large viewport`（大视口）：视口大小假设任何动态工具栏都是收缩状态。
* `Small Viewport`（小视口）：视口大小假设任何动态工具栏都是扩展状态。

新的视口也分配了单位：

* 代表 `Large viewport` 的单位以 `lv` 为前缀：`lvw、lvh、lvi、lvb、lvmin、lvmax`。
* 代表 `Small Viewport` 的单位以 `sv` 为前缀：`svw、svh、svi、svb、svmin、svmax`。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4703b24938534aec99a8832cd7cae6c8~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

另外还有一个 `Dynamic viewport`（动态视口）

当动态工具栏展开时，动态视口等于小视口的大小。 当动态工具栏被缩回时，动态视口等于大视口的大小。

相应的，它的视口单位以 `dv` 为前缀：`dvw, dvh, dvi, dvb, dvmin, dvmax`。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7eaa0bd747ca4c018a563dbc348fac9c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

目前，各大浏览器均已经对新的视口单位提供了支持

了解更多：[Chrome 108 ：发布新的 CSS 布局单位！](https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzk0MDMwMzQyOA%3D%3D%26mid%3D2247496502%26idx%3D1%26sn%3Ddbcfe4ff66597797be31ff6e837cdf86%26chksm%3Dc2e1061df5968f0b4e55a37961d6510e4a2857bd198852e42141ebcc36a644b4da9c09db2233%23rd "https://mp.weixin.qq.com/s?__biz=Mzk0MDMwMzQyOA==&mid=2247496502&idx=1&sn=dbcfe4ff66597797be31ff6e837cdf86&chksm=c2e1061df5968f0b4e55a37961d6510e4a2857bd198852e42141ebcc36a644b4da9c09db2233#rd")

\[12-14\] SvelteKit 1.0 发布
---------------------------

`SvelteKit` 是一个用 `Svelte` 构建 `Web` 应用程序的框架，可以满足不同规模的应用开发，提供了非常灵活和体验良好的基于文件系统的路由架构。`Svelte` 是一个 `UI` 组件框架，因其出色的性能和易用性而受到开发者喜爱。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/02e3f3b8c22041928609e34c7e4d493b~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

经过两年的开发，`SvelteKit 1.0` 已正式发布，现在可用于生产环境，它提供了服务端渲染、路由管理、针对 JS 和 CSS 的代码分割，以及针对不同 `Serverless` 平台生成不同代码的适配器等功能。

了解更多：[svelte.dev/blog/announ…](https://link.juejin.cn/?target=https%3A%2F%2Fsvelte.dev%2Fblog%2Fannouncing-sveltekit-1.0 "https://svelte.dev/blog/announcing-sveltekit-1.0")

> 如果你想加入高质量前端交流群，或者你有任何其他事情想和我交流也可以添加我的个人微信 [ConardLi](https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzk0MDMwMzQyOA%3D%3D%26mid%3D2247493407%26idx%3D1%26sn%3D41b8782a3bdc75b211206b06e1929a58%26chksm%3Dc2e11234f5969b22a0d7fd50ec32be9df13e2caeef186b30b5d653836b0725def8ccd58a56cf%23rd "https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzk0MDMwMzQyOA%3D%3D%26mid%3D2247493407%26idx%3D1%26sn%3D41b8782a3bdc75b211206b06e1929a58%26chksm%3Dc2e11234f5969b22a0d7fd50ec32be9df13e2caeef186b30b5d653836b0725def8ccd58a56cf%23rd") 。

这些事件里哪些让你印象最深？哪些你觉得很重要但是我文中没有提到？欢迎在评论区和我留言。

如果这篇文章帮助到了你，欢迎点赞和关注。

本文转自 [https://juejin.cn/post/7186454731785994301#heading-0](https://juejin.cn/post/7186454731785994301#heading-0)，如有侵权，请联系删除。
