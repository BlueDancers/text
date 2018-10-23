# 使用Navicat Premium 连接mysql8.0.12版本的报错问题

成功安装mysql8.0服务器端，连接Navicat会提示报错：

1251 Client does not support authentication protocol requested by server; consider upgrading MySQL client



解决办法: 

````
alter user 'root'@localhost IDENTIFIED WITH mysql_native_password by '000000';
````



