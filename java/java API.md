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

## 基本数据类型对象包装类

```java
package cn.integer.package2;

public class integer {

	public static void main(String[] args) {
		/*
		 * 基本数据类型对象包装类
		 * 为了方便操作基本数据类型,将其封装成一个对象,在对象中定义了属性和行为丰富了该数据的操作
		 * 用于描述该对象的类就称为基本数据类型对象包装类
		 * 
		 *  byte		Byte
		 *  short   	Short
		 * 	int     	Integer
		 * 	long    	Long
		 * 	float   	Float
		 * 	double  	Double
		 * 	char   		Character
		 * 	boolean 	Boolean
		 * 
		 * 
		 * 给包装对象主要是用于基本类型和字符串之间的转换
		 * 	基本类型--->字符串
		 * 		1. 基本类型数值+""
		 * 		2. 用String类中的静态方法valueOf(基本类型数值)
		 * 
		 * 	字符串--->基本类型
		 * 		1. 使用包装类中的静态方法 xxx parseXxx("xxx类型的字符串")  parseInt()  parseLong() parseBoolean() 只有Character
		 * 		2. 如果字符串被Integer进行对象的封装,可以使用另外的非静态方法intValue()将一个Integer转成基本类型
		 * 		3. intValue()可以将Integer里面的字符串转成基本类型
		 * */
		
		System.out.println(Integer.MAX_VALUE);
		
		String num = "123";
		int num1 = Integer.parseInt(num);  //字符串转成数字
		System.out.println(num1+1);    
		Integer i = new Integer("123123");
		System.out.println(i.intValue()+1);   //可以将Integer里面的字符串转成基本类型
		//10进制--->其他进制
		System.out.println(Integer.toBinaryString(60));     //十进制转2进制
		System.out.println(Integer.toOctalString(60));		//10进制转8进制
		System.out.println(Integer.toHexString(60));		//10进制转16进制
		System.out.println(Integer.toString(60, 2));		//60转2进制	第二参数是进制
		
		//其他进制--->10进制
		System.out.println(Integer.parseInt("110",2));      //将110以2进制转换  打印出10进制的数
		Integer i1 = new Integer(10);
		Integer i2 = new Integer("10");
		System.out.println(i1.compareTo(i2));  //compareTo()用于比较
		//Integer的自动装箱
		Integer i3 = 20;  //相当于 new Integer(20)
		Integer s1 = new Integer(100);
		Integer s2 = new Integer(100);
		Integer s3 = 100;
		Integer s4 = 100;
		System.out.println(s1 == s2);			//false
		System.out.println(s1.equals(s2));		//true
		System.out.println(s3 == s4);			//true  为什么这里是true呢? 因为自动装箱机制 如果装的是一个字节 那么数据会被共享 不会开辟新空间
		System.out.println(s3.equals(s4));		//true
		
		
	}

}
```

#### 给字符串排序 并返回排序好的字符串

```java
package cn.integer.package2;
import java.util.Arrays;

public class integerTest {
	private static final String SPACE_SEPARATOR = " ";  //ctrl+shift+x 选中变大写  ctrl+shift+y 选中变小写
	public static void main(String[] args) {
		String num = "20 78 9 -7 88 36 29";
		String[] ss = num.split(SPACE_SEPARATOR);
		int[] sss = new int[ss.length];
		for (int i = 0; i < sss.length; i++) {
			sss[i] = Integer.parseInt(ss[i]) ;    //将字符串转成int
		}
//		for (int i = 0; i < sss.length-1; i++) {
//			for (int j = i+1; j < sss.length; j++) {
//				if(sss[i] > sss[j]) {
//					int temp = sss[i];
//					sss[i] = sss[j];
//					sss[j] = temp;
//				}
//			}
//		}
//		for (int i = 0; i < sss.length; i++) {
//			System.out.println(sss[i]);
//		}
		Arrays.sort(sss);   //int 排序函数
		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < sss.length; i++) {   //这里将int类型的数据填入StringBuilder里面 变成字符串
			sb.append(sss[i]+SPACE_SEPARATOR);
		}
		System.out.println(sb);
	}

}

```

## 集合框架

