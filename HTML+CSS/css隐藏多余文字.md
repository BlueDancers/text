---
title: css实现隐藏多余溢出文字
date: 2018-4-17
tags: 
  - css
categories: css
---



# css实现隐藏多余溢出文字

```css
.new_item {
    display: inline-block;
    width: 80px;
    overflow: hidden;
    /*overflow 属性规定当内容溢出元素框时发生的事情。hidden 内容会被修剪，并且其余内容是不可见的*/
    text-overflow: ellipsis;
    /*text-overflow 属性规定当文本溢出包含元素时发生的事情。 显示省略符号来代表被修剪的文本。*/
    white-space: nowrap;
    /*文本不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。*/
}
```

![](http://on7r0tqgu.bkt.clouddn.com/Fkz2uDoXXqMUn9jq0XG8S9IU9l-w.png)

这个太常用了,又总是过一段时间就忘了,记录一下