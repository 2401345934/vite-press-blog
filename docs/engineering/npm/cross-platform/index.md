---
createTime: 2022/11/04
tag: '工程化,npm'
---

# 实现 npm script 跨平台兼容

到目前为止，如果你在 Linux、Mac 平台做开发，所有的 npm script 都会顺利运行，但是 Windows 下面的同学可能就比较痛苦了，因为不是所有的 shell 命令都是跨平台兼容的，甚至各种常见的文件系统操作也是不兼容的。

可能有部分同学处理过 npm script 跨平台兼容的问题，比如粗暴的为两种平台各写一份 npm script，像下面这样：

```json
{
  "name": "hello-npm-script",
  "scripts": {
    "bash-script": "echo Hello $npm_package_name",
    "win-script": "echo Hello %npm_package_name%"
  }
}
```

有技术追求的工程师肯定不会满足上面的解决方案，实际上社区中已经有非常多的小工具可以帮我们优雅的实现跨平台的 npm script，下面我们探索下如何实现跨平台的文件系统操作、变量引用、环境变量设置。

特别说明，windows 环境的同学建议使用 git bash 来运行 npm script，使用 windows 自带的 cmd 可能会遇到比较多的问题

## 文件系统操作的跨平台兼容

npm script 中涉及到的文件系统操作包括文件和目录的创建、删除、移动、复制等操作，而社区为这些基本操作也提供了跨平台兼容的包，列举如下：

* rimraf 或 del-cli，用来删除文件和目录，实现类似于 rm -rf 的功能；
* cpr，用于拷贝、复制文件和目录，实现类似于 cp -r 的功能；
* make-dir-cli，用于创建目录，实现类似于 mkdir -p 的功能；
* 使用上面这几个小工具改造 npm script 的具体步骤如下：

### 第 1 步，添加开发依赖

```js
npm i rimraf cpr make-dir-cli -D
# npm install rimraf cpr make-dir-cli --save-dev
# yarn add rimraf cpr make-dir-cli -D
```

### 第 2 步，改造涉及文件系统操作的 npm script

```json
  "scripts": {
-    "cover:cleanup": "rm -rf coverage && rm -rf .nyc_output",
-    "cover:archive": "cross-var \"mkdir -p coverage_archive/$npm_package_version && cp -r coverage/* coverage_archive/$npm_package_version\"",
+    "cover:cleanup": "rimraf coverage && rimraf .nyc_output",
+    "cover:archive": "cross-var \"make-dir coverage_archive/$npm_package_version && cpr coverage/* coverage_archive/$npm_package_version -o\"",
     "cover:serve": "cross-var http-server coverage_archive/$npm_package_version -p $npm_package_config_port",
     "cover:open": "cross-var opn http://localhost:$npm_package_config_port",
-    "postcover": "npm-run-all cover:archive cover:cleanup --parallel cover:serve cover:open"
+    "precover": "npm run cover:cleanup",
+    "postcover": "npm-run-all cover:archive --parallel cover:serve cover:open"
  },
```

对改动的几点说明：

* rm -rf 直接替换成 rimraf；
* mkdir -p 直接替换成 make-dir；
* cp -r 的替换需特别说明下，cpr 默认是不覆盖的，需要显示传入 -o 配置项，并且参数必须严格是 cpr source destination [options] 的格式，即配置项放在最后面；
* 把 cover:cleanup 从 postcover 挪到 precover 里面去执行，规避 cpr 没归档完毕覆盖率报告就被清空的问题；

## 用 cross-var 引用变量

### 第 1 步，安装 cross-var 为开发依赖

```js
npm i cross-var -D
# npm install cross-var --save-dev
# yarn add cross-var -D
```

### 第 2 步，改写引用变量 npm script，具体 diff 如下

```json
 "scripts": {
     "cover:cleanup": "rm -rf coverage && rm -rf .nyc_output",
-    "cover:archive": "mkdir -p coverage_archive/$npm_package_version && cp -r coverage/* coverage_archive/$npm_package_version",
-    "cover:serve": "http-server coverage_archive/$npm_package_version -p $npm_package_config_port",
-    "cover:open": "opn http://localhost:$npm_package_config_port",
+    "cover:archive": "cross-var \"mkdir -p coverage_archive/$npm_package_version && cp -r coverage/* coverage_archive/$npm_package_version\"",
+    "cover:serve": "cross-var http-server coverage_archive/$npm_package_version -p $npm_package_config_port",
+    "cover:open": "cross-var opn http://localhost:$npm_package_config_port",
     "postcover": "npm-run-all cover:archive cover:cleanup --parallel cover:serve cover:open"
   },
```

## 用 cross-env 设置环境变量

在 node.js 脚本和 npm script 使用环境变量也是比较常见的，比如我们在运行测试时，需要加上 NODE_ENV=test，或者在启动静态资源服务器时自定义端口号。因为不同平台的环境变量语法不同，我们可以使用 cross-env 来实现 npm script 的跨平台兼容，具体步骤如下：

### 第 1 步，添加 cross-env 到开发依赖

```js
npm i cross-env -D
# npm install cross-env --save-dev
# yarn add cross-env -D
```

### 第 2 步，改写使用了环境变量的 npm script

```json
  "scripts": {
-    "test": "NODE_ENV=test mocha tests/",
+    "test": "cross-env NODE_ENV=test mocha tests/",
  },
```

## 关于 npm script 的跨平台兼容，还有几点需要大家注意

* 所有使用引号的地方，建议使用双引号，并且加上转义；
* 没做特殊处理的命令比如 eslint、stylelint、mocha、opn 等工具本身都是跨平台兼容的；
* 还是强烈建议有能力的同学能使用 Linux 做开发，只要你入门并且熟练了，效率提升会惊人；
* 短时间内继续拥抱 Windows 的同学，可以考虑看看 Windows 10 里面引入的 Subsystem，让你不用虚拟机即可在 Windows 下使用大多数 Linux 命令。
