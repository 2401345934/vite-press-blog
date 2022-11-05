import { resolveComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.6ab74304.js";
const __pageData = JSON.parse('{"title":"ref","description":"","frontmatter":{"createTime":"2022/10/23","tag":"Vue\u6E90\u7801"},"headers":[{"level":2,"title":"ref \u7684\u4F18\u5316","slug":"ref-\u7684\u4F18\u5316","link":"#ref-\u7684\u4F18\u5316","children":[]},{"level":2,"title":"trackRefValue","slug":"trackrefvalue","link":"#trackrefvalue","children":[]},{"level":2,"title":"unref","slug":"unref","link":"#unref","children":[]}],"relativePath":"source/vue/reactive-principle/ref/index.md","lastUpdated":1667281923000}');
const _sfc_main = { name: "source/vue/reactive-principle/ref/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = resolveComponent("ClientOnly");
  const _component_ArticleMetadata = resolveComponent("ArticleMetadata");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="ref" tabindex="-1">ref <a class="header-anchor" href="#ref" aria-hidden="true">#</a></h1>`);
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
  _push(`<ul><li>ref \u51FD\u6570\u8FD4\u56DE\u6267\u884C createRef \u51FD\u6570\u7684\u8FD4\u56DE\u503C</li><li>\u5728 createRef \u5185\u90E8 \u5904\u7406\u4E86\u5D4C\u5957 ref \u7684\u60C5\u51B5 \u548C\u5DF2\u7ECF\u662F\u54CD\u5E94\u5F0F\u5BF9\u8C61\u7684\u5904\u7406 \u76F4\u63A5\u8FD4\u56DE</li><li>\u63A5\u7740\u8FD4\u56DE\u4E86 RefImpl \u5BF9\u8C61\u7684\u5B9E\u4F8B</li></ul><h2 id="ref-\u7684\u4F18\u5316" tabindex="-1">ref \u7684\u4F18\u5316 <a class="header-anchor" href="#ref-\u7684\u4F18\u5316" aria-hidden="true">#</a></h2><ul><li>\u4E3B\u8981\u662F\u5BF9 ref \u5BF9\u8C61\u7684 value \u5C5E\u6027\u6267\u884C\u4F9D\u8D56\u6536\u96C6\u548C\u6D3E\u53D1\u901A\u77E5\u7684\u903B\u8F91</li><li>\u5728 3.2 \u7248\u672C ref \u7684\u5B9E\u73B0\u4E2D \u4F9D\u8D56\u6536\u96C6\u90E8\u5206\u7531\u539F\u5148\u7684 track \u51FD\u6570 \u53D8\u6210\u4E86 trackRefValue</li></ul><h2 id="trackrefvalue" tabindex="-1">trackRefValue <a class="header-anchor" href="#trackrefvalue" aria-hidden="true">#</a></h2><ul><li>\u76F4\u63A5\u628A ref \u76F8\u5173\u4F9D\u8D56\u4FDD\u5B58\u5230 dep \u5C5E\u6027\u4E2D \u5728 track \u51FD\u6570\u7684\u5B9E\u73B0 \u4F1A\u628A\u4F9D\u8D56\u4FDD\u5B58\u5728 \u5168\u5C40\u7684 targetMap \u4E2D</li><li>track \u51FD\u6570\u5185\u90E8\u53EF\u80FD\u9700\u8981\u591A\u6B21\u5224\u65AD\u548C\u8BBE\u7F6E\u903B\u8F91 \u800C\u628A\u4F9D\u8D56\u4FDD\u5B58\u5230 ref \u5BF9\u8C61\u7684 dep \u5C5E\u6027\u4E2D\u7701\u53BB\u4E86\u4E00\u7CFB\u5217\u5224\u65AD\u548C\u8BBE\u7F6E \u4F18\u5316\u4E86\u6027\u80FD</li><li>ref \u5B9E\u73B0\u7684\u6D3E\u53D1\u901A\u77E5\u7684\u90E8\u5206\u7531\u539F\u5148\u7684 trigger \u51FD\u6570 \u53D8\u6210\u4E86 triggerRefValue \u4E2D</li><li>\u7531\u4E8E\u53EF\u4EE5\u76F4\u63A5\u4ECE ref \u5C5E\u6027\u4E2D\u83B7\u53D6\u5176\u6240\u6709\u7684\u4F9D\u8D56\u5E76\u4E14\u904D\u5386\u6267\u884C \u4E0D\u9700\u8981\u6267\u884C trigger \u51FD\u6570\u7684\u989D\u5916\u903B\u8F91 \u6027\u80FD\u63D0\u9AD8</li></ul><h2 id="unref" tabindex="-1">unref <a class="header-anchor" href="#unref" aria-hidden="true">#</a></h2><ul><li>template \u4E2D\u8BBF\u95EE \u54CD\u5E94\u5F0F\u5BF9\u8C61 \u4E0D\u9700\u8981 .value \u8BBF\u95EE \u800C\u662F\u5728 setupResult \u5904\u7406\u7684\u65F6\u5019 \u8D4B\u503C\u7ED9\u7EC4\u4EF6\u5B9E\u4F8B\u4E2D\u7684 setupState \u5C5E\u6027</li><li>\u56E0\u4E3A\u521D\u59CB\u5316\u7684\u8FC7\u7A0B\u4E2D\u4F1A\u521B\u5EFA\u6E32\u67D3\u4E0A\u4E0B\u6587\u4EE3\u7406 \u6240\u4EE5\u5728 render \u51FD\u6570\u4E2D\u8BBF\u95EE _ctx.xxx \u5C31\u76F8\u5F53\u4E8E \u8BBF\u95EE\u4E86 <a href="http://instance.setupState.xxx" target="_blank" rel="noreferrer">instance.setupState.xxx</a></li><li>unref \u7684\u5B9E\u73B0\u5C31\u662F\u5224\u65AD\u662F\u4E0D\u662F\u54CD\u5E94\u5F0F\u5BF9\u8C61 \u5982\u679C\u662F \u76F4\u63A5\u8FD4\u56DE \u54CD\u5E94\u5F0F\u7684\u5BF9\u8C61\u7684 value \u503C \u4E0D\u662F\u5C31\u76F4\u63A5\u8FD4\u56DE \u539F\u5BF9\u8C61</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("source/vue/reactive-principle/ref/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
