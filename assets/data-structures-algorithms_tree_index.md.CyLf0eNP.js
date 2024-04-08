import{_ as l,o as t,c as p,J as s,w as h,m as a,a as k,aa as r,E as i}from"./chunks/framework.DJCjJe2w.js";const A=JSON.parse('{"title":"树","description":"","frontmatter":{"createTime":"2022/10/26","tag":"算法"},"headers":[],"relativePath":"data-structures-algorithms/tree/index.md","filePath":"data-structures-algorithms/tree/index.md","lastUpdated":1667281923000}'),d={name:"data-structures-algorithms/tree/index.md"},c=a("h1",{id:"树",tabindex:"-1"},[k("树 "),a("a",{class:"header-anchor",href:"#树","aria-label":'Permalink to "树"'},"​")],-1),E=r(`<h2 id="广度优先遍历" tabindex="-1">广度优先遍历 <a class="header-anchor" href="#广度优先遍历" aria-label="Permalink to &quot;广度优先遍历&quot;">​</a></h2><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// ● 先访问离根节点最近的节点, 如果有兄弟节点就会先遍历兄弟节点，再去遍历自己的子节点</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// ● 口诀</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//   ○ 新建一个队列 并把根节点入队</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//   ○ 把队头出队并访问</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//   ○ 把队头的children挨个入队</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//   ○ 重复第二 、三步 直到队列为空</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 广度优先遍历</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> bfs</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">tree</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> q</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [tree]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  while</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (q.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">length</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> n</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> q.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">shift</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(n.val)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    n.children.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">forEach</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">c</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> q.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">push</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(c))</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div>`,2);function g(o,y,b,m,u,F){const n=i("ArticleMetadata"),e=i("ClientOnly");return t(),p("div",null,[c,s(e,null,{default:h(()=>[s(n)]),_:1}),E])}const D=l(d,[["render",g]]);export{A as __pageData,D as default};
