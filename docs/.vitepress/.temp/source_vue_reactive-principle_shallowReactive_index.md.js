import { resolveComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.6ab74304.js";
const __pageData = JSON.parse('{"title":"shallowReactive API","description":"","frontmatter":{"createTime":"2022/10/23","tag":"Vue\u6E90\u7801"},"headers":[{"level":2,"title":"shallowReactiveHandlers","slug":"shallowreactivehandlers","link":"#shallowreactivehandlers","children":[]},{"level":2,"title":"shallowGet","slug":"shallowget","link":"#shallowget","children":[]}],"relativePath":"source/vue/reactive-principle/shallowReactive/index.md","lastUpdated":1667281923000}');
const _sfc_main = { name: "source/vue/reactive-principle/shallowReactive/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = resolveComponent("ClientOnly");
  const _component_ArticleMetadata = resolveComponent("ArticleMetadata");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="shallowreactive-api" tabindex="-1">shallowReactive API <a class="header-anchor" href="#shallowreactive-api" aria-hidden="true">#</a></h1>`);
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
  _push(`<ul><li>reactive \u548C shallowReactive \u4E3B\u8981\u533A\u522B\u76F8\u5F53\u4E8E baseHandlers \u548C collectionHandlers \u7684\u533A\u522B</li><li>\u5BF9\u4E8E\u666E\u901A\u5BF9\u8C61\u548C\u6570\u7EC4\u7C7B\u578B\u6570\u636E\u7684 Proxy \u5904\u7406\u5668\u5BF9\u8C61 shallowReactive \u51FD\u6570\u4F20\u5165\u7684\u662F baseHandlers \u7684\u503C\u662F shallowReactiveHandlers</li></ul><h2 id="shallowreactivehandlers" tabindex="-1">shallowReactiveHandlers <a class="header-anchor" href="#shallowreactivehandlers" aria-hidden="true">#</a></h2><ul><li>\u662F\u57FA\u4E8E mutableHandlers \u7684\u57FA\u7840\u4E0A\u8FDB\u884C\u62D3\u5C55</li><li>\u4FEE\u6539\u4E86 get \u548C set \u51FD\u6570\u7684\u5B9E\u73B0 \u5B9E\u9645\u6267\u884C\u7684\u662F shallowGet shallowSet</li></ul><h2 id="shallowget" tabindex="-1">shallowGet <a class="header-anchor" href="#shallowget" aria-hidden="true">#</a></h2><ul><li>\u4E5F\u662F\u901A\u8FC7 createGetter \u7B2C\u4E8C\u4E2A\u53C2\u6570\u4F20\u9012\u662F true</li><li>\u7B2C\u4E8C\u4E2A\u53C2\u6570\u4F20\u9012\u662F true \u5373\u4F7F \u8FD4\u56DE\u7684 res \u7684\u503C\u662F\u5BF9\u8C61\u7C7B\u578B \u4E5F\u4E0D\u4F1A\u901A\u8FC7\u9012\u5F52\u53D8\u6210\u54CD\u5E94\u5F0F \u53EA\u4F1A\u628A\u5BF9\u8C61\u7684\u6700\u5916\u5C42\u5C5E\u6027\u53D8\u6210\u54CD\u5E94\u5F0F</li><li>\u5728\u521D\u59CB\u5316 props \u5230\u8FC7\u7A0B\u4E2D \u5C31\u662F\u5BF9 instance.props \u6C42\u503C\u540E \u5C31\u662F\u901A\u8FC7 shallowReactive \u628A\u5B83\u53D8\u6210\u54CD\u5E94\u5F0F</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("source/vue/reactive-principle/shallowReactive/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
