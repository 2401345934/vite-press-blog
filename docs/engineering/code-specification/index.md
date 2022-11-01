---
createTime: 2022/10/26
tag: '工程化'
---
# Eslint + Prettier + Husky + Commitlint+ Lint-staged 规范前端工程代码规范

## 1.代码规范

### 代码检查工具

* Eslint
* 项目集成

  ```js
  npm i eslint -D
  ```

  ```js
  npx eslint --init
  ```

  * init 命令会自动生成 .eslintrc.js

### 代码风格工具

* prettier
* 项目集成

```js
npm i prettier eslint-config-prettier eslint-plugin-prettier -D
```

* 在.eslintrc 中,extend中添加 "prettier" 解决 eslint 和 prettier 的冲突
  * 因为eslint-config-prettier新版本更新之后,只需要写一个 "prettierr" 即可,无需多言指令
* 创建 .prettierrc

```js
// 自己配置
{
  "semi": false,
  "tabWidth": 2,
  "trailingComma": "none",
  "singleQuote": true,
  "arrowParens": "avoid"
}
```

## 2.git规范

Git 有很多的 hooks, 让我们在不同的阶段,对代码进行不同的操作,控制提交到仓库的代码的规范性,和准确性, 以下只是几个常用的钩子

### 2.1 提交的代码规范

* pre-commit
* 描述: 通过钩子函数,判断提交的代码是否符合规范

### 2.2 提交的信息规范

* commit-msg
* 描述: 通过钩子函数,判断 commit 信息是否符合规范

### 2.3 提交的代码影响

* pre-push
* 描述: 通过钩子,执行测试,避免对以前的内容造成影响

### 工具

* husky
  * 操作 git 钩子的工具
* lint-staged
  * 本地暂存代码检查工具
* commitlint
  * commit 信息校验工具
* commitizen
* 辅助 commit 信息 ,就像这样,通过选择输入,规范提交信息

### 安装流程

* 1.安装代码校验依赖

```js
npm i lint-staged husky -D
```

 在package.json中添加脚本

```js
npm set-script prepare "husky install"
```

 初始化husky,将 git hooks 钩子交由,husky执行

```js
npm run prepare 
```

初始化 husky, 会在根目录创建 .husky 文件夹

```js
 npx husky add .husky/pre-commit "npx lint-staged"
```

* pre-commit 执行 npx lint-staged 指令
* 根目录创建 .lintstagedrc.json 文件控制检查和操作方式

```js
{
    "*.{js,jsx,ts,tsx}": ["prettier --write .", "eslint  --fix"],
    "*.md": ["prettier --write"]
```

* 2.安装提交信息依赖

```js
npm i commitlint @commitlint/config-conventional -D
```

```js
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

@commitlint/config-conventional 这是一个规范配置,标识采用什么规范来执行消息校验, 这个默认是Angular的提交规范

### 类型 描述

* build 编译相关的修改，例如发布版本、对项目构建或者依赖的改动
* chore 其他修改, 比如改变构建流程、或者增加依赖库、工具等
* ci 持续集成修改
* docs 文档修改
* feat 新特性、新功能
* fix 修改bug
* perf 优化相关，比如提升性能、体验
* refactor 代码重构
* revert 回滚到上一个版本
* style 代码格式修改, 注意不是 css 修改
* test 测试用例修改
    ■ commit-msg 钩子执行 消息校验
    ■ 我们也可以使用自己写的方法,设置的话使用一下指令

```js
npx husky add .husky/commit-msg 'node [dir]/filename.js' # 指定目录文件
```

* 3.安装辅助提交依赖

```js
npm i commitizen cz-conventional-changelog -D
```

安装指令和命令行的展示信息

```js
npm set-script commit "git-cz" # package.json 中添加 commit 指令, 执行 `git-cz` 指令
```

编写commit指令

```js
npx commitizen init cz-conventional-changelog --save-dev --save-exact
```

初始化命令行的选项信息,不然没有选项

* 4.自定义提交规范

```js
npm i -D commitlint-config-cz  cz-customizable
```

* 变更 commitlint.config.js 这里采用自己定义的规范,将会覆盖上面那个,所以上面那个可以不用安装

```js
module.exports = {
  extends: ['cz']
}
```

* 增加 .cz-config.js

 ```js
   'use strict'
  module.exports = {
    types: [
      { value: '✨新增', name: '新增:    新的内容' },
      { value: '🐛修复', name: '修复:    修复一个Bug' },
      { value: '📝文档', name: '文档:    变更的只有文档' },
      { value: '💄格式', name: '格式:    空格, 分号等格式修复' },
      { value: '♻️重构', name: '重构:    代码重构，注意和特性、修复区分开' },
      { value: '⚡️性能', name: '性能:    提升性能' },
      { value: '✅测试', name: '测试:    添加一个测试' },
      { value: '🔧工具', name: '工具:    开发工具变动(构建、脚手架工具等)' },
      { value: '⏪回滚', name: '回滚:    代码回退' }
    ],
    scopes: [
      { name: 'leetcode' },
      { name: 'javascript' },
      { name: 'typescript' },
      { name: 'Vue' },
      { name: 'node' }
    ],
    // it needs to match the value for field type. Eg.: 'fix'
    /*  scopeOverrides: {
      fix: [
        {name: 'merge'},
        {name: 'style'},
        {name: 'e2eTest'},
        {name: 'unitTest'}
      ]
    },  */
    // override the messages, defaults are as follows
    messages: {
      type: '选择一种你的提交类型:',
      scope: '选择一个scope (可选):',
      // used if allowCustomScopes is true
      customScope: 'Denote the SCOPE of this change:',
      subject: '短说明:\n',
      body: '长说明，使用"|"换行(可选)：\n',
      breaking: '非兼容性说明 (可选):\n',
      footer: '关联关闭的issue，例如：#31, #34(可选):\n',
      confirmCommit: '确定提交说明?(yes/no)'
    },
    allowCustomScopes: true,
    allowBreakingChanges: ['特性', '修复'],
    // limit subject length
    subjectLimit: 100
  }
  ```

* package.json 中,将原来commit配置,变更为自定义配置
    ■
* 然后提交

## 3.测试

### 单元测试

* jest
* 测试三部曲
* input&output

### 配置jest

* 前往 jest 文档,根据需求添加内容
* www.jestjs.cn/docs/gettin…
提交代码的测试运行

```js
npx husky add .husky/pre-push "npm test" # 提交代码前,跑一遍测试用例
```
