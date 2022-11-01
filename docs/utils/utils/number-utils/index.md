---
createTime: 2022/10/29
tag: 'utils'
---
# 数字 utils

## 随机数范围

```js
const random = (min, max) => {
  if (arguments.length === 2) {
    return Math.floor(min + Math.random() * (max + 1 - min))
  }
  return null
}
```

## 数字千分位

```js
/**
 * 数字千分位
 * @param {Number|String} number 数字
 * @param {Number|String} fix 保留几位小数 no-按原数据返回
 * @returns 千分位之后的结果
 */
exports.toThousands = function (number, fix = 'no') {
  const numberTemp =
    fix === 'no' ? String(number || 0) : Number(number || 0).toFixed(fix)
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

## randomNumberInRange：生成指定范围的随机小数

```js
const randomNumberInRange = (min, max) => Math.random() * (max - min) + min;

randomNumberInRange(2, 10); // 6.0211363285087005
```

## round：四舍五入到指定位数

```js
const round = (n, decimals = 0) => Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

round(1.005, 2); // 1.01
```

## toCurrency：简单的货币单位转换

```js
const toCurrency = (n, curr, LanguageFormat = undefined) =>
  Intl.NumberFormat(LanguageFormat, { style: 'currency', currency: curr }).format(n);
toCurrency(123456.789, 'EUR'); // €123,456.79
toCurrency(123456.789, 'USD', 'en-us'); // $123,456.79  
toCurrency(123456.789, 'USD', 'fa'); // ۱۲۳٬۴۵۶٫۷۹
toCurrency(322342436423.2435, 'JPY'); // ¥322,342,436,423 
```
