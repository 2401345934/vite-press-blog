---
createTime: 2022/10/18
tag: 'ts'
---
# interface 和 type 的区别

## type和interface的相同点

### 都是用来定义 对象 或者 函数 的形状

```ts
   interface example {
        name: string
        age: number
    }
    interface exampleFunc {
        (name:string,age:number): void
    }

    type example = {
        name: string
        age: number
    }
    type example = (name:string,age:number) => void
```

它俩也支持 继承，并且不是独立的，而是可以 互相 继承，只是具体的形式稍有差别
对于interface来说，继承是通过 extends 实现的，而type的话是通过 & 来实现的，也可以叫做 交叉类型

 ```ts
    type exampleType1 = {
        name: string
    }
    interface exampleInterface1 {
        name: string
    }

    type exampleType2 = exampleType1 & {
        age: number
    }
    type exampleType2 = exampleInterface1 & {
        age: number
    }
    interface exampleInterface2 extends exampleType1 {
        age: number
    }
    interface exampleInterface2 extends exampleInterface1 {
        age: number
    }
 ```

## type和interface的不同点

### 首先聊聊type可以做到，但interface不能做到的事情

* type可以定义 基本类型的别名，如 type myString = string
* type可以通过 typeof 操作符来定义，如 type myType = typeof someObj
* type可以申明 联合类型，如 type unionType = myType1 | myType2
* type可以申明 元组类型，如 type yuanzu = [myType1, myType2]

### 接下来聊聊interface可以做到，但是type不可以做到的事情

interface可以 声明合并，示例如下
如果是type的话，就会是 覆盖 的效果，始终只有最后一个type生效

```ts
    interface test {
        name: string
    }
    interface test {
        age: number
    }

    /*
        test实际为 {
            name: string
            age: number
        }
    */

```
