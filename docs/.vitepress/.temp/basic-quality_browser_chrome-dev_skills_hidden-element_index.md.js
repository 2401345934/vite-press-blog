import { resolveComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.6ab74304.js";
const __pageData = JSON.parse('{"title":"\u5FEB\u901F\u9690\u85CF\u5143\u7D20  h","description":"","frontmatter":{"createTime":"2022/10/25","tag":"chrome"},"headers":[],"relativePath":"basic-quality/browser/chrome-dev/skills/hidden-element/index.md","lastUpdated":1667281923000}');
const _sfc_main = { name: "basic-quality/browser/chrome-dev/skills/hidden-element/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = resolveComponent("ClientOnly");
  const _component_ArticleMetadata = resolveComponent("ArticleMetadata");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="\u5FEB\u901F\u9690\u85CF\u5143\u7D20-h" tabindex="-1">\u5FEB\u901F\u9690\u85CF\u5143\u7D20 h <a class="header-anchor" href="#\u5FEB\u901F\u9690\u85CF\u5143\u7D20-h" aria-hidden="true">#</a></h1>`);
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
  _push(`<ol><li>\u901A\u8FC7 &#39;h&#39; \u6765\u9690\u85CF\u5143\u7D20 \u6309\u4E00\u4E0B &#39;h&#39; \u5C31\u53EF\u4EE5\u9690\u85CF\u4F60\u5728\u5143\u7D20\u9762\u677F\u4E2D\u9009\u62E9\u7684\u5143\u7D20\u3002\u518D\u6B21\u6309\u4E0B &#39;h&#39; \u53EF\u4EE5\u4F7F\u5B83\u51FA\u73B0\u3002\u67D0\u4E9B\u7684\u65F6\u5019\u8FD9\u5F88\u6709\u7528\uFF1A\u4F8B\u5982\u4F60\u60F3\u622A\u56FE\uFF0C\u4F46\u4F60\u60F3\u53BB\u6389\u91CC\u9762\u7684\u654F\u611F\u4FE1\u606F\u3002</li></ol></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("basic-quality/browser/chrome-dev/skills/hidden-element/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
