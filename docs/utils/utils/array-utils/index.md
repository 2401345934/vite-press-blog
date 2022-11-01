---
createTime: 2022/10/29
tag: 'utils'
---
# 数组 utils

## 计算数组的平均值

```js
const average = (arr) => arr.reduce((a, b) => a + b) / arr.length
```

## 数组排序，{type} 1：从小到大 2：从大到小 3：随机

```js
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
const sum = (arr) => {
  return arr.reduce((pre, cur) => {
    return pre + cur
  })
}
```

## 数组去重

```javascript
const uniqueArr = (arr) => [...new Set(arr)]
console.log(uniqueArr(['前端', 'js', 'html', 'js', 'css', 'html']))
// ['前端', 'js', 'html', 'css']
```

## all：布尔全等判断

```javascript
const all = (arr, fn = Boolean) => arr.every(fn);

all([4, 2, 3], x => x > 1); // true
all([1, 2, 3]); // true
```

## allEqual：检查数组各项相等

```javascript
const allEqual = arr => arr.every(val => val === arr[0]);

allEqual([1, 2, 3, 4, 5, 6]); // false
allEqual([1, 1, 1, 1]); // true
```

## castArray：其它类型转数组

```javascript
const castArray = val => (Array.isArray(val) ? val : [val]);

castArray('foo'); // ['foo']
castArray([1]); // [1]
castArray(1); // [1]
```

## compact：去除数组中的无效/无用值

```javascript
const compact = arr => arr.filter(Boolean);

compact([0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34]); 
// [ 1, 2, 3, 'a', 's', 34 ]
```

## deepFlatten：递归扁平化数组

```javascript
const deepFlatten = arr => [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));

deepFlatten([1, [2], [[3], 4], 5]); // [1,2,3,4,5]
```

## intersection：两数组的交集

```javascript

const intersection = (a, b) => {
  const s = new Set(b);
  return a.filter(x => s.has(x));
};

intersection([1, 2, 3], [4, 3, 2]); // [2, 3]
```

## intersectionWith：两数组都符合条件的交集

```javascript

const intersectionBy = (a, b, fn) => {
  const s = new Set(b.map(fn));
  return a.filter(x => s.has(fn(x)));
};

intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [2.1]
```

## shuffle：“洗牌” 数组

```javascript

const shuffle = ([...arr]) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
};

const foo = [1, 2, 3];
shuffle(foo); // [2, 3, 1], foo = [1, 2, 3]
```

## nest：根据parent_id生成树结构（阿里一面真题）

```javascript
const nest = (items, id = null, link = 'parent_id') =>
  items
    .filter(item => item[link] === id)
    .map(item => ({ ...item, children: nest(items, item.id) }));


const comments = [
  { id: 1, parent_id: null },
  { id: 2, parent_id: 1 },
  { id: 3, parent_id: 1 },
  { id: 4, parent_id: 2 },
  { id: 5, parent_id: 4 }
];
const nestedComments = nest(comments); // [{ id: 1, parent_id: null, children: [...] }]
```
