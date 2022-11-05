import { resolveComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.6ab74304.js";
const __pageData = JSON.parse('{"title":"http2.0 \u505A\u4E86\u54EA\u4E9B\u6539\u8FDB 3.0","description":"","frontmatter":{"createTime":"2022/10/26","tag":"HTTP"},"headers":[{"level":2,"title":"http2.0 \u7279\u6027\u5982\u4E0B","slug":"http2-0-\u7279\u6027\u5982\u4E0B","link":"#http2-0-\u7279\u6027\u5982\u4E0B","children":[]},{"level":2,"title":"http3.0 \u7279\u6027\u5982\u4E0B","slug":"http3-0-\u7279\u6027\u5982\u4E0B","link":"#http3-0-\u7279\u6027\u5982\u4E0B","children":[]}],"relativePath":"basic-quality/http2-http3/index.md","lastUpdated":1667281923000}');
const _sfc_main = { name: "basic-quality/http2-http3/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = resolveComponent("ClientOnly");
  const _component_ArticleMetadata = resolveComponent("ArticleMetadata");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="http2-0-\u505A\u4E86\u54EA\u4E9B\u6539\u8FDB-3-0" tabindex="-1">http2.0 \u505A\u4E86\u54EA\u4E9B\u6539\u8FDB 3.0 <a class="header-anchor" href="#http2-0-\u505A\u4E86\u54EA\u4E9B\u6539\u8FDB-3-0" aria-hidden="true">#</a></h1>`);
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
  _push(`<h2 id="http2-0-\u7279\u6027\u5982\u4E0B" tabindex="-1">http2.0 \u7279\u6027\u5982\u4E0B <a class="header-anchor" href="#http2-0-\u7279\u6027\u5982\u4E0B" aria-hidden="true">#</a></h2><ul><li>\u4E8C\u8FDB\u5236\u5206\u5E27\u4F20\u8F93</li><li>\u591A\u8DEF\u590D\u7528</li><li>\u5934\u90E8\u538B\u7F29</li><li>\u670D\u52A1\u5668\u63A8\u9001 Http3.0 \u76F8\u5BF9\u4E8E Http2.0 \u662F\u4E00\u79CD\u8131\u80CE\u6362\u9AA8\u7684\u6539\u53D8\uFF01 http \u534F\u8BAE\u662F\u5E94\u7528\u5C42\u534F\u8BAE\uFF0C\u90FD\u662F\u5EFA\u7ACB\u5728\u4F20\u8F93\u5C42\u4E4B\u4E0A\u7684\u3002\u6211\u4EEC\u4E5F\u90FD\u77E5\u9053\u4F20\u8F93\u5C42\u4E0A\u9762\u4E0D\u53EA\u6709 TCP \u534F\u8BAE\uFF0C\u8FD8\u6709\u53E6\u5916\u4E00\u4E2A\u5F3A\u5927\u7684\u534F\u8BAE UDP \u534F\u8BAE\uFF0C2.0 \u548C 1.0 \u90FD\u662F\u57FA\u4E8E TCP \u7684\uFF0C\u56E0\u6B64\u90FD\u4F1A\u6709 TCP \u5E26\u6765\u7684\u786C\u4F24\u4EE5\u53CA\u5C40\u9650\u6027\u3002\u800C Http3.0 \u5219\u662F\u5EFA\u7ACB\u5728 UDP \u7684\u57FA\u7840\u4E0A\u3002\u6240\u4EE5\u5176\u4E0E Http2.0 \u4E4B\u95F4\u6709\u8D28\u7684\u4E0D\u540C\u3002</li></ul><h2 id="http3-0-\u7279\u6027\u5982\u4E0B" tabindex="-1">http3.0 \u7279\u6027\u5982\u4E0B <a class="header-anchor" href="#http3-0-\u7279\u6027\u5982\u4E0B" aria-hidden="true">#</a></h2><ul><li>\u8FDE\u63A5\u8FC1\u79FB</li><li>\u65E0\u961F\u5934\u963B\u585E</li><li>\u81EA\u5B9A\u4E49\u7684\u62E5\u585E\u63A7\u5236</li><li>\u524D\u5411\u5B89\u5168\u548C\u524D\u5411\u7EA0\u9519</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("basic-quality/http2-http3/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
