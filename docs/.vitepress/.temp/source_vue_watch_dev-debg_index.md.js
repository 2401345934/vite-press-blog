import { resolveComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.6ab74304.js";
const __pageData = JSON.parse('{"title":"\u5F00\u53D1\u73AF\u5883 \u4FA6\u542C\u5668\u8C03\u8BD5","description":"","frontmatter":{"createTime":"2022/10/24","tag":"Vue\u6E90\u7801"},"headers":[{"level":2,"title":"onTrack","slug":"ontrack","link":"#ontrack","children":[]},{"level":2,"title":"onTrigger","slug":"ontrigger","link":"#ontrigger","children":[]}],"relativePath":"source/vue/watch/dev-debg/index.md","lastUpdated":1667281923000}');
const _sfc_main = { name: "source/vue/watch/dev-debg/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = resolveComponent("ClientOnly");
  const _component_ArticleMetadata = resolveComponent("ArticleMetadata");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="\u5F00\u53D1\u73AF\u5883-\u4FA6\u542C\u5668\u8C03\u8BD5" tabindex="-1">\u5F00\u53D1\u73AF\u5883 \u4FA6\u542C\u5668\u8C03\u8BD5 <a class="header-anchor" href="#\u5F00\u53D1\u73AF\u5883-\u4FA6\u542C\u5668\u8C03\u8BD5" aria-hidden="true">#</a></h1>`);
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
  _push(`<h2 id="ontrack" tabindex="-1">onTrack <a class="header-anchor" href="#ontrack" aria-hidden="true">#</a></h2><ul><li>\u5F53\u89C2\u6D4B\u7684\u54CD\u5E94\u5F0F\u5BF9\u8C61\u88AB\u8BBF\u95EE\u7684\u65F6\u5019 \u4F1A\u89E6\u53D1 onTrack\u56DE\u8C03\u51FD\u6570</li><li>\u4F1A\u63A5\u53D7\u4E00\u4E2A\u5305\u542B\u6709\u5173\u4F9D\u8D56\u7EC6\u817B\u4E0B\u7684\u8C03\u8BD5\u5668\u4E8B\u4EF6</li></ul><h2 id="ontrigger" tabindex="-1">onTrigger <a class="header-anchor" href="#ontrigger" aria-hidden="true">#</a></h2><ul><li><p>\u5F53\u54CD\u5E94\u5F0F\u5BF9\u8C61\u88AB\u4FEE\u6539\u7684\u65F6\u5019 \u4F1A\u89E6\u53D1 onTrigger \u56DE\u8C03\u51FD\u6570</p></li><li><p>\u4F1A\u63A5\u53D7\u4E00\u4E2A\u5305\u542B\u6709\u5173\u4F9D\u8D56\u7EC6\u817B\u4E0B\u7684\u8C03\u8BD5\u5668\u4E8B\u4EF6</p></li><li><p>\u4FA6\u542C\u5668\u521B\u5EFA\u7684\u8FC7\u7A0B\u4E2D \u5185\u90E8\u4F1A\u521B\u5EFA\u526F\u4F5C\u7528\u51FD\u6570 runner</p></li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("source/vue/watch/dev-debg/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
