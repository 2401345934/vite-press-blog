---
createTime: 2022/11/02
tag: '工程化,npm'
---

# 初识 npm script

## 用 npm init 快速创建项目

开始探索 npm script 之前，我们先聊聊这些 scripts 所依赖的文件 package.json，以它为基础的 npm 则是 node.js 社区蓬勃发展的顶梁柱。

npm 为我们提供了快速创建 package.json 文件的命令 npm init，执行该命令会问几个基本问题，如包名称、版本号、作者信息、入口文件、仓库地址、许可协议等，多数问题已经提供了默认值，你可以在问题后敲回车接受默认值：

```js
package name: (hello-npm-script)
version: (0.1.0)
description: hello npm script
entry point: (index.js)
test command:
git repository:
keywords: npm, script
license: (MIT)
```

上面的例子指定了描述（description）和关键字（keywords）两个字段，基本问题问完之后 npm 会把 package.json 文件内容打出来供你确认：

```json
{
  "name": "hello-npm-script",
  "version": "0.1.0",
  "description": "hello npm script",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "npm",
    "script"
  ],
  "author": "wangshijun <wangshijun2010@gmail.com> (<https://github.com/wangshijun>)",
  "license": "MIT"
}
```

按回车确认就能把package.json 的内容写到文件系统，如果要修改 package.json，可以直接用编辑器编辑，或者再次运行 npm init，npm 默认不会覆盖修改里面已经存在的信息。

可以使用 npm init -f（意指 --force，或者使用 --yes）告诉 npm 直接跳过参数问答环节，快速生成 package.json。

## 初始化 package.json 时的字段默认值是可以自己配置的

我上面的默认版本号是 0.1.0，而 npm 默认的版本号是 0.0.1，可以用下面的命令去修改默认配置：

```js
npm config set init.author.email "wangshijun2010@gmail.com"
npm config set init.author.name "wangshijun"
npm config set init.author.url "http://github.com/wangshijun"
npm config set init.license "MIT"
npm config set init.version "0.1.0"
```

## 用 npm run 执行任意命令

npm 是如何管理和执行各种 scripts 的呢？作为 npm 内置的核心功能之一，npm run 实际上是 npm run-script 命令的简写。当我们运行 npm run xxx 时，基本步骤如下：

注意，这是简化的流程

* 从 package.json 文件中读取 scripts 对象里面的全部配置；
* 以传给 npm run 的第一个参数作为键，本例中为 xxx，在 scripts 对象里面获取对应的值作为接下来要执行的命令，如果没找到直接报错；
* 在系统默认的 shell 中执行上述命令，系统默认 shell 通常是 bash，windows 环境下可能略有不同，稍后再讲。

如果不带任何参数执行 npm run，它会列出可执行的所有命令

## 创建自定义 npm script

在新项目或者任何现有项目中添加 eslint 自定义脚本的步骤如下：

### 1. 准备被检查的代码

```js
const str = 'some value';

function fn(){
    console.log('some log');
}
```

### 2. 添加 eslint 依赖

执行如下命令将 eslint 添加为 devDependencies：

```js
npm install eslint -D
```

### 3. 初始化 eslint 配置

用 eslint 做检查需要配置规则集，存放规则集的文件就是配置文件，使用如下文件生成配置文件：

```js
./node_modules/.bin/eslint --init
```

在命令行提示中选择 Answer questions about your style

回车后根目录下就有了 .eslintrc.js 配置文件：

```js
module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: 'eslint:recommended',
  rules: {
    indent: ['error', 4],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
  },
};
```

### 4. 添加 eslint 命令

在 package.json 的 scripts 字段中新增命令 eslint：

```json
{
  "scripts": {
    "eslint": "eslint *.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
}
```

### 5. 运行 eslint 命令

执行 npm run eslint
