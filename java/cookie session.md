# jsp - cookie - session



1. jsp的作用：
  * Servlet：
    > 缺点：不适合设置html响应体，需要大量的response.getWriter().print("<html>")
    > 优点：动态资源，可以编程。
  * html：
    > 缺点：html是静态页面，不能包含动态信息
    > 优点：不用为输出html标签而发愁
  * jsp(java server pages)：
    > 优点：在原有html的基础上添加java脚本，构成jsp页面。

2. jsp和Servlet的分工：
  * JSP：
    > 作为请求发起页面，例如显示表单、超链接。
    > 作为请求结束页面，例如显示数据。
  * Servlet：
    > 作为请求中处理数据的环节。

3. jsp的组成
  * jsp = html + java脚本 + jsp标签(指令)
  * jsp中无需创建即可使用的对象一共有9个，被称之为9大内置对象。例如：request对象、out对象
  * 3种java脚本：
    > <%...%>：java代码片段(常用)，用于定义0~N条Java语句！方法内能写什么，它就可以放什么！
    > <%=...%>：java表达式，用于输出(常用)，用于输出一条表达式（或变量）的结果。response.getWriter().print( ... );这里能放什么，它就可以放什么！
    > <%!...%>：声明，用来创建类的成员变量和成员方法(基本不用，但容易被考到)，类体中可以放什么，它就可以放什么！


    案例：演示jsp中java脚本的使用！
    案例：演示jsp与servlet分工！

4. jsp原理（理解）
  * jsp其实是一种特殊的Servlet
    > 当jsp页面第一次被访问时，服务器会把jsp编译成java文件（这个java其实是一个servlet类）
    > 然后再把java编译成.class
    > 然后创建该类对象
    > 最后调用它的service()方法
    > 第二次请求同一jsp时，直接调用service()方法。
  * 在tomcat的work目录下可以找到jsp对应的.java源代码。
  * 查看jsp对应java文件：
    > java脚本
    > html
5. jsp注释
  * <%-- ... --%>：当服务器把jsp编译成java文件时已经忽略了注释部分！
    <!--fdsafdsa-->：html注释

＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

Cookie

1. Http协议与Cookie（了解）
  * Cookie是HTTP协议制定的！先由服务器保存Cookie到浏览器，再下次浏览器请求服务器时把上一次请求得到Cookie再归还给服务器
  * 由服务器创建保存到客户端浏览器的一个键值对！服务器保存Cookie的响应头：Set-Cookie: aaa=AAA  Set-Cookie: bbb=BBB
    > response.addHeader("Set-Cookie", "aaa=AAA");response.addHeader("Set-Cookie", "bbb=BBB");
  * 当浏览器请求服务器时，会把该服务器保存的Cookie随请求发送给服务器。浏览器归还Cookie的请求头：Cookie: aaa=AAA; bbb=BBB
  * Http协议规定（保证不给浏览器太大压力）：
    > 1个Cookie最大4KB
    > 1个服务器最多向1个浏览器保存20个Cookie
    > 1个浏览器最多可以保存300个Cookie
  * 浏览器大战：因为浏览器竞争很激励，所以很多浏览器都会在一定范围内违反HTTP规定，但也不会让一个Cookie为4GB！

2. Cookie的用途
  * 服务器使用Cookie来跟踪客户端状态！
  * 保存购物车(购物车中的商品不能使用request保存，因为它是一个用户向服务器发送的多个请求信息)
  * 显示上次登录名(也是一个用户多个请求)

  **********Cookie是不能跨浏览器的！***********

3. JavaWeb中使用Cookie
  * 原始方式（了解）：
    > 使用response发送Set-Cookie响应头
    > 使用request获取Cookie请求头
  * 便捷方式（精通）：
    > 使用repsonse.addCookie()方法向浏览器保存Cookie
    > 使用request.getCookies()方法获取浏览器归还的Cookie

  Cookie第一例：
    > 一个jsp保存cookie, a.jsp
    > > 另一个jsp获取浏览器归还的cookie！ b.jsp

