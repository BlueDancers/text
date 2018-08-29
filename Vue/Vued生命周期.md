# Vue的生命周期的理解

![](https://cn.vuejs.org/images/lifecycle.png)



正如Vue官方文档说的那样,**随着你的不断学习和使用，它的参考价值会越来越高**,今天就记录一下vue生命周期的研究

```javascript
import Vue from 'vue'

new Vue({
  el: '#root',
  template: '<div>{{ text }}</div>',
  data: {
    text: 'aaa'
  },
  beforeCreate () {
    console.log(this, 'beforeCreate')
  },
  created () {
    console.log(this, 'created')
  },
  beforeMount () {
    console.log(this, 'beforeMount')
  },
  mounted () {
    console.log(this, 'mounted')
  },
  beforeUpdate () {
    console.log(this, 'beforeUpdate')
  },
  updated () {
    console.log(this, 'updated')
  },
  activated () {
    console.log(this, 'activated')
  },
  deactivated () {
    console.log(this, 'deactivated')
  },
  beforeDestroy () {
    console.log(this, 'beforeDestroy')
  },
  destroyed () {
    console.log(this, 'destroyed')
  },
  errorCaptured () {
    console.log(this, 'errorCaptured')
  }
})
```

## 在初始项目执行的时候

![](http://on7r0tqgu.bkt.clouddn.com/FoMljr8gDgyJMe1j3-DIkTypZa5n.png )

对照生命周期图例,可以看到这里,因为这里设置了挂载点,所以执行了beforeMount以及mounted方法

我们把挂载点去掉试试http://on7r0tqgu.bkt.clouddn.com/FvbTkT6OsFuJib3p3oNjv8S4wS_S.png 

![](http://on7r0tqgu.bkt.clouddn.com/FvbTkT6OsFuJib3p3oNjv8S4wS_S.png )

这样就只执行了初始化操作,不会执行其他操作

## 那么,怎么触发update呢?

我们修改一下代码

```
import Vue from 'vue'

const app = new Vue({
  el: '#root',
  template: '<div>{{ text }}</div>',
  data: {
    text: 0
  },
		..................................
})

setInterval(() => {
  app.text += 1
}, 1000)

```

这里我们在查看我们的控制台

![](http://on7r0tqgu.bkt.clouddn.com/Ft79mZjEudiAsN4M2vuD2Cr1JgWE.png)

这里我相信到这里都可以看懂官方图例上面的mounted右边的事件环是怎么回事了,我们每次更新数据都会执行beforUpdate以及update方法

## destroy方法

在文档上面的解释为: Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。 

这里我熟悉destroy掉实例

````
setTimeout(() => {
  app.$destroy()
}, 2000)
````

![](C:\Users\spring\AppData\Local\Temp\1535534541961.png)

直接就回来结束掉实例

Vue会在什么时候挂载实例?

这里修改代码

````JavaScript
 beforeCreate () {
    console.log(this.$el, 'beforeCreate')
  },
  created () {
    console.log(this.$el, 'created')
  },
  beforeMount () {
    console.log(this.$el, 'beforeMount')
  },
  mounted () {
    console.log(this.$el, 'mounted')
  },
````



![](http://on7r0tqgu.bkt.clouddn.com/FgafugM9EctcDEyHWsxkBE967GLP.png )

这里就很明显看到,数据在mounted里面加载的,这也是为什么一般在mounted里面去修改数据,对于一些js操作,比如ajax,最早在created里面执行

## 在beforeMount到 mounted之间vue做了什么?

我们添加一些代码

```
render (h) { // 至于render即使生成vdom
    return h('div', {}, this.text)
  }
```

![](http://on7r0tqgu.bkt.clouddn.com/Fr2GTVMWLUDjAKG1n80uCe-T73On.png )

经过render函数的渲染,dom就出现了



