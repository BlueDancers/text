# mysql使用指南

## DDL -- Data Definition Language 数据库定义语言 

##### 查询当前所有数据库

```sql
show databases;
```

##### 进入/切换数据库

```
use base;
```

##### 创建数据库

```
create database base;
```

##### 删除数据库

```
drop database base;
```

### mysql数据库表的数据类型

也就是创建表的时候的数据类型

> **int**: 整形
>
> 使用场景: 用于储存数值

> **double**: 浮点型 例如 double(5,2) 表示最多五位数 其中必须两位小数,及最大值为999.99
>
> 使用场景: 用于储存小数类型的值

> **decimal**: 浮点型,多用于在表示金额上使用的类型,因为不会出现进度丢失
>
> 使用场景: 储存精细数据

> **char**: 固定长度字符串类型 char(255) 长度不足补足到指定长度 过长报错
>
> 使用场景: 储存长度不变的数据 例如 身份证号 手机号 等等

> **varchar**: 可变长度字符串类型 varchar(65535) 
>
> 使用场景: 变化的数据 (会在查询的时候 使用长度去记录长度值,所以会浪费性能,所以固长性能更好) 

mysql独有的数据类型

> text: 存储可变的文本信息 例如小说
>
>  blob: 存储可变的二进制类型  例如图片转二进制存储

### 表的使用命令

##### 查看当前数据库的表

```
show tables;
```

##### 创建表

首先进入指定需要创建表数据库

> 创建一个 名叫mytable的表 
>
> 表结构为:
>
> - 字段为定长11字节的number储存学号
> - 字段为变长20字节的name 储蓄姓名
> - 字段为int的age 储蓄年龄
> - 字段为变长10字节的sex 储蓄性别

```sql
use base;
create table mytable (
    number char(11),
    name varchar(20),
    age int,
    sex varchar(10)
);
```

##### 查看表的建表语句

```sql
show create table mytable
```

##### 查询表结构

```
desc mytable;
```

##### 删除表

```
drop table mytable;
```

### 修改表

> **注意: 所有的修改表操作 命令前面都是 alter table 表名**
>
> 这里还是很语义化的 alter 意为改变 modify意为修改

##### 修改 -- 给现有的表添加一列(字段)

```sql
alter table mytable add(
	education varchar(50)
);
//修改表mytable 添加字段education指定类型为varchar(50)
```

##### 修改 -- 给现有的表修改列(字段)类型

```sql
alter table mytable modify education varchar(20);
```

##### 修改 -- 删除指定的列(字段)

```sql
alter table mytable drop education;
```

##### 修改 -- 修改表名称

```sql
alter table mytable rename to tables;
```

##### 修改 -- 数据库编码

```sql
alter database dase character set utf8;
```
## DML -- Data Manipulation Language 数据操纵语言

##### 插入数据

在数据里面所有的字符串类型必须是**单引号**

> 格式 insert into tables(? , ? , ? ,?) values('?' , '?' , ? , '?' );

```sql
insert into tables(number,name,age,sex) values('0000001','zhangsan',18,'man');
```

插入部分列 -- 表格允许的空值的情况下

```sql
insert into tables(number,name) values('0000002','lisi');
```

不给出插入列 - 默认插入所有列

> insert into tables values( '?' , '?' , ?, '?' );

```sql
insert into tables values('0000003','xiaosan',29,'woman');
```

##### 修改数据

> 这样不指定条件的修改会将表里面的所有字段为age都变成了20 千万注意不能不指定条件

```sql
update tables set age=20;
```

更新 number为000001的 age 变成30

```sql
update tables set age=30 where number='0000001';
```

更新 number为0000002 或者 name 为xiaosan 的 sex为 woman

```sql
update tables set sex='woman' where number='0000002' or name='xiaosan';
```

更新 age在15 到 48之间的 age+1

```sql
update tables set age=age+1 where age > 15 and age < 48;
```

更新 age 在15(包括) 到40(包括)之间的 age+1

```sql
update tables set age=age+1 where age between 15 and 40;
```

使用**in**语法实现多数据改动

```sql
update tables set age=36 where name in('lisi','xiaosan');
```

