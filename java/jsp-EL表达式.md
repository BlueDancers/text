# js-EL表达式

### JSTL描述

apache的东西，依赖EL

使用jstl需要导入jstl1.2.jar

四大库：

> core：核心库，重点

> fmt：格式化：日期、数

> sql：过时
>
> xml：过时

### 导入标签库

* jar包
* 在jsp页面中：<%@taglib prefix="前缀" uri="路径"%>

#### core --> c标签！

```java
<c:set var="a" value="哈哈哈哈" scope="request"></c:set>
	<c:remove var="a"/>
	<c:out value="${a}" default="提示"/>
	<c:url value="/index.jsp">
		<c:param name="username" value="张三">	<!-- 给定参数 -->
		</c:param>
	</c:url><!-- 输出上下文对象 -->
	<!--<a href='<c:url value="/index.jsp"></c:url>'>点击跳转</a>   可以嵌套写 -->
	
	<c:set var="a" value="98"></c:set>
	<c:set var="x" value="true"></c:set>
	<c:if test="${x}">
		<c:out value="没有名字"></c:out>
	</c:if>
	
	<c:choose>
		<c:when test="${a > 100}">错误</c:when>
		<c:when test="${a > 99}">A级别</c:when>
		<c:when test="${a > 80}">B级别</c:when>
		<c:otherwise>没级别</c:otherwise>		
	</c:choose>

<%
	String[] strs = {"one","two"};
	request.setAttribute("strs", strs);
	ArrayList<String> list = new ArrayList<String>();
	list.add("1");
	list.add("2");
	list.add("3");
	pageContext.setAttribute("list", list);
%>

<c:forEach var="i" begin="1" end="10" step="2">
${i}
</c:forEach>	

<c:forEach items="${strs}" var="str">
${str}
</c:forEach>
 <br>
<!-- 循环状态 -->
<c:forEach items="${list}" var="ele" varStatus="vs">
	${vs.count} ${vs.index} ${vs.first}   <br>
	
</c:forEach>
```

1. out和set
  * \<c:out>：输出
    > value：可以是字符串常量，也可以是EL表达式
    > default：当要输出的内容为null时，会输出default指定的值
    > escapeXml：默认值为true，表示转义！
  * \<c:set>：设置(创建域的属性)
    > var：变量名
    > value：变量值，可以是EL表达式
    > scope：域，默认为page，可选值：page、request、session、application
2. remove
  * <remove>：删除域变量
    > var：变量名
    > scope：如果不给出scope，表示删除所有域中的该名称的变量；如果指定了域，那么只删除该域的变量。
3. url
  * value：指定一个路径！它会在路径前面自动添加项目名。
    <> <c:url value="/index.jsp"/>，它会输出/day13_1/index.jsp
  * 子标签：\<c:param>，用来给url后面添加参数，例如：
    <c:url value="/index.jsp">
      <c:param name="username" value="张三"/>  <!--可以对参数进行url编码！！-->
    \</c:url>
    结果为：/day13_1/index.jsp?username=%ED%2C%3F%ED%2C%3F
  * var：指定变量名，一旦添加了这个属性，那么url标签就不会再输出到页面，而是把生成url保存到域中。
  * scope：它与var一起使用，用来保存url。
4. if：对应java中的if语句
  * <c:if test="布尔类型">...\</c:if>，当test为值时，执行标签体内容！
5. choose：它对应java中的if/else if/ ... /else
  * 例如：
    \<c:choose>
      <c:when test="">...\</c:when>
      <c:when test="">...\</c:when>
      <c:when test="">...\</c:when>
       ... 
      \<c:otherwise> ...\</c:otherwise>
    \</c:choose>
    等同与
    if(...) {
    } else if( ....) {
    } else if( ....) {
    } else if( ....) {
    } ...
    else { ...}

6. forEach
  它用来循环遍历数组、集合！
  它还可以用来计数方式来循环！

  计数方式：

  for(int i = 1; i <= 10; i++) {
    ...
  }

  <c:forEach var="i" begin="1" end="10">
    ${i}
  \</c:forEach>

  属性：
    * var：循环变量
    * begin：设置循环变量从几开始。
    * end：设置循环变量到几结束。
    * step：设置步长！等同与java中的i++，或i+=2。step默认为1

----------------------

用来输出数组、集合！

<c:forEach items="${strs }" var="str">
 ${str }<br/>
\</c:forEach>

等同于

for(String str : strs) {
  ...
}

属性：
* items：指定要循环谁，它可以是一个数组或一个集合
* var：把数组或集合中的每个元素赋值给var指定的变量。

----------------------

循环状态

可以使用varStatus来创建循环状态变量！

循环状态变量有如下属性：
  * count：循环元素的个数
  * index：循环元素的下标
  * first：是否为第一个元素
  * last：是否为最后一个元素
  * current：当前元素

<c:forEach items="${list }" var="ele" varStatus="vs">
	${vs.index} \${vs.count } \${vs.first } \${vs.last } ${vs.current }<br/>
\</c:forEach>