4. Cookie详解
  * Cookie不只有name和value两个属性
  * Cookie的maxAge（掌握）：Cookie的最大生命，即Cookie可保存的最大时长。以秒为单位，例如：cookie.setMaxAge(60)表示这个Cookie会被浏览器保存到硬盘上60秒
    > maxAge>0：浏览器会把Cookie保存到客户机硬盘上，有效时长为maxAge的值决定。
    > maxAge<0：Cookie只在浏览器内存中存在，当用户关闭浏览器时，浏览器进程结束，同时Cookie也就死亡了。
    > maxAge=0：浏览器会马上删除这个Cookie！
  * Cookie的path（理解）：
    > Cookie的path并不是设置这个Cookie在客户端的保存路径！！！
    > Cookie的path由服务器创建Cookie时设置
    > 当浏览器访问服务器某个路径时，需要归还哪些Cookie给服务器呢？这由Cookie的path决定。
    > 浏览器访问服务器的路径，如果包含某个Cookie的路径，那么就会归还这个Cookie。
    > 例如：
    > <> aCookie.path=/day11_1/; bCookie.path=/day11_1/jsps/; cCookie.path=/day11_1/jsps/cookie/;
    > <> 访问：/day11_1/index.jsp时，归还：aCookie
    > <> 访问：/day11_1/jsps/a.jsp时，归还：aCookie、bCookie
    > <> 访问：/day11_1/jsps/cookie/b.jsp时，归还：aCookie、bCookie、cCookie
    > Cookie的path默认值：当前访问路径的父路径。例如在访问/day11_1/jsps/a.jsp时，响应的cookie，那么这个cookie的默认path为/day11_1/jsps/
  * Cookie的domain（了解）
    > domain用来指定Cookie的域名！当多个二级域中共享Cookie时才有用。
    > 例如；www.baidu.com、zhidao.baidu.com、news.baidu.com、tieba.baidu.com之间共享Cookie时可以使用domain
    > 设置domain为：cookie.setDomain(".baidu.com");
    > 设置path为：cookie.setPath("/");


Cookie中不能存在中文！！！

// 保存
Cookie c = new Cookie("username", URLEncoder.encode("张三", "utf-8"));//出错！
response.addCookie(c);

// 获取
Cookie[] cs = request.getCookies();
if(cs != null) {
  for(Cookie c : cs){
    if("username".equals(c.getName())) {
      String username = c.getValue();
      username = URLDecoder.decode(username, "utf-8");
    }
  }
}

============================================

HttpSession(*****)

1. HttpSession概述
  * HttpSession是由JavaWeb提供的，用来会话跟踪的类。session是服务器端对象，保存在服务器端！！！
  * HttpSession是Servlet三大域对象之一(request、session、application(ServletContext))，所以它也有setAttribute()、getAttribute()、removeAttribute()方法
  * HttpSession底层依赖Cookie，或是URL重写！

2. HttpSession的作用
  * 会话范围：会话范围是某个用户从首次访问服务器开始，到该用户关闭浏览器结束！
    > 会话：一个用户对服务器的多次连贯性请求！所谓连贯性请求，就是该用户多次请求中间没有关闭浏览器！
  * 服务器会为每个客户端创建一个session对象，session就好比客户在服务器端的账户，它们被服务器保存到一个Map中，这个Map被称之为session缓存！
    > Servlet中得到session对象：HttpSession session = request.getSession();
    > Jsp中得到session对象：session是jsp内置对象之下，不用创建就可以直接使用！
  * session域相关方法：
    > void setAttribute(String name, Object value);
    > Object getAttribute(String name);
    > void removeAttribute(String name);

3. 案例1：演示session中会话的多次请求中共享数据
  * AServlet：向session域中保存数据
  * BServlet：从session域中获取数据
  * 演示：
    > 第一个请求：访问AServlet
    > 第二个请求：访问BServlet