集合类的由来:

​		对象用于封装特有数据,对象多了需要存储,如果对象的个数不稳定,就使用集合容器进行储存

集合的特点(和数组的不同之处)

1. 用于存储对象的容器
2. 集合的长度是可变的
3. 集合中不可以存储基本数据类型值

## Collection

```java
import java.util.ArrayList;
import java.util.Collection;

public class collection {

	public static void main(String[] args) {
		/*
		 * 集合容器因为内部的数据机构的不同,有多种具体容器
		 * 框架顶层的Collection接口
		 * 
		 * Collection的常用方法
		 * 1. 添加
		 * 		boolean add(Object obj)					添加元素
		 * 		boolean addAll(Collection coll)			添加多个元素
		 * 
		 * 2. 删除
		 * 		boolean remove(Objetc obj)				移除指定集合里面的元素
		 * 		boolean removeAll(collection coll)		删除多个指定元素
		 * 		void clear() 							移除所有					
		 * 
		 * 3. 判断
		 * 		boolean contains(Object Obj)			判断是否存在该元素
		 * 		boolean containsAll(Collection coll)	判断时候存在该元素集合
		 * 		boolean isFmpty()  						判断集合中时候有元素 
		 * 
		 * 4. 获取
		 * 		int size()								获取单个元素
		 * 		Iterator Iterator()  					取出元素的方法: 迭代器
		 * 
		 * 5. 其他
		 * 		boolean retainAll(Collection coll)		取交集
		 * 		Object[] toArray()    					将集合转成数组
		 *
		 */
		Collection coll = new ArrayList();
		show(coll);
		Collection coll1 = new ArrayList();
		Collection coll2 = new ArrayList();
		show(coll1,coll2);
	}

	private static void show(Collection coll1, Collection coll2) {
		//给c1添加元素
		coll1.add("这是第1个");
		coll1.add("这是第2个");
		coll1.add("这是第3个");
		coll1.add("这是第4个");
		
		//给c2添加元素
		coll2.add("第1个");
		coll2.add("第2个");
		coll2.add("第3个");
		coll2.add("第4个");
		
		//把c2加入c1
		coll1.addAll(coll2);
		System.out.println(coll1);  
		
		//删除集合元素
		coll1.removeAll(coll2);   //将两个集合里面的相同元素从调用removeAll的集合中删除
		System.out.println(coll1);
		
		//判断集合里面是否有相同的集合
		
		System.out.println(coll1.containsAll(coll2));   //上面删除了所以现在不存在
		coll1.addAll(coll2);
		System.out.println(coll1.containsAll(coll2));	//true 
		
		//获取集合和集合之间的交集
		coll1.retainAll(coll2);                         //取交集 和remove相反 这里是把不相同的删除掉,保留与指定集合相同的元素
		System.out.println(coll1);
}

	public static void show(Collection coll) {
		//1.添加元素
		coll.add("abcd1");
		coll.add("abcd2");
		coll.add("abcd3");
		System.out.println(coll);
		//2. 删除元素
		coll.remove("abcd2");
		System.out.println(coll);
		//3. 清空集合
		//coll.clear();
		//System.out.println(coll);
		//4. 判断是否存在
		System.out.println(coll.contains("abcd1"));   	//true
		System.out.println(coll.isEmpty());				//加入不存在数值就返回true 存在就返回false
		
		
		
	}


}

```

### iterator(迭代器)

```java
package cn.collection.package3;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;

public class inerator {

	public static void main(String[] args) {
		Collection cc = new ArrayList();
		cc.add("abc1");
		cc.add("abc2");
		cc.add("abc3");
		cc.add("abc4");
		
		//使用 Collection 里面的 iterator()方法,调用迭代器方法,为了获取迭代器的对象
	 	Iterator iterator =  cc.iterator();
//	 	while(iterator.hasNext()) {
//	 		System.out.println(iterator.next());
//	 	}
	 	
	 	for(Iterator it = cc.iterator();it.hasNext();) {   //这样的方法更加不占用内存
	 		System.out.println(it.next());
	 	}
	}

}

```



## List 

### listIterator(列表迭代器)

