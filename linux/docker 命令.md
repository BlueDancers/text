**修改docker源**

/etc/sysconfig/docker 里面添加

````bash
ADD_REGISTRY='--add-registry hub.c.163.com'  //不过蜂巢速度有点慢
````

**systemctl 相关命令**-负责控制systemd系统和服务管理器(docker里面用的不多)

```bash
systemctl start docker           //启动
systemctl restart docker         //重启
systemctl stop docker            //停止
systemctl reload docker          //重载
systemctl status docker          //检查
systemctl enable docker  //设置服务自启
systemctl disable docker  //设置服务不能自启

```

##基本命令

```bash
docker attach    使用Dockerfile构建新镜像
docker commit    将容器打包成新的镜像
docker diff      列出镜像中文件和目录的变化
docker export    把容器系统文件打包并导出来，方便分发给其他场景使用。
docker history   显示镜像的历史记录
docker import    加载容器系统文件
docker kill      杀掉一个运行中的容器
docker login     登录docker Hub命令
docker port      查看端口映射情况
docker pull      从远程拉取镜像
docker restart   重启运行中的容器
docker start  	 重启停止的容器
docker rmi       删除docker 镜像
docker save      将image保存为tar压缩文件
docker start     启动指定容器
docker tag       为镜像加上标签
docker version   显示docker版本
docker build     使用Dockerfile构建新镜像
docker cp        拷贝容器中的文件
docker events    实时监听容器的事件
docker help		 帮助
docker images    查看docker镜像
docker info      查看docker信息
docker inspect	 显示镜像或容器的详细信息
docker load      将tar压缩文件保存为image
docker ps        列出所有运行中容器
docker push      推送镜像到远程仓库
docker rm        删除容器
dccker run       运行镜像
docker search    在Docker Hub上寻找镜像
docker stop      停止运行中的容器
docker top       查看容器输出
docker wait      等待容器退出
```

## docker ps

```bash
docker ps -a    //显示所有容器
docker ps -f    //根据提供的条件过滤输出
docker ps -n    //显示最后创建的容器
docker ps -l    //显示最新创建的容器
docker ps -q    //只显示容器od
docker ps -s    //只显示文件大小
docker rm $(docker ps -a -q -f status=exited)  删除所有停止状态容器
```

##docker run

```bash
docker run -d, --detach=false         指定容器运行于前台还是后台，默认为false     
docker run -i, --interactive=false    打开STDIN，用于控制台交互    
docker run -t, --tty=false            分配tty设备，该可以支持终端登录，默认为false  
docker run -v, --volume=[]            给容器挂载存储卷，挂载到容器的某个目录  
docker run -P, --publish-all=false    指定容器暴露的端口    
docker run -p, --publish=[]           指定容器暴露的端口   
docker run -u, --user=""              指定容器的用户    
docker run -a, --attach=[]            登录容器（必须是以docker run -d启动的容器）  
docker run -w, --workdir=""           指定容器的工作目录   
docker run -c, --cpu-shares=0         设置容器CPU权重，在CPU共享场景使用    
docker run -e, --env=[]               指定环境变量，容器中可以使用该环境变量    
docker run -m, --memory=""            指定容器的内存上限    
docker run -h, --hostname=""          指定容器的主机名    
docker run  --volumes-from=[]         给容器挂载其他容器上的卷，挂载到容器的某个目录
docker run --link=[]                  指定容器间的关联，使用其他容器的IP、env等信息  
docker run --net="bridge"       容器网络设置:  
                                	bridge 使用docker daemon指定的网桥       
                               		host    //容器使用主机的网络    
                                	container:NAME_or_ID > 使用其他容器的网路，共享IP和PORT等网络资源   
                                	none 容器使用自己的网络（类似--net=bridge），但是不进行配置   
docker run --restart="no"       指定容器停止后的重启策略:  
                                	no：容器退出时不重启    
                                	on-failure：容器故障退出（返回值非零）时重启   
                                	always：容器退出时总是重启    
docker run --rm=false                 指定容器停止后自动删除容器(不支持以docker run -d启动的容器)      docker run --expose=[]                指定容器暴露的端口，即修改镜像的暴露端口               
docker run  --name=""                 指定容器名字，后续可以通过名字进行容器管理，links特性需要使用名字     
 --------------------------------------------------------------------------------------------------
 后面的的没怎么用过
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
  --privileged=false         指定容器是否为特权容器，特权容器拥有所有的capabilities    
  --sig-proxy=true           设置由代理接受并处理信号，但是SIGCHLD、SIGSTOP和SIGKILL不能被代理     
```

##ip netns

```bash
ip netns add ns   #增加网络命名空间    会在/var/run/netns目录下创建ns网络空间命名空间民
cd /var/run/netns #查看目录下的文件来显示所有虚拟网络命名空间
ip netns exec ns bash      #打开虚拟网络环境ns的bash窗口
ip addr           #显示所有虚拟网络环境的设备
ip link add type veth      #增加一对veth虚拟网卡
ip link set veth0 netns ns #将veth0添加到ns虚拟网络环境
ip link set dev veth1 name net1-bridge netns net1  #将虚拟网卡veth1改名并添加到net1虚拟网络环境中
ip netns exec pid ip link set veth0 up  #设置虚拟网络环境ns的veth0设备处于激活状态
ip netns exec pid ip address add 10.0.1.1/24 dev veth0 #为虚拟网络环境ns的veth0设备增加IP地址
```

