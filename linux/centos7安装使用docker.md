# Centos7安装使用docker,安装nginx

首先请查看一下centos版本

```bash
[root@iZwz995mxnco6d344kv5b2Z /]# lsb_release -a
LSB Version:    :core-4.1-amd64:core-4.1-noarch
Distributor ID: CentOS
Description:    CentOS Linux release 7.3.1611 (Core) 
Release:        7.3.1611
Codename:       Core
```

查看当前的系统内存占用情况

```JavaScript
[root@iZwz995mxnco6d344kv5b2Z /]# free -m
              total        used        free      shared  buff/cache   available
Mem:           1839         149         893          32         797        1496
Swap:             0           0           0
```

总内存1839MB，已使用149MB，空闲893MB，共享32MB，已缓存797MB，可用14	96MB。

SWAP交换区0MB，已用0MB，空闲0MB。

这是轻量级服务器,所以没有swap交换区 :) orz



### 1. 安装docker

````bash
yun install docker
````

### 2. 查看docker 版本

````bash
[root@iZwz995mxnco6d344kv5b2Z /]# docker version
Client:
 Version:         1.13.1
 API version:     1.26
 Package version: 
Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
````

### 3. 设置docker自动启动

```bash
[root@iZwz995mxnco6d344kv5b2Z ~]# systemctl enable docker
Created symlink from /etc/systemd/system/multi-user.target.wants/docker.service to /usr/lib/systemd/system/docker.service.
```

在docker1.1.3.x后面docker做了更新, 不在是之前的`etc/default/docker` `etc/config/docker`,官方文档有说明,我们可以看看docker的启动文件,里面启动配置文件指向什么地方

```bash
[root@iZwz995mxnco6d344kv5b2Z ~]#  cat /usr/lib/systemd/system/docker.service 
[Unit]
Description=Docker Application Container Engine
Documentation=http://docs.docker.com
After=network.target rhel-push-plugin.socket registries.service
Wants=docker-storage-setup.service
Requires=docker-cleanup.timer

[Service]
Type=notify
NotifyAccess=main
EnvironmentFile=-/run/containers/registries.conf
EnvironmentFile=-/etc/sysconfig/docker
EnvironmentFile=-/etc/sysconfig/docker-storage
EnvironmentFile=-/etc/sysconfig/docker-network
Environment=GOTRACEBACK=crash
Environment=DOCKER_HTTP_HOST_COMPAT=1
Environment=PATH=/usr/libexec/docker:/usr/bin:/usr/sbin
ExecStart=/usr/bin/dockerd-current \
          --add-runtime docker-runc=/usr/libexec/docker/docker-runc-current \
          --default-runtime=docker-runc \
          --exec-opt native.cgroupdriver=systemd \
          --userland-proxy-path=/usr/libexec/docker/docker-proxy-current \
          --init-path=/usr/libexec/docker/docker-init-current \
          --seccomp-profile=/etc/docker/seccomp.json \
          $OPTIONS \
          $DOCKER_STORAGE_OPTIONS \
          $DOCKER_NETWORK_OPTIONS \
          $ADD_REGISTRY \
          $BLOCK_REGISTRY \
          $INSECURE_REGISTRY \
          $REGISTRIES
ExecReload=/bin/kill -s HUP $MAINPID
LimitNOFILE=1048576
LimitNPROC=1048576
LimitCORE=infinity
TimeoutStartSec=0
Restart=on-abnormal
KillMode=process

[Install]
WantedBy=multi-user.target
```

这里明显看出,docker由这三个配置文件控制

`/etc/sysconfig/docker`
`/etc/sysconfig/docker-storage`
`/etc/sysconfig/docker-network`

### 4. 更换docker registry源

为什么换源? 因为docker源是国外的,非常慢,所以最好使用国内的源

> 国内可以选择[Docker 中国官方镜像加速](https://www.docker-cn.com/registry-mirror) [阿里云docker专属加速器](https://link.zhihu.com/?target=https%3A//cr.console.aliyun.com/%23/accelerator)
>
> 文档很简单,按文档来就可以了

```
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://xxxxxx.mirror.aliyuncs.com"] // 自己的加速地址
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```



我将原本在centos7上面的网站移植到docker里面

### 5. 下载nginx docker镜像

```
docker pull nginx
```

6. ### 启动nginx镜像

```
docker run -itd -p 80:80 --name nginx nginx:latest /bin/bash
```

进入nginx镜像内部启动nginx

```bash
docker exec -it 9416d21208e6/bin/bash
/usr/sbin/nginx
exit
```

这里已经可以进行访问了



将原本的nginx配置文件放进去

nginx.conf

```bash
# For more information on configuration, see:
#   * Official English Documentation: http://nginx.org/en/docs/
#   * Official Russian Documentation: http://nginx.org/ru/docs/

user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

# Load dynamic modules. See /usr/share/nginx/README.dynamic.
include /usr/share/nginx/modules/*.conf;

events {
    worker_connections 1024;
}

http {
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile            on;
    tcp_nopush          on;
    tcp_nodelay         on;
    keepalive_timeout   65;
    types_hash_max_size 2048;

    include             /etc/nginx/mime.types;
    default_type        application/octet-stream;

    # Load modular configuration files from the /etc/nginx/conf.d directory.
    # See http://nginx.org/en/docs/ngx_core_module.html#include
    # for more information.
    include /etc/nginx/conf.d/*.conf;

    server {
        listen       80 default_server;
        listen       [::]:80 default_server;
        server_name  _;
        root         /usr/share/nginx/html;

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        location / {
        }

        error_page 404 /404.html;
            location = /40x.html {
        }

        error_page 500 502 503 504 /50x.html;
            location = /50x.html {
        }
    }
```

### 6. 更新配置文件

```bash
docker cp /etc/nginx/nginx.conf 9416d21208e6:/etc/nginx/nginx.conf
```



### 7. 最后将网站静态文件都放进去

```
docker cp /usr/share/nginx/html 9416d21208e6:/usr/share/nginx/html
```

### 8. 最后重启nginx

```
docker exec -it 9416d21208e6/bin/bash
nginx -s reload
```

完成移植