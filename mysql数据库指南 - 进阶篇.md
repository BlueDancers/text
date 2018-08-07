# mysql数据库指南 - 进阶篇

## 备份与恢复

### 备份

> 备份数据库内容 并不是备份数据库

#### 在Navicat Premium里面

直接双击数据库 右击数据库点击-> 转储sql文件 即可保存

#### 在命令行里面

> 将root用户的base表到导出到a盘名为a.sql的为文件里面
>
> 注意: 登录状态下无法进行操作!

```sql
mysqldump -uroot -p000000 base>A:/a.sql
```

> mysqldump: [Warning] Using a password on the command line interface can be insecure.
>
> 可能出现这句话 这是警告说 在命令行使用密码不安全,可以忽略

### 恢复

#### 命令行

##### 没有登录的状态下

```sql
mysql -uroot -p000000 base<A:/a.sql
```

##### 登录状态下

```sql
create database base;
use base;
source a:/a.sql;  //即为导入
```

## 约束

### 主键约束

主键约束: 唯一标识 **非空** **唯一** **被引用**

当表的每一列被指定为主键的时候,该列不可以为空,不可以出现唯一的值

#### 创建表指定主键

##### 指定主键 - 方式1

```sql
create table emp (
	empno int primary key,
	ename varchar(50)
);
```

##### 指定主键 - 方式2

```sql
create table emp (
    empno int,
    ename varchar(50),
    primary key(empno)
);
```

> 这个错误就是主键出现了重复的意思

```
ERROR 1062 (23000): Duplicate entry 'x' for key 'PRIMARY'
```

##### 修改表时指定主键

```
create table emp (
    empno int,
    ename varchar(50)
);
alter table emp add primary key(empno);
```

#### 删除主键

```sql
alter table emp drop primary key;
```

#### 主键自增长

 > auto_increment 类型必须int

```sql
create table stu (
    sid int primary key auto_increment,
    sname varchar(50),
    age int
);
insert into stu values(null,'haha',18);
```

### 非空约束

> not null

```
create table stu (
    sid int primary key auto_increment,
    sname varchar(50) not null,
    age int
);
```

### 唯一约束

> unique

```
create table stu (
    sid int primary key auto_increment,
    sname varchar(50) not null unique,
    age int
);
```

### 外键约束

#### 创建表添加外键约束

> 外键必须是每一个表的主键的值(外键要引用主键)
>
> 外键可以重复
>
> 外键可以为空
>
> 一张表可以有多个外键

```sql
//创建主表
create table dept (
	deptno int primary key auto_increment,
	dname varchar(50)
)default charset=utf8;
//创建从表
create table emp (
	empno int primary key auto_increment,
	ename varchar(50),
	don int,
	constraint wj_emp_dept foreign key(don) references dept(deptno)
	//约束 xxx(外键名称) 外键(don) 引用  dept表的deptno列
);
```

#### 已创建的表添加外键约束

```sql
create table emp (
	empno int primary key auto_increment,
	ename varchar(50),
	don int
);
alter table emp add constraint wj_emp_dept foreign key(don) references dept(deptno);
改变 表 emp 添加 约束 (外键名称) 外键(don) 引用 dept表的deptno字段
```

#### 已创建的表删除外键约束

```sql
alter table emp drop foreign key wj_emp_dept;
```

### 一对一关系

```
//主表
create table hasband (
	hid int primary key auto_increment,
	hname varchar(50)
) default charset=utf8;
//从表
create table wife(
	wid int primary key auto_increment,
	wname varchar(50),
	constraint fk_wife_hasband foreign key(wid) references hasband(hid)
) default charset=utf8;
//这里的wid即是主键也是外键 一对一的关键
/*
1. 非空
2. 唯一
3. 引用hid
*/
```

### 多对多关系

```
//创建主表
create table student(
	sid int primary key auto_increment,
	sname varchar(50)
);
create table teacher(
	tid int primary key auto_increment,
	tname varchar(50)
);
//管理表
create table stu_sea(
	sid int,
	tid int,
	constraint fk_student foreign key(sid) references student(sid),
	constraint fk_teacher foreign key(tid) references teacher(tid)
);

```

多对多 两个主表 在创建中间表 最后将关系都写在中间表里面

