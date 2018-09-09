# Vue源码阅读

```bash
git clone https://github.com/vuejs/vue.git
```



### 前置知识

- Flow (vue的代码检查)
- Rollup (打包工具,我们要看的是rollup打包之前的代码)

#### [Flow](https://zhenyong.github.io/flowtype/docs/getting-started.html#_)

​	Vue.js使用了flow作为代码检查工具,目的是在编译器今早的发现错误,Flow让JavaScript有了类似java的体验

根据文档

> 我使用报错,Platform not supported.64位win10 竟然报错 `平台不受支持`。

1. 安装flow

```bash
npm install -g flow-bin
```

2. 使用flow

```
/*@flow*/
function str (str) {
  return str.split(' ')
}
str(11)
```

这就会报错,因为str期望是字符串,但是却是数值

##### 基本类型

```JavaScript
/*@flow*/
function add (x : number, y: number) : number{
  return x + y
}
add("12312",1231)
```

这也会报错,因为类型不对

##### 数组

```JavaScript
/*@flow*/

var arr: Array<number> = [1, 2, 3] // 会出错,因为这里必须是number

arr.push('Hello')
```

##### 类和对象

```javascript
/*@flow*/

class Bar {
  x: string;           // x 是字符串
  y: string | number;  // y 可以是字符串或者数字
  z: boolean;

  constructor(x: string, y: string | number) {
    this.x = x
    this.y = y
    this.z = false
  }
}

var bar: Bar = new Bar('hello', 4)

var obj: { a: string, b: number, c: Array<string>, d: Bar } = {
  a: 'hello',
  b: 11,
  c: ['hello', 'world'],
  d: new Bar('hello', 3)
}

```

> 类的类型注释格式如上，可以对类自身的属性做类型检查，也可以对构造函数的参数做类型检查。这里需要注意的是，属性 `y` 的类型中间用 `|` 做间隔，表示 `y` 的类型即可以是字符串也可以是数字。 

##### Null

```javascript
/*@flow*/
var foo: ?string = null
```

此时，`foo` 可以为字符串，也可以为 `null`。 

##### 在Vue里面使用的Flow

这是Vue里面的`.flowconfig`

```
[ignore]
.*/node_modules/.*
.*/test/.*
.*/scripts/.*
.*/examples/.*
.*/benchmarks/.*

[include]

[libs]
flow

[options]
unsafe.enable_getters_and_setters=true
module.name_mapper='^compiler/\(.*\)$' -> '<PROJECT_ROOT>/src/compiler/\1'
module.name_mapper='^core/\(.*\)$' -> '<PROJECT_ROOT>/src/core/\1'
module.name_mapper='^shared/\(.*\)$' -> '<PROJECT_ROOT>/src/shared/\1'
module.name_mapper='^web/\(.*\)$' -> '<PROJECT_ROOT>/src/platforms/web/\1'
module.name_mapper='^weex/\(.*\)$' -> '<PROJECT_ROOT>/src/platforms/weex/\1'
module.name_mapper='^server/\(.*\)$' -> '<PROJECT_ROOT>/src/server/\1'
module.name_mapper='^entries/\(.*\)$' -> '<PROJECT_ROOT>/src/entries/\1'
module.name_mapper='^sfc/\(.*\)$' -> '<PROJECT_ROOT>/src/sfc/\1'
suppress_comment= \\(.\\|\n\\)*\\$flow-disable-line

```

因为Vue里面有很多的自定义类型,但是Flow是不认识的,检查的时候会出错,这其中的 `[libs]` 部分用来描述包含指定库定义的目录 

```
flow
├── compiler.js        # 编译相关
├── component.js       # 组件数据结构
├── global-api.js      # Global API 结构
├── modules.js         # 第三方库定义
├── options.js         # 选项相关
├── ssr.js             # 服务端渲染相关
├── vnode.js           # 虚拟 node 相关
```

这些文件里面写了所有的自定义类型,必须component,等等

#### [Rollup](https://www.rollupjs.com/guide/zh)

Rollup只能编译JavaScript的代码,所以相对来说,Rollup更加适合去编译一些库文件

Vue.js的源码是Rollup构建的
vue的源码在src下面

```JavaScript
src
├── compiler        # 编译相关 
├── core            # 核心代码 
├── platforms       # 不同平台的支持
├── server          # 服务端渲染
├── sfc             # .vue 文件解析
├── shared          # 共享代码
```

