import { resolveComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.6ab74304.js";
const __pageData = JSON.parse('{"title":"git \u5E38\u7528\u547D\u4EE4","description":"","frontmatter":{"createTime":"2022/10/23","tag":"git"},"headers":[{"level":2,"title":"\u5E38\u7528\u547D\u4EE4","slug":"\u5E38\u7528\u547D\u4EE4","link":"#\u5E38\u7528\u547D\u4EE4","children":[]},{"level":2,"title":"\u67E5\u8BE2\u914D\u7F6E\u4FE1\u606F","slug":"\u67E5\u8BE2\u914D\u7F6E\u4FE1\u606F","link":"#\u67E5\u8BE2\u914D\u7F6E\u4FE1\u606F","children":[]},{"level":2,"title":"\u7B2C\u4E00\u6B21\u4F7F\u7528git\uFF0C\u914D\u7F6E\u7528\u6237\u4FE1\u606F","slug":"\u7B2C\u4E00\u6B21\u4F7F\u7528git\uFF0C\u914D\u7F6E\u7528\u6237\u4FE1\u606F","link":"#\u7B2C\u4E00\u6B21\u4F7F\u7528git\uFF0C\u914D\u7F6E\u7528\u6237\u4FE1\u606F","children":[]},{"level":2,"title":"\u5176\u4ED6\u914D\u7F6E","slug":"\u5176\u4ED6\u914D\u7F6E","link":"#\u5176\u4ED6\u914D\u7F6E","children":[]}],"relativePath":"interview-questions/git/commands/index.md","lastUpdated":1667281923000}');
const _sfc_main = { name: "interview-questions/git/commands/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = resolveComponent("ClientOnly");
  const _component_ArticleMetadata = resolveComponent("ArticleMetadata");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="git-\u5E38\u7528\u547D\u4EE4" tabindex="-1">git \u5E38\u7528\u547D\u4EE4 <a class="header-anchor" href="#git-\u5E38\u7528\u547D\u4EE4" aria-hidden="true">#</a></h1>`);
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
  _push(`<h2 id="\u5E38\u7528\u547D\u4EE4" tabindex="-1">\u5E38\u7528\u547D\u4EE4 <a class="header-anchor" href="#\u5E38\u7528\u547D\u4EE4" aria-hidden="true">#</a></h2><ul><li>stash\uFF1A\u5B58\u50A8\u4E34\u65F6\u4EE3\u7801\u3002</li><li>reset --soft\uFF1A\u8F6F\u56DE\u6EAF\uFF0C\u56DE\u9000 commit \u7684\u540C\u65F6\u4FDD\u7559\u4FEE\u6539\u5185\u5BB9\u3002</li><li>cherry-pick\uFF1A\u590D\u5236 commit\u3002</li><li>revert\uFF1A\u64A4\u9500 commit \u7684\u4FEE\u6539\u5185\u5BB9\u3002</li><li>reflog\uFF1A\u8BB0\u5F55\u4E86 commit \u7684\u5386\u53F2\u64CD\u4F5C\u3002</li></ul><h2 id="\u67E5\u8BE2\u914D\u7F6E\u4FE1\u606F" tabindex="-1">\u67E5\u8BE2\u914D\u7F6E\u4FE1\u606F <a class="header-anchor" href="#\u67E5\u8BE2\u914D\u7F6E\u4FE1\u606F" aria-hidden="true">#</a></h2><ol><li>\u5217\u51FA\u5F53\u524D\u914D\u7F6E\uFF1Agit config --list</li><li>\u5217\u51FArepository\u914D\u7F6E\uFF1Agit config --local --list</li><li>\u5217\u51FA\u5168\u5C40\u914D\u7F6E\uFF1Agit config --global --list</li><li>\u5217\u51FA\u7CFB\u7EDF\u914D\u7F6E\uFF1Agit config --system --list</li></ol><h2 id="\u7B2C\u4E00\u6B21\u4F7F\u7528git\uFF0C\u914D\u7F6E\u7528\u6237\u4FE1\u606F" tabindex="-1">\u7B2C\u4E00\u6B21\u4F7F\u7528git\uFF0C\u914D\u7F6E\u7528\u6237\u4FE1\u606F <a class="header-anchor" href="#\u7B2C\u4E00\u6B21\u4F7F\u7528git\uFF0C\u914D\u7F6E\u7528\u6237\u4FE1\u606F" aria-hidden="true">#</a></h2><ol><li>\u914D\u7F6E\u7528\u6237\u540D\uFF1Agit config --global <a href="http://user.name" target="_blank" rel="noreferrer">user.name</a> &quot;your name&quot;</li><li>\u914D\u7F6E\u7528\u6237\u90AE\u7BB1\uFF1Agit config --global user.email &quot;<a href="mailto:youremail@github.com" target="_blank" rel="noreferrer">youremail@github.com</a>&quot;</li></ol><h2 id="\u5176\u4ED6\u914D\u7F6E" tabindex="-1">\u5176\u4ED6\u914D\u7F6E <a class="header-anchor" href="#\u5176\u4ED6\u914D\u7F6E" aria-hidden="true">#</a></h2><ol><li>\u914D\u7F6E\u89E3\u51B3\u51B2\u7A81\u65F6\u4F7F\u7528\u54EA\u79CD\u5DEE\u5F02\u5206\u6790\u5DE5\u5177\uFF0C\u6BD4\u5982\u8981\u4F7F\u7528vimdiff\uFF1Agit config --global merge.tool vimdiff</li><li>\u914D\u7F6Egit\u547D\u4EE4\u8F93\u51FA\u4E3A\u5F69\u8272\u7684\uFF1Agit config --global color.ui auto</li><li>\u914D\u7F6Egit\u4F7F\u7528\u7684\u6587\u672C\u7F16\u8F91\u5668\uFF1Agit config --global core.editor vi</li></ol></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("interview-questions/git/commands/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
