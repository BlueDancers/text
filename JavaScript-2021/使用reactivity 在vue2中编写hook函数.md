# 使用@vue/reactivity 在vue2中编写 Custom hook

## 什么是hook

​	hook 翻译过来是钩子，在程序上体现为**在行为执行之前，先把行为勾住，不让其继续，优先执行你的hook函数**

用一张图来表示即为

> 左边为正常函数执行流程，右边为存在hook的执行流程

<img src="https://images.591wsh.com/2021/11/11/thumb_1636630123367.png" style="zoom:50%;" />

## 没有hook之前，我们如何对待代码复用

​	我们假设一种场景，你正在开发一个后台管理系统，在这个后台管理系统中，大部分都是查询表单，他们虽然业务不同，但是逻辑上存在一定的共性

共性元素：**查询条件 列表数据 分页相关数据 加载状态**

以上4个特征几乎每个表单都有，这就意味这你在写每一个表单的时候都需要重复对接相关的逻辑，这个问题在vue2中存在两种解决办法

- 每次都复制逻辑相同的代码
- 使用vue mixins完成逻辑公用

然而这2种方式都存在问题

- 复制代码低效率，虽然相对稳定，但是编码与测试工作量较大
- `vue mixins`可以实现逻辑抽象，但是这种方案过于简单粗暴的方案，数据全局共享，过多使用`mixin`会导致项目走向失控，是一个比较危险的方案



假设表单页面数据结构如下

```javascript
{
  data: [], // 列表数据
  currentPage: 1, // 当前页面
  pageSize: 0, // 每一个分页的数量
  thePageSize: 0, // 本页数量
  totalPages: 0, // 总页数
  totalSize: 0, // 总记录数
}
```



除了以上后端返回的数据，我们还需要在页面增加一些状态值,用于优化用户体验

```js
status: 'idle' | 'loading' | 'error' | 'success' | ... // 当前列表请求的状态
```



以上的数据 + 状态每一个后台表单页面都存在，这就意味着重复的声明，重复的对接，重复的测试

​	复制代码的方式看似稳定，实则不稳定，因为每一次都要对重复逻辑进行测试，并且由于此类工作繁琐且重复劳动，开发人员一般比较抵触此类任务

​	这个问题在vue2中并没有非常好的解决方案，针对这个问题隔壁react从mixin到HOC最后到现在hook，给出了还不错的解决方案。

​	现在@vue/reactivity提供了hook的能力，我们可以在vue中使用hook来优化提出的问题



## 通过hook来完成逻辑共用

​	接着上面的场景，我们现在假设我们有3个后台表单页面需要写

​	传统编码方案（未使用hook）

<img src="https://images.591wsh.com/2021/11/15/thumb_1636941536140.png" alt="未使用hook" style="zoom:50%;" />

​	可以看到我们需要写的三个页面流程上存在很多相似的地方，对接数据环节，虽然是大部分代码相同，但是还是需要重复的编写测试，例如页码相关，状态相关逻辑



​	使用hook完成重复逻辑抽象

> 每次调用useHook都会生成一次独立的状态
>
> 虽然状态与逻辑依赖与组件，但是useHook可以在组件外部进行定义，这一点是之前无法做到的

<img src="https://images.591wsh.com/2021/11/15/thumb_1636941536427.png" alt="使用hook" style="zoom:50%;" />



​	虽然不同页面的内部逻辑细节都是不一样，但是总体流程、数据结构都是一样的，基于这样的前提，我们就可以针对共性来进行抽象，之后不论多少个页面，我们都使用抽象逻辑，也只需要维护抽象逻辑

## hook并不是vue3的专属

​	在vue3版本中增加了hook的支持，这并不代表vue3与hook是绑定关系，实际上在任何前端应用中都可以使用vue3中提供的hook功能，也就是`@vue/reactivity`

```
npm i @vue/reactivity
```

所以不论是vue3还是vue2，还是react，甚至html都可以使用这个npm包

