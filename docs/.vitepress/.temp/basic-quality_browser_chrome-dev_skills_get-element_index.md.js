import { resolveComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.6ab74304.js";
const __pageData = JSON.parse('{"title":"$0","description":"","frontmatter":{"createTime":"2022/10/25","tag":"chrome"},"headers":[{"level":2,"title":"\u9996\u5148\u9009\u4E2D\u67D0\u4E2A\u5143\u7D20","slug":"\u9996\u5148\u9009\u4E2D\u67D0\u4E2A\u5143\u7D20","link":"#\u9996\u5148\u9009\u4E2D\u67D0\u4E2A\u5143\u7D20","children":[]}],"relativePath":"basic-quality/browser/chrome-dev/skills/get-element/index.md","lastUpdated":1667281923000}');
const _sfc_main = { name: "basic-quality/browser/chrome-dev/skills/get-element/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = resolveComponent("ClientOnly");
  const _component_ArticleMetadata = resolveComponent("ArticleMetadata");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="_0" tabindex="-1">$0 <a class="header-anchor" href="#_0" aria-hidden="true">#</a></h1>`);
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
  _push(`<h2 id="\u9996\u5148\u9009\u4E2D\u67D0\u4E2A\u5143\u7D20" tabindex="-1">\u9996\u5148\u9009\u4E2D\u67D0\u4E2A\u5143\u7D20 <a class="header-anchor" href="#\u9996\u5148\u9009\u4E2D\u67D0\u4E2A\u5143\u7D20" aria-hidden="true">#</a></h2><p>\u7136\u540E\u5728 \u63A7\u5236\u53F0 \u76F4\u63A5 $0 \u5C31\u53EF\u4EE5\u62FF\u5230</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("basic-quality/browser/chrome-dev/skills/get-element/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
