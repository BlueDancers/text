# Spring

### spring是开源的轻量级框架

1. Sprin核心主要两部分
   1. aop: 面向切面编程,拓展功能不是通过修改源码实现的
   2. ioc: 控制反转
      - 比如有一个类,在类里面有方法(不是静态的方法),调用类里面的方法,创建类对象,使用对象调用方法,创建类对象的过程,需要new出来的对象
      - 把对象的创建不是通过new方式实现的,而是交给spring配置创建类对象
2. Spring是一站式框架
   1. Spring在javaEE的三层结构里面,每一层都提供了不同的解决技术
      - web层 SpringMVC
      - service Spring 的ioc
      - dao层: spring的jdbcTemplate
3. spring版本是4.x

### bean标签的常用属性

1. id属性    表示名称,任意命名,但是不能包含特殊符号
2. clas属性  创建对象所在类的全路径
3. name属性    功能和id是一样的,但是name里面可以包含特殊符号,但是现在不用了
4. scope属性    
   - singleton  默认的 单例
   - prototype 多例的
   - request 创建对象,把对象放入request里面
   - session 创建对象,把对象放入session里面
   - globalSession 创建对象,把对象放入globalSession 里面

### 属性注入

1. set方法
2. 有参构造
3. 使用接口注入

#### 在spring里面支持set方法注入,有参数的构造注入

> 使用有参构造注入属性

```xml
<bean id="demo" class="cn.vkcyan.spring.Property">
<!-- 有参数构造注入 -->
<property name="name" value="张三"></property>
	<!-- <constructor-arg name="name" value="张三"></constructor-arg> -->
</bean
```

#### 注入对象类型属性

创建dao service 然后在service里面调用dao的方法 ,使用set,使用spring进行实例化

```java
public class UserDao {
	public void add (){
		System.out.println("UserDao");
	}
}


public class UserService {
	private UserDao userDao;
	public void setUserDao(UserDao userDao) {
		this.userDao = userDao;
	}

	public void add (){
		System.out.println("service");
		//假如要得到dao里面的方法,那就要newdao
		userDao.add();
	}
}
```



```xml
<bean id="dao" class="cn.vkcyan.spring.UserDao"></bean>
<bean id="service" class="cn.vkcyan.spring.UserService">
	<!-- 注入dao对象,不可以写value了,因为这里不是字符串 
		name里面写service里面写的属性名称
		-->
	<property name="userDao" ref="dao"></property>
</bean>
```



````java
UserService users = (UserService) context.getBean("service");
users.add();
````

实现让spring注入对象类型属性



#### p名称空间应用

```xml
xmlns:p="http://www.springframework.org/schema/p"



<bean id="Person" class="cn.vkcyan.spring.Person" p:pname="lucy">
<!-- p名称空间注入 -->
</bean>
```

#### 注入复杂类型属性

1. 数组
2. list集合
3. map集合
4. properties类型

````java
	private String[] arrs;
	private List<String> list;
	private Map<String,String> map;
	private Properties properties;
````





```xml
<bean id="Person" class="cn.vkcyan.spring.Person" p:pname="lucy">
<!-- p名称空间注入 -->
<!-- 数组 -->
<property name="arrs">
	<list>
		<value>消亡</value>
		<value>哈哈哈</value>
		<value>第三</value>
	</list>
</property>

<!-- list -->
<property name="list">
	<list>
		<value>list1</value>
		<value>list2</value>
		<value>list3</value>
	</list>
</property>
<!-- map -->
<property name="map">
	<map>
		<entry key="1" value="111"></entry>
		<entry key="2" value="222"></entry>
		<entry key="3" value="333"></entry>
	</map>
</property>
<!-- properties -->
<property name="properties">
	<props>
		<prop key="driverClass">com.mysql.jdbc.Driver</prop>
	</props>
</property>

</bean>
```





### IOC与DI的区别

IOC: 控制反转,将对象创建的的权利交给Spring进行配置

DI: 依赖注入,先类里面的属性进行设置值



关系: 依赖注入不能单独存在,需要在ioc的基础上完成操作



### spring整合web项目的原理

实现思路: 把加载配置文件和创建对象的过程,在服务器启动的时候就完成

1. ServletContext对象
2. 监听器

在服务器启动的时候,为每一个项目创建一个ServletContext对象

在ServletContext对象创建的时候,使用监听器可以具体监听到ServletContext对象在什么时候创建

当监听到ServletContext创建的时候,就加载spring配置文件,把配置文件配置的对象创建

把配置文件的对象放入ServletContext域里面(setAttribute)

获取对象的时候,从ServletContext域里面拿(getAttribute)







