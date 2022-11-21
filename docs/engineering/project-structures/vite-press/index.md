---
createTime: 2022/11/21
tag: '工程化,项目搭建,Vue,Vite'
---


# vite-press 搭建个人博客

现在几乎每个人都会有自己的博客 那么我们今天也来尝试一下

## vitepress 官网

<https://vitepress.vuejs.org/>

## 创建我们自己的个人博客

### 创建项目

```
mkdir blog && cd blog && npm init -y 
```

这样我们就创建了一个blog 文件

### 初始化 git

```js
git init 
```

### 下载依赖

```js
yarn add --dev vitepress vue
```

### 修改 package.json

```
{
  ...
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:serve": "vitepress serve docs"
  },
  ...
}

```

### 就可以直接启动项目了

```
yarn docs:dev
```

### 添加我们的第一个页面

```
.
├─ docs
│  ├─ getting-started.md
│  └─ index.md
└─ package.json

```

后续就是添加我们自己喜欢保存的内容了

## 推荐一个博客模版

<https://github.com/2401345934/vitepress-template>

## 推荐一个自己的博客

<https://2401345934.github.io/vite-press-blog/>

感兴趣的小伙伴可以直接 fork 然后修改成为自己的博客

附上源码：
<https://github.com/2401345934/vite-press-blog>
