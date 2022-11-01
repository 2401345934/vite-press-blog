---
createTime: 2022/10/18
tag: 'ts'
---
# Array 和 tuple 的区别

## 数组一般只限制集合的类型  但是不会限制你某个位置的元素的类型  只要符合 集合类型限制就可以

```ts

let arr: (string | number | boolean)[] = ['1', 1, false]
arr[0] = 1
console.log(arr);

```

## 元祖 tuple 可以限制 集合中 每个位置的类型

```ts
let tuple: [string, number, boolean] = ['1', 1, false]
tuple[0] = 1 // err  元祖中 第一个元素必须是 string
tuple[0] = '12313'
console.log(arr);

```
