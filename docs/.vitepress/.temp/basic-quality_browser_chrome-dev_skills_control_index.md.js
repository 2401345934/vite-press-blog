import { resolveComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.6ab74304.js";
const _imports_0 = "/vite-press/assets/control.beaabc9b.png";
const __pageData = JSON.parse('{"title":"\u4F7F\u7528 control (\u6309\u94AE) \u6765\u79FB\u52A8\u5143\u7D20","description":"","frontmatter":{"createTime":"2022/10/25","tag":"chrome"},"headers":[],"relativePath":"basic-quality/browser/chrome-dev/skills/control/index.md","lastUpdated":1667281923000}');
const _sfc_main = { name: "basic-quality/browser/chrome-dev/skills/control/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = resolveComponent("ClientOnly");
  const _component_ArticleMetadata = resolveComponent("ArticleMetadata");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="\u4F7F\u7528-control-\u6309\u94AE-\u6765\u79FB\u52A8\u5143\u7D20" tabindex="-1">\u4F7F\u7528 control (\u6309\u94AE) \u6765\u79FB\u52A8\u5143\u7D20 <a class="header-anchor" href="#\u4F7F\u7528-control-\u6309\u94AE-\u6765\u79FB\u52A8\u5143\u7D20" aria-hidden="true">#</a></h1>`);
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
  _push(`<p>\u5982\u679C\u4F60\u53EA\u662F\u60F3\u79FB\u52A8\u4F60\u5F53\u524D\u9009\u4E2D\u7684\u5143\u7D20\uFF0C\u5728 DOM \u7ED3\u6784\u4E2D\u5F80\u4E0A\u632A\u4E00\u70B9\u6216\u8005\u5F80\u4E0B\u632A\u4E00\u70B9\uFF0C\u800C\u4E0D\u662F\u62D6\u52A8\u548C\u653E\u7F6E\uFF0C\u4F60\u540C\u6837\u53EF\u4EE5\u4F7F\u7528[ctrl] + [\u2B06] / [ctrl] + [\u2B07] ([\u2318] + [\u2B06] / [\u2318] + [\u2B07] on Mac). <img${ssrRenderAttr("src", _imports_0)} alt="\u56FE\u7247"></p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("basic-quality/browser/chrome-dev/skills/control/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
