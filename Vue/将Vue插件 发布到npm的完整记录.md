# 将Vue插件 发布到npm的完整记录

## 前言

​	面对越来越多的组件库,越开越多的ui库,学会发布库已经是前端必须会的事情了,也算是为开源贡献一份力量,在网络上看了一些前者的文章,也算的发布成功了,虽然还存在很多问题,路不积跬步,无以至千里,一步一步来吧

参考文章

[📦vue组件发布npm最佳实践](https://juejin.im/post/5b231f6ff265da595f0d2540)

[从零开始搭建Vue组件库 VV-UI](https://zhuanlan.zhihu.com/p/30948290)

[详解：Vue cli3 库模式搭建组件库并发布到 npm](https://juejin.im/post/5bbab9de5188255c8c0cb0e3)

## 环境

> 开发环境是Vue-cli3生成的,

````
1. npm install -g @vue/cli
2. 在想要开启项目的地方,打开bash,输入`vue ui`
3. 创建第一个default`项目
````

准备工作就算完成了



## 搭建库环境

> 很多教程建议将src改成examples,但是这个和组件关系不太大,所以没必要改

1. 在项目目录下新建一个文件夹`packages`,用来存放写的库代码的内容

2. 在项目目录下新建`vue.config.js`文件(如果存在就不用创建)

`vue.config.js`

> cli3隐藏了webpack的配置文件,只能通过vue.config.js来配置webpack
>
> 这一块我不是很熟悉,也是复制[详解：Vue cli3 库模式搭建组件库并发布到 npm](https://juejin.im/post/5bbab9de5188255c8c0cb0e3)里面的部分代码

```javascript
module.exports = {
  // 强制内联CSS
  css: { extract: false },
  // 扩展 webpack 配置，使 packages 加入编译
  chainWebpack: config => {
    config.module
      .rule('js')
      .include
        .add('/packages')
        .end()
      .use('babel')
        .loader('babel-loader')
        .tap(options => {
          // 修改它的选项...
          return options
        })
  }
}
```

重启一下,不报错库环境就ok了



## 编写组件

关于编写组件这一套看的是[详解：Vue cli3 库模式搭建组件库并发布到 npm](https://juejin.im/post/5bbab9de5188255c8c0cb0e3)文章的配置但是感觉又有点问题



组件的结构大概是这样的

![](http://www.vkcyan.top/FpDSEM4sf4I9xDElTSgXds0YQcWX.png)

`color-picker`组件是我看别人的文章添加的组件[color-picker](https://github.com/zuley/vue-color-picker),可以直接复制他插件代码

`modal`组件是自己写的组件(为了测试多个组件如何使用)

我花了一会儿时间仿照[element](http://element-cn.eleme.io/#/zh-CN/component/installation),的[Buttom](http://element-cn.eleme.io/#/zh-CN/component/button),写了一个组件

**vk\packages\modal\src\modal.vue**

```vue
<template>
  <button
    class="vk_button"
    :disabled="disabled"
    :class="['vk_button--'+type, {'vk_plain':plain,'vk_disabled': disabled,'vk_round':round}]"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'vkModal',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    disabled: {
      type: Boolean,
      default: false // 当为true为禁用
    },
    plain: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    }
  }
}
</script>


<style>
.vk_button {
  cursor: pointer;
  padding: 12px 20px;
  margin: 0;
  line-height: 1;
  border: 1px solid #bfcbd9;
  color: #1f2d3d;
  background-color: #fff;
  text-align: center;
  display: inline-block;
  outline: 0;
  box-sizing: border-box;
  border-radius: 4px;
}
.vk_button:hover {
  opacity: 0.7;
}

.vk_button:active {
  opacity: 1;
}
.vk_round {
  border-radius: 20px;
}
.vk_button--default {
  background: #fff;
  border: 1px solid #bfcbd9;
  color: #1f2d3d;
}
.vk_button--primary {
  color: #fff;
  border: 1px solid #3faaf5;
  background-color: #3faaf5;
}
.vk_button--success {
  background: #13ce66;
  border: 1px solid #13ce66;
  color: #fff;
}
.vk_button--info {
  background: #50bfff;
  border: 1px solid #50bfff;
  color: #fff;
}
.vk_button--warning {
  background: #f7ba2a;
  border: 1px solid #f7ba2a;
  color: #fff;
}
.vk_button--danger {
  background: #ff4949;
  border: 1px solid #ff4949;
  color: #fff;
}
.vk_plain {
  background: rgba(63, 170, 245, 0.05);
  border-color: rgba(63, 170, 245, 0.8);
  color: #3faaf5;
}
.vk_plain:focus {
  background-color: #3faaf5;
  color: #fff;
  opacity: 1;
}
.vk_plain:active {
  opacity: 0.7;
}
</style>

```

然后导出该组件

**vk\packages\modal\index.js**

```
import vkModal from './src/modal.vue'
// 这端代码存在异议,可以不添加
// vkModal.install = function(Vue) {
//   Vue.component(vkModal.name, vkModal)
// }

export default vkModal
```

注册到vue

**vk\packages\index.js**

```javascript
import colorPicker from './color-picker/index'
import vkModal from './modal/index'
// import moduleName from './'
// 存储组件列表
const components = [
  colorPicker,
  vkModal
]
// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue) {
  // 判断是否安装
  if(install.installed) return
  // 遍历注册全局组件
  components.map(component => Vue.component(component.name,component))
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  // 以下是具体的组件列表
  colorPicker,
  vkModal
}
```

这既是完成了组件的编写,下面就是验证组件的使用了

## 使用库

**vk\src\main.js**

```
import Vue from 'vue'
import App from './App.vue'
import vkUI from '../packages/index' // 引入
Vue.config.productionTip = false

