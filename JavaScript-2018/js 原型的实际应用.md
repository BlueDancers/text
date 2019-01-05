# 原型

每个第一次使用jq的开发者都感到惊叹,jq的$太神奇了,究竟是怎么做到的使用\$控制dom

赞叹前人之余,探究其本源才是前端开发者应该做的事,社区常常说,不要重复造轮子,

可是啊,连轮子都造不出来,又怎么去了解在什么环境下用什么轮子,怎么样才可以造成更加优秀的轮子,

不同阶段对前端有不同的理解,作为一名程序员,本就是没有尽头,静下心来,和别人比一比,多借鉴前人的发展,取其精

华去其糟粕,不要闭门造车,做一名不断学习的前端开发者

​	回头看来jq已经逐渐在不断的学习中揭开了他神秘的面纱,让我想看看美丽的$是怎么出生的

- jQuery只有一个全局变量$ 那一定是挂载在window上面的

```JavaScript
(function (window){
    var jQuery = function (selects) {
       
    }
    window.$ = jQuery;
 }
)(window)
```

可爱的$就指向JQuery的实例了当我们\$("#id")就相当于 jQuery("#id")

那么现在就要处理获取到的dom元素

```JavaScript

(function (window) {
  function jQuery(selects) {
    return new jQuery.fn.init(selects)
  }
  jQuery.fn = {}  //创建挂载函数
  jQuery.fn.init = function (selects) {
    var dom = [].slice.call(document.querySelectorAll(selects))
    var i = 0;
    var len = dom ? dom.length : 0
    for (i = 0; i < len; i++) {
      this[i] = dom[i]
    }
    this.length = len
    this.selects = selects || ' ';
  }
  window.$ = jQuery; //注意这里jQuery指向window
})(window)
```

现在我们就已经将$()里面的dom捕捉到了,请转化成为数组,利于后面的操作

下一步就是在原型链上面创建jquery的方法了

```JavaScript
(function (window){
  var jQuery = function (selector){
    return new jQuery.fn.init(selector)    //这里必须构造函数要不放怎么去获取节点信息
  }
  jQuery.fn = {
    val(){
      return this[0].innerHTML
    }
      //.......等等方法
  }
  var int = jQuery.fn.init = function (selector) {
    var dom = [].slice.call(document.querySelectorAll(selector)) 
    var i,len = dom?dom.length:0
    for (i = 0; i < len; i++) {
      this[i] = dom[i]
    }
    console.log(len,selector);

    this.length = len;
    this.selector = selector || ' '
  }

  int.prototype = jQuery.fn

  window.$ = jQuery;
})(window)
```

我们实现了类似jq的val()方法了

试验一下

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>title</title>
</head>

<body>
  <p>jquery test 1</p>
  <script src="./MYjquery.js"></script>
  <script>
    //插件拓展
    $.fn.getNodeName = function () {
      return this[0].tagName;
    }
  </script>

  <script>
    var p = $('p');
    console.log(`p的标签名为${p.getNodeName()}`); //获取节点名称
    console.log(p.val());
  </script>
</body>

</html>
```

![](http://on7r0tqgu.bkt.clouddn.com/FpsMhSqk3rqSG-C6Xh7MTGJTxlXP.png )

最关键的一点使用`jQuery.fn`的方式利于拓展,上面代码体现了这一点,假如我们现在jq上面创建自己的方法,就把方法挂在jQuery.fn上面相当于在原型上面加方法

这里可以看到jquery一切都是基于原型,所以呀,讲原型,我用jquery来说明,感受到原型的强大

