import{_ as r,o as c,c as t,J as s,w as p,m as e,a as u,aa as i,E as l}from"./chunks/framework.DJCjJe2w.js";const x=JSON.parse('{"title":"vue3+vite+ts+vuex+vue-router+Element-plus+tailwindcss+mock 搭建完整项目","description":"","frontmatter":{"createTime":"2022/11/05","tag":"工程化,项目搭建,Vue,Vite"},"headers":[],"relativePath":"engineering/project-structures/vue3-project/index.md","filePath":"engineering/project-structures/vue3-project/index.md","lastUpdated":1668395656000}'),o={name:"engineering/project-structures/vue3-project/index.md"},b=e("h1",{id:"vue3-vite-ts-vuex-vue-router-element-plus-tailwindcss-mock-搭建完整项目",tabindex:"-1"},[u("vue3+vite+ts+vuex+vue-router+Element-plus+tailwindcss+mock 搭建完整项目 "),e("a",{class:"header-anchor",href:"#vue3-vite-ts-vuex-vue-router-element-plus-tailwindcss-mock-搭建完整项目","aria-label":'Permalink to "vue3+vite+ts+vuex+vue-router+Element-plus+tailwindcss+mock 搭建完整项目"'},"​")],-1),m=i('<h2 id="一-介绍" tabindex="-1">一，介绍 <a class="header-anchor" href="#一-介绍" aria-label="Permalink to &quot;一，介绍&quot;">​</a></h2><p>Vite（法语单词，“快” 的意思）是一种新型的前端构建工具</p><p>最初是配合 Vue3.0 一起使用的，后来适配了各种前端项目，目前提供了 Vue、React、Preact 框架模板</p><p>vite —— 一个由 vue 作者尤雨溪开发的 web 开发工具，它具有以下特点：</p><ul><li>快速的冷启动</li><li>即时的模块热更新</li><li>真正的按需编译 从作者在微博上的发言：</li></ul><blockquote><p>Vite，一个基于浏览器原生 ES imports 的开发服务器。利用浏览器去解析 imports，在服务器端按需编译返回，完全跳过了打包这个概念，服务器随起随用。同时不仅有 Vue 文件支持，还搞定了热更新，而且热更新的速度不会随着模块增多而变慢。针对生产环境则可以把同一份代码用 rollup 打。虽然现在还比较粗糙，但这个方向我觉得是有潜力的，做得好可以彻底解决改一行代码等半天热更新的问题</p></blockquote><p>中可以看出 vite 主要特点是基于浏览器 native 的 ES module 来开发，省略打包这个步骤，因为需要什么资源直接在浏览器里引入即可</p><p>Vite 和 webpack的差别</p><ul><li><p>从底层原理上来说，Vite是基于esbuild预构建依赖。而esbuild是采用go语言编写，因为go语言的操作是纳秒级别，而js是以毫秒计数，所以vite比用js编写的打包器快10-100倍。</p></li><li><p>从启动方式来说，vite在启动的时候不用打包，所以不用分析模块与模块之间的依赖关系，不用进行编译，就是一种按需编译的方式，和UI框架的那种按需导入类似，当浏览器请求某个模块的时候根据需要对模块内容进行编译，再按需动态编译可以缩减编译时间</p></li><li><p>vite相关生态没有webpack完善，vite可以作为开发的辅助。</p></li></ul><h1 id="二-搭建项目" tabindex="-1">二，搭建项目 <a class="header-anchor" href="#二-搭建项目" aria-label="Permalink to &quot;二，搭建项目&quot;">​</a></h1>',10),d=i(`<p>根据Vite官网介绍，我们可以使用npm或yarn来初始化Vite项目，并且Node.js的版本需要 &gt;= 12.0.0。</p><h2 id="_2-1-创建项目" tabindex="-1">2.1 创建项目 <a class="header-anchor" href="#_2-1-创建项目" aria-label="Permalink to &quot;2.1 创建项目&quot;">​</a></h2><p>使用 NPM方式</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>npm init vite@latest 项目名</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>使用 Yarn方式</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>yarn create vite 项目名</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="_2-2-集成vue-router" tabindex="-1">2.2 集成Vue-Router <a class="header-anchor" href="#_2-2-集成vue-router" aria-label="Permalink to &quot;2.2 集成Vue-Router&quot;">​</a></h2><p>使用 NPM方式</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>npm install vue-router@next --save</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>使用 Yarn方式</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>yarn add vue-router@next --save</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>安装完成之后，在src目录下创建一个文件夹router/index.ts，然后添加如下一些配置：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>//router目录下的index.js</span></span>
<span class="line"><span>import { createRouter, createWebHashHistory, createWebHistory } from &#39;vue-router&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const routes = [</span></span>
<span class="line"><span>  { path: &#39;/&#39;, component: () =&gt; import(&#39;../components/Home.vue&#39;)   </span></span>
<span class="line"><span>]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const router = createRouter({</span></span>
<span class="line"><span>  // hash 或者 history 模式</span></span>
<span class="line"><span>  // history: createWebHashHistory(),</span></span>
<span class="line"><span>  history: createWebHistory(),</span></span>
<span class="line"><span>  routes</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>// 全局路由守卫的方法跟vue-router3一样</span></span>
<span class="line"><span>//路由全局前置守卫</span></span>
<span class="line"><span>router.beforeEach((to,from,next)=&gt;{</span></span>
<span class="line"><span>  console.log(&#39;路由全局前置守卫&#39;, to, from);</span></span>
<span class="line"><span>  next()</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>//路由全局后置守卫</span></span>
<span class="line"><span>router.afterEach((to,from,next)=&gt;{</span></span>
<span class="line"><span>  console.log(&#39;路由全局后置守卫&#39;, to, from);</span></span>
<span class="line"><span>  next()</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default router</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><p>然后，我们在main.ts文件中引入Vue-Router，如下所示。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import router from &#39;./router&#39;;</span></span>
<span class="line"><span>createApp(App).use(router).mount(&quot;#app&quot;);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="_2-2-2-新增路由页面" tabindex="-1">2.2.2 新增路由页面 <a class="header-anchor" href="#_2-2-2-新增路由页面" aria-label="Permalink to &quot;2.2.2 新增路由页面&quot;">​</a></h3><p>为了方便演示，我们再新增两个路由页面。熟悉，创建views文件夹，把需要展示的页面创建完成。然后，我们在router/index.ts注册我们新增的页面，如下所示。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>routes: [</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            path: &quot;/home&quot;,</span></span>
<span class="line"><span>            name: &quot;Home&quot;,</span></span>
<span class="line"><span>            alias: &quot;/&quot;,</span></span>
<span class="line"><span>            component: () =&gt; import(&quot;../views/Home.vue&quot;)</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>    ]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>接下来，我们再修改一下App.vue的代码，如下所示。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;router-link to=&quot;/home&quot;&gt;Home&lt;/router-link&gt;</span></span>
<span class="line"><span>  &lt;router-link to=&quot;/about&quot;&gt;About&lt;/router-link&gt;</span></span>
<span class="line"><span>  &lt;router-view&gt;&lt;/router-view&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;script lang=&quot;ts&quot;&gt;</span></span>
<span class="line"><span>import { defineComponent } from &#39;vue&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default defineComponent({</span></span>
<span class="line"><span>  name: &#39;App&#39;</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>接下来启动服务，就可以看到所配置的页面了，并且点击还能够跳转到对应的页面。</p><h2 id="_2-3-集成vuex" tabindex="-1">2.3 集成Vuex <a class="header-anchor" href="#_2-3-集成vuex" aria-label="Permalink to &quot;2.3 集成Vuex&quot;">​</a></h2><p>Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 也集成到 Vue 的官方调试工具 devtools extension (opens new window)，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。</p><p>安装vuex</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>npm install vuex@next --save</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>安装完成之后，需要先初始化Vuex。首先，创建一个store/index.ts文件，添加如下代码。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { createStore } from &quot;vuex&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const store = createStore({</span></span>
<span class="line"><span>  modules: {</span></span>
<span class="line"><span>    home: {</span></span>
<span class="line"><span>      namespaced: true,</span></span>
<span class="line"><span>      state: {</span></span>
<span class="line"><span>        count: 1</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      mutations: {</span></span>
<span class="line"><span>        add(state){</span></span>
<span class="line"><span>          state.count++;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default store;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>上面的代码作用就是实现一个简单的自加功能。然后，我们在main.ts文件中引入Vuex</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { createApp } from &#39;vue&#39;;</span></span>
<span class="line"><span>import App from &#39;./App.vue&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import store from &quot;./store&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const app = createApp(App);</span></span>
<span class="line"><span>app.use(store);</span></span>
<span class="line"><span>app.mount(&#39;#app&#39;);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>完成上述操作之后，接下来我们给Vuex编写一个测试代码看Vuex是否有效。修改Home.vue的代码如下。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;h1&gt;Home Page&lt;/h1&gt;</span></span>
<span class="line"><span>  &lt;h2&gt;{{count}}&lt;/h2&gt;</span></span>
<span class="line"><span>  &lt;button @click=&quot;handleClick&quot;&gt;click&lt;/button&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;script lang=&quot;ts&quot;&gt;</span></span>
<span class="line"><span>import { defineComponent, computed } from &#39;vue&#39;;</span></span>
<span class="line"><span>import { useStore } from &#39;vuex&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default defineComponent({</span></span>
<span class="line"><span>  setup () {</span></span>
<span class="line"><span>    const store = useStore();</span></span>
<span class="line"><span>    const count = computed(() =&gt; store.state.home.count);</span></span>
<span class="line"><span>    const handleClick = () =&gt; {</span></span>
<span class="line"><span>      store.commit(&#39;home/add&#39;);</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>    return {</span></span>
<span class="line"><span>      handleClick,</span></span>
<span class="line"><span>      count</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p>上面的代码实现的就是一个简单的自加功能，和默认示例工程的效果事一样的，只不过我们使用Vuex。</p><h2 id="_2-4-集成element-plus" tabindex="-1">2.4 集成element-plus <a class="header-anchor" href="#_2-4-集成element-plus" aria-label="Permalink to &quot;2.4 集成element-plus&quot;">​</a></h2><p>Element Plus是由饿了么大前端团队开源出品的一套为开发者、设计师和产品经理准备的基于 Vue 3.0 的组件库，可以帮助开发者快速的开发网站，如果你使用过element-ui，那么可以快速的过渡到element-plus。除了element-plus，支持Vue 3.0 的UI框架还有很多。</p><p>首先，在项目的根目录下安装element-plus，命令如下：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>npm install element-plus --save</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="_2-4-1-引入element-plus" tabindex="-1">2.4.1 引入element-plus <a class="header-anchor" href="#_2-4-1-引入element-plus" aria-label="Permalink to &quot;2.4.1 引入element-plus&quot;">​</a></h3><p>我们可以引入整个 element-plus，也可以根据需要仅引入部分组件。如果是全部引入，只需要在main.js 添加如下代码即可。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { createApp } from &#39;vue&#39;</span></span>
<span class="line"><span>import ElementPlus from &#39;element-plus&#39;</span></span>
<span class="line"><span>const app = createApp(App)</span></span>
<span class="line"><span>app.use(ElementPlus)</span></span>
<span class="line"><span>app.mount(&#39;#app&#39;)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>如果为了减小项目的包体积，那么只需要引入对应的功能组件即可。首先，安装 babel-plugin-component插件，如下所示。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>npm install babel-plugin-component --save</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>然后，修改.babelrc的配置内容。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>{</span></span>
<span class="line"><span>  &quot;plugins&quot;: [</span></span>
<span class="line"><span>    [</span></span>
<span class="line"><span>      &quot;component&quot;,</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        &quot;libraryName&quot;: &quot;element-plus&quot;,</span></span>
<span class="line"><span>        &quot;styleLibraryName&quot;: &quot;theme-chalk&quot;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>如果我们只需要引入部分组件，比如 Button 和 Select组件，那么需要在 main.ts 中引入对应的组件即可，如下所示。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { createApp } from &#39;vue&#39;</span></span>
<span class="line"><span>import { store, key } from &#39;./store&#39;;</span></span>
<span class="line"><span>import router from &quot;./router&quot;;</span></span>
<span class="line"><span>import { ElButton, ElSelect } from &#39;element-plus&#39;;</span></span>
<span class="line"><span>import App from &#39;./App.vue&#39;;</span></span>
<span class="line"><span>import &#39;./index.css&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const app = createApp(App)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  app.use(ElButton)</span></span>
<span class="line"><span>  app.use(ElSelect)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>app.use(store, key)</span></span>
<span class="line"><span>app.use(router)</span></span>
<span class="line"><span>app.mount(&#39;#app&#39;)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h3 id="_2-4-2-添加配置" tabindex="-1">2.4.2 添加配置 <a class="header-anchor" href="#_2-4-2-添加配置" aria-label="Permalink to &quot;2.4.2 添加配置&quot;">​</a></h3><p>引入 Element Plus后，我们可以添加一个全局配置对象。该对象目前支持 size 与 zIndex 字段。size 用于改变组件的默认尺寸，zIndex 设置弹框的初始 z-index。以下是两种不同的引入方式： 全局引入：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { createApp } from &#39;vue&#39;</span></span>
<span class="line"><span>import ElementPlus from &#39;element-plus&#39;;</span></span>
<span class="line"><span>import App from &#39;./App.vue&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const app = createApp(App)</span></span>
<span class="line"><span>app.use(ElementPlus, { size: &#39;small&#39;, zIndex: 3000 });</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>按需引入：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { createApp } from &#39;vue&#39;</span></span>
<span class="line"><span>import { ElButton } from &#39;element-plus&#39;;</span></span>
<span class="line"><span>import App from &#39;./App.vue&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const app = createApp(App)</span></span>
<span class="line"><span>app.config.globalProperties.$ELEMENT = option</span></span>
<span class="line"><span>app.use(ElButton);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="_2-4-3-配置proxy-和-alias" tabindex="-1">2.4.3 配置proxy 和 alias <a class="header-anchor" href="#_2-4-3-配置proxy-和-alias" aria-label="Permalink to &quot;2.4.3 配置proxy 和 alias&quot;">​</a></h3><p>如果要在Vite中使用alias别名配置和proxy代理配置，那么需要在vite.config.ts文件中进行单独的配置。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { defineConfig } from &#39;vite&#39;</span></span>
<span class="line"><span>import vue from &#39;@vitejs/plugin-vue&#39;</span></span>
<span class="line"><span>import styleImport from &#39;vite-plugin-style-import&#39;</span></span>
<span class="line"><span>import path from &#39;path&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// https://vitejs.dev/config/</span></span>
<span class="line"><span>export default defineConfig({</span></span>
<span class="line"><span>  plugins: [</span></span>
<span class="line"><span>    vue(),</span></span>
<span class="line"><span>    styleImport({</span></span>
<span class="line"><span>      libs: [</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>          libraryName: &#39;element-plus&#39;,</span></span>
<span class="line"><span>          esModule: true,</span></span>
<span class="line"><span>          ensureStyleFile: true,</span></span>
<span class="line"><span>          resolveStyle: (name) =&gt; {</span></span>
<span class="line"><span>            return \`element-plus/lib/theme-chalk/\${name}.css\`;</span></span>
<span class="line"><span>          },</span></span>
<span class="line"><span>          resolveComponent: (name) =&gt; {</span></span>
<span class="line"><span>            return \`element-plus/lib/\${name}\`;</span></span>
<span class="line"><span>          },</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      ]</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  /**</span></span>
<span class="line"><span>   * 在生产中服务时的基本公共路径。</span></span>
<span class="line"><span>   * @default &#39;/&#39;</span></span>
<span class="line"><span>   */</span></span>
<span class="line"><span>  base: &#39;./&#39;,</span></span>
<span class="line"><span>  /**</span></span>
<span class="line"><span>  * 与“根”相关的目录，构建输出将放在其中。如果目录存在，它将在构建之前被删除。</span></span>
<span class="line"><span>  * @default &#39;dist&#39;</span></span>
<span class="line"><span>  */</span></span>
<span class="line"><span>  // outDir: &#39;dist&#39;,</span></span>
<span class="line"><span>  server: {</span></span>
<span class="line"><span>    // hostname: &#39;0.0.0.0&#39;,</span></span>
<span class="line"><span>    host: &quot;localhost&quot;,</span></span>
<span class="line"><span>    port: 3001,</span></span>
<span class="line"><span>    // // 是否自动在浏览器打开</span></span>
<span class="line"><span>    // open: true,</span></span>
<span class="line"><span>    // // 是否开启 https</span></span>
<span class="line"><span>    // https: false,</span></span>
<span class="line"><span>    // // 服务端渲染</span></span>
<span class="line"><span>    // ssr: false,</span></span>
<span class="line"><span>    proxy: {</span></span>
<span class="line"><span>      &#39;/api&#39;: {</span></span>
<span class="line"><span>        target: &#39;http://localhost:3333/&#39;,</span></span>
<span class="line"><span>        changeOrigin: true,</span></span>
<span class="line"><span>        ws: true,</span></span>
<span class="line"><span>        rewrite: (pathStr) =&gt; pathStr.replace(&#39;/api&#39;, &#39;&#39;)</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  resolve: {</span></span>
<span class="line"><span>    // 导入文件夹别名</span></span>
<span class="line"><span>    alias: {</span></span>
<span class="line"><span>      &#39;@&#39;: path.resolve(__dirname, &#39;./src&#39;),</span></span>
<span class="line"><span>      views: path.resolve(__dirname, &#39;./src/views&#39;),</span></span>
<span class="line"><span>      components: path.resolve(__dirname, &#39;./src/components&#39;),</span></span>
<span class="line"><span>      utils: path.resolve(__dirname, &#39;./src/utils&#39;),</span></span>
<span class="line"><span>      less: path.resolve(__dirname, &quot;./src/less&quot;),</span></span>
<span class="line"><span>      assets: path.resolve(__dirname, &quot;./src/assets&quot;),</span></span>
<span class="line"><span>      com: path.resolve(__dirname, &quot;./src/components&quot;),</span></span>
<span class="line"><span>      store: path.resolve(__dirname, &quot;./src/store&quot;),</span></span>
<span class="line"><span>      mixins: path.resolve(__dirname, &quot;./src/mixins&quot;)</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>})</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br></div></div><p>其中，vite-plugin-style-import是一个可以按需引入样式的库。</p><h2 id="_2-5-集成-tailwindcss" tabindex="-1">2.5 集成 tailwindcss <a class="header-anchor" href="#_2-5-集成-tailwindcss" aria-label="Permalink to &quot;2.5 集成 tailwindcss&quot;">​</a></h2><h3 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>npm install -D tailwindcss@latest postcss@latest autoprefixer@lates</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>创建您的配置文件 接下来，生成您的 tailwind.config.js 和 postcss.config.js 文件：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>npx tailwindcss init -p</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>这将会在您的项目根目录创建一个最小化的 tailwind.config.js 文件：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// tailwind.config.js</span></span>
<span class="line"><span>module.exports = {</span></span>
<span class="line"><span>  purge: [],</span></span>
<span class="line"><span>  darkMode: false, // or &#39;media&#39; or &#39;class&#39;</span></span>
<span class="line"><span>  theme: {</span></span>
<span class="line"><span>    extend: {},</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  variants: {</span></span>
<span class="line"><span>    extend: {},</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  plugins: [],</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>这也将会创建一个包含已配置好的 tailwindcss 和 autoprefixer 的 postcss.config.js 配置文件：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// postcss.config.js</span></span>
<span class="line"><span>module.exports = {</span></span>
<span class="line"><span>  plugins: {</span></span>
<span class="line"><span>    tailwindcss: {},</span></span>
<span class="line"><span>    autoprefixer: {},</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>配置 Tailwind 来移除生产环境下没有使用到的样式声明</p><p>在您的 tailwind.config.js 文件中，配置 purge 选项指定所有的 pages 和 components 文件，使得 Tailwind 可以在生产构建中对未使用的样式进行摇树优化。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>  // tailwind.config.js</span></span>
<span class="line"><span>  module.exports = {</span></span>
<span class="line"><span>-   purge: [],</span></span>
<span class="line"><span>+   purge: [&#39;./index.html&#39;, &#39;./src/**/*.{vue,js,ts,jsx,tsx}&#39;],</span></span>
<span class="line"><span>    darkMode: false, // or &#39;media&#39; or &#39;class&#39;</span></span>
<span class="line"><span>    theme: {</span></span>
<span class="line"><span>      extend: {},</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    variants: {</span></span>
<span class="line"><span>      extend: {},</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    plugins: [],</span></span>
<span class="line"><span>  }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>在您的 CSS 中引入 Tailwind 创建 ./src/index.css 文件 并使用 @tailwind 指令来包含 Tailwind的 base、 components 和 utilities 样式，来替换掉原来的文件内容。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>/* ./src/index.css */</span></span>
<span class="line"><span>@tailwind base;</span></span>
<span class="line"><span>@tailwind components;</span></span>
<span class="line"><span>@tailwind utilities;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>Tailwind 会在构建时将这些指令转换成所有基于您配置的设计系统生成的样式文件。</p><p>最后，确保您的 CSS 文件被导入到您的 ./src/main.js 文件中。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// src/main.js</span></span>
<span class="line"><span>import { createApp } from &#39;vue&#39;</span></span>
<span class="line"><span>import App from &#39;./App.vue&#39;</span></span>
<span class="line"><span>import &#39;./index.css&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>createApp(App).mount(&#39;#app&#39;)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>您已经完成了所有步骤！现在，当您运行 npm run dev, Tailwind CSS 就可以在您的 Vue 3 and Vite 项目中使用了。</p><h2 id="_2-6-集成mock-js" tabindex="-1">2.6 集成mock.js <a class="header-anchor" href="#_2-6-集成mock-js" aria-label="Permalink to &quot;2.6 集成mock.js&quot;">​</a></h2><h3 id="介绍" tabindex="-1">介绍 <a class="header-anchor" href="#介绍" aria-label="Permalink to &quot;介绍&quot;">​</a></h3><p>mock.js 官网：<a href="https://link.juejin.cn/?target=http%3A%2F%2Fmockjs.com%2F" title="http://mockjs.com/" target="_blank" rel="noreferrer">mockjs.com/</a></p><p>目前的大部分公司的项目都是采用的前后端分离, 后端接口的开发和前端人员是同时进行的. 那么这个时候就会存在一个问题, 在页面需要使用大量数据进行渲染生成前, 后端开发人员的接口也许并没有写完, 作为前端的我们也就没有办法获取数据. 所以 前端工程师就需要自己按照接口文档模拟后端人员提供的数据, 以此进行页面的开发.</p><p>这个时候, Mock.js的作用就体现出来了, 在数据量较大的情况下, 我们不用一个一个的编写数据, 只需要根据接口文档将数据的格式填入, Mock.js就能够自动的按需生成大量的模拟数据. 且Mock.js提供了大量的数据类型, 包括文本, 数字, 布尔值, 日期, 邮箱, 链接, 图片, 颜色等.</p><h3 id="使用" tabindex="-1">使用 <a class="header-anchor" href="#使用" aria-label="Permalink to &quot;使用&quot;">​</a></h3><h3 id="_1下载" tabindex="-1">①下载 <a class="header-anchor" href="#_1下载" aria-label="Permalink to &quot;①下载&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>npm install mockjs</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="_2引入" tabindex="-1">②引入 <a class="header-anchor" href="#_2引入" aria-label="Permalink to &quot;②引入&quot;">​</a></h3><p>Mock.js暴露了一个全局的Mock对象, 我们只需要将Mock对象引入到文件中, 调用Mock对象的方法即可</p><p>CommonJS的引入方式</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>//CommonJS引入</span></span>
<span class="line"><span>let Mock = require(&#39;mockjs)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//调用Mock.mock()方法模拟数据</span></span>
<span class="line"><span>let data = Mock.mock({</span></span>
<span class="line"><span>&#39;list|1-10&#39;: [{</span></span>
<span class="line"><span>  &#39;id|+1&#39;: 1</span></span>
<span class="line"><span>}]</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span>console.log(data);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>ES6的引入方式</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>//ES6的引入方式</span></span>
<span class="line"><span>import Mock from &#39;mockjs&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let data = Mock.mock({</span></span>
<span class="line"><span> // 属性 list 的值是一个数组，其中含有 1 到 10 个元素</span></span>
<span class="line"><span>&#39;list|1-10&#39;: [{</span></span>
<span class="line"><span>        // 属性 id 是一个自增数，起始值为 1，每次增 1</span></span>
<span class="line"><span>  &#39;id|+1&#39;: 1</span></span>
<span class="line"><span>}]</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span>console.log(data);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>Mock对象提供了4个方法, 分别是</p><ul><li>Mock.mock(),</li><li>Mock.setup()</li><li>Mock.valid,</li><li>Mock.toJSONSchema()</li></ul><p>一个工具库Mock.Random. 其中我们经常使用到的就是Mock.mock()和Mock.Random.</p><h3 id="_3mock-js的规范" tabindex="-1">③Mock.js的规范 <a class="header-anchor" href="#_3mock-js的规范" aria-label="Permalink to &quot;③Mock.js的规范&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&#39;list|1-10&#39;: [{</span></span>
<span class="line"><span>  &#39;id|+1&#39;: 1</span></span>
<span class="line"><span>}]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>上面的代码被称为数据模板, 用于告诉Mock.js生成什么样的数据, 其中数据模板中的每个属性由三部分构成: 属性名, 生成规则, 属性值:</p><p><strong>list</strong> 为数据模板中的属性名; <strong>1-10</strong> 为生成规则(表示生成最少1个, 最多10个重复数据) <strong>[{&#39;id|+1&#39;: 1}]</strong> 是属性值, 属性值中可以嵌套使用属性名和生成规则.</p><blockquote><p>具体的生成规则参见: <a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fnuysoft%2FMock%2Fwiki%2FSyntax-Specification" title="https://github.com/nuysoft/Mock/wiki/Syntax-Specification" target="_blank" rel="noreferrer">github.com/nuysoft/Moc…</a></p></blockquote><h3 id="mock-mock" tabindex="-1">Mock.mock() <a class="header-anchor" href="#mock-mock" aria-label="Permalink to &quot;Mock.mock()&quot;">​</a></h3><p>Mock.mock()方法是用来根据数据模板生成模拟数据, 我常用到的是以下两种传参方式:</p><p>Mock.mock(template): 根据数据模板template生成模拟数据</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>let data = Mock.mock({</span></span>
<span class="line"><span>data: {</span></span>
<span class="line"><span>  &#39;products|10-20&#39;: [{</span></span>
<span class="line"><span>    name: &#39;手机&#39;,</span></span>
<span class="line"><span>    price: 1000</span></span>
<span class="line"><span>  }]</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>console.log(data);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>Mock.mock(url, template): 拦截请求地址为url的ajax请求, 并根据数据模板template生成模拟数据</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>let data = Mock.mock(&#39;api/products&#39; , {</span></span>
<span class="line"><span>data: {</span></span>
<span class="line"><span>  &#39;products|10-20&#39;: [{</span></span>
<span class="line"><span>    name: &#39;手机&#39;,</span></span>
<span class="line"><span>    price: 1000</span></span>
<span class="line"><span>  }]</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//使用jquery Ajax发送请求</span></span>
<span class="line"><span>$.ajax({</span></span>
<span class="line"><span>  url: &#39;api/products&#39;,</span></span>
<span class="line"><span>  type: &#39;GET&#39;,</span></span>
<span class="line"><span>  success: function(res) {</span></span>
<span class="line"><span>    console.log(res);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>})</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h3 id="mock-random" tabindex="-1">Mock.Random <a class="header-anchor" href="#mock-random" aria-label="Permalink to &quot;Mock.Random&quot;">​</a></h3><p>Mock.Random是Mock.js提供一个工具类, 用于生成常用的几种数据.</p><p>生成布尔值</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>//使用@占位符的方式</span></span>
<span class="line"><span> let data = Mock.mock({</span></span>
<span class="line"><span>    data: {</span></span>
<span class="line"><span>      boolean: &#39;@boolean&#39;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>  console.log(data);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>//使用Mock.Random调用函数的方式</span></span>
<span class="line"><span>  let data = Mock.mock({</span></span>
<span class="line"><span>    data: {</span></span>
<span class="line"><span>      boolean: Mock.Random.boolean()</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>  console.log(data);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>生成日期</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span> let data = Mock.mock({</span></span>
<span class="line"><span>    data: {</span></span>
<span class="line"><span>      date: Mock.Random.date(&#39;yyyy-MM-dd&#39;)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>  console.log(data);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>Mock.js支持丰富的日期格式的自定义: <a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fnuysoft%2FMock%2Fwiki%2FDate" title="https://github.com/nuysoft/Mock/wiki/Date" target="_blank" rel="noreferrer">github.com/nuysoft/Moc…</a> 生成图片</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>let data = Mock.mock({</span></span>
<span class="line"><span>    data: {</span></span>
<span class="line"><span>    //用于生成高度自定义的图片地址</span></span>
<span class="line"><span>      imgURL: Mock.Random.image()</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>  console.log(data);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>生成名字</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>let data = Mock.mock({</span></span>
<span class="line"><span>    data: {</span></span>
<span class="line"><span>      //生成一个英文名字</span></span>
<span class="line"><span>      name: Mock.Random.name(),</span></span>
<span class="line"><span>      //生成一个中文名字</span></span>
<span class="line"><span>      chineseName: Mock.Random.cname()</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>  console.log(data);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>更多Mock.Random工具库提供的数据: <a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fnuysoft%2FMock%2Fwiki%2FMock.Random" title="https://github.com/nuysoft/Mock/wiki/Mock.Random" target="_blank" rel="noreferrer">github.com/nuysoft/Moc…</a></p><h3 id="在-vite2-与-vue3-中使用mockjs来模拟数据" tabindex="-1">在 Vite2 与 Vue3 中使用Mockjs来模拟数据 <a class="header-anchor" href="#在-vite2-与-vue3-中使用mockjs来模拟数据" aria-label="Permalink to &quot;在 Vite2 与 Vue3 中使用Mockjs来模拟数据&quot;">​</a></h3><ol><li>安装mockjs</li></ol><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>npm install mockjs --save-dev</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><ol start="2"><li>安装vite-plugin-mock</li></ol><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>npm i vite-plugin-mock cross-env -D</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>vite-plugin-mock介绍 ： <a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fvbenjs%2Fvite-plugin-mock%2Fblob%2Fmain%2FREADME.zh_CN.md" title="https://github.com/vbenjs/vite-plugin-mock/blob/main/README.zh_CN.md" target="_blank" rel="noreferrer">github.com/vbenjs/vite…</a></p><p>3.在 package.json 中设置环境变量</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>{</span></span>
<span class="line"><span>    &quot;scripts&quot;: {</span></span>
<span class="line"><span>        // 修改dev构建脚本的命令</span></span>
<span class="line"><span>        &quot;dev&quot;: &quot;cross-env NODE_ENV=development vite&quot;,</span></span>
<span class="line"><span>        &quot;build&quot;: &quot;vite build&quot;,</span></span>
<span class="line"><span>        &quot;serve&quot;: &quot;vite preview&quot;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>4.在 vite.config.js 中添加 mockjs 插件</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import vue from &quot;@vitejs/plugin-vue&quot;</span></span>
<span class="line"><span>import { viteMockServe } from &quot;vite-plugin-mock&quot;</span></span>
<span class="line"><span>import { defineConfig } from &quot;vite&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default defineConfig({</span></span>
<span class="line"><span>    plugins: [</span></span>
<span class="line"><span>        vue(),</span></span>
<span class="line"><span>        viteMockServe({</span></span>
<span class="line"><span>         mockPath: &quot;./src/mock&quot;,</span></span>
<span class="line"><span>        supportTs: true     //如果使用 js发开，则需要配置 supportTs 为 false</span></span>
<span class="line"><span>        })</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span>})</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>5.在项目中根目录创建 mock 文件夹，建立index.ts在其中创建需要的数据接口</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 仅做示例: 通过GET请求返回一个名字数组</span></span>
<span class="line"><span>export default [</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        url: &quot;/api/getUsers&quot;,</span></span>
<span class="line"><span>        method: &quot;get&quot;,</span></span>
<span class="line"><span>        response: () =&gt; {</span></span>
<span class="line"><span>            return {</span></span>
<span class="line"><span>                code: 0,</span></span>
<span class="line"><span>                message: &quot;ok&quot;,</span></span>
<span class="line"><span>                data: [&quot;tom&quot;, &quot;jerry&quot;],</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><ol start="6"><li>修改mock.vue，请求接口，显示数据</li></ol><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;div v-for=&quot;(item,index) in users&quot; :key=&quot;item&quot;&gt;{{ index + 1 }}-{{ item }}&lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;script lang=&quot;ts&quot;&gt;</span></span>
<span class="line"><span>import { defineComponent, onMounted, ref } from &quot;vue&quot;;</span></span>
<span class="line"><span>import axios from &quot;axios&quot;</span></span>
<span class="line"><span>import &#39;../mock/index.ts&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default defineComponent({</span></span>
<span class="line"><span>  setup() {</span></span>
<span class="line"><span>    let users = ref([])</span></span>
<span class="line"><span>    onMounted(() =&gt; {</span></span>
<span class="line"><span>      axios.get(\`/api/getUsers\`).then(res =&gt; {</span></span>
<span class="line"><span>        users.value = res.data.data</span></span>
<span class="line"><span>        console.log(&#39;users&#39;, users)</span></span>
<span class="line"><span>      }).catch(err =&gt; {</span></span>
<span class="line"><span>        console.log(err)</span></span>
<span class="line"><span>      })</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return { users }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div>`,126);function h(v,g,k,f,q,y){const n=l("ArticleMetadata"),a=l("ClientOnly");return c(),t("div",null,[b,s(a,null,{default:p(()=>[s(n)]),_:1}),m,s(a,null,{default:p(()=>[s(n)]),_:1}),d])}const _=r(o,[["render",h]]);export{x as __pageData,_ as default};