```java
package cn.collection.package3;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;

public class listset {

	public static void main(String[] args) {
		/*
		 * List: 有序(存入和取出的顺序一致) 元素有角标,元素可以重复
		 * 		有一个共性特点,都可以操作角标
		 * 		添加:add(index,element)    //(角标,元素)
		 * 			:add(index,Collection) //(角标,元素集合) 
		 * 		删除:
		 * 			remove(角标)
		 * 		修改:
		 * 			set(index,element)
		 * 		获取:
		 * 			get(index)
		 * 			indexOf(Object)	
		 * 			lastindexOf(Object)
		 * 			subList(from,to)
		 * Set: 元素不可以重复,无序 			
		 * 
		 */
		show();
	}

	private static void show() {
		List list = new ArrayList();
		list.add("1");
		list.add("2");
		list.add("3");
		System.out.println(list);
		//插入元素
		list.add(0, 0);
		System.out.println(list);
		
		//删除元素
		System.out.println(list.remove(2));   //会返回删除的值
		System.out.println(list);
		
		//修改元素
		
		System.out.println(list.set(0, 123123));   //将0角标改成123123  会返回被修改的值
		System.out.println(list);
		
		//获取元素
		System.out.println(list.get(2));    //返回指定角标的元素
		System.out.println(list.subList(1, 2));   //返回角标为1的字符串
		

//		Iterator it =  list.iterator();
//		while(it.hasNext()) {
//			Object obj = it.next();    	//java.util.ConcurrentModificationException  因为迭代过程里面有进行list操作 就会报错
//										//可以使用Iterator接口的子接口ListIterator来完成迭代中对元素的更多操作
//			if(obj.equals("1")) {
//				list.add("添加的");
//			}else {
//				System.out.println(obj);
//			}
//			
//		}
		
		ListIterator it = list.listIterator();   //获取列表迭代器对象 
		//他可以实现在迭代过程里面完成对元素的增删改查
		while(it.hasNext()) {
			Object obj = it.next();
			if(obj.equals("1")) {
				it.set("添加");   
			}
		}
		
		System.out.println(list);
		
		for (int i = 0; i < list.size(); i++) {     //size获取长度   list 特有的去除元素方式之一
			System.out.println(list.get(i));
		}
		
		while(it.hasPrevious()) {
			System.out.println(it.previous());   //previous  返回列表的前一个元素
		}
	}

}

```

//List
			//|-- Vector		内部是数组数据结构,同步的   1.0版本就出现了  增删,查询 都慢
			//|-- ArrayList	内部是数组数据结构,不同步   替代Vector  查询的速度快
			//|-- LinkedList	内部是链表数据结构,不同步	 增删元素非常快



## Vector

```java
Vector v = new Vector();
v.addElement("添加元素")
Enumeration en = v.elements();
while(en.hasMoreElements()){    
    //该接口的功能由Iterator接口复制。 此外，Iterator还添加了一个可选的删除操作，并具有较短的方法名称。 新的实现应该考虑使用迭代器优先于枚举。 

    System.out.printIn(en.nextElement)
}

```

## LinkedList

addFirst()

addLast()

**jdk1.6 增加了**

offetFirst()

offetLast()

getFirst()	//获取但不移除,如果链表为空,会抛出异常

getLast()

**jdk1.6 增加了**

PeekFirst()	//获取但不移除,如果链表为空,不会抛出异常,会返回null

PeekLast()



removeFirst()	//获取并且不移除,如果链表为空,会抛出异常

removeLast()

**jdk1.6增加了**

pollFirst()		////获取并且不移除,如果链表为空,不会抛出异常,会返回null

pollLast()

