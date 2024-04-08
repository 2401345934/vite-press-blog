import{_ as l,o as t,c as r,J as a,w as h,m as s,a as p,aa as o,E as i}from"./chunks/framework.DJCjJe2w.js";const c="/vite-press-blog/assets/Memory.DRffTYrQ.webp",d="/vite-press-blog/assets/Cache-control.CLbJTgzc.webp",k="/vite-press-blog/assets/Cache-control2.DP6s7Fwg.webp",u="/vite-press-blog/assets/Cache-control3.BXIk0jxc.webp",_=JSON.parse('{"title":"浏览器的缓存策略","description":"","frontmatter":{"createTime":"2022/10/25","tag":"浏览器"},"headers":[],"relativePath":"basic-quality/browser/browser/browser-cache/index.md","filePath":"basic-quality/browser/browser/browser-cache/index.md","lastUpdated":1667371206000}'),b={name:"basic-quality/browser/browser/browser-cache/index.md"},m=s("h1",{id:"浏览器的缓存策略",tabindex:"-1"},[p("浏览器的缓存策略 "),s("a",{class:"header-anchor",href:"#浏览器的缓存策略","aria-label":'Permalink to "浏览器的缓存策略"'},"​")],-1),g=o('<p>缓存可以说是性能优化中简单高效的一种优化方式了，它可以显著减少网络传输所带来的损耗。 对于一个数据请求来说，可以分为发起网络请求、后端处理、浏览器响应三个步骤。浏览器缓存可以帮助我们在第一和第三步骤中优化性能。比如说直接使用缓存而不发起请求，或者发起了请求但后端存储的数据和前端一致，那么就没有必要再将数据回传回来，这样就减少了响应数据。 接下来的内容中我们将通过以下几个部分来探讨浏览器缓存机制：</p><ul><li>缓存位置</li><li>缓存策略</li><li>实际场景应用缓存策略</li></ul><h2 id="缓存位置" tabindex="-1">缓存位置 <a class="header-anchor" href="#缓存位置" aria-label="Permalink to &quot;缓存位置&quot;">​</a></h2><p>从缓存位置上来说分为四种，并且各自有优先级，当依次查找缓存且都没有命中的时候，才会去请求网络</p><ul><li>Service Worker <ul><li>自由控制哪些文件缓存 缓存时效是持续性的</li></ul></li><li>Memory Cache <ul><li>内存缓存 速度快 但是 存储空间限制大 时效性 短 会随着进程而释放 一般大文件不会存放这里</li></ul></li><li>Disk Cache <ul><li>磁盘缓存 速度没有 内存缓存快 但是存储空间大 时效性长 大部分缓存都会走这里</li></ul></li><li>Push Cache <ul><li>http2 才有的缓存策略</li></ul></li><li>网络请求 fetch <ul><li>正常请求</li></ul></li></ul><h3 id="service-worker" tabindex="-1">Service Worker <a class="header-anchor" href="#service-worker" aria-label="Permalink to &quot;Service Worker&quot;">​</a></h3><p>Service Worker 的缓存与浏览器其他内建的缓存机制不同，它可以让我们自由控制缓存哪些文件、如何匹配缓存、如何读取缓存，并且缓存是持续性的。 当 Service Worker 没有命中缓存的时候，我们需要去调用 fetch 函数获取数据。也就是说，如果我们没有在 Service Worker 命中缓存的话，会根据缓存查找优先级去查找数据。但是不管我们是从 Memory Cache 中还是从网络请求中获取的数据，浏览器都会显示我们是从 Service Worker 中获取的内容。</p><h3 id="memory-cache" tabindex="-1">Memory Cache <a class="header-anchor" href="#memory-cache" aria-label="Permalink to &quot;Memory Cache&quot;">​</a></h3><p><img src="'+c+'" alt="图片"> Memory Cache 也就是内存中的缓存，读取内存中的数据肯定比磁盘快。但是内存缓存虽然读取高效，可是缓存持续性很短，会随着进程的释放而释放。 一旦我们关闭 Tab 页面，内存中的缓存也就被释放了。 当我们访问过页面以后，再次刷新页面，可以发现很多数据都来自于内存缓存</p><p>那么既然内存缓存这么高效，我们是不是能让数据都存放在内存中呢？ 先说结论，这是不可能的。首先计算机中的内存一定比硬盘容量小得多，操作系统需要精打细算内存的使用，所以能让我们使用的内存必然不多。内存中其实可以存储大部分的文件，比如说 JSS、HTML、CSS、图片等等。但是浏览器会把哪些文件丢进内存这个过程就很玄学了，我查阅了很多资料都没有一个定论。 当然，我通过一些实践和猜测也得出了一些结论：</p><ul><li>对于大文件来说，大概率是不存储在内存中的，反之优先</li><li>当前系统内存使用率高的话，文件优先存储进硬盘</li></ul><h3 id="disk-cache" tabindex="-1">Disk Cache <a class="header-anchor" href="#disk-cache" aria-label="Permalink to &quot;Disk Cache&quot;">​</a></h3><p>Disk Cache 也就是存储在硬盘中的缓存，读取速度慢点，但是什么都能存储到磁盘中，比之 Memory Cache 胜在容量和存储时效性上。 在所有浏览器缓存中，Disk Cache 覆盖面基本是最大的。它会根据 HTTP Herder 中的字段判断哪些资源需要缓存，哪些资源可以不请求直接使用，哪些资源已经过期需要重新请求。并且即使在跨站点的情况下，相同地址的资源一旦被硬盘缓存下来，就不会再次去请求数据。</p><h3 id="push-cache" tabindex="-1">Push Cache <a class="header-anchor" href="#push-cache" aria-label="Permalink to &quot;Push Cache&quot;">​</a></h3><p>Push Cache 是 HTTP/2 中的内容，当以上三种缓存都没有命中时，它才会被使用。并且缓存时间也很短暂，只在会话（Session）中存在，一旦会话结束就被释放。 Push Cache 在国内能够查到的资料很少，也是因为 HTTP/2 在国内不够普及，但是 HTTP/2 将会是日后的一个趋势。这里推荐阅读 HTTP/2 push is tougher than I thought 这篇文章，但是内容是英文的，我翻译一下文章中的几个结论，有能力的同学还是推荐自己阅读</p><ul><li>所有的资源都能被推送，但是 Edge 和 Safari 浏览器兼容性不怎么好</li><li>可以推送 no-cache 和 no-store 的资源</li><li>一旦连接被关闭，Push Cache 就被释放</li><li>多个页面可以使用相同的 HTTP/2 连接，也就是说能使用同样的缓存</li><li>Push Cache 中的缓存只能被使用一次</li><li>浏览器可以拒绝接受已经存在的资源推送</li><li>你可以给其他域名推送资源</li></ul><h3 id="网络请求-fetch" tabindex="-1">网络请求 fetch <a class="header-anchor" href="#网络请求-fetch" aria-label="Permalink to &quot;网络请求 fetch&quot;">​</a></h3><p>如果所有缓存都没有命中的话，那么只能发起请求来获取资源了。</p><h2 id="缓存策略" tabindex="-1">缓存策略 <a class="header-anchor" href="#缓存策略" aria-label="Permalink to &quot;缓存策略&quot;">​</a></h2><p>通常浏览器缓存策略分为两种：强缓存和协商缓存，并且缓存策略都是通过设置 HTTP Header 来实现的。</p><h3 id="强缓存" tabindex="-1">强缓存 <a class="header-anchor" href="#强缓存" aria-label="Permalink to &quot;强缓存&quot;">​</a></h3><p>强缓存可以通过设置两种 HTTP Header 实现：Expires 和 Cache-Control 。强缓存表示在缓存期间不需要请求，state code 为 200。</p><h4 id="expires" tabindex="-1">Expires <a class="header-anchor" href="#expires" aria-label="Permalink to &quot;Expires&quot;">​</a></h4><p>Expires: Wed, 22 Oct 2018 08:41:00 GMT Expires 是 HTTP/1 的产物，表示资源会在 Wed, 22 Oct 2018 08:41:00 GMT 后过期，需要再次请求。并且 Expires 受限于本地时间，如果修改了本地时间，可能会造成缓存失效。</p><h4 id="cache-control" tabindex="-1">Cache-control <a class="header-anchor" href="#cache-control" aria-label="Permalink to &quot;Cache-control&quot;">​</a></h4><p><img src="'+d+'" alt="图片"></p><p>Cache-control: max-age=30 Cache-Control 出现于 HTTP/1.1，优先级高于 Expires 。该属性值表示资源会在 30 秒后过期，需要再次请求。 Cache-Control 可以在请求头或者响应头中设置，并且可以组合使用多种指令</p><p>从图中我们可以看到，我们可以将多个指令配合起来一起使用，达到多个目的。比如说我们希望资源能被缓存下来，并且是客户端和代理服务器都能缓存，还能设置缓存失效时间等等。 接下来我们就来学习一些常见指令的作用 <img src="'+k+'" alt="图片"></p><h3 id="协商缓存" tabindex="-1">协商缓存 <a class="header-anchor" href="#协商缓存" aria-label="Permalink to &quot;协商缓存&quot;">​</a></h3><p><img src="'+u+`" alt="图片"></p><p>如果缓存过期了，就需要发起请求验证资源是否有更新。协商缓存可以通过设置两种 HTTP Header 实现：Last-Modified 和 ETag 。 当浏览器发起请求验证资源时，如果资源没有做改变，那么服务端就会返回 304 状态码，并且更新浏览器缓存有效期。</p><h4 id="last-modified-和-if-modified-since" tabindex="-1">Last-Modified 和 If-Modified-Since <a class="header-anchor" href="#last-modified-和-if-modified-since" aria-label="Permalink to &quot;Last-Modified 和 If-Modified-Since&quot;">​</a></h4><p>Last-Modified 表示本地文件最后修改日期，If-Modified-Since 会将 Last-Modified 的值发送给服务器，询问服务器在该日期后资源是否有更新，有更新的话就会将新的资源发送回来，否则返回 304 状态码。 但是 Last-Modified 存在一些弊端：</p><ul><li>如果本地打开缓存文件，即使没有对文件进行修改，但还是会造成 Last-Modified 被修改，服务端不能命中缓存导致发送相同的资源</li><li>因为 Last-Modified 只能以秒计时，如果在不可感知的时间内修改完成文件，那么服务端会认为资源还是命中了，不会返回正确的资源 因为以上这些弊端，所以在 HTTP / 1.1 出现了 ETag 。</li></ul><h4 id="etag-和-if-none-match" tabindex="-1">ETag 和 If-None-Match <a class="header-anchor" href="#etag-和-if-none-match" aria-label="Permalink to &quot;ETag 和 If-None-Match&quot;">​</a></h4><p>ETag 类似于文件指纹，If-None-Match 会将当前 ETag 发送给服务器，询问该资源 ETag 是否变动，有变动的话就将新的资源发送回来。并且 ETag 优先级比 Last-Modified 高。 以上就是缓存策略的所有内容了，看到这里，不知道你是否存在这样一个疑问。如果什么缓存策略都没设置，那么浏览器会怎么处理？ 对于这种情况，浏览器会采用一个启发式的算法，通常会取响应头中的 Date 减去 Last-Modified 值的 10% 作为缓存时间。</p><h3 id="last-modified-和-etag-有什么区别" tabindex="-1">last-modified 和 etag 有什么区别 <a class="header-anchor" href="#last-modified-和-etag-有什么区别" aria-label="Permalink to &quot;last-modified 和 etag 有什么区别&quot;">​</a></h3><h4 id="last-modified" tabindex="-1">last-modified <a class="header-anchor" href="#last-modified" aria-label="Permalink to &quot;last-modified&quot;">​</a></h4><ul><li>静态文件的 last-modified 一般会根据文件的最后修改时间生成</li></ul><h4 id="etag" tabindex="-1">etag <a class="header-anchor" href="#etag" aria-label="Permalink to &quot;etag&quot;">​</a></h4><ul><li>是根据文件的内容有没有变化进行更新</li><li>如果仅仅是修改时间变了 但是内容没变 不会更新</li><li>当文件更改时，etag 值必须改变。</li><li>尽量便于计算，不会特别耗 CPU。这样子利用摘要算法生成 (MD5, SHA128, SHA256) 需要慎重考虑，因为他们是 CPU 密集型运算</li><li>必须横向扩展，分布式部署时多个服务器节点上生成的 etag 值保持一致。这样子 inode 就排除了</li></ul><h4 id="etag主要为了解决last-modified无法解决的一些问题" tabindex="-1">Etag主要为了解决Last-Modified无法解决的一些问题 <a class="header-anchor" href="#etag主要为了解决last-modified无法解决的一些问题" aria-label="Permalink to &quot;Etag主要为了解决Last-Modified无法解决的一些问题&quot;">​</a></h4><ul><li>一些文件也许周期性的更改,但是它的内容并不改变(仅仅改变的是修改时间),这个时候我们不希望客户端认为这个文件被修改了,而重新获取资源.</li><li>某些文件修改非常频繁,比如在下一秒的时间内进行修改(比如1s内修改了N次),If-Modified-Since能检查到的粒度是秒级的,这种修改是无法判断的(或者说UNIX记录MTIME只能精确到秒);</li><li>某些服务器不能精确的得到文件的最后修改时间;</li><li>nginx配置里ETag选项默认开启的,所以请求的资源文件若发生改动,会在响应头里生成新的ETag值.这样客户端就能够发现If-None-Match的值和Etag字段的值不匹配,从而去请求最新的资源文件.</li></ul><h4 id="如果-http-响应头中-etag-值改变了-是否意味着文件内容一定已经更改" tabindex="-1">如果 http 响应头中 ETag 值改变了，是否意味着文件内容一定已经更改 ？ <a class="header-anchor" href="#如果-http-响应头中-etag-值改变了-是否意味着文件内容一定已经更改" aria-label="Permalink to &quot;如果 http 响应头中 ETag 值改变了，是否意味着文件内容一定已经更改 ？&quot;">​</a></h4><p>不一定，由服务器中 ETag 的生成算法决定。 比如 nginx 中的 etag 由 last_modified 与 content_length 组成，而 last_modified 又由 mtime 组成 当编辑文件却未更改文件内容时，或者 touch file，mtime 也会改变，此时 etag 改变，但是文件内容没有更改。</p><h2 id="实际场景应用缓存策略" tabindex="-1">实际场景应用缓存策略 <a class="header-anchor" href="#实际场景应用缓存策略" aria-label="Permalink to &quot;实际场景应用缓存策略&quot;">​</a></h2><p>单纯了解理论而不付诸于实践是没有意义的，接下来我们来通过几个场景学习下如何使用这些理论。</p><h3 id="频繁变动的资源" tabindex="-1">频繁变动的资源 <a class="header-anchor" href="#频繁变动的资源" aria-label="Permalink to &quot;频繁变动的资源&quot;">​</a></h3><p>对于频繁变动的资源，首先需要使用 Cache-Control: no-cache 使浏览器每次都请求服务器，然后配合 ETag 或者 Last-Modified 来验证资源是否有效。这样的做法虽然不能节省请求数量，但是能显著减少响应数据大小。</p><h3 id="代码文件" tabindex="-1">代码文件 <a class="header-anchor" href="#代码文件" aria-label="Permalink to &quot;代码文件&quot;">​</a></h3><p>这里特指除了 HTML 外的代码文件，因为 HTML 文件一般不缓存或者缓存时间很短。 一般来说，现在都会使用工具来打包代码，那么我们就可以对文件名进行哈希处理，只有当代码修改后才会生成新的文件名。基于此，我们就可以给代码文件设置缓存有效期一年 Cache-Control: max-age=31536000，这样只有当 HTML 文件中引入的文件名发生了改变才会去下载最新的代码文件，否则就一直使用缓存。</p><h2 id="示例-nginx" tabindex="-1">示例 nginx <a class="header-anchor" href="#示例-nginx" aria-label="Permalink to &quot;示例 nginx&quot;">​</a></h2><div class="language-nginx vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 强缓存时效为30s，30s后默认使用协商缓存，此时缓存时效优先级 &gt; max-age</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">location</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> / </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    add_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Cache-Control max-age=60;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    root </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  html;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    index </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> index.html index.htm;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    expires </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">30s</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 只使用协商缓存</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">location</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> / </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # no-cache 禁用强缓存</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    add_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Cache-Control no-cache;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    root </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  html;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    index </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> index.html index.htm;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 强缓存 缓存时效 1小时</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">location</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> / </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    root </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  html;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    index </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> index.html index.htm;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    expires </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1h</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div>`,53);function E(f,x,C,T,y,P){const e=i("ArticleMetadata"),n=i("ClientOnly");return t(),r("div",null,[m,a(n,null,{default:h(()=>[a(e)]),_:1}),g])}const M=l(b,[["render",E]]);export{_ as __pageData,M as default};