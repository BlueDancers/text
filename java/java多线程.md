# 多线程

**进程**: 正在进行的程序

**线程**: 就是进程中一个负责程序执行的控制单元,一个进程里面可以有多个执行路径 称为 多线程

一个进程至少要有一个进程

开启多个线程是为了同时运行多部分代码

每个线程都有自己运行的内容,这个内容可以称为线程要执行的任务

多线程的好处: 解决了多部分同时运行的问题

多线程的缺点: 线程太多会降低效率



JVM启动时就启动了多个线程,至少两个线程

1. 执行main的函数线程

   ​	该线程的任务代码都定义在main函数里面

2. 负责垃圾回收的线程



##自定义线程

Thread类用于描述线程,线程是需要任务的,所以Thread类也对任务进行描述

这个任务就通过thread类中的run方法来体现,也就是说,run方法就是封装自定义线程运行任务的函数

run() 里面定义的就是要运行的代码

开启线程就是运行指定代码,所以只要继承Thread类,重写run()

###创建一个线程的方式:

- 方式1  -- 继承thread类 重写 run 方法

  1. 定义一个类继承thread类
  2. 覆盖thread类里面的run方法
  3. 直接创建thread的子类对象创建进程
  4. 调用start方法开启线程被调用线程的任务

- 方式2  -- 实现Runnable接口

  1. 定义类实现run方法

  2. 覆盖接口的run方法,将线程的任务代码封装到run方法里面

  3. 通过Thread类创建线程对象,并将Runnable接口的子类对象作为Thread类的构造函数的参数进行传递

     线程的任务都封装在Runnable接口子类的对象的run方法里面 

     所以要在线程对象创建的时候就明确要运行的任务

  4. 调用线程对象的start方法开启线程



一些注意事项:

主线程为 main

可以通过Thread类里面的getName() 来获取线程名称  Thread-编号(0)

Thread.currentThread().getName()          获取当前线程名称

线程之间互不打扰,即使主函数出错 其他线程也会继续执行

**第一种方式: 继承Thread() 重写run()**

```java
	public static void main(String[] args) {
		
		Demo1 d1 = new Demo1(20,"王超");
		d1.start();
		//创建线程的目的是开启一条执行路径 ,去运行指定的代码和其他代码实现同时运行
		Demo1 d2 = new Demo1(10,"tody");
		d2.start();
		System.out.println(4/0);
	}

}


class Demo1 extends Thread {
	private String name;
	private int age;
	Demo1(int age,String name) {
		super(name);             //自定义线程名称
		this.age = age;
		this.name = name;
	}
	public void run () {
		for (int i = 0; i < 6; i++) {
			System.out.println(name+"今年"+age+"线程名称:"+Thread.currentThread().getName());    //getName()   获取线程名称
		}
	}
}
```

**第二种方式:实现Runnable接口 将run方法作为参数传入Thread()类里面 **

```java
public class runnable {

	public static void main(String[] args) {
		run1 run1 = new run1(10);
		run1 run2 = new run1(20);
		Thread t = new Thread(run1);    //实现接口的run方法 开启多线程
		Thread t2 = new Thread(run2);
		t.start();
		t2.start();
	}

}


class run1 implements Runnable {
	//通过接口的形式去完成多线程
	private int age;
	run1 (int age) {
		this.age = age;
	}
	public void run() {
		show();
	}
	public void show() {
		for (int i = 0; i < 100; i++) {
			System.out.println(Thread.currentThread().getName()+age);
		}
	}
}
```



线程的生命周期 以及状态转换

![](http://on7r0tqgu.bkt.clouddn.com/Fst6dAr8YVbdzstrhEYAEqA_ffRS.png)



