java

这一年一直都学习前端,相对来说,底层的实现,或许好不太懂,但是基本可以完成前端遇到的问题,但是合肥这边后端基本都是java,没办法,只能学习java了

### java第一天

看的是毕向东的javase教程

怎么说呢,之前学过一点java,当时不感兴趣,就放弃了,加上写了很久的 web网盘项目,外加很久的前端,现在回头看java没啥压力,基本都懂,老师讲课不错,懂了一些原理,比如java classpath path java_home 环境变量的作用啊,以及命令行运行java程序

### java第二天

主要是学习,进制之间的转行

比如

**这是2进制转10进制**

  1  0  1  1

1\*2(3) + 0\*2(2) + 1\*2(1) + 1*2(0) = 11  

**10进制转2进制**

```  
10
  2|10
    2|5  0
      2|2 1
        2|1 0
          2|0 1
== 1010 
10的二进制为1010
```

#### java数据类型

基础数据类型  8个

数值-整数型 (byte short int long)

数值-浮点型 (float,double)

字符型 char

布尔型 boolean



引用数据类型 - 类 class

引用数据类型 - 接口 interface

引用数据类型 - 数组 []

####变量的类型转换

**自动类型**转换也叫隐式转换,指的是两个内息在转换过程中不需要显式的会进行声明,java要实现隐式转换,必须满足两个条件:

1. 两种数据类型彼此兼容'
2. 目标类型的取值范围大于源类型的取值范围

```
byte b = 3;
int a = b;    //程序把byte类型的变量b转换成int类型的a,这无需特殊声明
```

**强制类型转换**也叫显式类型转换,知道是两种数据类型之间的转换需要进行显式的声明

```
int a =4;
byte b = a;       //这里会报错 ,因为int类型强制转byte会损失进度
```

也有办法然后程序不报错

```
int a = 4;
byte b = (byte)a  //这就是显式转换
```

注意:

在运算的时候 byte类型会强制转化成为int,所以byte相加会报错

```
byte a = 1;
byte b = 2;
byte c = a + b;     //这里的a,b在相加的时候 提升成为int类型,所以byte 类型的c 储存int会报错
```

代码应该这么写

```
byte a = 1;
byte b = 2;
byte c = (byte)(a + b);
```

字符与数字相加

```
System.out.println('a' + 1);  //结果是98!! 因为 'a'对应ascii表是01100001 = 97 +1  = 98
```

####逻辑运算符

```
&  运算符 (解析代码的时候不管左边的代码结果如何 依旧检查右边的代码)
&& 运算符 (假如左边的是false,右边的不参与运算 直接出结果 )
|  运算符 (解析代码的时候不管左边的代码结果如何 依旧检查右边的代码)
|| 运算符 (假如左边的是true,右边的不参与运算 直接出结果 )
```

#### 移位运算符 - 左移

**System.out.println(3<<2); **

代表3的二进制左移2位

```
0011   -----    1100  3变成 12   3*2(2)
```

**System.out.println(3<<3);** 

代表3的二进制左移3位

```
0011   -----    1100  3变成 24  3*2(3)
```

位移几位就是该数据乘以2的几次方

#### 移位运算符 - 右移

**System.out.println(6<<1); **

```
0110  ----     0011   6变成3  3/2(1)  3
0110  ----     0001   6变成1  3/2(2)  1.5 小数点省略 变成1
```

位移几位就是该数据除以以2的几次方

对于高位出现的空位 原来是什么就用什么补什么

```
>>> 被移位的二进制 不管是 1还是0 都用0去补
```

#### if语句和switch的比较

if :

​	1.对区间的值进行判断

​	2.对区间判断

​	3.对运算结果是boolean 类型的表达式进行判断

switch: 

​	1.对具体的值进行判断

​	2.值的数量通常是固定的

对几个固定的值进行判断,建议使用switch ,因为switch语句会把具体代码都加载进入内存

效率高一点

#####while do-while

while 与 do-while 基本一样的 但是有一点,do-while至少执行一次,其他的基本一样的

#####while 与 for

基本上这两者可以互换

格式上面不一样,for不会有全局变量,但是假如,变量后面还要用,就使用while

无限循环

while(true)

for( ; ; )



\n 回车

\t 制表符

\b 退格

