# 镜像

- 镜像是容器运行的基础
- 镜像的依赖关系 -bootfs-根镜像-用户镜像1/镜像2 -容器
- 镜像的写时复制机制
- 通过docker 创建一个新的容器,实际上是在镜像之上创建一个空的文件系统层级,一旦修改,就会触发docker从父镜像中复制这个文件到临时镜像,所有修改都是在临时镜像里面,不会影响父镜像



## 本地镜像管理

#### 查看

- docker images

![images](http://on7r0tqgu.bkt.clouddn.com/FqIKGGEp4EtqanX1DIu6Rpjty2HX.png)

repository 仓库名称

tag 区分同一仓库的不同镜像 默认latest

image id 镜像id

created 镜像创建时间

virtual size 镜像所占用的大小

- docker inspect 镜像名  查看详细镜像信息

#### 镜像下载

docker run 运行镜像,会首先在本地寻找,没有则会docker hub里面下载

![](http://on7r0tqgu.bkt.clouddn.com/Fmin9VdfpAlhC181dJD_JikRsctX.png)

name 镜像名称

descripton 对进行得描述

stars 用户对镜像的评分

pfficial  时候是官方镜像

automated 是否使用了自动构建

- docker pull ubuntu 提前下载镜像 

#### 删除

docker rmi 镜像名   如果不指定,就会删除tag是latest的镜像

镜像删除不了 -f 限制删除 / 将依赖他的镜像和容器移除

### 创建本地镜像

#### commit

docker run -t -i ubuntu

apt-get update

.......

apt-get install sqlite3

.......

echo "test docker commit" >> hello docker

exit

容器完成修改 ,id下面有用

使用commit将容器修改提交到本地库,形成新的镜像

docker commit -m="Message" --author="host" fb29ccc6f1 host/splite3:vv

成功会返回成功id码

--m描述这次我们创建创建images的信息

--author 指定作者信息

host/splite3:vv 仓库名/镜像名 vv是tag名

使用刚才建立的镜像

docker -i -t run host/sqlite3:vv

sqlite3 -version  返回信息,表示成功

cat hello docker  返回 test docker commit  

sqlite安装完成

### 使用Dockerfile创建镜像

推荐使用Dcockerfile来创建镜像

docker build -t admin/file .

```linux
#Version 1.0.1
FROM ubuntu:latest
#from 指定等待拓展的父级元素,多个from则创建多个镜像
MAINTAINER wu.vkcyan "wu.vkcyan@gmail.com"
#maintainer 声明作者信息
USER root
#指令运行的指定用户
RUN apt-get update
RUN apt-get install -y nginx
#用来修改镜像,会在当前镜像创建镜像层,接下来的执行会在新的镜像上将继续执行
RUN touch test.txt && echo "abc" >>abc.txt
EXPOSE 80 8080 1038
expose 指定对外开放的端口号
ADD abc.txt /opt/
ADD /webapp/ opt/wedapp
ADD https://www.baidu.com/img/bd_logo1.png /opt/
add 向新镜像里面添加文件
ENV WEBAPP_PORT=9090
#env 设置容器运行的环境
WORKDIR /opt/
#workdir 为接下来的指令指定一个新的工作目录,当容器启动,指定的目录就是容器运行的当前工作路径
ENTYPOINT ["ls"]
CMD ["-a","-l"]
设置容器的默认运行命令
VOLUME ["/data","/var/www"]
volume在经向里面创建一个指定挂载点
ONBUILD ADD . /app/src
ONBUILD RUN echo "on build excuted" >> onbuild.txt
触发器指令,新的镜像使用from指令父镜为这个镜像的时候,就会触发onbbuild
```



接着是使用build来构建镜像

docker build -t xiaowu/file:v2

(这Docker里面写错了竟然依旧会导出镜像,不过是无法使用的)

(里面命令错误或者未知原因,没有成功,构建镜像时间等待太久,就暂时没有看了)

-t 后面指定镜像命名的空间,仓库 

