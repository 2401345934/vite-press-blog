---
createTime: 2022/11/02
tag: '工程化,npm'
---
# 用 node.js 脚本替代复杂的 npm script

## 1. 安装 shelljs 依赖

使用如下命令安装 shelljs 到项目依赖中：

```js
npm i shelljs -D
```

此外，我们计划使用 chalk 来给输出加点颜色，让脚本变的更有趣，同样安装到 devDependencies 里面：

```js
npm i chalk -D
```

## 2. 创建 Node.js 脚本

```js
touch scripts/cover.js
```

## 3. 用 Node.js 实现同等功能

shelljs 为我们提供了各种常见命令的跨平台支持，比如 cp、mkdir、rm、cd 等命令，此外，理论上你可以在 Node.js 脚本中使用任何 npmjs.com 上能找到的包。清理归档目录、运行测试、归档并预览覆盖率报告的完整 Node.js 代码如下：

```js
const { rm, cp, mkdir, exec, echo, env } = require('shelljs');
const chalk = require('chalk');
const npm_package_version = env['npm_package_version'];

console.log(chalk.green('1. remove old coverage reports...'));
rm('-rf', 'coverage');
rm('-rf', '.nyc_output');

console.log(chalk.green('2. run test and collect new coverage...'));
exec('nyc --reporter=html npm run test');

console.log(chalk.green('3. archive coverage report by version...'));
mkdir('-p', 'coverage_archive/' + npm_package_version);
cp('-r', 'coverage/*', 'coverage_archive/' + npm_package_version);

console.log(chalk.green('4. open coverage report for preview...'));
exec('npm-run-all --parallel cover:serve cover:open');
```
