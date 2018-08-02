---
title: Vue使用json-server来进行后端数据模拟
date: 2018-4-16
tags: 
  - vue
  - 模拟后台
categories: vue
---

  正开发过程中 前后端分离或者不分离 ,接口多半是之后与页面的开发 ,所以建立rest的APL的接口 给前端提供虚拟的数据是非常必要的 所以这里我使用了json-server作为工具,支持CORS和JSONP跨域请求，支持GET, POST, PUT, PATCH 和 DELETE 方法,更提供了一系列的查询方法，如limit，order等,接下来我把我自己的上使用心写成文档



## 安装

首先必须有node环境(都用到json-server一定会有node环境吧)然后全局安装json-server

```bash
npm install json-server -g
```

安装完成后检查是否全局安装成功

```bash
G:\demo\JavaScript\Vue\Vue one\project\my-project\Vue_two\my-project>json-server -h
index.js [options] <source>

Options:
  --config, -c               Path to config file   [default: "json-server.json"]
  --port, -p                 Set port                            [default: 3000]
  --host, -H                 Set host                       [default: "0.0.0.0"]
  --watch, -w                Watch file(s)                             [boolean]
  --routes, -r               Path to routes file
  --middlewares, -m          Paths to middleware files                   [array]
  --static, -s               Set static files directory
  --read-only, --ro          Allow only GET requests                   [boolean]
  --no-cors, --nc            Disable Cross-Origin Resource Sharing     [boolean]
  --no-gzip, --ng            Disable GZIP Content-Encoding             [boolean]
  --snapshots, -S            Set snapshots directory              [default: "."]
  --delay, -d                Add delay to responses (ms)
  --id, -i                   Set database id property (e.g. _id) [default: "id"]
  --foreignKeySuffix, --fks  Set foreign key suffix (e.g. _id as in post_id)
                                                                 [default: "Id"]
  --quiet, -q                Suppress log messages from output         [boolean]
  --help, -h                 Show help                                 [boolean]
  --version, -v              Show version number                       [boolean]

Examples:
  index.js db.json
  index.js file.js
  index.js http://example.com/db.json

https://github.com/typicode/json-server
```

在项目根目录创建一个db.json的目录,然后写入信息

![](http://on7r0tqgu.bkt.clouddn.com/Fn-G8MVvF3x2r52kalKOS0FT1IUn.png)

```bash
{
  "api": [
    {
      "text": "数据统计",
      "link": "#",
      "hot": true
    },
    {
      "text": "数据检测",
      "link": "#",
      "hot": true
    },
    {
      "text": "流量分析",
      "link": "#",
      "hot": true
    },
    {
      "text": "广告发布",
      "link": "#",
      "hot": false
    }
  ]
}

```

在package.json里面的scripts里面加一行命令

```bash
   "json": "json-server db.json --port 3003"
```

在项目目录执行命令

```bash
npm run json
```

在bash里面会看到这样的界面

```bash
> vue@1.0.0 json g:\demo\JavaScript\Vue\Vue one\project\my-project\Vue_two\my-project
> json-server db.json --port 3003


  \{^_^}/ hi!

  Loading db.json
  Done

  Resources
  http://localhost:3003/api

  Home
  http://localhost:3003

  Type s + enter at any time to create a snapshot of the database
```

恭喜启动成功!

这时候进入网页进行访问

![](http://on7r0tqgu.bkt.clouddn.com/Fq6FKrKvUmOOyPjXCHRRBG6p-uWg.png)

这时候就可以进行访问了

```bash
http://localhost:3003/api
```

可以看到之前写的json串 

到此json-server启动完毕

调用的代码是这样的

```JavaScript
this.$http.get('http://localhost:3003/api')
      .then((data) => {
        console.log(data.body)
      }, () => {
        console.log('这里是用了vue-source,后端没有接口')
      })
```

页面初始化就可以看到数据 完成