import{_ as s,o as n,c as a,a as l}from"./app.1fbcae6f.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{"createTime":"2022/11/08","tag":"工程化,vite,适配"},"headers":[{"level":2,"title":"基于rem的适配方案","slug":"基于rem的适配方案","link":"#基于rem的适配方案","children":[{"level":3,"title":"rem是什么？","slug":"rem是什么","link":"#rem是什么","children":[]},{"level":3,"title":"适用场景","slug":"适用场景","link":"#适用场景","children":[]},{"level":3,"title":"项目实战","slug":"项目实战","link":"#项目实战","children":[]}]},{"level":2,"title":"基于scale的适配方案","slug":"基于scale的适配方案","link":"#基于scale的适配方案","children":[{"level":3,"title":"适用场景","slug":"适用场景-1","link":"#适用场景-1","children":[]},{"level":3,"title":"项目实战","slug":"项目实战-1","link":"#项目实战-1","children":[]}]}],"relativePath":"engineering/vite/screen-adaptation/index.md","lastUpdated":1667878485000}'),p={name:"engineering/vite/screen-adaptation/index.md"},e=l(`<h2 id="基于rem的适配方案" tabindex="-1">基于rem的适配方案 <a class="header-anchor" href="#基于rem的适配方案" aria-hidden="true">#</a></h2><h3 id="rem是什么" tabindex="-1">rem是什么？ <a class="header-anchor" href="#rem是什么" aria-hidden="true">#</a></h3><p>rem是指相对于根元素的字体大小的单位，在日常开发过程中我们通常把根元素（html/body）的字体设置为10px,方便于我们计算（此时子元素的1rem就相当于10px）。</p><h3 id="适用场景" tabindex="-1">适用场景 <a class="header-anchor" href="#适用场景" aria-hidden="true">#</a></h3><p>不固定宽高比的Web应用，适用于绝大部分业务场景 <img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dff5429951ce4068bc19ae37bdbcc6af~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="px2rem.gif"></p><h3 id="项目实战" tabindex="-1">项目实战 <a class="header-anchor" href="#项目实战" aria-hidden="true">#</a></h3><ol><li>安装依赖</li></ol><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#abb2bf;">npm i postcss-pxtorem autoprefixer amfe-flexible --save-dev</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span></code></pre><pre class="shiki material-palenight vp-code-light"><code><span class="line"><span style="color:#A6ACCD;">npm i postcss-pxtorem autoprefixer amfe-flexible --save-dev</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><blockquote><p>postcss-pxtorem 是PostCSS的插件，用于将像素单元生成rem单位<br> autoprefixer 浏览器前缀处理插件<br> amfe-flexible 可伸缩布局方案 替代了原先的<code>lib-flexible</code> 选用了当前众多浏览器兼容的<code>viewport</code></p></blockquote><ol start="2"><li>项目根目录创建 <code>postcss.config.js</code> 文件 <img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dc6ec08fb25b44aeaa9254e725389169~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="QQ图片20220927110819.png"></li></ol><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#abb2bf;">module.exports = {</span></span>
<span class="line"><span style="color:#abb2bf;"> plugins: {</span></span>
<span class="line"><span style="color:#abb2bf;">  autoprefixer: {</span></span>
<span class="line"><span style="color:#abb2bf;">   overrideBrowserslist: [</span></span>
<span class="line"><span style="color:#abb2bf;">    &quot;Android 4.1&quot;,</span></span>
<span class="line"><span style="color:#abb2bf;">    &quot;iOS 7.1&quot;,</span></span>
<span class="line"><span style="color:#abb2bf;">    &quot;Chrome &gt; 31&quot;,</span></span>
<span class="line"><span style="color:#abb2bf;">    &quot;ff &gt; 31&quot;,</span></span>
<span class="line"><span style="color:#abb2bf;">    &quot;ie &gt;= 8&quot;,</span></span>
<span class="line"><span style="color:#abb2bf;">    &quot;last 10 versions&quot;, // 所有主流浏览器最近10版本用</span></span>
<span class="line"><span style="color:#abb2bf;">   ],</span></span>
<span class="line"><span style="color:#abb2bf;">   grid: true,</span></span>
<span class="line"><span style="color:#abb2bf;">  },</span></span>
<span class="line"><span style="color:#abb2bf;">  &quot;postcss-pxtorem&quot;: {</span></span>
<span class="line"><span style="color:#abb2bf;">   rootValue: 192, // 设计稿宽度的1/ 10 例如设计稿按照 1920设计 此处就为192</span></span>
<span class="line"><span style="color:#abb2bf;">   propList: [&quot;*&quot;, &quot;!border&quot;], // 除 border 外所有px 转 rem</span></span>
<span class="line"><span style="color:#abb2bf;">   selectorBlackList: [&quot;.el-&quot;], // 过滤掉.el-开头的class，不进行rem转换</span></span>
<span class="line"><span style="color:#abb2bf;">  },</span></span>
<span class="line"><span style="color:#abb2bf;"> },</span></span>
<span class="line"><span style="color:#abb2bf;">};</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;"></span></span></code></pre><pre class="shiki material-palenight vp-code-light"><code><span class="line"><span style="color:#A6ACCD;">module.exports = {</span></span>
<span class="line"><span style="color:#A6ACCD;"> plugins: {</span></span>
<span class="line"><span style="color:#A6ACCD;">  autoprefixer: {</span></span>
<span class="line"><span style="color:#A6ACCD;">   overrideBrowserslist: [</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;Android 4.1&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;iOS 7.1&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;Chrome &gt; 31&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;ff &gt; 31&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;ie &gt;= 8&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;last 10 versions&quot;, // 所有主流浏览器最近10版本用</span></span>
<span class="line"><span style="color:#A6ACCD;">   ],</span></span>
<span class="line"><span style="color:#A6ACCD;">   grid: true,</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;postcss-pxtorem&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">   rootValue: 192, // 设计稿宽度的1/ 10 例如设计稿按照 1920设计 此处就为192</span></span>
<span class="line"><span style="color:#A6ACCD;">   propList: [&quot;*&quot;, &quot;!border&quot;], // 除 border 外所有px 转 rem</span></span>
<span class="line"><span style="color:#A6ACCD;">   selectorBlackList: [&quot;.el-&quot;], // 过滤掉.el-开头的class，不进行rem转换</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;"> },</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><ol start="3"><li><code>main.ts/js</code> 文件中导入依赖</li></ol><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#abb2bf;">import &quot;amfe-flexible/index.js&quot;;</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;"></span></span></code></pre><pre class="shiki material-palenight vp-code-light"><code><span class="line"><span style="color:#A6ACCD;">import &quot;amfe-flexible/index.js&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ol start="4"><li>项目重启</li></ol><h2 id="基于scale的适配方案" tabindex="-1">基于scale的适配方案 <a class="header-anchor" href="#基于scale的适配方案" aria-hidden="true">#</a></h2><p>在CSS3中，我们可以使用transform属性的scale()方法来实现元素的缩放效果。缩放，指的是“缩小”和“放大”的意思。</p><ul><li>transform: scaleX(x); / 沿x轴方向缩放/</li><li>transform: scaleY(y); / 沿y轴方向缩放/</li><li>transform: scale(); / 同时沿x轴和y轴缩放/</li></ul><h3 id="适用场景-1" tabindex="-1">适用场景 <a class="header-anchor" href="#适用场景-1" aria-hidden="true">#</a></h3><p>固定宽高比的Web应用，如大屏或者固定窗口业务应用 <img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b9efd3e99a284af9b561a9ee7c623498~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="scale.gif"></p><h3 id="项目实战-1" tabindex="-1">项目实战 <a class="header-anchor" href="#项目实战-1" aria-hidden="true">#</a></h3><ol><li>新建<code>resize.ts/js</code>文件 <img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/679548a8cd874f47bd8d6ae5a777e6ad~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="QQ图片20220927111729.png"></li></ol><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#abb2bf;">import { ref } from &quot;vue&quot;;</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;">export default function windowResize() {</span></span>
<span class="line"><span style="color:#abb2bf;"> // * 指向最外层容器</span></span>
<span class="line"><span style="color:#abb2bf;"> const screenRef = ref();</span></span>
<span class="line"><span style="color:#abb2bf;"> // * 定时函数</span></span>
<span class="line"><span style="color:#abb2bf;"> const timer = ref(0);</span></span>
<span class="line"><span style="color:#abb2bf;"> // * 默认缩放值</span></span>
<span class="line"><span style="color:#abb2bf;"> const scale = {</span></span>
<span class="line"><span style="color:#abb2bf;">  width: &quot;1&quot;,</span></span>
<span class="line"><span style="color:#abb2bf;">  height: &quot;1&quot;,</span></span>
<span class="line"><span style="color:#abb2bf;"> };</span></span>
<span class="line"><span style="color:#abb2bf;">    </span></span>
<span class="line"><span style="color:#abb2bf;"> // * 设计稿尺寸（px）</span></span>
<span class="line"><span style="color:#abb2bf;"> const baseWidth = 1920;</span></span>
<span class="line"><span style="color:#abb2bf;"> const baseHeight = 1080;</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;"> // * 需保持的比例（默认1.77778）</span></span>
<span class="line"><span style="color:#abb2bf;"> const baseProportion = parseFloat((baseWidth / baseHeight).toFixed(5));</span></span>
<span class="line"><span style="color:#abb2bf;"> const calcRate = () =&gt; {</span></span>
<span class="line"><span style="color:#abb2bf;">  // 当前宽高比</span></span>
<span class="line"><span style="color:#abb2bf;">  const currentRate = parseFloat(</span></span>
<span class="line"><span style="color:#abb2bf;">   (window.innerWidth / window.innerHeight).toFixed(5)</span></span>
<span class="line"><span style="color:#abb2bf;">  );</span></span>
<span class="line"><span style="color:#abb2bf;">  if (screenRef.value) {</span></span>
<span class="line"><span style="color:#abb2bf;">   if (currentRate &gt; baseProportion) {</span></span>
<span class="line"><span style="color:#abb2bf;">    // 表示更宽</span></span>
<span class="line"><span style="color:#abb2bf;">    scale.width = (</span></span>
<span class="line"><span style="color:#abb2bf;">     (window.innerHeight * baseProportion) /</span></span>
<span class="line"><span style="color:#abb2bf;">     baseWidth</span></span>
<span class="line"><span style="color:#abb2bf;">    ).toFixed(5);</span></span>
<span class="line"><span style="color:#abb2bf;">    scale.height = (window.innerHeight / baseHeight).toFixed(5);</span></span>
<span class="line"><span style="color:#abb2bf;">    screenRef.value.style.transform = \`scale(\${scale.width}, \${scale.height})\`;</span></span>
<span class="line"><span style="color:#abb2bf;">   } else {</span></span>
<span class="line"><span style="color:#abb2bf;">    // 表示更高</span></span>
<span class="line"><span style="color:#abb2bf;">    scale.height = (</span></span>
<span class="line"><span style="color:#abb2bf;">     window.innerWidth /</span></span>
<span class="line"><span style="color:#abb2bf;">     baseProportion /</span></span>
<span class="line"><span style="color:#abb2bf;">     baseHeight</span></span>
<span class="line"><span style="color:#abb2bf;">    ).toFixed(5);</span></span>
<span class="line"><span style="color:#abb2bf;">    scale.width = (window.innerWidth / baseWidth).toFixed(5);</span></span>
<span class="line"><span style="color:#abb2bf;">    screenRef.value.style.transform = \`scale(\${scale.width}, \${scale.height})\`;</span></span>
<span class="line"><span style="color:#abb2bf;">   }</span></span>
<span class="line"><span style="color:#abb2bf;">  }</span></span>
<span class="line"><span style="color:#abb2bf;"> };</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;"> const resize = () =&gt; {</span></span>
<span class="line"><span style="color:#abb2bf;">  clearTimeout(timer.value);</span></span>
<span class="line"><span style="color:#abb2bf;">  timer.value = window.setTimeout(() =&gt; {</span></span>
<span class="line"><span style="color:#abb2bf;">   calcRate();</span></span>
<span class="line"><span style="color:#abb2bf;">  }, 200);</span></span>
<span class="line"><span style="color:#abb2bf;"> };</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;"> // 改变窗口大小重新绘制</span></span>
<span class="line"><span style="color:#abb2bf;"> const windowDraw = () =&gt; {</span></span>
<span class="line"><span style="color:#abb2bf;">  window.addEventListener(&quot;resize&quot;, resize);</span></span>
<span class="line"><span style="color:#abb2bf;"> };</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;"> // 改变窗口大小重新绘制</span></span>
<span class="line"><span style="color:#abb2bf;"> const unWindowDraw = () =&gt; {</span></span>
<span class="line"><span style="color:#abb2bf;">  window.removeEventListener(&quot;resize&quot;, resize);</span></span>
<span class="line"><span style="color:#abb2bf;"> };</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;"> return {</span></span>
<span class="line"><span style="color:#abb2bf;">  screenRef,</span></span>
<span class="line"><span style="color:#abb2bf;">  calcRate,</span></span>
<span class="line"><span style="color:#abb2bf;">  windowDraw,</span></span>
<span class="line"><span style="color:#abb2bf;">  unWindowDraw,</span></span>
<span class="line"><span style="color:#abb2bf;"> };</span></span>
<span class="line"><span style="color:#abb2bf;">}</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;"></span></span></code></pre><pre class="shiki material-palenight vp-code-light"><code><span class="line"><span style="color:#A6ACCD;">import { ref } from &quot;vue&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">export default function windowResize() {</span></span>
<span class="line"><span style="color:#A6ACCD;"> // * 指向最外层容器</span></span>
<span class="line"><span style="color:#A6ACCD;"> const screenRef = ref();</span></span>
<span class="line"><span style="color:#A6ACCD;"> // * 定时函数</span></span>
<span class="line"><span style="color:#A6ACCD;"> const timer = ref(0);</span></span>
<span class="line"><span style="color:#A6ACCD;"> // * 默认缩放值</span></span>
<span class="line"><span style="color:#A6ACCD;"> const scale = {</span></span>
<span class="line"><span style="color:#A6ACCD;">  width: &quot;1&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  height: &quot;1&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;"> };</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span></span>
<span class="line"><span style="color:#A6ACCD;"> // * 设计稿尺寸（px）</span></span>
<span class="line"><span style="color:#A6ACCD;"> const baseWidth = 1920;</span></span>
<span class="line"><span style="color:#A6ACCD;"> const baseHeight = 1080;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"> // * 需保持的比例（默认1.77778）</span></span>
<span class="line"><span style="color:#A6ACCD;"> const baseProportion = parseFloat((baseWidth / baseHeight).toFixed(5));</span></span>
<span class="line"><span style="color:#A6ACCD;"> const calcRate = () =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  // 当前宽高比</span></span>
<span class="line"><span style="color:#A6ACCD;">  const currentRate = parseFloat(</span></span>
<span class="line"><span style="color:#A6ACCD;">   (window.innerWidth / window.innerHeight).toFixed(5)</span></span>
<span class="line"><span style="color:#A6ACCD;">  );</span></span>
<span class="line"><span style="color:#A6ACCD;">  if (screenRef.value) {</span></span>
<span class="line"><span style="color:#A6ACCD;">   if (currentRate &gt; baseProportion) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 表示更宽</span></span>
<span class="line"><span style="color:#A6ACCD;">    scale.width = (</span></span>
<span class="line"><span style="color:#A6ACCD;">     (window.innerHeight * baseProportion) /</span></span>
<span class="line"><span style="color:#A6ACCD;">     baseWidth</span></span>
<span class="line"><span style="color:#A6ACCD;">    ).toFixed(5);</span></span>
<span class="line"><span style="color:#A6ACCD;">    scale.height = (window.innerHeight / baseHeight).toFixed(5);</span></span>
<span class="line"><span style="color:#A6ACCD;">    screenRef.value.style.transform = \`scale(\${scale.width}, \${scale.height})\`;</span></span>
<span class="line"><span style="color:#A6ACCD;">   } else {</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 表示更高</span></span>
<span class="line"><span style="color:#A6ACCD;">    scale.height = (</span></span>
<span class="line"><span style="color:#A6ACCD;">     window.innerWidth /</span></span>
<span class="line"><span style="color:#A6ACCD;">     baseProportion /</span></span>
<span class="line"><span style="color:#A6ACCD;">     baseHeight</span></span>
<span class="line"><span style="color:#A6ACCD;">    ).toFixed(5);</span></span>
<span class="line"><span style="color:#A6ACCD;">    scale.width = (window.innerWidth / baseWidth).toFixed(5);</span></span>
<span class="line"><span style="color:#A6ACCD;">    screenRef.value.style.transform = \`scale(\${scale.width}, \${scale.height})\`;</span></span>
<span class="line"><span style="color:#A6ACCD;">   }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;"> };</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"> const resize = () =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  clearTimeout(timer.value);</span></span>
<span class="line"><span style="color:#A6ACCD;">  timer.value = window.setTimeout(() =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">   calcRate();</span></span>
<span class="line"><span style="color:#A6ACCD;">  }, 200);</span></span>
<span class="line"><span style="color:#A6ACCD;"> };</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"> // 改变窗口大小重新绘制</span></span>
<span class="line"><span style="color:#A6ACCD;"> const windowDraw = () =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  window.addEventListener(&quot;resize&quot;, resize);</span></span>
<span class="line"><span style="color:#A6ACCD;"> };</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"> // 改变窗口大小重新绘制</span></span>
<span class="line"><span style="color:#A6ACCD;"> const unWindowDraw = () =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  window.removeEventListener(&quot;resize&quot;, resize);</span></span>
<span class="line"><span style="color:#A6ACCD;"> };</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"> return {</span></span>
<span class="line"><span style="color:#A6ACCD;">  screenRef,</span></span>
<span class="line"><span style="color:#A6ACCD;">  calcRate,</span></span>
<span class="line"><span style="color:#A6ACCD;">  windowDraw,</span></span>
<span class="line"><span style="color:#A6ACCD;">  unWindowDraw,</span></span>
<span class="line"><span style="color:#A6ACCD;"> };</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br></div></div><ol start="2"><li>相关界面引入<code>resize.ts/js</code> <img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/464430e5a9fc458a924482d0d3d7bb9f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="QQ图片20220927112000.png"></li></ol><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#abb2bf;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#abb2bf;">    &lt;div class=&quot;screen-container&quot;&gt;</span></span>
<span class="line"><span style="color:#abb2bf;">        &lt;div class=&quot;screen-content&quot; ref=&quot;screenRef&quot;&gt;</span></span>
<span class="line"><span style="color:#abb2bf;">            &lt;span class=&quot;screen-title&quot;&gt;基于scale的适配方案&lt;/span&gt;</span></span>
<span class="line"><span style="color:#abb2bf;">            &lt;img class=&quot;screen-img&quot; src=&quot;https://img2.baidu.com/it/u=1297807229,3828610143&amp;fm=253&amp;fmt=auto&amp;app=138&amp;f=JPEG?w=500&amp;h=281&quot; alt=&quot;&quot;&gt;</span></span>
<span class="line"><span style="color:#abb2bf;">        &lt;/div&gt;</span></span>
<span class="line"><span style="color:#abb2bf;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#abb2bf;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;">&lt;script setup lang=&quot;ts&quot;&gt;</span></span>
<span class="line"><span style="color:#abb2bf;">import windowResize from &#39;../../utils/resize&#39;;</span></span>
<span class="line"><span style="color:#abb2bf;">import {onMounted, onUnmounted} from &#39;vue&#39;;</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;">const { screenRef, calcRate, windowDraw, unWindowDraw } = windowResize()</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;">onMounted(() =&gt; {</span></span>
<span class="line"><span style="color:#abb2bf;">    // 监听浏览器窗口尺寸变化</span></span>
<span class="line"><span style="color:#abb2bf;">    windowDraw()</span></span>
<span class="line"><span style="color:#abb2bf;">    calcRate()</span></span>
<span class="line"><span style="color:#abb2bf;">})</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;">onUnmounted(() =&gt; {</span></span>
<span class="line"><span style="color:#abb2bf;">    unWindowDraw();</span></span>
<span class="line"><span style="color:#abb2bf;">})</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;">&lt;/script&gt;</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;">&lt;style lang=&quot;scss&quot; scoped&gt;</span></span>
<span class="line"><span style="color:#abb2bf;">.screen-container {</span></span>
<span class="line"><span style="color:#abb2bf;">    height: 100%;</span></span>
<span class="line"><span style="color:#abb2bf;">    background-color: lightcyan;</span></span>
<span class="line"><span style="color:#abb2bf;">    display: flex;</span></span>
<span class="line"><span style="color:#abb2bf;">    justify-content: center;</span></span>
<span class="line"><span style="color:#abb2bf;">    align-items: center;</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;">    .screen-content {</span></span>
<span class="line"><span style="color:#abb2bf;">        width: 1920px;</span></span>
<span class="line"><span style="color:#abb2bf;">        height: 1080px;</span></span>
<span class="line"><span style="color:#abb2bf;">        background-color: #fff;</span></span>
<span class="line"><span style="color:#abb2bf;">        display: flex;</span></span>
<span class="line"><span style="color:#abb2bf;">        justify-content: center;</span></span>
<span class="line"><span style="color:#abb2bf;">        align-items: center;</span></span>
<span class="line"><span style="color:#abb2bf;">        flex-direction: column;</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;">        .screen-title {</span></span>
<span class="line"><span style="color:#abb2bf;">            font-size: 32px;</span></span>
<span class="line"><span style="color:#abb2bf;">        }</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;">        .screen-img {</span></span>
<span class="line"><span style="color:#abb2bf;">            margin-top: 20px;</span></span>
<span class="line"><span style="color:#abb2bf;">        }</span></span>
<span class="line"><span style="color:#abb2bf;">    }</span></span>
<span class="line"><span style="color:#abb2bf;">}</span></span>
<span class="line"><span style="color:#abb2bf;">&lt;/style&gt;</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;"></span></span></code></pre><pre class="shiki material-palenight vp-code-light"><code><span class="line"><span style="color:#A6ACCD;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div class=&quot;screen-container&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;div class=&quot;screen-content&quot; ref=&quot;screenRef&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            &lt;span class=&quot;screen-title&quot;&gt;基于scale的适配方案&lt;/span&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            &lt;img class=&quot;screen-img&quot; src=&quot;https://img2.baidu.com/it/u=1297807229,3828610143&amp;fm=253&amp;fmt=auto&amp;app=138&amp;f=JPEG?w=500&amp;h=281&quot; alt=&quot;&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;script setup lang=&quot;ts&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">import windowResize from &#39;../../utils/resize&#39;;</span></span>
<span class="line"><span style="color:#A6ACCD;">import {onMounted, onUnmounted} from &#39;vue&#39;;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const { screenRef, calcRate, windowDraw, unWindowDraw } = windowResize()</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">onMounted(() =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 监听浏览器窗口尺寸变化</span></span>
<span class="line"><span style="color:#A6ACCD;">    windowDraw()</span></span>
<span class="line"><span style="color:#A6ACCD;">    calcRate()</span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">onUnmounted(() =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">    unWindowDraw();</span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;style lang=&quot;scss&quot; scoped&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">.screen-container {</span></span>
<span class="line"><span style="color:#A6ACCD;">    height: 100%;</span></span>
<span class="line"><span style="color:#A6ACCD;">    background-color: lightcyan;</span></span>
<span class="line"><span style="color:#A6ACCD;">    display: flex;</span></span>
<span class="line"><span style="color:#A6ACCD;">    justify-content: center;</span></span>
<span class="line"><span style="color:#A6ACCD;">    align-items: center;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    .screen-content {</span></span>
<span class="line"><span style="color:#A6ACCD;">        width: 1920px;</span></span>
<span class="line"><span style="color:#A6ACCD;">        height: 1080px;</span></span>
<span class="line"><span style="color:#A6ACCD;">        background-color: #fff;</span></span>
<span class="line"><span style="color:#A6ACCD;">        display: flex;</span></span>
<span class="line"><span style="color:#A6ACCD;">        justify-content: center;</span></span>
<span class="line"><span style="color:#A6ACCD;">        align-items: center;</span></span>
<span class="line"><span style="color:#A6ACCD;">        flex-direction: column;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        .screen-title {</span></span>
<span class="line"><span style="color:#A6ACCD;">            font-size: 32px;</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        .screen-img {</span></span>
<span class="line"><span style="color:#A6ACCD;">            margin-top: 20px;</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br></div></div>`,24),c=[e];function o(r,t,i,b,u,y){return n(),a("div",null,c)}const A=s(p,[["render",o]]);export{m as __pageData,A as default};
