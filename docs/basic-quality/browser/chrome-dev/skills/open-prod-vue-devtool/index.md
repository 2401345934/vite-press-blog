---
createTime: 2022/10/25
tag: 'chrome'
---
# 将下方代码粘贴到 浏览器控制台中 运行即可

```javascript
var Vue, walker, node;
walker = document.createTreeWalker(document.body,1);
while ((node = walker.nextNode())) {
  if (node.__vue__) {
    Vue = node.__vue__.$options._base;
    if (!Vue.config.devtools) {
      Vue.config.devtools = true;
      if (window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
        window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit("init", Vue);
        console.log("==> vue devtools now is enabled");
      }
    }
    break;
  }
}

```
