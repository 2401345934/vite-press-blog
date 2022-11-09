---
createTime: 2022/11/09
tag: 'HTTP'
---
# HTTP请求头

### 1.1 场景

如果你有了解过 `Content-Disposition` 这个 `Response Header`，那你一定知道，只需要响应头上增加一行，问题就能迎刃而解。

### 1.2 介绍

**`Content-Disposition`**：这个响应头可以决定内容是 **预览** 还是 **下载**。

它支持三种格式的值：

1. `Content-Disposition: inline`  
    此时，消息体会以页面的一部分或者整个页面的形式展示。（预览）
2. `Content-Disposition: attachment`  
    消息体应该被下载，默认文件名和 `url` 格式有关。
3. `Content-Disposition: attachment; filename="filename.jpg"`  
    消息体应该被下载，默认文件名可指定。

> 注：如果需要预览，需要配合适当的 `Content-Type` 食用；

### 1.3 示例

为此，我特意写了一个 `express` 小示例。

大抵是在 `express` 应用下写了三个路由，如下：

```js
const user = {
  name: "摸鱼的春哥",
  blogUrl: "https://juejin.cn/user/1714893870865303"
}

const contentDispositionInline = async (req, res, next) => {
  res.setHeader('Content-Disposition', 'inline')
  res.send(user)
}

const contentDispositionFilename = async (req, res, next) => {
  res.setHeader('Content-Disposition', 'attachment; filename="chunge.json"')
  res.send(user)
}

const contentDispositionNoFilename = async (req, res, next) => {
  res.setHeader('Content-Disposition', 'attachment')
  res.send(user)
}

```

然后我分别访问三个路由，效果差异：

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9b92606d69564a6cb5fd1bdf0c005370~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

二、项目升级了，需要客户 **清空缓存** ？
-----------------------

### 2.1 场景

