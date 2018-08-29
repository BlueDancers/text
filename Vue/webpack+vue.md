# webpack+Vue

首先第一步自然是新建项目

```bash
npm install
```

安装基本的webpack 以及vue + vue-loader

```bash
npm install webpack vue vue-loader
```

安装完成后,看提示信息安装依赖

```bash
npm install css-loader vue-template-compiler
```

新建src目录里面新建app.vue文件

````JavaScript
<template>
  <div>
    <p id="data">我是{{ data }}</p>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        data: 'vue'
      }
    }
  }
</script>

<style scoped>
data {
  font-size: 30px;
}
</style>
````

在src下面新建index.js作为入口

```JavaScript
import Vue from 'vue'
import App from './app.vue'
import './assets/img/database.png'
import './assets/style/app.css'
import './assets/style/test.stylus.styl'

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
  render:(h)=> h(App)
}).$mount(root)
```

在项目根目录新建webpack.config.js

```JavaScript
const path = require('path')

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename : 'bundle.js',
    path: path.join(__dirname,'dist')
  }
}
```

之后在package里面的"scripts"标签里面添加一行代码

```json
"build": "webpack --config webpack.config.js"
```

运行代码

![](http://on7r0tqgu.bkt.clouddn.com/FlgmFsYTzHheDzN_55AruY01wvDa.png)

会出现错误,因为.vue的语法无法解析,不支持vue的语法

所以我们需要添加配置,webpack.config.js变成这样

```JavaScript
const path = require('path')

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename : 'bundle.js',
    path: path.join(__dirname,'dist')
  },
  module: {
    rules: [
      {
        test: /.vue$/,
        loader: 'vue-loader'
      }
    ]
  }
}
```

再次运行

![](http://on7r0tqgu.bkt.clouddn.com/FrOtEs9jZ-vToWl1Vssvt61dqbJt.png)

这里警告是webpack4需要在执行打包的时候指定生产环境还是开发环境

还要配置css的loader

```bash
npm install style-loader
```

以及`vue-loader was used without the corresponding plugin. Make sure to include VueLoaderPlugin in your webpack config. `,这个错误

我们需要在webpack4里面配置VueLoaderPlugin,全部完成后

webpack.config.js

```JavaScript
const path = require('path')
const {
  VueLoaderPlugin
} = require('vue-loader')
module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
```

我们最后再打包一次

![](http://on7r0tqgu.bkt.clouddn.com/FiskYhfJPBOHiMNVrbY2oogqUrJ6.png)

打包成功



## 加载静态资源以及css预处理器

加载静态资源只要用的是url-loader

在webpack.config.js>module>rules里面增加配置

```JavaScript
 {
        test: /\.(gif|png|jpg|svg)$/,
        use: [
          {
            loader: 'url-loader',  //可以转成base64
            options: {
              limit: 2048, //这里设置字节数最大值小于1024就会转成base64,
              name: '[name]-photo.[ext]'  //定义图片名称[name]表示名称 [ext]表示后缀名
            }
          }
        ]
      }
```

这里需要下载url-loader以及他的依赖,file-loader

````bash
npm install url-loader file-loader
````

这样完成了webpack对静态资源的打包



css预处理器

这里使用的是stylus   首先配置rules

```JavaScript
{
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader'
        ]
      },
```

npm安装依赖

```bash
npm install stylus-loader stylus
```

这样就可以加载stylus文件以及预编译stylus语法了



## 配置webpack-dev-server

```
npm install webpack-dev-server
```

webpack-dev-server 能够快速开发应用程序[devServer](https://webpack.docschina.org/configuration/dev-server/),看官网对他的说明

我们常用的Vue-cli就是基于devServer启动的,主要是启动了一个express的http服务器,此外这个`Http服务器`和`client`使用了`websocket`通讯协议，原始文件作出改动后，`webpack-dev-server`会实时的编译,就是热加载

webpack.config.js里面进行一些判断，确定是生产环境还是开发环境

这个使用cross-env进行判断

```bash
npm i cross-env
```

首先改写devServer的scripts命令

````bash
"build": "cross-env NODE_ENV=production webpack --mode=production --config webpack.config.js",
"dev": "cross-env NODE_ENV=development webpack-dev-server --mode=development --config webpack.config.js"
````

改写webpack.config.js的配置

这里还需要一个html来展示,我们使用过插件来实现

```bash
npm install html-webpack-plugin
```

````JavaScript
const path = require('path')
const {
  VueLoaderPlugin
} = require('vue-loader')

const HTMLplugin = require('html-webpack-plugin')
const webpack = require('webpack')
const isDev = process.env.NODE_ENV === 'development'
//process 可以读取换变量

const config = {
  target: 'web',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.(gif|png|jpg|svg)$/,
        use: [{
          loader: 'url-loader', //可以转成base64
          options: {
            limit: 2048, //这里设置字节数最大值小于1024就会转成base64,
            name: '[name]-photo.[ext]' //定义图片名称
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new VueLoaderPlugin(),
    new HTMLplugin(),

  ]
}

if (isDev) {
  config.devtool = "#cheap-module-eval-source-map"   
  config.devServer = {
    port: '8000',
    host: '120.0.0.1',
    overlay: { //配置错误
      errors: true
    },
    //open:true,
    // historyFallback: {

    // }
    hot: true
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
}

module.exports = config
````

到这个一步,以及实现热加载.vue文件了







## 在Vue项目里面使用jsx 以及postcss的安装

继续配置项目

```bash
npm install postcss-loader autoprefixer babel-loader babel-core
```

postcss就用来后处理css,就是css已经完成了预编译,这里的autoprefixer就是处理浏览器兼容问题的插件,这样,写代码就不需要考虑浏览器的css兼容问题

配置postcss  根目录增加文件 postcss.config.js

```JavaScript
const autoprofixer = require('autoprefixer')

module.exports = {
  plugins: [
    autoprofixer()
  ]
}
```

配置jsx

```bash
npm install babel-preset-env babel-plugin-transform-vue-jsx
```

可能还有依赖,自已看日志

````bash
npm install babel-helper-vue-jsx-merge-props
````

根目录建立文件 babelrc

```javascript
{
  "presets": [
    "env"
  ],
  "plugins": [
    "transform-vue-jsx"
  ]
}
```

最后改写webpack.config.js

```JavaScript
{
        test: /\.jsx$/,
        loader: 'babel-loader'
},
{
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
            //选项的作用使用来提高效率的。
          },
          'stylus-loader'
        ]
      },
```

##  webpack配置css单独分离打包

````
npm install --save-dev extract-text-webpack-plugin@next
````

打包非js文件的插件,这么安装要注意

引入,按环境区分加载插件,build的时候使用该插件

```JavaScript
const path = require('path')
const {
  VueLoaderPlugin
} = require('vue-loader')

const HTMLplugin = require('html-webpack-plugin')
const webpack = require('webpack')

const ExtractPlugin = require('extract-text-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
//process 可以读取换变量

const config = {
  target: 'web',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },

      {
        test: /\.(gif|png|jpg|svg)$/,
        use: [{
          loader: 'url-loader', //可以转成base64
          options: {
            limit: 2048, //这里设置字节数最大值小于1024就会转成base64,
            name: '[name]-photo.[ext]' //定义图片名称
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new VueLoaderPlugin(),
    new HTMLplugin(),

  ]
}

if (isDev) {
  config.module.rules.push({
    test: /\.styl(us)?$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true
        }
        //选项的作用使用来提高效率的。
      },
      'stylus-loader'
    ]
  })
  config.devtool = "#cheap-module-eval-source-map"
  config.devServer = {
    port: '8000',
    host: '127.0.0.1',
    overlay: { //配置错误
      errors: true
    },
    //open:true,
    // historyFallback: {

    // }
    hot: true
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
} else {

  //正式环境
  config.entry = {
    app: path.join(__dirname, 'src/index.js'),
    verdor: ['vue']
  }
  config.output.filename = '[name].[chunkhash:8].js';
  config.module.rules.push({
    test: /\.styl/,
    use: ExtractPlugin.extract({
      fallback: 'style-loader',
      use: [
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        },
        'stylus-loader'
      ]
    })
  });
  config.plugins.push(
    new ExtractPlugin('style.[chunkhash:8].css'),
  )

  //这部分的配置看不懂
  config.optimization = {
    splitChunks: {
      cacheGroups: { // 这里开始设置缓存的 chunks
        commons: {
          chunks: 'initial', // 必须三选一： "initial" | "all" | "async"(默认就是异步)
          minSize: 0, // 最小尺寸，默认0,
          minChunks: 2, // 最小 chunk ，默认1
          maxInitialRequests: 5 // 最大初始化请求书，默认1
        },
        vendor: {
          test: /node_modules/, // 正则规则验证，如果符合就提取 chunk
          chunks: 'initial', // 必须三选一： "initial" | "all" | "async"(默认就是异步)
          name: 'vendor', // 要缓存的 分隔出来的 chunk 名称
          priority: 10, // 缓存组优先级
          enforce: true
        }
      }
    },
    runtimeChunk: true
  }
}

module.exports = config
```











