import { resolveComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.6ab74304.js";
const __pageData = JSON.parse('{"title":"\u521B\u5EFA\u6839\u8282\u70B9\u7684\u4EE3\u7801\u751F\u6210\u8282\u70B9","description":"","frontmatter":{"createTime":"2022/11/02","tag":"Vue\u6E90\u7801,AST"},"headers":[{"level":2,"title":"createRootCodegen","slug":"createrootcodegen","link":"#createrootcodegen","children":[]}],"relativePath":"source/vue/ast-transform/create-root/index.md","lastUpdated":1667401036000}');
const _sfc_main = { name: "source/vue/ast-transform/create-root/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = resolveComponent("ClientOnly");
  const _component_ArticleMetadata = resolveComponent("ArticleMetadata");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="\u521B\u5EFA\u6839\u8282\u70B9\u7684\u4EE3\u7801\u751F\u6210\u8282\u70B9" tabindex="-1">\u521B\u5EFA\u6839\u8282\u70B9\u7684\u4EE3\u7801\u751F\u6210\u8282\u70B9 <a class="header-anchor" href="#\u521B\u5EFA\u6839\u8282\u70B9\u7684\u4EE3\u7801\u751F\u6210\u8282\u70B9" aria-hidden="true">#</a></h1>`);
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
  _push(`<h2 id="createrootcodegen" tabindex="-1">createRootCodegen <a class="header-anchor" href="#createrootcodegen" aria-hidden="true">#</a></h2><ul><li>createRootCodegen \u76EE\u7684\u5C31\u662F \u4E3A root \u8FD9\u4E2A\u865A\u62DF\u7684 ast \u6839\u8282\u70B9\u521B\u5EFA\u4E00\u4E2A\u4EE3\u7801\u751F\u6210\u8282\u70B9</li><li>\u5982\u679C root \u7684\u5B50\u8282\u70B9 children \u662F\u5355\u4E2A\u5143\u7D20\u8282\u70B9 \u5C31\u5C06 root \u8F6C\u6362\u6210\u4E00\u4E2A block \u8282\u70B9 \u628A\u8FD9\u4E2A child \u7684 codegenNode \u8D4B\u503C\u7ED9 root \u7684 codegenNode</li><li>\u5982\u679C root \u7684\u5B50\u8282\u70B9 children \u662F\u591A\u4E2A\u8282\u70B9 \u8FD4\u56DE\u4E00\u4E2A fragement \u7684\u4EE3\u7801\u751F\u6210\u8282\u70B9 \u5E76\u8D4B\u503C\u7ED9 root \u7684 codegenNode</li><li>createRootCodegen \u5B8C\u6210\u4E4B\u540E \u628A\u8F6C\u6362 ast \u8282\u70B9\u7684\u8FC7\u7A0B\u4E2D\u521B\u5EFA\u7684\u4E00\u4E9B\u4E0A\u4E0B\u6587\u6570\u636E\u8D4B\u503C\u7ED9 root \u8282\u70B9\u5BF9\u5E94\u7684\u5C5E\u6027</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("source/vue/ast-transform/create-root/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
