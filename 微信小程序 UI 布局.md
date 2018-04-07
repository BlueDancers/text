# 微信小程序 UI 布局 

微信小程序布局主要用两种(flex包含浮动布局)

- flex布局
- 相对定位与绝对定位

关于理论,百度都有,不进行讲述,直接看案例

> index.wxml

```html
<view class='container'>
  <view class='item'> 
      1
  </view>
  <view class='item'> 
      2
  </view>
  <view class='item'> 
      3
  </view>
  <view class='item'> 
      4
  </view> 
</view>
```

> index.wxss

```css
page{
  height: 100%;
  width: 100%;
  background-color: #FFC0CB;
}
.container{
  width: 100%;
  height: 500px;
  display: flex;
}
.item{
  width: 100rpx;
  height: 100rpx;
  background-color: rosybrown;
  border: 1px solid #fff;
}
```

界面是这样的

![](http://on7r0tqgu.bkt.clouddn.com/FqayVxBDbAXexHbrKw1recSFN5Kw.png)

这是默认状态 主轴是从左到右 交叉轴是从上到下

我们可以改变主轴和交叉轴



> **flex-direction  决定元素的排列方向**

```css

.container{
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
}
```

就会变成这样

![](http://on7r0tqgu.bkt.clouddn.com/FkW-7r4EjW9oTn9NTkniOQECpo4o.png)

主轴和交叉轴改变方向

> flex-direction 有两种属性 `column` `row`
>
> row 为 `默认属性` 为横向排列 主轴是从左到右 交叉轴是从上到下
>
>  column 为竖向排列            主轴是从上到下  交叉轴是从左到右

> **flex-warp   决定元素如何换行(排列不下的情况下)**

![](http://on7r0tqgu.bkt.clouddn.com/Fgm0OvDKvk8VyeGzAXuXxXgS--Vq.png)

将wxml里面的view复制粘贴

这里明显看到 元素被挤变形了 

```

```

```
page{
  height: 100%;
  width: 100%;
  background-color: #FFC0CB;
}
.container{
  width: 100%;
  height: 500px;
  display: flex;
   flex-direction: row;

  /*
   flex-direction 有两种属性 column row row 为默认属性为横向排列 column 为竖向排列 
   当是column的时候  主轴是从上到下  交叉轴是从左到右
   当是row的时候 主轴是从做右 交叉轴是从上到下
  */
  /* flex-wrap: wrap; */
  /* flex-warp 主控制时候换行 默认是nowarp 不换行 还有 warp 换行 warp-reverse 行数翻转*/
  /* flex-flow: row wrap; */
  /* flex-flow说 flex-direction flex-warp的缩写 可以实现上面的参数 简写 */
  /* justify-content: space-between; */
  /* 主轴对齐 justify-content:center 居中
                            flex-start 默认左对齐
                            flex-end 右对齐
                            space-round 让间距相等
                            space-between 左右不留间距
  */
  /* align-items: stretch; */
  /* align-items: flex-start 默认在交叉轴上方
                  flex-end   交叉轴下方排列
                  center     在交叉轴中间排列
                  stretch    当不设置高度的时候 会自动给高度
  */
}
.item{
  width: 100rpx;
  height: 100rpx;
  background-color: rosybrown;
  border: 1px solid #fff;
}

```