我们可以看一下package.js的打包命令

```bash
"build": "node scripts/build.js",
"build:ssr": "npm run build -- web-runtime-cjs,web-server-renderer",
"build:weex": "npm run build --weex"
```

运行 `npm run build`

会执行 `scripts/build.js`

```JavaScript
let builds = require('./config').getAllBuilds() // 获取配置

// filter builds via command line arg
if (process.argv[2]) {
  const filters = process.argv[2].split(',')
  builds = builds.filter(b => {
    return filters.some(f => b.output.file.indexOf(f) > -1 || b._name.indexOf(f) > -1)
  })
} else {
  // filter out weex builds by default
  builds = builds.filter(b => {
    return b.output.file.indexOf('weex') === -1
  })
}
//过滤配置

build(builds)
```

查看一下过滤了什么配置

```JavaScript
const builds = {
  // Runtime only (CommonJS). Used by bundlers e.g. Webpack & Browserify
  'web-runtime-cjs': {
    entry: resolve('web/entry-runtime.js'),
    dest: resolve('dist/vue.runtime.common.js'),
    format: 'cjs',
    banner
  },
  // Runtime+compiler CommonJS build (CommonJS)
  'web-full-cjs': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.common.js'),
    format: 'cjs',
    alias: { he: './entity-decoder' },
    banner
  },
  // Runtime only (ES Modules). Used by bundlers that support ES Modules,
  // e.g. Rollup & Webpack 2
  'web-runtime-esm': {
    entry: resolve('web/entry-runtime.js'),
    dest: resolve('dist/vue.runtime.esm.js'),
    format: 'es',
    banner
  },
  ...................
```

其中 `entry` 属性表示构建的入口 JS 文件地址 

`dest`属性表示构建后的 JS 文件地址 

