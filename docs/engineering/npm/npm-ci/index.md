---
createTime: 2022/11/08
tag: '工程化,npm,cicd'
---
# npm ci和npm install区别

npm大家肯定都使用过，可能会有一些不经常使用的命令，npm ci和npm install都可以用来安装依赖，他们之间有什么区别呢？[官方文档](https://docs.npmjs.com/cli/v7/commands/npm-ci)

`npm ci` 和 `npm install`类似，不同之处在于`npm ci`旨在用于自动化环境，例如测试平台、持续集成和部署，或者您希望确保对依赖项进行全新安装。

`npm ci` 在以下情况下会明显更快：

* 有一个 package-lock.json 或 npm-shrinkwrap.json 文件
* node\_modules 不存在或为空目录

`npm install` 和 `npm ci` 的主要区别:

* 项目必须有 package-lock.json 或 npm-shrinkwrap.json，否则无法使用`npm ci`
* 如果 package-lock.json 中的依赖项与 package.json 中的依赖项不匹配，则 `npm ci` 将退出并显示错误，而不是更新 package-lock.json。
* `npm ci` 一次只能安装整个项目：无法添加单个依赖项。
* `npm ci` 开始安装之前自动删除node\_modules文件夹。
* `npm ci`不会更改package.json和package-lock.json

##### 由此我们知道，当我们进行CI/CD或生产发布时，最好使用`npm ci`，它会严格按照package-lock.json中指定版本进行安装，并且会对比package-lock.json和package.json依赖，防止由错误的依赖版本造成的故障
