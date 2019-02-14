# 现代JavaScript应该避免嵌套

前段时间看了之前写的微信登录部分的代码

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


我突然想到一件很严重的事情 我为什么使用promise还写这样的3层嵌套,这样的代码可读性会很差,后期可能不好维护,花了一小段时间将嵌套函数重写为promise链式调用函数

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



改写成为链式调用后,代码可读性变好很多,但是还有一些小问题,就是传值问题,不是很优雅

当然我们更加推荐使用`async/await` 进行异步控制,解决上面的传值问题,这样的代码看起来更加清晰可见

```js
async function Login() {
  showLoading({
    title: '登录中'
  })
  try {
    let logincode = await login() // 获取code
    let userInfo = await getUserInfo() // 获取用户
    userInfo = JSON.stringify(userInfo) // 转json
    let { code } = logincode
    let loginResult = await _getPrivateInfo(code,userInfo) // 对接项目登录接口
    hideLoading()
    if (loginResult.data.result == 1) { // 验证接口 存储session 返回用户信息 给 调用者
      let session = loginResult.header['Set-Cookie'].split('=')[1].split(';')[0]
      setStorageSync('session', session)
      return loginResult
    } else {
      showModal({
        content: '登录出现错误',
        showCancel: false
      })
      return -1
    }
  } catch (error) {
    hideLoading()
    new Error('登录请求调用出错', error)
  }
}

// 请求代码解耦 便于后期维护
function _getPrivateInfo(code,userInfo) {
  return request({
    // 发起请求
    url: config.LoginUrl,
    data: {
      code,
      userInfo
    },
    method: 'POST',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
```

