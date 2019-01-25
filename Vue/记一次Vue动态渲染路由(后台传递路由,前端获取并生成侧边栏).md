# 记一次Vue动态渲染路由的实现

背景: 公司打算做一个(cms),最开始前端参照[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)的思路,验证了前端鉴权的可能性,大佬写的代码思路清奇,值得学习,后来考虑诸多因素,接口安全性 前端鉴权的难度 以及项目的复杂度,最后选择采用后端渲染动态路由的形式



使用的是Vue+Element的后台管理模板[github](https://github.com/PanJiaChen/vue-admin-template)

思路参考了一下文章

[Vue 动态路由的实现(后台传递路由，前端拿到并生成侧边栏)](https://segmentfault.com/a/1190000015419713)

[issues/293](https://github.com/PanJiaChen/vue-element-admin/issues/293)



### 实现思路

> 基础的一些思路和Vue 动态路由的实现[Vue 动态路由的实现(后台传递路由，前端拿到并生成侧边栏)](https://segmentfault.com/a/1190000015419713)一样,核心部分加入了自己的理解

![思路图](http://www.vkcyan.top/FiqftUsSXXL0V_Yp1cd7EfnQEySH.png)





1. 每次路由跳转 先判断 是否登录 登录了才会去进行路由相关逻辑 
2. 获取变量`getRouter`,存在则直接放行 因为路由配置存在
3. 假如刷新页面`getRouter`变量就不存在了,所以 就要在去获取一次 
4. 获取到了在存储到`getRouter`上,便于以后使用,减少请求



> 以下为具体实现思路

## 配置基础路由

> 基础路由为不登录也可以访问的路由

```js
const StaricRouterMap = [
  {
    path: '/login',
    component: login,
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'dashboard',
    hidden: true,
    meta: { title: '根目录' },
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index')
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }, // .... 
]
export default new Router({
  mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: StaricRouterMap
})
```

与后端同学定制路由结构 (以下为json) 

> 后端会根据当前用户权限动态返回路由结构 前端不再需要考虑权限问题  

```json
[{
  "id": 1,
  "name": "Nested",
  "code": null,
  "description": null,
  "url": "/nested",
  "generatemenu": 0,
  "sort": 0,
  "parentId": null,
  "permName": null,
  "redirect": "/nested/menu1",
  "title": "Nested",
  "icon": "nested",
  "children": [{
    "id": 2,
    "name": "Menu1",
    "code": null,
    "description": null,
    "url": "menu1",
    "generatemenu": 0,
    "sort": 0,
    "parentId": 1,
    "permName": null,
    "redirect": "",
    "title": "Menu1",
    "icon": "menu1",
    "children": [{
      "id": 4,
      "name": "Menu1-1",
      "code": null,
      "description": null,
      "url": "menu1-1",
      "generatemenu": 0,
      "sort": 0,
      "parentId": 2,
      "permName": null,
      "redirect": "",
      "title": "Menu1-1",
      "icon": "",
      "children": null
    }, {
      "id": 5,
      "name": "Menu1-2",
      "code": null,
      "description": null,
      "url": "menu1-2",
      "generatemenu": 0,
      "sort": 0,
      "parentId": 2,
      "permName": null,
      "redirect": "",
      "title": "Menu1-2",
      "icon": "",
      "children": null
    }]
  }, {
    "id": 3,
    "name": "Menu2",
    "code": null,
    "description": null,
    "url": "menu2",
    "generatemenu": 0,
    "sort": 0,
    "parentId": 1,
    "permName": null,
    "redirect": "",
    "title": "Menu2",
    "icon": "menu2",
    "children": null
  }]
}]
```

## 解析后端初始路由数据为可用数据



当然这不是直接用于渲染路由 我们需要进行递归处理成为我们想要的数据

`../router/_import`

```js
export default file => {
  return map[file] || null
}

const map = {
  Nested: () => import('@/views/layout/Layout'),
  Menu1: () => import('@/views/nested/menu1/index'),
  'Menu1-1': () => import('@/views/nested/menu1/menu1-1'),
  'Menu1-2': () => import('@/views/nested/menu1/menu1-2')
}
```

处理后端原始路由数据

`../utils/addRouter`

```js
import _import from '../router/_import'// 获取组件的方法

function addRouter(routerlist) {
  routerlist.forEach(e => {
    // 删除无用属性
    delete e.code
    delete e.sort
    delete e.generatemenu
    delete e.description
    delete e.permName
    delete e.id
    delete e.parentId

    e.path = e.url
    delete e.url
    e.component = _import(e.name) // 动态匹配组件
    if (e.redirect === '') {
      delete e.redirect
    }
    if (e.icon !== '' && e.title !== '') { // 配置 菜单标题 与 图标
      e.meta = {
        title: e.title,
        icon: e.icon
      }
    }
    if (e.title !== '' && e.icon === '') {
      e.meta = {
        title: e.title
      }
    }
    delete e.icon
    delete e.title
    if (e.children != null) {
      // 存在子路由就递归
      addRouter(e.children)
    }
  })
  return routerlist
}

export { addRouter }
```

处理后的路由

> 我们处理后的路由后面需要与现有的router进行拼接,这里需要根据需求 修改处理路由的规则

```json
[{
  "name": "Nested",
  "redirect": "/nested/menu1",
  "children": [{
    "name": "Menu1",
    "children": [{
      "name": "Menu1-1",
      "children": null,
      "path": "menu1-1",
      "meta": {
        "title": "Menu1-1"
      }
    }, {
      "name": "Menu1-2",
      "children": null,
      "path": "menu1-2",
      "meta": {
        "title": "Menu1-2"
      }
    }],
    "path": "menu1",
    "meta": {
      "title": "Menu1",
      "icon": "menu1"
    }
  }, {
    "name": "Menu2",
    "children": null,
    "path": "menu2",
    "component": null,
    "meta": {
      "title": "Menu2",
      "icon": "menu2"
    }
  }],
  "path": "/nested",
  "meta": {
    "title": "Nested",
    "icon": "nested"
  }
}]
```

## (核心)合并路由

以上的都是准备工作,就是为了将`初始路由`与后端返回的`动态路由`进行拼接

这里也是最复杂的一块,参考了一些别人的思路,后来完成了这个版本,这就是最上面`实现思路`的代码





```js
import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import { Message } from 'element-ui'
import { addRouter } from './utils/addRouter'

var getRouter
router.beforeEach((to, from, next) => {
  NProgress.start() // 进度条
  if (localStorage.getItem('login_static') === '1') {
    if (to.path === '/login') {
      Message('您已登录,如需切换用户请退出重新登录')
      next({ path: '/' })
    }
    if (!getRouter) {
      if (getRouterList('router')) {
        // 路由信息存在 说明请求阶段以及完成 直接解析路由信息
        getRouter = getRouterList('router') // 拿到路由
        gotoRouter(to, next)
      } else {
        // localStorage不存在路由信息 这需要 请求路由信息 并解析路由
        setRouterList(to, next) // 存储路由到localStorage
      }
    } else {
      // getRouter变量存在 说明路由信息存在 直接通过
      next()
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next(`/login`)
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})

function gotoRouter(to, next) {
  try {
    getRouter = addRouter(getRouter)
    router.addRoutes(getRouter) // 动态添加路由
    global.antRouter = router.options.routes.concat(getRouter) // 将路由数据传递给全局变量，做侧边栏菜单渲染工作
    next({ to, replace: true })
  } catch (error) {
    localStorage.setItem('login_static', 0)
  }
}

function setRouterList(to, next) {
  store.dispatch('getRouter').then(asyncRouter => { // 请求路由数据
    localStorage.setItem('router', JSON.stringify(asyncRouter))
    getRouter = getRouterList('router') // 拿到路由
    gotoRouter(to, next)
  })
}

function getRouterList(name) {
  return JSON.parse(localStorage.getItem(name))
}
```



## 修改侧边栏的应用路由地址

需要注意的是 通过 addRoutes合并的路由 不会被`this.$router.options.routes`获取到,所以需要将获取的路由拼接到`this.$router.options.routes`上

最后修改渲染侧边栏部分部分的代码

`src\views\layout\components\Sidebar\index.vue`

```js
 computed: {
	// ....
    routes() {
      return global.antRouter // 这里应该最好使用vuex的全局变量
    },
   	// ....
  }
```







这样就实现了动态渲染后端传递的路由,,感觉还是用可以优化的地方,欢迎指正

![](http://www.vkcyan.top/FqRpl-_ZGafQh4p9ND1l6FO_GEvA.gif)









