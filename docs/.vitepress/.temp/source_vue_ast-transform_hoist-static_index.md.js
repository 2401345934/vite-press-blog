import { resolveComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.6ab74304.js";
const __pageData = JSON.parse('{"title":"\u9759\u6001\u63D0\u5347","description":"","frontmatter":{"createTime":"2022/11/02","tag":"Vue\u6E90\u7801,AST"},"headers":[{"level":2,"title":"hoistStatic","slug":"hoiststatic","link":"#hoiststatic","children":[]},{"level":2,"title":"getConstantType","slug":"getconstanttype","link":"#getconstanttype","children":[]},{"level":2,"title":"\u9759\u6001\u63D0\u5347\u7684\u6210\u672C","slug":"\u9759\u6001\u63D0\u5347\u7684\u6210\u672C","link":"#\u9759\u6001\u63D0\u5347\u7684\u6210\u672C","children":[]}],"relativePath":"source/vue/ast-transform/hoist-static/index.md","lastUpdated":1667401036000}');
const _sfc_main = { name: "source/vue/ast-transform/hoist-static/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = resolveComponent("ClientOnly");
  const _component_ArticleMetadata = resolveComponent("ArticleMetadata");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="\u9759\u6001\u63D0\u5347" tabindex="-1">\u9759\u6001\u63D0\u5347 <a class="header-anchor" href="#\u9759\u6001\u63D0\u5347" aria-hidden="true">#</a></h1>`);
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
  _push(`<h2 id="hoiststatic" tabindex="-1">hoistStatic <a class="header-anchor" href="#hoiststatic" aria-hidden="true">#</a></h2><ul><li>\u8282\u70B9\u8F6C\u6362\u5B8C\u6BD5\u4E4B\u540E \u4F1A\u5224\u65AD\u7F16\u8BD1\u914D\u7F6E\u4E2D\u662F\u5426\u914D\u7F6E\u4E86 hoistStatic \u5982\u679C\u914D\u7F6E\u4E86\u5C31\u4F1A\u6267\u884C hoistStatic \u505A\u9759\u6001\u63D0\u5347</li><li>\u9759\u6001\u63D0\u5347\u662F vue3 \u7F16\u8BD1\u9636\u6BB5\u7684\u4E00\u4E2A\u4F18\u5316\u7B56\u7565</li><li>\u56E0\u4E3A\u9759\u6001\u8282\u70B9\u4E0D\u4F9D\u8D56\u52A8\u6001\u6570\u636E \u4E00\u65E6\u521B\u5EFA\u4E86\u5C31\u4E0D\u4F1A\u6539\u53D8 \u6240\u4EE5 \u53EA\u6709\u9759\u6001\u8282\u70B9\u624D\u80FD\u88AB\u63D0\u5347\u5230\u5916\u90E8\u521B\u5EFA</li><li>\u4E3B\u8981\u64CD\u4F5C\u5C31\u662F\u4ECE \u6839\u8282\u70B9\u5F00\u59CB \u901A\u8FC7\u6DF1\u5EA6\u4F18\u5316\u7684\u65B9\u5F0F\u9012\u5F52\u904D\u5386\u8282\u70B9\u5E76\u505A\u5224\u65AD</li><li>\u5982\u679C\u4E00\u4E2A\u8282\u70B9\u662F\u4E00\u4E2A\u5143\u7D20\u8282\u70B9 \u4F1A\u901A\u8FC7 getConstantType \u83B7\u53D6\u8282\u70B9\u7684\u5E38\u91CF\u7C7B\u578B</li></ul><h2 id="getconstanttype" tabindex="-1">getConstantType <a class="header-anchor" href="#getconstanttype" aria-hidden="true">#</a></h2><ul><li>\u4F1A\u6839\u636E\u8282\u70B9\u7C7B\u578B\u7684\u4E0D\u540C \u8FD4\u56DE\u4E0D\u540C\u7684\u503C</li><li>\u5BF9\u4E8E\u6587\u672C\u548C\u6CE8\u91CA\u8282\u70B9 \u8FD4\u56DE 3 CAN_STRINGIFY</li><li>\u5BF9\u4E8E\u5143\u7D20\u8282\u70B9 \u4F1A\u5224\u65AD\u8282\u70B9\u81EA\u8EAB\u4EE5\u53CA\u5B83\u5B50\u5143\u7D20\u7684\u7C7B\u578B \u5C5E\u6027\u7C7B\u578B \u518D\u53BB\u51B3\u5B9A\u5B83\u7684\u5E38\u91CF\u7C7B\u578B <ul><li>\u5982\u679C\u53D1\u73B0\u6CA1\u6709\u4EFB\u4F55\u52A8\u6001\u6570\u636E \u5C31\u662F\u53EF\u4EE5\u88AB\u9759\u6001\u63D0\u5347\u7684</li></ul></li><li>\u867D\u7136\u6709\u7684\u8282\u70B9\u4F1A\u5305\u542B\u4E00\u4E9B\u52A8\u6001\u8282\u70B9 \u4F46\u662F\u672C\u8EAB\u7684\u9759\u6001\u5C5E\u6027\u8FD8\u662F\u53EF\u4EE5\u88AB\u9759\u6001\u63D0\u5347\u7684</li><li>\u5982\u679C\u8282\u70B9\u6EE1\u8DB3\u53EF\u4EE5\u88AB\u9759\u6001\u63D0\u5347\u7684\u6761\u4EF6 \u8282\u70B9\u5BF9\u5E94\u7684 codegenNode \u4F1A\u901A\u8FC7\u6267\u884C context.hoist \u5C06\u5176\u4FEE\u6539\u4E3A\u4E00\u4E2A\u7B80\u5355\u7684\u8868\u8FBE\u5F0F\u8282\u70B9</li></ul><h2 id="\u9759\u6001\u63D0\u5347\u7684\u6210\u672C" tabindex="-1">\u9759\u6001\u63D0\u5347\u7684\u6210\u672C <a class="header-anchor" href="#\u9759\u6001\u63D0\u5347\u7684\u6210\u672C" aria-hidden="true">#</a></h2><ul><li>\u9759\u6001\u63D0\u5347\u8FC7\u7A0B\u6700\u7EC8\u7ED3\u679C\u8FD8\u662F\u4FEE\u6539\u4E86\u53EF\u4EE5\u88AB\u9759\u6001\u63D0\u5347\u7684\u8282\u70B9\u7684 codegenNode</li><li>\u9759\u6001\u63D0\u5347\u521B\u5EFA\u7684\u8282\u70B9 \u653E\u5728\u7684 render \u51FD\u6570\u7684\u5916\u90E8</li><li>render \u51FD\u6570\u5185\u90E8\u65F6\u949F\u4F1A\u4FDD\u6301\u5BF9\u9759\u6001\u8282\u70B9\u7684\u5F15\u7528 \u5BFC\u81F4\u7684\u540E\u679C\u5C31\u662F \u7EC4\u4EF6\u5373\u4F7F\u9500\u6BC1 \u9759\u6001\u63D0\u5347\u7684\u8282\u70B9\u6240\u5360\u7528\u7684\u5185\u5B58\u4E0D\u4F1A\u91CA\u653E</li><li>\u9759\u6001\u63D0\u5347\u662F\u7A7A\u95F4\u6362\u65F6\u95F4\u7684\u4F18\u5316\u624B\u6BB5 \u76F8\u6BD4\u4E8E\u88AB\u5360\u7528\u7684\u5185\u5B58\u6210\u672C \u6027\u80FD\u65B9\u9762\u7684\u63D0\u5347\u4F1A\u7ED9\u7528\u6237\u5E26\u6765\u66F4\u591A\u7684\u6536\u76CA</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("source/vue/ast-transform/hoist-static/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
