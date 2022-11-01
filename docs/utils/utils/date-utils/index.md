---
createTime: 2022/10/29
tag: 'utils'
---
# 时间 utils

## 两个日期之间的日差

```js
const dayDiff = (date1, date2) =>
  Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000)

dayDiff(new Date('2021-10-21'), new Date('2022-02-12'))
// Result: 114
```

## 获取前几天后几天的时间

```js
/**
 * 获取前几天后几天的时间
 * @param {String|Date} date 参照日期
 * @param {Number} day 负数表示前几天，正数表示后几天
 * @returns 返回天数
 */
const getNextDate = function (date, day) {
  const dd = new Date(date)
  dd.setDate(dd.getDate() + day)
  const y = dd.getFullYear()
  const m = padStartZero(dd.getMonth() + 1)
  const d = padStartZero(dd.getDate())
  return `${y}-${m}-${d}`
}
```

## 获取前三个月的时间

```js
/**
 * 获取前三个月的时间
 * @returns dateObj { startTime, endTime }
 */
const getLast3Month = function () {
  const now = new Date()
  const year = now.getFullYear()
  let month = now.getMonth() + 1
  const day = now.getDate()
  const dateObj = { startTime: '', endTime: `${year}-${month}-${day}` }

  if (month <= 3) {
    const month3 = 12 - (3 - month)
    const start3MonthDay = new Date(year - 1, month3, 0).getDate() // 3个月前所在月的总天数
    dateObj.startTime = `${year - 1}-${month3}-${
      start3MonthDay < day ? start3MonthDay : day
    }`
  } else {
    const endMonthDay = new Date(year, month, 0).getDate() // 当前月的总天数
    const start3MonthDay = new Date(year, month - 3, 0).getDate()
    if (start3MonthDay < day) {
      // day < endMonthDay 主要是针对二月份
      dateObj.startTime = `${year}-${month - 3}-${
        day < endMonthDay
          ? start3MonthDay - (endMonthDay - day)
          : start3MonthDay
      }`
    } else {
      dateObj.startTime = `${year}-${month - 3}-${day}`
    }
  }

  dateObj.startTime = datePadZero(dateObj.startTime)
  dateObj.endTime = datePadZero(dateObj.endTime)
  return dateObj
}
```

## 年月日日期前添加 0

```js
/**
 * 年月日日期前添加0 2022-3-30-->2022-03-30
 * @param {String} str 日期字符串
 * @returns 格式化后的日期字符串
 */
const datePadZero = function (str) {
  return str
    .split('-')
    .map((num) => padStartZero(num))
    .join('-')
}
```

## 判断是否为同一天

```js
const isSameDay = (startTime, endTime) => {
  return new Date(startTime).toDateString() === new Date(endTime).toDateString()
}
```

## 根据时间戳返回天、时、分、秒

```js
const countdownFormat = (distance) => {
  if (distance > 0) {
    // 天
    const day = Math.floor(distance / 86400000)
    distance -= day * 86400000
    // 时
    const hour = Math.floor(distance / 3600000)
    distance -= hour * 3600000
    // 分
    const minute = Math.floor(distance / 60000)
    distance -= minute * 60000
    // 秒
    const second = Math.floor(distance / 1000)
    distance -= second * 1000
    return {
      d: parseInt(day / 10) + '' + parseInt(day % 10),
      h: parseInt(hour / 10) + '' + parseInt(hour % 10),
      m: parseInt(minute / 10) + '' + parseInt(minute % 10),
      s: parseInt(second / 10) + '' + parseInt(second % 10),
    }
  } else {
    return {
      d: '00',
      h: '00',
      m: '00',
      s: '00',
    }
  }
}
```

## 查询某天是否为工作日

```js
const isWeekday = (date) => date.getDay() % 6 !== 0

isWeekday(new Date(2022, 03, 11))
// true
```

## 转换华氏/摄氏

```js
// 将华氏温度转换为摄氏温度
const fahrenheitToCelsius = (fahrenheit) => ((fahrenheit - 32) * 5) / 9

fahrenheitToCelsius(50)
// 10
// true

// 将摄氏温度转华氏温度
const celsiusToFahrenheit = (celsius) => (celsius * 9) / 5 + 32

celsiusToFahrenheit(100)
// 212
```
