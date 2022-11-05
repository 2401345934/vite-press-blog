import { resolveComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.6ab74304.js";
const __pageData = JSON.parse('{"title":"$i  \u63A7\u5236\u53F0\u4E2D\u5B89\u88C5\u63D2\u4EF6","description":"","frontmatter":{"createTime":"2022/10/25","tag":"chrome"},"headers":[{"level":2,"title":"\u4E0B\u8F7D\u63D2\u4EF6","slug":"\u4E0B\u8F7D\u63D2\u4EF6","link":"#\u4E0B\u8F7D\u63D2\u4EF6","children":[]},{"level":2,"title":"\u6CE8\u610F \u6709\u7684\u7F51\u7AD9\u5C4F\u853D\u4E86","slug":"\u6CE8\u610F-\u6709\u7684\u7F51\u7AD9\u5C4F\u853D\u4E86","link":"#\u6CE8\u610F-\u6709\u7684\u7F51\u7AD9\u5C4F\u853D\u4E86","children":[]}],"relativePath":"basic-quality/browser/chrome-dev/skills/$i-install/index.md","lastUpdated":1667281923000}');
const _sfc_main = { name: "basic-quality/browser/chrome-dev/skills/$i-install/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = resolveComponent("ClientOnly");
  const _component_ArticleMetadata = resolveComponent("ArticleMetadata");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="i-\u63A7\u5236\u53F0\u4E2D\u5B89\u88C5\u63D2\u4EF6" tabindex="-1">$i \u63A7\u5236\u53F0\u4E2D\u5B89\u88C5\u63D2\u4EF6 <a class="header-anchor" href="#i-\u63A7\u5236\u53F0\u4E2D\u5B89\u88C5\u63D2\u4EF6" aria-hidden="true">#</a></h1>`);
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
  _push(`<h2 id="\u4E0B\u8F7D\u63D2\u4EF6" tabindex="-1">\u4E0B\u8F7D\u63D2\u4EF6 <a class="header-anchor" href="#\u4E0B\u8F7D\u63D2\u4EF6" aria-hidden="true">#</a></h2><p><a href="https://chrome.google.com/webstore/detail/console-importer/hgajpakhafplebkdljleajgbpdmplhie/related" target="_blank" rel="noreferrer">https://chrome.google.com/webstore/detail/console-importer/hgajpakhafplebkdljleajgbpdmplhie/related</a> \u8FD0\u884C $i(&#39;lodash&#39;) \u6216\u8005 $i(&#39;moment&#39;) \u51E0\u79D2\u949F\u540E\uFF0C\u4F60\u5C31\u53EF\u4EE5\u83B7\u53D6\u5230 lodash / momentjs \u4E86:</p><h2 id="\u6CE8\u610F-\u6709\u7684\u7F51\u7AD9\u5C4F\u853D\u4E86" tabindex="-1">\u6CE8\u610F \u6709\u7684\u7F51\u7AD9\u5C4F\u853D\u4E86 <a class="header-anchor" href="#\u6CE8\u610F-\u6709\u7684\u7F51\u7AD9\u5C4F\u853D\u4E86" aria-hidden="true">#</a></h2></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("basic-quality/browser/chrome-dev/skills/$i-install/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
