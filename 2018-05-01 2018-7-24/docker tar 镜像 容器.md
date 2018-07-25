# docker tar 镜像 容器相互转换

学习 使用 docker 也有一段时间了 但是在基础去上面有些东西总是容易忘记

整理之前看到的文档,看到一个问题 怎么将一个容器导出成为tar,我本以为是首先 保存成为镜像 再 save 进行保存 

查找资料之后发现 并不是这样的

我画一张命令图

![](http://on7r0tqgu.bkt.clouddn.com/FgWq6TEi5TtkWouzK035xvTzu2ZT.png)

这里使用centos_latest.tar

####tar > images

```
docker load -i centos_latest.tar   
docker tag pid centos:latest
```

为什么是load? 

因为当镜像是save保存tar包就使用load引出

为什么使用tag?

因为load导入的镜像是没有名称的,需要使用tag加标签 才可以使用

####images > container

```bash
docker run -dit centos:latest /bin/bash   //示例启动代码
```

这里容器就在运行了 `docker ps`,就能看到

#### container > images

```bash
docker commit pid new_centos:latest /bin/bash
```

生成镜像有两种方式 Dockerfile 以及commit

至于这两种方式有什么不同 下次再写吧

#### images> tar

```
docker save new_centos:latest > new_centos.tar
```

一定要加 `>` 不然会报错

#### container > tar

```
docker export pid > centos_container.tar
```

export 将容器直接导出成为tar包

#### tar > images

```bash
docker import centos_container.tar centos:latest
```

## docker save和docker export的区别

总结一下docker save和docker export的区别：

1. docker save保存的是镜像（image），docker export保存的是容器（container）；
2. docker load用来载入镜像包，docker import用来载入容器包，但两者都会恢复为镜像；
3. docker load不能对载入的镜像重命名，而docker import可以为镜像指定新名称。

