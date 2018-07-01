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

### String比较的方法

```java
package cn.string.package1;

public class string3 {

	public static void main(String[] args) {
		/*
		 *判断 
		 *		两个字符串内容时候相同   		equals()  
		 *		忽略大小写比较的 				equalsIgnoreCase()
		 * 		字符串里面时候包含指定字符串   contains() 感觉比indexOf要好用一点
		 * 		字符串是否以指定字符串开头      startsWith()
		 * 		是否是指定字符串结尾			endsWith()
		 * 比较	
		 * 		compareTo	如果参数字符串等于此字符串，则值为0 ; 一个值小于0如果这个字符串的字典比字符串参数小; 如果此字符串的字典大小超过字符串参数，则值大于0 。 
		 * 		compareToIgnoreCase   和compareTo一样 compareToIgnoreCase忽略大小写
		 *		
		 *		intern()	对字符串池进行操作  当调用intern方法时，如果池已经包含与equals(Object)方法确定的相当于此String对象的字符串，
		 *					则返回来自池的字符串。 否则，此String对象将添加到池中，并返回对此String对象的引用。 

		 *		
		 */
		
		
		String str1 = "abc";
		String str2 = "ABC";
		//System.out.println(str1.equals(str2.toLowerCase()));
		System.out.println(str1.equalsIgnoreCase(str2));
		
		str1 = "ArrayDemo.java";
		System.out.println(str1.contains("Demo"));   	 //查询str1里面时候有Demo 
		System.out.println(str1.startsWith("Array"));    //查询是否以Array开头的字符串
		System.out.println(str1.endsWith("java"));       //查询时候以java结尾的字符串
		
		System.out.println("哈哈".compareTo("嗯嗯"));        //前面小于后面返回负数
		System.out.println("str");
		String str3 = new String("ABC");
		String s = str3.intern();
		System.out.println(str3 == s);
		
	}

}
```

### 练习

​		/*
		 * 1. 给定一个字符串数组,按照字典顺序进行从大到小的排序
		 * {"nab","abc","cba","qq","haha"}
		 * 
		 * 2. 一个子串在整串里面出现的次数
		 * "nbdadanbdadsadanbdasdasd"
		 * 
		 * 3. 两个字符串里面最大相同的子串
		 * 
		 * 4. 模仿trim功能
		 * 
		 * */

```java
package cn.string.package1;

public class StringTest {
	public static void main(String[] args) {
		/*
		 * 1. 给定一个字符串数组,按照字典顺序进行从大到小的排序
		 * {"nab","abc","cba","qq","haha"}
		 * 
		 * 2. 一个子串在整串里面出现的次数
		 * "nbdadanbdadsadanbdasdasd"
		 * 
		 * 3. 两个字符串里面最大相同的子串
		 * 
		 * 4. 模仿trim功能
		 * 
		 * */
		comp c = new comp();
		System.out.println();
		sp i = new sp();
		new getMaxSubString();
		new trim();
	}
}

class comp {
	String[] arr = {"nab","abc","cba","qq","haha"};
	comp () {
		System.out.print("排序前:");
		for (int i = 0; i < arr.length; i++) {
			if(i < arr.length-1) {
				System.out.print(arr[i]+",");
			}else {
				System.out.print(arr[i]);
			}
		}
		
		//按照字典顺序进行从大到小的排序
		for (int i = 0; i < arr.length-1; i++) {
			for (int j = i+1; j < arr.length; j++) {
				if(arr[i].compareTo(arr[j]) > 0) {        //字符串比较用compareTo
					String temp = arr[i];
					arr[i] = arr[j];
					arr[j] = temp;
				}
			}
		}
		
		
		System.out.println();
		System.out.print("排序后:");
		for (int i = 0; i < arr.length; i++) {
			if(i < arr.length-1) {
				System.out.print(arr[i]+",");
			}else {
				System.out.print(arr[i]);
			}
		}
		
	}
}

class sp{
	String text = "nbdadanbdadsadanbdasdasdnb";
	sp() {
		//方法 - 1
		//String[] a = text.split("nb");
		//System.out.println("nb数量为=" + (a.length-1));
		
		//方法 - 2
//		int flag = 0;
//		int index = 0;
//		while(text.indexOf("nb",flag) != -1) {    //flag进行迭代 -1 则找不到了就会退出
//			int num = text.indexOf("nb",flag);
//			index++;
//			flag = num+2;
//		}
//		System.out.println("index="+index);
		
		
		//方法3 面向对象
		String str = "nbdadanbdadsadanbdasdasdnb";
		String key = "nb";
		int count = getKeyStringcount(str,key);
		System.out.println("nb出现的次数为"+count+"次");
	
	}
	private int getKeyStringcount(String str, String key) {
		int count = 0;
		int index = 0;
		while(str.indexOf(key,index) != -1) {
			index = str.indexOf(key,index) + key.length();  //当前的index+长度 
			count++;     //进行计数
		}
		return count;
	}
}

class getMaxSubString {
	public getMaxSubString() {
		String a = "asdjioabcddfa";
		String b = "mklabcddasa";
		String sub = getMaxSubstr(a,b);
		System.out.println(sub);
	}

	/*
	 * 既然要去获取最大子串,就先看对短的字符串是否在长的字符串里面
	 * 如果存在,短的就是最大的子串
	 * 如果不是 ,name就将短的那个子串进行长度递减的方式截取子串,去长串中判断时候存在
	 * 如果找到了,就直接返回
	 * */
	private String getMaxSubstr(String s1, String s2) {
		String max = null;
		String min = null;
		max = s1.length()>s2.length()?s1:s2;
		//min = s1.length()>s2.length()?s1:s2;
		min = max.equals(s1)?s2:s1;
		//确保进来对比是小串
		for (int i = 0; i < min.length(); i++) {
			for (int a = 0,b = min.length()-i; b != min.length(); a++,b++) {   //
				String sub = min.substring(a, b);
				
				if(max.contains(sub)) {
					return sub;
				}
			}
		}
		return "不存在子串";
	}
}

class trim {
	String a = "         haha        ";
	
	trim() {
		int start = 0;
		int end = a.length()-1;
		while(start <= end && a.charAt(start) == ' ') {    //从前往后去除空格
			start++;
		}
		System.out.println(start);
		while(start <= end && a.charAt(end) == ' ') {      //从后往前去除空格
			end--;
		}
		System.out.println(a.substring(start, end+1));   
	}
}

```

