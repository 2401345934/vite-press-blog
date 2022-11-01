---
createTime: 2022/10/11
tag: 'js'
---
# 常用的js 函数 -手写

## 手写 map

```javascript
function myMap (fn,content)  {
    let arr = Array.prototype.slice.call(this);
    let newArr = [];
    for(let i = 0 ; i<arr.length;i++) {
        // 防止稀疏数组
        if(!arr.hasOwnProperty(i)) continue;
        newArr[i] = fn.call(content,arr[i],i,this)
    }
    return newArr
}
Array.prototype.myMap = myMap
console.log([1,2,3].myMap(d => d * 2))

```

## 手写 filter

```javascript
function myFilter (fn,content)  {
    let arr = Array.prototype.slice.call(this);
    let newArr = [];
    for(let i = 0 ; i<arr.length;i++) {
        // 防止稀疏数组
        if(!arr.hasOwnProperty(i)) continue;
         fn.call(content,arr[i],i,this) && newArr.push(arr[i])
    }
    return newArr
}
Array.prototype.myFilter = myFilter
console.log([1,2,3].myFilter((d,i,arr) => {
    console.log(d,i,arr)
    return d === 2
}))

```

## 手写 some

```javascript
function mySome (fn,content)  {
    let arr = Array.prototype.slice.call(this);
    let newArr = [];
    for(let i = 0 ; i<arr.length;i++) {
        // 防止稀疏数组
        if(!arr.hasOwnProperty(i)) continue;
         if(fn.call(content,arr[i],i,this)) return true
    }
    return false
}
Array.prototype.mySome = mySome
console.log([1,2,3].mySome((d,i,arr) => {
    return d === 3
}))

```

## 手写 every

```javascript
function myEvery (fn,content)  {
    let arr = Array.prototype.slice.call(this);
    let newArr = [];
    for(let i = 0 ; i<arr.length;i++) {
        // 防止稀疏数组
        if(!arr.hasOwnProperty(i)) continue;
         if(fn.call(content,arr[i],i,this)) {
             newArr.push(arr[i])
         }
    }
    return newArr.length === arr.length
}
Array.prototype.myEvery = myEvery
console.log([1,2,3].myEvery((d,i,arr) => {
    return d < 3
}))

```

## 手写 find

```js
function myFind (fn,content)  {
    let arr = Array.prototype.slice.call(this);
    let current = null;
    for(let i = 0 ; i<arr.length;i++) {
        // 防止稀疏数组
        if(!arr.hasOwnProperty(i)) continue;
         if(fn.call(content,arr[i],i,this) && !current) {
             current = arr[i];
             break;
         }
    }
    return current
}
Array.prototype.myFind = myFind
console.log([1,2,3].myFind((d,i,arr) => {
    return d < 4 && d !==1
}))

```

## 手写 findIndex

```javascript
function myFindIndex (fn,content)  {
    let arr = Array.prototype.slice.call(this);
    let current = null;
    for(let i = 0 ; i<arr.length;i++) {
        // 防止稀疏数组
        if(!arr.hasOwnProperty(i)) continue;
         if(fn.call(content,arr[i],i,this) && !current) {
             current = i
             break;
         }
    }
    return current
}
Array.prototype.myFindIndex = myFindIndex
console.log([1,2,3].myFindIndex((d,i,arr) => {
    return d < 4 && d !==1
}))

```

## 手写 new

```javascript
function myNew(){
  // 1. 创建一个空对象
  let targetObj={}
  let [constructor,...args]=[...arguments]
  targetObj.__proto__=constructor.prototype
  let result =constructor.apply(targetObj,args)
  if(result&&(typeof (result)==='object'||typeof (result)==='function')){
      return result
  }
  return targetObj
}
```

## 手写 call

```javascript
Function.prototype.myCall = function (content) {
    if(typeof this !== 'function') {
        throw new TypeError("myCall Error")
    }
    content = content || window;
    content.fn = this;
    const arg = [...arguments].slice(1);
    const result = content.fn(...arg);
    delete content.fn;
    return  result;
}
```

## 手写 apply

```js
Function.prototype.myApply = function (content) {
    if(typeof this !== 'function') {
        throw new TypeError("myCall Error")
    }
    content = content || window;
    content.fn = this;
    let result =  arguments[1] ?content.fn(...arguments[1]) : content.fn()
    delete content.fn;
    return  result;
}
```

## 手写 bind

```javascript
Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  const _this = this
  const args = [...arguments].slice(1)
  // 返回一个函数
  return function F() {
    // 因为返回了一个函数，我们可以 new F()，所以需要判断
    if (this instanceof F) {
      return new _this(...args, ...arguments)
    }
    return _this.apply(context, args.concat(...arguments))
  }
}
```

## 手写instanceof

```js
function myInstanceof(left, right) {
  let prototype = right.prototype
  left = left.__proto__
  while (true) {
    if (left === null || left === undefined)
      return false
    if (prototype === left)
      return true
    left = left.__proto__
  }
}
```
