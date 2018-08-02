# jsp

### jsp三大指令

#### page参数

在生成jsp的时候

```jsp
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
```

languag: 指定语言

contentType: 他表示添加一个响应头,等同于response.setContentType("text/html; charset=UTF-8")

pageEncoding: 指定当前页面的jsp编码,服务器在编译成为java文件的时候会按指定的编码去编译

>  如果两个属性只提供一个，那么另一个的默认值为设置那一个。
>
> 如果两个属性都没有设置，那么默认为iso8859-1



其他标签

import 导包

errorPage 和 isErrorPage

errorPage : 如果页面发生异常就转发到这个页面有errorPage决定

isErrorPage: 他指定当前页面是否是处理错误的页面,当属性为true的时候,页面状态码会设置成为**500** ,并且可以使用exception对象

也可以在web.xml里面配置404的页面

````xml
 <error-page>
  	<error-code>404</error-code>
  	<location>/error/errorpage.jsp</location>
  </error-page>
  <error-page>
  	<error-code>500</error-code>
  	<location>/error/a.jsp</location>
  </error-page>
  <error-page>
  	<exception-type>java.lang.RuntimeException</exception-type>
  	<location>/index.jsp</location>
  </error-page>
````

后面是page参数里面没啥用的属性

 autoFlush和buffer

> autoFlush：指定jsp的输出流缓冲区满时，是否自动刷新！默认为true，如果为false，那么在缓冲区满时抛出异常！
>
> buffer：指定缓冲区大小，默认为8kb，通常不需要修改！

> isELIgnored：是否忽略el表达式，默认值为false，不忽略，即支持！

> language：指定当前jsp编译后的语言类型，默认值为java。

> info：信息！

> isThreadSafe：当前的jsp是否支持并发访问！

> session：当前页面是否支持session，如果为false，那么当前页面就没有session这个内置对象！

> extends：让jsp生成的servlet去继承该属性指定的类！

#### 九大内置对象

```
* out --> jsp的输出流，用来向客户端响应
* page --> 当前jsp对象！　它的引用类型是Object，即真身中有如下代码：Object page = this;
* config --> 它对应真身中的ServletConfig对象！
* pageContext --> 一个顶9个！
* request --> HttpServletEequest
* response --> HttpServletResponse
* exception --> Throwable
* session --> HttpSession
* application --> ServletContext
```

out,page,config这三个用的少

pageContext:

首先说一下: 

Sevlet有三大域对象: request session ServletContext

jsp有四大域对象: request session ServletContext pageContext

 > ServletContext：整个应用程序
 >
 > session：整个会话(一个会话中只有一个用户)
 >
 > request：一个请求链！
 > pageContext：一个jsp页面！这个域是在当前jsp页面和当前jsp页面中使用的标签之间共享数据！

pageContext还可以代理其他域对象

代理其他域：pageContext.setAttribute("xxx", "XXX", PageContext.SESSION_SCOPE);  第二参数指定域

全域查找：pageContext.findAttribute("xxx");从小到大，依赖查找！

### 静态包含 include

与RequestDispatcher的include()方法的功能相似！

\<%@include%\> 它是在jsp编译成java文件时完成的！他们共同生成一个java(就是一个servlet)文件，然后再生成一个class！

RequestDispatcher的include()是一个方法，包含和被包含的是两个servlet，即两个.class！他们只是把响应的内容在运行时合并了！

作用：把页面分解了，使用包含的方式组合在一起，这样一个页面中不变的部分，就是一个独立jsp，而我们只需要处理变化的页面。

taglib --> 导入标签库

  * 两个属性：
    > prefix：指定标签库在本页面中的前缀！由我们自己来起名称！
    > uri: 指定标签库的位置！
    >
    > <%@taglib prefix="s" uri="/struts-tags"%> 
    >
    > 前缀的用法\<s:text\>

### jsp动作标签

这些jsp的动作标签，与html提供的标签有本质的区别。

动作标签是由tomcat(服务器)来解释执行！它与java代码一样，都是在服务器端执行的！

html由浏览器来执行

\<jsp:forward\>：转发！它与RequestDispatcher的forward方法是一样的，一个是在Servlet中使用，一个是在jsp中使用！

\<jsp:include\>：包含：它与RequestDispatcher的include方法是一样的，一个是在Servlet中使用，一个是在jsp中使用！

\<%@include\>和\<jsp:include>有什么不同！

\<jsp:param>：它用来作为forward和include的子标签！用来给转发或包含的页面传递参数！

### javaBean

1. 必须有一个默认构造器
2. 提供get/set方法 
3. 有get set 方法的成员  属性名称由get/set方法来决定！而不是成员名称！
4. 方法名称满足一定的规范，那么它就是属性！boolean类型的属性，它的读方法可以是is开头，也可以是get开头！

完全搞不懂这javaBean到底是什么鬼东西

### EL表达式

1. EL是JSP内置的表达式语言

jsp2.0开始，不让再使用java脚本，而是使用el表达式和动态标签来替代java脚本

EL替代的是<%= ... %>，也就是说，EL只能做输出！

2. EL表达式来读取四大域

${xxx}，全域查找名为xxx的属性，如果不存在，输出空字符串，而不是null。

\${pageScope.xxx}、\${requestScope.xxx}、\${sessionScope.xxx}、\${applicationScope.xxx}，指定域获取属性

3. javaBean导航

<%@ page import="cn.vkcyan.domain.*" %>


​	

	<%
		Address address = new Address();
		address.setCity("北京");
		address.setStreet("西三旗");
	
	    Employee emp = new Employee();
	    emp.setName("李小四");
	    emp.setSalary(123456);
	    emp.setAddress(address);
	
	    request.setAttribute("emp", emp);
	%>


使用el获取request域的emp

${requestScope.emp.address.street }

<!-- request.getAttribute("emp").getAddress().getStreet() -->

4. EL可以输出的东西都在11个内置对象中！11个内置对象，其中10个是Map！pageContext不是map，它就是PageContext类型，1个项9个。
  * param：对应参数，它是一个Map，其中key参数名，value是参数值，适用于单值的参数。
  * paramValues：对应参数，它是一个Map，其中key参数名，value是多个参数值，适用于多值的参数。
  * header：对应请求头，它是一个Map，其中key表示头名称，value是单个头值，适用于单值请求头
  * headerValues：对应请求头，它是一个Map，其中key表示头名称，value是多个头值，适用于多值请求头
  * initParam：获取<context-param>内的参数！
    <context-param>
    <param-name>xxx</param-name>
    <param-value>XXX</param-value>
    </context-param>
    <context-param>
    <param-name>yyy</param-name>
    <param-value>YYY</param-value>
    </context-param>

    ${initParam.xxx}

  * cookie：Map<String,Cookie>类型，其中key是cookie的name，value是cookie对象。 ${cookie.username.value}
  * pageContext：它是PageContext类型！${pageContext.request.contextPath}

















