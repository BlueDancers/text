# java监听器

## Listener：监听器 

监听器中的方法，会在特殊事件发生时被调用！

l  事件源：三大域

### ServletContext

#### 生命周期监听

ServletContextListener，它有两个方法，一个在出生时调用，一个在死亡时调用;

```java
void contextInitialized(ServletContextEvent sce)：创建SErvletcontext时
void contextDestroyed(ServletContextEvent sce)：销毁Servletcontext时
```



#### 属性监听

ServletContextAttributeListener，它有三个方法，一个在添加属性时调用，一个在替换属性时调用，最后一个是在移除属性时调用。 

```java
void attributeAdded(ServletContextAttributeEvent event)：添加属性时；
void attributeReplaced(ServletContextAttributeEvent event)：替换属性时；
void attributeRemoved(ServletContextAttributeEvent event)：移除属性时；
```

### Httpsession

#### 生命周期监听 

HttpSessionListener，它有两个方法，一个在出生时调用，一个在死亡时调用； 

```java
void sessionCreated(HttpSessionEvent se)：创建session时
void sessionDestroyed(HttpSessionEvent se)：销毁session时
```

#### 属性监听

HttpSessioniAttributeListener，它有三个方法，一个在添加属性时调用，一个在替换属性时调用，最后一个是在移除属性时调用

```java
void attributeAdded(HttpSessionBindingEvent event)：添加属性时；
void attributeReplaced(HttpSessionBindingEvent event)：替换属性时
void attributeRemoved(HttpSessionBindingEvent event)：移除属性时
```

### ServletRequest

#### 生命周期监听

生命周期监听：ServletRequestListener，它有两个方法，一个在出生时调用，一个在死亡时调用；

```java
void requestInitialized(ServletRequestEvent sre)：创建request时
void requestDestroyed(ServletRequestEvent sre)：销毁request时
```

#### 属性监听

  ServletRequestAttributeListener，它有三个方法，一个在添加属性时调用，一个在替换属性时调用，最后一个是在移除属性时调用。

```java
void attributeAdded(ServletRequestAttributeEvent srae)：添加属性时
void attributeReplaced(ServletRequestAttributeEvent srae)：替换属性时
void attributeRemoved(ServletRequestAttributeEvent srae)：移除属性时
```

l  javaWeb中完成编写监听器

Ø  写一个监听器类：要求必须去实现某个监听器接口；

必须在web.xml中配置来完成注册！

```java
ServletContextEvent：ServletContext getServletContext()
HttpSessionEvent：HttpSession getSession()
ServletRequest：
	ServletReques getServletRequest()；
	ServletContextAttributeEvent：
ServletContextAttributeEvent：
	ServletContext getServletContext()；
	String getName()：获取属性名
	Object getValue()：获取属性值
HttpSessionBindingEvent：略
ServletRequestAttributeEvent ：略
```

感知监听（都与HttpSession相关）

l  它用来添加到JavaBean上，而不是添加到三大域上！

l  这两个监听器都不需要在web.xml中注册！

HttpSessionBindingListener：添加到javabean上，javabean就知道自己是否添加到session中了。 

### session的一些特性

HttpSessionActivationListener：Tomcat会在session从时间不被使用时钝化session对象，所谓钝化session，就是把session通过序列化的方式保存到硬盘文件中。当用户再使用session时，Tomcat还会把钝化的对象再活化session，所谓活化就是把硬盘文件中的session在反序列化回内存。



l  当session被Tomcat钝化时，session中存储的对象也被纯化，当session被活化时，也会把session中存储的对象活化。

如果某个类实现了HttpSessionActiveationListener接口后，当对象随着session被钝化和活化时，下面两个方法就会被调用：

```
public void sessionWillPassivate(HttpSessionEvent se)：当对象感知被活化时调用本方法；

public void sessionDidActivate(HttpSessionEvent se)：当对象感知被钝化时调用本方法；
```

HttpSessionActivationListener监听器与HttpSessionBindingListener监听器相似，都是感知型的监听器，例如让Person类实现了HttpSessionActivationListener监听器接口，并把Person对象添加到了session中后，当Tomcat钝化session时，同时也会钝化session中的Person对象，这时Person对象就会感知到自己被钝化了，其实就是调用Person对象的sessionWillPassivate()方法

 当用户再次使用session时，Tomcat会活化session，这时Person会感知到自己被活化，其实就是调用Person对象的sessionDidActivate()方法

因为钝化和活化session，其实就是使用序列化和反序列化技术把session从内存保存到硬盘，和把session从硬盘加载到内存。

