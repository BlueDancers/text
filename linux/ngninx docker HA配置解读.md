##nginx配置文件解读

```bash
user  nginx;                            #设置用户
worker_processes  1;             	    #启动进程,通常设置成和cpu的数量相等

error_log  /var/log/nginx/error.log warn;     #全局错误日志及PID文件
pid        /var/run/nginx.pid;




events {
    worker_connections  1024;       #单个后台worker process进程的最大并发链接数  
    #并发总数是 worker_processes 和 worker_connections 的乘积
    #即 max_clients = worker_processes * worker_connections

}

//设定http服务器
http {
include       /etc/nginx/mime.types;  #设定mime类型,类型由mime.type文件定义   
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" ' #设定日志格式
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;
 
sendfile        on;       #sendfile 指令指定 nginx 是否调用 sendfile 函数（zero copy 方式）来输出文件， 对于普通应用，必须设为 on,
    #tcp_nopush     on;

    keepalive_timeout  65;  #连接超时时间

    #gzip  on;     #开启gzip压缩  


include /etc/nginx/conf.d/*.conf;

upstream wei {
	server 10.0.3.139:32768;  //
#upstream的负载均衡，（以权重方式分发），weight是权重  weight=1 权重越高越大
#也可是设置压力轻的 所有的非backup Server down或者忙的时候，请求backup机器。所以这台机器压力会最轻。
	server 10.0.3.139:32769;  #backup
}
server {  #设定虚拟主机配置
	listen       80;   #监听端口
    server_name  10.0.3.139;   #宿主机ip 定义访问地址，域名可以有多个，用空格隔开    
//这个是调用Tomcat服务的负载均衡
	location / {    #默认请求  
        proxy_pass http://wei;  
    }
  }
}

```
##Rancher HA启动命令解读

```bash
#安装Docker服务
hostnamectl set-hostname server1
hostnamectl set-hostname server2
#-- 修改yum源 下载docker --
yum install -y docker
systemctl restart docker
systemctl enable docker
# 清除网络策略缓存
iptables -Z
iptables -X
iptables -F
/usr/sbin/iptables-save

#修改 hosts文件
cd /etc/hosts

#修改系统配置文件sysctl.conf
cd /etc/sysctl.conf
net.ipv4.ip_forward=1
net.ipv4.conf.default.rp_filter=0
net.ipv4.conf.all.rp_filter=0
sysctl -p  //检查命令

#修改动车docker默认仓库地址
vi /etc/sysconfig/docker
ADD_REGISTRY='--add-registry 192.168.200.5:5000'
INSECURE_REGISTRY='--insecure-registry 192.168.200.5:5000'
#基本配置完成
systemctl restart docker
systemctl enable docker

安装mariadb
yum install -y mariadb  mariadb-server
systemctl restart mariadb
systemctl enable mariadb
mysql_secure_installation   #进行mariadb配置  给密码 000000
#创建共用数据库
mysql -uroot -p000000
create database if not exists callte collate = 'utf8_geberal_ci' character set = 'utf8';
创建表(if not exists 就算表存在也会创建成功)
(collate(效验) utf8 ci(case insensitive)大小写不敏感)
(character set='utf-8') 整体字符集为utf-8

grant all on callte.* to 'callte'@'%' identified by 'callte';
grant all on callte.* to 'callte'@'location' inentified by 'callte';
exit(返回bash)
#启动server1
docker run -d --restart=unless-stopped -p 8080:8080 -p 9345:9345 10.0.3.137:5000/rancher/server:v1.6.5 --db-host 10.0.3.138 --db-port 3306 --db-user cattle --db-pass cattle --db-name cattle --advertise-address 10.0.3.137
#启动server2
docker run -d --restart=unless-stopped -p 8080:8080 -p 9345:9345 10.0.3.137:5000/rancher/server:v1.6.5 --db-host 10.0.3.138 --db-port 3306 --db-user cattle --db-pass cattle --db-name cattle --advertise-address 10.0.3.138

#server2 安装haproxy 并重写haproxy
yum install -y haproxy
vi /etc/haproxy/haproxy.cfg

global                    # 全局
    maxconn 4096              # 最大连接数
    ssl-server-verify none    # ssl服务器验证关闭

defaults                  # 默认值
    mode http                 # 模式 http
    balance roundrobin        # 平衡轮询
    option redispatch         # 选项 再发送
    option forwardfor         # 选项 设计

    timeout connect 5s        # 超时连接 5s
    timeout queue 5s          # 超时队列 5s
    timeout client 36000s     # client节点超时 36000秒
    timeout server 36000s     # server节点超时 36000秒

frontend http-in          # 前端 http-in
	mode tcp                  # 模式 tcp
	bind *:80               # 绑定 80
	default_backend rancher_servers  # 默认_后台 rancher_servers

	acl is_websocket hdr(Upgrade) -i WebSocket
	acl is_websocket hdr_beg(Host) -i ws
	use_backend rancher_servers if is_websocket

backend rancher_servers   # 后台
	server websrv1 10.0.3.137:8080 weight 1 maxconn 1024　
	server websrv2 10.0.3.138:8080 weight 1 maxconn 1024 

ststemctl restart haproxy
#登录 server2:80 成功 及代表完成
```