针对表中数据为null,应该如何更改

```sql
 update tables set age=30 where age=null;        //这样是错误的 因为age=null会返回false!!
--------------------------------------------
 update tables set age=30 where age is null;	 //is 判断才是正确的
```

#####  删除数据

删除表

````sql
delete from tables;
````

删除表列

```sql
delete from tables where age=29;
```

## DCL -- Data Control Language 数据库控制语言

##### 创建用户

> 创建用户vkcyan密码为000000指定只能通过localhost登录

```sql
create user vkcyan@localhost identified by '000000';
```

##### 用户授权

> 将base这个数据库里面的所有表的所有权限都给用户vkcyan

```sql
grant all on base.* to vkcyan@localhost;
```

> 权限有很多 create alter drop insert update delete select 

##### 取消授权

> 取消vkcyan用户的 base数据库下所有表的删除权限

```sql
revoke delete on base.* from vkcyan@localhost;
```

##### 查看用户权限

```sql
show grants for vkcyan@localhost;
```

##### 删除用户

```sql
drop user vkcyan@localhost;
```

## DQL --  Data Query Language 数据查询语言DQL

##### 查询数据

> * 代表查询全部 

```sql
select * from emp;
```

> 可以指定查询的列

```sql
select ename,comm from emp;
```

> 查询数据去除相同的行   `distinct关键字为去除重复数据`

```sql
select distinct comm from emp; 
```

##### 列运算 - 数字

>  查询emp表的所有信息 并且查询sal列数据*1.5 的数据  

```
select sal,sal*1.5 from emp;
```

> 假如是无法运算的值,会将数据按0处理

```
select ename,ename+100 from emp;

+--------+-----------+
| ename  | ename+100 |
+--------+-----------+
| 甘宁   |       100 |
| 黛绮丝 |       100 |
| 殷天正 |       100 |
| 刘备   |       100 |
| 谢逊   |       100 |
| 关羽   |       100 |
| 张飞   |       100 |
| 诸葛亮 |       100 |
| 曾阿牛 |       100 |
| 韦一笑 |       100 |
| 周泰   |       100 |
| 程普   |       100 |
| 庞统   |       100 |
| 黄盖   |       100 |
+--------+-----------+
```

>  列与列相加 这里注意 假如相加字段里面有null运算结果会变成null

```sql
select sal,comm,sal+comm from emp;  //错误写法
+----------+----------+----------+
| sal      | comm     | sal+comm |
+----------+----------+----------+
|  8000.00 |     NULL |     NULL |
| 16000.00 |  3000.00 | 19000.00 |
| 12500.00 |  5000.00 | 17500.00 |
| 29750.00 |     NULL |     NULL |
| 12500.00 | 14000.00 | 26500.00 |
| 28500.00 |     NULL |     NULL |
| 24500.00 |     NULL |     NULL |
| 30000.00 |     NULL |     NULL |
| 50000.00 |     NULL |     NULL |
| 15000.00 |     0.00 | 15000.00 |
| 11000.00 |     NULL |     NULL |
|  9500.00 |     NULL |     NULL |
| 30000.00 |     NULL |     NULL |
| 13000.00 |     NULL |     NULL |
+----------+----------+----------+
//可以使用ifnull去处理null的数值
mysql> select sal,comm,sal+ifnull(comm,0) from emp;
+----------+----------+--------------------+
| sal      | comm     | sal+ifnull(comm,0) |
+----------+----------+--------------------+
|  8000.00 |     NULL |            8000.00 |
| 16000.00 |  3000.00 |           19000.00 |
| 12500.00 |  5000.00 |           17500.00 |
| 29750.00 |     NULL |           29750.00 |
| 12500.00 | 14000.00 |           26500.00 |
| 28500.00 |     NULL |           28500.00 |
| 24500.00 |     NULL |           24500.00 |
| 30000.00 |     NULL |           30000.00 |
| 50000.00 |     NULL |           50000.00 |
| 15000.00 |     0.00 |           15000.00 |
| 11000.00 |     NULL |           11000.00 |
|  9500.00 |     NULL |            9500.00 |
| 30000.00 |     NULL |           30000.00 |
| 13000.00 |     NULL |           13000.00 |
+----------+----------+--------------------+
```

