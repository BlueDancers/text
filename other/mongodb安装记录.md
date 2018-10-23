# mongodb安装

可以看这个博客 讲的很清楚

```bash
https://blog.csdn.net/qq_27093465/article/details/54574948
```



> 下载mongodb3.6.8版本

```bash
https://www.mongodb.com/download-center?jmp=nav#production
```

> 安装选项看博客

进入MongoDB的安装目录，创建以下几个文件及文件夹：

data文件夹：用于存放MongoDB的数据。

logs文件夹：用于存放日志文件，并且在此文件夹中创建mongo.log文件。

mongo.conf配置文件：用于配置自己的数据库信息。

mongo.conf的配置内如如下：

```
#数据库路径  
dbpath=C:\MongoDB\Server\3.6\data
#日志输出文件路径  
logpath=C:\MongoDB\Server\3.6\logs\mongo.log  
#错误日志采用追加模式  
logappend=true  
#启用日志文件，默认启用  
journal=true  
#这个选项可以过滤掉一些无用的日志信息，若需要调试使用请设置为false  
quiet=true  
#端口号 默认为27017  
port=27017
```

启动服务

```
mongod --config "C:\MongoDB\server\3.6\mongo.conf"
```

然后在浏览器中输入：127.0.0.1：27017

能看到一段话就说明成功了

### 添加服务

> 这里一定要使用管理员身份打开cmd

```
mongod --config "C:\MongoDB\server\3.6\mongo.conf"  --install --serviceName "MongoDB"
--config：依据的配置文件。
--install：创建
--serviceName：服务名称。
```

此时再启动服务，可以使用如下命令：

```
net start MongoDB
```

over 成功

### **移除服务**

进入到mongodb安装目录的bin目录下开启cmd。

使用如下命令，可以将服务停止并移除：

```
mongod.exe --remove --serviceName "MongoDB"
```

### **登录shell**

将bin目录加入path环境变量里面里面

