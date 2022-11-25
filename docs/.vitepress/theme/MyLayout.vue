<script setup>
import DefaultTheme from 'vitepress/theme'
import Copyright from "./layout/Copyright.vue"
import ValineComment from '../ValineComment/index.vue'
import { useData } from 'vitepress'
import md5 from 'blueimp-md5'
import { onMounted } from 'vue';
const { page, } = useData()
const { Layout } = DefaultTheme
const detectDeviceType = () => {
  if (typeof window === 'undefined') return
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    ? 'Mobile'
    : 'Desktop';
}

</script>

<template>
  <Layout>
    <template #doc-footer-before>
      <ClientOnly>
        <Copyright :key="md5(page.relativePath)" />
      </ClientOnly>
    </template>
    <template #doc-after>
      <ClientOnly>
        <ValineComment />
        <AlanBackTop v-if="detectDeviceType() === 'Desktop'"></AlanBackTop>
      </ClientOnly>
    </template>
  </Layout>
</template>