```java
package cn.collection.package3;
import java.util.LinkedList;
import java.util.ArrayList;
import java.util.Iterator;

public class LinkedListDemo {

	public static void main(String[] args) {
		show();
		//请使用linkedlist来模拟堆栈或者队列数据结构
		//堆栈: 先进后出
		//队列: 先进先出
	
		demo();
		
	}
	private static void demo() {
		LinkedListTestDuiLie d = new LinkedListTestDuiLie();    //使用linkedlist来模拟队列数据结构
		System.out.println("使用linkedlist来模拟队列数据结构");
		d.myAdd("hahaha1");
		d.myAdd("hahaha2");
		d.myAdd("hahaha3");
		d.myAdd("hahaha4");
		d.myAdd("hahaha5");
		while(!d.isNull()) {
			System.out.println(d.myGet());
		}
		System.out.println("使用linkedlist来模拟堆栈数据结构");
		LinkedListTestDuiZhan dz = new LinkedListTestDuiZhan(); 
		dz.myAdd("hahaha1");
		dz.myAdd("hahaha2");
		dz.myAdd("hahaha3");
		dz.myAdd("hahaha4");
		dz.myAdd("hahaha5");
		while(!dz.isNull()) {
			System.out.println(dz.myGet());
		}
	}
	
	private static void show() {
		LinkedList link = new LinkedList();
		link.addFirst("11");
		link.addFirst("22");
		link.addFirst("33");
		link.addFirst("44");
		System.out.println(link);
		System.out.println(link.getFirst());  //获取第一个 但是不删除
		System.out.println("remove="+link.removeFirst());   //删除第一个 返回删除的值
//		Iterator it = link.iterator();
//		while(it.hasNext()) {
//			System.out.println(it.next());
//		}
		while(!link.isEmpty()) {                       //取出的时候 删除全部元素   
			System.out.println(link.removeFirst());
		}
		
	}
}


```

```java
package cn.collection.package3;

import java.util.LinkedList;

class LinkedListTestDuiLie{
	private LinkedList link;    //私有内部变量
	public LinkedListTestDuiLie() {
		link = new LinkedList();   //new 的时候给变量LinkedList
	} 
	public Object myGet() {
		return link.removeFirst();    //removeLast()就是堆栈
	}
	public void myAdd(Object obj) {
		link.addLast(obj);
	}
	public boolean isNull() {
		return link.isEmpty();
	}
	
}
```

## ArrayList

```java
package cn.collection.package3;

import java.util.ArrayList;
import java.util.Iterator;

public class ArrayListDemo {
		public static void main(String[] args) {
			ArrayList al = new ArrayList();
			al.add(new Person("1", 10));   //因为这里存入的时候成了Object 向上提成了,在查看的时候要向下转型
			al.add(new Person("2", 20));
			al.add(new Person("3", 30));
			Iterator it = al.iterator();
			while(it.hasNext()) {
				//System.out.println(((Person)it.next()).getName());   
				Person p = (Person)it.next();         //取出的时候要向下转型,不然就是哈希值
				System.out.println(p.getName()+"::"+p.getAge());
			}
			
		}
}

class Person {
	private String name;
	private int age;
	public String getName() {
		return name;
	}
	public Person(String name,int age) {
		this.age = age;
		this.name = name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
}

```

## Set

元素不可以重复,是无序的

​	Set接口中的方法和Collection一致

​	HashSet  内部是数据结构的哈希表,是不同步的

哈希表确定元素是否相同

1. 判断的是两个元素的哈希是否想相同,如果相同,就判断两个对象的内容是否相同
2. 判断哈希的同时,其实就是判断的hashCode的方法,判断内容相同就equals方法,如果hash不相同,就不会用equals

### HashSet

```java
package set;

import java.util.HashSet;
import java.util.Iterator;

public class hashsetDemo {

	public static void main(String[] args) {
//		HashSet hs = new HashSet();
//		hs.add("hahaha1");
//		hs.add("hahaha1");    //set数据唯一
//		hs.add("hahaha2");
//		hs.add("hahaha3");
//		hs.add("hahaha4");
//		
//		Iterator it = hs.iterator();
//		while(it.hasNext()) {
//			System.out.println(it.next());
//		}
//		
		
		//先hashSet里面存储person对象,如果姓名年龄相同,视为一个人
		HashSet hss = new HashSet();
		hss.add(new Person("list1",21));
		hss.add(new Person("list2",24));
		hss.add(new Person("list3",23));
		hss.add(new Person("list4",25));
		hss.add(new Person("list4",25));        //hashSet先进行hash值判断  假如equals相同 就在进行equals判断
		Iterator it1 = hss.iterator();
		while(it1.hasNext()) {
			Person p = (Person)it1.next();
			System.out.println(p.getName()+"::"+p.getAge());
		}
	}

}
class Person {
	private String name;
	private int age;
	public String getName() {
		return name;
	}
	public Person(String name,int age) {
		this.age = age;
		this.name = name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public String toString() {
		return name+"--"+age;
	} 
	@Override
	public int hashCode() {
		System.out.println(this+".........hashcode判断");
		return name.hashCode()+age;
	}
	@Override
	public boolean equals(Object obj) {
		System.out.println(this.toString()+".......reuals判断");
		Person p = (Person)obj;
		return this.name.equals(p.name);
	}
}
```

