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

### 读取键盘录入

```java
package readKey;

import java.io.IOException;
import java.io.InputStream;

public class readKeyDemo {

	public static void main(String[] args) throws IOException {
		//readKey();
		readKey2();
	}

	private static void readKey2() throws IOException {
		/*
		 * 获取用户键盘录入的数据,并处理成为大写的 如果输入over 就结束流
		 * 因为键盘录入只读取一个字节,要判断是不是over 需要现将读取的字节拼成字符串
		 * 那就需要一个容器
		 * 在用户回车之前 判断字符串
		 */
		//1.创建容器
		StringBuilder sb = new StringBuilder();
		//获取键盘读取流
		InputStream is = System.in;
		//定义变量 记录读取到的字节 并循环获取
		int ch = 0;
		
		while((ch = is.read()) != -1) {
			//将读取到的字节存储到Stringbuilder里面
			//换行标记不存
			if(ch == '\r') {
				continue;
			}
			if(ch == '\n') {
				String temp = sb.toString();
				if("over".equals(temp)) {
					break;
				}else {
					System.out.println(temp.toUpperCase());
					sb.delete(0, sb.length());
				}
			}else {
				sb.append((char)ch);
			}
			
			//System.out.println(ch);
		}
	}

	private static void readKey() throws IOException {
		InputStream is = System.in;
		int ch = is.read();
		System.out.println((char)is.read());//阻塞式方法 没有读到数据之前会一直等待
		System.out.println((char)is.read());
		System.out.println((char)is.read());
		System.out.println((char)is.read());
		System.out.println((char)is.read());
		System.out.println((char)is.read());
		
		//不要关闭流 因为 这是系统时间 关了 除非重启电脑,要不然就打不开这个流
	}

}
```

### 转换流

```java

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.OutputStream;


public class TransStreamDemo {

	public static void main(String[] args) throws IOException {
		
//		InputStream is = System.in;//字节流
//		InputStreamReader isr = new InputStreamReader(is);//将字节转换成为字符的桥梁 转换流
//		BufferedReader br = new BufferedReader(isr);//字符流
		
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		
		//输出流
//		OutputStream os = System.out;
//		OutputStreamWriter osw = new OutputStreamWriter(os);
//		BufferedWriter bw = new BufferedWriter(osw);
		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

		String line = null;
		while((line = br.readLine()) !=null) {
			if("over".equals(line)) {
				break;
			}
			bw.write(line.toUpperCase());
			bw.newLine();
			bw.flush();
		}
	}
}

```



![](http://on7r0tqgu.bkt.clouddn.com/Fujl_39Ln5hKPjfEFpSHLrQv_frB.png )

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class TransStreamDemo2 {

	public static void main(String[] args) throws IOException {
		/*
		 * 1. 将键盘录入的数据写入一个文件中
		 * 2. 将一个文本内容显示到控制台
		 */
		demo1();
		//demo2();
	}

	private static void demo2() throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));  //获取控制台的数据
		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream("A:\\2.txt")));
		
		String line = null;
		while((line = br.readLine()) != null) {  //将控制台数据写入文本
			bw.write(line);
			bw.flush();
		}
	}

	private static void demo1() throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream("A:\\2.txt")));
		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
		
		String line = null;
		while((line = br.readLine())!=null) {
			bw.write(line);
			bw.flush();
		}
	}
}
```

转换流

InputStreamReader: 	字节到字符的桥梁,解码

OutputStreamWriter: 	字符到字节的桥梁,编码



### 流的操作/使用规律

之所以要弄清楚规律是因为流对象太多了,开发时候不知道用那个对象合适

想要知道开发的时候用那个对象

1. 明确源以及目的(汇)

   1. 源: 	InputStream Reader
   2. 目的: OutputStream Writer
2. 明确数据是不是纯文本数据

   1. 源:纯文本: Reader   不是 InputStream
   2. 目的:纯文本 Writer 不是OutputStream
3. 明确具体对象
   1. 源设备
      1. 硬盘:  File
      2. 键盘:  System.in
      3. 内存:  数组
      4. 网络:  Socket流
   2. 目的
      1. 硬盘: File
      2. 控制台:System.out
      3. 内存:数组
      4. 网络:Socket流
4. 是否需要额为流对象
   1. 是否需要缓冲区
      1. 是 加上Buffer

#### 需求

1. 复制一个文本文件

   1. 明确源和目的

      1. 源 InputStream Reader
      2. 目的 OutputStream Writer

   2. 是不是纯文本

      1. 是	使用字符流 源 Reader 目的: Writer 

   3. 明确设施

      ​	硬盘 : File

      FileReader fr = new FileReader("a.txt");

      FileWriter fr = new FileWriter("b.txt");

   		需要缓冲区?

   BufferedReader br = new BufferedReader( new FileReader("a.txt"));

   BufferedWriter br = new BufferedWriter( new FileWriter("b.txt"));

读取键盘录入信息 并写入文件

InputStream is = System.in;

FileWriter fw = new FileWriter("1.txt")

优化

InputStreamReader isr = new InputStreamReader(System.in)

FileWriter fw = new FileWriter("1.txt")

高效写入

BufferedReader br = new BufferedReader( new InputStreamReader(System.in));

BufferedWriter bw = new BufferedWriter(new FileWriter("1.txt"))

### 转换流的编码解码

需求将一个中文字符串按照指定的编码写入到一个文本文件

既然明确了指定编码表,那么就不可以使用FileWriter,因为FileWriter内部是使用默认的本地码表

只能使用其父类 OutputStreamWriter

OutputStreamWriter 接受一个字节输出流对象,既然是操作文件,对象应该是FileOutputStream

OutputStreamWriter  os = new OutputStreamWriter(new FileOutputStream("a.txt"),charsetName)

```
package readKey;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;

