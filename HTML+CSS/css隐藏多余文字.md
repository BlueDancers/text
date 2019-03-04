---
title: css实现隐藏多余溢出文字
date: 2018-4-17
tags: 
  - css
categories: css
---



# css实现隐藏多余溢出文字

### 单行文字隐藏

```css
.new_item {
    display: inline-block;
    width: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
```



#### 解释

```css

overflow: hidden;
/*overflow 属性规定当内容溢出元素框时发生的事情。hidden 内容会被修剪，并且其余内容是不可见的*/
white-space: nowrap; 
/* 文本不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。*/
text-overflow: ellipsis;
/*非必须 不添加则不使用... 省略 属性规定当文本溢出包含元素时发生的事情。 显示省略符号来代表被修剪的文本。*/
```



### 多行文字隐藏

````css
display: -webkit-box; 
word-break: break-all;
-webkit-box-orient: vertical;
-webkit-line-clamp: 6; 
overflow: hidden;
text-overflow: ellipsis;
````



### 解释

```css
display: -webkit-box; 
/* 将对象作为弹性伸缩盒子模型显示 */
word-break: break-all; /*  */
-webkit-box-orient: vertical; /* 设置检索伸缩盒子的排列方式 */
-webkit-line-clamp: 6;  /*定义需要6行以上的文字将会被隐藏*/
overflow: hidden; /* 超出隐藏 */
text-overflow: ellipsis; /* 超出部分小数点显示 */
```



