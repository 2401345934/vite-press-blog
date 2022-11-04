---
createTime: 2022/11/04
tag: '工程化,git'
---
# Git Submodules 介绍

## 特点

* 因为暴露的是源代码，引用方必须有子模块的读权限，所以适合团队内、组织内协作或个人开发。
* 通常允许引用方开发者修改子模块代码，并提交。修改子模块代码的成本较低。
* 开发者主要靠阅读源码了解API和机制。
* 有版本管理机制，各个引用方可以按需更新。

## 适用场景

* 团队、组织内部协作。
* 引用方时常需要修改共享代码。

## 为什么有 submodules？

解决公共代码问题。如果某些文件，在项目A和项目B中都会用到，例如组件库，那么这些文件可以作为 submodules 来管理，减少重复代码。（当然，该场景下npm包是另一解决方案，你需要选择一种方案。）
解决团队维护难题。如果一个大项目是一个大 Git 仓库，需要统一编译，不同的模块由不同团队维护，放在同一个 Git 仓库有诸多难处：例如多个团队的 MR 混在一起、权限难以区分等。这种情况即使公司内网 Git 权限做的足够精细，仓库管理员的学习成本也会很高，很难深度使用这种高级功能。为了解决多团队维护的难题，Git Submodules 也能大展身手，它可以让每个团队负责的模块就是一个 Git 仓库，这些 Git 仓库都被包含在同一个主 Git 项目下。（当然，微前端、微服务是另一种解决方案，你需要选择一种方案。）

## 了解 Git Submodules

有2个概念：主项目、submodule（子模块）。这两者各自都是完整的 Git 仓库。

## 如何让一个Git仓库变为另一个Git仓库的 submodule

* 创建Git仓库A。
* 创建Git仓库B。
* 在Git仓库A中，通过git submodule add ...(仓库B的地址，即git clone时后面那串东西)，可以把仓库B当作仓库A的submodule，此时A就成了主项目。【注：B也可以做A的主项目，通过在仓库B执行git submodule add ...(A地址)即可，因为二者都是完整Git仓库，在建立父子关系前，没有差异的。】

### 注意事项

执行操作后，会在当前父项目下新建个文件夹，名字就是 submodule 仓库的名字。这个文件夹里面的内容，是 submodule 对应 Git 仓库的完整代码。
如果你希望换个名字，或者换个路径（例如放在某个更深的目录下），也是允许的，需要后面增加个路径参数，例如git submodule add ...(仓库地址) src/B(你希望 submodule 位于的文件夹路径)

### submodule 的父子关系存在哪里

关系是保存在主项目的 Git 仓库中。
被当作 submodule 的 Git 仓库，其实不知道自己变成了 submodule，它更不知道爸爸们有谁。（意思是，当你打开某个被当作 submodule 的 Git 仓库首页时，或者拉下这个仓库时，没有任何痕迹表明它是个submodule。因为父子信息不存在这里，只存在爸爸那里。）

### submodule 的父子关系信息怎么存

.gitmodules 文件
父子关系的信息保存在主项目的 .gitmodules 文件，如果不是新加 submodule，这个文件通常不必改变了，因为信息比较固定。
![图片](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/89301c1e2b9543a0a66b5995a30eba26~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

### submodule 的版本号

主项目还保存了对应 submodule 的版本号（commit id），没有冗余存储 submodule 的代码。

## submodule 开发常用操作

### 如何给 submodule 仓库提交更新

#### 方法一，像普通仓库一样更新

之前说过，submodule 仓库也是个普通的 Git 仓库，它并不知道自己有多少个爸爸。
我们可以直接git clone xxx这个仓库，像给普通 Git 仓库提交更新一样，去更新它。

#### 方法二，在主项目中更新

例如主项目在文件夹A，A里面包含：

.git文件夹
READMD.md主项目的ReadMe文件。
B文件夹，是个 submodule。

我们可以进入B文件夹cd B，你会发现在B中，也可以执行git status等命令，此时的git命令都会是针对仓库B的，你可以在这里切换分支、提交更新，这时候，提交的都是submodule的变更。

#### 注意事项

当你在文件夹B中做commit后，文件夹B里面就有了新的 commit id。此时主项目A中所记录的 submodule 的commit id也会更新。所以，你cd ..回到文件夹A后，会发现A有变更了，变更内容是：旧commid id变成了新的commit id。

![图片](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/855215c8795d4c5a9f9b3b6e84b6a7b9~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)
下面是git diff：
![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f51ffa1d006498bade55b2373c6647f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

## 如何在主项目仓库，拉取 submodule 的更新

### 方法一，cd submodule 后 git pull

在 submodule 中，所有git操作就当作一个普通的 Git 仓库就行，你可以切换分支、提交代码、拉取更新等。
这个方法，你可以拉取到 submodule 的master最新代码。但是如果这时候的commit id跟主项目里记录的 submodule 的 commit id 不一致，你会在主项目仓库看到diff，你可能需要提交主项目更新。

### 方法二，主项目执行git submodule update --remote [submodule文件夹相对路径]

这个方法会自动拉取submodule的主分支（通常叫master或main）的最新版本。效果跟方法一一致。
如果你不带参数[submodule文件夹相对路径]，就会更新所有 submodules。

#### 注意事项，更新后需提交主项目变更

当我们更新子项目后，相当于是把主项目记录的 submodule 的 commit id 给更新了，需要提交下主项目的变更。

### 方法三，主项目执行 git submodule update [submodule文件夹相对路径]

注意，这个方法会使 submodule 的分支处于主项目里指定的 commit id。可能并不是拉 submodule 的 master 最新代码。
所以，这种方法仅适用于，当主仓库里记录的 submodule 的 commit id 已经是最新的（可能被其他同事提交过）。或者你期望 submodule 跟主仓库记录的保持一致时，也可以使用该方法。

## 如何 clone 包含 submodule 的仓库

### 方法一，按需clone submodule

1. 先git clone 主项目仓库并进入主项目文件夹，这时候submodule的文件夹都是空的。
2. 执行git submodule init [submodule的文件夹的相对路径]。
3. 执行git submodule update [submodule的文件夹的相对路径]。

这就按需clone了submodule。什么时候有用呢？跨团队协作某个主项目时，一些其它团队的submodule我们没必要安装，就不必执行init和update了。

#### 合并第2、3步骤

第2、3步可以合并。使用以下命令：

```js
git submodule update --init [submodule的文件夹的相对路径]
```

注意顺序，--init跟[submodule的文件夹的相对路径]的位置不可以调换噢。

![图片](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ca78e18255054d449f281cab4fb50e0a~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

### 方法二，一次性clone所有 submodule

1. 先git clone 主项目仓库，这时候submodule的文件夹都是空的。
2. 执行git submodule init。
3. 执行git submodule update。

只要不写submodule，那么就一次性检查该主项目的所有submodule，都拉下来。

![图片](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3ae22654086b4782af338f324a197e9a~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

#### 合并第2、3步骤

```js
git submodule update --init
```

合并第1、2、3步骤

```js
git clone --recurse-submodules [主项目Git仓库地址]
```

![图片](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/19bc870f55df464b9b49281be7388252~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

## 如何创建 submodule 关系

cd到主项目，执行：

```js
git submodule add ...(另一仓库地址，即git clone时后面那串东西)
```

下面可以指定 submodule 放到哪个子文件夹

```js
git submodule add ...(另一仓库地址) [(可选，submodule下载的路径)]
```
