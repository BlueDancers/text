# css世界

> 阅读 张鑫旭大神 的css世界一书的笔记



所有的盒子(display) 都分内在盒子与外在盒子,外在盒子负责元素是一行显示还是换行显示,内在盒子负责宽高,内容呈现什么的,所以内在容器也被称为**容器盒子**

于是

display:block;  外在盒子为block 容器盒子也为block 可以脑补为display:block-block

display:inline.; 外在盒子为inline,所以一行显示,内在盒子也为inline,所以也是一行显示,并且无法设置宽高

display: inline-block 外在盒子为inline 内在盒子为block 所以`inline-block`可以一行显示的同时也可以设置其大小长宽



鑫三无原则

无宽度(块级元素) 因为块级元素宽度是自适应的,假如设置的宽度,那么就会影响都margin padding 等等,会发生意料之外的情况



小技巧

> 文字少的时候居中显示 
>
> 文字的多的时候具右显示

```css
.box {
  text-align: center;
}
.content {
  display: inline-block;
  text-align: left;
}
```



认识一个新的css属性

```
outline 与 border很相似,都是设置轮廓的,但是 
outline 不占据空间 ,会被绘制在内容之上 其他都与border一样
```





为了不影响流体布局,我们需要 "宽度分离原则" 	 css的width属性不与影响宽度的padding/ margin/border属性共存

```css
.father {
　  width: 180px;
}
.son {
　  margin: 0 20px;
　  padding: 20px;
　  border: 1px solid;
}
```





也有比较简单的写法,因为大量的宽度分离,可能会让标签变得多层嵌套,

所以就需要解决一个问题,width属性是作用在content-box方面的,所以,padding border margin才能会撑开元素,我们可以指定宽度不撑开,这里就涉及到了一各css3属性 box-sizing: border-box,将width作用域border上面,这样padding就会包含在里面

````css
  .data {
      width: 100px;
      height: 100px;
      padding: 10px;
      outline: 1px solid #000;
      box-sizing: border-box;
    }
````







