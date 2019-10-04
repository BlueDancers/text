## 在less与scss中引用公用样式

在开发中遇到很多样式一样的class,就需要写在一个公有的class中,来进行引用

### 在less中

```css
.base {
    color: white
}
.demo {
    .base()
}
```

就是这么简约(这一点更加中意less)



### 在scss中

> scss中对公共代码引入了mixin的机制

```css
 @mixin base {
     display: flex;
     justify-content: space-between;
     align-items: center;
 }
 .detail_first {
 	@include base_detail;
 }
 .defail_second {
 	@include base_detail;
 }
 .detail_third {
    @include base_detail;
 }
```

通过关键字@include对@mixin进行引用

