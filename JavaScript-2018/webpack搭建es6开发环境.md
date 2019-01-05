# webpack搭建es6调试环境💡

> 这里需要注意,这里仅仅是调试环境,几乎没有打包的配置 🐻

### 工具版本

```json
"babel-core": "^6.26.3",
"babel-loader": "^7.1.5",
"babel-preset-env": "^1.7.0",
"css-loader": "^2.0.0",
"html-webpack-plugin": "^3.2.0",
"webpack": "^4.27.1",
"webpack-cli": "^3.1.2",
"webpack-dev-server": "^3.1.10"
```



PS: 如果我你也想了解`axios`源码,但是并不关心乱七八糟的开发环境,请直接clone我的项目[对axios源码的解读](https://github.com/vkcyan/devaxios),跳过下面的步骤

## 常规步骤

1. 初始化环境

```bash
npm init
```



2. 安装webpack

````bash
npm install webpack webpack-cli -D  //-D就是--save-dev
````

(这里最好测试一下)



3. 安装依赖

```
npm install webpack css-loader -D // 打包css 这里可有可无
npm install html-webpack-plugin -D // 自动创建html文件
npm install webpack-dev-server -D // 开发服务器
npm install babel-loader@7 babel-core babel-preset-env -D // 对es6语法的支持
```

全部安装后,在项目根目录创建`webpack.config.js`

```js
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production', // 默认开发环境
  entry: './index.js',
  devtool: 'source-map', // 启动source-map 不然调试看不见源码
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['css-loader']
      }
    ]
  },
  devServer: {
    host: '127.0.0.1',
    port: '8080',
    hot: true,
    overlay: {
      errors: true
    },
    historyApiFallback: true,
    publicPath: '/',
    clientLogLevel: 'none',
    compress: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ 
      template: './index.html' // 模板 可以不写 就是默认模板
     })
  ]
}
```

新建`.babelrc`

```json
{
  "presets": [
    "env"
  ]
}
```



引入`axios`项目目录下的`lib`文件夹放入项目

创建一个index.js作为入口文件

```js
let axios = require('./lib/axios')
axios
  .request(
    'http://........'
  )
  .then(res => {
    console.log(res)
  })
  .catch(res => {
    console.log(res)
  })
```

最后在`package.json`里面添加一行脚本,启动`webpack`

```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server --mode=development --config webpack.config.js",
  },
```

最后启动`npm run dev`

就可以调试axios源码啦