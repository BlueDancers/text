# XML

可扩展标记型语言

xml主要功能是存储数据

xml的应用

- 不同系统之间的传输数据
- 用来表示生活中有关系的数据
- 书写配置文件

xml的文档声明

​	创建一个文件 后缀名是.xml

​	必须有文档声明

```xml
<?xml version="1.0" encoding="gbk"?>
<preson>
  <name>张三</name>
  <age>18</age>
</preson>
```

属性: 

- version xml的版本
- encoding xml的编码 gbk utf-8 iso8859-1(不包含中文)
- standalone 是否需要依赖其他的文件 yes/no(不常用)

### XML元素命名(定义)的规定

标签定义有开始必须要有结束：<person></person>

标签没有内容，可以在标签内结束 ; <aa/>

标签嵌套必须合理

一个xml中，只能有一个根标签，其他标签都是这个标签下面的标签

在xml中把空格和换行都当成内容来解析，

```xml
<aa>1111111</aa> 

<aa>
	11111111111
</aa>
这两段代码含义是不一样的!!
```

xml标签可以是中文

xml中标签的名称规则

1. xml代码区分大小写
2. xml的标签不能以数字和下划线(_)开头
3. xml的标签不能以xml、XML、Xml等开头
4. xml的标签不能包含空格和冒号

### XML的属性的定义

html是标记型文档，可以有属性

xml也是标记型文档，可以有属性

 <person id1="aaa" id2="bbb"></person>

属性定义的要求

 	1. 一个标签上可以有多个属性 <person id1="aaa" id2="bbb"></person>
		2. 属性名称不能相同 <person id1="aaa" id1="bbb"></person>：这个是不正确，不能有两个id1
		3. 属性名称和属性值之间使用= ，属性值使用`引号`包起来 （可以是单引号，也可以是双引号 ）
		4. xml属性的名称规范和元素的名称规范一致

### XML中的注释

写法 <!-- xml的注释 -->

注意的地方

注释不能嵌套  <!-- <!-- <sex>nv</sex>--> -->  错的

 注释也不能放到第一行，第一行第一列必须放文档声明

### XML中显示特殊字符

如果想要在xml中现在 a<b ,不能正常显示，因为把<当做标签

如果就想要显示，需要对特殊字符 < 进行转义

比如

```
<    &lt;
>    &gt;
```

### CDATA区

可以解决多个字符都需要转义的操作

写法
<![CDATA[ 内容  ]]>

实例: <![CDATA[ <b>if(a<b && b<c && d>f) {}</b> ]]>

把特殊字符，当做文本内容，而不是标签

### PI指令

可以在xml中设置样式

写法： <?xml-stylesheet type="text/css" href="css的路径"?>

设置样式，只能对英文标签名称起作用，对于中文的标签名称不起作用的。

### xml的约束

为什么需要约束？

```text
比如现在定义一个person的xml文件，只想要这个文件里面保存人的信息，比如name age等，但是如果在xml文件中
	写了一个标签<猫>，发现可以正常显示，因为符合语法规范。但是猫肯定不是人的信息，xml的标签是自定义的，需要技术来
	规定xml中只能出现的元素，这个时候需要约束。
```

xml的约束的技术 ： dtd约束 和 schema约束

### dtd的快速入门

 创建一个文件 后缀名 .dtd

