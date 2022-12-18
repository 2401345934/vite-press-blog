---
createTime: 2022/12/18
tag: '工具'
---
# 快速搭建前端Mac环境

一、终端
----

> 一个好看的终端，可以给自己带来好心情

### 1\. iTerm2

* [下载地址](https://link.juejin.cn/?target=https%3A%2F%2Fiterm2.com "https://iterm2.com")
* 设置默认终端

  * 安装完成后，在/bin目录下会多出一个zsh的文件。
  * Mac系统默认使用bash作为终端，可以使用命令修改默认使用zsh：

```
chsh -s /bin/zsh
```

* 如果想修改回默认bash，同样使用chsh命令即可：

```
chsh -s /bin/bash
```

* 最初iTerm2的样子 ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2032e0c11c984f2a9d31693207c056a4~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

### 2\. 使用Oh My Zsh 打扮终端

* 安装Oh my zsh

  * 第一种：curl 安装方式

 ```
# curl 安装方式
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

* 第二种：wget 安装方式

```
# wget 安装方式
sh -c "$(wget https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"
```

* 安装时候出现异常：`curl: (7) Failed to connect to raw.githubusercontent.com port 443: Connection refused`

  * 使用[www.ipaddress.com/](https://link.juejin.cn/?target=https%3A%2F%2Fwww.ipaddress.com%2F "https://www.ipaddress.com/") 查出raw.githubusercontent.com IP ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/86a972fa21cf444cb803deb369d966f6~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)
  * 修改 hosts 文件，输入如下命令：`sudo vim /etc/hosts`
  * 在hosts文件中添加

```
#githubhomebrew
查到的ip地址  raw.githubusercontent.com
```

* 继续安装

```
# curl 安装方式
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

* 安装成功效果图 ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f6b64a3816b403193b130e4ec6ca9f9~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)
* 安装PowerLine

  * 首先安装pip，如果有了跳过

 ```
  sudo easy_install pip
 ```

* 如果安装失败 ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d08ccd29f6574c3d88c44af62a9a9911~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

* 下载脚本并安装get-pip.py

 ```
     curl https://bootstrap.pypa.io/get-pip.py | python3
 ```

* 安装成功效果图 ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b2f1e12e99f74dde81c96f287d814b0d~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

* 安装PowerLine

 ```
 pip install powerline-status --user
 ```

* 安装PowerFonts

  * 创建存放资源文件夹

 ```
   mkdir ~/Desktop/OpenSource
 ```

 ```
        cd ~/Desktop/OpenSource
        # git clone
        git clone https://github.com/powerline/fonts.git --depth=1
        # cd to folder
        cd fonts
        # run install shell
        ./install.sh
 ```

    如果git clone 下载失败，可以直接 链接到 [github.com/powerline/f…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fpowerline%2Ffonts.git "https://github.com/powerline/fonts.git") 直接下载zip然后解压，再执行上面clone后面的操作，注意 下载的zip后，文件名后面携带了分支-master，比如 fonts 下载的是 fonts-master，需要cd到 fonts-master中。下面遇到git clone问题，可以这么操作。

* 成功效果图 ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6ec8fc69e452426e8ce48a58ca307f64~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)
* 设置iTerm2字体  
        安装好字体库之后，我们来设置iTerm2的字体，具体的操作是iTerm2 -> Preferences -> Profiles -> Text，在Font区域选中Change Font，然后找到Meslo LG字体。有L、M、S可选，看个人喜好： ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f9c696fd91334f778e46ff9651239d9e~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)
* 安装配色方案

    ```
    cd ~/Desktop/OpenSource
    git clone https://github.com/altercation/solarized
    cd solarized/iterm2-colors-solarized/
    open .
    
    ```

    在打开的finder窗口中，双击Solarized Dark.itermcolors和Solarized Light.itermcolors即可安装明暗两种配色：

    ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/12a509715fd94db4963d513309c65fe6~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?) 再次进入iTerm2 -> Preferences -> Profiles -> Colors -> Color Presets中根据个人喜好选择这两种配色中的一种即可： ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/940c2ef25a794b06968cc6a7fd969933~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

* 安装主题 下载agnoster主题，执行脚本安装：

