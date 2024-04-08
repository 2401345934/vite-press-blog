import{_ as l,o as r,c as i,J as n,w as c,m as s,a as t,aa as b,E as a}from"./chunks/framework.DJCjJe2w.js";const w=JSON.parse('{"title":"从0到1搭建前端监控平台","description":"","frontmatter":{"createTime":"2022/12/08","tag":"工程化,SDK"},"headers":[],"relativePath":"engineering/sdk/monitoring-platform/index.md","filePath":"engineering/sdk/monitoring-platform/index.md","lastUpdated":1670476766000}'),o={name:"engineering/sdk/monitoring-platform/index.md"},u=s("h1",{id:"从0到1搭建前端监控平台",tabindex:"-1"},[t("从0到1搭建前端监控平台 "),s("a",{class:"header-anchor",href:"#从0到1搭建前端监控平台","aria-label":'Permalink to "从0到1搭建前端监控平台"'},"​")],-1),m=b(`<p>文章分成以下六部分来介绍：</p><ul><li><p>自研监控平台解决了哪些痛点，实现了什么亮点功能？</p></li><li><p>相比sentry等监控方案，自研监控的优势有哪些？</p></li><li><p>前端监控的设计方案、监控的目的</p></li><li><p>数据的采集方式：错误信息、性能数据、用户行为、加载资源、个性化指标等</p></li><li><p>设计开发一个完整的监控SDK</p></li><li><p>监控后台错误还原演示示例</p></li></ul><h2 id="痛点" tabindex="-1">痛点 <a class="header-anchor" href="#痛点" aria-label="Permalink to &quot;痛点&quot;">​</a></h2><p>某⼀天用户：xx商品无法下单！<br> ⼜⼀天运营：xx广告在手机端打开不了！</p><p>大家反馈的bug，怎么都复现不出来，尴尬的要死！😢</p><p>如何记录项目的错误，并将错误还原出来，这是监控平台要解决的痛点之一</p><h2 id="错误还原" tabindex="-1">错误还原 <a class="header-anchor" href="#错误还原" aria-label="Permalink to &quot;错误还原&quot;">​</a></h2><p><a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fxy-sea%2Fweb-see" title="https://github.com/xy-sea/web-see" target="_blank" rel="noreferrer">web-see</a> 监控提供三种错误还原方式：定位源码、播放录屏、记录用户行为</p><h3 id="定位源码" tabindex="-1">定位源码 <a class="header-anchor" href="#定位源码" aria-label="Permalink to &quot;定位源码&quot;">​</a></h3><p>项目出错，要是能定位到源码就好了，可线上的项目都是打包后的代码，也不能把 .map 文件放到线上</p><p>监控平台通过 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fmozilla%2Fsource-map" title="https://github.com/mozilla/source-map" target="_blank" rel="noreferrer">source-map</a> 可以实现该功能</p><p>最终效果：</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/026bbc81cf4843b6a0671c89a52e8513~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="errorCode.jpg"></p><h3 id="播放录屏" tabindex="-1">播放录屏 <a class="header-anchor" href="#播放录屏" aria-label="Permalink to &quot;播放录屏&quot;">​</a></h3><p>多数场景下，定位到具体的源码，就可以定位bug，但如果是用户做了异常操作，或者是在某些复杂操作下才出现的bug，仅仅通过定位源码，还是不能还原错误</p><p>要是能把用户的操作都录制下来，然后通过回放来还原错误就好了</p><p>监控平台通过 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Frrweb-io%2Frrweb" title="https://github.com/rrweb-io/rrweb" target="_blank" rel="noreferrer">rrweb</a> 可以实现该功能</p><p>最终效果： <img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0eb30a82a89e457182b9fde875757e80~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="record.gif"></p><p>回放的录屏中，记录了用户的所有操作，红色的线代表了鼠标的移动轨迹</p><p>前端录屏确实是件很酷的事情，但是不能走极端，如果把用户的所有操作都录制下来，是没有意义的</p><p>我们更关注的是，页面报错的时候用户做了哪些操作，所以监控平台只把报错前10s的视频保存下来（单次录屏时长也可以自定义）</p><h3 id="记录用户行为" tabindex="-1">记录用户行为 <a class="header-anchor" href="#记录用户行为" aria-label="Permalink to &quot;记录用户行为&quot;">​</a></h3><p>通过 定位源码 + 播放录屏 这套组合，还原错误应该够用了，同时监控平台也提供了 记录用户行为 这种方式</p><p>假如用户做了很多操作，操作的间隔超过了单次录屏时长，录制的视频可能是不完整的，此时可以借助用户行为来分析用户的操作，帮助复现bug</p><p>最终效果： <img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/30f7c0f6e99d4f1d81def0c37a86e1ca~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="userlist.jpg"></p><p>用户行为列表记录了：鼠标点击、接口调用、资源加载、页面路由变化、代码报错等信息</p><p>通过 <code>定位源码、播放录屏、记录用户行为</code> 这三板斧，解决了复现bug的痛点</p><h2 id="自研监控的优势" tabindex="-1">自研监控的优势 <a class="header-anchor" href="#自研监控的优势" aria-label="Permalink to &quot;自研监控的优势&quot;">​</a></h2><p>为什么不直接用sentry私有化部署，而选择自研前端监控？</p><p>这是优先要思考的问题，sentry作为前端监控的行业标杆，有很多可以借鉴的地方</p><p>相比sentry，自研监控平台的优势在于：</p><p>1、可以将公司的SDK统一成一个，包括但不限于：监控SDK、埋点SDK、录屏SDK、广告SDK等</p><p>2、提供了更多的错误还原方式，同时错误信息可以和埋点信息联动，便可拿到更细致的用户行为栈，更快的排查线上错误</p><p>3、监控自定义的个性化指标：如 long task、memory页面内存、首屏加载时间等。过多的长任务会造成页面丢帧、卡顿；过大的内存可能会造成低端机器的卡死、崩溃</p><p>4、统计资源缓存率，来判断项目的缓存策略是否合理，提升缓存率可以减少服务器压力，也可以提升页面的打开速度</p><h2 id="设计思路" tabindex="-1">设计思路 <a class="header-anchor" href="#设计思路" aria-label="Permalink to &quot;设计思路&quot;">​</a></h2><p>一个完整的前端监控平台包括三个部分：数据采集与上报、数据分析和存储、数据展示</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2111ab12f74546a9b570ea8f5fd52cc9~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="system.png"></p><h3 id="监控目的" tabindex="-1">监控目的 <a class="header-anchor" href="#监控目的" aria-label="Permalink to &quot;监控目的&quot;">​</a></h3><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b17a43984e3945199c6c4fcad74ec6f6~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="title.png"></p><h3 id="异常分析" tabindex="-1">异常分析 <a class="header-anchor" href="#异常分析" aria-label="Permalink to &quot;异常分析&quot;">​</a></h3><p>按照 5W1H 法则来分析前端异常，需要知道以下信息</p><ol><li>What，发⽣了什么错误：JS错误、异步错误、资源加载、接口错误等</li><li>When，出现的时间段，如时间戳</li><li>Who，影响了多少用户，包括报错事件数、IP</li><li>Where，出现的页面是哪些，包括页面、对应的设备信息</li><li>Why，错误的原因是为什么，包括错误堆栈、⾏列、SourceMap、异常录屏</li><li>How，如何定位还原问题，如何异常报警，避免类似的错误发生</li></ol><h2 id="错误数据采集" tabindex="-1">错误数据采集 <a class="header-anchor" href="#错误数据采集" aria-label="Permalink to &quot;错误数据采集&quot;">​</a></h2><p>错误信息是最基础也是最重要的数据，错误信息主要分为下面几类：</p><ul><li>JS 代码运行错误、语法错误等</li><li>异步错误等</li><li>静态资源加载错误</li><li>接口请求报错</li></ul><h3 id="错误捕获方式" tabindex="-1">错误捕获方式 <a class="header-anchor" href="#错误捕获方式" aria-label="Permalink to &quot;错误捕获方式&quot;">​</a></h3><p>1）try/catch</p><p>只能捕获代码常规的运行错误，语法错误和异步错误不能捕获到</p><p>示例：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 示例1：常规运行时错误，可以捕获 ✅</span></span>
<span class="line"><span> try {</span></span>
<span class="line"><span>   let a = undefined;</span></span>
<span class="line"><span>   if (a.length) {</span></span>
<span class="line"><span>     console.log(&#39;111&#39;);</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span> } catch (e) {</span></span>
<span class="line"><span>   console.log(&#39;捕获到异常：&#39;, e);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 示例2：语法错误，不能捕获 ❌  </span></span>
<span class="line"><span>try {</span></span>
<span class="line"><span>  const notdefined,</span></span>
<span class="line"><span>} catch(e) {</span></span>
<span class="line"><span>  console.log(&#39;捕获不到异常：&#39;, &#39;Uncaught SyntaxError&#39;);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>// 示例3：异步错误，不能捕获 ❌</span></span>
<span class="line"><span>try {</span></span>
<span class="line"><span>  setTimeout(() =&gt; {</span></span>
<span class="line"><span>    console.log(notdefined);</span></span>
<span class="line"><span>  }, 0)</span></span>
<span class="line"><span>} catch(e) {</span></span>
<span class="line"><span>  console.log(&#39;捕获不到异常：&#39;, &#39;Uncaught ReferenceError&#39;);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><p>2） window.onerror</p><p>window.onerror 可以捕获常规错误、异步错误，但不能捕获资源错误</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>/**</span></span>
<span class="line"><span>* @param { string } message 错误信息</span></span>
<span class="line"><span>* @param { string } source 发生错误的脚本URL</span></span>
<span class="line"><span>* @param { number } lineno 发生错误的行号</span></span>
<span class="line"><span>* @param { number } colno 发生错误的列号</span></span>
<span class="line"><span>* @param { object } error Error对象</span></span>
<span class="line"><span>*/</span></span>
<span class="line"><span>window.onerror = function(message, source, lineno, colno, error) {</span></span>
<span class="line"><span>   console.log(&#39;捕获到的错误信息是：&#39;, message, source, lineno, colno, error )</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>示例：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>window.onerror = function(message, source, lineno, colno, error) {</span></span>
<span class="line"><span>  console.log(&quot;捕获到的错误信息是：&quot;, message, source, lineno, colno, error);</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 示例1：常规运行时错误，可以捕获 ✅</span></span>
<span class="line"><span>console.log(notdefined);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 示例2：语法错误，不能捕获 ❌</span></span>
<span class="line"><span>const notdefined;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 示例3：异步错误，可以捕获 ✅</span></span>
<span class="line"><span>setTimeout(() =&gt; {</span></span>
<span class="line"><span>  console.log(notdefined);</span></span>
<span class="line"><span>}, 0);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 示例4：资源错误，不能捕获 ❌</span></span>
<span class="line"><span>let script = document.createElement(&quot;script&quot;);</span></span>
<span class="line"><span>script.type = &quot;text/javascript&quot;;</span></span>
<span class="line"><span>script.src = &quot;https://www.test.com/index.js&quot;;</span></span>
<span class="line"><span>document.body.appendChild(script);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>3） window.addEventListener</p><p>当静态资源加载失败时，会触发 error 事件， 此时 window.onerror 不能捕获到</p><p>示例：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span>&lt;html lang=&quot;en&quot;&gt;</span></span>
<span class="line"><span>&lt;head&gt;</span></span>
<span class="line"><span>  &lt;meta charset=&quot;UTF-8&quot;&gt;</span></span>
<span class="line"><span>&lt;/head&gt;</span></span>
<span class="line"><span>&lt;script&gt;</span></span>
<span class="line"><span>  window.addEventListener(&#39;error&#39;, (error) =&gt; {</span></span>
<span class="line"><span>    console.log(&#39;捕获到异常：&#39;, error);</span></span>
<span class="line"><span>  }, true)</span></span>
<span class="line"><span>&lt;/script&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;!-- 图片、script、css加载错误，都能被捕获 ✅ --&gt;</span></span>
<span class="line"><span>&lt;img src=&quot;https://test.cn/×××.png&quot;&gt;</span></span>
<span class="line"><span>&lt;script src=&quot;https://test.cn/×××.js&quot;&gt;&lt;/script&gt;</span></span>
<span class="line"><span>&lt;link href=&quot;https://test.cn/×××.css&quot; rel=&quot;stylesheet&quot; /&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;script&gt;</span></span>
<span class="line"><span>  // new Image错误，不能捕获 ❌</span></span>
<span class="line"><span>  // new Image运用的比较少，可以自己单独处理</span></span>
<span class="line"><span>  new Image().src = &#39;https://test.cn/×××.png&#39;</span></span>
<span class="line"><span>&lt;/script&gt;</span></span>
<span class="line"><span>&lt;/html&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>4）Promise错误</p><p>Promise中抛出的错误，无法被 window.onerror、try/catch、 error 事件捕获到，可通过 unhandledrejection 事件来处理</p><p>示例：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>try {</span></span>
<span class="line"><span>  new Promise((resolve, reject) =&gt; {</span></span>
<span class="line"><span>    JSON.parse(&quot;&quot;);</span></span>
<span class="line"><span>    resolve();</span></span>
<span class="line"><span>  });</span></span>
<span class="line"><span>} catch (err) {</span></span>
<span class="line"><span>  // try/catch 不能捕获Promise中错误 ❌</span></span>
<span class="line"><span>  console.error(&quot;in try catch&quot;, err);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// error事件 不能捕获Promise中错误 ❌</span></span>
<span class="line"><span>window.addEventListener(</span></span>
<span class="line"><span>  &quot;error&quot;,</span></span>
<span class="line"><span>  error =&gt; {</span></span>
<span class="line"><span>    console.log(&quot;捕获到异常：&quot;, error);</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  true</span></span>
<span class="line"><span>);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// window.onerror 不能捕获Promise中错误 ❌</span></span>
<span class="line"><span>window.onerror = function(message, source, lineno, colno, error) {</span></span>
<span class="line"><span>  console.log(&quot;捕获到异常：&quot;, { message, source, lineno, colno, error });</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// unhandledrejection 可以捕获Promise中的错误 ✅</span></span>
<span class="line"><span>window.addEventListener(&quot;unhandledrejection&quot;, function(e) {</span></span>
<span class="line"><span>  console.log(&quot;捕获到异常&quot;, e);</span></span>
<span class="line"><span>  // preventDefault阻止传播，不会在控制台打印</span></span>
<span class="line"><span>  e.preventDefault();</span></span>
<span class="line"><span>});</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><h3 id="vue-错误" tabindex="-1">Vue 错误 <a class="header-anchor" href="#vue-错误" aria-label="Permalink to &quot;Vue 错误&quot;">​</a></h3><p>Vue项目中，window.onerror 和 error 事件不能捕获到常规的代码错误</p><p>异常代码：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>export default {</span></span>
<span class="line"><span>  created() {</span></span>
<span class="line"><span>    let a = null;</span></span>
<span class="line"><span>    if(a.length &gt; 1) {</span></span>
<span class="line"><span>        // ...</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>main.js中添加捕获代码：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>window.addEventListener(&#39;error&#39;, (error) =&gt; {</span></span>
<span class="line"><span>  console.log(&#39;error&#39;, error);</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span>window.onerror = function (msg, url, line, col, error) {</span></span>
<span class="line"><span>  console.log(&#39;onerror&#39;, msg, url, line, col, error);</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>控制台会报错，但是 window.onerror 和 error 不能捕获到</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a466fa1a02fb44b6b03f476a4bd066b1~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="error.jpg"></p><p>vue 通过 <code>Vue.config.errorHander</code> 来捕获异常：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>Vue.config.errorHandler = (err, vm, info) =&gt; {</span></span>
<span class="line"><span>    console.log(&#39;进来啦~&#39;, err);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>控制台打印:</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/60cea7b4e84d4f699f11854feac23639~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="error2.jpg"></p><p><strong>errorHandler源码分析</strong></p><p>在<code>src/core/util</code>目录下，有一个<code>error.js</code>文件</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>function globalHandleError (err, vm, info) {</span></span>
<span class="line"><span>  // 获取全局配置，判断是否设置处理函数，默认undefined</span></span>
<span class="line"><span>  // 配置config.errorHandler方法</span></span>
<span class="line"><span>  if (config.errorHandler) {</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>      // 执行 errorHandler</span></span>
<span class="line"><span>      return config.errorHandler.call(null, err, vm, info)</span></span>
<span class="line"><span>    } catch (e) {</span></span>
<span class="line"><span>      // 如果开发者在errorHandler函数中，手动抛出同样错误信息throw err，判断err信息是否相等，避免log两次</span></span>
<span class="line"><span>      if (e !== err) {</span></span>
<span class="line"><span>        logError(e, null, &#39;config.errorHandler&#39;)</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  // 没有配置，常规输出</span></span>
<span class="line"><span>  logError(err, vm, info)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function logError (err, vm, info) {</span></span>
<span class="line"><span>  if (process.env.NODE_ENV !== &#39;production&#39;) {</span></span>
<span class="line"><span>    warn(\`Error in \${info}: &quot;\${err.toString()}&quot;\`, vm)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  /* istanbul ignore else */</span></span>
<span class="line"><span>  if ((inBrowser || inWeex) &amp;&amp; typeof console !== &#39;undefined&#39;) {</span></span>
<span class="line"><span>    console.error(err)</span></span>
<span class="line"><span>  } else {</span></span>
<span class="line"><span>    throw err</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><p>通过源码明白了，vue 使用 try/catch 来捕获常规代码的报错，被捕获的错误会通过 console.error 输出而避免应用崩溃</p><p>可以在 Vue.config.errorHandler 中将捕获的错误上报</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>Vue.config.errorHandler = function (err, vm, info) { </span></span>
<span class="line"><span>  // handleError方法用来处理错误并上报</span></span>
<span class="line"><span>  handleError(err);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="react-错误" tabindex="-1">React 错误 <a class="header-anchor" href="#react-错误" aria-label="Permalink to &quot;React 错误&quot;">​</a></h3><p>从 react16 开始，官方提供了 ErrorBoundary 错误边界的功能，被该组件包裹的子组件，render 函数报错时会触发离当前组件最近父组件的ErrorBoundary</p><p>生产环境，一旦被 ErrorBoundary 捕获的错误，也不会触发全局的 window.onerror 和 error 事件</p><p>父组件代码：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import React from &#39;react&#39;;</span></span>
<span class="line"><span>import Child from &#39;./Child.js&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// window.onerror 不能捕获render函数的错误 ❌</span></span>
<span class="line"><span>window.onerror = function (err, msg, c, l) {</span></span>
<span class="line"><span>  console.log(&#39;err&#39;, err, msg);</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// error 不能render函数的错误 ❌</span></span>
<span class="line"><span>window.addEventListener( &#39;error&#39;, (error) =&gt; {</span></span>
<span class="line"><span>    console.log(&#39;捕获到异常：&#39;, error);</span></span>
<span class="line"><span>  },true</span></span>
<span class="line"><span>);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class ErrorBoundary extends React.Component {</span></span>
<span class="line"><span>  constructor(props) {</span></span>
<span class="line"><span>    super(props);</span></span>
<span class="line"><span>    this.state = { hasError: false };</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  static getDerivedStateFromError(error) {</span></span>
<span class="line"><span>    // 更新 state 使下一次渲染能够显示降级后的 UI</span></span>
<span class="line"><span>    return { hasError: true };</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  componentDidCatch(error, errorInfo) {</span></span>
<span class="line"><span>    // componentDidCatch 可以捕获render函数的错误 </span></span>
<span class="line"><span>    console.log(error, errorInfo)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // 同样可以将错误日志上报给服务器</span></span>
<span class="line"><span>    reportError(error, errorInfo);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  render() {</span></span>
<span class="line"><span>    if (this.state.hasError) {</span></span>
<span class="line"><span>      // 自定义降级后的 UI 并渲染</span></span>
<span class="line"><span>      return &lt;h1&gt;Something went wrong.&lt;/h1&gt;;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return this.props.children;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function Parent() {</span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;div&gt;</span></span>
<span class="line"><span>      父组件</span></span>
<span class="line"><span>      &lt;ErrorBoundary&gt;</span></span>
<span class="line"><span>        &lt;Child /&gt;</span></span>
<span class="line"><span>      &lt;/ErrorBoundary&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default Parent;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br></div></div><p>子组件代码：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 子组件 渲染出错</span></span>
<span class="line"><span>function Child() {</span></span>
<span class="line"><span>  let list = {};</span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;div&gt;</span></span>
<span class="line"><span>      子组件</span></span>
<span class="line"><span>      {list.map((item, key) =&gt; (</span></span>
<span class="line"><span>        &lt;span key={key}&gt;{item}&lt;/span&gt;</span></span>
<span class="line"><span>      ))}</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>export default Child;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>同vue项目的处理类似，react项目中，可以在 componentDidCatch 中将捕获的错误上报</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>componentDidCatch(error, errorInfo) {</span></span>
<span class="line"><span>  // handleError方法用来处理错误并上报</span></span>
<span class="line"><span>  handleError(err);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="跨域问题" tabindex="-1">跨域问题 <a class="header-anchor" href="#跨域问题" aria-label="Permalink to &quot;跨域问题&quot;">​</a></h3><p>如果当前页面中，引入了其他域名的JS资源，如果资源出现错误，error 事件只会监测到一个 <code>script error</code> 的异常。</p><p>示例：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>window.addEventListener(&quot;error&quot;, error =&gt; { </span></span>
<span class="line"><span>  console.log(&quot;捕获到异常：&quot;, error);</span></span>
<span class="line"><span>}, true );</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 当前页面加载其他域的资源，如https://www.test.com/index.js</span></span>
<span class="line"><span>&lt;script src=&quot;https://www.test.com/index.js&quot;&gt;&lt;/script&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 加载的https://www.test.com/index.js的代码</span></span>
<span class="line"><span>function fn() {</span></span>
<span class="line"><span>  JSON.parse(&quot;&quot;);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>fn();</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>报错信息：</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0d3a64682d05414e9e4c7a17a78895f4~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="scriptError.jpg"></p><p>只能捕获到 <code>script error</code> 的原因：</p><p>是由于浏览器基于<code>安全考虑</code>，故意隐藏了其它域JS文件抛出的具体错误信息，这样可以有效避免敏感信息无意中被第三方(不受控制的)脚本捕获到，因此，浏览器只允许同域下的脚本捕获具体的错误信息</p><p>解决方法：</p><p>前端script加crossorigin，后端配置 Access-Control-Allow-Origin</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;script src=&quot;https://www.test.com/index.js&quot; crossorigin&gt;&lt;/script&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>添加 crossorigin 后可以捕获到完整的报错信息：</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5f78998ae48140bebbae82ce6f073536~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="ScriptError1.jpg"></p><p>如果不能修改服务端的请求头，可以考虑通过使用 try/catch 绕过，将错误抛出</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;!doctype html&gt;</span></span>
<span class="line"><span>&lt;html&gt;</span></span>
<span class="line"><span>&lt;body&gt;</span></span>
<span class="line"><span>  &lt;script src=&quot;https://www.test.com/index.js&quot;&gt;&lt;/script&gt;</span></span>
<span class="line"><span>  &lt;script&gt;</span></span>
<span class="line"><span>  window.addEventListener(&quot;error&quot;, error =&gt; { </span></span>
<span class="line"><span>    console.log(&quot;捕获到异常：&quot;, error);</span></span>
<span class="line"><span>  }, true );</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  try {</span></span>
<span class="line"><span>    // 调用https://www.test.com/index.js中定义的fn方法</span></span>
<span class="line"><span>    fn(); </span></span>
<span class="line"><span>  } catch (e) {</span></span>
<span class="line"><span>    throw e;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  &lt;/script&gt;</span></span>
<span class="line"><span>&lt;/body&gt;</span></span>
<span class="line"><span>&lt;/html&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h3 id="接口错误" tabindex="-1">接口错误 <a class="header-anchor" href="#接口错误" aria-label="Permalink to &quot;接口错误&quot;">​</a></h3><p>接口监控的实现原理：针对浏览器内置的 XMLHttpRequest、fetch 对象，利用 AOP 切片编程重写该方法，实现对请求的接口拦截，从而获取接口报错的情况并上报</p><p>1）拦截XMLHttpRequest请求示例：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>function xhrReplace() {</span></span>
<span class="line"><span>  if (!(&quot;XMLHttpRequest&quot; in window)) {</span></span>
<span class="line"><span>    return;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  const originalXhrProto = XMLHttpRequest.prototype;</span></span>
<span class="line"><span>  // 重写XMLHttpRequest 原型上的open方法</span></span>
<span class="line"><span>  replaceAop(originalXhrProto, &quot;open&quot;, originalOpen =&gt; {</span></span>
<span class="line"><span>    return function(...args) {</span></span>
<span class="line"><span>      // 获取请求的信息</span></span>
<span class="line"><span>      this._xhr = {</span></span>
<span class="line"><span>        method: typeof args[0] === &quot;string&quot; ? args[0].toUpperCase() : args[0],</span></span>
<span class="line"><span>        url: args[1],</span></span>
<span class="line"><span>        startTime: new Date().getTime(),</span></span>
<span class="line"><span>        type: &quot;xhr&quot;</span></span>
<span class="line"><span>      };</span></span>
<span class="line"><span>      // 执行原始的open方法</span></span>
<span class="line"><span>      originalOpen.apply(this, args);</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>  });</span></span>
<span class="line"><span>  // 重写XMLHttpRequest 原型上的send方法</span></span>
<span class="line"><span>  replaceAop(originalXhrProto, &quot;send&quot;, originalSend =&gt; {</span></span>
<span class="line"><span>    return function(...args) {</span></span>
<span class="line"><span>      // 当请求结束时触发，无论请求成功还是失败都会触发</span></span>
<span class="line"><span>      this.addEventListener(&quot;loadend&quot;, () =&gt; {</span></span>
<span class="line"><span>        const { responseType, response, status } = this;</span></span>
<span class="line"><span>        const endTime = new Date().getTime();</span></span>
<span class="line"><span>        this._xhr.reqData = args[0];</span></span>
<span class="line"><span>        this._xhr.status = status;</span></span>
<span class="line"><span>        if ([&quot;&quot;, &quot;json&quot;, &quot;text&quot;].indexOf(responseType) !== -1) {</span></span>
<span class="line"><span>          this._xhr.responseText =</span></span>
<span class="line"><span>            typeof response === &quot;object&quot; ? JSON.stringify(response) : response;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        // 获取接口的请求时长</span></span>
<span class="line"><span>        this._xhr.elapsedTime = endTime - this._xhr.startTime;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 上报xhr接口数据</span></span>
<span class="line"><span>        reportData(this._xhr);</span></span>
<span class="line"><span>      });</span></span>
<span class="line"><span>      // 执行原始的send方法</span></span>
<span class="line"><span>      originalSend.apply(this, args);</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>  });</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/**</span></span>
<span class="line"><span> * 重写指定的方法</span></span>
<span class="line"><span> * @param { object } source 重写的对象</span></span>
<span class="line"><span> * @param { string } name 重写的属性</span></span>
<span class="line"><span> * @param { function } fn 拦截的函数</span></span>
<span class="line"><span> */</span></span>
<span class="line"><span>function replaceAop(source, name, fn) {</span></span>
<span class="line"><span>  if (source === undefined) return;</span></span>
<span class="line"><span>  if (name in source) {</span></span>
<span class="line"><span>    var original = source[name];</span></span>
<span class="line"><span>    var wrapped = fn(original);</span></span>
<span class="line"><span>    if (typeof wrapped === &quot;function&quot;) {</span></span>
<span class="line"><span>      source[name] = wrapped;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br></div></div><p>2）拦截fetch请求示例：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>function fetchReplace() {</span></span>
<span class="line"><span>  if (!(&quot;fetch&quot; in window)) {</span></span>
<span class="line"><span>    return;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  // 重写fetch方法</span></span>
<span class="line"><span>  replaceAop(window, &quot;fetch&quot;, originalFetch =&gt; {</span></span>
<span class="line"><span>    return function(url, config) {</span></span>
<span class="line"><span>      const sTime = new Date().getTime();</span></span>
<span class="line"><span>      const method = (config &amp;&amp; config.method) || &quot;GET&quot;;</span></span>
<span class="line"><span>      let handlerData = {</span></span>
<span class="line"><span>        type: &quot;fetch&quot;,</span></span>
<span class="line"><span>        method,</span></span>
<span class="line"><span>        reqData: config &amp;&amp; config.body,</span></span>
<span class="line"><span>        url</span></span>
<span class="line"><span>      };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      return originalFetch.apply(window, [url, config]).then(</span></span>
<span class="line"><span>        res =&gt; {</span></span>
<span class="line"><span>          // res.clone克隆，防止被标记已消费</span></span>
<span class="line"><span>          const tempRes = res.clone();</span></span>
<span class="line"><span>          const eTime = new Date().getTime();</span></span>
<span class="line"><span>          handlerData = {</span></span>
<span class="line"><span>            ...handlerData,</span></span>
<span class="line"><span>            elapsedTime: eTime - sTime,</span></span>
<span class="line"><span>            status: tempRes.status</span></span>
<span class="line"><span>          };</span></span>
<span class="line"><span>          tempRes.text().then(data =&gt; {</span></span>
<span class="line"><span>            handlerData.responseText = data;</span></span>
<span class="line"><span>            // 上报fetch接口数据</span></span>
<span class="line"><span>            reportData(handlerData);</span></span>
<span class="line"><span>          });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>          // 返回原始的结果，外部继续使用then接收</span></span>
<span class="line"><span>          return res;</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>        err =&gt; {</span></span>
<span class="line"><span>          const eTime = new Date().getTime();</span></span>
<span class="line"><span>          handlerData = {</span></span>
<span class="line"><span>            ...handlerData,</span></span>
<span class="line"><span>            elapsedTime: eTime - sTime,</span></span>
<span class="line"><span>            status: 0</span></span>
<span class="line"><span>          };</span></span>
<span class="line"><span>          // 上报fetch接口数据</span></span>
<span class="line"><span>          reportData(handlerData);</span></span>
<span class="line"><span>          throw err;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      );</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>  });</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br></div></div><h2 id="性能数据采集" tabindex="-1">性能数据采集 <a class="header-anchor" href="#性能数据采集" aria-label="Permalink to &quot;性能数据采集&quot;">​</a></h2><p>谈到性能数据采集，就会提及加载过程模型图：</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2d47107de71349518cf4f43e6508fa3a~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="timing.png"></p><p>以Spa页面来说，页面的加载过程大致是这样的：</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/93ee1530332a432b904eb3f6af65cc7a~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="spa.png"></p><p>包括dns查询、建立tcp连接、发送http请求、返回html文档、html文档解析等阶段</p><p>最初，可以通过 <code>window.performance.timing</code> 来获取加载过程模型中各个阶段的耗时数据</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// window.performance.timing 各字段说明</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    navigationStart,  // 同一个浏览器上下文中，上一个文档结束时的时间戳。如果没有上一个文档，这个值会和 fetchStart 相同。</span></span>
<span class="line"><span>    unloadEventStart,  // 上一个文档 unload 事件触发时的时间戳。如果没有上一个文档，为 0。</span></span>
<span class="line"><span>    unloadEventEnd, // 上一个文档 unload 事件结束时的时间戳。如果没有上一个文档，为 0。</span></span>
<span class="line"><span>    redirectStart, // 表示第一个 http 重定向开始时的时间戳。如果没有重定向或者有一个非同源的重定向，为 0。</span></span>
<span class="line"><span>    redirectEnd, // 表示最后一个 http 重定向结束时的时间戳。如果没有重定向或者有一个非同源的重定向，为 0。</span></span>
<span class="line"><span>    fetchStart, // 表示浏览器准备好使用 http 请求来获取文档的时间戳。这个时间点会在检查任何缓存之前。</span></span>
<span class="line"><span>    domainLookupStart, // 域名查询开始的时间戳。如果使用了持久连接或者本地有缓存，这个值会和 fetchStart 相同。</span></span>
<span class="line"><span>    domainLookupEnd, // 域名查询结束的时间戳。如果使用了持久连接或者本地有缓存，这个值会和 fetchStart 相同。</span></span>
<span class="line"><span>    connectStart, // http 请求向服务器发送连接请求时的时间戳。如果使用了持久连接，这个值会和 fetchStart 相同。</span></span>
<span class="line"><span>    connectEnd, // 浏览器和服务器之前建立连接的时间戳，所有握手和认证过程全部结束。如果使用了持久连接，这个值会和 fetchStart 相同。</span></span>
<span class="line"><span>    secureConnectionStart, // 浏览器与服务器开始安全链接的握手时的时间戳。如果当前网页不要求安全连接，返回 0。</span></span>
<span class="line"><span>    requestStart, // 浏览器向服务器发起 http 请求(或者读取本地缓存)时的时间戳，即获取 html 文档。</span></span>
<span class="line"><span>    responseStart, // 浏览器从服务器接收到第一个字节时的时间戳。</span></span>
<span class="line"><span>    responseEnd, // 浏览器从服务器接受到最后一个字节时的时间戳。</span></span>
<span class="line"><span>    domLoading, // dom 结构开始解析的时间戳，document.readyState 的值为 loading。</span></span>
<span class="line"><span>    domInteractive, // dom 结构解析结束，开始加载内嵌资源的时间戳，document.readyState 的状态为 interactive。</span></span>
<span class="line"><span>    domContentLoadedEventStart, // DOMContentLoaded 事件触发时的时间戳，所有需要执行的脚本执行完毕。</span></span>
<span class="line"><span>    domContentLoadedEventEnd,  // DOMContentLoaded 事件结束时的时间戳</span></span>
<span class="line"><span>    domComplete, // dom 文档完成解析的时间戳， document.readyState 的值为 complete。</span></span>
<span class="line"><span>    loadEventStart, // load 事件触发的时间。</span></span>
<span class="line"><span>    loadEventEnd // load 时间结束时的时间。</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p>后来 window.performance.timing 被废弃，通过 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FPerformanceObserver" title="https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FPerformanceObserver" target="_blank" rel="noreferrer">PerformanceObserver</a> 来获取。旧的 api，返回的是一个 <code>UNIX</code> 类型的绝对时间，和用户的系统时间相关，分析的时候需要再次计算。而新的 api，返回的是一个相对时间，可以直接用来分析</p><p>现在 chrome 开发团队提供了 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fweb-vitals" title="https://www.npmjs.com/package/web-vitals" target="_blank" rel="noreferrer">web-vitals</a> 库，方便来计算各性能数据（注意：web-vitals 不支持safari浏览器）</p><p>关于 FP、FCP、LCP、CLS、TTFB、FID 等性能指标的含义和计算方式，我在 <a href="https://juejin.cn/post/7146976516692410376/#heading-63" title="https://juejin.cn/post/7146976516692410376/#heading-63" target="_blank" rel="noreferrer">「历时8个月」10万字前端知识体系总结（工程化篇）🔥</a> 中有详细的讲解，这里不再赘述</p><h2 id="用户行为数据采集" tabindex="-1">用户行为数据采集 <a class="header-anchor" href="#用户行为数据采集" aria-label="Permalink to &quot;用户行为数据采集&quot;">​</a></h2><p>用户行为包括：页面路由变化、鼠标点击、资源加载、接口调用、代码报错等行为</p><h3 id="设计思路-1" tabindex="-1">设计思路 <a class="header-anchor" href="#设计思路-1" aria-label="Permalink to &quot;设计思路&quot;">​</a></h3><p>1、通过Breadcrumb类来创建用户行为的对象，来存储和管理所有的用户行为</p><p>2、通过重写或添加相应的事件，完成用户行为数据的采集</p><p>用户行为代码示例：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 创建用户行为类</span></span>
<span class="line"><span>class Breadcrumb {</span></span>
<span class="line"><span>  // maxBreadcrumbs控制上报用户行为的最大条数</span></span>
<span class="line"><span>  maxBreadcrumbs = 20;</span></span>
<span class="line"><span>  // stack 存储用户行为</span></span>
<span class="line"><span>  stack = [];</span></span>
<span class="line"><span>  constructor() {}</span></span>
<span class="line"><span>  // 添加用户行为栈</span></span>
<span class="line"><span>  push(data) {</span></span>
<span class="line"><span>    if (this.stack.length &gt;= this.maxBreadcrumbs) {</span></span>
<span class="line"><span>      // 超出则删除第一条</span></span>
<span class="line"><span>      this.stack.shift();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    this.stack.push(data);</span></span>
<span class="line"><span>    // 按照时间排序</span></span>
<span class="line"><span>    this.stack.sort((a, b) =&gt; a.time - b.time);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let breadcrumb = new Breadcrumb();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 添加一条页面跳转的行为，从home页面跳转到about页面</span></span>
<span class="line"><span>breadcrumb.push({</span></span>
<span class="line"><span>  type: &quot;Route&quot;,</span></span>
<span class="line"><span>  form: &#39;/home&#39;,</span></span>
<span class="line"><span>  to: &#39;/about&#39;</span></span>
<span class="line"><span>  url: &quot;http://localhost:3000/index.html&quot;,</span></span>
<span class="line"><span>  time: &quot;1668759320435&quot;</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 添加一条用户点击行为</span></span>
<span class="line"><span>breadcrumb.push({</span></span>
<span class="line"><span>  type: &quot;Click&quot;,</span></span>
<span class="line"><span>  dom: &quot;&lt;button id=&#39;btn&#39;&gt;按钮&lt;/button&gt;&quot;,</span></span>
<span class="line"><span>  time: &quot;1668759620485&quot;</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 添加一条调用接口行为</span></span>
<span class="line"><span>breadcrumb.push({</span></span>
<span class="line"><span>  type: &quot;Xhr&quot;,</span></span>
<span class="line"><span>  url: &quot;http://10.105.10.12/monitor/open/pushData&quot;,</span></span>
<span class="line"><span>  time: &quot;1668760485550&quot;</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 上报用户行为</span></span>
<span class="line"><span>reportData({</span></span>
<span class="line"><span>  uuid: &quot;a6481683-6d2e-4bd8-bba1-64819d8cce8c&quot;,</span></span>
<span class="line"><span>  stack: breadcrumb.getStack()</span></span>
<span class="line"><span>});</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br></div></div><h3 id="页面跳转" tabindex="-1">页面跳转 <a class="header-anchor" href="#页面跳转" aria-label="Permalink to &quot;页面跳转&quot;">​</a></h3><p>通过监听路由的变化来判断页面跳转，路由有<code>history、hash</code>两种模式，history模式可以监听<code>popstate</code>事件，hash模式通过重写 <code>pushState和 replaceState</code>事件</p><p>vue项目中不能通过 <code>hashchange</code> 事件来监听路由变化，<code>vue-router</code> 底层调用的是 <code>history.pushState</code> 和 <code>history.replaceState</code>，不会触发 hashchange</p><p>vue-router源码：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>function pushState (url, replace) {</span></span>
<span class="line"><span>  saveScrollPosition();</span></span>
<span class="line"><span>  var history = window.history;</span></span>
<span class="line"><span>  try {</span></span>
<span class="line"><span>    if (replace) {</span></span>
<span class="line"><span>      history.replaceState({ key: _key }, &#39;&#39;, url);</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>      _key = genKey();</span></span>
<span class="line"><span>      history.pushState({ key: _key }, &#39;&#39;, url);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  } catch (e) {</span></span>
<span class="line"><span>    window.location[replace ? &#39;replace&#39; : &#39;assign&#39;](url);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// this.$router.push时触发</span></span>
<span class="line"><span>function pushHash (path) { </span></span>
<span class="line"><span>  if (supportsPushState) {</span></span>
<span class="line"><span>    pushState(getUrl(path));</span></span>
<span class="line"><span>  } else {</span></span>
<span class="line"><span>    window.location.hash = path;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p>通过重写 pushState、replaceState 事件来监听路由变化</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// lastHref 前一个页面的路由</span></span>
<span class="line"><span>let lastHref = document.location.href;</span></span>
<span class="line"><span>function historyReplace() {</span></span>
<span class="line"><span>  function historyReplaceFn(originalHistoryFn) {</span></span>
<span class="line"><span>    return function(...args) {</span></span>
<span class="line"><span>      const url = args.length &gt; 2 ? args[2] : undefined;</span></span>
<span class="line"><span>      if (url) {</span></span>
<span class="line"><span>        const from = lastHref;</span></span>
<span class="line"><span>        const to = String(url);</span></span>
<span class="line"><span>        lastHref = to;</span></span>
<span class="line"><span>        // 上报路由变化</span></span>
<span class="line"><span>        reportData(&quot;routeChange&quot;, {</span></span>
<span class="line"><span>          from,</span></span>
<span class="line"><span>          to</span></span>
<span class="line"><span>        });</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      return originalHistoryFn.apply(this, args);</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  // 重写pushState事件</span></span>
<span class="line"><span>  replaceAop(window.history, &quot;pushState&quot;, historyReplaceFn);</span></span>
<span class="line"><span>  // 重写replaceState事件</span></span>
<span class="line"><span>  replaceAop(window.history, &quot;replaceState&quot;, historyReplaceFn);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function replaceAop(source, name, fn) {</span></span>
<span class="line"><span>  if (source === undefined) return;</span></span>
<span class="line"><span>  if (name in source) {</span></span>
<span class="line"><span>    var original = source[name];</span></span>
<span class="line"><span>    var wrapped = fn(original);</span></span>
<span class="line"><span>    if (typeof wrapped === &quot;function&quot;) {</span></span>
<span class="line"><span>      source[name] = wrapped;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div><h3 id="用户点击" tabindex="-1">用户点击 <a class="header-anchor" href="#用户点击" aria-label="Permalink to &quot;用户点击&quot;">​</a></h3><p>给 document 对象添加click事件，并上报</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>function domReplace() {</span></span>
<span class="line"><span>  document.addEventListener(&quot;click&quot;,({ target }) =&gt; {</span></span>
<span class="line"><span>      const tagName = target.tagName.toLowerCase();</span></span>
<span class="line"><span>      if (tagName === &quot;body&quot;) {</span></span>
<span class="line"><span>        return null;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      let classNames = target.classList.value;</span></span>
<span class="line"><span>      classNames = classNames !== &quot;&quot; ? \` class=&quot;\${classNames}&quot;\` : &quot;&quot;;</span></span>
<span class="line"><span>      const id = target.id ? \` id=&quot;\${target.id}&quot;\` : &quot;&quot;;</span></span>
<span class="line"><span>      const innerText = target.innerText;</span></span>
<span class="line"><span>      // 获取包含id、class、innerTextde字符串的标签</span></span>
<span class="line"><span>      let dom = \`&lt;\${tagName}\${id}\${</span></span>
<span class="line"><span>        classNames !== &quot;&quot; ? classNames : &quot;&quot;</span></span>
<span class="line"><span>      }&gt;\${innerText}&lt;/\${tagName}&gt;\`;</span></span>
<span class="line"><span>      // 上报</span></span>
<span class="line"><span>      reportData({</span></span>
<span class="line"><span>        type: &#39;Click&#39;,</span></span>
<span class="line"><span>        dom</span></span>
<span class="line"><span>      });</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    true</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h3 id="资源加载" tabindex="-1">资源加载 <a class="header-anchor" href="#资源加载" aria-label="Permalink to &quot;资源加载&quot;">​</a></h3><p>获取页面中加载的资源信息，比如它们的 url 是什么、加载了多久、是否来自缓存等，最终生成 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fblog.csdn.net%2Fcsdn_girl%2Farticle%2Fdetails%2F54911632" title="https://blog.csdn.net/csdn_girl/article/details/54911632" target="_blank" rel="noreferrer">资源加载瀑布图</a></p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e92b04772b2044e5a2cc21b1b73c9acb~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="waterfall .png"></p><p>瀑布图展现了浏览器为渲染网页而加载的所有的资源，包括加载的顺序和每个资源的加载时间</p><p>分析这些资源是如何加载的, 可以帮助我们了解究竟是什么原因拖慢了网页，从而采取对应的措施来提升网页速度</p><p>可以通过 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FPerformance%2FgetEntriesByType" title="https://developer.mozilla.org/zh-CN/docs/Web/API/Performance/getEntriesByType" target="_blank" rel="noreferrer">performance.getEntriesByType(&#39;resource&#39;)</a> 获取页面加载的资源列表，同时可以结合 initiatorType 字段来判断资源类型，对资源进行过滤</p><p>其中 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FPerformance%2FgetEntriesByType" title="https://developer.mozilla.org/zh-CN/docs/Web/API/Performance/getEntriesByType" target="_blank" rel="noreferrer">PerformanceResourceTiming</a> 来分析资源加载的详细数据</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// PerformanceResourceTiming 各字段说明</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  connectEnd, // 表示浏览器完成建立与服务器的连接以检索资源之后的时间</span></span>
<span class="line"><span>  connectStart, // 表示浏览器开始建立与服务器的连接以检索资源之前的时间</span></span>
<span class="line"><span>  decodedBodySize, // 表示在删除任何应用的内容编码之后，从*消息主体*的请求（HTTP 或缓存）中接收到的大小（以八位字节为单位）</span></span>
<span class="line"><span>  domainLookupEnd, // 表示浏览器完成资源的域名查找之后的时间</span></span>
<span class="line"><span>  domainLookupStart, // 表示在浏览器立即开始资源的域名查找之前的时间</span></span>
<span class="line"><span>  duration, // 返回一个timestamp，即 responseEnd 和 startTime 属性的差值</span></span>
<span class="line"><span>  encodedBodySize, // 表示在删除任何应用的内容编码之前，从*有效内容主体*的请求（HTTP 或缓存）中接收到的大小（以八位字节为单位）</span></span>
<span class="line"><span>  entryType, // 返回 &quot;resource&quot;</span></span>
<span class="line"><span>  fetchStart, // 表示浏览器即将开始获取资源之前的时间</span></span>
<span class="line"><span>  initiatorType, // 代表启动性能条目的资源的类型，如 PerformanceResourceTiming.initiatorType 中所指定</span></span>
<span class="line"><span>  name, // 返回资源 URL</span></span>
<span class="line"><span>  nextHopProtocol, // 代表用于获取资源的网络协议</span></span>
<span class="line"><span>  redirectEnd, // 表示收到上一次重定向响应的发送最后一个字节时的时间</span></span>
<span class="line"><span>  redirectStart, // 表示上一次重定向开始的时间</span></span>
<span class="line"><span>  requestStart, // 表示浏览器开始向服务器请求资源之前的时间</span></span>
<span class="line"><span>  responseEnd, // 表示在浏览器接收到资源的最后一个字节之后或在传输连接关闭之前（以先到者为准）的时间</span></span>
<span class="line"><span>  responseStart, // 表示浏览器从服务器接收到响应的第一个字节后的时间</span></span>
<span class="line"><span>  secureConnectionStart, // 表示浏览器即将开始握手过程以保护当前连接之前的时间</span></span>
<span class="line"><span>  serverTiming, // 一个 PerformanceServerTiming 数组，包含服务器计时指标的PerformanceServerTiming 条目</span></span>
<span class="line"><span>  startTime, // 表示资源获取开始的时间。该值等效于 PerformanceEntry.fetchStart</span></span>
<span class="line"><span>  transferSize, // 代表所获取资源的大小（以八位字节为单位）。该大小包括响应标头字段以及响应有效内容主体</span></span>
<span class="line"><span>  workerStart // 如果服务 Worker 线程已经在运行，则返回在分派 FetchEvent 之前的时间戳，如果尚未运行，则返回在启动 Service Worker 线程之前的时间戳。如果服务 Worker 未拦截该资源，则该属性将始终返回 0。</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><p>获取资源加载时长为 <code>duration</code> 字段，即 <code>responseEnd 与 startTime</code> 的差值</p><p>获取加载资源列表：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>function getResource() {</span></span>
<span class="line"><span>  if (performance.getEntriesByType) {</span></span>
<span class="line"><span>    const entries = performance.getEntriesByType(&#39;resource&#39;);</span></span>
<span class="line"><span>    // 过滤掉非静态资源的 fetch、 xmlhttprequest、beacon</span></span>
<span class="line"><span>    let list = entries.filter((entry) =&gt; {</span></span>
<span class="line"><span>      return [&#39;fetch&#39;, &#39;xmlhttprequest&#39;, &#39;beacon&#39;].indexOf(entry.initiatorType) === -1;</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if (list.length) {</span></span>
<span class="line"><span>      list = JSON.parse(JSON.stringify(list));</span></span>
<span class="line"><span>      list.forEach((entry) =&gt; {</span></span>
<span class="line"><span>        entry.isCache = isCache(entry);</span></span>
<span class="line"><span>      });</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return list;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 判断资料是否来自缓存</span></span>
<span class="line"><span>// transferSize为0，说明是从缓存中直接读取的（强制缓存）</span></span>
<span class="line"><span>// transferSize不为0，但是\`encodedBodySize\` 字段为 0，说明它走的是协商缓存（\`encodedBodySize 表示请求响应数据 body 的大小\`）</span></span>
<span class="line"><span>function isCache(entry) {</span></span>
<span class="line"><span>  return entry.transferSize === 0 || (entry.transferSize !== 0 &amp;&amp; entry.encodedBodySize === 0);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p>一个真实的页面中，资源加载大多数是逐步进行的，有些资源本身就做了延迟加载，有些是需要用户发生交互后才会去请求一些资源</p><p>如果我们只关注首页资源，可以在 <code>window.onload</code> 事件中去收集</p><p>如果要收集所有的资源，需要通过定时器反复地去收集，并且在一轮收集结束后，通过调用 <a href="https://link.juejin.cn/?target=https%3A%2F%2Flink.zhihu.com%2F%3Ftarget%3Dhttps%253A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FPerformance%2FclearResourceTimings" title="https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/API/Performance/clearResourceTimings" target="_blank" rel="noreferrer">clearResourceTimings</a> 将 performance entries 里的信息清空，避免在下一轮收集时取到重复的资源</p><h2 id="个性化指标" tabindex="-1">个性化指标 <a class="header-anchor" href="#个性化指标" aria-label="Permalink to &quot;个性化指标&quot;">​</a></h2><h3 id="long-task" tabindex="-1">long task <a class="header-anchor" href="#long-task" aria-label="Permalink to &quot;long task&quot;">​</a></h3><p>执行时间超过50ms的任务，被称为 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FLong_Tasks_API" title="https://developer.mozilla.org/zh-CN/docs/Web/API/Long_Tasks_API" target="_blank" rel="noreferrer">long task</a> 长任务</p><p>获取页面的长任务列表：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const entryHandler = list =&gt; {</span></span>
<span class="line"><span>  for (const long of list.getEntries()) {</span></span>
<span class="line"><span>    // 获取长任务详情</span></span>
<span class="line"><span>    console.log(long);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let observer = new PerformanceObserver(entryHandler);</span></span>
<span class="line"><span>observer.observe({ entryTypes: [&quot;longtask&quot;] });</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="memory页面内存" tabindex="-1">memory页面内存 <a class="header-anchor" href="#memory页面内存" aria-label="Permalink to &quot;memory页面内存&quot;">​</a></h3><p><code>performance.memory</code> 可以显示此刻内存占用情况，它是一个动态值，其中：</p><ul><li><p>jsHeapSizeLimit 该属性代表的含义是：内存大小的限制。</p></li><li><p>totalJSHeapSize 表示总内存的大小。</p></li><li><p>usedJSHeapSize 表示可使用的内存的大小。</p></li></ul><p>通常，usedJSHeapSize 不能大于 totalJSHeapSize，如果大于，有可能出现了内存泄漏</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// load事件中获取此时页面的内存大小</span></span>
<span class="line"><span>window.addEventListener(&quot;load&quot;, () =&gt; {</span></span>
<span class="line"><span>  console.log(&quot;memory&quot;, performance.memory);</span></span>
<span class="line"><span>});</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="首屏加载时间" tabindex="-1">首屏加载时间 <a class="header-anchor" href="#首屏加载时间" aria-label="Permalink to &quot;首屏加载时间&quot;">​</a></h3><p>首屏加载时间和首页加载时间不一样，首屏指的是屏幕内的dom渲染完成的时间</p><p>比如首页很长需要好几屏展示，这种情况下屏幕以外的元素不考虑在内</p><p><strong>计算首屏加载时间流程</strong></p><p>1）利用<code>MutationObserver</code>监听<code>document</code>对象，每当dom变化时触发该事件</p><p>2）判断监听的dom是否在首屏内，如果在首屏内，将该dom放到指定的数组中，记录下当前dom变化的时间点</p><p>3）在MutationObserver的callback函数中，通过防抖函数，监听<code>document.readyState</code>状态的变化</p><p>4）当<code>document.readyState === &#39;complete&#39;</code>，停止定时器和 取消对document的监听</p><p>5）遍历存放dom的数组，找出最后变化节点的时间，用该时间点减去<code>performance.timing.navigationStart</code> 得出首屏的加载时间</p><h2 id="监控sdk" tabindex="-1">监控SDK <a class="header-anchor" href="#监控sdk" aria-label="Permalink to &quot;监控SDK&quot;">​</a></h2><p>监控SDK的作用：数据采集与上报</p><h3 id="整体架构" tabindex="-1">整体架构 <a class="header-anchor" href="#整体架构" aria-label="Permalink to &quot;整体架构&quot;">​</a></h3><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ca8db3058b2d49608a447dbc4dccbc0c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="sdkProcess.jpg"></p><p>整体架构使用 <strong>发布-订阅</strong> 设计模式，这样设计的好处是便于后续扩展与维护，如果想添加新的<code>hook</code>或事件，在该回调中添加对应的函数即可</p><h3 id="sdk-入口" tabindex="-1">SDK 入口 <a class="header-anchor" href="#sdk-入口" aria-label="Permalink to &quot;SDK 入口&quot;">​</a></h3><p><code>src/index.js</code></p><p>对外导出init事件，配置了vue、react项目的不同引入方式</p><p>vue项目在Vue.config.errorHandler中上报错误，react项目在ErrorBoundary中上报错误</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0124fc1be85f43f8b6172f6bdb950218~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="entry.png"></p><h3 id="事件发布与订阅" tabindex="-1">事件发布与订阅 <a class="header-anchor" href="#事件发布与订阅" aria-label="Permalink to &quot;事件发布与订阅&quot;">​</a></h3><p>通过添加监听事件来捕获错误，利用 AOP 切片编程，重写接口请求、路由监听等功能，从而获取对应的数据</p><p><code>src/load.js</code></p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/498c219e4d01449cac3be2c9a3f9db24~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="replace.png"></p><h3 id="用户行为收集" tabindex="-1">用户行为收集 <a class="header-anchor" href="#用户行为收集" aria-label="Permalink to &quot;用户行为收集&quot;">​</a></h3><p><code>core/breadcrumb.js</code></p><p>创建用户行为类，stack用来存储用户行为，当长度超过限制时，最早的一条数据会被覆盖掉，在上报错误时，对应的用户行为会添加到该错误信息中</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4e5fcce29ac54bb1a2cede02b395bfbb~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="bread.png"></p><h3 id="数据上报方式" tabindex="-1">数据上报方式 <a class="header-anchor" href="#数据上报方式" aria-label="Permalink to &quot;数据上报方式&quot;">​</a></h3><p>支持图片打点上报和fetch请求上报两种方式</p><p>图片打点上报的优势：<br> 1）支持跨域，一般而言，上报域名都不是当前域名，上报的接口请求会构成跨域<br> 2）体积小且不需要插入dom中<br> 3）不需要等待服务器返回数据</p><p>图片打点缺点是：url受浏览器长度限制</p><p><code>core/transportData.js</code></p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0a5c83e0ee5f41428e5bca3de2f7dd2c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="send.png"></p><h3 id="数据上报时机" tabindex="-1">数据上报时机 <a class="header-anchor" href="#数据上报时机" aria-label="Permalink to &quot;数据上报时机&quot;">​</a></h3><p>优先使用 requestIdleCallback，利用浏览器空闲时间上报，其次使用微任务上报</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/293f0ce61c994a16aaf2ed2341803878~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="queue.png"></p><p>监控SDK，参考了 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fgetsentry%2Fsentry-javascript" title="https://github.com/getsentry/sentry-javascript" target="_blank" rel="noreferrer">sentry</a>、 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FclouDr-f2e%2Fmonitor" title="https://github.com/clouDr-f2e/monitor" target="_blank" rel="noreferrer">monitor</a>、 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fmitojs%2Fmitojs" title="https://github.com/mitojs/mitojs" target="_blank" rel="noreferrer">mitojs</a></p><h2 id="项目后台demo" tabindex="-1">项目后台demo <a class="header-anchor" href="#项目后台demo" aria-label="Permalink to &quot;项目后台demo&quot;">​</a></h2><p>主要用来演示错误还原功能，方式包括：定位源码、播放录屏、记录用户行为</p><h2 id="" tabindex="-1"><a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fxy-sea%2Fweb-see-demo%23%25E5%258A%259F%25E8%2583%25BD" title="https://github.com/xy-sea/web-see-demo#%E5%8A%9F%E8%83%BD" target="_blank" rel="noreferrer"></a> <a class="header-anchor" href="#" aria-label="Permalink to &quot;[](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fxy-sea%2Fweb-see-demo%23%25E5%258A%259F%25E8%2583%25BD &quot;https://github.com/xy-sea/web-see-demo#%E5%8A%9F%E8%83%BD&quot;)&quot;">​</a></h2><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/179f1b31741443eab79be2a59eb62f28~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="web-see.gif"></p><p>后台demo功能介绍：</p><p>1、使用 express 开启静态服务器，模拟线上环境，用于实现定位源码的功能</p><p>2、server.js 中实现了 reportData（错误上报）、getmap（获取 map 文件）、getRecordScreenId（获取录屏信息）、 getErrorList（获取错误列表）的接口</p><p>3、用户可点击 &#39;js 报错&#39;、&#39;异步报错&#39;、&#39;promise 错误&#39; 按钮，上报对应的代码错误，后台实现错误还原功能</p><p>4、点击 &#39;xhr 请求报错&#39;、&#39;fetch 请求报错&#39; 按钮，上报接口报错信息</p><p>5、点击 &#39;加载资源报错&#39; 按钮，上报对应的资源报错信息</p><p>通过这些异步的捕获，了解监控平台的整体流程</p><h2 id="安装与使用" tabindex="-1">安装与使用 <a class="header-anchor" href="#安装与使用" aria-label="Permalink to &quot;安装与使用&quot;">​</a></h2><p>npm官网搜索 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fweb-see" title="https://www.npmjs.com/package/web-see" target="_blank" rel="noreferrer">web-see</a></p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2577f7151904489283ffa5fd6fb0213a~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="install.jpg"></p><h2 id="仓库地址" tabindex="-1">仓库地址 <a class="header-anchor" href="#仓库地址" aria-label="Permalink to &quot;仓库地址&quot;">​</a></h2><p>监控SDK： <a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fxy-sea%2Fweb-see" title="https://github.com/xy-sea/web-see" target="_blank" rel="noreferrer">web-see</a></p><p>监控后台： <a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fxy-sea%2Fweb-see-demo" title="https://github.com/xy-sea/web-see-demo" target="_blank" rel="noreferrer">web-see-demo</a></p>`,218);function d(h,g,f,v,k,y){const p=a("ArticleMetadata"),e=a("ClientOnly");return r(),i("div",null,[u,n(e,null,{default:c(()=>[n(p)]),_:1}),m])}const j=l(o,[["render",d]]);export{w as __pageData,j as default};
