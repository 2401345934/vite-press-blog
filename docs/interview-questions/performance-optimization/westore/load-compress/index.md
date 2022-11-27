---
createTime: 2022/11/27
tag: '性能优化,westore'
---
# 小程序代码包极致压缩之路

影响小程序代码包大小的因素
-------------

| 类型 | 说明 |
| --- | --- |
| 业务代码 | 这是项目的基础，一般业务没有变更的情况下，很难减少 |
| 公共代码 | 如第三方公共库 |
| 无用代码 | 功能已废弃但未删除的代码 |
| 图片 | 保存在本地的图片 |
| 样式 | 特别是废弃的样式 |
| wxml | 结构越复杂，生成的代码空间越大 |
| 文件路径 | 页面/组件的路径最终都是代码的一部分 |

优化手段 -- 基础
----------

### 1、开启代码压缩

这一步没啥成本，但效果很明显 ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dcbb472c444f41cab62af1eaa1ff47de~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

### 2、分包

这是最有效的手段，将非必须存在于主包的代码拆分到相应的分包中，分包按功能尽可能拆分的小一些；非主包用到的东西不允许放主包，一律放各个分包。

### 3、删除无用代码(包括无用样式)

废弃的代码及时删除，包括js、wxml和样式，特别是app.wxss内的样式

### 4、本地图片替换成CDN图片

除了本地必须的图片，如报错兜底、logo等，其他一律替换成CDN图片

### 5、wxml结构精简

wxml的内容基本以原始文本的形式存在于打包后的代码中，其结构越复杂，最终生成的代码越大，通过精简wxml的结构，可以有效降低代码包的大小。

优化手段 -- 进阶
----------

常规手段用完之后基本已经到极限了，很难再进一步降低大小，这个时候必须得借助工程化的手段，才能达成压缩代码的目的。

### 1、文件路径压缩

因为文件路径最终会原样打包到代码中，对于代码量很大的项目来说，替换成更短的路径也能省不少空间。组件越多、代码目录层级越深，最终的效果越明显。

**实现步骤如下：**

```
1、将组件挪动到根目录下--这种情况下路劲最短
2、组件重命名，取一个更短的名字，如Table.js -> 0.js
3、修改引用该组件的页面/组件配置，将其改成新的路劲

```

**【示例】** ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/26ed194501b3484d9c71793dfce36b4a~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?) 编译后：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e15dd87a1f1f4fe2b557fe8dfae89dbe~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

### 2、原子css

原子css的基本原则，决定了其基础库的大小是固定的，即使同样的css规则被使用了很多次，但其声明只有一次，唯一的弊端是会导致wxml变大，但总体来说代码包大小会下降很多。

**【示例】** 很明显原子css的写法代码量少了很多，而且还省了class命名的空间 ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/07b9a23e4470450484b95213b19207d6~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

### 3、类名压缩

尽管采用原子css后，代码体积下降了多，但之前为了阅读的友好，命名仍然有些长，可以采用短命名替换，通过编译手段进一步降低代码的体积，而不影响到业务功能。

**【压缩前】** ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/081912e508cf402b89ffc7379c63d206~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

**【压缩后】** ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cff33b95c5d640869cf002fb3e68fd0a~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

终极手段
----

理想的方式代码包按需加载，而不是整体加载，特别是在我们这种场景下，绝大部分的组件虽然加载了但并不会被用上，因此官方提供了分包加载的方式：**分包异步化**([参考资料](https://link.juejin.cn/?target=https%3A%2F%2Fdevelopers.weixin.qq.com%2Fminiprogram%2Fdev%2Fframework%2Fsubpackages%2Fasync.html "https://developers.weixin.qq.com/miniprogram/dev/framework/subpackages/async.html"))

**【分包异步化】**

在小程序中，不同的分包对应不同的下载单元；因此，除了非独立分包可以依赖主包外，分包之间不能互相使用自定义组件或进行 `require`。「分包异步化」特性将允许通过一些配置和新的接口，使部分跨分包的内容可以等待下载后异步使用，从而一定程度上解决这个限制。

### 看起来很美好

为什么说看起来很美好呢，是因为我们的小程序需要支持微信、企业微信的移动端和PC端，目前来说PC端支持的不是特别好，需要升级到一定版本之后才行，特别是企业微信坑很多，不知道还有什么奇怪的问题。由于分包异步化是提前声明的，并不能动态的控制开关，如果在不支持的版本上会直接报错，因此综合考虑之后，只能放弃这种方式，等后续功能稳定之后再考虑。

总结
--

基础：开启代码压缩、分包、删除无用代码(包括无用样式)、本地图片替换成CDN图片、wxml结构精简 进阶：文件路径压缩、原子css、类名压缩
