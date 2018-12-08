# CSS画一个三角形

在我们日常工作里面,小箭头在很常见的需求,这个当然要通过css去实现,也很简单

`border`其本身就提供了这个可以画三角形的能力,之前一直不注意,现在回头总结这个



1. 

````html
<style>
    .elem {
        width: 0;
        border-width:40px;
        border-style: solid;
        border-color: red transparent transparent transparent;
    }
</style>
<div class='elem'></div>
````

依赖`border`的特性画出了这样的图形

![](http://www.vkcyan.top/FnXDyjCjdp-grMp0OteUnVusjn2t.png)

然后把不需要的颜色改成透明色

![](http://www.vkcyan.top/FiohLfkg037lpMgjz2nyupvC7qa_.png)

最后进行绝对定位,over