### linkedhashSet

```java
//linkedhashSet
		LinkedHashSet lh = new LinkedHashSet();//LinkedHashSet可以完成去重操作(保证有序的同时)
		lh.add("1");
		lh.add("2");
		lh.add("3");
		lh.add("4");
		lh.add("2");
		Iterator it =lh.iterator();
		while(it.hasNext()) {
			System.out.println("LinkedHashSet::"+it.next());
		}
		
```

### TreeSet

```text
可以对set集合的元素进行指定顺序的排序,不同步
		 * 判断元素的唯一性方式:就是根据比较方法的返回值时候是0 是0就是相同的元素 不存
		 * 
		 * TreeSet对元素进行排序的方式之一:
		 * 		让元素本身具备比较功能,就需要实现comparable接口,覆盖compareTo()方法
		 * 如果不要按照对象中具备的自然顺序进行排序,如果对象中不具备自然顺序
		 * 可以使用TreeSet集合第二种排序方法
		 * 让集合具备比较功能,定义一个类实现Comparator接口,覆盖compare方法
		 * 将该类对象作为参数传递给TreeSet集合的构造函数
```

在set包里面

关于Set List 的一些使用查阅技巧

```
需要数据的唯一吗;
需要:	Set
	需要指定顺序吗?
		需要: TreeSet
		不需要: HashSet
		有序储存: LinkedHashSet
不需要: List
	需要频繁的增删吗?
		需要: LinkedList
		不需要: ArrayList
如何记录每个容器的解构和所属体呢?
	list
		|--ArrayList
		|--LinkedList
	Set
		|--HashSet
		|--TreeSet
		
		
array 数组,查询快,有角标

link 链表,增删快  add get remove+first last

hash 哈希表,就是保持唯一性

tree 二叉树,就是想排序,需要两个接口定义排序规则Comparable,Comparator

这些容器都是不同步的
```







## 泛型

jdk1.5出现的新特性(安全机制)

好处: 

1. 将运行时期的问题classCastException赚到了编译时期,加泛型编译的时候存入其他类型会报错
2. 避免了强制转换的麻烦

<> 什么时候用?

​	当操作数据类型不确定的时候,就使用<>,将要操作的应用提供数据类型传入即可

​	其实<>就是一个用于接受具体引用数据类型的参数范围

在程序中,只要用到带有<>的类或者接口,就要明确传入的具体数据类型

泛型技术是给编译器使用的技术,用于编译时期,确保类型的安全

运行的,会把泛型去掉,生成的class文件里面是不带泛型的,这被成为称为泛型的擦除 

为什么要**擦除**,因为为了兼容运行的类加载器

泛型的**补偿**: 在运行的时候,通过获取文件的类型进行转换动作,不用使用者再去强制转换了

alt+shift+s    跳出代码快捷选项





泛型的通配符 **?** 表示未知类型 

可以对类型进行限定 <? extends E> 接收E类型的子类型对象 上限

? super E  接收E类型获取E的父类型 下限

一般在存储元素的时候都是用上限,因为这样去除的都是按照上限类型运算的,不会出现安全隐患

一般读取元素使用下限

## Map

Map 一次储存一对元素,被称为双列集合(键值对),不能出现重复的键

Collection 一次添加一个元素,被称为单列集合

