---
createTime: 2022/10/23
tag: 'git'
---
# 储藏 stash

## stash 储藏

git stash : 将全部未保存的代码添加到储藏

## 保存当前代码

* git stash: 快速储藏代码，默认储藏名称为"WIP on branch_name ： latest_commit_id latest_commit_message"
* git stash save "message": 执行储藏时，添加message信息，注明储藏名称，方便查找

## 查看stash代码

* git stash list: 查看stash列表
* git stash show: 查看第一个储藏做了哪些改动(并不是改动详情)
* git stash show stash@{num}: 查看其他储藏做了哪些改动
* git stash show -p: 查看第一个储藏的改动
* git stash show -p stash@{num}: 查看其他储藏做的改动

## 应用stash代码

```javascript
* git stash apply: 应用第一个储藏，但不会删除
* git stash apply stash@{num}: 应用列表中的储藏
* git stash pop: 应用第一个储藏并删除
* git stash pop stash@{num}: 应用stash list中的储藏并删除，例如应用并删除第二个：git stash pop stash@{1}

```

## 删除stash代码

```javascript
* git stash drop: 删除以一个储藏
* git stash drop stash@{num}: 删除stash list中的储藏，例如删除第二个：git stash drop stash@{1}
* git stash clear: 删除所有储藏的stash
```

## 以stash储藏创建一个分支

* 创建新分支branchName，并切换到此分支，分支的状态与stash储藏时的状态一致，此时新分支应用的stash代码进了暂存区。

```javascript
git stash branch branchName stash@{1}:
```

## 如图，展示了几个常用的stash命令

![图片](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/20/16fc106c4d7d05c8~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.awebp)