```
cd ~/Desktop/OpenSource
git clone https://github.com/fcamblor/oh-my-zsh-agnoster-fcamblor.git
cd oh-my-zsh-agnoster-fcamblor/
./install

```

执行上面的命令会将主题拷贝到oh my zsh的themes中：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/096b23ac762e444dbfadfa462784794f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?) 拷贝完成后，执行命令打开zshrc配置文件，将ZSH\_THEME后面的字段改为agnoster。

```
vim ~/.zshrc

```

修改完成后按一下esc调出vi命令，输入:wq保存并退出vi模式。  
此时command+Q或source配置文件后，iTerm2变了模样：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2b91c2edf77f489e835d230e3b038d48~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

* 安装高亮插件  
    这是oh my zsh的一个插件，安装方式与theme大同小异：

    ```
    cd ~/.oh-my-zsh/custom/plugins/
    git clone https://github.com/zsh-users/zsh-syntax-highlighting.git
    vi ~/.zshrc
    
    ```

    这时我们再次打开zshrc文件进行编辑。找到plugins，此时plugins中应该已经有了git，我们需要把高亮插件也加上：

    ```
        plugins=(
            git
            zsh-syntax-highlighting
        )
    
    ```

    请务必保证插件顺序，zsh-syntax-highlighting必须在最后一个。  
    然后在文件的最后一行添加：  

    ```
    source ~/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
    
    ```

    按一下esc调出vi命令，输入:wq保存并退出vi模式。  
    执行命令使刚才的修改生效：  

    ```
    source ~/.zshrc
    
    ```

* 设置iTerm2背景图设置  
    更换背景图片方式：iTerm2 -> Preferences -> Profiles -> Window -> BackGround Image勾选图片即可。

* 可选择、命令补全 跟代码高亮的安装方式一样，这也是一个zsh的插件，叫做zsh-autosuggestion，用于命令建议和补全。

```
cd ~/.oh-my-zsh/custom/plugins/
git clone https://github.com/zsh-users/zsh-autosuggestions
vi ~/.zshrc

```

找到plugins，加上这个插件即可：

```
plugins=(
        git
        zsh-autosuggestions
        zsh-syntax-highlighting
)

```

插件效果： ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e2dfad217c1b42bfbd00412b5cc4a157~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image) 有同学说补全命令的字体不太清晰，与背景颜色太过相近，其实可以自己调整一下字体颜色。  
Preferences -> Profiles -> Colors 中有Foreground是标准字体颜色，ANSI Colors中Bright的第一个是补全的字体颜色。

* 解决Mac下VSCode打开zsh乱码 ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dddd7ee7ac9c44838bc2e4d8613c1a6c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)
  * 在字体册查找是否已经安装`Meslo LG M for Powerline`字体，如果未安装就安装一下。

  * VSCode中配置

    * 使用`⌘,`打开settings界面,搜索`terminal`,在`Font Family`中添加字体`Meslo LG M for Powerline` ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a288ea761c194f0096d74aed25b727ff~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

        > 也可以在VSCode的settings.json文件，加入 : "terminal.integrated.fontFamily": "Meslo LG M for Powerline",

  * 效果图 ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2d0b6bf6e3c747628fb6a0400f14b76b~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

二. 安装brew
---------

