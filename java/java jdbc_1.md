# JDBC

![](http://on7r0tqgu.bkt.clouddn.com/FkE-YI2ZBU-hC9qjxhcIlVWuOaB1.png )

> 加载驱动 > Connection创建连接,设置连接配置 > 编写sql语句 > 设置参数值 >  执行sql > 处理数据 > 关闭连接

早期SUN公司的天才们想编写一套可以连接天下所有数据库的API，但是当他们刚刚开始时就发现这是不可完成的任务，因为各个厂商的数据库服务器差异太大了。后来SUN开始与数据库厂商们讨论，最终得出的结论是，由SUN提供一套访问数据库的规范（就是一组接口），并提供连接数据库的协议标准，然后各个数据库厂商会遵循SUN的规范提供一套访问自己公司的数据库服务器的API出现。SUN提供的规范命名为JDBC，而各个厂商提供的，遵循了JDBC规范的，可以访问自己数据库的API被称之为驱动 



JDBC是接口，而JDBC驱动才是接口的实现，没有驱动无法完成数据库连接！每个数据库厂商都有自己的驱动，用来连接自己公司的数据库。

## JDBC核心类（接口)

JDBC中的核心类有：DriverManager、Connection、Statement，和ResultSet！

DriverManger（驱动管理器）的作用有两个：

- 注册驱动：这可以让JDBC知道要使用的是哪个驱动；
- 获取Connection：如果可以获取到Connection，那么说明已经与数据库连接上了。

 

- Connection对象表示连接，与数据库的通讯都是通过这个对象展开的：
- Connection最为重要的一个方法就是用来获取Statement对象；

 

- Statement是用来向数据库发送SQL语句的，这样数据库就会执行发送过来的SQL语句：
- void executeUpdate(String sql)：执行更新操作（insert、update、delete等）；
- ResultSet executeQuery(String sql)：执行查询操作，数据库在执行查询后会把查询结果，查询结果就是ResultSet；

 

ResultSet对象表示查询结果集，只有在执行查询操作后才会有结果集的产生。结果集是一个二维的表格，有行有列。操作结果集要学习移动ResultSet内部的“行光标”，以及获取当前行上的每一列上的数据：

- boolean next()：使“行光标”移动到下一行，并返回移动后的行是否存在；

- XXX getXXX(int col)：获取当前行指定列上的值，参数就是列数，列数从1开始，而不是0。

### 注册驱动

**Class.forName(“com.mysql.jdbc.Driver”)** 

DriverManager类的registerDriver()方法的参数是java.sql.Driver，但java.sql.Driver是一个接口，实现类由mysql驱动来提供，mysql驱动中的java.sql.Driver接口的实现类为com.mysql.jdbc.Driver！那么注册驱动的代码如下： 

```
DriverManager.registerDriver(new com.mysql.jdbc.Driver());
```

com.mysql.jdbc.Driver.java 

```java
public class Driver extends NonRegisteringDriver implements java.sql.Driver {
	static {
		try {
			java.sql.DriverManager.registerDriver(new Driver());
		} catch (SQLException E) {
			throw new RuntimeException("Can't register driver!");
		}
	}
……
}

```

com.mysql.jdbc.Driver类中的static块会创建本类对象，并注册到DriverManager中。这说明只要去加载com.mysql.jdbc.Driver类，那么就会执行这个static块，从而也就会把com.mysql.jdbc.Driver注册到DriverManager中，所以可以把**注册驱动类**的代码修改为**加载驱动类**。

Class.forName(“com.mysql.jdbc.Driver”);

### 获取连接 

获取连接的也只有一句代码：DriverManager.getConnection(url,username,password)，其中username和password是登录数据库的用户名和密码

JDBC规定url的格式由三部分组成，每个部分中间使用逗号分隔。

l  第一部分是jdbc，这是固定的；

l  第二部分是数据库名称，那么连接mysql数据库，第二部分当然是mysql了；

l  第三部分是由数据库厂商规定的，我们需要了解每个数据库厂商的要求，mysql的第三部分分别由数据库服务器的IP地址（localhost）、端口号（3306），以及DATABASE名称(mydb1)组成。

```java
Connection con = DriverManager.getConnection(“jdbc:mysql://localhost:3306/mydb1","root","123");
```

还可以在url中提供参数：

```
jdbc:mysql://localhost:3306/mydb1?useUnicode=true&characterEncoding=UTF8
```

### 获取Statement 

在得到Connectoin之后，说明已经与数据库连接上了，下面是通过Connection获取Statement对象的代码：

Statement stmt = con.createStatement();

Statement是用来向数据库发送要执行的SQL语句的！

### 发送SQL增、删、改语句 

String sql = “insert into user value(’zhangSan’, ’123’)”;

int m = stmt.executeUpdate(sql);

其中int类型的返回值表示执行这条SQL语句所影响的行数，我们知道，对insert来说，最后只能影响一行，而update和delete可能会影响0~n行。

如果SQL语句执行失败，那么executeUpdate()会抛出一个SQLException。

### 发送SQL查询语句

String sql = “select * from user”;

ResultSet rs = stmt.executeQuery(sql);

请注册，执行查询使用的不是executeUpdate()方法，而是executeQuery()方法。executeQuery()方法返回的是ResultSet，ResultSet封装了查询结果，我们称之为结果集。

### 读取结果集中的数据

ResultSet就是一张二维的表格，它内部有一个“行光标”，光标默认的位置在“第一行上方”，我们可以调用rs对象的next()方法把“行光标”向下移动一行，当第一次调用next()方法时，“行光标”就到了第一行记录的位置，这时就可以使用ResultSet提供的getXXX(int col)方法来获取指定列的数据了：

rs.next();//光标移动到第一行

rs.getInt(1);//获取第一行第一列的数据

当你使用rs.getInt(1)方法时，你必须可以肯定第1列的数据类型就是int类型，如果你不能肯定，那么最好使用rs.getObject(1)。在ResultSet类中提供了一系列的getXXX()方法，比较常用的方法有：

Object getObject(int col)

String getString(int col)

int getInt(int col)

double getDouble(int col)

### 关闭

与IO流一样，使用后的东西都需要关闭！关闭的顺序是先得到的后关闭，后得到的先关闭。

### 代码演示

```java
	public static Connection getConnection() throws Exception {
		Class.forName("com.mysql.jdbc.Driver");
		String url = "jdbc:mysql://localhost:3306/mydb1";
		return DriverManager.getConnection(url, "root", "123");
	}
	@Test
	public void insert() throws Exception {
		Connection con = getConnection();
		Statement stmt = con.createStatement();
		String sql = "insert into user values('zhangSan', '123')";
		stmt.executeUpdate(sql);
		System.out.println("插入成功！");
	}
	@Test
	public void update() throws Exception {
		Connection con = getConnection();
		Statement stmt = con.createStatement();
		String sql = "update user set password='456' where username='zhangSan'";
		stmt.executeUpdate(sql);
		System.out.println("修改成功！");
	}
	@Test
	public void delete() throws Exception {
		Connection con = getConnection();
		Statement stmt = con.createStatement();
		String sql = "delete from user where username='zhangSan'";
		stmt.executeUpdate(sql);
		System.out.println("删除成功！");
	}
}
@Test
	public void query() throws Exception {
		Connection con = getConnection();
		Statement stmt = con.createStatement();
		String sql = "select * from user";
		ResultSet rs = stmt.executeQuery(sql);
		while(rs.next()) {
			String username = rs.getString(1);
			String password = rs.getString(2);
			System.out.println(username + ", " + password);
		}
	}

```

### 规范化代码 

```sql
@Test
	public void query() {
		Connection con = null;
		Statement stmt = null;
		ResultSet rs = null;
 		try {
			con = getConnection(); 
			stmt = con.createStatement();
			String sql = "select * from user";
			rs = stmt.executeQuery(sql);
			while(rs.next()) {
				String username = rs.getString(1);
				String password = rs.getString(2);
				System.out.println(username + ", " + password);
			}
		} catch(Exception e) {
			throw new RuntimeException(e);
		} finally {
			try {
				if(rs != null) rs.close();
				if(stmt != null) stmt.close();
				if(con != null) con.close();
 			} catch(SQLException e) {}
		}
	}

```

## JDBC对象

常用对象

```
DriverManager
Connection
Statement
ResultSet
```

### DriverManager

只需要会用DriverManager的getConnection()方法即可：

1.      Class.forName(“com.mysql.jdbc.Driver”);//注册驱动
2.      String url = “jdbc:mysql://localhost:3306/mydb1”;
3.      String username = “root”;
4.      String password = “123”;
5.      Connection con = DriverManager.getConnection(url, username, password);



### Connection

Connection最为重要的方法就是获取Statement：

l  Statement stmt = con.createStatement(); 

 

后面在学习ResultSet方法时，还要学习一下下面的方法：

l  Statement stmt = con.createStatement(int,int[[c1\]](#_msocom_1) );

### Statement

Statement最为重要的方法是：

l  int executeUpdate (String sql)：执行更新操作，即执行insert、update、delete语句，其实这个方法也可以执行create table、alter table，以及drop table等语句

### ResultSet之获取列数据

可以通过next()方法使ResultSet的游标向下移动，当游标移动到你需要的行时，就需要来获取该行的数据了，ResultSet提供了一系列的获取列数据的方法：

l  String getString(int columnIndex)：获取指定列的String类型数据；

l  int getInt(int columnIndex)：获取指定列的int类型数据；

l  double getDouble(int columnIndex)：获取指定列的double类型数据；

l  boolean getBoolean(int columnIndex)：获取指定列的boolean类型数据；

l  Object getObject(int columnIndex)：获取指定列的Object类型的数据。

 

上面方法中，参数columnIndex表示列的索引，列索引从1开始，而不是0，这第一点与数组不同。如果你清楚当前列的数据类型，那么可以使用getInt()之类的方法来获取，如果你不清楚列的类型，那么你应该使用getObject()方法来获取。

ResultSet还提供了一套通过列名称来获取列数据的方法[[c1\]](#_msocom_1) ：

l  String getString(String columnName)：获取名称为columnName的列的String数据；

l  int getInt(String columnName)：获取名称为columnName的列的int数据；

l  double getDouble(String columnName)：获取名称为columnName的列的double数据；

l  boolean getBoolean(String columnName)：获取名称为columnName的列的boolean数据；

l  Object getObject(String columnName)：获取名称为columnName的列的Object数据；

------

## PreparedStatement

l  它是Statement接口的子接口；

l  强大之处：

Ø  防SQL攻击；

Ø  提高代码的可读性、可维护性；

Ø  提高效率！

l  学习PreparedStatement的用法：

Ø  如何得到PreparedStatement对象：

¨      给出SQL模板！

¨      调用Connection的PreparedStatement prepareStatement(String sql模板)；

¨      调用pstmt的setXxx()系列方法sql模板中的?赋值！

¨      调用pstmt的executeUpdate()或executeQuery()，但它的方法都没有参数。

l  预处理的原理

Ø  服务器的工作：

¨      校验sql语句的语法！

¨      编译：一个与函数相似的东西！

¨      执行：调用函数

Ø  PreparedStatement：

¨      前提：连接的数据库必须支持预处理！几乎没有不支持的！

¨      每个pstmt都与一个sql模板绑定在一起，先把sql模板给数据库，数据库先进行校验，再进行编译。执行时只是把参数传递过去而已！

若二次执行时，就不用再次校验语法，也不用再次编译！直接执行

PreparedStatement 

PreparedStatement是Statement的子接口，你可以使用PreparedStatement来替换Statement。

PreparedStatement的好处：

l  防止SQL攻击

l  提高代码的可读性，以可维护性；

l  提高效率

### PreparedStatement的使用

l  使用Connection的prepareStatement(String sql)：即创建它时就让它与一条SQL模板绑定；

l  调用PreparedStatement的setXXX()系列方法为问号设置值

l  调用executeUpdate()或executeQuery()方法，但要注意，调用没有参数的方法；



PreparedStatement对象独有的executeQuery()方法是没有参数的，而Statement的executeQuery()是需要参数（SQL语句）的。因为在创建PreparedStatement对象时已经让它与一条SQL模板绑定在一起了，所以在调用它的executeQuery()和executeUpdate()方法时就不再需要参数了。

PreparedStatement最大的好处就是在于重复使用同一模板，给予其不同的参数来重复的使用它。这才是真正提高效率的原因。

## JdbcUtils工具类

你也看到了，连接数据库的四大参数是：驱动类、url、用户名，以及密码。这些参数都与特定数据库关联，如果将来想更改数据库，那么就要去修改这四大参数，那么为了不去修改代码，我们写一个JdbcUtils类，让它从配置文件中读取配置参数，然后创建连接对象.

```java
public class JdbcUtils {
	private static final String dbconfig = "dbconfig.properties" ;
	private static Properties prop = new Properties() ;
	static {
		try {
			InputStream in = Thread.currentThread().getContextClassLoader().getResourceAsStream(dbconfig);
			prop.load(in);
			Class.forName(prop.getProperty("driverClassName"));
		} catch(IOException e) {
			throw new RuntimeException(e);
		}
	} 

	public static Connection getConnection () {
		try {
			return DriverManager.getConnection(prop.getProperty("url"),
					prop.getProperty("username"), prop.getProperty("password"));
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
}

```

```text
driverClassName=com.mysql.jdbc.Driver
url=jdbc:mysql://localhost:3306/mydb1?useUnicode=true&characterEncoding=UTF8
username=root
password=123
```







