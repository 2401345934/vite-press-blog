import { resolveComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.6ab74304.js";
const __pageData = JSON.parse('{"title":"TCP/IP / \u5982\u4F55\u4FDD\u8BC1\u6570\u636E\u5305\u4F20\u8F93\u7684\u6709\u5E8F\u53EF\u9760\uFF1F","description":"","frontmatter":{"createTime":"2022/10/26","tag":"\u8BA1\u7B97\u673A"},"headers":[{"level":2,"title":"\u5BF9\u5B57\u8282\u6D41\u5206\u6BB5\u5E76\u8FDB\u884C\u7F16\u53F7\u7136\u540E\u901A\u8FC7 ACK \u56DE\u590D\u548C\u8D85\u65F6\u91CD\u53D1\u8FD9\u4E24\u4E2A\u673A\u5236\u6765\u4FDD\u8BC1","slug":"\u5BF9\u5B57\u8282\u6D41\u5206\u6BB5\u5E76\u8FDB\u884C\u7F16\u53F7\u7136\u540E\u901A\u8FC7-ack-\u56DE\u590D\u548C\u8D85\u65F6\u91CD\u53D1\u8FD9\u4E24\u4E2A\u673A\u5236\u6765\u4FDD\u8BC1","link":"#\u5BF9\u5B57\u8282\u6D41\u5206\u6BB5\u5E76\u8FDB\u884C\u7F16\u53F7\u7136\u540E\u901A\u8FC7-ack-\u56DE\u590D\u548C\u8D85\u65F6\u91CD\u53D1\u8FD9\u4E24\u4E2A\u673A\u5236\u6765\u4FDD\u8BC1","children":[]}],"relativePath":"basic-quality/orderly-reliable-transmission/index.md","lastUpdated":1667281923000}');
const _sfc_main = { name: "basic-quality/orderly-reliable-transmission/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = resolveComponent("ClientOnly");
  const _component_ArticleMetadata = resolveComponent("ArticleMetadata");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="tcp-ip-\u5982\u4F55\u4FDD\u8BC1\u6570\u636E\u5305\u4F20\u8F93\u7684\u6709\u5E8F\u53EF\u9760\uFF1F" tabindex="-1">TCP/IP / \u5982\u4F55\u4FDD\u8BC1\u6570\u636E\u5305\u4F20\u8F93\u7684\u6709\u5E8F\u53EF\u9760\uFF1F <a class="header-anchor" href="#tcp-ip-\u5982\u4F55\u4FDD\u8BC1\u6570\u636E\u5305\u4F20\u8F93\u7684\u6709\u5E8F\u53EF\u9760\uFF1F" aria-hidden="true">#</a></h1>`);
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
  _push(`<h2 id="\u5BF9\u5B57\u8282\u6D41\u5206\u6BB5\u5E76\u8FDB\u884C\u7F16\u53F7\u7136\u540E\u901A\u8FC7-ack-\u56DE\u590D\u548C\u8D85\u65F6\u91CD\u53D1\u8FD9\u4E24\u4E2A\u673A\u5236\u6765\u4FDD\u8BC1" tabindex="-1">\u5BF9\u5B57\u8282\u6D41\u5206\u6BB5\u5E76\u8FDB\u884C\u7F16\u53F7\u7136\u540E\u901A\u8FC7 ACK \u56DE\u590D\u548C\u8D85\u65F6\u91CD\u53D1\u8FD9\u4E24\u4E2A\u673A\u5236\u6765\u4FDD\u8BC1 <a class="header-anchor" href="#\u5BF9\u5B57\u8282\u6D41\u5206\u6BB5\u5E76\u8FDB\u884C\u7F16\u53F7\u7136\u540E\u901A\u8FC7-ack-\u56DE\u590D\u548C\u8D85\u65F6\u91CD\u53D1\u8FD9\u4E24\u4E2A\u673A\u5236\u6765\u4FDD\u8BC1" aria-hidden="true">#</a></h2><ul><li>\uFF081\uFF09\u4E3A\u4E86\u4FDD\u8BC1\u6570\u636E\u5305\u7684\u53EF\u9760\u4F20\u9012\uFF0C\u53D1\u9001\u65B9\u5FC5\u987B\u628A\u5DF2\u53D1\u9001\u7684\u6570\u636E\u5305\u4FDD\u7559\u5728\u7F13\u51B2\u533A\uFF1B</li><li>\uFF082\uFF09\u5E76\u4E3A\u6BCF\u4E2A\u5DF2\u53D1\u9001\u7684\u6570\u636E\u5305\u542F\u52A8\u4E00\u4E2A\u8D85\u65F6\u5B9A\u65F6\u5668\uFF1B</li><li>\uFF083\uFF09\u5982\u5728\u5B9A\u65F6\u5668\u8D85\u65F6\u4E4B\u524D\u6536\u5230\u4E86\u5BF9\u65B9\u53D1\u6765\u7684\u5E94\u7B54\u4FE1\u606F\uFF08\u53EF\u80FD\u662F\u5BF9\u672C\u5305\u7684\u5E94\u7B54\uFF0C\u4E5F\u53EF\u4EE5\u662F\u5BF9\u672C\u5305\u540E\u7EED\u5305\u7684\u5E94\u7B54\uFF09\uFF0C\u5219\u91CA\u653E\u8BE5\u6570\u636E\u5305\u5360\u7528\u7684\u7F13\u51B2\u533A;</li><li>\uFF084\uFF09\u5426\u5219\uFF0C\u91CD\u4F20\u8BE5\u6570\u636E\u5305\uFF0C\u76F4\u5230\u6536\u5230\u5E94\u7B54\u6216\u91CD\u4F20\u6B21\u6570\u8D85\u8FC7\u89C4\u5B9A\u7684\u6700\u5927\u6B21\u6570\u4E3A\u6B62\u3002</li><li>\uFF085\uFF09\u63A5\u6536\u65B9\u6536\u5230\u6570\u636E\u5305\u540E\uFF0C\u5148\u8FDB\u884CCRC\u6821\u9A8C\uFF0C\u5982\u679C\u6B63\u786E\u5219\u628A\u6570\u636E\u4EA4\u7ED9\u4E0A\u5C42\u534F\u8BAE\uFF0C\u7136\u540E\u7ED9\u53D1\u9001\u65B9\u53D1\u9001\u4E00\u4E2A\u7D2F\u8BA1\u5E94\u7B54\u5305\uFF0C\u8868\u660E\u8BE5\u6570\u636E\u5DF2\u6536\u5230\uFF0C\u5982\u679C\u63A5\u6536\u65B9\u6B63\u597D\u4E5F\u6709\u6570\u636E\u8981\u53D1\u7ED9\u53D1\u9001\u65B9\uFF0C\u5E94\u7B54\u5305\u4E5F\u53EF\u65B9\u5728\u6570\u636E\u5305\u4E2D\u634E\u5E26\u8FC7\u53BB\u3002</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("basic-quality/orderly-reliable-transmission/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
