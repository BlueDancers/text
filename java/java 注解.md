# java 注解

​	无论是初学者,还是经验丰富的开发者,注解一定接触过,比如

```java
@Override
	public String  toString() {
		return null;
	}
```

@Override 这就是一个注解,其功能是检测下面的方法是不是重写父类方法

```java
@Override
	public String  tostring() {
		return null;
	}
```

如果不是就会报错

### 什么是注解?

语法: @注解

注解的作用: 替代xml文件

servlet3.0中，就可以不再使用web.xml文件，而是所有配置都使用注解！
注解是由框架来读取使用的

### 注解的使用

  * 定义注解类：框架的工作
  * 使用注解：我们的工作
  * 读取注解（反射）：框架的工作

### 定义注解类

````java
@interface A{}
````

### 使用注解

  注解的作用目标：

* 类
* 方法
* 构造器
* 参数
* 局部变量

* 包

### 自定义注解

```java
@MyAnn(age=100,name="张三")
	public String numbers() {
		return null;
	}

@interface MyAnn {
	int age ();
	String name();
}
```

可以给定默认值,在使用注解时，可以不给带有默认值的属性赋值

```java
@MyAnn(name="张三")
	public String numbers() {
		return null;
	}
@interface MyAnn {
	int age () default 100;
	String name();
}
```

### value特权

```java
@interface MyAnn {
	int age () default 100;
	String value();
}
@MyAnn("张三")
	public String numbers() {
		return null;
	}
```

假如只给value的属性名,直接@MyAnn("张三")即可

例如： @MyAnno1(value="hello")，可以书写成 @MyAnno1("hello")

### 注解属性的类型

- 8种基本类型

- String
-  Enum

- Class

- 注解类型
- 以上类型的一维数组类型

```java
@MyAnno1(
	a=100,
	b="hello",
	c=MyEnum1.A,
	d=String.class,
	e=@MyAnno2(aa=200, bb="world"),
	f=100
)
@interface MyAnno1 {
	int a();
	String b();
	MyEnum1 c();
	Class d();
	MyAnno2 e();
	int[] f();
}
```





