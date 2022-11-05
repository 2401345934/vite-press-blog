import { resolveComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.6ab74304.js";
const __pageData = JSON.parse('{"title":"reactive API","description":"","frontmatter":{"createTime":"2022/10/23","tag":"Vue\u6E90\u7801"},"headers":[{"level":2,"title":"createReactiveObject","slug":"createreactiveobject","link":"#createreactiveobject","children":[]},{"level":2,"title":"mutableHandlers","slug":"mutablehandlers","link":"#mutablehandlers","children":[]}],"relativePath":"source/vue/reactive-principle/reactive/index.md","lastUpdated":1667281923000}');
const _sfc_main = { name: "source/vue/reactive-principle/reactive/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = resolveComponent("ClientOnly");
  const _component_ArticleMetadata = resolveComponent("ArticleMetadata");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="reactive-api" tabindex="-1">reactive API <a class="header-anchor" href="#reactive-api" aria-hidden="true">#</a></h1>`);
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
  _push(`<ul><li>reactive \u51FD\u6570\u62E5\u6709\u5355\u4E2A\u53C2\u6570 target \u5FC5\u987B\u662F\u5BF9\u8C61\u6216\u8005\u6570\u636E\u7C7B\u578B</li><li>\u5185\u90E8\u901A\u8FC7\u4E86 createReactiveObject \u51FD\u6570\u6267\u884C \u628A target \u53D8\u6210\u4E00\u4E2A\u54CD\u5E94\u5F0F\u5BF9\u8C61</li></ul><h2 id="createreactiveobject" tabindex="-1">createReactiveObject <a class="header-anchor" href="#createreactiveobject" aria-hidden="true">#</a></h2><ul><li>createReactiveObject \u62E5\u6709 5\u4E2A\u53C2\u6570 <ul><li>target \u8868\u793A\u5F85\u53D8\u6210\u54CD\u5E94\u5F0F\u5BF9\u8C61\u7684 \u5BF9\u8C61\u6216\u8005\u6570\u7EC4</li><li>isReadonly \u662F\u5426\u521B\u5EFA\u53EA\u8BFB\u5BF9\u8C61</li><li>baseHandles \u8868\u793A\u666E\u901A\u5BF9\u8C61\u548C\u6570\u7EC4\u7C7B\u578B\u6570\u636E\u7684\u54CD\u5E94\u5F0F\u5BF9\u8C61\u5904\u7406\u5668</li><li>collectionHandles \u8868\u793A\u96C6\u5408\u7C7B\u578B\u6570\u636E\u7684\u54CD\u5E94\u5F0F\u5904\u7406\u5668</li><li>proxyMap \u8868\u793A\u539F\u59CB\u5BF9\u8C61\u548C\u54CD\u5E94\u5F0F\u5BF9\u8C61\u7684\u7F13\u5B58\u6620\u5C04\u56FE</li></ul></li><li>createReactiveObject \u4E3B\u8981\u505A <ul><li>\u5224\u65AD target \u662F\u4E0D\u662F\u5BF9\u8C61\u6216\u8005\u6570\u7EC4 \u4E0D\u662F\u76F4\u63A5\u8FD4\u56DE</li><li>\u5982\u679C\u5DF2\u7ECF\u662F\u54CD\u5E94\u5F0F\u5BF9\u8C61 \u518D\u6B21\u6267\u884C reactive \u76F4\u63A5\u8FD4\u56DE\u8BE5\u54CD\u5E94\u5F0F\u5BF9\u8C61 \u25A0 \u5185\u90E8\u901A\u8FC7 target.__v_raw \u5C5E\u6027\u5224\u65AD target \u662F\u5426\u5DF2\u7ECF\u662F\u54CD\u5E94\u5F0F\u5BF9\u8C61</li><li>\u5982\u679C\u540C\u4E00\u4E2A\u539F\u59CB\u6570\u636E\u591A\u6B21\u6267\u884C reactive \u8FD4\u56DE\u76F8\u540C\u7684\u54CD\u5E94\u5F0F\u5BF9\u8C61</li><li>\u5BF9 \u539F\u59CB\u5BF9\u8C61\u7684\u7C7B\u578B\u8FDB\u4E00\u6B65\u8FDB\u884C\u9650\u5236 \u4F1A\u901A\u8FC7 getTargetType \u51FD\u6570\u5224\u65AD \u6BD4\u5982 Date \u7C7B\u578B RegExp \u7C7B\u578B promise \u7C7B\u578B \u90FD\u662F\u4E0D\u53EF\u53D8\u6210\u54CD\u5E94\u5F0F\u5BF9\u8C61 \u76F4\u63A5\u8FD4\u56DE</li></ul></li><li>\u901A\u8FC7 proxy \u52AB\u6301 target \u5BF9\u8C61 \u53D8\u6210\u54CD\u5E94\u5F0F \u628A new Proxy \u521B\u5EFA\u7684 proxy \u5B9E\u4F8B\u79F0\u505A\u54CD\u5E94\u5F0F\u5BF9\u8C61 <ul><li>\u5982\u679C\u662F\u96C6\u5408\u7C7B\u578B\u6570\u636E \u4F7F\u7528 collectionHandles</li><li>\u5982\u679C\u662F\u975E\u96C6\u5408\u7C7B\u578B\u6570\u636E \u4F7F\u7528 baseHandles</li></ul></li><li>\u628A\u539F\u59CB\u5BF9\u8C61 target \u4F5C\u4E3A key \u54CD\u5E94\u5F0F\u5BF9\u8C61 proxy \u4F5C\u4E3A value \u5B58\u50A8\u5230 map \u7C7B\u578B\u7684\u5BF9\u8C61 proxyMap <ul><li>\u8FD9\u5C31\u662F\u4E3A\u4EC0\u4E48\u591A\u6B21\u6267\u884C reactive \u51FD\u6570\u8FD4\u56DE\u540C\u4E00\u4E2A\u5BF9\u8C61</li></ul></li></ul><h2 id="mutablehandlers" tabindex="-1">mutableHandlers <a class="header-anchor" href="#mutablehandlers" aria-hidden="true">#</a></h2><ul><li>\u52AB\u6301\u4E86\u5BF9 proxy \u5BF9\u8C61\u5BF9\u4E00\u4E9B\u64CD\u4F5C</li><li>\u8BBF\u95EE\u5BF9\u8C61\u5C5E\u6027\u4F1A\u89E6\u53D1 get \u51FD\u6570</li><li>\u8BBE\u7F6E\u5BF9\u8C61\u5C5E\u6027\u4F1A\u89E6\u53D1 set \u51FD\u6570</li><li>\u5220\u9664\u5BF9\u8C61\u5C5E\u6027\u4F1A\u89E6\u53D1 deleteProperty \u51FD\u6570</li><li>in \u64CD\u4F5C\u7B26\u4F1A\u89E6\u53D1 has \u51FD\u6570</li><li>Object.getOwnPropertyNames \u8BBF\u95EE\u5BF9\u8C61\u5C5E\u6027\u89E6\u53D1 ownKeys \u51FD\u6570</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("source/vue/reactive-principle/reactive/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
