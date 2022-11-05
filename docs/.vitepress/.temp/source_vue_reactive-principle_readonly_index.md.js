import { resolveComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.6ab74304.js";
const __pageData = JSON.parse('{"title":"readonly","description":"","frontmatter":{"createTime":"2022/10/23","tag":"Vue\u6E90\u7801"},"headers":[{"level":2,"title":"readonlyHandlers","slug":"readonlyhandlers","link":"#readonlyhandlers","children":[]},{"level":2,"title":"readonlyGet","slug":"readonlyget","link":"#readonlyget","children":[]}],"relativePath":"source/vue/reactive-principle/readonly/index.md","lastUpdated":1667401036000}');
const _sfc_main = { name: "source/vue/reactive-principle/readonly/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = resolveComponent("ClientOnly");
  const _component_ArticleMetadata = resolveComponent("ArticleMetadata");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="readonly" tabindex="-1">readonly <a class="header-anchor" href="#readonly" aria-hidden="true">#</a></h1>`);
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
  _push(`<ul><li>readonly \u548C reactive \u4E3B\u8981\u533A\u522B \u5C31\u662F\u6267\u884C createReactiveObject \u51FD\u6570\u7684\u53C2\u6570 isReadonly \u4E0D\u540C</li><li>\u5176\u6B21\u5728\u4E8E baseHandlers \u548C collectionHandlers \u7684\u533A\u522B</li><li>\u5BF9\u4E8E\u666E\u901A\u5BF9\u8C61\u548C\u6570\u7EC4\u7C7B\u578B\u6570\u636E\u7684 Proxy \u5904\u7406\u5668\u5BF9\u8C61 readonly \u51FD\u6570\u4F20\u5165\u7684\u662F baseHandlers \u7684\u503C\u662F readonlyHandlers</li><li>\u6267\u884C createReactiveObject \u7684\u65F6\u5019 \u5982\u679C isReadonly\u662F true \u5E76\u4E14\u4F20\u9012\u7684\u53C2\u6570 target \u5DF2\u7ECF\u662F\u54CD\u5E94\u5F0F\u5BF9\u8C61\u4E86 \u4ECD\u7136\u53EF\u4EE5\u53D8\u53EA\u8BFB\u7684\u5BF9\u8C61</li></ul><h2 id="readonlyhandlers" tabindex="-1">readonlyHandlers <a class="header-anchor" href="#readonlyhandlers" aria-hidden="true">#</a></h2><ul><li>readonlyHandlers \u548C mutableHandlers \u533A\u522B\u4E3B\u8981\u662F\u5728\u4E8E get set \u548C deleteProperty \u8FD9\u4E09\u4E2A\u51FD\u6570\u3001</li><li>\u53EA\u8BFB\u7684\u54CD\u5E94\u5F0F\u5BF9\u8C61\u662F\u4E0D\u5141\u8BB8\u4FEE\u6539\u6216\u5220\u9664\u5C5E\u6027\u7684</li><li>\u6240\u4EE5\u5728\u975E\u751F\u4EA7\u97E9\u5267\u4E0B set \u548C deleteProperty \u51FD\u6570\u5B9E\u73B0\u90FD\u4F1A\u53D1\u51FA\u8B66\u544A \u63D0\u793A\u7528\u6237\u5BF9\u8C61\u662F\u53EA\u8BFB\u7684</li></ul><h2 id="readonlyget" tabindex="-1">readonlyGet <a class="header-anchor" href="#readonlyget" aria-hidden="true">#</a></h2><ul><li>\u5C31\u662F createGetter(true) \u7684\u8FD4\u56DE\u503C</li><li>readonly \u548C reactive \u6700\u5927\u533A\u522B\u5C31\u662F readonly \u4E0D\u505A\u4F9D\u8D56\u6536\u96C6 \u56E0\u4E3A\u53EA\u8BFB\u7684\u5BF9\u8C61\u4E0D\u4F1A\u88AB\u4FEE\u6539 \u6240\u4EE5\u4E0D\u9700\u8981\u8FFD\u8E2A\u53D8\u5316</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("source/vue/reactive-principle/readonly/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
