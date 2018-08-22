# CSS3动画

​	作为前端开发,每天都是vue,react,vdom,双向绑定,原型......回头一动手,发现一个特效都写不出来,倒是成了伪前端,说去C3动画,距离第一次接触已经过去很久了,那时候还是浅尝辄止,在遍地轮子的环境下,比如[Animate.css](https://daneden.github.io/animate.css/),记得第一次接触就收藏了,也算是激发了我当时的好奇心,现在回头拾起最初的C3动画,并熟练使用他

CSS3动画属性:

```css
animation: name duration timing-function delay iteration-count direction;
```

当然这里刚开始不建议写在一起,可以分开写

- animation-name:  动画名称,也就是@keyframe

- animation-duration: 规定完成动画所花费的时间，以秒或毫秒计。 
- animation-timing-function 动画的速度曲线。 
- animation-delay: 在动画开始之前延迟多久
- animation-iteration-count: 动画的播放(迭代)次数
- animation-direction: 规定是否应该轮流反向播放动画。 

### animation-name

​	正如上面所说,这里是与动画名称有关,表示执行哪个动画

```css
//旋转动画
@keyframe anim{
    @keyframes changehovertree {
          0% {
            transform: rotate(0);
          }
          50% {
            transform: rotate(180deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
}
//还有from to的写法
//淡入动画
@keyframes emerge {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
```

### animation-duration

字面解释 动画-持续时间 默认值是0,也就是没有效果,所以这里请给出你先执行的时间

#### animation-timing-function

字面解释 动画-定时-方法 ,通俗点就是动画执行的方式,这里要说一个上档次的数学函数,三次贝塞尔函数（Cubic Bezier),他可以生成速度曲线,有以下的值

- linear 动画匀巡进行
- ease 默认动画,低速开始,然后加快,最后变慢
- ease-in 低速开始,结束加快
- ease-out  快速开始,结束减慢
- ease-in-out  低速开始,低速结束,(比ease慢)
- cubic-bezier(*n*,*n*,*n*,*n*) ,这是定义三次贝塞尔函数里面的值,实现自定义动画[在线生成三次贝塞尔函数](三次贝塞尔函数),有兴趣可以试试

#### animation-delay

 字面解释: 动画-延迟 (玩过单片机的对delay都熟悉),定义动画延迟多久开始,如果是负数,会跳过负数时间执行

#### animation-iteration-count

字面解释: 动画-重复-数值 就是定义动画执行次数啦

- n: 定义动画的次数
- infinite 无限播放

#### animation-direction

- normal 默认值。动画应该正常播放。
- alternate 动画应该轮流反向播放。

### animation-fill-mode

animation-fill-mode 属性规定动画在播放之前或之后，其动画效果是否可见。 

```
animation-fill-mode : none | forwards | backwards | both;
```

- none 不改变默认行为
- forwards: 当动画完成后，保持最后一个属性值 
- backwards: 在动画显示之前，应用开始属性值（在第一个关键帧中定义)
-  both 向前和向后填充模式都被应用。





