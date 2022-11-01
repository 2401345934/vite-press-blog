---
createTime: 2022/10/29
tag: '性能优化'
---
# 减少引用类型内存访问

## 案例

### 请看为何 aaaaa 比 bbbbb 慢

```javascript

{
  (function () {
    let sum = [0]
    console.time("aaaaa")
    for (let i = 0; i <= 1000; i++) {
      sum[0] += i
    }
    console.log(sum);
    console.timeEnd("aaaaa")
  })()

}
{

  (function () {
    let sum = [0]
    let tmp = 0
    console.time("bbbbb")
    for (let i = 0; i <= 1000; i++) {
      tmp += i
    }
    sum[0] = tmp
    console.log(sum);
    console.timeEnd("bbbbb")
  })()
}
```

### 运行

### 原因

* 消除不必要的内存访问
  * 对于一个函数  内部变量一般是存储在寄存器中  可以把寄存器看成一个 CPU 和内存之间的一个缓存
  * 程序访问寄存器的速度永远快于访问内存
  * 对于值为数组的变量   其在寄存器中的值是数组在内存中的地址   所以更改或访问其他数据需要访问内存
* aaaaa 慢 是因为  多次访问了内存
  * 首选读取 sum[0]
  * 写回 sum [i]
* bbbbb 快 是因为通过临时变量 减少访问内存速度
  * 通过临时指针 tmp 来进行访问达到优化