public class TransStreamDemo3 {

	public static void main(String[] args) throws IOException {
		//writer();
		//writer2();
		readtext();
	}

	private static void readtext() throws IOException {
//		FileReader fr= new FileReader("A:\\gbk_1.txt");
//		char[] buf = new char[10];
//		int len = fr.read(buf);
//		String str = new String(buf,0,len);
//		System.out.println(str);
//		fr.close();
		InputStreamReader osw = new InputStreamReader(new FileInputStream("A:\\gbk_1.txt"), "GBK");    //使用InputStreamReader可以指定编码格式
		char[] buf = new char[10];
		int len = osw.read(buf);
		String str = new String(buf,0,len);
		System.out.println(str);
		osw.close();
	}

	private static void writer2() throws UnsupportedEncodingException, IOException {
		/*
		 * 如果需要指定码表 就要使用OutputStreamWriter
		 */
		OutputStreamWriter osw = new OutputStreamWriter(new FileOutputStream("A:\\gbk_1.txt"), "UTF-8");
		
		osw.write("你好啊");
		osw.close();
	}

	private static void writer() throws IOException {
		/*
		 * fileWriter 其实就是转换流指定了本机默认码表的体现
		 * 而且这个转换流的子类对象,可以方便操作文本文件
		 * 操作文件的字符流+本机的编码表  
		 * 是便捷类
		 */
		FileWriter fw = new FileWriter("A:\\gbk_1.txt");
		fw.write("你好");
		fw.close();
	}
}
```

## File

file对象一般用于对文件的操作

```java
package File;

import java.io.File;
import java.io.IOException;
import java.text.DateFormat;
import java.util.Date;

public class FilemethodDemo1 {

	public static void main(String[] args) throws IOException {
		/*
		 * File对象常用方法
		 * 1. 获取
		 * 	1.1 获取文件大小
		 * 	1.2 获取文件路径
		 * 	1.3 获取文件名称
		 * 	1.4 获取文件修改时间
		 */
			//demo1();
		/*
		 * 创建与删除
		 */
			//createFile();
			//createdir();
		/*
		 * 判断
		 */
		//isDemo();
		/*
		 * 重命名
		 */
		//remove();
		//获取文件属性
		//listRootsDemo();
	}
	private static void listRootsDemo() {
		File[] file = File.listRoots();
		for (File file2 : file) {
			System.out.println(file2);
		}
		File files = new File("D:\\");
		System.out.println(files.getFreeSpace());   //可用空间
		System.out.println(files.getTotalSpace());	//总容量
		System.out.println(files.getUsableSpace());
	}

	private static void remove() {
		File file = new File("A:\\2.txt");
		System.out.println(file.renameTo(new File("A:\\1111.txt")));  //重命名 
	}

	private static void isDemo() {
		File file = new File("A:\\1.txt");
		System.out.println(file.exists());  //判断文件是否存在
		//最好先判断时候存在 在判断文件 文件夹
		System.out.println(file.isDirectory());		//判断是否文件
		System.out.println(file.isFile());			//判断是否文件夹
	}

