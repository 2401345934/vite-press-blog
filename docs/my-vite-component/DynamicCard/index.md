# DynamicCard 卡片组件

## 何时使用

用于让卡片动画的场景

## 代码演示

 <dynamic-card  ></dynamic-card>

```tsx
<script setup>
import { DynamicCard } from '@xiaomh/vue3-alan-vite-component';
</script>

<template>
 <dynamic-card></dynamic-card>
</template>

<style></style>

```

## API

### 属性说明

| 属性   | 说明 |   类型  | 默认值  | 版本  |
| :-------------: | :----------: | :------------: | :------------: | :------------: |
| cardNumber |   卡片数量   | number  | 10 | 1.0.25|
| shape       |    卡片排序  0：列表 1:乱序扇形 2:正序扇形    |        number  | 1 |1.0.25 |
| isKeyboardControl       |    是否需要键盘控制 开启后可以 通过 上下左右箭头控制    |        boolean  | false |1.0.25 |
