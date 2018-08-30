# Vue-router与Vuex

一直以来,写vue项目一直都是使用cli去帮我们生成,一切都帮我们做好了,回头自己搭建项目,发现很多配置都是很麻烦的,也很有价值,本文章就记录自己搭建的vue

项目的vue-rouer以及vuex应用

## Vue-router

```
npm install vue-router -S    //s为生成环境
```

安装完成后,在src后面新建config文件夹

里面新建rouer.js以及routes.js

在routes.js里面写路由配置

```JavaScript
import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'
export default [
  {
    path: '/app',
    component: Todo
  },
  {
    path: '/login',
    ccomponent: Login
  }
]

```

在rouer.js里面写项目配置

````JavaScript
import Router from 'vue-router'
import routes from './routes'

export default () => {
  return new Router({
    routes
  })
}

````

然后再index.js里面导入vuerouter

````JavaScript
import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'

import './assets/style/global.styl'
import createRouter from './config/router'
const root = document.createElement('div')
document.body.appendChild(root)

Vue.use(VueRouter)
const router = createRouter()
new Vue({
  router,
  render: (h) => h(App)
}).$mount(root)
````

到这一步看似完成了,但是在app.vue里面还没有进行路由的显示,这时候无论我们怎么跳转都不会有反应

```html
<template>
  <div id="app">
    <div id="cover"></div>
    <headers></headers>
    <router-view />
    <footers></footers>
  </div>
</template>
```

配置路由重定向

```JavaScript
{
    path: '/',
    redirect: '/app'
},
```

配置路由为history模式

```
export default () => {
  return new Router({
    routes,
    mode: 'history'
  })
}
```

> 这里要注意 也是我遇到的bug,设置为histroy后,跳转路由出现了Error,
>
> 貌似是webpack-dev-server的问题,修改一下配置文件

```javascript
const devServer = {
  port: '8000',
  host: '127.0.0.1',
  overlay: { // 配置错误
    errors: true
  },
  hot: true,
  historyApiFallback: true
}
```

这就完成了基本的路由配置

### 基本参数

base: 指定路由前缀,但是不通过前缀也可以访问

````
export default () => {
  return new Router({
    routes,
    mode: 'history',
    base: '/base/'
  })
}
````

