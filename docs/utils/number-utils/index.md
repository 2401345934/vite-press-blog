# 数字utils

## 随机数范围

``` js
const random = (min, max) => {
  if (arguments.length === 2) {
    return Math.floor(min + Math.random() * (max + 1 - min))
  }
  return null
}

```

## 数字千分位

``` js
/**
 * 数字千分位
 * @param {Number|String} number 数字
 * @param {Number|String} fix 保留几位小数 no-按原数据返回
 * @returns 千分位之后的结果
 */
exports.toThousands = function (number, fix = 'no') {
  const numberTemp = fix === 'no' ? String((number || 0)) : Number((number || 0)).toFixed(fix)
  if (isNaN(numberTemp)) return number
  const numArr = numberTemp.split('.')
  const negative = numArr[0].includes('-') ? '-' : ''
  let num = negative === '-' ? numArr[0].substring(1) : numArr[0]
  let result = ''
  while (num.length > 3) {
    result = ',' + num.slice(-3) + result
    num = num.slice(0, num.length - 3)
  }
  num && (result = num + result)
  return `${negative}${result}${numArr[1] ? '.' + numArr[1] : ''}`
}

```
