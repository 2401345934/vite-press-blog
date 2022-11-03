---
createTime: 2022/11/03
tag: '工程化,npm'
---
# 使用 npm script 的钩子

为了方便开发者自定义，npm script 的设计者为命令的执行增加了类似生命周期的机制，具体来说就是 pre 和 post 钩子脚本。这种特性在某些操作前需要做检查、某些操作后需要做清理的情况下非常有用。

举例来说，运行 npm run test 的时候，分 3 个阶段：

* 检查 scripts 对象中是否存在 pretest 命令，如果有，先执行该命令；
* 检查是否有 test 命令，有的话运行 test 命令，没有的话报错；
* 检查是否存在 posttest 命令，如果有，执行 posttest 命令；
