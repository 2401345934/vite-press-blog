---
createTime: 2022/10/23
tag: 'git'
---
# git 工作区&暂存区的操作命令

## 工作区

git init

### 从远程克隆仓库

git clone XXX

### 提交

1. 提交工作区所有文件到暂存区：git add .
2. 提交工作区中指定文件到暂存区：git add file1 file2 ...;
3. 提交工作区中某个文件夹中所有文件到暂存区：git add [dir];

### 撤销

- 删除工作区文件，并且也从暂存区删除对应文件的记录：git rm file1 file2
- 从暂存区中删除文件，但是工作区依然还有该文件:git rm --cached file
- 取消暂存区已经暂存的文件：git reset HEAD file...
- 撤销上一次对文件的操作：git checkout --file。要确定上一次对文件的修改不再需要，如果想保留上一次的修改以备以后继续工作，可以使用stashing和分支来处理；
- 隐藏当前变更，以便能够切换分支：git stash
- 查看当前所有的储藏：git stash list
- 应用最新的储藏：git stash apply，如果想应用更早的储藏：git stash apply stash@{2}；重新应用被暂存的变更，需要加上--index参数：git stash apply --index
- 使用apply命令只是应用储藏，而内容仍然还在栈上，需要移除指定的储藏：git stash drop stash{0}；如果使用pop命令不仅可以重新应用储藏，还可以立刻从堆栈中清除：git stash pop;
- 在某些情况下，你可能想应用储藏的修改，在进行了一些其他的修改后，又要取消之前所应用储藏的修改。Git没有提供类似于 stash unapply 的命令，但是可以通过取消该储藏的补丁达到同样的效果：git stash show -p stash@{0} | git apply -R；同样的，如果你沒有指定具体的某个储藏，Git 会选择最近的储藏：git stash show -p | git apply -R；

### 更新文件

1. 重命名文件，并将已改名文件提交到暂存区：git mv [file-original] [file-renamed];

### 查询信息

1. 查询当前工作区所有文件的状态：git status;
1. 比较工作区中当前文件和暂存区之间的差异，也就是修改之后还没有暂存的内容：git diff；指定文件在工作区和暂存区上差异比较：git diff file-name

## 暂存区

### 提交文件到版本库

- 将暂存区中的文件提交到本地仓库中，即打上新版本：git commit -m "commit_info"
- 将所有已经使用git管理过的文件暂存后一并提交，跳过add到暂存区的过程：git commit -a -m "commit_info"
- 提交文件时，发现漏掉几个文件，或者注释写错了，可以撤销上一次提交：git commit --amend

### 查看信息

- 比较暂存区与上一版本的差异：git diff --cached
- 指定文件在暂存区和本地仓库的不同：git diff file-name --cached
- 查看提交历史：git log；参数-p展开每次提交的内容差异，用-2显示最近的两次更新，如git log -p -2

### 打标签

Git 使用的标签有两种类型：**轻量级的（lightweight）和含附注的（annotated）** 。轻量级标签就像是个不会变化的分支，实际上它就是个指向特定提交对象的引用。而含附注标签，实际上是存储在仓库中的一个独立对象，它有自身的校验和信息，包含着标签的名字，电子邮件地址和日期，以及标签说明，标签本身也允许使用 GNU Privacy Guard (GPG) 来签署或验证。一般我们都建议使用含附注型的标签，以便保留相关信息；当然，如果只是临时性加注标签，或者不需要旁注额外信息，用轻量级标签也没问题。

1. 列出现在所有的标签：git tag
1. 使用特定的搜索模式列出符合条件的标签，例如只对1.4.2系列的版本感兴趣：git tag -l "v1.4.2.*"
1. 创建一个含附注类型的标签，需要加-a参数，如 git tag -a v1.4 -m "my version 1.4"
1. 使用git show命令查看相应标签的版本信息，并连同显示打标签时的提交对象：git show v1.4
1. 如果有自己的私钥，可以使用GPG来签署标签，只需要在命令中使用-s参数：git tag -s v1.5 -m "my signed 1.5 tag"
1. 验证已签署的标签：git tag -v ，如 git tag -v v1.5
1. 创建一个轻量级标签的话，就直接使用 git tag 命令即可，连-a,-s以及-m选项都不需要，直接给出标签名字即可，如 git tag v1.5
1. 将标签推送到远程仓库中：git push origin ，如 git push origin v1.5
1. 将本地所有的标签全部推送到远程仓库中：git push origin --tags

### 分支管理

- 创建分支：git branch branch-name，如 git branch testing
- 从当前所处的分支切换到其他分支：git checkout branch-name，如 git checkout testing
- 新建并切换到新建分支上：git checkout -b branch-name
- 删除分支：git branch -d branch-name
- 将当前分支与指定分支进行合并：git merge branch-name
- 显示本地仓库的所有分支：git branch
- 查看各个分支最后一个提交对象的信息：git branch -v
- 查看哪些分支已经合并到当前分支：git branch --merged
- 查看当前哪些分支还没有合并到当前分支：git branch --no-merged
- 把远程分支合并到当前分支：git merge remote-name/branch-name，如git merge origin/serverfix；如果是单线的历史分支不存在任何需要解决的分歧，只是简单的将HEAD指针前移，所以这种合并过程可以称为快进（Fast forward），而如果是历史分支是分叉的，会以当前分叉的两个分支作为两个祖先，创建新的提交对象；如果在合并分支时，遇到合并冲突需要人工解决后，再才能提交；
- 在远程分支的基础上创建新的本地分支：git checkout -b branch-name remote-name/branch-name，如git checkout -b serverfix origin/serverfix;
- 从远程分支checkout出来的本地分支，称之为跟踪分支。在跟踪分支上向远程分支上推送内容：git push。该命令会自动判断应该向远程仓库中的哪个分支推送数据；在跟踪分支上合并远程分支：git pull；
- 将一个分支里提交的改变移到基底分支上重放一遍：git rebase rebase-branch branch-name，如git rebase master server，将特性分支server提交的改变在基底分支master上重演一遍；使用rebase操作最大的好处是像在单个分支上操作的，提交的修改历史也是一根线；如果想把基于一个特性分支上的另一个特性分支变基到其他分支上，可以使用--onto操作：git rebase --onto rebase-branch feature branch sub-feature-branch，如git rebase --onto master server client；使用rebase操作应该遵循的原则是：**一旦分支中的提交对象发布到公共仓库，就千万不要对该分支进行rebase操作**；
