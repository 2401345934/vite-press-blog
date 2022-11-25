---
createTime: 2022/11/25
tag: '场景题'
---
# 微信小程序实现一些优惠券/卡券

1.实现效果
------

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fb62073b6b304c0bbdc5500c2008ebda~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

2.实现原理
------

### 2.1 实现内凹圆角

> 假设我们要实现这样的一个效果，两侧透明内圆角+外侧投影，有几种实现方式呢？

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4da4b5a7c5504b019932d6a31e736661~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

#### 2.1.1 方法一：半圆伪元素（投影不准确）

* 可将这个想象成一个正常的矩形，左右两侧分别有个小半圆

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4af4123e52c34aafa0b705e6a926ec95~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

* 将半圆的颜色设置为与背景色一致

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7654ce78cc3c4bf493c9fa4d79566094~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

* 为其添加[drop-shadow](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FCSS%2Ffilter-function%2Fdrop-shadow "https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter-function/drop-shadow")投影，发现无法正确的在半圆内部显示投影

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6b7356e4388d44238eefaff56c4fa2d5~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

```css
.card{
  width: 700rpx;
  height: 250rpx;
  margin: 0 auto 20rpx;
  border-radius: 20rpx;
  position: relative;
  background: #ff6810;
  position: relative;
  filter: drop-shadow(2px 2px 1px rgba(0, 0, 0, .3));
}

.card::before,
.card::after {
  content: '';
  position: absolute;
  width: 20rpx;
  height: 40rpx;
  background: var(--bg);
  top: calc(50% - 20rpx);
}
.card::before {
  border-radius: 0 20rpx 20rpx 0;
  left: 0;
}
.card::after {
  border-radius: 20rpx 0 0 20rpx;
  right: 0;
}

```

##### 局限性

> 1.当页面背景是图片或者非纯色的时候，无法正确的显示
>
> 2.无法正确的显示投影

#### 2.1.2 方法二：radial-gradient渐变

> [radial-gradient：](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FCSS%2Fgradient%2Fradial-gradient "https://developer.mozilla.org/zh-CN/docs/Web/CSS/gradient/radial-gradient")
>
> radial-gradient() CSS 函数创建一个图像，该图像由从原点辐射的两种或多种颜色之间的渐进过渡组成。它的形状可以是圆形或椭圆形。函数的结果是 gradient数据类型的对象。这是一种特别的 image。

**语法：**

```css
background-image: radial-gradient(shape size at position, start-color, ..., last-color); 
```

> 径向渐变通过指定渐变的中心（0% 椭圆所在的位置）和结束形状（100% 椭圆）的大小和形状来指定。
>
> 渐变颜色默认第一个颜色位置是0%，最后一个颜色位置是100%.

##### eg

* 圆形，起始点位置为左上角即left center（不写则为center），从橘色开始，变成粉色，最后变成天空蓝，不写百分比就均匀分布。

```js
background: radial-gradient(circle at 0rpx, orange , pink, skyblue ) ;
//等价于background: radial-gradient(circle at 0rpx, orange 0, pink 50%, skyblue 100%) ;
```

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d4c871e39b5547ec833582597f363e36~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

* 圆形，起始点位于left，center，透明色占据20rpx，pink占据20rpx，skyblue从20rpx到100%；

```css
background: radial-gradient(circle at left center, transparent 20rpx, pink 20rpx, skyblue);
```

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1d0d197c047145e4814e9d8668f14141~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

* 圆形，起始点位于center，center，透明色占据20%，pink占据20% 45%，skyblue从45% 70% ，rgb(211, 128, 50)从 70% 100%

```css
background: radial-gradient( circle ,transparent 20%, pink 20% 45%, skyblue 45% 70%, rgb(211, 128, 50) 70% 100%);
```

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c98d17d1811f4183a528daf70a869a3e~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

* 圆形，起始点位于left ，center，透明色占据0rpx 20rpx，pink占据20rpx 30%，skyblue从45% 70% ，skyblue 从 30% 100%

```css
background: radial-gradient(circle at left center, transparent 0rpx 20rpx, pink 20rpx 30%, skyblue 30%);
```

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d8c13b285808477a9dcb0fd13c7ecb18~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

##### 实现两侧内圆角

* 圆形，起始点位于left，center，定义一个透明色占据20rpx，剩下颜色为20rpx到100%的纯色

```css
background: radial-gradient(circle at left center, transparent 20rpx, pink 20rpx);
```

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a63a218dcea34f62b0da83df19be60f3~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

