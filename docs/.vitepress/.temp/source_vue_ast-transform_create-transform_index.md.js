import { resolveComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.6ab74304.js";
const __pageData = JSON.parse('{"title":"\u521B\u5EFA tramsform \u4E0A\u4E0B\u6587","description":"","frontmatter":{"createTime":"2022/11/01","tag":"Vue\u6E90\u7801,AST"},"headers":[],"relativePath":"source/vue/ast-transform/create-transform/index.md","lastUpdated":1667367865000}');
const _sfc_main = { name: "source/vue/ast-transform/create-transform/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = resolveComponent("ClientOnly");
  const _component_ArticleMetadata = resolveComponent("ArticleMetadata");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="\u521B\u5EFA-tramsform-\u4E0A\u4E0B\u6587" tabindex="-1">\u521B\u5EFA tramsform \u4E0A\u4E0B\u6587 <a class="header-anchor" href="#\u521B\u5EFA-tramsform-\u4E0A\u4E0B\u6587" aria-hidden="true">#</a></h1>`);
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
  _push(`<ul><li>\u548C parse \u8FC7\u7A0B\u4E00\u6837 \u5728 tramsform \u9636\u6BB5\u4F1A\u521B\u5EFA\u4E00\u4E2A\u4E0A\u4E0B\u6587\u5BF9\u8C61</li><li>\u4E0A\u4E0B\u6587\u5BF9\u8C61 context \u7EF4\u62A4\u4E86 tramsform \u8FC7\u7A0B\u7684\u4E00\u4E9B\u914D\u7F6E</li><li>\u8FD8\u7EF4\u62A4\u4E86 tramsform \u8FC7\u7A0B\u4E2D\u7684\u4E00\u4E9B\u72B6\u6001\u6570\u636E \u6BD4\u5982\uFF1A \u5F53\u524D\u5904\u7406\u7684 ast \u8282\u70B9 \u5F53\u524D ast \u8282\u70B9\u5728\u5B50\u8282\u70B9\u7684\u7D22\u5F15 \u5F53\u524D ast \u8282\u70B9\u7684\u7236\u8282\u70B9</li><li>context \u5305\u542B\u4E86 \u8F6C\u6362\u8FC7\u7A0B\u4E2D\u8C03\u7528\u7684\u4E00\u4E9B\u8F85\u52A9\u51FD\u6570 \u548C\u4FEE\u6539 context \u5BF9\u8C61\u7684\u51FD\u6570</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("source/vue/ast-transform/create-transform/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
