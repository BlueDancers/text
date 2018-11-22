# WebApp的viewport设置禁止缩放

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1" user-scalable="no">
<!--让浏览器识别这是移动端的应用-->
```

[MDN上对meta的解释](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta)

`meta`: 表示一些不能由HTML表示的相关元素(<base>,<link>,<script>,<style>,<title>)

`content`: 此对象包含`http-equiv`或`name`属性的值,具体取决于所使用的值



viewport上content的属性

`widht`: 控制视口宽度,可以设置为`width=600`,或者设为`device-width`表示比例为100%时屏幕宽度的CSS像素数值

`height`: 定义视口的高度,一般不使用

`initial-scale`: 定义初始缩放值

`maximum-scale`: 定义最大缩放比例,必须大于等于`minimum-scale`设置的值

`minimum-scale`: 定义缩小最小比例,必须小于等于`maximum-scale`设置的值

`user-scalable`: 定义是否允许用户手动缩放页面 默认为yes 设置`user-scalable=no`为no





