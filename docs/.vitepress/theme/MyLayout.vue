// docs/.vitepress/theme/MyLayout.vue
<script setup>
import DefaultTheme from 'vitepress/theme'
import ValineComment from '../ValineComment/index.vue'
const { Layout } = DefaultTheme
const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    ? 'Mobile'
    : 'Desktop';

</script>

<template>
  <Layout>
    <template #doc-after>
      <ValineComment />
      <AlanBackTop v-if="detectDeviceType() === 'Desktop'"></AlanBackTop>
    </template>
  </Layout>
</template>