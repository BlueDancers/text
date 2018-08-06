# 数据库5.7-jdbc版本8.0.12驱动连接

现在版本的jdbc连接方式和原来不一样了,

假如你使用**String driver = "com.mysql.jdbc.Driver";**

会抛出错误:

````
Loading class `com.mysql.jdbc.Driver'. This is deprecated. The new driver class is `com.mysql.cj.jdbc.Driver'. The driver is automatically registered via the SPI and manual loading of the driver class is generally unnecessary.
````

现在连接方式变了

修改方式两种

1. String driver = "com.mysql.cj.jdbc.Driver";
2. 去除Class.forName(driver);  字段

```sql
package wu.vkcyan.jdbc;

import java.sql.*;

import org.junit.Test;

import com.mysql.cj.jdbc.Driver;
public class jdbc_1 {
	@Test
	public void Test() throws SQLException, ClassNotFoundException {
		String driver = "com.mysql.cj.jdbc.Driver";
		String URL = "jdbc:mysql://localhost/exam?useSSL=false&serverTimezone = UTC&";
		/*
		 * 所有的java.sql.Driver实现类.都被提供static快.块类代码就会把自己注册了
		 * jdbc4.0后.每个jar包中,META-INF目录下都service/java.sql.Driver文件里面内容是com.mysql.cj.jdbc.Driver,每次启动jdbc会自动扫描,添加,所以可以不写
		 */
			Class.forName(driver);    //注册启动类 ,也就是下面的代码的反射,他里面有个静态函数,自己就把自己注册了
		
//			Driver driver= new Driver();
//			DriverManager.registerDriver(driver);  
			
			Connection con=DriverManager.getConnection(URL,"root","000000"); 
			System.out.println(con);
	}
}
```

