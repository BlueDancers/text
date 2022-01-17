# 使用iframe+postMessage通信实现商城多页面装修

## 演示视频

[演示视频](http://www.vkcyan.top/FkONMVoZGfZgYB3nQ5Rphx21qdJm.mp4)

## 背景

​	开发项目是多商家的类似有赞的商城后台，需要支持客户端的店铺装修功能

​	系统用户多为企业用户对页面效果要求较高，导致首页变化非常频繁

## 前言

2020年第一版本装修上线了，方案是后台“模拟”客户端样式实现可视化，实现首页装修功能

**实际上也就是后台写一套与客户端一样的样式解析装修json，实现装修预览的效果**

<img src="http://www.vkcyan.top/FjW_Ggj8OUF_yyXPUmEqhb_ZV_sz.jpg" style="zoom:50%;" />



模拟版本的装修上线后，确实解决了多店铺个性化首页的问题，实现了定制化首页，但是随着时间的推移，模拟版本暴露了很多问题，高频率的改版导致需求几乎无法满足

- 装修数据为静态数据，不会根据商城商品状态而变化，例如某某商品下架了，但是首页装修数据里面依旧存在

- 每次客户端样式发生变化，后台都需要同步编写一份，否则就无法可视化，导致工作量非常大

- 不具备扩展性，只能可视化的装修首页，无法可视化装修其他页面，其他页面都是通过一个插槽实现

  
  
  > 插槽就是一个json对象的载体，因为不想写2套样式，所以采取这种很抽象的方案
  
  <img src="http://www.vkcyan.top/FmoSmHV2rJV4yhoA_k90hjQHAlmH.png" style="zoom:40%;" />



随着业务的拓展，暴露出来的问题也是越来越严重，为了满足需求，很多场景下需要牺牲整个技术部门的效率，以及使用者的体验感，为了解决这个问题必须另辟蹊径，寻找其他解决方案



新方案必须解决以下问题

- 装修中的商品数据必须为非静态数据
- 避免2套样式的问题



装修中的商品数据实时刷新可以通过约定有规律的数据结构，后端解析并实时更新商品数据，实现装修中数据的更新

抛弃模拟方案后，也是思考很多方向，但是因为基于业务组件装修是没办法整个装修数据都json化的，所以最终尝试了一个理论上可行的方案，**客户端通过iframe嵌入到后台，使用postMessage来完成后台与客户端之间的数据交互，实现装修功能**



## 方案逻辑图

![image-20210325162524064](http://www.vkcyan.top/FmwdPswVZevT3ff2Dy4oLQXt_n2H.png)

后台装修与客户端的主要思路

- 装修模式下获取上次的装修记录
- 建立前后台iframe之前的的联系
- 后台装修发生变化，触发watch，watch触发postmessage，客户端得到相应，客户端watch触发，实时更新装修数据
- 装修完成保存到数据库



## 具体实现方案

之前在掘金发布过一篇[（开源）从0打造H5可视化搭建系统 - 易动（vue+ts+egg）](https://juejin.cn/post/6844904095971540999)文章，易动是更加灵活的装修方案，感兴趣的同学可以了解一下

按**基础组件**定制装修方案，基础模块为： 按钮 文本 图片 轮播图此类数据 等等

本次的装修是基于业务组件进行区分，他的核心原理就是通过iframe进行数据交互实现实时装修功能



### 定制组件数据结构

客户端根据json数据进行组件的展示的，所有首先，我们需要定义好客户端与后台通用的数据结构，用于声明我们的装修数据

![image-20210325173306995](http://www.vkcyan.top/FmoSmHV2rJV4yhoA_k90hjQHAlmH.png)

> 例如我定义的数据结构，仅供参考 示例  搜索框 轮播图

````js
{
  id: guid(),
    compName: 'drag-search',
      name: '搜索框',
        data: [
          {
            placeholder: '想要什么呢,快来搜一下吧',
            tbHeader: false, // 是否显示淘宝推荐
            isUpdate: false
          }
        ]
},
  {
    id: guid(),
      compName: 'drag-swiper',
        name: '轮播图',
          data: [
            {
              interval: 5000,
              data: [], // 数据
              item: {
                // 单个数据
                img:
                'https://images.591wsh.com/2021/02/03/thumb_32371580472397824.png',
                isLogin: false, // 是否需要登录,
                linkType: 2, // 1 无链接 2 商品 3 外部链接 4分类
                commodity: {}, // 商品id
                dataurl: '', // 外部链接
                categoryid: '', // 类目id
              },
              isUpdate: true // 告诉服务器是否需更新data里面的商品数据
            }
          ],
            css: {
              height: 266, //
              marginTop: 20
            }
  },
````



### 为装修中的客户端页面增加一个组件

> 增加，修改，删除都会走如下逻辑，一句话说就是数据后台操作数据，客户端可以做出响应

```js
// 后台点击右侧装修组件，例如点击 搜索框
// 匹配到搜索框的文字匹配定制的数据结构，得到如下点击的数据结构
{
  id: guid(),
    compName: 'drag-search',
      name: '搜索框',
        data: [
          {
            placeholder: '想要什么呢,快来搜一下吧',
            tbHeader: false, // 是否显示淘宝推荐
            isUpdate: false
          }
        ]
},
 // 后台通过监听存储装修数据变化的字段通知到客户端
 computed: {
   // .....
   // 可使用组件
   pageComponents: {
     get() {
       let { pageComponents } = this.$store.state.template
       if (pageComponents instanceof Array) {
         // 组件数据发生变化的时候需要通知到客户端
         this.iframeMessage(pageComponents)
         return pageComponents
       } else {
         return []
       }
     },
       set(data) {
         // 更新组件顺序
         this.$store.commit('template/update_current', data)
       }
   }
   // ......
 },
 methods:{
   // iframe加载完成的回调函数
   iframeLoad() {
     console.log('iframe加载完成')
     this.frm = document.getElementById('iframe')
     // 告诉客户端，目前处于装修中
     this.frm.contentWindow.postMessage(
       {
         isIframe: true
       },
       '*'
     )
   },
   // 通知客户端数据发生了更新
   iframeMessage(data) {
     console.log(data)
     if (this.frm) {
       this.frm.contentWindow.postMessage(
         {
           tempLateData: data
         },
         '*'
       )
     }
   }, 
 }
  


// 客户端通过postMessage进行最新的装修数据接收
window.addEventListener('message', _fundecoratio)
function _fundecoratio(event) {
	// ....
  if (event.data.tempLateData) {
    store.commit('app/setTempLateData', event.data.tempLateData)
  }
  // ....
}

// 客户端对应的页面再监听存在在vuex中的装修数据
computed: {
  ...mapState({
    tempLateData: state => state.app.tempLateData, // 后台的装修数据
    hoverComponent: state => state.app.hoverComponent, // 当前鼠标浮动的元素id
    clickComponent: state => state.app.clickComponent, // 当前鼠标点击选中的数据 
    isIframe: state => state.app.isIframe, // 当前是否在装修模式里面
  }),
},

// 客户端替换从接口获取的之前的页面装修数据，装修数据显示在页面上
watch: {
  tempLateData() {
    // 一旦后台通过postMessage更新装修数据，就可以替换原本接口获取的数据，实现实时装修功能
    this.indexData = this.tempLateData || []
  },
},
```

![](http://www.vkcyan.top/FkLVh0uBTQ_aCzi_TLHJV0qgmYby.gif)



### 修改装修的组件数据

```html
// 后台选取选中的组件
// 后台针对每个装修组件都建立一个vue文件进行json内数据的改变‘
// activeComponent.compName 为选中的组件compName，例如我选中搜索框 这里就是`drag-search-data`组件，这里可以是xxx-xxx-data组件

<template>
  <div class="template_right">
    <component
      v-if="activeComponent != false && activeComponent.compName"
      :is="activeComponent.compName + '-data'"
      :compData="activeComponent"
    ></component>
  </div>
</template>


// 组件内部绑定搜索框的提示文字，每次修改都会触发后台的计算属性·pageComponents·，进而后台通过postMessage通知到客户端，客户端进而存储到vuex，vuex值发生变化，客户端页面的watch起作用，页面发生变化，就吃实现组件数据的变化
```

![](http://www.vkcyan.top/FqDdNNWXT6pYZtAi_WxdzsuSvoYq.gif)



### 点击客户端组件，通知后台并实现选中

我们知道，在装修里面点击客户端，就直接点击到了客户端，所以点击客户端的跳转函数，我们必须进行拦截，

````js
// 前提须知 客户端每个装修组件的id都会在客户端写入到class中
<component :is="xxxxx":class="[`decoration_${item.id}`,]"></component>

// 装修监听函数体内
window.addEventListener('message', _fundecoratio)
function _fundecoratio(event) {
	// ....
 if (event.data.isIframe) {
    console.log('装修开发模式启动')
    store.commit('app/setIsIframe', true)
    // 拦截跳转函数
    uni.navigateTo = () => {}
    uni.switchTab = () => {}
    // 监听点击(装修用于选中组件)
    window.addEventListener('click', _decoratioclick, false)
  }
  // ....
}
function _decoratioclick(event) {
  let path: string = ''
  // 每次点击的时候都获取一下包含组件id的class
  event.path.map((res: any) => {
    if (res.className && res.className.includes('decoration_')) {
      path = res.className.split('decoration_')[1]
    }
  })
  // 选中客户端当前组件
  store.commit('app/setClickComponent', path)
  // 告知父级当前选中组件
  window.parent.postMessage(
    {
      activePage: path, // 将当前点击的组件id通过postMessage传递到后台
    },
    '*'
  )
}

// 装修后台
mounted() {
  window.addEventListener(
    'message',
    e => {
      if (e.data.activePage) { // 获取客户端传递过来的当前组件id 这就是实现点击客户端组件装修后台得到数据
        this.$store.commit('template/set_activeComponent', e.data.activePage)
      }
    },
    false
  )
},
````

![](http://www.vkcyan.top/FkAjxtq0DWusJdxIRvtIRALo9r2F.gif)



### 添加组件到页面的流程图

![image-20210326092121131](http://www.vkcyan.top/FqSMCNAqYsrThHA6jouw5mRI2lOz.png)

## 客户端与装修后台相互传值总结

````js
// 客户端发送
window.parent.postMessage(
  {
  	activePage: path,
  },
  '*'
)

// 客户端接收
window.addEventListener('message', （）=> {
  // ....
})

// 装修后台发送
this.frm = document.getElementById('iframe')
this.frm.contentWindow.postMessage(
  {
     // .....
  },
  '*'
)

// 装修后台接收
window.addEventListener('message',e => {
    // ...
})
````

postMessage的数据都是实时监听的，所以任意一边传值另一边都可以快速接收到，这是实现本方案的核心，通过postMessage解决了通信上的所有问题，例如

- 装修后台点击对应组件，客户端可以得到当前点击的组件的id
- 客户端点击组件可以告知后台，当前用户选中的组件
- 包括没实现的拖拽排序，都是可以实现的

## 多页面装修

> 做页面装修一定要想明白一件事，我们玩的不是装修，只是在操作页面抽象的数据结构

根据上面的想法，我们可以明白，活动页面很多仅仅是换换商品，换换链接，不会动不动就改页面

那个就可以抽象活动页的json数据结构

<img src="http://www.vkcyan.top/FoDAwnHCHWm2UxhS5Aq8pk9f2WE6.png" style="zoom:30%;" />

那么这里对应的就**是图片组件 图片组件（优惠券也是图片样式） 商品组件 商品组件**

在装修的时候我们定义好数据结构，依次添加这几个组件，客户端活动增加一行watch代码，就可以完美的实现活动页的装修，以及更新活动商品

注：公司项目无法透露，具体逻辑需要大家自己理解了

<img src="http://www.vkcyan.top/Fo67_RY469daqdwfOp1nHAAeAt_q.png" style="zoom:30%;" />



## iframe装修方案优势

- 100%的完美还原装修样式

- 可以动态更新装修里面选中的商品的数据，需要数据结构统一化，后端即可按规律解析装修json
- 如果出现新组件，不需要写2套样式
- 后台装修定义好数据结构，客户端约定项目结构不变化，理论上整个项目所有页面都可以配置化

  

## iframe装修方案弊端

​		通过iframe实现的前后台交互装修方案中，不仅需要动后台的装修代码，还需要客户端进行“兼容处理”，即客户端需要识别装修模式，与不断更新后台传入的装修数据，存在一定的耦合性

​		这种装修方案的弊端就是，如果希望操作起来更加便捷就需要在客户端进行功能的实现，并通过postMessage提交给装修后台


## 最后

大家可以再看一下[演示视频](http://www.vkcyan.top/FkONMVoZGfZgYB3nQ5Rphx21qdJm.mp4)

## 联系我

欢迎大家加入qq群吹吹水,一起成长
<img src="http://www.vkcyan.top/FvbhQJAbxvQA8TTcMwu_uCYLyUmG.png" style="zoom:30%;" />

或者关注我的公众号，不定期更新各种文章：**吴凯的随笔**

