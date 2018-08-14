21. 使用docker命令只列举rancher/server容器的端口映射状态

```
docker port server
```

22. 使用docker命令打印rancher/server镜像的大小和日期历史更新信息

```
docker history -H rancher/server:v1.1.4-xd
```

23. 使用docker命令运行ubuntu镜像，运行输出打印“Hello world”

```
docker run ubuntu:14.04.3 /bin/echo "Hello world"
```

24. 使用docker命令运行ubuntu镜像，运行输出打印“Hello world”，要求启动命令包含打印完成后自动删除此容器及产生的数据

```
docker run --rm ubuntu:14.0.4.3 /bin/echo "Hello world"
```

25. 使用docker命令查询2017-01-01至2018-01-01之间的所有时间记录

```
docker events --since="2017-01-01" -until="2018-01-01"
```

26.使用docker命令运行ubuntu镜像，运行输出打印“Hello world”，要求启动命令包含打印完成后自动删除此容器

```
docker run --rm -it ubuntu:14.04.3 /bin/echo "Hello world"
```

27. 使用docker命令将rancher/server容器内的/opt/目录下rancher.tar.gz文件拷贝到宿主机的/opt/目录下。完成后查询文件大小      ******

```
docker cp server:/opt/rancher.tar.gz /opt/
(容器里面没有,需要创建)
dd if=/dev/zero of=rancher.tar.gz  bs=2560K count=1
du -sh rancher.tar.gz 
```

28. 使用docker命令将当前操作系统的yum源repo文件拷贝到rancher/server容器内的/opt/目录下。完成后查询容器的/opt目录下的所有文件列表，并查询文件内容

````
docker cp /etc/yum.repos.d/local.repo server:/opt/
docker exec -it server /bin/ls /opt/
docker exec -it server /bin/cat /opt/local.repo
````

29. 使用docker命令查询正在实时运行的容器列表

```
docker  ps
```

30. 使用docker命令查询所有的容器列表

```
docker ps -a
```

31. 使用docker查询当前系统使用的卷组信息

```bash
docker volume ls
```

32.

```
docker volume create --name=xd_volume 
docker run -dit -v xd_volume:/root/ ubuntu:14.0.4.3 /bin/bash
docker inspect -f '{{.HostConfig.Binds}}' 19fbb129fa1e
```

33. 查看各容器的id，使用过滤将所有处于Exited状态的容器删除

```
docker ps -a
docker rm $(docker ps -a -l -f status=exited)
```



