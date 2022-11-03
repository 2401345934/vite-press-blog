---
createTime: 2022/11/03
tag: '工程化,npm'
---
# 实现命令行自动补全

当 npm script 里面积累的命令越来越多时，重度命令行用户肯定会好奇，能不能实现类似 bash、zsh 里面的命令自动补全？答案是肯定的，下面来逐一介绍。

## 把 npm completion 集成到 shell 中

npm 自身提供了自动完成工具 completion，将其集成到 bash 或者 zsh 里也非常容易

官方文档里面的集成方法如下

```js
npm completion >> ~/.bashrc
npm completion >> ~/.zshrc
```

## 更高级的自动完成

人类对于效率的追求是永无止境的，工程师更是如此，npm 命令补全到目前为止显然还不够高效，能不能补全 package.json 里面的依赖名称？能不能在补全 npm script 的时候列出这个命令是干啥的？

有人已经帮我们解决了这个痛点，还写成了 zsh 插件（bash 的同学无福消受了）：zsh-better-npm-completion，它有以下几个让人无法拒绝的便利：
<https://github.com/lukechilds/zsh-better-npm-completion>

### 1. 在 npm install 时自动根据历史安装过的包给出补全建议

![图片](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/12/3/1601bce81ef5dac6~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

### 2. 在 npm uninstall 时候根据 package.json 里面的声明给出补全建议

![图片](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/12/3/1601bcec1c11549f~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

### 3. 在 npm run 时补全建议中列出命令细节

![图片](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/12/3/1601bcf08dc06346~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)
