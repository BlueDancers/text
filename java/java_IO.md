# IO流

输入流和输出流是相对与内存设备而言

## 字符流

字节流读取文字字节后,不直接操作而是先查指定编码表,获取对应文字

再对文字进行操作,简单说就是字节流+编码表

字节流的两个顶层父类

1. InputStream
2. OutputStream

字符流的两个顶层父类

1. Reader
2. Writer

将一些文字存储到硬盘一个txt文本里面

### FileWriter写入字符

如果操作文字数据,建议有限考虑字符流,要将数据从内存写入硬盘,使用直接流中的输出流Writer

```java
package FileWriter_IO;

import java.io.FileWriter;
import java.io.IOException;

public class fileWriter_first {
	public static void main(String[] args) throws IOException {
		//创建一个可以往文件中写入字符数据的字符输出流对象
		//既然是往一个文件中写入文字数据,那么在创建对象,就必须明确该文件(用于储存数据的目的地)
		//如果文件不存在 就创建文件
		//如果文件存在就 覆盖文件
		//如果构造函数加true 那么就可以续写,不会去覆盖文件里面的内容
		FileWriter fw = new FileWriter("demo.txt",true);
		/*
		 * 调用write() 写入数据
		 * 其实数据写入到了储存缓冲区
		 */
		fw.write("第一行"+System.getProperty("line.separator")+"第二行");  //用system来获取当前电脑的反斜杠
		fw.write("xixi");
		
		//flush 刷新该流的缓冲,如果该流已经保存到缓冲区write()的所有字符,则会立即将它们写入逾期目标
		fw.flush(); 
		//关闭流 关闭前会调用flush属性缓冲数据 在调用write和flush会报错
		fw.close();   
	}
}

```

### IO异常处理

```java

import java.io.FileWriter;
import java.io.IOException;

public class IOExceptionDemo {

	public static void main(String[] args) {
		FileWriter fw = null;   //外部创建引用变量
		try {
			fw = new FileWriter("L://demo.txt");   //内部进行初始化
			fw.write("1");
		} catch (Exception e) {					//这里是写入失败
			System.out.println(e.toString());
		}finally {
				if(fw != null) {		//一定要判断不等于空 否则出异常会出现空指针
					try {
					fw.close();
				} catch (IOException e) {
					throw new RuntimeException("关闭失败");
				}
			}
		}
	}
}

```

### FileReader读取的两种方式

```java
package FileWriter_IO;
import java.io.FileReader;
import java.io.IOException;

public class FileReader_one {

	public static void main(String[] args) throws IOException {
		
		//show_one();
		show_two();
		
	}

	private static void show_two() throws IOException {
		/*
		 * 使用read(char[])读取文本数据
		 * 常见char数组
		 * 
		 */
		FileReader fr = new FileReader("demo.txt");
		char[] ch = new char[100];
//		int num = fr.read(ch);
//		System.out.println(num+"--"+new String(ch,0,num));  //指定打印长度
//		int num1 = fr.read(ch);
//		System.out.println(num1+"--"+new String(ch));
		//因为读取不到就为-1 这个特性 可以这这么写
		int num = 0;
		while((num = fr.read(ch)) != -1) {
			System.out.println(new String(ch,0,num));
		}
		
	}

	private static void show_one() throws IOException {
		/*
		 * 读取一个文件 将信息打印到控制台
		 */
		//在创建读取流对象之前,必须要明确被读取的文件 ,一定要确定该文件一定存在
		//用读取关联一个已存在的文件
		FileReader fr = new FileReader("demo.txt");
		
		//read方法来读取字符  read每次只能读一个 返回读到的字符 所以要用while来读
		int ch = 0;
		while((ch=fr.read()) != -1) {
			System.out.println((char)ch);
		}
	}

}

```

## 缓冲区

1. BufferedWriter
2. BufferedReader

###  BufferedWriter

