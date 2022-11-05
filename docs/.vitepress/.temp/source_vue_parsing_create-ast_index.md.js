import { resolveComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.6ab74304.js";
const __pageData = JSON.parse('{"title":"\u751F\u6210 AST","description":"","frontmatter":{"createTime":"2022/10/30","tag":"Vue\u6E90\u7801"},"headers":[{"level":2,"title":"vue3 \u7684\u7F16\u8BD1\u573A\u666F","slug":"vue3-\u7684\u7F16\u8BD1\u573A\u666F","link":"#vue3-\u7684\u7F16\u8BD1\u573A\u666F","children":[]},{"level":2,"title":"compile","slug":"compile","link":"#compile","children":[]},{"level":2,"title":"baseCompile","slug":"basecompile","link":"#basecompile","children":[]},{"level":2,"title":"\u751F\u6210 AST","slug":"\u751F\u6210-ast-1","link":"#\u751F\u6210-ast-1","children":[]},{"level":2,"title":"\u5982\u679C\u901A\u8FC7\u6A21\u7248\u5B57\u7B26\u4E32\u751F\u6210 AST","slug":"\u5982\u679C\u901A\u8FC7\u6A21\u7248\u5B57\u7B26\u4E32\u751F\u6210-ast","link":"#\u5982\u679C\u901A\u8FC7\u6A21\u7248\u5B57\u7B26\u4E32\u751F\u6210-ast","children":[]}],"relativePath":"source/vue/parsing/create-ast/index.md","lastUpdated":1667281923000}');
const _sfc_main = { name: "source/vue/parsing/create-ast/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = resolveComponent("ClientOnly");
  const _component_ArticleMetadata = resolveComponent("ArticleMetadata");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="\u751F\u6210-ast" tabindex="-1">\u751F\u6210 AST <a class="header-anchor" href="#\u751F\u6210-ast" aria-hidden="true">#</a></h1>`);
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
  _push(`<h2 id="vue3-\u7684\u7F16\u8BD1\u573A\u666F" tabindex="-1">vue3 \u7684\u7F16\u8BD1\u573A\u666F <a class="header-anchor" href="#vue3-\u7684\u7F16\u8BD1\u573A\u666F" aria-hidden="true">#</a></h2><ul><li>web \u7F16\u8BD1</li><li>SSR \u7F16\u8BD1</li></ul><h2 id="compile" tabindex="-1">compile <a class="header-anchor" href="#compile" aria-hidden="true">#</a></h2><ul><li>web \u7AEF\u4E3B\u8981\u662F\u901A\u8FC7 compile \u51FD\u6570\u5B9E\u73B0\u6A21\u7248\u7F16\u8BD1</li><li>compile \u62E5\u6709\u4E24\u4E2A\u53C2\u6570 <ul><li>template \u5F85\u7F16\u8BD1\u7684\u6A21\u7248\u5B57\u7B26\u4E32</li><li>options \u4E00\u4E9B\u914D\u7F6E\u4FE1\u606F</li></ul></li><li>compile \u5185\u90E8\u901A\u8FC7 baseCompile \u51FD\u6570\u5B8C\u6210\u7F16\u8BD1\u5DE5\u4F5C \u53EF\u4EE5\u770B\u5230 baseCompile \u5728\u53C2\u6570 options \u7684\u57FA\u7840\u4E0A\u53C8\u62D3\u5C55\u4E86\u4E00\u4E9B\u914D\u7F6E</li></ul><h2 id="basecompile" tabindex="-1">baseCompile <a class="header-anchor" href="#basecompile" aria-hidden="true">#</a></h2><ul><li>\u4E3B\u8981\u505A\u4E86\u4E09\u4EF6\u4E8B <ul><li>\u89E3\u6790 template \u751F\u6210 AST \u62BD\u8C61\u8BED\u6CD5\u6811</li><li>AST \u8F6C\u6362</li><li>\u751F\u6210\u4EE3\u7801</li></ul></li></ul><h2 id="\u751F\u6210-ast-1" tabindex="-1">\u751F\u6210 AST <a class="header-anchor" href="#\u751F\u6210-ast-1" aria-hidden="true">#</a></h2><ul><li>\u5728\u8BA1\u7B97\u673A\u79D1\u5B66\u4E2D AST \u662F\u6E90\u4EE3\u7801\u8BED\u6CD5\u7ED3\u6784\u7684\u4E00\u79CD\u62BD\u8C61\u8868\u793A</li><li>\u4EE5\u6811\u72B6\u7684\u5F62\u5F0F\u8868\u793A\u7F16\u7A0B\u8BED\u8A00\u7684\u8BED\u6CD5\u7ED3\u6784</li><li>\u6811\u4E0A\u7684\u6BCF\u4E00\u4E2A\u8282\u70B9\u90FD\u8868\u793A\u6E90\u4EE3\u7801\u4E2D\u7684\u4E00\u79CD\u7ED3\u6784</li><li>AST \u662F\u6811\u72B6\u7ED3\u6784 \u5BF9\u4E8E\u6811\u4E2D\u7684\u6BCF\u4E2A\u8282\u70B9 <ul><li>type\u5B57\u6BB5\u63CF\u8FF0\u8282\u70B9\u7C7B\u578B</li><li>tag \u5B57\u6BB5\u63CF\u8FF0\u8282\u70B9\u6807\u7B7E</li><li>props \u5B57\u6BB5\u63CF\u8FF0\u8282\u70B9\u5C5E\u6027</li><li>loc \u5B57\u6BB5\u63CF\u8FF0\u8282\u70B9\u4EE3\u7801\u4F4D\u7F6E\u76F8\u5173\u4FE1\u606F</li><li>chilren \u5B57\u6BB5\u6307\u5411\u5B50\u8282\u70B9\u5BF9\u8C61\u6570\u7EC4</li></ul></li><li>AST \u4E2D\u7684\u8282\u70B9\u53EF\u4EE5\u5B8C\u6574\u7684\u63CF\u8FF0\u5728\u6A21\u7248\u4E2D\u6240\u6620\u5C04\u7684\u8282\u70B9\u4FE1\u606F</li><li>AST \u5BF9\u8C61\u7684\u6839\u8282\u70B9\u5176\u5B9E\u662F\u4E00\u4E2A\u865A\u62DF\u8282\u70B9 \u4E0D\u4F1A\u6620\u5C04\u5230\u4E00\u4E2A\u5177\u4F53\u8282\u70B9 \u8FD8\u5305\u542B\u4E86\u4E00\u4E9B\u5176\u4ED6\u5C5E\u6027 <ul><li>\u4F1A\u5728\u540E\u7EED\u8F6C\u6362\u5230\u65F6\u5019\u8D4B\u503C</li><li>\u5728\u751F\u6210\u4EE3\u7801\u7684\u65F6\u5019\u7528\u5230</li></ul></li></ul><h2 id="\u5982\u679C\u901A\u8FC7\u6A21\u7248\u5B57\u7B26\u4E32\u751F\u6210-ast" tabindex="-1">\u5982\u679C\u901A\u8FC7\u6A21\u7248\u5B57\u7B26\u4E32\u751F\u6210 AST <a class="header-anchor" href="#\u5982\u679C\u901A\u8FC7\u6A21\u7248\u5B57\u7B26\u4E32\u751F\u6210-ast" aria-hidden="true">#</a></h2><ul><li>baseParse \u51FD\u6570\u5B8C\u6210</li><li>\u7528\u4E8E\u4E24\u4E2A\u53C2\u6570 <ul><li>content \u8981\u7F16\u8BD1\u7684\u6A21\u7248\u5B57\u7B26\u4E32</li><li>options \u7F16\u8BD1\u7684\u76F8\u5173\u914D\u7F6E</li></ul></li><li>\u4E3B\u8981\u505A\u4E86\u4E09\u4EF6\u4E8B <ul><li>\u521B\u5EFA\u89E3\u6790\u4E0A\u4E0B\u6587</li><li>\u89E3\u6790\u5B50\u8282\u70B9</li><li>\u521B\u5EFAAST \u6839\u8282\u70B9</li></ul></li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("source/vue/parsing/create-ast/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
