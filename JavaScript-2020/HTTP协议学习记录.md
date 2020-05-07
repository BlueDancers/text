# HTTP协议学习记录

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