* [安装地址](https://link.juejin.cn/?target=https%3A%2F%2Fbrew.sh%2Findex_zh-cn "https://brew.sh/index_zh-cn")

  * mac在安装homebrew时报curl: (7) Failed to connect to raw.githubusercontent.com port 443: Connection refused
  * 使用国内镜像

    ```
        # 镜像选择推荐选择清华大学TUNA镜像源;如果下载过慢，推荐使用根据执行提示，重新选择镜像源
        /bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
    
    ```

三. 安装node版本管理工具 -- nvm
----------------------

* [安装教程](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fnvm-sh%2Fnvm "https://github.com/nvm-sh/nvm")
* 三种方式```
    curl -o- <https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh> | bash

    ```
    ```

    wget -qO- <https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh> | bash

    ```
    ```

    brew install nvm

    ```
    如果有下载问题，请参考 上面**安装Oh my zsh**异常
* 添加环境变量  
    在`~/.bash_profile`, `~/.zshrc`, `~/.profile`, or `~/.bashrc`其中一个配置文件中添加下面的内容```
        export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

    ```

* 修改镜像
  * vim ~/.zshrc 末尾添加 `export NVM_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node`
  * source ~/.zshrc
  * 即可使用

四. npm & yarn 源管理工具 -- cgr
--------------------------

```bash
npm i -g cgr
```

* cgr使用 ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/852d912f0d9740bc96dac63dd1862e9e~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

五. git
------

```

brew install git

```

如果 遇到 `fatal: not in a git directory` `Error: Command failed with exit 128: git` 问题，网上给出的是执行 `brew doctor`,再根据提示操作，下面操作是将镜像改为 github.com,更改后你会下载更慢 ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7b564f21eb4b4fdda164a718d1c491cc~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

解决方案：

* 先将brew镜像改为国内，然后brew install xx，下载之后会提示上面的错误，不着急，咱们再还原到github。
* 将brew镜像改为国内

```

# brew.git

cd "$(brew --repo)"
git remote set-url origin <https://mirrors.ustc.edu.cn/brew.git>

# homebrew-bottles

echo 'export HOMEBREW_BOTTLE_DOMAIN=<https://mirrors.ustc.edu.cn/homebrew-bottles>' >> ~/.zshrc
source ~/.zshrc

# homebrew-core.git

cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin <https://mirrors.ustc.edu.cn/homebrew-core.git>

# homebrew-cask.git

cd "$(brew --repo)/Library/Taps/homebrew/homebrew-cask"
git remote set-url origin <https://mirrors.ustc.edu.cn/homebrew-cask.git>

```

* `brew install xx` 之后 还原

```

# brew.git

cd "$(brew --repo)"
git remote set-url origin <https://github.com/Homebrew/brew.git>

# homebrew-bottles

vi ~/.zshrc
然后，删除 HOMEBREW_BOTTLE_DOMAIN 这一行配置
source ~/.zshrc

# homebrew-core.git

cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin <https://github.com/Homebrew/homebrew-core.git>

# homebrew-cask.git

cd "$(brew --repo)"/Library/Taps/homebrew/homebrew-cask
git remote set-url origin <https://github.com/Homebrew/homebrew-cask.git>

```

* 最后再 `brew install xx` 就会从之前已经下载好的文件进行安装了。

六. nginx
--------

```

brew install nginx

```

七. vscode
---------

* [下载地址](https://link.juejin.cn/?target=https%3A%2F%2Fcode.visualstudio.com%2Fdownload "https://code.visualstudio.com/download")
* Fira Code 什么是Fira Code，先上图 ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eccd4ed0bd4c4712a53c950fc8ad9338~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)
  * 如何安装，原文[参考](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Ftonsky%2FFiraCode%2Fwiki%2FVS-Code-Instructions "https://github.com/tonsky/FiraCode/wiki/VS-Code-Instructions")

  * [下载字体](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Ftonsky%2FFiraCode%2Fwiki%2FInstalling "https://github.com/tonsky/FiraCode/wiki/Installing")，我这边选择[手动下载](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Ftonsky%2FFiraCode%2Freleases "https://github.com/tonsky/FiraCode/releases") ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e7e1c21c09ef43579c6c8b42f72d1a6e~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?) ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/65896e41eed64af8b7f44bb5b8712894~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

  * 手动编辑 `vscode` 的 `settings.json`

    * `Cmd` + `,` ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a854877122324b20ae3eb1fa63bfabb8~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)
    * 设置字体

        ```
            "editor.fontFamily": "Fira Code",
            "editor.fontLigatures": true,
        
        ```

        ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/02bfc6c23d3647939d7c4f7ac10f9f42~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

        > 如果设置没有效果，重启一下Vscode就行了

八. 内网穿透 -- [ngrok](https://link.juejin.cn/?target=https%3A%2F%2Fngrok.com "https://ngrok.com")
----------------------------------------------------------------------------------------------

```

brew install ngrok

```

* 使用

```

 ngrok http 80

```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c89acdc26f2a49c7b4bf3a3801442673~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

访问地址：[xxxxxx.ngrok.io](https://link.juejin.cn/?target=https%3A%2F%2Fxxxxxx.ngrok.io "https://xxxxxx.ngrok.io")

> 📢 📢 📢**注意：** ngrok http 80 其中：80是本地启动的服务端口号
