# 使用mock.js进行数据模拟

mock.js的文档真的是无力吐槽,只说明API怎么使用,完全不说明mock.js这个工具怎么用,最有意思的是google的大部分文章复制官网的API,**不管是react还是Vue都是下面的流程**

> 本文主要记录mock这个工具怎么使用,api自己看[文档](https://github.com/nuysoft/Mock/wiki/Getting-Started)

1. 安装mock.js

```
npm install mockjs
```

2. 在项目里面使用mock.js

```JavaScript
\..\src\mock\mock.js

import Mock from "mockjs";

export default Mock.mock("/list", { // 拦截当前环境下的list路由
  success: true,
  data: [
    "行距杯2018征文",
    "区块链",
    "小程序",
    "vue"
  ]
});

```

3. 在入口文件导入mock文件

````
// ....
import './mock/mock'

// ....
````

这样就可以访问到了

这里推荐看看 [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin/)的mock,最规范的使用方法