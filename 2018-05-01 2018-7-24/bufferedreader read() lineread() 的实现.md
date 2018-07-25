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

