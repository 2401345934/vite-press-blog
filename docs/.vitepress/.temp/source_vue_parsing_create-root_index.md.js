import { resolveComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.6ab74304.js";
const __pageData = JSON.parse('{"title":"\u521B\u5EFA AST \u6839\u8282\u70B9","description":"","frontmatter":{"createTime":"2022/10/30","tag":"Vue\u6E90\u7801"},"headers":[{"level":2,"title":"createRoot","slug":"createroot","link":"#createroot","children":[]}],"relativePath":"source/vue/parsing/create-root/index.md","lastUpdated":1667281923000}');
const _sfc_main = { name: "source/vue/parsing/create-root/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = resolveComponent("ClientOnly");
  const _component_ArticleMetadata = resolveComponent("ArticleMetadata");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="\u521B\u5EFA-ast-\u6839\u8282\u70B9" tabindex="-1">\u521B\u5EFA AST \u6839\u8282\u70B9 <a class="header-anchor" href="#\u521B\u5EFA-ast-\u6839\u8282\u70B9" aria-hidden="true">#</a></h1>`);
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
  _push(`<ul><li>\u5B50\u8282\u70B9\u89E3\u6790\u5B8C\u6BD5 baseParse \u8FC7\u7A0B\u5C31\u5269\u6700\u540E\u4E00\u6B65\u521B\u5EFA AST \u6839\u8282\u70B9</li></ul><h2 id="createroot" tabindex="-1">createRoot <a class="header-anchor" href="#createroot" aria-hidden="true">#</a></h2><ul><li>createRoot \u4F1A\u8FD4\u56DE\u4E00\u4E2A js \u5BF9\u8C61\u4F5C\u4E3A AST \u7684\u6839\u8282\u70B9 <ul><li>type \uFF1A 0 \u8868\u793A\u662F\u4E00\u4E2A\u6839\u8282\u70B9\u7C7B\u578B</li><li>children\uFF1A \u5C31\u662F\u524D\u9762\u89E3\u6790\u7684 \u5B50\u8282\u70B9 nodes \u6570\u7EC4</li></ul></li><li>\u6839\u8282\u70B9\u8FD8\u6DFB\u52A0\u4E86\u5176\u4ED6\u7684\u5C5E\u6027</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("source/vue/parsing/create-root/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