Vue.use(vkUI) // 注册
new Vue({
  render: h => h(App)
}).$mount('#app')

```



**vk\src\App.vue**

```vue
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <!-- <color-picker v-model="color" v-on:change="headleChangeColor"></color-picker> -->
    <vk-modal type="info">
      <span>我是按钮</span>
    </vk-modal>
  </div>
</template>
// .....
```



![](http://www.vkcyan.top/Fk1vn4sJDK4_aEU0PBMkDQDsA0Sf.png)

修改一下参数试试

```
<vk-modal type="success" plain>
      <span>我是按钮</span>
</vk-modal>
```

![](C:\Users\spring\AppData\Roaming\Typora\typora-user-images\1545803352031.png)

## 上传到npm仓库

>  当然上面只是一个例子,一般像样的UI库的样式与js都会分离,可以参考一下 [从零开始搭建Vue组件库 VV-UI](https://zhuanlan.zhihu.com/p/30948290)

### 打包库代码

> 参照[详解：Vue cli3 库模式搭建组件库并发布到 npm](https://juejin.im/post/5bbab9de5188255c8c0cb0e3) [Vue构建目标](https://cli.vuejs.org/zh/guide/build-targets.html#%E5%BA%94%E7%94%A8)

`--target`: 构建目标，默认为应用模式。这里修改为 `lib` 启用库模式。

`--dest` : 输出目录，默认 `dist`。这里我们改成 `lib`

`[entry]`: 最后一个参数为入口文件，默认为 `src/App.vue`。这里我们指定编译 `packages/` 组件库目录。



```json
"scripts": {
	// ...
	"lib": "vue-cli-service build --target lib --name vkUI --dest lib packages/index.js"
}
```



执行编译任务

```bash
npm run lib
```

打包成功后

> 关于文件的说明请看这里[Vue构建目标](https://cli.vuejs.org/zh/guide/build-targets.html#%E5%BA%93)

![](http://www.vkcyan.top/FqFoVgYFwGp4nfR9EH-D99d1Jkpf.png)

### 配置`package.json`文件中发布到npm字段

> 这里可以看看这篇文章,说的很详细[vue组件发布npm最佳实践](https://juejin.im/post/5b231f6ff265da595f0d2540)

`name`: 包名，该名字是唯一的。可在 npm 官网搜索名字，如果存在则需换个名字。

`version`: 版本号，每次发布至 npm 需要修改版本号，不能和历史版本号相同。

`description`: 对包的描述，在[npmjs.com](https://link.juejin.im/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fpackage)上搜索时会显示，有助于用户在搜索时进行筛选

`main`: 入口文件，该字段需指向我们最终编译后的包文件。

`keyword`：关键字，以空格分离希望用户最终搜索的词。

`author`：格式一般是`${your name} ${email}`, 当然也可以是一个github地址

`private`：是否私有，需要修改为 false 才能发布到 npm

`license`： 可能很多人会忽略，最好也写上去。至于用哪个，vue的官方项目全是MIT，因此我也是MIT，不纠结

`repository`的格式参考如下：

```
"repository": {
  "type": "git",
  "url": "https://github.com/vkcyan/text.git"
}
```

等等

参考以下配置

```json
"name": "vk",
"version": "0.1.1",
"description": "vkcyan的测试",
"author": "vkcyan <wu.vkcyan@gmail.com>",
"main": "lib/vkcolorpicker.umd.min.js",
"keyword": "测试的库",
"repository": {
	"type": "git",
	"url": "https://github.com/vkcyan"
},
```

### 添加`.npmignore` 文件，设置忽略发布文件

> 这里会.npmignore 会继承 `.gitignore`的忽略文件

```
# 忽略目录
examples/
packages/
public/

# 忽略指定文件
vue.config.js
babel.config.js
*.map
```



### 注册/登录npm

注册略

如果配置了淘宝镜像，先设置回npm镜像：

```
npm config set registry http://registry.npmjs.org 
```

登录

```
npm login
```

![](http://www.vkcyan.top/FjipYaoivJ98DoGkJ0sk_8Zh7zjx.png)

确认登录

```
npm whoami
```

![](http://www.vkcyan.top/Fnd6RF5uvSQ2qU9Ny1HVQbCBC7-j.png)

### 发布

 ```
npm publish
 ```

如果你遇到类似这样的错误

```
Package name too similar to existing packages; try renaming your package to '' and publishing with 'npm publish --access=public' instead : ''
```

解决办法: 换个名字(手动狗头)

发布成功

![](http://www.vkcyan.top/FmGJfmbWJcC5u_SNq-dVS-hnqJvm.png)

等一会儿npm上面就有了

![](C:\Users\spring\AppData\Roaming\Typora\typora-user-images\1545806914161.png)

我们可以下载看看试试

```
npm install vkcyan-ui
```

可能会遇到这样的错误

![](http://www.vkcyan.top/Fl5NeyrIVNLV6TUz_Rsp7YUU-D6M.png)

因为你的项目名和库名字相同,修改`name`

![](http://www.vkcyan.top/FlTw6xbRuLraR9JZE0WJgMBEoiLC.png)

再次下载

```
npm install vkcyan-ui
```

想必应该成功了



我们修改`\src\main.js`

````
import Vue from 'vue'
import App from './App.vue'
import vkUI from 'vkcyan-ui' // 改成npm下载的库
Vue.config.productionTip = false

Vue.use(vkUI)
new Vue({
  render: h => h(App)
}).$mount('#app')
````

![](http://www.vkcyan.top/FjoMTK_8aiE6CXjTpZdGBxY0GiQS.png)

依旧生效,后面就可以继续拓展,加入markdown,css与js分离,逐步完成成为更好的库









