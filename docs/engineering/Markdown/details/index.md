---
createTime: 2022/11/10
tag: '工程化,Markdown'
---

# hard-line-breaks

软换行（Soft line breaks）
---------------------

换行符不在行内代码或 HTML 标签内，前面没有两个或以上的空格，将解析为**软换行（Soft line breaks）**。渲染为 HTML 时是一个**行结束符或空格**。

输入：

```
foo
baz
```

输出：

```
<p>foo
baz</p>
```

表现：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4a8c01c5a6d34009baf8a49e64045fb6~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

硬换行（Hard line breaks）
---------------------

换行符不在内联代码或 HTML 标签内，前面有两个或多个的空格，并且不在块的末尾， 将解析为**硬换行（Hard line breaks）** ，渲染为 HTML 时是一个 `<br />` 标签。

输入（注意 `foo` 后面有两个空格）：

```
foo  
baz
```

输出：

```
<p>foo

baz</p>
```

表现：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/588f391ec5344f6fa11ea30f21f4a81f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

反斜杠（backslash）
--------------

除了用于转义，在行尾的反斜杠相当于硬换行：

输入：

```
foo\
bar
```

输出：

```
<p>foo

bar</p>
```

**行内代码（code span）**
-------------------

我们通常会用一对反引号包裹字符串，表示**行内代码（code span）**：

输入：

```
`foo`
```

输出：

```
<p><code>foo</code></p>
```

表现：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2719f85171734524993bc82bcbb3b34f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

但其实行内代码只要求内联代码以反引号串开始，以同样长度的反引号串结束。

所以用多个反引号也是可以的：

```
```foo```
```

输出：

```
<p><code>foo</code></p>

```

围栏式代码块（Fenced code blocks）
--------------------------

如果你使用了至少三个连续的反引号，并且添加了换行，就会变成围栏式代码块：

输出：

```
<pre><code>foo
</code></pre>

```

表现：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0560e78279c449859ec16e56460c6c5c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

如同行内代码，不要求必须三个反引号，只要至少三个并且前后相同就行，所以当我们想在代码块中使用三个反引号时，你可以使用四个反引号包裹：

表现为：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/685bb66fc9ed45e99a8a37817392ff46~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

不使用反引号，使用波浪号也是可以的，但不能混用：

```
~~~
foo
~~~

```

输出：

```
<pre><code>foo
</code></pre>

```

缩进式代码块（Indented code blocks）
----------------------------

缩进式代码块由空行隔开的数个**缩进块**组成。

**缩进块**是数个非空行，**每行缩进四个或多个空格**。

举例一个缩进块：

```
    a simple
      indented code block

```

输出：

```
<pre><code>a simple
  indented code block
</code></pre>

```

表现：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/23e8e2a809c0448395063281f9279014~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

举例由空行隔开的数个缩进块：

```
    chunk1
    chunk2

    chunk3

```

输出：

```
<pre><code>chunk1

chunk2



chunk3
</code></pre>

```

三个缩进块共同组成了缩进式代码块。

表现：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/05343ca517a14464af2e08f7f3d6f86c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

链接引用定义（Link reference definitions）
----------------------------------

链接引用定义由链接标签、冒号(:)、可选的空白、链接目标、可选的空白及可选的链接标题组成。举个例子：

```
[foo]: /url "title"

```

但这只是一个定义，并不会有任何展示，就像我们在 JavaScript 中声明了一个变量一样，如果我们要使用它：

```
[foo]

```

输出：

```
<p><a href="/url" title="title">foo</a></p>

```

链接引用定义不对应于某个结构元素。实际上它定义了一个标签，以用于在文档其它地方的引用链接及引用类型图像。它可以出现在引用链接的前面或后面。

当在图片中使用链接引用定义时：

```
![foo][bar]

[bar]: /url

```

输出：

```
<p><img src="/url" alt="foo" /></p>

```

自动链接（Autolinks）
---------------

自动链接是由尖括号(<...>)包裹的绝对 URI 与 email 地址。 它将解析为链接，以 URL 或 email 地址作为链接标签。

```
<http://foo.bar.baz>

```

相当于：

```
[http://foo.bar.baz](http://foo.bar.baz)

```

输出为：

```
<p><a href="http://foo.bar.baz">http://foo.bar.baz</a></p>

```

Setext 式标题（Setext headings）
---------------------------

Setext 是一种轻量级标记语言，用于格式化纯文本文档，例如电子通讯，Usenet 帖子和电子邮件。与其他一些标记语言相比，该标记易于阅读，而无需任何解析或特殊软件。

Markdown 同样提供了类似的语法：

```
Foo *bar*
=========

Foo *bar*
---------

```

输出：

```
<h1>Foo <em>bar</em></h1>
<h2>Foo <em>bar</em></h2>

```

使用 `=`则是第一级标题，使用`-`字符则是第二级标题。底线长度任意。

水平线（Thematic breaks）
--------------------

由 0-3 个空格的缩进及三或多个 `-`,`_`, `*` 字符组成的行，形成水平线。

输入：

```
***
---
___

```

输出：

```
<hr />
<hr />
<hr />

```

表现：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a94a7f039ab544c5baf36c4dd5a46f25~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)
