import { resolveComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.6ab74304.js";
const __pageData = JSON.parse('{"title":"Store as global (\u5B58\u50A8\u4E3A\u4E00\u4E2A\u5168\u5C40\u53D8\u91CF)","description":"","frontmatter":{"createTime":"2022/10/25","tag":"chrome"},"headers":[],"relativePath":"basic-quality/browser/chrome-dev/skills/store-global/index.md","lastUpdated":1667281923000}');
const _sfc_main = { name: "basic-quality/browser/chrome-dev/skills/store-global/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = resolveComponent("ClientOnly");
  const _component_ArticleMetadata = resolveComponent("ArticleMetadata");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="store-as-global-\u5B58\u50A8\u4E3A\u4E00\u4E2A\u5168\u5C40\u53D8\u91CF" tabindex="-1">Store as global (\u5B58\u50A8\u4E3A\u4E00\u4E2A\u5168\u5C40\u53D8\u91CF) <a class="header-anchor" href="#store-as-global-\u5B58\u50A8\u4E3A\u4E00\u4E2A\u5168\u5C40\u53D8\u91CF" aria-hidden="true">#</a></h1>`);
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
  _push(`<ul><li>\u5982\u679C\u4F60\u5728 console \u4E2D\u6253\u5370\u4E86\u4E00\u5806\u6570\u636E (\u4F8B\u5982\u4F60\u5728 App \u4E2D\u8BA1\u7B97\u51FA\u6765\u7684\u4E00\u4E2A\u6570\u7EC4) \uFF0C\u7136\u540E\u4F60\u60F3\u5BF9\u8FD9\u4E9B\u6570\u636E\u505A\u4E00\u4E9B\u989D\u5916\u7684\u64CD\u4F5C\u6BD4\u5982\u6211\u4EEC\u521A\u521A\u8BF4\u7684 copy (\u5728\u4E0D\u5F71\u54CD\u5B83\u539F\u6765\u503C\u7684\u60C5\u51B5\u4E0B) \u3002</li><li>\u90A3\u5C31\u53EF\u4EE5\u5C06\u5B83\u8F6C\u6362\u6210\u4E00\u4E2A\u5168\u5C40\u53D8\u91CF\uFF0C\u53EA\u9700\u8981 \u53F3\u51FB \u5B83\uFF0C\u5E76\u9009\u62E9 \u201CStore as global variable\u201D (\u4FDD\u5B58\u4E3A\u5168\u5C40\u53D8\u91CF) \u9009\u9879\u3002</li><li>\u7B2C\u4E00\u6B21\u4F7F\u7528\u7684\u8BDD\uFF0C\u5B83\u4F1A\u521B\u5EFA\u4E00\u4E2A\u540D\u4E3A temp1 \u7684\u53D8\u91CF\uFF0C\u7B2C\u4E8C\u6B21\u521B\u5EFA temp2\uFF0C\u7B2C\u4E09\u6B21 ... \u3002\u901A\u8FC7\u4F7F\u7528\u8FD9\u4E9B\u53D8\u91CF\u6765\u64CD\u4F5C\u5BF9\u5E94\u7684\u6570\u636E\uFF0C\u4E0D\u7528\u518D\u62C5\u5FC3\u5F71\u54CD\u5230\u4ED6\u4EEC\u539F\u6765\u7684\u503C:</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("basic-quality/browser/chrome-dev/skills/store-global/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
