import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.6ab74304.js";
const __pageData = JSON.parse('{"title":"Alan","titleTemplate":"\u4E2A\u4EBA\u7EAA\u5F55\u4F7F\u7528","description":"","frontmatter":{"layout":"home","title":"Alan","titleTemplate":"\u4E2A\u4EBA\u7EAA\u5F55\u4F7F\u7528","hero":{"name":"\u4E2A\u4EBA\u7AD9\u70B9","text":"\u4E13\u6CE8  & \u5206\u4EAB","tagline":"\u4E2A\u4EBA\u77E5\u8BC6\u5E93","actions":[{"theme":"brand","text":"\u5F00\u59CB","link":"/interview-questions/westore/principle//"},{"theme":"alt","text":"\u5728 github \u4E0A\u67E5\u770B","link":"https://github.com/2401345934"},{"theme":"alt","text":"\u5728 \u6398\u91D1 \u4E0A\u67E5\u770B","link":"https://juejin.cn/user/553809592726526/posts"}]},"features":[{"icon":"\u{1F4D6}","title":"\u5305\u542B\u5404\u79CD\u9762\u8BD5\u9898","details":null},{"icon":"\u{1F527}","title":"chrome-\u6280\u5DE7","details":null},{"icon":"\u{1FAA3}","title":"\u6E90\u7801 & \u7EC4\u4EF6\u5E93","details":null},{"icon":"\u{1F4C8}","title":"\u6027\u80FD\u4F18\u5316-\u6280\u5DE7","details":null},{"icon":"\u{1F68C}","title":"\u5E38\u7528 utils","details":null},{"icon":"\u{1F4E6}","title":"\u6570\u636E\u7ED3\u6784\u4E0E\u7B97\u6CD5","details":null}]},"headers":[],"relativePath":"index.md","lastUpdated":1667228412000}');
const _sfc_main = { name: "index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
