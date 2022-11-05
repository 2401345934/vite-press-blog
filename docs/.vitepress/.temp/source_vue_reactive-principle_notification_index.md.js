import { resolveComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.6ab74304.js";
const __pageData = JSON.parse('{"title":"\u6D3E\u53D1\u901A\u77E5","description":"","frontmatter":{"createTime":"2022/10/23","tag":"Vue\u6E90\u7801"},"headers":[{"level":2,"title":"set","slug":"set","link":"#set","children":[]},{"level":2,"title":"trigger","slug":"trigger","link":"#trigger","children":[]},{"level":2,"title":"effect","slug":"effect","link":"#effect","children":[]},{"level":2,"title":"reactiveEffect \u526F\u4F5C\u7528\u51FD\u6570","slug":"reactiveeffect-\u526F\u4F5C\u7528\u51FD\u6570","link":"#reactiveeffect-\u526F\u4F5C\u7528\u51FD\u6570","children":[]}],"relativePath":"source/vue/reactive-principle/notification/index.md","lastUpdated":1667281923000}');
const _sfc_main = { name: "source/vue/reactive-principle/notification/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = resolveComponent("ClientOnly");
  const _component_ArticleMetadata = resolveComponent("ArticleMetadata");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="\u6D3E\u53D1\u901A\u77E5" tabindex="-1">\u6D3E\u53D1\u901A\u77E5 <a class="header-anchor" href="#\u6D3E\u53D1\u901A\u77E5" aria-hidden="true">#</a></h1>`);
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
  _push(`<ul><li>\u6D3E\u53D1\u901A\u77E5\u53D1\u751F\u5728\u6570\u636E\u66F4\u65B0\u9636\u6BB5 \u7528 proxy \u52AB\u6301\u4E86\u6570\u636E\u5BF9\u8C61 \u6240\u4EE5\u5F53\u54CD\u5E94\u5F0F\u5BF9\u8C61\u7684\u5C5E\u6027\u503C\u66F4\u65B0\u7684\u65F6\u5019 \u4F1A\u6267\u884C set \u51FD\u6570</li><li>set \u51FD\u6570\u662F\u6267\u884C createSetter \u51FD\u6570\u7684\u8FD4\u56DE\u503C</li></ul><h2 id="set" tabindex="-1">set <a class="header-anchor" href="#set" aria-hidden="true">#</a></h2><ul><li>set \u51FD\u6570 \u901A\u8FC7 Reflect.set \u6C42\u503C</li><li>\u901A\u8FC7 trigger \u51FD\u6570\u6D3E\u53D1\u901A\u77E5</li><li>\u5E76\u4F9D\u636E key \u662F\u5426\u5B58\u5728\u4E0E target \u4E0A\u6765\u786E\u8BA4\u901A\u77E5\u7C7B\u578B \u65B0\u589E\u8FD8\u662F\u4FEE\u6539</li><li>\u6700\u6838\u5FC3\u90E8\u5206\u5C31\u662F \u6267\u884C trigger \u51FD\u6570\u6D3E\u53D1\u901A\u77E5</li></ul><h2 id="trigger" tabindex="-1">trigger <a class="header-anchor" href="#trigger" aria-hidden="true">#</a></h2><ul><li>\u4E3B\u8981\u505A\u4E86 4\u4EF6\u4E8B <ul><li>\u4ECE targetMap \u4E2D\u83B7\u53D6 target \u5BF9\u5E94\u7684\u4F9D\u8D56\u96C6\u5408 depsMap</li><li>\u521B\u5EFA\u8FD0\u884C\u7684 effects \u96C6\u5408</li><li>\u6839\u636E key \u4ECE depsMap \u4E2D\u627E\u5230\u5BF9\u5E94\u7684 effects \u6DFB\u52A0\u5230 effects \u96C6\u5408\u4E2D</li><li>\u904D\u5386 effects \u6267\u884C\u76F8\u5173\u7684\u526F\u4F5C\u7528\u51FD\u6570</li></ul></li><li>\u56E0\u6B64\u6BCF\u6B21\u4E00\u6267\u884C trigger \u51FD\u6570 \u5C31\u662F\u6839\u636E target \u548C key \u4ECE targetMap \u4E2D\u627E\u5230\u6240\u6709\u76F8\u5173\u7684\u526F\u4F5C\u7528\u51FD\u6570 \u5E76\u904D\u5386\u6267\u884C\u4E00\u6B21</li></ul><h2 id="effect" tabindex="-1">effect <a class="header-anchor" href="#effect" aria-hidden="true">#</a></h2><ul><li>effect \u5185\u90E8\u901A\u8FC7\u6267\u884C createReactiveEffect \u51FD\u6570\u521B\u5EFA\u4E00\u4E2A\u65B0\u7684 effect \u51FD\u6570 \u53EF\u4EE5\u53EB\u505A reactiveEffect \u51FD\u6570 \u5E76\u4E14\u7ED9\u5B83\u6DFB\u52A0\u4E00\u4E9B\u65B0\u7684\u5C5E\u6027</li><li>effect \u51FD\u6570\u652F\u6301\u4F20\u5165\u4E00\u4E2A\u914D\u7F6E\u53C2\u6570 \u4EE5\u652F\u6301\u66F4\u591A\u7684\u529F\u80FD</li></ul><h2 id="reactiveeffect-\u526F\u4F5C\u7528\u51FD\u6570" tabindex="-1">reactiveEffect \u526F\u4F5C\u7528\u51FD\u6570 <a class="header-anchor" href="#reactiveeffect-\u526F\u4F5C\u7528\u51FD\u6570" aria-hidden="true">#</a></h2><ul><li>reactiveEffect \u51FD\u6570\u5C31\u662F\u54CD\u5E94\u5F0F\u7684\u526F\u4F5C\u7528\u51FD\u6570 \u5F53\u6267\u884C trigger \u8FC7\u7A0B\u6D3E\u53D1\u901A\u77E5\u7684\u65F6\u5019 \u6267\u884C effect \u7684\u65F6\u5019\u5C31\u662F reactiveEffect</li><li>\u53EA\u505A\u4E86\u4E24\u4EF6\u4E8B <ul><li>\u8BA9\u5168\u5C40\u7684 reactiveEffect \u6307\u5411\u672C\u8EAB</li><li>\u6267\u884C\u88AB\u5305\u88C5\u7684\u539F\u59CB\u51FD\u6570 fn</li></ul></li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("source/vue/reactive-principle/notification/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
