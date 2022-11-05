import { resolveComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.6ab74304.js";
const __pageData = JSON.parse('{"title":"AST \u8F6C\u6362\u603B\u7ED3","description":"","frontmatter":{"createTime":"2022/11/02","tag":"Vue\u6E90\u7801,AST"},"headers":[],"relativePath":"source/vue/ast-transform/conclusion/index.md","lastUpdated":1667401036000}');
const _sfc_main = { name: "source/vue/ast-transform/conclusion/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = resolveComponent("ClientOnly");
  const _component_ArticleMetadata = resolveComponent("ArticleMetadata");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="ast-\u8F6C\u6362\u603B\u7ED3" tabindex="-1">AST \u8F6C\u6362\u603B\u7ED3 <a class="header-anchor" href="#ast-\u8F6C\u6362\u603B\u7ED3" aria-hidden="true">#</a></h1>`);
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
  _push(`<ul><li>\u5982\u679C\u8BF4 parse \u9636\u6BB5\u662F\u4E00\u4E2A \u8BCD\u6CD5\u5206\u6790\u7684\u8FC7\u7A0B \u6784\u9020\u57FA\u7840\u7684 ast \u8282\u70B9\u5BF9\u8C61</li><li>\u90A3\u4E48 transform \u8282\u70B9\u5C31\u662F \u8BED\u6CD5\u5206\u6790\u7684\u9636\u6BB5 \u628A ast \u8282\u70B9\u505A\u4E86\u4E00\u5C42\u8F6C\u6362 \u6784\u9020\u51FA \u8BED\u4E49\u5316\u66F4\u5F3A \u4FE1\u606F\u66F4\u4F73\u4E30\u5BCC\u7684 codegenNode \u5728\u540E\u7EED\u4EE3\u7801\u751F\u6210\u7684\u9636\u6BB5\u6709\u7740\u975E\u5E38\u91CD\u8981\u7684\u4F5C\u7528</li><li>\u5728\u8F6C\u6362\u8FC7\u7A0B\u4E2D <ul><li>\u521B\u5EFA\u4E86 transform \u4E0A\u4E0B\u6587 \u8D1F\u8D23\u7EF4\u62A4\u4E86\u6574\u4E2A\u8F6C\u6362\u8FC7\u7A0B\u4E2D\u7684\u4E00\u4E9B\u72B6\u6001\u6570\u636E \u4EE5\u53CA\u63D0\u4F9B\u4E00\u4E9B\u4FEE\u6539\u4E0A\u4E0B\u6587\u6570\u636E\u7684\u51FD\u6570</li><li>\u7136\u540E\u901A\u8FC7 \u6DF1\u5EA6\u4F18\u5316\u7684\u904D\u5386\u65B9\u5F0F \u904D\u5386\u4E86\u6240\u6709\u7684 ast \u8282\u70B9</li><li>\u4E3A\u8282\u70B9\u6267\u884C\u76F8\u5E94\u7684\u8F6C\u6362\u51FD\u6570 \u6784\u9020\u5BF9\u5E94\u7684\u8F85\u52A9\u751F\u6210\u4EE3\u7801\u8282\u70B9 codegenNode</li><li>\u914D\u7F6E\u4E86 hoistStatic \u518D\u6B21\u904D\u5386\u8282\u70B9 \u627E\u5230\u6240\u6709\u53EF\u4EE5\u88AB\u9759\u6001\u63D0\u5347\u7684\u8282\u70B9\u548C\u5C5E\u6027 \u4FEE\u6539\u4ED6\u4EEC\u5BF9\u5E94\u7684 codegenNode</li><li>\u6700\u540E \u4E3A\u6839\u8282\u70B9\u521B\u5EFA codegenNode \u5E76\u4FDD\u7559 \u8F6C\u6362 ast\u8282\u70B9\u8FC7\u7A0B\u4E2D\u521B\u5EFA\u7684\u4E00\u4E9B\u4E0A\u4E0B\u6587\u6570\u636E</li></ul></li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("source/vue/ast-transform/conclusion/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
