import { resolveComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.6ab74304.js";
const __pageData = JSON.parse('{"title":"\u5728 npm script \u4E2D\u4F7F\u7528\u53D8\u91CF","description":"","frontmatter":{"createTime":"2022/11/03","tag":"\u5DE5\u7A0B\u5316,npm"},"headers":[{"level":2,"title":"\u4F7F\u7528\u9884\u5B9A\u4E49\u53D8\u91CF","slug":"\u4F7F\u7528\u9884\u5B9A\u4E49\u53D8\u91CF","link":"#\u4F7F\u7528\u9884\u5B9A\u4E49\u53D8\u91CF","children":[]}],"relativePath":"engineering/npm/npm-var/index.md","lastUpdated":1667489121000}');
const _sfc_main = { name: "engineering/npm/npm-var/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = resolveComponent("ClientOnly");
  const _component_ArticleMetadata = resolveComponent("ArticleMetadata");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="\u5728-npm-script-\u4E2D\u4F7F\u7528\u53D8\u91CF" tabindex="-1">\u5728 npm script \u4E2D\u4F7F\u7528\u53D8\u91CF <a class="header-anchor" href="#\u5728-npm-script-\u4E2D\u4F7F\u7528\u53D8\u91CF" aria-hidden="true">#</a></h1>`);
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
  _push(`<p>npm \u4E3A\u52A0\u9AD8\u6548\u7684\u6267\u884C npm script \u505A\u4E86\u5927\u91CF\u7684\u4F18\u5316\uFF0C\u521B\u5EFA\u5E76\u8FD0\u884C npm script \u547D\u4EE4 \u91CC\u9762\u8BB2\u5230\u7684\u73AF\u5883\u53D8\u91CF\u7279\u6027\u80FD\u8BA9\u6211\u4EEC\u5728 npm script \u4E2D\u76F4\u63A5\u8C03\u7528\u4F9D\u8D56\u5305\u91CC\u7684\u53EF\u6267\u884C\u6587\u4EF6\uFF0C\u66F4\u5F3A\u5927\u7684\u662F\uFF0Cnpm \u8FD8\u63D0\u4F9B\u4E86 $PATH \u4E4B\u5916\u7684\u66F4\u591A\u7684\u53D8\u91CF\uFF0C\u6BD4\u5982\u5F53\u524D\u6B63\u5728\u6267\u884C\u7684\u547D\u4EE4\u3001\u5305\u7684\u540D\u79F0\u548C\u7248\u672C\u53F7\u3001\u65E5\u5FD7\u8F93\u51FA\u7684\u7EA7\u522B\u7B49\u3002</p><p>DRY\uFF08Don&#39;t Repeat Yourself\uFF09\u662F\u57FA\u672C\u7684\u7F16\u7A0B\u539F\u5219\uFF0C\u5728 npm script \u4E2D\u4F7F\u7528\u9884\u5B9A\u4E49\u53D8\u91CF\u548C\u81EA\u5B9A\u4E49\u53D8\u91CF\u8BA9\u6211\u4EEC\u66F4\u5BB9\u6613\u9075\u4ECE DRY \u539F\u5219\uFF0C\u56E0\u4E3A\u4F7F\u7528\u8FD9\u4E9B\u53D8\u91CF\u4E4B\u540E\uFF0Cnpm script \u5C31\u5177\u5907\u4E86\u81EA\u9002\u5E94\u7684\u80FD\u529B\uFF0C\u6211\u4EEC\u53EF\u4EE5\u76F4\u63A5\u628A\u79EF\u7D2F\u8D77\u6765\u7684 npm script \u4F7F\u7528\u5230\u5176\u4ED6\u9879\u76EE\u91CC\u9762\uFF0C\u800C\u4E0D\u7528\u505A\u4EFB\u4F55\u4FEE\u6539\u3002</p><h2 id="\u4F7F\u7528\u9884\u5B9A\u4E49\u53D8\u91CF" tabindex="-1">\u4F7F\u7528\u9884\u5B9A\u4E49\u53D8\u91CF <a class="header-anchor" href="#\u4F7F\u7528\u9884\u5B9A\u4E49\u53D8\u91CF" aria-hidden="true">#</a></h2><p>\u9996\u5148\u6211\u4EEC\u6765\u770B\u9884\u5B9A\u4E49\u53D8\u91CF\uFF0C\u901A\u8FC7\u8FD0\u884C npm run env \u5C31\u80FD\u62FF\u5230\u5B8C\u6574\u7684\u53D8\u91CF\u5217\u8868\uFF0C\u8FD9\u4E2A\u5217\u8868\u975E\u5E38\u957F\uFF0C\u8FD9\u91CC\u6211\u4F7F\u7528 npm run env | grep npm_package | sort \u62FF\u5230\u90E8\u5206\u6392\u5E8F\u540E\u7684\u9884\u5B9A\u4E49\u73AF\u5883\u53D8\u91CF\uFF1A</p><p>\u53D8\u91CF\u7684\u4F7F\u7528\u65B9\u6CD5\u9075\u5FAA shell \u91CC\u9762\u7684\u8BED\u6CD5\uFF0C\u76F4\u63A5\u5728 npm script \u7ED9\u60F3\u8981\u5F15\u7528\u7684\u53D8\u91CF\u524D\u9762\u52A0\u4E0A $ \u7B26\u53F7\u5373\u53EF\u3002\u6BD4\u5982\uFF1A</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="vp-code-dark"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">  </span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&quot;dummy&quot;</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">: </span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&quot;echo $npm_package_name&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">}</span></span>
<span class="line"></span></code></pre><pre class="vp-code-light"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#F07178" })}">  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}">dummy</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">: </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}">echo $npm_package_name</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("engineering/npm/npm-var/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
