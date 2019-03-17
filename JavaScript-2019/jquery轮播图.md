```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="./carousel_bate.css">
  <title>Document</title>
  <style>

  </style>
</head>

<body>
  <div class="carousel-conatiners">
    <div class="carousel">
      <img src="http://www.vkcyan.top/FgbA0ptti6uF-9Rf5X6zC1VWVrnN.png" alt="">
      <img src="http://www.vkcyan.top/FgbA0ptti6uF-9Rf5X6zC1VWVrnN.png" alt="">
      <img src="http://www.vkcyan.top/FgbA0ptti6uF-9Rf5X6zC1VWVrnN.png" alt="">
      <img src="http://www.vkcyan.top/FgbA0ptti6uF-9Rf5X6zC1VWVrnN.png" alt="">
      <img src="http://www.vkcyan.top/FgbA0ptti6uF-9Rf5X6zC1VWVrnN.png" alt="">
    </div>
    <!-- 底部小icon动态渲染 -->
    <div class="iconbox"></div>
    <!-- 左右图标 -->
    <div class="carousel-left">
      <img src="http://www.vkcyan.top/Frbiyli7a0QMCLhq40Kz7LjkOnOa.png" alt="">
    </div>
    <div class="carousel-right">
      <img src="http://www.vkcyan.top/FqO53vcLOtTh-cj7kKIX3i0eaoLr.png" alt="">
    </div>
  </div>
  <script src="jquery.1.7.2.js"></script>
  <script src="./carousel_bate.js"></script>
</body>

</html>
```

```js
$(document).ready(function () {
  var imageBox = $('.carousel')[0] // 获取图片对象
  var imageNum = $(imageBox).children().size() // 获取图片数量
  var imageBoxWidth = $(imageBox).width() // 获取轮播图宽度
  var iconBox = $('.iconbox')
  var iconBoxList = iconBox.children()
  var nextId = 0 // 下一张图片的索引
  var delayTime = 3000 // 延迟时间
  var speed = 500 // 执行速度
  var intervalId // 定时器的控制器
  // 根据数量动态渲染icon
  var iconNum = 0 // 记录icon数量
  while (imageNum > iconNum) {
    $('.iconbox').append(`<span class="carousel-icon" rel=${iconNum}></span>`)
    iconNum++
  }
  var rotate = function (clickId) {
    console.log(clickId);

    if (clickId != undefined) {
      console.log(clickId);
      if (clickId + 1 > imageNum) {
        nextId = 0
      } else if (clickId < 0) {
        nextId = imageNum - 1
      } else {
        nextId = clickId
      }
    } else {
      // 自动触发
      if (nextId + 2 > imageNum) {
        nextId = 0
      } else {
        nextId++
      }
    }
    $(iconBox).children().removeClass('active') // 参数当前存在的active下标
    var activeChildren = $(iconBox).children()[nextId]
    $(activeChildren).addClass('active') // 给当前的下标加class

    $(imageBox).animate({
      left: `-${nextId*imageBoxWidth}px`
    }, speed)
  }
  // 初始化 1. 运行一次rotate函数 让其初始化 2. 给  iconbox  这个class第一个子元素添加 active 
  rotate()
  intervalId = setInterval(rotate, delayTime); // 开启轮播

  iconBox.children().each(function (index, val) { // 下标点击事件
    $(this).click(function (e) {
      clearInterval(intervalId) // 清除定时器
      rotate(index) // 手动指定跳转
      intervalId = setInterval(rotate, delayTime); // 再次启动定时器
    })
  })
  // 先左滑动
  $('.carousel-left').click(function () {
    clearInterval(intervalId) // 清除定时器
    rotate(--nextId)
    intervalId = setInterval(rotate, delayTime); // 再次启动定时器
  })
  $('.carousel-right').click(function () {
    clearInterval(intervalId) // 清除定时器
    rotate(++nextId)
    intervalId = setInterval(rotate, delayTime); // 再次启动定时器
  })
})
```

```css
* {
  margin: 0;
  padding: 0;
}

.carousel-conatiners {
  position: relative;
  width: 100%;
  height: 450px;
  overflow: hidden;
  float: left;
}

.carousel {
  position: relative;
  display: flex;
  top: 0px;
  left: 0px;
  height: 400px;
}

.carousel img {
  display: block;
  float: left;
}

.iconbox {
  position: absolute;
  bottom: 0px;
  height: 50px;
  width: 100%;
  color: black;
  display: flex;
  justify-content: center;
}

.carousel-icon {
  margin: 10px 20px;
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: black;
}

.active {
  background-color: brown;
}

.carousel-left {
  cursor: pointer;
  transform: translate(0, -50%);
  margin-top: -25px;
  margin-left: 20px;
  position: absolute;
  top: 50%;
  left: 0;
}

.carousel-right {
  cursor: pointer;
  transform: translate(0, -50%);
  margin-top: -25px;
  margin-right: 20px;
  position: absolute;
  top: 50%;
  right: 0;
}
```