```java
public class mapDemo {

	public static void main(String[] args) {
		/*
		 * 常用方法:
		 * 1.添加  	put(key,value) 返回前一个和key关联的值,如果没有 就返回null
		 * 2.删除	
		 * 			clear() 清空Map集合
		 * 			remove(key)   返回value值
		 * 3.判断
		 * 			containsKey(key)    	是否包含值
		 * 			containsValue(value)	是否包含键		
		 * 			isEmpty()				判断是否有键值对
		 * 4.获取
		 * 			get(key)   	通过键拿值,如果没有键返回null
		 * 			size()  	返回键值对的个数
		 */
		Map<Integer,String> map = new HashMap<Integer,String>();
		show(map);
	}

	private static void show(Map<Integer,String> map) {//学号 姓名
		//添加
		System.out.println(map.put(8,"wangcai"));    //假如是第一次存就返回 	null
		System.out.println(map.put(8,"xiaoqiang"));	 //存相同键 值会覆盖        	wangcai
		System.out.println(map.put(7,"zhaoliu"));
		System.out.println(map.put(6,"zhaoliu"));
		System.out.println(map.put(5,"alalala"));
		System.out.println(map);
		//删除
		System.out.println("删除7的值--"+map.remove(7));	//删除会返回删除键的值	
		
		//判断
		System.out.println("是否有8这个键"+map.containsKey(8));
		
		//获取
		System.out.println("get=="+map.get(8));
		
		//取出map里面的所有元素
		//想通过keyset方法获取map里面的所有键所在的set集合,然后通过set迭代器获取到每个键的值
		System.out.println(map.keySet());  //返回key值 set类型
		Set<Integer> keySet = map.keySet();
		Iterator<Integer> it = keySet.iterator();
		while(it.hasNext()) {
			String value = map.get(it.next());
			System.out.println(value);
		}
		
		System.out.println("--------");
		
		//通过map转set可以完成对迭代
		//还有一个方法entryset
		//该方法将键和值的映射关心作为对象储存在set集合里面,而这映射关心的类型就是Map.Entry类型(Key,Value)
		System.out.println(map.entrySet());   //返回kv映射关系
		Set<Map.Entry<Integer, String>> entrySet = map.entrySet();
		Iterator<Map.Entry<Integer, String>> it1 = entrySet.iterator();
		while(it1.hasNext()) {
			Map.Entry<Integer, String> me = (Entry<Integer, String>) it1.next();   //为什么需要转型????????
			Integer key = me.getKey();
			String value = me.getValue();
			System.out.println(key+":::"+value);
		}
		
		//获取所有的value值
		System.out.println(map.values());
		Collection<String> value = map.values();
		Iterator<String> it2 = value.iterator();
		while(it2.hasNext()) {
			System.out.println(it2.next());
		}
		
	}

}
```

Map下面常用的子类

​	|-- HashMap		:内部结构是哈希表,不同步,允许null作为键,允许null作为值

​	|-- treeMap		:内部结构是二叉树,不同步,可以对Map集合中的键进行排序

​	|-- Hashtable  	:内部结构是哈希表,是同步的,不允许null作为键,不允许null作为值

​		|-- 用来存储键值对型的配置文件信息,可以和IO技术想结合

### 练习 "fafahjdarawi" 获取该字符串中,每一个字母的出现的次数

