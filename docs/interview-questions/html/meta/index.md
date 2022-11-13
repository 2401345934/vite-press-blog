---
createTime: 2022/11/13
tag: 'html,面试题'
---

# 作为前端，你必须要知道的meta标签知识

概览
--

meta标签一般放在整个`html`页面的`head`部分，在`MDN`中对他这样定义：

> meta是**文档级元数据元素**，用来表示那些不能由其它 HTML 元相关元素（`<base>`、`<link>`, `<script>`、`<style>`或 `<title>`）之一表示的任何元数据。

是不是感觉看起来很抽象？说白了就是为了传达信息。

先看看`meta` 元素定义的元数据的类型：

* 如果设置了 `name`属性，`meta` 元素提供的是文档级别的元数据，应用于整个页面。
* 如果设置了 `http-equiv`属性，`meta` 元素则是编译指令，提供的信息与类似命名的 HTTP 头部相同。
* 如果设置了 `charset`属性，`meta` 元素是一个字符集声明，告诉文档使用哪种字符编码。
* 如果设置了 `itemprop` 属性，`meta` 元素提供用户定义的元数据。

name属性
------

`name`和`content`一起使用，前者表示要表示的元数据的`名称`，后者是元数据的`值`。

### author

用来表示网页的作者的名字，例如某个组织或者机构。

```html
<meta name="author" content="aaa@mail.abc.com">
```

### description

是一段简短而精确的、对页面内容的描述。以头条和taobao的`description`标签为例：

![图片](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/49f4385dc1ed48feaa3fc5e0b46acf83~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)  
  
![图片](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/825ce35f4abd4c06afa40e66013579bf~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

### keywords

与页面内容相关的关键词，使用逗号分隔。某些搜索引擎在遇到这些关键字时，会用这些关键字对文档进行分类。 还是以头条和taobao为例

![图片](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0e7392738a9648d18a959b3cdb63cef5~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)  
  
![图片](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/78198feb62944b84a2b464b9bec5df6c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

### viewpoint

为 viewport（视口）的初始大小提供指示。目前仅用于移动设备。

可能你也发现了，我们在`vscode`中自动生成`html`的代码片段时，会自动生成：

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

`width`用来设置 viewport 的宽度为设备宽度;

`initial-scale`为设备宽度与 viewport 大小之间的缩放比例。

![图片](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1be03506cff042e89f244a225a6bcb05~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

### robots

表示爬虫对此页面的处理行为，或者说，应当遵守的规则，是用来做搜索引擎抓取的。

它的`content`可以为：

1. `all`:搜索引擎将索引此网页，并继续通过此网页的链接索引文件将被检索
2. `none`:搜索引擎讲忽略此网页
3. `index`:搜索引擎索引此网页
4. `follow`:搜索引擎继续通过此网页的链接索引搜索其它的网页

### renderer

用来指定双核浏览器的渲染方式，比如360浏览器，我们可以通过这个设置来指定360浏览器的渲染方式

```html
<meta name="renderer" content="webkit"> //默认webkit内核
<meta name="renderer" content="ie-comp"> //默认IE兼容模式
<meta name="renderer" content="ie-stand"> //默认IE标准模式
```

http-equiv
----------

`http-equiv`也是和`content`一起使用，前者表示要表示的元数据的`名称`，后者是元数据的`值`。

`http-equiv` 所有允许的值都是特定 HTTP 头部的名称，

### X-UA-Compatible

我们最常见的`http-equiv`值可能就是`X-UA-Compatible`了，它常常长这个样子：

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0a51d78fca0e470d871cdad5aac6d331~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

它是用来是做IE浏览器适配的。

`IE=edge`告诉浏览器，以当前浏览器支持的最新版本来渲染，IE9就以IE9版本来渲染。

`chrome=1`告诉浏览器，如果当前IE浏览器安装了`Google Chrome Frame`插件，就以chrome内核来渲染页面。

像上图这种两者都存在的情况：如果有chrome插件，就以chrome内核渲染，如果没有，就以当前浏览器支持的最高版本渲染。

另外，这个属性支持的范围是`IE8-IE11`

你可能注意到了，如果在我们的`http`头部中也设置了这个属性，并且和`meta`中设置的有冲突，那么哪一个优先呢？ 答案是：开发者偏好（`meta`元素）优先于Web服务器设置（HTTP头）。

### content-type

用来声明文档类型和字符集

![图片](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e79c0e0e369749cc862755af01bfd01b~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

### x-dns-prefetch-control

一般来说，HTML页面中的a标签会自动启用DNS提前解析来提升网站性能，但是在使用https协议的网站中失效了，我们可以设置：

![图片](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/29822f4066704d098e91860a98d2cae2~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

来打开dns对a标签的提前解析

### cache-control、Pragma、Expires

和缓存相关的设置，但是遗憾的是这些往往不生效，我们一般都通过`http headers`来设置缓存策略