\r 按下回车键

windows里面回车符是由\r\n组成的,

linux里面是由\n 

在使用的时候要注意



continue 继续

作用: 结束本次循环,继续下次循环

continue 后面不能有代码	 

 

### 函数

定义函数的类型

修饰符  返回值类型  函数名 (参数类型 参数名,参数类型 参数名,.............){

 	执行语句;

​	return 返回值;

}

##### 函数的重载

1. 同一个类名
2. 参数个数不同 或者 参数类型不同
3. 函数的重载与返回值无关

感觉很..奇怪的方法



#####java的栈内存

储存的都是局部变量

并且变量所属的作用域一但结束,该变量就会释放

#####java的堆内存

储存的是数组和对象 (数组也是对象) 

特点:

1. 每个实体都有首地址值
2. 堆内存里的每个变量都会默认初始化,根据类型的不同而不同,整数为0 ,小数为0.0 等等
3. 自动的垃圾回收机制

#####java数组

格式1: 

​	int[] arr = new int[3]; 在堆内存里面储存一个长度为3的数组

格式2:

元素类型[] 数组名 = new 元素类型[]{元素,元素,元素}

​	int[] arr = new int[]{1,2,3,4,5};

​	int[] arr = {1,2,3,4,5};

**数组获取最大值:**

```java
 public static int getMax(int[] arr){
      int max = arr[0];
      for (int i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max =arr[i]; 
        }
      }
      return max;
    }
```

**通过索引:**

```java
public static int getMax(int[] arr){
      int max = 0;
      for (int i = 1; i < arr.length; i++) {
        if (arr[i] > arr[max]) {
            max = i; 
        }
      }
      return arr[max];
    }
```

**选择排序:**

```java
class demo
{
    public static void main(String[] args){
      int[] arr = {1,2,3,4,5,312,32131,-2};
      selectsort(arr);
      for (int i = 0; i < arr.length; i++) {
        System.out.println(arr[i]);
      }
    }
    public static void selectsort(int[] arr){
      for (int i = 0; i <arr.length-1 ; i++) {
        for (int f = i+1; f < arr.length; f++) {
          if(arr[f]>arr[i]){
            int temp = arr[f];
            arr[f] = arr[i];
            arr[i] = temp;
          }
        }
      }
    }
}
```

**冒泡排序**

```java
public static void msort(int[] arr){
      for (int i = arr.length-1; i >=0; i--) {
        for (int f = 0; f < i; f++) {
          if (arr[f]<arr[f+1]) {
            int temp = arr[f+1];
            arr[f+1] = arr[f];
            arr[f] = temp;
          }
        }
      }
    }
```

**通过内存排序**

```java
 public static void sort_2(int[] arr) {
      for (int i = 0; i < arr.length-1; i++) {
        int mun = arr[i];
        int index = i;
        for (int f = i+1; f < arr.length; f++) {
          if(mun < arr[f]){
            mun = arr[f];
            index = f;
          }
        }
        int temp = arr[index];
        arr[index] = arr[i];
        arr[i] = temp;
      }
    }
```



**有问题的 10进制 转 16进制**

```java
 public static void toHex(int num){
	      String score = " ";
	      for (int i = 0; i < 8; i++) {
	    	  int temp = num & 15;     // 意思就是 将前4个二进制数匹配出来    1111 $ 0011 = 0011
	        if(temp > 9){
	        	score += (char)(temp-10+'A'); //假如是16进制 大于10的数要转字母 
	        } else if(temp == 0){
	          //略过
	        } else {
	        	score+=temp;
	        }
	        num = num >>> 4;   //向右移动4位 也就是走转换过的16进制
	      }
	      System.out.println("score:"+score);
	    }
```

**10进制转16 但是没有去除空格**

```java
 public static void toHex(int num){
		 char[] chs = {'0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'};
		 char[] pos = new char[8];
		 for (int i = 7; i >= 0; i--) {
			int temp = num & 15;
			if(temp == 0) {
				//跳过
			} else if(temp != 0) {
				pos[i] = chs[temp];
			}
			num = num >>> 4;
		}
		 for (int i = 0; i < pos.length; i++) {
				System.out.print(pos[i]);
		}
	}
```

10进制 转 4 8 16

