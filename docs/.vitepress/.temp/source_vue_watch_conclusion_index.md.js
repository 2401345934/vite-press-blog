import { resolveComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.6ab74304.js";
const __pageData = JSON.parse('{"title":"\u76D1\u542C\u5668\u603B\u7ED3\u603B\u7ED3","description":"","frontmatter":{"createTime":"2022/10/24","tag":"Vue\u6E90\u7801"},"headers":[],"relativePath":"source/vue/watch/conclusion/index.md","lastUpdated":1667401036000}');
const _sfc_main = { name: "source/vue/watch/conclusion/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = resolveComponent("ClientOnly");
  const _component_ArticleMetadata = resolveComponent("ArticleMetadata");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="\u76D1\u542C\u5668\u603B\u7ED3\u603B\u7ED3" tabindex="-1">\u76D1\u542C\u5668\u603B\u7ED3\u603B\u7ED3 <a class="header-anchor" href="#\u76D1\u542C\u5668\u603B\u7ED3\u603B\u7ED3" aria-hidden="true">#</a></h1>`);
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
  _push(`<ul><li>\u4FA6\u542C\u5668\u7528\u4E8E\u89C2\u6D4B\u54CD\u5E94\u5F0F\u6570\u636E\u7684\u53D8\u5316 \u7136\u540E\u6267\u884C\u6267\u884C\u67D0\u4E9B\u903B\u8F91 \u6267\u884C\u4E5F\u5206\u591A\u949F <ul><li>\u540C\u6B65\u6267\u884C</li><li>\u6E32\u67D3\u524D\u6267\u884C</li><li>\u6E32\u67D3\u540E\u6267\u884C</li></ul></li><li>\u5373\u4F7F \u4FA6\u542C\u5668\u89C2\u6D4B\u7684\u54CD\u5E94\u5F0F\u6570\u636E\u5728\u540C\u4E00\u4E2A Tick \u88AB\u591A\u6B21\u4FEE\u6539 \u975E\u540C\u6B65\u7684\u60C5\u51B5\u4E0B \u56DE\u8C03\u51FD\u6570\u53EA\u4F1A\u8C03\u7528\u4E00\u6B21</li><li>\u5F53\u4FA6\u542C\u5668\u6267\u884C\u65B9\u5F0F\u662F post \u5185\u90E8\u7684 effect runner \u4F1A\u63A8\u5165 vue \u5185\u90E8\u5B9E\u73B0\u7684\u5F02\u6B65\u961F\u5217</li><li>\u4FA6\u542C\u5668\u53EF\u4EE5\u968F\u65F6\u9500\u6BC1 \u4E5F\u53EF\u4EE5\u5728\u5F00\u53D1\u73AF\u5883\u4E0B\u8C03\u8BD5</li><li>\u4FA6\u542C\u5668\u5185\u90E8\u901A\u8FC7 new ReactiveEffect \u521B\u5EFA\u7684 effect \u5BF9\u8C61\u6765\u5B9E\u73B0\u5BF9\u54CD\u5E94\u5F0F\u6570\u636E\u53D8\u5316\u7684\u8BA2\u9605 <ul><li>\u66F4\u9002\u5408\u5728\u6570\u636E\u53D8\u5316\u4E4B\u540E\u6267\u884C\u67D0\u4E9B\u903B\u8F91</li><li>\u8BA1\u7B97\u5C5E\u6027\u7528\u4E8E\u4E00\u4E2A\u6570\u636E\u4F9D\u8D56\u53E6\u5916\u4E00\u4E9B\u6570\u636E\u800C\u6765\u7684\u573A\u666F</li></ul></li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("source/vue/watch/conclusion/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
