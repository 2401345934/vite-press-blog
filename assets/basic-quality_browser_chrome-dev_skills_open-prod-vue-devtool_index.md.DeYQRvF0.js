import{_ as l,o as p,c as t,J as s,w as h,m as i,a as k,aa as r,E as a}from"./chunks/framework.DJCjJe2w.js";const v=JSON.parse('{"title":"将下方代码粘贴到 浏览器控制台中 运行即可","description":"","frontmatter":{"createTime":"2022/10/25","tag":"chrome"},"headers":[],"relativePath":"basic-quality/browser/chrome-dev/skills/open-prod-vue-devtool/index.md","filePath":"basic-quality/browser/chrome-dev/skills/open-prod-vue-devtool/index.md","lastUpdated":1667281923000}'),E={name:"basic-quality/browser/chrome-dev/skills/open-prod-vue-devtool/index.md"},d=i("h1",{id:"将下方代码粘贴到-浏览器控制台中-运行即可",tabindex:"-1"},[k("将下方代码粘贴到 浏览器控制台中 运行即可 "),i("a",{class:"header-anchor",href:"#将下方代码粘贴到-浏览器控制台中-运行即可","aria-label":'Permalink to "将下方代码粘贴到 浏览器控制台中 运行即可"'},"​")],-1),o=r(`<div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Vue, walker, node;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">walker </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> document.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">createTreeWalker</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(document.body,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">while</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ((node </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> walker.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">nextNode</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">())) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (node.__vue__) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Vue </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> node.__vue__.$options._base;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Vue.config.devtools) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      Vue.config.devtools </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        window.__VUE_DEVTOOLS_GLOBAL_HOOK__.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">emit</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;init&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, Vue);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;==&gt; vue devtools now is enabled&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    break</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div>`,1);function c(g,_,y,u,b,m){const n=a("ArticleMetadata"),e=a("ClientOnly");return p(),t("div",null,[d,s(e,null,{default:h(()=>[s(n)]),_:1}),o])}const A=l(E,[["render",c]]);export{v as __pageData,A as default};
