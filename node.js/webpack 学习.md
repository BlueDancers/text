# webpack总结

  对于第一次接触webpack已经过去好几个月了,中间因为比赛一直在用 但是没有了解过 ,

今晚学习了很多,总结一下

***

1. 但是，如果我们更改了我们的一个入口起点的名称，甚至添加了一个新的名称，会发生什么？生成的包将被重命名在一个构建中，但是我们的`index.html`文件仍然会引用旧的名字。我们用 [`HtmlWebpackPlugin`](https://www.webpackjs.com/plugins/html-webpack-plugin) 来解决这个问题。

```bas
npm install --save-dev html-webpack-plugin
```

在我们构建之前，你应该了解，虽然在 `dist/` 文件夹我们已经有 `index.html` 这个文件，然而 `HtmlWebpackPlugin` 还是会默认生成 `index.html` 文件。这就是说，它会用新生成的 `index.html` 文件，把我们的原来的替换。

***

2. 你可能已经注意到，由于过去的指南和代码示例遗留下来，导致我们的 `/dist` 文件夹相当杂乱。webpack 会生成文件，然后将这些文件放置在 `/dist` 文件夹中，但是 webpack 无法追踪到哪些文件是实际在项目中用到的。

```bash
npm install clean-webpack-plugin --save-dev
```

现在执行 `npm run build`，再检查 `/dist` 文件夹。如果一切顺利，你现在应该不会再看到旧的文件，只有构建后生成的文件！

***

3. 在日常开发会打包很多 js文件 那么在打包文件的时候 就会遇到错误代码找不到源文件的情况,为了更容易地追踪错误和警告，JavaScript 提供了 [source map](http://blog.teamtreehouse.com/introduction-source-maps) 功能，将编译后的代码映射回原始源代码。如果一个错误来自于 `b.js`，source map 就会明确的告诉你。

```bash
devtool: 'inline-source-map'
```

***

### 观察模式

你可以指示 webpack "watch" 依赖图中的所有文件以进行更改。如果其中一个文件被更新，代码将被重新编译，所以你不必手动运行整个构建。

```
"scripts": {
      "watch": "webpack --watch",
    },
```

现在，你可以在命令行中运行 `npm run watch`，就会看到 webpack 编译代码，然而却不会退出命令行。这是因为 script 脚本还在观察文件。

唯一的缺点是，为了看到修改后的实际效果，你需要刷新浏览器。如果能够自动刷新浏览器就更好了，可以尝试使用 `webpack-dev-server`，恰好可以实现我们想要的功能。

### 使用 webpack-dev-server

`webpack-dev-server` 为你提供了一个简单的 web 服务器，并且能够实时重新加载(live reloading)。让我们设置以下：

```bash
npm install --save-dev webpack-dev-server
```

修改配置文件，告诉开发服务器(dev server)，在哪里查找文件：

**webpack.config.js**

```
devServer: {
     contentBase: './dist'
},
```

**package.json**

```bash
"start": "webpack-dev-server --open",
```

现在，我们可以在命令行中运行 `npm start`，就会看到浏览器自动加载页面。如果现在修改和保存任意源文件，web 服务器就会自动重新加载编译后的代码,这你会自动刷新,注意 **会刷新**

***

### 使用 webpack-dev-middleware

`webpack-dev-middleware` 是一个容器(wrapper)，它可以把 webpack 处理后的文件传递给一个服务器(server)。 `webpack-dev-server` 在内部使用了它，同时，它也可以作为一个单独的包来使用，以便进行更多自定义设置来实现更多的需求。接下来是一个 webpack-dev-middleware 配合 express server 的示例。

首先，安装 `express` 和 `webpack-dev-middleware`：

```bash
npm install --save-dev express webpack-dev-middleware
```

```
utput: {
	  publicPath: '/'
   }
```

`publicPath` 也会在服务器脚本用到，以确保文件资源能够在 `http://localhost:3000` 下正确访问，我们稍后再设置端口号。下一步就是设置我们自定义的 `express` 服务：

**server.js**

```
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});	
```

现在，添加一个 npm script，以使我们更方便地运行服务：

**package.json**

```
"scripts": {
      "server": "node server.js",
    },
```

现在，在你的终端执行 `npm run server`现在,

打开浏览器，跳转到 `http://localhost:3000`，你应该看到你的webpack 应用程序已经运行！

***

# 模块热替换

模块热替换(Hot Module Replacement 或 HMR)是 webpack 提供的最有用的功能之一。它允许在运行时更新各种模块，而无需进行完全刷新。本页面重点介绍**实现**，而[概念页面](https://www.webpackjs.com/concepts/hot-module-replacement)提供了更多关于它的工作原理以及为什么它有用的细节。

启用此功能实际上相当简单。而我们要做的，就是更新 [webpack-dev-server](https://github.com/webpack/webpack-dev-server) 的配置，和使用 webpack 内置的 HMR 插件。我们还要删除掉 `print.js` 的入口起点，因为它现在正被 `index.js` 模式使用。

**webpack.config.js**

```
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
  const webpack = require('webpack');

  module.exports = {
    entry: {
       app: './src/index.js',
       print: './src/print.js'
       app: './src/index.js'
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
      hot: true
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Hot Module Replacement'
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

你可以通过命令来修改 [webpack-dev-server](https://github.com/webpack/webpack-dev-server) 的配置：`webpack-dev-server --hotOnly`。

注意，我们还添加了 `NamedModulesPlugin`，以便更容易查看要修补(patch)的依赖。在起步阶段，我们将通过在命令行中运行 `npm start` 来启动并运行 dev server。

现在，我们来修改 `index.js` 文件，以便当 `print.js` 内部发生变更时可以告诉 webpack 接受更新的模块。

