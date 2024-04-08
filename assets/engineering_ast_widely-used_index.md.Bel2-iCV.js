import{_ as l,o as i,c as r,J as s,w as c,m as n,a as b,aa as t,E as a}from"./chunks/framework.DJCjJe2w.js";const w=JSON.parse('{"title":"AST 广泛应用 & 手写编译器","description":"","frontmatter":{"createTime":"2022/11/12","tag":"工程化,AST"},"headers":[],"relativePath":"engineering/ast/widely-used/index.md","filePath":"engineering/ast/widely-used/index.md","lastUpdated":1668240726000}'),o={name:"engineering/ast/widely-used/index.md"},u=n("h1",{id:"ast-广泛应用-手写编译器",tabindex:"-1"},[b("AST 广泛应用 & 手写编译器 "),n("a",{class:"header-anchor",href:"#ast-广泛应用-手写编译器","aria-label":'Permalink to "AST 广泛应用 & 手写编译器"'},"​")],-1),m=t(`<h2 id="手写编译器" tabindex="-1">手写编译器 <a class="header-anchor" href="#手写编译器" aria-label="Permalink to &quot;手写编译器&quot;">​</a></h2><p>该小节分为两个部分：设计篇和原理篇。</p><p>设计篇侧重整体设计，原理篇则是手撕代码，侧重编码实现，在阅读过程中建议将重心放在设计篇，学习思想最重要。</p><h3 id="设计篇" tabindex="-1">设计篇 <a class="header-anchor" href="#设计篇" aria-label="Permalink to &quot;设计篇&quot;">​</a></h3><h4 id="整体流程" tabindex="-1">整体流程 <a class="header-anchor" href="#整体流程" aria-label="Permalink to &quot;整体流程&quot;">​</a></h4><p>一个完整的编译器整体执行过程可以分为三个步骤：</p><ol><li><strong>Parsing(解析过程)</strong>：这个过程要经<code>词法分析</code>、<code>语法分析</code>、<code>构建AST（抽象语法树）</code>一系列操作；</li><li><strong>Transformation（转化过程</strong>）：这个过程就是将上一步解析后的内容，按照编译器指定的规则进行处理，<code>形成一个新的表现形式</code>；</li><li><strong>Code Generation（代码生成</strong>）：将上一步处理好的内容<code>转化为新的代码</code>；</li></ol><p>如图所示，不喜欢看字的就看图：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2f90236f5c914a069bd51611b75160a7~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="image.png"></p><p>接下来，我们先看一个小Demo，将 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FLisp_(programming_language)" title="https://en.wikipedia.org/wiki/Lisp_(programming_language)" target="_blank" rel="noreferrer">lisp</a> 的函数调用编译成类似 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fzh.wikipedia.org%2Fwiki%2FC%25E8%25AF%25AD%25E8%25A8%2580" title="https://zh.wikipedia.org/wiki/C%E8%AF%AD%E8%A8%80" target="_blank" rel="noreferrer">C</a> 的函数，如果你不熟悉也没关系，看完下面的代码相信大家能够快速的理解：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>    LISP 代码： (add 2 (subtract 4 2))</span></span>
<span class="line"><span>    C    代码  add(2, subtract(4, 2))</span></span>
<span class="line"><span>    释义： 2 + （ 4 - 2 ）</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h4 id="parsing-解析" tabindex="-1">Parsing(解析) <a class="header-anchor" href="#parsing-解析" aria-label="Permalink to &quot;Parsing(解析)&quot;">​</a></h4><p>解析过程分为2个步骤：<code>词法分析</code>、<code>语法分析</code>。</p><p><strong>词法分析</strong>是使用<code>tokenizer(分词器)</code>或者<code>lexer(词法分析器)</code>，将源码拆分成<code>tokens</code>，tokens是一个放置对象的数组，其中的每一个对象都可以看做是一个单元（数字，标签，标点，操作符...）的描述信息。</p><p>结合最开始做的语文题目（<em><strong>&quot;你是猪，&quot;</strong></em>），我们照葫芦画瓢，对<code>(add 2 (subtract 4 2))</code> 进行词法分析后得到：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>[</span></span>
<span class="line"><span>  { type: &quot;paren&quot;, value: &quot;(&quot; },</span></span>
<span class="line"><span>  { type: &quot;name&quot;, value: &quot;add&quot; },</span></span>
<span class="line"><span>  { type: &quot;number&quot;, value: &quot;2&quot; },</span></span>
<span class="line"><span>  { type: &quot;paren&quot;, value: &quot;(&quot; },</span></span>
<span class="line"><span>  { type: &quot;name&quot;, value: &quot;subtract&quot; },</span></span>
<span class="line"><span>  { type: &quot;number&quot;, value: &quot;4&quot; },</span></span>
<span class="line"><span>  { type: &quot;number&quot;, value: &quot;2&quot; },</span></span>
<span class="line"><span>  { type: &quot;paren&quot;, value: &quot;)&quot; },</span></span>
<span class="line"><span>  { type: &quot;paren&quot;, value: &quot;)&quot; },</span></span>
<span class="line"><span>];</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>像这样对中文语句进行了主谓宾的拆解得到了<code>tokens</code>，但这并不能帮助我们判断该条语句是否合法，还需要进行<strong>语法解析</strong>。</p><p><strong>语法解析</strong><code>则是将tokens重新整理成语法相互关联的表达形式</code> ，这种表达形式一般被称为<code>中间层或者AST（抽象语法树）</code>。</p><p>还是拿语文题目（<em><strong>&quot;你是猪，&quot;</strong></em>）来照葫芦画瓢，<code>(add 2 (subtract 4 2))</code> 进行语法解析后得到的AST：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>{</span></span>
<span class="line"><span>  type: &#39;Program&#39;,</span></span>
<span class="line"><span>  body: [{</span></span>
<span class="line"><span>    type: &#39;CallExpression&#39;,</span></span>
<span class="line"><span>    name: &#39;add&#39;,</span></span>
<span class="line"><span>    params:</span></span>
<span class="line"><span>      [{</span></span>
<span class="line"><span>        type: &#39;NumberLiteral&#39;,</span></span>
<span class="line"><span>        value: &#39;2&#39;,</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        type: &#39;CallExpression&#39;,</span></span>
<span class="line"><span>        name: &#39;subtract&#39;,</span></span>
<span class="line"><span>        params: [{</span></span>
<span class="line"><span>          type: &#39;NumberLiteral&#39;,</span></span>
<span class="line"><span>          value: &#39;4&#39;,</span></span>
<span class="line"><span>        }, {</span></span>
<span class="line"><span>          type: &#39;NumberLiteral&#39;,</span></span>
<span class="line"><span>          value: &#39;2&#39;,</span></span>
<span class="line"><span>        }]</span></span>
<span class="line"><span>      }]</span></span>
<span class="line"><span>  }]</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h4 id="transformation-转化" tabindex="-1">Transformation(转化) <a class="header-anchor" href="#transformation-转化" aria-label="Permalink to &quot;Transformation(转化)&quot;">​</a></h4><p>这个过程主要是<code>改写AST（抽象语法树）</code>，<code>或者根据当前AST（抽象语法树）生成一个新的AST（抽象语法树）</code>，这个过程可以是相同语言，或者可以直接将AST（抽象语法树）翻译为其他语言。</p><p>注意看上述生成的AST（抽象语法树），有一些特殊的对象，都具有自己的类型描述，他们就是这个“树”上的节点，如下所示</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 数字片段节点</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   type: &#39;NumberLiteral&#39;,</span></span>
<span class="line"><span>   value: &#39;2&#39;,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 调用语句节点</span></span>
<span class="line"><span> {</span></span>
<span class="line"><span>   type: &#39;CallExpression&#39;,</span></span>
<span class="line"><span>   name: &#39;subtract&#39;,</span></span>
<span class="line"><span>   params: [{</span></span>
<span class="line"><span>     type: &#39;NumberLiteral&#39;, // 数字片段节点</span></span>
<span class="line"><span>     value: &#39;4&#39;,</span></span>
<span class="line"><span>   }, {</span></span>
<span class="line"><span>     type: &#39;NumberLiteral&#39;, // 数字片段节点</span></span>
<span class="line"><span>     value: &#39;2&#39;,</span></span>
<span class="line"><span>   }]</span></span>
<span class="line"><span> }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>在案例中我们是想将 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FLisp_(programming_language)" title="https://en.wikipedia.org/wiki/Lisp_(programming_language)" target="_blank" rel="noreferrer">lisp</a> 语言转化为 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fzh.wikipedia.org%2Fwiki%2FC%25E8%25AF%25AD%25E8%25A8%2580" title="https://zh.wikipedia.org/wiki/C%E8%AF%AD%E8%A8%80" target="_blank" rel="noreferrer">C</a> 语言，因此需要构建一个新的AST（抽象语法树），这个创建的过程就<code>需要遍历这个“树”的节点</code>并读取其内容，由此引出 <strong>Traversal(遍历)</strong> 和 <strong>Visitors (访问器)</strong>。</p><p><strong>Traversal(遍历)</strong>：顾名思义这个过程就是，遍历这个AST（抽象语法树）的所有节点，这个过程使用 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F33340701" title="https://zhuanlan.zhihu.com/p/33340701" target="_blank" rel="noreferrer">深度优先原则</a>，大概执行顺序如下：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/825779625fa34efd90a6c115be7919af~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="image.png"></p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>进入Program - 最顶层开始</span></span>
<span class="line"><span>   进入CallExpression (add)</span></span>
<span class="line"><span>      进入NumberLiteral (2)</span></span>
<span class="line"><span>      离开NumberLiteral (2)</span></span>
<span class="line"><span>      进入CallExpression (subtract)</span></span>
<span class="line"><span>         进入NumberLiteral (4)</span></span>
<span class="line"><span>         离开NumberLiteral (4)</span></span>
<span class="line"><span>         进入NumberLiteral (2)</span></span>
<span class="line"><span>         离开NumberLiteral (2)</span></span>
<span class="line"><span>      离开CallExpression (subtract)</span></span>
<span class="line"><span>   离开CallExpression (add)</span></span>
<span class="line"><span>离开Program</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p><strong>Visitors (访问器)</strong>：<code>访问器最基本的思想是创建一个“访问器”对象，这个对象可以处理不同类型的节点函数</code>,如下所示</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>    const visitor = {</span></span>
<span class="line"><span>        NumberLiteral(node,parent){}, // 处理数字类型节点</span></span>
<span class="line"><span>        CallExpression(node,parent){} // 处理调用语句类型节点</span></span>
<span class="line"><span>    }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>在遍历节点的时候，<strong>当 enter (进入)到该节点，我们会调用访问器，然后会调用针对于这个节点的相关函数</strong>，同时这个节点和其父节点作为参数传入。</p><p>同时<strong>在exit（离开）的时候我们也希望能够调用访问器</strong>，当 enter 一个节点的时候，最外层节点就相当于一个分支，他是一个节点，这个分支的内部依然存在若干节点，就像上边遍历的那样。</p><p>我们会按照<code>深度优先的原则</code>，依次遍历到这个分支的最内层，当达到最内层的时候，针对当前分支的访问就完成了，接着会依次exit（退出）节点，这个过程是由内向外的。</p><p>为了能够处理到 enter 和 exit，访问器最终会做成这个样子</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>    const visitor = {</span></span>
<span class="line"><span>        NumberLiteral:{</span></span>
<span class="line"><span>            enter(node, parent) {},</span></span>
<span class="line"><span>            exit(node, parent) {},</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h4 id="code-generation-生成代码" tabindex="-1">Code Generation(生成代码) <a class="header-anchor" href="#code-generation-生成代码" aria-label="Permalink to &quot;Code Generation(生成代码)&quot;">​</a></h4><p>最后就是代码生成阶段了，<code>其实就是将生成的新AST树再转回代码的过程</code>。大部分的代码生成器主要过程是，不断的访问Transformation生成的AST(抽象语法树)或者再结合tokens，按照指定的规则，将“树”上的节点打印拼接最终还原为新的code，自此编译器的执行过程就结束了。</p><h3 id="原理篇" tabindex="-1">原理篇 <a class="header-anchor" href="#原理篇" aria-label="Permalink to &quot;原理篇&quot;">​</a></h3><p>接下来按照上述步骤，开始手写编译器。</p><h4 id="生成tokens" tabindex="-1">生成Tokens <a class="header-anchor" href="#生成tokens" aria-label="Permalink to &quot;生成Tokens&quot;">​</a></h4><p>第一步: 将代码解析为<code>tokens</code>。这个过程需要<code>tokenzier(分词器)</code>函数，整体思路就是通过遍历字符串的方式，对每个字符按照一定的规则进行<code>switch case</code>，最终生成<code>tokens</code>数组。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>function tokenizer (input) {</span></span>
<span class="line"><span>  let current = 0; //记录当前访问的位置</span></span>
<span class="line"><span>  let tokens = [] // 最终生成的tokens</span></span>
<span class="line"><span>  // 循环遍历input</span></span>
<span class="line"><span>  while (current &lt; input.length) {</span></span>
<span class="line"><span>    let char = input[current];</span></span>
<span class="line"><span>    // 如果字符是开括号，我们把一个新的token放到tokens数组里，类型是\`paren\`</span></span>
<span class="line"><span>    if (char === &#39;(&#39;) {</span></span>
<span class="line"><span>      tokens.push({</span></span>
<span class="line"><span>        type: &#39;paren&#39;,</span></span>
<span class="line"><span>        value: &#39;(&#39;,</span></span>
<span class="line"><span>      });</span></span>
<span class="line"><span>      current++;</span></span>
<span class="line"><span>      continue;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // 闭括号做同样的操作</span></span>
<span class="line"><span>    if (char === &#39;)&#39;) {</span></span>
<span class="line"><span>      tokens.push({</span></span>
<span class="line"><span>        type: &#39;paren&#39;,</span></span>
<span class="line"><span>        value: &#39;)&#39;,</span></span>
<span class="line"><span>      });</span></span>
<span class="line"><span>      current++;</span></span>
<span class="line"><span>      continue;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    //空格检查，我们关心空格在分隔字符上是否存在，但是在token中他是无意义的</span></span>
<span class="line"><span>    let WHITESPACE = /\\s/;</span></span>
<span class="line"><span>    if (WHITESPACE.test(char)) {</span></span>
<span class="line"><span>      current++;</span></span>
<span class="line"><span>      continue;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    //接下来检测数字，这里解释下 如果发现是数字我们如 add 22 33 这样</span></span>
<span class="line"><span>    //我们是不希望被解析为2、2、3、3这样的，我们要遇到数字后继续向后匹配直到匹配失败</span></span>
<span class="line"><span>    //这样我们就能截取到连续的数字了</span></span>
<span class="line"><span>    let NUMBERS = /[0-9]/;</span></span>
<span class="line"><span>    if (NUMBERS.test(char)) {</span></span>
<span class="line"><span>      let value = &#39;&#39;;</span></span>
<span class="line"><span>      while (NUMBERS.test(char)) {</span></span>
<span class="line"><span>        value += char;</span></span>
<span class="line"><span>        char = input[++current];</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      tokens.push({ type: &#39;number&#39;, value });</span></span>
<span class="line"><span>      continue;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 接下来检测字符串,这里我们只检测双引号，和上述同理也是截取连续完整的字符串</span></span>
<span class="line"><span>    if (char === &#39;&quot;&#39;) {</span></span>
<span class="line"><span>      let value = &#39;&#39;;</span></span>
<span class="line"><span>      char = input[++current];</span></span>
<span class="line"><span>      while (char !== &#39;&quot;&#39;) {</span></span>
<span class="line"><span>        value += char;</span></span>
<span class="line"><span>        char = input[++current];</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      char = input[++current];</span></span>
<span class="line"><span>      tokens.push({ type: &#39;string&#39;, value });</span></span>
<span class="line"><span>      continue;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // 最后一个检测的是name 如add这样，也是一串连续的字符，但是他是没有“”的</span></span>
<span class="line"><span>    let LETTERS = /[a-z]/i;</span></span>
<span class="line"><span>    if (LETTERS.test(char)) {</span></span>
<span class="line"><span>      let value = &#39;&#39;;</span></span>
<span class="line"><span>      while (LETTERS.test(char)) {</span></span>
<span class="line"><span>        value += char;</span></span>
<span class="line"><span>        char = input[++current];</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      tokens.push({ type: &#39;name&#39;, value });</span></span>
<span class="line"><span>      continue;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // 容错处理，如果我们什么都没有匹配到，说明这个token不在我们的解析范围内</span></span>
<span class="line"><span>    throw new TypeError(&#39;I dont know what this character is: &#39; + char);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  return tokens</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br></div></div><h4 id="生成ast" tabindex="-1">生成AST <a class="header-anchor" href="#生成ast" aria-label="Permalink to &quot;生成AST&quot;">​</a></h4><p>第二步： 将生成好的<code>tokens</code>转化为<code>AST</code>。现在需要定义<code>parser</code>函数，接收上一步处理好的<code>tokens</code>：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>function parser (tokens) {</span></span>
<span class="line"><span>  let current = 0; //访问tokens的下标</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  //walk函数辅助我们遍历整个tokens</span></span>
<span class="line"><span>  function walk () {</span></span>
<span class="line"><span>    let token = tokens[current]</span></span>
<span class="line"><span>    // 现在就是遍历出每一个token，根据其类型生成对应的节点</span></span>
<span class="line"><span>    if (token.type === &#39;number&#39;) {</span></span>
<span class="line"><span>      current++</span></span>
<span class="line"><span>      return {</span></span>
<span class="line"><span>        type: &#39;NumberLiteral&#39;,</span></span>
<span class="line"><span>        value: token.value</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    if (token.type === &#39;string&#39;) {</span></span>
<span class="line"><span>      current++;</span></span>
<span class="line"><span>      return {</span></span>
<span class="line"><span>        type: &#39;StringLiteral&#39;,</span></span>
<span class="line"><span>        value: token.value,</span></span>
<span class="line"><span>      };</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    //这里处理调用语句</span></span>
<span class="line"><span>    if (token.type === &#39;paren&#39; &amp;&amp; token.value === &quot;(&quot;) {</span></span>
<span class="line"><span>      token = tokens[++current]</span></span>
<span class="line"><span>      //这里以一个例子解释(add 2 3) 这样的代码 &quot;(&quot; 就是 paren token ，而接下来的node其实就是那个 name 类型的token &quot;add&quot;</span></span>
<span class="line"><span>      let node = {</span></span>
<span class="line"><span>        type: &quot;CallExpression&quot;,</span></span>
<span class="line"><span>        value: token.value,</span></span>
<span class="line"><span>        params: []</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      //获取name后我们需要继续获取接下来调用语句中的参数，直到我们遇到了&quot;)&quot;,这里会存在嵌套的现象如下</span></span>
<span class="line"><span>      // (add 2 (subtract 4 2))</span></span>
<span class="line"><span>      /*</span></span>
<span class="line"><span>        [                                        </span></span>
<span class="line"><span>          { type: &#39;paren&#39;, value: &#39;(&#39; },       </span></span>
<span class="line"><span>          { type: &#39;name&#39;, value: &#39;add&#39; },      </span></span>
<span class="line"><span>          { type: &#39;number&#39;, value: &#39;2&#39; },      </span></span>
<span class="line"><span>          { type: &#39;paren&#39;, value: &#39;(&#39; },       </span></span>
<span class="line"><span>          { type: &#39;name&#39;, value: &#39;subtract&#39; }, </span></span>
<span class="line"><span>          { type: &#39;number&#39;, value: &#39;4&#39; },      </span></span>
<span class="line"><span>          { type: &#39;number&#39;, value: &#39;2&#39; },      </span></span>
<span class="line"><span>          { type: &#39;paren&#39;, value: &#39;)&#39; },       </span></span>
<span class="line"><span>          { type: &#39;paren&#39;, value: &#39;)&#39; },       </span></span>
<span class="line"><span>        ]</span></span>
<span class="line"><span>      */</span></span>
<span class="line"><span>      token = tokens[++current];</span></span>
<span class="line"><span>      //这里我们通过递归调用不断的读取参数</span></span>
<span class="line"><span>      while (</span></span>
<span class="line"><span>        (token.type !== &#39;paren&#39;) || (token.type === &#39;paren&#39; &amp;&amp; token.value !== &#39;)&#39;)</span></span>
<span class="line"><span>      ) {</span></span>
<span class="line"><span>        node.params.push(walk())</span></span>
<span class="line"><span>        token = tokens[current] //因为参数的if判断里会让 current++ 实际上就是持续向后遍历了tokens,然后将参数推入params</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      // 当while中断后就说明参数读取完了，现在下一个应该是&quot;)&quot;，所以我们++越过</span></span>
<span class="line"><span>      current++</span></span>
<span class="line"><span>      return node // 最终将CallExpression节点返回了</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    //当然这里做了容错处理，如果没有匹配到预计的类型，就说明出现了，parse无法识别的token</span></span>
<span class="line"><span>    throw new TypeError(token.type);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  // 现在我们创建AST，树的最根层就是Program</span></span>
<span class="line"><span>  let ast = {</span></span>
<span class="line"><span>    type: &#39;Program&#39;,</span></span>
<span class="line"><span>    body: [],</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span>  //然后我们通过调用walk遍历tokens将tokens内的对象，转化为AST的节点，完成AST的构建</span></span>
<span class="line"><span>  while (current &lt; tokens.length) {</span></span>
<span class="line"><span>    ast.body.push(walk());</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  return ast;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br></div></div><h4 id="遍历和访问生成好的ast" tabindex="-1">遍历和访问生成好的AST <a class="header-anchor" href="#遍历和访问生成好的ast" aria-label="Permalink to &quot;遍历和访问生成好的AST&quot;">​</a></h4><p>现在已经有AST了，然后我们希望能够通过访问器访问不同的节点，当遇到不同的节点的时候，调用访问器的不同函数，大致设计成这样：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>//  traverse(ast,visitor) 迭代器(抽象语法树，访问器)</span></span>
<span class="line"><span>traverse(ast, {</span></span>
<span class="line"><span>  Program: {</span></span>
<span class="line"><span>    enter(node, parent) {</span></span>
<span class="line"><span>      // ...</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    exit(node, parent) {</span></span>
<span class="line"><span>      // ...</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  CallExpression: {</span></span>
<span class="line"><span>    enter(node, parent) {</span></span>
<span class="line"><span>      // ...</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    exit(node, parent) {</span></span>
<span class="line"><span>      // ...</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  NumberLiteral: {</span></span>
<span class="line"><span>    enter(node, parent) {</span></span>
<span class="line"><span>      // ...</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    exit(node, parent) {</span></span>
<span class="line"><span>      // ...</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>})</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><p>接下来实现<code>traverse</code>函数：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>function traverse (ast, visitor) {</span></span>
<span class="line"><span>  //遍历数组，在遍历数组的同时会调用traverseNode来遍历节点</span></span>
<span class="line"><span>  function traverseArray (array, parent) {</span></span>
<span class="line"><span>    array.forEach(child =&gt; {</span></span>
<span class="line"><span>      traverseNode(child, parent)</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  function traverseNode (node, parent) {</span></span>
<span class="line"><span>    // 判断访问器中是否有合适处理该节点的函数</span></span>
<span class="line"><span>    let methods = visitor[node.type];</span></span>
<span class="line"><span>    // 如果有就执行enter函数，因为此时已经进入这个节点了</span></span>
<span class="line"><span>    if (methods &amp;&amp; methods.enter) {</span></span>
<span class="line"><span>      methods.enter(node, parent);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    //接下来就根据node节点类型来处理了</span></span>
<span class="line"><span>    switch (node.type) {</span></span>
<span class="line"><span>      case &#39;Program&#39;:</span></span>
<span class="line"><span>        traverseArray(node.body, node); //如果你是ast的根部，就相当于树根，body中的每一项都是一个分支</span></span>
<span class="line"><span>        break;</span></span>
<span class="line"><span>      case &#39;CallExpression&#39;:</span></span>
<span class="line"><span>        traverseArray(node.params, node); //这个和Program一样处理，但是这里是为了遍历params,上面是为了遍历分支</span></span>
<span class="line"><span>        break;</span></span>
<span class="line"><span>      // 字符串和数字没有子节点需要访问直接跳过</span></span>
<span class="line"><span>      case &#39;NumberLiteral&#39;:</span></span>
<span class="line"><span>      case &#39;StringLiteral&#39;:</span></span>
<span class="line"><span>        break;</span></span>
<span class="line"><span>      // 最后容错处理</span></span>
<span class="line"><span>      default:</span></span>
<span class="line"><span>        throw new TypeError(node.type);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // 当执行到这里时，说明该节点（分支）已经遍历到尽头了，执行exit</span></span>
<span class="line"><span>    if (methods &amp;&amp; methods.exit) {</span></span>
<span class="line"><span>      methods.exit(node, parent);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  //我们从ast开始进行节点遍历，因为ast没有父节点所以传入null</span></span>
<span class="line"><span>  traverseNode(ast, null);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br></div></div><h4 id="transformer转化" tabindex="-1">Transformer转化 <a class="header-anchor" href="#transformer转化" aria-label="Permalink to &quot;Transformer转化&quot;">​</a></h4><p>现在已经生成好AST了。在这一步需要使用到转换器，<code>帮助我们将刚才生成的AST转化为新的AST</code>。<code>在转化之前，必须要明确转化后的AST长什么样</code>，记得之前的案例：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>    LISP 代码 (add 2 (subtract 4 2))</span></span>
<span class="line"><span>    C    代码  add(2, subtract(4, 2))</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>将原来的AST转化为目标AST，数据结构如下：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>*   Original AST                     |   Transformed AST</span></span>
<span class="line"><span>* ----------------------------------------------------------------------------</span></span>
<span class="line"><span>*   {                                |   {</span></span>
<span class="line"><span>*     type: &#39;Program&#39;,               |     type: &#39;Program&#39;,</span></span>
<span class="line"><span>*     body: [{                       |     body: [{</span></span>
<span class="line"><span>*       type: &#39;CallExpression&#39;,      |       type: &#39;ExpressionStatement&#39;,</span></span>
<span class="line"><span>*       name: &#39;add&#39;,                 |       expression: {</span></span>
<span class="line"><span>*       params: [{                   |         type: &#39;CallExpression&#39;,</span></span>
<span class="line"><span>*         type: &#39;NumberLiteral&#39;,     |         callee: {</span></span>
<span class="line"><span>*         value: &#39;2&#39;                 |           type: &#39;Identifier&#39;,</span></span>
<span class="line"><span>*       }, {                         |           name: &#39;add&#39;</span></span>
<span class="line"><span>*         type: &#39;CallExpression&#39;,    |         },</span></span>
<span class="line"><span>*         name: &#39;subtract&#39;,          |         arguments: [{</span></span>
<span class="line"><span>*         params: [{                 |           type: &#39;NumberLiteral&#39;,</span></span>
<span class="line"><span>*           type: &#39;NumberLiteral&#39;,   |           value: &#39;2&#39;</span></span>
<span class="line"><span>*           value: &#39;4&#39;               |         }, {</span></span>
<span class="line"><span>*         }, {                       |           type: &#39;CallExpression&#39;,</span></span>
<span class="line"><span>*           type: &#39;NumberLiteral&#39;,   |           callee: {</span></span>
<span class="line"><span>*           value: &#39;2&#39;               |             type: &#39;Identifier&#39;,</span></span>
<span class="line"><span>*         }]                         |             name: &#39;subtract&#39;</span></span>
<span class="line"><span>*       }]                           |           },</span></span>
<span class="line"><span>*     }]                             |           arguments: [{</span></span>
<span class="line"><span>*   }                                |             type: &#39;NumberLiteral&#39;,</span></span>
<span class="line"><span>*                                    |             value: &#39;4&#39;</span></span>
<span class="line"><span>* ---------------------------------- |           }, {</span></span>
<span class="line"><span>*                                    |             type: &#39;NumberLiteral&#39;,</span></span>
<span class="line"><span>*                                    |             value: &#39;2&#39;</span></span>
<span class="line"><span>*                                    |           }]</span></span>
<span class="line"><span>*                                    |         }</span></span>
<span class="line"><span>*                                    |       }</span></span>
<span class="line"><span>*                                    |     }]</span></span>
<span class="line"><span>*                                    |   }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><p>具体代码实现：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>function transformer (ast) {</span></span>
<span class="line"><span>  // 将要被返回的新的AST</span></span>
<span class="line"><span>  let newAst = {</span></span>
<span class="line"><span>    type: &#39;Program&#39;,</span></span>
<span class="line"><span>    body: [],</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span>  // 这里相当于将在旧的AST上创建一个_content,这个属性就是新AST的body，因为是引用，所以后面可以直接操作就的AST</span></span>
<span class="line"><span>  ast._context = newAst.body;</span></span>
<span class="line"><span>  // 用之前创建的访问器来访问这个AST的所有节点</span></span>
<span class="line"><span>  traverser(ast, {</span></span>
<span class="line"><span>    // 针对于数字片段的处理</span></span>
<span class="line"><span>    NumberLiteral: {</span></span>
<span class="line"><span>      enter (node, parent) {</span></span>
<span class="line"><span>        // 创建一个新的节点，其实就是创建新AST的节点，这个新节点存在于父节点的body中</span></span>
<span class="line"><span>        parent._context.push({</span></span>
<span class="line"><span>          type: &#39;NumberLiteral&#39;,</span></span>
<span class="line"><span>          value: node.value,</span></span>
<span class="line"><span>        });</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 针对于文字片段的处理</span></span>
<span class="line"><span>    StringLiteral: {</span></span>
<span class="line"><span>      enter (node, parent) {</span></span>
<span class="line"><span>        parent._context.push({</span></span>
<span class="line"><span>          type: &#39;StringLiteral&#39;,</span></span>
<span class="line"><span>          value: node.value,</span></span>
<span class="line"><span>        });</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 对调用语句的处理</span></span>
<span class="line"><span>    CallExpression: {</span></span>
<span class="line"><span>      enter (node, parent) {</span></span>
<span class="line"><span>        // 在新的AST中如果是调用语句，type是\`CallExpression\`，同时他还有一个\`Identifier\`，来标识操作</span></span>
<span class="line"><span>        let expression = {</span></span>
<span class="line"><span>          type: &#39;CallExpression&#39;,</span></span>
<span class="line"><span>          callee: {</span></span>
<span class="line"><span>            type: &#39;Identifier&#39;,</span></span>
<span class="line"><span>            name: node.name,</span></span>
<span class="line"><span>          },</span></span>
<span class="line"><span>          arguments: [],</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span>        // 在原来的节点上再创建一个新的属性，用于存放参数 这样当子节点修改_context时，会同步到expression.arguments中，这里用的是同一个内存地址</span></span>
<span class="line"><span>        node._context = expression.arguments;</span></span>
<span class="line"><span>        // 这里需要判断父节点是否是调用语句，如果不是，那么就使用\`ExpressionStatement\`将\`CallExpression\`包裹，因为js中顶层的\`CallExpression\`是有效语句</span></span>
<span class="line"><span>        if (parent.type !== &#39;CallExpression&#39;) {</span></span>
<span class="line"><span>          expression = {</span></span>
<span class="line"><span>            type: &#39;ExpressionStatement&#39;,</span></span>
<span class="line"><span>            expression: expression,</span></span>
<span class="line"><span>          };</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        parent._context.push(expression);</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  });</span></span>
<span class="line"><span>  return newAst;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br></div></div><h4 id="新代码生成" tabindex="-1">新代码生成 <a class="header-anchor" href="#新代码生成" aria-label="Permalink to &quot;新代码生成&quot;">​</a></h4><p>最后一步： 新代码生成。到这一步就是<code>用新的AST，遍历其每一个节点，根据指定规则生成最终新的代码</code>。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>function codeGenerator(node) {</span></span>
<span class="line"><span>  // 我们以节点的种类拆解(语法树)</span></span>
<span class="line"><span>  switch (node.type) {</span></span>
<span class="line"><span>    // 如果是Progame,那么就是AST的最根部了，他的body中的每一项就是一个分支，我们需要将每一个分支都放入代码生成器中</span></span>
<span class="line"><span>    case &#39;Program&#39;:</span></span>
<span class="line"><span>      return node.body.map(codeGenerator)</span></span>
<span class="line"><span>        .join(&#39;\\n&#39;);</span></span>
<span class="line"><span>    // 如果是声明语句注意看新的AST结构，那么在声明语句中expression，就是声明的标示，我们以他为参数再次调用codeGenerator</span></span>
<span class="line"><span>    case &#39;ExpressionStatement&#39;:</span></span>
<span class="line"><span>      return (</span></span>
<span class="line"><span>        codeGenerator(node.expression) + &#39;;&#39;</span></span>
<span class="line"><span>      );</span></span>
<span class="line"><span>    // 如果是调用语句，我们需要打印出调用者的名字加括号，中间放置参数如生成这样&quot;add(2,2)&quot;,</span></span>
<span class="line"><span>    case &#39;CallExpression&#39;:</span></span>
<span class="line"><span>      return (</span></span>
<span class="line"><span>        codeGenerator(node.callee) +  &#39;(&#39; + node.arguments.map(codeGenerator).join(&#39;, &#39;) + &#39;)&#39;</span></span>
<span class="line"><span>      );</span></span>
<span class="line"><span>      </span></span>
<span class="line"><span>    // 如果是识别就直接返回值 如： (add 2 2),在新AST中 add就是那个identifier节点</span></span>
<span class="line"><span>    case &#39;Identifier&#39;:</span></span>
<span class="line"><span>      return node.name;</span></span>
<span class="line"><span>    // 如果是数字就直接返回值</span></span>
<span class="line"><span>    case &#39;NumberLiteral&#39;:</span></span>
<span class="line"><span>      return node.value;</span></span>
<span class="line"><span>    // 如果是文本就给值加个双引号</span></span>
<span class="line"><span>    case &#39;StringLiteral&#39;:</span></span>
<span class="line"><span>      return &#39;&quot;&#39; + node.value + &#39;&quot;&#39;;</span></span>
<span class="line"><span>    // 容错处理</span></span>
<span class="line"><span>    default:</span></span>
<span class="line"><span>      throw new TypeError(node.type);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><p>最终按照上面的步骤实现<code>compiler</code>完成这个微型编译器,注意这个过程的顺序。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>function compiler(input) {</span></span>
<span class="line"><span>  let tokens = tokenizer(input); //生成tokens</span></span>
<span class="line"><span>  let ast    = parser(tokens); //生成ast</span></span>
<span class="line"><span>  let newAst = transformer(ast); //拿到新的ast</span></span>
<span class="line"><span>  let output = codeGenerator(newAst); //生成新代码</span></span>
<span class="line"><span>  return output;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>现在一个小型的编译器就完整实现了，我们来测试一下：测试通过😄。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d53afc14edd344dbbc30b93a4713d192~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="image.png"></p><h2 id="ast的广泛应用" tabindex="-1">AST的广泛应用 <a class="header-anchor" href="#ast的广泛应用" aria-label="Permalink to &quot;AST的广泛应用&quot;">​</a></h2><p>在讲AST的广泛应用之前，我们先来了解一下 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fbabeljs.io%2Fdocs%2Fen%2F" title="https://babeljs.io/docs/en/" target="_blank" rel="noreferrer">Babel</a> 是什么？以免一部分同学不熟悉，影响后面的学习。</p><p><a href="https://link.juejin.cn/?target=https%3A%2F%2Fbabeljs.io%2Fdocs%2Fen%2F" title="https://babeljs.io/docs/en/" target="_blank" rel="noreferrer">Babel</a> 其实就是一个最常用的Javascript编译器，它能够转译 <code>ECMAScript 2015+</code> 的代码，使它在旧的浏览器或者环境中也能够运行，工作过程分为三个部分（其实就跟我们上面手写的一样，相信大家现在肯定倍感亲切）：</p><ul><li><strong>Parse(解析)</strong> 将源代码转换成抽象语法树，树上有很多的<a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Festree%2Festree" title="https://github.com/estree/estree" target="_blank" rel="noreferrer">estree节点</a></li><li><strong>Transform(转换)</strong> 对抽象语法树进行转换</li><li><strong>Generate(代码生成)</strong> 将上一步经过转换过的抽象语法树生成新的代码</li></ul><p>当然我们现在不用从零开始手写了，可以借助于 <code>babel</code> 插件：</p><ul><li><a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fbabel%2Fbabel%2Ftree%2Fmaster%2Fpackages%2F%40babel%2Fparser" title="https://github.com/babel/babel/tree/master/packages/@babel/parser" target="_blank" rel="noreferrer">@babel/parser</a> 可以把源码转换成<code>AST</code></li><li><a href="https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fbabel-traverse" title="https://www.npmjs.com/package/babel-traverse" target="_blank" rel="noreferrer">@babel/traverse</a> 用于对 <code>AST</code> 的遍历，维护了整棵树的状态，并且负责替换、移除和添加节点</li><li><a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fbabel%2Fbabel%2Ftree%2Fmaster%2Fpackages%2F%40babel%2Fgenerate" title="https://github.com/babel/babel/tree/master/packages/@babel/generate" target="_blank" rel="noreferrer">@babel/generate</a> 可以把<code>AST</code>生成源码，同时生成<code>sourcemap</code></li><li><a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fbabel%2Fbabel%2Ftree%2Fmaster%2Fpackages%2Fbabel-types" title="https://github.com/babel/babel/tree/master/packages/babel-types" target="_blank" rel="noreferrer">@babel/types</a> 用于 <code>AST</code> 节点的 Lodash 式工具库, 它包含了构造、验证以及变换 <code>AST</code> 节点的方法，对编写处理 <code>AST</code> 逻辑非常有用</li><li><a href="https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F%40babel%2Fcore" title="https://www.npmjs.com/package/@babel/core" target="_blank" rel="noreferrer">@babel/core</a> Babel 的编译器，核心 API 都在这里面，比如常见的 <code>transform</code>、<code>parse</code>，并实现了插件功能</li></ul><p>先安装：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>yarn add @babel/core -D //里面就包含了@babel/parser、@babel/traverse、@babel/generate、@babel/types等</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="小试牛刀-使用babel修改函数名" tabindex="-1">小试牛刀：使用Babel修改函数名 <a class="header-anchor" href="#小试牛刀-使用babel修改函数名" aria-label="Permalink to &quot;小试牛刀：使用Babel修改函数名&quot;">​</a></h3><p>上面铺垫了这么多，现在开始进入实战演习。</p><p>要求：借助 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fbabeljs.io%2Fdocs%2Fen%2F" title="https://babeljs.io/docs/en/" target="_blank" rel="noreferrer">Babel</a> 给函数重命名。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>//源代码</span></span>
<span class="line"><span>const hello = () =&gt; {};</span></span>
<span class="line"><span>//需要修改为：</span></span>
<span class="line"><span>const world = () =&gt; {};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>根据前面学过的知识点，我们先来整理下思路：</p><ol><li>先将源代码转化成<code>AST</code></li><li>遍历<code>AST</code>上的节点，找到 <code>hello</code> 函数名节点并修改</li><li>将转换过的<code>AST</code>再生成<code>JS</code>代码</li></ol><p>将源代码拷贝到 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fastexplorer.net%2F" title="https://link.juejin.cn/?target=https%3A%2F%2Fastexplorer.net%2F" target="_blank" rel="noreferrer">在线 ast 转换器</a> 中，查看 <code>hello</code> 函数名节点：</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1633a93e9ff24157b5e575d3fbcddaed~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="image.png"></p><p>接下来再看看目标函数的<code>AST</code>，和原函数的<code>AST</code>做个比较：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e3626d1c60fb4c779f0d5f595d155053~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="image.png"></p><p>现在我们已经有了思路：只需要将该节点的<code>name</code>字段修改即可。</p><p>该例子比较简单，直接上代码：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const parser = require(&quot;@babel/parser&quot;);</span></span>
<span class="line"><span>const traverse = require(&quot;@babel/traverse&quot;);</span></span>
<span class="line"><span>const generator = require(&quot;@babel/generator&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 源代码</span></span>
<span class="line"><span>const code = \`</span></span>
<span class="line"><span>const hello = () =&gt; {};</span></span>
<span class="line"><span>\`;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 1. 源代码解析成 ast</span></span>
<span class="line"><span>const ast = parser.parse(code);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 2. 转换</span></span>
<span class="line"><span>const visitor = {</span></span>
<span class="line"><span>  // traverse 会遍历树节点，只要节点的 type 在 visitor 对象中出现，变化调用该方法</span></span>
<span class="line"><span>  Identifier(path) {</span></span>
<span class="line"><span>    const { node } = path; //从path中解析出当前 AST 节点</span></span>
<span class="line"><span>    if (node.name === &quot;hello&quot;) {</span></span>
<span class="line"><span>      node.name = &quot;world&quot;; //找到hello的节点，替换成world</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>traverse.default(ast, visitor);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 3. 生成</span></span>
<span class="line"><span>const result = generator.default(ast, {}, code);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>console.log(result.code); //const world = () =&gt; {};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><h3 id="初露锋芒-手写简易版babel-plugin-transform-es2015-arrow-functions" tabindex="-1">初露锋芒：手写简易版babel-plugin-transform-es2015-arrow-functions <a class="header-anchor" href="#初露锋芒-手写简易版babel-plugin-transform-es2015-arrow-functions" aria-label="Permalink to &quot;初露锋芒：手写简易版babel-plugin-transform-es2015-arrow-functions&quot;">​</a></h3><p>接下来尝试稍微难度大一点的，手写箭头函数转换插件 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fbabel-plugin-transform-es2015-arrow-functions" title="https://www.npmjs.com/package/babel-plugin-transform-es2015-arrow-functions" target="_blank" rel="noreferrer">babel-plugin-transform-es2015-arrow-functions</a>，将箭头函数转换为普通函数。</p><p>先看看使用原插件的情况，安装：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>yarn add babel-plugin-transform-es2015-arrow-functions -D</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>使用插件：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const core = require(&quot;@babel/core&quot;); //babel核心模块</span></span>
<span class="line"><span>let arrowFunctionPlugin = require(&quot;babel-plugin-transform-es2015-arrow-functions&quot;); //转换箭头函数插件</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let sourceCode = \`</span></span>
<span class="line"><span>const sum = (a, b) =&gt; {</span></span>
<span class="line"><span>    return a + b;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>\`;</span></span>
<span class="line"><span>let targetSource = core.transform(sourceCode, {</span></span>
<span class="line"><span>  plugins: [arrowFunctionPlugin], //使用插件</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>console.log(targetSource.code);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cbdc0163e6f04d8789308128c79e0d54~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="image.png"></p><p>接下来我们就来照着写一个类似的<strong>Babel插件</strong>。<code>所谓的babel插件其实是一个对象，对象里面有一个visitor属性，它也是一个对象，key为类型，value为函数，接受path作为参数。</code>也就是这样：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const arrowFunctionPlugin = {</span></span>
<span class="line"><span>  visitor: {</span></span>
<span class="line"><span>    [type]: (path) =&gt; {</span></span>
<span class="line"><span>      //xxx</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>老规矩，先看普通函数之前的AST：</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/452d8a6833ad4270a76db12d639c10ce~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="image.png"></p><p>如果现在再让我们去修改函数名，其实也可以通过<strong>Babel插件</strong>的方式更简单：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f36bd02fd8294e4bbe40fff732fdcbb5~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="image.png"></p><p>好了，进入正题。在写箭头函数转换插件之前，我们首先得知道代码转换前后的区别。还是通过 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fastexplorer.net%2F" title="https://astexplorer.net/" target="_blank" rel="noreferrer">astexplorer.net/</a> 这个网站去比较，经过本人长达一分钟的对比，<code>发现箭头函数和普通函数除了类型不一样，其他都一样</code>。</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5960c94e11d84b3e9786d324a4206f74~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="image.png"></p><p>那这就好办了呀，直接修改类型尝试一下：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const core = require(&quot;@babel/core&quot;); //babel核心模块</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let sourceCode = \`</span></span>
<span class="line"><span>const sum = (a, b) =&gt; {</span></span>
<span class="line"><span>    return a + b;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>\`;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const arrowFunctionPlugin = {</span></span>
<span class="line"><span>  visitor: {</span></span>
<span class="line"><span>    //如果是箭头函数，那么就会进来此函数，参数是箭头函数的节点路径对象</span></span>
<span class="line"><span>    ArrowFunctionExpression(path) {</span></span>
<span class="line"><span>      let { node } = path;</span></span>
<span class="line"><span>      node.type = &quot;FunctionExpression&quot;;</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let targetSource = core.transform(sourceCode, {</span></span>
<span class="line"><span>  plugins: [arrowFunctionPlugin], //使用插件</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>console.log(targetSource.code);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>打印结果：符合预期（是不是so easy!!!）。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/becaefcaa1cc4fcc9d2af357547c2440~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="image.png"></p><h3 id="崭露头角-手写复杂版babel-plugin-transform-es2015-arrow-functions" tabindex="-1">崭露头角：手写复杂版babel-plugin-transform-es2015-arrow-functions <a class="header-anchor" href="#崭露头角-手写复杂版babel-plugin-transform-es2015-arrow-functions" aria-label="Permalink to &quot;崭露头角：手写复杂版babel-plugin-transform-es2015-arrow-functions&quot;">​</a></h3><p>在上面中，我们虽然实现了基本的转换，但还有一些场景并没有考虑进来：</p><ul><li>比如箭头函数使用简写的语法，该如何处理？</li><li>比如箭头函数中的this，该如何处理？</li><li>...</li></ul><p>本节就来详细的分析分析，剩下的希望大家能够举一反三。</p><p>先看看箭头函数使用简写的语法：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>let sourceCode = \`</span></span>
<span class="line"><span>  const sum = (a, b) =&gt; a + b</span></span>
<span class="line"><span>\`;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>如果还是使用上面写的插件进行转换：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4703d8da30d94f09b68f40e39c389436~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="image.png"></p><p>结果肯定是不对的，转换后的代码缺少一对大括号，还缺少 return 关键字。</p><p>解决思路：<code>先判断要转换的函数体是不是一个块语句，如果是就不处理，不是就生成一个块语句，将我们的代码添加到这个块里面去。在添加的过程中还需要在原代码中添加return关键字。</code></p><p>在这过程中需要用到两个api：<a href="https://link.juejin.cn/?target=https%3A%2F%2Fbabeljs.io%2Fdocs%2Fen%2Fbabel-types" title="https://babeljs.io/docs/en/babel-types" target="_blank" rel="noreferrer">blockStatement</a> 、<a href="https://link.juejin.cn/?target=https%3A%2F%2Fbabeljs.io%2Fdocs%2Fen%2Fbabel-types" title="https://babeljs.io/docs/en/babel-types" target="_blank" rel="noreferrer">returnStatement</a>，可以用它们来生成节点或判断节点。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>let types = require(&quot;@babel/types&quot;); //用来生成或者判断节点的AST语法树的节点</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const arrowFunctionPlugin = {</span></span>
<span class="line"><span>  visitor: {</span></span>
<span class="line"><span>    //如果是箭头函数，那么就会进来此函数，参数是箭头函数的节点路径对象</span></span>
<span class="line"><span>    ArrowFunctionExpression(path) {</span></span>
<span class="line"><span>      let { node } = path;</span></span>
<span class="line"><span>      node.type = &quot;FunctionExpression&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      //如果函数体不是块语句</span></span>
<span class="line"><span>      if (!types.isBlockStatement(node.body)) {</span></span>
<span class="line"><span>        node.body = types.blockStatement([types.returnStatement(node.body)]); //生成一个块语句，并将内容return</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>查看运行后的结果：成功。</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/85b229571e34405099409ecad9d3758d~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="image.png"></p><p>再来看如果存在<code>this</code>的情况，原插件 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fbabel-plugin-transform-es2015-arrow-functions" title="https://www.npmjs.com/package/babel-plugin-transform-es2015-arrow-functions" target="_blank" rel="noreferrer">babel-plugin-transform-es2015-arrow-functions</a> 转换后的结果：</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6166252ef2dd44cc9a65b79892566cb4~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="image.png"></p><p>老套路，我们先得知道<code>转化后的代码的AST</code>和<code>源代码的AST</code>之间的差异，这里就不贴图了，大家可以自己动手看一看比较一下。</p><p>整体思路：</p><ul><li>第一步：找到当前箭头函数要使用哪个作用域内的<code>this</code>，暂时称为父作用域</li><li>第二步：往父作用域中加入<code>_this</code>变量，也就是添加语句：<code>var _this = this</code></li><li>第三步：找出当前箭头函数内所有用到<code>this</code>的地方</li><li>第四步：将当前箭头函数中的<code>this</code>，统一替换成<code>_this</code></li></ul><blockquote><p>第一步：找到当前箭头函数要使用哪个作用域内的<code>this</code></p></blockquote><p>具体思路：<code>从当前节点开始向上查找，直到找到一个不是箭头函数的函数，最后还找不到那就是根节点</code>。</p><p>新增<code>hoistFunctionEnvironment</code>函数：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>function hoistFunctionEnvironment(path) {</span></span>
<span class="line"><span>  //确定当前箭头函数要使用哪个地方的this</span></span>
<span class="line"><span>  const thisEnv = path.findParent((parent) =&gt; {</span></span>
<span class="line"><span>    return (</span></span>
<span class="line"><span>      (parent.isFunction() &amp;&amp; !path.isArrowFunctionExpress()) ||</span></span>
<span class="line"><span>      parent.isProgram()</span></span>
<span class="line"><span>    ); //要求父节点是函数且不是箭头函数，找不到就返回根节点</span></span>
<span class="line"><span>  });</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const arrowFunctionPlugin = {</span></span>
<span class="line"><span>  visitor: {</span></span>
<span class="line"><span>    //如果是箭头函数，那么就会进来此函数，参数是箭头函数的节点路径对象</span></span>
<span class="line"><span>    ArrowFunctionExpression(path) {</span></span>
<span class="line"><span>      let { node } = path;</span></span>
<span class="line"><span>+     hoistFunctionEnvironment(path); //提升函数环境，解决this作用域问题</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      node.type = &quot;FunctionExpression&quot;; //箭头函数转换为普通函数</span></span>
<span class="line"><span>      //如果函数体不是块语句</span></span>
<span class="line"><span>      if (!types.isBlockStatement(node.body)) {</span></span>
<span class="line"><span>        node.body = types.blockStatement([types.returnStatement(node.body)]);</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><blockquote><p>第二步：往父作用域中加入<code>_this</code>变量</p></blockquote><p>这里需要引入<a href="https://link.juejin.cn/?target=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FScope_(computer_science)" title="https://en.wikipedia.org/wiki/Scope_(computer_science)" target="_blank" rel="noreferrer">作用域（scope）</a>的概念。大家都知道JavaScript 拥有<a href="https://link.juejin.cn/?target=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FScope_(computer_science)%23Lexical_scoping_vs._dynamic_scoping" title="https://en.wikipedia.org/wiki/Scope_(computer_science)#Lexical_scoping_vs._dynamic_scoping" target="_blank" rel="noreferrer">词法作用域</a>，即代码块创建新的作用域会形成一个树状结构，它与别的作用域之间相互隔离不受影响。<a href="https://link.juejin.cn/?target=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FScope_(computer_science)" title="https://en.wikipedia.org/wiki/Scope_(computer_science)" target="_blank" rel="noreferrer">作用域（scope）</a>同样如此，我们得确保在改变代码的各个部分时不会破坏其他的部分。</p><p><a href="https://link.juejin.cn/?target=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FScope_(computer_science)" title="https://en.wikipedia.org/wiki/Scope_(computer_science)" target="_blank" rel="noreferrer">作用域（scope）</a>的大致结构：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>{</span></span>
<span class="line"><span>  path: path,</span></span>
<span class="line"><span>  block: path.node,</span></span>
<span class="line"><span>  parentBlock: path.parent,</span></span>
<span class="line"><span>  parent: parentScope,</span></span>
<span class="line"><span>  bindings: [...]</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>这一步比较简单，要想在作用域中加一个_this变量，其实就是对AST树中的<a href="https://link.juejin.cn/?target=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FScope_(computer_science)" title="https://en.wikipedia.org/wiki/Scope_(computer_science)" target="_blank" rel="noreferrer">（scope）</a>新增一个节点即可。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>function hoistFunctionEnvironment(path) {</span></span>
<span class="line"><span>  //确定当前箭头函数要使用哪个地方的this</span></span>
<span class="line"><span>  const thisEnv = path.findParent((parent) =&gt; {</span></span>
<span class="line"><span>    return (</span></span>
<span class="line"><span>      (parent.isFunction() &amp;&amp; !path.isArrowFunctionExpress()) ||</span></span>
<span class="line"><span>      parent.isProgram()</span></span>
<span class="line"><span>    ); //要求父节点是函数且不是箭头函数，找不到就返回根节点</span></span>
<span class="line"><span>  });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  //向父作用域内放入一个_this变量</span></span>
<span class="line"><span>+  thisEnv.scope.push({</span></span>
<span class="line"><span>+    id: types.identifier(&quot;_this&quot;), //生成标识符节点,也就是变量名</span></span>
<span class="line"><span>+    init: types.thisExpression(), //生成this节点 也就是变量值</span></span>
<span class="line"><span>+  });</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><blockquote><p>第三步：找出当前箭头函数内所有用到<code>this</code>的地方</p></blockquote><p>思路：遍历当前节点的子节点，如果有<code>this</code>变量，就收集起来。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>function hoistFunctionEnvironment(path) {</span></span>
<span class="line"><span>  //确定当前箭头函数要使用哪个地方的this</span></span>
<span class="line"><span>  const thisEnv = path.findParent((parent) =&gt; {</span></span>
<span class="line"><span>    return (</span></span>
<span class="line"><span>      (parent.isFunction() &amp;&amp; !path.isArrowFunctionExpress()) ||</span></span>
<span class="line"><span>      parent.isProgram()</span></span>
<span class="line"><span>    ); //要求父节点是函数且不是箭头函数，找不到就返回根节点</span></span>
<span class="line"><span>  });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  //向父作用域内放入一个_this变量</span></span>
<span class="line"><span>  thisEnv.scope.push({</span></span>
<span class="line"><span>    id: types.identifier(&quot;_this&quot;), //生成标识符节点,也就是变量名</span></span>
<span class="line"><span>    init: types.thisExpression(), //生成this节点 也就是变量值</span></span>
<span class="line"><span>  });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>+  let thisPaths = []; //获取当前节点this的路径</span></span>
<span class="line"><span>+  //遍历当前节点的子节点</span></span>
<span class="line"><span>+  path.traverse({</span></span>
<span class="line"><span>+    ThisExpression(thisPath) {</span></span>
<span class="line"><span>+      thisPaths.push(thisPath);</span></span>
<span class="line"><span>+    },</span></span>
<span class="line"><span>+  });</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><blockquote><p>第四步：将当前箭头函数中的<code>this</code>，统一替换成<code>_this</code></p></blockquote><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>function hoistFunctionEnvironment(path) {</span></span>
<span class="line"><span>  //确定当前箭头函数要使用哪个地方的this</span></span>
<span class="line"><span>  const thisEnv = path.findParent((parent) =&gt; {</span></span>
<span class="line"><span>    return (</span></span>
<span class="line"><span>      (parent.isFunction() &amp;&amp; !path.isArrowFunctionExpress()) ||</span></span>
<span class="line"><span>      parent.isProgram()</span></span>
<span class="line"><span>    ); //要求父节点是函数且不是箭头函数，找不到就返回根节点</span></span>
<span class="line"><span>  });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  //向父作用域内放入一个_this变量</span></span>
<span class="line"><span>  thisEnv.scope.push({</span></span>
<span class="line"><span>    id: types.identifier(&quot;_this&quot;), //生成标识符节点,也就是变量名</span></span>
<span class="line"><span>    init: types.thisExpression(), //生成this节点 也就是变量值</span></span>
<span class="line"><span>  });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  let thisPaths = []; //获取当前节点this的路径</span></span>
<span class="line"><span>  //遍历当前节点的子节点</span></span>
<span class="line"><span>  path.traverse({</span></span>
<span class="line"><span>    ThisExpression(thisPath) {</span></span>
<span class="line"><span>      thisPaths.push(thisPath);</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>+  //替换</span></span>
<span class="line"><span>+  thisPaths.forEach((thisPath) =&gt; {</span></span>
<span class="line"><span>+    thisPath.replaceWith(types.identifier(&quot;_this&quot;)); //this =&gt; _this</span></span>
<span class="line"><span>+  });</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><p>运行结果：成功（OHHHHHHHHHHHHHH）。</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/80ca9ba284b7404d86c6edbf2ed18138~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="image.png"></p><blockquote><p>整体代码</p></blockquote><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const core = require(&quot;@babel/core&quot;); //babel核心模块</span></span>
<span class="line"><span>let types = require(&quot;@babel/types&quot;); //用来生成或者判断节点的AST语法树的节点</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let sourceCode = \`</span></span>
<span class="line"><span>  const sum = (a, b) =&gt; {</span></span>
<span class="line"><span>    console.log(this);</span></span>
<span class="line"><span>    return a + b;</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span>\`;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/**</span></span>
<span class="line"><span> * 思路：</span></span>
<span class="line"><span> * 第一步：找到当前箭头函数要使用哪个作用域内的this，暂时称为父作用域</span></span>
<span class="line"><span> * 第二步：往父作用域中加入_this变量，也就是var _this=this</span></span>
<span class="line"><span> * 第三步：找出当前箭头函数内所有用到this的地方</span></span>
<span class="line"><span> * 第四步：将当前箭头函数中的this，统一替换成_this</span></span>
<span class="line"><span> */</span></span>
<span class="line"><span>function hoistFunctionEnvironment(path) {</span></span>
<span class="line"><span>  //确定当前箭头函数要使用哪个地方的this</span></span>
<span class="line"><span>  const thisEnv = path.findParent((parent) =&gt; {</span></span>
<span class="line"><span>    return (</span></span>
<span class="line"><span>      (parent.isFunction() &amp;&amp; !path.isArrowFunctionExpress()) ||</span></span>
<span class="line"><span>      parent.isProgram()</span></span>
<span class="line"><span>    ); //要求父节点是函数且不是箭头函数，找不到就返回根节点</span></span>
<span class="line"><span>  });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  //向父作用域内放入一个_this变量</span></span>
<span class="line"><span>  thisEnv.scope.push({</span></span>
<span class="line"><span>    id: types.identifier(&quot;_this&quot;), //生成标识符节点,也就是变量名</span></span>
<span class="line"><span>    init: types.thisExpression(), //生成this节点 也就是变量值</span></span>
<span class="line"><span>  });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  let thisPaths = []; //获取当前节点this的路径</span></span>
<span class="line"><span>  //遍历当前节点的子节点</span></span>
<span class="line"><span>  path.traverse({</span></span>
<span class="line"><span>    ThisExpression(thisPath) {</span></span>
<span class="line"><span>      thisPaths.push(thisPath);</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  //替换</span></span>
<span class="line"><span>  thisPaths.forEach((thisPath) =&gt; {</span></span>
<span class="line"><span>    thisPath.replaceWith(types.identifier(&quot;_this&quot;)); //this =&gt; _this</span></span>
<span class="line"><span>  });</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const arrowFunctionPlugin = {</span></span>
<span class="line"><span>  visitor: {</span></span>
<span class="line"><span>    //如果是箭头函数，那么就会进来此函数，参数是箭头函数的节点路径对象</span></span>
<span class="line"><span>    ArrowFunctionExpression(path) {</span></span>
<span class="line"><span>      let { node } = path;</span></span>
<span class="line"><span>      hoistFunctionEnvironment(path); //提升函数环境，解决this作用域问题</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      node.type = &quot;FunctionExpression&quot;; //箭头函数转换为普通函数</span></span>
<span class="line"><span>      //如果函数体不是块语句</span></span>
<span class="line"><span>      if (!types.isBlockStatement(node.body)) {</span></span>
<span class="line"><span>        node.body = types.blockStatement([types.returnStatement(node.body)]);</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let targetSource = core.transform(sourceCode, {</span></span>
<span class="line"><span>  plugins: [arrowFunctionPlugin], //使用插件</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>console.log(targetSource.code);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br></div></div><h3 id="初战告捷-手写一个console-log插件" tabindex="-1">初战告捷：手写一个<code>console.log</code>插件 <a class="header-anchor" href="#初战告捷-手写一个console-log插件" aria-label="Permalink to &quot;初战告捷：手写一个\`console.log\`插件&quot;">​</a></h3><p>场景：在开发阶段，我们通常会打印一些<code>console.log</code>进行调试。但随着项目的日常迭代，<code>console.log</code>也越来越多，有时候控制台打印了一大堆，不能第一时间定位到想要的日志。<code>这个时候希望可以通过一个插件强化console，让其也打印出当前文件名，以及打印地方的行和列等代码信息</code>。</p><p>经过分析，其实就是往<code>console.log</code>中添加几个参数，比如源代码：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>console.log(&quot;hello world&quot;)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>变成：（这样是不是会清晰很多）</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>console.log(&quot;hello world&quot;,&quot;当前文件名&quot;,&quot;具体代码位置信息&quot;)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>到了现在，相信大家已经开始去对比前后AST树了，经过我们火眼金睛的对比，找出只是<code>arguments</code>略有不同，我们只需处理这一块即可：</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0e386aca5dbf4a40b93373ee587dfd5f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="image.png"></p><p>思路：</p><ul><li>第一步：先找出<code>console</code>节点的部分</li><li>第二步：判断是否是这几个方法名中的某一个：<code>&quot;log&quot;、&quot;info&quot;、&quot;warn&quot;、&quot;error&quot;</code></li><li>第三步：往节点的<code>arguments</code>中添加参数</li></ul><blockquote><p>第一步：先找出<code>console</code>节点的部分</p></blockquote><p>我们先观察console.log部分的AST：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/91da267deed9436b8d899a0bfea46e2c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="image.png"></p><p>看完思路也就出来了：先找<code>CallExpression</code>类型的节点，然后再找出节点中的<code>callee.object.name</code>属性：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const core = require(&quot;@babel/core&quot;); //babel核心模块</span></span>
<span class="line"><span>let types = require(&quot;@babel/types&quot;); //用来生成或者判断节点的AST语法树的节点</span></span>
<span class="line"><span>const pathlib = require(&quot;path&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let sourceCode = \`</span></span>
<span class="line"><span>  console.log(&quot;日志&quot;)</span></span>
<span class="line"><span>\`;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const logPlugin = {</span></span>
<span class="line"><span>  visitor: {</span></span>
<span class="line"><span>    CallExpression(path, state) {</span></span>
<span class="line"><span>      const { node } = path;</span></span>
<span class="line"><span>      if (types.isMemberExpression(node.callee)) {</span></span>
<span class="line"><span>        if (node.callee.object.name === &quot;console&quot;) {</span></span>
<span class="line"><span>          //找到console</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let targetSource = core.transform(sourceCode, {</span></span>
<span class="line"><span>  plugins: [logPlugin], //使用插件</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>console.log(targetSource.code);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><blockquote><p>第二步：判断是否是这几个方法名中的某一个：<code>&quot;log&quot;、&quot;info&quot;、&quot;warn&quot;、&quot;error&quot;</code></p></blockquote><p>还是先观察console部分的AST：</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/44c3185f4af84757a7e855793cd85cb2~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="image.png"></p><p>发现我们想要的方法名可以在节点的<code>callee.property.name</code>属性中直接取到，那就好办了呀，直接上代码：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const core = require(&quot;@babel/core&quot;); //babel核心模块</span></span>
<span class="line"><span>let types = require(&quot;@babel/types&quot;); //用来生成或者判断节点的AST语法树的节点</span></span>
<span class="line"><span>const pathlib = require(&quot;path&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let sourceCode = \`</span></span>
<span class="line"><span>  console.log(&quot;日志&quot;)</span></span>
<span class="line"><span>\`;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const logPlugin = {</span></span>
<span class="line"><span>  visitor: {</span></span>
<span class="line"><span>    CallExpression(path, state) {</span></span>
<span class="line"><span>      const { node } = path;</span></span>
<span class="line"><span>      if (types.isMemberExpression(node.callee)) {</span></span>
<span class="line"><span>        if (node.callee.object.name === &quot;console&quot;) {</span></span>
<span class="line"><span>          //找到console</span></span>
<span class="line"><span>+         if ([&quot;log&quot;, &quot;info&quot;, &quot;warn&quot;, &quot;error&quot;].includes(node.callee.property.name)) {</span></span>
<span class="line"><span>+           //找到符合的方法名</span></span>
<span class="line"><span>+         }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let targetSource = core.transform(sourceCode, {</span></span>
<span class="line"><span>  plugins: [logPlugin], //使用插件</span></span>
<span class="line"><span>  filename: &quot;sum.js&quot;,</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>console.log(targetSource.code);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><blockquote><p>第三步：往节点的<code>arguments</code>中添加参数</p></blockquote><p>继续观察新的AST：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/563ce7dc56514816a9d5eedfe5572e59~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="image.png"></p><p>需要我们往<code>arguments</code>中插入<code>StringLiteral</code>节点，节点中的<code>value</code>属性即是我们需要配置的值。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const core = require(&quot;@babel/core&quot;); //babel核心模块</span></span>
<span class="line"><span>let types = require(&quot;@babel/types&quot;); //用来生成或者判断节点的AST语法树的节点</span></span>
<span class="line"><span>const pathlib = require(&quot;path&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let sourceCode = \`</span></span>
<span class="line"><span>  console.log(&quot;日志&quot;)</span></span>
<span class="line"><span>\`;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const logPlugin = {</span></span>
<span class="line"><span>  visitor: {</span></span>
<span class="line"><span>    CallExpression(path, state) {</span></span>
<span class="line"><span>      const { node } = path;</span></span>
<span class="line"><span>      if (types.isMemberExpression(node.callee)) {</span></span>
<span class="line"><span>        if (node.callee.object.name === &quot;console&quot;) {</span></span>
<span class="line"><span>          //找到console</span></span>
<span class="line"><span>          if ([&quot;log&quot;, &quot;info&quot;, &quot;warn&quot;, &quot;error&quot;].includes(node.callee.property.name)) {</span></span>
<span class="line"><span>            //找到方法名</span></span>
<span class="line"><span>+           const { line, column } = node.loc.start; //找到所处位置的行和列</span></span>
<span class="line"><span>+           node.arguments.push(types.stringLiteral(\`\${line}:\${column}\`)); //向右边添加我们的行和列信息</span></span>
<span class="line"><span>+           //找到文件名</span></span>
<span class="line"><span>+           const filename = state.file.opts.filename;</span></span>
<span class="line"><span>+           //输出文件的相对路径</span></span>
<span class="line"><span>+           const relativeName = pathlib</span></span>
<span class="line"><span>+             .relative(__dirname, filename)</span></span>
<span class="line"><span>+             .replace(/\\\\/g, &quot;/&quot;); //兼容window</span></span>
<span class="line"><span>+           node.arguments.push(types.stringLiteral(relativeName)); //向右边添加我们的行和列信息</span></span>
<span class="line"><span>         }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let targetSource = core.transform(sourceCode, {</span></span>
<span class="line"><span>  plugins: [logPlugin], //使用插件</span></span>
<span class="line"><span>+ filename: &quot;hello.js&quot;, //模拟环境</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>console.log(targetSource.code);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br></div></div><blockquote><p>效果：</p></blockquote><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c6c66b3b115b417bb3f5249c41858eac~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="image.png"></p><p>再也不怕找不到自己的<code>console.log</code>了🐶。</p><h3 id="大展身手-手写监控系统中的日志上传插件" tabindex="-1">大展身手：手写监控系统中的日志上传插件 <a class="header-anchor" href="#大展身手-手写监控系统中的日志上传插件" aria-label="Permalink to &quot;大展身手：手写监控系统中的日志上传插件&quot;">​</a></h3><p>场景：在监控系统的日志上传过程中，我们需要<code>往每个函数的作用域中添加一行日志执行函数</code>，也就是这样（但这里要注意的是，函数的定义方式总共有四种，都需要考虑进来）：</p><p>源代码：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>//四种声明函数的方式</span></span>
<span class="line"><span>function sum(a, b) {</span></span>
<span class="line"><span>  return a + b;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>const multiply = function (a, b) {</span></span>
<span class="line"><span>  return a * b;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>const minus = (a, b) =&gt; a - b;</span></span>
<span class="line"><span>class Calculator {</span></span>
<span class="line"><span>  divide(a, b) {</span></span>
<span class="line"><span>    return a / b;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>期望转换后的代码：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import loggerLib from &quot;logger&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function sum(a, b) {</span></span>
<span class="line"><span>  loggerLib()</span></span>
<span class="line"><span>  return a + b;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>const multiply = function (a, b) {</span></span>
<span class="line"><span>  loggerLib()</span></span>
<span class="line"><span>  return a * b;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>const minus = (a, b) =&gt;{</span></span>
<span class="line"><span>  loggerLib()</span></span>
<span class="line"><span>  return  a - b;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>class Calculator {</span></span>
<span class="line"><span>  divide(a, b) {</span></span>
<span class="line"><span>    loggerLib()</span></span>
<span class="line"><span>    return a / b;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>整体思路：</p><ul><li>第一步：先判断源代码中是否引入了<code>logger</code>库</li><li>第二步：如果引入了，就找出导入的变量名，后面直接使用该变量名即可</li><li>第三步：如果没有引入我们就在源代码的顶部引用一下</li><li>第四步：在函数中插入引入的函数</li></ul><blockquote><p>第一步：先判断源代码中是否引入了<code>logger</code>库</p></blockquote><p>导入的方式总共有三种：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import logger2 from &quot;logger1&quot;;</span></span>
<span class="line"><span>import { logger4 } from &quot;logger3&quot;;</span></span>
<span class="line"><span>import * as logeer6 from &quot;logger5&quot;;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>要判断源代码中有没有引入<code>logger</code>库，其实就是查找 <code>from</code>节点后面有没有<code>logger</code>，老规矩，查看这三种导入方式的<code>AST</code>：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/313d26a3bb314f6598bcdb50c4a5cb25~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="image.png"></p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/edff1c0b76484aaa976282b7ca4e1223~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="image.png"></p><p>发现不管哪种导入方式，我们都可以通过节点的<code>source.value属性获取导入的库名</code>，通过<code>specifiers.local.name属性获取导入的变量名</code>。上代码：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const core = require(&quot;@babel/core&quot;); //babel核心模块</span></span>
<span class="line"><span>let types = require(&quot;@babel/types&quot;); //用来生成或者判断节点的AST语法树的节点</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let sourceCode = \`</span></span>
<span class="line"><span>  //四种声明函数的方式</span></span>
<span class="line"><span>  function sum(a, b) {</span></span>
<span class="line"><span>    return a + b;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  const multiply = function (a, b) {</span></span>
<span class="line"><span>    return a * b;</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span>  const minus = (a, b) =&gt; a - b;</span></span>
<span class="line"><span>  class Calculator {</span></span>
<span class="line"><span>    divide(a, b) {</span></span>
<span class="line"><span>      return a / b;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>\`;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const autoImportLogPlugin = {</span></span>
<span class="line"><span>  visitor: {</span></span>
<span class="line"><span>    //用来保证此模块内一定会引入一个日志的模块</span></span>
<span class="line"><span>    Program(path) {</span></span>
<span class="line"><span>      let loggerId;</span></span>
<span class="line"><span>      //遍历子节点</span></span>
<span class="line"><span>      path.traverse({</span></span>
<span class="line"><span>        ImportDeclaration(path) {</span></span>
<span class="line"><span>          const { node } = path;</span></span>
<span class="line"><span>          if (node.source.value === &quot;logger&quot;) {</span></span>
<span class="line"><span>            //说明导入过了</span></span>
<span class="line"><span>            loggerId=导入的变量名</span></span>
<span class="line"><span>          }</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>      });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      if (!loggerId) {</span></span>
<span class="line"><span>       //如果loggerId没有值，说明源代码中还没有导入此模块，需要我们手动插入一个import语句</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let targetSource = core.transform(sourceCode, {</span></span>
<span class="line"><span>  plugins: [autoImportLogPlugin], //使用插件</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>console.log(targetSource.code);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br></div></div><blockquote><p>第二步：如果引入了，就找出导入的变量名，后面直接使用该变量名即可</p></blockquote><p>这一步比较简单，直接通过<code>specifiers.local.name属性</code>获取导入的变量名再赋值即可。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>  visitor: {</span></span>
<span class="line"><span>    //用来保证此模块内一定会引入一个日志的模块，如果源代码中已经有logger模块引入了，直接用就可以，如果没有就引用一下logger</span></span>
<span class="line"><span>    Program(path, state) {</span></span>
<span class="line"><span>      let loggerId;</span></span>
<span class="line"><span>      //遍历子节点</span></span>
<span class="line"><span>      path.traverse({</span></span>
<span class="line"><span>        ImportDeclaration(path) {</span></span>
<span class="line"><span>          const { node } = path;</span></span>
<span class="line"><span>          if (node.source.value === &quot;logger&quot;) {</span></span>
<span class="line"><span>            //说明导入过了</span></span>
<span class="line"><span>+           const specifiers = node.specifiers[0];</span></span>
<span class="line"><span>+           loggerId = specifiers.local.name; //取出导入的变量名赋值给loggerId</span></span>
<span class="line"><span>+           path.stop(); //找到了就跳出循环</span></span>
<span class="line"><span>          }</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>      });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      //如果loggerId没有值，说明源代码中还没有导入此模块 插入一个import语句</span></span>
<span class="line"><span>      if (!loggerId) {</span></span>
<span class="line"><span>      //xx</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  },</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><blockquote><p>第三步：如果没有引入我们就在源代码的顶部引用一下</p></blockquote><p>老规矩，先去看看要引入语句的AST，然后生成一个对应的节点就好。</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f57af5c81224f37b8831532b10b5d0a~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="image.png"></p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>  visitor: {</span></span>
<span class="line"><span>    //用来保证此模块内一定会引入一个日志的模块，如果源代码中已经有logger模块引入了，直接用就可以，如果没有就引用一下logger</span></span>
<span class="line"><span>    Program(path, state) {</span></span>
<span class="line"><span>      let loggerId;</span></span>
<span class="line"><span>      //遍历子节点</span></span>
<span class="line"><span>      path.traverse({</span></span>
<span class="line"><span>        ImportDeclaration(path) {</span></span>
<span class="line"><span>          const { node } = path;</span></span>
<span class="line"><span>          if (node.source.value === &quot;logger&quot;) {</span></span>
<span class="line"><span>            //说明导入过了</span></span>
<span class="line"><span>            const specifiers = node.specifiers[0];</span></span>
<span class="line"><span>            loggerId = specifiers.local.name; //取出导入的变量名赋值给loggerId</span></span>
<span class="line"><span>            path.stop(); //找到了就跳出循环</span></span>
<span class="line"><span>          }</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>      });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      //如果loggerId没有值，说明源代码中还没有导入此模块 插入一个import语句</span></span>
<span class="line"><span>      if (!loggerId) {</span></span>
<span class="line"><span> +       loggerId = path.scope.generateUid(&quot;loggerLib&quot;); //防止冲突</span></span>
<span class="line"><span> +       path.node.body.unshift(</span></span>
<span class="line"><span> +        types.importDeclaration(</span></span>
<span class="line"><span> +          [types.importDefaultSpecifier(types.identifier(loggerId))],</span></span>
<span class="line"><span> +          types.stringLiteral(&quot;logger&quot;)</span></span>
<span class="line"><span> +        )</span></span>
<span class="line"><span> +       );</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  },</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><p>这里要说明一下的是，为了防止变量名之间的冲突，我们通过使用<code>path.scope.generateUid(&quot;loggerLib&quot;)</code>生成一个新的变量名。比如源代码中已经有别的命名叫<code>loggerLib</code>，那它就会变成<code>_loggerLib</code>。</p><p>写到这一步我们看看效果：引入成功。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/76a11dfafefd4a4b9aaac0e052dc9ee4~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="image.png"></p><blockquote><p>第四步：在函数中插入引入的函数</p></blockquote><p>思路：在获取<code>loggerLib()</code>代码块的AST，然后将其插入到函数的顶层。</p><p>这里需要考虑的是，函数共有四种声明方式，我们都需要考虑进来。</p><p>先生成<code>loggerLib()</code>代码块的AST：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span> //loggerId就是loggerLib，第二个参数【】代表执行该函数无传参</span></span>
<span class="line"><span> types.expressionStatement(</span></span>
<span class="line"><span>      types.callExpression(types.identifier(loggerId), [])</span></span>
<span class="line"><span> );</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>我们可以将生成后的该节点挂载在state对象下，<code>state就是一个用来暂存数据的对象，是一个容器，用于共享数据</code>。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>+   Program(path, state) {</span></span>
<span class="line"><span>      let loggerId;</span></span>
<span class="line"><span>      //遍历子节点</span></span>
<span class="line"><span>      path.traverse({</span></span>
<span class="line"><span>        ImportDeclaration(path) {</span></span>
<span class="line"><span>          const { node } = path;</span></span>
<span class="line"><span>          if (node.source.value === &quot;logger&quot;) {</span></span>
<span class="line"><span>            //说明导入过了</span></span>
<span class="line"><span>            const specifiers = node.specifiers[0];</span></span>
<span class="line"><span>            loggerId = specifiers.local.name; //取出导入的变量名赋值给loggerId</span></span>
<span class="line"><span>            path.stop(); //找到了就跳出循环</span></span>
<span class="line"><span>          }</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>      });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      //如果loggerId没有值，说明源代码中还没有导入此模块 插入一个import语句</span></span>
<span class="line"><span>      if (!loggerId) {</span></span>
<span class="line"><span>        path.node.body.unshift(</span></span>
<span class="line"><span>          types.importDeclaration(</span></span>
<span class="line"><span>            [types.importDefaultSpecifier(types.identifier(loggerId))],</span></span>
<span class="line"><span>            types.stringLiteral(&quot;logger&quot;)</span></span>
<span class="line"><span>          )</span></span>
<span class="line"><span>        );</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>+     //在state上面挂在一个节点 =&gt; loggerLib()</span></span>
<span class="line"><span>+     state.loggerNode = types.expressionStatement(</span></span>
<span class="line"><span>+       types.callExpression(types.identifier(loggerId), [])</span></span>
<span class="line"><span>+     );</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  },</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><p>接着，在函数中插入该节点：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>  visitor: {</span></span>
<span class="line"><span>    //四种函数方式，这是插件能够识别的语法，这是四种函数的type</span></span>
<span class="line"><span>    &quot;FunctionDeclaration | FunctionExpression | ArrowFunctionExpression | ClassMethod&quot;(path, state) {</span></span>
<span class="line"><span>      const { node } = path;</span></span>
<span class="line"><span>      if (types.isBlockStatement(node.body)) {</span></span>
<span class="line"><span>        //如果是一个块级语句的话</span></span>
<span class="line"><span>        node.body.body.unshift(state.loggerNode); //在语句的头部添加logger函数节点</span></span>
<span class="line"><span>      } else {</span></span>
<span class="line"><span>        //处理箭头函数，生成一个块级语句，在第一行中插入loggerNode，然后return 之前的内容</span></span>
<span class="line"><span>        const newBody = types.blockStatement([</span></span>
<span class="line"><span>          state.loggerNode,</span></span>
<span class="line"><span>          types.returnStatement(node.body),</span></span>
<span class="line"><span>        ]);</span></span>
<span class="line"><span>        //替换老节点</span></span>
<span class="line"><span>        node.body = newBody;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  },</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>到此，就大功告成了，查看效果：</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a936d4c1ff5e4d2f9abb2da831b65510~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="image.png"></p><blockquote><p>优化代码：</p></blockquote><p>在原代码中，我们需要生成以下节点：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import loggerLib from &quot;logger&quot;;</span></span>
<span class="line"><span>loggerLib()</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>在生成这些节点的过程中我们需要反复对照AST进行查看，很不方便而且不直观。这里我们其实可以使用Babel提供给我们的库：<code>@babel/template</code>，它可以通过我们传入的模版代码帮助我们生成对应的节点。</p><p>比如生成<code>import loggerLib from &quot;logger&quot;</code>节点，我们可以这么做：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>template.statement(\`import loggerLib from &#39;logger&#39;\`)()</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>这样是不是直观多了。优化后的代码（含完整注释）：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const core = require(&quot;@babel/core&quot;); //babel核心模块</span></span>
<span class="line"><span>let types = require(&quot;@babel/types&quot;); //用来生成或者判断节点的AST语法树的节点</span></span>
<span class="line"><span>const template = require(&quot;@babel/template&quot;);</span></span>
<span class="line"><span>let sourceCode = \` </span></span>
<span class="line"><span>  //四种声明函数的方式</span></span>
<span class="line"><span>  function sum(a, b) {</span></span>
<span class="line"><span>    return a + b;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  const multiply = function (a, b) {</span></span>
<span class="line"><span>    return a * b;</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span>  const minus = (a, b) =&gt; a - b;</span></span>
<span class="line"><span>  class Calculator {</span></span>
<span class="line"><span>    divide(a, b) {</span></span>
<span class="line"><span>      return a / b;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>\`;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const autoImportLogPlugin = {</span></span>
<span class="line"><span>  visitor: {</span></span>
<span class="line"><span>    //用来保证此模块内一定会引入一个日志的模块，state就是一个用来暂存数据的对象，是一个容器，用于共享</span></span>
<span class="line"><span>    Program(path, state) {</span></span>
<span class="line"><span>      let loggerId;</span></span>
<span class="line"><span>      //遍历子节点</span></span>
<span class="line"><span>      path.traverse({</span></span>
<span class="line"><span>        ImportDeclaration(path) {</span></span>
<span class="line"><span>          const { node } = path;</span></span>
<span class="line"><span>          if (node.source.value === &quot;logger&quot;) {</span></span>
<span class="line"><span>            //说明导入过了</span></span>
<span class="line"><span>            const specifiers = node.specifiers[0];</span></span>
<span class="line"><span>            loggerId = specifiers.local.name; //取出导入的变量名赋值给loggerId</span></span>
<span class="line"><span>            path.stop(); //找到了就跳出循环</span></span>
<span class="line"><span>          }</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>      });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      //如果loggerId没有值，说明源代码中还没有导入此模块 插入一个import语句</span></span>
<span class="line"><span>      if (!loggerId) {</span></span>
<span class="line"><span>        loggerId = path.scope.generateUid(&quot;loggerLib&quot;); //防止冲突</span></span>
<span class="line"><span>        path.node.body.unshift(</span></span>
<span class="line"><span>          template.statement(\`import \${loggerId} from &#39;logger&#39;\`)()</span></span>
<span class="line"><span>        );</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      //在state上面挂在一个节点 =&gt; logger()</span></span>
<span class="line"><span>      state.loggerNode = template.statement(\`\${loggerId}()\`)();</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    //四种函数方式</span></span>
<span class="line"><span>    &quot;FunctionDeclaration|FunctionExpression|ArrowFunctionExpression|ClassMethod&quot;(</span></span>
<span class="line"><span>      path,</span></span>
<span class="line"><span>      state</span></span>
<span class="line"><span>    ) {</span></span>
<span class="line"><span>      const { node } = path;</span></span>
<span class="line"><span>      if (types.isBlockStatement(node.body)) {</span></span>
<span class="line"><span>        //如果是一个块级语句的话</span></span>
<span class="line"><span>        node.body.body.unshift(state.loggerNode); //在语句的头部添加logger函数节点</span></span>
<span class="line"><span>      } else {</span></span>
<span class="line"><span>        //处理箭头函数，生成一个块级语句，在第一行中插入loggerNode，然后return 之前的内容</span></span>
<span class="line"><span>        const newBody = types.blockStatement([</span></span>
<span class="line"><span>          state.loggerNode,</span></span>
<span class="line"><span>          types.returnStatement(node.body),</span></span>
<span class="line"><span>        ]);</span></span>
<span class="line"><span>        //替换老节点</span></span>
<span class="line"><span>        node.body = newBody;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let targetSource = core.transform(sourceCode, {</span></span>
<span class="line"><span>  plugins: [autoImportLogPlugin], //使用插件</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>console.log(targetSource.code);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br></div></div><h3 id="大展神威-实现简易版eslint" tabindex="-1">大展神威：实现简易版<code>ESLint</code> <a class="header-anchor" href="#大展神威-实现简易版eslint" aria-label="Permalink to &quot;大展神威：实现简易版\`ESLint\`&quot;">​</a></h3><p>相信大家在工作中都肯定使用过 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Feslint" title="https://www.npmjs.com/package/eslint" target="_blank" rel="noreferrer">ESLint</a>，今天我们就来扒一扒它的工作原理。本节会带着大家手写一个简易版的<code>ESLint</code>，整体不难，更多的是抛砖引玉，帮助大家更好的理解 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Feslint" title="https://www.npmjs.com/package/eslint" target="_blank" rel="noreferrer">ESLint</a>的工作原理。</p><p>在手写前先补充一个前置小知识：其实 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fbabeljs.io%2Fdocs%2Fen%2F" title="https://babeljs.io/docs/en/" target="_blank" rel="noreferrer">Babel</a> 里面的AST遍历也是有生命周期的，有两个钩子：在遍历开始之前或遍历结束之后，它们可以用于设置或清理/分析工作。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>export default function() {</span></span>
<span class="line"><span>  return {</span></span>
<span class="line"><span>   //遍历开始之前</span></span>
<span class="line"><span>    pre(state) {</span></span>
<span class="line"><span>      this.cache = new Map();</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    visitor: {</span></span>
<span class="line"><span>      StringLiteral(path) {</span></span>
<span class="line"><span>        this.cache.set(path.node.value, 1);</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    //遍历结束后</span></span>
<span class="line"><span>    post(state) {</span></span>
<span class="line"><span>      console.log(this.cache);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>前置小知识学完我们开干吧！ <a href="https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Feslint" title="https://www.npmjs.com/package/eslint" target="_blank" rel="noreferrer">ESLint</a>中的一个比较简单的校验规则：<a href="https://link.juejin.cn/?target=https%3A%2F%2Feslint.org%2Fdocs%2Flatest%2Frules%2Fno-console%23rule-details" title="https://eslint.org/docs/latest/rules/no-console#rule-details" target="_blank" rel="noreferrer">noconsole</a>，也就是代码中不允许打印console.log，今天就撸它了，以儆效尤！</p><p>源代码：基于此规则，校验肯定不能通过了</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>var a = 1;</span></span>
<span class="line"><span>console.log(a);</span></span>
<span class="line"><span>var b = 2;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>思路：遍历ATS，然后找出console节点，如果有console就报错。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const core = require(&quot;@babel/core&quot;); //babel核心模块</span></span>
<span class="line"><span>const pathlib = require(&quot;path&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const sourceCode = \`</span></span>
<span class="line"><span>var a = 1;</span></span>
<span class="line"><span>console.log(a);</span></span>
<span class="line"><span>var b = 2;</span></span>
<span class="line"><span>\`;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//no-console 禁用 console fix=true：自动修复</span></span>
<span class="line"><span>const eslintPlugin = ({ fix }) =&gt; {</span></span>
<span class="line"><span>  return {</span></span>
<span class="line"><span>    //遍历前</span></span>
<span class="line"><span>    pre(file) {</span></span>
<span class="line"><span>      file.set(&quot;errors&quot;, []);</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    visitor: {</span></span>
<span class="line"><span>      CallExpression(path, state) {</span></span>
<span class="line"><span>        const errors = state.file.get(&quot;errors&quot;);</span></span>
<span class="line"><span>        const { node } = path;</span></span>
<span class="line"><span>        if (node.callee.object &amp;&amp; node.callee.object.name === &quot;console&quot;) {</span></span>
<span class="line"><span>          errors.push(</span></span>
<span class="line"><span>            path.buildCodeFrameError(\`代码中不能出现console语句\`, Error)  //抛出一个语法错误</span></span>
<span class="line"><span>          );</span></span>
<span class="line"><span>          if (fix) {</span></span>
<span class="line"><span>            //如果启动了fix，就删掉该节点</span></span>
<span class="line"><span>            path.parentPath.remove();</span></span>
<span class="line"><span>          }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    //遍历后</span></span>
<span class="line"><span>    post(file) {</span></span>
<span class="line"><span>      console.log(...file.get(&quot;errors&quot;));</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>let targetSource = core.transform(sourceCode, {</span></span>
<span class="line"><span>  plugins: [eslintPlugin({ fix: true })], //使用插件</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>console.log(targetSource.code);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br></div></div><p>运行效果：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a2034985c3bf494db60c401d7374e5e6~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="image.png"></p><p>其实各种大大小小的规则，都是基于此，大同小异，就是这么简单！！！</p><h3 id="一鸣惊人-实现代码压缩" tabindex="-1">一鸣惊人：实现代码压缩 <a class="header-anchor" href="#一鸣惊人-实现代码压缩" aria-label="Permalink to &quot;一鸣惊人：实现代码压缩&quot;">​</a></h3><p>代码压缩一般是在项目打包上线阶段做的，平时大家可能更多的是直接使用插件，今天也来趴一趴它的工作原理。</p><p>压缩其实也很简单，就是把变量从有意义变成无意义，保证尽可能的短，例如变成：_、a、b等，当然其实远远不止这些，还有将空格缩进取消等等，本节同样也只是抛砖引玉。</p><p>源代码：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span> function getAge(){</span></span>
<span class="line"><span>   var age = 12;</span></span>
<span class="line"><span>   console.log(age);</span></span>
<span class="line"><span>   var name = &#39;zhufeng&#39;;</span></span>
<span class="line"><span>   console.log(name);</span></span>
<span class="line"><span> }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>压缩后希望将getAge、age、name这些命名进行压缩。</p><p>整体思路：</p><ul><li>第一步：需要捕获那些能够生成作用域的节点（函数、类的函数、函数表达式、语句块、if else 、while、for等），因为只要有作用域，就有可能会使用变量</li><li>第二步：给这些作用域内的捕获到的变量重新命名，进行简化</li></ul><blockquote><p>第一步：需要捕获那些能够生成作用域的节点</p></blockquote><p>这里引入一个新的知识点：<code>Bindings</code>，它是变量引用的集合。比如在下面这个例子中：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>function scopeOnce() {</span></span>
<span class="line"><span>  var ref = &quot;This is a binding&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  ref; // 这里是该作用域下的一个引用</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  function scopeTwo() {</span></span>
<span class="line"><span>    ref; // 这里是上级作用域下的一个引用</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p><code>ref</code>与<code>scopeOnce</code>作用域和<code>scopeTwo</code>作用域之间的关系就称为<code>binding</code>，它的大致结构如下：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>{</span></span>
<span class="line"><span>  identifier: node,</span></span>
<span class="line"><span>  scope: scope,</span></span>
<span class="line"><span>  path: path,</span></span>
<span class="line"><span>  kind: &#39;var&#39;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  referenced: true,</span></span>
<span class="line"><span>  references: 3,</span></span>
<span class="line"><span>  referencePaths: [path, path, path],</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  constant: false,</span></span>
<span class="line"><span>  constantViolations: [path]</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>有了这些信息我们就可以查找一个变量的所有引用，并且知道变量的类型是什么（参数，定义等等），寻找到它所属的作用域，或者得到它的标识符的拷贝。 甚至可以知道它是否是一个常量，并查看是哪个路径让它不是一个常量。</p><p>知道了<code>binding</code>是否为常量在很多情况下都会很有用，最大的用处就是代码压缩。</p><p>回到实战中，可以通过<code>Scopable</code>这个别名来捕获所有作用域节点，然后通过<code>path.scope.bindings</code>取出作用域内的所有变量</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const uglifyPlugin = () =&gt; {</span></span>
<span class="line"><span>  return {</span></span>
<span class="line"><span>    visitor: {</span></span>
<span class="line"><span>      //这是一个别名，用于捕获所有作用域节点：函数、类的函数、函数表达式、语句快、if else 、while、for</span></span>
<span class="line"><span>      Scopable(path) {</span></span>
<span class="line"><span>        //path.scope.bindings 取出作用域内的所有变量</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><blockquote><p>第二步：给这些捕获到的变量重新命名</p></blockquote><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const { transformSync } = require(&quot;@babel/core&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const sourceCode = \`</span></span>
<span class="line"><span> function getAge(){</span></span>
<span class="line"><span>   var age = 12;</span></span>
<span class="line"><span>   console.log(age);</span></span>
<span class="line"><span>   var name = &#39;zhufeng&#39;;</span></span>
<span class="line"><span>   console.log(name);</span></span>
<span class="line"><span> }</span></span>
<span class="line"><span> \`;</span></span>
<span class="line"><span>//压缩其实就是把变量从有意义变成无意义，尽可能的短_、a、b</span></span>
<span class="line"><span>const uglifyPlugin = () =&gt; {</span></span>
<span class="line"><span>  return {</span></span>
<span class="line"><span>    visitor: {</span></span>
<span class="line"><span>      //这是一个别名，用于捕获所有作用域节点：函数、类的函数、函数表达式、语句快、if else 、while、for</span></span>
<span class="line"><span>      Scopable(path) {</span></span>
<span class="line"><span>        //path.scope.bindings 取出作用域内的所有变量</span></span>
<span class="line"><span>+       //取出后进行重命名</span></span>
<span class="line"><span>+       Object.entries(path.scope.bindings).forEach(([key, binding]) =&gt; {</span></span>
<span class="line"><span>+         const newName = path.scope.generateUid(); //在当前作用域内生成一个新的uid，并且不会和任何本地定义的变量冲突的标识符</span></span>
<span class="line"><span>+         binding.path.scope.rename(key, newName); //进行🐛命名</span></span>
<span class="line"><span>+       });</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const { code } = transformSync(sourceCode, {</span></span>
<span class="line"><span>  plugins: [uglifyPlugin()],</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span>console.log(code);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><p>效果：代码中的变量命名已经经过压缩。</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/085020877b954951990661982dad95ce~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="image.png"></p><h3 id="厚积薄发-实现按需加载插件" tabindex="-1">厚积薄发：实现按需加载插件 <a class="header-anchor" href="#厚积薄发-实现按需加载插件" aria-label="Permalink to &quot;厚积薄发：实现按需加载插件&quot;">​</a></h3><p>相信大家在工作中肯定都用过 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fwww.lodashjs.com%2F" title="https://www.lodashjs.com/" target="_blank" rel="noreferrer">Lodash</a> 这个工具库，它是一个一致性、模块化、高性能的 JavaScript 实用工具库。</p><p>但是在使用它的时候有一个痛点，那就是它不支持按需加载，只要我们引用了这个工具库中的某个方法，就相当于引用整个工具库。</p><p>这无疑是不能接受的，今天我们通过一个手写的Babel插件来解决这个痛点问题。</p><p>在Webpack中使用Babel插件，配置：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const path = require(&quot;path&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>module.exports = {</span></span>
<span class="line"><span>  mode: &quot;development&quot;,</span></span>
<span class="line"><span>  entry: &quot;./src/index.js&quot;,</span></span>
<span class="line"><span>  output: {</span></span>
<span class="line"><span>    path: path.resolve(&quot;dist&quot;),</span></span>
<span class="line"><span>    filename: &quot;bundle.js&quot;,</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  module: {</span></span>
<span class="line"><span>    rules: [</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        test: /\\.js$/,</span></span>
<span class="line"><span>        use: {</span></span>
<span class="line"><span>          loader: &quot;babel-loader&quot;,</span></span>
<span class="line"><span>          options: {</span></span>
<span class="line"><span>            plugins: [</span></span>
<span class="line"><span>              //我们自己手写的babel-plugin-import插件</span></span>
<span class="line"><span>              [</span></span>
<span class="line"><span>                path.resolve(__dirname, &quot;plugins/babel-plugin-import.js&quot;),</span></span>
<span class="line"><span>                {</span></span>
<span class="line"><span>                  libraryName: &quot;lodash&quot;,</span></span>
<span class="line"><span>                },</span></span>
<span class="line"><span>              ],</span></span>
<span class="line"><span>            ],</span></span>
<span class="line"><span>          },</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>    ],</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><p>源代码（src/index.js）：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { flatten, concat } from &quot;lodash&quot;;</span></span>
<span class="line"><span>console.log(flatten, concat);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>我们先来看看不做按需加载的情况下的打包结果：可以看到，已经快有500Kb的大小了。</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/47109f93b1f549c7b08ee74e44f3e0e8~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="image.png"></p><p>解决思路：将源代码变成这样</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import flatten from &quot;lodash/flatten&quot;;</span></span>
<span class="line"><span>import concat from &quot;lodash/concat&quot;;</span></span>
<span class="line"><span>console.log(flatten, concat);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>整体方案：</p><ul><li>第一步：在插件中拿到我们在插件调用时传递的参数<code>libraryName</code></li><li>第二步：获取<code>import</code>节点，找出引入模块是<code>libraryName</code>的语句</li><li>第三步：进行批量替换旧节点</li></ul><blockquote><p>第一步：在插件中拿到我们在插件调用时传递的参数libraryName</p></blockquote><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const core = require(&quot;@babel/core&quot;); //babel核心模块</span></span>
<span class="line"><span>let types = require(&quot;@babel/types&quot;); //用来生成或者判断节点的AST语法树的节点</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const visitor = {</span></span>
<span class="line"><span>  ImportDeclaration(path, state) {</span></span>
<span class="line"><span>    const { libraryName, libraryDirectory = &quot;lib&quot; } = state.opts; //获取选项中的支持的库的名称</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>module.exports = function () {</span></span>
<span class="line"><span>  return {</span></span>
<span class="line"><span>    visitor,</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><blockquote><p>第二步：获取import节点，找出引入模块是libraryName的语句</p></blockquote><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const core = require(&quot;@babel/core&quot;); //babel核心模块</span></span>
<span class="line"><span>let types = require(&quot;@babel/types&quot;); //用来生成或者判断节点的AST语法树的节点</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const visitor = {</span></span>
<span class="line"><span>  ImportDeclaration(path, state) {</span></span>
<span class="line"><span>    const { libraryName, libraryDirectory = &quot;lib&quot; } = state.opts; //获取选项中的支持的库的名称</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>+   const { node } = path; //获取节点</span></span>
<span class="line"><span>+   const { specifiers } = node; //获取批量导入声明数组</span></span>
<span class="line"><span>+   //如果当前的节点的模块名称是我们需要的库的名称，并且导入不是默认导入才会进来</span></span>
<span class="line"><span>+   if (</span></span>
<span class="line"><span>+     node.source.value === libraryName &amp;&amp;</span></span>
<span class="line"><span>+     !types.isImportDefaultSpecifier(specifiers[0])</span></span>
<span class="line"><span>+   ) {</span></span>
<span class="line"><span>+     //xxx</span></span>
<span class="line"><span>+   }</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>module.exports = function () {</span></span>
<span class="line"><span>  return {</span></span>
<span class="line"><span>    visitor,</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><blockquote><p>第三步：进行批量替换旧节点</p></blockquote><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const core = require(&quot;@babel/core&quot;); //babel核心模块</span></span>
<span class="line"><span>let types = require(&quot;@babel/types&quot;); //用来生成或者判断节点的AST语法树的节点</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const visitor = {</span></span>
<span class="line"><span>  ImportDeclaration(path, state) {</span></span>
<span class="line"><span>    const { libraryName, libraryDirectory = &quot;lib&quot; } = state.opts; //获取选项中的支持的库的名称</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    const { node } = path; //获取节点</span></span>
<span class="line"><span>    const { specifiers } = node; //获取批量导入声明数组</span></span>
<span class="line"><span>    //如果当前的节点的模块名称是我们需要的库的名称，并且导入不是默认导入才会进来</span></span>
<span class="line"><span>    if (</span></span>
<span class="line"><span>      node.source.value === libraryName &amp;&amp;</span></span>
<span class="line"><span>      !types.isImportDefaultSpecifier(specifiers[0])</span></span>
<span class="line"><span>    ) {</span></span>
<span class="line"><span>+     //遍历批量导入声明数组</span></span>
<span class="line"><span>+     const declarations = specifiers.map((specifier) =&gt; {</span></span>
<span class="line"><span>+       //返回一个importDeclaration节点，这里也可以用template</span></span>
<span class="line"><span>+       return types.importDeclaration(</span></span>
<span class="line"><span>+         //导入声明importDefaultSpecifier flatten</span></span>
<span class="line"><span>+         [types.importDefaultSpecifier(specifier.local)],</span></span>
<span class="line"><span>+         //导入模块source lodash/flatten</span></span>
<span class="line"><span>+         types.stringLiteral(</span></span>
<span class="line"><span>+           libraryDirectory</span></span>
<span class="line"><span>+             ? \`\${libraryName}/\${libraryDirectory}/\${specifier.imported.name}\`</span></span>
<span class="line"><span>+             : \`\${libraryName}/\${specifier.imported.name}\`</span></span>
<span class="line"><span>+         )</span></span>
<span class="line"><span>+       );</span></span>
<span class="line"><span>+     });</span></span>
<span class="line"><span>+     path.replaceWithMultiple(declarations); //替换当前节点</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>module.exports = function () {</span></span>
<span class="line"><span>  return {</span></span>
<span class="line"><span>    visitor,</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br></div></div><p>效果：最终打包结果只有19KB了。</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d8cd4d5e77484d0d88dba95610e09de7~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="image.png"></p><h3 id="一战成名-实现typescript的类型校验" tabindex="-1">一战成名：实现<code>TypeScript</code>的类型校验 <a class="header-anchor" href="#一战成名-实现typescript的类型校验" aria-label="Permalink to &quot;一战成名：实现\`TypeScript\`的类型校验&quot;">​</a></h3><p>此节难度较高，还是有一定的难度，不过既然大家都能坚持到这里，相信一定也没有问题！！！</p><p>这里先说一个题外话，项目中做TS文件的类型检测大致有以下几种途径：</p><ul><li>使用 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fts-loader" title="https://www.npmjs.com/package/ts-loader" target="_blank" rel="noreferrer">ts-loader</a></li><li>使用 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fbabel-loader" title="https://www.npmjs.com/package/babel-loader" target="_blank" rel="noreferrer">babel-loader</a>结合 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Ffork-ts-checker-webpack-plugin" title="https://www.npmjs.com/package/fork-ts-checker-webpack-plugin" target="_blank" rel="noreferrer">fork-ts-checker-webpack-plugin</a></li><li>使用 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fbabel-loader" title="https://www.npmjs.com/package/babel-loader" target="_blank" rel="noreferrer">babel-loader</a>结合 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fwww.typescriptlang.org%2F%3F" title="https://www.typescriptlang.org/?" target="_blank" rel="noreferrer">tsc</a></li></ul><p>这三种方式有利有弊，详细细节可以看之前的一篇文章：<a href="https://juejin.cn/post/7085257325165936648" title="https://juejin.cn/post/7085257325165936648" target="_blank" rel="noreferrer">我是如何带领团队从零到一建立前端规范的？🎉🎉🎉</a>。这三种方式虽然解决方案不同，但原理还是大同小异的，本节将从三种常见场景出发，由易到难，带大家吃透其中的原理。</p><h4 id="赋值场景" tabindex="-1">赋值场景 <a class="header-anchor" href="#赋值场景" aria-label="Permalink to &quot;赋值场景&quot;">​</a></h4><p>源代码：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>var age:number=&quot;12&quot;;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>校验思路：</p><ul><li>第一步：获取拿到声明的类型（number）</li><li>第二步：获取真实值的类型（&quot;12&quot;的类型）</li><li>第三步：比较声明的类型和值的类型是否相同</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const core = require(&quot;@babel/core&quot;); //babel核心模块</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const sourceCode = \`var age:number=&quot;12&quot;;\`;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const TypeAnnotationMap = {</span></span>
<span class="line"><span>  TSNumberKeyword: &quot;NumericLiteral&quot;,</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const tsCheckPlugin = {</span></span>
<span class="line"><span>  //遍历前</span></span>
<span class="line"><span>  pre(file) {</span></span>
<span class="line"><span>    file.set(&quot;errors&quot;, []);</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  visitor: {</span></span>
<span class="line"><span>    VariableDeclarator(path, state) {</span></span>
<span class="line"><span>      const errors = state.file.get(&quot;errors&quot;);</span></span>
<span class="line"><span>      const { node } = path;</span></span>
<span class="line"><span>      //第一步：获取拿到声明的类型（number）</span></span>
<span class="line"><span>      const idType =</span></span>
<span class="line"><span>        TypeAnnotationMap[node.id.typeAnnotation.typeAnnotation.type]; //拿到声明的类型 TSNumberKeyword</span></span>
<span class="line"><span>      //第二步：获取真实值的类型（&quot;12&quot;的类型）</span></span>
<span class="line"><span>      const initType = node.init.type; //这里拿到的是真实值的类型 StringLiteral</span></span>
<span class="line"><span>      //第三步：比较声明的类型和值的类型是否相同</span></span>
<span class="line"><span>      if (idType !== initType) {</span></span>
<span class="line"><span>        errors.push(</span></span>
<span class="line"><span>          path</span></span>
<span class="line"><span>            .get(&quot;init&quot;) //拿到子路径init</span></span>
<span class="line"><span>            .buildCodeFrameError(\`无法把\${initType}类型赋值给\${idType}类型\`, Error)</span></span>
<span class="line"><span>        );</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  //遍历后</span></span>
<span class="line"><span>  post(file) {</span></span>
<span class="line"><span>    console.log(...file.get(&quot;errors&quot;));</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let targetSource = core.transform(sourceCode, {</span></span>
<span class="line"><span>  parserOpts: { plugins: [&quot;typescript&quot;] }, //解析的参数，这样才能识别ts语法</span></span>
<span class="line"><span>  plugins: [tsCheckPlugin], //使用插件</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>console.log(targetSource.code);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br></div></div><blockquote><p>效果：</p></blockquote><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5fdec86c0a344936857449d00b9405e0~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="image.png"></p><h4 id="先声明再赋值场景" tabindex="-1">先声明再赋值场景 <a class="header-anchor" href="#先声明再赋值场景" aria-label="Permalink to &quot;先声明再赋值场景&quot;">​</a></h4><p>源代码：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>let sourceCode = \`</span></span>
<span class="line"><span>  var age:number;</span></span>
<span class="line"><span>  age = &quot;12&quot;;</span></span>
<span class="line"><span>\`;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>校验思路：</p><ul><li>第一步：先获取左侧变量的定义（age）</li><li>第二步：在获取左侧变量定义的类型（number）</li><li>第三步：获取右侧的值的类型（“12”）</li><li>第四步：判断变量的左侧变量的类型和右侧的值的类型是否相同</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>const babel = require(&quot;@babel/core&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function transformType(type) {</span></span>
<span class="line"><span>  switch (type) {</span></span>
<span class="line"><span>    case &quot;TSNumberKeyword&quot;:</span></span>
<span class="line"><span>    case &quot;NumberTypeAnnotation&quot;:</span></span>
<span class="line"><span>      return &quot;number&quot;;</span></span>
<span class="line"><span>    case &quot;TSStringKeyword&quot;:</span></span>
<span class="line"><span>    case &quot;StringTypeAnnotation&quot;:</span></span>
<span class="line"><span>      return &quot;string&quot;;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>const tsCheckPlugin = () =&gt; {</span></span>
<span class="line"><span>  return {</span></span>
<span class="line"><span>    pre(file) {</span></span>
<span class="line"><span>      file.set(&quot;errors&quot;, []);</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    visitor: {</span></span>
<span class="line"><span>      AssignmentExpression(path, state) {</span></span>
<span class="line"><span>        const errors = state.file.get(&quot;errors&quot;);</span></span>
<span class="line"><span>        //第一步：先获取左侧变量的定义（age）</span></span>
<span class="line"><span>        const variable = path.scope.getBinding(path.get(&quot;left&quot;));</span></span>
<span class="line"><span>        //第二步：在获取左侧变量定义的类型（number）</span></span>
<span class="line"><span>        const variableAnnotation = variable.path.get(&quot;id&quot;).getTypeAnnotation();</span></span>
<span class="line"><span>        const variableType = transformType(variableAnnotation.type);</span></span>
<span class="line"><span>        //第三步：获取右侧的值的类型（“12”）</span></span>
<span class="line"><span>        const valueType = transformType(</span></span>
<span class="line"><span>          path.get(&quot;right&quot;).getTypeAnnotation().type</span></span>
<span class="line"><span>        );</span></span>
<span class="line"><span>        //第四步：判断变量的左侧变量的类型和右侧的值的类型是否相同</span></span>
<span class="line"><span>        if (variableType !== valueType) {</span></span>
<span class="line"><span>          Error.stackTraceLimit = 0;</span></span>
<span class="line"><span>          errors.push(</span></span>
<span class="line"><span>            path</span></span>
<span class="line"><span>              .get(&quot;init&quot;)</span></span>
<span class="line"><span>              .buildCodeFrameError(</span></span>
<span class="line"><span>                \`无法把\${valueType}赋值给\${variableType}\`,</span></span>
<span class="line"><span>                Error</span></span>
<span class="line"><span>              )</span></span>
<span class="line"><span>          );</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    post(file) {</span></span>
<span class="line"><span>      console.log(...file.get(&quot;errors&quot;));</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let sourceCode = \`</span></span>
<span class="line"><span>   var age:number;</span></span>
<span class="line"><span>   age = &quot;12&quot;;</span></span>
<span class="line"><span> \`;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const result = babel.transform(sourceCode, {</span></span>
<span class="line"><span>  parserOpts: { plugins: [&quot;typescript&quot;] },</span></span>
<span class="line"><span>  plugins: [tsCheckPlugin()],</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span>console.log(result.code);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br></div></div><blockquote><p>效果：</p></blockquote><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3ed1194aac9f4c019860d83e0dbb0f5d~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="image.png"></p><h4 id="泛型场景" tabindex="-1">泛型场景 <a class="header-anchor" href="#泛型场景" aria-label="Permalink to &quot;泛型场景&quot;">​</a></h4><p>由于整体较复杂，我们此小节不写代码，整体理解思路即可，重在理解。</p><p>源代码：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>  function join&lt;T, W&gt;(a: T, b: W) {}</span></span>
<span class="line"><span>  join &lt; number, string &gt; (1, &quot;2&quot;);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>整体思路：</p><ul><li>第一步：先获取实参类型数组（1,&#39;2&#39;的类型数组：[number,string]）</li><li>第二步：获取函数调用时传递的泛型类型数组（[number, string]）</li><li>第三步：拿到函数定义时的泛型 [ T , W ]，然后结合第二步将 T赋值为number，W赋值为string，得到数组 [T=number,W=string]</li><li>第四步：计算函数定义时的形参类型数组：此时 a:number，b:string =&gt; [number,string]</li><li>第五步：a的形参类型跟a的实参类型进行比较，b的形参类型跟b的实参类型进行比较</li></ul><p>理清思路很简单是不是？其实并不复杂。</p><h2 id="最佳实践" tabindex="-1">最佳实践 <a class="header-anchor" href="#最佳实践" aria-label="Permalink to &quot;最佳实践&quot;">​</a></h2><h3 id="_1、尽量避免遍历抽象语法树-ast" tabindex="-1">1、尽量避免遍历抽象语法树（AST） <a class="header-anchor" href="#_1、尽量避免遍历抽象语法树-ast" aria-label="Permalink to &quot;1、尽量避免遍历抽象语法树（AST）&quot;">​</a></h3><p>遍历 AST 的代价很昂贵，并且很容易做出非必要的遍历，可能是数以千计甚或上万次的多余操作。</p><p>Babel 尽可能的对此做出了优化，方法是如果合并多个<code>visitor</code>能够在单次遍历做完所有事情的话那就合并它们。</p><blockquote><p>及时合并访问者对象</p></blockquote><p>当编写访问者时，若逻辑上必要的话，它会试图在多处调用 <code>path.traverse</code>。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>path.traverse({</span></span>
<span class="line"><span>  Identifier(path) {</span></span>
<span class="line"><span>    // ...</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>path.traverse({</span></span>
<span class="line"><span>  BinaryExpression(path) {</span></span>
<span class="line"><span>    // ...</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>});</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>不过若能把它们写进一个访问者的话会更好，这样只会运行一次，否则你会毫无必要的对同一棵树遍历多次。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>path.traverse({</span></span>
<span class="line"><span>  Identifier(path) {</span></span>
<span class="line"><span>    // ...</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  BinaryExpression(path) {</span></span>
<span class="line"><span>    // ...</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>});</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><blockquote><p>可以手动查找就不要遍历</p></blockquote><p>访问者也会尝试在查找一个特定节点类型时调用 <code>path.traverse</code>。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const visitorOne = {</span></span>
<span class="line"><span>  Identifier(path) {</span></span>
<span class="line"><span>    // ...</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const MyVisitor = {</span></span>
<span class="line"><span>  FunctionDeclaration(path) {</span></span>
<span class="line"><span>    path.get(&#39;params&#39;).traverse(visitorOne);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>然而如果你查找的是很明确并且是表层的节点，那么手动去查找它们会避免代价更高的遍历。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const MyVisitor = {</span></span>
<span class="line"><span>  FunctionDeclaration(path) {</span></span>
<span class="line"><span>    path.node.params.forEach(function() {</span></span>
<span class="line"><span>      // ...</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="_2、优化嵌套的访问者对象" tabindex="-1">2、优化嵌套的访问者对象 <a class="header-anchor" href="#_2、优化嵌套的访问者对象" aria-label="Permalink to &quot;2、优化嵌套的访问者对象&quot;">​</a></h3><p>当你嵌套访问者时，直接把它们嵌套式的写进代码里看起来很合理。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const MyVisitor = {</span></span>
<span class="line"><span>  FunctionDeclaration(path) {</span></span>
<span class="line"><span>    path.traverse({</span></span>
<span class="line"><span>      Identifier(path) {</span></span>
<span class="line"><span>        // ...</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>当上述代码在每次调用 <code>FunctionDeclaration()</code> 时都会创建新的访问者对象，使得 Babel 变得更大并且每次都要去做验证。 这也是代价不菲的，所以最好把访问者向上提升。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const visitorOne = {</span></span>
<span class="line"><span>  Identifier(path) {</span></span>
<span class="line"><span>    // ...</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const MyVisitor = {</span></span>
<span class="line"><span>  FunctionDeclaration(path) {</span></span>
<span class="line"><span>    path.traverse(visitorOne);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>如果你需要嵌套的访问者的内部状态，就像这样：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const MyVisitor = {</span></span>
<span class="line"><span>  FunctionDeclaration(path) {</span></span>
<span class="line"><span>    var exampleState = path.node.params[0].name;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    path.traverse({</span></span>
<span class="line"><span>      Identifier(path) {</span></span>
<span class="line"><span>        if (path.node.name === exampleState) {</span></span>
<span class="line"><span>          // ...</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>可以传递给 <code>traverse()</code> 方法的第二个参数然后在访问者中用 <code>this</code> 去访问。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const visitorOne = {</span></span>
<span class="line"><span>  Identifier(path) {</span></span>
<span class="line"><span>    if (path.node.name === this.exampleState) {</span></span>
<span class="line"><span>      // ...</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const MyVisitor = {</span></span>
<span class="line"><span>  FunctionDeclaration(path) {</span></span>
<span class="line"><span>    var exampleState = path.node.params[0].name;</span></span>
<span class="line"><span>    path.traverse(visitorOne, { exampleState });</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h3 id="_3、留意嵌套结构" tabindex="-1">3、留意嵌套结构 <a class="header-anchor" href="#_3、留意嵌套结构" aria-label="Permalink to &quot;3、留意嵌套结构&quot;">​</a></h3><p>有时候在考虑一些转换时，你可能会忘记某些结构是可以嵌套的。</p><p>举例来说，假设我们要从 <code>Foo</code> <code>ClassDeclaration</code> 中查找 <code>constructor</code> <code>ClassMethod</code>。.</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>class Foo {</span></span>
<span class="line"><span>  constructor() {</span></span>
<span class="line"><span>    // ...</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const constructorVisitor = {</span></span>
<span class="line"><span>  ClassMethod(path) {</span></span>
<span class="line"><span>    if (path.node.name === &#39;constructor&#39;) {</span></span>
<span class="line"><span>      // ...</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const MyVisitor = {</span></span>
<span class="line"><span>  ClassDeclaration(path) {</span></span>
<span class="line"><span>    if (path.node.id.name === &#39;Foo&#39;) {</span></span>
<span class="line"><span>      path.traverse(constructorVisitor);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>可是我们忽略了类型定义是可以嵌套的，于是使用上面的遍历方式最终也会找到嵌套的 <code>constructor</code>：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>class Foo {</span></span>
<span class="line"><span>  constructor() {</span></span>
<span class="line"><span>    class Bar {</span></span>
<span class="line"><span>      constructor() {</span></span>
<span class="line"><span>        // ...</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div>`,328);function d(h,g,v,k,f,y){const p=a("ArticleMetadata"),e=a("ClientOnly");return i(),r("div",null,[u,s(e,null,{default:c(()=>[s(p)]),_:1}),m])}const C=l(o,[["render",d]]);export{w as __pageData,C as default};