```java
package cn.map.package5;

import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;


public class MapTest {

	public static void main(String[] args) {
		/*
		 * 练习 "fafahjdarawi" 获取该字符串中,每一个字母的出现的次数
		 * 要求打印a(1)b(2)
		 * 字符和次数之间存在映射关系,并且不止一个 可以存储映射关系的 是数组和 Map 
		 * 关系的一方是有序的吗?
		 * 不唯一 使用Map集合
		 * 又发现可以保证唯一行的一行几倍这顺序如a b c
		 * 
		 *   
		 * 应该储存的是字母和次数的对应关系
		 * 这个集合里面最终应该储存的是字母,随意先将字符变成字符数组
		 * 如果该字母键不存在,就将该字母作为键 1作为值存储到map里面
		 * 如果该字母键存在,就将字符的键取出 +1 在存入Map里面
		 * 键相同 只会覆盖 这样记录的该字母的出现次数
		 * 遍历结束 map集合就记录的所有字母的出现的次数
		 */
		String data = "fafa3123123hjda  aaewqd--rawi";
		//String[] list = data.split("");
		char[] list = data.toCharArray();
		Map<Character, Integer> lm = new LinkedHashMap<Character,Integer>();
		for (int i = 0; i < list.length; i++) {
			if(list[i]>='a' && list[i] <= 'z') {   //这样可以控制 输入的必须是a-z的字母
				Integer value = lm.get(list[i]);
				int count = 1;   //初始化为1
				if(value != null) {
					count = value+1;
				}
				lm.put(list[i], count);  
				
//				if(lm.containsKey(list[i]) == false){
//					lm.put(list[i], 1);   			//假如不存在就添加这个键值对
//				}else {
//					int value = lm.get(list[i])+1;	//假如已经存在.获取键 在这基础上面 +1
//					lm.put(list[i], value);
//				}
			}		
		}

		Set<Map.Entry<Character, Integer>> entry = lm.entrySet();
		Iterator<Map.Entry<Character, Integer>> it = entry.iterator();
		String datas = mapToString(it);
		System.out.println(datas);
	}

	private static String mapToString(Iterator<Entry<Character, Integer>> it) {
		StringBuffer sb = new StringBuffer();
		while(it.hasNext()) {
			Map.Entry<Character, Integer> en = it.next();
			int value = en.getValue();
			Character key = en.getKey();
			sb.append(key+"出现了"+value+"次"+",");
		}
		return sb.toString();
	}
}

```

#### Map在有映射关系的时候,可以优先考虑

```java
package cn.map.package5;

import java.util.HashMap;
import java.util.Map;

public class MapTest2 {

	public static void main(String[] args) {
		/**
		 * Map在有映射关系的时候,可以优先考虑
		 * 在查表法里面引用比较多
		 * 
		 */
		String week = "星期1";
		String Bymap = getWeek(week);
		System.out.println(Bymap);
	}

	private static String getWeek(String week) {
		 Map<String,String> map = new HashMap<String,String>();
		 map.put("星期1", "Mon");
		 map.put("星期2", "Tus");
		 map.put("星期3", "Wes");
		 map.put("星期日", "Sun");
		 map.put("星期7", "Sun");
		 return map.get(week);
	}

}

```

### 工具类

#### Collections : 是集合框架的工具类,里面都是静态方法

Collections.sort()  //排序

````java
package cn.utils.package6;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class tools {

	public static void main(String[] args) {
		show();
	}

	private static void show() {
		List<String> list = new ArrayList<String>();
		list.add("dasdada");
		list.add("dfdsfsd");
		list.add("fsds");
		list.add("ewqe");
		list.add("eqweq");
		list.add("e");
		//Collections.sort(list);    //排序函数
		mySort(list,new ComparatorByLength());				//实现的排序函数
		System.out.println(list);
		
	}

	private static <T extends Comparable<? super T>> void mySort(List<T> list,Comparator<T> comp) {
		for (int i = 0; i < list.size()-1; i++) {
			for (int j = i+1; j < list.size(); j++) {
				//if(list.get(i).compareTo(list.get(j))>0) {
				if(comp.compare(list.get(i), list.get(j))>0){
//					T temp = list.get(i);
//					list.set(i, list.get(j));
//					list.set(j, temp);
					Collections.swap(list, i, j);
				}
			}
		}
	}
}

class ComparatorByLength implements Comparator<String> {   //实现自定义排序

	@Override
	public int compare(String o1, String o2) {
		int temp = o1.length() - o2.length();
		return temp == 0?o1.compareTo(o2):temp;
	}
	
}
````

#### 最大值

```java
String max = Collections.max(list,new ComparatorByLength());  //获取最大值 第二个参数可以是排序方式
```

### 替换

```java
Collections.replaceAll(list, "dasdada", "a");
```

### 给非同步的集合加锁

异步变同步的方法

```java
class MyCollections{
    public static List SynList (List list) {
    	return new MyList(list);    
    }
    private class Mylist implements List {
        private List list;
        
        private static final object lock = new Object();
        Mylist(List list) {
            this.list = list;
        }
        public boolean add(Object obj) {
            synchronized (lock) {
                return list.add(obj);
            }
        }
        public boolean remove (Object obj) {
        	synchronized (lock) {
                return list.remove(obj)
            }
        }
    }
}
```

