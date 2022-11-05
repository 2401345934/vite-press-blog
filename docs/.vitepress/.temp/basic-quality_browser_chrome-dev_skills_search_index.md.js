import { resolveComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.6ab74304.js";
const __pageData = JSON.parse('{"title":"elements\uFF0C logs\uFF0C sources & network \u4E2D\u7684\u67E5\u627E","description":"","frontmatter":{"createTime":"2022/10/25","tag":"chrome"},"headers":[],"relativePath":"basic-quality/browser/chrome-dev/skills/search/index.md","lastUpdated":1667281923000}');
const _sfc_main = { name: "basic-quality/browser/chrome-dev/skills/search/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = resolveComponent("ClientOnly");
  const _component_ArticleMetadata = resolveComponent("ArticleMetadata");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="elements\uFF0C-logs\uFF0C-sources-network-\u4E2D\u7684\u67E5\u627E" tabindex="-1">elements\uFF0C logs\uFF0C sources &amp; network \u4E2D\u7684\u67E5\u627E <a class="header-anchor" href="#elements\uFF0C-logs\uFF0C-sources-network-\u4E2D\u7684\u67E5\u627E" aria-hidden="true">#</a></h1>`);
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
  _push(`<p>DevTools \u4E2D\u7684\u524D4\u4E2A\u4E3B\u8981\u7684\u9762\u677F\uFF0C\u6BCF\u4E00\u4E2A\u90FD\u652F\u6301 [ctrl] + [f] \u5FEB\u6377\u65B9\u5F0F\uFF0C\u4F60\u53EF\u4EE5\u4F7F\u7528\u5BF9\u5E94\u7684\u67E5\u8BE2\u65B9\u5F0F\u6765\u67E5\u627E\u4FE1\u606F:</p><ul><li>\u5728 Elements \u9762\u677F\u4E2D - \u901A\u8FC7 string \uFF0C\u9009\u62E9\u5668 \u6216\u8005 XPath \u6765\u67E5\u627E</li><li>\u800C\u5728 Console\uFF0C Network \u4EE5\u53CA Source \u9762\u677F - \u901A\u8FC7\u533A\u5206\u5927\u5C0F\u5199\uFF0C\u6216\u8005\u53EF\u4EE5\u88AB\u89C6\u4E3A\u8868\u8FBE\u5F0F\u7684 strings\uFF0C \u6765\u67E5\u627E</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("basic-quality/browser/chrome-dev/skills/search/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
