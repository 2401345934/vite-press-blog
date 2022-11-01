---
createTime: 2022/10/30
tag: 'Vite,组件库'
---
# DigitalScroll 数字滚动组件

## 何时使用

用于让数字滚动的场景

## 代码演示

 <digital-scroll :targetNumber="1000" style="color:red" :targetClass="my" ></digital-scroll>

```tsx
<script setup>
import { DigitalScroll } from '@xiaomh/vue3-alan-vite-component';
</script>

<template>
 <digital-scroll :targetNumber="1000" targetClass="class"></digital-scroll>
</template>

<style></style>

```

## API

### 属性说明

| 属性   | 说明 |   类型  | 默认值  | 版本  |
| :-------------: | :----------: | :------------: | :------------: | :------------: |
| targetNumber |   目标值   | number  | 300 | 1.0.0|
| targetClass       |    目标样式    |        string  | .digital-scroll |1.0.0 |
