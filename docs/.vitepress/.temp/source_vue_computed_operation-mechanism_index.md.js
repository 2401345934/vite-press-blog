import { resolveComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.6ab74304.js";
const _imports_0 = "/vite-press/assets/computed.dc062635.png";
const __pageData = JSON.parse('{"title":"\u8BA1\u7B97\u5C5E\u6027\u7684\u8FD0\u884C\u673A\u5236","description":"","frontmatter":{"createTime":"2022/10/24","tag":"Vue\u6E90\u7801"},"headers":[{"level":2,"title":"\u8FD0\u884C\u673A\u5236","slug":"\u8FD0\u884C\u673A\u5236","link":"#\u8FD0\u884C\u673A\u5236","children":[]},{"level":2,"title":"\u8BA1\u7B97\u5C5E\u6027\u7684\u4E24\u4E2A\u7279\u70B9","slug":"\u8BA1\u7B97\u5C5E\u6027\u7684\u4E24\u4E2A\u7279\u70B9","link":"#\u8BA1\u7B97\u5C5E\u6027\u7684\u4E24\u4E2A\u7279\u70B9","children":[{"level":3,"title":"\u5EF6\u65F6\u8BA1\u7B97","slug":"\u5EF6\u65F6\u8BA1\u7B97","link":"#\u5EF6\u65F6\u8BA1\u7B97","children":[]},{"level":3,"title":"\u7F13\u5B58","slug":"\u7F13\u5B58","link":"#\u7F13\u5B58","children":[]}]}],"relativePath":"source/vue/computed/operation-mechanism/index.md","lastUpdated":1667401036000}');
const _sfc_main = { name: "source/vue/computed/operation-mechanism/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = resolveComponent("ClientOnly");
  const _component_ArticleMetadata = resolveComponent("ArticleMetadata");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="\u8BA1\u7B97\u5C5E\u6027\u7684\u8FD0\u884C\u673A\u5236" tabindex="-1">\u8BA1\u7B97\u5C5E\u6027\u7684\u8FD0\u884C\u673A\u5236 <a class="header-anchor" href="#\u8BA1\u7B97\u5C5E\u6027\u7684\u8FD0\u884C\u673A\u5236" aria-hidden="true">#</a></h1>`);
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
  _push(`<ul><li>\u8BA1\u7B97\u5C5E\u6027\u5728 template \u4E2D\u4E5F\u4E0D\u9700\u8981\u8BBF\u95EE value \u56E0\u4E3A\u4E5F\u62E5\u6709\u4E86 __v_isRef \u5C5E\u6027</li><li>\u9996\u5148\u6267\u884C trackRefValue \u5BF9\u8BA1\u7B97\u5C5E\u6027\u672C\u8EAB\u8FDB\u884C\u4F9D\u8D56\u6536\u96C6 <ul><li>\u8FD9\u65F6\u5019 activeEffect \u662F\u7EC4\u4EF6\u526F\u4F5C\u7528\u51FD\u6570\u5BF9\u5E94\u7684 effect \u5BF9\u8C61</li></ul></li><li>\u4F1A\u5224\u65AD dirty \u5C5E\u6027 \u9ED8\u8BA4\u662F true \u6240\u4EE5\u66F4\u65B0\u7684\u65F6\u5019\u4F1A\u628A _dirtry \u8BBE\u7F6E\u6210 false <ul><li>\u63A5\u7740\u6267\u884C\u8BA1\u7B97\u5C5E\u6027\u5185\u90E8\u7684 effect \u5BF9\u8C61\u7684 run \u51FD\u6570 \u8FDB\u4E00\u6B65\u6267\u884C computed getter</li></ul></li></ul><h2 id="\u8FD0\u884C\u673A\u5236" tabindex="-1">\u8FD0\u884C\u673A\u5236 <a class="header-anchor" href="#\u8FD0\u884C\u673A\u5236" aria-hidden="true">#</a></h2><p><img${ssrRenderAttr("src", _imports_0)} alt="\u56FE\u7247"></p><h2 id="\u8BA1\u7B97\u5C5E\u6027\u7684\u4E24\u4E2A\u7279\u70B9" tabindex="-1">\u8BA1\u7B97\u5C5E\u6027\u7684\u4E24\u4E2A\u7279\u70B9 <a class="header-anchor" href="#\u8BA1\u7B97\u5C5E\u6027\u7684\u4E24\u4E2A\u7279\u70B9" aria-hidden="true">#</a></h2><h3 id="\u5EF6\u65F6\u8BA1\u7B97" tabindex="-1">\u5EF6\u65F6\u8BA1\u7B97 <a class="header-anchor" href="#\u5EF6\u65F6\u8BA1\u7B97" aria-hidden="true">#</a></h3><p>\u5F53\u6211\u4EEC\u8BBF\u95EE\u8BA1\u7B97\u5C5E\u6027\u7684\u65F6\u5019 \u624D\u4F1A\u6267\u884C computed getter \u51FD\u6570\u8FDB\u884C\u8BA1\u7B97</p><h3 id="\u7F13\u5B58" tabindex="-1">\u7F13\u5B58 <a class="header-anchor" href="#\u7F13\u5B58" aria-hidden="true">#</a></h3><ul><li>\u5185\u90E8\u4F1A\u7F13\u5B58\u4E0A\u6B21\u7684\u8BA1\u7B97\u7ED3\u679C value \u53EA\u6709 _dirtry \u4E3A true \u7684\u65F6\u5019\u624D\u4F1A\u91CD\u65B0\u8BA1\u7B97</li><li>\u5982\u679C\u8BBF\u95EE\u8BA1\u7B97\u5C5E\u6027\u65F6_dirtry \u4E3A false \u76F4\u63A5\u8FD4\u56DE \u7F13\u5B58\u7684 value</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("source/vue/computed/operation-mechanism/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
