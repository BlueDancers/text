# java遍历文件目录

```java
package File;

import java.io.File;

public class FileTest {
	/*
	 * 需求 : 对指定目录进行深度遍历
	 */
	public static void main(String[] args) {
		File file = new File("G:\\学习视频\\云计算\\docker");
		listAll(file,0);
	}

	private static void listAll(File file,int level) {
		System.out.println(getspace(level)+file.getName());    	//打印递归获取的文件名称
		level++;												//递归走一次,代表子目录 空格数量+1
		File[] files = file.listFiles();   						//获取子目录
		for (int i = 0; i < files.length; i++) {
			if(files[i].isDirectory()) {
				//是文件夹就继续遍历
				listAll(files[i],level);
			}else {
				//不是文件夹 就直接输出
				System.out.println(getspace(level)+files[i]);
			}
			
		}
	}

	private static String getspace(int level) {
		StringBuilder sb = new StringBuilder();
		sb.append("|--");
		for (int i = 0; i < level; i++) {
			sb.append("--");
		}
		return sb.toString();
	}

}
```