## 多表查询

### 合并结果集

> 要求两个**结果集**(查询结果)完全相同

```
create table ab values(1,''
1)(;
	a int,
	b varchar(50)
);
insert into ab values(1,'1');
insert into ab values(2,'2');
insert into ab values(3,'3');
create table cd (
	c int,
	d varchar(50)
);
insert into cd values(3,'3');
insert into cd values(4,'4');
insert into cd values(5,'5');

//合并结果集 (表头由第一个查询的表定)
select * from ab union all select * from cd;
+------+------+
| a    | b    |
+------+------+
|    1 | 1    |
|    2 | 2    |
|    3 | 3    |
|    3 | 3    |
|    4 | 4    |
|    5 | 5    |
+------+------+
//不加all会将重复的过滤掉
mysql> select * from ab union select * from cd;
+------+------+
| a    | b    |
+------+------+
|    1 | 1    |
|    2 | 2    |
|    3 | 3    |
|    4 | 4    |
|    5 | 5    |
+------+------+
```

### 连接查询

#### 方言

> 格式: **select * from 表1 as 别名1,表2 as 别名2 where 别名1.xx=别名2.xx**

笛卡尔积

```sql
select * from emp,dept; 
//会emp每一列与dept表连接
```

> 添加条件 去除不匹配数据

```
select * from emp,dept where emp.deptno = dept.deptno;
```

> 打印指定数据

```sql
mysql> select emp.ename,emp.sal,dept.dname from emp,dept where emp.deptno = dept.deptno;
+--------+----------+--------+
| ename  | sal      | dname  |
+--------+----------+--------+
| 甘宁   |  8000.00 | 学工部 |
| 黛绮丝 | 16000.00 | 销售部 |
| 殷天正 | 12500.00 | 销售部 |
| 刘备   | 29750.00 | 学工部 |
| 谢逊   | 12500.00 | 销售部 |
| 关羽   | 28500.00 | 销售部 |
| 张飞   | 24500.00 | 教研部 |
| 诸葛亮 | 30000.00 | 学工部 |
| 曾阿牛 | 50000.00 | 教研部 |
| 韦一笑 | 15000.00 | 销售部 |
| 周泰   | 11000.00 | 学工部 |
| 程普   |  9500.00 | 销售部 |
| 庞统   | 30000.00 | 学工部 |
| 黄盖   | 13000.00 | 教研部 |
+--------+----------+--------+
```

> 给表起别名

```sql
select e.ename,e.sal,d.dname from emp as e,dept as d where e.deptno = d.deptno;
```

#### 标准

> inner join

````sql
select e.ename,e.sal,d.dname from emp as e inner join dept as d on e.deptno = d.deptno;
````

#### 自然

>  natural join 标准的简化写法 自动匹配相同的字段

```sql
select e.ename,e.sal,d.dname from emp as e natural join dept d;
```

##### 外连接

> 外连接有一主一次 左外即左表为主
>
> 这里以emp表为主,name主表中所有记录都无论条件是否满足,都会打印出来
>
> 不满足条件会用null作为右表的补位

###### 左连接

```sql
select e.ename,e.sal,d.dname 
from emp as e left outer join dept d 
on e.deptno=d.deptno;
```

###### 右链接

```sql
select e.ename,e.sal,d.dname
from emp as e right outer join dept d
on e.deptno=d.deptno;
```

> 假如决定null数据不合适可以使用ifnull去替换

```sql
select ifnull(e.ename,'无员工') ename,e.sal,d.dname from emp as e right outer join dept d on e.deptno=d.deptno;
+--------+----------+--------+
| ename  | sal      | dname  |
+--------+----------+--------+
| 甘宁   |  8000.00 | 学工部 |
| 黛绮丝 | 16000.00 | 销售部 |
| 殷天正 | 12500.00 | 销售部 |
| 刘备   | 29750.00 | 学工部 |
| 谢逊   | 12500.00 | 销售部 |
| 关羽   | 28500.00 | 销售部 |
| 张飞   | 24500.00 | 教研部 |
| 诸葛亮 | 30000.00 | 学工部 |
| 曾阿牛 | 50000.00 | 教研部 |
| 韦一笑 | 15000.00 | 销售部 |
| 周泰   | 11000.00 | 学工部 |
| 程普   |  9500.00 | 销售部 |
| 庞统   | 30000.00 | 学工部 |
| 黄盖   | 13000.00 | 教研部 |
| 无员工 |     NULL | 财务部 |
+--------+----------+--------+
```

