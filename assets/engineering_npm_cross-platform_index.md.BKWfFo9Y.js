import{_ as p,o as l,c as e,J as s,w as h,m as i,a as r,aa as k,E as a}from"./chunks/framework.DJCjJe2w.js";const q=JSON.parse('{"title":"实现 npm script 跨平台兼容","description":"","frontmatter":{"createTime":"2022/11/04","tag":"工程化,npm"},"headers":[],"relativePath":"engineering/npm/cross-platform/index.md","filePath":"engineering/npm/cross-platform/index.md","lastUpdated":1667558508000}'),o={name:"engineering/npm/cross-platform/index.md"},c=i("h1",{id:"实现-npm-script-跨平台兼容",tabindex:"-1"},[r("实现 npm script 跨平台兼容 "),i("a",{class:"header-anchor",href:"#实现-npm-script-跨平台兼容","aria-label":'Permalink to "实现 npm script 跨平台兼容"'},"​")],-1),d=k(`<p>到目前为止，如果你在 Linux、Mac 平台做开发，所有的 npm script 都会顺利运行，但是 Windows 下面的同学可能就比较痛苦了，因为不是所有的 shell 命令都是跨平台兼容的，甚至各种常见的文件系统操作也是不兼容的。</p><p>可能有部分同学处理过 npm script 跨平台兼容的问题，比如粗暴的为两种平台各写一份 npm script，像下面这样：</p><div class="language-json vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;hello-npm-script&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;scripts&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;bash-script&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;echo Hello $npm_package_name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;win-script&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;echo Hello %npm_package_name%&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>有技术追求的工程师肯定不会满足上面的解决方案，实际上社区中已经有非常多的小工具可以帮我们优雅的实现跨平台的 npm script，下面我们探索下如何实现跨平台的文件系统操作、变量引用、环境变量设置。</p><p>特别说明，windows 环境的同学建议使用 git bash 来运行 npm script，使用 windows 自带的 cmd 可能会遇到比较多的问题</p><h2 id="文件系统操作的跨平台兼容" tabindex="-1">文件系统操作的跨平台兼容 <a class="header-anchor" href="#文件系统操作的跨平台兼容" aria-label="Permalink to &quot;文件系统操作的跨平台兼容&quot;">​</a></h2><p>npm script 中涉及到的文件系统操作包括文件和目录的创建、删除、移动、复制等操作，而社区为这些基本操作也提供了跨平台兼容的包，列举如下：</p><ul><li>rimraf 或 del-cli，用来删除文件和目录，实现类似于 rm -rf 的功能；</li><li>cpr，用于拷贝、复制文件和目录，实现类似于 cp -r 的功能；</li><li>make-dir-cli，用于创建目录，实现类似于 mkdir -p 的功能；</li><li>使用上面这几个小工具改造 npm script 的具体步骤如下：</li></ul><h3 id="第-1-步-添加开发依赖" tabindex="-1">第 1 步，添加开发依赖 <a class="header-anchor" href="#第-1-步-添加开发依赖" aria-label="Permalink to &quot;第 1 步，添加开发依赖&quot;">​</a></h3><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">npm i rimraf cpr make</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">dir</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">cli </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">D</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"># npm install rimraf cpr make</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">dir</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">cli </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">save</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">dev</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"># yarn add rimraf cpr make</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">dir</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">cli </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">D</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="第-2-步-改造涉及文件系统操作的-npm-script" tabindex="-1">第 2 步，改造涉及文件系统操作的 npm script <a class="header-anchor" href="#第-2-步-改造涉及文件系统操作的-npm-script" aria-label="Permalink to &quot;第 2 步，改造涉及文件系统操作的 npm script&quot;">​</a></h3><div class="language-json vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &quot;scripts&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;cover:cleanup&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;rm -rf coverage &amp;&amp; rm -rf .nyc_output&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;cover:archive&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;cross-var </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">mkdir -p coverage_archive/$npm_package_version &amp;&amp; cp -r coverage/* coverage_archive/$npm_package_version</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">+</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;cover:cleanup&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;rimraf coverage &amp;&amp; rimraf .nyc_output&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">+</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;cover:archive&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;cross-var </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">make-dir coverage_archive/$npm_package_version &amp;&amp; cpr coverage/* coverage_archive/$npm_package_version -o</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">     &quot;cover:serve&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;cross-var http-server coverage_archive/$npm_package_version -p $npm_package_config_port&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">     &quot;cover:open&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;cross-var opn http://localhost:$npm_package_config_port&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;postcover&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;npm-run-all cover:archive cover:cleanup --parallel cover:serve cover:open&quot;</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">+</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;precover&quot;</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;npm run cover:cleanup&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">+</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;postcover&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;npm-run-all cover:archive --parallel cover:serve cover:open&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>对改动的几点说明：</p><ul><li>rm -rf 直接替换成 rimraf；</li><li>mkdir -p 直接替换成 make-dir；</li><li>cp -r 的替换需特别说明下，cpr 默认是不覆盖的，需要显示传入 -o 配置项，并且参数必须严格是 cpr source destination [options] 的格式，即配置项放在最后面；</li><li>把 cover:cleanup 从 postcover 挪到 precover 里面去执行，规避 cpr 没归档完毕覆盖率报告就被清空的问题；</li></ul><h2 id="用-cross-var-引用变量" tabindex="-1">用 cross-var 引用变量 <a class="header-anchor" href="#用-cross-var-引用变量" aria-label="Permalink to &quot;用 cross-var 引用变量&quot;">​</a></h2><h3 id="第-1-步-安装-cross-var-为开发依赖" tabindex="-1">第 1 步，安装 cross-var 为开发依赖 <a class="header-anchor" href="#第-1-步-安装-cross-var-为开发依赖" aria-label="Permalink to &quot;第 1 步，安装 cross-var 为开发依赖&quot;">​</a></h3><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">npm i cross</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> -</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">D</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"># npm install cross</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> --save-dev</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"># yarn add cross</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> -</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">D</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="第-2-步-改写引用变量-npm-script-具体-diff-如下" tabindex="-1">第 2 步，改写引用变量 npm script，具体 diff 如下 <a class="header-anchor" href="#第-2-步-改写引用变量-npm-script-具体-diff-如下" aria-label="Permalink to &quot;第 2 步，改写引用变量 npm script，具体 diff 如下&quot;">​</a></h3><div class="language-json vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;scripts&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">     &quot;cover:cleanup&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;rm -rf coverage &amp;&amp; rm -rf .nyc_output&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;cover:archive&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;mkdir -p coverage_archive/$npm_package_version &amp;&amp; cp -r coverage/* coverage_archive/$npm_package_version&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;cover:serve&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;http-server coverage_archive/$npm_package_version -p $npm_package_config_port&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;cover:open&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;opn http://localhost:$npm_package_config_port&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">+</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;cover:archive&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;cross-var </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">mkdir -p coverage_archive/$npm_package_version &amp;&amp; cp -r coverage/* coverage_archive/$npm_package_version</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">+</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;cover:serve&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;cross-var http-server coverage_archive/$npm_package_version -p $npm_package_config_port&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">+</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;cover:open&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;cross-var opn http://localhost:$npm_package_config_port&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">     &quot;postcover&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;npm-run-all cover:archive cover:cleanup --parallel cover:serve cover:open&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   },</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h2 id="用-cross-env-设置环境变量" tabindex="-1">用 cross-env 设置环境变量 <a class="header-anchor" href="#用-cross-env-设置环境变量" aria-label="Permalink to &quot;用 cross-env 设置环境变量&quot;">​</a></h2><p>在 node.js 脚本和 npm script 使用环境变量也是比较常见的，比如我们在运行测试时，需要加上 NODE_ENV=test，或者在启动静态资源服务器时自定义端口号。因为不同平台的环境变量语法不同，我们可以使用 cross-env 来实现 npm script 的跨平台兼容，具体步骤如下：</p><h3 id="第-1-步-添加-cross-env-到开发依赖" tabindex="-1">第 1 步，添加 cross-env 到开发依赖 <a class="header-anchor" href="#第-1-步-添加-cross-env-到开发依赖" aria-label="Permalink to &quot;第 1 步，添加 cross-env 到开发依赖&quot;">​</a></h3><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">npm i cross</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">env </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">D</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"># npm install cross</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">env </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">save</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">dev</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"># yarn add cross</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">env </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">D</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="第-2-步-改写使用了环境变量的-npm-script" tabindex="-1">第 2 步，改写使用了环境变量的 npm script <a class="header-anchor" href="#第-2-步-改写使用了环境变量的-npm-script" aria-label="Permalink to &quot;第 2 步，改写使用了环境变量的 npm script&quot;">​</a></h3><div class="language-json vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &quot;scripts&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;test&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;NODE_ENV=test mocha tests/&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">+</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;test&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;cross-env NODE_ENV=test mocha tests/&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="关于-npm-script-的跨平台兼容-还有几点需要大家注意" tabindex="-1">关于 npm script 的跨平台兼容，还有几点需要大家注意 <a class="header-anchor" href="#关于-npm-script-的跨平台兼容-还有几点需要大家注意" aria-label="Permalink to &quot;关于 npm script 的跨平台兼容，还有几点需要大家注意&quot;">​</a></h2><ul><li>所有使用引号的地方，建议使用双引号，并且加上转义；</li><li>没做特殊处理的命令比如 eslint、stylelint、mocha、opn 等工具本身都是跨平台兼容的；</li><li>还是强烈建议有能力的同学能使用 Linux 做开发，只要你入门并且熟练了，效率提升会惊人；</li><li>短时间内继续拥抱 Windows 的同学，可以考虑看看 Windows 10 里面引入的 Subsystem，让你不用虚拟机即可在 Windows 下使用大多数 Linux 命令。</li></ul>`,27);function E(g,u,y,m,F,v){const n=a("ArticleMetadata"),t=a("ClientOnly");return l(),e("div",null,[c,s(t,null,{default:h(()=>[s(n)]),_:1}),d])}const C=p(o,[["render",E]]);export{q as __pageData,C as default};
