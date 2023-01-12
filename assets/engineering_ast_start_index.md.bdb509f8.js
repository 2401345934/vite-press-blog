import{_ as e,o,c as t,b as s,w as c,d as n,e as r,a as i,r as a}from"./app.1fbcae6f.js";const v=JSON.parse('{"title":"AST（抽象语法树） 到底是什么？","description":"","frontmatter":{"createTime":"2022/11/12","tag":"工程化,AST"},"headers":[],"relativePath":"engineering/ast/start/index.md","lastUpdated":1668240726000}'),b={name:"engineering/ast/start/index.md"},u=n("h1",{id:"ast-抽象语法树-到底是什么",tabindex:"-1"},[r("AST（抽象语法树） 到底是什么？ "),n("a",{class:"header-anchor",href:"#ast-抽象语法树-到底是什么","aria-hidden":"true"},"#")],-1),y=i(`<p>抽象语法树（Abstract Syntax Tree，AST）是源代码语法结构的一种抽象表示，它以树状的形式表现编程语言的语法结构，树上的每个节点都表示源代码中的一种结构。在代码语法的检查、代码风格的检查、代码的格式化、代码的高亮、代码错误提示、代码自动补全等等场景均有广泛的应用。</p><p>以前我们在做小学语文题时，经常会做到的一种题型就是在一句话中找出不恰当的部分，比如：&quot;你是猪，&quot;</p><p>解题方法通常是：</p><ul><li>第一步：找出语句中的主语、谓语、宾语</li><li>第二步：找出语句中的形容词、动词、标点符号等进行分析</li></ul><p>如果将其程序化，我们按照上面的方法可以先将其进行拆分成这样：</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#abb2bf;">[</span></span>
<span class="line"><span style="color:#abb2bf;">  { type: &quot;主语&quot;, value: &quot;你&quot; },</span></span>
<span class="line"><span style="color:#abb2bf;">  { type: &quot;谓语&quot;, value: &quot;是&quot; },</span></span>
<span class="line"><span style="color:#abb2bf;">  { type: &quot;宾语&quot;, value: &quot;猪&quot; },</span></span>
<span class="line"><span style="color:#abb2bf;">  { type: &quot;标点符号&quot;, value: &quot;，&quot; },</span></span>
<span class="line"><span style="color:#abb2bf;">]</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;"></span></span></code></pre><pre class="shiki material-palenight vp-code-light"><code><span class="line"><span style="color:#A6ACCD;">[</span></span>
<span class="line"><span style="color:#A6ACCD;">  { type: &quot;主语&quot;, value: &quot;你&quot; },</span></span>
<span class="line"><span style="color:#A6ACCD;">  { type: &quot;谓语&quot;, value: &quot;是&quot; },</span></span>
<span class="line"><span style="color:#A6ACCD;">  { type: &quot;宾语&quot;, value: &quot;猪&quot; },</span></span>
<span class="line"><span style="color:#A6ACCD;">  { type: &quot;标点符号&quot;, value: &quot;，&quot; },</span></span>
<span class="line"><span style="color:#A6ACCD;">]</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>在这一步骤中可以很快的发现第一个错误：在句末使用的是一个逗号❌，实际应该使用句号。</p><p>接着再对主语、谓语、宾语中的词语进行依次分析，将数据结构整理成这样：</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#abb2bf;"> {</span></span>
<span class="line"><span style="color:#abb2bf;">  type: &quot;语句&quot;,</span></span>
<span class="line"><span style="color:#abb2bf;">  body: {</span></span>
<span class="line"><span style="color:#abb2bf;">    type: &quot;肯定陈述句&quot;,</span></span>
<span class="line"><span style="color:#abb2bf;">    declarations: [</span></span>
<span class="line"><span style="color:#abb2bf;">      {</span></span>
<span class="line"><span style="color:#abb2bf;">        type: &quot;声明&quot;,</span></span>
<span class="line"><span style="color:#abb2bf;">        person: {</span></span>
<span class="line"><span style="color:#abb2bf;">          type: &quot;Identifier&quot;,</span></span>
<span class="line"><span style="color:#abb2bf;">          name: &quot;你&quot;,</span></span>
<span class="line"><span style="color:#abb2bf;">        },</span></span>
<span class="line"><span style="color:#abb2bf;">        name: {</span></span>
<span class="line"><span style="color:#abb2bf;">          type: &quot;animal&quot;,</span></span>
<span class="line"><span style="color:#abb2bf;">          value: &quot;猪&quot;,</span></span>
<span class="line"><span style="color:#abb2bf;">        },</span></span>
<span class="line"><span style="color:#abb2bf;">      },</span></span>
<span class="line"><span style="color:#abb2bf;">    ],</span></span>
<span class="line"><span style="color:#abb2bf;">  },</span></span>
<span class="line"><span style="color:#abb2bf;">};</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;"></span></span></code></pre><pre class="shiki material-palenight vp-code-light"><code><span class="line"><span style="color:#A6ACCD;"> {</span></span>
<span class="line"><span style="color:#A6ACCD;">  type: &quot;语句&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  body: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    type: &quot;肯定陈述句&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    declarations: [</span></span>
<span class="line"><span style="color:#A6ACCD;">      {</span></span>
<span class="line"><span style="color:#A6ACCD;">        type: &quot;声明&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">        person: {</span></span>
<span class="line"><span style="color:#A6ACCD;">          type: &quot;Identifier&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">          name: &quot;你&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">        },</span></span>
<span class="line"><span style="color:#A6ACCD;">        name: {</span></span>
<span class="line"><span style="color:#A6ACCD;">          type: &quot;animal&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">          value: &quot;猪&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">        },</span></span>
<span class="line"><span style="color:#A6ACCD;">      },</span></span>
<span class="line"><span style="color:#A6ACCD;">    ],</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>在这个结构中我们发现：在一个肯定陈述句中，将一个人比作一个猪🐷，显然不合适...❌，因此找出第二个错误。</p><hr><p>在上面这个简单的例子中，其实和AST的生成和应用就颇为相似，<code>AST是源代码的抽象语法结构的树状表现形式，简单点就是一个深度嵌套对象，这个对象能够描述我们书写代码的所有信息</code>。</p>`,12);function A(d,C,q,m,f,_){const p=a("ArticleMetadata"),l=a("ClientOnly");return o(),t("div",null,[u,s(l,null,{default:c(()=>[s(p)]),_:1}),y])}const h=e(b,[["render",A]]);export{v as __pageData,h as default};
