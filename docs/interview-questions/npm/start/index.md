---
createTime: 2022/10/24
tag: 'npm'
---
# npm

## npm 中的依赖包

### 依赖包分类

* dependencies - 业务依赖
* devDependencies - 开发依赖
* peerDependencies - 同伴依赖
* bundledDependencies / bundleDependencies - 打包依赖
* optionalDependencies - 可选依赖
* 作为npm的使用者，我们常用的依赖是dependencies和devDependencies，剩下三种依赖则是作为包的发布者才会使用到的字段。

## 项目版本号管理

package.json中的version字段代表的是该项目的版本号。每当项目发布新版本时，需要将version字段进行相应的更新以便后期维护。虽然可以手动的修改vsersion字段，但是为了整个发布过程的自动化，尽量使用 npm version 指令来自动更新version：

```javascript
npm version (v)1.2.3   // 显示设置版本号为 1.2.3
npm version major   // 大版本号加 1，其余版本号归 0
npm version minor   // 小版本号加 1，修订号归 0
npm version patch   // 修订号加 1
```

显示的设置版本号时，版本号必须符合semver规范，允许在版本号前加上个v标识。

## 预发版本

### 当前版本号为 1.2.3

```javascript
npm version prepatch  // 版本号变为 1.2.4-0，也就是 1.2.4 版本的第一个预发布版本
npm version preminor  // 版本号变为 1.3.0-0，也就是 1.3.0 版本的第一个预发布版本
npm version premajor  // 版本号变为 2.0.0-0，也就是 2.0.0 版本的第一个预发布版本
npm version prerelease  // 版本号变为 2.0.0-1，也就是使预发布版本号加一
```

### 在git环境中，执行npm version修改完版本号以后，还会默认执行git add->git commit->git tag操作

* 如果git工作区还有未提交的修改，npm version将会执行失败，可以加上-f/--force后缀来强制执行。
* 如果不想让npm version指令影响你的git仓库，可以在指令中使用--no-git-tag-version参数：

```javascript
npm --no-git-tag-version version xxx
```
