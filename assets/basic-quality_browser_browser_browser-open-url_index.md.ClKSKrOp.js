import{_ as o,o as r,c as n,J as l,w as s,m as i,a as c,aa as h,E as e}from"./chunks/framework.DJCjJe2w.js";const S=JSON.parse('{"title":"从输入一个 URL 地址到浏览器完成渲染的整个过程","description":"","frontmatter":{"createTime":"2022/10/25","tag":"浏览器"},"headers":[],"relativePath":"basic-quality/browser/browser/browser-open-url/index.md","filePath":"basic-quality/browser/browser/browser-open-url/index.md","lastUpdated":1670292734000}'),d={name:"basic-quality/browser/browser/browser-open-url/index.md"},T=i("h1",{id:"从输入一个-url-地址到浏览器完成渲染的整个过程",tabindex:"-1"},[c("从输入一个 URL 地址到浏览器完成渲染的整个过程 "),i("a",{class:"header-anchor",href:"#从输入一个-url-地址到浏览器完成渲染的整个过程","aria-label":'Permalink to "从输入一个 URL 地址到浏览器完成渲染的整个过程"'},"​")],-1),u=h('<h2 id="简单版" tabindex="-1">简单版 <a class="header-anchor" href="#简单版" aria-label="Permalink to &quot;简单版&quot;">​</a></h2><h3 id="这里可以按照进程来分" tabindex="-1">这里可以按照进程来分 <a class="header-anchor" href="#这里可以按照进程来分" aria-label="Permalink to &quot;这里可以按照进程来分&quot;">​</a></h3><ul><li>浏览器主进程： 用户输入判断 <ul><li>处理输入信息</li><li>判断是 URL 还是 关键字</li><li>如果是关键字 会按照默认地址组装出一个 URL</li><li>比如 在 谷歌浏览器直接输入 百度 两字 最终会拼接成一个 url</li><li><a href="https://www.google.com/search?q=%E7%99%BE%E5%BA%A6&amp;oq=%E7%99%BE%E5%BA%A6&amp;aqs=chrome..69i57j69i65j69i60j69i65j69i60l2.560j0j1&amp;sourceid=chrome&amp;ie=UTF-8" target="_blank" rel="noreferrer">https://www.google.com/search?q=百度&amp;oq=百度&amp;aqs=chrome..69i57j69i65j69i60j69i65j69i60l2.560j0j1&amp;sourceid=chrome&amp;ie=UTF-8</a></li><li>如果是 URL 会判断是否带有前缀 就是 http 还是 https</li><li>如果没有带前缀 会自动帮忙拼接前缀</li><li>处理完成信息开始下一步</li></ul></li><li>浏览器主进程： 开始导航 交给网络进程</li><li>网络进程： 准备发起 url 请求 <ul><li>会判断是否有缓存</li><li>有缓存 <ul><li>直接返回资源 给 浏览器主进程</li></ul></li><li>无缓存 <ul><li>DNS 解析 获取 IP <ul><li>建立 TLS TCP链接</li><li>构建请求头 请求行 cookies</li></ul></li><li>发送 HTTP 请求</li><li>服务器处理请求返回 HTTP 报文</li><li>读取响应头信息</li><li>根据状态码 处理</li><li>如果是 301 重定向 <ul><li>根据 Location 字段重定向到新地址</li><li>根据 Content-type 决定如何显示响应内容</li></ul></li><li>告诉浏览器主进程 准备通知 渲染进程</li></ul></li></ul></li><li>浏览器主进程： 准备渲染进程</li><li>渲染进程： 提交文档 根据 网络进程 建立管道 准备读取响应体数据</li><li>网络进程： 读取响应体数据 传输完成</li><li>渲染进程： 确认提交</li><li>浏览器主进程： 收到确认信息 提交信息</li><li>渲染进程： 页面解析和资源加载</li><li>浏览器主进程： 页面完成加载</li></ul><h2 id="复杂版" tabindex="-1">复杂版 <a class="header-anchor" href="#复杂版" aria-label="Permalink to &quot;复杂版&quot;">​</a></h2><ol><li>用户输入URL，浏览器会根据用户输入的信息判断是搜索还是网址，如果是搜索内容，就将搜索内容+默认搜索引擎合成新的URL；如果用户输入的内容符合URL规则，浏览器就会根据URL协议，在这段内容上加上协议合成合法的URL</li><li>用户输入完内容，按下回车键，浏览器导航栏显示loading状态，但是页面还是呈现前一个页面，这是因为新页面的响应数据还没有获得</li><li>浏览器进程浏览器构建请求行信息，会通过进程间通信（IPC）将URL请求发送给网络进程 GET /index.html HTTP1.1</li><li>网络进程获取到URL，先去本地缓存中查找是否有缓存文件，如果有，拦截请求，直接200返回；否则，进入网络请求过程</li><li>网络进程请求DNS返回域名对应的IP和端口号，如果之前DNS数据缓存服务缓存过当前域名信息，就会直接返回缓存信息；否则，发起请求获取根据域名解析出来的IP和端口号，如果没有端口号，http默认80，https默认443。如果是https请求，还需要建立TLS连接。</li><li>Chrome 有个机制，同一个域名同时最多只能建立 6 个TCP 连接，如果在同一个域名下同时有 10 个请求发生，那么其中 4 个请求会进入排队等待状态，直至进行中的请求完成。如果当前请求数量少于6个，会直接建立TCP连接。</li><li>TCP三次握手建立连接，http请求加上TCP头部——包括源端口号、目的程序端口号和用于校验数据完整性的序号，向下传输</li><li>网络层在数据包上加上IP头部——包括源IP地址和目的IP地址，继续向下传输到底层</li><li>底层通过物理网络传输给目的服务器主机</li><li>目的服务器主机网络层接收到数据包，解析出IP头部，识别出数据部分，将解开的数据包向上传输到传输层</li><li>目的服务器主机传输层获取到数据包，解析出TCP头部，识别端口，将解开的数据包向上传输到应用层</li><li>应用层HTTP解析请求头和请求体，如果需要重定向，HTTP直接返回HTTP响应数据的状态code301或者302，同时在请求头的Location字段中附上重定向地址，浏览器会根据code和Location进行重定向操作；如果不是重定向，首先服务器会根据 请求头中的If-None-Match 的值来判断请求的资源是否被更新，如果没有更新，就返回304状态码，相当于告诉浏览器之前的缓存还可以使用，就不返回新数据了；否则，返回新数据，200的状态码，并且如果想要浏览器缓存数据的话，就在相应头中加入字段： Cache-Control:Max-age=2000 响应数据又顺着应用层——传输层——网络层——网络层——传输层——应用层的顺序返回到网络进程</li><li>数据传输完成，TCP四次挥手断开连接。如果，浏览器或者服务器在HTTP头部加上如下信息，TCP就一直保持连接。保持TCP连接可以省下下次需要建立连接的时间，提示资源加载速度 Connection:Keep-Alive</li><li>网络进程将获取到的数据包进行解析，根据响应头中的Content-type来判断响应数据的类型，如果是字节流类型，就将该请求交给下载管理器，该导航流程结束，不再进行；如果是text/html类型，就通知浏览器进程获取到文档准备渲染</li><li>浏览器进程获取到通知，根据当前页面B是否是从页面A打开的并且和页面A是否是同一个站点（根域名和协议一样就被认为是同一个站点），如果满足上述条件，就复用之前网页的进程，否则，新创建一个单独的渲染进程</li><li>浏览器会发出“提交文档”的消息给渲染进程，渲染进程收到消息后，会和网络进程建立传输数据的“管道”，文档数据传输完成后，渲染进程会返回“确认提交”的消息给浏览器进程</li><li>浏览器收到“确认提交”的消息后，会更新浏览器的页面状态，包括了安全状态、地址栏的 URL、前进后退的历史状态，并更新web页面，此时的web页面是空白页</li><li>渲染进程对文档进行页面解析和子资源加载，HTML 通过HTM 解析器转成DOM Tree（二叉树类似结构的东西），CSS按照CSS 规则和CSS解释器转成CSSOM TREE，两个tree结合，形成render tree（不包含HTML的具体元素和元素要画的具体位置），通过Layout可以计算出每个元素具体的宽高颜色位置，结合起来，开始绘制，最后显示在屏幕中新页面显示出来</li></ol>',5);function p(m,_,P,C,b,L){const a=e("ArticleMetadata"),t=e("ClientOnly");return r(),n("div",null,[T,l(t,null,{default:s(()=>[l(a)]),_:1}),u])}const U=o(d,[["render",p]]);export{S as __pageData,U as default};
