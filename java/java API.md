# java的API

## String类

### 特点 以及 构造函数

```java
package cn.string.package1;

public class string1 {

	public static void main(String[] args) {
		/*
		 * String 的特点
		 * 字符串对象一旦被初始化就不会被改变
		 * */
		String s = "abc";
		String ss = "abc";
		//System.out.println(s == ss);    //true  因为 ==比较的是内存地址 而 因为String对象是不可变的，它们可以被共享 所以这里指向一个地址
		
		String a = "abc";     				//创建一个字符串对象在常量池里面
		String aa = new String("abc");    	//创建两个对象一个new 一个字符串对象在堆内存里面
		//System.out.println(a == aa);   		// 因为 这两个内存地址不一样
		//System.out.println(a.equals(aa));   //true  String类中的equals复写了Object中的equals建立了String自己的,来判断字符串是否相等,而不是内存地址
		stringConstructorDemo();
	} 
	
	public static void stringConstructorDemo() {
		String s = new String();   //等效与String 是= "" 不等效与 String s = null;
		
		byte[] arr = {66,67,68,97};
		char[] arrs = {'a','b','c','d'};
		String ss = new String(arr);       	//	将字节数组转成字符串
		System.out.println(ss);            	// 	BCDa
		String sss = new String(arrs);     	//	也可以吧char数组转成字符串
		String ssss = new String(arrs,1,3); //	bcd	也可以指定转字符串的起点和终点
		System.out.println(ssss);           // 	abcd
	}

}

```

### String的获取 转换的方法

```java
package cn.string.package1;

public class string2 {

	public static void main(String[] args) {
		/*
		 * 按面向对象的思想进行功能分类
		 * 
		 * 1. 获取
		 * 		获取字符串里面的个数(长度) int  arr.length
		 * 		根据位置获取字符     			substring() 	根据下标截取字符串
		 * 		根据字符获取位置      			indexOf()     	根据字符获取下标 
		 * 		获取字符串里面的部分字符串 	charAt() 		根据下标来获取字符串
		 * 		
		 * 2.转换
		 * 		将字符串变成字符串数组(字符串切割)   	split()	字符切割 
		 * 		将字符穿变成字符数组                               toCharArray()   无差别分割数组
		 * 		将字符串变成字节数组					getBytes()       变成字节
		 * 		将小写字母转大写字母					toUpperCase()
		 * 		将大写字母转小写字母					toLowerCase()
		 * 		将字符串里面的指定内容进行替换		replace()     第一个参数为被替换的 第二个参数是替换后的 传入不存在的参数的时候 代码不会对数据造成影响	
		 * 		去除两边空格 							trim()   
		 * 		将字符串进行连接						concat()
		 * 		将任意转成字符串						value()
		 * */
		String str = "这是字符串这";
		System.out.println(str.length());     		// 	返回字符串长度
		System.out.println(str.indexOf("这"));   	//	根据字符获取下标  不存在返回-1 这样就可以判断字符串是否存在
		System.out.println(str.indexOf("这",2)); 	//	根据字符获取下标 第二参数指定初始下标
		System.out.println(str.lastIndexOf("这")); 	// 	从最后开始根据字符获取下标
		System.out.println(str.charAt(1));          //	返回值为char 根据下标获取字符
		String ss = str.substring(1,3);             //  substring 根据下标截取字符串  这里打印 12 到3结束
		System.out.println(ss);
		System.out.println(str.substring(2));       //不指定结尾 就会截取到结尾
		String s = "张三.李四.王五";
		String[] arr = s.split("\\.");              //根据参数 切割字符传为数组   是. 的话要转义
		for (int i = 0; i < arr.length; i++) {
			System.out.println(arr[i]);		
		}
		char[] chs = str.toCharArray();             //这方法会字符切割成为字符串
		for (int i = 0; i < chs.length; i++) {
			System.out.println(chs[i]); 
		}
		str = "ab你";
		byte[] bytes = str.getBytes();
		for (int i = 0; i < bytes.length; i++) {
			System.out.println(bytes[i]);        //中文三个字节
		}
		str = "abcd";
		System.out.println(str.toUpperCase());  //小写转大写
		str = "ABCD";
		System.out.println(str.toLowerCase());  //大写转小写
		String sss = str.replace("A", "aaaaaa");   //将A替换成aaaaaa
		System.out.println(sss);
		System.out.println("-"+"    ab   c     ".trim()+"-");   //去除两边空格
		String hello = "hello ";
		String word = "word";
		System.out.println(hello.concat(word));  //字符串链接
		System.out.println(String.valueOf(1)+4); //任意值转换成为字符串
	}
}
```

