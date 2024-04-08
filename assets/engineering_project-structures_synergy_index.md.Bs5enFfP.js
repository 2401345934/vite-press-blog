import{_ as l,o as t,c as p,J as a,w as r,m as s,a as h,aa as d,E as i}from"./chunks/framework.DJCjJe2w.js";const f=JSON.parse('{"title":"整理的一些前后端协同工作","description":"","frontmatter":{"createTime":"2022/11/11","tag":"项目搭建,前后端协同"},"headers":[],"relativePath":"engineering/project-structures/synergy/index.md","filePath":"engineering/project-structures/synergy/index.md","lastUpdated":1668155263000}'),c={name:"engineering/project-structures/synergy/index.md"},o=s("h1",{id:"整理的一些前后端协同工作",tabindex:"-1"},[h("整理的一些前后端协同工作 "),s("a",{class:"header-anchor",href:"#整理的一些前后端协同工作","aria-label":'Permalink to "整理的一些前后端协同工作"'},"​")],-1),k=d(`<h2 id="_1-数据字典使用" tabindex="-1">1. 数据字典使用 <a class="header-anchor" href="#_1-数据字典使用" aria-label="Permalink to &quot;1. 数据字典使用&quot;">​</a></h2><p>数据字典提供统一查询接口</p><ul><li>查询所有字典接口</li><li>查询单个字典数据集合</li><li>查询部分字典数据集合</li></ul><p>结构如下</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;dicCode1&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     text: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;show text&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      value: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;code&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ],</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &#39;dicCode2&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     text: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;show text&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      value: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;code&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h2 id="_2-bff层说明" tabindex="-1">2. BFF层说明 <a class="header-anchor" href="#_2-bff层说明" aria-label="Permalink to &quot;2. BFF层说明&quot;">​</a></h2><p>基本结构： 数据结构基本按照页面功能结构。</p><p>举例：入库详情页面：</p><ul><li>红色框字段：均为一级属性字段。</li><li>蓝色框为数组结构字段：蓝色框单个对象在页面上需要展示的字段也是一级属性字段。</li></ul><p>隐藏字段说明： 应用接口可能存在一些字段需要在前端应用业务操作的同时，会有部分页面不需要的字段冗余到前端。</p><h2 id="_3-接口查询字段需明确" tabindex="-1">3. 接口查询字段需明确 <a class="header-anchor" href="#_3-接口查询字段需明确" aria-label="Permalink to &quot;3. 接口查询字段需明确&quot;">​</a></h2><p>列表查询接口对于查询条件的匹配需要明确。是使用qp-querystring-eq还是qp-querystring-like，需要明确，因为BFF端会封装页面确定需要的查询形式，不是中心透传。</p><h2 id="_4-接口文本展示" tabindex="-1">4. 接口文本展示 <a class="header-anchor" href="#_4-接口文本展示" aria-label="Permalink to &quot;4. 接口文本展示&quot;">​</a></h2><p>接口返回字段 code 转换文本的方式处理。</p><p>举例：返回的订单列表当中，在数据库当中，trade表会关联存储一个用户code，通过关联user表code可以查询到用户名称。在前端业务页面上面需要显示用户名称，则用户名称需要应用接口处理好对应的用户名称返回到前端。</p><p>另一种情况：返回的订单列表里面返回一个tradeStatus，因为订单状态是放在数据字典当中，所以返回到前端的字段不需要进行文本处理，前端通过数据字典数据处理。</p><p>总结：</p><ul><li>数据字典相关的字段，或者明确静态数据的情况，前端处理</li><li>其他的业务字段文本全部由应用接口处理</li></ul><h2 id="_5-复杂数据结构处理" tabindex="-1">5. 复杂数据结构处理 <a class="header-anchor" href="#_5-复杂数据结构处理" aria-label="Permalink to &quot;5. 复杂数据结构处理&quot;">​</a></h2><h2 id="_6-日期格式处理" tabindex="-1">6. 日期格式处理 <a class="header-anchor" href="#_6-日期格式处理" aria-label="Permalink to &quot;6. 日期格式处理&quot;">​</a></h2><h2 id="_7-错误文本展示" tabindex="-1">7. 错误文本展示 <a class="header-anchor" href="#_7-错误文本展示" aria-label="Permalink to &quot;7. 错误文本展示&quot;">​</a></h2><p>错误文本展示，对于后端返回的错误信息前端如何处理。</p><ul><li>前端显示所有后端返回的错误信息</li><li>前端不显示后端返回的错误信息</li><li>前端需要取舍后端返回的错误信息</li></ul><h2 id="_8-权限处理" tabindex="-1">8. 权限处理 <a class="header-anchor" href="#_8-权限处理" aria-label="Permalink to &quot;8. 权限处理&quot;">​</a></h2><ul><li>资源权限</li><li>数据权限</li><li>接口权限</li></ul>`,25);function E(u,b,_,m,g,y){const n=i("ArticleMetadata"),e=i("ClientOnly");return t(),p("div",null,[o,a(e,null,{default:r(()=>[a(n)]),_:1}),k])}const x=l(c,[["render",E]]);export{f as __pageData,x as default};