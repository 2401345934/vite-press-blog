import{_ as s,o as n,c as a,aa as p}from"./chunks/framework.DJCjJe2w.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{"createTime":"2022/11/08","tag":"工程化,vite,适配"},"headers":[],"relativePath":"engineering/vite/screen-adaptation/index.md","filePath":"engineering/vite/screen-adaptation/index.md","lastUpdated":1667878485000}'),e={name:"engineering/vite/screen-adaptation/index.md"},l=p(`<h2 id="基于rem的适配方案" tabindex="-1">基于rem的适配方案 <a class="header-anchor" href="#基于rem的适配方案" aria-label="Permalink to &quot;基于rem的适配方案&quot;">​</a></h2><h3 id="rem是什么" tabindex="-1">rem是什么？ <a class="header-anchor" href="#rem是什么" aria-label="Permalink to &quot;rem是什么？&quot;">​</a></h3><p>rem是指相对于根元素的字体大小的单位，在日常开发过程中我们通常把根元素（html/body）的字体设置为10px,方便于我们计算（此时子元素的1rem就相当于10px）。</p><h3 id="适用场景" tabindex="-1">适用场景 <a class="header-anchor" href="#适用场景" aria-label="Permalink to &quot;适用场景&quot;">​</a></h3><p>不固定宽高比的Web应用，适用于绝大部分业务场景 <img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dff5429951ce4068bc19ae37bdbcc6af~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="px2rem.gif"></p><h3 id="项目实战" tabindex="-1">项目实战 <a class="header-anchor" href="#项目实战" aria-label="Permalink to &quot;项目实战&quot;">​</a></h3><ol><li>安装依赖</li></ol><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>npm i postcss-pxtorem autoprefixer amfe-flexible --save-dev</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><blockquote><p>postcss-pxtorem 是PostCSS的插件，用于将像素单元生成rem单位<br> autoprefixer 浏览器前缀处理插件<br> amfe-flexible 可伸缩布局方案 替代了原先的<code>lib-flexible</code> 选用了当前众多浏览器兼容的<code>viewport</code></p></blockquote><ol start="2"><li>项目根目录创建 <code>postcss.config.js</code> 文件 <img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dc6ec08fb25b44aeaa9254e725389169~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="QQ图片20220927110819.png"></li></ol><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>module.exports = {</span></span>
<span class="line"><span> plugins: {</span></span>
<span class="line"><span>  autoprefixer: {</span></span>
<span class="line"><span>   overrideBrowserslist: [</span></span>
<span class="line"><span>    &quot;Android 4.1&quot;,</span></span>
<span class="line"><span>    &quot;iOS 7.1&quot;,</span></span>
<span class="line"><span>    &quot;Chrome &gt; 31&quot;,</span></span>
<span class="line"><span>    &quot;ff &gt; 31&quot;,</span></span>
<span class="line"><span>    &quot;ie &gt;= 8&quot;,</span></span>
<span class="line"><span>    &quot;last 10 versions&quot;, // 所有主流浏览器最近10版本用</span></span>
<span class="line"><span>   ],</span></span>
<span class="line"><span>   grid: true,</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  &quot;postcss-pxtorem&quot;: {</span></span>
<span class="line"><span>   rootValue: 192, // 设计稿宽度的1/ 10 例如设计稿按照 1920设计 此处就为192</span></span>
<span class="line"><span>   propList: [&quot;*&quot;, &quot;!border&quot;], // 除 border 外所有px 转 rem</span></span>
<span class="line"><span>   selectorBlackList: [&quot;.el-&quot;], // 过滤掉.el-开头的class，不进行rem转换</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span> },</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><ol start="3"><li><code>main.ts/js</code> 文件中导入依赖</li></ol><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import &quot;amfe-flexible/index.js&quot;;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><ol start="4"><li>项目重启</li></ol><h2 id="基于scale的适配方案" tabindex="-1">基于scale的适配方案 <a class="header-anchor" href="#基于scale的适配方案" aria-label="Permalink to &quot;基于scale的适配方案&quot;">​</a></h2><p>在CSS3中，我们可以使用transform属性的scale()方法来实现元素的缩放效果。缩放，指的是“缩小”和“放大”的意思。</p><ul><li>transform: scaleX(x); / 沿x轴方向缩放/</li><li>transform: scaleY(y); / 沿y轴方向缩放/</li><li>transform: scale(); / 同时沿x轴和y轴缩放/</li></ul><h3 id="适用场景-1" tabindex="-1">适用场景 <a class="header-anchor" href="#适用场景-1" aria-label="Permalink to &quot;适用场景&quot;">​</a></h3><p>固定宽高比的Web应用，如大屏或者固定窗口业务应用 <img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b9efd3e99a284af9b561a9ee7c623498~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="scale.gif"></p><h3 id="项目实战-1" tabindex="-1">项目实战 <a class="header-anchor" href="#项目实战-1" aria-label="Permalink to &quot;项目实战&quot;">​</a></h3><ol><li>新建<code>resize.ts/js</code>文件 <img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/679548a8cd874f47bd8d6ae5a777e6ad~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="QQ图片20220927111729.png"></li></ol><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { ref } from &quot;vue&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default function windowResize() {</span></span>
<span class="line"><span> // * 指向最外层容器</span></span>
<span class="line"><span> const screenRef = ref();</span></span>
<span class="line"><span> // * 定时函数</span></span>
<span class="line"><span> const timer = ref(0);</span></span>
<span class="line"><span> // * 默认缩放值</span></span>
<span class="line"><span> const scale = {</span></span>
<span class="line"><span>  width: &quot;1&quot;,</span></span>
<span class="line"><span>  height: &quot;1&quot;,</span></span>
<span class="line"><span> };</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span> // * 设计稿尺寸（px）</span></span>
<span class="line"><span> const baseWidth = 1920;</span></span>
<span class="line"><span> const baseHeight = 1080;</span></span>
<span class="line"><span></span></span>
<span class="line"><span> // * 需保持的比例（默认1.77778）</span></span>
<span class="line"><span> const baseProportion = parseFloat((baseWidth / baseHeight).toFixed(5));</span></span>
<span class="line"><span> const calcRate = () =&gt; {</span></span>
<span class="line"><span>  // 当前宽高比</span></span>
<span class="line"><span>  const currentRate = parseFloat(</span></span>
<span class="line"><span>   (window.innerWidth / window.innerHeight).toFixed(5)</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>  if (screenRef.value) {</span></span>
<span class="line"><span>   if (currentRate &gt; baseProportion) {</span></span>
<span class="line"><span>    // 表示更宽</span></span>
<span class="line"><span>    scale.width = (</span></span>
<span class="line"><span>     (window.innerHeight * baseProportion) /</span></span>
<span class="line"><span>     baseWidth</span></span>
<span class="line"><span>    ).toFixed(5);</span></span>
<span class="line"><span>    scale.height = (window.innerHeight / baseHeight).toFixed(5);</span></span>
<span class="line"><span>    screenRef.value.style.transform = \`scale(\${scale.width}, \${scale.height})\`;</span></span>
<span class="line"><span>   } else {</span></span>
<span class="line"><span>    // 表示更高</span></span>
<span class="line"><span>    scale.height = (</span></span>
<span class="line"><span>     window.innerWidth /</span></span>
<span class="line"><span>     baseProportion /</span></span>
<span class="line"><span>     baseHeight</span></span>
<span class="line"><span>    ).toFixed(5);</span></span>
<span class="line"><span>    scale.width = (window.innerWidth / baseWidth).toFixed(5);</span></span>
<span class="line"><span>    screenRef.value.style.transform = \`scale(\${scale.width}, \${scale.height})\`;</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span> };</span></span>
<span class="line"><span></span></span>
<span class="line"><span> const resize = () =&gt; {</span></span>
<span class="line"><span>  clearTimeout(timer.value);</span></span>
<span class="line"><span>  timer.value = window.setTimeout(() =&gt; {</span></span>
<span class="line"><span>   calcRate();</span></span>
<span class="line"><span>  }, 200);</span></span>
<span class="line"><span> };</span></span>
<span class="line"><span></span></span>
<span class="line"><span> // 改变窗口大小重新绘制</span></span>
<span class="line"><span> const windowDraw = () =&gt; {</span></span>
<span class="line"><span>  window.addEventListener(&quot;resize&quot;, resize);</span></span>
<span class="line"><span> };</span></span>
<span class="line"><span></span></span>
<span class="line"><span> // 改变窗口大小重新绘制</span></span>
<span class="line"><span> const unWindowDraw = () =&gt; {</span></span>
<span class="line"><span>  window.removeEventListener(&quot;resize&quot;, resize);</span></span>
<span class="line"><span> };</span></span>
<span class="line"><span></span></span>
<span class="line"><span> return {</span></span>
<span class="line"><span>  screenRef,</span></span>
<span class="line"><span>  calcRate,</span></span>
<span class="line"><span>  windowDraw,</span></span>
<span class="line"><span>  unWindowDraw,</span></span>
<span class="line"><span> };</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br></div></div><ol start="2"><li>相关界面引入<code>resize.ts/js</code> <img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/464430e5a9fc458a924482d0d3d7bb9f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="QQ图片20220927112000.png"></li></ol><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>    &lt;div class=&quot;screen-container&quot;&gt;</span></span>
<span class="line"><span>        &lt;div class=&quot;screen-content&quot; ref=&quot;screenRef&quot;&gt;</span></span>
<span class="line"><span>            &lt;span class=&quot;screen-title&quot;&gt;基于scale的适配方案&lt;/span&gt;</span></span>
<span class="line"><span>            &lt;img class=&quot;screen-img&quot; src=&quot;https://img2.baidu.com/it/u=1297807229,3828610143&amp;fm=253&amp;fmt=auto&amp;app=138&amp;f=JPEG?w=500&amp;h=281&quot; alt=&quot;&quot;&gt;</span></span>
<span class="line"><span>        &lt;/div&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;script setup lang=&quot;ts&quot;&gt;</span></span>
<span class="line"><span>import windowResize from &#39;../../utils/resize&#39;;</span></span>
<span class="line"><span>import {onMounted, onUnmounted} from &#39;vue&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const { screenRef, calcRate, windowDraw, unWindowDraw } = windowResize()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>onMounted(() =&gt; {</span></span>
<span class="line"><span>    // 监听浏览器窗口尺寸变化</span></span>
<span class="line"><span>    windowDraw()</span></span>
<span class="line"><span>    calcRate()</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>onUnmounted(() =&gt; {</span></span>
<span class="line"><span>    unWindowDraw();</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;/script&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;style lang=&quot;scss&quot; scoped&gt;</span></span>
<span class="line"><span>.screen-container {</span></span>
<span class="line"><span>    height: 100%;</span></span>
<span class="line"><span>    background-color: lightcyan;</span></span>
<span class="line"><span>    display: flex;</span></span>
<span class="line"><span>    justify-content: center;</span></span>
<span class="line"><span>    align-items: center;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    .screen-content {</span></span>
<span class="line"><span>        width: 1920px;</span></span>
<span class="line"><span>        height: 1080px;</span></span>
<span class="line"><span>        background-color: #fff;</span></span>
<span class="line"><span>        display: flex;</span></span>
<span class="line"><span>        justify-content: center;</span></span>
<span class="line"><span>        align-items: center;</span></span>
<span class="line"><span>        flex-direction: column;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        .screen-title {</span></span>
<span class="line"><span>            font-size: 32px;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        .screen-img {</span></span>
<span class="line"><span>            margin-top: 20px;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>&lt;/style&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br></div></div>`,24),i=[l];function r(c,t,b,o,u,m){return n(),a("div",null,i)}const g=s(e,[["render",r]]);export{h as __pageData,g as default};