###### 全连接

> 使用关键字 union合并结果集

```
select e.ename,e.sal,d.dname 
from emp as e left outer join dept d 
on e.deptno=d.deptno
union
select e.ename,e.sal,d.dname
from emp as e right outer join dept d
on e.deptno=d.deptno;
```

### 子查询

> 查询sal字段最高的行的详细信息

```sql
mysql> select * from emp where sal=(select max(sal) from emp);
+-------+--------+--------+------+------------+----------+------+--------+
| empno | ename  | job    | mgr  | hiredate   | sal      | COMM | deptno |
+-------+--------+--------+------+------------+----------+------+--------+
|  1009 | 曾阿牛 | 董事长 | NULL | 2001-11-17 | 50000.00 | NULL |     10 |
+-------+--------+--------+------+------------+----------+------+--------+
```

### 实战

```sql
/*创建部门表*/
CREATE TABLE dept(
	deptno		INT 	PRIMARY KEY,
	dname		VARCHAR(50),
	loc 		VARCHAR(50)
) default charset=utf8;

/*创建雇员表*/
CREATE TABLE emp(
	empno		INT 	PRIMARY KEY,
	ename		VARCHAR(50),
	job		VARCHAR(50),
	mgr		INT,
	hiredate	DATE,
	sal		DECIMAL(7,2),
	COMM 		DECIMAL(7,2),
	deptno		INT,
	CONSTRAINT fk_emp FOREIGN KEY(mgr) REFERENCES emp(empno)
) default charset=utf8;

/*创建工资等级表*/
CREATE TABLE salgrade(
	grade		INT 	PRIMARY KEY,
	losal		INT,
	hisal		INT
) default charset=utf8;
/*插入dept表数据*/
INSERT INTO dept VALUES (10, '教研部', '北京');
INSERT INTO dept VALUES (20, '学工部', '上海');
INSERT INTO dept VALUES (30, '销售部', '广州');
INSERT INTO dept VALUES (40, '财务部', '武汉');

/*插入emp表数据*/
INSERT INTO emp VALUES (1009, '曾阿牛', '董事长', NULL, '2001-11-17', 50000, NULL, 10);
INSERT INTO emp VALUES (1004, '刘备', '经理', 1009, '2001-04-02', 29750, NULL, 20);
INSERT INTO emp VALUES (1006, '关羽', '经理', 1009, '2001-05-01', 28500, NULL, 30);
INSERT INTO emp VALUES (1007, '张飞', '经理', 1009, '2001-09-01', 24500, NULL, 10);
INSERT INTO emp VALUES (1008, '诸葛亮', '分析师', 1004, '2007-04-19', 30000, NULL, 20);
INSERT INTO emp VALUES (1013, '庞统', '分析师', 1004, '2001-12-03', 30000, NULL, 20);
INSERT INTO emp VALUES (1002, '黛绮丝', '销售员', 1006, '2001-02-20', 16000, 3000, 30);
INSERT INTO emp VALUES (1003, '殷天正', '销售员', 1006, '2001-02-22', 12500, 5000, 30);
INSERT INTO emp VALUES (1005, '谢逊', '销售员', 1006, '2001-09-28', 12500, 14000, 30);
INSERT INTO emp VALUES (1010, '韦一笑', '销售员', 1006, '2001-09-08', 15000, 0, 30);
INSERT INTO emp VALUES (1012, '程普', '文员', 1006, '2001-12-03', 9500, NULL, 30);
INSERT INTO emp VALUES (1014, '黄盖', '文员', 1007, '2002-01-23', 13000, NULL, 10);
INSERT INTO emp VALUES (1011, '周泰', '文员', 1008, '2007-05-23', 11000, NULL, 20);
INSERT INTO emp VALUES (1001, '甘宁', '文员', 1013, '2000-12-17', 8000, NULL, 20);


/*插入salgrade表数据*/
INSERT INTO salgrade VALUES (1, 7000, 12000);
INSERT INTO salgrade VALUES (2, 12010, 14000);
INSERT INTO salgrade VALUES (3, 14010, 20000);
INSERT INTO salgrade VALUES (4, 20010, 30000);
INSERT INTO salgrade VALUES (5, 30010, 99990);
```



