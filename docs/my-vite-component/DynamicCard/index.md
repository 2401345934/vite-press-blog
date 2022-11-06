---
createTime: 2022/10/30
tag: 'Vite,组件库'
---
# DynamicCard 卡片组件

## 何时使用

用于让卡片动画的场景

## 代码演示

 <dynamic-card :cardList="[
  {
    text:'哈喽哈喽哈喽哈喽1'
  },
  {
    text:'哈喽哈喽哈喽哈喽2'
  },
  {
    text:'哈喽哈喽哈喽哈喽21'
  },
  {
    text:'哈喽哈喽哈喽哈喽31'
  },
]" ></dynamic-card>

```tsx
<script setup>
import { DynamicCard } from '@xiaomh/vue3-alan-vite-component';
</script>

<template>
 <dynamic-card :cardList="[
  {
    text:'哈喽哈喽哈喽哈喽1'
  },
  {
    text:'哈喽哈喽哈喽哈喽2'
  },
  {
    text:'哈喽哈喽哈喽哈喽21'
  },
  {
    text:'哈喽哈喽哈喽哈喽31'
  },
]"></dynamic-card>
</template>

<style></style>

```

## API

### 属性说明

| 属性   | 说明 |   类型  | 默认值  | 版本  |
| :-------------: | :----------: | :------------: | :------------: | :------------: |
| cardList |   卡片list   | Array  | [] | 1.0.27|
| shape       |    卡片排序  0：列表 1:乱序扇形 2:正序扇形    |        number  | 0 |1.0.25 |
| isKeyboardControl       |    是否需要键盘控制 开启后可以 通过 上下左右箭头控制    |        boolean  | false |1.0.25 |

#### cardList 属性说明

| 属性   | 说明 |   类型  | 默认值  | 版本  |
| :-------------: | :----------: | :------------: | :------------: | :------------: |
| text |   卡片文本   | string  |  -| 1.0.27|
