import { resolveComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.6ab74304.js";
const _imports_0 = "/vite-press/assets/vue2-reactive.63d179f9.png";
const _imports_1 = "/vite-press/assets/vue3-reactive.1a8cf36c.png";
const __pageData = JSON.parse('{"title":"\u54CD\u5E94\u5F0F\u539F\u7406\u603B\u7ED3","description":"","frontmatter":{"createTime":"2022/11/02","tag":"Vue\u6E90\u7801"},"headers":[{"level":2,"title":"vue2 \u54CD\u5E94\u5F0FAPI\u5B9E\u73B0\u548C\u7EC4\u4EF6\u66F4\u65B0\u4E4B\u95F4\u7684\u5173\u7CFB","slug":"vue2-\u54CD\u5E94\u5F0Fapi\u5B9E\u73B0\u548C\u7EC4\u4EF6\u66F4\u65B0\u4E4B\u95F4\u7684\u5173\u7CFB","link":"#vue2-\u54CD\u5E94\u5F0Fapi\u5B9E\u73B0\u548C\u7EC4\u4EF6\u66F4\u65B0\u4E4B\u95F4\u7684\u5173\u7CFB","children":[]},{"level":2,"title":"vue3 \u54CD\u5E94\u5F0FAPI\u5B9E\u73B0\u548C\u7EC4\u4EF6\u66F4\u65B0\u4E4B\u95F4\u7684\u5173\u7CFB","slug":"vue3-\u54CD\u5E94\u5F0Fapi\u5B9E\u73B0\u548C\u7EC4\u4EF6\u66F4\u65B0\u4E4B\u95F4\u7684\u5173\u7CFB","link":"#vue3-\u54CD\u5E94\u5F0Fapi\u5B9E\u73B0\u548C\u7EC4\u4EF6\u66F4\u65B0\u4E4B\u95F4\u7684\u5173\u7CFB","children":[]}],"relativePath":"source/vue/reactive-principle/conclusion/index.md","lastUpdated":1667401036000}');
const _sfc_main = { name: "source/vue/reactive-principle/conclusion/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = resolveComponent("ClientOnly");
  const _component_ArticleMetadata = resolveComponent("ArticleMetadata");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="\u54CD\u5E94\u5F0F\u539F\u7406\u603B\u7ED3" tabindex="-1">\u54CD\u5E94\u5F0F\u539F\u7406\u603B\u7ED3 <a class="header-anchor" href="#\u54CD\u5E94\u5F0F\u539F\u7406\u603B\u7ED3" aria-hidden="true">#</a></h1>`);
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
  _push(`<ul><li>\u5229\u7528 Proxy \u5B9E\u73B0\u4E86\u5BF9\u6570\u636E\u8BBF\u95EE\u548C\u4FEE\u6539\u7684\u52AB\u6301 \u5F25\u8865\u4E86 Object.defineProperty \u7684\u4E0D\u8DB3</li><li>\u54CD\u5E94\u5F0F\u7684\u6838\u5FC3\u5B9E\u73B0\u5C31\u662F\u901A\u8FC7\u6570\u636E\u52AB\u6301 <ul><li>\u5728\u8BBF\u95EE\u6570\u636E\u7684\u65F6\u5019\u6267\u884C\u4F9D\u8D56\u6536\u96C6</li><li>\u5728\u4FEE\u6539\u6570\u636E\u7684\u65F6\u5019\u6D3E\u53D1\u901A\u77E5</li><li>\u6536\u96C6\u7684\u4F9D\u8D56\u662F\u526F\u4F5C\u7528\u51FD\u6570 \u6570\u636E\u6539\u53D8\u540E\u5C31\u4F1A\u89E6\u53D1\u526F\u4F5C\u7528\u51FD\u6570\u7684\u81EA\u52A8\u6267\u884C</li></ul></li><li>\u628A\u6570\u636E\u53D8\u6210\u54CD\u5E94\u5F0F \u662F\u4E3A\u4E86\u6570\u636E\u5728\u53D8\u5316\u7684\u65F6\u5019\u81EA\u52A8\u6267\u884C\u4E00\u4E9B\u903B\u8F91</li><li>\u7EC4\u4EF6\u7684\u6E32\u67D3\u4E2D\u5C31\u662F\u8BA9\u7EC4\u4EF6\u8BBF\u95EE\u7684\u6570\u636E\u4E00\u65E6\u88AB\u4FEE\u6539 \u5C31\u4F1A\u81EA\u52A8\u89E6\u53D1\u7EC4\u4EF6\u7684\u91CD\u65B0\u6E32\u67D3 \u5B9E\u73B0\u6570\u636E\u9A71\u52A8</li></ul><h2 id="vue2-\u54CD\u5E94\u5F0Fapi\u5B9E\u73B0\u548C\u7EC4\u4EF6\u66F4\u65B0\u4E4B\u95F4\u7684\u5173\u7CFB" tabindex="-1">vue2 \u54CD\u5E94\u5F0FAPI\u5B9E\u73B0\u548C\u7EC4\u4EF6\u66F4\u65B0\u4E4B\u95F4\u7684\u5173\u7CFB <a class="header-anchor" href="#vue2-\u54CD\u5E94\u5F0Fapi\u5B9E\u73B0\u548C\u7EC4\u4EF6\u66F4\u65B0\u4E4B\u95F4\u7684\u5173\u7CFB" aria-hidden="true">#</a></h2><p><img${ssrRenderAttr("src", _imports_0)} alt="\u56FE\u7247"></p><h2 id="vue3-\u54CD\u5E94\u5F0Fapi\u5B9E\u73B0\u548C\u7EC4\u4EF6\u66F4\u65B0\u4E4B\u95F4\u7684\u5173\u7CFB" tabindex="-1">vue3 \u54CD\u5E94\u5F0FAPI\u5B9E\u73B0\u548C\u7EC4\u4EF6\u66F4\u65B0\u4E4B\u95F4\u7684\u5173\u7CFB <a class="header-anchor" href="#vue3-\u54CD\u5E94\u5F0Fapi\u5B9E\u73B0\u548C\u7EC4\u4EF6\u66F4\u65B0\u4E4B\u95F4\u7684\u5173\u7CFB" aria-hidden="true">#</a></h2><p><img${ssrRenderAttr("src", _imports_1)} alt="\u56FE\u7247"></p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("source/vue/reactive-principle/conclusion/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
