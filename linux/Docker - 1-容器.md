docker-镜像,容器,库

镜像 --  可以看成容器的代码,代码运行起来就是容器

容器 -- 运行时的环境 容器是执行的动态表现

库 -- 库是某个特定用户储存镜像的目录



# 安装



1.添加yum仓库

~~~linux
tee /etc/yum.repos.d/docker.repo <<-'EOF'  
[dockerrepo]  
name=Docker Repository  
baseurl=https://yum.dockerproject.org/repo/main/centos/$releasever/  
enabled=1  
gpgcheck=1  
gpgkey=https://yum.dockerproject.org/gpg  
EOF  
~~~

2.安装docker

yum install -y docker 

3.启动docker

systemctl start docker.service

4.检查时候成功

docker version

5.设置自动启动

systemctl enable docker

##创建容器

docker create 容器 创建容器但是停止状态

docker run 容器 创建容器 同时打开

交互性容器 

docker run -i-t  --name=admin_linux ubuntn /bin/bash

docker run  -i -t  -i 打开容器的标准输出, -t为容器建立命令终端 

容器名字是admin_linux 使用 ubuntu容器创建

docker 套在容器里面执行命令/bin/bash

进入shell之后,exit 或者ctrl+d退出

后台型容器

docker run --name=admin_two  -的ubuntu /bin/sh -c

-d 参数为创建后台型容器

### 查看容器

docker  ps -a 查看容器 包括不在运行的

docker ps -l  列出最后创建的容器

docker ps -n=2   列出最后创建的两个容器

image 容器

command 命令

created 创建时间

status 创建时间

prpts 对外开放的端口

### 启动容器

docker start hello-world 后面为容器名字

docker start .......              后面id号也可以启动

容器退出自动重启

--restart=always 无限重启

--restart=always on-failure:5    重启5次

docker run  --restart=always --name docker_restart -d ubuntu /bin/sh -c "while true;do echo hello world;sellp 1;done"

## 停止容器

docker stop admin_one 停止容器\

docker stop  ................  id同理

docker kill 强制停止

## 删除容器

docker rm admin_one 删除容器admin_one

docker rm `docker ps -a -q`

--a列出docker 所有容器 --q 列出id

# 容器内信息获取和命令的执行

之前是容器管理 属于外部操作 现在是容器内部操作

一:依附容器 attach

docker run -i -t ubuntu /bin/sh

- 不解,这里创建一个匿名容器,docker会自动给他一个名称,在里面没办法执行docker命令,创建出来终端已经有了,为什么还要依附终端?

二.查看终端日志

1.创建无限循环输出的后台型容器

- docker run -d --name deam_logs ubuntu /bin/bash -c 'for((i=0;1;i++));do echo $i;sleep 1;done;'

2.使用logs查看

docker logs  -f deam_logs

-f 实时查看日志,默认情况下.logs输出是从容器启动到调用长执行logs命令时的所有输出,之后就会立刻返回主机

也可以指定要看的行数

docker logs --tail=5 deam_logs 指定看最后5行

docker logs --tail=5 -t deam_logs 

-t 查看日志产生的时刻

#### 查看容器进程

docker top name_top 

#### 查看容器信息

docker inspect name_top(内容很多)

使用-f --format格式化标志

查看容器是否在运行

docker inspect -t='{{ .State.Running }}' name_top

查看容器的IP

docker inspect --format '{{ .NetworkSettings.IPAddress }}' name_top

同时查找多个命令,查看容器名 以及状态

docker inspect -f='{{.'Name}} {{.State.Running}}' name_top

#### 容器内部执行命令

- 后台型任务

docker exec -d name_top touch /etc/new_config_file 

touch 命令会在name_top容器创建一个new_config_file的文件

- 交互型任务

docker exec -i -t name_jh /bin/bash 

创建交互终端 可以运行命令和查看信息

#### 容器的导出与导入

- 导出  export

docker export home_jh >my_home.tar

将home——jh导出 为my_home.tar

- 导入import

cat my_home.tar | docker import - imported:container

通过docker images查看镜像

imported 镜像名字

container 附加的标签

docker import url res:tag  导入网络上面的容器(没看懂这命令)



## Docker镜像

docker images 列出本地储存的镜像	