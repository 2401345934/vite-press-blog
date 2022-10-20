
# 业务utils

## 判断图片尺寸

``` js
  function checkFile(f) {
      // 判断图片尺寸
      var img = null
      img = document.createElement('img')
      document.body.insertAdjacentElement('beforeend', img)
      img.style.visibility = 'hidden'
      img.src = f
      img.onload = () => {
        const imgwidth = img.offsetWidth
        const imgheight = img.offsetHeight
        //  ...
      }
    }
```

## 统计页面中所有标签的种类和个数

``` js
function getTagCount() {
  const tags = document.getElementsByTagName('*')
  const tagNames = []
  for (const val of tags) {
    // 把所有标签名转为小写，添加到数组中
    tagNames.push(val.tagName.toLocaleLowerCase())
  }
  const res = {}
  for (const val of tagNames) {
    if (!res[val]) {
      res[val] = 1
    } else {
      res[val]++
    }
  }
  return res
}

// test
console.log(getTagCount()) // { html: 1, head: 1, body: 1, div: 2, script: 1 }
```

## 计算首屏加载时间

``` js
console.log(new Date().getTime() - performance.timing.navigationStart)
```

## 检查设备上的触摸支持

``` js
const touchSupported = () => ('ontouchstart' in window || DocumentTouch && document instanceof DocumentTouch)
```

## 网页上获取选定的文本

``` js
const getSelectedText = () => window.getSelection().toString()
```

## 检测密码强度

``` js
// 检测密码强度
const checkPwd = str => {
  let Lv = 0
  if (str.length < 6) {
    return Lv
  }
  if (/[0-9]/.test(str)) {
    Lv++
  }
  if (/[a-z]/.test(str)) {
    Lv++
  }
  if (/[A-Z]/.test(str)) {
    Lv++
  }
  if (/[\.|-|_]/.test(str)) {
    Lv++
  }
  return Lv
}
```

## 求两个集合的交集

``` js
const intersect = (a, b) => {
  let _this = this
  a = this.unique(a)
  return this.map(a, function(o) {
    return _this.contains(b, o) ? o : null
  })
}
```

## 求两个集合的并集

``` js
 const union = (a, b) => {
  const newArr = a.concat(b)
  return this.unique(newArr)
}
```

## 动态引入js

``` js
const injectScript = src => {
  const s = document.createElement('script')
  s.type = 'text/JavaScript'
  s.async = true
  s.src = src
  const t = document.getElentsByTagName('script')[0]
  t.parentNode.insertBefore(s, t)
}

```

## 滚动到顶部

``` js
const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop)
    window.scrollTo(0, c - c / 8)
  }
}
```

## el是否在视口范围

``` js
const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
  const { top, left, right, bottom } = el.getBoundingClienRect()
  const { innerHeight, innerWidth } = window
  return partiallyVisible
    ? ((top > 0 && top < innerHeight) ||
        (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth
}
```

## 洗牌算法随机

``` js
const shuffle = arr => {
  let result = []
  let random
  while (arr.length > 0) {
    random = Math.floor(Math.random() * arr.length)
    result.push(arr[random])
    arr.splice(random, 1)
  }
  return result
}
```

## 判断类型集合

``` js
const checkStr = (str, type) => {
  switch (type) {
    case 'phone':
      //手机号码
      return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
    case 'tel':
      //座机
      return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
    case 'card':
      //身份证 
      return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
    case 'pwd':
      //密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线 
      return /^[a-zA-Z]\w{5,17}$/.test(str)
    case 'postal':
      //邮政编码
      return /[1-9]\d{5}(?!\d)/.test(str);
    case 'QQ':
      //QQ号
      return /^[1-9][0-9]{4,9}$/.test(str);
    case 'email':
      //邮箱 
      return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
    case 'money':
      //金额(小数点2位) 
      return /^\d*(?:\.\d{0,2})?$/.test(str);
    case 'URL':
      //网址
      return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str)
    case 'IP':
      //IP
      return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
    case 'date':
      //日期时间
      return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str) case 'number':
      //数字
      return /^[0-9]$/.test(str);
    case 'english':
      //英文
      return /^[a-zA-Z]+$/.test(str);
    case 'chinese':
      //中文
      return /^[\\u4E00-\\u9FA5]+$/.test(str);
    case 'lower':
      //小写 
      return /^[a-z]+$/.test(str);
    case 'upper':
      //大写
      return /^[A-Z]+$/.test(str);
    case 'HTML':
      //HTML标记
      return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
    default:
      return true;
  }
}

```

## deepClone  深拷贝

``` js
const deepClone = obj => {
  // 先检测是不是数组和Object
  let isArr = Array.isArray(obj)
  let isJson = Object.prototype.toString.call(obj) === '[object Object]'
  if (isArr) {
    // 克隆数组
    let newObj = []
    for (let i = 0; i < obj.length; i++) {
      newObj[i] = deepClone(obj[i])
    }
    return newObj
  }
  if (isJson) {
    // 克隆Object
    let newObj = {}
    for (let i in obj) {
      newObj[i] = deepClone(obj[i])
    }
    return newObj
  }
  // 不是引用类型直接返回
  return obj
}
```

## unique  去重

``` js
const unique = arr => {
  let newArr = []
  let obj = {}
  arr.forEach(item => {
    if (typeof item !== 'object') {
      if (newArr.indexOf(item) === -1) {
        newArr.push(item)
      }
    } else {
      let str = JSON.stringify(item)
      if (!obj[str]) {
        newArr.push(item)
        obj[str] = 1
      }
    }
  })
  return newArr
}
```

## 判断数据类型

``` js
const typeOf = (obj) => {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
};
typeOf(value) === 'array'
typeOf(value) === 'object'

```

## getUUID

```javascript
export function getUUID(len = 8, radix = 16) {
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  let uuid = []
  let i
  radix = radix || chars.length
  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[Math.random() * radix]
  }
  return uuid.join('')
}
```

## 判断是否是 undefined null

```javascript
export function isUndef(v) {
  return v === undefined || v === null
}
```

## 判断不是 undefined null

```javascript
export function isDef(v) {
  return v !== undefined && v !== null
}

```

## 生成随机十六进制

```javascript
const randomHexColor = () => `#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0")}`
console.log(randomHexColor());
// #a2ce5b
```

## 检查当前选项卡是否在后台

```javascript
const isTabActive = () => !document.hidden; 

isTabActive()
// true|false
```

## 检测元素是否处于焦点

``` js
const elementIsInFocus = (el) => (el === document.activeElement);

elementIsInFocus(anyElement)
// 元素处于焦点返回true，反之返回false
```

## 检查设备类型

```javascript
const judgeDeviceType =
      () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(navigator.userAgent) ? 'Mobile' : 'PC';

judgeDeviceType()  // PC | Mobile
```

## 文字复制到剪贴板

``` js
const copyText = async (text) => await navigator.clipboard.writeText(text)
copyText('单行代码 前端世界')
```

## 将 RGB 转换为十六进制

```javascript
const rgbToHex = (r, g, b) =>   "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

rgbToHex(255, 255, 255); 
//  #ffffff
```
