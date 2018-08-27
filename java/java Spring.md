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

> spring开发核心包

```
spring-beans-5.0.8.RELEASE.jar
spring-context-5.0.8.RELEASE.jar
spring-core-5.0.8.RELEASE.jar
spring-expression-5.0.8.RELEASE.jar
--日志模块--
commons-logging-1.1.1.jar
log4j-1.2.17.jar
```



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



### spring的bean管理

代码里面的一些特殊的标记,使用注解可以完成功能

可以使用在类上面,方法和上面

#### Spring注解开发准备

1. 导入基本jar包
2. 导入aop的jar包
3. 创建spring的配置文件,引入约束beans
4. 做ioc直接开发还需要引入新的约束

#### 注解创建对象

在创建对象的类上面加注解就可以实现,和<bean id="user" class="...">一个效果

```java
@Component(value="user")   //这个注解可以创建对象
public class base {
	public void add() {
		System.out.println("add........");
	}
}
```

```java
public class Tesst {
	@Test
	public void testUser () {
		ApplicationContext context = new ClassPathXmlApplicationContext("bean1.xml");
		base base = (base) context.getBean("user");
		base.add();
	}
}
```

创建对象有4个注解

@Component

@Controller     	WEB层

@Service		业务层

@Repository		持久层

目前这四个注解都是用来创建对象



创建对象是单实例还是多实例

````
@Scope(value="prototype")   //创建多实例
						//默认单实例
````



#### 注解注入属性

```java

@Component(value="daos")
public class ServiceDao {
	public void add() {
		System.out.println("Dao.....");
	}
}
```

```java
@Service(value="services")
public class service {
	//在dao竖向方面使用注解完成对象的使用
	
//	@Autowired   //实现自动注入
//	private ServiceDao dao;
	
//也可以使用Resource完成注入
	@Resource(name="daos")
	private ServiceDao dao;
	public void add() {
		System.out.println("service.......");
	}
}
```

```java
@Test
	public void testDao() {
		ApplicationContext context = new ClassPathXmlApplicationContext("bean1.xml");
		service ser = (service) context.getBean("services");
		ser.add();
	}
```



#### 配置文件和注解的混合使用

1. 创建对象操作使用配置文件方式实现
2. 注入属性的操作使用注解方式实现





#### AOP概念

1. 面向切面编程,拓展一个功能不通过修改源代码实现,
2. AOP采用横向抽取机制,取代了传统的纵向继承体系重复性代码
3. AOP横向抽取机制 底层使用动态代理实现

#### AOP操作术语

连接点: 类里面哪些方法可以被增强,这些方法称为连接点

**切入点**: 在类里面可以有很多的方法被增强,实际增强的方法被称为切入点

**通知/增强**: 增强的逻辑,被称为增强,比如拓展日志

**切面**: 把增强引用到棘突方法上面,这个过程被称为切面

Spring的aop操作

1. spring里面进行aop操作,使用aspectJ一起完成aop操作
2. Spring2.0新增了对AspectJ的支持

使用aspectJ实现aop的方式

1. 基于aspectJ的xml配置
2. 基于aspectJ的注解的方式

AOP操作的准备工作

导包

![](C:\Users\spring\AppData\Local\Temp\1534726881612.png)

配置xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:aop="http://www.springframework.org/schema/aop" xsi:schemaLocation="
        http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd"> <!-- bean definitions here -->



</beans>
```



使用表达式配置切入点

常用表达式

```
execution(<访问修饰符>,<方法名>,(<参数>),<异常>)
```

1. execution(* cn.vkcyan.spring.base.vkcyanAOP(..))  //指定增强
2. execution(* cn.vkcyan.spring.base.*(..))   //增强base包下的所有方法



使用aop完成前置增强

```java
public class vkcyanAOP {
	public void add() {
		System.out.println("add.....");
	}
}

```

```java
public class vkcyanAOPs {
	public void before1() {
		System.out.println("前置输出");
	}
}
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:aop="http://www.springframework.org/schema/aop" xsi:schemaLocation="
        http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd"> <!-- bean definitions here -->

