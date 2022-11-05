import { resolveComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.6ab74304.js";
const __pageData = JSON.parse('{"title":"\u5165\u95E8\u4ECB\u7ECD","description":"","frontmatter":{"createTime":"2022/10/26","tag":"\u7B97\u6CD5"},"headers":[{"level":2,"title":"\u5E38\u89C1\u7684\u6570\u636E\u7ED3\u6784","slug":"\u5E38\u89C1\u7684\u6570\u636E\u7ED3\u6784","link":"#\u5E38\u89C1\u7684\u6570\u636E\u7ED3\u6784","children":[]},{"level":2,"title":"\u5E38\u89C1\u7684\u7B97\u6CD5","slug":"\u5E38\u89C1\u7684\u7B97\u6CD5","link":"#\u5E38\u89C1\u7684\u7B97\u6CD5","children":[]}],"relativePath":"data-structures-algorithms/introduction/index.md","lastUpdated":1667281923000}');
const _sfc_main = { name: "data-structures-algorithms/introduction/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = resolveComponent("ClientOnly");
  const _component_ArticleMetadata = resolveComponent("ArticleMetadata");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="\u5165\u95E8\u4ECB\u7ECD" tabindex="-1">\u5165\u95E8\u4ECB\u7ECD <a class="header-anchor" href="#\u5165\u95E8\u4ECB\u7ECD" aria-hidden="true">#</a></h1>`);
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
  _push(`<h2 id="\u5E38\u89C1\u7684\u6570\u636E\u7ED3\u6784" tabindex="-1">\u5E38\u89C1\u7684\u6570\u636E\u7ED3\u6784 <a class="header-anchor" href="#\u5E38\u89C1\u7684\u6570\u636E\u7ED3\u6784" aria-hidden="true">#</a></h2><p>\u6570\u7EC4\u3001\u5B57\u5178\u3001\u94FE\u8868\u3001\u6808\u3001\u961F\u5217\u3001\u6563\u5217\u8868\u3001\u4E8C\u53C9\u6811\u3001\u5806\u3001\u8DF3\u8868\u3001\u56FE\u3001Trie\u6811</p><h2 id="\u5E38\u89C1\u7684\u7B97\u6CD5" tabindex="-1">\u5E38\u89C1\u7684\u7B97\u6CD5 <a class="header-anchor" href="#\u5E38\u89C1\u7684\u7B97\u6CD5" aria-hidden="true">#</a></h2><p>\u9012\u5F52\u3001\u6392\u5E8F\u3001\u4E8C\u5206\u67E5\u627E\u3001\u641C\u7D22\u3001\u54C8\u5E0C\u7B97\u6CD5\u3001\u8D2A\u5FC3\u7B97\u6CD5\u3001\u5206\u6CBB\u7B97\u6CD5\u3001\u56DE\u6EAF\u7B97\u6CD5\u3001\u52A8\u6001\u89C4\u5212\u3001\u5B57\u7B26\u4E32\u5339\u914D\u7B97\u6CD5\u7B49</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("data-structures-algorithms/introduction/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
