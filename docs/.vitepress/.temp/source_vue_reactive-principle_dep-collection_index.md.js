import { resolveComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.6ab74304.js";
const __pageData = JSON.parse('{"title":"\u4F9D\u8D56\u6536\u96C6","description":"","frontmatter":{"createTime":"2022/10/23","tag":"Vue\u6E90\u7801"},"headers":[{"level":2,"title":"get","slug":"get","link":"#get","children":[]},{"level":2,"title":"arrayInstrumentations","slug":"arrayinstrumentations","link":"#arrayinstrumentations","children":[]},{"level":2,"title":"track","slug":"track","link":"#track","children":[]}],"relativePath":"source/vue/reactive-principle/dep-collection/index.md","lastUpdated":1667281923000}');
const _sfc_main = { name: "source/vue/reactive-principle/dep-collection/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = resolveComponent("ClientOnly");
  const _component_ArticleMetadata = resolveComponent("ArticleMetadata");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="\u4F9D\u8D56\u6536\u96C6" tabindex="-1">\u4F9D\u8D56\u6536\u96C6 <a class="header-anchor" href="#\u4F9D\u8D56\u6536\u96C6" aria-hidden="true">#</a></h1>`);
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
  _push(`<ul><li>\u4F9D\u8D56\u6536\u96C6\u53D1\u751F\u5728\u6570\u636E\u7684\u8BBF\u95EE\u9636\u6BB5 \u5F53\u6570\u636E\u88AB\u8BBF\u95EE \u4F1A\u6267\u884C get \u51FD\u6570</li><li>get \u51FD\u6570 \u662F\u6267\u884C createGetter \u51FD\u6570\u7684\u8FD4\u56DE\u503C isReadonly \u9ED8\u8BA4 false</li></ul><h2 id="get" tabindex="-1">get <a class="header-anchor" href="#get" aria-hidden="true">#</a></h2><ul><li>get \u51FD\u6570\u4E3B\u8981\u505A\u4E86 4\u4EF6\u4E8B</li><li>\u5BF9\u7279\u6B8A\u7684 key \u505A\u4E86 \u4EE3\u7406 \u6BD4\u5982\uFF1A __v_raw \u8FD4\u56DE\u539F\u59CB\u5BF9\u8C61 target</li><li>\u5982\u679C target \u662F\u6570\u7EC4 \u5E76\u4E14\u547D\u4E2D\u4E86 arrayInstrumentations \u6267\u884C\u5185\u90E8\u5BF9\u5E94\u51FD\u6570</li><li>\u901A\u8FC7 Reflect.get \u51FD\u6570\u6C42\u503C \u5E76\u6267\u884C track \u51FD\u6570\u6536\u96C6\u4F9D\u8D56</li><li>\u5BF9\u8C61\u5C5E\u6027\u8BBF\u95EE\u7684\u65F6\u5019\u624D\u4F1A\u5224\u65AD\u5B50\u5C5E\u6027\u7684\u7C7B\u578B \u51B3\u5B9A\u662F\u5426\u8981\u9012\u5F52\u6267\u884C reactive</li></ul><h2 id="arrayinstrumentations" tabindex="-1">arrayInstrumentations <a class="header-anchor" href="#arrayinstrumentations" aria-hidden="true">#</a></h2><ul><li>\u91CD\u5199\u4E86\u6570\u7EC4\u4E2D\u7684 includes indexOf lastIndexOf \u51FD\u6570</li><li>\u5F53\u5BF9\u54CD\u5E94\u5F0F\u5BF9\u8C61\u8C03\u7528 \u8FD9\u4E09\u4E2A\u51FD\u6570 \u5C31\u4F1A \u5BF9\u6570\u7EC4\u7684\u6BCF\u4E00\u4E2A \u5143\u7D20\u90FD\u8FDB\u884C\u4EE3\u7406 \u505A\u4F9D\u8D56\u6536\u96C6</li></ul><h2 id="track" tabindex="-1">track <a class="header-anchor" href="#track" aria-hidden="true">#</a></h2><ul><li>\u521B\u5EFA\u4E86\u5168\u5C40\u7684 targetMap\u4F5C\u4E3A\u539F\u59CB\u6570\u636E\u5BF9\u8C61\u7684 Map</li><li>\u952E\u662F target \u503C\u662F depsMap \u7528\u6765\u4F5C\u4E3A\u4F9D\u8D56\u7684 Map</li><li>depsMap \u952E\u662F target \u7684key \u503C\u662F dep \u96C6\u5408</li><li>dep \u96C6\u5408 \u4E2D\u5B58\u50A8\u7684\u662F\u4F9D\u8D56\u7684\u526F\u4F5C\u7528\u51FD\u6570</li><li>\u6BCF\u6B21\u6267\u884C track \u51FD\u6570 \u5C31\u4F1A\u628A\u5F53\u524D\u6FC0\u6D3B\u526F\u4F5C\u7528\u51FD\u6570 activeEffect \u4F5C\u4E3A\u4F9D\u8D56</li><li>\u6536\u96C6\u5230 \u4E0Etarget \u76F8\u5173\u7684 depsMap \u5BF9\u5E94 key \u4E0B\u7684\u4F9D\u8D56\u96C6\u5408 dep \u4E2D</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("source/vue/reactive-principle/dep-collection/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
