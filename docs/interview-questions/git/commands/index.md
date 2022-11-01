---
createTime: 2022/10/23
tag: 'git'
---
# git 常用命令

## 常用命令

- stash：存储临时代码。
- reset --soft：软回溯，回退 commit 的同时保留修改内容。
- cherry-pick：复制 commit。
- revert：撤销 commit 的修改内容。
- reflog：记录了 commit 的历史操作。

## 查询配置信息

1. 列出当前配置：git config --list
1. 列出repository配置：git config --local --list
1. 列出全局配置：git config --global --list
1. 列出系统配置：git config --system --list

## 第一次使用git，配置用户信息

1. 配置用户名：git config --global user.name "your name"
1. 配置用户邮箱：git config --global user.email "youremail@github.com"

## 其他配置

1. 配置解决冲突时使用哪种差异分析工具，比如要使用vimdiff：git config --global merge.tool vimdiff
1. 配置git命令输出为彩色的：git config --global color.ui auto
1. 配置git使用的文本编辑器：git config --global core.editor vi
