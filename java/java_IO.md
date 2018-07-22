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

 