> 查询字段将null替换成任意值

```sql
mysql> select ename,ifnull(mgr,'boss')from emp;
+--------+--------------------+
| ename  | ifnull(mgr,'boss') |
+--------+--------------------+
| 甘宁   | 1013               |
| 黛绮丝 | 1006               |
| 殷天正 | 1006               |
| 刘备   | 1009               |
| 谢逊   | 1006               |
| 关羽   | 1009               |
| 张飞   | 1009               |
| 诸葛亮 | 1004               |
| 曾阿牛 | boss               |
| 韦一笑 | 1006               |
| 周泰   | 1008               |
| 程普   | 1006               |
| 庞统   | 1004               |
| 黄盖   | 1007               |
+--------+--------------------+
```

##### 列运算 - 文字

>  concat 连接字符串
>
> as 起别名

```sql
mysql> select concat ('我叫',ename,' ,我的工作是',job,',我的工资是',sal) as '描述' from emp;
+-------------------------------------------------+
| 描述                                            |
+-------------------------------------------------+
| 我叫甘宁 ,我的工作是文员,我的工资是8000.00      |
| 我叫黛绮丝 ,我的工作是销售员,我的工资是16000.00 |
| 我叫殷天正 ,我的工作是销售员,我的工资是12500.00 |
| 我叫刘备 ,我的工作是经理,我的工资是29750.00     |
| 我叫谢逊 ,我的工作是销售员,我的工资是12500.00   |
| 我叫关羽 ,我的工作是经理,我的工资是28500.00     |
| 我叫张飞 ,我的工作是经理,我的工资是24500.00     |
| 我叫诸葛亮 ,我的工作是分析师,我的工资是30000.00 |
| 我叫曾阿牛 ,我的工作是董事长,我的工资是50000.00 |
| 我叫韦一笑 ,我的工作是销售员,我的工资是15000.00 |
| 我叫周泰 ,我的工作是文员,我的工资是11000.00     |
| 我叫程普 ,我的工作是文员,我的工资是9500.00      |
| 我叫庞统 ,我的工作是分析师,我的工资是30000.00   |
| 我叫黄盖 ,我的工作是文员,我的工资是13000.00     |
+-------------------------------------------------+
```

> 其别名 as   要注意! 一般情况下 as 省略也可以运行

```sql
mysql> select ename as 姓名,job as 工作 from emp;
+--------+--------+
| 姓名   | 工作   |
+--------+--------+
| 甘宁   | 文员   |
| 黛绮丝 | 销售员 |
| 殷天正 | 销售员 |
| 程普   | 文员   |
| 庞统   | 分析师 |
| 黄盖   | 文员   |
+--------+--------+
mysql> select ename 姓名,job 工作 from emp;
+--------+--------+
| 姓名   | 工作   |
+--------+--------+
| 甘宁   | 文员   |
| 黛绮丝 | 销售员 |
| 殷天正 | 销售员 |
| 程普   | 文员   |
| 庞统   | 分析师 |
| 黄盖   | 文员   |
+--------+--------+
```

##### 条件查询

> 查询sal字段大于20000的

```sql
select * from emp where sal>20000;
```

> 查询comm字段不为null的

```sql
select * from emp where comm is not null;
```

> 查询sal找20000到30000之间的

```
select * from emp where sal between 20000 and 30000;
```

> 查询是字段job 是经理和分析师的

```
 select * from emp where job in ('经理','分析师');
```

模糊查询

> 查询姓张的两个字的

```sql
select * from emp where ename like '张_';
```

> 查询名字是两个字的  //下划线表示匹配1个字符

```sql
select * from emp where ename like '__';
```

> 查询以job列某个字符结尾的指定列  //%表示匹配多个字符

```
select * from emp where job like '%员';
select * from emp where job like '%';
```

##### 排序

> 按指定字段排序(默认升序)

```sql
select * from emp order by sal;
//在emp表里面 按 order 来进行排序
```

> 升序

