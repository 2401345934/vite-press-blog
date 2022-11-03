---
createTime: 2022/11/03
tag: '工程化,npm'
---
# 在 npm script 中使用变量

npm 为加高效的执行 npm script 做了大量的优化，创建并运行 npm script 命令 里面讲到的环境变量特性能让我们在 npm script 中直接调用依赖包里的可执行文件，更强大的是，npm 还提供了 $PATH 之外的更多的变量，比如当前正在执行的命令、包的名称和版本号、日志输出的级别等。

DRY（Don't Repeat Yourself）是基本的编程原则，在 npm script 中使用预定义变量和自定义变量让我们更容易遵从 DRY 原则，因为使用这些变量之后，npm script 就具备了自适应的能力，我们可以直接把积累起来的 npm script 使用到其他项目里面，而不用做任何修改。

## 使用预定义变量

首先我们来看预定义变量，通过运行 npm run env 就能拿到完整的变量列表，这个列表非常长，这里我使用 npm run env | grep npm_package | sort 拿到部分排序后的预定义环境变量：

变量的使用方法遵循 shell 里面的语法，直接在 npm script 给想要引用的变量前面加上 $ 符号即可。比如：

```js
{
  "dummy": "echo $npm_package_name"
}
```