> 查询至少有一个员工的部门,显示部门编号,部门名称,部门位置,部门人数

````sql
select d.*,z1.cou
from dept d,(select deptno,count(*) cou from emp group by deptno) z1  //笛卡尔积
where d.deptno=z1.deptno;
````

> 列出所有员工的姓名及其直接上司的名字

```sql
//首先使用笛卡尔积来统一匹配
select * from emp e,emp p;
在去把员工的上司编号与上司编号去匹配 加个别名
select e.ename as '上司',p.ename as '员工' from emp e,emp p where e.empno=p.mgr;
+--------+--------+
| 上司   | 员工   |
+--------+--------+
| 庞统   | 甘宁   |
| 关羽   | 黛绮丝 |
| 关羽   | 殷天正 |
| 曾阿牛 | 刘备   |
| 关羽   | 谢逊   |
| 曾阿牛 | 关羽   |
| 曾阿牛 | 张飞   |
| 刘备   | 诸葛亮 |
| 关羽   | 韦一笑 |
| 诸葛亮 | 周泰   |
| 关羽   | 程普   |
| 刘备   | 庞统   |
| 张飞   | 黄盖   |
+--------+--------+
```

> 列出受雇日期早于直接上级的所有员工及编号.姓名,部门

```sql
//首先 列出所有员工受雇时间,员工编号 和领导受雇时间
select e.empno,e.ename,e.hiredate,p.ename,p.hiredate from emp e,emp p where e.mgr=p.empno;
+-------+--------+------------+--------+------------+
| empno | ename  | hiredate   | ename  | hiredate   |
+-------+--------+------------+--------+------------+
|  1001 | 甘宁   | 2000-12-17 | 庞统   | 2001-12-03 |
|  1002 | 黛绮丝 | 2001-02-20 | 关羽   | 2001-05-01 |
|  1003 | 殷天正 | 2001-02-22 | 关羽   | 2001-05-01 |
|  1004 | 刘备   | 2001-04-02 | 曾阿牛 | 2001-11-17 |
|  1005 | 谢逊   | 2001-09-28 | 关羽   | 2001-05-01 |
|  1006 | 关羽   | 2001-05-01 | 曾阿牛 | 2001-11-17 |
|  1007 | 张飞   | 2001-09-01 | 曾阿牛 | 2001-11-17 |
|  1008 | 诸葛亮 | 2007-04-19 | 刘备   | 2001-04-02 |
|  1010 | 韦一笑 | 2001-09-08 | 关羽   | 2001-05-01 |
|  1011 | 周泰   | 2007-05-23 | 诸葛亮 | 2007-04-19 |
|  1012 | 程普   | 2001-12-03 | 关羽   | 2001-05-01 |
|  1013 | 庞统   | 2001-12-03 | 刘备   | 2001-04-02 |
|  1014 | 黄盖   | 2002-01-23 | 张飞   | 2001-09-01 |
+-------+--------+------------+--------+------------+
//将受雇时间早于上级的过滤下来
select e.empno,e.ename,e.hiredate,p.ename,p.hiredate from emp e,emp p where e.mgr=p.empno and e.hiredate<p.hiredate;
+-------+--------+------------+--------+------------+
| empno | ename  | hiredate   | ename  | hiredate   |
+-------+--------+------------+--------+------------+
|  1001 | 甘宁   | 2000-12-17 | 庞统   | 2001-12-03 |
|  1002 | 黛绮丝 | 2001-02-20 | 关羽   | 2001-05-01 |
|  1003 | 殷天正 | 2001-02-22 | 关羽   | 2001-05-01 |
|  1004 | 刘备   | 2001-04-02 | 曾阿牛 | 2001-11-17 |
|  1006 | 关羽   | 2001-05-01 | 曾阿牛 | 2001-11-17 |
|  1007 | 张飞   | 2001-09-01 | 曾阿牛 | 2001-11-17 |
+-------+--------+------------+--------+------------+
//最后获取部门名称  判断人员表的部门号与部门表的部门号匹配即可 把没用的去掉
mysql> select e.empno '编号',e.ename '员工',d.dname '部门' from emp e,emp p,dept d whe
re e.mgr=p.empno and e.hiredate<p.hiredate and e.deptno=d.deptno;
+------+--------+--------+
| 编号 | 员工   | 部门   |
+------+--------+--------+
| 1001 | 甘宁   | 学工部 |
| 1002 | 黛绮丝 | 销售部 |
| 1003 | 殷天正 | 销售部 |
| 1004 | 刘备   | 学工部 |
| 1006 | 关羽   | 销售部 |
| 1007 | 张飞   | 教研部 |
+------+--------+--------+
```

