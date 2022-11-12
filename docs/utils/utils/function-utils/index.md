---
createTime: 2022/10/29
tag: 'utils'
---
# 函数 utils

## 递归处理输入的函数

```js
function continous(reducer) {
  return function (...args) {
    return args.reduce((a, b) => reducer(a, b))
  }
}

const add = continous((a, b) => a + b)
const multiply = continous((a, b) => a * b)

console.log(add(1, 2, 3, 4)) // 1 + 2 + 3 + 4 = 10

console.log(multiply(1, 2, 3, 4, 5)) // 1 * 2 * 3 * 4 * 5 = 120
```

## 批量处理函数

```js
function batch(fn) {
  return function (subject, ...args) {
    if (Array.isArray(subject)) {
      return subject.map((s) => {
        return fn.call(this, s, ...args)
      })
    }
    return fn.call(this, subject, ...args)
  }
}

const setStyle = batch((el, key, value) => {
  el.style[key] = value
})

const items = document.querySelectorAll('li:nth-child(2n+1)')

setStyle([...items], 'color', 'red')
```

## 通用函数拦截器

```js
function intercept(fn, { beforeCall = null, afterCall = null }) {
  return function (...args) {
    if (!beforeCall || beforeCall.call(this, args) !== false) {
      // 如果beforeCall返回false，不执行后续函数
      const ret = fn.apply(this, args)
      if (afterCall) return afterCall.call(this, ret)
      return ret
    }
  }
}
```

## 函数重载

```js
function createOverloaded(fnList) {
    let curFn = null
    function addMethod(fn) {
        const old = curFn
        return function () {
            if (fn.length === arguments.length) return fn.apply(this, arguments)
            else if (typeof old === 'function') return old.apply(this, arguments)
        }
    }
    fnList.map(fn => {
        curFn = addMethod(fn)
    })
    return curFn
 }
 const fn1 = createOverloaded([
     (name) => console.log(`我是${name}`),
     (name, age) => console.log(`我是${name},今年${age}岁`),
     (name, age, sport) => console.log(`我是${name},今年${age}岁,喜欢的运动是${sport}`),
     `后面可以根据需要，继续往下添加重载方法`
 ])

```

## 函数结果缓存

```js
function fnCache(fn) {
  const cache = {};
  return function (...args) {
    // 将参数变为字符串，作为缓存key
    const key = JSON.stringify(args);
    if(key in cache) {
      return cache[key];
    }
    return cache[key] = fn.apply(this, args);
  }
}
// 用法示例：
function sum() { ...}
const cacheSum = fnCache(sum);

// 我们还可以将key的生成方式暴露出去
function fnCache(fn, keyCreator) {
  const cache = {};
  return function (...args) {
    // 优先自定义的key生成函数
    const key = keyCreator ? keyCreator(args) : JSON.stringify(args);
    if(key in cache) {
      return cache[key];
    }
    return cache[key] = fn.apply(this, args);
  }
}
```
