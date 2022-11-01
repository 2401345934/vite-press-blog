---
createTime: 2022/10/30
tag: 'Vite,组件库'
---
# TakingPictures 返回顶部

拍照组件

## 何时使用

* 需要拍照的时候

## 代码演示

 <TakingPictures></TakingPictures>

```tsx
<script setup>
import { TakingPictures } from '@xiaomh/vue3-alan-vite-component';
</script>

<template>
  {/* 默认 */}
 <TakingPictures></TakingPictures>
</template>

<style></style>

```

## API

### 属性说明

| 属性   | 说明 |   类型  | 默认值  | 版本  |
| :-------------: | :----------: | :------------: | :------------: | :------------: |
| autoGetCompetence |   是否进入页面自动调用摄像头   | boolean  | false | 1.0.27|