> 列出部门名称和这些部门的员工信息 同时列出没有员工的部门

````sql
//首先获取员工信息对应的部门名称
mysql> select e.*,d.dname from dept d,emp e where e.deptno=d.deptno;
+-------+--------+--------+------+------------+----------+----------+--------+--------+
| empno | ename  | job    | mgr  | hiredate   | sal      | COMM     | deptno | dname  |
+-------+--------+--------+------+------------+----------+----------+--------+--------+
|  1001 | 甘宁   | 文员   | 1013 | 2000-12-17 |  8000.00 |     NULL |     20 | 学工部 |
|  1002 | 黛绮丝 | 销售员 | 1006 | 2001-02-20 | 16000.00 |  3000.00 |     30 | 销售部 |
|  1003 | 殷天正 | 销售员 | 1006 | 2001-02-22 | 12500.00 |  5000.00 |     30 | 销售部 |
|  1004 | 刘备   | 经理   | 1009 | 2001-04-02 | 29750.00 |     NULL |     20 | 学工部 |
|  1005 | 谢逊   | 销售员 | 1006 | 2001-09-28 | 12500.00 | 14000.00 |     30 | 销售部 |
|  1006 | 关羽   | 经理   | 1009 | 2001-05-01 | 28500.00 |     NULL |     30 | 销售部 |
|  1007 | 张飞   | 经理   | 1009 | 2001-09-01 | 24500.00 |     NULL |     10 | 教研部 |
|  1008 | 诸葛亮 | 分析师 | 1004 | 2007-04-19 | 30000.00 |     NULL |     20 | 学工部 |
|  1009 | 曾阿牛 | 董事长 | NULL | 2001-11-17 | 50000.00 |     NULL |     10 | 教研部 |
|  1010 | 韦一笑 | 销售员 | 1006 | 2001-09-08 | 15000.00 |     0.00 |     30 | 销售部 |
|  1011 | 周泰   | 文员   | 1008 | 2007-05-23 | 11000.00 |     NULL |     20 | 学工部 |
|  1012 | 程普   | 文员   | 1006 | 2001-12-03 |  9500.00 |     NULL |     30 | 销售部 |
|  1013 | 庞统   | 分析师 | 1004 | 2001-12-03 | 30000.00 |     NULL |     20 | 学工部 |
|  1014 | 黄盖   | 文员   | 1007 | 2002-01-23 | 13000.00 |     NULL |     10 | 教研部 |
+-------+--------+--------+------+------------+----------+----------+--------+--------+
//这里要求没用员工的部门也列出来,随意要使用右连接
mysql> select e.*,d.dname from emp e right outer join dept d on e.deptno=d.deptno;
+-------+--------+--------+------+------------+----------+----------+--------+--------+
| empno | ename  | job    | mgr  | hiredate   | sal      | COMM     | deptno | dname  |
+-------+--------+--------+------+------------+----------+----------+--------+--------+
|  1001 | 甘宁   | 文员   | 1013 | 2000-12-17 |  8000.00 |     NULL |     20 | 学工部 |
|  1002 | 黛绮丝 | 销售员 | 1006 | 2001-02-20 | 16000.00 |  3000.00 |     30 | 销售部 |
|  1003 | 殷天正 | 销售员 | 1006 | 2001-02-22 | 12500.00 |  5000.00 |     30 | 销售部 |
|  1004 | 刘备   | 经理   | 1009 | 2001-04-02 | 29750.00 |     NULL |     20 | 学工部 |
|  1005 | 谢逊   | 销售员 | 1006 | 2001-09-28 | 12500.00 | 14000.00 |     30 | 销售部 |
|  1006 | 关羽   | 经理   | 1009 | 2001-05-01 | 28500.00 |     NULL |     30 | 销售部 |
|  1007 | 张飞   | 经理   | 1009 | 2001-09-01 | 24500.00 |     NULL |     10 | 教研部 |
|  1008 | 诸葛亮 | 分析师 | 1004 | 2007-04-19 | 30000.00 |     NULL |     20 | 学工部 |
|  1009 | 曾阿牛 | 董事长 | NULL | 2001-11-17 | 50000.00 |     NULL |     10 | 教研部 |
|  1010 | 韦一笑 | 销售员 | 1006 | 2001-09-08 | 15000.00 |     0.00 |     30 | 销售部 |
|  1011 | 周泰   | 文员   | 1008 | 2007-05-23 | 11000.00 |     NULL |     20 | 学工部 |
|  1012 | 程普   | 文员   | 1006 | 2001-12-03 |  9500.00 |     NULL |     30 | 销售部 |
|  1013 | 庞统   | 分析师 | 1004 | 2001-12-03 | 30000.00 |     NULL |     20 | 学工部 |
|  1014 | 黄盖   | 文员   | 1007 | 2002-01-23 | 13000.00 |     NULL |     10 | 教研部 |
|  NULL | NULL   | NULL   | NULL | NULL       |     NULL |     NULL |   NULL | 财务部 |
+-------+--------+--------+------+------------+----------+----------+--------+--------+
````

