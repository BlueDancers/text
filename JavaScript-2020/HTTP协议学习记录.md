# 	HTTP协议学习记录

### 浏览器输入url的完成流程

1. 判断当前是否是否存在redirect，浏览器可能会记住之前存在重定向操作
2. 判断缓存，存在缓存不请求后台
3. 域名dns解析，查找IP地址
4. 开始创建TCP链接
5. 发送请求
6. 响应请求



### 网络协议分层

![](http://www.vkcyan.top/FvvOEGy7rmYoSpkZY8Qk-iSTcQ4t.png)

物理层： 定义物理设备如何传输设备

数据链路层： 在通讯的实体间建立链路链接

网络层： 节点之间传输创建逻辑链路

传输层： 给用户提供端到端的服务

应用层： 可以使用http工具，构建于tcp之上，屏蔽网络传输相关细节





### header发展史

#### http/0.9

- 只有一个命令GET
- 没有Header等等描述的信息
- 服务器发送完毕后，关闭tcp链接（一个tcp链接可以包含多个http请求）

#### http/1.0

- 增加了很多命令
- 增加了请求status code值
- 增加了header值
- 增加了缓存 多字符集发送 等等

http/1.1

- 增加了持久连接 tcp连接不会关闭
- 增加了pipeline
- 增加了host和其他命名



#### http/2

- 全部数据都是二进制传输

- 同一个tcp连接请求里面不在需要按顺序来

- 头信息压缩以及推送等等效率功能
- 大部分的请求由并联变成了串联，可并发请求



#### http三次握手

![](http://www.vkcyan.top/Fsu371EKpF2hDY2714Y59iYhgMRP.png)

三次握手存在的原因

第一次握手： 客户端可以确定自己可以发送，c可以正常接收

第二次握手： 服务端可以确定自己可以发送，并且接收正常

第三次握手：客户端表示，一切正常，开始tcp链接



为什么不是第四次

怎么确定第三次握手，服务端就一定接收到了呢，客户端也不知道

答案： 无法验证，这都是基于之前的通讯情况，所以三次握手是一种中和方案



#### URI、URL、URN

Uniform Resource Identifier 统一资源标志符 

他包含了url与urn



Uniform Resource Locator 统一资源定位器

`http://user:pass@host.com:80/path?query=string#hash`

http:// ftp:// 协议 这都叫url

user:pass 用户名与密码

host.com 域名

80 web服务器端口号

path 路径

query 参数

#hash 锚点



URN 永久统一资源定位符 目前还没有很成熟的方案



### HTTP报文格式

### CROS跨域请求

> 在请求到服务器回来之前，浏览器都不知道，当前请求是否跨域了，如果不同域不存在Access-Control-Allow-Origin这个头，或者不是指向当前域名，就会抛出跨域警告，但是请求依旧是成功的，只是浏览器拦截了



### jsonp

请求连接是允许跨域的，所以jsonp就是通过标签来是实现跨域的



跨域请求的设置：

```js
resp.writeHead(200, {
	'Access-Control-Allow-Origin': 'http://localhost:8886',
})
```

被访问端指定允许跨域对象即可



#### cros的一些限制

1. 请求头限制 只允许get，post dead
2. content-type 限制 只允许text/plain multipart/form-data application/x-www-form-urlencoded



#### cros的预请求

> 目前浏览器已经测试不出来了

跨域是为了保护服务端的安全，不让不认识的人都访问到服务器



### Cancel-Control

- 可缓存性 
  - public
  - private
  - no-cache
- 到期 max-age（浏览器） s-maxage（代理服务器）
- 重新验证 
  - must-revalidate 验证是否真的过期 
  - proxy-revalidate  验证是否真的过期 （缓存服务器）
- 其他
  - no-store 禁止所有缓存
  - no-transform 代理服务器禁止所有缓存
  -  



```js
'Content-Type': 'text/javascript',
'Cache-Control': 'max-age=200', // 设置缓存时间
```

Cacel-control 可以设置静态资源的缓存时间，进而让请求数据，第一次访问后不再请求服务端获取页面代码，减小服务端压力



### 缓存

![](http://www.vkcyan.top/FniI3FR6y0GQ999Q2a0jWL8WJLjX.png)

```js
resp.writeHead(304, {
    'Content-Type': 'text/javascript',
    'Cache-Control': 'max-age=2000000,no-cache', // 设置缓存时间
    'Last-Modified': '123', // 用作一个验证器来判断接收到的或者存储的资源是否彼此一致 Etag的备用方案
    // 客户端会携带 If-Modified-Since 返回到后台
    Etag: '777', // 用作一个验证器来判断接收到的或者存储的资源是否彼此一致
    // 客户端会携带 If-None-Match 返回到后台进行校验
  })
// 增加后就自动304 下次都会读缓存
```

no-cache 在浏览器使用缓存前，会往返对比ETag，如果ETag没变，返回304，则使用缓存。

no-store 彻底禁用缓冲，所有内容都不会被缓存到缓存或临时文件中。



设置了no-cache之后，每次请求服务器http请求头都会带上

```javascript
If-Modified-Since: 123
If-None-Match: 777
```

服务端就会校验是否相同，相同就会使用缓存，除非max-age过期了



设置了no-store之后，一切缓存都会无效





### cookie与session

cookie

- 通过set-Cookie设置
- 下次请求会自动带上
- 键值对，可以设置多个
- max-age和expires设置过期时间
- secure只在https里面发送
- Httponly无法通过document.cookie访问





### 长连接

浏览器在进行请求的时候，最多一次性并发6个tcp链接，如果是多个的话，就会阻塞，等到有连接完成了才会进行后面的请求

在http1.1中，请求速度够快的情况下，可能会存在多个请求公用一个tcp请求的情况

同样可以通过header设置每次都创建一个新的tcp请求

```js
Connection: keep-alive  // 开启长连接
Connection: ‘close’ // 关闭长链接
```

在http2.0中，存在信道复用，所以http2.0里面可以走一个tcp链接，所以速度会快很多



### 数据协商



### Redirect

 // 302 表示短期跳转

// 301 表示长期跳转 一旦浏览器读取到了301 就会进行常会时间缓存,到时候再改将不会有效果,除非缓存失效







### SCP（内容安全策略）

​	内容安全策略是额外的安全层，用于检测并削弱某些特定类型的攻击，包括跨站点和数据注入攻击

```js
const fs = require('fs')
const http = require('http')

http
  .createServer(function (req, resp) {
    if (req.url == '/') {
      const html = fs.readFileSync('scp/index.html', 'utf-8')
      resp.writeHead(200, {
        'Content-Type': 'text/html',
        // 'Content-Security-Policy': 'default-src http: https:', // 指定脚本文件只能通过链接的方式进行引用
        // 'Content-Security-Policy': "default-src 'self' https://cdn.bootcdn.net", // 禁止外部js脚本加载 后续可以追加最佳白名单
        // 'Content-Security-Policy': "default-src 'self' form-action 'self'", // 禁止form表单的提交 后续可最佳报名单
        // 'Content-Security-Policy': "script-src 'self'; report-uri /report", // 只禁止script标签 report-uri是遇到未遵循scp安全策略的就会向这个uri进行请求的发送
        // 'Content-Security-Policy-Report-Only':
        //   "script-src 'self'; report-uri /report",  // 当请求头为Report-Only的时候,不遵循scp原则的链接不仅会爆出警告,还会加载出来
        // 还可以通过meta头的形式实现
      })
      resp.end(html)
    } else {
      resp.writeHead(200, {
        'Content-Type': 'application/javascript',
      })
      resp.end('console.log("reload script")')
    }
  })
  .listen(8886)

```



````html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" content="script-src 'self';">
    <!-- meta的方式也可以实现scp,但是建议http请求头进行设置 -->
    <title>cookie请求</title>
</head>

<body>
    <div>
        请求成功
    </div>
    <img src="http://t8.baidu.com/it/u=3571592872,3353494284&fm=79&app=86&f=JPEG?w=1200&h=1290" alt="">
    <form action="http://baidu.com">
        <button type="submit">点击提交</button>
    </form>
</body>
<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js"></script>
<script src="./test.js"></script>
<script>
    console.log('内嵌script');
</script>

</html>
````





### nginx

#### 设置指定host

```
proxy_set_header Host $host; // 指定host为当前域名
```



#### 服务端缓存

```js

http
  .createServer(function (req, resp) {
    if (req.url == '/') {
      const html = fs.readFileSync('nginx-cache/index.html', 'utf-8')
      resp.writeHead(200, {
        'Content-Type': 'text/html',
      })
      resp.end(html)
    } else if (req.url == '/data') {
      resp.writeHead(200, {
        // 'Cache-Control': 'max-age=2, s-maxage=20' // max-age是浏览器用的,s-maxage专门给http服务器用的,如果没设置s-maxage http服务器会使用max-age
        'Cache-Control': 's-maxage=200',
        Vary: 'X-Test-Cache', // vary可以设置特定缓存头,只有值一样.http服务器才会返回缓存数据
      })
      setTimeout(() => {
        resp.end('success')
      }, 1000)
    }
  })
  .listen(8886)

```



```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>nginx缓存</title>
</head>

<body>
    <p>
        11
    </p>
    <button id="button" onclick="doRequest()">click me</button>
</body>
<script>
    // document.getElementById('button').click = doRequest
    var index = 0
    function doRequest() {

        fetch('/data', {
            headers: {
                'X-Test-Cache': index++
            }
        }).then(res => {
            res.text().then(res => {
                console.log(res);
            })
        })
    }

</script>

</html>
```





#### https

https握手方式

![·](http://www.vkcyan.top/FgImKhEFabaTpxREIXy1fNDBkloh.png)