`format` 属性表示构建的格式，  cjs 为CommonJS `es` 表示构建出来的文件遵循 [ES Module](http://exploringjs.com/es6/ch_modules.html)  `umd` 表示构建出来的文件遵循 [UMD](https://github.com/umdjs/umd) 

以 `web-runtime-cjs` 配置为例，它的 `entry` 是 `resolve('web/entry-runtime.js')`

````JavaScript
const aliases = require('./alias')
const resolve = p => {
  const base = p.split('/')[0] //base = 'web'
  if (aliases[base]) { // 
    return path.resolve(aliases[base], p.slice(base.length + 1))
  } else {
    return path.resolve(__dirname, '../', p)
  }
}
````

再到alias.js文件里面

```JavaScript
const path = require('path')

module.exports = {
  vue: path.resolve(__dirname, '../src/platforms/web/entry-runtime-with-compiler'),
  compiler: path.resolve(__dirname, '../src/compiler'),
  core: path.resolve(__dirname, '../src/core'),
  shared: path.resolve(__dirname, '../src/shared'),
  web: path.resolve(__dirname, '../src/platforms/web'),
  weex: path.resolve(__dirname, '../src/platforms/weex'),
  server: path.resolve(__dirname, '../src/server'),
  entries: path.resolve(__dirname, '../src/entries'),
  sfc: path.resolve(__dirname, '../src/sfc')
}
```



构建的执行顺序

1. `npm run build`
2. 执行`scripts/build.js`
3. `let builds = require('./config').getAllBuilds()`  //这里面主要生rollup的配置文件信息
4. 在`Object.keys(builds).map(genConfig) // 返回build的类型的键`
5. genConfig 里获取需要打包的信息 返回rollup的配置
6. 判断环境变量,是web还是weex
7. build里面是打包,判断js是否压缩的代码,最后构建完成

![](http://on7r0tqgu.bkt.clouddn.com/FiFqn8SjVCaNUWqU4isIuGc83BRP.png )

在阅读Vue源码的第一步,了解flow,这是Vue的代码检查

从package.js入手,找到打包配置,在打包配置里面找到被打包的文件,那就是Vue核心的地方



> 一些细节

### Runtime-Only VS Runtime+compiler

通常我们利用 vue-cli 去初始化我们的 Vue.js 项目的时候会询问我们用 Runtime Only 版本的还是 Runtime + Compiler 版本。下面我们来对比这两个版本 

Runtime-Only: 无法解析模板,因为解析是打包工具例如vue-loader干的事,所以,代码体积要小很多

Runtime+compiler: 可以解析模板,但是这是在客户端进行解析,所以编译是存在性能问题的,假如配个webpack,可以使用Runtime+Only的版本



## Runtime+compiler

我查看的是这个版本的代码,这个版本用的也比较多

`vue-dev\src\platforms\web\entry-runtime.js`

在Vue.prototype上面挂载了一些属性,最下面导出了,要往上继续找Vue的源头

```
import Vue from './runtime/index'
```

`vue-dev/src/platforms/web/runtime/index.js` 对Vue的一些拓展

`vue-dev/src/core/index.js` 初始化全局API

`vue-dev/src/core/instance/index.js` 源头

```JavaScript
import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) { //这个判断生成环境 以及 必须是new Vue才可以使用
  if (process.env.NODE_ENV !== 'production' && !(this instanceof Vue) ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue

```

关于这里使用function 而不是用es6的class,是有原因的

Class的写法是将prototype的都写在类里面,这样小量的代码会很优雅,大量的代码就会难以管理,这样不利于分模块去进行代码编写,下面的xxxxMixin都是Vue.prototype的方法

这里面关键的地方也就是初始化的时候

```JavaScript
initGlobalAPI(Vue)
```

`src/core/global-api/index.js` 在整个初始化过程中，除了给它的原型 prototype 上扩展方法，还会给 `Vue` 这个对象本身扩展全局的静态方法

这就是Vue的整体架构,这样的高度模块化很值得我们学习



## 数据驱动

也就是数据驱动视图,model 与 view的解耦,通过修改数据来驱动页面发生变化,改变了jq时代的直接操作dom

这样的model与view解耦会让逻辑变得非常清晰,在面对复杂的交互,我们只要去关注代码逻辑即可,代码就变得容易维护

从init开始看起,怎么做到数据驱动的

从上面分析的Vue的结构最上层

`vue-dev/src/core/instance/index.js` 

```JavaScript
import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' && !(this instanceof Vue) ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options) // 初始化
}

initMixin(Vue) // 在这里添加到了原型链
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
```

所以在init.js里面进行的初始化

初始化做了什么

1. 合并所有的options与处理过options的一些Vue属性
2. 后面很多的初始化方法,这里要注意的是数据 `initState(vm) // 初始化所有属性`

局部关键代码

````JavaScript
export function proxy (target: Object, sourceKey: string, key: string) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  }
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
  //源码写的不太清晰,我改动一下
  //
  // Object.defineProperty(target, key, {
  //   get () {
  //     return this.sourceKey[key]  // 也就是 vm._data[data]
  //   },
  //   set (val) {
  //     this.sourceKey[key] = val
  //   }
  // })
  // 这里将所有vm._data都进行defineProperty代理,一旦发生变化,就会触发 _ data的defineProperty,在进行下一步操作
}

export function initState (vm: Component) {
  vm._watchers = []
  const opts = vm.$options // 获取options
  if (opts.props) initProps(vm, opts.props) // 初始化props
  if (opts.methods) initMethods(vm, opts.methods) // 初始化methods
  if (opts.data) { //data 存在的情况下 初始化data
    initData(vm)
  } else {
    observe(vm._data = {}, true /* asRootData */) // 没有的情况下,告诉监听器,data = {} 也就是没有处理的数据
  }
  if (opts.computed) initComputed(vm, opts.computed)
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}

function initData (vm: Component) {
  let data = vm.$options.data // 获取data
  data = vm._data = typeof data === 'function' ? getData(data, vm) : data || {} // 判断是不是function 有没有return
  //同时将data交给vm
  if (!isPlainObject(data)) { // 判断是不是对象,不是就给一个警告
    data = {}
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    )
  }
  // proxy data on instance
  const keys = Object.keys(data) // 得到data的键
  const props = vm.$options.props // 获取props
  const methods = vm.$options.methods // 获取methods
  let i = keys.length
  while (i--) {
    const key = keys[i]
    if (process.env.NODE_ENV !== 'production') { // 这里面判断开发环境下面 假如methoes 与 data 与 props有重命,就报错
      if (methods && hasOwn(methods, key)) {
        warn(
          `Method "${key}" has already been defined as a data property.`,
          // ${key} 已经被定义为data属性
          vm
        )
      }
    }
    if (props && hasOwn(props, key)) {
      process.env.NODE_ENV !== 'production' && warn(
        `The data property "${key}" is already declared as a prop. ` +
        `Use prop default value instead.`,
        //数据属性“$ {key}”已被声明为prop。 `+` 使用prop默认值代替。，
        vm
      )
    } else if (!isReserved(key)) { // 没有重命的情况下 就 准备将key 也就是 data的键  代理到vm上面
      proxy(vm, `_data`, key) // 这里是关键
    }
  }
  // observe data
  observe(data, true /* asRootData */) // 响应式处理
}
````