> 列出薪资大于15000的各种工作以及从事此工作的员工人数

```sql
//首先获取各种工作
select job,count(*) from emp group by job;
+--------+----------+
| job    | count(*) |
+--------+----------+
| 分析师 |        2 |
| 文员   |        4 |
| 经理   |        3 |
| 董事长 |        1 |
| 销售员 |        4 |
+--------+----------+
这里列出薪资大于15000,是对分组后的人进行条件查询,所以使用having
select job,count(*) from emp group by job having min(sal) >15000;
+--------+----------+
| job    | count(*) |
+--------+----------+
| 分析师 |        2 |
| 经理   |        3 |
| 董事长 |        1 |
+--------+----------+
```

> 列出在销售部工作的员工姓名,不能通过员工编号获取

```sql
//假设知道员工编号
mysql> select ename,deptno from emp where deptno='30';
+--------+--------+
| ename  | deptno |
+--------+--------+
| 黛绮丝 |     30 |
| 殷天正 |     30 |
| 谢逊   |     30 |
| 关羽   |     30 |
| 韦一笑 |     30 |
| 程普   |     30 |
+--------+--------+
//这里通过子查询去dept表获取销售部的编号
mysql> select ename from emp where deptno=(select deptno from dept where dname='销售部');
+--------+ 
| ename  | 
+--------+ 
| 黛绮丝 |    
| 殷天正 |    
| 谢逊   |   
| 关羽   |   
| 韦一笑 |    
| 程普   |   
+--------+ 
```

> 列出薪资高于平均薪资的员工信息,所在部门,上级领导,工资等级

