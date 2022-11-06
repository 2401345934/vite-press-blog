---
createTime: 2022/10/30
tag: 'Vite,组件库'
---
# DrawImage 图片合并

## 何时使用

* 多张图片需要合并的时候

## 代码演示

 <DrawImage :renderList="[
      {
        type: 'image',
        src: '../assets/zj-bg.jpeg',
        width: 500,
        height: 500,
        x: 0,
        y: 0
      },
      {
        type: 'image',
        src: '../assets/hongbao.png',
        clipCircle: true,
        clipLineWidth: 10,
        clipStrokeStyle: '#ffffff',
        width: 60,
        height: 60,
        x: 180,
        y: 20
      },
      {
        type: 'text',
        text: '我的名字我的名字',
        align: 'center',
        fontSize: 20,
        fillStyle: '#333',
        x: 100,
        y: 120
      },
      {
        type: 'image',
        src: '../assets/clock.png',
        width: 80,
        height: 80,
        x: 0,
        y: 150
      }
    ]"></DrawImage>

```vue
<script setup>
import { DrawImage } from '@xiaomh/vue3-alan-vite-component';

const reactiveProps = reactive({
  renderList: [
      {
        type: 'image',
        src: '/examples/assets/zj-bg.jpeg',
        width: 500,
        height: 500,
        x: 0,
        y: 0
      },
      {
        type: 'image',
        src: '/examples/assets/hongbao.png',
        clipCircle: true,
        clipLineWidth: 10,
        clipStrokeStyle: '#ffffff',
        width: 60,
        height: 60,
        x: 180,
        y: 20
      },
      {
        type: 'text',
        text: '我的名字我的名字',
        align: 'center',
        fontSize: 20,
        fillStyle: '#333',
        x: 100,
        y: 120
      },
      {
        type: 'image',
        src: '/examples/assets/clock.png',
        width: 80,
        height: 80,
        x: 0,
        y: 150
      }
    ]
})

</script>

<template>
  <DrawImage :renderList="reactiveProps.renderList"></DrawImage>
</template>

<style></style>

```

## API

### 属性说明

| 属性   | 说明 |   类型  | 默认值  | 版本  |
| :-------------: | :----------: | :------------: | :------------: | :------------: |
| width |   宽度   | number  | 500 | 1.1.0|
| height       |    高度    |        number  | 500 |1.0.0|
| bl       |    比例    |        number  | 5 |1.0.0|
| renderList       |    渲染合并的数组    |        Array  | [] |1.0.0|

#### renderList属性说明

| 属性   | 说明 |   类型  | 默认值  | 版本  |
| :-------------: | :----------: | :------------: | :------------: | :------------: |
|  type       |    类型 目前： image / text   |        string  | - |1.0.0|
|  src       |    图片路径如果type是 text 无需传  |        string  | - |1.0.0|
|  clipCircle       |    图片圆形  |        boolean  |false |1.0.0|
|  clipLineWidth       |    图片线框宽度  |        number  |0 |1.0.0|
|  clipStrokeStyle       |    图片圆角样式   |        string  | - |1.0.0|
|  width       |    宽度   |        number  | - |1.0.0|
|  height       |    高度   |        number  | - |1.0.0|
|  x       |    x轴位置   |        number  | - |1.0.0|
|  y       |    y轴位置   |        number  | - |1.0.0|
|  text       |    文本   |        string  | - |1.0.0|
|  align       |    文本对齐方式   |        string  | - |1.0.0|
|  fontSize       |    文本大小   |        number  | - |1.0.0|
|  fillStyle       |    文本样式   |        string  | - |1.0.0|
