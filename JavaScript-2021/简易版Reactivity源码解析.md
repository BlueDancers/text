# 简易版Reactivity源码解析



## 前言

​	首先感谢[__mxin](https://juejin.cn/user/3790771824108808)同学的简易版本，没有这个简化版本，我大概率也没办法沉下心来将代码读下去，再次表示感谢，通读下来简化之后的逻辑清晰，只需要对几个JavaScript原生API进行了解，走完代码流程，便了解了核心流程



代码地址：[传送门](https://github.com/vkcyan/code-fragment/tree/master/Reactivity%E7%AE%80%E6%98%93%E7%89%88%E6%BA%90%E7%A0%81)



## 前置知识

[Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

[Reflect](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)

[WeakMap](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)



## 核心流程图

​		尝试绘制了一遍代码流程图，主要流程就是初始化时候对reactive，computed，effect的依赖收集，以及在触发set事件的时候，对收集到的依赖的触发

![Snipaste_2021-06-15_20-33-48](http://www.vkcyan.top/FjoAy1WA7p8OeSXqZYkrnSeera3j.png)



## reactive

```javascript
const object = {
    r: 0,
    g: 0,
    b: 0,
    o: {
    	a: 1,
    },
  }	
const proxy = reactive(object)
```

​	reactive是一个赋予对象响应式特征的方法，传入的数据会被proxy代理，变量一旦被代理，就将会被加入reactiveMap，以后都会触发reactiveMap内的proxy

````javascript
/**
 * 定义响应式对象，返回proxy代理对象
 * @param {*} object
 */
function reactive(object) {
// 判断是否已经代理，已经存在直接取自
  if (reactiveMap.has(object)) return reactiveMap.get(object)
	// 第一次进行处理，进行proxy代理
  const proxy = new Proxy(object, {
    // 处理器对象，定义捕获器
    get(target, key) {
      console.log('get方法', target, key)
      // 针对effect，computed依赖进行处理
      track(target, key)
      // 如果当前代理的值为object类型，将会对当前的值再次进行proxy,否则直接获取数据
      return typeof target[key] === 'object' ? reactive(target[key]) : Reflect.get(...arguments)
    },
    set(target, key) {
      console.log('设置的值', ...arguments)
      // 在set事件中对原本的数据进行修改
      Reflect.set(...arguments)
      // trigger(target, key)
    },
  })

  reactiveMap.set(object, proxy)
  return proxy
}
````

完成代理的数据

<img src="http://www.vkcyan.top/Fkt6CdXcoINsKX0ZhgzbaDSn073Z.png" style="zoom:50%;" />

## effect

> effect会在依赖的经过reactive处理后的对象发生变化的时候，自动执行一次回调函数，通常称它为副作用函数

effect的实现是Reactivity最核心的部分，也是比较难理解的部分，依赖WeakMap进行实现，如果不了解WeakMap，务必先去看一下[文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)

````javascript
const computedObj = computed(() => {
	return proxy.r * 2
})

effect(() => {
	console.log(`proxy.o.a: ${proxy.o.a}`)
})
````

初始化的过程中触发effect，将函数fn放入effectStack，同时执行effect中的函数，一旦执行，必定会触发经过reactive代理的get函数，进行数据获取

```javascript
const effectStack = []  // 收集副作用函数
/**
 * 副作用函数
 */
function effect(fn) {
  try {
    // 将需要执行的effect入栈
    effectStack.push(fn)
    // **** 执行该effect，进入proxy的get拦截 ****
    return fn()
  } finally {
    // 依赖收集完毕及所有get流程走完，当前effect出栈
    effectStack.pop()
  }
}
// ......
// get方法触发了track方法
get(target, key) {
  // ....
  track(target, key)
	// ....
}

/**
 * 依赖收集
 */
function track(target, key) {
  // 初始化依赖Map
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  // 第二层依赖使用Set存放key对应的effect
  let dep = depsMap.get(key)
  if (!dep) {
    targetMap.get(target).set(key, (dep = new Set()))
  }
  // 取当前栈中的effect存入第二层依赖中
  const activeEffect = effectStack[effectStack.length - 1]
  activeEffect && dep.add(activeEffect)
  // 最后触发effect函数的finally，将处理完毕的effect进行弹出，完成依赖收集
}
```

初始化完成后，effect全部完成处理，我们可以看一下targetMap的数据

<img src="http://www.vkcyan.top/FhXB0sJ9-li2v03asqwdwKAis3Qs.png" style="zoom:50%;" />

我们可以看到，变量a与effect中的函数关联在了一起，经过track处理后，effect内部用到的变量都与effect建立了某种关联，至此我们就完成了依赖收集

## computed

Reactivity计算属性的实现是依赖effect进行实现，仅仅是增加了一个value函数进行包裹

```javascript
/**
 * 计算属性
 */
function computed(fn) {
  return {
    get value() {
      return effect(fn)
    },
  }
}
```



## 变量发生变化

数据发生变化的时候，例如我们将proxy.o.a=1,他是如何完成响应式，以及effect的触发的呢？

首先一定是触发proxy的set函数

```javascript
set(target, key)
	// 	修改代理的值
  Reflect.set(...arguments) // 等同于arguments[0][arguments[1]] = arguments[2]
	// 触发依赖收集器
  trigger(target, key)
},
  
/**
 * 依赖收集触发器
 */
function trigger(target, key) { // target: {a:1} key: a
  // 获取当前修改的值
  const depMap = targetMap.get(target)
  // 开始执行effect方法
  if (depMap) {
    // 如果存在，开始寻找Map的value，在通过key找到对应的回调函数
    const effects = depMap.get(key)
    effects &&
      effects.forEach((run) => {
      	// 执行收集的effect函数
        run()
      })
  }
}
```

<img src="http://www.vkcyan.top/Fuqeu7ONrETGQS60cJ0quEYeEcha.png" style="zoom:50%;" />



至此完成数据的响应式，effect的函数触发完成



## 关键概念

reactive 创建响应式对象

effect 副作用函数，存储匿名函数，同时调用自身收集依赖，最后弹出匿名函数

computed 计算属性，其原理是对effect的包装

track 收集依赖，绑定变量与使用该变量的effect

trigger 触发依赖，根据变量触发对应的effect



## 总结

​	这个文章是一个代码记录贴，希望大家看到可以静下心来看看[__mxin](https://juejin.cn/user/3790771824108808)同学的文章，或者[传送门](https://github.com/vkcyan/code-fragment/tree/master/Reactivity%E7%AE%80%E6%98%93%E7%89%88%E6%BA%90%E7%A0%81)代码，了解了基础的原理后再去看[@vue/Reactivity](https://github.com/vuejs/vue-next/tree/master/packages/reactivity#readme)的代码，将会事半功倍；

​	日积月累，将知识变成你的财富吧





