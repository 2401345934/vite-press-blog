---
createTime: 2022/11/02
tag: '工程化,npm'
---
# 给 npm script 传递参数和添加注释

## 给 npm script 传递参数 --

eslint 内置了代码风格自动修复模式，只需给它传入 --fix 参数即可，在 scripts 中声明检查代码命令的同时你可能也需要声明修复代码的命令，面对这种需求，大多数同学可能会忍不住复制粘贴，如下：

```js
 "lint:js:fix": "eslint *.js --fix",
```

在 lint:js 命令比较短的时候复制粘贴的方法简单粗暴有效，但是当 lint:js 命令变的很长之后，难免后续会有人改了 lint:js 而忘记修改 lint:js:fix（别问我为啥，我就是踩着坑过来的），更健壮的做法是，在运行 npm script 时给定额外的参数，代码修改如下

```js
 "lint:js:fix": "npm run lint:js -- --fix",
```

要格外注意 --fix 参数前面的 -- 分隔符，意指要给 npm run lint:js 实际指向的命令传递额外的参数。

## 给 npm script 添加注释

### 第一种

package.json 中可以增加 // 为键的值，注释就可以写在对应的值里面，npm 会忽略这种键，比如，我们想要给 test 命令添加注释，按如下方式添加

```js
+    "//": "运行所有代码检查和单元测试",
     "test": "npm-run-all --parallel lint:* mocha"
```

这种方式的明显不足是，npm run 列出来的命令列表不能把注释和实际命令对应上，如果你声明了多个，npm run 只会列出最后那个，如下图：

### 第二种

直接在 script 声明中做手脚，因为命令的本质是 shell 命令（适用于 linux 平台），我们可以在命令前面加上注释，具体做法如下：

```js
    "test": "# 运行所有代码检查和单元测试 \n    npm-run-all --parallel lint:* mocha"
```

注意注释后面的换行符 \n 和多余的空格，换行符是用于将注释和命令分隔开，这样命令就相当于微型的 shell 脚本，多余的空格是为了控制缩进，也可以用制表符 \t 替代。这种做法能让 npm run 列出来的命令更美观，但是 scripts 声明阅读起来不那么整齐美观。
![图片](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/11/27/15ffa72c247900f5~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

## 调整 npm script 运行时日志输出

在运行 npm script 出现问题时你需要有能力去调试它，某些情况下你需要让 npm script 以静默的方式运行，这类需求可通过控制运行时日志输出级别来实现。

日志级别控制参数有好几个，简单举例如下：

### 默认日志输出级别

即不加任何日志控制参数得到的输出，可能是你最常用的，能看到执行的命令、命令执行的结果。

### 显示尽可能少的有用信息

结合其他工具调用 npm script 的时候比较有用，需要使用 --loglevel silent，或者 --silent，或者更简单的 -s 来控制，这个日志级别的输出实例如下（只有命令本身的输出，读起来非常的简洁）：

![图片](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/11/27/15ffa73279c8a9e8~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)
如果执行各种 lint script 的时候启用了 -s 配置，代码都符合规范的话，你不会看到任何输出，这就是没有消息是最好的消息的由来，哈哈！

### 显示尽可能多的运行时状态

排查脚本问题的时候比较有用，需要使用 --loglevel verbose，或者 --verbose，或者更简单的 -d 来控制，这个日志级别的输出实例如下（详细打印出了每个步骤的参数、返回值，下面的截图只是部分）：