这是对data的处第一层处理

回到init

当初始化完成了

```JavaScript
initLifecycle(vm)
initEvents(vm)
initRender(vm)
callHook(vm, 'beforeCreate')
initInjections(vm) // resolve injections before data/props
initState(vm) // 初始化所有属性
initProvide(vm) // resolve provide after data/props
callHook(vm, 'created')
```

最后一步就是挂载了

```JavaScript
if (vm.$options.el) { // 判断有没有el,有的话就给他挂载上
      vm.$mount(vm.$options.el)
    }
```

所以下一步该看看$mount做了什么

### $mount

关于$mount.在最开始的地方就写了

`vue-dev/src/platforms/web/entry-runtime-with-compiler.js`

```JavaScript
const mount = Vue.prototype.$mount
Vue.prototype.$mount = function (el?: string | Element, hydrating?: boolean): Component {
  el = el && query(el)

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    process.env.NODE_ENV !== 'production' && warn(
      `Do not mount Vue to <html> or <body> - mount to normal elements instead.` 
 // ....
```

然后,进入上一级目录

竟然也写了一个

```javascript
Vue.prototype.$mount = function (el?: string | Element, hydrating?: boolean): Component {
  el = el && inBrowser ? query(el) : undefined
  return mountComponent(this, el, hydrating)
}
```

否则我查半天才知道,原来,这是适应不同的版本使用不一样的$mount挂载,Runtime+compiler这个版本因为需要编译,所以在最外层重写了\$mount

所以这里看最外层的$mount的实现

尝试获取render函数,获取不到解析template,最后变成Render,这是compiler的特有功能,解析模板

```JavaScript
const mount = Vue.prototype.$mount
  Vue.prototype.$mount = function (el?: string | Element, hydrating?: boolean): Component {
    el = el && query(el) // 这里经过我测试返回后者 ,但是在query里面也返回el 不知这样写原因在什么地方,难道有什么特殊情况?

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) { // 这里判断el 不可以== 根节点,因为Vue在解析的时候会覆盖掉el的节点
    process.env.NODE_ENV !== 'production' && warn(
      `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
    )
    return this
  }

  const options = this.$options
  // resolve template/el and convert to render function
  if (!options.render) { // 判断是否使用了render方法
    let template = options.template
    if (template) { //如果存在complate 就解析complate
      if (typeof template === 'string') { // template可能是组件里面的 可以可能是入口render里面的template
        if (template.charAt(0) === '#') {
          template = idToTemplate(template)
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !template) {
            warn(
              `Template element not found or is empty: ${options.template}`,
              this
            )
          }
        }
      } else if (template.nodeType) { // 组件 直接渲染
        template = template.innerHTML
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn('invalid template option:' + template, this)
        }
        return this
      }
    } else if (el) { // 入口
      template = getOuterHTML(el) // 返回dom的字符串
    }
    if (template) { // 编译相关
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile')
      }

      const { render, staticRenderFns } = compileToFunctions(template, {
        shouldDecodeNewlines,
        shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this)
      options.render = render
      options.staticRenderFns = staticRenderFns

      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile end')
        measure(`vue ${this._name} compile`, 'compile', 'compile end')
      }
    }
  }
  return mount.call(this, el, hydrating) // 最后返回处理好的render函数给mount
}

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el: Element): string {
  if (el.outerHTML) { // 获取 除了包含innerHTML的全部内容外, 还包含对象标签本身。
    return el.outerHTML
  } else {
    const container = document.createElement('div') // 获取不到就创建一个div,将clone一个节点, 话说怎么会获取不到
    container.appendChild(el.cloneNode(true))
    return container.innerHTML
  }
}
```

然后再第二层

```JavaScript
return mountComponent(this, el, hydrating)
```

进入`vue-dev/src/core/instance/lifecycle.js`,进行render的解析

```JavaScript
export function mountComponent ( // 解析dom
  vm: Component,
  el: ?Element,
  hydrating?: boolean
): Component {
  vm.$el = el // 做缓存
  if (!vm.$options.render) { // 判断template有没有转换成render函数,进入这个判断说明render没有生成
    vm.$options.render = createEmptyVNode // 生成一个替代的vnode
    if (process.env.NODE_ENV !== 'production') { // 开发环境
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') || vm.$options.el || el) {
        // 无法解析 开始报警告,这也是为什么Only不能写template会警告的原因,因为无法解析,没有第一层的解析器
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        )
      } else {
        //假如你没有render也没有template,就会爆出这个警告
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        )
      }
    }
  }
  callHook(vm, 'beforeMount') // 生命周期暂时不看

  let updateComponent
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) { // 性能优化,没用过,应该是检查vue组件性能的的工具
    updateComponent = () => {
      const name = vm._name
      const id = vm._uid
      const startTag = `vue-perf-start:${id}`
      const endTag = `vue-perf-end:${id}`

      mark(startTag)
      const vnode = vm._render()
      mark(endTag)
      measure(`vue ${name} render`, startTag, endTag)

      mark(startTag)
      vm._update(vnode, hydrating)
      mark(endTag)
      measure(`vue ${name} patch`, startTag, endTag)
    }
  } else {
    updateComponent = () => {
      vm._update(vm._render(), hydrating) // 更新节点 //hydrating ssr相关
    }
  }

  //我们在观察者的构造函数中将其设置为vm._watcher
  //因为观察者的初始补丁可能会调用$ forceUpdate（例如在孩子内部）
  //组件的挂钩），它依赖于已经定义的vm._watcher
  new Watcher(vm, updateComponent, noop, { // 创建订阅者
    before () {
      if (vm._isMounted) {
        callHook(vm, 'beforeUpdate')
      }
    }
  }, true /* isRenderWatcher */)
  hydrating = false

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true
    callHook(vm, 'mounted')
  }
  return vm

