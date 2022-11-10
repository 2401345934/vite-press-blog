---
createTime: 2022/11/10
tag: '工程化,GitHub'
---
# Actions

GitHub Actions
--------------

GitHub Actions 是一个持续集成 (Continuous integration)和持续交付 (Continuous delivery)的平台，它可以做到自动化构建、测试、部署。你可以创建工作流，构建和测试每一个 pull request 或者部署合并后的代码到生产环境。

GitHub Actions 可以在你的代码仓库发生某个事件时运行一个工作流。举个例子，当有人给你的代码仓库新建了一个 issue，你可以跑一个工作流自动的添加合适的标签。

GitHub 提供了 Linux、Windows、和 macOS 虚拟机运行你的工作流，当然你也可以自定义运行环境。

GitHub Actions 组件
-----------------

你可以配置一个 GitHub Actions **工作流（workflow**），它会在你的仓库发生某个事件时被触发，就比如一个 pull request 或者一个 issue 被创建的时候。

你的工作流包含一个或者多个**任务（jobs）**， 它们可以并行或者串行执行。每一个任务（jobs）都会在它自己的虚拟机**运行器(runner)**上，任务可以有一个或者多个**步骤（steps）**，可以运行一个自定义的脚本或者运行一个**动作（action）**，所谓动作（action）是一个可复用的扩展，用于简化你的工作流。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2e571673188b4746964e20a6314f83f7~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

### Workflows（工作流）

工作流是一个可配置的自动化的程序。创建一个工作流，你需要定义一个 YAML 文件，当你的仓库触发某个事件的时候，工作流就会运行，当然也可以手动触发，或者定义一个时间表。

一个仓库可以创建多个工作流，每一个都执行不同的步骤，举个例子，一个工作流用于构建和测试 pull request，一个用于部署你的应用，再来一个，当有人新建 issue 的时候自动添加一个标签。

