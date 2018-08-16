

# cookie sessionStorage localStorage

本文主要总结一下,这三者的异同点,特性,以及应用场景

## Cookie

​	在我第一次接触到cookie是在学习javaWeb的时候,主要用途是**保存登录信息**,比如退出登录,但是跳转到登录的时候,用户名以及写好了,这就是cookie的功劳

​	谈一谈cookie的身世吧,在1993年3月份由网景公司发明,Cookie ,小甜点,cookie真的特别小,只能存4KB的数据

#### cookie的特点

- 虽然存在浏览器,但是一般由服务器生成,可以设置失效时间,如果是浏览器生成的默认浏览器关闭的时候失效
- 很小,4KB
- 用来保存客户浏览器请求服务器页面的请求信息 ,比如登录信息,但是这样也不太好的地方,尤其是多人使用电脑

#### cookie的缺点

- 数量以及长度的限制 ,早期浏览器会有数量的限制,现代浏览器假如cookie超过4KB会被截掉
- 不可以做到长时间储存
- 安全性问题,,拦截者不需要知道cookie的意义,只要原样转发就达到了目的
- 每次都会被携带在http头中,所以cookie过多的话,会加重服务器压力
- 对于前端开发者,原生接口易用性不好,需要自己封装,或者借助第三方库



> Web Storage是为了本地存储数据而出现的,HTML5中的webStorage包括两种存储方式 
>
> sessionStorage
>
> localStorage
>
> 只要在有效期类,浏览器每次访问都会将**Storage**载入内存

## sessionStorage

玩过后端的都知道Session是保存在后端的,追踪用户的会话,**Cookie是通过浏览器记录信息来确认用户信息,Session通过服务器端信息确认身份信息**,浏览器的sessionStorage和后端的session不太一样,但是生命周期又很相似

#### sessionStorage的特点

- sessionStorage只能再同一个会话里面才能访问并且当会话结束后,数据也会销毁
- 所以sessionStorage并不是持久化存储,而是会话级别的存储,只要浏览器窗口没有关闭,即使刷新,或者进入另一个同源浏览器sessionStorage依旧存在,当浏览器关闭后sessionStorage会被销毁

> 一句话 : 尽在当前会话下生效,关闭页面或者浏览器关闭后被清除

就本人而言,使用sessionStorage并不是很多,唯一的使用是,a页面传值给B页面,B页面携带参数到到后端,这里我们可以使用sessionStorage进行数据的临时保存,到B页面在进行获取



## localStorage

从某种角度来说,localStorage真正意义上的实现浏览器本地存储

#### localStorage的特点

- localStorage用持久化存储,除非主动删除,否则数据永远不过期,可以存储一些规定不变的信息
- localStorage和sessionStorage一样受同源策略的限制
- 相对于cookie,sessionStorage 与localStorage都提供了完善的API
- 存储的大小限制为5MB

但是有一点localStorage是永不过期的,这一点并不是适合所有场景,需要借助第三方库对localStorage进行控制

## 三者的异同点

| 特性     | Cookie                                                       | localStorage            | sessionStorage                          |
| -------- | ------------------------------------------------------------ | :---------------------- | :-------------------------------------- |
| 生命周期 | 一般由服务器生成,可以设置过期时间,如果是浏览器生成,默认关闭浏览器失效 | 除非被清除,否则永久有效 | 仅在当前会话下生效,关闭页面或浏览器失效 |
| 存放数据 | 4KB                                                          | 5MB                     | 5MB                                     |
| 与服务器 | 每次都会被携带到HTTP请求里面,所以cookie过多会给服务器带来压力 | 不与服务器通信          | 不与服务器通信                          |
| 易用性   | 没有完善的API,需要开发人员自己封装                           | 有完善的API支持         | 有完善的API支持                         |





