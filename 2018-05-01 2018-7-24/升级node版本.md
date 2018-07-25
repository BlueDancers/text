# win下如何升级node版本

刚开始我竟然天真的以为可以通过命令行去升级....

但是最后百度了很久都是不行的

很多人都说 安装n模块  npm install -g n,但是win不支持n模块啊 

正确的解决办法

```
去官网下载最新版本的node 覆盖之前的安装路径
即完成node的版本升级
```

 指定npm 包 : 

npm install npm@4 -g 