# 数组utils

## 计算数组的平均值

``` js
const average = (arr) => arr.reduce((a, b) => a + b) / arr.length
```

## 数组排序，{type} 1：从小到大 2：从大到小 3：随机

``` js
// 数组排序，{type} 1：从小到大 2：从大到小 3：随机
const sort = (arr, type = 1) => {
  return arr.sort((a, b) => {
    switch (type) {
      case 1:
        return a - b
      case 2:
        return b - a
      case 3:
        return Math.random() - 0.5
      default:
        return arr
    }
  })
}

```

## 求和

```javascript
const sum = arr => {
  return arr.reduce((pre, cur) => {
    return pre + cur
  })
}

```
