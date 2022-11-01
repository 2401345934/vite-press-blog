---
createTime: 2022/10/30
tag: 'Vite,组件库'
---
# YuanWar 圆圆战争

canvas 小游戏

## 何时使用

* 娱乐

## 代码演示

<yuan-war :height="900" :width="900"></yuan-war>

```tsx
<script setup>
import { YuanWar } from '@xiaomh/vue3-alan-vite-component';
</script>

<template>
<yuan-war  />
</template>

<style></style>

```

## API

### 属性说明

| 属性   | 说明 |   类型  | 默认值  | 版本  |
| :-------------: | :----------: | :------------: | :------------: | :------------: |
|   width |   宽    | number  |  800| 1.0.23|
|   height |   高    | number  |  800| 1.0.23|
