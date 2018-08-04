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
select e.ename,e.sal,d.dname from emp as e,dept as d where e.deptno = d.deptno
```

#### 标准











