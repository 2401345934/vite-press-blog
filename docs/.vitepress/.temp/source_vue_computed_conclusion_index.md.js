import { resolveComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.6ab74304.js";
const __pageData = JSON.parse('{"title":"\u8BA1\u7B97\u5C5E\u6027 computed \u603B\u7ED3","description":"","frontmatter":{"createTime":"2022/11/02","tag":"Vue\u6E90\u7801"},"headers":[],"relativePath":"source/vue/computed/conclusion/index.md","lastUpdated":1667401036000}');
const _sfc_main = { name: "source/vue/computed/conclusion/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = resolveComponent("ClientOnly");
  const _component_ArticleMetadata = resolveComponent("ArticleMetadata");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="\u8BA1\u7B97\u5C5E\u6027-computed-\u603B\u7ED3" tabindex="-1">\u8BA1\u7B97\u5C5E\u6027 computed \u603B\u7ED3 <a class="header-anchor" href="#\u8BA1\u7B97\u5C5E\u6027-computed-\u603B\u7ED3" aria-hidden="true">#</a></h1>`);
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
  _push(`<ul><li>\u8BA1\u7B97\u5C5E\u6027\u7684\u672C\u8D28\u5176\u5B9E\u5C31\u662F\u54CD\u5E94\u5F0F\u5BF9\u8C61 \u901A\u5E38\u4F1A\u4F9D\u8D56\u5355\u4E2A\u6216\u8005\u591A\u4E2A\u54CD\u5E94\u5F0F\u5BF9\u8C61\u7684\u503C</li><li>\u8BA1\u7B97\u5C5E\u6027\u4E5F\u652F\u6301\u5D4C\u5957 \u53EF\u4EE5\u7531\u5176\u4ED6\u8BA1\u7B97\u5C5E\u6027\u7684\u503C\u8BA1\u7B97\u7684\u6765</li><li>\u8BA1\u7B97\u5C5E\u6027\u7684\u6838\u5FC3\u5C31\u662F \u5EF6\u65F6\u8BA1\u7B97\u548C\u7F13\u5B58 \u5F53\u4F9D\u8D56\u53D1\u751F\u53D8\u5316 \u4EC5\u4EC5\u6807\u8BB0\u8BA1\u7B97\u5C5E\u6027\u5185\u90E8\u7684 _dirtry \u8BA1\u7B97\u5C5E\u6027\u4E0D\u4F1A\u91CD\u65B0\u8BA1\u7B97 <ul><li>\u5F53\u8BA1\u7B97\u5C5E\u6027\u503C\u88AB\u8BBF\u95EE\u7684\u65F6\u5019 \u5C31\u4F1A\u5224\u65AD\u5185\u90E8\u7684 _dirtry \u503C \u5982\u679C\u4E3A false \u5219\u76F4\u63A5\u8FD4\u56DE\u4E0A\u4E00\u6B21\u7684\u8BA1\u7B97\u7ED3\u679C</li><li>\u5982\u679C\u4E3A true \u8FD0\u884C\u5185\u90E8\u7684 effect.run \u51FD\u6570 \u91CD\u65B0\u8BA1\u7B97</li></ul></li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("source/vue/computed/conclusion/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
