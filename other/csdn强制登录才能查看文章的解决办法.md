# CSDN强制登录的解决办法

这个网站的吃相越来越恶心,最近使用发现他竟然强制登录了,这样的网站我是不可能登录的,要一大堆身份信息,但是,某些时候有需要看一些别人的文章怎么办呢,

​	似乎`节操`与`便利`必须选一个,还好`CSDN`这样的网站,虽然强制登录,但是文章内容都在,那自然

`节操` `便利` 我全都要

打开控制台 运行以下代码

````JavaScript
(function() {
  if (
    window.location.href.startsWith('https://blog.csdn.net') ||
    window.location.href.startsWith('http://blog.csdn.net')
  ) {
    $('#article_content').height('100%')
    $('.hide-article-box').remove()
  }
})()

````



不登录照样看你CSDN的文章

