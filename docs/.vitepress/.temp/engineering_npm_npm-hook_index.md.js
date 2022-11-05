import { resolveComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.6ab74304.js";
const __pageData = JSON.parse('{"title":"\u4F7F\u7528 npm script \u7684\u94A9\u5B50","description":"","frontmatter":{"createTime":"2022/11/03","tag":"\u5DE5\u7A0B\u5316,npm"},"headers":[],"relativePath":"engineering/npm/npm-hook/index.md","lastUpdated":1667489121000}');
const _sfc_main = { name: "engineering/npm/npm-hook/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = resolveComponent("ClientOnly");
  const _component_ArticleMetadata = resolveComponent("ArticleMetadata");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="\u4F7F\u7528-npm-script-\u7684\u94A9\u5B50" tabindex="-1">\u4F7F\u7528 npm script \u7684\u94A9\u5B50 <a class="header-anchor" href="#\u4F7F\u7528-npm-script-\u7684\u94A9\u5B50" aria-hidden="true">#</a></h1>`);
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
  _push(`<p>\u4E3A\u4E86\u65B9\u4FBF\u5F00\u53D1\u8005\u81EA\u5B9A\u4E49\uFF0Cnpm script \u7684\u8BBE\u8BA1\u8005\u4E3A\u547D\u4EE4\u7684\u6267\u884C\u589E\u52A0\u4E86\u7C7B\u4F3C\u751F\u547D\u5468\u671F\u7684\u673A\u5236\uFF0C\u5177\u4F53\u6765\u8BF4\u5C31\u662F pre \u548C post \u94A9\u5B50\u811A\u672C\u3002\u8FD9\u79CD\u7279\u6027\u5728\u67D0\u4E9B\u64CD\u4F5C\u524D\u9700\u8981\u505A\u68C0\u67E5\u3001\u67D0\u4E9B\u64CD\u4F5C\u540E\u9700\u8981\u505A\u6E05\u7406\u7684\u60C5\u51B5\u4E0B\u975E\u5E38\u6709\u7528\u3002</p><p>\u4E3E\u4F8B\u6765\u8BF4\uFF0C\u8FD0\u884C npm run test \u7684\u65F6\u5019\uFF0C\u5206 3 \u4E2A\u9636\u6BB5\uFF1A</p><ul><li>\u68C0\u67E5 scripts \u5BF9\u8C61\u4E2D\u662F\u5426\u5B58\u5728 pretest \u547D\u4EE4\uFF0C\u5982\u679C\u6709\uFF0C\u5148\u6267\u884C\u8BE5\u547D\u4EE4\uFF1B</li><li>\u68C0\u67E5\u662F\u5426\u6709 test \u547D\u4EE4\uFF0C\u6709\u7684\u8BDD\u8FD0\u884C test \u547D\u4EE4\uFF0C\u6CA1\u6709\u7684\u8BDD\u62A5\u9519\uFF1B</li><li>\u68C0\u67E5\u662F\u5426\u5B58\u5728 posttest \u547D\u4EE4\uFF0C\u5982\u679C\u6709\uFF0C\u6267\u884C posttest \u547D\u4EE4\uFF1B</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("engineering/npm/npm-hook/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
