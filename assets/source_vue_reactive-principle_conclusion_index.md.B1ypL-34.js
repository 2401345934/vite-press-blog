import{_ as r,o as l,c as s,J as e,w as n,m as a,a as c,aa as _,E as t}from"./chunks/framework.DJCjJe2w.js";const p="/vite-press-blog/assets/vue2-reactive.BF4PVPwg.png",d="/vite-press-blog/assets/vue3-reactive.DjZURx_4.png",V=JSON.parse('{"title":"响应式原理总结","description":"","frontmatter":{"createTime":"2022/11/02","tag":"Vue源码"},"headers":[],"relativePath":"source/vue/reactive-principle/conclusion/index.md","filePath":"source/vue/reactive-principle/conclusion/index.md","lastUpdated":1667401036000}'),u={name:"source/vue/reactive-principle/conclusion/index.md"},v=a("h1",{id:"响应式原理总结",tabindex:"-1"},[c("响应式原理总结 "),a("a",{class:"header-anchor",href:"#响应式原理总结","aria-label":'Permalink to "响应式原理总结"'},"​")],-1),h=_('<ul><li>利用 Proxy 实现了对数据访问和修改的劫持 弥补了 Object.defineProperty 的不足</li><li>响应式的核心实现就是通过数据劫持 <ul><li>在访问数据的时候执行依赖收集</li><li>在修改数据的时候派发通知</li><li>收集的依赖是副作用函数 数据改变后就会触发副作用函数的自动执行</li></ul></li><li>把数据变成响应式 是为了数据在变化的时候自动执行一些逻辑</li><li>组件的渲染中就是让组件访问的数据一旦被修改 就会自动触发组件的重新渲染 实现数据驱动</li></ul><h2 id="vue2-响应式api实现和组件更新之间的关系" tabindex="-1">vue2 响应式API实现和组件更新之间的关系 <a class="header-anchor" href="#vue2-响应式api实现和组件更新之间的关系" aria-label="Permalink to &quot;vue2 响应式API实现和组件更新之间的关系&quot;">​</a></h2><p><img src="'+p+'" alt="图片"></p><h2 id="vue3-响应式api实现和组件更新之间的关系" tabindex="-1">vue3 响应式API实现和组件更新之间的关系 <a class="header-anchor" href="#vue3-响应式api实现和组件更新之间的关系" aria-label="Permalink to &quot;vue3 响应式API实现和组件更新之间的关系&quot;">​</a></h2><p><img src="'+d+'" alt="图片"></p>',5);function m(P,x,f,b,g,A){const i=t("ArticleMetadata"),o=t("ClientOnly");return l(),s("div",null,[v,e(o,null,{default:n(()=>[e(i)]),_:1}),h])}const C=r(u,[["render",m]]);export{V as __pageData,C as default};