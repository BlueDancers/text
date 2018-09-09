---
title: Vue-router与Vuex
date: 2018-8-28
tags: 
  - Vue
categories: Vue
---



# Vue-router与Vuex特性总结

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

export default () => {
  return new Vuex.Store({
    state: {
      count: 0
    },
    mutations: {
      updateCount (state, num) {
        state.count = num
      }
    }
  })
}
```

在index.js里面引入

```JavaScript
import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import './assets/style/global.styl'
import createRouter from './config/router'
import createstore from './store/store'

Vue.use(VueRouter)
Vue.use(Vuex)

const router = createRouter()
const store = createstore()

new Vue({
  el: '#root',
  router,
  store,
  render: (h) => h(App)
})
```

### mutations

mutations里面的方法可以通过commit来进行使用

````
mounted () {
    console.log(this.$store)
    let i = 1
    setInterval(() => {
      this.$store.commit('updateCount', i++)
    }, 2000)
  },
  computed: {
    count () {
      return this.$store.state.count
    }
  }
````

在应对大型的数据的时候,我么你的vuex尽可能的分模块,

```javascript
import Vuex from 'vuex'
import defaultState from './state/state'
import defauleMutations from './mutations/mutations'
export default () => {
  return new Vuex.Store({
    state: defaultState,
    mutations: defauleMutations
  })
}

```



### getters

getters可以对data数据进行二次处理

````JavaScript
export default { // 可以理解为computed
  fullName (state) {
    return `姓名:${state.name},年龄:${state.count}`
  }
}
````



```JavaScript
computed: {
    count () {
      return this.$store.state.count
    },
    fullName () {
      return this.$store.getters.fullName
    }
  }
```



> 使用es7 甚至es8的语法

```
npm install babel-preset-stage-1 -D
```



`this.$store.state.count`这样的写法并不是很好,官方提供了一个辅助函数`mapState`,当一个组件需要获取多个状态时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 `mapState` 辅助函数帮助我们生成计算属性 

##### mapState

````JavaScript
import { mapState } from 'vuex'
computed: {
    ...mapState(['count']),
  }
````

还可以是对象或者函数的写法

````
 ...mapState({
      counter: 'count'
    }),
````

 ```
...mapState({
      counter: (state) => {
        return state.count
      }
    }),
 ```

##### mapGetters 

```JavaScript
...mapGetters(['fullName'])

//..............

...mapGetters({
      fullName: 'fullName'
})
```

### mutations

更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 **事件类型 (type)** 和 一个 **回调函数 (handler)**。

假如要传递多个参数

```JavaScript
updateCount (state, { num, num2 }) {
    console.log(num2)
    state.count = num
  }
```

传一个对象,返回通过解构去得到参数

当然数据可以直接修改,但是不推荐这么做

我们在开发环境可以使用strict去限制

````
const isDev = process.env.NODE_ENV === 'development'

export default () => {
  return new Vuex.Store({
    strict: isDev,
    state: defaultState,
    mutations,
    getters
  })
}

````

这时候我么在去直接修改store里面的数值,vue就发出警告

````JavaScript
this.$store.state.count = 1
````

````base
[Vue warn]: Error in callback for watcher "function () { return this._data.$$state }": "Error: [vuex] Do not mutate vuex store state outside mutation handlers."
````

### actions

这就是异步的mutations,但是我们可以再actions里面处理mutations,使用promise来进行控制等等

```JavaScript
export default {
  updateCountSync (store, data) {
    setTimeout(() => {
      store.commit('updateCount', data.num)
    }, data.time)
  }
}
// .....
this.updateCountSync({
   time: 2000,
   num: 5
})
```

### mapActions, mapMutations 

>  组件绑定的辅助函数

```JavaScript
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
// .....
 methods: {
    ...mapActions(['updateCountSync']),
    ...mapMutations(['updateCount'])
  }
// .......
mounted () {
  this.updateCountSync({
    time: 2000,
    num: 5
  })
  let i = 1
  setInterval(() => {
  	this.updateCount(i++)
  }, 2000)
}
```



## Vuex的模块化

当业务变的非常庞大的时候,业务的所有状态都会集中在一个对象里面,当业务变动非常复杂的时候,vue允许我们将store分割成模块(module),每个模块都有他的state、mutation、action、getter 

### state

```
export default () => {
  return new Vuex.Store({
    strict: isDev,
    state: state,
    mutations,
    getters,
    actions,
    modules: {
      a: {
        state: {
          text: 1
        }
      },
      b: {
        state: {
          text: 2
        }
      }
    }
  })
}
```

调用

```JavaScript
testA () {
      return this.$store.state.b.text
},
```

或者

```
...mapState({
     textA: state => state.a.text
   }),
