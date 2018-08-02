# cli配置解析

### build.js

> 控制 npm run build 打包工具

```js
'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production' //production生产模式

const ora = require('ora')            //控制输出日志
const rm = require('rimraf')          //以包的形式包装rm -rf命令
const path = require('path')          //node.js的path模块 
const chalk = require('chalk')        //控制shell里面输出的字体的颜色
const webpack = require('webpack')    //进入webpack配置,以便于打包
const config = require('../config')   //假如引入目录的话 会默认去找index.js 找不到会报错
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...')     
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {     //在打包之前把之前的打包项目清除掉
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()        //打包完成后停止
    if (err) throw err  
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))   //这里是打包完成后进行输出
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})

```

### package.json

#### scripts

```
sell脚本的命令
```

dependencies 

