# json web token (JWT)

最近重写了之前写的一个使用jwt实现单点登录的案例,突然脑子抽风,想一件事,这存在localStorage,要是别人获取到那岂不是账号密码都暴露了,这不是就暴露信息了,想了半天,除非本机操作,不然获取不到localstorage

![](http://on7r0tqgu.bkt.clouddn.com/FuXU1EoclTJqU8l6GwdrKf4dIDVw.jpg )

先扫盲 

## jwt 是啥

根据官方解释:

> JSON Web Token（JWT）是一个开放标准（[RFC 7519](https://tools.ietf.org/html/rfc7519)），它定义了一种紧凑且独立的方式，可以在各方之间作为JSON对象安全地传输信息 

也就是在用户与服务器之间传递安全的信息

## 可以做什么?

**授权**:  也就是实现单点登录,只要我们在顶级域名下存储了令牌,那么下面的子域名都可以访问令牌

**信息交换**: jwt是可以解析成为字符串的,此外，由于使用标头和有效负载计算签名，您还可以验证内容是否未被篡改。 

## JWT的结构

jwt由三部分组成由`.`分割

- 头
- 有效载荷
- 签名

因此，JWT通常如下所示。

`xxxxx.yyyyy.zzzzz`

### 头部(header)

头部一般是由两部分组成: `令牌类型` `使用的算法`

```
{
  "alg": "HS256",
  "typ": "JWT"
}
```

然后会被编译成为Base64URL,形成JSON Web令牌的第一部分。 

### 有效载荷(Payload)

令牌的第二部分是有效负载，其中包含声明。声明是关于实体（通常是用户）和其他数据的声明

```
username: "admin"
password: "000000"
```

然后，有效负载经过**Base64Url**编码，形成JSON Web令牌的第二部分。 

### 签名(Signature)

要创建签名部分，您必须采用编码标头，编码的有效负载，秘密，标头中指定的算法，并对其进行签名。 

例如，如果要使用HMAC SHA256算法，将按以下方式创建签名： 

```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```

那么就可以得到我们加密后的内容 

最后将三者拼接起来

`eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcm9tX3VzZXIiOiJCIiwidGFyZ2V0X3VzZXIiOiJBIn0.rSWamyAYwuHCo7IFAgd1oRpSP7nzL7BF5t7ItqpKViM`

为什么存在签名

增加安全性,载荷发生变化,就会签名发生变化,那么在于后端进行验证,就会发现

### 信息的安全性

因为载荷是可以被解码的,所以,敏感信息放在jwt里面,一般被获取就暴露了密码



### 关于jwt设计单点登录

[八幅漫画理解使用JSON Web Token设计单点登录系统](http://blog.leapoahead.com/2015/09/07/user-authentication-with-jwt/),这个讲的很全面,我借鉴大佬的经验,总结一下大致过程

1. 用户发起登录请求,给后端传了`username` `password`
2. 后端验证用户名密码
3. 验证通过,将`username`加入载荷,在于头部拼接,以及签名
4. 通过成功返回给前端,前端存储到localStorage,或者通过set-Cookice....,进行前端存储
5. 每次访问,携带token,与后端进行验证
6. 后端验证,签名的正确性,以及假如是cookice则判断过期
7. 验证通过,进行解码,获取用户username
8. 在相应用户请求

## 为什么选择jwt作为单点登录?

相对于传统的session,jwt有一个优势

​	Session存储来服务器,对服务器负载很严重,占用大量io读写操作

​	jwt是无状态的,他储存在浏览器上面,降低了服务器的负载,但是相对的,带来了另一个问题,jwt来回都需要加密解密,对服务器产生了计算压力,相对与session的io操作性能要求要小很多







