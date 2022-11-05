---
createTime: 2022/11/05
tag: 'Linux'
---

# 硬链接和软链接

众所周知，Unix/Linux系统中一切皆文件。可见，文件在Linux系统中非常重要。我们平常比较直观的对于文件的感受肯定是文件名和文件内容。但在Linux的文件系统中，除了文件名和文件内容，还有一个很重要的概念，就是`inode`。  

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d7537b783dab46cc8ee92d34064cb2ec~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

inode
-----

维基百科这样描述`inode`：

> The **inode** (index node) is a data structure in a Unix-style file system that describes a file-system object such as a file or a directory. Each inode stores the attributes and disk block locations of the object's data.File-system object attributes may include metadata (times of last change,access, modification), as well as owner and permission data. A directory is a list of inodes with their assigned names. The list includes an entry for itself, its parent, and each of its children.

意思就是：inode是类Unix文件系统中用来描述文件系统对象（比如文件或文件夹）的一种数据结构。它存储着文件的各种属性（最近一次inode变动的时间、最近一次访问的时间、最近一次修改的时间等元信息，以及权限信息等）。文件夹是一组inode，包括自身的入口、父节点的入口以及所有子节点。  

其实，inode包含的内容不止上面这些，具体有：

1. 文件的字节数
2. 文件的User ID
3. 文件的Group ID
4. 文件的读、写、执行权限
5. 时间戳：ctime，inode上一次变动的时间；mtime，文件内容上一次变动的时间；atime，文件上一次打开的时间
6. 链接数，即有多少个文件名指向这个inode
7. 文件数据block的位置

Linux使用的`ext2/ext3`文件系统中，不同类型的数据存放在不同的区域。inode组成的inode table存放在一个位置，文件数据块则存在另外一个位置。  

inode不包含文件名，文件名存放在文件夹信息的结构体里。文件名相当于inode的别名，便于我们管理和记忆。Linux系统对文件的操作都是通过inode做到的，当我们修改文件时，系统从文件夹的信息结构体里找到文件名对应的inode，再通过存储在inode中的文件数据block地址找到对应的硬盘位置进行读写操作。  

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/322bec09f99a4633a77dbd1b42b56a80~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

硬链接
---

一般来说，inode与文件名、文件数据是一对一的关系，但我们可以通过shell命令让多个文件名指向同一个inode，这种就是硬链接（hard link）。  

使用`ln <origin> <destination>`命令可以创建硬链接，如

```
ln test.txt test_hard.txt

```

对应nodejs的`fs.link`方法。  

创建硬链接前，`test.txt`可以这样表示：  
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1f2d3a6ceaa84b9f818bf54fe6d97b84~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)  
创建硬链接后：  
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7acca2045a414137883fa9bc402a771f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)  
可以看到，`test_hard.txt`的inode跟源文件`test.txt`使用的是同一个，只是现在链接数变成2了。  

我们可以执行`ls -li`查看一下。  
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e3e00ef043d849d9b4177b09f1fbfebe~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)  
第一列是inode number，可以看到都是`13029546`，所以两个文件使用的是同一个inode。第二列是权限信息，第四列是拥有者，第六列是文件内容大小。可以看到，除了文件名不一样之外，硬链接创建的文件跟源文件的所有元信息完全一样。第三列表示链接数，可以看到，目前链接数为2。  

由于硬链接文件和源文件使用同一个inode，并指向同一块文件数据，除文件名之外的所有信息都是一样的。所以这两个文件是等价的，可以说是互为硬链接文件。修改任意一个文件，可以看到另外一个文件的内容也会同步变化。

软链接
---

准确来说叫符号链接（symbolic link），一般又叫软链接（soft link）。与硬链接共用一个inode不同，软链接会创建新的inode，并指向源文件。可以理解软链接就是windows系统中的桌面快捷方式。  
​

创建软链接的命令和硬链接很像，多了`-s`参数：`ln -s <origin> <destination>`：

