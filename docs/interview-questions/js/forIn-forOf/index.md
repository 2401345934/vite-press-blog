---
createTime: 2022/10/11
tag: 'js'
---
# for-in vs for-of

## for...in的特点

* for … in 循环返回的值都是数据结构的 键值名(即下标)。
* 遍历对象返回的对象的key值,遍历数组返回的数组的下标(key)。
* for … in 循环不仅可以遍历数字键名,还会遍历原型上的值和手动添加的其他键。
* 特别情况下, for … in 循环会以看起来任意的顺序遍历键名
* for… in 的 常规属性和 排序属性：
在ECMAScript规范中定义了 「数字属性应该按照索引值⼤⼩升序排列，字符串属性根据创建时的顺序升序排列。」在这⾥我们把对象中的数字属性称为 「排序属性」，在V8中被称为 elements，字符串属性就被称为 「常规属性」， 在V8中被称为 properties。
也就是说：for...in会先按照排序属性的数字大小从小到大依次遍历，然后再遍历常规属性，常规属性遍历顺序可能不是实际的内部顺序

### 代码示例

```javascript

function Foo() {
 this[99] = 'test-100'
 this[1] = 'test-1'
 this["B"] = 'bar-B'
 this[40] = 'test-50'
 this[9] = 'test-9'
 this[10] = 'test-8'
 this[3] = 'test-3'
 this[8] = 'test-5'
 this["A"] = 'bar-A'
 this["C"] = 'bar-C'
}
var bar = new Foo()
for(key in bar){
 console.log(`index:${key} value:${bar[key]}`)
}
/*输出结果为：
index:1 value:test-1
index:3 value:test-3
index:8 value:test-8
index:9 value:test-9
index:10 value:test-10
index:40 value:test-40
index:99 value:test-99
index:B value:bar-B
index:A value:bar-A
index:C value:bar-C
*/
```

### for… in遍历数组的毛病

* index索引为字符串型数字，不能直接进行几何运算
* 遍历顺序有可能不是按照实际数组的内部顺序
* 使用for… in会遍历数组/对象所有的可枚举属性，包括原型。
所以for… in更适合遍历对象，不要使用for… in遍历数组。

## for… of 特点

for… of 循环用来获取一对键值对中的 值,而 for… in 获取的是 键名

* 一个数据结构只要部署了Symbol.iterator属性，就被视为具有iterator接口，就可以用for…of循环遍历它的成员。也就是说，for…of循环内部调用的是数据结构的Symbol.iterator方法。
* for… of 不同与 forEach, 它可以与 break、continue和return 配合使用,也就是说 for… of 循环可以随时退出循环。
* for…of循环可以使用的范围包括数组、Set 和 Map 结构、某些类似数组的对象（比如arguments对象、DOM NodeList 对象）、Generator 对象，以及字符串，但是不能遍历对象，因为没有迭代器对象，但如果想遍历对象的属性，你可以用for… in循环（这也是它的本职工作）或搭配内建的Object.keys()方法使用，

### 代码示例

```javascript
var obj={
　　a:1,
　　b:2,
　　c:3
}
for (var key of Object.keys(obj)) {
  console.log(key + ": " + obj[key]);
}
//a:1 b:2 c:3
```

### for... of遍历类数组对象代码示例

```javascript
  // 字符串
  var str = "hello";
  for (let s of str) {
    console.log(s); // h e l l o
  }
// DOM NodeList对象
  let paras = document.querySelectorAll("p");
  for (let p of paras) {
   p.classList.add("test");
  }
// arguments对象
  function Args() {
    for (let x of arguments) {
      console.log(x);
    }
  }
Args('a', 'b');// 'a' 'b'
```

## 总结

* 无论是for...in还是for...of语句都是迭代一些东西。它们之间的主要区别在于它们的迭代方式。
* 对于for... in循环，由于并非所有厂商都遵循相同的实现方式，因此仍未指定一个明确的枚举顺序；而Object.key()方法和JSON.stringify()方法都指明与for... in使用相同的枚举顺序，因此它们的枚举顺序目前也不明晰
* for...of 语句遍历可迭代对象定义要迭代的数据（内建的可迭代对象定义要迭代的数据为键值，这个可迭代对象可以自己更改，不过如非必要最好不要这么做）。
for... in
* 一般用于遍历对象自身的和继承的可枚举属性。以及对象从构造函数原型中继承的属性。对于每个不同的属性，语句都会被执行。
* 不建议使用for... in 遍历数组，因为输出的顺序是不固定的。
* 如果迭代的对象的变量值是null或者undefined, for... in不执行循环体，建议在使用for... in循环之前，先检查该对象的值是不是null或者undefined
for... of
* for…of 语句在可迭代对象（包括 Arry，Map，Seta，String，TypedArray，arguments 对象等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句
* for…of 语句遍历可迭代对象定义要迭代的数据（非自定义属性）
* for…of循环可以使用的范围包括数组、Set 和 Map 结构、某些类似数组的对象、Generator 对象，以及字符串。

### 总结来说

for... of 常用于遍历数组
for... in 常用于遍历对象
