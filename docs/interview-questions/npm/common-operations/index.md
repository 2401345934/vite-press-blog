---
createTime: 2022/10/24
tag: 'npm'
---
# 常用操作

## 登录

```js
npm login || npm adduser
npm login
npm adduser
```

## docs 查看某个包的文档

### 查看某个包的文档

```js
npm docs [package-name]
```

### 查看某个包的官网

```js
npm home [package-name]
```

## info  查看一个包的详细信息

```js
npm v [package-name]
# or
npm view [package-name]
npm info [package-name]
npm show [package-name]
```

## star 收藏项目

### 主要是用来收藏项目

```js
npm star  [package-name]
```

### 取消收藏

```js
npm unstar [package-name]
```

### 查看收藏列表

```js
npm stars
```

## versions 查看某个包的所有版本

```js
npm v [package-name] versions
```

## 本地开发的 npm 包如何调试

```js
npm install . -g

// 在某个项目中安装本地包
npm install ../Path/xxPackageName

```

## publish 发布包

首先，你得在本地登录
登录完成后，发布自己开发的工具包，只需简单的三步！
注意:使用淘宝源会报错，要改回默认源

### 记得每次发布前，修改下版本号

npm version [版本号]

然后当前目录执行npm publish就好了

```js
npm publish
```

### 取消发布包

```js
npm unpublish [package-name] -f
```

### 取消发布包的指定版本

```js
npm unpublish [package-name]@version
```

## deprecate 弃用包

### 弃用整个包

```js
npm deprecate package-name  '弃用信息'
```

### 弃用包的单个版本

```js
npm deprecate package-name@version  '弃用信息'
```

### 取消弃用操作

#### 将弃用消息改为空字符串即可

```js
npm deprecate package-name ''
```

## 其他操作

### 查看项目中那些包过时

```js
npm outdated
```

### 查看本地中那些包过时

```js
npm outdated  -g  --depth=0
```

### 列出 node_modules 中的所有包

```js
ls node_modules
dir node_modules
```

### 审计项目中所有包的安全漏洞

```js
npm audit
```

#### 这个命令依赖 package-lock.json 文件,所以如果你用的是yarn需要使用下面的命令

```js
yarn audit
```

### 执行后会列出有问题的包

* Critical 需要立即解决的!
* High 需要尽快解决!
* Moderate 在时间允许的情况下解决
* Low 随便你,不慌不燥不急不忙

### 检测一下当前镜像源的延迟

```js
npm ping
```

### 检测当前 node 和 npm 存在的问题 👇

```js
npm doctor
```
