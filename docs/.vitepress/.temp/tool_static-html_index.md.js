import { resolveComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.6ab74304.js";
const __pageData = JSON.parse('{"title":"\u9759\u6001\u7AD9\u70B9\u90E8\u7F72","description":"","frontmatter":{"createTime":"2022/10/26","tag":"\u5DE5\u5177,\u90E8\u7F72"},"headers":[{"level":2,"title":"\u817E\u8BAF\u4E91","slug":"\u817E\u8BAF\u4E91","link":"#\u817E\u8BAF\u4E91","children":[]}],"relativePath":"tool/static-html/index.md","lastUpdated":1667281923000}');
const _sfc_main = { name: "tool/static-html/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = resolveComponent("ClientOnly");
  const _component_ArticleMetadata = resolveComponent("ArticleMetadata");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="\u9759\u6001\u7AD9\u70B9\u90E8\u7F72" tabindex="-1">\u9759\u6001\u7AD9\u70B9\u90E8\u7F72 <a class="header-anchor" href="#\u9759\u6001\u7AD9\u70B9\u90E8\u7F72" aria-hidden="true">#</a></h1>`);
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
  _push(`<h2 id="\u817E\u8BAF\u4E91" tabindex="-1">\u817E\u8BAF\u4E91 <a class="header-anchor" href="#\u817E\u8BAF\u4E91" aria-hidden="true">#</a></h2><p><a href="https://console.cloud.tencent.com/webify/index" target="_blank" rel="noreferrer">https://console.cloud.tencent.com/webify/index</a></p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("tool/static-html/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
