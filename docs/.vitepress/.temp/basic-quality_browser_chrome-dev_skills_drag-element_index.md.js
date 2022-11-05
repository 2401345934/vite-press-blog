import { resolveComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.6ab74304.js";
const _imports_0 = "/vite-press/assets/drag.317a11c1.png";
const __pageData = JSON.parse('{"title":"\u62D6\u52A8 & \u653E\u7F6E \u5143\u7D20","description":"","frontmatter":{"createTime":"2022/10/25","tag":"chrome"},"headers":[],"relativePath":"basic-quality/browser/chrome-dev/skills/drag-element/index.md","lastUpdated":1667281923000}');
const _sfc_main = { name: "basic-quality/browser/chrome-dev/skills/drag-element/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = resolveComponent("ClientOnly");
  const _component_ArticleMetadata = resolveComponent("ArticleMetadata");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="\u62D6\u52A8-\u653E\u7F6E-\u5143\u7D20" tabindex="-1">\u62D6\u52A8 &amp; \u653E\u7F6E \u5143\u7D20 <a class="header-anchor" href="#\u62D6\u52A8-\u653E\u7F6E-\u5143\u7D20" aria-hidden="true">#</a></h1>`);
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
  _push(`<p>\u5F53\u4F60\u60F3\u770B\u770B\u9875\u9762\u7684\u67D0\u4E00\u90E8\u5206\u5728 DOM \u6811\u7684\u4E0D\u540C\u4F4D\u7F6E\u7684\u663E\u793A\u6548\u679C\u65F6\uFF0C\u53EA\u9700\u8981\u62D6\u52A8\u653E\u7F6E\u5B83(\u5230\u6307\u5B9A\u7684\u4F4D\u7F6E)\uFF0C\u5C31\u50CF\u5728\u673A\u5668\u4E0A\u7684\u5176\u4ED6\u4EFB\u4F55\u5730\u65B9\u4E00\u6837 \u{1F603} <img${ssrRenderAttr("src", _imports_0)} alt="\u56FE\u7247"></p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("basic-quality/browser/chrome-dev/skills/drag-element/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