```java
public class first {

	public static void main(String[] args) {
		sixteen(16);
	}
	
	public static void sixteen(int num) {     // 10转16
		trans(num, 15, 4);
	}
	public static void two(int num) {         // 10转2
		trans(num,1,1);
	}
	public static void eight(int num) {       // 10转8
		trans(num,7,3);
	}
	
	 public static void trans(int num,int base,int offset){
		 char[] chs = {'0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'};
		 char[] pos = new char[8];
		 for (int i = 7; i >= 0; i--) {
			int temp = num & base;
				pos[i] = chs[temp];
			num = num >>> offset;
		}
		 for (int i = 0; i < pos.length; i++) {
			 if(pos[i] != '0') {
				 break;
			 }else {
				 pos[i] = '#';
				 
			 }
		 }
		 for (int i = 0; i < pos.length; i++) {
			if(pos[i] != '#') {
				System.out.print(pos[i]);
			}
		}
	 }
```

 ### 面向对象

对象:该类事物实实在在存在的个体

类和对象的关系:

类:事物的描述

对象:该类事物的实例,在java里面通过new来创建

```java
public class catDemo {

	public static void main(String[] args) {
		car c = new car();  //在计算机里面创建一个car的实例.通过new关键字
		c.num=4;
		c.color="red";
		c.run();  //要使用对象的内容可以通过,对象.成员的方法去完成调用
	}

}

class car{
	int num;
	String color;
	void run() {
		
		System.out.println(num+"-----"+color);
	}
}

```

定义类就是定义类里面的成员  **成员变量 与 成员函数**

```
new 的时候会在堆内存开辟一点空间,并且分配内存,给new的变量
c.num 就会找到堆内存里面的变量并且给他赋值
```

成员变量与局部变量的区别

成员变量:

​	定义在类中,整个类都可以访问

​	存在于堆内存的对象里面

​	随着对象的创建而存在,随着对象的消失而消失

​	成员变量都有初始化值

局部变量:

​	定义在函数,语句,局部代码块里面,只在所属区域有效

​	存在与栈内存的方法里面

​	随着所属区域的执行而存在,随着所属区域的结束而释放(出栈)

​	局部变量没有初始化值

#####匿名对象

没有名字的对象 new car(); 

1. 对方法只有一次调用的时候可以简化成匿名函数
2. 匿名函数可以作为实际参数进行传递





##### 基本数据类型参数传递

```java
public class day6 {
	
	public static void main(String[] args) {
		int x = 3;
		show(x);
		System.out.println(x);
	}	
	
	public static void show(int x) {
		x = 4;
	}
}

```

基本类型弹出栈后 不会影响主函数的数值

##### 引用类型参数传递

```java
int x = 3;
	public static void main(String[] args) {
		day6 d = new day6();
		d.x = 9;
		show(d);
		System.out.println(d.x);
	}
	
	public static void show(day6 d) {
		d.x = 4;
	}
```

引用类型会因为引用地址的数值变化而变化

##### 封装

指隐藏对象的属性和实现细节,仅对外提供公共访问方式

好处:

- 将变化隔离
- 提高安全性
- 提高复用性

封装的原则:

- 将不需要对外提供的内容都隐藏起来
- 把属性隐藏的同时,提供公共方法进行访问

private :私有 权限修饰符 用于修饰成员,私有的内容仅仅在本类里面有效

 ##### 二维数组

```java
public class twoArray {
	public static void main(String[] args) {
		int[][] arr = new int[2][3];
		//创建一个二维数组,有2个一维数组,每个一维数组里面有一个3个元素的数组
		System.out.println(arr);   			//二维数组 这里是地址
		System.out.println(arr[0]); 		//二维数组里面的第一个 数组是对象 是引用类型 所以依旧打印内存地址
		System.out.println(arr[0][0]);    	//二维数组里面的第一位里面的第一个
	}
}
```

也可以暂定二维数组的子数组不确定值,后面定义

```java
public class twoArray {
	public static void main(String[] args) {
		
		int[][] arr2 = new int[2][];
		arr2[1] = new int[3];
		arr2[1][2] = 20;
		System.out.println(arr2[1][2]);
	}
}
```

二维数组的第二种表现形式

```java
int[][] arr3 = {{1,2,3},{4,5,6},{7,8,9}};
```

