## Vue-cli3.0的打包性能优化方案

![](http://www.vkcyan.top/FmjM5TUMCmgkrosf8eT0pG156e4T.png)

#### 项目背景

1. 项目模板使用的是基于Vue-cli3的[**vue-admin-template**](https://github.com/PanJiaChen/vue-admin-template)
2. 项目是单页后台
3. 项目属于中小型项目


#### 问题 - 首屏加载非常慢

让我们看看没任何处理的测试包

![](http://www.vkcyan.top/FpVX2anxXXlMhNSkTGi41zQm8yCv.png)

首屏加载竟然需要5-10s的加载时间! 这肯定是不符合线上要求的

分析一下加载的资源,明确发现以下问题

1. elementUI的js文件太大了,严重影响速度
2. 整体代码未压缩
3. 某张图片,静态资源过大,应减小该图片体积,或者优化静态资源加载速度



### 如何优化

#### 前端开启gzip

> 关于这一点作者文档中[分析构建文件体积]([https://panjiachen.github.io/vue-element-admin-site/zh/guide/essentials/deploy.html#%E5%88%86%E6%9E%90%E6%9E%84%E5%BB%BA%E6%96%87%E4%BB%B6%E4%BD%93%E7%A7%AF](https://panjiachen.github.io/vue-element-admin-site/zh/guide/essentials/deploy.html#分析构建文件体积))有提到,但是却没有给出解决方案,配置如下

服务器开启nginx后,代码经过压缩就会小很多,但是如果我们打包后的代码没有压缩过,那就是服务端来负责压缩,自然会拖慢服务端加载速度,我们应该在webpack中开启压缩

生成压缩代码的webpack插件

```bash
npm install compression-webpack-plugin -D
```



修改`vue.config.js`

> 该对象将会被 [webpack-merge](https://github.com/survivejs/webpack-merge) 合并入最终的 webpack 配置。具体请看[webpack相关]([https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F](https://cli.vuejs.org/zh/guide/webpack.html#简单的配置方式))

```JavaScript
configureWebpack: config => {
    const baseConfig = {
        name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    }
    if (process.env.NODE_ENV === 'production') {
        return {
            plugins: [
                // 压缩代码
                new CompressionPlugin({
                    test: /\.js$|\.html$|.\css/, // 匹配文件名
                    threshold: 10240, // 对超过10k的数据压缩
                    deleteOriginalAssets: true // true 不删除源文件 false 删除源文件
                })
            ],
            ...baseConfig
        }
    } else {
        return { ...baseConfig }
    }
}
```

配置完成后再次打包代码,就会发现js文件夹里面多出了 **.js.gz**文件,那就是压缩后的js代码



#### 首页图进行优化

关于图片部分,因为这个后台仅仅有一张登录背景图很大,所以对于小项目,只要将png图片转成jpg图片即可所以大量的图片体积,这个交给ui来完成



#### 去除console.log与警告

> 注意:  去除警告现在为插件 [TerserWebpackPlugin](https://webpack.js.org/plugins/terser-webpack-plugin/)  webpack-parallel-uglify-plugin不在提供去除log与警告功能
>
> 该插件的配置 [minify-options](https://github.com/terser-js/terser#minify-options)

线上项目自然不应该被看到控制台的打印日志,所以我们需要将`console.log`都去除掉



```bash
npm install compression-webpack-plugin -D
```



修改vue.config.js `configureWebpack`部分

```js
configureWebpack: config => {
    const baseConfig = {
        name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    }
    if (process.env.NODE_ENV === 'production') {
        return {
            plugins: [
                // 压缩代码
                new CompressionPlugin({
                    test: /\.js$|\.html$|.\css/, // 匹配文件名
                    threshold: 10240, // 对超过10k的数据压缩
                    deleteOriginalAssets: true // 不删除源文件
                }),
                // 去除console.log
                new TerserPlugin({
                    terserOptions: {
                        compress: {
                            warnings: false,
                            drop_console: true,
                            drop_debugger: true,
                            pure_funcs: ['console.log']
                        }
                    }
                })
            ],
            ...baseConfig
        }
    } else {
        return { ...baseConfig }
    }
}
```



#### 将elementUI改为按需加载

> 这一块官方坑比较大,花了比较久的时间



安装按需引入插件

```bash
npm install babel-plugin-component -D
```



配置

> 这里因为babel的升级,按element[官方配置](https://element.eleme.cn/#/zh-CN/component/quickstart#an-xu-yin-ru),会报错,presets部分增加会报错

```js
module.exports = {
  presets: ['@vue/app'],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ]
  ]
}
```



然后我们开始修改`main.js`里面的按需引入代码

> 代码来自官方文档https://element.eleme.cn/#/zh-CN/component/quickstart#an-xu-yin-ru

```javascript
import {
  Pagination,
  Dialog,
  Autocomplete,
  ....
} from 'element-ui'

Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Autocomplete)
.....

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
```



这里重启项目,会报错

![img](http://www.vkcyan.top/Fiv6s7UrLCCBv8Loz6G1FlWLZ5yI.png)

google了很久,终于找到了类似问题

[Uncaught ReferenceError: _MessageBox is not defined](https://github.com/ElementUI/babel-plugin-component/issues/31),没解决方案~~elementUI非常棒,作为开发者非常感谢维护者大大们,但是麻烦官方也把出现的问题解决一下啊,这个issue多久了,还是去年的,一点回复都没有,官方案例又跑不通,同时社区形同虚设,隔壁Antd的gitter,在线聊天室维护者会回复问题,Taro社区有微信群,element的gitter就和只是用来聊天的gitter,全都是问题,却没有答案,这样真的不好~~

问题解决

[element改为按需引入后会报错](https://github.com/PanJiaChen/vue-element-admin/issues/2168),来自**vue-element-admin**的issues,问题提出者的解决方案

![](http://www.vkcyan.top/FsEGWA63Gt3JmXrb0IcfC37zC7dg.png)



亲测可用

````JavaScript
import {
  Pagination,
  Dialog,
  Autocomplete,
  ....
} from 'element-ui'

Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Autocomplete)
.....

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = Vue.prototype.$msgbox.alert
Vue.prototype.$confirm = Vue.prototype.$msgbox.confirm
Vue.prototype.$prompt = Vue.prototype.$msgbox.prompt
Vue.prototype.$message = Message
````



### 优化后

最后来看一下,优化后,项目启动速度是多久

- element的js包由638kb减小为110kb
- 图片改为jpg格式,不降低质量的情况下 422kb减小到253kb
- 整体代码包体积减小了50%

在模拟3g网络下,页面第一次进入3s就会基本完成了全部加载

![](http://www.vkcyan.top/FlqiPcxiH4Bo3HYrz1lCAyBWXqW8.png)



模拟4g网速的情况下,1s完成页面的加载

![](http://www.vkcyan.top/FvzFEBQDQw_fpmAMl4umpImlzt0K.png)



### 小结

> 关于Vue打包文件使用静态sdn来减小项目体积,个人而言不太赞同,毕竟静态cdn是别人的东西,假如cdn掉线了,项目出现问题,责任谁都承担不起



本文是比较浅层的优化,项目依旧可以继续优化,但是提升效果可能不太明显

但是经过上面的步骤,基本满足大部分项目的需求,可以达到自己想要的效果