```java
package bufferedflow_IO;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

public class BufferedWriteDemo {

	public static void main(String[] args) throws IOException {
		demo_1();
	}

	private static void demo_1() throws IOException {
		FileWriter fw = new FileWriter("A:\\1.txt");
		
		//为了提高写入效率,使用字符流的缓冲区
		BufferedWriter bw = new BufferedWriter(fw);
		
		//使用缓冲区的写入方法 把数据写入缓冲区
		
		for (int i = 0; i < 100; i++) {
			bw.write("这是"+i+"行");
			bw.newLine();
		}
		//bw.write("这是第一行");
		//这是bufferedWrite对 System.getProperty("line.separator") 的封装  换行
		//bw.newLine();
		//bw.write("这是第二行");
		//使用缓冲区的刷新功能将数据放入目的地
		bw.flush();
		
		//关闭缓冲区,其实就是关闭被缓冲的对象
		bw.close();
	}	

}

```

### BufferedReader

```java
public class BufferedReaderDemo {

	public static void main(String[] args) throws IOException {
		demo();
		
	}

	private static void demo() throws IOException {
		FileReader fr = new FileReader("A:\\1.txt");
		BufferedReader br = new BufferedReader(fr);
		String line = null;
		//br.read();//这个read是从缓冲区中取出的数据,所以覆盖了父类中的read方法,所以read是更加高效的read
		//其实在这一步已经可以读取到缓冲区了,根据文本的行的的特点,可以按行进行读取,于是出现了readLine()
		//判断换行标记 有就把标记前的字符串返回
		while((line = br.readLine()) != null) {   //假如readLine()读不到数据的时候会返回null
			System.out.println(line);
		}
	}

}
```

### BufferedWrite - BufferedReader

```java
public class bufferedTest {

	public static void main(String[] args) throws IOException {
		FileReader fr = new FileReader("A:\\1.txt");
		BufferedReader br = new BufferedReader(fr);
		
		
		FileWriter fw = new FileWriter("E:\\1.txt");
		BufferedWriter bw = new BufferedWriter(fw);
		
		int ch = 0;   //逐个写入
		while((ch = br.read()) != -1) {
			bw.write(ch);
		}
		
//		String ch = null;
//		while((ch = br.readLine()) != null) {
//			bw.write(ch);
//			bw.newLine();  //这里必须有 因为按行写入的没有换行
//		}
		br.close();
		bw.close();
		
	}
}
```

### 实现BufferedReader里 read() 以及lineread()

```java
public class myBuffered {

	public static void main(String[] args) throws IOException {
		FileReader f = new FileReader("A:\\1.txt");
		MybufferedReader m = new MybufferedReader(f);
		System.out.println(m.myReadLine());
	}

}

/*
 * 自定义读写缓冲区
 * 分析:缓冲区无非就是封装了一层数组
 * 并对外提供了更多的方法对数组进行访问
 * 其实这些方法最终操作的都是数组的指针
 * 
 * 缓冲的原理就是:
 * 从源里面回去一批数据装进缓冲区
 * 在从缓冲区去除一个一个数据
 * 
 * 但此次取完后 在从源中继续取
 * 当源取光的时候用-1作为结束标记
 * 
 */


class MybufferedReader {
	private FileReader r;
	//定义一个数组作为缓冲区 
	private char[] buf = new char[1024];
	
	//定义一指针用于操作这个数组里面的元素 当操作到最后一个元素 指针归零
	private int pos = 0;
	
	//定义一个计数器用于记录缓冲区中的数据个数,当数据减到零的时候,就从源里面获取数据到缓冲区
	private int count = 0;
	
	MybufferedReader(FileReader r) {
		this.r = r;
	}
	public int myread() throws IOException {
		if(count == 0) {
			count = r.read(buf);    //返回数组长度
			pos = 0;    //每次都从0开始取
		}
		if(count < 0) {
			return -1;
		}
		char ch = buf[pos];   //
		pos++;		//每次取一个 数组指针都要+1
		count--;	//每次取一个 里面的数组-1个
		return ch;
	}
	public String myReadLine() throws IOException {
		StringBuilder sb = new StringBuilder();
		int ch = 0;
		while((ch = myread()) != -1) {
			//将读取的字符存储掉sb(缓冲区)里面去
			
			if(ch == '\r') {
				continue;
			}
			if(ch == '\n') {
				return sb.toString();  //遇到换行就输出这次的一行元素
			}
			sb.append((char)ch);     //没有遇到换行符就想sb里面append元素
		}
		if(sb.length() != 0) {
			return sb.toString();			//防止\n后面的元素不打印
		}
		return null;			//如果数据去读完了返回null
	}
	
	public void myclose () throws IOException {  //关闭io
		r.close();
	}
}
```

