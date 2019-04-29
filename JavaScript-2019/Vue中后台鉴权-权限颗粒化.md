## Vue中后台-一行代码解决权限颗粒化



因为项目的后端接口部署在[easy-mock]()上面，所以接口偶尔会挂掉，如果出现登录网络错误，肯定是easy-mock挂了，过段时间就好(感谢easy-mock的开发者以及维护者)



![](http://www.vkcyan.top/FrMSq8o3pbYN1jI1ZNJUIi4RfYq4.svg)

借用大佬的一张图，侵权立删



说一行代码有点夸大的意思，感谢vue提供了完善的api，让我们可以用最少的代码实现功能，这也是我自己想出来的，所以保不齐存在一些考虑不周的问题，如果有问题请评论🤣 



### 前言

上星期在掘金发布了[Vue中后台鉴权的另一种思路 - 动态路由的实现与优化](https://juejin.im/post/5caeb3756fb9a068967791b3)，有同志在评论下提出了一些问题

1. vue单点登录怎么做

   我之前写过一个全栈项目，[vue+koa2+jwt实现单点登录 + todolist增删改查](https://github.com/vkcyan/login_push)，有项目介绍，感兴趣的话可以看看😄 

2. 如果需要大量的按钮级的权鉴 该怎么做

   本次文章的主题，这个需求在中后台很常见，在同一个管理表单中，某些按钮是不可以让没有权限的人操作的，那么就需要将按钮进行权限的划分，也就是权限颗粒化

最新案例已经更新到github，欢迎体验~~ [vue-element-asyncLogin](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Fvkcyan%2Fvue-element-asyncLogin)， 你的start是我的动力!

### 实现思路

- 根据后端返回的权限列表进行按钮的控制
- 需要利于维护，并且较少的代码进行功能的实现

![](http://www.vkcyan.top/FpyFq8f14emZFXjKGnPOvKf-SR8g.png)

### v-if的实现

很显然这个使用`v-if`就可以完成这个需求，撸一个权限数列的公共效验函数，然后在v-if中进行使用，但是这样有一个缺点

每个需要效验权限的页面都需要引入文件，并进行代码的调用，才能在页面中使用 `v-if`

示例代码:

`src\utils\index.js`

```JavaScript
import store from '../store'

/**
 * 效验权限
 * @param {String} e 权限标号
 */
export function permit(e) {
    return store.getters.roles.includes(e)
}

```

`src\views\dashboard\index.vue`

```JavaScript
<el-button v-if="basePermit('edit')" type="warning">修改</el-button>
<el-button v-if="basePermit('view')" type="success">查看</el-button>

import { permit } from '../../utils/index.js'
// ...
methods: {
    basePermit(e) {
        return permit(e)
    }
}
```

这样虽然可以实现，但是很麻烦，很多页面都需要的话，代码繁琐，这不是我们想要的



### 自定义指令的实现

对于权限颗粒化来说，我们可以感觉到，功能比较简单，并且很多页面都要用，那为什么不使用一种全局都可以使用的方法来实现呢?

使用自定义指令就可以实现，代码也会变的异常简单

1. 在你页面发生刷新的时候进行权限列表的请求
2. 存储到vuex或者浏览器
3. 创建自定义指令

`src\utils\directive.js`

```JavaScript
import Vue from 'vue'
import store from '../store'
/**
 * @export 自定义指令
 */
export function directive() {
  Vue.directive('permit'， {
    bind(el， binding) {
        // 一行三目运算符就可
      !store.getters.roles.includes(binding.value) ? el.parentNode.removeChild(el) : {}
    }
  })
}

```

4. 需要引入`src\main.js`

```JavaScript
import { directive } from './utils/directive'
// ....
directive()
// ....
```



我们在项目中如何使用自定义指令进行按钮级别的权限控制呢?

很简单

```javascript
<el-button v-permit="'add'" type="primary">增加</el-button>
<el-button v-permit="'delete'" type="danger">删除</el-button>
<el-button v-permit="'edit'" type="warning">修改</el-button>
<el-button v-permit="'view'" type="success">查看</el-button>
```

完事了~~~~

> demo链接在文章底部

### 项目截图

![](http://www.vkcyan.top/FtVXRQYI13rqPITGU8WRFvBVayMQ.png)

![](http://www.vkcyan.top/FuV70bfznILgtJx4vr3emST5rpe5.png)



你学会了吗😄 



项目地址 [vue-element-asyncLogin](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Fvkcyan%2Fvue-element-asyncLogin)， 如果对你有帮助，请不要吝啬你的start~~😄 