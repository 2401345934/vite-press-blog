---
createTime: 2022/10/11
tag: 'js'
---
# JSON stringify 特性

## JSON.stringify()

### JSON.stringify() 第一大特性总结

* undefined、任意的函数以及 symbol 作为对象属性值时 JSON.stringify() 对跳过（忽略）它们进行序列化
* undefined、任意的函数以及 symbol 作为数组元素值时，JSON.stringify() 将会将它们序列化为 null
* undefined、任意的函数以及 symbol 被 JSON.stringify() 作为单独的值进行序列化时，都会返回 undefined

### JSON.stringify() 第二大特性

* 非数组对象的属性不能保证以特定的顺序出现在序列化后的字符串中。

```javascript
const data = {
  a: "aaa",
  b: undefined,
  c: Symbol("dd"),
  fn: function() {
    return true;
  },
  d: "ddd"
};
JSON.stringify(data); // 输出：？
// "{"a":"aaa","d":"ddd"}"

JSON.stringify(["aaa", undefined, function aa() {
    return true
  }, Symbol('dd'),"eee"])  // 输出：？

// "["aaa",null,null,null,"eee"]"

```

### JSON.stringify() 第三大特性

* 转换值如果有 toJSON() 函数，该函数返回什么值，序列化结果就是什么值，并且忽略其他属性的值。

```javascript
JSON.stringify({
    say: "hello JSON.stringify",
    toJSON: function() {
      return "today i learn";
    }
  })
// "today i learn"

```

### JSON.stringify()第四大特性

* JSON.stringify() 将会正常序列化 Date 的值。

```javascript
JSON.stringify({ now: new Date() });
// "{"now":"2019-12-08T07:42:11.973Z"}"
```

### JSON.stringify() 第五大特性

NaN 和 Infinity 格式的数值及 null 都会被当做 null。

```javascript

JSON.stringify(NaN)
// "null"
JSON.stringify(null)
// "null"
JSON.stringify(Infinity)
// "null"
```

### JSON.stringify() 第六大特性

关于基本类型的序列化：

* 布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。

```javascript
JSON.stringify([new Number(1), new String("false"), new Boolean(false)]);
// "[1,"false",false]"
```

### JSON.stringify() 第七大特性

关于对象属性的是否可枚举：

* 其他类型的对象，包括 Map/Set/WeakMap/WeakSet，仅会序列化可枚举的属性。

```javascript
// 不可枚举的属性默认会被忽略：
JSON.stringify(
    Object.create(
        null,
        {
            x: { value: 'json', enumerable: false },
            y: { value: 'stringify', enumerable: true }
        }
    )
);
// "{"y":"stringify"}"

```

### JSON.stringify() 第八大特性

我们都知道实现深拷贝最简单粗暴的方式就是序列化：JSON.parse(JSON.stringify())，这个方式实现深拷贝会因为序列化的诸多特性从而导致诸多的坑点：比如现在我们要说的循环引用问题。

```javascript
// 对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。
const obj = {
  name: "loopObj"
};
const loopObj = {
  obj
};
// 对象之间形成循环引用，形成闭环
obj.loopObj = loopObj;

// 封装一个深拷贝的函数
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
// 执行深拷贝，抛出错误
deepClone(obj)
/**
 VM44:9 Uncaught TypeError: Converting circular structure to JSON
    --> starting at object with constructor 'Object'
    |     property 'loopObj' -> object with constructor 'Object'
    --- property 'obj' closes the circle
    at JSON.stringify (<anonymous>)
    at deepClone (<anonymous>:9:26)
    at <anonymous>:11:13
 */
```

* 对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。
这也就是为什么用序列化去实现深拷贝时，遇到循环引用的对象会抛出错误的原因。

### JSON.stringify() 第九大特性

* 所有以 symbol 为属性键的属性都会被完全忽略掉，即便 replacer 参数中强制指定包含了它们。

```javascript
JSON.stringify({ [Symbol.for("json")]: "stringify" }, function(k, v) {
    if (typeof k === "symbol") {
      return v;
    }
  })

// undefined
```

replacer 是 JSON.stringify() 的第二个参数，我们比较少用到，所以很多时候我们会忘记 JSON.stringify() 第二个、第三个参数，场景不多，但是用的好的话会非常方便，关于 JSON.stringify() 第九大特性的例子中对 replacer 参数不明白的同学先别急，其实很简单，我们马上就会在下面的学习中弄懂。

## JSON.stringify() 第二个参数和第三个参数

### 强大的第二个参数

* 作为函数时，它有两个参数，键（key）和值（value），函数类似就是数组方法 map、filter 等方法的回调函数，对每一个属性值都会执行一次该函数（期间我们还简单实现过一个 map 函数）。
* 如果 replacer 是一个数组，数组的值代表将被序列化成 JSON 字符串的属性名。

### 华丽的第三个参数

* 如果是一个数字, 则在字符串化时每一级别会比上一级别缩进多这个数字值的空格（最多10个空格）；
* 如果是一个字符串，则每一级别会比上一级别多缩进该字符串（或该字符串的前10个字符）。
