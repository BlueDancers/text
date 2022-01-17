# 写给前端新人的nginx教程

![](http://www.vkcyan.top/FtVofGcUY5HFXsoI2PpMqNNXberG.png)

## 前言

​	我相信大部分前端新手是接触不到部署相关的工作的，一般都是将代码包交给后端，或者通过CI，FTP完成代码的更新，至于代码如何部署，如何从域名到前端代码包，很多前端仔没有实际操作过，自然是不知道的，这篇文章就是要帮助未接触过部署的人学会在服务器上线部署一个前端项目，在这个主线中带大家慢慢的熟悉nginx

​	记得在2017年暑假，那时候大二还没开学，当时我只会写一点简单代码，linux和运维完全没接触过，一冲动在阿里云购买了一个服务器，外加一个域名，域名现在已经不能访问了；那时候单纯的兴趣使然，想搭建一个网站，因为实力不足，也不知道求助别人，前前后后折腾了一个月，最终竟然成功在服务器上面部署了wordpress服务，后面域名备案也成功了；

​	依稀记得在盛夏的傍晚，我坐在慢慢暗下来的客厅，头上还残留着因为紧张流下的细汗，眼睛因为专注而干涩，面对不太看得懂的文档，一遍一遍尝试；我自然不希望大家在这上面浪费时间，这也是写这篇文章的初衷。





## 前置知识

- **一个云服务器**，阿里云，腾讯云，xx云都行，首次购买或者学生认证都是有很大的优惠（本文以阿里云为例子）
- **了解linux基础命令**，也就是对各种文件的增删改查
- 本教程基于CentOS 7.5系统，如果是图形化界面，或者其他系统，命令可能不完全一致，但是流程都是一致的，建议看对应教程
- 相关工具 上传文件[FTP](https://www.filezilla.cn/) ssh工具 阿里云自带



重要: 如果linux基础命令不会。下面的也不用看了，立刻去学

## 搭建环境

购买一个ECS云服务器，前段时间折扣，一年1核2G 40块钱不到~，新人长期存在优惠



### 连接服务器

通过**远程工具**（CRT，Xshell）或者自带的**远程连接**进入自己的服务器，连接方式选择**公网ip**

![image-20220113105611506](http://www.vkcyan.top/FkugXnbgmCdIOX-iAYI3UYUjmv7a.png)





### 安装nginx

> CentOS自带yum命令，这个命令很关键，自行了解

执行命令

```bash
yum install nginx // 中途遇到需要确认的，直接确认即可
```

安装完成后,主机中便有了nginx服务，相关命令如下，启动完成后

```bash
nginx
```

启动完成后，浏览器访问**公网IP**,就可以访问到nginx的默认主页

![](http://www.vkcyan.top/FtVofGcUY5HFXsoI2PpMqNNXberG.png)

到这一步就算是nginx部署成功了



### nginx相关文件路径

```bash
/etc/nginx/ // 配置文件
/usr/share/nginx/ // 默认前端代码存放处
```

​	默认配置在`/etc/nginx/nginx.conf`,nginx根据默认配置，监听80端口，80端口指定了/usr/share/nginx/html这个文件夹，于是你访问公网ip -> 公网ip:80 -> /usr/share/nginx/html,于是"Welcome to **CentOS**"便呈现在你的面前

​	如果你希望不显示默认的页面，而是显示你自己写的项目，直接替换`/etc/nginx/nginx.conf`中的**root**,字段为自己程序包的路径

<img src="http://www.vkcyan.top/FiqSDRnFVl2vLwpIGa7FMtv7QPkY.png" style="zoom: 33%;" />







## 在7777端口上搭建一个站点

​	我们的代码除了部署在默认80端口上面，还可以其他端口上，例如8888，7777，等等

​	接下来我们就在一个自定义的端口上面部署一个站点

​	这里我们需要注意`nginx.conf`中的一行配置

> 含义：在目标文件夹下面所有nginx的配置文件都会自动生效

<img src="http://www.vkcyan.top/Ft5oDDtWUipvEf-tFA5XNcR8N87L.png" style="zoom:33%;" />



根据配置文件的提示我们到`/etc/nginx/conf.d/`下面，建立test.conf，nginx.conf根据通配符匹配`conf.d/`下的配置文件

通过·vi 写入内容

```bash
server {
    listen       7777;
    server_name  _;

    root	/usr/share/nginx/test;
}
```



再去文件夹`/usr/share/nginx/test`下建立一个index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div>我是7777端口</div>
</body>
</html>
```



最后重启nginx

> nginx重启是瞬间的，没有报错就是重启成功

```
nginx -s reload
```



访问我们部署的项目ip:7777

然后你会发现访问不了，最终访问超时(==)，这是因为服务器限制了可访问端口，此时需要到云管理后台设置安全组

<img src="http://www.vkcyan.top/FsVXXP3i-gLk0rNFYdlPWxCGPBxl.png" style="zoom:50%;" />

在ESC服务器后台增加安全组规则

![](http://www.vkcyan.top/Fv_L-8z8yfwLO0N69zahJp0L2vhf.png)

之后就可以正常访问了！

![](http://www.vkcyan.top/Fq0nB1GSEzI1FJN-f0sf66YXVl1T.png)至此，便完成了第一个nginx项目的部署





## 部署一个vue项目

​	通过上面的例子，我们已经可以完成一个自定义站点的部署了，那么真实项目呢，例如将一个vue项目部署到3006端口

1. 首先编写xxx.conf

```bash
server {
    listen       3006;
    server_name  _;
    
		 # 开启gzip相关配置
    gzip on;
    gzip_static on;
    gzip_min_length 2k;
    gzip_buffers 4 8k;
    gzip_types text/plain application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/x-icon application/javascript;
    gzip_comp_level 9;
    gzip_disable "MSIE [1-6]\.";

		# 站点代码路径
    root         /usr/share/nginx/client;
		# 单页应用必须设置（刷新404问题）
    location / {
    	try_files $uri $uri/ /index.html;
    }
}

```



2. 将打包之后的代码，通过FTP上传代码到目标文件夹`/usr/share/nginx/client`（注意文件夹名称）
3. 重启nginx `nginx -s reload`



这边完成了一个站点的部署！是不是很简单

![](http://www.vkcyan.top/FjjTa2vHly5zv0-wvUdExapUmAhd.png)



## 绑定域名

​	直接拿**ip+端口**给别人访问是不太好的，大家都给自己站点绑定上一个好记忆的域名，那么nginx如何绑定域名呢？

1. 购买一个域名https://wanwang.aliyun.com/domain/，备案域名，这个流程很麻烦，需要10-30天
2. 备案完成后，域名就可以使用了

我们需要去修改我们的nginx配置，将server_name的值修改为需要绑定的域名即可；

```bash
server {
    listen       3006;
    server_name  xxx.com;
// ....
```



## 增加https支持

1. 申请一个https证书，[数字证书管理](https://yundunnext.console.aliyun.com/?spm=a2c4g.11186623.0.0.4a7b9d1d55eAnw&p=cas#/certExtend/free)，以阿里云为例子，国内云厂商都有
2. 将证书放在服务器中你可以记得住的文件夹里面
3. 修改nginx配置

````bash
server { // # 将当前域名的http自动打到https
        listen  80;
        server_name     xxx.com;
        rewrite ^(.*)$  https://$host$1 permanent;
}

server {
    listen       443 ssl http2;
    server_name  xxx.com;
    ssl_certificate xxxx/yy.pem; # 证书
    ssl_certificate_key xxxx/yy.key; # 证书秘钥

    # ssl验证相关配置
    ssl_session_timeout  5m;    #缓存有效期
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;    #加密算法
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;    #安全链接可选的加密协议
    ssl_prefer_server_ciphers on;   #使用服务器端的首选算法
    #charset koi8-r;
    #access_log  /var/log/nginx/host.access.log  main;
    
		root   /usr/share/nginx/client;
    location / {   
    		try_files $uri $uri/ /index.html;
    }
}
````



## 相关推荐

基于ssh的轻量级前端更新方案 [文章链接](https://juejin.cn/post/7020322286565589029)，个人项目用这个非常ok，非常方便，一行命令更新代码

基于gitLab CI/CD的前端更新方案 [文章链接](https://juejin.cn/post/7020353190474285064)，公司项目建议用这个



## 结语

​	虽然部署一个站点，仅仅是用到nginx，但是涉及到的知识点还是很多的，一个有经验的开发人员部署一个站点，或许半小时就弄完了，但是对新手来说遇到一个报错都是灭顶之灾

​	如果遇到了错误，一定要仔细检查报错信息，百度百度基本都能得到答案，如果实在搞不定，直接重做云服务器系统，重头再来；

如果在学习过程中遇到了解决不了的问题，请到QQ群 530496237，大佬解答疑惑~





