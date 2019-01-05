# 使用promise应该避免嵌套

下午在看之前写的微信登录部分的代码

```JavaScript
function _login() {
  showLoading({
    title: '登录中'
  })
  login({
    success: res => {
      let { code } = res
      setStorageSync('code', code)
      getUserInfo({
        success: resinfo => {
          request('......', {
            code,
            userInfo: resinfo.rawData
          })
            .then(loginRes => {
              hideLoading()
              let { isRegister, userToken } = loginRes
              // isRegister=1 表示已经注册  isRegister=2 表示未注册
              if (isRegister == 1) {
                // 确定登录后的操作
                _setLoginData(userToken)
              } else {
                console.log('尚未注册,进行注册')
                _registry(userToken, resinfo)
              }
            })
            .catch(loginRes => {
              new Error('登录请求调用出错', loginRes)
            })
        },
        fail: info => {
          new Error('getUserInfo接口调用出错', info)
        }
      })
    }
  })
}
```

我突然想到一件很严重的事情 我为什么使用promise还写这样的3层嵌套,这样的代码可读性会很差,别人维护的不知道会说多少句F**K,花了一小段时间将嵌套函数重写为链式调用函数





```js
function Login() {
  showLoading({
    title: '登录中'
  })
  login()
    .then(res => {	// 获取唯一code
      let { code } = res
      return code
    })
    .then(code => {	// 请求官方登录接口
      return getUserInfo().then(resinfo => {
        this.resinfo = resinfo
        return code
      })
    })
    .then(code => {	// 进行服务端登录请求
      return request(config.LoginUrl, {
        code,
        userInfo: this.resinfo.rawData
      })
    })
    .then(loginRes => {	// 完成登录请求进行 判断是否需要注册
      hideLoading()
      let { isRegister, userToken } = loginRes
      // isRegister=1 表示已经注册  isRegister=2 表示未注册
      if (isRegister == 1) {
        _setLoginData(userToken)
      } else {
        console.log('尚未注册,进行注册')
        _registry(userToken, this.resinfo)
      }
    })
    .catch(error => {
      new Error('登录请求调用出错', error)
    })
}
```



改写成为链式调用后,代码可读性变好很多,也更加利于拓展,以后写代码要注意,不能用着高级API写着低级代码