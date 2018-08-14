在registry节点利用consul相关知识创建配置 consul 集群

设置registry节点为cluster leader

将server和client节点加入该集群身份为server

集群名称为xd_center，registry节点名称为cluster_server

server节点名称为cluster_client1，client节点为cluster_client2

``` bash 
consul agent -server -bootstrap -data-dir=/home/data_consul -client=0.0.0.0 -bind=0.0.0.0 
-advertise=192.168.200.8 -node="cluster_server" -dc="xd_center" &
consul agnt -server -data-dir=/home/data_consul -client=0.0.0.0 -bind=0.0.0.0 
-davertise=192.168.200.7 -node=cluster_client1 &
conul agent -server -data-dir=/home/data_consul -clien=0.0.0.0 -bind=0.0.0.0 
-davertise=1092.168.200.6 -node=cluster_client2 &
```











































