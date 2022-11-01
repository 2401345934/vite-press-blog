---
createTime: 2022/10/18
tag: 'ts'
---
# unknown 和  any 的区别

* any 类型 是任何类型可以直接使用  但是要尽量不使用  因为使用any过多 会导致 失去 ts 的类型检查意义
* unknown 类型 代表我们不知道他是什么类型   但是他有类型 无法直接使用
  * 要使用  unknown 类型 的话 需要配合 类型断言的方式来使用  as

```ts
let a: any = 1
a = '1'
a = true
a = {}
a = () => { }
a = class { }

let b: unknown = 333
let c: number = b as number

```
