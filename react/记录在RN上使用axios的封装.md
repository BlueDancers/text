# 在RN项目上对axios的封装



axios的[github地址](https://github.com/axios/axios) [axios翻译文档](https://segmentfault.com/a/1190000008470355#articleHeader0)

## 前言

之前写`小程序`项目,虽然进行了简易的`promise`的封装,代码量小了很多 ,**但是对于回调里面的数据处理**,很多验证代码都是**一样**的,代码写起来就很不舒服,

例如

后端返回的数据

**正常情况**

```JavaScript
data: {
    result: 1,
    metMsg: '', // 正常情况没有错误信息
    data: {
       // 数据 
    }
}
```

后端维护了，暂时不能使用

```JavaScript
data: {
    result: 2, // 表示不正常
    metMsg: '告诉前端/用户的错误信息',
    data: {}
}
```

需要在每个请求的回调里面都要这样判断

````react
.then(res => {
    if(res.data.result == 1) {
        // ...  下面的一系列操作
    } else {
        // ... 错误提示
    }
})
````

一个两个可能感觉没什么,但是几十个页面,写这样的重复代码上百次,就非常蛋疼了

非常需要`拦截器`这样的东西帮助我解决这个问题,微信`request`没有提供拦截器的api,开发者需要自己封装一个拦截器,下次写小程序可以试试写一个



## 步入正题

以上开发的痛点在axios上可以很好的解决,因为axios提供了拦截器（狗头）

这里 前端同学与后端同学,在项目开始前确定参数,前端就可以进行axios的封装了

例如

```JavaScript
data: {
    result: , // 1 为正常 2 为不正常 3 ....
    metMsg: '为什么不正常的原因',
    data: {} // 1 返回data 其他都不返回
}
```

根据规则就可以进行封装了

**/utils/index**（axios的封装）

````JavaScript
import axios from 'axios'
import { Alert } from 'react-native'
//请求拦截器
axios.interceptors.request.use(
  function(config) {
    // 添加响应头等等设置
    config.headers.userToken = 'this is my token'
    return config
  },
  function(error) {
    return Promise.reject(error) // 请求出错
  }
)

//返回拦截器
axios.interceptors.response.use(
  function(response) {
    if (response.data.data.result != 1) {
      let { retMsg } = response.data.data
      // 服务端出现了一些问题的情况下
      Alert.alert('温馨提示', retMsg)
      // 等等按钮事件
      return Promise.reject(retMsg)
    } else {
      // 服务端一切正常 返回data数据
      return response.data
    }
  },
  function(error) {
    return Promise.reject(error)
  }
)

const defaultData = {}
const defatltUrl = ''
function PostAxios(url = defatltUrl, data = defaultData) {
  return axios({
    method: 'POST',
    url,
    data
  })
}

function GetAxios(url = defatltUrl, data = defaultData) {
  return axios({
    method: 'GET',
    url,
    data
  })
}

export default {
  PostAxios,
  GetAxios
}

````

项目中的发起请求的公共部分,例如`header` 头等等数据写在`请求拦截器`中

项目中的正确回调的公共部分,例如,后端给定的判断 写在`返回拦截器`中

这样我们再业务代码里面写请求代码就非常非常方便

## 项目代码

```react
import response from '/utils/response' // 请求地址
import utils from '/utils/index' // axios的封装

//react
componentDidMount() {
    utils
      .GetAxios(response.listData) // header信息封装在请求拦截器中
      .then(res => {
        // 因为错误情况已经在返回拦截器中进行的处理,所以业务代码不再需要判断正误
        this.setState({
          city: res.data.data
        })
      })
      .catch(res => {
        // RN进行错误处理....
      })
  }
```



日常总结，网上关于axios封装的文章已经很多，不喜勿喷~~~