<!-- 配置对象 -->
<bean id="vkcyanAOP" class="cn.vkcyan.spring.base.vkcyanAOP"></bean>
<bean id="vkcyanAOPS" class="cn.vkcyan.spring.base.vkcyanAOPs"></bean>
<!-- 配置aop操作 -->
<aop:config >
	<!-- 配置切入点 -->
	<aop:pointcut expression="execution(* cn.vkcyan.spring.base.vkcyanAOP.*(..))" id="pointcut1"/>
	<!-- 配置切面,把增强用到方法上面 -->
	<aop:aspect ref="vkcyanAOPS">
		<!-- 配置增强类型 前置 后置 .. method增强类里面使用那个方法作为前置 -->
		<aop:before method="before1" pointcut-ref="pointcut1"/>
	</aop:aspect>
</aop:config>
</beans>
```

```java
@Test
	public void testAOP() {
		ApplicationContext context = new ClassPathXmlApplicationContext("bean2.xml");
		vkcyanAOP aop = (vkcyanAOP) context.getBean("vkcyanAOP");
		aop.add();
	}
```

后置输出

```
<aop:after method="after1" pointcut-ref="pointcut1"/>
```

环绕输出

```
	//环绕通知
	public void around1(ProceedingJoinPoint joinPoint) throws Throwable {
		//方法之前执行
		System.out.println("环绕通知之前执行");
		
		//执行被增强的方法
		joinPoint.proceed();
		
		//方法之后执行
		System.out.println("环绕通知之后执行");
	}
```

```
<aop:around method="around1" pointcut-ref="pointcut1"/>
```

#### log4j介绍

1. 通过log4j可以看到程序运行过程更加详细的输出

   - 经常使用log4j查看日志

2. 使用

   1. 导入log4j的jar包
   2. 复制log4j的配置文件,复制到src下面
   3. 创建log4j.properties 配置文件

   ```properties
   log4j.rootLogger = debug ,  stdout ,  D ,  E
   
   ### 输出到控制台 ###
   log4j.appender.stdout = org.apache.log4j.ConsoleAppender
   log4j.appender.stdout.Target = System.out
   log4j.appender.stdout.layout = org.apache.log4j.PatternLayout
   log4j.appender.stdout.layout.ConversionPattern =  %d{ABSOLUTE} %5p %c{1}:%L - %m%n
   
   ### 输出到日志文件 ###
   log4j.appender.D = org.apache.log4j.DailyRollingFileAppender
   log4j.appender.D.File = D:/logs/debug.log
   log4j.appender.D.Append = true
   log4j.appender.D.Threshold = DEBUG 
   log4j.appender.D.layout = org.apache.log4j.PatternLayout
   log4j.appender.D.layout.ConversionPattern = %-d{yyyy-MM-dd HH:mm:ss}  [ %t:%r ] - [ %p ]  %m%n
   
   ### 保存异常信息到单独文件 ###
   log4j.appender.E = org.apache.log4j.DailyRollingFileAppender
   log4j.appender.E.File = D:/logs/error.log
   log4j.appender.E.Append = true
   log4j.appender.E.Threshold = ERROR
   log4j.appender.E.layout = org.apache.log4j.PatternLayout
   log4j.appender.E.layout.ConversionPattern = %-d{yyyy-MM-dd HH:mm:ss}  [ %t:%r ] - [ %p ]  %m%n
   ```

   具体配置看这个[log4j配置](https://my.oschina.net/xianggao/blog/515216)


### 基于aspectJ的注解aop

1. 创建对象
2. 找spring核心配置文件里面开启aop操作

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:aop="http://www.springframework.org/schema/aop" xsi:schemaLocation="
        http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd">
<!-- 开启aop自动代码 -->

<aop:aspectj-autoproxy></aop:aspectj-autoproxy>
<!-- 创建对象 -->
<bean id="book" class="cn.vkcyan.spring.base.Book"></bean>
<bean id="booklist" class="cn.vkcyan.spring.base.bookList"></bean>
</beans>
```

