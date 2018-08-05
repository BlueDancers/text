

​	昨晚睡前打开了半个月没打开的知乎, 看到了一个专栏文章[再见jquery,我的老朋友](https://zhuanlan.zhihu.com/p/40739079),突然想到之前github传出,github已经彻底删除jquery,这似乎标志着前端已经完全进入了一个新的时代,js从最开始的小丑语言,现在已经成为一个非常优秀的编程语言,开发者的目光从兼容性一步步的转向了模块化

​	前端发展如此之快,作为前端开发者对前端快速发展欣喜的同时,让我倍感压力,不能停止学习,废话就说这么多吧

​	7月多在github上面偶然看到了mpvue，当时感觉眼前一亮，用vue写小程序怎么实现的，，后来看了他们的文档，感觉挺不错的，在慕课网上面看了蜗牛老师的mpvue实战项目，决定好好学习一下，看看vue+小程序是怎么样的开发体验~~~

​	首先谢谢老师，课非常不错，基本完成项目对小程序和mpvue都有不错的了解，还对koa2进行讲解，墙裂推荐！页面上主要是这样的

![](http://on7r0tqgu.bkt.clouddn.com/FqQ2fqAMADeR-6oYREIklGI84EsE.png )

主要是数据库哪一块,跟着老师打,很多都看不懂，虽然是knex ，但是语法基本就是mysql

```javascript
let book = await mysql('books')
    .select('books.*', 'csessioninfo.user_info') 
    .join('csessioninfo', 'books.openid', 'csessioninfo.open_id') 
    .limit(size) 
    .offset(Number(page) * size)   
    .orderBy('books.id', 'desc')
```

类似这样的，mysql白学了，很多都忘了，后面恶补了mysql

有些比较坑人的地方，

1. 添加页面需要重启（这也不算坑）

2. 登录事件需要用@getuserinfo 官网没有说明，害得我用vue的@click调试登录bug半个月

3. wx原生事件不可以写在methods里面，有说明，但是还是才踩到了坑，不小心把下拉事件写到methods里面

4. 最好不要在mpvue没有启动的时候变动代码，因为假如代码有错误，mpvue可能会卡在启动的地方

5. 引用static里面的资源，不可以写项目路径 按build后的路径写 `/static/text.png `，而不是vue项目里面的路径

6. 小程序内部跳转路径`../write/main `应该这么写，不可以使用vue-router很遗憾

7. 报错`pages/xxx/xxx.js 出现脚本错误或者未正确调用 Page()`，因为vue文件不可以为空。。。

   当然很多坑并不是因为mpvue，而是小程序自带的，我仅仅总结一下

下面说说开发中感觉mpvue的优点吧

1. 使用vue开发可以组件化，感觉很舒服
2. 对已经会vue的开发者来说，几乎没有学习成本
3. 几乎不用关系页面配置文件，只要指定主页就好了

细说的话优点就很多啦，因为基于vue，使用一个成熟的框架写小程序，是很舒服的，前期坑比较多，但是熟练了，就会感觉mpvue写小程序是，相对于原生wx语法，体验不是一个级别呢

​	总的来说，蜗牛老师的实战课程挺不错的，学会了很多，对koa2也有了更好的了解

下面是我这个mpvue项目的地址

[豆瓣读书微信小程序](https://github.com/vkcyan/wl-mpvue)

​														感谢美团给我们带来mpvue，希望他越来越好