4. 案例2：演示保存用户登录信息（精通）
  * 案例相关页面和Servlet：
    > login.jsp：登录页面
    > succ1.jsp：只有登录成功才能访问的页面
    > succ2.jsp：只有登录成功才能访问的页面
    > LoginServlet：校验用户是否登录成功！
  * 各页面和Servlet内容：
    > login.jsp：提供登录表单，提交表单请求LoginServlet
    > LoginServlet：获取请求参数，校验用户是否登录成功
    > <> 失败：保存错误信息到request域，转发到login.jsp(login.jsp显示request域中的错误信息)
    > <> 成功：保存用户信息到session域中，重定向到succ1.jsp页面，显示session域中的用户信息
    > succ1.jsp：从session域获取用户信息，如果不存在，显示“您还没有登录”。存在则显示用户信息
    > succ2.jsp：从session域获取用户信息，如果不存在，显示“您还没有登录”。存在则显示用户信息

  只要用户没有关闭浏览器，session就一直存在，那么保存在session中的用户信息也就一起存在！那么用户访问succ1和succ2就会通过！

5. HttpSession原理（理解）
  * request.getSession()方法：
    > 获取Cookie中的JSESSIONID：
    > <> 如果sessionId不存在，创建session，把session保存起来，把新创建的sessionId保存到Cookie中
    > <> 如果sessionId存在，通过sessionId查找session对象，如果没有查找到，创建session，把session保存起来，把新创建的sessionId保存到Cookie中
    > <> 如果sessionId存在，通过sessionId查找到了session对象，那么就不会再创建session对象了。
    > <> 返回session
    > 如果创建了新的session，浏览器会得到一个包含了sessionId的Cookie，这个Cookie的生命为-1，即只在浏览器内存中存在，如果不关闭浏览器，那么Cookie就一直存在。
    > 下次请求时，再次执行request.getSession()方法时，因为可以通过Cookie中的sessionId找到session对象，所以与上一次请求使用的是同一session对象。

  * 服务器不会马上给你创建session，在第一次获取session时，才会创建！request.getSession();

  * request.getSession(false)、request.getSession(true)、request.getSession()，后两个方法效果相同，
    > 第一个方法：如果session缓存中(如果cookie不存在)，不存在session，那么返回null，而不会创建session对象。

6. HttpSession其他方法： 
  * String getId()：获取sessionId；
  * int getMaxInactiveInterval()：获取session可以的最大不活动时间（秒），默认为30分钟。当session在30分钟内没有使用，那么Tomcat会在session池中移除这个session；
  * void invalidate()：让session失效！调用这个方法会被session失效，当session失效后，客户端再次请求，服务器会给客户端创建一个新的session，并在响应中给客户端新session的sessionId；
  * boolean isNew()：查看session是否为新。当客户端第一次请求时，服务器为客户端创建session，但这时服务器还没有响应客户端，也就是还没有把sessionId响应给客户端时，这时session的状态为新。

7. web.xml中配置session的最大不活动时间
    <session-config>
        <session-timeout>30</session-timeout>
    </session-config>

8. URL重写（理解）

　　就是把所有的页面中的路径，都使用response.encodeURL("..")处理一下！

  * session依赖Cookie，目的是让客户端发出请求时归还sessionId，这样才能找到对应的session
  * 如果客户端禁用了Cookie，那么就无法得到sessionId，那么session也就无用了！
  * 也可以使用URL重写来替代Cookie
    > 让网站的所有超链接、表单中都添加一个特殊的请求参数，即sessionId
    > 这样服务器可以通过获取请求参数得到sessionId，从而找到session对象。
  * response.encodeURL(String url)
    > 该方法会对url进行智能的重写：当请求中没有归还sessionid这个cookie，那么该方法会重写url，否则不重写！当然url必须是指向本站的url。










