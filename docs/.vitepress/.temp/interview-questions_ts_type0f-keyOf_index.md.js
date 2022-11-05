import { resolveComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.6ab74304.js";
const __pageData = JSON.parse('{"title":"type of \u548C key of \u7684\u533A\u522B","description":"","frontmatter":{"createTime":"2022/10/18","tag":"ts"},"headers":[],"relativePath":"interview-questions/ts/type0f-keyOf/index.md","lastUpdated":1667281923000}');
const _sfc_main = { name: "interview-questions/ts/type0f-keyOf/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = resolveComponent("ClientOnly");
  const _component_ArticleMetadata = resolveComponent("ArticleMetadata");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="type-of-\u548C-key-of-\u7684\u533A\u522B" tabindex="-1">type of \u548C key of \u7684\u533A\u522B <a class="header-anchor" href="#type-of-\u548C-key-of-\u7684\u533A\u522B" aria-hidden="true">#</a></h1>`);
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
  _push(`<ul><li>typeof \u64CD\u4F5C\u7B26\u53EF\u4EE5\u7528\u6765\u83B7\u53D6\u4E00\u4E2A\u53D8\u91CF\u6216\u5BF9\u8C61\u7684\u7C7B\u578B</li><li>typeof\u64CD\u4F5C\u7B26\u53EF\u4EE5\u7528\u6765\u5224\u65AD\u6570\u636E\u7684\u7C7B \u578B\u662F\u5426\u662F\u67D0\u4E2A\u539F\u59CB\u7C7B\u578B\uFF08number\u3001string\u3001boolean,...\uFF09\u548C\u5BF9\u8C61\u7C7B\u578B\u3002</li><li>keyof \u68C0\u67E5\u952E\u662F\u5426\u5B58\u5728 \u83B7\u53D6\u67D0\u79CD\u7C7B\u578B\u7684\u6240\u6709\u952E \u8FD4\u56DE\u8054\u5408\u7C7B\u578B</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("interview-questions/ts/type0f-keyOf/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
