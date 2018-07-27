---
title: http请求概述
date: 2018-7-27
tags: http
categories: http
---

### get请求

```json
GET /hello3/index.jsp HTTP/1.1
Accept: application/x-ms-application, image/jpeg, application/xaml+xml, image/gif, image/pjpeg, application/x-ms-xbap, application/vnd.ms-excel, application/vnd.ms-powerpoint, application/msword, */*
**Accept-Language: zh-CN,en-US;q=0.5
*****User-Agent: Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; InfoPath.2; .NET4.0C; .NET4.0E)
Accept-Encoding: gzip, deflate
***Host: localhost
Connection: Keep-Alive
```

l  GET /hello/index.jsp HTTP/1.1：GET请求，请求服务器路径为/hello/index.jsp，协议为1.1；

l  Host:localhost：请求的主机名为localhost；

l  User-Agent: Mozilla/5.0 (**Windows NT 5.1**; rv:5.0) Gecko/20100101 **Firefox/5.0**：与浏览器和OS相关的信息。有些网站会显示用户的系统版本和浏览器版本信息，这都是通过获取User-Agent头信息而来的；

l  Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8：告诉服务器，当前客户端可以接收的文档类型，其实这里包含了*/*，就表示什么都可以接收；

l  Accept-Language: zh-cn,zh;q=0.5：当前客户端支持的语言，可以在浏览器的工具à选项中找到语言相关信息；

l  Accept-Encoding: gzip, deflate：支持的压缩格式。数据在网络上传递时，可能服务器会把数据压缩后再发送；

l  Accept-Charset: GB2312,utf-8;q=0.7,*;q=0.7：客户端支持的编码；

l  Connection: keep-alive：客户端支持的链接方式，保持一段时间链接，默认为3000ms；

l  Cookie: JSESSIONID=369766FDF6220F7803433C0B2DE36D98：因为不是第一次访问这个地址，所以会在请求中把上一次服务器响应中发送过来的Cookie在请求中一并发送去过；这个Cookie的名字为JSESSIONID，然后在讲会话是讲究它！

```json
*****HTTP/1.1 200 OK	//相应协议是1.1 状态码 200 
Server: Apache-Coyote/1.1  //表示服务器的版本
Set-Cookie: JSESSIONID=48F75E08BD4DF3C3E72919543CBFDF81; Path=/hello3/; HttpOnly
*****响应内容的MIME类型：Content-Type: text/html;charset=ISO-8859-1  //相应编码是ISO-8859-1
Content-Length: 646   //字节数
Date: Thu, 22 May 2014 06:45:26 GMT	//响应时间
```

### post请求

```json

POST /index.jsp HTTP/1.1
Accept: application/x-ms-application, image/jpeg, application/xaml+xml, image/gif, image/pjpeg, application/x-ms-xbap, application/vnd.ms-excel, application/vnd.ms-powerpoint, application/msword, */*
Referer: http://localhost/day08_1/login.html   //请求来源
Accept-Language: zh-CN,en-US;q=0.5
User-Agent: Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; InfoPath.2; .NET4.0C; .NET4.0E)
*****Content-Type: application/x-www-form-urlencoded --> 表示表单中的数据会自动使用url来编码！
Accept-Encoding: gzip, deflate
Host: localhost
Content-Length: 30
Connection: Keep-Alive
Cache-Control: no-cache
username=zhangsan&password=123  //正文（体），表单是一大堆内容，而发送给服务器的只有一行字符串！
```

如果发送的是中文

```
username=%E5%BC%A0%E4%B8%89&password=123
```

这里的中文会变成16进制 每个16进制 使用%分开 

正文转16进制 字节数+128 ==> 转成16进制  ==> 添加%这个前缀

36 --> %A4 

### Referer请求头的作用

统计工作:我公司网站在百度上做了广告，但不知道在百度上做广告对我们网站的访问量是否有影响，那么可以对每个请求中的Referer进行分析，如果Referer为百度的很多，那么说明用户都是通过百度找到我们公司网站的。 

防盗链: 我公司网站上有一个下载链接，而其他网站盗链了这个地址，例如在我网站上的index.html页面中有一个链接，点击即可下载JDK7.0，但有某个人的微博中盗链了这个资源，它也有一个链接指向我们网站的JDK7.0，也就是说登录它的微博，点击链接就可以从我网站上下载JDK7.0，这导致我们网站的广告没有看，但下载的却是我网站的资源。这时可以使用Referer进行防盗链，在资源被下载之前，我们对Referer进行判断，如果请求来自本网站，那么允许下载，如果非本网站，先跳转到本网站看广告，然后再允许下载。 nd�_�9q



## HTML中指定响应头

在HTMl页面中可以使用<meta http-equiv="" content="">来指定响应头，例如在index.html页面中给出<meta http-equiv="Refresh" content="3;url=https://boold.github.io/">，表示浏览器只会显示index.html页面3秒，然后自动跳转到https://boold.github.io/。









