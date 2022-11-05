import { resolveComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.6ab74304.js";
const __pageData = JSON.parse('{"title":"\u4ECE\u8F93\u5165\u4E00\u4E2A URL \u5730\u5740\u5230\u6D4F\u89C8\u5668\u5B8C\u6210\u6E32\u67D3\u7684\u6574\u4E2A\u8FC7\u7A0B","description":"","frontmatter":{"createTime":"2022/10/25","tag":"\u6D4F\u89C8\u5668"},"headers":[{"level":2,"title":"\u7B80\u5355\u7248","slug":"\u7B80\u5355\u7248","link":"#\u7B80\u5355\u7248","children":[{"level":3,"title":"\u8FD9\u91CC\u53EF\u4EE5\u6309\u7167\u8FDB\u7A0B\u6765\u5206","slug":"\u8FD9\u91CC\u53EF\u4EE5\u6309\u7167\u8FDB\u7A0B\u6765\u5206","link":"#\u8FD9\u91CC\u53EF\u4EE5\u6309\u7167\u8FDB\u7A0B\u6765\u5206","children":[]}]},{"level":2,"title":"\u590D\u6742\u7248","slug":"\u590D\u6742\u7248","link":"#\u590D\u6742\u7248","children":[]}],"relativePath":"basic-quality/browser/browser/browser-open-url/index.md","lastUpdated":1667281923000}');
const _sfc_main = { name: "basic-quality/browser/browser/browser-open-url/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = resolveComponent("ClientOnly");
  const _component_ArticleMetadata = resolveComponent("ArticleMetadata");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="\u4ECE\u8F93\u5165\u4E00\u4E2A-url-\u5730\u5740\u5230\u6D4F\u89C8\u5668\u5B8C\u6210\u6E32\u67D3\u7684\u6574\u4E2A\u8FC7\u7A0B" tabindex="-1">\u4ECE\u8F93\u5165\u4E00\u4E2A URL \u5730\u5740\u5230\u6D4F\u89C8\u5668\u5B8C\u6210\u6E32\u67D3\u7684\u6574\u4E2A\u8FC7\u7A0B <a class="header-anchor" href="#\u4ECE\u8F93\u5165\u4E00\u4E2A-url-\u5730\u5740\u5230\u6D4F\u89C8\u5668\u5B8C\u6210\u6E32\u67D3\u7684\u6574\u4E2A\u8FC7\u7A0B" aria-hidden="true">#</a></h1>`);
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
  _push(`<h2 id="\u7B80\u5355\u7248" tabindex="-1">\u7B80\u5355\u7248 <a class="header-anchor" href="#\u7B80\u5355\u7248" aria-hidden="true">#</a></h2><h3 id="\u8FD9\u91CC\u53EF\u4EE5\u6309\u7167\u8FDB\u7A0B\u6765\u5206" tabindex="-1">\u8FD9\u91CC\u53EF\u4EE5\u6309\u7167\u8FDB\u7A0B\u6765\u5206 <a class="header-anchor" href="#\u8FD9\u91CC\u53EF\u4EE5\u6309\u7167\u8FDB\u7A0B\u6765\u5206" aria-hidden="true">#</a></h3><ul><li>\u6D4F\u89C8\u5668\u4E3B\u8FDB\u7A0B\uFF1A \u7528\u6237\u8F93\u5165\u5224\u65AD <ul><li>\u5904\u7406\u8F93\u5165\u4FE1\u606F</li><li>\u5224\u65AD\u662F URL \u8FD8\u662F \u5173\u952E\u5B57</li><li>\u5982\u679C\u662F\u5173\u952E\u5B57 \u4F1A\u6309\u7167\u9ED8\u8BA4\u5730\u5740\u7EC4\u88C5\u51FA\u4E00\u4E2A URL</li><li>\u6BD4\u5982 \u5728 \u8C37\u6B4C\u6D4F\u89C8\u5668\u76F4\u63A5\u8F93\u5165 \u767E\u5EA6 \u4E24\u5B57 \u6700\u7EC8\u4F1A\u62FC\u63A5\u6210\u4E00\u4E2A url</li><li><a href="https://www.google.com/search?q=%E7%99%BE%E5%BA%A6&amp;oq=%E7%99%BE%E5%BA%A6&amp;aqs=chrome..69i57j69i65j69i60j69i65j69i60l2.560j0j1&amp;sourceid=chrome&amp;ie=UTF-8" target="_blank" rel="noreferrer">https://www.google.com/search?q=\u767E\u5EA6&amp;oq=\u767E\u5EA6&amp;aqs=chrome..69i57j69i65j69i60j69i65j69i60l2.560j0j1&amp;sourceid=chrome&amp;ie=UTF-8</a></li><li>\u5982\u679C\u662F URL \u4F1A\u5224\u65AD\u662F\u5426\u5E26\u6709\u524D\u7F00 \u5C31\u662F http \u8FD8\u662F https</li><li>\u5982\u679C\u6CA1\u6709\u5E26\u524D\u7F00 \u4F1A\u81EA\u52A8\u5E2E\u5FD9\u62FC\u63A5\u524D\u7F00</li><li>\u5904\u7406\u5B8C\u6210\u4FE1\u606F\u5F00\u59CB\u4E0B\u4E00\u6B65</li></ul></li><li>\u6D4F\u89C8\u5668\u4E3B\u8FDB\u7A0B\uFF1A \u5F00\u59CB\u5BFC\u822A \u4EA4\u7ED9\u7F51\u7EDC\u8FDB\u7A0B</li><li>\u7F51\u7EDC\u8FDB\u7A0B\uFF1A \u51C6\u5907\u53D1\u8D77 url \u8BF7\u6C42 <ul><li>\u4F1A\u5224\u65AD\u662F\u5426\u6709\u7F13\u5B58</li><li>\u6709\u7F13\u5B58 <ul><li>\u76F4\u63A5\u8FD4\u56DE\u8D44\u6E90 \u7ED9 \u6D4F\u89C8\u5668\u4E3B\u8FDB\u7A0B</li></ul></li><li>\u65E0\u7F13\u5B58 <ul><li>DNS \u89E3\u6790 \u83B7\u53D6 IP <ul><li>\u5EFA\u7ACB TLS TCP\u94FE\u63A5</li><li>\u6784\u5EFA\u8BF7\u6C42\u5934 \u8BF7\u6C42\u884C cookies</li></ul></li><li>\u53D1\u9001 HTTP \u8BF7\u6C42</li><li>\u670D\u52A1\u5668\u5904\u7406\u8BF7\u6C42\u8FD4\u56DE HTTP \u62A5\u6587</li><li>\u8BFB\u53D6\u54CD\u5E94\u5934\u4FE1\u606F</li><li>\u6839\u636E\u72B6\u6001\u7801 \u5904\u7406</li><li>\u5982\u679C\u662F 301 \u91CD\u5B9A\u5411 <ul><li>\u6839\u636E Location \u5B57\u6BB5\u91CD\u5B9A\u5411\u5230\u65B0\u5730\u5740</li><li>\u6839\u636E Content-type \u51B3\u5B9A\u5982\u4F55\u663E\u793A\u54CD\u5E94\u5185\u5BB9</li></ul></li><li>\u544A\u8BC9\u6D4F\u89C8\u5668\u4E3B\u8FDB\u7A0B \u51C6\u5907\u901A\u77E5 \u6E32\u67D3\u8FDB\u7A0B</li></ul></li></ul></li><li>\u6D4F\u89C8\u5668\u4E3B\u8FDB\u7A0B\uFF1A \u51C6\u5907\u6E32\u67D3\u8FDB\u7A0B</li><li>\u6E32\u67D3\u8FDB\u7A0B\uFF1A \u63D0\u4EA4\u6587\u6863 \u6839\u636E \u7F51\u7EDC\u8FDB\u7A0B \u5EFA\u7ACB\u7BA1\u9053 \u51C6\u5907\u8BFB\u53D6\u54CD\u5E94\u4F53\u6570\u636E</li><li>\u7F51\u7EDC\u8FDB\u7A0B\uFF1A \u8BFB\u53D6\u54CD\u5E94\u4F53\u6570\u636E \u4F20\u8F93\u5B8C\u6210</li><li>\u6E32\u67D3\u8FDB\u7A0B\uFF1A \u786E\u8BA4\u63D0\u4EA4</li><li>\u6D4F\u89C8\u5668\u4E3B\u8FDB\u7A0B\uFF1A \u6536\u5230\u786E\u8BA4\u4FE1\u606F \u63D0\u4EA4\u4FE1\u606F</li><li>\u6E32\u67D3\u8FDB\u7A0B\uFF1A \u9875\u9762\u89E3\u6790\u548C\u8D44\u6E90\u52A0\u8F7D</li><li>\u6D4F\u89C8\u5668\u4E3B\u8FDB\u7A0B\uFF1A \u9875\u9762\u5B8C\u6210\u52A0\u8F7D</li></ul><h2 id="\u590D\u6742\u7248" tabindex="-1">\u590D\u6742\u7248 <a class="header-anchor" href="#\u590D\u6742\u7248" aria-hidden="true">#</a></h2><p><a href="https://juejin.cn/post/6844903832435032072" target="_blank" rel="noreferrer">https://juejin.cn/post/6844903832435032072</a></p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("basic-quality/browser/browser/browser-open-url/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