#### Arrays是数组的工具类,里面都是静态方法

```
Array.toString(arr);
//将数组变成字符串,便于打印
```

#### 数组转集合

```java
package cn.utils.package6;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ArrayTools {

	public static void main(String[] args) {
		/*
		 * List asList (数组) 将数组转成集合
		 * 好处: 可以使用集合的方法来操作数组中的元素
		 * 注意: 数组的长度是固定的,所以对集合的增删方法都不可以使用,否则会发生UnsupportedOperationException
		 */
		String[] arr = {"aaa","bbb","ccc"};
		List<String> list = Arrays.asList(arr);
		//list.add("dad");
		//System.out.println(list.contains("aaa"));//true
		
		//一些注意事项
		int[] arrs = {1,2,3,5,6,4};
		Integer[] arrss = {1,2,3,5,6,4}; 
		List<int[]> lists = Arrays.asList(arrs);
		System.out.println(lists);//基本数据类型,会将该数组作为集合中的元素进行存储 所以这里存入的是第一个位置
		System.out.println(lists.size());
		List<Integer> listss = Arrays.asList(arrss);
		System.out.println(listss);
	}
}
```

#### 集合转数组

```java
public static void main(String[] args) {
		/*
		 * 集合转数组
		 * 
		 */
		List<String> list = new ArrayList<String>();
		list.add("dasdas1");
		list.add("dasdas2");
		list.add("dasdas3");
		list.add("dasdas4");
		list.add("dasdas5");
		list.add("dasdas");
		String[] arr = list.toArray(new String[5]);    
		//list本身的toArray就是将list集合转为数组  ,这里String[5]指定长度为5 
		//假如小于集合的长度,会创建一个同类型的并和数组相同的size的数组
		//假如大于集合本身的长度,其他位置会默认null
		System.out.println(Arrays.toString(arr));
		System.out.println(arr.length);
	}
```

### forEach

```java
package cn.utils.package6;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class forEachDemo {
	public static void main(String[] args) {
		/*
		 * forEach语句
		 * 格式:
		 * for(类型 变量 : Collection集合 | 数组) {}
		 * 传统for与forEach的不同之处
		 * 1. 传统for可以完成对语句执行很多次,因为可以控制循环的增量条件
		 * forEach是一种简化形式,他必须有被遍历的目标,该目标要么是数组 要么是Collection集合
		 * 
		 * 对于数组的遍历 如果仅仅是获取数组元素 可以使forEach
		 * 如果要对数组的角标进行操作,建议使用for
		 */
		List<String> list = new ArrayList<String>();
		list.add("abc1");
		list.add("abc2");
		list.add("abc3");
		list.add("abc4");
		for (String a : list) {    //简化书写
			System.out.println(a);
		}
		
		int[] arr = {1,3,3,43,5};
		for (int i : arr) {					//还可以使用数组
			System.out.println(i);
		}
		
		//可以使用高级for对map进行操作
		Map<Integer, String> map = new HashMap<Integer,String>();
		map.put(1, "张三");
		map.put(2, "李四");
		map.put(3, "王五");
		map.put(4, "赵六");
		for (int i : map.keySet()) {
			System.out.println(map.get(i));
		}
		
		for (Map.Entry<Integer, String> i : map.entrySet()) {
			int ints = i.getKey();
			String str = i.getValue();
			System.out.println(ints+"::"+str);
		}
		
	}
	 	
}	

```

### 不定参数

```java
package cn.utils.package6;

public class budincanshu {
	public static void main(String[] args) {
		int sum = add(1,45,3456,457,58689,67,9079,8,89);
		System.out.println(sum);   
	}

	private static int add(int ...is) {
		System.out.println(is.length);			//不定参数将参数封装成为数组
		int sum = 0;
		for (int i : is) {
			sum+=i;				
		}
		return sum;
	}
}
```

### 静态导入

```java
package cn.utils.package6;

import static java.lang.System.out;					//静态导入
public class staticdaoru {

	public static void main(String[] args) {
		out.println("打印");
	}
}

```



