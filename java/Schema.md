# Schema

dtd语法： <!ELEMENT 元素名称 约束>

### schema符合xml的语法,Schema特点

- 一个xml中可以有多个schema，多个schema使用名称空间区分（类似于java包名）
- dtd里面有PCDATA类型，但是在schema里面可以支持更多的数据类型
- 比如 年龄 只能是整数，在schema可以直接定义一个整数类型
-  schema语法更加复杂，schema目前不能替代dtd

schema的快速入门

创建一个schema文件 后缀名是 .xsd

根节点 <schema>

 在schema文件里面
		** 属性  xmlns="http://www.w3.org/2001/XMLSchema"
			- 表示当前xml文件是一个约束文件
		** targetNamespace="http://www.example.org/1_Schema"
			- 使用schema约束文件，直接通过这个地址引入约束文件
		** elementFormDefault="qualified 表示代码可以使用



## 如何书写

### 在Schema文件里面

1. 看xml中有多少个元素

				<element>

2. 看简单元素和复杂元素

				* 如果复杂元素
				<complexType>
					<sequence>
						子元素
					</sequence>
			</complexType>

3. 简单元素，写在复杂元素的

				<element name="person">
			<complexType>
			<sequence>
					<element name="name" type="string"></element>
					<element name="age" type="int"></element>
			</sequence>
			</complexType>
			</element>



### 在被约束文件里面引入约束文件

<person xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"   

后面一定要加-instance 表示被约束文件
			xmlns="http://www.example.org/1_Schema" 
			xsi:schemaLocation="http://www.example.org/1_Schema 1.xsd">  //1.xsd是约束文件

			** xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
				-- 表示xml是一个被约束文件
			** xmlns="http://www.example.org/1_Schema"
				-- 是约束文档里面 targetNamespace
			** xsi:schemaLocation="http://www.example.org/1_Schema 1.xsd">
				-- targetNamespace 空格  约束文档的地址路径
```xml
<element name="person">
		<complexType>
			<sequence>     <!-- 表示元素的出现顺序 -->
			<!-- <all>    表示元素只能出现一次 -->
			<!-- <choice> 只能出现这两个里面的一个 -->
			 
				<element name="name" type="string" maxOccurs="unbounded"></element>  <!-- maxOccurs="unbounded"表现出现次数可以多个 -->
				<element name="age" type="int"></element>	
			<!-- </choice> -->
			<!-- </all>	 -->
			</sequence>
			<attribute name="id" type="int" use="required"></attribute>
		</complexType>
	</element>
```

<sequence>：表示元素的出现的顺序
<all>: 元素只能出现一次
<choice>：元素只能出现其中的一个
maxOccurs="unbounded"： 表示元素的出现的次数
<any></any>:表示任意元素

 可以约束属性

写在复杂元素里面

写在　</complexType>之前

	<attribute name="id1" type="int" use="required"></attribute>
			- name: 属性名称
			- type：属性类型 int stirng
			- use：属性是否必须出现 required
复杂的schema约束

```xml
<company xmlns = "http://www.example.org/company"
	xmlns:dept="http://www.example.org/department"
	xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://www.example.org/company company.xsd http://www.example.org/department department.xsd" 
```

 引入多个schema文件，可以给每个起一个别名

```xml
<employee age="30">
		<!-- 部门名称 --> 
		<dept:name>100</dept:name>
		* 想要引入部门的约束文件里面的name，使用部门的别名 detp:元素名称
		<!-- 员工名称 -->
		<name>王晓晓</name>   
</employee>
```







