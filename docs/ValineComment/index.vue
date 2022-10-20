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
import { watch } from 'vue'
import { useRoute } from 'vitepress'
import Valine from 'valine';
const route = useRoute()

let valine;

const initValine = () => {
  let path = location.origin + location.pathname
  document.getElementsByClassName('leancloud-visitors')[0].id = path
  valine.init({
    el: '#vcomments',
    appId: '2GzP9zCeJjS8HzykzDRyptJf-gzGzoHsz',// your appId
    appKey: 'lduSByMe7OPglzonWDMAJrzX', // your appKey
    notify: false,
    verify: false,
    path: path,
    visitor: true,
    avatar: 'mm',
    placeholder: '来都来了，不留点啥吗'
  });
}

watch(() => route.path, () => {
  initValine();
})

setTimeout(() => {
  valine = new Valine()
  initValine()
}, 1000);

</script>

<style scoped>
.page-edit-read {
  text-align: right;
  margin: 14px 0;
}
</style>