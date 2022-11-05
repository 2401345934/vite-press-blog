import { resolveComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.6ab74304.js";
const __pageData = JSON.parse('{"title":"AST \u8F6C\u6362","description":"","frontmatter":{"createTime":"2022/11/01","tag":"Vue\u6E90\u7801,AST"},"headers":[{"level":2,"title":"getBaseTransformPreset","slug":"getbasetransformpreset","link":"#getbasetransformpreset","children":[]},{"level":2,"title":"transform","slug":"transform","link":"#transform","children":[]}],"relativePath":"source/vue/ast-transform/ast-transform/index.md","lastUpdated":1667367865000}');
const _sfc_main = { name: "source/vue/ast-transform/ast-transform/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = resolveComponent("ClientOnly");
  const _component_ArticleMetadata = resolveComponent("ArticleMetadata");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="ast-\u8F6C\u6362" tabindex="-1">AST \u8F6C\u6362 <a class="header-anchor" href="#ast-\u8F6C\u6362" aria-hidden="true">#</a></h1>`);
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
  _push(`<ul><li>\u5BF9\u4E8E\u6A21\u7248\u7684\u7F16\u8BD1\u4F1A\u5148\u901A\u8FC7 baseParse \u751F\u6210\u4E00\u4E2A AST \u5BF9\u8C61</li><li>\u7136\u540E\u9488\u5BF9\u8FD9\u4E2A \u5BF9\u8C61\u8FDB\u884C\u4E00\u5B9A\u7684\u8F6C\u6362</li></ul><h2 id="getbasetransformpreset" tabindex="-1">getBaseTransformPreset <a class="header-anchor" href="#getbasetransformpreset" aria-hidden="true">#</a></h2><ul><li>\u4F1A\u6267\u884C getBaseTransformPreset \u51FD\u6570\u83B7\u53D6\u8282\u70B9\u548C\u6307\u4EE4\u8F6C\u6362\u7684\u51FD\u6570</li><li>\u7136\u540E\u8C03\u7528 transform \u51FD\u6570\u505A AST \u8F6C\u6362 \u628A\u8FD9\u4E9B\u8282\u70B9\u548C\u6307\u4EE4\u8F6C\u6362\u6210\u51FD\u6570\u4F5C\u4E3A\u914D\u7F6E\u7684\u5C5E\u6027\u53C2\u6570\u4F20\u5165</li></ul><h2 id="transform" tabindex="-1">transform <a class="header-anchor" href="#transform" aria-hidden="true">#</a></h2><ul><li>\u6838\u5FC3\u6D41\u7A0B \u4E3B\u8981\u505A\u4E86\u56DB\u4EF6\u4E8B</li><li>\u521B\u5EFA tramsform \u4E0A\u4E0B\u6587</li><li>\u904D\u5386 AST \u8282\u70B9</li><li>\u9759\u6001\u63D0\u5347</li><li>\u521B\u5EFA\u6839\u4EE3\u7801\u751F\u6210\u8282\u70B9</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("source/vue/ast-transform/ast-transform/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
