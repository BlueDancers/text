# 如何用 npm 同时执行两条监听命令

在日常项目中启动项目 需要启动项目可能需要不止一条命令

这就很麻烦 要开启两个bash 很麻烦 终于找到了比较好的解决方案

例如我的:

npm run dev   //启动项目项目

npm run json  //启动3003端口模拟后端

在百度的时候看有些人使用拼接可以实现

```javascript
"mock_server": "json-server mock/db.json --port 3003 &",
"server": "node server.js &",
"start": "npm run mock_server && npm run server" 
```

**我实验了 一下发现 只能 启动一个命令 不可以**

### 使用concurrent 模块实现同时监听执行两条命令

```bash
npm install concurrently --save
```

然后在package.json里面的 "script" 里面的 "start" 

```JavaScript
"start": "concurrently \"npm run json\" \"npm run dev\"",
```

这样就实现了同时监听执行两条命令

![](http://on7r0tqgu.bkt.clouddn.com/FhU13SEOyfVSxILk05sHINWKpv_H.png)

欢迎查看我的github上的text上面用我总结的各种问题,相信你会得到启发[boold](https://github.com/boold/text)