在增强类上面使用注解完成aop操作

```java
@Aspect
public class bookList {
	@Before(value = "execution(* cn.vkcyan.spring.base.Book.*(..))")
	public void publics() {
		System.out.println("publics......");
	}
}
```

这样也完成了了aop操作的效果

## Spring jdbcTemplate

1. spring是一站式框架
   1. 针对javaee三层,每一层都有解决技术
   2. 针对dao层.spring使用jdbcTemplate,对jdbc进行封装
   3. 和dbutils很相似,都是对数据库进行crud操作

##### 涉及到的jar包

```
spring-tx-5.0.8.RELEASE.jar
spring-jdbc-5.0.8.RELEASE.jar
mysql-connector-java-8.0.12.jar
```

1. 创建对象设置数据库信息
2. 创建jdbcTemplate对象,设置数据源
3. 调用jdbcTemplate对象里面的方法实现操作

### 更新

```java
public class JdbcTest1 {
	//添加操作
	@Test
	public void add() {
		//创建对象,设置数据库信息
		DriverManagerDataSource dataSoure = new DriverManagerDataSource();
		dataSoure.setDriverClassName("com.mysql.cj.jdbc.Driver");
		dataSoure.setUrl("jdbc:mysql://localhost/base?useSSL=false&serverTimezone = UTC&");
		dataSoure.setUsername("root");
		dataSoure.setPassword("000000");
		//创建模板对象
		JdbcTemplate jt = new JdbcTemplate(dataSoure);
		String sql="insert into student values(?,?)";
        //调用update,实现更新操作
		int rows = jt.update(sql, "5","charu");
		System.out.println(rows);
	}
}
```

### 修改

```java
//修改操作
	@Test
	public void update () {
		DriverManagerDataSource dataSoure = new DriverManagerDataSource();
		dataSoure.setDriverClassName("com.mysql.cj.jdbc.Driver");
		dataSoure.setUrl("jdbc:mysql://localhost/base?useSSL=false&serverTimezone = UTC&");
		dataSoure.setUsername("root");
		dataSoure.setPassword("000000");
		JdbcTemplate jt = new JdbcTemplate(dataSoure);
		String sql="update student set sname=? where sid=?";
		int rows = jt.update(sql,"hahaha", 5);
		System.out.println(rows);
	}
	
```

### 删除

```java
//删除操作
	@Test
	public void delete () {
        DriverManagerDataSource dataSoure = new DriverManagerDataSource();
        dataSoure.setDriverClassName("com.mysql.cj.jdbc.Driver");
        dataSoure.setUrl("jdbc:mysql://localhost/base?useSSL=false&serverTimezone = UTC&");
        dataSoure.setUsername("root");
        dataSoure.setPassword("000000");
        JdbcTemplate jt = new JdbcTemplate(dataSoure);
        String sql="delete from student where sid=?";
        int rows = jt.update(sql,5);
        System.out.println(rows);
	}
```

### 查询

jdbcTemplate实现查询,有接口RowMapper

jdbcTemplate针对这个接口没有提供实现类,得到不同的类型数据需要自己进行数据封装

#### 查询的具体实现

##### 查询返回某个值

```java
		@Test
		public void select1 () {
			DriverManagerDataSource dataSoure = new DriverManagerDataSource();
			dataSoure.setDriverClassName("com.mysql.cj.jdbc.Driver");
			dataSoure.setUrl("jdbc:mysql://localhost/base?useSSL=false&serverTimezone = UTC&");
			dataSoure.setUsername("root");
			dataSoure.setPassword("000000");
			JdbcTemplate jt = new JdbcTemplate(dataSoure);
			String sql="select count(*) from student";
			//查询单值,使用的是queryForObject方法,第一个参数是sql语句,第二参数是定义返回来的calss
			int count = jt.queryForObject(sql, int.class);
			System.out.println(count);
		}
```

##### 查询返回对象