[linkActiveClass](https://router.vuejs.org/zh/api/#active-class): 全局配置 `<router-link>` 的默认“激活 class 类名” 

[linkExactActiveClass](https://router.vuejs.org/zh/api/#exact-active-class): 全局配置 `<router-link>` 精确激活的默认的 class。 

```
export default () => {
  return new Router({
    routes,
    mode: 'history',
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-link'
  })
}
```

vue-router 精准匹配到的路径会添加linkExactActiveClass

vue-rourer 匹配到了后就加上linkActiveClass



scrollBehavior 滚动行为

```JavaScript
export default () => {
  return new Router({
    routes,
    mode: 'history',
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-link',
    scrollBehavior (to, from, savedPosition) {
      // to是前往的路由
      // from就是之前的路由
      // savedPosition记录滚动条1的位置
      if (savedPosition) {
        return savedPosition
      } else {
        return {x: 0, y: 0}
      }
    }
  })
}
```

parseQuery / stringifyQuery

提供自定义查询字符串的解析/反解析函数。 

[fallback ](fallback)  当浏览器不支持 `history.pushState` 控制路由是否应该回退到 `hash` 模式 

### 路由的跳转

我们可以给路由起名字,让他可以在页面里面通过名字进行跳转

```JavaScript
{
    path: '/app',
    component: Todo,
    name: 'app'
  },
  
  app.vue
  <router-link :to="{name: 'app'}"> app </router-link>
```

我们可以将一些页面的配置放在meta里面

```JavaScript
meta: {
      title: '主页  '
    }
```

配置子路由

```
children: [
      {
        path: 'test',
        component: Login
      }
    ]
```

注意一点配置子路由的时候在子页面也要加上 \<router-view />否则也会没有效果

### 传参

> 巨坑,webpack真的是巨坑,自动匹配路由生成js文件,导致我访问二级目录或者多级目录就404,谷歌啊,看文档啊搞一下午才搞定,解决方案

在输出目录加

```
publicPath: '/'
```

在devServer加

```
publicPath: '/'
```

文档讲的模模糊糊,或者本人理解能力有限,虽然最后解决了,但是这还有运气成分在里面



我们可以在路由里面指定一个参数

```JavaScript
{
    path: '/app/:id',
    component: Todo,
    name: 'app',
    meta: {
      title: '主页'
    }
  },
```

看看$router对面里面可以获取到什么

```JavaScript
<router-link to="/app/123"> app </router-link>

.....
 mounted () {
    console.log(this.$route)
  }
```

![](http://on7r0tqgu.bkt.clouddn.com/Frl9N788oDn5Hajq17INw_YtWl-i.png )



我们可以路由里面进行进行props传递

```
{
    path: '/app/:id',
    props: true, // 会传给组件
    component: Todo,
    name: 'app',
    meta: {
      title: '主页'
    }
  },
```

我们在todo里面查看id

```
props: ['id'],
  mounted () {
    console.log(this.id)
  },
```

可以在props里面做很多操作,这样做有利与解耦

```JavaScript
 {
    path: '/app/:id',
    props: (router) => ({ id: router.query.d }),  //获取参数d
    // props: {
    //   id: 123 // 可以直接给值
    // },
    // props: true, // 会传给组件
    component: Todo,
    name: 'app',
    meta: {
      title: '主页'
    }
  },
```

### 命名视图

给路由一个名字,在components里面定义路由下,根据名字显示组件

app.vue

````JavaScript
<transition name="fade">
      <router-view />
    </transition>
    <footers></footers>
    <router-view name="a"/>
````

我们创建两个router-view

在router配置里面配置不一样的名字的组件

```JavaScript
 {
    path: '/app',
    components: {
      default: Todo,
      a: Login
    },
    name: 'app',
    meta: {
      title: '主页'
    }
  },
   {
    path: '/login',
    components: {
      default: Login,
      a: Todo
    },
    name: 'login'
  },
```

这样会有一种互换的效果因为路由名字不一样



### 导航守卫

````
router.beforeEach((to, from, next) => {
  console.log('我是路由守卫beforeEach')
  next()
})
router.beforeResolve((to, from, next) => {
  console.log('我是路由守卫beforeResolve')
  next()
})

router.afterEach((to, from) => {
  console.log('我是路由守卫afterEach')
})
````

![](C:\Users\spring\AppData\Local\Temp\1535631559145.png)

beforeEach可以做验证,必须登录

比如只让login走其他的都不允许路由跳转

```JavaScript
if (to.fullPath === '/login') {
    next()
  }
```

比如强制路由跳转

```
if (to.fullPath === '/app') {
    next('/login')
  }
```

或者进行路由的控制

```
router.beforeEach((to, from, next) => {
  console.log('我是路由守卫beforeEach', to.fullPath)
  if (to.fullPath !== '/app') {
    next({ name: 'app' })
  }
  next()
})
```

也可以配置单路由的路由守卫

```JavaScript
{
    path: '/app',
    component: Todo,
    name: 'app',
    meta: {
      title: '主页'
    },
    beforeEnter (to, from, next) { // 在进入app就会触发 
      console.log('app start')
      next()
    }
  },
```

在组件里面依旧可以创建钩子

```JavaScript
beforeRouteEnter (to, from, next) {
    console.log('todo的守卫开始了')
    next(vm => {
      console.log('获取data数据 filter', vm.filter)
    })
  },
  beforeRouteUpdate (to, from, next) {
    console.log('todo的守卫更新了')
    next()
  },
  beforeRouteLeave (to, from, next) {
    console.log('todo的守卫离开了')
    if (window.confirm('真的真的退出吗')) {
      next()
    } else {}
  },
```



![](http://on7r0tqgu.bkt.clouddn.com/FrT0q74ftI90YZaJF4A9cqnHKbuC.png )

通过路由的变化去触发更新的路由钩子

![](http://on7r0tqgu.bkt.clouddn.com/FoUy3Y6zHgOyMGrhmuCMNHn4nwOS.png )

还可以在路由里面对数据进行控制,但是注意不了直接获取

```JavaScript
 beforeRouteEnter (to, from, next) {
    console.log('todo的守卫开始了')
    next(vm => {
      console.log('获取data数据 filter', vm.filter)
    })
  },
```

或者对填写表单,用户离开时候给一个提示

```JavaScript
beforeRouteLeave (to, from, next) {
    console.log('todo的守卫离开了')
    if (window.confirm('真的真的退出吗')) {
      next()
    } else {}
  },
```

异步组件

使用异步组件需要一个插件

```
npm install babel-plugin-syntax-dynamic-import -D
```

修改一下代码

```JavaScript
const routes = [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app/:id',
    component: () => import('../views/todo/todo.vue'),
    name: 'app',
    meta: {
      title: '主页'
    }
  },
  {
    path: '/login',
    component: () => import('../views/login/login.vue'),
    name: 'login'
  }
]
```

现在就是异步加载组件了,我们的组件会在加载的时候import进来

![](http://on7r0tqgu.bkt.clouddn.com/FmMd7yoEQzFcK_fEwjdgXqw0nYBc.png )



## VueX

> 因为没有接触用它vuex比较多的项目,导致vuex看过就忘了,这次写全一点

安装Vuex

````bash
npm install vuex -S
````

新建文件夹store>store.js

```JavaScript
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    updateCount (state, num) {
      state.count = num
    }
  }
})

export default store
```

在index.js里面引入

```JavaScript
import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'

import './assets/style/global.styl'
import createRouter from './config/router'
import store from './store/store'

Vue.use(VueRouter)
const router = createRouter()

new Vue({
  el: '#root',
  router,
  store,
  render: (h) => h(App)
})
```















