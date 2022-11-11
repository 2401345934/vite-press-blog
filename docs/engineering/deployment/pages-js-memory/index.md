---
createTime: 2022/11/10
tag: '工程化,GitHub,Gitee,部署'
---

# GitHub Pages部署报错：JavaScript heap out of memory

![image-20220309180119580](https://img-blog.csdnimg.cn/img_convert/98473f83bb173a1f3f7b0c7c540b123b.png)

经过百度，发现原因是node使用的堆内存超出了V8引擎允许的最大值。

[](https://blog.csdn.net/qq_42937522/article/details/123387368)分析和解决过程
----------------------------------------------------------------------

经过搜索常常得出了两种解决方案。

**1、使用 increase-memory-limit 插件**

TypeScript 和 webpack 时的常见问题，项目过大时，使用 increase-memory-limit，增加node服务器内存限制。

安装：

```
npm install -g increase-memory-limit

```

进入工程目录执行：

```
increase-memory-limit
```

在执行上述操作后，然后执行`npm run build` 后，会报错：

```
'"node --max-old-space-size=4096"' 不是内部或外部命令，也不是可运行的程序

```

在高版本中移除了`node`命令，所以也不能解决。

**2、修改cmd文件**

在目录`node_modules/.bin`下打开`ng.cmd`和`ngc.cmd`文件，添加 `--max_old_space_size=4096`

**但是因为最终部署在GitHub Pages，没有办法直接修改 node\_modules 的文件，所以这种方法不行。**

[](https://blog.csdn.net/qq_42937522/article/details/123387368)解决方案
-------------------------------------------------------------------

Node.js v8.0 开始，可以使用`NODE_OPTIONS` 环境变量来全局设置 max\_old\_space\_size 来增加内存限制

```
export NODE_OPTIONS=--max_old_space_size=4096

```

**increase-memory-limit** 将附加 `--max-old-space-size=4096` 到文件中的所有 `node` 调用中`node_modules/.bin/*`。

注意：如果在windows系统，可以使用命令：

```
set NODE_OPTIONS=--max_old_space_size=4096

```

因为`export`是linux命令。

[](https://blog.csdn.net/qq_42937522/article/details/123387368)扩展
-----------------------------------------------------------------

修改原来的github部署脚本：

```
name: Deploy GitHub Pages

# 触发条件：在 push 到 master 分支后
on:
  push:
    branches:
      - main

# 任务
jobs:
  build-and-deploy:
    # 服务器环境：最新版 Ubuntu
    runs-on: ubuntu-latest
    steps:
      # 拉取代码
      - name: Checkout
        uses: actions/checkout@v2
        with:
          persist-credentials: false

      # 生成静态文件
      - name: Build
        run: npm install && export NODE_OPTIONS=--max_old_space_size=4096 &&npm run build

      # 部署到 GitHub Pages
      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@releases/v3
        with:
          ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
          BRANCH: gh-pages
          FOLDER: docs/.vuepress/dist


```
