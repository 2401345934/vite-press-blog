import { resolveComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.6ab74304.js";
const __pageData = JSON.parse('{"title":"\u6A21\u7248\u89E3\u6790\u603B\u7ED3","description":"","frontmatter":{"createTime":"2022/10/30","tag":"Vue\u6E90\u7801"},"headers":[],"relativePath":"source/vue/parsing/conclusion/index.md","lastUpdated":1667401036000}');
const _sfc_main = { name: "source/vue/parsing/conclusion/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = resolveComponent("ClientOnly");
  const _component_ArticleMetadata = resolveComponent("ArticleMetadata");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="\u6A21\u7248\u89E3\u6790\u603B\u7ED3" tabindex="-1">\u6A21\u7248\u89E3\u6790\u603B\u7ED3 <a class="header-anchor" href="#\u6A21\u7248\u89E3\u6790\u603B\u7ED3" aria-hidden="true">#</a></h1>`);
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
  _push(`<ul><li>\u6A21\u7248\u89E3\u6790\u662F vue \u7F16\u8BD1\u8FC7\u7A0B\u7684\u7B2C\u4E00\u6B65 \u628A template \u89E3\u6790\u751F\u6210 AST\u5BF9\u8C61</li><li>\u6574\u4E2A\u89E3\u6790\u8FC7\u7A0B\u662F\u4E00\u4E2A\u81EA\u9876\u5411\u4E0B\u7684\u5206\u6790\u8FC7\u7A0B <ul><li>\u4E5F\u5C31\u662F\u4ECE\u4EE3\u7801\u5F00\u59CB\u6839\u636E\u5F53\u524D\u89E3\u6790\u7684\u4E0A\u4E0B\u6587 \u901A\u8FC7\u5206\u6790\u8BCD\u6CD5\u6765\u5206\u6790\u5F53\u524D\u7684\u4EE3\u7801</li><li>\u5E76\u627E\u5230\u5BF9\u5E94\u7684\u89E3\u6790\u5904\u7406\u903B\u8F91 \u521B\u5EFA AST \u8282\u70B9</li></ul></li><li>\u8FC7\u7A0B\u4E2D \u53EF\u80FD\u4F1A\u9047\u5230\u5143\u7D20\u8282\u70B9\u7684\u89E3\u6790\u5B58\u5728\u9012\u5F52\u89E3\u6790\u5B50\u8282\u70B9\u7684\u60C5\u51B5 <ul><li>\u5176\u5B9E\u5C31\u662F \u6811\u7684\u6DF1\u5EA6\u904D\u5386\u548C\u89E3\u6790\u8FC7\u7A0B</li><li>\u89E3\u6790\u8FC7\u7A0B\u4E2D\u4E0D\u65AD\u524D\u8FDB\u4EE3\u7801 \u66F4\u65B0\u89E3\u6790\u4E0A\u4E0B\u6587 \u6839\u636E\u751F\u6210\u7684 AST \u8282\u70B9\u6570\u7EC4\u521B\u5EFA AST \u6839\u8282\u70B9</li></ul></li><li>\u6700\u540E\u8FD8\u4F1A\u5904\u7406\u7A7A\u767D\u5B57\u7B26 \u5220\u9664 \u5408\u5E76\u4E00\u4E9B\u7A7A\u767D\u5B57\u7B26</li><li>\u5DF2\u7ECF\u5728\u751F\u4EA7\u73AF\u5883\u4E0B\u5220\u9664\u6CE8\u91CA\u8282\u70B9 \u63D0\u5347\u540E\u7EED\u7684\u7F16\u8BD1\u6548\u7387</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("source/vue/parsing/conclusion/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