```sql
select * from emp order by sal asc;
```

> 降序

```sql
select * from emp order by sal desc;
```

> 假如一列比较相同的情况下 可以在进行比较

```sql
select * from emp order by sal asc,comm desc;
//假如sal字段相同就降序比较comm字段
```

##### 聚合函数

> 算出一列的有效行数遇到null就跳过

```sql
select count(*) from emp;
+----------+
| count(*) |
+----------+
|       14 |
+----------+
```

> 算出一列的值 遇到null会跳过

````
mysql> select sum(sal) from emp;
+-----------+
| sum(sal)  |
+-----------+
| 290250.00 |
+-----------+
````

> 算出一列的最大值

```sql
mysql> select max(sal) from emp;
+----------+
| max(sal) |
+----------+
| 50000.00 |
+----------+
```

> 算出一列的最小值

````sql
mysql> select min(sal) from emp;
+----------+
| min(sal) |
+----------+
|  8000.00 |
+----------+
````

> 算出平均值

```sql
mysql> select avg(sal) from emp;
+--------------+
| avg(sal)     |
+--------------+
| 20732.142857 |
+--------------+
```

> 使用 as 拼接

```sql
mysql> select count(*) as 人数,sum(sal) as 工资总和,max(sal) as 最高工资,min(sal) as 最低工资,
avg(sal) as 平均工资 from emp;
+------+-----------+----------+----------+--------------+
| 人数 | 工资总和  | 最高工资 | 最低工资 | 平均工资     	 |
+------+-----------+----------+----------+--------------+
|   14 | 290250.00 | 50000.00 |  8000.00 | 20732.142857 |
+------+-----------+----------+----------+--------------+
```

##### 分组查询

> 查询个职位的数量,以及最高工资  这里注意除了分组列 其他都是聚合函数

```sql
select job,count(*),max(sal) from emp group by job;
+--------+----------+----------+
| job    | count(*) | max(sal) |
+--------+----------+----------+
| 分析师 |        2 | 30000.00 |
| 文员   |        4 | 13000.00 |
| 经理   |        3 | 29750.00 |
| 董事长 |        1 | 50000.00 |
| 销售员 |        4 | 16000.00 |
+--------+----------+----------+
```

> 按组查询emp表 deptnn字段  sal大于1500的全部数量,并按组分好

```sql
mysql> select deptno,count(*) from emp where sal>15000 group by deptno;
+--------+----------+
| deptno | count(*) |
+--------+----------+
|     10 |        2 |
|     20 |        3 |
|     30 |        2 |
+--------+----------+
```

>  按组查询emp表 deptnn字段  sal大于1500的全部数量,并按组分好 分好后把大于2的留下

```sql
mysql> select deptno,count(*) from emp where sal>15000 group by deptno having count(*)>2;
+--------+----------+
| deptno | count(*) |
+--------+----------+
|     20 |        3 |
+--------+----------+
```

##### limit子句(方言) 

> 主要用于分页  limit 0,5 从0开始打印5行数据

```sql
mysql> select * from emp limit 0,5;                                             
+-------+--------+--------+------+------------+----------+----------+--------+  
| empno | ename  | job    | mgr  | hiredate   | sal      | COMM     | deptno |  
+-------+--------+--------+------+------------+----------+----------+--------+  
|  1001 | 甘宁   | 文员   | 1013 | 2000-12-17 |  8000.00 |     NULL |     20 |      
|  1002 | 黛绮丝 | 销售员 | 1006 | 2001-02-20 | 16000.00 |  3000.00 |     30 |        
|  1003 | 殷天正 | 销售员 | 1006 | 2001-02-22 | 12500.00 |  5000.00 |     30 |        
|  1004 | 刘备   | 经理   | 1009 | 2001-04-02 | 29750.00 |     NULL |     20 |      
|  1005 | 谢逊   | 销售员 | 1006 | 2001-09-28 | 12500.00 | 14000.00 |     30 |       
+-------+--------+--------+------+------------+----------+----------+--------+  
```



例如一页数据为10  查询第三页

select * from  limit 20 ,10

公式:  (查询页 - 1)  * 每页记录数