```
ln -s test.txt test_symbolic.txt

```

对应的nodejs的`fs.symlink`方法。  

创建软链接之后：  
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4f1f164ace6e4b04a791d7a934bc1fe7~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)  
源文件inode的链接数还是1，创建了新的inode，软链接指向源文件。  

执行ls -li看一下：  
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9aaa5b03f6f94f83ae00576db365fbcc~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)  
可以看到，软链接的inode number跟源文件的不一样，权限一列开头为小写L，表示软链，链接数为1，大小为8个字节。没错，软链文件也有大小，不过一般很小，毕竟只是一个快捷方式。

对比
--

### 文件重命名或文件移动

文件重命名和文件移动对于Linux系统来说都是文件绝对路径的更改。对硬链接来说，文件重命名或文件移动不会改变链接指向，而对软链接来说，文件重命名或文件移动则使链接断开，这时通过软链接修改文件内容时会重新创建一个新的inode，跟原文件名和文件数据块关联。

### 文件删除

`rm`命令或者nodejs的`unlink`其实是将inode的链接数减1。对于前文的硬链接，删除`test_hard.txt`使得`inode1`的链接数变成1，当链接数变成0时，系统就会释放掉这个inode，之后再创建的新文件就可以使用该inode的inode number了。这时没有inode指向文件数据block，所以文件找不到了。但实际上文件数据还存在硬盘中，所以经常能看到网上有一些帮助恢复误删的文件的工具。软链接inode链接数为1，删除软链接则系统释放该inode。

### 链接文件和文件夹

软链接可以链接文件和文件夹，但硬链接只能链接文件。

### 不同文件系统创建链接

软链接可以跨不同的文件系统创建，但是硬链接不行，因为硬链接是共用一个inode，而不同的文件系统有不同的inode table。

应用场景
----

### 硬链接

1. 文件备份：为了防止重要的文件被误删，文件备份是一种好的办法，但拷贝文件会带来磁盘空间的消耗。硬链接能不占用磁盘空间实现文件备份。
2. 文件共享：多人共同维护同一份文件时，可以通过硬链接的方式，在私人目录里创建硬链接，每个人的修改都能同步到源文件，但又避免某个人误删就丢掉了文件的问题。
3. 文件分类：不同的文件资源需要分类，比如某个电影即是的分类是外国、悬疑，那我们可以在外国的文件夹和悬疑的文件夹里分别创建硬链接，这样可以避免重复拷贝电影浪费磁盘空间。有人可能说，使用软链接不也可以吗？是的，但不太好。因为一旦源文件移动位置或者重命名，软链接就失效了。

### 软链接

1. 快捷方式：对于路径很深的文件，查找起来不太方便。利用软链接在桌面创建快捷方式，可以迅速打开并编辑文件。
2. 灵活切换程序版本：对于机器上同时存在多个版本的程序，可以通过更改软链接的指向，从而迅速切换程序版本。[这里](https://link.juejin.cn/?target=https%3A%2F%2Fwww.eet-china.com%2Fmp%2Fa76055.html "https://www.eet-china.com/mp/a76055.html")提到了python版本的切换可以这么做。
3. 动态库版本管理：不是很懂，具体可以看[这里](https://link.juejin.cn/?target=https%3A%2F%2Fwww.eet-china.com%2Fmp%2Fa76055.html "https://www.eet-china.com/mp/a76055.html")。

总结
--

1. Linux系统通过inode管理文件，inode存储着文件字节数、文件权限、链接数、数据block位置等信息。
2. 硬链接与源文件共用inode，除了文件名不同，其他与源文件一样。不能对文件夹创建硬链接，不能对不同的文件系统的文件创建硬链接。
3. 软链接类似于windows的快捷方式，有独立的inode。可以对文件夹或不同文件系统的文件创建软链接。
4. 硬链接和软链接修改文件内容都会同步到源文件，因为本质上它们都是指向源文件的数据block。
