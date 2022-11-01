---
createTime: 2022/10/26
tag: '算法'
---
# 空间复杂度

## 含义

和时间复杂度一样，空间复杂度也是用大 O 表示，比如 O(1)、 O(n)...

## 作用

它用来定义描述算法运行过程中临时占用的存储空间大小
占用越少 代码写的就越好

### O(1)： 单个变量，所以占用永远是 O(1)

```javascript
let i = 0
i += 1
```

### O(n)： 声明一个数组， 添加 n 个值， 相当于占用了 n 个空间单元

```javascript
const arr = []
for (let i = 0; i < n; i += 1) {
  arr.push(i)
}
```

### O(n^2)： 类似一个矩阵的概念，就是二维数组的意思

```javascript
const arr = []
for (let i = 0; i < n; i += 1) {
  arr.push([])
  for (let j = 0; j < n; j += 1) {
    arr[i].push(j)
  }
}
```
