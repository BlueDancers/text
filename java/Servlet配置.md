# Servlet配置

Servlet是JavaWeb的**三大组件之一**，它属于动态资源。Servlet的作用是处理请求，服务器会把接收到的请求交给Servlet来处理，在Servlet中通常需要：

1.  接收请求数据；
2. 处理请求；
3. 完成响应。

例如客户端发起登录请求,这些请求都是有servlet来处理的,servlet需要我们自己编写.每个servlet必须实现javax.servlet.Servlet接口

### 实现Servlet的三种方式

1. 实现javas.servlet.Servlet接口
2. 继承javax.servlet.GenericServlet类
3. 继承javax.servlet.http.HttpServlet类

从最原始Servlet接口开始

```java
package cn.vkcyan.web.servlet;

import java.io.IOException;

import javax.servlet.Servlet;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
/*
 * 查看servlet里面的方法
 */
public class AServlet implements Servlet {
	/*
	 * 他是生命周期,会在销毁之前调用,只能调用一次
	 * @see javax.servlet.Servlet#init(javax.servlet.ServletConfig)
	 */
	@Override
	public void destroy() {
		System.out.println("destroy-------");
	}

	@Override
	/*获取servlet配置的类
	 * @see javax.servlet.Servlet#getServletConfig()
	 */
	public ServletConfig getServletConfig() {
		System.out.println("getServletConfig-------");
		return null;
	}

	@Override
	public String getServletInfo() {
		System.out.println("getServletInfo-------");
		return null;
	}
	/*
	 * 他是生命周期
	 * 他会在servlet创建后执行,只能执行一次
	 * @see javax.servlet.Servlet#init(javax.servlet.ServletConfig)
	 */
	@Override
	public void init(ServletConfig ServletConfig) throws ServletException {
		System.out.println("init-------");
	}
	/*
	 * 他是生命周期,会调用很多次 ,请求都调用很多次
	 * @see javax.servlet.Servlet#init(javax.servlet.ServletConfig)
	 */
	@Override
	public void service(ServletRequest ServletRequest,ServletResponse ServletResponse) throws ServletException, IOException {
		System.out.println("service-------");
	}

}
```

接下来就是配置web访问的路径

在web.xml里面添加配置

```xml
<servlet>
	<servlet-name>xxx</servlet-name>
	<servlet-class>cn.vkcyan.web.servlet.AServlet</servlet-class>
</servlet>
  	
<servlet-mapping>
  	<servlet-name>xxx</servlet-name>
  	<url-pattern>/AServlet</url-pattern>
</servlet-mapping>
```

l  <servlet>：指定AServlet这个Servlet的名称为xxx;

​	<servlet-name>: 给clas一个名字,便于Servlet映射

<servlet-mapping>

​	进行映射xxx,	<url-pattern>指定web的页面地址

这时候页面以及可以进行访问,查看控制台就可以明显查看Servlet的生命周期

1. void init(ServletConfig)：出生之后（1次）；
2.  void service(ServletRequest request, ServletResponse response)：每次处理请求时都会被调用；
3. void destroy()：临死之前（1次）；

servlet的特点

1. 单例，一个类只有一个对象；当然可能存在多个Servlet类！ 
2. 线程不案例的，所以它的效率是高的

**Servlet****类由我们来写，但对象由服务器来创建，并且由服务器来调用相应的方法。



### Servlet的接口

​	服务器会在Servlet第一次被访问时创建Servlet，或者是在服务器启动时创建Servlet。如果服务器启动时就创建Servlet，那么还需要在web.xml文件中配置。也就是说默认情况下，Servlet是在第一次被访问时由服务器创建的。 

而且一个Servlet类型，服务器只创建一个实例对象 ,我们首次访问http://localhost:8080/helloservlet/helloworld时，服务器通过“/helloworld”找到了绑定的Servlet名称为cn.vkcyan.servlet.HelloServlet，然后服务器查看这个类型的Servlet是否已经创建过，如果没有创建过，那么服务器才会通过反射来创建HelloServlet的实例。



我们可以把一些对Servlet的初始化工作放到init方法中

当服务器每次接收到请求时，都会去调用Servlet的service()方法来处理请求。服务器接收到一次请求，就会调用service() 方法一次，所以service()方法是会被调用多次的。正因为如此，所以我们才需要把处理请求的代码写到service()方法中

通常都是在服务器关闭时Servlet才会离去