1. 看xml中有多少个元素 ，有几个元素，在dtd文件中写几个 <!ELEMENT>
2. 判断元素是简单元素还是复杂元素
   1.  复杂元素：有子元素的元素   <!ELEMENT 元素名称 (子元素)>
   2. 简单元素：没有子元素            <!ELEMENT 元素名称 (#PCDATA)>
3. 需要在xml文件中引入dtd文件
   1. <!DOCTYPE 根元素名称 SYSTEM "dtd文件的路径">

打开xml文件使用浏览器打开的，浏览器只负责校验xml的语法，不负责校验约束

如果想要校验xml的约束，需要使用工具（eclipse工具）

打开myeclipse开发工具

```
创建一个项目 data
在data的src目录下面创建一个xml文件和一个dtd文件
当xml中引入dtd文件之后，比如只能出现name age，多写了一个a，会提示出错
```

### dtd的三种引入方式

1. 引入外部的dtd文件

   ​	<!DOCTYPE 根元素名称 SYSTEM "dtd路径">

2. 使用内部的dtd文件

   <!DOCTYPE 根元素名称 [
   	<!ELEMENT person (name,age)>
   	<!ELEMENT name (#PCDATA)>
   	<!ELEMENT age (#PCDATA)>
   ]>
   3.使用外部的dtd文件（网络上的dtd文件）
   	<!DOCTYPE 根元素 PUBLIC "DTD名称" "DTD文档的URL">

   ​	后面学到框架 struts2 使用配置文件 使用 外部的dtd文件

   <!DOCTYPE struts PUBLIC   "-//Apache Software Foundation//DTD Struts Configuration 2.0//EN"    

   "http://struts.apache.org/dtds/struts-2.0.dtd">

### 使用dtd定义元素

语法： <!ELEMENT 元素名 约束>

简单元素：没有子元素的元素

   - <!ELEMENT name (#PCDATA)>
   -  (#PCDATA): 约束name是字符串类型
   - EMPTY : 元素为空（没有内容）
   - ANY:任意

复杂元素：

- <!ELEMENT person (name,age,sex,school)>  		表示元素出现的顺序
-  <!ELEMENT person (name|age|sex|school)>        表示元素只能出现其中的任意一个

 表示子元素出现的次数

+ +: 表示一次或者多次
+ ?：表示零次或者一次
+ *：表示零次或者多次

### 使用dtd定义属性

 语法： <!ATTLIST 元素名称 属性名称 属性类型 属性的约束 >

​		<!ATTLIST school ID1 CDATA #REQUIRED>

元素名称 : 要定义的元素

属性名称 : 你需要定义的属性名称

属性类型 :  

- CDATA: 字符串

  <!ATTLIST school ID1 CDATA #REQUIRED>

- 枚举 ： 表示只能在一定的范围内出现值，但是只能每次出现其中的一个

  <!ATTLIST sex ID1 (AA|BB|CC) #REQUIRED>

- ID: 值只能是字母或者下划线开头

  <!ATTLIST name ID3 ID #REQUIRED>

属性的约束:

|#REQUIRED：属性必须存在

|#IMPLIED：属性可有可无

|#FIXED: 表示一个固定值 #FIXED "AAA"	<!ATTLIST school ID1 CDATA #FIXED "aa">



### 实体的定义

<!ENTITY 实体名称 "实体的值">

<!ENTITY TEST "HAHAHEHE">

使用实体 &实体名称;  比如 &TEST;

 **定义实体需要写在内部dtd里面**

### xml的解析的简介（写到java代码）

xml是标记型文档

js使用dom解析标记型文档

- 根据html的层级结构，在内存中分配一个树形结构，把html的标签，属性和文本都封装成             document对象、element对象、属性对象、文本对象、Node节点对象

xml的解析方式（技术）：dom 和 sax

 dom解析和sax解析区别：

dom方式解析

​	根据xml的层级结构在内存中分配一个树形结构，把xml的标签，属性和文本都封装成对象

​	缺点：如果文件过大，造成内存溢出

​	优点：很方便实现增删改操作

sax方式解析

 采用事件驱动，边读边解析

​	 从上到下，一行一行的解析，解析到某一个对象，返回对象名称

 缺点：不能实现增删改操作

 优点：如果文件过大，不会造成内存溢出，方便实现查询操作

想要解析xml，首先需要解析器

不同的公司和组织提供了 针对dom和sax方式的解析器，通过api方式提供

sun公司提供了针对dom和sax解析器  jaxp

dom4j组织，针对dom和sax解析器    dom4j（**实际开发常用**）