```java
//查询返回对象
		@Test
		public void select2 () {
			DriverManagerDataSource dataSoure = new DriverManagerDataSource();
			dataSoure.setDriverClassName("com.mysql.cj.jdbc.Driver");
			dataSoure.setUrl("jdbc:mysql://localhost/base?useSSL=false&serverTimezone = UTC&");
			dataSoure.setUsername("root");
			dataSoure.setPassword("000000");
			JdbcTemplate jt = new JdbcTemplate(dataSoure);
			String sql="select * from student where sid=?";
			//查询对象
			//1. 第一个参数是sql语句 
			//2. 第二参数是RowMapper,是接口,类似dbutils的接口.但是,这里我们需要自己实现
			//3. 第三参数是sql里面的值
			User user = jt.queryForObject(sql, new MyrowMapper(), 1);
			System.out.println(user);
		}
		
		
class MyrowMapper implements RowMapper<User>{
	@Override
	public User mapRow(ResultSet rs, int num) throws SQLException {
		//1. 从结果集里面把数据得到
		int sid = rs.getInt("sid");
		String sname = rs.getString("sname");
		System.out.println(sid+sname);
		//把数据封装到对象里面
		User user = new User();
		user.setSid(sid);
		user.setSname(sname);
		return user;  //返回封装好的对象
	}
}
```

##### 查询返回List对象

```java
//查询返回List集合
		@Test
		public void select3 () {
			DriverManagerDataSource dataSoure = new DriverManagerDataSource();
			dataSoure.setDriverClassName("com.mysql.cj.jdbc.Driver");
			dataSoure.setUrl("jdbc:mysql://localhost/base?useSSL=false&serverTimezone = UTC&");
			dataSoure.setUsername("root");
			dataSoure.setPassword("000000");
			JdbcTemplate jt = new JdbcTemplate(dataSoure);
			String sql="select * from student";
			//查询对象
			//1. 第一个参数是sql语句 
			//2. 第二参数是RowMapper,是接口,类似dbutils的接口.但是,这里我们需要自己实现,这里是一个list,会循环遍历new MyrowMapper() 获取所有值
			//3. 第三参数是sql里面的值,没有则不需要值
			List<User> count = jt.query(sql, new MyrowMapper()); 
			System.out.println(count);
		}


class MyrowMapper implements RowMapper<User>{
	@Override
	public User mapRow(ResultSet rs, int num) throws SQLException {
		//1. 从结果集里面把数据得到
		int sid = rs.getInt("sid");
		String sname = rs.getString("sname");
		System.out.println(sid+sname);
		//把数据封装到对象里面
		User user = new User();
		user.setSid(sid);
		user.setSname(sname);
		return user;  //返回封装好的对象
	}
}

```

### 使用c3p0配置连接池在dao里面使用jdbcTemplate

使用spring配置c3p0连接池

1. 导入jar包

````
c3p0-0.9.2.1.jar
mchange-commons-java-0.2.3.4.jar
````

2. 创建spring配置文件,配置连接池

```xml
<!-- 2. 将Dao注入到Service中去,同时将 -->
<bean id="userService" class="cn.vkcyan.spring.Service.UserServlce">
	<!-- 注入Dao -->
	<property name="userDao" ref="userDao"></property>
</bean>
<bean id="userDao" class="cn.vkcyan.spring.dao.UserDao">
	<!-- 注入jdbcTemplate对象 -->
	<property name="jdbcTemplate" ref="jdbcTemplate"></property>
</bean>
<!-- 创建jdbcTemplate,导入配置-->
<bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
	<property name="dataSource" ref="dataSouce"></property>
</bean>
<!-- 1. 配置c3p0数据连接池 -->
<bean id="dataSouce" class="com.mchange.v2.c3p0.ComboPooledDataSource;">
		<property name="driverclass" value="com.mysql.cj.jdbc.Driver"></property>
		<property name="jdbcUrl" value="jdbc:mysql://localhost/base?useSSL=false&amp;serverTimezone = UTC&amp;"></property>
		<property name="user" value="root"></property>
		<property name="password" value="000000"></property>
</bean>	
```