遍历二维数组

```java
int[][] arr3 = {{1,2,3},{4,5,6},{7,8,9}};
for (int i = 0; i < arr3.length; i++) {
			for (int j = 0; j < arr3[i].length; j++) {
				System.out.print(arr3[i][j]);
			}
		}
```

#####构造函数

构建创造对象时调用的函数,作用 : 可以给对象进行初始化

特征:

- 方法名与类名相同
- 在方法名前面没有返回值类型
- 方法里面没有return

一个类如果没有定义构造函数,那么这么类里面会有默认的空参数的构造函数

如果指定了构造函数,就会覆盖默认的构造函数

**一般函数和构造函数什么区别?**

构造函数

- 对象创建时,就会调用与之对应的构造函数,对对象进行初始化
- 对象创建的时候,会调用 只调用一次

一般函数

- 对象创建后,需要函数功能才调用
- 对象创建后,可以被多次调用

#####构造函数- 重载

```java
public class staticClass {
	public static void main(String args[]) {
		Preson p = new Preson(10);
		p.look();
		Preson p1 = new Preson(10,"李四");
		p1.look();
		Preson p2 = new Preson("王二麻子",11);
		p2.look();
	}
}

class Preson{
	private int age;
	private String name;
	
	Preson(){
		name = "body";
		age = 1;
		System.out.println("name="+name+"  "+age);
	}
	
	Preson(int a){     //重载的形式去体现
		age = a;
	}
	Preson(int a,String n){
		age = a;
		name = n;
	}
	Preson(String n,int a){
		age = a;
		name = n;
	}
	void look() {
		System.out.println("name="+name+"  "+age);
	}
}
```

#### this

当成员变量和局部变量重命,可以用关键字this来区分

this就是所在函数所属对象的引用

简单说: 那个对象调用this所在的函数,this就代表那个对象

例如上面的代码

```java
Preson(int age,String name){
		this.age = age;
		this.name = name;
	}
```

this 也可以用于构造函数里面调用其他函数

注意: 只能定义在构造函数的第一行,因为初始化动作要先执行

```java
Preson(int age){
		this.age = age;
	}
	Preson(int age,String name){
		this(age);      //这里相当与再次调用构造函数,this及是本身 Preson 这里是 Preson(age)  就是上面的构造函数
		this.name = name;
	}
```

对this的应用

```java
public class comp {

	public static void main(String[] args) {
		compare p1 = new compare("张三", 20);
		compare p2 = new compare("李四", 20);
		p1.compAre(p2);
	}

}
class compare {
	private String name;
	private int age;
	
	compare(String name,int age) {
		this.name = name;
		this.age = age;
	}
	
	void compAre(compare p) {
		if(this.age == p.age) {   //this指本身
			System.out.println(this.name+"与"+p.name+"年龄相同");
		} else {
			System.out.println(this.name+"与"+p.name+"年龄不相同");
		}
	}
}

```

#### static

1. static是一个修饰符,用于修饰成员;
2. static修饰的成员,被所有对象所共享
3. static优先与对象存在,因为static的成员是随着类的加载就已经存在了
4. static修饰的成员多以一种调用方式, 可以不需要new 直接用类名调用
5. static修饰的数据是共享数据,对象中的储存的是特有数据

```java
public class staticDemo {
	
	public static void main(String[] args) {
		demo d = new demo();  
		d.show("张三");  
		System.out.println(demo.country);   //可以直接访问类里面的数据
	}
}

class demo {
	String name;   //成员变量 实例变量
	static String country = "CN";    //静态变量  类变量
	public void show(String name){
		this.name = name;
		System.out.println(country+":"+name);
	}
}

```

**成员变量与静态变量的区别**

1. 生命周期不同
   - 成员变量随着对象的创建而存在,随着对象的被回收而释放
   - 静态变量随着类的加载而存在,随着类的消失而消失
2. 调用方式不一样
   - 成员变量只能被对象调用
   - 静态变量可以被对象调用,还可以被**类名调用**
3. 别名不同
   - 成员变量也被称为实例变量
   - 静态变量被称为类变量
4.   数据储存位置不同
   - 成员变量数据储存在堆内存的对象中,所以也叫对象的特有数据
   - 静态变量数据储存在方法区(共享数据区)的静态区,所以也叫对象的共享数据