	private static void createdir() {
		File file = new File("A:\\one");
		//创建文件夹
//		boolean d = file.mkdir();  //创建多级目录 mkdirs
//		System.out.println(d);
		//删除文件夹
		System.out.println(file.delete());
	}
	

	private static void createFile() throws IOException {
		//文件的创建和删除
		File file = new File("A:\\4.txt");
		//和输出流不一样 如果文件不存在就创建true 如果存在 就不创建,同时返回false 
		//boolean b = file.createNewFile();
		//System.out.println("b="+b);
		boolean r = file.delete();
		System.out.println("r="+r);	
	}
	
	
	

	private static void demo1() {
		File file = new File("A:\\1.txt");
		String name = file.getName();
		String path = file.getPath();			//文件路径
		String absPath = file.getAbsolutePath();//绝对路径
		long len = file.length();				//获取字节数
		long time = file.lastModified();  		//最后修改时间
		
		Date date = new Date(time);
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG);
		String str_time = dateFormat.format(date);
		
		System.out.println(name);
		System.out.println(path);
		System.out.println(len);
		System.out.println(str_time);
	}
}
```

### File的过滤器

```java
package File;

import java.io.File;
import java.io.FilenameFilter;

public class FileListDemo {
	public static void main(String[] args) {
		
		//demo();
		//filterDemo();
		filterDemo1();
	}

	private static void filterDemo1() {
		File file = new File("c:\\");
		File[] files = file.listFiles(new Filterjava(".BIN"));
		for (File file1 : files) {
			System.out.println(file1);
		}
		
	}

	private static void filterDemo() {
		File file = new File("c:\\");
		String[] names = file.list(new Filterjava(".java"));   //获取子文件目录,包含隐藏文件  感觉没必要 直接在forEach里面遍历
		
		for (String name : names) {
			System.out.println(name);  
		}
	}

	private static void demo() {
		File file = new File("c:\\");   
		//这里不可以放文件,必须是目录 否则会返回空指针
		//调用list方法的File对象中封装的必须是目录
		//访问系统级目录会发生空指针
		// 如何目录不存在 数组为空
		String[] names = file.list();   //获取子文件目录,包含隐藏文件
		
		for (String name : names) {
			System.out.println(name);  
		}
	}
}


//对过滤器进行按参数锅炉
class Filterjava implements FilenameFilter{
	private String suffix;
	public Filterjava(String suffix) {
		super();
		this.suffix = suffix;
	}
	@Override
	public boolean accept(File dir, String name) {
		
		return name.endsWith(suffix);
	}
}
```

### 递归操作

```java
package File;

public class recursiveDemo {

	public static void main(String[] args) {
		/*
		 * 递归
		 * 函数自身直接 或者间接的调用了自身
		 * 
		 */
		//show(100);
		
		System.out.println(getSum(100));
	}

	private static int getSum(int i) {
		if(i == 1) {
			return 1;
		}
		return i+getSum(i-1);
	}

	private static void show(int num) {
//		while(num>0) {
//			System.out.println(num);
//			num = num/2;
//		}
		if(num>0) {				//递归写法
			System.out.println(num);
			show(num/2);
		}
	}

}
```

### 删除一个有若干文件的文件夹

```java
package File;

import java.io.File;

public class removeTest {

	public static void main(String[] args) {
		/*
		 * 删除一个带内容的目录
		 * 原理 从里往外删除
		 * 需要进行深度遍历
		 */
		File file = new File("F:\\ss");
		removedir(file);
		
	}

	private static void removedir(File file) {
		System.out.println(file.getName());		//打印文件名
		File[] files = file.listFiles();		//获取当前目录的子目录
		for (File file2 : files) {				//遍历获取的目录
			if(file2.isDirectory()) {			//假如是文件 递归
				removedir(file2);
			}else {								//假如不是文件
				System.out.println(file2+":"+file2.delete()); //直接删除
			}
		}
		System.out.println(file+":::::"+file.delete());		//当前文件夹经过删除已经是空文件 可以删除了
	}
}
```

### properties的使用

properties主要是与io结合操作win上面的配置文件

```java
package propertiesDemo;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Properties;
import java.util.Set;

public class propertiesDemo1 {

