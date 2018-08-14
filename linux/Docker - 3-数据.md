在下载镜像的时间总结一下命令

docker images 查看镜像
docker ps 查看容器
docker ps -a 查看所有容器，包括没有运行的
docker rm 删除容器
docker rmi 删除镜像
docker build 新建镜像
docker run 运行容器
docker stop 停止容器
docker logs 查看日志
docker load 导入镜像
docker save 导出镜像
docker commit 容器生成镜像

curl www.... 命令行查看网页

大扫除

```linux
docker kill $(docker ps -q) ; 
docker rm $(docker ps -a -q) ; 
docker rmi $(docker images -q -a)
docker stop `docker ps -a -q`
```

docker run命令

```linux
Usage: docker run [OPTIONS] IMAGE [COMMAND] [ARG...]  

  -d, --detach=false         指定容器运行于前台还是后台，默认为false   
  -i, --interactive=false   打开STDIN，用于控制台交互  
  -t, --tty=false            分配tty设备，该可以支持终端登录，默认为false  
  -u, --user=""              指定容器的用户  
  -a, --attach=[]            登录容器（必须是以docker run -d启动的容器）
  -w, --workdir=""           指定容器的工作目录 
  -c, --cpu-shares=0        设置容器CPU权重，在CPU共享场景使用  
  -e, --env=[]               指定环境变量，容器中可以使用该环境变量  
  -m, --memory=""            指定容器的内存上限  
  -P, --publish-all=false    指定容器暴露的端口  
  -p, --publish=[]           指定容器暴露的端口 
  -h, --hostname=""          指定容器的主机名  
  -v, --volume=[]            给容器挂载存储卷，挂载到容器的某个目录  
  --volumes-from=[]          给容器挂载其他容器上的卷，挂载到容器的某个目录
  --cap-add=[]               添加权限，权限清单详见：http://linux.die.net/man/7/capabilities  
  --cap-drop=[]              删除权限，权限清单详见：http://linux.die.net/man/7/capabilities  
  --cidfile=""               运行容器后，在指定文件中写入容器PID值，一种典型的监控系统用法  
  --cpuset=""                设置容器可以使用哪些CPU，此参数可以用来容器独占CPU  
  --device=[]                添加主机设备给容器，相当于设备直通  
  --dns=[]                   指定容器的dns服务器  
  --dns-search=[]            指定容器的dns搜索域名，写入到容器的/etc/resolv.conf文件  
  --entrypoint=""            覆盖image的入口点  
  --env-file=[]              指定环境变量文件，文件格式为每行一个环境变量  
  --expose=[]                指定容器暴露的端口，即修改镜像的暴露端口  
  --link=[]                  指定容器间的关联，使用其他容器的IP、env等信息  
  --lxc-conf=[]              指定容器的配置文件，只有在指定--exec-driver=lxc时使用  
  --name=""                  指定容器名字，后续可以通过名字进行容器管理，links特性需要使用名字  
  --net="bridge"             容器网络设置:
				                bridge 使用docker daemon指定的网桥     
				                host 	//容器使用主机的网络  
				                container:NAME_or_ID  >//使用其他容器的网路，共享IP和PORT等网络资源  
				                none 容器使用自己的网络（类似--net=bridge），但是不进行配置 
  --privileged=false         指定容器是否为特权容器，特权容器拥有所有的capabilities  
  --restart="no"             指定容器停止后的重启策略:
				                no：容器退出时不重启  
				                on-failure：容器故障退出（返回值非零）时重启 
				                always：容器退出时总是重启  
  --rm=false                 指定容器停止后自动删除容器(不支持以docker run -d启动的容器)  
  --sig-proxy=true           设置由代理接受并处理信号，但是SIGCHLD、SIGSTOP和SIGKILL不能被代理  

```



#数据卷及容器连接

ifconifg-查看docker网络接口

![ifconfig](http://on7r0tqgu.bkt.clouddn.com/Fo6DzDqFiqhKTQ9bnmfR7-kt2X8I.png)

### 暴露网络端口

-P docker官方会在宿主主机上面随机分派端口将其映射到容器开放的网络端口

```linux
docker run -t -P --name admin_webapp trining/webapp ypthon app.py
```

![](http://on7r0tqgu.bkt.clouddn.com/FmmDuI-aDnHWp0XXZW9juS6BJp4a.png)

localhost:32768 就可以访问

```linux
curl localhost:32768
```

查看网络输出日志 -f 实时查看日志输出

docker logs 查看输出日志

```linux
docker logs -f admin_webapp
```

-p指定主机上端口映射到容器内部的开放端口

ip:hostPort:containerport (host 本地接口)

ip::containerport      (containerport容器接口)

hostPort:containerport



- hostPort:containerport 将主机所有网络接口80端口映射到5000端口下面

```linux
docker run -d -p  80:5000 --name=admin_one training/webapp python app.py
```

docker port 查看一个容器端口 

docker port admin_one 

- ip::containerPort 指定ip的随机映射到容器端口

```linux
docker run -d -p 127.0.0.1::5000 traning/webapp python app.py
```

![](http://on7r0tqgu.bkt.clouddn.com/FhqduJaqWXt_B5SSXYM1ZlkJGKEX.png)

当容器暴露多个端口的时候,我们可以对每个端口一一映射

```linux
docker run -d -p 5000:5000 -p 4000:80 training/webapp python app.py
```

主机5000端口和容器5000端口映射 4000端口和容器80端口映射

### 查看网络配置

第二章说过 的docker inspect 查看容器配置

- 查看容器中网络相关的配置

```linux
docker inspect '{{.NetworkSetting}}' admin_two
```

(因为格式化了,还是感觉docker inspect admin_two 好用)



## 数据卷

### 创建数据卷

- 在Dockerfile里面使用  volume  /var/lib/postgresql
- 在命令行里面使用 -v参数创建数据卷并将器挂载在容器中

docker   ---Docker实践开发

- Docker新用户应使用mount参数 ---极客学院

(这个命令有点奇怪.............)

![](http://on7r0tqgu.bkt.clouddn.com/Fj6eMcpD575264OJXeEKpiA1SSz9.png)

#### 挂载主机目录作为数据卷

指定宿主主机上的某个目录作为数据卷

-v 后面一定要指定物理路径 (.带代表当前路径)

docker run -d -P name webapp -v dockerfile:/webapp training/webapp python app.py



#### 挂载主机文件文件作为数据卷

首先本地创建一个文件,text.txt,将文件挂载为数据卷

docker run -rm -it - v /text.txt:/text.txt ubuntu:latest /bin/bash

里面可以读取text.txt



### 数据卷容器

专门用来挂载数据卷的容器...明天接着看













