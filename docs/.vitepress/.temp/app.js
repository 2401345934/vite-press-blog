import { shallowRef, inject, computed, ref, reactive, markRaw, readonly, nextTick, defineComponent, onUpdated, h, watchEffect, onMounted, onUnmounted, watch, useSSRContext, mergeProps, resolveComponent, unref, createVNode, resolveDynamicComponent, withCtx, renderSlot, openBlock, createBlock, createCommentVNode, createTextVNode, toDisplayString, Fragment, renderList, provide, watchPostEffect, toRefs, createSSRApp } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderSlot, ssrInterpolate, ssrRenderTeleport, ssrRenderList, ssrRenderStyle, ssrRenderVNode, ssrRenderClass, renderToString } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.6ab74304.js";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import { useMediaQuery } from "@vueuse/core";
import md5 from "blueimp-md5";
import AlanViteComponent from "@xiaomh/vue3-alan-vite-component";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn.js";
import relativeTime from "dayjs/plugin/relativeTime.js";
const fonts = "";
const vars = "";
const base = "";
const utils = "";
const customBlock = "";
const vpCode = "";
const vpDoc = "";
const vpSponsor = "";
const siteData = JSON.parse('{"lang":"zh-CN","title":"Alan","description":"\u4E2A\u4EBA\u77E5\u8BC6\u5E93\uFF0C\u8BB0\u5F55 & \u5206\u4EAB\u4E2A\u4EBA\u788E\u7247\u5316\u3001\u7ED3\u6784\u5316\u3001\u4F53\u7CFB\u5316\u7684\u77E5\u8BC6\u5185\u5BB9\u3002","base":"/vite-press/","head":[],"appearance":true,"themeConfig":{"outline":"deep","outlineTitle":"\u76EE\u5F55","lastUpdatedText":"\u6700\u540E\u66F4\u65B0","editLink":{"pattern":"https://github.com/2401345934/vite-press/issues/new","text":"\u4E0D\u59A5\u4E4B\u5904\uFF0C\u656C\u8BF7\u96C5\u6B63"},"docFooter":{"prev":"\u4E0A\u4E00\u9875","next":"\u4E0B\u4E00\u9875"},"footer":{"message":"Welcome to the site"},"nav":[{"text":"\u9762\u8BD5\u9898","link":"/interview-questions/westore/principle/","activeMatch":"/interview-questions/"},{"text":"\u6E90\u7801","link":"/source/react/render/","activeMatch":"/source/"},{"text":"utils","link":"/utils/utils/business-utils/","activeMatch":"/utils/"},{"text":"\u5DE5\u7A0B\u5E08\u57FA\u672C\u7D20\u517B","link":"/basic-quality/http-https/","activeMatch":"/basic-quality/"},{"text":"\u7B97\u6CD5&\u6570\u636E\u7ED3\u6784","link":"/data-structures-algorithms/introduction/","activeMatch":"/data-structures-algorithms/"},{"text":"\u5DE5\u7A0B\u5316","link":"/engineering/npm/private/","activeMatch":"/engineering/"},{"text":"\u5DE5\u4F5C\u5DE5\u5177","link":"/tool/compressed-image/","activeMatch":"/tool/"},{"text":"vite-component-doc","link":"/my-vite-component/introduce/","activeMatch":"/my-vite-component/"},{"text":"CHANGELOG","link":"/CHANGELOG/","activeMatch":"/CHANGELOG/"}],"sidebar":{"/interview-questions/":[{"text":"\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F","items":[{"text":"westore","link":"/interview-questions/westore/principle/"},{"text":"\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\u7684\u7406\u89E3","link":"/interview-questions/westore/understand/"},{"text":"\u5C0F\u7A0B\u5E8F\u751F\u547D\u5468\u671F","link":"/interview-questions/westore/life-cycle/"},{"text":"\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\u4E2D\u8DEF\u7531\u8DF3\u8F6C\u7684\u65B9\u5F0F\u6709\u54EA\u4E9B\uFF1F\u533A\u522B","link":"/interview-questions/westore/router-navigate/"},{"text":"\u63D0\u9AD8\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\u7684\u5E94\u7528\u901F\u5EA6\u7684\u624B\u6BB5\u6709\u54EA\u4E9B","link":"/interview-questions/westore/optimize/"},{"text":"\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\u7684\u767B\u5F55\u6D41\u7A0B","link":"/interview-questions/westore/login/"},{"text":"\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\u7684\u53D1\u5E03\u6D41\u7A0B","link":"/interview-questions/westore/release/"},{"text":"\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\u7684\u652F\u4ED8\u6D41\u7A0B","link":"/interview-questions/westore/pay/"},{"text":"\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\u7684\u5B9E\u73B0\u539F\u7406","link":"/interview-questions/westore/implementation/"}],"collapsible":true,"collapsed":true},{"text":"html ","items":[{"text":"\u57FA\u7840","link":"/interview-questions/html/start/"}],"collapsible":true,"collapsed":true},{"text":"css ","items":[{"text":"\u57FA\u7840","link":"/interview-questions/css/start/"}],"collapsible":true,"collapsed":true},{"text":"Js ","items":[{"text":"JSON-stringify","link":"/interview-questions/js/json-stringify/"},{"text":"URL \u8F6C\u7801 \u548C\u89E3\u7801","link":"/interview-questions/js/url-encryption-to-decrypt/"},{"text":"for-in vs for-of","link":"/interview-questions/js/forIn-forOf/"},{"text":"\u8DE8\u9875\u9762\u901A\u4FE1","link":"/interview-questions/js/page-communication/"},{"text":"\u624B\u5199\u5E38\u7528\u51FD\u6570","link":"/interview-questions/js/my-js/"},{"text":"\u624B\u5199promise","link":"/interview-questions/js/my-promise/"},{"text":"\u4ECEES6\u5230ES10\u7279\u6027","link":"/interview-questions/js/es/"}],"collapsible":true,"collapsed":true},{"text":"TypeScript ","items":[{"text":"\u8BF4\u8BF4\u4F60\u5BF9 TypeScript \u7684\u7406\u89E3\uFF1F\u4E0E JavaScript \u7684\u533A\u522B\uFF1F","link":"/interview-questions/ts/ts-understand/"},{"text":"\u9762\u8BD5\u9898\u96C6\u5408","link":"/interview-questions/ts/interview-questions/"},{"text":"tsconfig","link":"/interview-questions/ts/tsconfig/"},{"text":"Array \u548C tuple \u7684\u533A\u522B","link":"/interview-questions/ts/array-tuple/"},{"text":"interface \u548C type \u7684\u533A\u522B","link":"/interview-questions/ts/interface-type/"},{"text":"unknown \u548Cany \u7684\u533A\u522B","link":"/interview-questions/ts/unknown-any/"},{"text":"type of \u548C key of \u7684\u533A\u522B","link":"/interview-questions/ts/type0f-keyOf/"},{"text":"void  \u548C never  \u7C7B\u578B\u7684 \u533A\u522B","link":"/interview-questions/ts/void-never/"}],"collapsible":true,"collapsed":true},{"text":"\u6027\u80FD\u4F18\u5316","items":[{"text":"performance","link":"/interview-questions/performance-optimization/performance/"},{"text":"HTML\u4F18\u5316","link":"/interview-questions/performance-optimization/html/"},{"text":"JS\u4F18\u5316","items":[{"text":"\u51CF\u5C11\u5F15\u7528\u7C7B\u578B\u5185\u5B58\u8BBF\u95EE","link":"/interview-questions/performance-optimization/js/reference-memory-access/"}],"collapsible":true,"collapsed":true},{"text":"\u865A\u62DF\u5217\u8868","items":[{"text":"react\u7248\u672C","link":"/interview-questions/performance-optimization/virtual-list/react/"}],"collapsible":true,"collapsed":true},{"text":"\u524D\u7AEF\u61D2\u52A0\u8F7D\u548C\u9884\u52A0\u8F7D","link":"/interview-questions/performance-optimization/lazyload-preload/"}],"collapsible":true,"collapsed":true},{"text":"Webpack ","items":[{"text":"webpack","link":"/interview-questions/webpack/start/"},{"text":"hash\u76843\u79CD\u65B9\u5F0F","link":"/interview-questions/webpack/hash/"}],"collapsible":true,"collapsed":true},{"text":"npm","items":[{"text":"\u7B80\u4ECB","link":"/interview-questions/npm/start/"},{"text":"\u5E38\u7528\u64CD\u4F5C","link":"/interview-questions/npm/common-operations/"},{"text":"link \u521B\u5EFA\u8F6F\u94FE","link":"/interview-questions/npm/link/"},{"text":"\u8FD0\u884C npm run xxx \u7684\u65F6\u5019\u53D1\u751F\u4E86\u4EC0\u4E48\uFF1F","link":"/interview-questions/npm/npm-run-xxx/"}],"collapsible":true,"collapsed":true},{"text":"Git","items":[{"text":"\u50A8\u85CF stash","link":"/interview-questions/git/stash/"},{"text":"\u5E38\u7528\u547D\u4EE4","link":"/interview-questions/git/commands/"},{"text":"\u5DE5\u4F5C\u533A&\u6682\u5B58\u533A\u7684\u64CD\u4F5C\u547D\u4EE4","link":"/interview-questions/git/workspace-temporary/"},{"text":"\u672C\u5730\u4ED3\u5E93\u4E0A\u7684\u64CD\u4F5C&gitignore","link":"/interview-questions/git/gitignore-localRepository/"}],"collapsible":true,"collapsed":true},{"text":"Nginx ","items":[{"text":"Nginx","link":"/interview-questions/nginx/start/"},{"text":"\u57FA\u7840\u77E5\u8BC6","link":"/interview-questions/nginx/basis/"}],"collapsible":true,"collapsed":true},{"text":"Docker ","items":[{"text":"Docker\u4ECB\u7ECD","link":"/interview-questions/docker/start/"}],"collapsible":true,"collapsed":true},{"text":"\u9762\u8BD5\u9898\u7EB2\u96C6\u5408","items":[{"text":"\u5B57\u8282\u524D\u7AEF\u9762\u8BD5\u9898","link":"/interview-questions/topic-outline/bytes/"},{"text":"\u5E38\u89C1\u7684\u524D\u7AEF\u7B97\u6CD5\u9898","link":"/interview-questions/topic-outline/algorithm/"},{"text":"\u9762\u8BD5\u4E07\u5B57\u603B\u7ED3\uFF08\u6D4F\u89C8\u5668\u7F51\u7EDC\u7BC7\uFF09","link":"/interview-questions/topic-outline/browser/"}],"collapsible":true,"collapsed":true}],"/source/":[{"text":"React","items":[{"text":"\u6E32\u67D3\u63A7\u5236","link":"/source/react/render/"},{"text":"\u4E8B\u4EF6\u673A\u5236","link":"/source/react/event-mechanism/"},{"text":"Hooks\u539F\u7406","link":"/source/react/hooks/"}],"collapsible":true,"collapsed":true},{"text":"Vue","items":[{"text":"Vue/\u6574\u4F53\u8BBE\u8BA1","link":"/source/vue/vue-design/"},{"text":"Vue/\u7EC4\u4EF6","items":[{"text":"\u7EC4\u4EF6\u7684\u6E32\u67D3\u6D41\u7A0B","link":"/source/vue/component/vue-component-create/"},{"text":"\u7EC4\u4EF6\u7684\u66F4\u65B0\u6D41\u7A0B","link":"/source/vue/component/vue-component-update/"},{"text":"\u7EC4\u4EF6\u7684\u5B9E\u4F8B","link":"/source/vue/component/vue-component-instance/"},{"text":"\u7EC4\u4EF6\u7684 props","link":"/source/vue/component/vue-component-props/"},{"text":"\u7EC4\u4EF6\u7684\u751F\u547D\u5468\u671F","link":"/source/vue/component/vue-component-life-cycle/"},{"text":"\u5F02\u6B65\u7EC4\u4EF6","link":"/source/vue/component/vue-component-async/"}],"collapsible":true,"collapsed":true},{"text":"Vue/\u54CD\u5E94\u5F0F\u539F\u7406","items":[{"text":"reactive API","link":"/source/vue/reactive-principle/reactive/"},{"text":"\u4F9D\u8D56\u6536\u96C6","link":"/source/vue/reactive-principle/dep-collection/"},{"text":"\u6D3E\u53D1\u901A\u77E5","link":"/source/vue/reactive-principle/notification/"},{"text":"\u54CD\u5E94\u5F0F\u5B9E\u73B0\u7684\u4F18\u5316 Vue3.2 \u7248\u672C","link":"/source/vue/reactive-principle/implementation-optimized/"},{"text":"ref","link":"/source/vue/reactive-principle/ref/"},{"text":"shallowReactive","link":"/source/vue/reactive-principle/shallowReactive/"},{"text":"readonly","link":"/source/vue/reactive-principle/readonly/"},{"text":"\u54CD\u5E94\u5F0F\u539F\u7406\u603B\u7ED3","link":"/source/vue/reactive-principle/conclusion/"}],"collapsible":true,"collapsed":true},{"text":"\u8BA1\u7B97\u5C5E\u6027 computed","items":[{"text":"computed API","link":"/source/vue/computed/computed/"},{"text":"\u8BA1\u7B97\u5C5E\u6027\u7684\u8FD0\u884C\u673A\u5236","link":"/source/vue/computed/operation-mechanism/"},{"text":"\u8BA1\u7B97\u5C5E\u6027 computed\u603B\u7ED3","link":"/source/vue/computed/conclusion/"}],"collapsible":true,"collapsed":true},{"text":"\u76D1\u542C\u5668 wacher","items":[{"text":"watch API \u7684\u5B9E\u73B0\u539F\u7406","link":"/source/vue/watch/realize-principle/"},{"text":"\u5F02\u6B65\u961F\u5217\u4EFB\u52A1\u7684\u8BBE\u8BA1","link":"/source/vue/watch/design/"},{"text":"watchEffect API","link":"/source/vue/watch/watchEffect/"},{"text":"\u5F00\u53D1\u73AF\u5883 \u4FA6\u542C\u5668\u8C03\u8BD5","link":"/source/vue/watch/dev-debg/"},{"text":"\u76D1\u542C\u5668\u603B\u7ED3","link":"/source/vue/watch/conclusion/"}],"collapsible":true,"collapsed":true},{"text":"\u6A21\u7248\u89E3\u6790","items":[{"text":"\u751F\u6210 AST","link":"/source/vue/parsing/create-ast/"},{"text":"\u521B\u5EFA\u89E3\u6790\u4E0A\u4E0B\u6587","link":"/source/vue/parsing/resolving-content/"},{"text":"\u89E3\u6790\u5B50\u8282\u70B9","link":"/source/vue/parsing/resolving-children/"},{"text":"\u521B\u5EFA AST \u6839\u8282\u70B9","link":"/source/vue/parsing/create-root/"},{"text":"\u6A21\u7248\u89E3\u6790\u603B\u7ED3","link":"/source/vue/parsing/conclusion/"}],"collapsible":true,"collapsed":true},{"text":"AST \u8F6C\u6362","items":[{"text":"AST \u8F6C\u6362","link":"/source/vue/ast-transform/ast-transform/"},{"text":"\u521B\u5EFA tramsform \u4E0A\u4E0B\u6587","link":"/source/vue/ast-transform/create-transform/"},{"text":"\u904D\u5386 AST \u8282\u70B9","link":"/source/vue/ast-transform/each-transform/"},{"text":"\u9759\u6001\u63D0\u5347","link":"/source/vue/ast-transform/hoist-static/"},{"text":"\u521B\u5EFA\u6839\u8282\u70B9\u7684\u4EE3\u7801\u751F\u6210\u8282\u70B9","link":"/source/vue/ast-transform/create-root/"},{"text":"AST \u8F6C\u6362\u603B\u7ED3","link":"/source/vue/ast-transform/conclusion/"}],"collapsible":true,"collapsed":true}],"collapsible":true,"collapsed":true}],"/utils/":[{"text":"utils","items":[{"text":"\u4E1A\u52A1utils","link":"/utils/utils/business-utils/"},{"text":"\u6570\u7EC4utils","link":"/utils/utils/array-utils/"},{"text":"\u5BF9\u8C61utils","link":"/utils/utils/object-utils/"},{"text":"\u65F6\u95F4utils","link":"/utils/utils/date-utils/"},{"text":"\u6570\u5B57utils","link":"/utils/utils/number-utils/"},{"text":"\u5B57\u7B26\u4E32utils","link":"/utils/utils/string-utils/"},{"text":"\u51FD\u6570utils","link":"/utils/utils/function-utils/"},{"text":"json-utils","link":"/utils/utils/json-utils/"},{"text":"url-utils","link":"/utils/utils/url-utils/"}],"collapsible":true,"collapsed":true},{"text":"\u6B63\u5219","items":[{"text":"\u5E38\u7528\u6B63\u5219-rules","link":"/utils/rules/"}],"collapsible":true,"collapsed":true},{"text":"hooks","items":[{"text":"\u5E38\u7528hooks","link":"/utils/hooks/"}],"collapsible":true,"collapsed":true}],"/data-structures-algorithms/":[{"text":"\u7B97\u6CD5","items":[{"text":"\u5165\u95E8","link":"/data-structures-algorithms/introduction/"},{"text":"\u65F6\u95F4\u590D\u6742\u5EA6","link":"/data-structures-algorithms/time-complexity/"},{"text":"\u7A7A\u95F4\u590D\u6742\u5EA6","link":"/data-structures-algorithms/space-complexity/"},{"text":"\u7B97\u6CD5\u9898","items":[{"text":"\u6392\u5E8F","link":"/data-structures-algorithms/sort/"},{"text":"\u6570\u7EC4","link":"/data-structures-algorithms/array/"},{"text":"\u5B57\u7B26\u4E32","link":"/data-structures-algorithms/string/"},{"text":"\u6811","link":"/data-structures-algorithms/tree/"},{"text":"\u4E8C\u53C9\u6811","link":"/data-structures-algorithms/binary-tree/"}],"collapsible":true,"collapsed":true}],"collapsible":true,"collapsed":true}],"/basic-quality/":[{"text":"HTTP","items":[{"text":"http  vs https","link":"/basic-quality/http-https/"},{"text":"HTTP \u8BF7\u6C42\u8DE8\u57DF\u95EE\u9898","link":"/basic-quality/cross-domain/"},{"text":"http \u72B6\u6001\u7801\u90FD\u6709\u54EA\u4E9B","link":"/basic-quality/status-code/"},{"text":"http2.0 \u505A\u4E86\u54EA\u4E9B\u6539\u8FDB 3.0","link":"/basic-quality/http2-http3/"},{"text":"HTTP \u53CA TLS","link":"/basic-quality/http-tls/"}],"collapsible":true,"collapsed":true},{"text":"\u6D4F\u89C8\u5668","items":[{"text":"\u6D4F\u89C8\u5668\u57FA\u7840\u6982\u5FF5","items":[{"text":"\u6D4F\u89C8\u5668\u7F13\u5B58\u673A\u6D4F\u89C8\u5668\u7684\u7EC4\u6210 & \u5185\u6838\u7EC4\u6210\u5236","link":"/basic-quality/browser/browser/composition/"},{"text":"\u6D4F\u89C8\u5668\u7F13\u5B58\u673A\u5236","link":"/basic-quality/browser/browser/browser-cache/"},{"text":"\u4ECE\u8F93\u5165\u4E00\u4E2A URL \u5730\u5740\u5230\u6D4F\u89C8\u5668\u5B8C\u6210\u6E32\u67D3\u7684\u6574\u4E2A\u8FC7\u7A0B!","link":"/basic-quality/browser/browser/browser-open-url/"},{"text":"\u6D4F\u89C8\u5668\u8FDB\u7A0B","link":"/basic-quality/browser/browser/browser-process/"},{"text":"\u6D4F\u89C8\u5668\u7684 5 \u79CD Observer","link":"/basic-quality/browser/browser/observer/"}],"collapsible":true,"collapsed":true},{"text":"\u6D4F\u89C8\u5668 storage","link":"/basic-quality/browser/browser/storage/"},{"text":"\u6D4F\u89C8\u5668\u57FA\u7840\u77E5\u8BC6\u70B9\u53CA\u5E38\u8003\u9762\u8BD5\u9898","link":"/basic-quality/browser/interview-questions/"},{"text":"V8\u5F15\u64CE","items":[{"text":"JavaScript\u662F\u600E\u4E48\u88AB\u8FD0\u884C\u8D77\u6765\u7684","link":"/basic-quality/browser/v8/start/"},{"text":"JS\u8FD0\u884C9\u5927\u6982\u5FF5","link":"/basic-quality/browser/v8/js-run/"}],"collapsible":true,"collapsed":true}],"collapsible":true,"collapsed":true},{"text":"\u8BA1\u7B97\u673A","items":[{"text":"\u8BA1\u7B97\u673A\u7F51\u7EDC","items":[{"text":"\u8BA1\u7B97\u673A\u7F51\u7EDC\u57FA\u7840\u77E5\u8BC6","link":"/basic-quality/computer-networks/"},{"text":"\u8BA1\u7B97\u673A\u7F51\u7EDC\u5206\u5C42\u7ED3\u6784","link":"/basic-quality/structure-computer-networks/"},{"text":"TCP\u4E09\u6B21\u63E1\u624B TCP \u56DB\u6B21\u6325\u624B","link":"/basic-quality/tcp-three-tcp-four/"},{"text":"TCP/IP / \u5982\u4F55\u4FDD\u8BC1\u6570\u636E\u5305\u4F20\u8F93\u7684\u6709\u5E8F\u53EF\u9760\uFF1F","link":"/basic-quality/orderly-reliable-transmission/"},{"text":"TCP\u548CUDP\u7684\u533A\u522B","link":"/basic-quality/tcp-udp/"},{"text":"TCP","link":"/basic-quality/tcp/"},{"text":"UDP","link":"/basic-quality/udp/"}],"collapsible":true,"collapsed":true},{"text":"\u8BA1\u7B97\u673A\u7EC4\u6210\u539F\u7406","link":"/basic-quality/computer-composition/"}],"collapsible":true,"collapsed":true},{"text":"\u8F6F\u80FD\u529B","items":[{"text":"\u6C9F\u901A\u80FD\u529B","items":[{"text":"\u63D0\u95EE\u7684\u827A\u672F","link":"/basic-quality/soft-power/asking-questions/","items":[]}],"collapsible":true,"collapsed":true},{"text":"\u7ED3\u6784\u5316\u601D\u7EF4-MECE\u5206\u6790\u65B9\u6CD5","link":"/basic-quality/soft-power/mece/"},{"text":"\u7BA1\u7406","link":"/basic-quality/soft-power/management/"},{"text":"\u4F30\u7B97","link":"/basic-quality/soft-power/estimate/"},{"text":"\u6982\u5FF5\u5316","link":"/basic-quality/soft-power/conceptualization/"},{"text":"\u5408\u4F5C\u5173\u7CFB","link":"/basic-quality/soft-power/relations-cooperation/"},{"text":"\u53D1\u73B0","link":"/basic-quality/soft-power/found/"}],"collapsible":true,"collapsed":true},{"text":"chrome\u5C0F\u6280\u5DE7","items":[{"text":"DevTools Tips","link":"/basic-quality/browser/chrome-dev/skills/DevTools-tips/"},{"text":"Devtools Snippets","link":"/basic-quality/browser/chrome-dev/skills/DevTools-Snippets/"},{"text":"\u4F7F\u7528 control (\u6309\u94AE) \u6765\u79FB\u52A8\u5143\u7D20","link":"/basic-quality/browser/chrome-dev/skills/control/"},{"text":"\u62D6\u52A8 & \u653E\u7F6E \u5143\u7D20","link":"/basic-quality/browser/chrome-dev/skills/drag-element/"},{"text":"$i  \u63A7\u5236\u53F0\u4E2D\u5B89\u88C5\u63D2\u4EF6","link":"/basic-quality/browser/chrome-dev/skills/$i-install/"},{"text":"\u83B7\u53D6\u67D0\u4E2A\u5143\u7D20","link":"/basic-quality/browser/chrome-dev/skills/get-element/"},{"text":"\u5FEB\u901F\u9690\u85CF\u5143\u7D20","link":"/basic-quality/browser/chrome-dev/skills/hidden-element/"},{"text":"elements\uFF0C logs\uFF0C sources & network \u4E2D\u7684\u67E5\u627E","link":"/basic-quality/browser/chrome-dev/skills/search/"},{"text":"\u7EBF\u4E0A\u73AF\u5883\u5F00\u542Fvue devtool","link":"/basic-quality/browser/chrome-dev/skills/store-global/"},{"text":"Store as global (\u5B58\u50A8\u4E3A\u4E00\u4E2A\u5168\u5C40\u53D8\u91CF)","link":"/basic-quality/browser/chrome-dev/skills/open-prod-vue-devtool/"}],"collapsible":true,"collapsed":true}],"/tool/":[{"text":"\u5DE5\u4F5C\u5DE5\u5177","items":[{"text":"\u538B\u7F29\u56FE\u7247","link":"/tool/compressed-image/"},{"text":"api\u67E5\u8BE2","link":"/tool/api-all/"},{"text":"\u5E38\u7528git\u547D\u4EE4","link":"/tool/git-all/"},{"text":"\u597D\u770B\u7684\u989C\u8272\u9009\u62E9","link":"/tool/color-all/"},{"text":"json\u53EF\u89C6\u5316","link":"/tool/json-view/"}],"collapsible":true,"collapsed":true},{"text":"\u529F\u80FD\u7F51\u7AD9","items":[{"text":"CDN","link":"/tool/cdn/"},{"text":"\u5E38\u7528\u8F6E\u5B50\u96C6\u5408","link":"/tool/tool-collection/"},{"text":"\u9875\u9762\u8BC4\u8BBA\u529F\u80FD","link":"/tool/valine/"},{"text":"\u9875\u9762\u5F15\u5BFC\u529F\u80FD","link":"/tool/intro/"},{"text":"\u9759\u6001\u7F51\u7AD9\u90E8\u7F72","link":"/tool/static-html/"},{"text":"\u597D\u770B\u7684loading\u7F51\u7AD9","link":"/tool/loading-html/"}],"collapsible":true,"collapsed":true}],"/engineering/":[{"text":"NPM","items":[{"text":"NPM\u79C1\u670D\u5E93\u7684\u642D\u5EFA","link":"/engineering/npm/private/"},{"text":"\u521D\u8BC6 npm script","link":"/engineering/npm/start-script/"},{"text":"\u8FD0\u884C\u591A\u4E2A npm script \u7684\u5404\u79CD\u59FF\u52BF","link":"/engineering/npm/more-script/"},{"text":"\u7ED9 npm script \u4F20\u9012\u53C2\u6570\u548C\u6DFB\u52A0\u6CE8\u91CA","link":"/engineering/npm/parameter-script/"},{"text":"\u4F7F\u7528 npm script \u7684\u94A9\u5B50","link":"/engineering/npm/npm-hook/"},{"text":"\u5728 npm script \u4E2D\u4F7F\u7528\u53D8\u91CF","link":"/engineering/npm/npm-var/"},{"text":"\u5B9E\u73B0\u547D\u4EE4\u884C\u81EA\u52A8\u8865\u5168","link":"/engineering/npm/npm-auto/"},{"text":"\u5B9E\u73B0 npm script \u8DE8\u5E73\u53F0\u517C\u5BB9","link":"/engineering/npm/cross-platform/"},{"text":"\u7528 node.js \u811A\u672C\u66FF\u4EE3\u590D\u6742\u7684 npm script","link":"/engineering/npm/node/"},{"text":"\u6587\u4EF6\u53D8\u5316\u65F6\u81EA\u52A8\u8FD0\u884C npm script","link":"/engineering/npm/npm-watch/"},{"text":"npm \u5B89\u88C5\u6D41\u7A0B","link":"/engineering/npm/npm-install/"}],"collapsible":true,"collapsed":true},{"text":"git","items":[{"text":"Git Submodules \u4ECB\u7ECD","link":"/engineering/git/Submodules/"}],"collapsible":true,"collapsed":true},{"text":"\u4EE3\u7801\u89C4\u8303","items":[{"text":"Eslint + Prettier + Husky + Commitlint + Lint-staged","link":"/engineering/code-specification/"}],"collapsible":true,"collapsed":true},{"text":"package.json","items":[{"text":"packager\u4ECB\u7ECD","link":"/engineering/package/package-start/"},{"text":"\u81EA\u52A8\u4FEE\u6539 packager.json \u6587\u4EF6 version","link":"/engineering/package/package-version/"}],"collapsible":true,"collapsed":true},{"text":"cicd","items":[{"text":"gitlab CiCd","link":"/engineering/gitlab-cicd/"}],"collapsible":true,"collapsed":true},{"text":"\u9879\u76EE\u642D\u5EFA","items":[{"text":"\u4ECE0\u642D\u5EFA Vite 3 + Vue 3","link":"/engineering/project-structures/vue3-vite/"}],"collapsible":true,"collapsed":true}],"/my-vite-component/":[{"text":"\u7EC4\u4EF6","items":[{"text":"\u5F00\u59CB","link":"/my-vite-component/introduce/"},{"text":"Button ","link":"/my-vite-component/Button/"},{"text":"BackTop ","link":"/my-vite-component/BackTop/"},{"text":"DigitalScroll \u6570\u5B57\u6EDA\u52A8","link":"/my-vite-component/DigitalScroll/"},{"text":"StarrySky \u661F\u7A7A\u80CC\u666F","link":"/my-vite-component/StarrySky/"},{"text":"CodeBackgroundWall \u4EE3\u7801\u80CC\u666F\u5899","link":"/my-vite-component/CodeBackgroundWall/"},{"text":"TherMometer \u6E29\u5EA6\u8BA1","link":"/my-vite-component/TherMometer/"},{"text":"YuanWar \u5706\u5706\u6218\u4E89","link":"/my-vite-component/YuanWar/"},{"text":"DynamicCard \u52A8\u753B\u5361\u7247","link":"/my-vite-component/DynamicCard/"},{"text":"TakingPictures \u62CD\u7167\u7EC4\u4EF6","link":"/my-vite-component/TakingPictures/"},{"text":"VideoRecording \u5F55\u5236\u89C6\u9891\u7EC4\u4EF6","link":"/my-vite-component/VideoRecording/"},{"text":"Clocks \u949F\u8868\u7EC4\u4EF6","link":"/my-vite-component/Clocks/"},{"text":"Spotlight \u624B\u7535\u7B52","link":"/my-vite-component/Spotlight/"}],"collapsible":true,"collapsed":true}]}},"locales":{},"langs":{},"scrollOffset":90,"cleanUrls":"disabled"}');
const EXTERNAL_URL_RE = /^[a-z]+:/i;
const APPEARANCE_KEY = "vitepress-theme-appearance";
const inBrowser$1 = typeof window !== "undefined";
const notFoundPageData = {
  relativePath: "",
  title: "404",
  description: "Not Found",
  headers: [],
  frontmatter: { sidebar: false, layout: "page" },
  lastUpdated: 0
};
function findMatchRoot(route, roots) {
  roots.sort((a, b) => {
    const levelDelta = b.split("/").length - a.split("/").length;
    if (levelDelta !== 0) {
      return levelDelta;
    } else {
      return b.length - a.length;
    }
  });
  for (const r of roots) {
    if (route.startsWith(r))
      return r;
  }
}
function resolveLocales(locales, route) {
  const localeRoot = findMatchRoot(route, Object.keys(locales));
  return localeRoot ? locales[localeRoot] : void 0;
}
function createLangDictionary(siteData2) {
  const { locales } = siteData2.themeConfig || {};
  const siteLocales = siteData2.locales;
  return locales && siteLocales ? Object.keys(locales).reduce((langs, path) => {
    langs[path] = {
      label: locales[path].label,
      lang: siteLocales[path].lang
    };
    return langs;
  }, {}) : {};
}
function resolveSiteDataByRoute(siteData2, route) {
  route = cleanRoute(siteData2, route);
  const localeData = resolveLocales(siteData2.locales || {}, route);
  const localeThemeConfig = resolveLocales(siteData2.themeConfig.locales || {}, route);
  return Object.assign({}, siteData2, localeData, {
    themeConfig: Object.assign({}, siteData2.themeConfig, localeThemeConfig, {
      locales: {}
    }),
    lang: (localeData || siteData2).lang,
    locales: {},
    langs: createLangDictionary(siteData2)
  });
}
function createTitle(siteData2, pageData) {
  var _a;
  const title = pageData.title || siteData2.title;
  const template = (_a = pageData.titleTemplate) != null ? _a : siteData2.titleTemplate;
  if (typeof template === "string" && template.includes(":title")) {
    return template.replace(/:title/g, title);
  }
  const templateString = createTitleTemplate(siteData2.title, template);
  return `${title}${templateString}`;
}
function createTitleTemplate(siteTitle, template) {
  if (template === false) {
    return "";
  }
  if (template === true || template === void 0) {
    return ` | ${siteTitle}`;
  }
  if (siteTitle === template) {
    return "";
  }
  return ` | ${template}`;
}
function cleanRoute(siteData2, route) {
  if (!inBrowser$1) {
    return route;
  }
  const base2 = siteData2.base;
  const baseWithoutSuffix = base2.endsWith("/") ? base2.slice(0, -1) : base2;
  return route.slice(baseWithoutSuffix.length);
}
function hasTag(head, tag) {
  const [tagType, tagAttrs] = tag;
  if (tagType !== "meta")
    return false;
  const keyAttr = Object.entries(tagAttrs)[0];
  if (keyAttr == null)
    return false;
  return head.some(([type, attrs]) => type === tagType && attrs[keyAttr[0]] === keyAttr[1]);
}
function mergeHead(prev, curr) {
  return [...prev.filter((tagAttrs) => !hasTag(curr, tagAttrs)), ...curr];
}
const INVALID_CHAR_REGEX = /[\u0000-\u001F"#$&*+,:;<=>?[\]^`{|}\u007F]/g;
const DRIVE_LETTER_REGEX = /^[a-z]:/i;
function sanitizeFileName(name) {
  const match = DRIVE_LETTER_REGEX.exec(name);
  const driveLetter = match ? match[0] : "";
  return driveLetter + name.slice(driveLetter.length).replace(INVALID_CHAR_REGEX, "_").replace(/(^|\/)_+(?=[^/]*$)/, "$1");
}
function joinPath(base2, path) {
  return `${base2}${path}`.replace(/\/+/g, "/");
}
function withBase(path) {
  return EXTERNAL_URL_RE.test(path) ? path : joinPath(siteDataRef.value.base, path);
}
function pathToFile(path) {
  let pagePath = path.replace(/\.html$/, "");
  pagePath = decodeURIComponent(pagePath);
  if (pagePath.endsWith("/")) {
    pagePath += "index";
  }
  {
    if (inBrowser$1) {
      const base2 = "/vite-press/";
      pagePath = sanitizeFileName(pagePath.slice(base2.length).replace(/\//g, "_") || "index") + ".md";
      const pageHash = __VP_HASH_MAP__[pagePath.toLowerCase()];
      pagePath = `${base2}assets/${pagePath}.${pageHash}.js`;
    } else {
      pagePath = `./${sanitizeFileName(pagePath.slice(1).replace(/\//g, "_"))}.md.js`;
    }
  }
  return pagePath;
}
const dataSymbol = Symbol();
const siteDataRef = shallowRef(siteData);
function initData(route) {
  const site = computed(() => resolveSiteDataByRoute(siteDataRef.value, route.path));
  return {
    site,
    theme: computed(() => site.value.themeConfig),
    page: computed(() => route.data),
    frontmatter: computed(() => route.data.frontmatter),
    lang: computed(() => site.value.lang),
    localePath: computed(() => {
      const { langs, lang } = site.value;
      const path = Object.keys(langs).find((langPath) => langs[langPath].lang === lang);
      return withBase(path || "/");
    }),
    title: computed(() => {
      return createTitle(site.value, route.data);
    }),
    description: computed(() => {
      return route.data.description || site.value.description;
    }),
    isDark: ref(false)
  };
}
function useData() {
  const data = inject(dataSymbol);
  if (!data) {
    throw new Error("vitepress data not properly injected in app");
  }
  return data;
}
const RouterSymbol = Symbol();
const fakeHost = `http://a.com`;
const getDefaultRoute = () => ({
  path: "/",
  component: null,
  data: notFoundPageData
});
function createRouter(loadPageModule, fallbackComponent) {
  const route = reactive(getDefaultRoute());
  const router = {
    route,
    go
  };
  async function go(href = inBrowser$1 ? location.href : "/") {
    var _a, _b;
    await ((_a = router.onBeforeRouteChange) == null ? void 0 : _a.call(router, href));
    const url = new URL(href, fakeHost);
    if (siteDataRef.value.cleanUrls === "disabled") {
      if (!url.pathname.endsWith("/") && !url.pathname.endsWith(".html")) {
        url.pathname += ".html";
        href = url.pathname + url.search + url.hash;
      }
    }
    if (inBrowser$1) {
      history.replaceState({ scrollPosition: window.scrollY }, document.title);
      history.pushState(null, "", href);
    }
    await loadPage(href);
    await ((_b = router.onAfterRouteChanged) == null ? void 0 : _b.call(router, href));
  }
  let latestPendingPath = null;
  async function loadPage(href, scrollPosition = 0, isRetry = false) {
    const targetLoc = new URL(href, fakeHost);
    const pendingPath = latestPendingPath = targetLoc.pathname;
    try {
      let page = await loadPageModule(pendingPath);
      if (latestPendingPath === pendingPath) {
        latestPendingPath = null;
        const { default: comp, __pageData } = page;
        if (!comp) {
          throw new Error(`Invalid route component: ${comp}`);
        }
        route.path = inBrowser$1 ? pendingPath : withBase(pendingPath);
        route.component = markRaw(comp);
        route.data = true ? markRaw(__pageData) : readonly(__pageData);
        if (inBrowser$1) {
          nextTick(() => {
            if (targetLoc.hash && !scrollPosition) {
              let target = null;
              try {
                target = document.querySelector(decodeURIComponent(targetLoc.hash));
              } catch (e) {
                console.warn(e);
              }
              if (target) {
                scrollTo(target, targetLoc.hash);
                return;
              }
            }
            window.scrollTo(0, scrollPosition);
          });
        }
      }
    } catch (err) {
      if (!/fetch/.test(err.message) && !/^\/404(\.html|\/)?$/.test(href)) {
        console.error(err);
      }
      if (!isRetry) {
        try {
          const res = await fetch(siteDataRef.value.base + "hashmap.json");
          window.__VP_HASH_MAP__ = await res.json();
          await loadPage(href, scrollPosition, true);
          return;
        } catch (e) {
        }
      }
      if (latestPendingPath === pendingPath) {
        latestPendingPath = null;
        route.path = inBrowser$1 ? pendingPath : withBase(pendingPath);
        route.component = fallbackComponent ? markRaw(fallbackComponent) : null;
        route.data = notFoundPageData;
      }
    }
  }
  if (inBrowser$1) {
    window.addEventListener("click", (e) => {
      const button = e.target.closest("button");
      if (button)
        return;
      const link2 = e.target.closest("a");
      if (link2 && !link2.closest(".vp-raw") && !link2.download) {
        const { href, origin, pathname, hash, search, target } = link2;
        const currentUrl = window.location;
        const extMatch = pathname.match(/\.\w+$/);
        if (!e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey && target !== `_blank` && origin === currentUrl.origin && !(extMatch && extMatch[0] !== ".html")) {
          e.preventDefault();
          if (pathname === currentUrl.pathname && search === currentUrl.search) {
            if (hash && hash !== currentUrl.hash) {
              history.pushState(null, "", hash);
              window.dispatchEvent(new Event("hashchange"));
              scrollTo(link2, hash, link2.classList.contains("header-anchor"));
            }
          } else {
            go(href);
          }
        }
      }
    }, { capture: true });
    window.addEventListener("popstate", (e) => {
      loadPage(location.href, e.state && e.state.scrollPosition || 0);
    });
    window.addEventListener("hashchange", (e) => {
      e.preventDefault();
    });
  }
  return router;
}
function useRouter() {
  const router = inject(RouterSymbol);
  if (!router) {
    throw new Error("useRouter() is called without provider.");
  }
  return router;
}
function useRoute() {
  return useRouter().route;
}
function scrollTo(el, hash, smooth = false) {
  let target = null;
  try {
    target = el.classList.contains("header-anchor") ? el : document.querySelector(decodeURIComponent(hash));
  } catch (e) {
    console.warn(e);
  }
  if (target) {
    let offset = siteDataRef.value.scrollOffset;
    if (typeof offset === "string") {
      offset = document.querySelector(offset).getBoundingClientRect().bottom + 24;
    }
    const targetPadding = parseInt(window.getComputedStyle(target).paddingTop, 10);
    const targetTop = window.scrollY + target.getBoundingClientRect().top - offset + targetPadding;
    if (!smooth || Math.abs(targetTop - window.scrollY) > window.innerHeight) {
      window.scrollTo(0, targetTop);
    } else {
      window.scrollTo({
        left: 0,
        top: targetTop,
        behavior: "smooth"
      });
    }
  }
}
const Content = defineComponent({
  name: "VitePressContent",
  props: {
    onContentUpdated: Function
  },
  setup(props) {
    const route = useRoute();
    onUpdated(() => {
      var _a;
      (_a = props.onContentUpdated) == null ? void 0 : _a.call(props);
    });
    return () => h("div", { style: { position: "relative" } }, [
      route.component ? h(route.component) : null
    ]);
  }
});
const HASH_RE = /#.*$/;
const EXT_RE = /(index)?\.(md|html)$/;
const inBrowser = typeof window !== "undefined";
const hashRef = ref(inBrowser ? location.hash : "");
function isExternal(path) {
  return EXTERNAL_URL_RE.test(path);
}
function throttleAndDebounce(fn, delay) {
  let timeoutId;
  let called = false;
  return () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    if (!called) {
      fn();
      called = true;
      setTimeout(() => {
        called = false;
      }, delay);
    } else {
      timeoutId = setTimeout(fn, delay);
    }
  };
}
function isActive(currentPath, matchPath, asRegex = false) {
  if (matchPath === void 0) {
    return false;
  }
  currentPath = normalize(`/${currentPath}`);
  if (asRegex) {
    return new RegExp(matchPath).test(currentPath);
  }
  if (normalize(matchPath) !== currentPath) {
    return false;
  }
  const hashMatch = matchPath.match(HASH_RE);
  if (hashMatch) {
    return hashRef.value === hashMatch[0];
  }
  return true;
}
function ensureStartingSlash(path) {
  return /^\//.test(path) ? path : `/${path}`;
}
function normalize(path) {
  return decodeURI(path).replace(HASH_RE, "").replace(EXT_RE, "");
}
function normalizeLink(url) {
  if (isExternal(url)) {
    return url;
  }
  const { site } = useData();
  const { pathname, search, hash } = new URL(url, "http://example.com");
  const normalizedPath = pathname.endsWith("/") || pathname.endsWith(".html") ? url : `${pathname.replace(/(\.md)?$/, site.value.cleanUrls === "disabled" ? ".html" : "")}${search}${hash}`;
  return withBase(normalizedPath);
}
function getSidebar(sidebar, path) {
  if (Array.isArray(sidebar)) {
    return sidebar;
  }
  path = ensureStartingSlash(path);
  for (const dir in sidebar) {
    if (path.startsWith(ensureStartingSlash(dir))) {
      return sidebar[dir];
    }
  }
  return [];
}
function getFlatSideBarLinks(sidebar) {
  const links = [];
  function recursivelyExtractLinks(items) {
    for (const item of items) {
      if (item.link) {
        links.push({ ...item, link: item.link });
      }
      if ("items" in item) {
        recursivelyExtractLinks(item.items);
      }
    }
  }
  for (const group of sidebar) {
    recursivelyExtractLinks(group.items);
  }
  return links;
}
function useSidebar() {
  const route = useRoute();
  const { theme: theme2, frontmatter } = useData();
  const isOpen = ref(false);
  const sidebar = computed(() => {
    const sidebarConfig = theme2.value.sidebar;
    const relativePath = route.data.relativePath;
    return sidebarConfig ? getSidebar(sidebarConfig, relativePath) : [];
  });
  const hasSidebar = computed(() => {
    return frontmatter.value.sidebar !== false && sidebar.value.length > 0 && frontmatter.value.layout !== "home";
  });
  const hasAside = computed(() => {
    return frontmatter.value.layout !== "home" && frontmatter.value.aside !== false;
  });
  function open() {
    isOpen.value = true;
  }
  function close() {
    isOpen.value = false;
  }
  function toggle() {
    isOpen.value ? close() : open();
  }
  return {
    isOpen,
    sidebar,
    hasSidebar,
    hasAside,
    open,
    close,
    toggle
  };
}
function useCloseSidebarOnEscape(isOpen, close) {
  let triggerElement;
  watchEffect(() => {
    triggerElement = isOpen.value ? document.activeElement : void 0;
  });
  onMounted(() => {
    window.addEventListener("keyup", onEscape);
  });
  onUnmounted(() => {
    window.removeEventListener("keyup", onEscape);
  });
  function onEscape(e) {
    if (e.key === "Escape" && isOpen.value) {
      close();
      triggerElement == null ? void 0 : triggerElement.focus();
    }
  }
}
const _sfc_main$1g = /* @__PURE__ */ defineComponent({
  __name: "VPSkipLink",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const backToTop = ref();
    watch(() => route.path, () => backToTop.value.focus());
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><span tabindex="-1" data-v-151f2593></span><a href="#VPContent" class="VPSkipLink visually-hidden" data-v-151f2593> Skip to content </a><!--]-->`);
    };
  }
});
const VPSkipLink_vue_vue_type_style_index_0_scoped_151f2593_lang = "";
const _sfc_setup$1g = _sfc_main$1g.setup;
_sfc_main$1g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPSkipLink.vue");
  return _sfc_setup$1g ? _sfc_setup$1g(props, ctx) : void 0;
};
const VPSkipLink = /* @__PURE__ */ _export_sfc(_sfc_main$1g, [["__scopeId", "data-v-151f2593"]]);
const _sfc_main$1f = /* @__PURE__ */ defineComponent({
  __name: "VPBackdrop",
  __ssrInlineRender: true,
  props: {
    show: { type: Boolean }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.show) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPBackdrop" }, _attrs))} data-v-0164f098></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const VPBackdrop_vue_vue_type_style_index_0_scoped_0164f098_lang = "";
const _sfc_setup$1f = _sfc_main$1f.setup;
_sfc_main$1f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPBackdrop.vue");
  return _sfc_setup$1f ? _sfc_setup$1f(props, ctx) : void 0;
};
const VPBackdrop = /* @__PURE__ */ _export_sfc(_sfc_main$1f, [["__scopeId", "data-v-0164f098"]]);
function useNav() {
  const isScreenOpen = ref(false);
  function openScreen() {
    isScreenOpen.value = true;
    window.addEventListener("resize", closeScreenOnTabletWindow);
  }
  function closeScreen() {
    isScreenOpen.value = false;
    window.removeEventListener("resize", closeScreenOnTabletWindow);
  }
  function toggleScreen() {
    isScreenOpen.value ? closeScreen() : openScreen();
  }
  function closeScreenOnTabletWindow() {
    window.outerWidth >= 768 && closeScreen();
  }
  const route = useRoute();
  watch(() => route.path, closeScreen);
  return {
    isScreenOpen,
    openScreen,
    closeScreen,
    toggleScreen
  };
}
const __default__ = {
  inheritAttrs: false
};
const _sfc_main$1e = /* @__PURE__ */ defineComponent({
  ...__default__,
  __name: "VPImage",
  __ssrInlineRender: true,
  props: {
    image: null,
    alt: null
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_VPImage = resolveComponent("VPImage", true);
      if (__props.image) {
        _push(`<!--[-->`);
        if (typeof __props.image === "string" || "src" in __props.image) {
          _push(`<img${ssrRenderAttrs(mergeProps({ class: "VPImage" }, typeof __props.image === "string" ? _ctx.$attrs : { ...__props.image, ..._ctx.$attrs }, {
            src: unref(withBase)(typeof __props.image === "string" ? __props.image : __props.image.src),
            alt: (_a = __props.alt) != null ? _a : typeof __props.image === "string" ? "" : __props.image.alt || ""
          }))} data-v-b7ac6bd3>`);
        } else {
          _push(`<!--[-->`);
          _push(ssrRenderComponent(_component_VPImage, mergeProps({
            class: "dark",
            image: __props.image.dark,
            alt: typeof __props.image.dark === "string" ? __props.image.alt : __props.image.dark.alt || __props.image.alt
          }, _ctx.$attrs), null, _parent));
          _push(ssrRenderComponent(_component_VPImage, mergeProps({
            class: "light",
            image: __props.image.light,
            alt: typeof __props.image.light === "string" ? __props.image.alt : __props.image.light.alt || __props.image.alt
          }, _ctx.$attrs), null, _parent));
          _push(`<!--]-->`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const VPImage_vue_vue_type_style_index_0_scoped_b7ac6bd3_lang = "";
const _sfc_setup$1e = _sfc_main$1e.setup;
_sfc_main$1e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPImage.vue");
  return _sfc_setup$1e ? _sfc_setup$1e(props, ctx) : void 0;
};
const VPImage = /* @__PURE__ */ _export_sfc(_sfc_main$1e, [["__scopeId", "data-v-b7ac6bd3"]]);
const _sfc_main$1d = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarTitle",
  __ssrInlineRender: true,
  setup(__props) {
    const { site, theme: theme2 } = useData();
    const { hasSidebar } = useSidebar();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["VPNavBarTitle", { "has-sidebar": unref(hasSidebar) }]
      }, _attrs))} data-v-d5925166><a class="title"${ssrRenderAttr("href", unref(site).base)} data-v-d5925166>`);
      ssrRenderSlot(_ctx.$slots, "nav-bar-title-before", {}, null, _push, _parent);
      _push(ssrRenderComponent(VPImage, {
        class: "logo",
        image: unref(theme2).logo
      }, null, _parent));
      if (unref(theme2).siteTitle) {
        _push(`<!--[-->${ssrInterpolate(unref(theme2).siteTitle)}<!--]-->`);
      } else if (unref(theme2).siteTitle === void 0) {
        _push(`<!--[-->${ssrInterpolate(unref(site).title)}<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "nav-bar-title-after", {}, null, _push, _parent);
      _push(`</a></div>`);
    };
  }
});
const VPNavBarTitle_vue_vue_type_style_index_0_scoped_d5925166_lang = "";
const _sfc_setup$1d = _sfc_main$1d.setup;
_sfc_main$1d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarTitle.vue");
  return _sfc_setup$1d ? _sfc_setup$1d(props, ctx) : void 0;
};
const VPNavBarTitle = /* @__PURE__ */ _export_sfc(_sfc_main$1d, [["__scopeId", "data-v-d5925166"]]);
/**
 * lunr - http://lunrjs.com - A bit like Solr, but much smaller and not as bright - 2.3.9
 * Copyright (C) 2020 Oliver Nightingale
 * @license MIT
 */
var lunr = function(config) {
  var builder = new lunr.Builder();
  builder.pipeline.add(lunr.trimmer, lunr.stopWordFilter, lunr.stemmer);
  builder.searchPipeline.add(lunr.stemmer);
  config.call(builder, builder);
  return builder.build();
};
lunr.version = "2.3.9";
/*!
 * lunr.utils
 * Copyright (C) 2020 Oliver Nightingale
 */
lunr.utils = {};
lunr.utils.warn = function(global2) {
  return function(message) {
    if (global2.console && console.warn) {
      console.warn(message);
    }
  };
}(globalThis);
lunr.utils.asString = function(obj) {
  if (obj === void 0 || obj === null) {
    return "";
  } else {
    return obj.toString();
  }
};
lunr.utils.clone = function(obj) {
  if (obj === null || obj === void 0) {
    return obj;
  }
  var clone = /* @__PURE__ */ Object.create(null), keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i], val = obj[key];
    if (Array.isArray(val)) {
      clone[key] = val.slice();
      continue;
    }
    if (typeof val === "string" || typeof val === "number" || typeof val === "boolean") {
      clone[key] = val;
      continue;
    }
    throw new TypeError(
      "clone is not deep and does not support nested objects"
    );
  }
  return clone;
};
lunr.FieldRef = function(docRef, fieldName, stringValue) {
  this.docRef = docRef;
  this.fieldName = fieldName;
  this._stringValue = stringValue;
};
lunr.FieldRef.joiner = "/";
lunr.FieldRef.fromString = function(s) {
  var n = s.indexOf(lunr.FieldRef.joiner);
  if (n === -1) {
    throw "malformed field ref string";
  }
  var fieldRef = s.slice(0, n), docRef = s.slice(n + 1);
  return new lunr.FieldRef(docRef, fieldRef, s);
};
lunr.FieldRef.prototype.toString = function() {
  if (this._stringValue == void 0) {
    this._stringValue = this.fieldName + lunr.FieldRef.joiner + this.docRef;
  }
  return this._stringValue;
};
/*!
 * lunr.Set
 * Copyright (C) 2020 Oliver Nightingale
 */
lunr.Set = function(elements) {
  this.elements = /* @__PURE__ */ Object.create(null);
  if (elements) {
    this.length = elements.length;
    for (var i = 0; i < this.length; i++) {
      this.elements[elements[i]] = true;
    }
  } else {
    this.length = 0;
  }
};
lunr.Set.complete = {
  intersect: function(other) {
    return other;
  },
  union: function() {
    return this;
  },
  contains: function() {
    return true;
  }
};
lunr.Set.empty = {
  intersect: function() {
    return this;
  },
  union: function(other) {
    return other;
  },
  contains: function() {
    return false;
  }
};
lunr.Set.prototype.contains = function(object) {
  return !!this.elements[object];
};
lunr.Set.prototype.intersect = function(other) {
  var a, b, elements, intersection = [];
  if (other === lunr.Set.complete) {
    return this;
  }
  if (other === lunr.Set.empty) {
    return other;
  }
  if (this.length < other.length) {
    a = this;
    b = other;
  } else {
    a = other;
    b = this;
  }
  elements = Object.keys(a.elements);
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    if (element in b.elements) {
      intersection.push(element);
    }
  }
  return new lunr.Set(intersection);
};
lunr.Set.prototype.union = function(other) {
  if (other === lunr.Set.complete) {
    return lunr.Set.complete;
  }
  if (other === lunr.Set.empty) {
    return this;
  }
  return new lunr.Set(
    Object.keys(this.elements).concat(Object.keys(other.elements))
  );
};
lunr.idf = function(posting, documentCount) {
  var documentsWithTerm = 0;
  for (var fieldName in posting) {
    if (fieldName == "_index")
      continue;
    documentsWithTerm += Object.keys(posting[fieldName]).length;
  }
  var x = (documentCount - documentsWithTerm + 0.5) / (documentsWithTerm + 0.5);
  return Math.log(1 + Math.abs(x));
};
lunr.Token = function(str, metadata) {
  this.str = str || "";
  this.metadata = metadata || {};
};
lunr.Token.prototype.toString = function() {
  return this.str;
};
lunr.Token.prototype.update = function(fn) {
  this.str = fn(this.str, this.metadata);
  return this;
};
lunr.Token.prototype.clone = function(fn) {
  fn = fn || function(s) {
    return s;
  };
  return new lunr.Token(fn(this.str, this.metadata), this.metadata);
};
/*!
 * lunr.tokenizer
 * Copyright (C) 2020 Oliver Nightingale
 */
lunr.tokenizer = function(obj, metadata) {
  if (obj == null || obj == void 0) {
    return [];
  }
  if (Array.isArray(obj)) {
    return obj.map(function(t) {
      return new lunr.Token(
        lunr.utils.asString(t).toLowerCase(),
        lunr.utils.clone(metadata)
      );
    });
  }
  var str = obj.toString().toLowerCase(), len = str.length, tokens = [];
  for (var sliceEnd = 0, sliceStart = 0; sliceEnd <= len; sliceEnd++) {
    var char = str.charAt(sliceEnd), sliceLength = sliceEnd - sliceStart;
    if (char.match(lunr.tokenizer.separator) || sliceEnd == len) {
      if (sliceLength > 0) {
        var tokenMetadata = lunr.utils.clone(metadata) || {};
        tokenMetadata["position"] = [sliceStart, sliceLength];
        tokenMetadata["index"] = tokens.length;
        tokens.push(
          new lunr.Token(str.slice(sliceStart, sliceEnd), tokenMetadata)
        );
      }
      sliceStart = sliceEnd + 1;
    }
  }
  return tokens;
};
lunr.tokenizer.separator = /[\s\-]+/;
/*!
 * lunr.Pipeline
 * Copyright (C) 2020 Oliver Nightingale
 */
lunr.Pipeline = function() {
  this._stack = [];
};
lunr.Pipeline.registeredFunctions = /* @__PURE__ */ Object.create(null);
lunr.Pipeline.registerFunction = function(fn, label) {
  if (label in this.registeredFunctions) {
    lunr.utils.warn("Overwriting existing registered function: " + label);
  }
  fn.label = label;
  lunr.Pipeline.registeredFunctions[fn.label] = fn;
};
lunr.Pipeline.warnIfFunctionNotRegistered = function(fn) {
  var isRegistered = fn.label && fn.label in this.registeredFunctions;
  if (!isRegistered) {
    lunr.utils.warn(
      "Function is not registered with pipeline. This may cause problems when serialising the index.\n",
      fn
    );
  }
};
lunr.Pipeline.load = function(serialised) {
  var pipeline = new lunr.Pipeline();
  serialised.forEach(function(fnName) {
    var fn = lunr.Pipeline.registeredFunctions[fnName];
    if (fn) {
      pipeline.add(fn);
    } else {
      throw new Error("Cannot load unregistered function: " + fnName);
    }
  });
  return pipeline;
};
lunr.Pipeline.prototype.add = function() {
  var fns = Array.prototype.slice.call(arguments);
  fns.forEach(function(fn) {
    lunr.Pipeline.warnIfFunctionNotRegistered(fn);
    this._stack.push(fn);
  }, this);
};
lunr.Pipeline.prototype.after = function(existingFn, newFn) {
  lunr.Pipeline.warnIfFunctionNotRegistered(newFn);
  var pos = this._stack.indexOf(existingFn);
  if (pos == -1) {
    throw new Error("Cannot find existingFn");
  }
  pos = pos + 1;
  this._stack.splice(pos, 0, newFn);
};
lunr.Pipeline.prototype.before = function(existingFn, newFn) {
  lunr.Pipeline.warnIfFunctionNotRegistered(newFn);
  var pos = this._stack.indexOf(existingFn);
  if (pos == -1) {
    throw new Error("Cannot find existingFn");
  }
  this._stack.splice(pos, 0, newFn);
};
lunr.Pipeline.prototype.remove = function(fn) {
  var pos = this._stack.indexOf(fn);
  if (pos == -1) {
    return;
  }
  this._stack.splice(pos, 1);
};
lunr.Pipeline.prototype.run = function(tokens) {
  var stackLength = this._stack.length;
  for (var i = 0; i < stackLength; i++) {
    var fn = this._stack[i];
    var memo = [];
    for (var j = 0; j < tokens.length; j++) {
      var result = fn(tokens[j], j, tokens);
      if (result === null || result === void 0 || result === "")
        continue;
      if (Array.isArray(result)) {
        for (var k = 0; k < result.length; k++) {
          memo.push(result[k]);
        }
      } else {
        memo.push(result);
      }
    }
    tokens = memo;
  }
  return tokens;
};
lunr.Pipeline.prototype.runString = function(str, metadata) {
  var token = new lunr.Token(str, metadata);
  return this.run([token]).map(function(t) {
    return t.toString();
  });
};
lunr.Pipeline.prototype.reset = function() {
  this._stack = [];
};
lunr.Pipeline.prototype.toJSON = function() {
  return this._stack.map(function(fn) {
    lunr.Pipeline.warnIfFunctionNotRegistered(fn);
    return fn.label;
  });
};
/*!
 * lunr.Vector
 * Copyright (C) 2020 Oliver Nightingale
 */
lunr.Vector = function(elements) {
  this._magnitude = 0;
  this.elements = elements || [];
};
lunr.Vector.prototype.positionForIndex = function(index) {
  if (this.elements.length == 0) {
    return 0;
  }
  var start = 0, end = this.elements.length / 2, sliceLength = end - start, pivotPoint = Math.floor(sliceLength / 2), pivotIndex = this.elements[pivotPoint * 2];
  while (sliceLength > 1) {
    if (pivotIndex < index) {
      start = pivotPoint;
    }
    if (pivotIndex > index) {
      end = pivotPoint;
    }
    if (pivotIndex == index) {
      break;
    }
    sliceLength = end - start;
    pivotPoint = start + Math.floor(sliceLength / 2);
    pivotIndex = this.elements[pivotPoint * 2];
  }
  if (pivotIndex == index) {
    return pivotPoint * 2;
  }
  if (pivotIndex > index) {
    return pivotPoint * 2;
  }
  if (pivotIndex < index) {
    return (pivotPoint + 1) * 2;
  }
};
lunr.Vector.prototype.insert = function(insertIdx, val) {
  this.upsert(insertIdx, val, function() {
    throw "duplicate index";
  });
};
lunr.Vector.prototype.upsert = function(insertIdx, val, fn) {
  this._magnitude = 0;
  var position = this.positionForIndex(insertIdx);
  if (this.elements[position] == insertIdx) {
    this.elements[position + 1] = fn(this.elements[position + 1], val);
  } else {
    this.elements.splice(position, 0, insertIdx, val);
  }
};
lunr.Vector.prototype.magnitude = function() {
  if (this._magnitude)
    return this._magnitude;
  var sumOfSquares = 0, elementsLength = this.elements.length;
  for (var i = 1; i < elementsLength; i += 2) {
    var val = this.elements[i];
    sumOfSquares += val * val;
  }
  return this._magnitude = Math.sqrt(sumOfSquares);
};
lunr.Vector.prototype.dot = function(otherVector) {
  var dotProduct = 0, a = this.elements, b = otherVector.elements, aLen = a.length, bLen = b.length, aVal = 0, bVal = 0, i = 0, j = 0;
  while (i < aLen && j < bLen) {
    aVal = a[i], bVal = b[j];
    if (aVal < bVal) {
      i += 2;
    } else if (aVal > bVal) {
      j += 2;
    } else if (aVal == bVal) {
      dotProduct += a[i + 1] * b[j + 1];
      i += 2;
      j += 2;
    }
  }
  return dotProduct;
};
lunr.Vector.prototype.similarity = function(otherVector) {
  return this.dot(otherVector) / this.magnitude() || 0;
};
lunr.Vector.prototype.toArray = function() {
  var output = new Array(this.elements.length / 2);
  for (var i = 1, j = 0; i < this.elements.length; i += 2, j++) {
    output[j] = this.elements[i];
  }
  return output;
};
lunr.Vector.prototype.toJSON = function() {
  return this.elements;
};
/*!
 * lunr.stemmer
 * Copyright (C) 2020 Oliver Nightingale
 * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
 */
lunr.stemmer = function() {
  var step2list = {
    ational: "ate",
    tional: "tion",
    enci: "ence",
    anci: "ance",
    izer: "ize",
    bli: "ble",
    alli: "al",
    entli: "ent",
    eli: "e",
    ousli: "ous",
    ization: "ize",
    ation: "ate",
    ator: "ate",
    alism: "al",
    iveness: "ive",
    fulness: "ful",
    ousness: "ous",
    aliti: "al",
    iviti: "ive",
    biliti: "ble",
    logi: "log"
  }, step3list = {
    icate: "ic",
    ative: "",
    alize: "al",
    iciti: "ic",
    ical: "ic",
    ful: "",
    ness: ""
  }, c = "[^aeiou]", v = "[aeiouy]", C = c + "[^aeiouy]*", V = v + "[aeiou]*", mgr0 = "^(" + C + ")?" + V + C, meq1 = "^(" + C + ")?" + V + C + "(" + V + ")?$", mgr1 = "^(" + C + ")?" + V + C + V + C, s_v = "^(" + C + ")?" + v;
  var re_mgr0 = new RegExp(mgr0);
  var re_mgr1 = new RegExp(mgr1);
  var re_meq1 = new RegExp(meq1);
  var re_s_v = new RegExp(s_v);
  var re_1a = /^(.+?)(ss|i)es$/;
  var re2_1a = /^(.+?)([^s])s$/;
  var re_1b = /^(.+?)eed$/;
  var re2_1b = /^(.+?)(ed|ing)$/;
  var re_1b_2 = /.$/;
  var re2_1b_2 = /(at|bl|iz)$/;
  var re3_1b_2 = new RegExp("([^aeiouylsz])\\1$");
  var re4_1b_2 = new RegExp("^" + C + v + "[^aeiouwxy]$");
  var re_1c = /^(.+?[^aeiou])y$/;
  var re_2 = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
  var re_3 = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
  var re_4 = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
  var re2_4 = /^(.+?)(s|t)(ion)$/;
  var re_5 = /^(.+?)e$/;
  var re_5_1 = /ll$/;
  var re3_5 = new RegExp("^" + C + v + "[^aeiouwxy]$");
  var porterStemmer = function porterStemmer2(w) {
    var stem, suffix, firstch, re, re2, re3, re4;
    if (w.length < 3) {
      return w;
    }
    firstch = w.substr(0, 1);
    if (firstch == "y") {
      w = firstch.toUpperCase() + w.substr(1);
    }
    re = re_1a;
    re2 = re2_1a;
    if (re.test(w)) {
      w = w.replace(re, "$1$2");
    } else if (re2.test(w)) {
      w = w.replace(re2, "$1$2");
    }
    re = re_1b;
    re2 = re2_1b;
    if (re.test(w)) {
      var fp = re.exec(w);
      re = re_mgr0;
      if (re.test(fp[1])) {
        re = re_1b_2;
        w = w.replace(re, "");
      }
    } else if (re2.test(w)) {
      var fp = re2.exec(w);
      stem = fp[1];
      re2 = re_s_v;
      if (re2.test(stem)) {
        w = stem;
        re2 = re2_1b_2;
        re3 = re3_1b_2;
        re4 = re4_1b_2;
        if (re2.test(w)) {
          w = w + "e";
        } else if (re3.test(w)) {
          re = re_1b_2;
          w = w.replace(re, "");
        } else if (re4.test(w)) {
          w = w + "e";
        }
      }
    }
    re = re_1c;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      w = stem + "i";
    }
    re = re_2;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      suffix = fp[2];
      re = re_mgr0;
      if (re.test(stem)) {
        w = stem + step2list[suffix];
      }
    }
    re = re_3;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      suffix = fp[2];
      re = re_mgr0;
      if (re.test(stem)) {
        w = stem + step3list[suffix];
      }
    }
    re = re_4;
    re2 = re2_4;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      re = re_mgr1;
      if (re.test(stem)) {
        w = stem;
      }
    } else if (re2.test(w)) {
      var fp = re2.exec(w);
      stem = fp[1] + fp[2];
      re2 = re_mgr1;
      if (re2.test(stem)) {
        w = stem;
      }
    }
    re = re_5;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      re = re_mgr1;
      re2 = re_meq1;
      re3 = re3_5;
      if (re.test(stem) || re2.test(stem) && !re3.test(stem)) {
        w = stem;
      }
    }
    re = re_5_1;
    re2 = re_mgr1;
    if (re.test(w) && re2.test(w)) {
      re = re_1b_2;
      w = w.replace(re, "");
    }
    if (firstch == "y") {
      w = firstch.toLowerCase() + w.substr(1);
    }
    return w;
  };
  return function(token) {
    return token.update(porterStemmer);
  };
}();
lunr.Pipeline.registerFunction(lunr.stemmer, "stemmer");
/*!
 * lunr.stopWordFilter
 * Copyright (C) 2020 Oliver Nightingale
 */
lunr.generateStopWordFilter = function(stopWords) {
  var words = stopWords.reduce(function(memo, stopWord) {
    memo[stopWord] = stopWord;
    return memo;
  }, {});
  return function(token) {
    if (token && words[token.toString()] !== token.toString())
      return token;
  };
};
lunr.stopWordFilter = lunr.generateStopWordFilter([
  "a",
  "able",
  "about",
  "across",
  "after",
  "all",
  "almost",
  "also",
  "am",
  "among",
  "an",
  "and",
  "any",
  "are",
  "as",
  "at",
  "be",
  "because",
  "been",
  "but",
  "by",
  "can",
  "cannot",
  "could",
  "dear",
  "did",
  "do",
  "does",
  "either",
  "else",
  "ever",
  "every",
  "for",
  "from",
  "get",
  "got",
  "had",
  "has",
  "have",
  "he",
  "her",
  "hers",
  "him",
  "his",
  "how",
  "however",
  "i",
  "if",
  "in",
  "into",
  "is",
  "it",
  "its",
  "just",
  "least",
  "let",
  "like",
  "likely",
  "may",
  "me",
  "might",
  "most",
  "must",
  "my",
  "neither",
  "no",
  "nor",
  "not",
  "of",
  "off",
  "often",
  "on",
  "only",
  "or",
  "other",
  "our",
  "own",
  "rather",
  "said",
  "say",
  "says",
  "she",
  "should",
  "since",
  "so",
  "some",
  "than",
  "that",
  "the",
  "their",
  "them",
  "then",
  "there",
  "these",
  "they",
  "this",
  "tis",
  "to",
  "too",
  "twas",
  "us",
  "wants",
  "was",
  "we",
  "were",
  "what",
  "when",
  "where",
  "which",
  "while",
  "who",
  "whom",
  "why",
  "will",
  "with",
  "would",
  "yet",
  "you",
  "your"
]);
lunr.Pipeline.registerFunction(lunr.stopWordFilter, "stopWordFilter");
/*!
 * lunr.trimmer
 * Copyright (C) 2020 Oliver Nightingale
 */
lunr.trimmer = function(token) {
  return token.update(function(s) {
    return s.replace(/^\W+/, "").replace(/\W+$/, "");
  });
};
lunr.Pipeline.registerFunction(lunr.trimmer, "trimmer");
/*!
 * lunr.TokenSet
 * Copyright (C) 2020 Oliver Nightingale
 */
lunr.TokenSet = function() {
  this.final = false;
  this.edges = {};
  this.id = lunr.TokenSet._nextId;
  lunr.TokenSet._nextId += 1;
};
lunr.TokenSet._nextId = 1;
lunr.TokenSet.fromArray = function(arr) {
  var builder = new lunr.TokenSet.Builder();
  for (var i = 0, len = arr.length; i < len; i++) {
    builder.insert(arr[i]);
  }
  builder.finish();
  return builder.root;
};
lunr.TokenSet.fromClause = function(clause) {
  if ("editDistance" in clause) {
    return lunr.TokenSet.fromFuzzyString(clause.term, clause.editDistance);
  } else {
    return lunr.TokenSet.fromString(clause.term);
  }
};
lunr.TokenSet.fromFuzzyString = function(str, editDistance) {
  var root = new lunr.TokenSet();
  var stack = [
    {
      node: root,
      editsRemaining: editDistance,
      str
    }
  ];
  while (stack.length) {
    var frame = stack.pop();
    if (frame.str.length > 0) {
      var char = frame.str.charAt(0), noEditNode;
      if (char in frame.node.edges) {
        noEditNode = frame.node.edges[char];
      } else {
        noEditNode = new lunr.TokenSet();
        frame.node.edges[char] = noEditNode;
      }
      if (frame.str.length == 1) {
        noEditNode.final = true;
      }
      stack.push({
        node: noEditNode,
        editsRemaining: frame.editsRemaining,
        str: frame.str.slice(1)
      });
    }
    if (frame.editsRemaining == 0) {
      continue;
    }
    if ("*" in frame.node.edges) {
      var insertionNode = frame.node.edges["*"];
    } else {
      var insertionNode = new lunr.TokenSet();
      frame.node.edges["*"] = insertionNode;
    }
    if (frame.str.length == 0) {
      insertionNode.final = true;
    }
    stack.push({
      node: insertionNode,
      editsRemaining: frame.editsRemaining - 1,
      str: frame.str
    });
    if (frame.str.length > 1) {
      stack.push({
        node: frame.node,
        editsRemaining: frame.editsRemaining - 1,
        str: frame.str.slice(1)
      });
    }
    if (frame.str.length == 1) {
      frame.node.final = true;
    }
    if (frame.str.length >= 1) {
      if ("*" in frame.node.edges) {
        var substitutionNode = frame.node.edges["*"];
      } else {
        var substitutionNode = new lunr.TokenSet();
        frame.node.edges["*"] = substitutionNode;
      }
      if (frame.str.length == 1) {
        substitutionNode.final = true;
      }
      stack.push({
        node: substitutionNode,
        editsRemaining: frame.editsRemaining - 1,
        str: frame.str.slice(1)
      });
    }
    if (frame.str.length > 1) {
      var charA = frame.str.charAt(0), charB = frame.str.charAt(1), transposeNode;
      if (charB in frame.node.edges) {
        transposeNode = frame.node.edges[charB];
      } else {
        transposeNode = new lunr.TokenSet();
        frame.node.edges[charB] = transposeNode;
      }
      if (frame.str.length == 1) {
        transposeNode.final = true;
      }
      stack.push({
        node: transposeNode,
        editsRemaining: frame.editsRemaining - 1,
        str: charA + frame.str.slice(2)
      });
    }
  }
  return root;
};
lunr.TokenSet.fromString = function(str) {
  var node = new lunr.TokenSet(), root = node;
  for (var i = 0, len = str.length; i < len; i++) {
    var char = str[i], final = i == len - 1;
    if (char == "*") {
      node.edges[char] = node;
      node.final = final;
    } else {
      var next = new lunr.TokenSet();
      next.final = final;
      node.edges[char] = next;
      node = next;
    }
  }
  return root;
};
lunr.TokenSet.prototype.toArray = function() {
  var words = [];
  var stack = [
    {
      prefix: "",
      node: this
    }
  ];
  while (stack.length) {
    var frame = stack.pop(), edges = Object.keys(frame.node.edges), len = edges.length;
    if (frame.node.final) {
      frame.prefix.charAt(0);
      words.push(frame.prefix);
    }
    for (var i = 0; i < len; i++) {
      var edge = edges[i];
      stack.push({
        prefix: frame.prefix.concat(edge),
        node: frame.node.edges[edge]
      });
    }
  }
  return words;
};
lunr.TokenSet.prototype.toString = function() {
  if (this._str) {
    return this._str;
  }
  var str = this.final ? "1" : "0", labels = Object.keys(this.edges).sort(), len = labels.length;
  for (var i = 0; i < len; i++) {
    var label = labels[i], node = this.edges[label];
    str = str + label + node.id;
  }
  return str;
};
lunr.TokenSet.prototype.intersect = function(b) {
  var output = new lunr.TokenSet(), frame = void 0;
  var stack = [
    {
      qNode: b,
      output,
      node: this
    }
  ];
  while (stack.length) {
    frame = stack.pop();
    var qEdges = Object.keys(frame.qNode.edges), qLen = qEdges.length, nEdges = Object.keys(frame.node.edges), nLen = nEdges.length;
    for (var q = 0; q < qLen; q++) {
      var qEdge = qEdges[q];
      for (var n = 0; n < nLen; n++) {
        var nEdge = nEdges[n];
        if (nEdge == qEdge || qEdge == "*") {
          var node = frame.node.edges[nEdge], qNode = frame.qNode.edges[qEdge], final = node.final && qNode.final, next = void 0;
          if (nEdge in frame.output.edges) {
            next = frame.output.edges[nEdge];
            next.final = next.final || final;
          } else {
            next = new lunr.TokenSet();
            next.final = final;
            frame.output.edges[nEdge] = next;
          }
          stack.push({
            qNode,
            output: next,
            node
          });
        }
      }
    }
  }
  return output;
};
lunr.TokenSet.Builder = function() {
  this.previousWord = "";
  this.root = new lunr.TokenSet();
  this.uncheckedNodes = [];
  this.minimizedNodes = {};
};
lunr.TokenSet.Builder.prototype.insert = function(word) {
  var node, commonPrefix = 0;
  if (word < this.previousWord) {
    throw new Error("Out of order word insertion");
  }
  for (var i = 0; i < word.length && i < this.previousWord.length; i++) {
    if (word[i] != this.previousWord[i])
      break;
    commonPrefix++;
  }
  this.minimize(commonPrefix);
  if (this.uncheckedNodes.length == 0) {
    node = this.root;
  } else {
    node = this.uncheckedNodes[this.uncheckedNodes.length - 1].child;
  }
  for (var i = commonPrefix; i < word.length; i++) {
    var nextNode = new lunr.TokenSet(), char = word[i];
    node.edges[char] = nextNode;
    this.uncheckedNodes.push({
      parent: node,
      char,
      child: nextNode
    });
    node = nextNode;
  }
  node.final = true;
  this.previousWord = word;
};
lunr.TokenSet.Builder.prototype.finish = function() {
  this.minimize(0);
};
lunr.TokenSet.Builder.prototype.minimize = function(downTo) {
  for (var i = this.uncheckedNodes.length - 1; i >= downTo; i--) {
    var node = this.uncheckedNodes[i], childKey = node.child.toString();
    if (childKey in this.minimizedNodes) {
      node.parent.edges[node.char] = this.minimizedNodes[childKey];
    } else {
      node.child._str = childKey;
      this.minimizedNodes[childKey] = node.child;
    }
    this.uncheckedNodes.pop();
  }
};
/*!
 * lunr.Index
 * Copyright (C) 2020 Oliver Nightingale
 */
lunr.Index = function(attrs) {
  this.invertedIndex = attrs.invertedIndex;
  this.fieldVectors = attrs.fieldVectors;
  this.tokenSet = attrs.tokenSet;
  this.fields = attrs.fields;
  this.pipeline = attrs.pipeline;
};
lunr.Index.prototype.search = function(queryString) {
  return this.query(function(query) {
    var parser = new lunr.QueryParser(queryString, query);
    parser.parse();
  });
};
lunr.Index.prototype.query = function(fn) {
  var query = new lunr.Query(this.fields), matchingFields = /* @__PURE__ */ Object.create(null), queryVectors = /* @__PURE__ */ Object.create(null), termFieldCache = /* @__PURE__ */ Object.create(null), requiredMatches = /* @__PURE__ */ Object.create(null), prohibitedMatches = /* @__PURE__ */ Object.create(null);
  for (var i = 0; i < this.fields.length; i++) {
    queryVectors[this.fields[i]] = new lunr.Vector();
  }
  fn.call(query, query);
  for (var i = 0; i < query.clauses.length; i++) {
    var clause = query.clauses[i], terms = null, clauseMatches = lunr.Set.empty;
    if (clause.usePipeline) {
      terms = this.pipeline.runString(clause.term, {
        fields: clause.fields
      });
    } else {
      terms = [clause.term];
    }
    for (var m = 0; m < terms.length; m++) {
      var term = terms[m];
      clause.term = term;
      var termTokenSet = lunr.TokenSet.fromClause(clause), expandedTerms = this.tokenSet.intersect(termTokenSet).toArray();
      if (expandedTerms.length === 0 && clause.presence === lunr.Query.presence.REQUIRED) {
        for (var k = 0; k < clause.fields.length; k++) {
          var field = clause.fields[k];
          requiredMatches[field] = lunr.Set.empty;
        }
        break;
      }
      for (var j = 0; j < expandedTerms.length; j++) {
        var expandedTerm = expandedTerms[j], posting = this.invertedIndex[expandedTerm], termIndex = posting._index;
        for (var k = 0; k < clause.fields.length; k++) {
          var field = clause.fields[k], fieldPosting = posting[field], matchingDocumentRefs = Object.keys(fieldPosting), termField = expandedTerm + "/" + field, matchingDocumentsSet = new lunr.Set(matchingDocumentRefs);
          if (clause.presence == lunr.Query.presence.REQUIRED) {
            clauseMatches = clauseMatches.union(matchingDocumentsSet);
            if (requiredMatches[field] === void 0) {
              requiredMatches[field] = lunr.Set.complete;
            }
          }
          if (clause.presence == lunr.Query.presence.PROHIBITED) {
            if (prohibitedMatches[field] === void 0) {
              prohibitedMatches[field] = lunr.Set.empty;
            }
            prohibitedMatches[field] = prohibitedMatches[field].union(matchingDocumentsSet);
            continue;
          }
          queryVectors[field].upsert(termIndex, clause.boost, function(a, b) {
            return a + b;
          });
          if (termFieldCache[termField]) {
            continue;
          }
          for (var l = 0; l < matchingDocumentRefs.length; l++) {
            var matchingDocumentRef = matchingDocumentRefs[l], matchingFieldRef = new lunr.FieldRef(matchingDocumentRef, field), metadata = fieldPosting[matchingDocumentRef], fieldMatch;
            if ((fieldMatch = matchingFields[matchingFieldRef]) === void 0) {
              matchingFields[matchingFieldRef] = new lunr.MatchData(
                expandedTerm,
                field,
                metadata
              );
            } else {
              fieldMatch.add(expandedTerm, field, metadata);
            }
          }
          termFieldCache[termField] = true;
        }
      }
    }
    if (clause.presence === lunr.Query.presence.REQUIRED) {
      for (var k = 0; k < clause.fields.length; k++) {
        var field = clause.fields[k];
        requiredMatches[field] = requiredMatches[field].intersect(clauseMatches);
      }
    }
  }
  var allRequiredMatches = lunr.Set.complete, allProhibitedMatches = lunr.Set.empty;
  for (var i = 0; i < this.fields.length; i++) {
    var field = this.fields[i];
    if (requiredMatches[field]) {
      allRequiredMatches = allRequiredMatches.intersect(requiredMatches[field]);
    }
    if (prohibitedMatches[field]) {
      allProhibitedMatches = allProhibitedMatches.union(
        prohibitedMatches[field]
      );
    }
  }
  var matchingFieldRefs = Object.keys(matchingFields), results = [], matches = /* @__PURE__ */ Object.create(null);
  if (query.isNegated()) {
    matchingFieldRefs = Object.keys(this.fieldVectors);
    for (var i = 0; i < matchingFieldRefs.length; i++) {
      var matchingFieldRef = matchingFieldRefs[i];
      var fieldRef = lunr.FieldRef.fromString(matchingFieldRef);
      matchingFields[matchingFieldRef] = new lunr.MatchData();
    }
  }
  for (var i = 0; i < matchingFieldRefs.length; i++) {
    var fieldRef = lunr.FieldRef.fromString(matchingFieldRefs[i]), docRef = fieldRef.docRef;
    if (!allRequiredMatches.contains(docRef)) {
      continue;
    }
    if (allProhibitedMatches.contains(docRef)) {
      continue;
    }
    var fieldVector = this.fieldVectors[fieldRef], score = queryVectors[fieldRef.fieldName].similarity(fieldVector), docMatch;
    if ((docMatch = matches[docRef]) !== void 0) {
      docMatch.score += score;
      docMatch.matchData.combine(matchingFields[fieldRef]);
    } else {
      var match = {
        ref: docRef,
        score,
        matchData: matchingFields[fieldRef]
      };
      matches[docRef] = match;
      results.push(match);
    }
  }
  return results.sort(function(a, b) {
    return b.score - a.score;
  });
};
lunr.Index.prototype.toJSON = function() {
  var invertedIndex = Object.keys(this.invertedIndex).sort().map(function(term) {
    return [term, this.invertedIndex[term]];
  }, this);
  var fieldVectors = Object.keys(this.fieldVectors).map(function(ref2) {
    return [ref2, this.fieldVectors[ref2].toJSON()];
  }, this);
  return {
    version: lunr.version,
    fields: this.fields,
    fieldVectors,
    invertedIndex,
    pipeline: this.pipeline.toJSON()
  };
};
lunr.Index.load = function(serializedIndex) {
  var attrs = {}, fieldVectors = {}, serializedVectors = serializedIndex.fieldVectors, invertedIndex = /* @__PURE__ */ Object.create(null), serializedInvertedIndex = serializedIndex.invertedIndex, tokenSetBuilder = new lunr.TokenSet.Builder(), pipeline = lunr.Pipeline.load(serializedIndex.pipeline);
  if (serializedIndex.version != lunr.version) {
    lunr.utils.warn(
      "Version mismatch when loading serialised index. Current version of lunr '" + lunr.version + "' does not match serialized index '" + serializedIndex.version + "'"
    );
  }
  for (var i = 0; i < serializedVectors.length; i++) {
    var tuple = serializedVectors[i], ref2 = tuple[0], elements = tuple[1];
    fieldVectors[ref2] = new lunr.Vector(elements);
  }
  for (var i = 0; i < serializedInvertedIndex.length; i++) {
    var tuple = serializedInvertedIndex[i], term = tuple[0], posting = tuple[1];
    tokenSetBuilder.insert(term);
    invertedIndex[term] = posting;
  }
  tokenSetBuilder.finish();
  attrs.fields = serializedIndex.fields;
  attrs.fieldVectors = fieldVectors;
  attrs.invertedIndex = invertedIndex;
  attrs.tokenSet = tokenSetBuilder.root;
  attrs.pipeline = pipeline;
  return new lunr.Index(attrs);
};
/*!
 * lunr.Builder
 * Copyright (C) 2020 Oliver Nightingale
 */
lunr.Builder = function() {
  this._ref = "id";
  this._fields = /* @__PURE__ */ Object.create(null);
  this._documents = /* @__PURE__ */ Object.create(null);
  this.invertedIndex = /* @__PURE__ */ Object.create(null);
  this.fieldTermFrequencies = {};
  this.fieldLengths = {};
  this.tokenizer = lunr.tokenizer;
  this.pipeline = new lunr.Pipeline();
  this.searchPipeline = new lunr.Pipeline();
  this.documentCount = 0;
  this._b = 0.75;
  this._k1 = 1.2;
  this.termIndex = 0;
  this.metadataWhitelist = [];
};
lunr.Builder.prototype.ref = function(ref2) {
  this._ref = ref2;
};
lunr.Builder.prototype.field = function(fieldName, attributes) {
  if (/\//.test(fieldName)) {
    throw new RangeError(
      "Field '" + fieldName + "' contains illegal character '/'"
    );
  }
  this._fields[fieldName] = attributes || {};
};
lunr.Builder.prototype.b = function(number) {
  if (number < 0) {
    this._b = 0;
  } else if (number > 1) {
    this._b = 1;
  } else {
    this._b = number;
  }
};
lunr.Builder.prototype.k1 = function(number) {
  this._k1 = number;
};
lunr.Builder.prototype.add = function(doc, attributes) {
  var docRef = doc[this._ref], fields = Object.keys(this._fields);
  this._documents[docRef] = attributes || {};
  this.documentCount += 1;
  for (var i = 0; i < fields.length; i++) {
    var fieldName = fields[i], extractor = this._fields[fieldName].extractor, field = extractor ? extractor(doc) : doc[fieldName], tokens = this.tokenizer(field, {
      fields: [fieldName]
    }), terms = this.pipeline.run(tokens), fieldRef = new lunr.FieldRef(docRef, fieldName), fieldTerms = /* @__PURE__ */ Object.create(null);
    this.fieldTermFrequencies[fieldRef] = fieldTerms;
    this.fieldLengths[fieldRef] = 0;
    this.fieldLengths[fieldRef] += terms.length;
    for (var j = 0; j < terms.length; j++) {
      var term = terms[j];
      if (fieldTerms[term] == void 0) {
        fieldTerms[term] = 0;
      }
      fieldTerms[term] += 1;
      if (this.invertedIndex[term] == void 0) {
        var posting = /* @__PURE__ */ Object.create(null);
        posting["_index"] = this.termIndex;
        this.termIndex += 1;
        for (var k = 0; k < fields.length; k++) {
          posting[fields[k]] = /* @__PURE__ */ Object.create(null);
        }
        this.invertedIndex[term] = posting;
      }
      if (this.invertedIndex[term][fieldName][docRef] == void 0) {
        this.invertedIndex[term][fieldName][docRef] = /* @__PURE__ */ Object.create(null);
      }
      for (var l = 0; l < this.metadataWhitelist.length; l++) {
        var metadataKey = this.metadataWhitelist[l], metadata = term.metadata[metadataKey];
        if (this.invertedIndex[term][fieldName][docRef][metadataKey] == void 0) {
          this.invertedIndex[term][fieldName][docRef][metadataKey] = [];
        }
        this.invertedIndex[term][fieldName][docRef][metadataKey].push(metadata);
      }
    }
  }
};
lunr.Builder.prototype.calculateAverageFieldLengths = function() {
  var fieldRefs = Object.keys(this.fieldLengths), numberOfFields = fieldRefs.length, accumulator = {}, documentsWithField = {};
  for (var i = 0; i < numberOfFields; i++) {
    var fieldRef = lunr.FieldRef.fromString(fieldRefs[i]), field = fieldRef.fieldName;
    documentsWithField[field] || (documentsWithField[field] = 0);
    documentsWithField[field] += 1;
    accumulator[field] || (accumulator[field] = 0);
    accumulator[field] += this.fieldLengths[fieldRef];
  }
  var fields = Object.keys(this._fields);
  for (var i = 0; i < fields.length; i++) {
    var fieldName = fields[i];
    accumulator[fieldName] = accumulator[fieldName] / documentsWithField[fieldName];
  }
  this.averageFieldLength = accumulator;
};
lunr.Builder.prototype.createFieldVectors = function() {
  var fieldVectors = {}, fieldRefs = Object.keys(this.fieldTermFrequencies), fieldRefsLength = fieldRefs.length, termIdfCache = /* @__PURE__ */ Object.create(null);
  for (var i = 0; i < fieldRefsLength; i++) {
    var fieldRef = lunr.FieldRef.fromString(fieldRefs[i]), fieldName = fieldRef.fieldName, fieldLength = this.fieldLengths[fieldRef], fieldVector = new lunr.Vector(), termFrequencies = this.fieldTermFrequencies[fieldRef], terms = Object.keys(termFrequencies), termsLength = terms.length;
    var fieldBoost = this._fields[fieldName].boost || 1, docBoost = this._documents[fieldRef.docRef].boost || 1;
    for (var j = 0; j < termsLength; j++) {
      var term = terms[j], tf = termFrequencies[term], termIndex = this.invertedIndex[term]._index, idf, score, scoreWithPrecision;
      if (termIdfCache[term] === void 0) {
        idf = lunr.idf(this.invertedIndex[term], this.documentCount);
        termIdfCache[term] = idf;
      } else {
        idf = termIdfCache[term];
      }
      score = idf * ((this._k1 + 1) * tf) / (this._k1 * (1 - this._b + this._b * (fieldLength / this.averageFieldLength[fieldName])) + tf);
      score *= fieldBoost;
      score *= docBoost;
      scoreWithPrecision = Math.round(score * 1e3) / 1e3;
      fieldVector.insert(termIndex, scoreWithPrecision);
    }
    fieldVectors[fieldRef] = fieldVector;
  }
  this.fieldVectors = fieldVectors;
};
lunr.Builder.prototype.createTokenSet = function() {
  this.tokenSet = lunr.TokenSet.fromArray(
    Object.keys(this.invertedIndex).sort()
  );
};
lunr.Builder.prototype.build = function() {
  this.calculateAverageFieldLengths();
  this.createFieldVectors();
  this.createTokenSet();
  return new lunr.Index({
    invertedIndex: this.invertedIndex,
    fieldVectors: this.fieldVectors,
    tokenSet: this.tokenSet,
    fields: Object.keys(this._fields),
    pipeline: this.searchPipeline
  });
};
lunr.Builder.prototype.use = function(fn) {
  var args = Array.prototype.slice.call(arguments, 1);
  args.unshift(this);
  fn.apply(this, args);
};
lunr.MatchData = function(term, field, metadata) {
  var clonedMetadata = /* @__PURE__ */ Object.create(null), metadataKeys = Object.keys(metadata || {});
  for (var i = 0; i < metadataKeys.length; i++) {
    var key = metadataKeys[i];
    clonedMetadata[key] = metadata[key].slice();
  }
  this.metadata = /* @__PURE__ */ Object.create(null);
  if (term !== void 0) {
    this.metadata[term] = /* @__PURE__ */ Object.create(null);
    this.metadata[term][field] = clonedMetadata;
  }
};
lunr.MatchData.prototype.combine = function(otherMatchData) {
  var terms = Object.keys(otherMatchData.metadata);
  for (var i = 0; i < terms.length; i++) {
    var term = terms[i], fields = Object.keys(otherMatchData.metadata[term]);
    if (this.metadata[term] == void 0) {
      this.metadata[term] = /* @__PURE__ */ Object.create(null);
    }
    for (var j = 0; j < fields.length; j++) {
      var field = fields[j], keys = Object.keys(otherMatchData.metadata[term][field]);
      if (this.metadata[term][field] == void 0) {
        this.metadata[term][field] = /* @__PURE__ */ Object.create(null);
      }
      for (var k = 0; k < keys.length; k++) {
        var key = keys[k];
        if (this.metadata[term][field][key] == void 0) {
          this.metadata[term][field][key] = otherMatchData.metadata[term][field][key];
        } else {
          this.metadata[term][field][key] = this.metadata[term][field][key].concat(otherMatchData.metadata[term][field][key]);
        }
      }
    }
  }
};
lunr.MatchData.prototype.add = function(term, field, metadata) {
  if (!(term in this.metadata)) {
    this.metadata[term] = /* @__PURE__ */ Object.create(null);
    this.metadata[term][field] = metadata;
    return;
  }
  if (!(field in this.metadata[term])) {
    this.metadata[term][field] = metadata;
    return;
  }
  var metadataKeys = Object.keys(metadata);
  for (var i = 0; i < metadataKeys.length; i++) {
    var key = metadataKeys[i];
    if (key in this.metadata[term][field]) {
      this.metadata[term][field][key] = this.metadata[term][field][key].concat(
        metadata[key]
      );
    } else {
      this.metadata[term][field][key] = metadata[key];
    }
  }
};
lunr.Query = function(allFields) {
  this.clauses = [];
  this.allFields = allFields;
};
lunr.Query.wildcard = new String("*");
lunr.Query.wildcard.NONE = 0;
lunr.Query.wildcard.LEADING = 1;
lunr.Query.wildcard.TRAILING = 2;
lunr.Query.presence = {
  OPTIONAL: 1,
  REQUIRED: 2,
  PROHIBITED: 3
};
lunr.Query.prototype.clause = function(clause) {
  if (!("fields" in clause)) {
    clause.fields = this.allFields;
  }
  if (!("boost" in clause)) {
    clause.boost = 1;
  }
  if (!("usePipeline" in clause)) {
    clause.usePipeline = true;
  }
  if (!("wildcard" in clause)) {
    clause.wildcard = lunr.Query.wildcard.NONE;
  }
  if (clause.wildcard & lunr.Query.wildcard.LEADING && clause.term.charAt(0) != lunr.Query.wildcard) {
    clause.term = "*" + clause.term;
  }
  if (clause.wildcard & lunr.Query.wildcard.TRAILING && clause.term.slice(-1) != lunr.Query.wildcard) {
    clause.term = "" + clause.term + "*";
  }
  if (!("presence" in clause)) {
    clause.presence = lunr.Query.presence.OPTIONAL;
  }
  this.clauses.push(clause);
  return this;
};
lunr.Query.prototype.isNegated = function() {
  for (var i = 0; i < this.clauses.length; i++) {
    if (this.clauses[i].presence != lunr.Query.presence.PROHIBITED) {
      return false;
    }
  }
  return true;
};
lunr.Query.prototype.term = function(term, options) {
  if (Array.isArray(term)) {
    term.forEach(function(t) {
      this.term(t, lunr.utils.clone(options));
    }, this);
    return this;
  }
  var clause = options || {};
  clause.term = term.toString();
  this.clause(clause);
  return this;
};
lunr.QueryParseError = function(message, start, end) {
  this.name = "QueryParseError";
  this.message = message;
  this.start = start;
  this.end = end;
};
lunr.QueryParseError.prototype = new Error();
lunr.QueryLexer = function(str) {
  this.lexemes = [];
  this.str = str;
  this.length = str.length;
  this.pos = 0;
  this.start = 0;
  this.escapeCharPositions = [];
};
lunr.QueryLexer.prototype.run = function() {
  var state = lunr.QueryLexer.lexText;
  while (state) {
    state = state(this);
  }
};
lunr.QueryLexer.prototype.sliceString = function() {
  var subSlices = [], sliceStart = this.start, sliceEnd = this.pos;
  for (var i = 0; i < this.escapeCharPositions.length; i++) {
    sliceEnd = this.escapeCharPositions[i];
    subSlices.push(this.str.slice(sliceStart, sliceEnd));
    sliceStart = sliceEnd + 1;
  }
  subSlices.push(this.str.slice(sliceStart, this.pos));
  this.escapeCharPositions.length = 0;
  return subSlices.join("");
};
lunr.QueryLexer.prototype.emit = function(type) {
  this.lexemes.push({
    type,
    str: this.sliceString(),
    start: this.start,
    end: this.pos
  });
  this.start = this.pos;
};
lunr.QueryLexer.prototype.escapeCharacter = function() {
  this.escapeCharPositions.push(this.pos - 1);
  this.pos += 1;
};
lunr.QueryLexer.prototype.next = function() {
  if (this.pos >= this.length) {
    return lunr.QueryLexer.EOS;
  }
  var char = this.str.charAt(this.pos);
  this.pos += 1;
  return char;
};
lunr.QueryLexer.prototype.width = function() {
  return this.pos - this.start;
};
lunr.QueryLexer.prototype.ignore = function() {
  if (this.start == this.pos) {
    this.pos += 1;
  }
  this.start = this.pos;
};
lunr.QueryLexer.prototype.backup = function() {
  this.pos -= 1;
};
lunr.QueryLexer.prototype.acceptDigitRun = function() {
  var char, charCode;
  do {
    char = this.next();
    charCode = char.charCodeAt(0);
  } while (charCode > 47 && charCode < 58);
  if (char != lunr.QueryLexer.EOS) {
    this.backup();
  }
};
lunr.QueryLexer.prototype.more = function() {
  return this.pos < this.length;
};
lunr.QueryLexer.EOS = "EOS";
lunr.QueryLexer.FIELD = "FIELD";
lunr.QueryLexer.TERM = "TERM";
lunr.QueryLexer.EDIT_DISTANCE = "EDIT_DISTANCE";
lunr.QueryLexer.BOOST = "BOOST";
lunr.QueryLexer.PRESENCE = "PRESENCE";
lunr.QueryLexer.lexField = function(lexer) {
  lexer.backup();
  lexer.emit(lunr.QueryLexer.FIELD);
  lexer.ignore();
  return lunr.QueryLexer.lexText;
};
lunr.QueryLexer.lexTerm = function(lexer) {
  if (lexer.width() > 1) {
    lexer.backup();
    lexer.emit(lunr.QueryLexer.TERM);
  }
  lexer.ignore();
  if (lexer.more()) {
    return lunr.QueryLexer.lexText;
  }
};
lunr.QueryLexer.lexEditDistance = function(lexer) {
  lexer.ignore();
  lexer.acceptDigitRun();
  lexer.emit(lunr.QueryLexer.EDIT_DISTANCE);
  return lunr.QueryLexer.lexText;
};
lunr.QueryLexer.lexBoost = function(lexer) {
  lexer.ignore();
  lexer.acceptDigitRun();
  lexer.emit(lunr.QueryLexer.BOOST);
  return lunr.QueryLexer.lexText;
};
lunr.QueryLexer.lexEOS = function(lexer) {
  if (lexer.width() > 0) {
    lexer.emit(lunr.QueryLexer.TERM);
  }
};
lunr.QueryLexer.termSeparator = lunr.tokenizer.separator;
lunr.QueryLexer.lexText = function(lexer) {
  while (true) {
    var char = lexer.next();
    if (char == lunr.QueryLexer.EOS) {
      return lunr.QueryLexer.lexEOS;
    }
    if (char.charCodeAt(0) == 92) {
      lexer.escapeCharacter();
      continue;
    }
    if (char == ":") {
      return lunr.QueryLexer.lexField;
    }
    if (char == "~") {
      lexer.backup();
      if (lexer.width() > 0) {
        lexer.emit(lunr.QueryLexer.TERM);
      }
      return lunr.QueryLexer.lexEditDistance;
    }
    if (char == "^") {
      lexer.backup();
      if (lexer.width() > 0) {
        lexer.emit(lunr.QueryLexer.TERM);
      }
      return lunr.QueryLexer.lexBoost;
    }
    if (char == "+" && lexer.width() === 1) {
      lexer.emit(lunr.QueryLexer.PRESENCE);
      return lunr.QueryLexer.lexText;
    }
    if (char == "-" && lexer.width() === 1) {
      lexer.emit(lunr.QueryLexer.PRESENCE);
      return lunr.QueryLexer.lexText;
    }
    if (char.match(lunr.QueryLexer.termSeparator)) {
      return lunr.QueryLexer.lexTerm;
    }
  }
};
lunr.QueryParser = function(str, query) {
  this.lexer = new lunr.QueryLexer(str);
  this.query = query;
  this.currentClause = {};
  this.lexemeIdx = 0;
};
lunr.QueryParser.prototype.parse = function() {
  this.lexer.run();
  this.lexemes = this.lexer.lexemes;
  var state = lunr.QueryParser.parseClause;
  while (state) {
    state = state(this);
  }
  return this.query;
};
lunr.QueryParser.prototype.peekLexeme = function() {
  return this.lexemes[this.lexemeIdx];
};
lunr.QueryParser.prototype.consumeLexeme = function() {
  var lexeme = this.peekLexeme();
  this.lexemeIdx += 1;
  return lexeme;
};
lunr.QueryParser.prototype.nextClause = function() {
  var completedClause = this.currentClause;
  this.query.clause(completedClause);
  this.currentClause = {};
};
lunr.QueryParser.parseClause = function(parser) {
  var lexeme = parser.peekLexeme();
  if (lexeme == void 0) {
    return;
  }
  switch (lexeme.type) {
    case lunr.QueryLexer.PRESENCE:
      return lunr.QueryParser.parsePresence;
    case lunr.QueryLexer.FIELD:
      return lunr.QueryParser.parseField;
    case lunr.QueryLexer.TERM:
      return lunr.QueryParser.parseTerm;
    default:
      var errorMessage = "expected either a field or a term, found " + lexeme.type;
      if (lexeme.str.length >= 1) {
        errorMessage += " with value '" + lexeme.str + "'";
      }
      throw new lunr.QueryParseError(errorMessage, lexeme.start, lexeme.end);
  }
};
lunr.QueryParser.parsePresence = function(parser) {
  var lexeme = parser.consumeLexeme();
  if (lexeme == void 0) {
    return;
  }
  switch (lexeme.str) {
    case "-":
      parser.currentClause.presence = lunr.Query.presence.PROHIBITED;
      break;
    case "+":
      parser.currentClause.presence = lunr.Query.presence.REQUIRED;
      break;
    default:
      var errorMessage = "unrecognised presence operator'" + lexeme.str + "'";
      throw new lunr.QueryParseError(errorMessage, lexeme.start, lexeme.end);
  }
  var nextLexeme = parser.peekLexeme();
  if (nextLexeme == void 0) {
    var errorMessage = "expecting term or field, found nothing";
    throw new lunr.QueryParseError(errorMessage, lexeme.start, lexeme.end);
  }
  switch (nextLexeme.type) {
    case lunr.QueryLexer.FIELD:
      return lunr.QueryParser.parseField;
    case lunr.QueryLexer.TERM:
      return lunr.QueryParser.parseTerm;
    default:
      var errorMessage = "expecting term or field, found '" + nextLexeme.type + "'";
      throw new lunr.QueryParseError(
        errorMessage,
        nextLexeme.start,
        nextLexeme.end
      );
  }
};
lunr.QueryParser.parseField = function(parser) {
  var lexeme = parser.consumeLexeme();
  if (lexeme == void 0) {
    return;
  }
  if (parser.query.allFields.indexOf(lexeme.str) == -1) {
    var possibleFields = parser.query.allFields.map(function(f) {
      return "'" + f + "'";
    }).join(", "), errorMessage = "unrecognised field '" + lexeme.str + "', possible fields: " + possibleFields;
    throw new lunr.QueryParseError(errorMessage, lexeme.start, lexeme.end);
  }
  parser.currentClause.fields = [lexeme.str];
  var nextLexeme = parser.peekLexeme();
  if (nextLexeme == void 0) {
    var errorMessage = "expecting term, found nothing";
    throw new lunr.QueryParseError(errorMessage, lexeme.start, lexeme.end);
  }
  switch (nextLexeme.type) {
    case lunr.QueryLexer.TERM:
      return lunr.QueryParser.parseTerm;
    default:
      var errorMessage = "expecting term, found '" + nextLexeme.type + "'";
      throw new lunr.QueryParseError(
        errorMessage,
        nextLexeme.start,
        nextLexeme.end
      );
  }
};
lunr.QueryParser.parseTerm = function(parser) {
  var lexeme = parser.consumeLexeme();
  if (lexeme == void 0) {
    return;
  }
  parser.currentClause.term = lexeme.str.toLowerCase();
  if (lexeme.str.indexOf("*") != -1) {
    parser.currentClause.usePipeline = false;
  }
  var nextLexeme = parser.peekLexeme();
  if (nextLexeme == void 0) {
    parser.nextClause();
    return;
  }
  switch (nextLexeme.type) {
    case lunr.QueryLexer.TERM:
      parser.nextClause();
      return lunr.QueryParser.parseTerm;
    case lunr.QueryLexer.FIELD:
      parser.nextClause();
      return lunr.QueryParser.parseField;
    case lunr.QueryLexer.EDIT_DISTANCE:
      return lunr.QueryParser.parseEditDistance;
    case lunr.QueryLexer.BOOST:
      return lunr.QueryParser.parseBoost;
    case lunr.QueryLexer.PRESENCE:
      parser.nextClause();
      return lunr.QueryParser.parsePresence;
    default:
      var errorMessage = "Unexpected lexeme type '" + nextLexeme.type + "'";
      throw new lunr.QueryParseError(
        errorMessage,
        nextLexeme.start,
        nextLexeme.end
      );
  }
};
lunr.QueryParser.parseEditDistance = function(parser) {
  var lexeme = parser.consumeLexeme();
  if (lexeme == void 0) {
    return;
  }
  var editDistance = parseInt(lexeme.str, 10);
  if (isNaN(editDistance)) {
    var errorMessage = "edit distance must be numeric";
    throw new lunr.QueryParseError(errorMessage, lexeme.start, lexeme.end);
  }
  parser.currentClause.editDistance = editDistance;
  var nextLexeme = parser.peekLexeme();
  if (nextLexeme == void 0) {
    parser.nextClause();
    return;
  }
  switch (nextLexeme.type) {
    case lunr.QueryLexer.TERM:
      parser.nextClause();
      return lunr.QueryParser.parseTerm;
    case lunr.QueryLexer.FIELD:
      parser.nextClause();
      return lunr.QueryParser.parseField;
    case lunr.QueryLexer.EDIT_DISTANCE:
      return lunr.QueryParser.parseEditDistance;
    case lunr.QueryLexer.BOOST:
      return lunr.QueryParser.parseBoost;
    case lunr.QueryLexer.PRESENCE:
      parser.nextClause();
      return lunr.QueryParser.parsePresence;
    default:
      var errorMessage = "Unexpected lexeme type '" + nextLexeme.type + "'";
      throw new lunr.QueryParseError(
        errorMessage,
        nextLexeme.start,
        nextLexeme.end
      );
  }
};
lunr.QueryParser.parseBoost = function(parser) {
  var lexeme = parser.consumeLexeme();
  if (lexeme == void 0) {
    return;
  }
  var boost = parseInt(lexeme.str, 10);
  if (isNaN(boost)) {
    var errorMessage = "boost must be numeric";
    throw new lunr.QueryParseError(errorMessage, lexeme.start, lexeme.end);
  }
  parser.currentClause.boost = boost;
  var nextLexeme = parser.peekLexeme();
  if (nextLexeme == void 0) {
    parser.nextClause();
    return;
  }
  switch (nextLexeme.type) {
    case lunr.QueryLexer.TERM:
      parser.nextClause();
      return lunr.QueryParser.parseTerm;
    case lunr.QueryLexer.FIELD:
      parser.nextClause();
      return lunr.QueryParser.parseField;
    case lunr.QueryLexer.EDIT_DISTANCE:
      return lunr.QueryParser.parseEditDistance;
    case lunr.QueryLexer.BOOST:
      return lunr.QueryParser.parseBoost;
    case lunr.QueryLexer.PRESENCE:
      parser.nextClause();
      return lunr.QueryParser.parsePresence;
    default:
      var errorMessage = "Unexpected lexeme type '" + nextLexeme.type + "'";
      throw new lunr.QueryParseError(
        errorMessage,
        nextLexeme.start,
        nextLexeme.end
      );
  }
};
const _sfc_main$1c = /* @__PURE__ */ defineComponent({
  __name: "Search",
  __ssrInlineRender: true,
  setup(__props) {
    const { localePath } = useData();
    const metaKey = ref();
    const open = ref(false);
    const searchTerm = ref();
    const origin = ref("");
    const input = ref();
    const LUNR_DATA = ref();
    const PREVIEW_LOOKUP = ref();
    const Options = ref();
    const result = computed(() => {
      var _a;
      if (searchTerm.value) {
        let wildcard = ((_a = Options.value) == null ? void 0 : _a.wildcard) == true ? "*" : "";
        var idx = lunr.Index.load(LUNR_DATA.value);
        var searchResults = idx.search(searchTerm.value + wildcard);
        var search = [];
        for (var i = 0; i < searchResults.length; i++) {
          var id = searchResults[i]["ref"];
          var item = PREVIEW_LOOKUP.value[id];
          var title = item["t"];
          var preview = item["p"];
          var link2 = item["l"];
          var anchor = item["a"];
          link2 = link2.split(" ").join("-");
          search.push({ id, link: link2, title, preview, anchor });
        }
        return search;
      }
    });
    const GroupBy = (array, func) => {
      if (!array || !array.length)
        return [];
      return array.reduce((acc, value) => {
        if (!acc[func(value)]) {
          acc[func(value)] = [];
        }
        acc[func(value)].push(value);
        return acc;
      }, {});
    };
    const openSearch = () => {
      setTimeout(() => {
        if (input.value)
          input.value.focus();
      }, 100);
      cleanSearch();
      open.value = true;
    };
    onMounted(async () => {
      const data = await import("./virtual_search-data.e21e39c0.js");
      LUNR_DATA.value = data.default.LUNR_DATA;
      PREVIEW_LOOKUP.value = data.default.PREVIEW_LOOKUP;
      Options.value = data.default.Options;
      origin.value = window.location.origin + localePath.value;
      metaKey.value.innerHTML = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform) ? "\u2318" : "Ctrl";
      const handleSearchHotKey = (e) => {
        if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
          e.preventDefault();
          openSearch();
        }
      };
      window.addEventListener("keydown", handleSearchHotKey);
    });
    function cleanSearch() {
      open.value = false;
      searchTerm.value = "";
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPNavBarSearch" }, _attrs))}>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (open.value) {
          _push2(`<div class="modal-back"><div class="modal"><form class="DocSearch-Form"><label class="DocSearch-MagnifierLabel" for="docsearch-input" id="docsearch-label"><svg width="20" height="20" class="DocSearch-Search-Icon" viewBox="0 0 20 20"><path d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z" stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg></label><input class="DocSearch-Input" aria-autocomplete="both" aria-labelledby="docsearch-label" id="docsearch-input" autocomplete="off" autocorrect="off" autocapitalize="off" enterkeyhint="search" spellcheck="false" autofocus="true"${ssrRenderAttr("value", searchTerm.value)} placeholder="Search docs" maxlength="64" type="search"></form><div class="search-list"><!--[-->`);
          ssrRenderList(GroupBy(
            unref(result),
            (x) => x.link.split("/").slice(0, -1).join("-")
          ), (group, groupKey) => {
            _push2(`<div><span class="search-group">${ssrInterpolate(groupKey ? groupKey.toString()[0].toUpperCase() + groupKey.toString().slice(1) : "Home")}</span><!--[-->`);
            ssrRenderList(group, (item) => {
              _push2(`<a${ssrRenderAttr("href", origin.value + item.link)}><div class="search-item"><span class="search-item-icon">${ssrInterpolate(item.link.includes("#") ? "#" : "\u25A4")}</span><div style="${ssrRenderStyle({ "width": "100%" })}"><h3>${ssrInterpolate(item.title)}</h3><p><div>${item.preview}</div></p></div><span class="search-item-icon">\u21AA</span></div></a>`);
            });
            _push2(`<!--]--></div>`);
          });
          _push2(`<!--]--></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`<div id="docsearch"><button type="button" class="DocSearch DocSearch-Button" aria-label="Search"><span class="DocSearch-Button-Container"><svg width="20" height="20" class="DocSearch-Search-Icon" viewBox="0 0 20 20"><path d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z" stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="DocSearch-Button-Placeholder">Search</span></span><span class="DocSearch-Button-Keys"><span class="DocSearch-Button-Key">Meta</span><span class="DocSearch-Button-Key">K</span></span></button></div></div>`);
    };
  }
});
const Search_vue_vue_type_style_index_0_lang = "";
const _sfc_setup$1c = _sfc_main$1c.setup;
_sfc_main$1c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress-plugin-search/dist/Search.vue");
  return _sfc_setup$1c ? _sfc_setup$1c(props, ctx) : void 0;
};
const _sfc_main$1b = {};
function _sfc_ssrRender$d(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    focusable: "false",
    height: "24px",
    viewBox: "0 0 24 24",
    width: "24px"
  }, _attrs))}><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5H9z"></path></svg>`);
}
const _sfc_setup$1b = _sfc_main$1b.setup;
_sfc_main$1b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/icons/VPIconExternalLink.vue");
  return _sfc_setup$1b ? _sfc_setup$1b(props, ctx) : void 0;
};
const VPIconExternalLink = /* @__PURE__ */ _export_sfc(_sfc_main$1b, [["ssrRender", _sfc_ssrRender$d]]);
const _sfc_main$1a = /* @__PURE__ */ defineComponent({
  __name: "VPLink",
  __ssrInlineRender: true,
  props: {
    href: null,
    noIcon: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const isExternal2 = computed(() => props.href && EXTERNAL_URL_RE.test(props.href));
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.href ? "a" : "span"), mergeProps({
        class: ["VPLink", { link: __props.href }],
        href: __props.href ? unref(normalizeLink)(__props.href) : void 0,
        target: unref(isExternal2) ? "_blank" : void 0,
        rel: unref(isExternal2) ? "noreferrer" : void 0
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            if (unref(isExternal2) && !__props.noIcon) {
              _push2(ssrRenderComponent(VPIconExternalLink, { class: "icon" }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              renderSlot(_ctx.$slots, "default", {}, void 0, true),
              unref(isExternal2) && !__props.noIcon ? (openBlock(), createBlock(VPIconExternalLink, {
                key: 0,
                class: "icon"
              })) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }), _parent);
    };
  }
});
const VPLink_vue_vue_type_style_index_0_scoped_3c355974_lang = "";
const _sfc_setup$1a = _sfc_main$1a.setup;
_sfc_main$1a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPLink.vue");
  return _sfc_setup$1a ? _sfc_setup$1a(props, ctx) : void 0;
};
const VPLink = /* @__PURE__ */ _export_sfc(_sfc_main$1a, [["__scopeId", "data-v-3c355974"]]);
const _sfc_main$19 = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarMenuLink",
  __ssrInlineRender: true,
  props: {
    item: null
  },
  setup(__props) {
    const { page } = useData();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VPLink, mergeProps({
        class: {
          VPNavBarMenuLink: true,
          active: unref(isActive)(
            unref(page).relativePath,
            __props.item.activeMatch || __props.item.link,
            !!__props.item.activeMatch
          )
        },
        href: __props.item.link,
        noIcon: true
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.item.text)}`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.item.text), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const VPNavBarMenuLink_vue_vue_type_style_index_0_scoped_47a2263e_lang = "";
const _sfc_setup$19 = _sfc_main$19.setup;
_sfc_main$19.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarMenuLink.vue");
  return _sfc_setup$19 ? _sfc_setup$19(props, ctx) : void 0;
};
const VPNavBarMenuLink = /* @__PURE__ */ _export_sfc(_sfc_main$19, [["__scopeId", "data-v-47a2263e"]]);
const focusedElement = ref();
let active = false;
let listeners = 0;
function useFlyout(options) {
  const focus = ref(false);
  if (typeof window !== "undefined") {
    !active && activateFocusTracking();
    listeners++;
    const unwatch = watch(focusedElement, (el) => {
      var _a, _b, _c;
      if (el === options.el.value || ((_a = options.el.value) == null ? void 0 : _a.contains(el))) {
        focus.value = true;
        (_b = options.onFocus) == null ? void 0 : _b.call(options);
      } else {
        focus.value = false;
        (_c = options.onBlur) == null ? void 0 : _c.call(options);
      }
    });
    onUnmounted(() => {
      unwatch();
      listeners--;
      if (!listeners) {
        deactivateFocusTracking();
      }
    });
  }
  return readonly(focus);
}
function activateFocusTracking() {
  document.addEventListener("focusin", handleFocusIn);
  active = true;
  focusedElement.value = document.activeElement;
}
function deactivateFocusTracking() {
  document.removeEventListener("focusin", handleFocusIn);
}
function handleFocusIn() {
  focusedElement.value = document.activeElement;
}
const _sfc_main$18 = {};
function _sfc_ssrRender$c(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    focusable: "false",
    viewBox: "0 0 24 24"
  }, _attrs))}><path d="M12,16c-0.3,0-0.5-0.1-0.7-0.3l-6-6c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l5.3,5.3l5.3-5.3c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-6,6C12.5,15.9,12.3,16,12,16z"></path></svg>`);
}
const _sfc_setup$18 = _sfc_main$18.setup;
_sfc_main$18.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/icons/VPIconChevronDown.vue");
  return _sfc_setup$18 ? _sfc_setup$18(props, ctx) : void 0;
};
const VPIconChevronDown = /* @__PURE__ */ _export_sfc(_sfc_main$18, [["ssrRender", _sfc_ssrRender$c]]);
const _sfc_main$17 = {};
function _sfc_ssrRender$b(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    focusable: "false",
    viewBox: "0 0 24 24"
  }, _attrs))}><circle cx="12" cy="12" r="2"></circle><circle cx="19" cy="12" r="2"></circle><circle cx="5" cy="12" r="2"></circle></svg>`);
}
const _sfc_setup$17 = _sfc_main$17.setup;
_sfc_main$17.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/icons/VPIconMoreHorizontal.vue");
  return _sfc_setup$17 ? _sfc_setup$17(props, ctx) : void 0;
};
const VPIconMoreHorizontal = /* @__PURE__ */ _export_sfc(_sfc_main$17, [["ssrRender", _sfc_ssrRender$b]]);
const _sfc_main$16 = /* @__PURE__ */ defineComponent({
  __name: "VPMenuLink",
  __ssrInlineRender: true,
  props: {
    item: null
  },
  setup(__props) {
    const { page } = useData();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPMenuLink" }, _attrs))} data-v-e8e0fb1d>`);
      _push(ssrRenderComponent(VPLink, {
        class: { active: unref(isActive)(unref(page).relativePath, __props.item.activeMatch || __props.item.link) },
        href: __props.item.link
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.item.text)}`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.item.text), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const VPMenuLink_vue_vue_type_style_index_0_scoped_e8e0fb1d_lang = "";
const _sfc_setup$16 = _sfc_main$16.setup;
_sfc_main$16.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPMenuLink.vue");
  return _sfc_setup$16 ? _sfc_setup$16(props, ctx) : void 0;
};
const VPMenuLink = /* @__PURE__ */ _export_sfc(_sfc_main$16, [["__scopeId", "data-v-e8e0fb1d"]]);
const _sfc_main$15 = /* @__PURE__ */ defineComponent({
  __name: "VPMenuGroup",
  __ssrInlineRender: true,
  props: {
    text: null,
    items: null
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPMenuGroup" }, _attrs))} data-v-9ca52130>`);
      if (__props.text) {
        _push(`<p class="title" data-v-9ca52130>${ssrInterpolate(__props.text)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(__props.items, (item) => {
        _push(`<!--[-->`);
        if ("link" in item) {
          _push(ssrRenderComponent(VPMenuLink, { item }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const VPMenuGroup_vue_vue_type_style_index_0_scoped_9ca52130_lang = "";
const _sfc_setup$15 = _sfc_main$15.setup;
_sfc_main$15.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPMenuGroup.vue");
  return _sfc_setup$15 ? _sfc_setup$15(props, ctx) : void 0;
};
const VPMenuGroup = /* @__PURE__ */ _export_sfc(_sfc_main$15, [["__scopeId", "data-v-9ca52130"]]);
const _sfc_main$14 = /* @__PURE__ */ defineComponent({
  __name: "VPMenu",
  __ssrInlineRender: true,
  props: {
    items: null
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPMenu" }, _attrs))} data-v-1c5d0cfc>`);
      if (__props.items) {
        _push(`<div class="items" data-v-1c5d0cfc><!--[-->`);
        ssrRenderList(__props.items, (item) => {
          _push(`<!--[-->`);
          if ("link" in item) {
            _push(ssrRenderComponent(VPMenuLink, { item }, null, _parent));
          } else {
            _push(ssrRenderComponent(VPMenuGroup, {
              text: item.text,
              items: item.items
            }, null, _parent));
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const VPMenu_vue_vue_type_style_index_0_scoped_1c5d0cfc_lang = "";
const _sfc_setup$14 = _sfc_main$14.setup;
_sfc_main$14.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPMenu.vue");
  return _sfc_setup$14 ? _sfc_setup$14(props, ctx) : void 0;
};
const VPMenu = /* @__PURE__ */ _export_sfc(_sfc_main$14, [["__scopeId", "data-v-1c5d0cfc"]]);
const _sfc_main$13 = /* @__PURE__ */ defineComponent({
  __name: "VPFlyout",
  __ssrInlineRender: true,
  props: {
    icon: null,
    button: null,
    label: null,
    items: null
  },
  setup(__props) {
    const open = ref(false);
    const el = ref();
    useFlyout({ el, onBlur });
    function onBlur() {
      open.value = false;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "VPFlyout",
        ref_key: "el",
        ref: el
      }, _attrs))} data-v-6ffb57d3><button type="button" class="button" aria-haspopup="true"${ssrRenderAttr("aria-expanded", open.value)}${ssrRenderAttr("aria-label", __props.label)} data-v-6ffb57d3>`);
      if (__props.button || __props.icon) {
        _push(`<span class="text" data-v-6ffb57d3>`);
        if (__props.icon) {
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.icon), { class: "option-icon" }, null), _parent);
        } else {
          _push(`<!---->`);
        }
        _push(` ${ssrInterpolate(__props.button)} `);
        _push(ssrRenderComponent(VPIconChevronDown, { class: "text-icon" }, null, _parent));
        _push(`</span>`);
      } else {
        _push(ssrRenderComponent(VPIconMoreHorizontal, { class: "icon" }, null, _parent));
      }
      _push(`</button><div class="menu" data-v-6ffb57d3>`);
      _push(ssrRenderComponent(VPMenu, { items: __props.items }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", {}, void 0, true)
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const VPFlyout_vue_vue_type_style_index_0_scoped_6ffb57d3_lang = "";
const _sfc_setup$13 = _sfc_main$13.setup;
_sfc_main$13.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPFlyout.vue");
  return _sfc_setup$13 ? _sfc_setup$13(props, ctx) : void 0;
};
const VPFlyout = /* @__PURE__ */ _export_sfc(_sfc_main$13, [["__scopeId", "data-v-6ffb57d3"]]);
const _sfc_main$12 = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarMenuGroup",
  __ssrInlineRender: true,
  props: {
    item: null
  },
  setup(__props) {
    const { page } = useData();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VPFlyout, mergeProps({
        class: {
          VPNavBarMenuGroup: true,
          active: unref(isActive)(
            unref(page).relativePath,
            __props.item.activeMatch,
            !!__props.item.activeMatch
          )
        },
        button: __props.item.text,
        items: __props.item.items
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$12 = _sfc_main$12.setup;
_sfc_main$12.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarMenuGroup.vue");
  return _sfc_setup$12 ? _sfc_setup$12(props, ctx) : void 0;
};
const _sfc_main$11 = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarMenu",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme: theme2 } = useData();
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(theme2).nav) {
        _push(`<nav${ssrRenderAttrs(mergeProps({
          "aria-labelledby": "main-nav-aria-label",
          class: "VPNavBarMenu"
        }, _attrs))} data-v-f83db6ba><span id="main-nav-aria-label" class="visually-hidden" data-v-f83db6ba>Main Navigation</span><!--[-->`);
        ssrRenderList(unref(theme2).nav, (item) => {
          _push(`<!--[-->`);
          if ("link" in item) {
            _push(ssrRenderComponent(VPNavBarMenuLink, { item }, null, _parent));
          } else {
            _push(ssrRenderComponent(_sfc_main$12, { item }, null, _parent));
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></nav>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const VPNavBarMenu_vue_vue_type_style_index_0_scoped_f83db6ba_lang = "";
const _sfc_setup$11 = _sfc_main$11.setup;
_sfc_main$11.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarMenu.vue");
  return _sfc_setup$11 ? _sfc_setup$11(props, ctx) : void 0;
};
const VPNavBarMenu = /* @__PURE__ */ _export_sfc(_sfc_main$11, [["__scopeId", "data-v-f83db6ba"]]);
const _sfc_main$10 = {};
function _sfc_ssrRender$a(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    focusable: "false",
    viewBox: "0 0 24 24"
  }, _attrs))}><path d="M0 0h24v24H0z" fill="none"></path><path d=" M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z " class="css-c4d79v"></path></svg>`);
}
const _sfc_setup$10 = _sfc_main$10.setup;
_sfc_main$10.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/icons/VPIconLanguages.vue");
  return _sfc_setup$10 ? _sfc_setup$10(props, ctx) : void 0;
};
const VPIconLanguages = /* @__PURE__ */ _export_sfc(_sfc_main$10, [["ssrRender", _sfc_ssrRender$a]]);
const _sfc_main$$ = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarTranslations",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme: theme2 } = useData();
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(theme2).localeLinks) {
        _push(ssrRenderComponent(VPFlyout, mergeProps({
          class: "VPNavBarTranslations",
          icon: VPIconLanguages
        }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="items" data-v-db824e91${_scopeId}><p class="title" data-v-db824e91${_scopeId}>${ssrInterpolate(unref(theme2).localeLinks.text)}</p><!--[-->`);
              ssrRenderList(unref(theme2).localeLinks.items, (locale) => {
                _push2(ssrRenderComponent(VPMenuLink, { item: locale }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            } else {
              return [
                createVNode("div", { class: "items" }, [
                  createVNode("p", { class: "title" }, toDisplayString(unref(theme2).localeLinks.text), 1),
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(theme2).localeLinks.items, (locale) => {
                    return openBlock(), createBlock(VPMenuLink, {
                      key: locale.link,
                      item: locale
                    }, null, 8, ["item"]);
                  }), 128))
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const VPNavBarTranslations_vue_vue_type_style_index_0_scoped_db824e91_lang = "";
const _sfc_setup$$ = _sfc_main$$.setup;
_sfc_main$$.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarTranslations.vue");
  return _sfc_setup$$ ? _sfc_setup$$(props, ctx) : void 0;
};
const VPNavBarTranslations = /* @__PURE__ */ _export_sfc(_sfc_main$$, [["__scopeId", "data-v-db824e91"]]);
const VPSwitch_vue_vue_type_style_index_0_scoped_eba7420e_lang = "";
const _sfc_main$_ = {};
function _sfc_ssrRender$9(_ctx, _push, _parent, _attrs) {
  _push(`<button${ssrRenderAttrs(mergeProps({
    class: "VPSwitch",
    type: "button",
    role: "switch"
  }, _attrs))} data-v-eba7420e><span class="check" data-v-eba7420e>`);
  if (_ctx.$slots.default) {
    _push(`<span class="icon" data-v-eba7420e>`);
    ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
    _push(`</span>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</span></button>`);
}
const _sfc_setup$_ = _sfc_main$_.setup;
_sfc_main$_.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPSwitch.vue");
  return _sfc_setup$_ ? _sfc_setup$_(props, ctx) : void 0;
};
const VPSwitch = /* @__PURE__ */ _export_sfc(_sfc_main$_, [["ssrRender", _sfc_ssrRender$9], ["__scopeId", "data-v-eba7420e"]]);
const _sfc_main$Z = {};
function _sfc_ssrRender$8(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    focusable: "false",
    viewBox: "0 0 24 24"
  }, _attrs))}><path d="M12,18c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6S15.3,18,12,18zM12,8c-2.2,0-4,1.8-4,4c0,2.2,1.8,4,4,4c2.2,0,4-1.8,4-4C16,9.8,14.2,8,12,8z"></path><path d="M12,4c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,3.6,12.6,4,12,4z"></path><path d="M12,24c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,23.6,12.6,24,12,24z"></path><path d="M5.6,6.6c-0.3,0-0.5-0.1-0.7-0.3L3.5,4.9c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C6.2,6.5,5.9,6.6,5.6,6.6z"></path><path d="M19.8,20.8c-0.3,0-0.5-0.1-0.7-0.3l-1.4-1.4c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C20.3,20.7,20,20.8,19.8,20.8z"></path><path d="M3,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S3.6,13,3,13z"></path><path d="M23,13h-2c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S23.6,13,23,13z"></path><path d="M4.2,20.8c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C4.7,20.7,4.5,20.8,4.2,20.8z"></path><path d="M18.4,6.6c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C18.9,6.5,18.6,6.6,18.4,6.6z"></path></svg>`);
}
const _sfc_setup$Z = _sfc_main$Z.setup;
_sfc_main$Z.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/icons/VPIconSun.vue");
  return _sfc_setup$Z ? _sfc_setup$Z(props, ctx) : void 0;
};
const VPIconSun = /* @__PURE__ */ _export_sfc(_sfc_main$Z, [["ssrRender", _sfc_ssrRender$8]]);
const _sfc_main$Y = {};
function _sfc_ssrRender$7(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    focusable: "false",
    viewBox: "0 0 24 24"
  }, _attrs))}><path d="M12.1,22c-0.3,0-0.6,0-0.9,0c-5.5-0.5-9.5-5.4-9-10.9c0.4-4.8,4.2-8.6,9-9c0.4,0,0.8,0.2,1,0.5c0.2,0.3,0.2,0.8-0.1,1.1c-2,2.7-1.4,6.4,1.3,8.4c2.1,1.6,5,1.6,7.1,0c0.3-0.2,0.7-0.3,1.1-0.1c0.3,0.2,0.5,0.6,0.5,1c-0.2,2.7-1.5,5.1-3.6,6.8C16.6,21.2,14.4,22,12.1,22zM9.3,4.4c-2.9,1-5,3.6-5.2,6.8c-0.4,4.4,2.8,8.3,7.2,8.7c2.1,0.2,4.2-0.4,5.8-1.8c1.1-0.9,1.9-2.1,2.4-3.4c-2.5,0.9-5.3,0.5-7.5-1.1C9.2,11.4,8.1,7.7,9.3,4.4z"></path></svg>`);
}
const _sfc_setup$Y = _sfc_main$Y.setup;
_sfc_main$Y.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/icons/VPIconMoon.vue");
  return _sfc_setup$Y ? _sfc_setup$Y(props, ctx) : void 0;
};
const VPIconMoon = /* @__PURE__ */ _export_sfc(_sfc_main$Y, [["ssrRender", _sfc_ssrRender$7]]);
const _sfc_main$X = /* @__PURE__ */ defineComponent({
  __name: "VPSwitchAppearance",
  __ssrInlineRender: true,
  setup(__props) {
    const { site, isDark } = useData();
    const checked = ref(false);
    const toggle = typeof localStorage !== "undefined" ? useAppearance() : () => {
    };
    onMounted(() => {
      checked.value = document.documentElement.classList.contains("dark");
    });
    function useAppearance() {
      const query = window.matchMedia("(prefers-color-scheme: dark)");
      const classList = document.documentElement.classList;
      let userPreference = localStorage.getItem(APPEARANCE_KEY) || site.value.appearance !== true ? site.value.appearance : "auto";
      let isDark2 = userPreference === "auto" ? query.matches : userPreference === "dark";
      query.onchange = (e) => {
        if (userPreference === "auto") {
          setClass(isDark2 = e.matches);
        }
      };
      function toggle2() {
        setClass(isDark2 = !isDark2);
        userPreference = isDark2 ? query.matches ? "auto" : "dark" : query.matches ? "light" : "auto";
        localStorage.setItem(APPEARANCE_KEY, userPreference);
      }
      function setClass(dark) {
        const css = document.createElement("style");
        css.type = "text/css";
        css.appendChild(
          document.createTextNode(
            `:not(.VPSwitchAppearance):not(.VPSwitchAppearance *) {
  -webkit-transition: none !important;
  -moz-transition: none !important;
  -o-transition: none !important;
  -ms-transition: none !important;
  transition: none !important;
}`
          )
        );
        document.head.appendChild(css);
        checked.value = dark;
        classList[dark ? "add" : "remove"]("dark");
        window.getComputedStyle(css).opacity;
        document.head.removeChild(css);
      }
      return toggle2;
    }
    watch(checked, (newIsDark) => {
      isDark.value = newIsDark;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VPSwitch, mergeProps({
        class: "VPSwitchAppearance",
        "aria-label": "toggle dark mode",
        "aria-checked": checked.value,
        onClick: unref(toggle)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VPIconSun, { class: "sun" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(VPIconMoon, { class: "moon" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(VPIconSun, { class: "sun" }),
              createVNode(VPIconMoon, { class: "moon" })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const VPSwitchAppearance_vue_vue_type_style_index_0_scoped_31fdf26f_lang = "";
const _sfc_setup$X = _sfc_main$X.setup;
_sfc_main$X.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPSwitchAppearance.vue");
  return _sfc_setup$X ? _sfc_setup$X(props, ctx) : void 0;
};
const VPSwitchAppearance = /* @__PURE__ */ _export_sfc(_sfc_main$X, [["__scopeId", "data-v-31fdf26f"]]);
const _sfc_main$W = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarAppearance",
  __ssrInlineRender: true,
  setup(__props) {
    const { site } = useData();
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(site).appearance) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPNavBarAppearance" }, _attrs))} data-v-a3e7452b>`);
        _push(ssrRenderComponent(VPSwitchAppearance, null, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const VPNavBarAppearance_vue_vue_type_style_index_0_scoped_a3e7452b_lang = "";
const _sfc_setup$W = _sfc_main$W.setup;
_sfc_main$W.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarAppearance.vue");
  return _sfc_setup$W ? _sfc_setup$W(props, ctx) : void 0;
};
const VPNavBarAppearance = /* @__PURE__ */ _export_sfc(_sfc_main$W, [["__scopeId", "data-v-a3e7452b"]]);
const icons = {
  discord: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Discord</title><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>',
  facebook: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Facebook</title><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
  github: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
  instagram: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Instagram</title><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>',
  linkedin: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>LinkedIn</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
  slack: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Slack</title><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/></svg>',
  twitter: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Twitter</title><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>',
  youtube: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>YouTube</title><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>'
};
const _sfc_main$V = /* @__PURE__ */ defineComponent({
  __name: "VPSocialLink",
  __ssrInlineRender: true,
  props: {
    icon: null,
    link: null
  },
  setup(__props) {
    const props = __props;
    const svg = computed(() => {
      if (typeof props.icon === "object")
        return props.icon.svg;
      return icons[props.icon];
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<a${ssrRenderAttrs(mergeProps({
        class: "VPSocialLink",
        href: __props.link,
        target: "_blank",
        rel: "noopener"
      }, _attrs))} data-v-e57698f6>${unref(svg)}</a>`);
    };
  }
});
const VPSocialLink_vue_vue_type_style_index_0_scoped_e57698f6_lang = "";
const _sfc_setup$V = _sfc_main$V.setup;
_sfc_main$V.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPSocialLink.vue");
  return _sfc_setup$V ? _sfc_setup$V(props, ctx) : void 0;
};
const VPSocialLink = /* @__PURE__ */ _export_sfc(_sfc_main$V, [["__scopeId", "data-v-e57698f6"]]);
const _sfc_main$U = /* @__PURE__ */ defineComponent({
  __name: "VPSocialLinks",
  __ssrInlineRender: true,
  props: {
    links: null
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPSocialLinks" }, _attrs))} data-v-f6988cfb><!--[-->`);
      ssrRenderList(__props.links, ({ link: link2, icon }) => {
        _push(ssrRenderComponent(VPSocialLink, {
          key: link2,
          icon,
          link: link2
        }, null, _parent));
      });
      _push(`<!--]--></div>`);
    };
  }
});
const VPSocialLinks_vue_vue_type_style_index_0_scoped_f6988cfb_lang = "";
const _sfc_setup$U = _sfc_main$U.setup;
_sfc_main$U.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPSocialLinks.vue");
  return _sfc_setup$U ? _sfc_setup$U(props, ctx) : void 0;
};
const VPSocialLinks = /* @__PURE__ */ _export_sfc(_sfc_main$U, [["__scopeId", "data-v-f6988cfb"]]);
const _sfc_main$T = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarSocialLinks",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme: theme2 } = useData();
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(theme2).socialLinks) {
        _push(ssrRenderComponent(VPSocialLinks, mergeProps({
          class: "VPNavBarSocialLinks",
          links: unref(theme2).socialLinks
        }, _attrs), null, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const VPNavBarSocialLinks_vue_vue_type_style_index_0_scoped_738bef5a_lang = "";
const _sfc_setup$T = _sfc_main$T.setup;
_sfc_main$T.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarSocialLinks.vue");
  return _sfc_setup$T ? _sfc_setup$T(props, ctx) : void 0;
};
const VPNavBarSocialLinks = /* @__PURE__ */ _export_sfc(_sfc_main$T, [["__scopeId", "data-v-738bef5a"]]);
const _sfc_main$S = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarExtra",
  __ssrInlineRender: true,
  setup(__props) {
    const { site, theme: theme2 } = useData();
    const hasExtraContent = computed(() => theme2.value.localeLinks || site.value.appearance || theme2.value.socialLinks);
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(hasExtraContent)) {
        _push(ssrRenderComponent(VPFlyout, mergeProps({
          class: "VPNavBarExtra",
          label: "extra navigation"
        }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (unref(theme2).localeLinks) {
                _push2(`<div class="group" data-v-e4361c82${_scopeId}><p class="trans-title" data-v-e4361c82${_scopeId}>${ssrInterpolate(unref(theme2).localeLinks.text)}</p><!--[-->`);
                ssrRenderList(unref(theme2).localeLinks.items, (locale) => {
                  _push2(ssrRenderComponent(VPMenuLink, { item: locale }, null, _parent2, _scopeId));
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(site).appearance) {
                _push2(`<div class="group" data-v-e4361c82${_scopeId}><div class="item appearance" data-v-e4361c82${_scopeId}><p class="label" data-v-e4361c82${_scopeId}>Appearance</p><div class="appearance-action" data-v-e4361c82${_scopeId}>`);
                _push2(ssrRenderComponent(VPSwitchAppearance, null, null, _parent2, _scopeId));
                _push2(`</div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(theme2).socialLinks) {
                _push2(`<div class="group" data-v-e4361c82${_scopeId}><div class="item social-links" data-v-e4361c82${_scopeId}>`);
                _push2(ssrRenderComponent(VPSocialLinks, {
                  class: "social-links-list",
                  links: unref(theme2).socialLinks
                }, null, _parent2, _scopeId));
                _push2(`</div></div>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                unref(theme2).localeLinks ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "group"
                }, [
                  createVNode("p", { class: "trans-title" }, toDisplayString(unref(theme2).localeLinks.text), 1),
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(theme2).localeLinks.items, (locale) => {
                    return openBlock(), createBlock(VPMenuLink, {
                      key: locale.link,
                      item: locale
                    }, null, 8, ["item"]);
                  }), 128))
                ])) : createCommentVNode("", true),
                unref(site).appearance ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "group"
                }, [
                  createVNode("div", { class: "item appearance" }, [
                    createVNode("p", { class: "label" }, "Appearance"),
                    createVNode("div", { class: "appearance-action" }, [
                      createVNode(VPSwitchAppearance)
                    ])
                  ])
                ])) : createCommentVNode("", true),
                unref(theme2).socialLinks ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: "group"
                }, [
                  createVNode("div", { class: "item social-links" }, [
                    createVNode(VPSocialLinks, {
                      class: "social-links-list",
                      links: unref(theme2).socialLinks
                    }, null, 8, ["links"])
                  ])
                ])) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const VPNavBarExtra_vue_vue_type_style_index_0_scoped_e4361c82_lang = "";
