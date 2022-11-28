---
createTime: 2022/11/28
tag: 'html,面试题'
---

# 13个很酷但很少有人知道的HTML元素

1. `meter` & `progress`
-----------------------

元素是显示进度条的语义正确方式。

除了在已知范围内显示标量测量值外，它还允许我们指定值的**低**，**高**和**最佳**范围。

```html
<meter
  min="0"
  max="100"
  low="25"
  high="75"
  optimum="80"
  value="50"
></meter>

```

效果

![4znrursszrxsuiqqmauj.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4ca68cd5a3414e01a9cfb4272a392062~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

2. `sup` & `sub`
----------------

我们可以在文档中添加**上标**和**下标**。`x²`sup`x₀`sub

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c2f7ad7475114d4d95146a357f561a94~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/16544dc295fa4ab099f11a085cf5506f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

3. `datalist`
-------------

`datalist`允许我们将自动完成建议添加到元素中

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ddd4b744c7dd467299e0def0f1cdaa32~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

### 注意

1. 建议不仅限于文本，还可以与**颜色**，**日期**，**时间**甚至**范围**输入一起使用。
2. 虽然建议的默认样式看起来**很简陋**。但是我们可以使用**CSS**设置其样式。

4. `map` & `area`
-----------------

`map`并允许我们创建**图像映射**，这是**具有可单击区域图像**的一种使用办法。

```html
<img
  src="workplace.jpg"
  alt="Workplace"
  usemap="#workmap"
  width="400"
  height="379"
/>

<map name="workmap">
  <area
    shape="rect"
    coords="34,44,270,350"
    alt="Computer"
    href="computer.html"
  />
  <area
    shape="rect"
    coords="290,172,333,250"
    alt="Phone"
    href="phone.html"
  />
  <area
    shape="circle"
    coords="337,300,44"
    alt="Cup of coffee"
    href="coffee.html"
  />
</map>

```

![uzi08fh85fvfb0ycz9de.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/35e5746c50834ae88d2b8fd3efc61107~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

5. `details` & `summary`
------------------------

`details`并且用于创建**可折叠的内容**，并且无需使用任何**JavaScript**。这是创建**下拉列表**的语义方法。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eea1133ac3e244f4bbf1a0de544a0f45~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

6. `object`
-----------

不知道怎样在你的网站上嵌入文件？不要找了，用`object`吧

`object`允许我们嵌入各种文件，如**PDF**，**图像**，**视频**，**音频** 甚至 **视频**。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/00b9f11275b246638a64dc07071c11da~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

7. `abbr`
---------

该元素允许我们向文档添加**缩写**。当用户将鼠标悬停在**缩写**上时，将显示完整窗体。此外，**屏幕阅读器**还可以配置为在遇到**缩写**时读出完整表格。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/18cfd2ef572f4755af6b4da70e1d2939~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

8.预加载和缓存资源 📥
-------------

想知道如何 **预加载** 和 **缓存资源** 吗？只需要一行代码，你就完成了！

```html
<link
  rel="preload"
  href="https://example.com/asset.png"
  as="image"
/>

```

9.为页面🖼️添加自定义链接预览
-----------------

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b09e809326f84c7cbc7f3b4e7a6ba394~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

对链接预览的生成方式感到疑惑？我们所需要的只是标签！

```html
<meta property="og:title" content="Page title" />
<meta
  property="og:description"
  content="Page description"
/>
<meta
  property="og:image"
  content="https://example.com/asset.png"
/>

```

上面显示的标签使用 Open Graph Protocol（开放图谱协议），你可以使用任何标签生成器为所有其他平台生成标签

10.重定向到另一个链接↪️
--------------

将用户重定向到其他链接（通常在付款确认后使用）只需一行代码即可！

```html
<meta
  http-equiv="refresh"
  content="3; url=https://juejin.cn/"
/>

```

上面的代码将在 3 秒后将用户重定向到 **掘金**。

11\. 拨打电话或邮件 📞
---------------

需要一个链接来拨打 **电话** 或发送 **邮件**！

```html
<a href="tel:+12345678910">Call</a>
<a href="mailto:user@email.com">Mail</a>
```

12\. 添加颜色选择器 🎨
---------------

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1a6f350287bf4476964dda842dd8c780~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

想要向您的网站添加 **颜色选择器**？您只需要一行，不需要花哨的 **库** 甚至也不需要 **JavaScript**！

```html
<input type="color" />
```

13\. 可编辑内容 ✏️
-------------

只需将属性添加到元素即可使任何内容**可编辑**。

```html
<p contenteditable="true">
  这是一段可编辑的话
</p>
```