### StringBuffer

```java
package cn.string.package1;

public class stringbuffer {

	public static void main(String[] args) {
		/*
		 * StringBuffert 字符串缓冲区
		 * 用于存储数据的容器
		 * 特点:
		 * 1. 长度是可变的
		 * 2. StringBuffer可以存储不同类型的数据
		 * 3. 最终要转成字符串进行使用
		 * 4. 可以对字符串进行修改
		 * 
		 * 既然是容器,应该有什么功能
		 * 1. 添加     
		 * 			append("插入到最后面")     
		 * 			insert(插入位置, "插入内容")
		 * 2. 删除	
		 * 			deleteCharAt(1)  删除一位置的字符
		 * 			delete(1,3)      删除12 位置的字符
		 * 			delete(0, sb.length());  清空 或者 new StringBuffer
		 * 
		 * 3. 查找
		 * 			charAt()   		根据下标返回char类型的元素
		 * 			indexOf()  		从头查找元素的位置 返回int 类型的下标
		 * 			lastIndexOf() 	从最后查找元素的位置 返回int 类型的下标
		 * 
		 * 4. 修改
		 * 			replace()				replace(1, 3, "替换"); 指定左右下标,替换字符
		 * 			setCharAt(1, '换');		里面参数为char类型 替换一个
		 * 5.其他
		 * 			setLength() 设置长度
		 * 			reverse() 翻转
		 * 			
		 * */
		
		one one = new one();
	}

}

class one {
	one () {
		//创建缓冲区
		StringBuffer sb = new StringBuffer();
	 	StringBuffer s1 = sb.append("haha").append("恩恩").insert(4, "插入");
	 	sb.deleteCharAt(1);
	 	System.out.println(sb);
	 	sb.delete(1, 3);      
	 	System.out.println(sb);
	 	sb.replace(1, 3, "替换");
	 	sb.setLength(10);
	 	sb.reverse();
	 	sb.setCharAt(1, '换');
	 	System.out.println(s1);
	 	sb.delete(0, sb.length());
	 	
	}
}

```

### Stringbuilder

```
jdk1.5后出现的Stringbuilder
不同的是Stringbuffer 是线程同步的 Stringbiuilder 线程不同步
多线程使用buffer
单线程使用Builder,它的出现是提高了效率
```

#### StringBuffer 小应用

```java
public class Stringbuilder {

	public static void main(String[] args) {
		/*
		 * 将一个int数组变成字符串
		 * */
		int[] arr = {1,2,3,34,45,5};
		String str =  arrayToArray(arr);
		System.out.println(str);
		
		
	}
	private static String arrayToArray(int[] arr) {
		StringBuffer sb = new StringBuffer();
		sb.append("[");
		for (int i = 0; i < arr.length; i++) {
			if(i != arr.length-1) {
				sb.append(arr[i]+", ");
			}else {
				sb.append(arr[i]);
			}
		}
		sb.append("]");
		//这样效率比较高
		return sb.toString();
	}
}

```

