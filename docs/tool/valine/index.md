---
createTime: 2022/10/26
tag: '工具'
---
# valine 页面评论功能

## 官网

<https://valine.js.org/>

## 实例

```vue
<template>
  <div class="page">
    <section class="page-edit">
      <div class="page-edit-read">
        <!-- id 将作为查询条件 -->
        <span class="leancloud-visitors" data-flag-title="Your Article Title">
          <em class="post-meta-item-text">阅读量： </em>
          <i class="leancloud-visitors-count"></i>
        </span>
      </div>
      <div id="vcomments"></div>
    </section>
  </div>
</template>

<script setup>
import { watch,onMounted } from 'vue'
import { useRoute } from 'vitepress'
const route = useRoute()

const initValine = () => {
  let path = location.origin + location.pathname
  document.getElementsByClassName('leancloud-visitors')[0].id = path
  new Valine({
    el: '#vcomments',
    appId: '',// your appId
    appKey: '', // your appKey
    notify: false,
    verify: false,
    path: path,
    visitor: true,
    avatar: 'mm',
    placeholder: '来都来了，不留点啥吗'
  });
}

watch(
  () => route.path,
  () => {
    initValine();
  }
);

onMounted(() => {
  remoteImport('//unpkg.com/valine/dist/Valine.min.js').then(() => {
    initValine()
  });
});

function remoteImport(url) {
  return new Promise((resolve) => {
    var head = document.getElementsByTagName("head")[0];
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", url);
    head.appendChild(script);

    script.onload = function () {
      resolve();
    };
  });
}



</script>

<style scoped>
.page-edit-read {
  text-align: right;
  margin: 14px 0;
}
</style>
```