	public static void main(String[] args) throws IOException {
		/*
		 * Map
		 * 	|-- hashtable
		 * 		|-- properties:
		 * properties集合:
		 * 	特点: 
		 * 		1. 该集合中的将和值都是字符串类型
		 * 		2.集合中的数据可以保存到流 或者从流里面获取
		 * 
		 * 通常用于操作键值对形式的文件
		 * 
		 */
		//propertiesDemos();
		/*
		 * 演示properties集合与流对象
		 */
		//propertiesDemo_1();
		
		/*
		 * 查看 修改 配置信息
		 */
		propertiesDemo_2();
		
		/*
		 * 模拟prop.load(); 方法的实现			
		 */
		//propertiesDemo_3();
	}

	private static void propertiesDemo_3() throws IOException {
		Properties prop = new Properties();
		BufferedReader br = new BufferedReader(new FileReader("A:\\1111.txt"));
		String line = null;
		while((line = br.readLine()) != null) {
			if(line.startsWith("#")) {
				continue;
			}
			String[] arr = line.split("=");
			prop.setProperty(arr[0],arr[1]);
			
		}
		br.close();
		prop.list(System.out);
	}

	private static void propertiesDemo_2() throws IOException {
		Properties prop = new Properties();
		//集合中的数据来自与文件,必须保证文件里面是键值对
		File file = new File("A:\\1111.txt");
		if(!file.exists()) {			//文件如果不存在就创建文件
			file.createNewFile();
		}
		FileInputStream fos = new FileInputStream("A:\\1111.txt");
		
		//存储数据
		prop.load(fos);	//把读取到的txt加入properties集合里面
		
		//修改文件
		prop.setProperty("wangwu", "16");
		
		//再使用流将修改后的数据存进去
		FileWriter fw = new FileWriter(file);
		prop.store(fw, "first-commit");
		
		
		prop.list(System.out);			//打印
		
	}

	private static void propertiesDemo_1() throws IOException {
		//创建一个properties对象
		Properties prop = new Properties();
		
		//储存元素
		prop.setProperty("zhangsan", "30");
		prop.setProperty("lisi", "40");
		prop.setProperty("wangwu", "50");
		prop.setProperty("zhaoliu", "60");
		prop.list(System.out);
		//想要把这些数据持久化关联数据  --存储到文件
		FileOutputStream fos = new FileOutputStream("A:\\1111.txt");
		
		//将集合数据存储起来
		prop.store(fos, "name+age");   //这里使用的编码是ISO-8859-1
		
				
	}

	private static void propertiesDemos() {
		//创建一个properties对象
		Properties prop = new Properties();
		
		//储存元素
		prop.setProperty("zhangsan", "30");
		prop.setProperty("lisi", "40");
		prop.setProperty("wangwu", "50");
		prop.setProperty("zhaoliu", "60");
		
		
		//修改元素
		
		prop.setProperty("wangwu",	"26");
		//取出所有元素
		Set<String> name = prop.stringPropertyNames();
		for (String string : name) {
			String value = prop.getProperty(string);
			System.out.println(string+"::"+value);
		}
		
	}
}
```

### 获取文件夹里面所有子目录里面的指定的文件并储存到指定文件

```java
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.FilenameFilter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class TestDemo {
//获取指定文件拓展名的文件(包含子目录里面)
//这些文件的绝对路径写入一个文件夹里面
	public static void main(String[] args) throws IOException {
		/*
		 * 必须进行深度遍历
		 * 要在遍历的过程中进行过滤,将符合条件的内容储存到一个容器里面
		 * 对容器中的内容进行遍历并写入文件中
		 */
		//指定查询的文件夹
		File file = new File("A:\\pro");
		//创建一个过滤器
		FilenameFilter ff = new FilenameFilter() {
			
			@Override
			public boolean accept(File dir, String name) {
				return  name.endsWith(".MYD");
			}
		};
		//创建一个存储符合条件的list集合
		List<File> list = new ArrayList<File>();
		demo(file,ff,list);
		File destfile = new File("A:\\1111.txt");  //指定存储的位置
		writerText(list,destfile);
	}
	
	//获取 过滤
	private static void demo(File file,FilenameFilter filter,List<File> list) {
		File[] files = file.listFiles();
		for (File f : files) {
			if(f.isDirectory()) {
				demo(f,filter,list);
			}else {
				//使用过滤规则进行过滤
				if(filter.accept(f, f.getName())) {
					//符合要求的文件就存入List
					list.add(f);
				}
			}
		}
	}
	//写入
	private static void writerText(List<File> list, File destfile) throws IOException {
		BufferedWriter fs = new BufferedWriter(new FileWriter(destfile));
		for (File file : list) {
			fs.write(file.getAbsolutePath());
			fs.newLine();
			fs.flush();
		}
		fs.close();
	}
}
```