```sql
//首先查出高于平均工资的
select * from emp where sal>(select avg(sal) from emp);
+-------+--------+--------+------+------------+----------+------+--------+
| empno | ename  | job    | mgr  | hiredate   | sal      | COMM | deptno |
+-------+--------+--------+------+------------+----------+------+--------+
|  1004 | 刘备   | 经理   | 1009 | 2001-04-02 | 29750.00 | NULL |     20 |
|  1006 | 关羽   | 经理   | 1009 | 2001-05-01 | 28500.00 | NULL |     30 |
|  1007 | 张飞   | 经理   | 1009 | 2001-09-01 | 24500.00 | NULL |     10 |
|  1008 | 诸葛亮 | 分析师 | 1004 | 2007-04-19 | 30000.00 | NULL |     20 |
|  1009 | 曾阿牛 | 董事长 | NULL | 2001-11-17 | 50000.00 | NULL |     10 |
|  1013 | 庞统   | 分析师 | 1004 | 2001-12-03 | 30000.00 | NULL |     20 |
+-------+--------+--------+------+------------+----------+------+--------+
//加上部门名称
select e.*,d.dname 
from emp e,dept d 
where sal>(select avg(sal) from emp) and e.deptno=d.deptno;
+-------+--------+--------+------+------------+----------+------+--------+--------+
| empno | ename  | job    | mgr  | hiredate   | sal      | COMM | deptno | dname  |
+-------+--------+--------+------+------------+----------+------+--------+--------+
|  1004 | 刘备   | 经理   | 1009 | 2001-04-02 | 29750.00 | NULL |     20 | 学工部 |
|  1006 | 关羽   | 经理   | 1009 | 2001-05-01 | 28500.00 | NULL |     30 | 销售部 |
|  1007 | 张飞   | 经理   | 1009 | 2001-09-01 | 24500.00 | NULL |     10 | 教研部 |
|  1008 | 诸葛亮 | 分析师 | 1004 | 2007-04-19 | 30000.00 | NULL |     20 | 学工部 |
|  1009 | 曾阿牛 | 董事长 | NULL | 2001-11-17 | 50000.00 | NULL |     10 | 教研部 |
|  1013 | 庞统   | 分析师 | 1004 | 2001-12-03 | 30000.00 | NULL |     20 | 学工部 |
+-------+--------+--------+------+------------+----------+------+--------+--------+
//加上级领导
select e.*,d.dname,p.ename
from emp e,dept d,emp p
where e.sal>(select avg(sal) from emp) and e.deptno=d.deptno and e.mgr=p.empno;
+-------+--------+--------+------+------------+----------+------+--------+--------+--------+
| empno | ename  | job    | mgr  | hiredate   | sal      | COMM | deptno | dname  | ename  |
+-------+--------+--------+------+------------+----------+------+--------+--------+--------+
|  1004 | 刘备   | 经理   | 1009 | 2001-04-02 | 29750.00 | NULL |     20 | 学工部 | 曾阿牛 |
|  1006 | 关羽   | 经理   | 1009 | 2001-05-01 | 28500.00 | NULL |     30 | 销售部 | 曾阿牛 |
|  1007 | 张飞   | 经理   | 1009 | 2001-09-01 | 24500.00 | NULL |     10 | 教研部 | 曾阿牛 |
|  1008 | 诸葛亮 | 分析师 | 1004 | 2007-04-19 | 30000.00 | NULL |     20 | 学工部 | 刘备   |
|  1013 | 庞统   | 分析师 | 1004 | 2001-12-03 | 30000.00 | NULL |     20 | 学工部 | 刘备   |
+-------+--------+--------+------+------------+----------+------+--------+--------+--------+
//加薪资等级
select e.*,d.dname,p.ename,s.grade '薪资等级'
from emp e,dept d,emp p,salgrade s
where e.sal>(select avg(sal) from emp) and e.deptno=d.deptno and e.mgr=p.empno and e.sal between s.losal and s.hisal;
+-------+--------+--------+------+------------+----------+------+--------+--------+--------+----------+
| empno | ename  | job    | mgr  | hiredate   | sal      | COMM | deptno | dname  | ename  | 薪资等级 |
+-------+--------+--------+------+------------+----------+------+--------+--------+--------+----------+
|  1004 | 刘备   | 经理   | 1009 | 2001-04-02 | 29750.00 | NULL |     20 | 学工部 | 曾阿牛 |        4 |
|  1006 | 关羽   | 经理   | 1009 | 2001-05-01 | 28500.00 | NULL |     30 | 销售部 | 曾阿牛 |        4 |
|  1007 | 张飞   | 经理   | 1009 | 2001-09-01 | 24500.00 | NULL |     10 | 教研部 | 曾阿牛 |        4 |
|  1008 | 诸葛亮 | 分析师 | 1004 | 2007-04-19 | 30000.00 | NULL |     20 | 学工部 | 刘备   |        4 |
|  1013 | 庞统   | 分析师 | 1004 | 2001-12-03 | 30000.00 | NULL |     20 | 学工部 | 刘备   |        4 |
+-------+--------+--------+------+------------+----------+------+--------+--------+--------+----------+
//最后把高于平均薪资的员工信息,但是因为上级领导被过滤掉的通过左连接显示出来
select e.*,d.dname,p.ename,s.grade '薪资等级'
from 
	emp e left outer join dept d on e.deptno=d.deptno
	left outer join emp p on e.mgr=p.empno
	left outer join salgrade s on e.sal between s.losal and s.hisal
where e.sal>(select avg(sal) from emp);
+-------+--------+--------+------+------------+----------+------+--------+--------+--------+----------+
| empno | ename  | job    | mgr  | hiredate   | sal      | COMM | deptno | dname  | ename  | 薪资等级 |
+-------+--------+--------+------+------------+----------+------+--------+--------+--------+----------+
|  1007 | 张飞   | 经理   | 1009 | 2001-09-01 | 24500.00 | NULL |     10 | 教研部 | 曾阿牛 |        4 |
|  1004 | 刘备   | 经理   | 1009 | 2001-04-02 | 29750.00 | NULL |     20 | 学工部 | 曾阿牛 |        4 |
|  1008 | 诸葛亮 | 分析师 | 1004 | 2007-04-19 | 30000.00 | NULL |     20 | 学工部 | 刘备   |        4 |
|  1013 | 庞统   | 分析师 | 1004 | 2001-12-03 | 30000.00 | NULL |     20 | 学工部 | 刘备   |        4 |
|  1006 | 关羽   | 经理   | 1009 | 2001-05-01 | 28500.00 | NULL |     30 | 销售部 | 曾阿牛 |        4 |
|  1009 | 曾阿牛 | 董事长 | NULL | 2001-11-17 | 50000.00 | NULL |     10 | 教研部 | NULL   |        5 |
+-------+--------+--------+------+------------+----------+------+--------+--------+--------+----------+
```

