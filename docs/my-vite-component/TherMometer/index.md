---
createTime: 2022/10/30
tag: 'Vite,组件库'
---
# TherMometer 温度计

展示温度计

## 何时使用

* 需要展示温度计的时候

## 代码演示

建议黑暗模式下观看哦

<TherMometer  :show="true"
               :data="{
                 max: 50,
                 min: 0,
                 value: 60,
                 warn: 10,
               }" />

```tsx
<script setup>
import { TherMometer } from '@xiaomh/vue3-alan-vite-component';
</script>

<template>
<TherMometer  :show="true"
               :data="{
                 max: 50,
                 min: 0,
                 value: 60,
                 warn: 10,
               }" />
</template>

<style></style>

```

## API

### 属性说明

| 属性   | 说明 |   类型  | 默认值  | 版本  |
| :-------------: | :----------: | :------------: | :------------: | :------------: |
| show |   是否展示过度效果    | boolean  | false | 1.0.20|
| data |   温度计的配置项    | object  | {} | 1.0.20|

#### data属性说明

| 属性   | 说明 |   类型  | 默认值  | 版本  |
| :-------------: | :----------: | :------------: | :------------: | :------------: |
|   max |   最大值    | number  |  0| 1.0.20|
|   min |   最小值    | number  |  0| 1.0.20|
|   value |   当前值    | number  |  0| 1.0.20|
|   warn |   多少值警告    | number  |  0| 1.0.20|
