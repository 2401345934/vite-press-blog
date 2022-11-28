---
createTime: 2022/11/28
tag: '工程化,插件'
---
# 🔥 手撕babel插件-消灭console

## 窥探

我们的目的是`去除console.log`，我们首先需要通过[ast](https://link.juejin.cn/?target=https%3A%2F%2Fwww.astexplorer.net%2F "https://www.astexplorer.net/")查看语法树的结构。我们以下面的console为例：

> 注意 因为我们要写babel插件 所以我们选择`@babel/parser`库生成ast，因为babel内部是使用这个库生成ast的

![2.jpg](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cd0ea6dda2504ff0bdbc714df9fb3597~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

```js
console.log("我会被清除"); 
```

![3.jpg](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6fe15d7b338f4f958951faea18797379~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

## 初见AST

AST是对源码的抽象，字面量、标识符、表达式、语句、模块语法、class语法都有各自的AST。

我们这里只说下本文章中所使用的AST。

### Program

> program 是代表整个程序的节点，它有 body 属性代表程序体，存放 statement 数组，就是具体执行的语句的集合。

可以看到我们这里的body只有一个ExpressionStatement语句，即console.log。

### ExpressionStatement

> statement 是语句，它是可以独立执行的单位，expression是表达式，它俩唯一的区别是表达式执行完以后有返回值。所以ExpressionStatement表示这个表达式是被当作语句执行的。

ExpressionStatement类型的AST有一个expression属性，代表当前的表达式。

### CallExpression

> expression 是表达式，CallExpression表示调用表达式，console.log就是一个调用表达式。

CallExpression类型的AST有一个callee属性，指向被调用的函数。这里console.log就是callee的值。

CallExpression类型的AST有一个arguments属性，指向参数。这里“我会被清除”就是arguments的值。

### MemberExpression

> Member Expression通常是用于访问对象成员的。他有几种形式：

```js
a.b
a["b"]
new.target
super.b
```

我们这里的console.log就是访问对象成员log。

* 为什么MemberExpression外层有一个CallExpression呢？

实际上，我们可以理解为，MemberExpression中的某一子结构具有函数调用，那么整个表达式就成为了一个Call Expression。

MemberExpression有一个属性object表示被访问的对象。这里console就是object的值。

MemberExpression有一个属性property表示对象的属性。这里log就是property的值。

MemberExpression有一个属性computed表示访问对象是何种方式。computed为true表示\[\],false表示. 。

### Identifier

> Identifer 是标识符的意思，变量名、属性名、参数名等各种声明和引用的名字，都是Identifer。

我们这里的console就是一个identifier。

Identifier有一个属性name 表示标识符的名字

### StringLiteral

> 表示字符串字面量。

我们这里的log就是一个字符串字面量

StringLiteral有一个属性value 表示字符串的值

## 公共属性

> 每种 AST 都有自己的属性，但是它们也有一些公共的属性：

* type：AST节点的类型

* start、end、loc：start和end代表该节点在源码中的开始和结束下标。而loc属性是一个对象，有line和column属性分别记录开始和结束的行列号

* leadingComments、innerComments、trailingComments：表示开始的注释、中间的注释、结尾的注释，每个 AST 节点中都可能存在注释，而且可能在开始、中间、结束这三种位置，想拿到某个 AST 的注释就通过这三个属性。

## 如何写一个babel插件？

babel插件是作用在第二阶段即transform阶段。

transform阶段有@babel/traverse，可以遍历AST，并调用visitor函数修改AST。

我们可以新建一个js文件，其中导出一个方法，返回一个对象，对象存在一个visitor属性，里面可以编写我们具体需要修改AST的逻辑。

```js
+ export default () => {
+  return {
+    name: "@parrotjs/babel-plugin-console",
+    visitor,
+  };
+ };
```

## 构造visitor方法

> path 是记录遍历路径的 api，它记录了父子节点的引用，还有很多增删改查 AST 的 api

![4.jpg](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7b5f5ad7a92b4cc39d816189761c6472~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

```js
+ const visitor = { 
+   CallExpression(path, { opts }) {
+    //当traverse遍历到类型为CallExpression的AST时，会进入函数内部，我们需要在函数内部修改
+  }
+ };
```

> 我们需要遍历所有调用函数表达式 所以使用`CallExpression`。

## 去除所有console

我们将所有的console.log去掉

> path.get 表示获取某个属性的path

> path.matchesPattern 检查某个节点是否符合某种模式

> path.remove 删除当前节点

```js
CallExpression(path, { opts }) {
+  //获取callee的path
+  const calleePath = path.get("callee"); 
+  //检查callee中是否符合“console”这种模式
+  if (calleePath && calleePath.matchesPattern("console", true)) {
+       //如果符合 直接删除节点  
+       path.remove();
+  }
},
```

## 增加env api

一般去除console.log都是在生产环境执行 所以增加env参数

> AST的第二个参数opt中有插件传入的配置

```js
+  const isProduction = process.env.NODE_ENV === "production";
CallExpression(path, { opts }) {
....
+  const { env } = opts;
+  if (env === "production" || isProduction) {
       path.remove();
+  }
....
},
```

## 增加exclude api

我们上面去除了所有的console，不管是error、warning、table都会清除，所以我们加一个exclude api，传一个数组，可以去除想要去除的console类型

```js
....
+ const isArray = (arg) => Object.prototype.toString.call(arg) === "[object Array]";
- const { env } = opts;
+ const { env,exclude } = opts;
if (env === "production" || isProduction) {
- path.remove();  
+ //封装函数进行操作
+ removeConsoleExpression(path, calleePath, exclude);
}

+const removeConsoleExpression=(path, calleePath, exclude)=>{
+  if (isArray(exclude)) { 
+    const hasTarget = exclude.some((type) => {
+      return calleePath.matchesPattern("console." + type);
+    });
+    //匹配上直接返回不进行操作
+    if (hasTarget) return;
+  }
+  path.remove();
+}

```

## 增加commentWords api

某些时候 我们希望一些console 不被删除 我们可以给他添加一些注释 比如

```
//no remove
console.log("测试1");
console.log("测试2");//reserse
//hhhhh
console.log("测试3")

```

![5.jpg](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8594224ca5a84da484a5192d78810df7~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

如上 我们希望带有no remove前缀注释的console 和带有reserse后缀注释的console保留不被删除

之前我们提到 babel给我们提供了leadingComments（前缀注释）和trailingComments（后缀注释）我们可以利用他们 由AST可知 她和CallExpression同级，所以我们需要获取他的父节点 然后获取父节点的属性

> path.parentPath 获取父path

> path.node 获取当前节点

```js
- const { exclude, env } = opts;
+ const { exclude, commentWords, env } = opts;
+ const isFunction = (arg) =>Object.prototype.toString.call(arg) === "[object Function]";
+ // 判断是否有前缀注释 
+ const hasLeadingComments = (node) => {
+  const leadingComments = node.leadingComments;
+  return leadingComments && leadingComments.length;
+ };
+ // 判断是否有后缀注释 
+ const hasTrailingComments = (node) => {
+  const trailingComments = node.trailingComments;
+  return trailingComments && trailingComments.length;
+ };
+ //判断是否有关键字匹配 默认no remove || reserve 且如果commentWords和默认值是相斥的
+ const isReserveComment = (node, commentWords) => {
+ if (isFunction(commentWords)) {
+   return commentWords(node.value);
+ }
+ return (
+    ["CommentBlock", "CommentLine"].includes(node.type) &&
+    (isArray(commentWords)
+      ? commentWords.includes(node.value)
+      : /(no[t]? remove\b)|(reserve\b)/.test(node.value))
+  );
+};
- const removeConsoleExpression = (path, calleePath, exclude) => {
+ const removeConsoleExpression = (path, calleePath, exclude,commentWords) => {
+ //获取父path
+ const parentPath = path.parentPath;
+ const parentNode = parentPath.node;
+ //标识是否有前缀注释
+ let leadingReserve = false;
+ //标识是否有后缀注释
+ let trailReserve = false;
+ if (hasLeadingComments(parentNode)) {
+    //traverse 
+    parentNode.leadingComments.forEach((comment) => {
+      if (isReserveComment(comment, commentWords)) {
+        leadingReserve = true;
+      }
+    });
+  }
+ if (hasTrailingComments(parentNode)) {
    //traverse 
+   parentNode.trailingComments.forEach((comment) => {
+     if (isReserveComment(comment, commentWords)) {
+       trailReserve = true;
+     }
+   });
+ } 
+ //如果没有前缀节点和后缀节点 直接删除节点
+ if (!leadingReserve && !trailReserve) {
+    path.remove();
+  }
} 
```

## 细节完善

我们大致完成了插件 我们引进项目里面进行测试

```js
console.log("测试1");
//no remove
console.log("测试2"); 
console.log("测试3");//reserve
console.log("测试4");

//新建.babelrc 引入插件
{
    "plugins":[["../dist/index.cjs",{
        "env":"production"
    }]]
}
```

理论上应该移除测试1、测试4，但是我们惊讶的发现 竟然一个console没有删除！！经过排查 我们大致确定了问题所在

> 因为测试2的前缀注释同时也被AST纳入了测试1的后缀注释中了，而测试3的后缀注释同时也被AST纳入了测试4的前缀注释中了

所以测试1存在后缀注释 测试4存在前缀注释 所以测试1和测试4没有被删除

那么我们怎么判断呢？

### 对于后缀注释

我们可以判断后缀注释是否与当前的调用表达式处于同一行，如果不是同一行，则不将其归纳为后缀注释

```js
 if (hasTrailingComments(parentNode)) {

+    const { start:{ line: currentLine } }=parentNode.loc;
    //traverse
    // @ts-ignore
    parentNode.trailingComments.forEach((comment) => { 

+      const { start:{ line: currentCommentLine } }=comment.loc;

+      if(currentLine===currentCommentLine){
+        comment.belongCurrentLine=true;
+      }
+     //属于当前行才将其设置为后缀注释
-      if (isReserveComment(comment, commentWords))
+      if (isReserveComment(comment, commentWords) && comment.belongCurrentLine) {
        trailReserve = true;
      }
    });
  } 

```

我们修改完进行测试 发现测试1 已经被删除

### 对于前缀注释

那么对于前缀注释 我们应该怎么做呢 因为我们在后缀注释的节点中添加了一个变量belongCurrentLine，表示该注释是否是和节点属于同一行。

那么对于前缀注释，我们只需要判断是否存在belongCurrentLine，如果存在belongCurrentLine，表示不能将其当作前缀注释。

```js
if (hasLeadingComments(parentNode)) {
    //traverse
    // @ts-ignore
    parentNode.leadingComments.forEach((comment) => {
-      if (isReserveComment(comment, commentWords)) {
+      if (isReserveComment(comment, commentWords) && !comment.belongCurrentLine) {
        leadingReserve = true;
      }
    });
  }


```

## 发布到线上

我现已将代码发布到线上

### 安装

```
yarn add @parrotjs/babel-plugin-console

```

### 使用

举个例子：新建.babelrc

```
{
    "plugins":[["../dist/index.cjs",{
        "env":"production"
    }]]
}

```
