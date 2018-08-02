---
title: node.js环境安装
date: 2018-7-30
tags: 
  - node
categories: node
---



首先环境配置

node.js环境安装

https://www.jianshu.com/p/03a76b2e7e00  

安装服务express作为测试

https://www.jianshu.com/p/03a76b2e7e00https://jingyan.baidu.com/article/922554468a3466851648f419.html

如果成功访问了localhost:3000 恭喜 环境已经没有问题了

接下来就是webpack的安装配置了

ps: 前几天更新了webpack4.0 官网没有更新完成 全是坑 建议这段时间不要用4.0版本 

官网最开始配置就是错的 

现在到    设定 HtmlWebpackPlugin 就报错了,没有解决 等我解决了更新一下这个

真正步骤

```bash
C:\Users\spring>G:
G:\>cd javaScript  //目录自己定啦
G:\JavaScript>mkdir demo
G:\JavaScript\demo>npm init -y
G:\JavaScript\demo>npm install --save-dev webpack   //这里按官方文档来
npm install --save lodash						  //工具库,不想用不安装也行,百度看看,挺好用的
npm install webpack-cli -D                          //这是依赖 一定要下载
npx webpack src/index.js --output dist/bundle.js    //一定要加 --output!!
```





