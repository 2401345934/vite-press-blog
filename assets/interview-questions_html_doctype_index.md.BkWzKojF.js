import{_ as n,o as l,c as p,J as a,w as r,m as e,a as o,aa as d,E as s}from"./chunks/framework.DJCjJe2w.js";const D=JSON.parse('{"title":"DOCTYPE","description":"","frontmatter":{"createTime":"2022/12/23","tag":"html,面试题"},"headers":[],"relativePath":"interview-questions/html/doctype/index.md","filePath":"interview-questions/html/doctype/index.md","lastUpdated":1671757873000}'),c={name:"interview-questions/html/doctype/index.md"},h=e("h1",{id:"doctype",tabindex:"-1"},[o("DOCTYPE "),e("a",{class:"header-anchor",href:"#doctype","aria-label":'Permalink to "DOCTYPE"'},"​")],-1),u=d('<h2 id="_1-doctype-是什么" tabindex="-1">1.DOCTYPE 是什么 <a class="header-anchor" href="#_1-doctype-是什么" aria-label="Permalink to &quot;1.DOCTYPE 是什么&quot;">​</a></h2><p>DOCTYPE 是一种通用标记语言的文档声明类型，它主要作用是告诉浏览器的解析器，应该以什么样的<strong>文档类型定义</strong>来解析文档，不同的<strong>渲染模式</strong>会影响浏览器对 CSS 代码甚至 JavaScript 脚本的解析。它必须声明在文档的第一行。</p><h2 id="_2-文档类型定义" tabindex="-1">2.文档类型定义 <a class="header-anchor" href="#_2-文档类型定义" aria-label="Permalink to &quot;2.文档类型定义&quot;">​</a></h2><p>Document Type Definition，缩写 DTD。 定义了 XML 或 HTML 的特定版本中允许有什么，不允许有什么，在渲染解析页面的时候，浏览器会根据这些规则检查页面的有效性并采取相应的措施。</p><h2 id="_3-常见的-doctype-声明" tabindex="-1">3.常见的 DOCTYPE 声明 <a class="header-anchor" href="#_3-常见的-doctype-声明" aria-label="Permalink to &quot;3.常见的 DOCTYPE 声明&quot;">​</a></h2><h3 id="html-5" tabindex="-1">HTML 5 <a class="header-anchor" href="#html-5" aria-label="Permalink to &quot;HTML 5&quot;">​</a></h3><p>因为 HTML 5 不基于 SGML，所以不需要引用DTD，但是需要DOCTYPE来规范浏览器的行为，让浏览器按照 W3C 的标准解析渲染页面。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;!DOCTYPE html&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="html-4-01" tabindex="-1">HTML 4.01 <a class="header-anchor" href="#html-4-01" aria-label="Permalink to &quot;HTML 4.01&quot;">​</a></h3><ul><li><p>Strict 严格```</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></li><li><p>Transitional 过渡```</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></li><li><p>Frameset 框架```</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></li></ul><h3 id="xml-1-0" tabindex="-1">XML 1.0 <a class="header-anchor" href="#xml-1-0" aria-label="Permalink to &quot;XML 1.0&quot;">​</a></h3><ul><li><p>Strict 严格```</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></li><li><p>Transitional 过渡```</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></li><li><p>Framset 框架```</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></li></ul><h2 id="_4-标准模式与怪异模式" tabindex="-1">4.标准模式与怪异模式 <a class="header-anchor" href="#_4-标准模式与怪异模式" aria-label="Permalink to &quot;4.标准模式与怪异模式&quot;">​</a></h2><p>浏览器渲染页面的两种模式：标准模式和怪异模式。可用<code>document.compatMode</code>来获取。</p><ul><li>CSS1Compat：标准模式（严格模式）（Strict mode），是默认模式，浏览器按照 W3C 标准解析渲染页面。在标准模式中，浏览器以其支持的最高标准呈现页面。</li><li>BackCompat：怪异模式（混杂模式）（Quick mode），浏览器使用自己的方式解析渲染页面。在怪异模式中，页面以一种比较宽松的向后兼容的方式显示。</li></ul><h3 id="如何区分" tabindex="-1">如何区分 <a class="header-anchor" href="#如何区分" aria-label="Permalink to &quot;如何区分&quot;">​</a></h3><p>浏览器解析时到底使用严格模式还是混杂模式，与网页中的 DTD 直接相关。</p><p><strong>严格 DTD ——严格模式</strong> 。如果文档包含严格的 DOCTYPE ，那么它一般以严格模式呈现。</p><p><strong>有 URI 的过渡 DTD ——严格模式；没有 URI 的过渡 DTD ——混杂模式</strong>。含过渡 DTD 和 URI 的 DOCTYPE ，也以严格模式呈现，但有过渡 DTD 而没有 URI （统一资源标识符，就是声明最后的地址）会导致页面以混杂模式呈现。</p><p><strong>DTD不存在或者格式不正确——混杂模式</strong>。不存在或形式不正确会导致文档以混杂模式呈现。</p><p><strong>HTML5 没有严格和混杂之分</strong>。HTML5 没有 DTD ，因此也就没有严格模式与混杂模式的区别，HTML5 有相对宽松的语法，实现时，已经尽可能大的实现了向后兼容。</p><h3 id="意义" tabindex="-1">意义 <a class="header-anchor" href="#意义" aria-label="Permalink to &quot;意义&quot;">​</a></h3><p>严格模式与混杂模式存在的意义与其来源密切相关，如果说只存在严格模式，那么许多旧网站必然受到影响，如果只存在混杂模式，那么会回到当时浏览器大战时的混乱，每个浏览器都有自己的解析模式。</p><h3 id="常见区别" tabindex="-1">常见区别 <a class="header-anchor" href="#常见区别" aria-label="Permalink to &quot;常见区别&quot;">​</a></h3><p>严格模式下 —— W3C 标准的盒模型 怪异模式下 —— IE 盒模型</p>',25);function m(b,g,v,T,_,C){const t=s("ArticleMetadata"),i=s("ClientOnly");return l(),p("div",null,[h,a(i,null,{default:r(()=>[a(t)]),_:1}),u])}const P=n(c,[["render",m]]);export{D as __pageData,P as default};