关于reactivity的具体实现，可以看看我之前的文章 [简易版Reactivity源码解析](https://juejin.cn/post/6974193452300894216)



## 实战（useReqList）

> 为了方便理解，以下代码为vue2.x，使用js进行编写

**useReqList是一个自定义hook，作用是帮助我们抽象后台表单的公共逻辑，我们先看看未使用的情况，使用了之后，代码的变化，再看看如何实现**



### 未使用useReqList

```js
// ...
data() {
  return {
    // ...
    shopList: [], // 数据
    homePage: 0, // 本页有多少数据
    allPage: 0, // 总共多少页
    totalSize: 0, //总共多少条数据
    pageSize: 0, // 每页最多多少条数据
    currentPage: 1, // 当前页码
  }
 },
methods:{
    init() {
      this.loading = true
      const data = {
        currentPage: this.currentPage,
        //...
      }
      request(data) // 请求
        .then((res) => {
          this.shopList = res.data.data
          this.currentPage = res.data.currentPage
          this.pageSize = res.data.pageSize
          this.totalSize = Number(res.data.totalSize)
          this.homePage = res.data.thePageSize
          this.allPage = res.data.totalPages
        })
        .finally(() => {
          this.loading = false
        })
    },
}
```



### 使用useReqList

```js
import { useReqList } from '@/utils/hook/useReqList'
// ...
data() {
  return {
    dataList: useReqList()
  }
},
methods:{
    init() {
      const data = {
        currentPage: this.listData.currentPage || 1,
        //...
      }
      this.listData.run(request(data)) // 请求
    },
}

// let { data, currentPage, pageSize, thePageSize, totalPages, totalSize, status } = this.listData
```



通过上面的例子可以看到，使用了useReqList之后

公共变量，公共逻辑部分被抽象出去，页面代码变得更加纯粹

因为reactivity的特性，它们都是具备响应式

避免重复编码，重复测试环节，节省开发时间



接下里我们可以看看这是如何实现上面使用的自定义（Custom） Hook **useReqList**



### useReqList具体实现

> ​	内部实现就是对公共逻辑的封装，被读取的数据被reactive处理后具备了响应式，每次声明都会因为闭包的特性而开启一片独立的内存来供声明单位使用

```js
import { reactive } from '@vue/reactivity'

/**
 * 针对后台表单页面逻辑的抽象
 * @returns
 */
export function useReqList() {
  const defaultState = {
    data: [], // 表格数据
    currentPage: 1, // 当前页面
    pageSize: 0, // 分页数量
    thePageSize: 0, // 当前页面数量
    totalPages: 0, // 总页数
    totalSize: 0, // 总数量
    error: null, // 错误原因
    status: 'idle', // 当前状态 idle | loading | success | error
  }

  let state = reactive({
    ...defaultState,
  })

  /**
   * 请求成功
   * @param data
   */
  const setData = (data) => {
    state.currentPage = data.currentPage
    state.pageSize = data.pageSize
    state.thePageSize = data.thePageSize
    state.totalPages = data.totalPages
    state.totalSize = Number(data.totalSize)
    state.data = data.data
    state.status = 'success'
  }

  /**
   * 请求失败
   * @param error
   */
  const setError = (error) => {
    state.data = []
    state.currentPage = 1
    state.pageSize = 0
    state.thePageSize = 0
    state.totalPages = 0
    state.totalSize = 0
    state.error = error
    state.status = 'error'
  }

  const setLoading = () => (state.status = 'loading')
  const setPage = (num) => {
    state.currentPage = num
  }

  const setReset = () => {
    state.data = []
    state.currentPage = 1
    state.pageSize = 0
    state.thePageSize = 0
    state.totalPages = 0
    state.totalSize = 0
    state.error = null
    state.status = 'idle'
  }

  const run = (promise) => {
    if (!promise || !promise.then) {
      throw new Error('请传入 promise 类型数据')
    }
    if (['loading'].includes(state.status)) {
      return Promise.reject('当前正在请求中')
    }
    setLoading()

    return promise
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.log(err)
        setError(err)
      })
      .finally(() => {})
  }
  return {
    run,
    setReset,
    setData,
    setPage,
    setLoading,
    setError,
    state,
  }
}
```

​	这样的封装体基本适配大部分vue2.x开发的后台管理系统的项目，如果想在项目中使用只需要修改一下`setData`部分适配一下后端数据即可



### 更多的vue hook函数

​		如果是vue3项目的话，可以使用hook工具库，[VueUse](https://vueuse.org/)，库里面提供了大量的常用方法，掘金上面有该工具库的介绍文章，根据官网说明该库是兼容vue2文档了

```
🎩 VueUse works for Vue 2 & 3 within a single package by the power of vue-demi!
```

作者在这里没有测试，有需要的小伙伴可以试试





## vue项目应当在什么使用下使用hook

### 关于Class API与Composition API

​	从`Class API`/`Option API`转变向[Composition API](https://v3.vuejs.org/guide/composition-api-introduction.html)的过程中是阵痛的，这2种API在思维方式上存在很大差异

​	对于长时间写Class、vue2.x的人来说，最初接触vue3几乎发现不了非常明显的优点，setup语法不熟练的情况下基本还是按照Class的思维进行编码，无法发挥Hook的优势，导致写一段时间Vue3后的结论是：在单文件中class的代码组织能力几乎完爆setup语法...

​	后来组件有一些项目经验，重新学习了react hook，逐渐对hook有了自己的理解；Hook主要完成逻辑与逻辑的分离，在react和vue中使用hook可以实现 **视图与视图的分析，视图与逻辑的分离，逻辑与逻辑的分离**，用这个的方式来实现单一职责，在此基础上完成逻辑与视图的低耦合高内聚的代码



### 关于hook与vuex

从某种意义上来说hook是可以替代vuex的，react中的API useContext就提供了类似功能。但是刚接触hook不久的新手而言，很容易进入一个误区；就是将变量，逻辑封装在一个hook中的情况下，又在多个页面中使用，就会在内存中创建多个不共享的内容一致的空间，这样就出问题了。对于vue hook风格的全局状态管理库，我建议可以试试[Pinia](https://pinia.esm.dev/)

## 结语

​	使用过了一段时间的setup语法之后，对其看法也是慢慢从谨慎疑惑转变成为拥抱hook，Composition API 在逻辑抽象、类型推导、多方面均占优，虽然目前还存在一些小问题，但是相信尤大都会给开发一个答案，在未来，Custom Hook将会越来越普及，拥抱Custom Hook,Vue3吧!

如果使用中遇到了什么问题，请到QQ群 530496237，一起吹吹水

也可以添加我的微信：carpediem-rollin，加入微信群