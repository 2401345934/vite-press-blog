import{_ as l,o,c,b as s,w as r,d as a,e as i,a as t,r as n}from"./app.1fbcae6f.js";const D=JSON.parse('{"title":"GitHub Pages部署报错：JavaScript heap out of memory","description":"","frontmatter":{"createTime":"2022/11/10","tag":"工程化,GitHub,Gitee,部署"},"headers":[{"level":2,"title":"分析和解决过程","slug":"分析和解决过程","link":"#分析和解决过程","children":[]},{"level":2,"title":"解决方案","slug":"解决方案","link":"#解决方案","children":[]},{"level":2,"title":"扩展","slug":"扩展","link":"#扩展","children":[]}],"relativePath":"engineering/deployment/pages-js-memory/index.md","lastUpdated":1668138405000}'),b={name:"engineering/deployment/pages-js-memory/index.md"},d=a("h1",{id:"github-pages部署报错-javascript-heap-out-of-memory",tabindex:"-1"},[i("GitHub Pages部署报错：JavaScript heap out of memory "),a("a",{class:"header-anchor",href:"#github-pages部署报错-javascript-heap-out-of-memory","aria-hidden":"true"},"#")],-1),m=t(`<p><img src="https://img-blog.csdnimg.cn/img_convert/98473f83bb173a1f3f7b0c7c540b123b.png" alt="image-20220309180119580"></p><p>经过百度，发现原因是node使用的堆内存超出了V8引擎允许的最大值。</p><h2 id="分析和解决过程" tabindex="-1"><a href="https://blog.csdn.net/qq_42937522/article/details/123387368" target="_blank" rel="noreferrer"></a>分析和解决过程 <a class="header-anchor" href="#分析和解决过程" aria-hidden="true">#</a></h2><p>经过搜索常常得出了两种解决方案。</p><p><strong>1、使用 increase-memory-limit 插件</strong></p><p>TypeScript 和 webpack 时的常见问题，项目过大时，使用 increase-memory-limit，增加node服务器内存限制。</p><p>安装：</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#abb2bf;">npm install -g increase-memory-limit</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;"></span></span></code></pre><pre class="shiki material-palenight vp-code-light"><code><span class="line"><span style="color:#A6ACCD;">npm install -g increase-memory-limit</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>进入工程目录执行：</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#abb2bf;">increase-memory-limit</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span></code></pre><pre class="shiki material-palenight vp-code-light"><code><span class="line"><span style="color:#A6ACCD;">increase-memory-limit</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>在执行上述操作后，然后执行<code>npm run build</code> 后，会报错：</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#abb2bf;">&#39;&quot;node --max-old-space-size=4096&quot;&#39; 不是内部或外部命令，也不是可运行的程序</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;"></span></span></code></pre><pre class="shiki material-palenight vp-code-light"><code><span class="line"><span style="color:#A6ACCD;">&#39;&quot;node --max-old-space-size=4096&quot;&#39; 不是内部或外部命令，也不是可运行的程序</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>在高版本中移除了<code>node</code>命令，所以也不能解决。</p><p><strong>2、修改cmd文件</strong></p><p>在目录<code>node_modules/.bin</code>下打开<code>ng.cmd</code>和<code>ngc.cmd</code>文件，添加 <code>--max_old_space_size=4096</code></p><p><strong>但是因为最终部署在GitHub Pages，没有办法直接修改 node_modules 的文件，所以这种方法不行。</strong></p><h2 id="解决方案" tabindex="-1"><a href="https://blog.csdn.net/qq_42937522/article/details/123387368" target="_blank" rel="noreferrer"></a>解决方案 <a class="header-anchor" href="#解决方案" aria-hidden="true">#</a></h2><p>Node.js v8.0 开始，可以使用<code>NODE_OPTIONS</code> 环境变量来全局设置 max_old_space_size 来增加内存限制</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#abb2bf;">export NODE_OPTIONS=--max_old_space_size=4096</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;"></span></span></code></pre><pre class="shiki material-palenight vp-code-light"><code><span class="line"><span style="color:#A6ACCD;">export NODE_OPTIONS=--max_old_space_size=4096</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><strong>increase-memory-limit</strong> 将附加 <code>--max-old-space-size=4096</code> 到文件中的所有 <code>node</code> 调用中<code>node_modules/.bin/*</code>。</p><p>注意：如果在windows系统，可以使用命令：</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#abb2bf;">set NODE_OPTIONS=--max_old_space_size=4096</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;"></span></span></code></pre><pre class="shiki material-palenight vp-code-light"><code><span class="line"><span style="color:#A6ACCD;">set NODE_OPTIONS=--max_old_space_size=4096</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>因为<code>export</code>是linux命令。</p><h2 id="扩展" tabindex="-1"><a href="https://blog.csdn.net/qq_42937522/article/details/123387368" target="_blank" rel="noreferrer"></a>扩展 <a class="header-anchor" href="#扩展" aria-hidden="true">#</a></h2><p>修改原来的github部署脚本：</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#abb2bf;">name: Deploy GitHub Pages</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;"># 触发条件：在 push 到 master 分支后</span></span>
<span class="line"><span style="color:#abb2bf;">on:</span></span>
<span class="line"><span style="color:#abb2bf;">  push:</span></span>
<span class="line"><span style="color:#abb2bf;">    branches:</span></span>
<span class="line"><span style="color:#abb2bf;">      - main</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;"># 任务</span></span>
<span class="line"><span style="color:#abb2bf;">jobs:</span></span>
<span class="line"><span style="color:#abb2bf;">  build-and-deploy:</span></span>
<span class="line"><span style="color:#abb2bf;">    # 服务器环境：最新版 Ubuntu</span></span>
<span class="line"><span style="color:#abb2bf;">    runs-on: ubuntu-latest</span></span>
<span class="line"><span style="color:#abb2bf;">    steps:</span></span>
<span class="line"><span style="color:#abb2bf;">      # 拉取代码</span></span>
<span class="line"><span style="color:#abb2bf;">      - name: Checkout</span></span>
<span class="line"><span style="color:#abb2bf;">        uses: actions/checkout@v2</span></span>
<span class="line"><span style="color:#abb2bf;">        with:</span></span>
<span class="line"><span style="color:#abb2bf;">          persist-credentials: false</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;">      # 生成静态文件</span></span>
<span class="line"><span style="color:#abb2bf;">      - name: Build</span></span>
<span class="line"><span style="color:#abb2bf;">        run: npm install &amp;&amp; export NODE_OPTIONS=--max_old_space_size=4096 &amp;&amp;npm run build</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;">      # 部署到 GitHub Pages</span></span>
<span class="line"><span style="color:#abb2bf;">      - name: Deploy</span></span>
<span class="line"><span style="color:#abb2bf;">        uses: JamesIves/github-pages-deploy-action@releases/v3</span></span>
<span class="line"><span style="color:#abb2bf;">        with:</span></span>
<span class="line"><span style="color:#abb2bf;">          ACCESS_TOKEN: \${{ secrets.ACCESS_TOKEN }}</span></span>
<span class="line"><span style="color:#abb2bf;">          BRANCH: gh-pages</span></span>
<span class="line"><span style="color:#abb2bf;">          FOLDER: docs/.vuepress/dist</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;"></span></span></code></pre><pre class="shiki material-palenight vp-code-light"><code><span class="line"><span style="color:#A6ACCD;">name: Deploy GitHub Pages</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># 触发条件：在 push 到 master 分支后</span></span>
<span class="line"><span style="color:#A6ACCD;">on:</span></span>
<span class="line"><span style="color:#A6ACCD;">  push:</span></span>
<span class="line"><span style="color:#A6ACCD;">    branches:</span></span>
<span class="line"><span style="color:#A6ACCD;">      - main</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># 任务</span></span>
<span class="line"><span style="color:#A6ACCD;">jobs:</span></span>
<span class="line"><span style="color:#A6ACCD;">  build-and-deploy:</span></span>
<span class="line"><span style="color:#A6ACCD;">    # 服务器环境：最新版 Ubuntu</span></span>
<span class="line"><span style="color:#A6ACCD;">    runs-on: ubuntu-latest</span></span>
<span class="line"><span style="color:#A6ACCD;">    steps:</span></span>
<span class="line"><span style="color:#A6ACCD;">      # 拉取代码</span></span>
<span class="line"><span style="color:#A6ACCD;">      - name: Checkout</span></span>
<span class="line"><span style="color:#A6ACCD;">        uses: actions/checkout@v2</span></span>
<span class="line"><span style="color:#A6ACCD;">        with:</span></span>
<span class="line"><span style="color:#A6ACCD;">          persist-credentials: false</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      # 生成静态文件</span></span>
<span class="line"><span style="color:#A6ACCD;">      - name: Build</span></span>
<span class="line"><span style="color:#A6ACCD;">        run: npm install &amp;&amp; export NODE_OPTIONS=--max_old_space_size=4096 &amp;&amp;npm run build</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      # 部署到 GitHub Pages</span></span>
<span class="line"><span style="color:#A6ACCD;">      - name: Deploy</span></span>
<span class="line"><span style="color:#A6ACCD;">        uses: JamesIves/github-pages-deploy-action@releases/v3</span></span>
<span class="line"><span style="color:#A6ACCD;">        with:</span></span>
<span class="line"><span style="color:#A6ACCD;">          ACCESS_TOKEN: \${{ secrets.ACCESS_TOKEN }}</span></span>
<span class="line"><span style="color:#A6ACCD;">          BRANCH: gh-pages</span></span>
<span class="line"><span style="color:#A6ACCD;">          FOLDER: docs/.vuepress/dist</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br></div></div>`,26);function u(y,C,A,h,g,_){const e=n("ArticleMetadata"),p=n("ClientOnly");return o(),c("div",null,[d,s(p,null,{default:r(()=>[s(e)]),_:1}),m])}const v=l(b,[["render",u]]);export{D as __pageData,v as default};
