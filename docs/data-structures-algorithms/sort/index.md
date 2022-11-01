---
createTime: 2022/10/26
tag: '算法'
---
# 排序

## 归并排序

```javascript
// 时间复杂度 O(nlogn) 分需要劈开数组，所以是logn， 合则是n
// 空间复杂度 O(n)
Array.prototype.mergeSort = function () {
  const rec = (arr) => {
    // 递归终点
    if (arr.length === 1) return arr
    // 获取中间索引
    const mid = arr.length >> 1
    // 通过中间下标,进行分割数组
    const left = arr.slice(0, mid)
    const right = arr.slice(mid)
    // 左边和右边的数组进行递归,会得到有序的左数组,和有序的右数组
    const orderLeft = rec(left)
    const orderRight = rec(right)
    // 存放结果的数组
    const res = []
    while (orderLeft.length || orderRight.length) {
      // 如左边和右边数组都有值
      if (orderLeft.length && orderRight.length) {
        // 左边队头的值小于右边队头的值 就左边队头出队,否则就是右边队头出队
        res.push(
          orderLeft[0] < orderRight[0] ? orderLeft.shift() : orderRight.shift()
        )
      } else if (orderLeft.length) {
        // 把左边的队头放入数组
        res.push(orderLeft.shift())
      } else if (orderRight.length) {
        // 把右边的队头放入数组
        res.push(orderRight.shift())
      }
    }

    return res
  }
  const res = rec(this)
  // 把结果放入原数组
  res.forEach((n, i) => (this[i] = n))
}
```

## 快速排序

```js
// 时间复杂度 O(nlogN)
// 空间复杂度 O(1)
Array.prototype.quickSort = function () {
  const rec = (arr) => {
    // 如果数组长度小于等于1 就不用排序了
    if (arr.length <= 1) {
      return arr
    }

    // 存放基准前后的数组
    const left = []
    const right = []

    // 取基准
    const mid = arr[0]

    for (let i = 1; i < arr.length; i++) {
      // 如果当前值小于基准就放到基准前数组里面
      if (arr[i] < mid) {
        left.push(arr[i])
      } else {
        // 否则就放到基准后数组里面
        right.push(arr[i])
      }
    }

    // 递归调用两边的子数组
    return [...rec(left), mid, ...rec(right)]
  }

  const res = rec(this)
  res.forEach((n, i) => (this[i] = n))
}
```

## 插入排序

```javascript
// 时间复杂度 O(n ^ 2)
Array.prototype.insertionSort = function () {
  // 遍历数组 从第二个开始
  for (let i = 1; i < this.length; i++) {
    // 获取第二个元素
    const temp = this[i]

    let j = i
    while (j > 0) {
      // 如果当前元素小于前一个元素 就开始往后移动
      if (this[j - 1] > temp) {
        this[j] = this[j - 1]
      } else {
        // 否则就跳出循环
        break
      }

      // 递减
      j--
    }

    // 前一位置赋值为当前元素
    this[j] = temp
  }
}
```

## 选择排序

```javascript
// 时间复杂度：O(n ^ 2) n为数组长度
// 空间复杂度：O(1)
Array.prototype.selectionSort = function () {
  for (let i = 0; i < this.length - 1; i++) {
    let indexMin = i

    for (let j = i; j < this.length; j++) {
      // 如果当前这个元素 小于最小值的下标 就更新最小值的下标
      if (this[j] < this[indexMin]) {
        indexMin = j
      }
    }

    // 避免自己和自己进行交换
    if (indexMin !== i) {
      // 进行交换数据
      ;[this[i], this[indexMin]] = [this[indexMin], this[i]]
    }
  }
}
```

## 冒泡排序

```javascript
// 时间复杂度 O(n ^ 2) n为数组长度
// 空间复杂度 O(1)
Array.prototype.bubbleSort = function () {
  for (i = 0; i < this.length - 1; i++) {
    for (let j = 0; j < this.length - 1 - i; j++) {
      if (this[j] > this[j + 1]) {
        // 交换数据
        ;[this[j], this[j + 1]] = [this[j + 1], this[j]]
      }
    }
  }
}
```
