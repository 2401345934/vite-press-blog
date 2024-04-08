import{_ as t,o as l,c as p,J as s,w as r,m as a,a as h,aa as c,E as i}from"./chunks/framework.DJCjJe2w.js";const x=JSON.parse('{"title":"HTTP 请求跨域问题","description":"","frontmatter":{"createTime":"2022/10/26","tag":"HTTP"},"headers":[],"relativePath":"basic-quality/http/cross-domain/index.md","filePath":"basic-quality/http/cross-domain/index.md","lastUpdated":1668954237000}'),o={name:"basic-quality/http/cross-domain/index.md"},d=a("h1",{id:"http-请求跨域问题",tabindex:"-1"},[h("HTTP 请求跨域问题 "),a("a",{class:"header-anchor",href:"#http-请求跨域问题","aria-label":'Permalink to "HTTP 请求跨域问题"'},"​")],-1),k=c(`<h2 id="跨域的原理跨域" tabindex="-1">跨域的原理跨域 <a class="header-anchor" href="#跨域的原理跨域" aria-label="Permalink to &quot;跨域的原理跨域&quot;">​</a></h2><p>是指浏览器不能执行其他网站的脚本。它是由浏览器的同源策略造成的。 同源策略,是浏览器对 JavaScript 实施的安全限制，只要协议、域名、端口有任何一个不同，都被当作是不同的域。</p><h2 id="跨域原理" tabindex="-1">跨域原理 <a class="header-anchor" href="#跨域原理" aria-label="Permalink to &quot;跨域原理&quot;">​</a></h2><p>即是通过各种方式，避开浏览器的安全限制。</p><h3 id="解决方案" tabindex="-1">解决方案 <a class="header-anchor" href="#解决方案" aria-label="Permalink to &quot;解决方案&quot;">​</a></h3><p>最初做项目的时候，使用的是jsonp，但存在一些问题，使用get请求不安全，携带数据较小，后来也用过iframe，但只有主域相同才行，也是存在些问题，后来通过了解和学习发现使用代理和proxy代理配合起来使用比较方便，就引导后台按这种方式做下服务器配置，在开发中使用proxy，在服务器上使用nginx代理，这样开发过程中彼此都方便，效率也高；现在h5新特性还有 windows.postMessage()</p><h3 id="jsonp" tabindex="-1">JSONP <a class="header-anchor" href="#jsonp" aria-label="Permalink to &quot;JSONP&quot;">​</a></h3><p>ajax 请求受同源策略影响，不允许进行跨域请求，而 script 标签 src 属性中的链 接却可以访问跨域的 js 脚本，利用这个特性，服务端不再返回 JSON 格式的数据，而是 返回一段调用某个函数的 js 代码，在 src 中进行了调用，这样实现了跨域。</p><h3 id="步骤" tabindex="-1">步骤 <a class="header-anchor" href="#步骤" aria-label="Permalink to &quot;步骤&quot;">​</a></h3><ul><li>去创建一个script标签</li><li>script的src属性设置接口地址</li><li>接口参数，必须要带一个自定义函数名，要不然后台无法返回数据</li><li>通过定义函数名去接受返回的数据</li></ul><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//动态创建 script</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> script </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> document.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">createElement</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;script&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 设置回调函数</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> getData</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">data</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(data);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//设置 script 的 src 属性，并设置请求地址</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">script.src </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;http://localhost:3000/?callback=getData&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 让 script 生效</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">document.body.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">appendChild</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(script);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><ul><li>JSONP 的缺点: JSON 只支持 get，因为 script 标签只能使用 get 请求； JSONP 需要后端配合返回指定格式的数据。</li><li>document.domain 基础域名相同 子域名不同</li><li>window.name 利用在一个浏览器窗口内，载入所有的域名都是共享一个window.name</li><li>CORS CORS(Cross-origin resource sharing)跨域资源共享 服务器设置对CORS的支持原理：服务器设置Access-Control-Allow-Origin HTTP响应头之后，浏览器将会允许跨域请求</li><li>proxy代理 目前常用方式,通过服务器设置代理</li><li>window.postMessage() 利用h5新特性window.postMessage()</li></ul><h2 id="跨域问题实际上改的是-http-里面哪个参数" tabindex="-1">跨域问题实际上改的是 http 里面哪个参数 <a class="header-anchor" href="#跨域问题实际上改的是-http-里面哪个参数" aria-label="Permalink to &quot;跨域问题实际上改的是 http 里面哪个参数&quot;">​</a></h2><p>答：Access-Control-Allow-Origin</p>`,14);function E(u,b,g,m,y,_){const n=i("ArticleMetadata"),e=i("ClientOnly");return l(),p("div",null,[d,s(e,null,{default:r(()=>[s(n)]),_:1}),k])}const C=t(o,[["render",E]]);export{x as __pageData,C as default};
