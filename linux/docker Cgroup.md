# cgroup

cgroup也算一种文件系统的类型,只需要挂载就会自动创建

```
mount -t cgroup
```

- 创建cpu控制群组	

```
mkdir /sys/fs/cgroup/cpu #这里的cpu是一个cgroup系统
mkdir /sys/fs/cgroup/cpu/cg   #这里的cg是一个控制族群
在cg里面会自动创建相关文件 都是关于cgroup控制的文件
tasks 加入pid 就可以进行cgroup控制
/sys/fs/cgroup/cpu/xiandian/cpu.cfs_quota_us  就可以为实现公平调度

```

- 在创建容器的时候使用cgroup

``` bash
docker run -dit --cpuset-cpus="0,1" ubuntu:14.04.3 /bin/bash
```

- 查看cpu内核使用情况

```bash
cat /sys/fs/cgroup/system.slice/docker-###################################.scope/cpuset.cpus
```



