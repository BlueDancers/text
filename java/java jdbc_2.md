# java jdbc_2

事务

> 就是多条语句一起执行,并且一旦失败了,就回滚到执行之前的状态

事务的四大特性(ACID)

- 原子性（Atomicity）：事务中所有操作是不可再分割的原子单位。事务中所有操作要么全部执行成功，要么全部执行失败。

- 一致性（Consistency）：事务执行后，数据库状态与其它业务规则保持一致。如转账业务，无论事务执行成功与否，参与转账的两个账号余额之和应该是不变的。
- 隔离性（Isolation）：隔离性是指在并发操作中，不同事务之间应该隔离开来，使每个并发中的事务不会相互干扰。
- 持久性（Durability）：一旦事务提交成功，事务中所有的数据操作都必须被持久化到数据库中，即使提交事务后，数据库马上崩溃，在数据库重启时，也必须能保证通过某种机制恢复数据。

------

MySQL中的事务

l  开启事务：**start transaction**；

l  结束事务：**commit**或**rollback**。

在执行SQL语句之前，先执行strat transaction，这就开启了一个事务（事务的起点），然后可以去执行多条SQL语句，最后要结束事务，commit表示提交，即事务中的多条SQL语句所做出的影响会持久化到数据库中。或者rollback，表示回滚，即回滚到事务的起点，之前做的所有操作都被撤消了

```mysql
START TRANSACTION;
UPDATE account SET balance=balance-10000 WHERE id=1;
UPDATE account SET balance=balance+10000 WHERE id=2;
ROLLBACK;
```

```
COMMIT;
```

## JDBC事务

l  setAutoCommit(boolean)：设置是否为自动提交事务，如果true（默认值就是true）表示自动提交，也就是每条执行的SQL语句都是一个单独的事务，如果设置false，那么就相当于开启了事务了；**con.setAutoCommit(false)**表示开启事务

l  commit()：提交结束事务；**con.commit();**表示提交事务

l  rollback()：回滚结束事务。**con.rollback();**表示回滚事务

```java
try {
  con.setAutoCommit(false);//开启事务…
  ….
  …
  con.commit();//try的最后提交事务
} catch() {
  con.rollback();//回滚事务
}
```



```java
	public void transfer(boolean b) {
		Connection con = null;
		PreparedStatement pstmt = null;
		
		try {
			con = JdbcUtils.getConnection();
			//手动提交
			con.setAutoCommit(false); 
			
			String sql = "update account set balance=balance+? where id=?";
			pstmt = con.prepareStatement(sql);
			
			//操作
			pstmt.setDouble(1, -10000);
			pstmt.setInt(2, 1);
			pstmt.executeUpdate();
			
			// 在两个操作中抛出异常
			if(b) {
				throw new Exception();
			}
 			
			pstmt.setDouble(1, 10000);
			pstmt.setInt(2, 2);
			pstmt.executeUpdate();
			
			//提交事务
			con.commit(); 
		} catch(Exception e) {
			//回滚事务
			if(con != null) {
				try {
					con.rollback(); 
				} catch(SQLException ex) {}
			}
			throw new RuntimeException(e);
		} finally {
			//关闭
			JdbcUtils.close(con, pstmt);
		}
	}

```

# 数据库连接池

DBCP

```java
public void fun1() throws SQLException {
		BasicDataSource ds = new BasicDataSource();
		ds.setUsername("root");
		ds.setPassword("123");
		ds.setUrl("jdbc:mysql://localhost:3306/mydb1");
		ds.setDriverClassName("com.mysql.jdbc.Driver");
 		
		ds.setMaxActive(20); 
		ds.setMaxIdle(10); 
		ds.setInitialSize(10) ;
		ds.setMinIdle(2) ;
		ds.setMaxWait(1000) ;
		
		Connection con = ds.getConnection();
		System.out.println(con.getClass().getName());
		con.close() ;
	}

```

