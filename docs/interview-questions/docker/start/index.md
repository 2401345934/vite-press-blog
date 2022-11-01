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

## 底层原理简介

docker 底层使用了一些 linux 内核的特性，大概有 namespace，cgroups 和 ufs。

### namespace

docker 使用 linux namespace 构建隔离的环境，它由以下 namespace 组成

* pid: 隔离进程
* net: 隔离网络
* ipc: 隔离 IPC
* mnt: 隔离文件系统挂载
* uts: 隔离hostname
* user: 隔离uid/gid

## 进阶技巧总结

### 镜像仓库与拉取

* 大部分时候，我们不需要自己构建镜像，我们可以在官方镜像仓库 Docker Hub拉取镜像。
* 可以简单使用命令 docker pull 拉取镜像。
* 拉取镜像后可以使用 docker inspect 查看镜像信息，如配置及环境变量等。

```docker
# 加入拉取一个 node:alpine 的镜像
$ docker pull node:alpine

# 查看镜像信息
$ docker inspect node:alpine

# 列出所有镜像
$ docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
node                alpine              f20a6d8b6721        13 days ago         105MB
mongo               latest              965553e202a4        2 weeks ago         363MB
centos              latest              9f38484d220f        8 months ago        202MB
```

### 构建镜像与发布

但并不是所有的镜像都可以在镜像仓库中找到，另外我们也需要为我们自己的业务应用去构建镜像。
使用 docker build 构建镜像，docker build 会使用当前目录的 Dockerfile 构建镜像，至于 Dockerfile 的配置，参考下节。

```docker
# -t node-base:10: 指定镜像以及版本号
# .: 指当前路径
$ docker build -t node-base:10 .
```

### Dockerfile

在使用 docker 部署自己应用时，往往需要独立构建镜像。
docker 使用 Dockerfile 作为配置文件构建镜像，简单看一个 node 应用构建的 dockerfile。
Dockerfile 的各个指令可参考 Dockerfile Reference。

```docker
FROM node:alpine

ADD package.json package-lock.json /code/
WORKDIR /code

RUN npm install --production

ADD . /code

CMD npm start
```

### FROM

基于一个旧有的基础镜像，格式如下。

```docker
FROM <image> [AS <name>]

# 在多阶段构建时会用到
FROM <image>[:<tag>] [AS <name>]

FROM node:16-alpine
FROM nginx:alpine
```

### ADD

把宿主机的文件或目录加入到镜像的文件系统中。

```docker
ADD [--chown=<user>:<group>] <src>... <dest>

ADD . /code
```

### RUN

在镜像中执行命令，由于 ufs 的文件系统，它会在当前镜像的顶层新增一层。

```docker
RUN <command>

RUN npm run build
```

### CMD

指定容器如何启动。

一个 Dockerfile 中只允许有一个 CMD

```docker
# exec form, this is the preferred form
CMD ["executable","param1","param2"] 

# as default parameters to ENTRYPOINT
CMD ["param1","param2"]

# shell form
CMD command param1 param2

CMD npm start
```

### 容器

镜像与容器的关系，类似于代码与进程的关系。

* docker run 创建容器
* docker stop 停止容器
* docker rm 删除容器

### 创建容器

基于 nginx 镜像创建一个最简单的容器：启动一个最简单的 http 服务
使用 docker run 来启动容器，docker ps 查看容器启动状态

```docker
# 启动 nginx 容器，并在本地 8888 端口进行访问
$ docker run --rm -it --name nginx -p 8888:80 nginx:alpine

$ docker ps -l
CONTAINER ID        IMAGE                COMMAND                  CREATED             STATUS              PORTS                    NAMES
404e88f0d90c        nginx:alpine         "nginx -g 'daemon of…"   4 minutes ago       Up 4 minutes        0.0.0.0:8888->80/tcp     nginx
CONTAINER ID        IMAGE                COMMAND                  CREATED             STATUS              PORTS                    NAMES
```

其中:

* --rm：当停止容器时自动清楚容器
* -it：可交互式、赋予 tty 的方式
* --name：为容器指定名称
* -p host-port:container-port：宿主机与容器端口映射，方便容器对外提供服务
* nginx:alpine：基于该基础镜像创建容器

此时在宿主机使用 curl 测试容器提供的服务是否正常

```docker
$ curl localhost:8888
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
    body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
    }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
```

那如果要进入容器环境中呢？使用 docker exec -it container-name 命令

```docker
$ docker exec -it nginx sh
/ #
/ #
/ #
```

### 容器管理

docker ps 列出所有容器

```docker
$ docker ps
CONTAINER ID        IMAGE                COMMAND                  CREATED             STATUS              PORTS                    NAMES
404e88f0d90c        nginx:alpine         "nginx -g 'daemon of…"   4 minutes ago       Up 4 minutes        0.0.0.0:8888->80/tcp     nginx
498e7d74fb4f        nginx:alpine         "nginx -g 'daemon of…"   7 minutes ago       Up 7 minutes        80/tcp                   lucid_mirzakhani
2ce10556dc8f        redis:4.0.6-alpine   "docker-entrypoint.s…"   2 months ago        Up 2 months         0.0.0.0:6379->6379/tcp   apolloserverstarter_redis_1
```

docker port 查看容器端口映射

```docker
$ docker port nginx
80/tcp -> 0.0.0.0:8888
```

docker stats 查看容器资源占用

```docker
$ docker stats nginx
CONTAINER ID        NAME                CPU %               MEM USAGE / LIMIT     MEM %               NET I/O             BLOCK I/O           PIDS
404e88f0d90c        nginx               0.00%               1.395MiB / 1.796GiB   0.08%               632B / 1.27kB       0B / 0B             2
```

### 容器测试

如果某时某个容器出现问题，可直接进入容器内部进行调试。

```docker
docker exec -it <container_name>
```

### docker compose

在 docker compose v2 中，使用了 docker compose 命令去替代了 docker-compose 命令，可以通过 docker compose version 查看版本号。

```docker
$ docker compose version
Docker Compose version v2.6.0

# 如果是 v1 版本，则需要通过 docker-compose 查看命令
$ docker-compose version
docker-compose version 1.29.2, build 5becea4c
docker-py version: 5.0.0
CPython version: 3.7.10
OpenSSL version: OpenSSL 1.1.0l  10 Sep 2019
```

在当前目录，新建配置文件为 docker-compose.yaml，内容如下

```yaml
version: "3"
services:
  app:
    image: "nginx:alpine"
    ports:
      - 8000:80
```

此时可通过 docker compose up 启动容器。
