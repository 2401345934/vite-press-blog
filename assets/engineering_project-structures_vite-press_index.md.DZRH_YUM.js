import{_ as t,o as p,c as r,J as a,w as l,m as s,a as o,aa as c,E as e}from"./chunks/framework.DJCjJe2w.js";const x=JSON.parse('{"title":"vite-press 搭建个人博客","description":"","frontmatter":{"createTime":"2022/11/21","tag":"工程化,项目搭建,Vue,Vite"},"headers":[],"relativePath":"engineering/project-structures/vite-press/index.md","filePath":"engineering/project-structures/vite-press/index.md","lastUpdated":1669040152000}'),d={name:"engineering/project-structures/vite-press/index.md"},h=s("h1",{id:"vite-press-搭建个人博客",tabindex:"-1"},[o("vite-press 搭建个人博客 "),s("a",{class:"header-anchor",href:"#vite-press-搭建个人博客","aria-label":'Permalink to "vite-press 搭建个人博客"'},"​")],-1),u=c(`<p>现在几乎每个人都会有自己的博客 那么我们今天也来尝试一下</p><h2 id="vitepress-官网" tabindex="-1">vitepress 官网 <a class="header-anchor" href="#vitepress-官网" aria-label="Permalink to &quot;vitepress 官网&quot;">​</a></h2><p><a href="https://vitepress.vuejs.org/" target="_blank" rel="noreferrer">https://vitepress.vuejs.org/</a></p><h2 id="创建我们自己的个人博客" tabindex="-1">创建我们自己的个人博客 <a class="header-anchor" href="#创建我们自己的个人博客" aria-label="Permalink to &quot;创建我们自己的个人博客&quot;">​</a></h2><h3 id="创建项目" tabindex="-1">创建项目 <a class="header-anchor" href="#创建项目" aria-label="Permalink to &quot;创建项目&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>mkdir blog &amp;&amp; cd blog &amp;&amp; npm init -y</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>这样我们就创建了一个blog 文件</p><h3 id="初始化-git" tabindex="-1">初始化 git <a class="header-anchor" href="#初始化-git" aria-label="Permalink to &quot;初始化 git&quot;">​</a></h3><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">git init</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="下载依赖" tabindex="-1">下载依赖 <a class="header-anchor" href="#下载依赖" aria-label="Permalink to &quot;下载依赖&quot;">​</a></h3><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">yarn add </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">dev vitepress vue</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="修改-package-json" tabindex="-1">修改 package.json <a class="header-anchor" href="#修改-package-json" aria-label="Permalink to &quot;修改 package.json&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>{</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>  &quot;scripts&quot;: {</span></span>
<span class="line"><span>    &quot;docs:dev&quot;: &quot;vitepress dev docs&quot;,</span></span>
<span class="line"><span>    &quot;docs:build&quot;: &quot;vitepress build docs&quot;,</span></span>
<span class="line"><span>    &quot;docs:serve&quot;: &quot;vitepress serve docs&quot;</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="就可以直接启动项目了" tabindex="-1">就可以直接启动项目了 <a class="header-anchor" href="#就可以直接启动项目了" aria-label="Permalink to &quot;就可以直接启动项目了&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>yarn docs:dev</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="添加我们的第一个页面" tabindex="-1">添加我们的第一个页面 <a class="header-anchor" href="#添加我们的第一个页面" aria-label="Permalink to &quot;添加我们的第一个页面&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>.</span></span>
<span class="line"><span>├─ docs</span></span>
<span class="line"><span>│  ├─ getting-started.md</span></span>
<span class="line"><span>│  └─ index.md</span></span>
<span class="line"><span>└─ package.json</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>后续就是添加我们自己喜欢保存的内容了</p><h2 id="推荐一个博客模版" tabindex="-1">推荐一个博客模版 <a class="header-anchor" href="#推荐一个博客模版" aria-label="Permalink to &quot;推荐一个博客模版&quot;">​</a></h2><p><a href="https://github.com/2401345934/vitepress-template" target="_blank" rel="noreferrer">https://github.com/2401345934/vitepress-template</a></p><h2 id="推荐一个自己的博客" tabindex="-1">推荐一个自己的博客 <a class="header-anchor" href="#推荐一个自己的博客" aria-label="Permalink to &quot;推荐一个自己的博客&quot;">​</a></h2><p><a href="https://2401345934.github.io/vite-press-blog/" target="_blank" rel="noreferrer">https://2401345934.github.io/vite-press-blog/</a></p><p>感兴趣的小伙伴可以直接 fork 然后修改成为自己的博客</p><p>附上源码： <a href="https://github.com/2401345934/vite-press-blog" target="_blank" rel="noreferrer">https://github.com/2401345934/vite-press-blog</a></p>`,24);function b(m,g,v,k,_,q){const n=e("ArticleMetadata"),i=e("ClientOnly");return p(),r("div",null,[h,a(i,null,{default:l(()=>[a(n)]),_:1}),u])}const y=t(d,[["render",b]]);export{x as __pageData,y as default};
