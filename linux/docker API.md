docker API操作  

在 /etc/sysconfig/docker  里面添加一行

方法一:`OPTIONS='-H tcp://0.0.0.0.2375 -H unix:///var/run/docker.sock '`

关于题库里面写的必须修改端口为2375 表示疑惑, `docker开发实践`里面指定2376  都使用了一次,都可以用 

方法二:`在/usr/lib/systemd/system/docker.servic`文件里的`ExecStart`参数后面添加`-H tcp://0.0.0.0:2375 -H unix:///var/run/docker.sock` 

关于curl -X GET 表示curl会默认发出GET请求 关于-X有四个参数 用来改变http method

```
curl -X GET  "http://localhost/2375/version"    get请求
curl -X POST "http://localhost/2375/version"    post请求
curl -X PUT  "http://localhost/2375/version"    put请求用于修改服务器端的数据
curl -X DELETE "http://localhost/2375/version"  DELETE请求用于删除服务器端的数据。
```

1. 查询docker基本信息

```
curl -X GET http://localhost:2375/info
```

2. 查询docker版本信息

```
curl -X GET http://localhost:2375/version
```

3. 列举docker容器

```
curl -X GET http://localhost:2375/containers/json
```

4. 获取http相应头

```
curl -i http://localhost:2375/containers/json
```

5. 创建容器

```
这他妈太多命令了,都是配置文件,玩不来玩不来
```

6. 启动容器

```
curl -X POST -H "Content-Type: application/json" http://localhost:2375/containers/pid/start
```

7. 删除容器

```
curl -X POST -H "Content-Type: application/json" http://localhost:2375/containers/pid/stop  先停止
curl -X DELETE http://localhost:2375/containers/pid  再删除
```

8. 列举镜像

```
curl -X GET http://localhost:2375/images/json
```

9. 查看指定进项详情信息

```
docker imaegs (获取镜像pid)
curl -X GET http://localhost:2375/images/pid/json
```

10. api查询运行的docker容器系统文件的变更(查看指定容器信息)

```
curl -X GET http://localhost:2375/containers/pid/json(题库答案有点问题)
格式化json代码 curl -X GET http://localhost:2375/containers/pid\/json | python -m json.tool
```



