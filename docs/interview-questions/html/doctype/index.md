---
createTime: 2022/12/23
tag: 'html,面试题'
---
# DOCTYPE

1.DOCTYPE 是什么
-------------

DOCTYPE 是一种通用标记语言的文档声明类型，它主要作用是告诉浏览器的解析器，应该以什么样的**文档类型定义**来解析文档，不同的**渲染模式**会影响浏览器对 CSS 代码甚至 JavaScript 脚本的解析。它必须声明在文档的第一行。

2.文档类型定义
--------

Document Type Definition，缩写 DTD。 定义了 XML 或 HTML 的特定版本中允许有什么，不允许有什么，在渲染解析页面的时候，浏览器会根据这些规则检查页面的有效性并采取相应的措施。

3.常见的 DOCTYPE 声明
----------------

### HTML 5

因为 HTML 5 不基于 SGML，所以不需要引用DTD，但是需要DOCTYPE来规范浏览器的行为，让浏览器按照 W3C 的标准解析渲染页面。

```
<!DOCTYPE html>

```

### HTML 4.01

* Strict 严格```
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">

    ```

* Transitional 过渡```
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

    ```

* Frameset 框架```
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">

    ```

### XML 1.0

* Strict 严格```
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

    ```

* Transitional 过渡```
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

    ```

* Framset 框架```
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">

    ```

4.标准模式与怪异模式
-----------

浏览器渲染页面的两种模式：标准模式和怪异模式。可用`document.compatMode`来获取。

* CSS1Compat：标准模式（严格模式）（Strict mode），是默认模式，浏览器按照 W3C 标准解析渲染页面。在标准模式中，浏览器以其支持的最高标准呈现页面。
* BackCompat：怪异模式（混杂模式）（Quick mode），浏览器使用自己的方式解析渲染页面。在怪异模式中，页面以一种比较宽松的向后兼容的方式显示。

### 如何区分

浏览器解析时到底使用严格模式还是混杂模式，与网页中的 DTD 直接相关。

**严格 DTD ——严格模式** 。如果文档包含严格的 DOCTYPE ，那么它一般以严格模式呈现。

**有 URI 的过渡 DTD ——严格模式；没有 URI 的过渡 DTD ——混杂模式**。含过渡 DTD 和 URI 的 DOCTYPE ，也以严格模式呈现，但有过渡 DTD 而没有 URI （统一资源标识符，就是声明最后的地址）会导致页面以混杂模式呈现。

**DTD不存在或者格式不正确——混杂模式**。不存在或形式不正确会导致文档以混杂模式呈现。

**HTML5 没有严格和混杂之分**。HTML5 没有 DTD ，因此也就没有严格模式与混杂模式的区别，HTML5 有相对宽松的语法，实现时，已经尽可能大的实现了向后兼容。

### 意义

严格模式与混杂模式存在的意义与其来源密切相关，如果说只存在严格模式，那么许多旧网站必然受到影响，如果只存在混杂模式，那么会回到当时浏览器大战时的混乱，每个浏览器都有自己的解析模式。

### 常见区别

严格模式下 —— W3C 标准的盒模型 怪异模式下 —— IE 盒模型
