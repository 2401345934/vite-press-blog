---
createTime: 2022/10/29
tag: 'utils'
---
# url-utils

## 追加 url 参数

```javascript
const appendQuery = (url, key, value) => {
  let options = key
  if (typeof options == 'string') {
    options = {}
    options[key] = value
  }
  options = $.param(options)
  if (url.includes('?')) {
    url += `&${options}`
  } else {
    url += `?${options}`
  }
  return url
}
```

## 根据 url 地址下载

```javascript
const download = (url) => {
  let isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1
  let isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1
  if (isChrome || isSafari) {
    let link = document.createElement('a')
    link.href = url
    if (link.download !== undefined) {
      let fileName = url.substring(url.lastIndexOf('/') + 1, url.length)
      link.download = fileName
    }
    if (document.createEvent) {
      let e = document.createEvent('MouseEvents')
      e.initEvent('click', true, true)
      link.dispatchEvent(e)
      return true
    }
  }
  if (url.indexOf('?') === -1) {
    url += '?download'
  }
  window.open(url, '_self')
  return true
}
```

## 从 url 获取参数并转为对象

```javascript
const getParameters = (URL) =>
  JSON.parse(
    `{"${decodeURI(URL.split('?')[1])
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')}"}`
  )
getParameters('https://www.google.com.hk/search?q=js+md&newwindow=1')
// {q: 'js+md', newwindow: '1'}
```

## currentURL：返回当前链接url

```javascript
const currentURL = () => window.location.href;

currentURL(); // 'https://juejin.cn'
```
