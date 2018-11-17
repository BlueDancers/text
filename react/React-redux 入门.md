# React-Redux-入门
Radux = Reducer + Flux 

react是非常轻量级的视图框架,在组件传递上面 需要一个 state来共享数据

根据好不错的React的UI库,  antd 

```
npm install antd --save
```



Redux的工作流程

​    ![](https://s1.ax2x.com/2018/11/11/5m7DmQ.png)



关于Redux

Redux是唯一的

只有store能够改变自己的内容,并且不能直接改变自己的内容

reducer必须是一个纯函数(给定固定的输入,就有固定的输出,并且不会存在任何副作用,例如 不可以出现 (new Date() 这样的不定值 这就不是纯函数))



