# 对MVVM的实现

## 简单版本

简单版本的地址: [简单版本](https://github.com/vkcyan/Small-code/blob/master/MVVM/%E7%AC%AC%E4%B8%80%E7%89%88%E6%9C%AC%E7%9A%84MVVM/index.html)

​	这个MVVM也许代码逻辑上面实现的并不完美,并不是正统的MVVM, 但是代码很精简,相对于源码,要好理解很多,并且实现了v-model以及v-on methods的功能,代码非常少,就100多行

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
    // if (typeof value === 'object') { // 假如value是对象则接着递归
    //   return this.observer(value, value)
    // }
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

```html
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

这个版本的MVVM因为代码比较少,并且是ES6的原因,思路非常清晰

我们来看看从new MVVM开始,他都做了什么

### 解读简单版本

### new MVVM

首先,通过解构获取所有的new MVVM传进来的对象

````JavaScript
class MVVM {
  constructor(options) {
    const {
      el,
      data,
      methods
    } = options
    this.methods = methods // 提取methods,便于后面将this给methods
    this.target = null // 后面有用
    this.observer(this, data)
    this.instruction(document.getElementById(el)) // 获取挂载点
  }
````

### 属性劫持

开始执行this.observer observer是一个数据监听器,将data的数据全部拦截下来

```JavaScript
observer(root, data) {
    for (const key in data) {
      this.definition(root, key, data[key])
    }
  }
```

在this.definition里面把data数据都劫持到this上面

```JavaScript
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
```

此时data的数据变化我们已经可以监听到了,但是我们监听到后还要与页面进行实时相应,所以这里我们使用调度员,在页面初始化的时候get(),这样this.target,也就是后面的指令解析器解析出来的v-model这样的指令储存到调度员里面,主要请看后面的解析器的代码

### 指令解析器

 指令解析器通过执行 `this.instruction(document.getElementById(el)) ` 获取挂载点 

```JavaScript
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
```

这里代码首先解析出来我们自定义的属性然后,我们将@click的事件直接指向methods,methds就已经实现了

现在代码模型是这样

![](http://on7r0tqgu.bkt.clouddn.com/Fml57sZd2r9BOBMOEdoNiGx_-T0q.png )

### 调度员Dispatcher与订阅者Watcher

我们需要将Dispatcher和Watcher联系起来

于是我们之前创建的变量this.target开始发挥他的作用了

正执行解析器里面使用this.target将node节点,以及触发关键词存储到当前的watcher 订阅,然后我们获取一下数据

```
this.target = new Watcher(node, 'input') // 储存到订阅者
this[value] // get一下,将 this.target 给调度员
```

在执行this[value]的时候,触发了get事件

````JavaScript
get() {
   dispatcher.add(this.target)
   return value
}
````

这get事件里面,我们将watcher订阅者告知到调度员,调度员将订阅事件存储起来

````
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
````

与input不太一样的是文本节点不仅需要获取,还需要set一下,因为要让订阅者更新node节点

````
this.target = new Watcher(node, 'text')
this[value] = this[value] // get set更新一下数据
````

所以在订阅者就添加了该事件,然后执行set

```JavaScript
set(newValue) {
        value = newValue
        dispatcher.notify(newValue)
      },
```

notfiy执行,订阅发布者执行update更新node节点信息

```
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

页面初始化完毕

更新数据

````
node.addEventListener('input', e => { // 键盘事件触发
   this[value] = e.target.value
})
````

this[value]也就是data数据发生变化,触发set事件,既然触发notfiy事件,notfiy遍历所有节点,在遍历的节点里面根据页面初始化的时候订阅的触发类型.进行页面的刷新

现在可以完成的看看new MVVM的实现过程了

![](http://on7r0tqgu.bkt.clouddn.com/Fo6m0DmgK22kbz4gb-3US3pq6eVk.png )

最简单版本的MVVM完成



## 标准版本

标准版本额外实现了component,watch,因为模块化代码很碎的关系,看起来还是有难度的

从理念上来说,实现的思想基本是一样的,可以参照上面的图示,都是开始的时候都是拦截属性,解析指令

代码有将近300行,所以就贴一个地址[标准版本MVVM](https://github.com/vkcyan/Small-code/blob/master/MVVM/%E7%AC%AC%E4%BA%8C%E7%89%88%E6%9C%AC%E7%9A%84MVVM/index.html)

### 执行顺序

1. new MVVM
2. 获取$options = 所以参数
3. 获取data,便于后面劫持
4. 因为是es5,后面forEach内部指向window,这不是我们想要的,所以存储当前this 为me
5. _proxyData劫持所有data数据
6. 初始化计算属性
7. 通过Object.key()获取计算属性的属性名
8. 初始化计算属性将计算属性挂载到vm上
9. 开始observer监听数据
10. 判断data是否存在
11. 存在就new Observer(创建监听器)
12. 数据全部进行进行defineProperty存取监听处理,让后面的数据变动都触发这个的get/set
13. 开始获取挂载点
14. 使用querySelector对象解析el
15. 创建一个虚拟节点,并存储当前的dom
16. 解析虚拟dom
17. 使用`childNodes`解析对象
18. 因为是es5,所以使用`[].slice.call`将对象转数组
19. 获取到后进行 `{{  }}匹配` `指令的匹配` `以及递归子节点`
20. 指令的匹配: 匹配到指令因为不知道多少个指令名称,所以这里还是使用`[].slice.call`循环遍历
21. 解析到有 `v-`的指令使用`substring(2)`截取后面的属性名称
22. 再判断是不是指令`v-on` 这里就是匹配`on`关键字,匹配到了就是事件指令,匹配不到就是普通指令
23. 普通指令解析{{ data }} `_getVMVal`get会触发MVVM的\_proxyData事件 在\_proxyData事件里面触发data的get事件
24. 这时候到了observer的defineReactive的get里面获取到了数据,因为没有Dispatcher.target,所以不进行会触发调度员
25. 至此`_getVMVal`获取到了数据
26. `modelUpdater`进行Dom上面的数据更新
27. 数据开始进行订阅,在订阅里面留一个回调函数用于更新dom
28. 在watcher(订阅者)获取`this`,` 订阅的属性`,`回调`
29. 在this.getter这个属性上面返回一个匿名函数,用于获取data的值
30. 触发get事件,将当前watcher的this存储到Dispatcher.garget上面
31. 给this.getters,callvm的的this,执行匿名函数,获取劫持下来的data,又触发了MVVM的_proxyData的get事件,继而有触发了observer的defineReactive的get事件,不过这一次Dispatcher.target有值,执行了depend事件
32. 在`depend`里面执行了自己的addDep事件,并且将Observer自己的this传进去
33. `addDep`里面执行了`Dispatcher`的`addSub`事件,
34. 在`addUsb`事件里面将订阅存储到`Dispatcher`里面的`this.watchers`里面的
35. 订阅完成,后面将这些自定义的指令进行移除
36. 重复操作,解析所有指令,v-on:click = "data"直接执行methods[data].bind(vm)

### 更新数据:

1. 触发input事件
2. 触发_setVMVal事件
3. 触发MVVM的set事件
4. 触发observer的set事件
5. 触发dep.notify() 
6. 触发watcher的run方法
7. 触发new Watcher的回调 this.cb
8. 触发compile里面的updaterFn 事件
9. 更新视图



### component的实现

计算属性的触发 查看这个例子

```
computed: {
        getHelloWord: function () {
          return this.someStr + this.child.someStr;
        }
      },
```



>  其实计算属性就是defineproperty的一个延伸 

1. 首先compile里面解析获取到{{ getHelloword }}'
2. 执行updater[textUpdater]
3. 执行`_getVMVal`获取计算属性的返回值
4. 获取`vm[component]`就会执行下面的get事件

```
Object.defineProperty(me, key, {
          get: typeof computed[key] === 'function' ? computed[key] : computed[key].get,
          set: function () {}
        })
```

是function执行computed[getHelloword],也就是return 的 函数

````JavaScript
this.someStr + this.child.someStr;
````

5. 依次获取data,触发mvvm的get 以及observer的get,

初始化完成,到这里还没有绑定数据,仅仅是初始化完成了



1. 开始订阅该事件 `new Watcher()`
2. component不是函数所以不是function 执行`this.parseGetter(expOrFn);`
3. 返回一个覆盖expOrrn的匿名函数
4. 开始初始化 执行get()
5. 存储当前this,开始获取`vm[getHelloword]`
6. 触发`component[getHelloword]`
7. 开始执行MVVM的get `this.someStr`
8. 到MVVM的get 到 observer的get 因为 `Dispatcher.target`存着 getHelloWord 的 `this.depend ()`所以执行
9. Dispatcher的`depend()`,执行watcher的addDep(),执行 Dispatcher的`addSub()` 将当前的watcher存储到监听器
10. 开始get第二个数据 this.child.someStr,同理也将getHelloWord的this存入了当前的Dispatcher
11. 开始get第三个数据 this.child,同理也将getHelloWord的this存入了当前的Dispatcher

**这个执行顺序有点迷,第二第三方反来了**

`this.parseGetter(expOrFn);`就执行完毕了

目前来看为什么component会实时属性数据?

> 因为component的依赖属性一旦发生变化都会更新 getHelloword 的 watcher ,随之执行回调更新dom



### watch的实现

watch的实现相对来说要简单很多

1. 我们只要将watch监听的数据告诉订阅者就可以了
2. 这样,wacth更新了
3. 触发set,set触发notify
4. notify更新watcher
5. watcher执行run 
6. run方法去执行watch的回调
7. 即完成了watch的监听

```JavaScript
watch: function (key, cb) {
    new Watcher(this, key, cb)
},
```









