# React-Native使用极光进行消息推送

推送作为APP几乎必备的功能,不论是什么产品都免不了需要`消息推送`功能,一般做`RN`开发的可能都是前端出身(比如我),关于`android` `ios` 都不是很懂😫,所以使用第三方推送插件是比较好的解决方案

​	我选取了`极光`来集成推送服务的,按一些博客一步一步来的,[React Native集成极光推送](https://blog.csdn.net/xiangzhihong8/article/details/80734865),基本没有什么坑吧,但是写的并不是完成正确

## 注册极光账号

[极光官网](https://www.jiguang.cn/push)

注册完成后进入[极光推送](https://www.jiguang.cn/dev/#/app/list#dev),然后创建应用

创建完成后将会获得自己的`AppKey`

![](http://www.vkcyan.top/FnqdqP-AEzaBDAzX_ot1IHtGoe84.png)



## 安装极光SDK

> 这里可以看看[官方github](https://github.com/jpush/jpush-react-native)

```bash
npm install jcore-react-native --save 
react-native link jcore-react-native
npm install jpush-react-native --save 
react-native link jpush-react-native
```

检查`project/android/app/build.gradle`

```js
android {
    ...
    defaultConfig {
        applicationId "yourApplicationId" // (包名有用)在极光官网上申请应用时填写的包名
        ...
        manifestPlaceholders = [
                JPUSH_APPKEY: "yourAppKey", //安装的时候填写这里无需改动
                APP_CHANNEL: "developer-default"    //应用渠道号, 默认即可
        ]
    }
}
...
dependencies {
	// ....
    compile project(':jpush-react-native')  // 添加 jpush 依赖
    compile project(':jcore-react-native')  // 添加 jcore 依赖
    // ....
}
```



## 进行推送设置

![](http://www.vkcyan.top/Fo6u87wRd9aZd9sVMfRF_D2OeVub.png)

![](http://www.vkcyan.top/Fqh-J7v6H8WsYWrJOU8ZEC_0ITxa.png)

到此为止就完成了环境的配置,可以尝试去进行推送了

![](http://www.vkcyan.top/FslcOg4XH5rmPOxs-CkxMWp5la45.png)

![](http://www.vkcyan.top/FrFcWl86wsAvnOlhdrbMmWbiIQd7.png)

成功啦!!



## 点击推送

> 很多情况下,我们需要在应用内部进行消息的触发,比如 `新的消息` 这就必须通过代码进行触发了 

[极光推送RN的API文档](https://github.com/jpush/jpush-react-native/blob/master/documents/api.md)


```react
import React, { Component } from 'react'
import { Text, StyleSheet, View, Button } from 'react-native'
import JPushModule from 'jpush-react-native'
export default class ChatWith extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    // 初始化 JPush
    JPushModule.initPush()
	// 获取当前极光开发者信息
    JPushModule.getInfo(map => {
      console.log(map)
    })
    // 点击推送通知回调
    JPushModule.addReceiveOpenNotificationListener(map => {
      console.log('进行一系列操作')
      console.log('map.extra: ' + map)
      // 可执行跳转操作，也可跳转原生页面 关于参数请看文档
      // this.props.navigation.navigate("SecondActivity");
    })
    // 接收推送通知回调
    JPushModule.addReceiveNotificationListener(message => {
      console.log('receive notification: ', message)
    })
    //
  }

  render() {
    return (
      <View style={styles.containers}>
        <Button
          title="点击推送"
          onPress={() => {
            // 推送事件 业务代码 请提取到函数里面    
            JPushModule.sendLocalNotification({
              buildId: 1, // 设置通知样式
              id: 5, // 通知的 id, 可用于取消通知
              extra: { key1: 'value1', key2: 'value2' }, // extra 字段 就是我们需要传递的参数
              fireTime: new Date().getTime(), // 通知触发时间的时间戳（毫秒）
              badge: 8, // 本地推送触发后应用角标的 badge 值 （iOS Only）
              subtitle: 'subtitle',  // 子标题 （iOS10+ Only）
              title: '通知',
              content: '您有未读消息',
            })
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  containers: {
    paddingTop: 20
  }
})
```

