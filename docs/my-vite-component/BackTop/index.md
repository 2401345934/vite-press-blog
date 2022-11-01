---
createTime: 2022/10/30
tag: 'Vite,组件库'
---
# BackTop 返回顶部

返回页面顶部的操作按钮。

## 何时使用

* 当页面内容区域比较长时；
* 当用户需要频繁返回顶部查看相关内容时。

## 代码演示

 <AlanBackTop></AlanBackTop>

```tsx
<script setup>
import { AlanBackTop } from '@xiaomh/vue3-alan-vite-component';
</script>

<template>
  {/* 默认 */}
 <AlanBackTop></AlanBackTop>
</template>

<style></style>

```

## API

### 属性说明

| 属性   | 说明 |   类型  | 默认值  | 版本  |
| :-------------: | :----------: | :------------: | :------------: | :------------: |
| visibilityHeight |   滚动高度达到此参数值才出现 BackTop   | number  | 400 | 1.0.18|

### slot 属性说明

| slot Name   | 说明     | 版本  |
| :-------------: | :----------: | :------------: |
| defalut |   用于自定义内容样式   | 1.0.18|
