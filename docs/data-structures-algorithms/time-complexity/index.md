---
createTime: 2022/10/26
tag: '算法'
---
# 时间复杂度

## 含义

其实就是一个函数，用大 O 表示， 比如 O(1)、 O(n)...

## 作用

它的作用就是用来定义描述算法的运行时间

### O(1)

```javascript
let i = 0
i += 1
```

### O(n)： 如果是 O(1) + O(n) 则还是 O(n)

```javascript
for (let i = 0; i < n; i += 1) {
  console.log(i)
}
```

### O(n^2)： O(n) \* O(n), 也就是双层循环，自此类推： O(n^3)

```javascript
for (let i = 0; i < n; i += 1) {
  for (let j = 0; j < n; j += 1) {
    console.log(i, j)
  }
}
```
