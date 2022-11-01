---
createTime: 2022/10/30
tag: 'Vite,组件库'
---
# Button

## 何时使用

按钮用于开始一个即时操作。
标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。

## 代码演示

### button

<AlanButton  type="primary">1231</AlanButton>

### disabled button

<AlanButton  disabled >1231</AlanButton>

### 块button

<AlanButton block type="primary">1231</AlanButton>

```tsx
<script setup>
import { AlanButton } from "@xiaomh/vue3-alan-vite-component"

</script>
<alan-button type="primary">1231</alan-button>

```

## API

### 属性说明

| 属性   | 说明 |   类型  | 默认值  | 版本  |
| :-------------: | :----------: | :------------: | :------------: | :------------: |
| block       |    将按钮宽度调整为其父宽度的选项    |        boolean  | false |1.0.11 |
| disabled       |    按钮失效状态    |        boolean  | false |1.0.11 |
| type       |    设置按钮类型    |        primary  | default   | default |1.0.11 |
