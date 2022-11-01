---
createTime: 2022/10/11
tag: 'js'
---

# URL 转码 和解码

## 1. escape 和 unescape

* escape()不能直接用于URL编码，它的真正作用是返回一个字符的Unicode编码值。
* 采用unicode字符集对指定的字符串除0-255以外进行编码。所有的空格符、标点符号、特殊字符以及更多有联系非ASCII字符都将被转化成%xx格式的字符编码（xx等于该字符在字符集表里面的编码的16进制数字）。比如，空格符对应的编码是%20。

### escape不编码字符有69个：*，+，-，.，/，@，_，0-9，a-z，A-Z

* escape()函数用于js对字符串进行编码，不常用。

```javascript
　var url = "http://localhost:8080/pro?a=1&b=张三&c=aaa";
　　escape(url)  -->  ///   http%3A//localhost%3A8080/pro%3Fa%3D1%26b%3D%u5F20%u4E09%26c%3Daaa  
```

## 2. encodeURI 和 decodeURI

* 把URI字符串采用UTF-8编码格式转化成escape各式的字符串。

### encodeURI不编码字符有82个：!，#，$，&，'，(，)，*，+，,，-，.，/，:，;，=，?，@，_，~，0-9，a-z，A-Z

* encodeURI()用于整个url编码

``` js
　　var url = "http://localhost:8080/pro?a=1&b=张三&c=aaa";
　　encodeURI(url)  -->   // <http://localhost:8080/pro?a=1&b=%E5%BC%A0%E4%B8%89&c=aaa>
```

## 3. encodeURIComponent 和 decodeURIComponent

### 与encodeURI()的区别是，它用于对URL的组成部分进行个别编码，而不用于对整个URL进行编码

因此，"; / ? : @ & = + $ , #"，这些在encodeURI()中不被编码的符号，在encodeURIComponent()中统统会被编码。至于具体的编码方法，两者是一样。把URI字符串采用UTF-8编码格式转化成escape格式的字符串。
encodeURIComponent() 用于参数的传递，参数包含特殊字符可能会造成间断。

### 例1

``` js
　　var url = "http://localhost:8080/pro?a=1&b=张三&c=aaa";
　　encodeURIComponent(url) --> /// http%3A%2F%2Flocalhost%3A8080%2Fpro%3Fa%3D1%26b%3D%E5%BC%A0%E4%B8%89%26c%3Daaa

```

### 例2

``` js

　var url = "<http://localhost:8080/pp?a=1&b>="+ paramUrl,
　　var paramUrl = "http://localhost:8080/aa?a=1&b=2&c=3";
　　// 应该使用encodeURIComponent()进行转码　　
　　encodeURIComponent(paramUrl) --> /// <http://localhost:8080/pp?a=1&b=http%3A%2F%2Flocalhost%3A8080%2Faa%3Fa%3D1%26b%3D2%23%26c%3D3>

```
