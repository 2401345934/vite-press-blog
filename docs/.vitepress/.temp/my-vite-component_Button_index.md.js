import { resolveComponent, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.6ab74304.js";
const __pageData = JSON.parse('{"title":"Button","description":"","frontmatter":{"createTime":"2022/10/30","tag":"Vite,\u7EC4\u4EF6\u5E93"},"headers":[{"level":2,"title":"\u4F55\u65F6\u4F7F\u7528","slug":"\u4F55\u65F6\u4F7F\u7528","link":"#\u4F55\u65F6\u4F7F\u7528","children":[]},{"level":2,"title":"\u4EE3\u7801\u6F14\u793A","slug":"\u4EE3\u7801\u6F14\u793A","link":"#\u4EE3\u7801\u6F14\u793A","children":[{"level":3,"title":"button","slug":"button-1","link":"#button-1","children":[]},{"level":3,"title":"disabled button","slug":"disabled-button","link":"#disabled-button","children":[]},{"level":3,"title":"\u5757button","slug":"\u5757button","link":"#\u5757button","children":[]}]},{"level":2,"title":"API","slug":"api","link":"#api","children":[{"level":3,"title":"\u5C5E\u6027\u8BF4\u660E","slug":"\u5C5E\u6027\u8BF4\u660E","link":"#\u5C5E\u6027\u8BF4\u660E","children":[]}]}],"relativePath":"my-vite-component/Button/index.md","lastUpdated":1667281923000}');
const _sfc_main = { name: "my-vite-component/Button/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = resolveComponent("ClientOnly");
  const _component_ArticleMetadata = resolveComponent("ArticleMetadata");
  const _component_AlanButton = resolveComponent("AlanButton");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="button" tabindex="-1">Button <a class="header-anchor" href="#button" aria-hidden="true">#</a></h1>`);
  _push(ssrRenderComponent(_component_ClientOnly, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_ArticleMetadata, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_ArticleMetadata)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<h2 id="\u4F55\u65F6\u4F7F\u7528" tabindex="-1">\u4F55\u65F6\u4F7F\u7528 <a class="header-anchor" href="#\u4F55\u65F6\u4F7F\u7528" aria-hidden="true">#</a></h2><p>\u6309\u94AE\u7528\u4E8E\u5F00\u59CB\u4E00\u4E2A\u5373\u65F6\u64CD\u4F5C\u3002 \u6807\u8BB0\u4E86\u4E00\u4E2A\uFF08\u6216\u5C01\u88C5\u4E00\u7EC4\uFF09\u64CD\u4F5C\u547D\u4EE4\uFF0C\u54CD\u5E94\u7528\u6237\u70B9\u51FB\u884C\u4E3A\uFF0C\u89E6\u53D1\u76F8\u5E94\u7684\u4E1A\u52A1\u903B\u8F91\u3002</p><h2 id="\u4EE3\u7801\u6F14\u793A" tabindex="-1">\u4EE3\u7801\u6F14\u793A <a class="header-anchor" href="#\u4EE3\u7801\u6F14\u793A" aria-hidden="true">#</a></h2><h3 id="button-1" tabindex="-1">button <a class="header-anchor" href="#button-1" aria-hidden="true">#</a></h3>`);
  _push(ssrRenderComponent(_component_AlanButton, { type: "primary" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`1231`);
      } else {
        return [
          createTextVNode("1231")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<h3 id="disabled-button" tabindex="-1">disabled button <a class="header-anchor" href="#disabled-button" aria-hidden="true">#</a></h3>`);
  _push(ssrRenderComponent(_component_AlanButton, { disabled: "" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`1231`);
      } else {
        return [
          createTextVNode("1231")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<h3 id="\u5757button" tabindex="-1">\u5757button <a class="header-anchor" href="#\u5757button" aria-hidden="true">#</a></h3>`);
  _push(ssrRenderComponent(_component_AlanButton, {
    block: "",
    type: "primary"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`1231`);
      } else {
        return [
          createTextVNode("1231")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<div class="language-tsx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="vp-code-dark"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">script</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">setup</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">import </span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">{</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> </span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">AlanButton</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> </span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">}</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> from &quot;@xiaomh/vue3-alan-vite-component&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">script</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">alan-button</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">type</span><span style="${ssrRenderStyle({ "color": "#56B6C2" })}">=</span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&quot;primary&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&gt;1231&lt;/</span><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">alan-button</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&gt;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><pre class="vp-code-light"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">script</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}"> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}">setup</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">import </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">{</span><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}"> AlanButton </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">}</span><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}"> from &quot;@xiaomh/vue3-alan-vite-component&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">script</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#FFCB6B" })}">alan-button</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}"> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}">type</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">=</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}">primary</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">1231</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#FFCB6B" })}">alan-button</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-hidden="true">#</a></h2><h3 id="\u5C5E\u6027\u8BF4\u660E" tabindex="-1">\u5C5E\u6027\u8BF4\u660E <a class="header-anchor" href="#\u5C5E\u6027\u8BF4\u660E" aria-hidden="true">#</a></h3><table><thead><tr><th style="${ssrRenderStyle({ "text-align": "center" })}">\u5C5E\u6027</th><th style="${ssrRenderStyle({ "text-align": "center" })}">\u8BF4\u660E</th><th style="${ssrRenderStyle({ "text-align": "center" })}">\u7C7B\u578B</th><th style="${ssrRenderStyle({ "text-align": "center" })}">\u9ED8\u8BA4\u503C</th><th style="${ssrRenderStyle({ "text-align": "center" })}">\u7248\u672C</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "text-align": "center" })}">block</td><td style="${ssrRenderStyle({ "text-align": "center" })}">\u5C06\u6309\u94AE\u5BBD\u5EA6\u8C03\u6574\u4E3A\u5176\u7236\u5BBD\u5EA6\u7684\u9009\u9879</td><td style="${ssrRenderStyle({ "text-align": "center" })}">boolean</td><td style="${ssrRenderStyle({ "text-align": "center" })}">false</td><td style="${ssrRenderStyle({ "text-align": "center" })}">1.0.11</td></tr><tr><td style="${ssrRenderStyle({ "text-align": "center" })}">disabled</td><td style="${ssrRenderStyle({ "text-align": "center" })}">\u6309\u94AE\u5931\u6548\u72B6\u6001</td><td style="${ssrRenderStyle({ "text-align": "center" })}">boolean</td><td style="${ssrRenderStyle({ "text-align": "center" })}">false</td><td style="${ssrRenderStyle({ "text-align": "center" })}">1.0.11</td></tr><tr><td style="${ssrRenderStyle({ "text-align": "center" })}">type</td><td style="${ssrRenderStyle({ "text-align": "center" })}">\u8BBE\u7F6E\u6309\u94AE\u7C7B\u578B</td><td style="${ssrRenderStyle({ "text-align": "center" })}">primary</td><td style="${ssrRenderStyle({ "text-align": "center" })}">default</td><td style="${ssrRenderStyle({ "text-align": "center" })}">default</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("my-vite-component/Button/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