```bash
#基本配置
driverClassName=com.mysql.jdbc.Driver
url=jdbc:mysql://localhost:3306/mydb1
username=root
password=123

#初始化池大小，即一开始池中就会有10个连接对象
默认值为0
initialSize=0

#最大连接数，如果设置maxActive=50时，池中最多可以有50个连接，当然这50个连接中包含被使用的和没被使用的（空闲）
#你是一个包工头，你一共有50个工人，但这50个工人有的当前正在工作，有的正在空闲
#默认值为8，如果设置为非正数，表示没有限制！即无限大
maxActive=8

#最大空闲连接
#当设置maxIdle=30时，你是包工头，你允许最多有20个工人空闲，如果现在有30个空闲工人，那么要开除10个
#默认值为8，如果设置为负数，表示没有限制！即无限大
maxIdle=8

#最小空闲连接
#如果设置minIdel=5时，如果你的工人只有3个空闲，那么你需要再去招2个回来，保证有5个空闲工人
#默认值为0
minIdle=0

#最大等待时间
#当设置maxWait=5000时，现在你的工作都出去工作了，又来了一个工作，需要一个工人。
#这时就要等待有工人回来，如果等待5000毫秒还没回来，那就抛出异常
#没有工人的原因：最多工人数为50，已经有50个工人了，不能再招了，但50人都出去工作了。
#默认值为-1，表示无限期等待，不会抛出异常。
maxWait=-1

#连接属性
#就是原来放在url后面的参数，可以使用connectionProperties来指定
#如果已经在url后面指定了，那么就不用在这里指定了。
#useServerPrepStmts=true，MySQL开启预编译功能
#cachePrepStmts=true，MySQL开启缓存PreparedStatement功能，
#prepStmtCacheSize=50，缓存PreparedStatement的上限
#prepStmtCacheSqlLimit=300，当SQL模板长度大于300时，就不再缓存它
connectionProperties=useUnicode=true;characterEncoding=UTF8;useServerPrepStmts=true;cachePrepStmts=true;prepStmtCacheSize=50;prepStmtCacheSqlLimit=300

#连接的默认提交方式
#默认值为true
defaultAutoCommit=true

#连接是否为只读连接
#Connection有一对方法：setReadOnly(boolean)和isReadOnly()
#如果是只读连接，那么你只能用这个连接来做查询
#指定连接为只读是为了优化！这个优化与并发事务相关！
#如果两个并发事务，对同一行记录做增、删、改操作，是不是一定要隔离它们啊？
#如果两个并发事务，对同一行记录只做查询操作，那么是不是就不用隔离它们了？
#如果没有指定这个属性值，那么是否为只读连接，这就由驱动自己来决定了。即Connection的实现类自己来决定！
defaultReadOnly=false

#指定事务的事务隔离级别
#可选值：NONE,READ_UNCOMMITTED, READ_COMMITTED, REPEATABLE_READ, SERIALIZABLE
#如果没有指定，那么由驱动中的Connection实现类自己来决定
defaultTransactionIsolation=REPEATABLE_READ

```

## C3P0

```java
public void fun1() throws PropertyVetoException, SQLException {
		ComboPooledDataSource ds = new ComboPooledDataSource();
		ds.setJdbcUrl("jdbc:mysql://localhost:3306/mydb1");
		ds.setUser("root");
		ds.setPassword("123");
		ds.setDriverClass("com.mysql.jdbc.Driver");
 		
		ds.setAcquireIncrement(5) ;
		ds.setInitialPoolSize(20) ;
		ds.setMinPoolSize(2) ;
		ds.setMaxPoolSize(50) ;
		
		Connection con = ds.getConnection();
		System.out.println(con);
		con.close();
	}
```

也可以使用配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<c3p0-config>
	<default-config> 
		<property name="jdbcUrl">jdbc:mysql://localhost:3306/mydb1</property>
		<property name="driverClass">com.mysql.jdbc.Driver</property>
		<property name="user">root</property>
		<property name="password">123</property>
		<property name="acquireIncrement">3</property>
		<property name="initialPoolSize">10</property>
		<property name="minPoolSize">2</property>
		<property name="maxPoolSize">10</property>
	</default-config>
	<named-config name="oracle-config"> 
		<property name="jdbcUrl">jdbc:mysql://localhost:3306/mydb1</property>
		<property name="driverClass">com.mysql.jdbc.Driver</property>
		<property name="user">root</property>
		<property name="password">123</property>
		<property name="acquireIncrement">3</property>
		<property name="initialPoolSize">10</property>
		<property name="minPoolSize">2</property>
		<property name="maxPoolSize">10</property>
	</named-config>
</c3p0-config>

```

使用外部配置文件 java代码就这么写

```
public void fun2() throws PropertyVetoException, SQLException {
		ComboPooledDataSource ds = new ComboPooledDataSource(); 
		Connection con = ds.getConnection();
		System.out.println(con);
		con.close();
	}
```

# DBUtils

DBUtils是Apache Commons组件中的一员，开源免费！

DBUtils是对JDBC的简单封装，但是它还是被很多公司使用！

DBUtils的Jar包：dbutils.jar

l  QueryRunner：

Ø  update()：执行insert、update、delete；

Ø  query()：执行select语句；

Ø  batch()：执行批处理。

```java
@Test
	public void fun1() throws SQLException {
		QueryRunner qr = new QueryRunner();
		String sql = "insert into user values(?,?,?)";
		qr.update(JdbcUtils.getConnection(), sql, "u1", "zhangSan", "123");
	}

```