* 试着改变pink颜色的起始位置，我们发现要实现一个透明的半圆，后面的颜色起始点要小于等于前个颜色的结束位置

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3fe6e7091ede441e84f66b3c34de5707~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

* 试着在右边再次定义一个内圆角，发现两个透明圆角都不显示了

```css
 background: radial-gradient(circle at left, transparent 20rpx, pink 20rpx), radial-gradient(circle at right, transparent 20rpx, pink 20rpx);
```

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fa443208bfa846f98b0bb79e36bc86a1~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

* [XboxYan-CSS 实现优惠券的技巧](https://link.juejin.cn/?target=https%3A%2F%2Fsegmentfault.com%2Fa%2F1190000039742398 "https://segmentfault.com/a/1190000039742398")这篇文章在讲mask遮罩时，有说到是因为两层背景相互叠加，导致整块背景都成了不透明的，那么是不是同样适用到这个渐变上呢？试试看

* 修改background-position为对应位置，background-size宽度为50%,高度不变，background-repeat不重叠，先将颜色分开试试，看看效果如何

> [background-position：](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FCSS%2Fbackground-position "https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-position")
>
> background-position CSS 属性为每一个背景图片设置初始位置。这个位置是相对于由 background-origin 定义的位置图层的。 对于两个值的语法： 一个定义 x 坐标，另一个定义 y 坐标，其他的请看相关文档，这里就不赘述了。

```css
background: radial-gradient(circle at left, transparent 20rpx, skyblue 20rpx) 0 100% /51% no-repeat, radial-gradient(circle at right, transparent 20rpx, pink 20rpx) 100% 0 /51% no-repeat;
//或者
background: radial-gradient(circle at left, transparent 20rpx, skyblue 20rpx) ,radial-gradient(circle at right, transparent 20rpx, pink 20rpx) ;
background-size: 51%;
background-repeat: no-repeat;
background-position: 0, 100%;
```

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ec325f21c4ff4baf89453c18c01d6d23~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

* 将颜色修改回来，并添加drop-shadow投影

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/46d4b702ed264a29b76d705a4e231945~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

* 试着将上述内容进行简写，得到一个圆心距离左边20rpx，半径为20rpx居中的透明圆

```css
background: radial-gradient(circle at 20rpx center, transparent 20rpx, #ff6810 20rpx) ;
```

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/72ccd0b3f9064e0c99ad534666b48ad1~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

* 利用background-position进行x轴方向的偏移，偏移-20rpx，并添加drop-shadow投影

```css
filter: drop-shadow(2px 2px 1px rgba(0, 0, 0, .3));
background: radial-gradient(circle at 20rpx center, transparent 20rpx, #ff6810 20rpx) -20rpx;
//或者
filter: drop-shadow(2px 2px 1px rgba(0, 0, 0, .3));
background: radial-gradient(circle at 20rpx center, transparent 20rpx, #ff6810 20rpx);
background-position: -20rpx ;
```

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2f967b8d69ab432daa759198a7d9208a~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

##### 局限性

> 1.当优惠券背景是渐变色的时候，处理起来不方便

#### 2.1.3 方法三： mask遮罩

> [mask：](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FCSS%2Fmask "https://developer.mozilla.org/zh-CN/docs/Web/CSS/mask")
>
> CSS 属性 mask 允许使用者通过遮罩或者裁切特定区域的图片的方式来隐藏一个元素的部分或者全部可见区域。可以理解为透明的部分不显示，展示非透明区域。 mask语法与background类似，使用mask可以实现一些amazing的效果，可以参考文章[ChokCoco-奇妙的 CSS MASK](https://link.juejin.cn/?target=https%3A%2F%2Fwww.cnblogs.com%2Fcoco1s%2Fp%2F13253423.html "https://www.cnblogs.com/coco1s/p/13253423.html")

* 假设给一个元素设置一个mask遮罩，遮罩设置为起始点位于left，center，定义一个透明色占据20rpx的半圆

```css
background: pink;
-webkit-mask: radial-gradient(circle at left center, transparent 20rpx, skyblue 21rpx);
```

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6c4d4114a90043c5b59887231f897a10~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

* 修改mask遮罩的第二个色值占据的百分比以及色值，看看效果如何？
* 我们可以发现，当第二个色值占据的大小<=前一个时候，会展示一个透明色的内圆角；
* mask遮罩遮住的是透明区域，所以不透明的部分不需要关心，那么后一个颜色的色值你可以随意设置。

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dcd071f8467947bf95bed5889fbadf86~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

* 现在，我们可以根据2.1.2节生成的内圆角做一些变动，看看能不能得到我们想要的效果
* 遮罩一：

```css
.card-002 {
  background: #ff6810;
  -webkit-mask: radial-gradient(circle at left, transparent 20rpx, pink 20rpx) 0 100% /51% no-repeat, radial-gradient(circle at right, transparent 20rpx, pink 20rpx) 100% 0 /51% no-repeat;
}
```

* 遮罩二：

```css
.card-002 {
  background: #ff6810;
  -webkit-mask: radial-gradient(circle at 20rpx center, transparent 20rpx, red 0) -20rpx;
}
```

* 上述两个遮罩（遮罩的形成与2.1.2节一致，这里不再赘述）都可以形成内凹圆角

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d1c93449c4b45f4b58d50f1f7be003b~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

\-参考 [XboxYan-CSS 实现优惠券的技巧](https://link.juejin.cn/?target=https%3A%2F%2Fsegmentfault.com%2Fa%2F1190000039742398 "https://segmentfault.com/a/1190000039742398")这篇文章， 利用-webkit-mask-composite设置重叠区域的展示，设置source-in，只显示重合的地方，也可以实现两个内圆角

```css
.card-002 {
  background: #ff6810;
  -webkit-mask: radial-gradient(circle at left, transparent 20rpx, pink 20rpx),
    radial-gradient(circle at right, transparent 20rpx, pink 20rpx);
  -webkit-mask-composite: source-in;
}
```

* 添加drop-shadow投影，发现添加木有效果，为什么呢？
* 那换种思路，将投影加在元素上，把mask遮罩放到伪元素上试试，果真可以了，试着分析一下，mask进行裁剪的时候会将投影也裁掉

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/da6c274ef21249ce923104a8e9ec9044~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

```css
.card-002{
 width: 700rpx;
    height: 250rpx;
    position: relative;
    filter: drop-shadow(2px 2px 1px rgba(0, 0, 0, .3));
}
```

```css
.card-002::after {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  background: #ff6810;
  border-radius: 20rpx;
  -webkit-mask: radial-gradient(circle at 20rpx center, transparent 20rpx, red 0) -20rpx;
  mask: radial-gradient(circle at 20rpx center, transparent 20rpx, red 0) -20rpx;
}
```

* 将优惠券的背景修改为渐变色试试

```css
--c1: orange;
--c2: #ff2e63;
background: linear-gradient(35deg, var(--c1), var(--c2));
```

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0a018e7e697d43e38d39b3f89994212a~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

##### 综上所述，使用mask遮罩实现内凹圆角无疑是最佳方法

### 2.2 实现矩形四边1/4的内圆角

> 假设我们要实现这样的一个效果，矩形四边分别有1/4的圆角，有几种实现方式呢？

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d2354d61709449d8952ab093a889e91a~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

* 可以把这个想象成四个透明的的1/4内圆角

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/af90bfc7eef244dbb63447c7dd80b91e~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

#### 2.2.1 radial-gradient渐变

* 先实现一个透明的的1/4内圆角

```css
background: radial-gradient(circle at 0 0, transparent 20rpx, #ff6810 0) ;
```

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f0c137af78b94839b09fd79c6c296f47~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

* 按照左上，左下，右上，右下的位置，添上4个圆角，并调整background-position，background-size

```css
  background: radial-gradient(circle at left 0, transparent 20rpx, pink 0) left 0 /50% 50% no-repeat,
    radial-gradient(circle at right 0, transparent 20rpx, skyblue 0) right 0 /50% 50% no-repeat,
    radial-gradient(circle at left 100%, transparent 20rpx, orange 0) left 100% /50% 50% no-repeat,
    radial-gradient(circle at right 100%, transparent 20rpx, #a6d1a9 0) right 100% /50% 50% no-repeat;
```

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bfbf1db0a18e4bbe9ccbfd80c005b5ff~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

或者将起始点设置到左边20rpx，上边20rpx，并调整background-position位置

```css
.card-003 {
  background: radial-gradient(circle at 20rpx 20rpx, transparent 20rpx, #ff6810 0) -20rpx -20rpx;
 filter: drop-shadow(2px 2px 1px rgba(0, 0, 0, .3));
}
```

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/45c6bb9eab9b48958d4512bf3ad7838e~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

#### 2.2.2 mask遮罩

* 其实，mask遮罩的内容与radial-gradient渐变的内容是一致的，我们可以按照2.2.1的内容实现两种遮罩
* 遮罩一：

```css
  background:slateblue;
  -webkit-mask: radial-gradient(circle at left 0, transparent 20rpx, pink 0) left 0 /50% 50% no-repeat,
    radial-gradient(circle at right 0, transparent 20rpx, skyblue 0) right 0 /50% 50% no-repeat,
    radial-gradient(circle at left 100%, transparent 20rpx, orange 0) left 100% /50% 50% no-repeat,
    radial-gradient(circle at right 100%, transparent 20rpx, #a6d1a9 0) right 100% /50% 50% no-repeat;
```

* 遮罩二：

```css
.card-004{
 position: relative;
 filter: drop-shadow(2px 2px 1px rgba(0, 0, 0, .3));
}
.card-004::after {
  -webkit-mask: radial-gradient(circle at 20rpx 20rpx, transparent 20rpx, red 0) -20rpx -20rpx;
  background: slateblue;
}
```

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc67e9bcc9a44f4cbc400f932fdc6a19~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

* 背景设置为渐变色

```css
  background: linear-gradient(to right, var(--c1) 0%, var(--c2) 100%);
```

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fcbb294dd90847ec8671ec6adddc7c9c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

### 2.3 实现一个内凹圆角边框

> 假设我们要实现这样的一个效果，内凹圆角边框，有几种实现方式呢？

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1a9297c3d75041ab8f10307939e21158~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

#### 2.3.1 mask遮罩+多重drop-shadow

* 参考 [XboxYan-CSS filter生成不规则边框](https://link.juejin.cn/?target=https%3A%2F%2Fsegmentfault.com%2Fa%2F1190000040490964 "https://segmentfault.com/a/1190000040490964")这篇文章，利用多重投影drop-shadow

* 因为mask会裁剪掉drop-shadow，所以要把mask渐变写到器伪元素上

* 由于mask是显示非透明部分，所以要为元素设置背景色，不能为transparent，即与页面的背景色一致

```css
.card-005 {
  filter: drop-shadow(0 0 2rpx) drop-shadow(0 0 0) drop-shadow(0 0 0) drop-shadow(0 0 0) drop-shadow(0 0 0);
  //投影的颜色默认是跟随当前文字颜色的
  color: #eb4f8b;
}
```

```css
.card-005::after {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  border-radius: 20rpx;
  -webkit-mask: radial-gradient(circle at 20rpx center, transparent 20rpx, red 0) -20rpx;
  //页面的背景色
  background: var(--bg);
}
```

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/235ce1f709d748399ae2e8164a6e6187~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

#### 2.3.1 mask遮罩+伪元素+border

* 设置border+mask遮罩

```css
  -webkit-mask: radial-gradient(circle at 20rpx center, transparent 18rpx, #000 0) -20rpx;
  color: #ff6810;
  border: 3rpx solid #ff6810;
```

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d11dc1432fc245ae9119ad96b4307b4b~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

添加两个半圆伪元素，背景色与border颜色一致，调整好相应位置

```css
.card-006::before,
.card-006::after {
  content: '';
  position: absolute;
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  background-color: #ff6810;
  top: calc(50% - 21rpx);
}
.card-006::before {
  left: -3%;
}
.card-006::after {
  right: -3%;
}
```

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/64d07b1c26d0455c8a5b7829517caeae~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

3.实现代码
------

**内容较多，这里展示前两个demo，完整代码请戳这里:🍡[苏苏的github](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fsusu-hu%2Fsusu-mini-tem "https://github.com/susu-hu/susu-mini-tem")， 🍪[苏苏的码云](https://link.juejin.cn/?target=https%3A%2F%2Fgitee.com%2Fsusuhhhhhh%2Fwxmini_demo "https://gitee.com/susuhhhhhh/wxmini_demo")**

```html
<!-- 样式1 -->
<view class="card-box">
  <view class="card-name">苏苏就是小苏苏哇</view>
  <view class="card-banner">VIP</view>
  <view class="card-content">
    <text>剩余</text>
    <text>88888</text>
    <text>元</text>
  </view>
  <view class="flex-row j_c card-btm">
    <view class="flex-column j_c card-btm-item">
      <text>已获得奖项</text>
      <text>888个</text>
    </view>
    <view class="flex-column j_c card-btm-item">
      <text>已出售</text>
      <text>1008个</text>
    </view>
    <view class="flex-column j_c card-btm-item">
      <text>已买入</text>
      <text>999个</text>
    </view>
  </view>
</view>
<!-- 样式2 -->
<view class="coupon-box flex">
  <view class="cou-banner">即将过期</view>
  <view class="cou-left flex-row j_c">
    <view>
      <text>888</text>
      <text>元</text>
    </view>
  </view>
  <view class="cou-right flex-row ">
    <view>
      <view>苏苏就是小苏苏哇--苏苏</view>
      <view class="cou-right-time">剩余 23:59:59</view>
    </view>
  </view>
</view>
```

```css
/*样式1*/
.card-box {
  width: 700rpx;
  height: 360rpx;
  margin: 0 auto 20px;
  border-radius: 30rpx;
  overflow: hidden;
  box-sizing: border-box;
  padding: 20rpx;
  filter: drop-shadow(2px 2px 1px rgba(0, 0, 0, .3));
  position: relative;
  color: #fff;
}
.card-box::after {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: linear-gradient(35deg, var(--c1), var(--c2));
  -webkit-mask: radial-gradient(circle at 20rpx 65%, transparent 20rpx, red 0) -20rpx;
  mask: radial-gradient(circle at 20rpx 65%, transparent 20rpx, red 0) -20rpx;
  z-index: -1;
  animation: bgchange 3s infinite ease-in-out alternate-reverse;
}
@keyframes bgchange {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(-50deg);
  }
}
.card-name {
  font-size: 40rpx;
  font-weight: bold;
  letter-spacing: 2rpx;
  margin-bottom: 45rpx;
}
.card-banner {
  position: absolute;
  display: inline-block;
  min-width: 100rpx;
  padding: 10rpx 0;
  text-align: center;
  height: 30rpx;
  line-height: 30rpx;
  border-radius: 30rpx;
  background: rgba(255, 255, 255, .26);
  top: 20rpx;
  right: 20rpx;
}
.card-content {
  font-size: 28rpx;
  display: flex;
  align-items: baseline;
  justify-content: center;
  position: relative;
  margin-bottom: 40rpx;
}
.card-content::before {
  content: '';
  width: 600rpx;
  height: 3rpx;
  position: absolute;
  background-image: linear-gradient(90deg, var(--c3) 50%, transparent 50%);
  background-size: 30rpx 30rpx;
  left: calc(50% - 300rpx);
  bottom: -30rpx;
}
.card-content text:nth-child(2) {
  font-size: 80rpx;
  line-height: 90rpx;
  letter-spacing: 2rpx;
  margin: 0px 20rpx;
}
.card-btm {
  font-size: 28rpx;
}
.card-btm-item {
  width: 30%;
  line-height: 48rpx;
}
/*样式2*/
.coupon-box {
  width: 700rpx;
  height: 220rpx;
  overflow: hidden;
  border-radius: 20rpx;
  position: relative;
  background: radial-gradient(circle at right top, transparent 18rpx, var(--c4) 0) top left / 215rpx 51% no-repeat,
    radial-gradient(circle at right bottom, transparent 18rpx, var(--c4) 0) bottom left /215rpx 51% no-repeat,
    radial-gradient(circle at left top, transparent 18rpx, var(--c5) 0) top right /487rpx 51% no-repeat,
    radial-gradient(circle at left bottom, transparent 18rpx, var(--c5) 0) bottom right /487rpx 51% no-repeat;
  filter: drop-shadow(2px 2px 1px rgba(0, 0, 0, .3));
  margin: 20px auto;
  /*解决filter-导致border-radius生效*/
  transform: translate3d(0, 0, 0);
}
.coupon-box::after {
  content: '';
  height: 184rpx;
  width: 3rpx;
  background-image: linear-gradient(0deg, #fff 50%, transparent 50%);
  background-size: 20rpx 20rpx;
  position: absolute;
  left: 212rpx;
  top: 0;
  bottom: 0;
  margin: auto;

}
.cou-banner {
  position: absolute;
  left: 0;
  top: 0;
  min-width: 130rpx;
  text-align: center;
  padding: 0 10rpx;
  line-height: 45rpx;
  height: 45rpx;
  font-size: 25rpx;
  color: red;
  background: rgba(255, 165, 0, .2);
  border-radius: 20rpx 0 20rpx 0;
}
.cou-left {
  width: 214rpx;
  height: 100%;
  font-size: 25rpx;
  color: red;
}
.cou-left text:nth-child(1) {
  font-size: 35px;
}
.cou-right {
  width: 484rpx;
  height: 100%;
  box-sizing: border-box;
  padding: 20rpx 20rpx 20rpx 35rpx;
  color: #333;
  font-size: 30rpx;
  font-weight: bold;
  line-height: 48rpx;
}
.cou-right-time {
  color: red;
}
```
