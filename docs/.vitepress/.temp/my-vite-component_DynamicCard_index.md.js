import { resolveComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.6ab74304.js";
const __pageData = JSON.parse('{"title":"DynamicCard \u5361\u7247\u7EC4\u4EF6","description":"","frontmatter":{"createTime":"2022/10/30","tag":"Vite,\u7EC4\u4EF6\u5E93"},"headers":[{"level":2,"title":"\u4F55\u65F6\u4F7F\u7528","slug":"\u4F55\u65F6\u4F7F\u7528","link":"#\u4F55\u65F6\u4F7F\u7528","children":[]},{"level":2,"title":"\u4EE3\u7801\u6F14\u793A","slug":"\u4EE3\u7801\u6F14\u793A","link":"#\u4EE3\u7801\u6F14\u793A","children":[]},{"level":2,"title":"API","slug":"api","link":"#api","children":[{"level":3,"title":"\u5C5E\u6027\u8BF4\u660E","slug":"\u5C5E\u6027\u8BF4\u660E","link":"#\u5C5E\u6027\u8BF4\u660E","children":[]}]}],"relativePath":"my-vite-component/DynamicCard/index.md","lastUpdated":1667281923000}');
const _sfc_main = { name: "my-vite-component/DynamicCard/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = resolveComponent("ClientOnly");
  const _component_ArticleMetadata = resolveComponent("ArticleMetadata");
  const _component_dynamic_card = resolveComponent("dynamic-card");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="dynamiccard-\u5361\u7247\u7EC4\u4EF6" tabindex="-1">DynamicCard \u5361\u7247\u7EC4\u4EF6 <a class="header-anchor" href="#dynamiccard-\u5361\u7247\u7EC4\u4EF6" aria-hidden="true">#</a></h1>`);
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
  _push(`<h2 id="\u4F55\u65F6\u4F7F\u7528" tabindex="-1">\u4F55\u65F6\u4F7F\u7528 <a class="header-anchor" href="#\u4F55\u65F6\u4F7F\u7528" aria-hidden="true">#</a></h2><p>\u7528\u4E8E\u8BA9\u5361\u7247\u52A8\u753B\u7684\u573A\u666F</p><h2 id="\u4EE3\u7801\u6F14\u793A" tabindex="-1">\u4EE3\u7801\u6F14\u793A <a class="header-anchor" href="#\u4EE3\u7801\u6F14\u793A" aria-hidden="true">#</a></h2>`);
  _push(ssrRenderComponent(_component_dynamic_card, { cardList: [
    {
      text: "\u54C8\u55BD\u54C8\u55BD\u54C8\u55BD\u54C8\u55BD1"
    },
    {
      text: "\u54C8\u55BD\u54C8\u55BD\u54C8\u55BD\u54C8\u55BD2"
    },
    {
      text: "\u54C8\u55BD\u54C8\u55BD\u54C8\u55BD\u54C8\u55BD21"
    },
    {
      text: "\u54C8\u55BD\u54C8\u55BD\u54C8\u55BD\u54C8\u55BD31"
    }
  ] }, null, _parent));
  _push(`<div class="language-tsx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="vp-code-dark"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">script</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> </span><span style="${ssrRenderStyle({ "color": "#D19A66" })}">setup</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">import </span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">{</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> </span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">DynamicCard</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> </span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">}</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> from &#39;@xiaomh/vue3-alan-vite-component&#39;;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">script</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">template</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> &lt;</span><span style="${ssrRenderStyle({ "color": "#E5C07B" })}">dynamic-card</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}"> </span><span style="${ssrRenderStyle({ "color": "#FFFFFF" })}">:cardList=&quot;[</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">  </span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">    </span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">text</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">:</span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&#39;\u54C8\u55BD\u54C8\u55BD\u54C8\u55BD\u54C8\u55BD1&#39;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">  </span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">}</span><span style="${ssrRenderStyle({ "color": "#FFFFFF" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">  </span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">    </span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">text</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">:</span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&#39;\u54C8\u55BD\u54C8\u55BD\u54C8\u55BD\u54C8\u55BD2&#39;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">  </span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">}</span><span style="${ssrRenderStyle({ "color": "#FFFFFF" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">  </span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">    </span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">text</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">:</span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&#39;\u54C8\u55BD\u54C8\u55BD\u54C8\u55BD\u54C8\u55BD21&#39;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">  </span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">}</span><span style="${ssrRenderStyle({ "color": "#FFFFFF" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">  </span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">    </span><span style="${ssrRenderStyle({ "color": "#E06C75" })}">text</span><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">:</span><span style="${ssrRenderStyle({ "color": "#98C379" })}">&#39;\u54C8\u55BD\u54C8\u55BD\u54C8\u55BD\u54C8\u55BD31&#39;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#ABB2BF" })}">  </span><span style="${ssrRenderStyle({ "color": "#C678DD" })}">}</span><span style="${ssrRenderStyle({ "color": "#FFFFFF" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#FFFFFF" })}">]&quot;&gt;&lt;/dynamic-card&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#FFFFFF" })}">&lt;/template&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#FFFFFF" })}">&lt;style&gt;&lt;/style&gt;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><pre class="vp-code-light"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">script</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}"> </span><span style="${ssrRenderStyle({ "color": "#C792EA" })}">setup</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">import </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">{</span><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}"> DynamicCard </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">}</span><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}"> from &#39;@xiaomh/vue3-alan-vite-component&#39;;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">script</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#F07178" })}">template</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}"> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#FFCB6B" })}">dynamic-card</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}"> :cardList=&quot;[</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">  {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">    text:</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}">\u54C8\u55BD\u54C8\u55BD\u54C8\u55BD\u54C8\u55BD1</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&#39;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">},</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">  {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">    text:</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}">\u54C8\u55BD\u54C8\u55BD\u54C8\u55BD\u54C8\u55BD2</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&#39;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">},</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">  {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">    text:</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}">\u54C8\u55BD\u54C8\u55BD\u54C8\u55BD\u54C8\u55BD21</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&#39;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">},</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">  {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">    text:</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}">\u54C8\u55BD\u54C8\u55BD\u54C8\u55BD\u54C8\u55BD31</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&#39;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">},</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">]&quot;&gt;&lt;/dynamic-card&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;/template&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&lt;style&gt;&lt;/style&gt;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-hidden="true">#</a></h2><h3 id="\u5C5E\u6027\u8BF4\u660E" tabindex="-1">\u5C5E\u6027\u8BF4\u660E <a class="header-anchor" href="#\u5C5E\u6027\u8BF4\u660E" aria-hidden="true">#</a></h3><table><thead><tr><th style="${ssrRenderStyle({ "text-align": "center" })}">\u5C5E\u6027</th><th style="${ssrRenderStyle({ "text-align": "center" })}">\u8BF4\u660E</th><th style="${ssrRenderStyle({ "text-align": "center" })}">\u7C7B\u578B</th><th style="${ssrRenderStyle({ "text-align": "center" })}">\u9ED8\u8BA4\u503C</th><th style="${ssrRenderStyle({ "text-align": "center" })}">\u7248\u672C</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "text-align": "center" })}">cardList</td><td style="${ssrRenderStyle({ "text-align": "center" })}">\u5361\u7247list</td><td style="${ssrRenderStyle({ "text-align": "center" })}">Array</td><td style="${ssrRenderStyle({ "text-align": "center" })}">[]</td><td style="${ssrRenderStyle({ "text-align": "center" })}">1.0.27</td></tr><tr><td style="${ssrRenderStyle({ "text-align": "center" })}">[*]text</td><td style="${ssrRenderStyle({ "text-align": "center" })}">\u5361\u7247\u6587\u672C</td><td style="${ssrRenderStyle({ "text-align": "center" })}">string</td><td style="${ssrRenderStyle({ "text-align": "center" })}">-</td><td style="${ssrRenderStyle({ "text-align": "center" })}">1.0.27</td></tr><tr><td style="${ssrRenderStyle({ "text-align": "center" })}">shape</td><td style="${ssrRenderStyle({ "text-align": "center" })}">\u5361\u7247\u6392\u5E8F 0\uFF1A\u5217\u8868 1:\u4E71\u5E8F\u6247\u5F62 2:\u6B63\u5E8F\u6247\u5F62</td><td style="${ssrRenderStyle({ "text-align": "center" })}">number</td><td style="${ssrRenderStyle({ "text-align": "center" })}">0</td><td style="${ssrRenderStyle({ "text-align": "center" })}">1.0.25</td></tr><tr><td style="${ssrRenderStyle({ "text-align": "center" })}">isKeyboardControl</td><td style="${ssrRenderStyle({ "text-align": "center" })}">\u662F\u5426\u9700\u8981\u952E\u76D8\u63A7\u5236 \u5F00\u542F\u540E\u53EF\u4EE5 \u901A\u8FC7 \u4E0A\u4E0B\u5DE6\u53F3\u7BAD\u5934\u63A7\u5236</td><td style="${ssrRenderStyle({ "text-align": "center" })}">boolean</td><td style="${ssrRenderStyle({ "text-align": "center" })}">false</td><td style="${ssrRenderStyle({ "text-align": "center" })}">1.0.25</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("my-vite-component/DynamicCard/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
