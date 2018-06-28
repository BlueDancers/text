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



第二种方式实现的细节

为什么Thread里面传值就可以运行传值的run方法?

```java
//大致实现方法
class Thread {
	private Runnable r;
	Thread () {}
	Thread (Runnable r) {
        this.r = r;        //将实现接口的方法地址传进去
	}
	public void run() {
        if(r !== null){
        	r.run();     
        }
	}
	public void start() {
        run();
	}
}
```

Runnable的好处

继承Thread会继承所有类 我们不需要这样 而我们只需要线程run这个任务,
所以Runnable的出现将线程的任务进行了对象的封装

1. 将线程的任务从线程的子类中分离出来,进行单独的封装,按面向对象的思想将任务封装成对象
2. 避免了java单继承的局限性

所以创建线程第二种比较常见

### 线程的安全问题

线程安全问题的原因

1. 多个线程在操共享数据

2. 操作共享数据的线程代码有多条

  当一个线程在执行操作共享数据的多条代码过程中,其他线程参与了运算,就会导致线程等等安全问题(异步)

解决思路 

​	将异步变成同步,当线程执行代码的时候,其他线程不可以参与运算

在java中有同步代码块就可以解决这个问题 

```
synchronized (对象) {
    需要同步的代码;
}
```

同步的好处: 解决了线程的安全问题

同步的弊端: 相对降低了效率,因为同步外的线程的都会判断同步锁

同步的前提: 同步中必须有多个线程并使用同一个锁

#### 多线程应用 - 买票

```java

/*需求 买票
 * 
 * */
public class maipiao {

	public static void main(String[] args) {
		Ticket t1 = new Ticket();
		Ticket t2 = new Ticket();
		Ticket t3 = new Ticket();
		Ticket t4 = new Ticket();
		t1.start();
		t2.start();
		t3.start();
		t4.start();
	}
}

class Ticket extends Thread {
	private static int num = 100; //这里静态化可以解决这里的问题   但是这样就没办法开同一条一样的线程
	//private int num = 100;   
	public void sale () {
		while (true) {
			if(num > 0) {
				System.out.println("当前窗口"+Thread.currentThread().getName()+"卖出票"+num--);
			}else {
				return;
			}
			
		}
	}
	public void run() {
		sale();
	}
}
```

但是这里有安全隐患,因为一旦线程延迟 就会造成信息输出不正常

#### 同步代码块

```java

public class maipiaoRunnable {

	public static void main(String[] args) {
		font f = new font();
		Thread t1 = new Thread(f);
		Thread t2 = new Thread(f);
		Thread t3 = new Thread(f);
		Thread t4 = new Thread(f);
		t1.start();
		t2.start();
		t3.start();
		t4.start();
	}

}


class font implements Runnable  {
	private int num = 100;  //100张票
	Object obj  = new Object();
	
	public void run() {
		while(true) {
			synchronized (obj) {     //同步代码块 
				if(num>0) {
					try {
						Thread.sleep(10);  //线程安全隐患  会打印到-1 -2 等等 
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
					System.out.println("当前窗口"+Thread.currentThread().getName()+"卖出票"+num--);	
				}else {
					return;
				}
			}
		}
	}
}
```

这里的同步代码块解决了这和异步问题 将多线程变成同步

####同步函数

```java

public class sync {

	public static void main(String[] args) {
		Cus c = new Cus();
		Thread t1 = new Thread(c);
		Thread t2 = new Thread(c);
		t1.start();
		t2.start();
	}

}
//需求 使用两个 每个都到银行存一百 存3次

class Bank {
	private int num = 0;
	public void add(int sum) {
		num = num + sum;   //由于停顿了10毫秒 上一个以及完成运算变成100 但是因为这里的10毫秒 
						   //第一个还没有打印,这时候 第二个来了,num变成了200 第一次才睡醒 但是num已经不是100 而是 打印 200
		try {Thread.sleep(10);}catch (Exception e) {}
		System.out.println("当前账户余额"+num);
	}	
}

class Cus implements Runnable {    
	Bank b = new Bank();
	public void run () {     //同步函数 
		for (int i = 0; i < 3; i++) { 
			b.add(100);
		}
	}
}
```

同步函数和同步代码块一样的功能,但是写法更加优雅 

``` java
public synchronized void add() {}
```

####验证同步函数的锁

