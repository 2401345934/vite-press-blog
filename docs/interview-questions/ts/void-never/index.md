---
createTime: 2022/10/18
tag: 'ts'
---
# void  和 never  类型的 区别

* void 类型 代表返回值 是空    只要不写 return  语句都可以  或者不返回东西  
* void 类型 可以返回 undefined  但是不能返回 null
* never 类型 表示  不能有任何返回值   这就需要在函数中 直接报错

```ts
let a = (): void => {

}

a = (): never => {
  throw Error()
}

```
