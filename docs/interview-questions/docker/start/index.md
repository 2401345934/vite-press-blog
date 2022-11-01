---
createTime: 2022/11/01
tag: 'docker'
---
# docker 起步

docker 使应用部署更加轻量，可移植，可扩展，更好的环境隔离也更大程度地避免了生产环境与测试环境不一致的巨大尴尬

## 认识Docker

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2c09275e60e947e4836c7323809cbbec~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

### 术语

docker 的架构图如下
![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b83f7ef6f44445fbbd960dfd3d656820~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

### 从图中可以看出几个组成部分

* docker client: 即 docker 命令行工具
* docker host: 宿主机，docker daemon 的运行环境服务器
* docker daemon: docker 的守护进程，docker client 通过命令行与 docker daemon 交互
* image: 镜像，可以理解为一个容器的模板，通过一个镜像可以创建多个容器
* container: 最小型的一个操作系统环境，可以对各种服务以及应用容器化，是镜像的运行实例
* registry: 镜像仓库，存储大量镜像，可以从镜像仓库拉取和推送镜像
* Docker 技术的三大核心概念，分别是：镜像 Image、容器 Container、仓库 Repository

## 安装 Docker

### 软件安装

* 在本地安装 docker/docker-compose，通过 Docker Desktop下载 docker 后，双击安装即可。
* 如果是个人服务器且为 linux，可参考 安装 docker ,它将 docker 与 docker compose 一并安装。

### 命令行安装

* Homebrew 的 Cask 已经支持 Docker for Mac，因此可以很方便的使用 Homebrew Cask 来进行安装，执行如下命令：

```docker
brew cask install docker
```

* 查看版本

```docker
docker -v
```

## 使用Docker启动一个vue项目

### 新建项目

使用Vue 脚手架构建项目

```js
npm init vue@latest
```

给项目起个名字，叫做docker-demo-vue

然后一路回车。运行命令：

```shell
cd docker-demo-vue
npm install
npm run dev
```

项目没啥问题，我们对项目进行打包：

```js
npm run build
```

### 新建 Dockerfile

在docker-demo-vue根目录下执行：

```docker
touch Dockerfile
```

此时的项目目录结构是这样的：
![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3cd273772060479ba041a9ce76f3bd4e~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

### 拉取 Nginx 镜像

* 首先打开你的Docker，默认会启动。
* 控制台拉取 Nginx 镜像：

```docker
docker pull nginx
```

出现下面的信息说明拉取Nginx镜像成功
![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/acd02c73c8bd4140a7000daef4a1b858~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

### 在根目录创建 Nginx 配置文件

```docker
touch default.conf
```

写入：

```nginx
server {
    listen       80;
    server_name  localhost;

    #charset koi8-r;
    access_log  /var/log/nginx/host.access.log  main;
    error_log  /var/log/nginx/error.log  error;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```

### 配置镜像

打开Dockerfile文件，写入：

```docker
FROM nginx  
COPY dist/ /usr/share/nginx/html/  
COPY default.conf /etc/nginx/conf.d/default.conf  
```

* FROM nginx 指定该镜像是基于 nginx:latest 镜像而构建的；
* COPY dist/ /usr/share/nginx/html/ 命令的意思是将项目根目录下 dist 文件夹中的所有文件复制到镜像中 /usr/share/nginx/html/ 目录下；
* COPY default.conf /etc/nginx/conf.d/default.conf 将 default.conf 复制到 etc/nginx/conf.d/default.conf，用本地的 default.conf 配置来替换 Nginx 镜像里的默认配置。

### 构建镜像

Docker 通过 build 命令来构建镜像：

```docker
docker build -t docker-demo-vue .
```

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/72205a4bd7d645e8aba8f94f9720974b~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)
出现上面的信息，表示构建成成功了。
参数说明：

* -t 参数给镜像命名 docker-demo-vue
* . 是基于当前目录的 Dockerfile 来构建镜像
运行docker image ls | grep docker-demo-vue查看镜像
![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b89dc49a84eb4e3f8c6a1f74f9497206~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)
可以看到我们构建了一个项目镜像。
在docker中也可以查看生成的镜像
![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4b32a3e1fa3d41b0a6a2fabc4f78fe2d~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

### 运行容器

```docker
docker run -d -p 3000:80 --name docker-vue docker-demo-vue
```

#### 参数解释

* -d 设置容器在后台运行
* -p 表示端口映射，把本机的 3000 端口映射到 container 的 80 端口（这样外网就能通过本机的 3000 端口访问了。
* --name 设置容器名 docker-vue
* docker-demo-vue 是我们上面构建的镜像名字

可以运行docker ps -a  查看容器id：
![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bbe6a154009b48218d88c000043695ab~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)
可以看到我们刚才打印的docker-vue的容器id为b6c49793ad48，跟上面的容器idb6c49793ad48ccfc106fab63f988881a1467ae25b5c4c9cee87ad4f3515f9607对应，默认是取了前12位。
同样的也可以在桌面端看到，正在运行的docker容器
![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/93e73388cc0c46d0a709be93248a4193~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

### 访问项目

可以在浏览器中看到对应的页面，跟我们前面创建项目的时候看到的界面是一样的
也可以使用curl -v -i localhost:3000 去查看对应的静态文件

### 发布镜像

* 如果你想为社区贡献力量，那么需要将镜像发布，方便其他开发者使用。
* 发布镜像需要如下步骤：
* 登陆 dockerhub，注册账号；
* 命令行执行 docker login，之后输入我们的账号密码，进行登录；
* 推送镜像之前，需要打一个 Tag，执行 docker tag  image username repository:tag
* 全流程结束，以后我们要使用，再也不需要「搬石头、砍木头、画图纸、盖房子」了，拎包入住。这也是 docker 独特魅力所在。
* 以上，就是如何使用docker去运行一个基础项目的示例。

## 层原理简介

docker 底层使用了一些 linux 内核的特性，大概有 namespace，cgroups 和 ufs。

### namespace

docker 使用 linux namespace 构建隔离的环境，它由以下 namespace 组成

* pid: 隔离进程
* net: 隔离网络
* ipc: 隔离 IPC
* mnt: 隔离文件系统挂载
* uts: 隔离hostname
* user: 隔离uid/gid
