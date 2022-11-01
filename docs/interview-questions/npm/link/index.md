---
createTime: 2022/10/24
tag: 'npm'
---
# link 创建软链

### 使用软链 npm link

主要是平时开发时，有npm包需要在本地调试好了再发布。发一版测一版，或者把代码复制粘贴到项目文件夹里去调试，很不优雅。软链就变得极为有用了，特别是需要调试的npm包不止一个，且彼此之间需要联调。

### 1. 什么是软链？

简单说就是为开发的模块(待发布的npm包)创造一个全局链接，在主项目里链接这个依赖的模块，进行测试。

### 2. 如何创建、使用、去除软链？

#### 2.1 先在对应npm包的文件创建一个全局的链接

```javascript
cd ~/projects/package-project npm link
```

#### 2.2 然后再想要使用该包的项目里使用这个软链

Tips: 注意这里的packageName一定要对应你的npm包package.json里的name字段值。

```javascript
cd ~/projects/package-project npm link packageName
```

好啦，通过上边两步，我们已经可以在主项目里使用位于本地的npm包了😊。

#### 2.3 用完了如何去除软链呢？

下边两步的顺序，我自己试了下，颠倒顺序其实也没报错。但是既然有同学提出来了，我觉得逻辑上先unlink包再删掉全局link可能更合理些。

#### 2.31 先在使用npm包的项目的文件目录下解除特定的链接

```javascript
npm unlink packageName
```

#### 2.32 再在npm包所在的文件目录下去除全局链接

```js
npm unlink
```

到这里其实就OK了

#### 2.33 强制解除创建的某个特定全局链接

```javascript
sudo npm rm --global packageName
```

#### 2.34 查看所有创建的全局链接名称

```js
npm ls --global --depth 0
```
