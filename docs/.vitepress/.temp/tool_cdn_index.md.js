import { resolveComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.6ab74304.js";
const __pageData = JSON.parse('{"title":"1. \u80CC\u666F","description":"","frontmatter":{"createTime":"2022/11/04","tag":"\u5DE5\u5177,cdn"},"headers":[],"relativePath":"tool/cdn/index.md","lastUpdated":1667532420000}');
const _sfc_main = { name: "tool/cdn/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = resolveComponent("ClientOnly");
  const _component_ArticleMetadata = resolveComponent("ArticleMetadata");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="_1-\u80CC\u666F" tabindex="-1">1. \u80CC\u666F <a class="header-anchor" href="#_1-\u80CC\u666F" aria-hidden="true">#</a></h1>`);
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
  _push(`<p>\u76EE\u524D\u56FD\u5185\u6709\u5F88\u591A NPM \u7684 CDN\uFF0C\u53EF\u4EE5\u9AD8\u901F\u652F\u6301\u76F8\u5173\u5305\u6587\u4EF6\u7684\u8BBF\u95EE\u4E0B\u8F7D\uFF0C\u5982\uFF1A</p><ul><li>BootCDN: <a href="https://www.bootcdn.cn" target="_blank" rel="noreferrer">www.bootcdn.cn</a></li><li>\u4E03\u725B\u4E91: <a href="https://www.staticfile.org/" target="_blank" rel="noreferrer">www.staticfile.org</a></li><li>360: <a href="https://cdn.baomitu.com/" target="_blank" rel="noreferrer">cdn.baomitu.com</a></li><li>\u5B57\u8282\u8DF3\u52A8: <a href="https://cdn.bytedance.com/" target="_blank" rel="noreferrer">cdn.bytedance.com</a></li></ul><p>\u4F46\u8FD9\u4E9B CDN \u5E76\u4E0D\u5168\uFF0C\u5F88\u591A NPM \u4E0A\u7684\u5305 \u5728\u8FD9\u4E9B CDN \u4E0A\u662F\u627E\u4E0D\u5230\u7684\u3002\u539F\u56E0\u662F\uFF0C\u5B83\u4EEC\u90FD\u662F\u4ECE <a href="https://cdnjs.com/" target="_blank" rel="noreferrer">CDNJS</a> \u4E0A\u540C\u6B65\u7684\u6570\u636E\uFF0CCDNJS \u5E76\u4E0D\u4F1A\u628A\u6240\u6709\u7684 NPM \u5305\u8FDB\u884C\u540C\u6B65\uFF0C\u6240\u4EE5\u5F53\u4F60\u9700\u8981\u7684\u4E00\u4E9B NPM \u5305\u6CA1\u6709\u5728 CDNJS \u4E0A\u9762\uFF0C\u4F60\u5C31\u7528\u4E0D\u4E86\u4E0A\u9762\u8FD9\u4E9B\u56FD\u5185 CDN \u4E86\u3002</p><p>\u89E3\u51B3\u53EF\u4EE5\u8BBF\u95EE\u6240\u6709 NPM \u5305\u7684\u95EE\u9898\uFF0C\u53EF\u4EE5\u4F7F\u7528 <a href="https://unpkg.com/" target="_blank" rel="noreferrer">unpkg</a>\uFF0C\u4F46\u5B83\u7684\u8BBF\u95EE\u901F\u5EA6\u5728\u56FD\u5185\u5E76\u4E0D\u4F73\uFF1A</p><p><img src="https://user-images.githubusercontent.com/11046969/159113642-79849a96-7626-4194-a810-f3aabb3aea57.png" alt="image"></p><p>\u548C\u5B83\u76F8\u540C\u529F\u80FD\u7684 <a href="https://cdn.jsdelivr.net/" target="_blank" rel="noreferrer">jsdelivr</a>\uFF0C\u5728\u56FD\u5185\u7684\u901F\u5EA6\u4E5F\u4E0D\u4F73\uFF1A</p><p><img src="https://user-images.githubusercontent.com/11046969/159113650-31c5f1f2-3957-47b3-984b-c5cb9d276d1f.png" alt="image"></p><p>\u4E8E\u662F\u5C31\u6574\u7406\u4E86\u4E0B\uFF0C\u56FD\u5185\u7684 Unpkg \u66FF\u4EE3\u54C1\u3002</p><h1 id="_2-\u56FD\u5185-unpkg" tabindex="-1">2. \u56FD\u5185 Unpkg <a class="header-anchor" href="#_2-\u56FD\u5185-unpkg" aria-hidden="true">#</a></h1>`);
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
  _push(`<p>\u76EE\u524D\u627E\u4E86\u5BF9\u5916\u7684\u56FD\u5185 Unpkg \u6709\u4E24\u4E2A\uFF1A</p><ul><li>\u997F\u4E86\u4E48\uFF1A<a href="https://github.elemecdn.com/" target="_blank" rel="noreferrer">github.elemecdn.com</a>\u3001<a href="https://npm.elemecdn.com/" target="_blank" rel="noreferrer">npm.elemecdn.com</a></li><li>\u77E5\u4E4E\uFF1A<a href="https://unpkg.zhimg.com/" target="_blank" rel="noreferrer">unpkg.zhimg.com</a></li></ul><p>\u90FD\u662F\u90E8\u7F72\u5728\u56FD\u5185\u963F\u91CC\u4E91\u7684 CDN \u4E0A\uFF0C\u901F\u5EA6\u90FD\u8FD8\u4E0D\u9519\uFF0C\u5982\u4E0B\u56FE\u6240\u793A\uFF1A</p><p><img src="https://user-images.githubusercontent.com/11046969/159113662-e4ddc9b0-9e62-4962-807d-104c801383e5.png" alt="image"></p><p>\u53EF\u4EE5\u653E\u5FC3\u4F7F\u7528\u3002</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("tool/cdn/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
