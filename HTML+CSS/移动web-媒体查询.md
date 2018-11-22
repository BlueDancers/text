# 移动web的媒体查询适配

​	`media`做媒体查询经常使用,但是没有具体系统的学习总结

Media Query(媒体查询)

```css
@media 媒体类型 and (媒体特征) {
    /*css样式*/
}
```

`媒体类型`: screen print

`媒体特征`: max-width max-height

例如

```css
@media screen and (max-width: 320px) {
 	/*
    	当最大分辨率小于320px的时候,这段css生效
   */   
}
@media screen and (min-width:321px) {
    /*
    	当最小分辨率大于321px的时候.这段css生效
    */
}
```



