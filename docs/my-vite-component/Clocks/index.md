---
createTime: 2022/10/30
tag: 'Vite,组件库'
---
# Clocks 钟表组件

## 何时使用

* 需要展示钟表

## 代码演示

 <Clocks></Clocks>

```tsx
<script setup>
import { Clocks } from '@xiaomh/vue3-alan-vite-component';
</script>

<template>
  {/* 默认 */}
 <Clocks></Clocks>
</template>

<style></style>

```

## API

### 属性说明

| 属性   | 说明 |   类型  | 默认值  | 版本  |
| :-------------: | :----------: | :------------: | :------------: | :------------: |
| width |   宽度   | number  | 500 | 1.0.30|
| height       |    高度    |        number  | 500 |1.0.30|
| backgroundColor       |    背景色    |        string  | #03303a |1.0.30 |
