import { resolveComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.6ab74304.js";
const __pageData = JSON.parse('{"title":"computed API","description":"","frontmatter":{"createTime":"2022/10/24","tag":"Vue\u6E90\u7801"},"headers":[{"level":2,"title":"computed","slug":"computed","link":"#computed","children":[]},{"level":2,"title":"ReactiveEffect","slug":"reactiveeffect","link":"#reactiveeffect","children":[]}],"relativePath":"source/vue/computed/computed/index.md","lastUpdated":1667281923000}');
const _sfc_main = { name: "source/vue/computed/computed/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = resolveComponent("ClientOnly");
  const _component_ArticleMetadata = resolveComponent("ArticleMetadata");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="computed-api" tabindex="-1">computed API <a class="header-anchor" href="#computed-api" aria-hidden="true">#</a></h1>`);
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
  _push(`<ul><li>\u5982\u679C\u4F20\u9012\u7ED9 computed \u662F\u4E00\u4E2A\u51FD\u6570 \u5C31\u4F1A\u9ED8\u8BA4\u662F getter \u51FD\u6570 \u4E0D\u80FD\u4FEE\u6539 \u53EA\u80FD\u83B7\u53D6</li><li>\u53EF\u4EE5\u4F20\u9012\u4E00\u4E2A\u5BF9\u8C61 \u5C31\u53EF\u4EE5\u4FEE\u6539\u4E86 <ul><li>get \u8BFB\u53D6\u903B\u8F91 \u4E00\u4E2A\u51FD\u6570</li><li>set \u4FEE\u6539\u903B\u8F91 \u4E00\u4E2A\u51FD\u6570</li></ul></li></ul><h2 id="computed" tabindex="-1">computed <a class="header-anchor" href="#computed" aria-hidden="true">#</a></h2><ul><li>\u62E5\u6709\u5355\u4E2A\u53C2\u6570 getterOrOptions \u53EF\u4EE5\u662F getter \u51FD\u6570 \u4E5F\u53EF\u4EE5\u662F\u4E00\u4E2A\u5BF9\u8C61</li><li>\u9996\u5148\u4F1A\u5148\u6807\u51C6\u5316\u53C2\u6570 \u62FF\u5230\u8BA1\u7B97\u5C5E\u6027\u5BF9\u5E94\u7684 getter \u51FD\u6570\u548C setter\u51FD\u6570</li><li>\u5982\u679C\u503C\u4F20\u9012\u4E86 getter \u51FD\u6570 \u5728\u5F00\u53D1\u73AF\u5883\u4E0B \u4FEE\u6539\u4E86\u8BA1\u7B97\u5C5E\u6027\u7684\u503C \u5C31\u4F1A\u6267\u884C\u5BF9\u5E94\u7684 setter \u51FD\u6570 \u63D0\u9192\u8BE5\u8BA1\u7B97\u5C5E\u6027\u7684\u503C\u662F\u53EA\u8BFB\u7684</li><li>compupted \u51FD\u6570\u8FD4\u56DE\u4E86 ComputeRefImpl \u7684\u5B9E\u4F8B \u5728\u6784\u9020\u5668\u5185\u90E8 \u901A\u8FC7 new ReactiveEffect \u65B9\u5F0F\u521B\u5EFA\u4E86\u526F\u4F5C\u7528\u5B9E\u4F8B effect</li></ul><h2 id="reactiveeffect" tabindex="-1">ReactiveEffect <a class="header-anchor" href="#reactiveeffect" aria-hidden="true">#</a></h2><ul><li>\u7B2C\u4E00\u4E2A\u53C2\u6570 fn \u51FD\u6570\u5728\u540E\u7EED\u6267\u884C effect.run \u4F1A\u6267\u884C\u8FD9\u4E2A fn \u51FD\u6570</li><li>\u7B2C\u4E8C\u4E2A\u53C2\u6570 scheduler \u51FD\u6570 \u5728\u540E\u7EED\u6267\u884C\u6D3E\u53D1\u901A\u77E5\u7684\u65F6\u5019\u597D \u4F1A\u901A\u77E5 effect \u4F9D\u8D56\u6267\u884C\u5BF9\u5E94\u7684 scheduler \u51FD\u6570</li><li>\u5728 ComputeRefImpl \u5185\u90E8 \u5BF9\u5B9E\u4F8B\u7684 value \u5C5E\u6027\u521B\u5EFA\u4E86 getter \u548C setter \u5F53 computed \u5BF9\u8C61\u7684 value \u5C5E\u6027\u88AB\u8BBF\u95EE\u8FC7\u4E4B\u540E \u89E6\u53D1 getter \u51FD\u6570 \u5BF9\u8BA1\u7B97\u5C5E\u6027\u672C\u8EAB\u8FDB\u884C\u4F9D\u8D56\u6536\u96C6</li><li>\u7136\u540E\u5224\u65AD\u662F\u5426 _dirtry \u5982\u679C\u662F \u6267\u884C effect.run \u51FD\u6570\u91CD\u7F6E_dirtry \u7684\u503C</li><li>\u5F53\u6211\u4EEC\u76F4\u63A5\u8BBE\u7F6E computed \u5BF9\u8C61\u7684\u503C \u4F1A\u89E6\u53D1 setter \u6267\u884C compunted \u51FD\u6570\u5185\u90E8\u5B9A\u4E49\u7684 setter \u51FD\u6570</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("source/vue/computed/computed/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
