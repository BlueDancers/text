````
title: 实现一个MVVM框架
date: 2018-9-1
tags: 
	- Vue
  - JavaScript
categories: Vue
````



# 实现一个MVVM框架

假如想掌握一个技能,个人感觉有两种途径可以实现 要么熟能生巧,要么了解原理,即使是新手程序员写10万行代码,不懂也懂了

实现双向绑定,从根本上来说,无非就是在单向绑定的基础上面在给可以输入的元素添加时间来动态修改model和view
实现双向绑定的几种做法

- vue 数据劫持
- ng 脏值检查
- 订阅 - 发布

关于后两者,我都不太懂,贴出网络大佬的解释

**发布者-订阅者模式:** 一般通过sub, pub的方式实现数据和视图的绑定监听，更新数据方式通常做法是 `vm.set('property', value)`，这里有篇文章讲的比较详细，有兴趣可点[这里](http://www.html-js.com/article/Study-of-twoway-data-binding-JavaScript-talk-about-JavaScript-every-day)

这种方式现在毕竟太low了，我们更希望通过 `vm.property = value`这种方式更新数据，同时自动更新视图，于是有了下面两种方式

**脏值检查:** angular.js 是通过脏值检测的方式比对数据是否有变更，来决定是否更新视图，最简单的方式就是通过 `setInterval()` 定时轮询检测数据变动，当然Google不会这么low，angular只有在指定的事件触发时进入脏值检测，大致如下：

- DOM事件，譬如用户输入文本，点击按钮等。( ng-click )
- XHR响应事件 ( $http )
- 浏览器Location变更事件 ( $location )
- Timer事件( $timeout , $interval )
- 执行 $digest() 或 $apply()

**数据劫持:** vue.js 则是采用数据劫持结合发布者-订阅者模式的方式，通过`Object.defineProperty()`来劫持各个属性的`setter`，`getter`，在数据变动时发布消息给订阅者，触发相应的监听回调。

这里实现es6简单版本的mvvm框架,用的是vue的数据劫持的实现方法

```JavaScript
class MVVM {
  constructor(options) {
    const {
      el,
      data,
      methods
    } = options
    this.methods = methods
    this.target = null
    this.observer(this, data)
    this.instruction(document.getElementById(el)) // 获取挂载点
  }

  // 数据监听器 拦截所有data数据 传给defineProperty用于数据劫持
  observer(root, data) {
    for (const key in data) {
      this.definition(root, key, data[key])
    }
  }

  // 将拦截的数据绑定到this上面
  definition(root, key, value) {
    if (typeof value === 'object') { // 假如value是对象则接着递归
      return this.observer(value, value)
    }
    let dispatcher = new Dispatcher() // 调度员

    Object.defineProperty(root, key, {
      set(newValue) {
        value = newValue
        dispatcher.notify(newValue)
      },
      get() {
        dispatcher.add(this.target)
        return value
      }
    })
  }

  //指令解析器
  instruction(dom) {
    const nodes = dom.childNodes; // 返回节点的子节点集合
    // console.log(nodes); //查看节点属性
    for (const node of nodes) { // 与for in相反 for of 获取迭代的value值
      if (node.nodeType === 1) { // 元素节点返回1
        const attrs = node.attributes //获取属性

        for (const attr of attrs) {
          if (attr.name === 'v-model') {
            let value = attr.value //获取v-model的值

            node.addEventListener('input', e => { // 键盘事件触发
              this[value] = e.target.value
            })
            this.target = new Watcher(node, 'input') // 储存到订阅者
            this[value] // get一下,将 this.target 给调度员
          }
          if (attr.name == "@click") {
            let value = attr.value // 获取点击事件名
            
            node.addEventListener('click',
              this.methods[value].bind(this)
            )
          }
        }
      }

      if (node.nodeType === 3) { // 文本节点返回3
        let reg = /\{\{(.*)\}\}/; //匹配 {{  }}
        let match = node.nodeValue.match(reg)
        if (match) { // 匹配都就获取{{}}里面的变量
          const value = match[1].trim()
          this.target = new Watcher(node, 'text')
          this[value] = this[value] // get set更新一下数据
        }
      }
    }

  }
}

//调度员 > 调度订阅发布
class Dispatcher {
  constructor() {
    this.watchers = []
  }
  add(watcher) {
    this.watchers.push(watcher) // 将指令解析器解析的数据节点的订阅者存储进来,便于订阅
  }
  notify(newValue) {
    this.watchers.map(watcher => watcher.update(newValue))
    // 有数据发生,也就是触发set事件,notify事件就会将新的data交给订阅者,订阅者负责更新
  }
}

//订阅发布者 MVVM核心
class Watcher {
  constructor(node, type) {
    this.node = node
    this.type = type
  }
  update(value) {
    if (this.type === 'input') {
      this.node.value = value // 更新的数据通过订阅者发布到dom
    }
    if (this.type === 'text') {
      this.node.nodeValue = value
    }
  }
}
```

```JavaScript
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>MVVM</title>
</head>

<body>
  <div id="app">
    <input type="text" v-model="text">{{ text }}
    <br>
    <button @click="update">重置</button>
  </div>

  <script src="./index.js"></script>
  <script>
    let mvvm = new MVVM({
      el: 'app',
      data: {
        text: 'hello MVVM'
      },
      methods: {
        update() {
          this.text = ''
        }
      }
    })
  </script>
</body>

</html>
```









