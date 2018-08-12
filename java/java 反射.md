# java - 反射

### 反射是什么?

​	java反射机制是在运行状态中,对任意一个类,都能够知道这个类的所有方法和属性

​	对于人一个对象,都可以调用它的任意方法和属性,

​	这样的动态获取信息以及动态调用对象方法被称为反射

### 应用

在一些通用性比较高的代码和框架中

后面学到的框架，大多数都是使用反射来实现的

在框架开发中，都是基于配置文件开发

​	在配置文件中配置了类，可以通过反射得到类中的 所有内容，可以让类中的某个方法来执行

类中的所有内容：属性、没有参数的构造方法、有参数的构造方法、普通方法 

### 反射的原理

首先需要将java文件保存到硬盘

编译java文件,成为class文件

使用vim进.把class文件通过类加载器加载进内存

class文件在内存中使用Class表示

当使用反射的时候,首先需要获取Class类,得到这个类之后,就可以得到class文件中的所有内容

包括属性 构造方法 普通方法

属性通过Filed 这个类

构造方法通过 Constructor 这个类

普通方法通过类 Method 进行解析



Person.java

```java
package fs;
public class Person {
    private String name;
    private String sex;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }


    public Person() {
        super();
    }
    public Person (String name,String sex){
        this.name = name;
        this.sex = sex;
    }

    public void eat(){
        System.out.print("吃......");
    }
    private void run (){
        System.out.printf("我是run()");
    }

    public String say(String name){
        return name+"你好";
    }
    public String toString (){
        return "姓名"+name+"年龄"+sex;
    }
}
```

ClassTest.java

```java
package fs;

import org.junit.jupiter.api.Test;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class ClassTest {
    @Test
    public void demo() throws ClassNotFoundException, IllegalAccessException, InvocationTargetException, InstantiationException, NoSuchMethodException {
        //1.通过类名获取class
        Class<Person> clazz = Person.class;
        //2. 通过对象getClass()的方法
        Person person1 = new Person();
        person1.getClass();
        //但是这两种都是已知对象的形式 都已知的就不需要使用这个方法了
        //3. Class的forName方法(推荐)
        //获得无参的构造函数
        Class clazz2 = Class.forName("fs.Person");//获取
        Constructor c = clazz2.getConstructor();  //获取构造函数
        Person person = (Person) c.newInstance(); //相当与new
        person.eat();  //执行函数里面的方法
    }
    @Test
    public void demo2() throws ClassNotFoundException, NoSuchMethodException, IllegalAccessException, InvocationTargetException, InstantiationException {
        Class class1 = Class.forName("fs.Person");
        //获取有参数的构造函数(就传参数,类型.class)
        Constructor c =  class1.getConstructor(String.class,String.class);
        Person person = (Person) c.newInstance("张三","男");
        System.out.print(person);

    }

    @Test
    public void demo3() throws ClassNotFoundException, NoSuchFieldException, IllegalAccessException, InstantiationException {
        Class Clazz = Class.forName("fs.Person");
        //获取成员属性
        //Clazz.getField()  //这个用来获取public 的变量
        Field name = Clazz.getDeclaredField("name");  //获取成员对象name
        Field sex = Clazz.getDeclaredField("sex");         //获取成员变量 sex
        Person person = (Person) Clazz.newInstance();         //Clazz.newInstance()相当与实例化这个对象
        name.setAccessible(true);                           //必须打开权限 不然没办法获取
        sex.setAccessible(true);
        name.set(person,"张三");                             //设置属性相当与p.name = "张三"
        sex.set(person,"男");
        Object names =  name.get(person);
        System.out.printf(names.toString());
    }

    @Test
    //测试共有方法
    public void demo4() throws ClassNotFoundException, IllegalAccessException, InstantiationException, NoSuchMethodException, InvocationTargetException {
        Class Clazz = Class.forName("fs.Person");
        //实例化
        Person person = (Person) Clazz.newInstance();
        Method e = Clazz.getMethod("eat");    //获取共有方法eat()
        e.invoke(person);    //执行方法
    }
    @Test
    //测试私有方法
    public void demo5() throws ClassNotFoundException, IllegalAccessException, InstantiationException, NoSuchMethodException, InvocationTargetException {
        Class Clazz = Class.forName("fs.Person");
        //实例化
        Person person = (Person) Clazz.newInstance();
        Method e = Clazz.getDeclaredMethod("run");
        e.setAccessible(true);
        e.invoke(person,null);
    }
    @Test
    //测试带参数方法
    public void demo6() throws ClassNotFoundException, IllegalAccessException, InstantiationException, NoSuchMethodException, InvocationTargetException {
        Class Clazz = Class.forName("fs.Person");
        //实例化
        Person person = (Person) Clazz.newInstance();
        Method say = Clazz.getDeclaredMethod("say", String.class);   //得到有参数的say()方法
        say.setAccessible(true);   //打开全选
        Object obj =  say.invoke(person,"vkcyan");  //执行方法
        System.out.printf(obj.toString());
    }
}
```

总结一下

#### Class类

class类代表某个类的字节码,并提供加载字节码的方法

forName("包名.类名")

这个方法用于加载类字节码到内存里面,并封装成一个Class对象

#### FieId类

FieId类代表某个类的一个成员变量,并提供动态的访问权限

得到所有成员变量

- FieId[] fieids = c.getFields() //取得所有的public属性
- FieId[] fieids = c.getDeclaredFields()  //取得所有声明属性

得到指定成员变量

- FieId fieids = c.getField("name") 
- FieId fieids = c.getDeclaredField("name")

对于FieId的私有变量需要设置权限

- FieId.setAccessible(true)

FieId变量值的读取 设置

- fieId.get(obj)
- fieId.set(obj,value)

#### Method类

代表某个类的一个成员方法

获取所有方法

- getDeclaredMethods()
- getMethods()

获得指定方法

- getDeclaredMethod(String name,Class<?>)
- getMethod(String name,Class<?>)

通过反射指定方法

- invoke(Object obj, ...args)