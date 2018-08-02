---
title: java登录案例
date: 2018-7-31
tags: 
 - javaweb
categories: java
---

# 使用session来实现登录

需要的页面

login.jsp

LoginServlet

user.jsp //表示成功页面

user-2.jsp //测试

思路: 

首先 login.jsp里面写表单 然后 登录

登录请求LoginServlet

假如登录信息通过,将信息保存到session,将用户名保存到cookie,页面转发到user.jsp里面

每次请求登录里面的页面都检查session里面有没有信息

当关闭浏览器的时候,下次登录,优先查看cookie里面的用户名,并写入input里面



假如登录信息不通过,将错误信息写入request域里面,并且重定向到login.jsp页面,login显示错误信息

login.jsp

```jsp
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
	<%
		//读取名为username的cookie,如果不为空就显示 为空就重新登录
		String uname = "";
		Cookie[] c = request.getCookies();
		if(c != null){
			for(Cookie cs:c){
				if(cs.getName().equals("username")){
					uname = cs.getName();
				}
			}
			
		}
		String msg = (String)request.getAttribute("msg");
		if(msg == null){
			msg = " ";
		}
		
	%>
	<font color="red"><b><%=msg %></b></font>
	<form action="/java-servlet-demo/LoginServlet" method="post">
		账号: <input type="text" name="username" value="<%=uname %>"><br>
		密码: <input type="text" name="password"><br>
		<input type="submit" value="登录">
	</form>
	
</body>
</html>
```

data.jsp

```jsp
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
<%
	String username = (String)session.getAttribute("username");
	if(username == null){
		//先request域里面保存登录信息,转发到login.jsp里面
		request.setAttribute("msg", "身份失效,请登录");
		request.getRequestDispatcher("/session/login.jsp").forward(request, response);
	}
%>
<h1>你好<%=username %>,欢迎回来,我是data </h1>
</body>
</html>
```

LoginServlet

```java
protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		
		String username = request.getParameter("username");
		String password = request.getParameter("password");		
		if(username.equals("admin") && password.equals("000000")) {
			/*
			 * 保存用户信息到session
			 * 重定向到data.jsp页面
			 * 
			 */
			System.out.println("密码正确");
			HttpSession session = request.getSession();
			session.setAttribute("username", username);
			/*
			 * 把用户名保存到cookie
			 */
			Cookie cookie = new Cookie("username", username);
			cookie.setMaxAge(60*60);
			response.addCookie(cookie);
			response.sendRedirect("/java-servlet-demo/session/data.jsp");
		}else {
			/*
			 * 登录失败,保存错误信息到request域里面
			 */
			request.setAttribute("msg", "用户名或密码错误");
			request.getRequestDispatcher("session/login.jsp").forward(request, response);
		}
	}
```

ps:session这解决方法挺好的,强大的生态在问题的解决上面更加有针对性

# 添加验证码功能

首先获取生成验证码的类

然后创建一个servlet类   生成验证码 将验证码的字保存到session 最后将图片输出出去

在login.jsp页面将验证码加进去

在loginservlet里面添加一个验证码验证的逻辑

最后使用js实现刷新验证码