静态的使用的注意事项:

1. 静态方法只能访问静态成员. (非静态可以访问静态,也可以访问非静态)
2. 静态方法中不可以使用this或者super关键字
3. 主函数是静态的

```java
public class staticDemo2 {

	public static void main(String[] args) {
		//show();   //这相当与 在静态方法里面调用非静态 会报错
		new staticDemo2().show();    //但是可以通过new 自身去调用非静态方法
	}
	
	int num = 4;
	public void show() {
		System.out.println(num);
	}
}
```

**静态什么时候用?**

1. 静态变量

   - 当分析对象中所具有的成员变量都是相同的时候,这时候可以被静态修饰
   - 只要数据在对象中是不同的,就是对象的特有属性,必须储存在对象中,是非静态
   - 如果是相同的数据,对象不需要修改,只需要使用,不需要储存对象,定义成静态的

2. 静态函数

   - 函数时候用静态修饰,参考一点,就是函数功能是否有访问到对象中的特有数据

     假如是静态的成员变量,就用静态函数,,也可以定义非静态 

     非静态可以访问静态 静态函数不可以访问非静态成员变量

     假如是非静态变量,就定义非静态函数

##### 静态代码块

随着类的加载而执行,而且只执行一次,因为new的时候 内存已经加载  再new 内存已经存在静态代码块,所以不管new几次都只执行一次

作用

​	给类,静态变量进行初始化 构造函数是给成员变量进行初始化 

```java
public class staticDemo2 {

	public static void main(String[] args) {
		score s = new score();
		score s1 = new score();
		score s2 = new score();
	}
}

class score{
	static String num;
	static {
		num = "一";
		System.out.println("我只执行"+num+"次");
	}
}
```

#### main函数解析

主函数特殊之处:

1. 格式固定
2. 被jvm虚拟机所识别 调用

public:             因为权限必须最大

static:		不需要对象所属类名调用即可

void:		主函数没有具体返回值

main: 		函数名 ,是jvm识别的固定函数名

String[]  args:主函数的参数列表,是一个数组类型的参数,而且元素都是字符串类型

可以在命令框里面 给args传值

```
java demo a a a a a  //给args数组传值 
```

#### 继承

提高代码复用性

让类与类之间产生关系,给第三特征多态提供前提

```java
public class jichen {
	public static void main(String[] args) {
		Student s = new Student();
		s.study(18, "小明");
		Worker w = new Worker();
		w.work(29, "张三");
	}
}


class Presons {
	int age;
	String name;
}

class Student extends Presons {
	void study (int age,String name) {
		System.out.println("name:"+name+"学生--age:"+age);
	}
}

class Worker extends Presons {
	void work (int age,String name) {
		this.age = age;
		this.name = name;
		System.out.println("name:"+name+"工人--age:"+age);
	}
}
```

java中支持单继承,不直接支持多继承,但是对c++中的多继承机制进行改良

单继承: 一个子类只有一个父类

多继承: 一个子类可以有多个直接父类(java不允许,因为会产生调用的不确定性)

java支持多层继承 (c 继承 b  b 继承 a )

当要使用一个继承体系的时候

1. 查看该体系的顶层类,了解该体系的基本功能
2. 创建体系中的最子类对象,完成功能的使用

##### super关键字

```java
class Fu{
	private int a = 1;
	void geta() {
		System.out.println(a);
	}
}

class Zi extends Fu{
	int a = 2;
	Zi (){
		//System.out.println(super.a);   //私有化的将无法super去继承
		super.geta();
	}
}

class Zii extends Zi {
	int a = 3;
	Zii () {
		System.out.println("父类的a="+super.a);
		
	}
}
```

this与super的用法很相似

this: 代表一个本类对象的引用

super: 代表一个父类空间 因为没有new 父类

##### 继承 - 覆盖

当子父类中出现成员函数一模一样的情况,会运行子类的函数

这种现象,称为覆盖操作,这是函数在子父类里面的特征

```java
public class superdemo {
	public static void main(String[] args) {
		Zi z = new Zi();
		z.geta();
	}
}


class Fu{
	void geta() {
		System.out.println("我是父类");
	}
}

class Zi extends Fu{
	void geta() {
		System.out.println("我是子类");
	}
}
```