实施：“客户反馈`Bug` 还是没修复。”  
你：“哥，真修复了，要不你让客户清一下缓存？”  
实施：“啊？客户说他不会清……”  
![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/27dff5bd3a2546168adcb1d6651dcd91~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

永远不要期望你的客户会进行 **“那些研发才懂”** 的操作。也不要把你的问题，归因到 **浏览器缓存** 上。

**浏览器缓存** 是被发明出来优化用户体验的，并不是被发明出来阻碍用户的。

因此，理解如何使用 `Cache-Control` 这个响应头，是前端的必知技能。

### 2.2 介绍

**`Cache-Control`**：用来指定缓存机制。

缓存，作为前端八股文必考知识，相信大家已经耳熟能详。 常见的 **`Cache-Control`** 属性如下：

| Response Header属性 | 值 | 含义 |
| --- | --- | --- |
| cache-control | no-store | 不缓存，这个会让客户端、服务器都不缓存，也就没有所谓的强缓存、协商缓存了。 |
| cache-control | public | 表明响应可以被任何对象（包括：发送请求的客户端，代理服务器，等等）缓存，即使是通常不可缓存的内容。（例如：1.该响应没有max-age指令或Expires消息头；2. 该响应对应的请求方法是 POST 。） |
| cache-control | private | 表明响应只能被单个用户缓存，不能作为共享缓存（即代理服务器不能缓存它）。私有缓存可以缓存响应内容，比如：对应用户的本地浏览器。 |
| cache-control | max-age=<1000> | 设置缓存存储的最大周期，超过这个时间缓存被认为过期(单位秒)。与Expires相反，时间是相对于请求的时间。 |

* 不缓存  
    不缓存是最容易理解，每一次请求都会从服务端重新获取，不进行任何缓存。  
    此策略只需要赋予 `Cache-Control: no-store` 响应头即可。
* 强缓存  
    有些资源文件，几乎不会发生变化（比如已经 `hash化命名的文件`），则可以直接从本地缓存获取，这就是所谓的 **强缓存** ;  
    通过 `cache-control: public/private` 或者 `cache-control: max-age=<1000>` 都可以指定机制为强缓存。
* 协商缓存  
    这是一种更为复杂缓存机制，无法再通过响应头 **简单粗暴地** 指定实现，而是需要前后端协作配合。  
    简单来说，每次请求资源前前端会写代前一次的响应 `hash`，问询服务端 **资源是否发生过变化**，从而达到准确缓存的效果。  
    本文不赘述，如果有兴趣，可以参考此文：[juejin.cn/post/703078…](https://juejin.cn/post/7030781324650610695 "https://juejin.cn/post/7030781324650610695")

### 2.3 实际生产如何运用？

* 凡是名称带有 `hash` 值的资源，一律可以强缓存。  
    （毕竟内容一旦有变化，名称的`hash` 也跟着变了）
* 凡是通过 `cdn` 引入的第三方库，均建议携带版本信息，这样也可以强缓存。  
    （比如 `/xx/xx/jquery.min.js` 切换为 `jquery@3.6.0/dist/jquery.min.js`）
* 凡是 `html`、`ico` 这类命名固定的文件，建议一律 **不缓存** 或者 **协商缓存**。

三、我的 `Cookie` 不可能这么可爱
----------------------

### 3.1 场景

> "春哥春哥，为啥我登录成功了，请求还是 `401` ？"

> "春哥春哥，为啥我存进 `cookie` 的值取不到？"

> "春哥春哥，这破 `cookie` 是不是坏了，浏览器里看明明有值，为啥我访问不了？"

我：“兄弟，你有了解过一个叫 `set-cookie` 的响应头吗？”

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/48bf9bf38d94486498a7b33afd7d7766~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image) 是它！是它！就是它！关于 `cookie` 的各种异常，全靠它!

### 3.2 介绍

`Cookie` 曾经是 `Web` 开发无法绕开的一道门槛，而现在它的存在感越来越弱，但海量的存量项目并不会因为技术的趋势而消失，它们依然很有价值，依然需要维护。

而 `set-cookie` 响应头正是 `Cookie` 体系中最为核心的 **第一主角**。

**`Set-Cookie`**: 是一个响应头，服务端赋值，让浏览器端产生 `Cookie`，并限定 `Cookie` 的各种特性。

这些特性就包括：

* 过期时限；`Expires=<date>`
* 存活周期；`Max-Age=<number>`  
    在 cookie 失效之前需要经过的秒数。`0` 或 `-1` 直接失效；此属性的优先级高于 `Expires`。
* 域名；`Domain=<domain-value>`  
    指定 `cookie` 只能在什么域下生成；（允许通配，这个属性主要出于安全性）
* 路径；`Path=<path-value>`  
    比 `Domain` 更为细致的控制策略，甚至指定了 `xx` 路径下才能发送 `Cookie`。
* 只在 `Https` 产生；`Secure`  
    如果 `set-cookie` 头中有 `Secure` 属性，那么浏览器只会在 `Https` 环境产生和发送 `Cookie`。
* 禁用 `js` 操作 `API`；`HttpOnly`  
    如果 `set-cookie` 头中有 `HttpOnly` 属性，那么 `Cookie` 属性的生成、读写、发送就只能由浏览器通过 "响应头" 控制了，不在允许前端通过 `js` 操作 `Cookie`。
* 是否允许跨域携带；`SameSite=<samesite-value>`  
    支持属性包括 `Strict`、`Lax`、`None`，分别表示：
  * `Strict`: 完全不能跨域携带；
  * `Lax`: 只允许从外站导航到源站时携带 `Cookie`
  * `None`：跨域也行，不限制。

### 3.3 开发常见问题分析

* 为啥你登录成功了，请求还是 `401`？

    早期非常多的项目，使用 `Cookie` 作为用户身份识别的手段，比如 `Spring MVC` 项目就是通过给 `Cookie` 一个 `JSeesionId` 的值作为识别，判断你是否出于当前会话。

    而 "登录了，却还 `401`" 这个现象，如果服务端没有问题的话，多半是 **浏览器其实并未存储Cookie**。

    换个说法，你每次发起请求，服务端都认为你是一次 **新的会话**，和上一次 **登录的你** 并非同一人。

    如果你正处于 `http` 环境，那你可能需要暂时移除 `Secure` 属性。

* 存不进、取不出？  
    先确认 **是否有域的限制**、**是否有路径的限制**、**是否有 `HttpOnly`**?  
    逐一排查下来，问题不难解决。
