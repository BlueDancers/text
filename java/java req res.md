# java request response对象

### request和response

  * 当服务器接收到请求后，服务器会创建request和response对象，把请求数据封装到request对象中；
  * 然后调用Servlet的service()方法时把这两个对象传递给service()方法；
  * 在service()方法中可以通过request对象获取请求数据，可以使用response对象向客户端完成响应；
  * 每次请求服务器都会创建新的request和response对象，即每个请求有自己独自的request和response对象。



response是响应对象，用来在Servlet的service()方法中向客户端响应数据。

### response的功能：

  * 设置响应头
  * 发送状态码
  * 设置响应正文
  * 重定向

#### response响应正文

  * ServletOutputStream getOutputStream()：用来向客户端响应字节数据；
  * PrintWriter getWriter()：用来向客户端响应字符数据；

#### 向客户端发送字节数据

```java
String s = "Hello ouputStream";
byte[] bytes = s.getBytes();
System.out.println(bytes);
response.getOutputStream().write(bytes);
```

#### 向客户端相应图片数据

```java
String path = "F:\\a.jpg";
FileInputStream fs = new FileInputStream(path);
ByteArrayOutputStream bos = new ByteArrayOutputStream()；
byte[] buffer = new byte[4096];
int n = 0;
while((n = fs.read(buffer)) != -1) {
    bos.write(buffer,0,n);
}
bos.flush();
bos.toByteArray();
response.getOutputStream().write(bos.toByteArray());
```

#### response字符编码

  * Tomcat响应数据默认使用ISO-8859-1
  * 通常浏览器默认使用GBK编码
  * response.setCharacterEncoding("utf-8");//设置response.getWriter()的字符编码

response.setCharacterEncoding("utf-8");
response.getWriter().print("大家好");
因为已经设置了字符流编码为utf-8，所以响应给客户端的数据为utf-8编码！
但因为浏览器默认使用的是gbk来解析响应数据，所以乱码！如果浏览器使用utf-8编码，那么就不会乱码了。



  response.setContentType("text/html;charset=utf-8");
  response.getWriter().print("大家好");
  setContentType()方法有两个作用：

  * 设置字符流编码。等同与调用了response.setCharacterEncoding("utf-8")；
  * 设置Content-type响应头，即通知浏览器响应数据的编码为utf-8。
      因为设置字符流的编码为utf-8，所以响应给客户端数据为utf-8编码
      因为设置了Content-type头为utf-8，所以浏览器会使用utf-8来解析响应数据,不会乱码

#### 设置响应头

  response.setHeader("Content-type", "text/html;charset=utf-8");
  等同与
  response.setContentType("text/html;charset=utf-8");

  response.setHeader("Refresh", "5; URL=www.baidu.com");

```
/*
* 重定向操作
*/
//		response.setStatus(302);
//		response.setHeader("Location", "/demo/Bservlet");//重定向操作
//		response.sendRedirect("/demo/Bservlet");  //这是更加快捷的重定向
/*
* 定时刷新
*/
//		response.getWriter().println("欢迎XX登录,5秒后自动跳转");
//		response.setHeader("Refresh", "5;URL=/demo/Bservlet");  //注意这里的格式
```

### request

 * 获取请求头
 * 获取请求参数
 * Servlet三大域对象之一
 * 请求包含和请求转发

request获取请求头

 * String getHeader(String name)：获取指定名称的请求头
 * int getIntHeader(String name)：获取指定名称的请求头，把值转换成int类型。
 * Enumeration getHeaderNames()：获取所有请求头名称
   

request**请求数据相关其他方法**

 * String getMethod()：获取请求方式
 * String getContextPath()：获取上下文路径，即“/” + 应用名称，例如：/day05_1
 * void setCharacterEncoding(String)：设置请求体的编码
 * String getRemoteAddr()：获取客户端IP地址

`非重点`

 * int getContentLength()：获取请求体字节数
 * Locale getLocale()：获取请求Locale，例如zh_CN表示中文，中国
 * String getCharacterEncoding()：获取请求体编码，在没有调用setCharacterEncoding()之前该方法返回null
 * String getQueryString()：获取参数列表，例如：username=zhangSan&password=123
 * String getRequestURI()：返回请求URI路径，从应用名称开始，到参数之前这一段，例如：/day05_1/AServlet
 * StringBuffer getRequestURL()：整个请求URL，不包含参数部分
 * String getServletPath()：返回Servlet路径，从应用名称后开始，到参数之前这一段，不包含应用名称。
 * String getServerName()：返回主机名，例如：localhost
 * int getServerPort()：返回服务器端口号，例如：8080



