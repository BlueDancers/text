---
title: Vue路由钩子 afterEach beforeEach区别
date: 2018-7-14
tags: 
  - vue
  - vue-router
categories: vue
---

使用vue已经有一段是时间了,这不断的写项目里面,基本上清楚了vue的这种与jq完成不一样的思想,越是研究越是感觉作者之强大,对vue SPA单页面里面最常用的vue-router组件,今天就谈谈这个,我使用的经验



​	vue-router作为vue里面最基础的服务,学习一段时间,对遇到的需求进行一些总结

使用vue-cli作为开发前提 vue-router已经配置好了

路由写法

```
  routes: [
    {
        path: '/cart',
        name: 'cart',
        component: cart,
        meta :{ title: "购物车"}				//用于给定网页名
    }
 ]
```

### vue-router 的路由跳转的方法

第一种 : 编程式的导航

```text
<router-link to="/" tag="p">耳机频道</router-link>
//to是一个prop.指定需要跳转的路径,也可以使用v-bind动态设置
//tag可以指定渲染成标签,默认是a标签
<router-link to="/" replace>跳转回去</router-link>   
//这样的写法是不会留下历史痕迹,回退键无效
<router-link :to="{ name: 'product', params: { id : 1 }}">User</router-link>
// /product/1
```

第二种 : 函数式的导航

```
//这里假设 我要跳转product页面并且附带参数id  
//这里定义好了list.id 就是 动态的值
this.$router.push('./product/' + list.id)						// 字符串的方式进行描述
this.$router.push({name : 'product',params: { id : list.id }})	  // 命名的路由的方式进行描述
this.$router.push({ path: `/product/${list.id}` })				 // 直接定义path类似第一种
//比较常用的跳转路由的方法
//假如是带查询参数
router.push({ path: 'product', query: { id: list.id }})            // /product?id=1
```

 这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。 

当你点击 `<router-link>` 时，这个方法会在内部调用，所以说，点击 `<router-link :to="...">` 等同于调用 `router.push(...)`。 

**值得注意的一点是,如果提供了 path，params 的配置将不会生效** 

还有一些方法

```
router.replace		//它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录
router.go(1)	 	//在浏览器记录里面前进一步,等于history.forward()
router.go(-1)		//后退一步记录，等同于 history.back()
router.go(n)		//浏览器记录前进3步
```

基本使用大概就这么多
还有 命名视图 路由重定向 等等需要的请看官网



基本知识大概就这么多 

### 现在说说正题 afterEach beforeEach这两个导航守卫的区别

正如其名，`vue-router` 提供的导航守卫主要用来通过跳转或取消的方式守卫导航。有多种机会植入路由导航过程中：全局的, 单个路由独享的, 或者组件级的。

记住**参数或查询的改变并不会触发进入/离开的导航守卫**。

在全局守卫里面

beforeEach 全局前置守卫 

当一个导航触发时，全局前置守卫按照创建顺序调用。 

每个守卫方法接收三个参数：

- **to: Route**: 即将要进入的目标 [路由对象](https://router.vuejs.org/zh/api/#%E8%B7%AF%E7%94%B1%E5%AF%B9%E8%B1%A1)
- **from: Route**: 当前导航正要离开的路由
- **next: Function**: 一定要调用该方法来 **resolve** 这个钩子。执行效果依赖 `next` 方法的调用参数。

```JavaScript
router.beforeEach((to, from, next) => {
   console.log(to);    //即将要进入的路由对象
   console.log(from);  //当前导航要离开的路由对象
  
   next();             //调用该方法,才能进入下一个钩子
})
//这样写就可以明显的看出每个参数的意义
```

**next()**: 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 **confirmed** (确认的)。 

**next(false)**: 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 `from` 路由对应的地址。 

**next('/') 或者 next({ path: '/' })**: 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 `next` 传递任意位置对象，且允许设置诸如 `replace: true`、`name: 'home'` 之类的选项以及任何用在 [`router-link` 的 `to` prop](https://router.vuejs.org/zh/api/#to) 或 [`router.push`](https://router.vuejs.org/zh/api/#router-push) 中的选项。 

**确保要调用 next 方法，否则钩子就不会被 resolved** 

afterEach 全局后置钩子

```
router.afterEach((to, from) => {
  // ...
})
```

然而和守卫不同的是，这些钩子不会接受 `next` 函数也不会改变导航本身



从使用的角度来说 前置钩子更加常用,比如**登录验证** 以及给**Vue单页面引用规定网页名**等等,这些案例我的github里面有,如果想了解一下思路可以看看

```
router.beforeEach((to,from,next) => {
  if(to.meta.title) {
    document.title = to.meta.title;    //在路由里面写入的meta里面的title字段
  }
  next();
})
```

 [组件内的守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E8%B7%AF%E7%94%B1%E7%8B%AC%E4%BA%AB%E7%9A%84%E5%AE%88%E5%8D%AB)请看官网的例子



