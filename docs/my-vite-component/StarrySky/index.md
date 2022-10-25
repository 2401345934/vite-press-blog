# StarrySky 星空背景

## 何时使用

用于让背景拥有星空效果

## 代码演示

<starry-sky :stars-count="1000" :distance="1000" />
```tsx
<script setup>
import { StarrySky } from "@xiaomh/vue3-alan-vite-component"

</script>

 <starry-sky :stars-count="1000" :distance="1000" />
```

## API

### 属性说明

| 属性   | 说明 |   类型  | 默认值  | 版本  |
| :-------------: | :----------: | :------------: | :------------: | :------------: |
| stars-count |   星星总数   | number  | 800 | 1.0.0|
| distance       |    偏移量    |        number  | 800 |1.0.0 |
