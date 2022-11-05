import { resolveComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.6ab74304.js";
const __pageData = JSON.parse('{"title":"\u5E38\u7528 git","description":"","frontmatter":{"createTime":"2022/10/26","tag":"\u5DE5\u5177,git"},"headers":[{"level":2,"title":"\u962E\u4E00\u5CF0","slug":"\u962E\u4E00\u5CF0","link":"#\u962E\u4E00\u5CF0","children":[]}],"relativePath":"tool/git-all/index.md","lastUpdated":1667281923000}');
const _sfc_main = { name: "tool/git-all/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = resolveComponent("ClientOnly");
  const _component_ArticleMetadata = resolveComponent("ArticleMetadata");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="\u5E38\u7528-git" tabindex="-1">\u5E38\u7528 git <a class="header-anchor" href="#\u5E38\u7528-git" aria-hidden="true">#</a></h1>`);
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
  _push(`<h2 id="\u962E\u4E00\u5CF0" tabindex="-1">\u962E\u4E00\u5CF0 <a class="header-anchor" href="#\u962E\u4E00\u5CF0" aria-hidden="true">#</a></h2><p><a href="http://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html" target="_blank" rel="noreferrer">http://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html</a></p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("tool/git-all/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
