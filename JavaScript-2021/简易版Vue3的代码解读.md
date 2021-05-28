# 简易版Vue3的代码解读



​	今年春季的时候在掘金上看到一篇针对Vue3的reactivity的简易版的实现，代码非常通俗易懂，100行不到的代码，工作闲暇之余终于完全摸清楚了这个Demo的实现流程，相对于Vue2.0的核心实现，Vue3.x整体更加谨慎，总体感觉还变简单了

## 工作流程图

![工作流程图](http://www.vkcyan.top/FiicP3IIqN6FKXFHFS_OutjnntM-.png)



## 使用案例

````html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reactivity - Demo</title>
  </head>
  <body>
    <input id="r" type="range" max="255" min="0" />
    <input id="g" type="range" max="255" min="0" />
    <input id="b" type="range" max="255" min="0" />
    <p id="color_text"></p>
    <div id="color" style="width: 100px; height: 100px"></div>
    <p id="computed_text"></p>

    <script src="./index.js"></script>
    <script>
      const object = {
        r: 0,
        g: 0,
        b: 0,
        o: {
          a: 1,
        },
      }
		  // 数据进行reactive包装
      const proxy = reactive(object)
      // 计算属性 依赖发生变化自动执行
      const computedObj = computed(() => {
        return proxy.r * 2
      })
			// 副作用函数 当proxy.o.a发生变化的时候，这个副作用函数就会执行
      effect(() => {
        console.log(`proxy.o.a发生变化的时候，这个副作用函数就会执行: ${proxy.o.a}`)
      })
			// 副作用函数 当proxy
      effect(() => {
        let r = proxy.r
        let g = proxy.g
        let b = proxy.b
        document.getElementById('r').value = r
        document.getElementById('b').value = b
        document.getElementById('g').value = g
        document.getElementById('color').style.backgroundColor = `rgb(${r},${g},${b})`
        document.getElementById('color_text').innerText = `rgb：${r},${g},${b}`

        const { value } = computedObj
        document.getElementById('computed_text').innerText = `computed_text: r*2=${value}`
      })

      document.getElementById('r').addEventListener('input', (event) => (proxy.r = event.target.value))
      document.getElementById('g').addEventListener('input', (event) => (proxy.g = event.target.value))
      document.getElementById('b').addEventListener('input', (event) => (proxy.b = event.target.value))
    </script>
  </body>
</html>
````



## 核心实现

````javascript
const effectStack = [] // 存储初始化时期的所有effect函数
const reactiveMap = new WeakMap() // 保存被已经代理过的proxy
const targetMap = new WeakMap() // 缓存所有副作用函数的Map 这是一个WeakMap里面嵌套Map,Map里面嵌套Set的结构

/**
 * 对JavaScript对象进行处理,并且完成对象监听处理
 * @param {object} fn 监听对象
 */
function reactive(object) {
  if (reactiveMap.has(object)) {
    return reactiveMap.get(object)
  }
  const proxy = new Proxy(object, {
    // 处理对象，运行effect捕获器
    get(target, key) {
      track(target, key)
      return typeof target[key] === 'object' ? reactive(target[key]) : Reflect.get(...arguments)
    },
    set(target, key) {
      trigger(target, key)
      Reflect.set(...arguments) // 等同于arguments[0][arguments[1]] = arguments[2]
      // 在一个对象上面设置一个属性
      // target 设置属性的目标对象
      // propertyKey 设置属性的名称
      // value 设置的值
      // receiver 如果遇到setter,receiver则为setter调用时候的this值
      // Reflect.set(target, propertyKey, value, receiver)
    },
  })
  // 加入缓存值
  reactiveMap.set(object, proxy)
  return proxy
}

/**
 * 随着依赖变化而执行的函数
 * @param {Function} fn
 */
function effect(fn) {
  try {
    effectStack.push(fn)
    // 执行fn函数,进行依赖解析
    return fn()
  } finally {
    effectStack.pop()
  }
}

/**
 * 计算属性,依赖项发生变化的时候执行
 * @param {Function} fn
 */
function computed(fn) {
  return {
    get value() {
      return effect(fn)
    },
  }
}

/**
 * track 数据追踪器
 * @param {*} target
 * @param {*} key
 */
function track(target, key) {
  // 初始化依赖Map
  const activeEffect = effectStack[effectStack.length - 1]
  // 初始化-依赖收集
  if (activeEffect) {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
      depsMap = new Map()
      targetMap.set(target, depsMap)
    }

    // 第二层依赖使用Set存放key对应的effect
    let dep = depsMap.get(key)
    if (!dep) {
      dep = new Set()
      targetMap.get(target).set(key, dep)
    }
    // 取当前栈中的effect存入第二层依赖中
    dep.add(activeEffect)
    // 相当于如下写法 targetMap.get(target).get(key).add(activeEffect)
  }
}

/**
 * 依赖收集触发器
 */
function trigger(target, key) {
  const depMap = targetMap.get(target)
  // 开始执行effect方法
  if (depMap) {
    const effects = depMap.get(key)
    effects &&
      effects.forEach((run) => {
        run()
      })
  }
}
````



## targetMap数据模型

![targetMap数据](http://www.vkcyan.top/FnskPHoCAKE0SH7CYY6HQciKp3YH.png)

## 阅读顺序

![](http://www.vkcyan.top/FmXfN_Urz5Qz4q524ryo6KSL7Dea.png)





