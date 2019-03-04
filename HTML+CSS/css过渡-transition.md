# CSS3过渡

​	css过渡(transition)和动画(animation)实现了类似的功能,都是起到动画的效果,但是两者在应用场景上面是存在区别的



animation非常适合一些样式的切换,例如现实模态框,从0-1的过程,一般都是通过animation去进行实现的,

那么transition的使用场景是什么呢?

transition适合从0.8 - 1的过程,多使用在`hover` `active` 上,也就是说,元素本身是存在的,通过特定事件触发了事件(例如`hover`),样式发生了变化,这时候transition就会生效,相对于animation,transition的使用要简单多了

```
transition: all 1s; /* 所有变化在1s类完成 */
```

````html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>transition</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    * {
      margin: 0;
      padding: 0;
    }

    body {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 500px;
    }

    .base {
      width: 100px;
      height: 100px;
      background-color: black;
      transition: width 1s ease-out 0s,
                  height 2s ease 0s,
                  background 1s ease-in 0s;
                  /*
                    很明显可以看到后面两个参数意义不是很大
                    大部分情况是可以省略不写的,
                    默认值为 ease 0s
                  */
    }
    .base:hover {
      width: 300px;
      height: 300px;
      background-color: brown;
    }
  </style>
  <script>
    /*
    transition 有四个属性
    transition-proprety  指定css属性
    transition-duration  transition效果需要指定多少秒,或者毫秒
    transition-timing-function 指定 transition 效果的转速曲线
    transition-delay  定义transition效果的延迟时间
    当然也可以合起来写
    transition: all 1s ease 0s;
    一般仅仅需要过渡效果的情况下爱
    transition: all 1s;
    就可满足需求
    */
  </script>
</head>

<body>
  <div class="base">

  </div>
</body>

</html>
````





需要注意的是 transition是`过渡`的过程,必须是0.x-1的过程,不可以是从0 到 1的成功

错误实例

```css
demo {
  width: 10px;
  height: 10px;
}
demo:hover {
  width: 100px;
  height: 100px;
  color: #fff;
}
```

虽然默认是demo的color属性是存在的,也就是#000,默认样式,但是却没有定义,没有定义,即是"0",不会存在动画效果,所以要想上面的颜色产生过渡,就需要添加上color属性

```
demo {
  width: 10px;
  height: 10px;
  color: #000; /* 当color不是0 */
} 
demo:hover {
  width: 100px;
  height: 100px;
  color: #fff;
}
```



transition 这位魔法师的能力 就是

基于一个存在的属性,按想要的 `过渡属性` `过渡时间`  `动画曲线`  `延迟时间`去过渡,或者说是变化为另一个属性,让其变化过程可见