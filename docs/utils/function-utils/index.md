# 函数utils

## 递归处理输入的函数

``` js
function continous(reducer) {
  return function (...args) {
    return args.reduce((a, b) => reducer(a, b));
  };
}

const add = continous((a, b) => a + b);
const multiply = continous((a, b) => a * b);

console.log(add(1, 2, 3, 4)); // 1 + 2 + 3 + 4 = 10

console.log(multiply(1, 2, 3, 4, 5)); // 1 * 2 * 3 * 4 * 5 = 120

```

## 批量处理函数

``` js
function batch(fn) {
  return function (subject, ...args) {
    if(Array.isArray(subject)) {
      return subject.map((s) => {
        return fn.call(this, s, ...args);
      });
    }
    return fn.call(this, subject, ...args);
  };
}


const setStyle = batch((el, key, value) => {
  el.style[key] = value;
});

const items = document.querySelectorAll('li:nth-child(2n+1)');

setStyle([...items], 'color', 'red');
```

## 通用函数拦截器

``` js
function intercept(fn, {beforeCall = null, afterCall = null}) {
  return function (...args) {
    if(!beforeCall || beforeCall.call(this, args) !== false) {
      // 如果beforeCall返回false，不执行后续函数
      const ret = fn.apply(this, args);
      if(afterCall) return afterCall.call(this, ret);
      return ret;
    }
  };
}

```