### 装饰设计模式

```java
public class presonDemo {

	public static void main(String[] args) {
		/*
		 * 装饰设计模式
		 * 对一组对象功能进行增强的时候 ,就可以使用该模式进行问题解决
		 */
		preson p = new preson();
		newpreson p1 = new newpreson(p);   //这就是装饰设计模式
		p1.eat();
	}

}

class preson {
	void eat() {
		System.out.println("吃饭");
	}
	
}

//这个类的出现是为了增强preson而出现的
class newpreson {
	preson p;
	public newpreson(preson p) {
		this.p = p;
	}
	public void eat() {
		System.out.println("开胃酒");
		p.eat();
		System.out.println("甜点");
	}
}
```

这里装饰设计模式和继承有什么区别?

首先是继承体系

Writer 

​	|-- TextWriter 用于操作文本

​	|-- MediaWriter 用于操作媒体

想要对操作的动作进行效率的提高,按面向对象,可以使用继承对具体对象进行拓展

效率提高需要加入缓冲技术

Writer 

​	|-- TextWriter 用于操作文本

​		|-- BufferTextWriter加入缓冲技术的操作文本对象

​	|-- MediaWriter 用于操作媒体

​		|--BufferMediaWriter 加入缓冲技术的操作媒体

如果这个体系进行功能拓展,多了流对象

那么这个流要提高效率,是不是也要产生子类呢?是,这时就会发现只为提高功能,进行的继承

导致继承体系越来越臃肿,不够灵活



重新思考问题

既然加入的是同一种技术 -- 缓冲

继承是让缓冲与具体对象集合

可不可可以对缓冲进行封装,那个对象需要缓冲就个缓冲关联

```
class Buffer extends Writer{
    Buffer (Writer w) {  //对父类进行处理 ,下级的类都具有该功能
        
    }
}
```

现在构架变成这样

Writer 

​	|-- TextWriter 用于操作文本

​	|-- MediaWriter 用于操作媒体

​	|-- BufferWriter 用于提高效率

装饰比继承更加灵活

特点: 装饰类和被装饰类都要属于一个接口和父类

### lineNumberReader可以查询行号

```java
public class lineNumberReaderDemo {

	public static void main(String[] args) throws IOException {
		FileReader fr = new FileReader("A:\\1.txt");
		LineNumberReader lnr = new LineNumberReader(fr);
		String line = null;
		while((line = lnr.readLine()) !=null) {
			System.out.println(lnr.getLineNumber()+"--"+line);
		}
		lnr.close();
	}

}
```

### 复制媒体文件

```java
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class copyMusic {

	public static void main(String[] args) throws IOException {
		
		//demo1();
		//demo2();
		demo3();
	}

	private static void demo3() throws IOException {
		//不建议的方式 
		FileInputStream fs = new FileInputStream("A:\\赵雷 - 朵.mp3");
		FileOutputStream fos = new FileOutputStream("E:\\\\赵雷 - 朵.mp3");
		byte[] bytes = new byte[fs.available()];
		fs.read(bytes);
		fos.write(bytes);
		fs.close();
		fos.close();
		
	}

	private static void demo1() throws IOException {		//使用缓冲区进行读写
		FileInputStream fs = new FileInputStream("A:\\赵雷 - 朵.mp3");
		FileOutputStream fos = new FileOutputStream("E:\\\\赵雷 - 朵.mp3");
		byte[] bytes = new byte[1024];
		int len = 0;
		while((len = fs.read(bytes)) != -1) {
			fos.write(bytes);
		}
		fs.close();
		fos.close();
	}

	private static void demo2() throws IOException {  //使用数组作为缓冲区
		FileInputStream fs = new FileInputStream("A:\\赵雷 - 朵.mp3");
		BufferedInputStream bis = new BufferedInputStream(fs);
		FileOutputStream fos = new FileOutputStream("E:\\\\赵雷 - 朵.mp3");
		BufferedOutputStream bos = new BufferedOutputStream(fos);
		int ch = 0;
		while((ch = bis.read()) != -1) {
			bos.write(ch);
		}
		bis.close();
		bos.close();
	}
}
```





​	



