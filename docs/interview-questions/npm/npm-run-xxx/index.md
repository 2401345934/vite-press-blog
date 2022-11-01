---
createTime: 2022/10/24
tag: 'npm'
---
# npm run xxx

## 运行 npm run xxx 的时候发生了什么？

* pm run xxx的时候，首先会去项目的package.json文件里找scripts 里找对应的xxx，然后执行 xxx的命令，例如启动vue项目 npm run serve的时候，实际上就是执行了vue-cli-service serve 这条命令。
* 那 为什么 不直接执行vue-cli-service serve而要执行npm run serve 呢？
* 直接执行vue-cli-service serve，会报错，因为操作系统中没有存在vue-cli-service这一条指令
* 那既然vue-cli-service这条指令不存在操作系统中，为什么执行npm run serve的时候，也就是相当于执行了vue-cli-service serve ，为什么这样它就能成功，而且不报指令不存在的错误？

1. 我们在安装依赖的时候，是通过npm i xxx 来执行的，例如 npm i @vue/cli-service，npm 在 安装这个依赖的时候，就会node_modules/.bin/ 目录中创建 好vue-cli-service 为名的几个可执行文件了。
2. .bin 目录，这个目录不是任何一个 npm 包。目录下的文件，表示这是一个个软链接，打开文件可以看到文件顶部写着 #!/bin/sh ，表示这是一个脚本。
3. 由此我们可以知道，当使用 npm run serve 执行 vue-cli-service serve 时，虽然没有安装 vue-cli-service的全局命令，但是 npm 会到 ./node_modules/.bin 中找到 vue-cli-service 文件作为 脚本来执行，则相当于执行了 ./node_modules/.bin/vue-cli-service serve（最后的 serve 作为参数传入）。
4. .bin 目录下的文件表示软连接，那这个bin目录下的那些软连接文件是哪里来的呢？它又是怎么知道这条软连接是执行哪里的呢
5. npm i 的时候，npm 就帮我们把这种软连接配置好了，其实这种软连接相当于一种映射，执行npm run xxx 的时候，就会到 node_modules/bin中找对应的映射文件，然后再找到相应的js文件来执行。

## node_modules/bin中 有三个vue-cli-service文件。为什么会有三个文件呢？

## unix 系默认的可执行文件，必须输入完整文件名

vue-cli-service

## windows cmd 中默认的可执行文件，当我们不添加后缀名时，自动根据 pathext 查找文件

vue-cli-service.cmd

## Windows PowerShell 中可执行文件，可以跨平台

vue-cli-service.ps1

## 总结

1. 运行 npm run xxx的时候，npm 会先在当前目录的 node_modules/.bin 查找要执行的程序，如果找到则运行；
2. 没有找到则从全局的 node_modules/.bin 中查找，npm i -g xxx就是安装到到全局目录；
3. 如果全局目录还是没找到，那么就从 path 环境变量中查找有没有其他同名的可执行程序。