你也可以在一个工作流中引用另外一个工作流，查看「[可复用工作流](https://link.juejin.cn/?target=https%3A%2F%2Fdocs.github.com%2Fen%2Factions%2Flearn-github-actions%2Freusing-workflows "https://docs.github.com/en/actions/learn-github-actions/reusing-workflows")」。

### 事件（Events）

事件是指仓库触发运行工作流的具体的行为，比如创建一个 pull request，新建一个 issue、或者推送一个 commit。你也可以使用时间表触发一个工作流，或者通过请求一个 REST API，再或者手动触发。

事件完整的列表，可以查看「[触发工作流的事件](https://link.juejin.cn/?target=https%3A%2F%2Fdocs.github.com%2Fen%2Factions%2Freference%2Fevents-that-trigger-workflows "https://docs.github.com/en/actions/reference/events-that-trigger-workflows")」。

### 任务（Jobs）

任务是在同一个运行器上执行的一组步骤（steps）。一个步骤（steps）要么是一个shell 脚本（script）要么是一个动作（action）。步骤会顺序执行，并彼此独立。因为每一个步骤都在同一个运行器上被执行，所以你可以从一个步骤（step）传递数据到另一个步骤（step） 。

你可以配置一个任务依赖其他任务，默认情况下，任务没有依赖，并行执行。当一个任务需要另外一个任务的时候，它会等到依赖的任务完成再执行。

### 动作（Actions）

动作是 GitHub Actions 平台的一个自定义的应用，它会执行一个复杂但是需要频繁重复的作业。使用动作可以减少重复代码。比如一个 action 可以实现从 GitHub 拉取你的 git 仓库，为你的构建环境创建合适的工具链等。

你可以写自己的动作 ，或者在 GitHub 市场找已经实现好的动作。

### 运行器（Runners）

一个运行器是一个可以运行工作流的服务。每一个运行器一次只运行一个单独的任务。GitHub 提供 Ubuntu Linux，Microsoft Windows 和 macOS 运行器，每一个工作流都运行在一个独立新建的虚拟机中。如果你需要一个不同的操作系统，你可以自定义运行器。请查看「[自定义运行器](https://link.juejin.cn/?target=https%3A%2F%2Fdocs.github.com%2Fen%2Factions%2Fhosting-your-own-runners "https://docs.github.com/en/actions/hosting-your-own-runners")」。

创建一个工作流
-------

GitHub Actions 使用 YAML 语法定义工作流。每一个工作流保存为一个独立的 YAML 文件，目录是 `.github/workflows` 。

现在我们在代码仓库创建一个示例工作流，当代码被推送的时候，会自动执行一系列的命令。在这个示例工作流中，GitHub Actions 会检出提交的代码，安装依赖，运行 `bats -v`：

1. 在你的仓库，创建一个 `.github/workflows/` 目录
2. 在 `.github/workflows/` 目录，创建一个文件，名为 `learn-github-actions.yml` ，添加下面的代码：

```
name: learn-github-actions
on: [push]
jobs:
  check-bats-version:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '14'
      - run: npm install -g bats
      - run: bats -v

```

3. 提交这些改动，推送到你的 GitHub 仓库。

你的新 GitHub Actions 工作流文件就会被安装在你的仓库，当有人提交代码的时候，工作流就会自动执行。关于一个任务的执行历史，查看「[查看工作流活动](https://link.juejin.cn/?target=https%3A%2F%2Fdocs.github.com%2Fcn%2Factions%2Flearn-github-actions%2Fintroduction-to-github-actions%23viewing-the-jobs-activity "https://docs.github.com/cn/actions/learn-github-actions/introduction-to-github-actions#viewing-the-jobs-activity")」章节。

理解工作流文件
-------

为了帮助你理解 YAML 语法，这节会解释例子中的每行代码：

```
name: learn-github-actions

```

可选，工作流的名字，会出现在 GitHub 仓库的 Actions 选项栏里。

```
on: [push]

```

指定工作流的触发事件。这个例子里，使用是 `push` 事件，当有人提交了一个代码修改或者合并了一个 pull request ，工作流就会触发。提交到每个分支都会被触发，如果你想在指定分支、路径、标签，查看 「[GitHub Actions 工作流语法](https://link.juejin.cn/?target=https%3A%2F%2Fdocs.github.com%2Factions%2Freference%2Fworkflow-syntax-for-github-actions%23onpushpull_requestpaths "https://docs.github.com/actions/reference/workflow-syntax-for-github-actions#onpushpull_requestpaths")」

```
jobs:

```

将运行在 `learn-github-actions` 工作流的所有任务分组在一起。

```
check-bats-version:

```

定义了一个名为`check-bats-version` 的任务，子键（child key）会定义该任务的属性。

```
  runs-on: ubuntu-latest

```

配置任务运行在最新的 Ubuntu Linux 运行器。

```
 steps:

```

将 `check-bats-version` 任务下的所有步骤分为一组，嵌套的每一个条目都是一个独立的 action 或者 shell 脚本。

```
- uses: actions/checkout@v2

```

`uses` 关键字指定了这个步骤运行 `actions/checkout` 动作的 `v2` 大版本 。这是一个可以检出仓库代码到运行器的动作，它允许你运行脚本或者其他动作侵入你的代码（比如构建或者测试工具）。

```
- uses: actions/setup-node@v2
  with:
    node-version: '14'

```

这个步骤会使用 `actions/setup-node@v2` 动作安装指定版本的 Nodejs ，这会在你的 `PATH` 加上 `node` 和 `npm` 命令。

```
- run: npm install -g bats

```

`run` 关键字会告诉任务在运行器上执行一个命令。在这个例子中，你正在使用 `npm` 安装 `bats` 软件测试包。

```
- run: bats -v

```

最终，你运行 `bats` 命令，传入一个可以打印软件版本的参数。

可视化工作流文件
--------

在这个图表，你可以看到你刚创建的工作流文件，以及这些 GitHub Actions 组件是如何组织的。每一个步骤都会执行一个独立的动作或者脚本文件。任务1 和 2 是运行命令，任务3 和 任务 4 是运行脚本文件。找到更多预构建的动作，查看 「[查找和自定义动作](https://link.juejin.cn/?target=https%3A%2F%2Fdocs.github.com%2Fcn%2Factions%2Flearn-github-actions%2Ffinding-and-customizing-actions "https://docs.github.com/cn/actions/learn-github-actions/finding-and-customizing-actions")」。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/793521037ba24f5c82c9ae141071ad33~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

查看工作流活动
-------

一旦你的工作流开始运行，你可以在 GitHub 看到一个可视化的运行进度图表 ，查看每一个步骤的执行情况。

1. 在 GitHub.com ，导航至仓库主页
2. 在你的仓库名下，点击 `Actions`。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1ea97a5bc77241e58832aec26e1d7054~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

3. 在左侧 sidebar，点击你想查看的工作流

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/21c2e97bfaef4bfe8b35cdbe11ffd5c6~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

4. 在 `Workflow runs` ，点击你想查看的运行记录的名称：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/15235d4e7ff84ca2910f7c598c325e70~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

5. 在 Jobs 或者在可视化图表中，点击你想看到的任务：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/876bdfd61f184baba73206b4363b1cd4~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

6. 查看每一个步骤的结果：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f55f15a850a14c9e948c2efb48de30f7~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

上篇文章代码解析
--------

现在我们再来看 GitHub 同步 Gitee 的代码，是不是就清楚很多了：

```
name: syncToGitee
on:
  push:
    branches:
      - gh-pages
jobs:
  repo-sync:
    runs-on: ubuntu-latest
    steps:
      - name: Mirror the Github organization repos to Gitee.
        uses: Yikun/hub-mirror-action@master
        with:
          src: 'github/mqyqingfeng'
          dst: 'gitee/mqyqingfeng'
          dst_key: ${{ secrets.GITEE_PRIVATE_KEY }}
          dst_token:  ${{ secrets.GITEE_TOKEN }}
          static_list: "learn-typescript"
          force_update: true
          debug: true

```

在这个例子里，我们定义了一个名为 `syncToGitee` 的工作流，指定代码提交到分支 `gh-pages` 才触发工作流。

任务下只有一个名为 `repo-sync` 的任务，运行在 `ubuntu-latest`，具体的步骤下，也只有一个名为 `Mirror the GitHub organization repos to Gitee.` 的步骤，使用了 `Yikun/hub-mirror-action@master` 动作，而 `with` 里的内容则是该动作需要的一些参数。