```java

public class maipiaop {

	public static void main(String[] args) {
		m m = new m();
		Thread t1 = new Thread(m);
		System.out.println("m="+m);        //打印出地址 为m=m@7852e922 
		Thread t2 = new Thread(m);
		t1.start();
		try {Thread.sleep(20);}catch(Exception e) {}
		m.flag = false;
		t2.start();
	}

}



class m implements Runnable {
	private int num = 100;
	boolean flag = true;
	Object obj = new Object();
	public void run () {
		System.out.println("this="+this);    //打印出地址为this=m@7852e922 由此可见 this 是同步函数的同步锁
		if(flag) {
			while(true) {
				show();	
			}
		}else {
			while(true) {
				synchronized (this) {
					if(num > 0) {
						try {Thread.sleep(10);}catch(Exception e) {}
						System.out.println("当前窗口"+Thread.currentThread().getName()+"卖出票线程1---"+num--);	
					}else {
						System.exit(0);
					}	
				}
			}
		}
	}
	
	public synchronized void show() {  //同步函数的锁是this
		if(num > 0) {
			try {Thread.sleep(10);}catch(Exception e) {}
			System.out.println("当前窗口"+Thread.currentThread().getName()+"卖出票线程2---"+num--);	
		}else {
			System.exit(0);
		}
	}
}
```

#####同步函数和同步代码块的区别

同步函数的使用的锁是固定的this

同步代码块使用的锁是任意的对象 建议使用同步代码块 

#### 验证静态同步函数的锁

静态的同步函数使用的锁是 该函数所属的字节码文件对象

可以使用getClass 方法获取 也可以使用当前类名.class 来表示

```java

public class maipiaop {

	public static void main(String[] args) {
		m m = new m();
		Thread t1 = new Thread(m);
		Thread t2 = new Thread(m);
		t1.start();
		try {Thread.sleep(20);}catch(Exception e) {}
		m.flag = false;
		t2.start();
	}

}



class m implements Runnable {
	private static int num = 100;
	boolean flag = true;
	Object obj = new Object();
	public void run () {
		System.out.println("我是同步代码块使用的锁---"+m.class);    //class m   
		if(flag) {
			while(true) {
				show();	
			}
		}else {
			while(true) {
				synchronized (m.class) {
					if(num > 0) {
						try {Thread.sleep(10);}catch(Exception e) {}
						System.out.println("当前窗口"+Thread.currentThread().getName()+"卖出票线程1---"+num--);	
					}else {
						System.exit(0);
					}	
				}
				
			}
		}
		
		
	}
	
	public static synchronized void show() {  //同步函数的锁是this
		System.out.println("我是静态的锁------"+m.class);    //class m
		if(num > 0) {
			try {Thread.sleep(10);}catch(Exception e) {}
			System.out.println("当前窗口"+Thread.currentThread().getName()+"卖出票线程2---"+num--);	
		}else {
			System.exit(0);
		}
	}
}
```

###单例模式的多线程

```java

public class danli {

	public static void main(String[] args) {
		System.out.println(Single.get().num);

	}

}

class Single {
	public static int num = 1;
	private static final Single s = new Single();
	private Single() {}
	public static Single get() {
		return s;                 //因为这里的s已经固定死了 不管如何多线程,都会返回一个对象不会出现问题 
	}
}

class Singles {
	public static int num = 1;
	private static Singles s = null;
	private Singles () {}
	public static Singles get() {
		if(s == null) {
			synchronized (Singles.class) {   //这时会将线程卡主 线程2进来的时候 直接返回
				if(s == null) {                      //这里加入多线程 会导致线程重叠的情况
					s= new Singles();
				}		
			}
		}
		return s;
	}
}
```

### 死锁

```java

public class sisuo {
	public static void main(String[] args) {
		Test t1 = new Test(true);
		Test t2 = new Test(false);
		new Thread(t1,"one").start();
		new Thread(t2,"two").start();

	}
}

class Test implements Runnable{
	public static Object one = new Object();
	public static Object two = new Object();
	public boolean flag;
	Test (boolean flag){
		
		this.flag = flag;
		
	}
	public void run () {
		if(flag) {
			while(true) {
				synchronized (one) {
					System.out.println(Thread.currentThread().getName()+"---if---外面"+one);
					synchronized (two) {
						System.out.println(Thread.currentThread().getName()+"---if---里面"+two);
					}
				}
			}
		}else {
			while(true) {
					synchronized (two) {
						System.out.println(Thread.currentThread().getName()+"---else---外面"+one);
						synchronized (one) {
							System.out.println(Thread.currentThread().getName()+"---else---里面"+two);
						}
					}
				}
			}	
		}
	}

class MyLockk
{
	public static final Object locka = new Object();
	public static final Object lockb = new Object();
}
```

###线程间通讯

多线程处理同一资源,但是任务不同

等待/唤醒机制 - 方法

1. wait()            让线程处于冻结状态  释放cpu执行权 被wait的线程会被储存到线程容器里面
2. notify()          唤醒线程容器里面的线程
3. notifyAll()      唤醒线程容器里面的所有线程

这些方法都必须定义在同步里面,因为这些都是要用于操作线程状态的方法

必须明确到底操作的是那个锁

为什么操作线程的方法定义在object里面?

答:因为这些方法是监视器的方法 ,监视器就是一个锁,锁可以是任意的对象

