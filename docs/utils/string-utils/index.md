# 字符串 utils

## 字符转换，type: 1:首字母大写 2：首字母小写 3：大小写转换 4：全部大写 5：全部小写

```js
const changeCase = (str, type) => {
  type = type || 4
  switch (type) {
    case 1:
      return str.replace(/\b\w+\b/g, function (word) {
        return (
          word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase()
        )
      })
    case 2:
      return str.replace(/\b\w+\b/g, function (word) {
        return (
          word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase()
        )
      })
    case 3:
      return str
        .split('')
        .map(function (word) {
          if (/[a-z]/.test(word)) {
            return word.toUpperCase()
          }
          return word.toLowerCase()
        })
        .join('')
    case 4:
      return str.toUpperCase()
    case 5:
      return str.toLowerCase()
    default:
      return str
  }
}
```

## 实现 qs 的 stringify

```js
const stringify = (obj) => {
  if (!isObject(obj)) {
    return obj
  }
  let str = ''
  for (const k in obj) {
    const v = obj[k]
    str += `${k}=${v}&`
  }
  return str.slice(0, str.length - 1)
}
```

## 反转字符串

```javascript
const reverse = (str) => str.split('').reverse().join('')
reverse('this is reverse')
// esrever si siht
```