> 列出与庞统从事相同工作的所有员工及部门名称

```sql
//首先获取与庞统从事相同工作的所有员工
mysql> select * from emp  where job=(select job from emp where ename='庞统');
+-------+--------+--------+------+------------+----------+------+--------+
| empno | ename  | job    | mgr  | hiredate   | sal      | COMM | deptno |
+-------+--------+--------+------+------------+----------+------+--------+
|  1008 | 诸葛亮 | 分析师 | 1004 | 2007-04-19 | 30000.00 | NULL |     20  |
|  1013 | 庞统   | 分析师 | 1004 | 2001-12-03 | 30000.00 | NULL |     20  |
+-------+--------+--------+------+------------+----------+------+--------+
//查询部门
select e.*,d.dname from emp e,dept d where job=(select job from emp where ename='庞统') and e.deptno=d.deptno;
+-------+--------+--------+------+------------+----------+------+--------+--------+
| empno | ename  | job    | mgr  | hiredate   | sal      | COMM | deptno | dname  |
+-------+--------+--------+------+------------+----------+------+--------+--------+
|  1008 | 诸葛亮 | 分析师 | 1004 | 2007-04-19 | 30000.00 | NULL |     20 | 学工部 |
|  1013 | 庞统   | 分析师 | 1004 | 2001-12-03 | 30000.00 | NULL |     20 | 学工部 |
+-------+--------+--------+------+------------+----------+------+--------+--------+
```

> 列出薪资高于30部门的所有员工的姓名,薪资,部门名称

```sql
mysql> select e.ename,e.sal,d.dname from emp e,dept d where e.deptno=d.deptno and sal> (select max(sal) from emp where deptno='30');
+--------+----------+--------+
| ename  | sal      | dname  |
+--------+----------+--------+
| 刘备   | 29750.00 | 学工部 |
| 诸葛亮 | 30000.00 | 学工部 |
| 曾阿牛 | 50000.00 | 教研部 |
| 庞统   | 30000.00 | 学工部 |
+--------+----------+--------+
```

## 事务

事务的特征: 

原子性 : 事务里面的操作不可分割

唯一性 : 事务执行前后 数据库总体状态保持一致,例如转账啊业务,参数转账的两个账户余额之和保持不变

隔离性 : 在并发操作,不同的事务应该隔离开,让每个并发互不干扰

持久性 : 一旦事务提交成功,事务中所有的数据库都必须被持久化到数据库.即使提交数据发生异常,数据库重启的时候也会恢复数据

##### 开启事务

```
start transaction;
```

结束事务 

```
commit  	//成功
rollback  	//失败
```









