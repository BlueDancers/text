查看网桥

```bash
brctl show
```

创建xd_br网桥，设立网络的网络地址和掩码为192.168.2.1/24，创建完成后启动该网桥，完成后查看xd_br网卡和网桥详细信息

```                       bash
brctl addbr xd_br   创建网桥
ip addr add 192.168.2.1/24 dev xd_br   设置一个ip 给xd_vr
ip link set xd_br up   启动网卡xd_br
ifconfig xd_br  查询网卡xd_br
brctl show   查看网桥详情利用ubuntu:14.04.3镜像运行一个无网络环境的容器，进入容器后使用ifconfig查看网络信息
```

```
docker run -dit --net=none ubuntu:14.04.3 /bin/bash
docker exec -it pid /bin/bash
ifconfig
```

在ubuntu容器中将设备B重命名为通用的网络设备名eth0,并分配MAC地址为1A:2B:3C:4D:5E:6F；根据xd_br网桥的地址将该网段的最后一位分配给该网络设备，设置路由地址到xd_br；完成后查询该容器的eth0网卡和路由信息

```
ip netns exec pid ip link set dev B name eth0
给容器里面的网络设备B重命名为eth0
ip netns exec pid ip link set dev eth0 address 1A:2B:3C:4D:5E:6F
容器里面添加MAC地址
ip netns exec pid ip link set eth0 up
启动容器里面的网络设备
ip netns exec pid ip addr add 192.168.2.254/24 dev eth0
给网络设备ip
ip netns exec pid ip route add default via 192.168.2.1 dev eth0
给网络设备添加路由
ip netns exec pid ifconfig etho
查看网卡信息
ip netns exec pid ip route
查看路由信息
```

利用ubuntu:14.04.3镜像启动ubuntu容器，创建完成后为该容器创建独立的网络命名空间并创建虚拟网络接口设备A，为A创建一个映射端设备B；将设备A接入到创建的网桥xd_br中，完成后启动设备A，将B设备放入刚刚创建好的网络空间中；完成后查询宿主机的网桥信息和该容器的网络信息

```

```