```

### mutations

> 用法和全局mutations一样,vue会自动给我们挂载到全局
>
> 当然可以设置单独的命名空间

```JavaScript
a: {
        namespaced: true, // 设置单独的命名空间
        state: {
          text: 1
        },
        mutations: {
          updateText (state, text) {
            console.log(state)
            state.text = text
          }
        }
      },
 // .........
methods: {
 ...mapMutations(['updateCount', 'a/updateText'])
}

mounted () {
  this['a/updateText'](123)  //调用
}
```

### getters

```javascript
getters: {
          textPlus (state) {
            return `我是${state.text}`
          }
        }
//...........
computed: {
  ...mapGetters(['fullName', 'a/textPlus'])
}
mounted () {
  this['a/updateText'](123)
}
```

这样写没办法写在模板里面,我们可以改一下代码

```
  ...mapGetters({
      'fullName': 'fullName',
      'textPlus': 'a/textPlus'
    })
```

这样在模板里面就可以{{ textPlus }} 使用了

### 在局部vuex里面可以获取全局的vuex的state

```JavaScript
 getters: {
          textPlus (state, getters, rootState) { // 第二参数是所有getters的方法 第三参数是全局的state
            return `我是${state.text},全局state${rootState.count}`
          }
        }
```

既然可以获取全局,必然可以获取你想要的模块的state

### actions 

关于actions基本功能和上面类似,但是在分模块上面存在全局 以及模块将的数据调用

````JavaScript
	 actions: {
          add ({ state, commit, rootState }) {
            // commit('updateText', 20)
            commit('updateCount', 100, {root: true}) // 加上{root: true}就是调用全局的vex的mutations
          }
        }
````

调用上面个mutations一样的,以为呢这里加入了命名空间,所以调用要加前缀

```JavaScript
methods: {
    ...mapActions(['updateCountSync', 'a/add']),
    ...mapMutations(['updateCount', 'a/updateText'])
  }
mounted () {
    console.log(this.$store)
    // this.updateCountSync({
    //   time: 2000,
    //   num: 5
    // })
    let i = 1
    setInterval(() => {
      this.updateCount(i++)
    }, 2000)
    this['a/add']()
  },
```

### 动态注册模块

模块动态注册功能使得其他 Vue 插件可以通过在 store 中附加新模块的方式来使用 Vuex 管理状态。例如，[`vuex-router-sync`](https://github.com/vuejs/vuex-router-sync) 插件就是通过动态注册模块将 vue-router 和 vuex 结合在一起，实现应用的路由状态管理。 

```JavaScript
store.registerModule('c', {
  state: {
    text: 33232323
  }
})
```



## vuex的热重载

关于vuex的来热重载,官方给了详细的配置[热重载](https://vuex.vuejs.org/zh/guide/hot-reload.html#%E7%83%AD%E9%87%8D%E8%BD%BD)

这里根据我自己的环境来配置热重载

```javascript
import Vuex from 'vuex'
import state from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'
const isDev = process.env.NODE_ENV === 'development'

export default () => {
  const store = new Vuex.Store({
    strict: isDev,
    state: state,
    mutations, // 同步方法
    getters, // 处理state
    actions // 异步方法
  })
  if (module.hot) {
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './getters/getters',
      './actions/actions'
    ], () => {
      const newState = require('./state/state').default
      const newMutations = require('./mutations/mutations').default
      const newGetters = require('./getters/getters').default
      const newActions = require('./actions/actions').default

      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        getters: newGetters,
        actions: newActions
      })
    })
  }
  return store
}
```

## Vuex的其他API

store.watch

```JavaScript
store.watch(
  (state) => {
    return state.count
  },
  (newCount) => {
    console.log('state的count更新了', newCount)
  }
)
```

只要state,count发生变化,就会执行回调

要停止侦听，调用此方法返回的函数即可停止侦听

store.subscribe   订阅 store 的 mutation 

```JavaScript
store.subscribe((mutations, state) => {
  console.log(mutations.type) // 传入的值
  console.log(mutations.payload) // 接受的参数
})
```

只要mutations被调用,就会触发这个

store.subscribeAction 订阅 store 的 action

```javascript
store.subscribeAction((action, state) => {
  console.log(action.type) // 传入的值
  console.log(action.payload) // 接受的参数
})
```

一个vuex+vue-router的项目构架

![](http://on7r0tqgu.bkt.clouddn.com/FtOzc0LclVcvmX62-7IVAvacI3Sh.png )







