---
createTime: 2022/11/05
tag: '工具,命令行'
---
# Warp

程序员的一生，用的最多的两个工具，一个是代码编辑器（Code Editor），另外一个就是命令行终端工具（Terminal）。这两个工具对于提高开发效率至关重要。

代码编辑器在过去的 40 年里不断进化，从我上大学敲 Java 代码开始，就经历了 MyEclipse、NetBeans、Eclipse，到如今称王称霸的 Intellij IDEA。

但终端工具，基本上和上个世纪七八十年代差不多。

那本期给大家推荐的这款终端——Warp——绝对会让你大开眼界，用完爱不释手！

Warp，一个超级牛叉的 terminal，号称是 21 世纪的终端，还未正式发布，就获得了两千三百万美元的融资。

> 官方网站：[www.warp.dev/](https://link.juejin.cn/?target=https%3A%2F%2Fwww.warp.dev%2F "https://www.warp.dev/")

Warp 在 GitHub 上也已经开源，目前已经有 2.8k+ 的 star 了。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e490a48492aa4ad0aba0f13173731cee~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

> GitHub 地址：[github.com/warpdotdev/…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fwarpdotdev%2FWarp "https://github.com/warpdotdev/Warp")

Warp 号称自己“Reinvent the Terminal”，也就是重新定义了终端，用过 vscode 的小伙伴是不是对这句口号似曾相识？

是的，vscode 号称自己“Code editing Redefined”，也就是重新定义了代码编辑器。

### 一、安装 Warp

直接到官网 `warp.dev` 点击「download now」就可以下载最新版了。下载完成后，双击安装包就可以安装了。完成后打开，界面还是非常清爽的。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/97e6026e91b543e592a873a7f322fa9e~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

Warp 支持 GitHub 账户登录。不过，如果你在登录的过程中因为某些原因无法完成跳转，可以通过下面的链接自行解决。

> [embiid.blog/post/WARP-d…](https://link.juejin.cn/?target=https%3A%2F%2Fembiid.blog%2Fpost%2FWARP-does-not-work-after-submitting-an-invite-code%2F "https://embiid.blog/post/WARP-does-not-work-after-submitting-an-invite-code/")

如果顺利登录，会跳转到这个页面。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b3af40670d844e29a98d77fee5bcf734~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

填写一些 Warp 的调查信息后，就会跳转到 Warp 的初始界面。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b063bb4bba6a480681462f211471e4b2~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

> 需要注意的是，Warp 目前仅支持 macOS 版，Linux 和 Windows 用户还需要等待一段时间。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d8c47dffd56e44958100e8f327f2a0b1~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

其实 macOS 版也是刚刚公测，我这份攻略绝壁是热乎乎的。想要第一时间关注 Warp 版本信息的话，可以戳下图中提到的链接填写自己的邮箱。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/81646789e9be419086acfaa164454727~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

### 二、使用 Warp

Warp 解决的第一个痛点，就是减少配置、方便输入、优化输出，并且增加常用命令的自动提示。

**1）智能提示**

普通的终端在你键入 tab 的时候，是这样提示的，就是简单地帮你罗列下。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a6f82267fffd4299b80373bbbce48a92~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

而 Warp 就非常的时髦，会给你滚动可选的列表形式展示出来。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d8bab5058a534599b1adbc19cd3bbf3a~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

Warp 的智能提示也更加“智能化”，它会猜测你下一步的命令到底输入什么。

比如说我的工作目录下有一个 README.md 的文件，那当我输入 `echo '沉默王二' >>`的时候它会把 `README.md` 提示在后面。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c1d2c131af9c4b16b68ce328d08631f5~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

**2）智能记忆**

Warp 会记录上一次执行的命令，在顶部会有一个提示的按钮，当你点击的时候，它会自动滚动到上一个命令执行的位置。

点击「clear」之前。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f89eabfb593d479c9c73f2938865b9d9~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

点击「clear」之后。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/395e6f3f211148a6a542968b1e37f4c1~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

**3）区域选择**

传统的终端，在复制区域命令和输出结果的时候需要全部手动选择，而 Warp 是可以点选的，之后可以通过右键菜单进行复制粘贴（可以选择只复制命令或者输出，也可以都选），非常方便。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a68bee7eb7cb40758e6e24a088201669~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

**4）历史命令**

传统的终端在通过 up-down 键选择历史命令的时候，一次只能提示一个命令。而 Warp 会把历史命令做成一个滚动的可以选择的列表。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f1ad8a5e67df48bfbf2f0e3b35175acc~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

**5）命令导航**

同时按下 Ctrl+Shift+R 可以打开命令导航，Warp 集成了很多工具的命令导航。比如说我们要执行 `git reset` 命令，那么到底格式什么，应该怎么执行，Warp 都提示的非常到位。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b2674b8bc8714ff4872b86a0e5fed8c0~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

这让我想起了 macOS 的效率工具 Alfred，可以搜索任何你想要的命令。

**6）AI 植入**

Warp 还提供了 AI 智能搜索，快捷键可以在 setting→keyboard shortcuts 中找得到，键入 AI 关键字即可。

可调整为自己喜欢的快捷键。我目前设置的是 `Ctrl+shift+>`。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d9457b9e7e2b42a78f629c59670274d1~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

比如说我问它“how many lines were changed in the last 2 commits?”

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/478874761e41458bbbfc6df5717b0877~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

Warp 解决的第二个痛点是增加协作功能。不过由于我目前没有邀请其他用户参与，还无法使用共享功能，后面有小伙伴体验的话，可以通过我分享的链接下载试一波。

> [app.warp.dev/referral/25…](https://link.juejin.cn/?target=https%3A%2F%2Fapp.warp.dev%2Freferral%2F25KR3Y "https://app.warp.dev/referral/25KR3Y")

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1ec2af36b41948909f677be9e08ae15a~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

### 三、配置 Warp

输入 Command+P 快捷键可以打开 Warp 的命令面板。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/178ee2dca11d4f1299c6094d5a73142f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

键入 `sett` 关键字就可以打开配置页。

比如说在「Appearance」选项卡里可以设置 Warp 的主题、字体，以及紧凑型模式。

大概有十多种主题可选，比如说这个女生非常喜欢的粉色系。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a4a3edde568145fdb5d9fd34141eb7f7~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

更多主题可以到 GitHub 仓库的 theme 页。

> [github.com/warpdotdev/…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fwarpdotdev%2Fthemes "https://github.com/warpdotdev/themes")

至于快捷键配置，如果不确定有哪些快捷键可以尝试，直接点击 Warp 顶部的这个温馨提示「welcome tips」就可以了。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/db423cd366f34bf7a373c3b548c5e518~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

### 四、总结

最后总结一波吧。

这波着实属于尝鲜了，市面上应该还木有 Warp 终端的普及安利文章，我这期应该属于大姑娘坐花轿———头一回。

害，登录折腾了好久，原因我就不多说了，小伙伴们自行体会哈。反正我是没被劝退。

幸好是没放弃，所以才体验到了 Warp 的强大之处，真的是改变了我对终端 terminal 的认知——太特喵的炫酷了！

* * *
