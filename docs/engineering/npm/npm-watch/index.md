---
createTime: 2022/11/02
tag: '工程化,npm'
---
# 文件变化时自动运行 npm script

## 单元测试自动化

幸运的是，mocha 本身支持 --watch 参数，即在代码变化时自动重跑所有的测试，我们只需要在 scripts 对象中新增一条命令即可：

```js
     "test": "cross-env NODE_ENV=test mocha tests/",
+    "watch:test": "npm t -- --watch",
     "cover": "node scripts/cover.js",
```

## 代码检查自动化

我们使用的代码检查工具 stylelint、eslint、jsonlint 不全支持 watch 模式，这里我们需要借助 onchange 工具包来实现，onchange 可以方便的让我们在文件被修改、添加、删除时运行需要的命令。

### 1. 安装项目依赖

```js
npm i onchange -D
# npm install onchange --save-dev
# yarn add onchange -D
```

### 2. 添加 npm script

按照如下提示添加 watch:lint 和 watch 两个子命令：

```js
+    "watch": "npm-run-all --parallel watch:*",
+    "watch:lint": "onchange -i \"**/*.js\" \"**/*.less\" -- npm run lint",
     "watch:test": "npm t -- --watch",
```

### 关于改动的几点说明

* watch:lint 里面的文件匹配模式可以使用通配符，但是模式两边使用了转义的双引号，这样是跨平台兼容的；
* watch:lint 里面的 -i 参数是让 onchange 在启动时就运行一次 -- 之后的命令，即代码没变化的时候，变化前后的对比大多数时候还是有价值的；
* watch 命令实际上是使用了 npm-run-all 来运行所有的 watch 子命令；
