# Struts2框架

- 应用于web框架
- struts2是strust1与webwork基础上的全新框架
- struts2可以解决的问题:
  - 请求被过滤器封装
  - 简化代码

### strust2的第一个案例

> 导包 并不需要导所有的struts2的包,打开apps里面的第一个案例`struts2-blank.war`复制里面的jar包

1. 创建class类,就像访问setvlet一样,Httpservlet在请求的时候会访问servcie(),struts2也一样默认执行execute()

```java
package cn.vkcyan.action;

public class HelloAction {	
	public String execute () {
		return "ok";
	}
}
```

2. 创建struts.xml

> 可以复制`struts2-blank.war`里面的struts.xml的dtd部分

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE struts PUBLIC
	"-//Apache Software Foundation//DTD Struts Configuration 2.3//EN"
	"http://struts.apache.org/dtds/struts-2.3.dtd">

<struts>
	<package name="hellodemo" extends="struts-default" namespace="/">
	<!--name 访问名称-->
		<action name="hello" class="cn.vkcyan.action.HelloAction">
		<!-- 配置方法的返回值到页面 -->
			<result name="ok">/index.jsp</result>
		</action>
	</package>
</struts>
	
```

3. 最后在web.xml里面配置过滤器

> 一样可以再`struts2-blank.war`里面复制

```xml
<filter>
        <filter-name>struts2</filter-name>
        <filter-class>org.apache.struts2.dispatcher.ng.filter.StrutsPrepareAndExecuteFilter</filter-class>
</filter>
<filter-mapping>
    <filter-name>struts2</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```

4. 开启tomcat,访问`http://localhost:8080/你的项目名/hello.action`

### Struts2的基本执行过程

1. 输入地址,发送请求 
2. 过滤器进行

```text
1. 获取请求路径
2. 切分路径,得到请求地址里面的请求值(hello)
3. 到src下面找struts.xml使用dom4j进行解析,得到xml文件内容
4. 拿着请求值(hello),与action标签的name属性值进行匹配
5. 匹配到name属性值,就会去找class属性值,得到action的全路径,使用反射去实现功能
		Class clazz = Class.forName(class标签值)
		执行名称为execute的方法
		Method m  = clazz.getMethod("execute")
		/方法执行
		Object obj = m.invoke()
6. 得到action的返回值,匹配result标签的name的属性值,假如匹配到了,就跳转到执行页面
```

### Struts2核心配置文件

struts.xml的名称和位置是固定的,在src目录下

```xml
<struts>
	<package name="hellodemo" extends="struts-default" namespace="/">
	<!-- 
package类似于代码里面的包,区分不同的action和要配置的action,必须首先写package标签,在package里面才能配置action
	package标签里面的属性
 		1. name属性
			name属性值和功能本身没有关系,在一个配置文件里面可以写多个package,但是name属性值不可以相同
		2. extends属性
			属性值是固定的 struts-default ,写了这个属性后,在这package里面写的类就有了action的功能
		3. namespace属性
			namespace属性值与action标签里面的name属性值构成访问路径
-->
		<action name="hello" class="cn.vkcyan.action.HelloAction">
		<!-- 
	action标签配置action的访问路径
		1. name属性
			namespace属性值与action标签里面的name属性值构成访问路径
			在一个package里面可以写多个action,但是name属性值不能相同
		2. class属性
			action的全路径,使用反射执行
		3. method属性
			比如在action里面,默认执行的方法是execute方法,但是在action里面写其他方法,让action里面执行多个方法,使用method进行配置
			
-->
			<result name="ok">/index.jsp</result>
 <!--  根action的方法返回值,配置到不同的路径里面
		1. name属性 
			和方法返回值要一样,然后返回到页面
		2. type属性
			配置如何到路径里面去(重定向,转发)  默认转发操作
-->
		</action>
	</package>
</struts>
```

### Struts2编写方式

1. 创建普通类,不继承 不实现任何接口
2. 创建类,实现接口 Action
3. 创建类,继承类ActionSupport

### Struts2访问action的方法

1. 使用cation的标签method属性,在属性里面写执行的action方法
2. 使用通配符的方式实行
3. 动态访问实现