```

new Watcher

````JavaScript
constructor (
    vm: Component, // vn
    expOrFn: string | Function, // data数值 || 更新的节点
    cb: Function, // 回调
    options?: ?Object, // 配置
    isRenderWatcher?: boolean // 是不是想让Render的watcher
  ) {
    this.vm = vm
    if (isRenderWatcher) { // 获取this
      vm._watcher = this
    }
    vm._watchers.push(this) //最后将当前当前dom的this,给vm
    // options
    if (options) {
      this.deep = !!options.deep
      this.user = !!options.user
      this.computed = !!options.computed
      this.sync = !!options.sync
      this.before = options.before
    } else {
      this.deep = this.user = this.computed = this.sync = false
    }
    this.cb = cb
    this.id = ++uid // uid for batching
    this.active = true
    this.dirty = this.computed // for computed watchers
    this.deps = []
    this.newDeps = []
    this.depIds = new Set()
    this.newDepIds = new Set()
    this.expression = process.env.NODE_ENV !== 'production' ? expOrFn.toString() : '' // 非开发环境将data键 toString转换(话说需要转吗.)
    // parse expression for getter
    if (typeof expOrFn === 'function') { // 在初始环境下 expRoFn 是一个function
      this.getter = expOrFn
    } else {
      this.getter = parsePath(expOrFn)
      if (!this.getter) {
        this.getter = function () {}
        process.env.NODE_ENV !== 'production' && warn(
          `Failed watching path: "${expOrFn}" ` +
          'Watcher only accepts simple dot-delimited paths. ' +
          'For full control, use a function instead.',
          vm
        )
      }
    }
    if (this.computed) {
      this.value = undefined
      this.dep = new Dep()
    } else {
      this.value = this.get() // 执行get
    }
  }

  /**
   * Evaluate the getter, and re-collect dependencies.
   */
  get () {
    pushTarget(this)
    let value
    const vm = this.vm
    try {
      value = this.getter.call(vm, vm) // 这里将vm的this给了updateComponent,用于渲染节点
    } catch (e) {
      if (this.user) {
        handleError(e, vm, `getter for watcher "${this.expression}"`)
      } else {
        throw e
      }
    } finally {
      // "touch" every property so they are all tracked as
      // dependencies for deep watching
      if (this.deep) {
        traverse(value)
      }
      popTarget()
      this.cleanupDeps()
    }
    return value
  }
````

最后执行`lifecycle.js`

```JavaScript
updateComponent = () => {
      vm._update(vm._render(), hydrating) // 更新节点 //hydrating ssr相关
    }
```



























