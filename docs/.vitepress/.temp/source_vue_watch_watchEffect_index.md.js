import { resolveComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.6ab74304.js";
const __pageData = JSON.parse('{"title":"watchEffect API","description":"","frontmatter":{"createTime":"2022/10/24","tag":"Vue\u6E90\u7801"},"headers":[{"level":2,"title":"watchEffect","slug":"watcheffect","link":"#watcheffect","children":[]},{"level":2,"title":"watchEffect \u548C watch  \u7684\u4E0D\u540C","slug":"watcheffect-\u548C-watch-\u7684\u4E0D\u540C","link":"#watcheffect-\u548C-watch-\u7684\u4E0D\u540C","children":[]},{"level":2,"title":"\u6CE8\u518C\u65E0\u6548\u56DE\u8C03\u51FD\u6570 onInvalidate","slug":"\u6CE8\u518C\u65E0\u6548\u56DE\u8C03\u51FD\u6570-oninvalidate","link":"#\u6CE8\u518C\u65E0\u6548\u56DE\u8C03\u51FD\u6570-oninvalidate","children":[]}],"relativePath":"source/vue/watch/watchEffect/index.md","lastUpdated":1667281923000}');
const _sfc_main = { name: "source/vue/watch/watchEffect/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = resolveComponent("ClientOnly");
  const _component_ArticleMetadata = resolveComponent("ArticleMetadata");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="watcheffect-api" tabindex="-1">watchEffect API <a class="header-anchor" href="#watcheffect-api" aria-hidden="true">#</a></h1>`);
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
  _push(`<h2 id="watcheffect" tabindex="-1">watchEffect <a class="header-anchor" href="#watcheffect" aria-hidden="true">#</a></h2><ul><li>\u4F5C\u7528\u662F\u6CE8\u518C \u4E00\u4E2A\u526F\u4F5C\u7528\u51FD\u6570 \u526F\u4F5C\u7528\u51FD\u6570\u5185\u90E8\u53EF\u4EE5\u8BBF\u95EE\u54CD\u5E94\u5F0F\u5BF9\u8C61</li><li>\u5F53\u54CD\u5E94\u5F0F\u5BF9\u8C61\u53D8\u5316 \u7ACB\u5373\u6267\u884C\u8FD9\u4E2A\u51FD\u6570</li></ul><h2 id="watcheffect-\u548C-watch-\u7684\u4E0D\u540C" tabindex="-1">watchEffect \u548C watch \u7684\u4E0D\u540C <a class="header-anchor" href="#watcheffect-\u548C-watch-\u7684\u4E0D\u540C" aria-hidden="true">#</a></h2><ul><li>\u76D1\u542C\u7684\u6E90\u4E0D\u540C <ul><li>watch \u53EF\u4EE5\u76D1\u542C\u4E00\u4E2A\u6216\u8005\u591A\u4E2A\u54CD\u5E94\u5F0F\u5BF9\u8C61 \u8FD8\u53EF\u4EE5\u76D1\u542C\u4E00\u4E2A getter \u51FD\u6570</li><li>watchEffect \u76D1\u542C\u7684\u662F\u4E00\u4E2A\u666E\u901A\u51FD\u6570 \u53EA\u8981\u5185\u90E8\u8BBF\u95EE\u4E86 \u54CD\u5E94\u5F0F\u5BF9\u8C61\u5373\u53EF \u8FD9\u4E2A\u51FD\u6570\u4E0D\u9700\u8981\u8FD4\u56DE\u54CD\u5E94\u5F0F\u5BF9\u8C61</li></ul></li><li>\u6CA1\u6709\u56DE\u8C03\u51FD\u6570 <ul><li>watchEffect \u6CA1\u6709\u56DE\u8C03\u51FD\u6570 \u5728\u526F\u4F5C\u7528\u51FD\u6570\u5185\u90E8 \u54CD\u5E94\u5F0F\u5BF9\u8C61\u53D1\u751F\u53D8\u5316 \u4F1A\u518D\u6B21\u6267\u884C\u8FD9\u4E2A\u526F\u4F5C\u7528\u51FD\u6570</li></ul></li><li>\u7ACB\u5373\u6267\u884C <ul><li>watchEffect \u5728\u521B\u5EFA\u597D watcher \u540E \u7ACB\u5373\u6267\u884C\u4ED6\u7684\u526F\u4F5C\u7528\u51FD\u6570</li><li>watch \u9700\u8981\u914D\u7F6E immediate \u4E3A true \u624D\u4F1A\u7ACB\u5373\u6267\u884C</li></ul></li><li>\u5185\u90E8\u4E5F\u662F\u901A\u8FC7 doWatch \u51FD\u6570\u5B9E\u73B0\u7684</li><li>getter \u51FD\u6570\u5C31\u662F\u5BF9 source \u51FD\u6570 \u7B80\u5355\u5C01\u88C5 \u4F1A\u5148\u5224\u65AD\u7EC4\u4EF6\u7684\u5B9E\u4F8B\u662F\u5426\u5DF2\u7ECF\u6CE8\u9500 \u7136\u540E\u6BCF\u6B21\u6267\u884C source \u51FD\u6570\u524D\u6267\u884C cleanup \u6E05\u7406\u51FD\u6570</li></ul><h2 id="\u6CE8\u518C\u65E0\u6548\u56DE\u8C03\u51FD\u6570-oninvalidate" tabindex="-1">\u6CE8\u518C\u65E0\u6548\u56DE\u8C03\u51FD\u6570 onInvalidate <a class="header-anchor" href="#\u6CE8\u518C\u65E0\u6548\u56DE\u8C03\u51FD\u6570-oninvalidate" aria-hidden="true">#</a></h2><ul><li>\u53EF\u4EE5\u5229\u7528 watchEffect \u6CE8\u518C\u4E00\u4E2A\u526F\u4F5C\u7528\u51FD\u6570 \u6709\u4E00\u4E2A onInvalidate \u53C2\u6570</li><li>\u51FD\u6570\u5185\u90E8\u901A\u8FC7 preformAsyncOperation \u6267\u884C\u67D0\u4E9B\u5F02\u6B65\u64CD\u4F5C \u5E76\u4E14\u8BBF\u95EE\u4E86 id \u8FD9\u4E2A\u54CD\u5E94\u5F0F\u5BF9\u8C61</li><li>\u7136\u540E\u901A\u8FC7 onInvalidate \u6CE8\u518C\u4E00\u4E2A\u56DE\u8C03\u51FD\u6570</li><li>\u68C0\u6D4B \u54CD\u5E94\u5F0F\u6570\u636E\u53D1\u751F\u53D8\u5316\u7684\u65F6\u5019 \u4F1A\u89E6\u53D1 getter \u51FD\u6570 \u6267\u884C cleanup \u51FD\u6570</li><li>\u5F53 watcher \u88AB\u9500\u6BC1\u7684\u65F6\u5019 \u6267\u884C onStop \u51FD\u6570 \u4E24\u8005\u90FD\u4F1A\u6267\u884C\u6CE8\u518C\u7684\u65E0\u6548\u56DE\u8C03\u51FD\u6570 fn</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("source/vue/watch/watchEffect/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