const _sfc_setup$S = _sfc_main$S.setup;
_sfc_main$S.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarExtra.vue");
  return _sfc_setup$S ? _sfc_setup$S(props, ctx) : void 0;
};
const VPNavBarExtra = /* @__PURE__ */ _export_sfc(_sfc_main$S, [["__scopeId", "data-v-e4361c82"]]);
const _sfc_main$R = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarHamburger",
  __ssrInlineRender: true,
  props: {
    active: { type: Boolean }
  },
  emits: ["click"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: "button",
        class: ["VPNavBarHamburger", { active: __props.active }],
        "aria-label": "mobile navigation",
        "aria-expanded": __props.active,
        "aria-controls": "VPNavScreen"
      }, _attrs))} data-v-e5dd9c1c><span class="container" data-v-e5dd9c1c><span class="top" data-v-e5dd9c1c></span><span class="middle" data-v-e5dd9c1c></span><span class="bottom" data-v-e5dd9c1c></span></span></button>`);
    };
  }
});
const VPNavBarHamburger_vue_vue_type_style_index_0_scoped_e5dd9c1c_lang = "";
const _sfc_setup$R = _sfc_main$R.setup;
_sfc_main$R.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarHamburger.vue");
  return _sfc_setup$R ? _sfc_setup$R(props, ctx) : void 0;
};
const VPNavBarHamburger = /* @__PURE__ */ _export_sfc(_sfc_main$R, [["__scopeId", "data-v-e5dd9c1c"]]);
const _sfc_main$Q = /* @__PURE__ */ defineComponent({
  __name: "VPNavBar",
  __ssrInlineRender: true,
  props: {
    isScreenOpen: { type: Boolean }
  },
  emits: ["toggle-screen"],
  setup(__props) {
    const { hasSidebar } = useSidebar();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["VPNavBar", { "has-sidebar": unref(hasSidebar) }]
      }, _attrs))} data-v-6f1d18b5><div class="container" data-v-6f1d18b5>`);
      _push(ssrRenderComponent(VPNavBarTitle, null, {
        "nav-bar-title-before": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "nav-bar-title-before", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "nav-bar-title-before", {}, void 0, true)
            ];
          }
        }),
        "nav-bar-title-after": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "nav-bar-title-after", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "nav-bar-title-after", {}, void 0, true)
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`<div class="content" data-v-6f1d18b5>`);
      ssrRenderSlot(_ctx.$slots, "nav-bar-content-before", {}, null, _push, _parent);
      _push(ssrRenderComponent(_sfc_main$1c, { class: "search" }, null, _parent));
      _push(ssrRenderComponent(VPNavBarMenu, { class: "menu" }, null, _parent));
      _push(ssrRenderComponent(VPNavBarTranslations, { class: "translations" }, null, _parent));
      _push(ssrRenderComponent(VPNavBarAppearance, { class: "appearance" }, null, _parent));
      _push(ssrRenderComponent(VPNavBarSocialLinks, { class: "social-links" }, null, _parent));
      _push(ssrRenderComponent(VPNavBarExtra, { class: "extra" }, null, _parent));
      ssrRenderSlot(_ctx.$slots, "nav-bar-content-after", {}, null, _push, _parent);
      _push(ssrRenderComponent(VPNavBarHamburger, {
        class: "hamburger",
        active: __props.isScreenOpen,
        onClick: ($event) => _ctx.$emit("toggle-screen")
      }, null, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const VPNavBar_vue_vue_type_style_index_0_scoped_6f1d18b5_lang = "";
const _sfc_setup$Q = _sfc_main$Q.setup;
_sfc_main$Q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBar.vue");
  return _sfc_setup$Q ? _sfc_setup$Q(props, ctx) : void 0;
};
const VPNavBar = /* @__PURE__ */ _export_sfc(_sfc_main$Q, [["__scopeId", "data-v-6f1d18b5"]]);
const _sfc_main$P = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreenMenuLink",
  __ssrInlineRender: true,
  props: {
    text: null,
    link: null
  },
  setup(__props) {
    const closeScreen = inject("close-screen");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VPLink, mergeProps({
        class: "VPNavScreenMenuLink",
        href: __props.link,
        onClick: unref(closeScreen)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.text)}`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.text), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const VPNavScreenMenuLink_vue_vue_type_style_index_0_scoped_b7098508_lang = "";
const _sfc_setup$P = _sfc_main$P.setup;
_sfc_main$P.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavScreenMenuLink.vue");
  return _sfc_setup$P ? _sfc_setup$P(props, ctx) : void 0;
};
const VPNavScreenMenuLink = /* @__PURE__ */ _export_sfc(_sfc_main$P, [["__scopeId", "data-v-b7098508"]]);
const _sfc_main$O = {};
function _sfc_ssrRender$6(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    focusable: "false",
    viewBox: "0 0 24 24"
  }, _attrs))}><path d="M18.9,10.9h-6v-6c0-0.6-0.4-1-1-1s-1,0.4-1,1v6h-6c-0.6,0-1,0.4-1,1s0.4,1,1,1h6v6c0,0.6,0.4,1,1,1s1-0.4,1-1v-6h6c0.6,0,1-0.4,1-1S19.5,10.9,18.9,10.9z"></path></svg>`);
}
const _sfc_setup$O = _sfc_main$O.setup;
_sfc_main$O.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/icons/VPIconPlus.vue");
  return _sfc_setup$O ? _sfc_setup$O(props, ctx) : void 0;
};
const VPIconPlus = /* @__PURE__ */ _export_sfc(_sfc_main$O, [["ssrRender", _sfc_ssrRender$6]]);
const _sfc_main$N = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreenMenuGroupLink",
  __ssrInlineRender: true,
  props: {
    text: null,
    link: null
  },
  setup(__props) {
    const closeScreen = inject("close-screen");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VPLink, mergeProps({
        class: "VPNavScreenMenuGroupLink",
        href: __props.link,
        onClick: unref(closeScreen)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.text)}`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.text), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const VPNavScreenMenuGroupLink_vue_vue_type_style_index_0_scoped_7f173864_lang = "";
const _sfc_setup$N = _sfc_main$N.setup;
_sfc_main$N.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavScreenMenuGroupLink.vue");
  return _sfc_setup$N ? _sfc_setup$N(props, ctx) : void 0;
};
const VPNavScreenMenuGroupLink = /* @__PURE__ */ _export_sfc(_sfc_main$N, [["__scopeId", "data-v-7f173864"]]);
const _sfc_main$M = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreenMenuGroupSection",
  __ssrInlineRender: true,
  props: {
    text: null,
    items: null
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPNavScreenMenuGroupSection" }, _attrs))} data-v-7478538b>`);
      if (__props.text) {
        _push(`<p class="title" data-v-7478538b>${ssrInterpolate(__props.text)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(__props.items, (item) => {
        _push(ssrRenderComponent(VPNavScreenMenuGroupLink, {
          key: item.text,
          text: item.text,
          link: item.link
        }, null, _parent));
      });
      _push(`<!--]--></div>`);
    };
  }
});
const VPNavScreenMenuGroupSection_vue_vue_type_style_index_0_scoped_7478538b_lang = "";
const _sfc_setup$M = _sfc_main$M.setup;
_sfc_main$M.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavScreenMenuGroupSection.vue");
  return _sfc_setup$M ? _sfc_setup$M(props, ctx) : void 0;
};
const VPNavScreenMenuGroupSection = /* @__PURE__ */ _export_sfc(_sfc_main$M, [["__scopeId", "data-v-7478538b"]]);
const _sfc_main$L = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreenMenuGroup",
  __ssrInlineRender: true,
  props: {
    text: null,
    items: null
  },
  setup(__props) {
    const props = __props;
    const isOpen = ref(false);
    const groupId = computed(
      () => `NavScreenGroup-${props.text.replace(" ", "-").toLowerCase()}`
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["VPNavScreenMenuGroup", { open: isOpen.value }]
      }, _attrs))} data-v-5bc84358><button class="button"${ssrRenderAttr("aria-controls", unref(groupId))}${ssrRenderAttr("aria-expanded", isOpen.value)} data-v-5bc84358><span class="button-text" data-v-5bc84358>${ssrInterpolate(__props.text)}</span>`);
      _push(ssrRenderComponent(VPIconPlus, { class: "button-icon" }, null, _parent));
      _push(`</button><div${ssrRenderAttr("id", unref(groupId))} class="items" data-v-5bc84358><!--[-->`);
      ssrRenderList(__props.items, (item) => {
        _push(`<!--[-->`);
        if ("link" in item) {
          _push(`<div class="item" data-v-5bc84358>`);
          _push(ssrRenderComponent(VPNavScreenMenuGroupLink, {
            text: item.text,
            link: item.link
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<div class="group" data-v-5bc84358>`);
          _push(ssrRenderComponent(VPNavScreenMenuGroupSection, {
            text: item.text,
            items: item.items
          }, null, _parent));
          _push(`</div>`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const VPNavScreenMenuGroup_vue_vue_type_style_index_0_scoped_5bc84358_lang = "";
const _sfc_setup$L = _sfc_main$L.setup;
_sfc_main$L.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavScreenMenuGroup.vue");
  return _sfc_setup$L ? _sfc_setup$L(props, ctx) : void 0;
};
const VPNavScreenMenuGroup = /* @__PURE__ */ _export_sfc(_sfc_main$L, [["__scopeId", "data-v-5bc84358"]]);
const _sfc_main$K = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreenMenu",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme: theme2 } = useData();
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(theme2).nav) {
        _push(`<nav${ssrRenderAttrs(mergeProps({ class: "VPNavScreenMenu" }, _attrs))}><!--[-->`);
        ssrRenderList(unref(theme2).nav, (item) => {
          _push(`<!--[-->`);
          if ("link" in item) {
            _push(ssrRenderComponent(VPNavScreenMenuLink, {
              text: item.text,
              link: item.link
            }, null, _parent));
          } else {
            _push(ssrRenderComponent(VPNavScreenMenuGroup, {
              text: item.text || "",
              items: item.items
            }, null, _parent));
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></nav>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$K = _sfc_main$K.setup;
_sfc_main$K.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavScreenMenu.vue");
  return _sfc_setup$K ? _sfc_setup$K(props, ctx) : void 0;
};
const _sfc_main$J = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreenAppearance",
  __ssrInlineRender: true,
  setup(__props) {
    const { site } = useData();
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(site).appearance) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPNavScreenAppearance" }, _attrs))} data-v-7bc19822><p class="text" data-v-7bc19822>Appearance</p>`);
        _push(ssrRenderComponent(VPSwitchAppearance, null, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const VPNavScreenAppearance_vue_vue_type_style_index_0_scoped_7bc19822_lang = "";
const _sfc_setup$J = _sfc_main$J.setup;
_sfc_main$J.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavScreenAppearance.vue");
  return _sfc_setup$J ? _sfc_setup$J(props, ctx) : void 0;
};
const VPNavScreenAppearance = /* @__PURE__ */ _export_sfc(_sfc_main$J, [["__scopeId", "data-v-7bc19822"]]);
const _sfc_main$I = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreenTranslations",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme: theme2 } = useData();
    const isOpen = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(theme2).localeLinks) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: ["VPNavScreenTranslations", { open: isOpen.value }]
        }, _attrs))} data-v-6bfcad30><button class="title" data-v-6bfcad30>`);
        _push(ssrRenderComponent(VPIconLanguages, { class: "icon lang" }, null, _parent));
        _push(` ${ssrInterpolate(unref(theme2).localeLinks.text)} `);
        _push(ssrRenderComponent(VPIconChevronDown, { class: "icon chevron" }, null, _parent));
        _push(`</button><ul class="list" data-v-6bfcad30><!--[-->`);
        ssrRenderList(unref(theme2).localeLinks.items, (locale) => {
          _push(`<li class="item" data-v-6bfcad30><a class="link"${ssrRenderAttr("href", locale.link)} data-v-6bfcad30>${ssrInterpolate(locale.text)}</a></li>`);
        });
        _push(`<!--]--></ul></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const VPNavScreenTranslations_vue_vue_type_style_index_0_scoped_6bfcad30_lang = "";
const _sfc_setup$I = _sfc_main$I.setup;
_sfc_main$I.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavScreenTranslations.vue");
  return _sfc_setup$I ? _sfc_setup$I(props, ctx) : void 0;
};
const VPNavScreenTranslations = /* @__PURE__ */ _export_sfc(_sfc_main$I, [["__scopeId", "data-v-6bfcad30"]]);
const _sfc_main$H = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreenSocialLinks",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme: theme2 } = useData();
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(theme2).socialLinks) {
        _push(ssrRenderComponent(VPSocialLinks, mergeProps({
          class: "VPNavScreenSocialLinks",
          links: unref(theme2).socialLinks
        }, _attrs), null, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$H = _sfc_main$H.setup;
_sfc_main$H.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavScreenSocialLinks.vue");
  return _sfc_setup$H ? _sfc_setup$H(props, ctx) : void 0;
};
const _sfc_main$G = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreen",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean }
  },
  setup(__props) {
    const screen = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.open) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: "VPNavScreen",
          ref_key: "screen",
          ref: screen
        }, _attrs))} data-v-4a289eba><div class="container" data-v-4a289eba>`);
        ssrRenderSlot(_ctx.$slots, "nav-screen-content-before", {}, null, _push, _parent);
        _push(ssrRenderComponent(_sfc_main$K, { class: "menu" }, null, _parent));
        _push(ssrRenderComponent(VPNavScreenTranslations, { class: "translations" }, null, _parent));
        _push(ssrRenderComponent(VPNavScreenAppearance, { class: "appearance" }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$H, { class: "social-links" }, null, _parent));
        ssrRenderSlot(_ctx.$slots, "nav-screen-content-after", {}, null, _push, _parent);
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const VPNavScreen_vue_vue_type_style_index_0_scoped_4a289eba_lang = "";
const _sfc_setup$G = _sfc_main$G.setup;
_sfc_main$G.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavScreen.vue");
  return _sfc_setup$G ? _sfc_setup$G(props, ctx) : void 0;
};
const VPNavScreen = /* @__PURE__ */ _export_sfc(_sfc_main$G, [["__scopeId", "data-v-4a289eba"]]);
const _sfc_main$F = /* @__PURE__ */ defineComponent({
  __name: "VPNav",
  __ssrInlineRender: true,
  setup(__props) {
    const { isScreenOpen, closeScreen, toggleScreen } = useNav();
    const { hasSidebar } = useSidebar();
    provide("close-screen", closeScreen);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${ssrRenderAttrs(mergeProps({
        class: ["VPNav", { "no-sidebar": !unref(hasSidebar) }]
      }, _attrs))} data-v-a50780ff>`);
      _push(ssrRenderComponent(VPNavBar, {
        "is-screen-open": unref(isScreenOpen),
        onToggleScreen: unref(toggleScreen)
      }, {
        "nav-bar-title-before": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "nav-bar-title-before", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "nav-bar-title-before", {}, void 0, true)
            ];
          }
        }),
        "nav-bar-title-after": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "nav-bar-title-after", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "nav-bar-title-after", {}, void 0, true)
            ];
          }
        }),
        "nav-bar-content-before": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "nav-bar-content-before", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "nav-bar-content-before", {}, void 0, true)
            ];
          }
        }),
        "nav-bar-content-after": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "nav-bar-content-after", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "nav-bar-content-after", {}, void 0, true)
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(ssrRenderComponent(VPNavScreen, { open: unref(isScreenOpen) }, {
        "nav-screen-content-before": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "nav-screen-content-before", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "nav-screen-content-before", {}, void 0, true)
            ];
          }
        }),
        "nav-screen-content-after": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "nav-screen-content-after", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "nav-screen-content-after", {}, void 0, true)
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`</header>`);
    };
  }
});
const VPNav_vue_vue_type_style_index_0_scoped_a50780ff_lang = "";
const _sfc_setup$F = _sfc_main$F.setup;
_sfc_main$F.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNav.vue");
  return _sfc_setup$F ? _sfc_setup$F(props, ctx) : void 0;
};
const VPNav = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["__scopeId", "data-v-a50780ff"]]);
const _sfc_main$E = {};
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    focusable: "false",
    viewBox: "0 0 24 24"
  }, _attrs))}><path d="M17,11H3c-0.6,0-1-0.4-1-1s0.4-1,1-1h14c0.6,0,1,0.4,1,1S17.6,11,17,11z"></path><path d="M21,7H3C2.4,7,2,6.6,2,6s0.4-1,1-1h18c0.6,0,1,0.4,1,1S21.6,7,21,7z"></path><path d="M21,15H3c-0.6,0-1-0.4-1-1s0.4-1,1-1h18c0.6,0,1,0.4,1,1S21.6,15,21,15z"></path><path d="M17,19H3c-0.6,0-1-0.4-1-1s0.4-1,1-1h14c0.6,0,1,0.4,1,1S17.6,19,17,19z"></path></svg>`);
}
const _sfc_setup$E = _sfc_main$E.setup;
_sfc_main$E.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/icons/VPIconAlignLeft.vue");
  return _sfc_setup$E ? _sfc_setup$E(props, ctx) : void 0;
};
const VPIconAlignLeft = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["ssrRender", _sfc_ssrRender$5]]);
const _sfc_main$D = /* @__PURE__ */ defineComponent({
  __name: "VPLocalNav",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean }
  },
  emits: ["open-menu"],
  setup(__props) {
    const { hasSidebar } = useSidebar();
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(hasSidebar)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPLocalNav" }, _attrs))} data-v-b6162a8b><button class="menu"${ssrRenderAttr("aria-expanded", __props.open)} aria-controls="VPSidebarNav" data-v-b6162a8b>`);
        _push(ssrRenderComponent(VPIconAlignLeft, { class: "menu-icon" }, null, _parent));
        _push(`<span class="menu-text" data-v-b6162a8b>Menu</span></button><a class="top-link" href="#" data-v-b6162a8b> Return to top </a></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const VPLocalNav_vue_vue_type_style_index_0_scoped_b6162a8b_lang = "";
const _sfc_setup$D = _sfc_main$D.setup;
_sfc_main$D.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPLocalNav.vue");
  return _sfc_setup$D ? _sfc_setup$D(props, ctx) : void 0;
};
const VPLocalNav = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["__scopeId", "data-v-b6162a8b"]]);
const _sfc_main$C = {};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24"
  }, _attrs))}><path d="M19,2H5C3.3,2,2,3.3,2,5v14c0,1.7,1.3,3,3,3h14c1.7,0,3-1.3,3-3V5C22,3.3,20.7,2,19,2z M20,19c0,0.6-0.4,1-1,1H5c-0.6,0-1-0.4-1-1V5c0-0.6,0.4-1,1-1h14c0.6,0,1,0.4,1,1V19z"></path><path d="M16,11h-3V8c0-0.6-0.4-1-1-1s-1,0.4-1,1v3H8c-0.6,0-1,0.4-1,1s0.4,1,1,1h3v3c0,0.6,0.4,1,1,1s1-0.4,1-1v-3h3c0.6,0,1-0.4,1-1S16.6,11,16,11z"></path></svg>`);
}
const _sfc_setup$C = _sfc_main$C.setup;
_sfc_main$C.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/icons/VPIconPlusSquare.vue");
  return _sfc_setup$C ? _sfc_setup$C(props, ctx) : void 0;
};
const VPIconPlusSquare = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["ssrRender", _sfc_ssrRender$4]]);
const _sfc_main$B = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    viewBox: "0 0 24 24"
  }, _attrs))}><path d="M19,2H5C3.3,2,2,3.3,2,5v14c0,1.7,1.3,3,3,3h14c1.7,0,3-1.3,3-3V5C22,3.3,20.7,2,19,2zM20,19c0,0.6-0.4,1-1,1H5c-0.6,0-1-0.4-1-1V5c0-0.6,0.4-1,1-1h14c0.6,0,1,0.4,1,1V19z"></path><path d="M16,11H8c-0.6,0-1,0.4-1,1s0.4,1,1,1h8c0.6,0,1-0.4,1-1S16.6,11,16,11z"></path></svg>`);
}
const _sfc_setup$B = _sfc_main$B.setup;
_sfc_main$B.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/icons/VPIconMinusSquare.vue");
  return _sfc_setup$B ? _sfc_setup$B(props, ctx) : void 0;
};
const VPIconMinusSquare = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["ssrRender", _sfc_ssrRender$3]]);
const _sfc_main$A = /* @__PURE__ */ defineComponent({
  __name: "VPSidebarLink",
  __ssrInlineRender: true,
  props: {
    item: null,
    depth: { default: 1 }
  },
  setup(__props) {
    const { page, frontmatter } = useData();
    const maxDepth = computed(
      () => frontmatter.value.sidebarDepth || Infinity
    );
    const closeSideBar = inject("close-sidebar");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_VPSidebarLink = resolveComponent("VPSidebarLink", true);
      _push(`<!--[-->`);
      _push(ssrRenderComponent(VPLink, {
        class: ["link", { active: unref(isActive)(unref(page).relativePath, __props.item.link) }],
        style: { paddingLeft: 16 * (__props.depth - 1) + "px" },
        href: __props.item.link,
        onClick: unref(closeSideBar)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="${ssrRenderClass([{ light: __props.depth > 1 }, "link-text"])}" data-v-36b976d1${_scopeId}>${__props.item.text}</span>`);
          } else {
            return [
              createVNode("span", {
                innerHTML: __props.item.text,
                class: ["link-text", { light: __props.depth > 1 }]
              }, null, 10, ["innerHTML"])
            ];
          }
        }),
        _: 1
      }, _parent));
      if ("items" in __props.item && __props.depth < unref(maxDepth)) {
        _push(`<!--[-->`);
        ssrRenderList(__props.item.items, (child) => {
          _push(ssrRenderComponent(_component_VPSidebarLink, {
            item: child,
            depth: __props.depth + 1
          }, null, _parent));
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const VPSidebarLink_vue_vue_type_style_index_0_scoped_36b976d1_lang = "";
const _sfc_setup$A = _sfc_main$A.setup;
_sfc_main$A.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPSidebarLink.vue");
  return _sfc_setup$A ? _sfc_setup$A(props, ctx) : void 0;
};
const VPSidebarLink = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["__scopeId", "data-v-36b976d1"]]);
const _sfc_main$z = /* @__PURE__ */ defineComponent({
  __name: "VPSidebarGroup",
  __ssrInlineRender: true,
  props: {
    text: null,
    items: null,
    collapsible: { type: Boolean },
    collapsed: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const collapsed = ref(false);
    watchEffect(() => {
      collapsed.value = !!(props.collapsible && props.collapsed);
    });
    const { page } = useData();
    watchEffect(() => {
      if (props.items.some((item) => {
        return isActive(page.value.relativePath, item.link);
      })) {
        collapsed.value = false;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: ["VPSidebarGroup", { collapsible: __props.collapsible, collapsed: collapsed.value }]
      }, _attrs))} data-v-6e45c352>`);
      if (__props.text) {
        _push(`<div class="title"${ssrRenderAttr("role", __props.collapsible ? "button" : void 0)} data-v-6e45c352><h2 class="title-text" data-v-6e45c352>${__props.text}</h2><div class="action" data-v-6e45c352>`);
        _push(ssrRenderComponent(VPIconMinusSquare, { class: "icon minus" }, null, _parent));
        _push(ssrRenderComponent(VPIconPlusSquare, { class: "icon plus" }, null, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="items" data-v-6e45c352><!--[-->`);
      ssrRenderList(__props.items, (item) => {
        _push(ssrRenderComponent(VPSidebarLink, { item }, null, _parent));
      });
      _push(`<!--]--></div></section>`);
    };
  }
});
const VPSidebarGroup_vue_vue_type_style_index_0_scoped_6e45c352_lang = "";
const _sfc_setup$z = _sfc_main$z.setup;
_sfc_main$z.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPSidebarGroup.vue");
  return _sfc_setup$z ? _sfc_setup$z(props, ctx) : void 0;
};
const VPSidebarGroup = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["__scopeId", "data-v-6e45c352"]]);
const _sfc_main$y = /* @__PURE__ */ defineComponent({
  __name: "VPSidebar",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const { sidebar, hasSidebar } = useSidebar();
    let navEl = ref(null);
    function lockBodyScroll() {
      disableBodyScroll(navEl.value, { reserveScrollBarGap: true });
    }
    function unlockBodyScroll() {
      clearAllBodyScrollLocks();
    }
    watchPostEffect(async () => {
      var _a;
      if (props.open) {
        lockBodyScroll();
        (_a = navEl.value) == null ? void 0 : _a.focus();
      } else {
        unlockBodyScroll();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(hasSidebar)) {
        _push(`<aside${ssrRenderAttrs(mergeProps({
          class: ["VPSidebar", { open: __props.open }],
          ref_key: "navEl",
          ref: navEl
        }, _attrs))} data-v-0f9e7c6e><nav class="nav" id="VPSidebarNav" aria-labelledby="sidebar-aria-label" tabindex="-1" data-v-0f9e7c6e><span class="visually-hidden" id="sidebar-aria-label" data-v-0f9e7c6e> Sidebar Navigation </span><!--[-->`);
        ssrRenderList(unref(sidebar), (group) => {
          _push(`<div class="group" data-v-0f9e7c6e>`);
          _push(ssrRenderComponent(VPSidebarGroup, {
            text: group.text,
            items: group.items,
            collapsible: group.collapsible,
            collapsed: group.collapsed
          }, null, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--></nav></aside>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const VPSidebar_vue_vue_type_style_index_0_scoped_0f9e7c6e_lang = "";
const _sfc_setup$y = _sfc_main$y.setup;
_sfc_main$y.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPSidebar.vue");
  return _sfc_setup$y ? _sfc_setup$y(props, ctx) : void 0;
};
const VPSidebar = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["__scopeId", "data-v-0f9e7c6e"]]);
const _sfc_main$x = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  const _component_Content = resolveComponent("Content");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPPage" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_Content, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup$x = _sfc_main$x.setup;
_sfc_main$x.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPPage.vue");
  return _sfc_setup$x ? _sfc_setup$x(props, ctx) : void 0;
};
const VPPage = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["ssrRender", _sfc_ssrRender$2]]);
const _sfc_main$w = /* @__PURE__ */ defineComponent({
  __name: "VPButton",
  __ssrInlineRender: true,
  props: {
    tag: null,
    size: null,
    theme: null,
    text: null,
    href: null
  },
  setup(__props) {
    const props = __props;
    const classes = computed(() => {
      var _a, _b;
      return [
        (_a = props.size) != null ? _a : "medium",
        (_b = props.theme) != null ? _b : "brand"
      ];
    });
    const isExternal2 = computed(() => props.href && EXTERNAL_URL_RE.test(props.href));
    const component = computed(() => {
      if (props.tag) {
        return props.tag;
      }
      return props.href ? "a" : "button";
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(component)), mergeProps({
        class: ["VPButton", unref(classes)],
        href: __props.href ? unref(normalizeLink)(__props.href) : void 0,
        target: unref(isExternal2) ? "_blank" : void 0,
        rel: unref(isExternal2) ? "noreferrer" : void 0
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.text)}`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.text), 1)
            ];
          }
        }),
        _: 1
      }), _parent);
    };
  }
});
const VPButton_vue_vue_type_style_index_0_scoped_53dbb8eb_lang = "";
const _sfc_setup$w = _sfc_main$w.setup;
_sfc_main$w.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPButton.vue");
  return _sfc_setup$w ? _sfc_setup$w(props, ctx) : void 0;
};
const VPButton = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["__scopeId", "data-v-53dbb8eb"]]);
const _sfc_main$v = /* @__PURE__ */ defineComponent({
  __name: "VPHero",
  __ssrInlineRender: true,
  props: {
    name: null,
    text: null,
    tagline: null,
    image: null,
    actions: null
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["VPHero", { "has-image": __props.image }]
      }, _attrs))} data-v-0a0d4301><div class="container" data-v-0a0d4301><div class="main" data-v-0a0d4301>`);
      if (__props.name) {
        _push(`<h1 class="name" data-v-0a0d4301><span class="clip" data-v-0a0d4301>${ssrInterpolate(__props.name)}</span></h1>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.text) {
        _push(`<p class="text" data-v-0a0d4301>${ssrInterpolate(__props.text)}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.tagline) {
        _push(`<p class="tagline" data-v-0a0d4301>${ssrInterpolate(__props.tagline)}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.actions) {
        _push(`<div class="actions" data-v-0a0d4301><!--[-->`);
        ssrRenderList(__props.actions, (action) => {
          _push(`<div class="action" data-v-0a0d4301>`);
          _push(ssrRenderComponent(VPButton, {
            tag: "a",
            size: "medium",
            theme: action.theme,
            text: action.text,
            href: action.link
          }, null, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (__props.image) {
        _push(`<div class="image" data-v-0a0d4301><div class="image-container" data-v-0a0d4301><div class="image-bg" data-v-0a0d4301></div>`);
        _push(ssrRenderComponent(VPImage, {
          class: "image-src",
          image: __props.image
        }, null, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const VPHero_vue_vue_type_style_index_0_scoped_0a0d4301_lang = "";
const _sfc_setup$v = _sfc_main$v.setup;
_sfc_main$v.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPHero.vue");
  return _sfc_setup$v ? _sfc_setup$v(props, ctx) : void 0;
};
const VPHero = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["__scopeId", "data-v-0a0d4301"]]);
const _sfc_main$u = /* @__PURE__ */ defineComponent({
  __name: "VPHomeHero",
  __ssrInlineRender: true,
  setup(__props) {
    const { frontmatter: fm } = useData();
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(fm).hero) {
        _push(ssrRenderComponent(VPHero, mergeProps({
          class: "VPHomeHero",
          name: unref(fm).hero.name,
          text: unref(fm).hero.text,
          tagline: unref(fm).hero.tagline,
          image: unref(fm).hero.image,
          actions: unref(fm).hero.actions
        }, _attrs), null, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$u = _sfc_main$u.setup;
_sfc_main$u.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPHomeHero.vue");
  return _sfc_setup$u ? _sfc_setup$u(props, ctx) : void 0;
};
const _sfc_main$t = /* @__PURE__ */ defineComponent({
  __name: "VPFeature",
  __ssrInlineRender: true,
  props: {
    icon: null,
    title: null,
    details: null
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<article${ssrRenderAttrs(mergeProps({ class: "VPFeature" }, _attrs))} data-v-d99b2f77>`);
      if (__props.icon) {
        _push(`<div class="icon" data-v-d99b2f77>${ssrInterpolate(__props.icon)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<h2 class="title" data-v-d99b2f77>${ssrInterpolate(__props.title)}</h2><p class="details" data-v-d99b2f77>${ssrInterpolate(__props.details)}</p></article>`);
    };
  }
});
const VPFeature_vue_vue_type_style_index_0_scoped_d99b2f77_lang = "";
const _sfc_setup$t = _sfc_main$t.setup;
_sfc_main$t.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPFeature.vue");
  return _sfc_setup$t ? _sfc_setup$t(props, ctx) : void 0;
};
const VPFeature = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["__scopeId", "data-v-d99b2f77"]]);
const _sfc_main$s = /* @__PURE__ */ defineComponent({
  __name: "VPFeatures",
  __ssrInlineRender: true,
  props: {
    features: null
  },
  setup(__props) {
    const props = __props;
    const grid = computed(() => {
      const length = props.features.length;
      if (!length) {
        return;
      } else if (length === 2) {
        return "grid-2";
      } else if (length === 3) {
        return "grid-3";
      } else if (length % 3 === 0) {
        return "grid-6";
      } else if (length % 2 === 0) {
        return "grid-4";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.features) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPFeatures" }, _attrs))} data-v-6a6451ec><div class="container" data-v-6a6451ec><div class="items" data-v-6a6451ec><!--[-->`);
        ssrRenderList(__props.features, (feature) => {
          _push(`<div class="${ssrRenderClass([[unref(grid)], "item"])}" data-v-6a6451ec>`);
          _push(ssrRenderComponent(VPFeature, {
            icon: feature.icon,
            title: feature.title,
            details: feature.details
          }, null, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const VPFeatures_vue_vue_type_style_index_0_scoped_6a6451ec_lang = "";
const _sfc_setup$s = _sfc_main$s.setup;
_sfc_main$s.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPFeatures.vue");
  return _sfc_setup$s ? _sfc_setup$s(props, ctx) : void 0;
};
const VPFeatures = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["__scopeId", "data-v-6a6451ec"]]);
const _sfc_main$r = /* @__PURE__ */ defineComponent({
  __name: "VPHomeFeatures",
  __ssrInlineRender: true,
  setup(__props) {
    const { frontmatter: fm } = useData();
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(fm).features) {
        _push(ssrRenderComponent(VPFeatures, mergeProps({
          class: "VPHomeFeatures",
          features: unref(fm).features
        }, _attrs), null, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$r = _sfc_main$r.setup;
_sfc_main$r.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPHomeFeatures.vue");
  return _sfc_setup$r ? _sfc_setup$r(props, ctx) : void 0;
};
const _sfc_main$q = /* @__PURE__ */ defineComponent({
  __name: "VPHome",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Content = resolveComponent("Content");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPHome" }, _attrs))} data-v-1db23833>`);
      ssrRenderSlot(_ctx.$slots, "home-hero-before", {}, null, _push, _parent);
      _push(ssrRenderComponent(_sfc_main$u, null, null, _parent));
      ssrRenderSlot(_ctx.$slots, "home-hero-after", {}, null, _push, _parent);
      ssrRenderSlot(_ctx.$slots, "home-features-before", {}, null, _push, _parent);
      _push(ssrRenderComponent(_sfc_main$r, null, null, _parent));
      ssrRenderSlot(_ctx.$slots, "home-features-after", {}, null, _push, _parent);
      _push(ssrRenderComponent(_component_Content, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const VPHome_vue_vue_type_style_index_0_scoped_1db23833_lang = "";
const _sfc_setup$q = _sfc_main$q.setup;
_sfc_main$q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPHome.vue");
  return _sfc_setup$q ? _sfc_setup$q(props, ctx) : void 0;
};
const VPHome = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["__scopeId", "data-v-1db23833"]]);
function useAside() {
  const { hasSidebar } = useSidebar();
  const is960 = useMediaQuery("(min-width: 960px)");
  const is1280 = useMediaQuery("(min-width: 1280px)");
  const isAsideEnabled = computed(() => {
    if (!is1280.value && !is960.value) {
      return false;
    }
    return hasSidebar.value ? is1280.value : is960.value;
  });
  return {
    isAsideEnabled
  };
}
const PAGE_OFFSET = 71;
function getHeaders(pageOutline) {
  if (pageOutline === false)
    return [];
  let updatedHeaders = [];
  document.querySelectorAll("h2, h3, h4, h5, h6").forEach((el) => {
    if (el.textContent && el.id) {
      updatedHeaders.push({
        level: Number(el.tagName[1]),
        title: el.innerText.replace(/\s+#\s*$/, ""),
        link: `#${el.id}`
      });
    }
  });
  return resolveHeaders(updatedHeaders, pageOutline);
}
function resolveHeaders(headers, levelsRange = 2) {
  const levels = typeof levelsRange === "number" ? [levelsRange, levelsRange] : levelsRange === "deep" ? [2, 6] : levelsRange;
  return groupHeaders(headers, levels);
}
function groupHeaders(headers, levelsRange) {
  const result = [];
  headers = headers.map((h2) => ({ ...h2 }));
  headers.forEach((h2, index) => {
    if (h2.level >= levelsRange[0] && h2.level <= levelsRange[1]) {
      if (addToParent(index, headers, levelsRange)) {
        result.push(h2);
      }
    }
  });
  return result;
}
function addToParent(currIndex, headers, levelsRange) {
  if (currIndex === 0) {
    return true;
  }
  const currentHeader = headers[currIndex];
  for (let index = currIndex - 1; index >= 0; index--) {
    const header = headers[index];
    if (header.level < currentHeader.level && header.level >= levelsRange[0] && header.level <= levelsRange[1]) {
      if (header.children == null)
        header.children = [];
      header.children.push(currentHeader);
      return false;
    }
  }
  return true;
}
function useActiveAnchor(container, marker) {
  const { isAsideEnabled } = useAside();
  const onScroll = throttleAndDebounce(setActiveLink, 100);
  let prevActiveLink = null;
  onMounted(() => {
    requestAnimationFrame(setActiveLink);
    window.addEventListener("scroll", onScroll);
  });
  onUpdated(() => {
    activateLink(location.hash);
  });
  onUnmounted(() => {
    window.removeEventListener("scroll", onScroll);
  });
  function setActiveLink() {
    if (!isAsideEnabled.value) {
      return;
    }
    const links = [].slice.call(container.value.querySelectorAll(".outline-link"));
    const anchors = [].slice.call(document.querySelectorAll(".content .header-anchor")).filter((anchor) => {
      return links.some((link2) => {
        return link2.hash === anchor.hash && anchor.offsetParent !== null;
      });
    });
    const scrollY = window.scrollY;
    const innerHeight = window.innerHeight;
    const offsetHeight = document.body.offsetHeight;
    const isBottom = Math.abs(scrollY + innerHeight - offsetHeight) < 1;
    if (anchors.length && isBottom) {
      activateLink(anchors[anchors.length - 1].hash);
      return;
    }
    for (let i = 0; i < anchors.length; i++) {
      const anchor = anchors[i];
      const nextAnchor = anchors[i + 1];
      const [isActive2, hash] = isAnchorActive(i, anchor, nextAnchor);
      if (isActive2) {
        activateLink(hash);
        return;
      }
    }
  }
  function activateLink(hash) {
    if (prevActiveLink) {
      prevActiveLink.classList.remove("active");
    }
    if (hash !== null) {
      prevActiveLink = container.value.querySelector(`a[href="${decodeURIComponent(hash)}"]`);
    }
    const activeLink = prevActiveLink;
    if (activeLink) {
      activeLink.classList.add("active");
      marker.value.style.top = activeLink.offsetTop + 33 + "px";
      marker.value.style.opacity = "1";
    } else {
      marker.value.style.top = "33px";
      marker.value.style.opacity = "0";
    }
  }
}
function getAnchorTop(anchor) {
  return anchor.parentElement.offsetTop - PAGE_OFFSET;
}
function isAnchorActive(index, anchor, nextAnchor) {
  const scrollTop = window.scrollY;
  if (index === 0 && scrollTop === 0) {
    return [true, null];
  }
  if (scrollTop < getAnchorTop(anchor)) {
    return [false, null];
  }
  if (!nextAnchor || scrollTop < getAnchorTop(nextAnchor)) {
    return [true, anchor.hash];
  }
  return [false, null];
}
const _sfc_main$p = /* @__PURE__ */ defineComponent({
  __name: "VPDocAsideOutlineItem",
  __ssrInlineRender: true,
  props: {
    headers: null,
    onClick: null,
    root: { type: Boolean }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_VPDocAsideOutlineItem = resolveComponent("VPDocAsideOutlineItem", true);
      _push(`<ul${ssrRenderAttrs(mergeProps({
        class: __props.root ? "root" : "nested"
      }, _attrs))} data-v-1188541a><!--[-->`);
      ssrRenderList(__props.headers, ({ children, link: link2, title }) => {
        _push(`<li data-v-1188541a><a class="outline-link"${ssrRenderAttr("href", link2)} data-v-1188541a>${ssrInterpolate(title)}</a>`);
        if (children == null ? void 0 : children.length) {
          _push(ssrRenderComponent(_component_VPDocAsideOutlineItem, {
            headers: children,
            onClick: __props.onClick
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ul>`);
    };
  }
});
const VPDocAsideOutlineItem_vue_vue_type_style_index_0_scoped_1188541a_lang = "";
const _sfc_setup$p = _sfc_main$p.setup;
_sfc_main$p.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPDocAsideOutlineItem.vue");
  return _sfc_setup$p ? _sfc_setup$p(props, ctx) : void 0;
};
const VPDocAsideOutlineItem = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["__scopeId", "data-v-1188541a"]]);
const _sfc_main$o = /* @__PURE__ */ defineComponent({
  __name: "VPDocAsideOutline",
  __ssrInlineRender: true,
  setup(__props) {
    const { frontmatter, theme: theme2 } = useData();
    const pageOutline = computed(
      () => {
        var _a;
        return (_a = frontmatter.value.outline) != null ? _a : theme2.value.outline;
      }
    );
    const onContentUpdated = inject("onContentUpdated");
    onContentUpdated.value = () => {
      headers.value = getHeaders(pageOutline.value);
    };
    const headers = ref([]);
    const hasOutline = computed(() => headers.value.length > 0);
    const container = ref();
    const marker = ref();
    useActiveAnchor(container, marker);
    function handleClick({ target: el }) {
      const id = "#" + el.href.split("#")[1];
      const heading = document.querySelector(
        decodeURIComponent(id)
      );
      heading == null ? void 0 : heading.focus();
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["VPDocAsideOutline", { "has-outline": unref(hasOutline) }],
        ref_key: "container",
        ref: container
      }, _attrs))} data-v-2865c0b0><div class="content" data-v-2865c0b0><div class="outline-marker" data-v-2865c0b0></div><div class="outline-title" data-v-2865c0b0>${ssrInterpolate(unref(theme2).outlineTitle || "On this page")}</div><nav aria-labelledby="doc-outline-aria-label" data-v-2865c0b0><span class="visually-hidden" id="doc-outline-aria-label" data-v-2865c0b0> Table of Contents for current page </span>`);
      _push(ssrRenderComponent(VPDocAsideOutlineItem, {
        headers: headers.value,
        root: true,
        onClick: handleClick
      }, null, _parent));
      _push(`</nav></div></div>`);
    };
  }
});
const VPDocAsideOutline_vue_vue_type_style_index_0_scoped_2865c0b0_lang = "";
const _sfc_setup$o = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPDocAsideOutline.vue");
  return _sfc_setup$o ? _sfc_setup$o(props, ctx) : void 0;
};
const VPDocAsideOutline = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__scopeId", "data-v-2865c0b0"]]);
const _sfc_main$n = /* @__PURE__ */ defineComponent({
  __name: "VPDocAsideCarbonAds",
  __ssrInlineRender: true,
  setup(__props) {
    const VPCarbonAds = () => null;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPDocAsideCarbonAds" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(VPCarbonAds), null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPDocAsideCarbonAds.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  __name: "VPDocAside",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme: theme2 } = useData();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPDocAside" }, _attrs))} data-v-afc4c1a1>`);
      ssrRenderSlot(_ctx.$slots, "aside-top", {}, null, _push, _parent);
      ssrRenderSlot(_ctx.$slots, "aside-outline-before", {}, null, _push, _parent);
      _push(ssrRenderComponent(VPDocAsideOutline, null, null, _parent));
      ssrRenderSlot(_ctx.$slots, "aside-outline-after", {}, null, _push, _parent);
      _push(`<div class="spacer" data-v-afc4c1a1></div>`);
      ssrRenderSlot(_ctx.$slots, "aside-ads-before", {}, null, _push, _parent);
      if (unref(theme2).carbonAds) {
        _push(ssrRenderComponent(_sfc_main$n, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "aside-ads-after", {}, null, _push, _parent);
      ssrRenderSlot(_ctx.$slots, "aside-bottom", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const VPDocAside_vue_vue_type_style_index_0_scoped_afc4c1a1_lang = "";
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPDocAside.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const VPDocAside = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__scopeId", "data-v-afc4c1a1"]]);
function useEditLink() {
  const { theme: theme2, page } = useData();
  return computed(() => {
    const { text = "Edit this page", pattern } = theme2.value.editLink || {};
    const { relativePath } = page.value;
    const url = pattern.replace(/:path/g, relativePath);
    return { url, text };
  });
}
function usePrevNext() {
  const { page, theme: theme2, frontmatter } = useData();
  return computed(() => {
    const sidebar = getSidebar(theme2.value.sidebar, page.value.relativePath);
    const candidates = getFlatSideBarLinks(sidebar);
    const index = candidates.findIndex((link2) => {
      return isActive(page.value.relativePath, link2.link);
    });
    return {
      prev: frontmatter.value.prev ? { ...candidates[index - 1], text: frontmatter.value.prev } : candidates[index - 1],
      next: frontmatter.value.next ? { ...candidates[index + 1], text: frontmatter.value.next } : candidates[index + 1]
    };
  });
}
const _sfc_main$l = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24"
  }, _attrs))}><path d="M18,23H4c-1.7,0-3-1.3-3-3V6c0-1.7,1.3-3,3-3h7c0.6,0,1,0.4,1,1s-0.4,1-1,1H4C3.4,5,3,5.4,3,6v14c0,0.6,0.4,1,1,1h14c0.6,0,1-0.4,1-1v-7c0-0.6,0.4-1,1-1s1,0.4,1,1v7C21,21.7,19.7,23,18,23z"></path><path d="M8,17c-0.3,0-0.5-0.1-0.7-0.3C7,16.5,6.9,16.1,7,15.8l1-4c0-0.2,0.1-0.3,0.3-0.5l9.5-9.5c1.2-1.2,3.2-1.2,4.4,0c1.2,1.2,1.2,3.2,0,4.4l-9.5,9.5c-0.1,0.1-0.3,0.2-0.5,0.3l-4,1C8.2,17,8.1,17,8,17zM9.9,12.5l-0.5,2.1l2.1-0.5l9.3-9.3c0.4-0.4,0.4-1.1,0-1.6c-0.4-0.4-1.2-0.4-1.6,0l0,0L9.9,12.5z M18.5,2.5L18.5,2.5L18.5,2.5z"></path></svg>`);
}
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/icons/VPIconEdit.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const VPIconEdit = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  __name: "VPDocFooterLastUpdated",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme: theme2, page } = useData();
    const date = computed(() => new Date(page.value.lastUpdated));
    const isoDatetime = computed(() => date.value.toISOString());
    const datetime = ref("");
    onMounted(() => {
      watchEffect(() => {
        datetime.value = date.value.toLocaleString(window.navigator.language);
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<p${ssrRenderAttrs(mergeProps({ class: "VPLastUpdated" }, _attrs))} data-v-f7d51a9c>${ssrInterpolate((_a = unref(theme2).lastUpdatedText) != null ? _a : "Last updated")}: <time${ssrRenderAttr("datatime", unref(isoDatetime))} data-v-f7d51a9c>${ssrInterpolate(datetime.value)}</time></p>`);
    };
  }
});
const VPDocFooterLastUpdated_vue_vue_type_style_index_0_scoped_f7d51a9c_lang = "";
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPDocFooterLastUpdated.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const VPDocFooterLastUpdated = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__scopeId", "data-v-f7d51a9c"]]);
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "VPDocFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme: theme2, page, frontmatter } = useData();
    const editLink = useEditLink();
    const control = usePrevNext();
    const hasEditLink = computed(() => {
      return theme2.value.editLink && frontmatter.value.editLink !== false;
    });
    const hasLastUpdated = computed(() => {
      return page.value.lastUpdated && frontmatter.value.lastUpdated !== false;
    });
    const showFooter = computed(() => {
      return hasEditLink.value || hasLastUpdated.value || control.value.prev || control.value.next;
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d;
      if (unref(showFooter)) {
        _push(`<footer${ssrRenderAttrs(mergeProps({ class: "VPDocFooter" }, _attrs))} data-v-a54a85bd>`);
        if (unref(hasEditLink) || unref(hasLastUpdated)) {
          _push(`<div class="edit-info" data-v-a54a85bd>`);
          if (unref(hasEditLink)) {
            _push(`<div class="edit-link" data-v-a54a85bd>`);
            _push(ssrRenderComponent(VPLink, {
              class: "edit-link-button",
              href: unref(editLink).url,
              "no-icon": true
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(VPIconEdit, { class: "edit-link-icon" }, null, _parent2, _scopeId));
                  _push2(` ${ssrInterpolate(unref(editLink).text)}`);
                } else {
                  return [
                    createVNode(VPIconEdit, { class: "edit-link-icon" }),
                    createTextVNode(" " + toDisplayString(unref(editLink).text), 1)
                  ];
                }
              }),
              _: 1
            }, _parent));
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(hasLastUpdated)) {
            _push(`<div class="last-updated" data-v-a54a85bd>`);
            _push(ssrRenderComponent(VPDocFooterLastUpdated, null, null, _parent));
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(control).prev || unref(control).next) {
          _push(`<div class="prev-next" data-v-a54a85bd><div class="pager" data-v-a54a85bd>`);
          if (unref(control).prev) {
            _push(`<a class="pager-link prev"${ssrRenderAttr("href", unref(normalizeLink)(unref(control).prev.link))} data-v-a54a85bd><span class="desc" data-v-a54a85bd>${ssrInterpolate((_b = (_a = unref(theme2).docFooter) == null ? void 0 : _a.prev) != null ? _b : "Previous page")}</span><span class="title" data-v-a54a85bd>${ssrInterpolate(unref(control).prev.text)}</span></a>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="${ssrRenderClass([{ "has-prev": unref(control).prev }, "pager"])}" data-v-a54a85bd>`);
          if (unref(control).next) {
            _push(`<a class="pager-link next"${ssrRenderAttr("href", unref(normalizeLink)(unref(control).next.link))} data-v-a54a85bd><span class="desc" data-v-a54a85bd>${ssrInterpolate((_d = (_c = unref(theme2).docFooter) == null ? void 0 : _c.next) != null ? _d : "Next page")}</span><span class="title" data-v-a54a85bd>${ssrInterpolate(unref(control).next.text)}</span></a>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</footer>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const VPDocFooter_vue_vue_type_style_index_0_scoped_a54a85bd_lang = "";
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPDocFooter.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const VPDocFooter = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__scopeId", "data-v-a54a85bd"]]);
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "VPDoc",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const { hasSidebar, hasAside } = useSidebar();
    const pageName = computed(
      () => route.path.replace(/[./]+/g, "_").replace(/_html$/, "")
    );
    const onContentUpdated = ref();
    provide("onContentUpdated", onContentUpdated);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Content = resolveComponent("Content");
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["VPDoc", { "has-sidebar": unref(hasSidebar), "has-aside": unref(hasAside) }]
      }, _attrs))} data-v-cfb513e0><div class="container" data-v-cfb513e0>`);
      if (unref(hasAside)) {
        _push(`<div class="aside" data-v-cfb513e0><div class="aside-curtain" data-v-cfb513e0></div><div class="aside-container" data-v-cfb513e0><div class="aside-content" data-v-cfb513e0>`);
        _push(ssrRenderComponent(VPDocAside, null, {
          "aside-top": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-top", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-top", {}, void 0, true)
              ];
            }
          }),
          "aside-bottom": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-bottom", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-bottom", {}, void 0, true)
              ];
            }
          }),
          "aside-outline-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-outline-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-outline-before", {}, void 0, true)
              ];
            }
          }),
          "aside-outline-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-outline-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-outline-after", {}, void 0, true)
              ];
            }
          }),
          "aside-ads-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-ads-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-ads-before", {}, void 0, true)
              ];
            }
          }),
          "aside-ads-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-ads-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-ads-after", {}, void 0, true)
              ];
            }
          }),
          _: 3
        }, _parent));
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="content" data-v-cfb513e0><div class="content-container" data-v-cfb513e0>`);
      ssrRenderSlot(_ctx.$slots, "doc-before", {}, null, _push, _parent);
      _push(`<main class="main" data-v-cfb513e0>`);
      _push(ssrRenderComponent(_component_Content, {
        class: ["vp-doc", unref(pageName)],
        onContentUpdated: onContentUpdated.value
      }, null, _parent));
      _push(`</main>`);
      ssrRenderSlot(_ctx.$slots, "doc-footer-before", {}, null, _push, _parent);
      _push(ssrRenderComponent(VPDocFooter, null, null, _parent));
      ssrRenderSlot(_ctx.$slots, "doc-after", {}, null, _push, _parent);
      _push(`</div></div></div></div>`);
    };
  }
});
const VPDoc_vue_vue_type_style_index_0_scoped_cfb513e0_lang = "";
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPDoc.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const VPDoc = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__scopeId", "data-v-cfb513e0"]]);
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "VPContent",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const { frontmatter } = useData();
    const { hasSidebar } = useSidebar();
    const NotFound2 = inject("NotFound");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["VPContent", {
          "has-sidebar": unref(hasSidebar),
          "is-home": unref(frontmatter).layout === "home"
        }],
        id: "VPContent"
      }, _attrs))} data-v-d981fe29>`);
      if (unref(route).component === unref(NotFound2)) {
        _push(ssrRenderComponent(unref(NotFound2), null, null, _parent));
      } else if (unref(frontmatter).layout === "page") {
        _push(ssrRenderComponent(VPPage, null, null, _parent));
      } else if (unref(frontmatter).layout === "home") {
        _push(ssrRenderComponent(VPHome, null, {
          "home-hero-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-before", {}, void 0, true)
              ];
            }
          }),
          "home-hero-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-after", {}, void 0, true)
              ];
            }
          }),
          "home-features-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-features-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-features-before", {}, void 0, true)
              ];
            }
          }),
          "home-features-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-features-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-features-after", {}, void 0, true)
              ];
            }
          }),
          _: 3
        }, _parent));
      } else {
        _push(ssrRenderComponent(VPDoc, null, {
          "doc-footer-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "doc-footer-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "doc-footer-before", {}, void 0, true)
              ];
            }
          }),
          "doc-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "doc-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "doc-before", {}, void 0, true)
              ];
            }
          }),
          "doc-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "doc-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "doc-after", {}, void 0, true)
              ];
            }
          }),
          "aside-top": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-top", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-top", {}, void 0, true)
              ];
            }
          }),
          "aside-outline-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-outline-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-outline-before", {}, void 0, true)
              ];
            }
          }),
          "aside-outline-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-outline-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-outline-after", {}, void 0, true)
              ];
            }
          }),
          "aside-ads-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-ads-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-ads-before", {}, void 0, true)
              ];
            }
          }),
          "aside-ads-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-ads-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-ads-after", {}, void 0, true)
              ];
            }
          }),
          "aside-bottom": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-bottom", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-bottom", {}, void 0, true)
              ];
            }
          }),
          _: 3
        }, _parent));
      }
      _push(`</div>`);
    };
  }
});
const VPContent_vue_vue_type_style_index_0_scoped_d981fe29_lang = "";
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPContent.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const VPContent = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__scopeId", "data-v-d981fe29"]]);
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "VPFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme: theme2 } = useData();
    const { hasSidebar } = useSidebar();
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(theme2).footer) {
        _push(`<footer${ssrRenderAttrs(mergeProps({
          class: ["VPFooter", { "has-sidebar": unref(hasSidebar) }]
        }, _attrs))} data-v-9f24cc86><div class="container" data-v-9f24cc86>`);
        if (unref(theme2).footer.message) {
          _push(`<p class="message" data-v-9f24cc86>${unref(theme2).footer.message}</p>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(theme2).footer.copyright) {
          _push(`<p class="copyright" data-v-9f24cc86>${unref(theme2).footer.copyright}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></footer>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const VPFooter_vue_vue_type_style_index_0_scoped_9f24cc86_lang = "";
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPFooter.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const VPFooter = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__scopeId", "data-v-9f24cc86"]]);
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "Layout",
  __ssrInlineRender: true,
  setup(__props) {
    const {
      isOpen: isSidebarOpen,
      open: openSidebar,
      close: closeSidebar
    } = useSidebar();
    const route = useRoute();
    watch(() => route.path, closeSidebar);
    useCloseSidebarOnEscape(isSidebarOpen, closeSidebar);
    provide("close-sidebar", closeSidebar);
    const { frontmatter } = useData();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Content = resolveComponent("Content");
      if (unref(frontmatter).layout !== false) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "Layout" }, _attrs))} data-v-c6a644e1>`);
        ssrRenderSlot(_ctx.$slots, "layout-top", {}, null, _push, _parent);
        _push(ssrRenderComponent(VPSkipLink, null, null, _parent));
        _push(ssrRenderComponent(VPBackdrop, {
          class: "backdrop",
          show: unref(isSidebarOpen),
          onClick: unref(closeSidebar)
        }, null, _parent));
        _push(ssrRenderComponent(VPNav, null, {
          "nav-bar-title-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "nav-bar-title-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "nav-bar-title-before", {}, void 0, true)
              ];
            }
          }),
          "nav-bar-title-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "nav-bar-title-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "nav-bar-title-after", {}, void 0, true)
              ];
            }
          }),
          "nav-bar-content-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "nav-bar-content-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "nav-bar-content-before", {}, void 0, true)
              ];
            }
          }),
          "nav-bar-content-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "nav-bar-content-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "nav-bar-content-after", {}, void 0, true)
              ];
            }
          }),
          "nav-screen-content-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "nav-screen-content-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "nav-screen-content-before", {}, void 0, true)
              ];
            }
          }),
          "nav-screen-content-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "nav-screen-content-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "nav-screen-content-after", {}, void 0, true)
              ];
            }
          }),
          _: 3
        }, _parent));
        _push(ssrRenderComponent(VPLocalNav, {
          open: unref(isSidebarOpen),
          onOpenMenu: unref(openSidebar)
        }, null, _parent));
        _push(ssrRenderComponent(VPSidebar, { open: unref(isSidebarOpen) }, null, _parent));
        _push(ssrRenderComponent(VPContent, null, {
          "home-hero-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-before", {}, void 0, true)
              ];
            }
          }),
          "home-hero-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-after", {}, void 0, true)
              ];
            }
          }),
          "home-features-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-features-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-features-before", {}, void 0, true)
              ];
            }
          }),
          "home-features-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-features-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-features-after", {}, void 0, true)
              ];
            }
          }),
          "doc-footer-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "doc-footer-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "doc-footer-before", {}, void 0, true)
              ];
            }
          }),
          "doc-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "doc-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "doc-before", {}, void 0, true)
              ];
            }
          }),
          "doc-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "doc-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "doc-after", {}, void 0, true)
              ];
            }
          }),
          "aside-top": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-top", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-top", {}, void 0, true)
              ];
            }
          }),
          "aside-bottom": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-bottom", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-bottom", {}, void 0, true)
              ];
            }
          }),
          "aside-outline-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-outline-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-outline-before", {}, void 0, true)
              ];
            }
          }),
          "aside-outline-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-outline-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-outline-after", {}, void 0, true)
              ];
            }
          }),
          "aside-ads-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-ads-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-ads-before", {}, void 0, true)
              ];
            }
          }),
          "aside-ads-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-ads-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-ads-after", {}, void 0, true)
              ];
            }
          }),
          _: 3
        }, _parent));
        _push(ssrRenderComponent(VPFooter, null, null, _parent));
        ssrRenderSlot(_ctx.$slots, "layout-bottom", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(ssrRenderComponent(_component_Content, _attrs, null, _parent));
      }
    };
  }
});
const Layout_vue_vue_type_style_index_0_scoped_c6a644e1_lang = "";
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/Layout.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const Layout = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-c6a644e1"]]);
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "NotFound",
  __ssrInlineRender: true,
  setup(__props) {
    const { site } = useData();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "NotFound" }, _attrs))} data-v-95656537><p class="code" data-v-95656537>404</p><h1 class="title" data-v-95656537>PAGE NOT FOUND</h1><div class="divider" data-v-95656537></div><blockquote class="quote" data-v-95656537> But if you don&#39;t change your direction, and if you keep looking, you may end up where you are heading. </blockquote><div class="action" data-v-95656537><a class="link"${ssrRenderAttr("href", unref(site).base)} aria-label="go to home" data-v-95656537> Take me home </a></div></div>`);
    };
  }
});
const NotFound_vue_vue_type_style_index_0_scoped_95656537_lang = "";
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/NotFound.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const NotFound$1 = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-95656537"]]);
const _sfc_main$d = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24"
  }, _attrs))}><path d="M12,22.2c-0.3,0-0.5-0.1-0.7-0.3l-8.8-8.8c-2.5-2.5-2.5-6.7,0-9.2c2.5-2.5,6.7-2.5,9.2,0L12,4.3l0.4-0.4c0,0,0,0,0,0C13.6,2.7,15.2,2,16.9,2c0,0,0,0,0,0c1.7,0,3.4,0.7,4.6,1.9l0,0c1.2,1.2,1.9,2.9,1.9,4.6c0,1.7-0.7,3.4-1.9,4.6l-8.8,8.8C12.5,22.1,12.3,22.2,12,22.2zM7,4C5.9,4,4.7,4.4,3.9,5.3c-1.8,1.8-1.8,4.6,0,6.4l8.1,8.1l8.1-8.1c0.9-0.9,1.3-2,1.3-3.2c0-1.2-0.5-2.3-1.3-3.2l0,0C19.3,4.5,18.2,4,17,4c0,0,0,0,0,0c-1.2,0-2.3,0.5-3.2,1.3c0,0,0,0,0,0l-1.1,1.1c-0.4,0.4-1,0.4-1.4,0l-1.1-1.1C9.4,4.4,8.2,4,7,4z"></path></svg>`);
}
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/icons/VPIconHeart.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const VPIconHeart = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["ssrRender", _sfc_ssrRender]]);
const GridSettings = {
  xmini: [[0, 2]],
  mini: [],
  small: [
    [920, 6],
    [768, 5],
    [640, 4],
    [480, 3],
    [0, 2]
  ],
  medium: [
    [960, 5],
    [832, 4],
    [640, 3],
    [480, 2]
  ],
  big: [
    [832, 3],
    [640, 2]
  ]
};
function useSponsorsGrid({ el, size = "medium" }) {
  const onResize = throttleAndDebounce(manage, 100);
  onMounted(() => {
    manage();
    window.addEventListener("resize", onResize);
  });
  onUnmounted(() => {
    window.removeEventListener("resize", onResize);
  });
  function manage() {
    adjustSlots(el.value, size);
  }
}
function adjustSlots(el, size) {
  const tsize = el.children.length;
  const asize = el.querySelectorAll(".vp-sponsor-grid-item:not(.empty)").length;
  const grid = setGrid(el, size, asize);
  manageSlots(el, grid, tsize, asize);
}
function setGrid(el, size, items) {
  const settings = GridSettings[size];
  const screen = window.innerWidth;
  let grid = 1;
  settings.some(([breakpoint, value]) => {
    if (screen >= breakpoint) {
      grid = items < value ? items : value;
      return true;
    }
  });
  setGridData(el, grid);
  return grid;
}
function setGridData(el, value) {
  el.dataset.vpGrid = String(value);
}
function manageSlots(el, grid, tsize, asize) {
  const diff = tsize - asize;
  const rem = asize % grid;
  const drem = rem === 0 ? rem : grid - rem;
  neutralizeSlots(el, drem - diff);
}
function neutralizeSlots(el, count) {
  if (count === 0) {
    return;
  }
  count > 0 ? addSlots(el, count) : removeSlots(el, count * -1);
}
function addSlots(el, count) {
  for (let i = 0; i < count; i++) {
    const slot = document.createElement("div");
    slot.classList.add("vp-sponsor-grid-item", "empty");
    el.append(slot);
  }
}
function removeSlots(el, count) {
  for (let i = 0; i < count; i++) {
    el.removeChild(el.lastElementChild);
  }
}
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "VPSponsorsGrid",
  __ssrInlineRender: true,
  props: {
    size: null,
    data: null
  },
  setup(__props) {
    const props = __props;
    const el = ref(null);
    useSponsorsGrid({ el, size: props.size });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["VPSponsorsGrid vp-sponsor-grid", [(_a = props.size) != null ? _a : "medium"]],
        ref_key: "el",
        ref: el
      }, _attrs))}><!--[-->`);
      ssrRenderList(__props.data, (sponsor) => {
        _push(`<div class="vp-sponsor-grid-item"><a class="vp-sponsor-grid-link"${ssrRenderAttr("href", sponsor.url)} target="_blank" rel="sponsored noopener"><article class="vp-sponsor-grid-box"><h4 class="visually-hidden">${ssrInterpolate(sponsor.name)}</h4><img class="vp-sponsor-grid-image"${ssrRenderAttr("src", sponsor.img)}${ssrRenderAttr("alt", sponsor.name)}></article></a></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPSponsorsGrid.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "VPSponsors",
  __ssrInlineRender: true,
  props: {
    mode: null,
    tier: null,
    size: null,
    data: null
  },
  setup(__props) {
    const props = __props;
    const sponsors = computed(() => {
      const isSponsors = props.data.some((s) => {
        return "items" in s;
      });
      if (isSponsors) {
        return props.data;
      }
      return [
        { tier: props.tier, size: props.size, items: props.data }
      ];
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["VPSponsors vp-sponsor", [(_a = __props.mode) != null ? _a : "normal"]]
      }, _attrs))}><!--[-->`);
      ssrRenderList(unref(sponsors), (sponsor, index) => {
        _push(`<section class="vp-sponsor-section">`);
        if (sponsor.tier) {
          _push(`<h3 class="vp-sponsor-tier">${ssrInterpolate(sponsor.tier)}</h3>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_sfc_main$c, {
          size: sponsor.size,
          data: sponsor.items
        }, null, _parent));
        _push(`</section>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPSponsors.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "VPHomeSponsors",
  __ssrInlineRender: true,
  props: {
    message: null,
    actionText: null,
    actionLink: null,
    data: null
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "VPHomeSponsors" }, _attrs))} data-v-247c88bc><div class="container" data-v-247c88bc><div class="header" data-v-247c88bc><div class="love" data-v-247c88bc>`);
      _push(ssrRenderComponent(VPIconHeart, { class: "icon" }, null, _parent));
      _push(`</div>`);
      if (__props.message) {
        _push(`<h2 class="message" data-v-247c88bc>${ssrInterpolate(__props.message)}</h2>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="sponsors" data-v-247c88bc>`);
      _push(ssrRenderComponent(_sfc_main$b, { data: __props.data }, null, _parent));
      _push(`</div>`);
      if (__props.actionLink) {
        _push(`<div class="action" data-v-247c88bc>`);
        _push(ssrRenderComponent(VPButton, {
          theme: "sponsor",
          text: (_a = __props.actionText) != null ? _a : "Become a sponsor",
          href: __props.actionLink
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></section>`);
    };
  }
});
const VPHomeSponsors_vue_vue_type_style_index_0_scoped_247c88bc_lang = "";
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPHomeSponsors.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "VPDocAsideSponsors",
  __ssrInlineRender: true,
  props: {
    tier: null,
    size: null,
    data: null
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPDocAsideSponsors" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$b, {
        mode: "aside",
        tier: __props.tier,
        size: __props.size,
        data: __props.data
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPDocAsideSponsors.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const VPTeamPage_vue_vue_type_style_index_0_scoped_10b00018_lang = "";
const _sfc_main$8 = {};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPTeamPage.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const VPTeamPageTitle_vue_vue_type_style_index_0_scoped_bf2cbdac_lang = "";
const _sfc_main$7 = {};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPTeamPageTitle.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const VPTeamPageSection_vue_vue_type_style_index_0_scoped_be0f7349_lang = "";
const _sfc_main$6 = {};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPTeamPageSection.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "VPTeamMembersItem",
  __ssrInlineRender: true,
  props: {
    size: null,
    member: null
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<article${ssrRenderAttrs(mergeProps({
        class: ["VPTeamMembersItem", [(_a = __props.size) != null ? _a : "medium"]]
      }, _attrs))} data-v-89ac5bf1><div class="profile" data-v-89ac5bf1><figure class="avatar" data-v-89ac5bf1><img class="avatar-img"${ssrRenderAttr("src", __props.member.avatar)}${ssrRenderAttr("alt", __props.member.name)} data-v-89ac5bf1></figure><div class="data" data-v-89ac5bf1><h1 class="name" data-v-89ac5bf1>${ssrInterpolate(__props.member.name)}</h1>`);
      if (__props.member.title || __props.member.org) {
        _push(`<p class="affiliation" data-v-89ac5bf1>`);
        if (__props.member.title) {
          _push(`<span class="title" data-v-89ac5bf1>${ssrInterpolate(__props.member.title)}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.member.title && __props.member.org) {
          _push(`<span class="at" data-v-89ac5bf1> @ </span>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.member.org) {
          _push(ssrRenderComponent(VPLink, {
            class: ["org", { link: __props.member.orgLink }],
            href: __props.member.orgLink,
            "no-icon": ""
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(__props.member.org)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(__props.member.org), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</p>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.member.desc) {
        _push(`<p class="desc" data-v-89ac5bf1>${ssrInterpolate(__props.member.desc)}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.member.links) {
        _push(`<div class="links" data-v-89ac5bf1>`);
        _push(ssrRenderComponent(VPSocialLinks, {
          links: __props.member.links
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (__props.member.sponsor) {
        _push(`<div class="sp" data-v-89ac5bf1>`);
        _push(ssrRenderComponent(VPLink, {
          class: "sp-link",
          href: __props.member.sponsor,
          "no-icon": ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(VPIconHeart, { class: "sp-icon" }, null, _parent2, _scopeId));
              _push2(` Sponsor `);
            } else {
              return [
                createVNode(VPIconHeart, { class: "sp-icon" }),
                createTextVNode(" Sponsor ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</article>`);
    };
  }
});
const VPTeamMembersItem_vue_vue_type_style_index_0_scoped_89ac5bf1_lang = "";
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPTeamMembersItem.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const VPTeamMembersItem = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-89ac5bf1"]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "VPTeamMembers",
  __ssrInlineRender: true,
  props: {
    size: null,
    members: null
  },
  setup(__props) {
    const props = __props;
    const classes = computed(() => {
      var _a;
      return [
        (_a = props.size) != null ? _a : "medium",
        `count-${props.members.length}`
      ];
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["VPTeamMembers", unref(classes)]
      }, _attrs))} data-v-04685dce><div class="container" data-v-04685dce><!--[-->`);
      ssrRenderList(__props.members, (member) => {
        _push(`<div class="item" data-v-04685dce>`);
        _push(ssrRenderComponent(VPTeamMembersItem, {
          size: __props.size,
          member
        }, null, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const VPTeamMembers_vue_vue_type_style_index_0_scoped_04685dce_lang = "";
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPTeamMembers.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const theme = {
  Layout,
  NotFound: NotFound$1
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Copyright",
  __ssrInlineRender: true,
  setup(__props) {
    var _a, _b, _c, _d, _e;
    const { theme: theme2, frontmatter } = useData();
    const data = reactive({
      author: "Alan",
      authorLink: (_d = (_a = frontmatter.value) == null ? void 0 : _a.authorLink) != null ? _d : (_c = (_b = theme2 == null ? void 0 : theme2.value) == null ? void 0 : _b.articleMetadataConfig) == null ? void 0 : _c.authorLink,
      articleLink: decodeURI((_e = window == null ? void 0 : window.location) == null ? void 0 : _e.href)
    });
    const { author, authorLink, articleLink } = toRefs(data);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "copyright" }, _attrs))} data-v-3396a257><div class="content" data-v-3396a257><div class="item" data-v-3396a257><svg class="icon" width="20" height="20" viewBox="0 0 1024 1024" data-v-3396a257><title data-v-3396a257>\u539F\u521B\u4F5C\u8005</title><path d="M614.72 554.538c-49.086-6.399-100.27-2.1-149.256-2.1-119.465 0-209.04 95.972-206.84 215.437 0 17.095 8.498 31.99 23.493 40.488 14.896 10.697 34.09 14.896 53.285 17.095 61.882 6.398 123.664 6.398 198.342 6.398 40.488 0 93.872-2.1 142.858-4.298 27.692 0 53.284-4.3 78.877-14.896 19.194-8.498 29.89-19.194 31.99-40.488 8.498-104.57-72.478-204.84-172.75-217.636zM680.8 375.39c0-87.474-74.678-162.053-164.251-162.053-89.574 0-162.053 74.679-162.053 162.053-2.1 87.474 74.678 164.252 162.053 164.252 89.673 0 164.252-74.678 164.252-164.252z" fill="#FFF" data-v-3396a257></path><path d="M512.35 0C228.733 0 .5 228.233.5 511.85s228.233 511.85 511.85 511.85 511.85-228.233 511.85-511.85S795.967 0 512.35 0zm275.12 772.074c-2.1 21.294-12.797 31.99-31.991 40.488-25.593 10.697-51.185 14.896-78.877 14.896-49.086 2.099-102.37 4.298-142.858 4.298-74.678 0-136.46 0-198.342-6.398-19.195-2.1-38.389-6.398-53.285-17.095-14.895-8.497-23.493-23.493-23.493-40.488-2.1-119.465 87.475-215.437 206.84-215.437 49.085 0 100.27-4.299 149.256 2.1 100.27 12.896 181.247 113.166 172.75 217.636zM354.495 375.39c0-87.474 72.479-162.053 162.053-162.053S680.8 288.016 680.8 375.39c0 89.574-74.679 164.252-164.252 164.252-87.375 0-164.152-76.778-162.053-164.252z" fill="#249FF8" data-v-3396a257></path></svg><span data-v-3396a257>\u7248\u6743\u5C5E\u4E8E\uFF1A</span><span data-v-3396a257><a${ssrRenderAttr("href", unref(authorLink))} title="\u8FDB\u5165\u4F5C\u8005\u4E3B\u9875" target="_blank" data-v-3396a257>${ssrInterpolate(unref(author))}</a></span></div><div class="item" data-v-3396a257><svg class="icon" width="20" height="20" viewBox="0 0 1024 1024" data-v-3396a257><title data-v-3396a257>\u672C\u6587\u94FE\u63A5</title><path d="M511.854 0A511.854 511.854 0 1 0 1024 511.854 511.854 511.854 0 0 0 511.854 0z" fill="#39B54A" data-v-3396a257></path><path d="M576.491 630.355L460.028 746.818a129.565 129.565 0 0 1-182.555 0l-2.038-2.038a128.983 128.983 0 0 1 0-182.264l81.233-81.233a179.644 179.644 0 0 0 13.102 70.46l-52.7 52.408a69.878 69.878 0 0 0 0 98.703l2.038 2.038a70.169 70.169 0 0 0 98.703 0l116.463-116.463a69.878 69.878 0 0 0 0-98.703l-2.039-2.038a69.587 69.587 0 0 0-13.975-10.772l42.509-42.51a128.11 128.11 0 0 1 13.102 11.356l2.038 2.038a129.274 129.274 0 0 1 0 182.264z" fill="#FFF" data-v-3396a257></path><path d="M746.236 460.902l-81.233 81.233a179.353 179.353 0 0 0-13.102-70.46l52.7-52.409a69.878 69.878 0 0 0 0-98.702l-2.039-2.038a69.878 69.878 0 0 0-98.702 0L487.397 434.989a69.878 69.878 0 0 0 0 98.702l2.038 2.038a68.422 68.422 0 0 0 13.976 10.773l-42.51 42.51a136.553 136.553 0 0 1-13.101-11.356l-2.038-2.038a128.983 128.983 0 0 1 0-182.265l116.463-116.462a129.565 129.565 0 0 1 182.555 0l2.038 2.038a128.983 128.983 0 0 1 0 182.264z" fill="#FFF" data-v-3396a257></path></svg><span data-v-3396a257>\u672C\u6587\u94FE\u63A5\uFF1A</span><span data-v-3396a257><a${ssrRenderAttr("href", unref(articleLink))} target="_blank" data-v-3396a257>${ssrInterpolate(unref(articleLink))}</a></span></div><div class="item" data-v-3396a257> \u4EBA\u751F95%\u4E8B\u60C5\u662F\u51B3\u5B9A\u4E0D\u4E86\u7684\uFF0C\u4F46\u4F9D\u7136\u75285%\u7684\u52AA\u529B\u53BB\u64AC\u52A8\u8FD995%\u65E0\u6CD5\u51B3\u5B9A\u7684\u4E8B\u60C5 </div></div></div>`);
    };
  }
});
const Copyright_vue_vue_type_style_index_0_scoped_3396a257_lang = "";
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(".vitepress/theme/layout/Copyright.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const Copyright = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-3396a257"]]);
const index_vue_vue_type_style_index_0_scoped_9f010cdf_lang = "";
const _sfc_main$2 = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const initValine = () => {
      let path = location.origin + location.pathname;
      document.getElementsByClassName("leancloud-visitors")[0].id = path;
      new Valine({
        el: "#vcomments",
        appId: "2GzP9zCeJjS8HzykzDRyptJf-gzGzoHsz",
        appKey: "lduSByMe7OPglzonWDMAJrzX",
        notify: false,
        verify: false,
        path,
        visitor: true,
        avatar: "mm",
        placeholder: "\u6765\u90FD\u6765\u4E86\uFF0C\u4E0D\u7559\u70B9\u5565\u5417"
      });
    };
    watch(
      () => route.path,
      () => {
        console.log("\u76D1\u542C\u8DEF\u7531\u53D8\u5316");
        initValine();
      }
    );
    onMounted(() => {
      remoteImport("//unpkg.com/valine/dist/Valine.min.js").then(() => {
        initValine();
      });
    });
    function remoteImport(url) {
      return new Promise((resolve) => {
        var head = document.getElementsByTagName("head")[0];
        var script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", url);
        head.appendChild(script);
        script.onload = function() {
          resolve();
        };
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-9f010cdf><section class="page-edit" data-v-9f010cdf><div class="page-edit-read" data-v-9f010cdf><span class="leancloud-visitors" data-flag-title="Your Article Title" data-v-9f010cdf><em class="post-meta-item-text" data-v-9f010cdf>\u9605\u8BFB\u91CF\uFF1A </em><i class="leancloud-visitors-count" data-v-9f010cdf></i></span></div><div id="vcomments" data-v-9f010cdf></div></section></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(".vitepress/ValineComment/index.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const ValineComment = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-9f010cdf"]]);
const _sfc_main$1 = {
  __name: "MyLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const { page } = useData();
    const { Layout: Layout2 } = theme;
    const detectDeviceType = () => {
      if (typeof window === "undefined")
        return;
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? "Mobile" : "Desktop";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = resolveComponent("ClientOnly");
      const _component_AlanBackTop = resolveComponent("AlanBackTop");
      _push(ssrRenderComponent(unref(Layout2), _attrs, {
        "doc-footer-before": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ClientOnly, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(Copyright, {
                    key: unref(md5)(unref(page).relativePath)
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    (openBlock(), createBlock(Copyright, {
                      key: unref(md5)(unref(page).relativePath)
                    }))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_ClientOnly, null, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Copyright, {
                    key: unref(md5)(unref(page).relativePath)
                  }))
                ]),
                _: 1
              })
            ];
          }
        }),
        "doc-after": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ClientOnly, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(ValineComment, null, null, _parent3, _scopeId2));
                  if (detectDeviceType() === "Desktop") {
                    _push3(ssrRenderComponent(_component_AlanBackTop, null, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(ValineComment),
                    detectDeviceType() === "Desktop" ? (openBlock(), createBlock(_component_AlanBackTop, { key: 0 })) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_ClientOnly, null, {
                default: withCtx(() => [
                  createVNode(ValineComment),
                  detectDeviceType() === "Desktop" ? (openBlock(), createBlock(_component_AlanBackTop, { key: 0 })) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(".vitepress/theme/MyLayout.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ArticleMetadata",
  __ssrInlineRender: true,
  props: {
    article: Object
  },
  setup(__props) {
    var _a, _b, _c, _d;
    const props = __props;
    dayjs.extend(relativeTime);
    dayjs.locale("zh-cn");
    const { frontmatter } = useData();
    const data = reactive({
      author: "Alan",
      date: frontmatter.value.createTime || new Date(),
      categories: (_b = (_a = props.article) == null ? void 0 : _a.categories) != null ? _b : [],
      tags: (_d = (_c = frontmatter == null ? void 0 : frontmatter.value) == null ? void 0 : _c.tag) == null ? void 0 : _d.split(",")
    });
    const { author, date, tags } = toRefs(data);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "meta-wrapper" }, _attrs))} data-v-9cecb202><div class="meta-item" data-v-9cecb202><span class="meta-icon author" data-v-9cecb202><svg role="img" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-9cecb202><title data-v-9cecb202>\u539F\u521B\u4F5C\u8005</title><path d="M858.5 763.6c-18.9-44.8-46.1-85-80.6-119.5-34.5-34.5-74.7-61.6-119.5-80.6-0.4-0.2-0.8-0.3-1.2-0.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-0.4 0.2-0.8 0.3-1.2 0.5-44.8 18.9-85 46-119.5 80.6-34.5 34.5-61.6 74.7-80.6 119.5C146.9 807.5 137 854 136 901.8c-0.1 4.5 3.5 8.2 8 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c0.1 4.4 3.6 7.8 8 7.8h60c4.5 0 8.1-3.7 8-8.2-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z" data-v-9cecb202></path></svg></span><span class="meta-content" data-v-9cecb202><a title="\u8FDB\u5165\u4F5C\u8005\u4E3B\u9875" data-v-9cecb202>${ssrInterpolate(unref(author))}</a></span></div><div class="meta-item" data-v-9cecb202><span class="meta-icon date" data-v-9cecb202><svg role="img" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-9cecb202><title data-v-9cecb202>\u53D1\u5E03\u65F6\u95F4</title><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" data-v-9cecb202></path><path d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z" data-v-9cecb202></path></svg></span><time class="meta-content"${ssrRenderAttr("datetime", unref(frontmatter).createTime || unref(date).toISOString())}${ssrRenderAttr("title", unref(dayjs)().to(unref(dayjs)(unref(date))))} data-v-9cecb202>${ssrInterpolate(unref(date).toLocaleString("zh", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
      }))}</time></div><div class="meta-item" data-v-9cecb202><span class="meta-icon tag" data-v-9cecb202><svg role="img" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-9cecb202><title data-v-9cecb202>\u6807\u7B7E\u5217\u8868</title><path d="M483.2 790.3L861.4 412c1.7-1.7 2.5-4 2.3-6.3l-25.5-301.4c-0.7-7.8-6.8-13.9-14.6-14.6L522.2 64.3c-2.3-0.2-4.7 0.6-6.3 2.3L137.7 444.8a8.03 8.03 0 0 0 0 11.3l334.2 334.2c3.1 3.2 8.2 3.2 11.3 0z m62.6-651.7l224.6 19 19 224.6L477.5 694 233.9 450.5l311.9-311.9z m60.16 186.23a48 48 0 1 0 67.88-67.89 48 48 0 1 0-67.88 67.89zM889.7 539.8l-39.6-39.5a8.03 8.03 0 0 0-11.3 0l-362 361.3-237.6-237a8.03 8.03 0 0 0-11.3 0l-39.6 39.5a8.03 8.03 0 0 0 0 11.3l243.2 242.8 39.6 39.5c3.1 3.1 8.2 3.1 11.3 0l407.3-406.6c3.1-3.1 3.1-8.2 0-11.3z" data-v-9cecb202></path></svg></span><span class="meta-content" data-v-9cecb202><!--[-->`);
      ssrRenderList(unref(tags), (tag, index) => {
        _push(`<span data-v-9cecb202><a class="tag-a" href="javascript:void(0);"${ssrRenderAttr("title", tag)} data-v-9cecb202>${ssrInterpolate(tag)}</a></span>`);
      });
      _push(`<!--]--></span></div></div>`);
    };
  }
});
const ArticleMetadata_vue_vue_type_style_index_0_scoped_9cecb202_lang = "";
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(".vitepress/theme/components/ArticleMetadata.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ArticleMetadata = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9cecb202"]]);
const style = "";
const global = "";
const Theme = {
  ...theme,
  Layout: _sfc_main$1,
  enhanceApp({ app }) {
    app.use(AlanViteComponent);
    app.component("ArticleMetadata", ArticleMetadata);
  }
};
function useUpdateHead(route, siteDataByRouteRef) {
  let managedHeadTags = [];
  let isFirstUpdate = true;
  const updateHeadTags = (newTags) => {
    if (isFirstUpdate) {
      isFirstUpdate = false;
      return;
    }
    managedHeadTags.forEach((el) => document.head.removeChild(el));
    managedHeadTags = [];
    newTags.forEach((headConfig) => {
      const el = createHeadElement(headConfig);
      document.head.appendChild(el);
      managedHeadTags.push(el);
    });
  };
  watchEffect(() => {
    const pageData = route.data;
    const siteData2 = siteDataByRouteRef.value;
    const pageDescription = pageData && pageData.description;
    const frontmatterHead = pageData && pageData.frontmatter.head || [];
    document.title = createTitle(siteData2, pageData);
    document.querySelector(`meta[name=description]`).setAttribute("content", pageDescription || siteData2.description);
    updateHeadTags(mergeHead(siteData2.head, filterOutHeadDescription(frontmatterHead)));
  });
}
function createHeadElement([tag, attrs, innerHTML]) {
  const el = document.createElement(tag);
  for (const key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
  if (innerHTML) {
    el.innerHTML = innerHTML;
  }
  return el;
}
function isMetaDescription(headConfig) {
  return headConfig[0] === "meta" && headConfig[1] && headConfig[1].name === "description";
}
function filterOutHeadDescription(head) {
  return head.filter((h2) => !isMetaDescription(h2));
}
const hasFetched = /* @__PURE__ */ new Set();
const createLink = () => document.createElement("link");
const viaDOM = (url) => {
  const link2 = createLink();
  link2.rel = `prefetch`;
  link2.href = url;
  document.head.appendChild(link2);
};
const viaXHR = (url) => {
  const req = new XMLHttpRequest();
  req.open("GET", url, req.withCredentials = true);
  req.send();
};
let link;
const doFetch = inBrowser$1 && (link = createLink()) && link.relList && link.relList.supports && link.relList.supports("prefetch") ? viaDOM : viaXHR;
function usePrefetch() {
  if (!inBrowser$1) {
    return;
  }
  if (!window.IntersectionObserver) {
    return;
  }
  let conn;
  if ((conn = navigator.connection) && (conn.saveData || /2g/.test(conn.effectiveType))) {
    return;
  }
  const rIC = window.requestIdleCallback || setTimeout;
  let observer = null;
  const observeLinks = () => {
    if (observer) {
      observer.disconnect();
    }
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const link2 = entry.target;
          observer.unobserve(link2);
          const { pathname } = link2;
          if (!hasFetched.has(pathname)) {
            hasFetched.add(pathname);
            const pageChunkPath = pathToFile(pathname);
            doFetch(pageChunkPath);
          }
        }
      });
    });
    rIC(() => {
      document.querySelectorAll("#app a").forEach((link2) => {
        const { target, hostname, pathname } = link2;
        const extMatch = pathname.match(/\.\w+$/);
        if (extMatch && extMatch[0] !== ".html") {
          return;
        }
        if (target !== `_blank` && hostname === location.hostname) {
          if (pathname !== location.pathname) {
            observer.observe(link2);
          } else {
            hasFetched.add(pathname);
          }
        }
      });
    });
  };
  onMounted(observeLinks);
  const route = useRoute();
  watch(() => route.path, observeLinks);
  onUnmounted(() => {
    observer && observer.disconnect();
  });
}
const ClientOnly = defineComponent({
  setup(_, { slots }) {
    const show = ref(false);
    onMounted(() => {
      show.value = true;
    });
    return () => show.value && slots.default ? slots.default() : null;
  }
});
function useCopyCode() {
  if (inBrowser$1) {
    const timeoutIdMap = /* @__PURE__ */ new Map();
    window.addEventListener("click", (e) => {
      var _a;
      const el = e.target;
      if (el.matches('div[class*="language-"] > button.copy')) {
        const parent = el.parentElement;
        const sibling = (_a = el.nextElementSibling) == null ? void 0 : _a.nextElementSibling;
        if (!parent || !sibling) {
          return;
        }
        const isShell = /language-(shellscript|shell|bash|sh|zsh)/.test(parent.classList.toString());
        let { innerText: text = "" } = sibling;
        if (isShell) {
          text = text.replace(/^ *(\$|>) /gm, "");
        }
        copyToClipboard(text).then(() => {
          el.classList.add("copied");
          clearTimeout(timeoutIdMap.get(el));
          const timeoutId = setTimeout(() => {
            el.classList.remove("copied");
            el.blur();
            timeoutIdMap.delete(el);
          }, 2e3);
          timeoutIdMap.set(el, timeoutId);
        });
      }
    });
  }
}
async function copyToClipboard(text) {
  try {
    return navigator.clipboard.writeText(text);
  } catch {
    const element = document.createElement("textarea");
    const previouslyFocusedElement = document.activeElement;
    element.value = text;
    element.setAttribute("readonly", "");
    element.style.contain = "strict";
    element.style.position = "absolute";
    element.style.left = "-9999px";
    element.style.fontSize = "12pt";
    const selection = document.getSelection();
    const originalRange = selection ? selection.rangeCount > 0 && selection.getRangeAt(0) : null;
    document.body.appendChild(element);
    element.select();
    element.selectionStart = 0;
    element.selectionEnd = text.length;
    document.execCommand("copy");
    document.body.removeChild(element);
    if (originalRange) {
      selection.removeAllRanges();
      selection.addRange(originalRange);
    }
    if (previouslyFocusedElement) {
      previouslyFocusedElement.focus();
    }
  }
}
const NotFound = Theme.NotFound || (() => "404 Not Found");
const VitePressApp = defineComponent({
  name: "VitePressApp",
  setup() {
    const { site } = useData();
    onMounted(() => {
      watch(() => site.value.lang, (lang) => {
        document.documentElement.lang = lang;
      }, { immediate: true });
    });
    {
      usePrefetch();
    }
    useCopyCode();
    if (Theme.setup)
      Theme.setup();
    return () => h(Theme.Layout);
  }
});
function createApp() {
  const router = newRouter();
  const app = newApp();
  app.provide(RouterSymbol, router);
  const data = initData(router.route);
  app.provide(dataSymbol, data);
  app.provide("NotFound", NotFound);
  app.component("Content", Content);
  app.component("ClientOnly", ClientOnly);
  Object.defineProperty(app.config.globalProperties, "$frontmatter", {
    get() {
      return data.frontmatter.value;
    }
  });
  if (Theme.enhanceApp) {
    Theme.enhanceApp({
      app,
      router,
      siteData: siteDataRef
    });
  }
  return { app, router, data };
}
function newApp() {
  return createSSRApp(VitePressApp);
}
function newRouter() {
  let isInitialPageLoad = inBrowser$1;
  let initialPath;
  return createRouter((path) => {
    let pageFilePath = pathToFile(path);
    if (isInitialPageLoad) {
      initialPath = pageFilePath;
    }
    if (isInitialPageLoad || initialPath === pageFilePath) {
      pageFilePath = pageFilePath.replace(/\.js$/, ".lean.js");
    }
    if (inBrowser$1) {
      isInitialPageLoad = false;
    }
    return import(
      /*@vite-ignore*/
      pageFilePath
    );
  }, NotFound);
}
if (inBrowser$1) {
  const { app, router, data } = createApp();
  router.go().then(() => {
    useUpdateHead(router.route, data.site);
    app.mount("#app");
  });
}
async function render(path) {
  const { app, router } = createApp();
  await router.go(path);
  return renderToString(app);
}
export {
  render
};
