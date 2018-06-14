# java

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

#### java数组

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

  

