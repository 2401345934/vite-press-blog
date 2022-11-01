---
createTime: 2022/10/29
tag: 'utils'
---
# 对象 utils

## 判断是否是空对象

```js
const isEmptyObject = (obj) =>
  Reflect.ownKeys(obj).length === 0 && obj.constructor === Object
```

## 判断是不是对象

```js
const isObject = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Object]'
}
```
