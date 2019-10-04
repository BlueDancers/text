## Vue单页SPA后台管理点击刷新当前页面

### 前言

​	使用vue都知道 SPA页面中跳转当前页面是不会有反应的,例如 在login页面使用`this.$router.push('login')`,页面是不会出现任何现象的,push的路由也不会进入你是记录,那么我们如何实现在单页应用的刷新呢?

需求: 点击左侧菜单的当前导航页面属性![](http://www.vkcyan.top/FqZNyDZNAbZkHZ5I1JNI2gOsyZb6.png)

我们看一下Vue-router的文档

[导航式编程](<https://router.vuejs.org/zh/guide/essentials/navigation.html#router-push-location-oncomplete-onabort>)

```
router.push() // 添加一个新的记录
router.replace() // 不会向 history 添加新记录
router.go(n) //向前或者后退多少步 
```

很显然没刷新当前页面的api,这个问题,已经有大佬进行了解决,就是[TagsView](<https://github.com/PanJiaChen/vue-element-admin/blob/master/src/layout/components/TagsView/index.vue>),有兴趣的可以看看实现方法

![](http://www.vkcyan.top/FpRroXHpyrFOt0AMjWLsVaQMONyt.png)

参考的大佬的思路.在左侧菜单导航栏上面也实现了点击刷新当前页面



### 思路

> 很明显,单页应用不存在自己跳转到自己的api,所以我们需要借助中间页面进行跳转

1. 创建一个中间页面`redirect`
2. 刷新自己不应该添加到浏览记录里面,所以使用`router.replace()`,并携带当前页面的路由路径
3. 在中间页面的`created`函数中获取携带的参数路由路径,并进行再次`router.replace()`完成当前页面的刷新



因为这里使用的[vue-admin-template](<https://github.com/PanJiaChen/vue-admin-template>),所以需要对侧边栏进行一些修改

`src\views\layout\components\Sidebar\SidebarItem.vue`

```html
<template>
	// ....
      <app-link :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
          @click="reload(item)" // 添加点击方法
        >
          <item :meta="Object.assign({}, item.meta, onlyOneChild.meta)" />
        </el-menu-item>
      </app-link>
    </template>
// ....
</template>

<script>
export default {
  methods: {
   // ...
    // 点击重载
    reload(item) {
      // 如果发现当前路由与点击的路由一致就携带路由路径跳转到redirect页面
      if (this.$route.name === item.name) {
        this.$nextTick(() => {
          // params 默认会解析成为path字段,如果使用参数的形式 / 会来解析成为%
          this.$router.replace({
            path: '/redirect' + this.$route.fullPath,
          })
        })
      }
    }
  }}
</script>

```



创建中转页面

`src\views\redirect\index.vue`

```
<script>
export default {
  created() {
    console.log(this.$route);
    const { params, query } = this.$route
    const { path } = params
    this.$router.replace({ path: '/' + path, query })
  },
  render: function (h) {
    return h() // avoid warning message
  }
}
</script>
```



配置路由

```js
{
    path: '/redirect',
    component: Layout,
    name: 'redirect',
    hidden: true,
    children: [
      {
        path: '/redirect/:path*', // path为默认名称 通配符*必须存在 反之404
        component: () => import('@/views/redirect/index')
      }
    ]
  }
```





### 实现效果

![](http://www.vkcyan.top/FiKdrVzhuN1l_bywlLfC-9TXP9HZ.gif)



demo已经部署到github,项目地址 [vue-element-asyncLogin](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Fvkcyan%2Fvue-element-asyncLogin)， 如果对你有帮助，请不要吝啬你的start~~😄