函数的两大特性:

1. 重载 在同一个类中的
2. 覆盖,子类覆盖父类,覆盖也称为重写,覆写

注意事项

1. 子类方法覆盖父类方法时,子类权限必须大于等于父类权限
2. 静态只能覆盖静态,或者被静态覆盖

什么时候使用覆盖操作?

当对一个类进行子类的拓展的时候,子类需要保留父类的功能声明

但是要定义子类中该功能的特有内容时,就要使用覆盖操作去完成

#####子父类的构造函数的问题

特点: 在子类构造对象的时候,发现,访问子类构造对象时,父类也运行了

原因: 在子类中所有的构造对象中的第一行都有隐式语句 spuer(),因为父类初始化动作必须第一行

子类的实例化过程: 子类中所有的构造函数默认都会访问父类中的空参数的构造函数

因为子类继承父类,获取到了父类内容,所以在使用父类之前,要先看父类是如何对自己的内容进行初始化的



子类构造函数中如果this调用了本类构造函数时,那么super就没用了,因为super和this都只能定义在第一行,所以只能有一个

```java
public class shilihua {

	public static void main(String[] args) {
		Zilei z = new Zilei();
		z.show();
	}

}

class Fuqin {
	Fuqin () {
		show();
	}
	void show() {
		System.out.println("this is fu");
	}
}

class Zilei extends Fuqin {
	int num;
	Zilei () {
		super();
		//这里的this 指向子类 子类的对象变量没有初始化,等super()父类初始化完毕后,才会进行子类的成员变量初始化
		num = 8;
	}
	void show () {
		System.out.println("this is"+ num);
	}
}


```

一个对象的实例化过程

1. jvm会读取指定的路径下的person.class文件,并加载进内存,并会先加载Person的父类
2. 在堆内存中开辟空间,分配地址
3. 并在对象空间中,对对象中的属性进行初始化
4. 调用对应的构造函数进行函数的初始化
5. 在构造函数中,第一行会先调用父类中的构造函数进行初始化
6. 父类初始化后,会对子类的属性进行显式初始化
7. 在进行子类构造函数的特定初始化
8. 初始化完毕后,将地址复制给引用变量



#### 设计模式

单例设计模式

​	解决的问题: 可以保证一个类在内存里面的唯一性

比如对于多个程序使用统一配置信息对象的时候,需要保证对象的唯一性

如何保证对象的唯一性?

1. 不允许其他对象new 创建该对象
2. 在该类里面创建自己的实例
3. 对外提供方法让其他程序可以获取该对象

 步骤:

1. 私有化对对象的构造函数
2. 通过new  创建本类对象
3. 定义一个共有方法,将创建的对象返回

````java
public class shejimoshi {

	public static void main(String[] args) {
//		test test1 = new test();    //会报错
//		test test2 = new test();
		test test1 = test.getInstance();
		test test2 = test.getInstance();
		test1.setnum(10);
		test2.setnum(20);
		System.out.println(test1.getnum());	
		System.out.println(test2.getnum());
	}

}

class test {
	private int num;
	
	//这几行代码完成了要求
	private test () {}  //被new 内存就没办法保持引用类型的一致
	private static test s = new test();     //为了保持内存的一致性 在内部new 自己 并且为了外部可以引用 改为静态
	
	public static test getInstance() {  //因为不可以new 了 所以是能通过static的形式去让外部调用
		return s;
	}
	
	public  void setnum (int num) {
		this.num = num;
	}
	public int getnum() {
		return num;
	}
}

````

饿汉式 ---- 类一加载,对象就存在了

```java
class Single{
	private Single () {}   //防止new 
 	private static Single s = new Single();     // 将对象静态化  
   	public static Single getInstance(){       // 返回静态化的方法地址 这样 不管谁引用,都是一个地址
    	return s;
    }
}
```

懒汉式  ---- 类加载进来,没有对象 只有调用了getInstance方法时候,才会创建对象

```java
class Single{
	private Single () {}   //防止new 
 	private static Single s = null;     // 将对象静态化  
   	public static Single getInstance(){       // 返回静态化的方法地址 这样 不管谁引用,都是一个地址
    	if(s == null){
            s = new Single();
            return s;
    	}
    }
}
```

