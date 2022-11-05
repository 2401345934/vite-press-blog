import { resolveComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.6ab74304.js";
const __pageData = JSON.parse('{"title":"\u538B\u7F29\u56FE\u7247","description":"","frontmatter":{"createTime":"2022/10/26","tag":"\u5DE5\u5177"},"headers":[{"level":2,"title":"IIMG","slug":"iimg","link":"#iimg","children":[]}],"relativePath":"tool/compressed-image/index.md","lastUpdated":1667281923000}');
const _sfc_main = { name: "tool/compressed-image/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = resolveComponent("ClientOnly");
  const _component_ArticleMetadata = resolveComponent("ArticleMetadata");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="\u538B\u7F29\u56FE\u7247" tabindex="-1">\u538B\u7F29\u56FE\u7247 <a class="header-anchor" href="#\u538B\u7F29\u56FE\u7247" aria-hidden="true">#</a></h1>`);
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
  _push(`<h2 id="iimg" tabindex="-1">IIMG <a class="header-anchor" href="#iimg" aria-hidden="true">#</a></h2><p><a href="https://www.iloveimg.com/zh-cn/compress-image" target="_blank" rel="noreferrer">https://www.iloveimg.com/zh-cn/compress-image</a></p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("tool/compressed-image/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
