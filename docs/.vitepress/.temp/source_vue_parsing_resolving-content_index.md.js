import { resolveComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.6ab74304.js";
const __pageData = JSON.parse('{"title":"\u521B\u5EFA\u89E3\u6790\u4E0A\u4E0B\u6587","description":"","frontmatter":{"createTime":"2022/10/30","tag":"Vue\u6E90\u7801"},"headers":[{"level":2,"title":"createParserContext","slug":"createparsercontext","link":"#createparsercontext","children":[]}],"relativePath":"source/vue/parsing/resolving-content/index.md","lastUpdated":1667281923000}');
const _sfc_main = { name: "source/vue/parsing/resolving-content/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = resolveComponent("ClientOnly");
  const _component_ArticleMetadata = resolveComponent("ArticleMetadata");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="\u521B\u5EFA\u89E3\u6790\u4E0A\u4E0B\u6587" tabindex="-1">\u521B\u5EFA\u89E3\u6790\u4E0A\u4E0B\u6587 <a class="header-anchor" href="#\u521B\u5EFA\u89E3\u6790\u4E0A\u4E0B\u6587" aria-hidden="true">#</a></h1>`);
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
  _push(`<h2 id="createparsercontext" tabindex="-1">createParserContext <a class="header-anchor" href="#createparsercontext" aria-hidden="true">#</a></h2><ul><li>\u89E3\u6790\u4E0A\u4E0B\u6587\u5B9E\u9645\u5C31\u662F\u4E00\u4E2A js \u5BF9\u8C61 \u7EF4\u62A4\u7740\u89E3\u6790\u8FC7\u7A0B\u4E2D\u7684\u4E0A\u4E0B\u6587</li><li>options \u8868\u793A \u89E3\u6790\u76F8\u5173\u914D\u7F6E <ul><li>\u4F1A\u6839\u636E\u4F20\u5165\u7684\u914D\u7F6E\u548C\u9ED8\u8BA4\u7684\u914D\u7F6E\u505A\u4E00\u4E9B\u5408\u5E76</li><li>\u5728\u540E\u7EED\u89E3\u6790\u7684\u8FC7\u7A0B\u4E2D \u4F1A\u59CB\u7EC8\u7EF4\u62A4\u548C\u66F4\u65B0\u8FD9\u4E2A\u89E3\u6790\u4E0A\u4E0B\u6587</li><li>\u8868\u793A\u5F53\u524D\u89E3\u6790\u7684\u72B6\u6001</li></ul></li><li>\u521B\u5EFA\u5B8C\u89E3\u6790\u4E0A\u4E0B\u6587\u4E4B\u540E \u5F00\u59CB\u89E3\u6790\u5B50\u8282\u70B9</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("source/vue/parsing/resolving-content/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
