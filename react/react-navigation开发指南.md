# react-navigation图文教程

接触`react-native`有一段时间了,感觉学习最大的难点就是 rn的国内资料不多,老外写的文档看起来不舒服

其中在`react-navigation`上面花了很长的时间,搞的心力憔悴,但是看国内的文章,都是2.x版本的,api不向下兼容,各种报错对象不存在

![](http://www.vkcyan.top/FlTAWB0y0-gbstNSfXPbiA5lmUYV.png)

后来看了很长时间的文档,才基本搞清楚`react-navigation`的使用

所以在我感觉我现在已经踩过很多坑的情况下,我决定写这篇文章,来帮助`rn`开发者尽可能的跳过`react-navigation`的一些坑



[react-native官网](https://reactnative.cn/)

[react-navigation官网](https://reactnavigation.org/zh-Hans/)

> 本文章基于 "react-navigation": "^3.0.9" 假如版本跨度比较大,本文可能就不适合了
>
> 另外,学习库或者插件最好的方式就官方阅读文档(感觉有点打脸自己)

## 安装

> 不要看百度出来的文章,一定要看文档,例如**dn,比较陈旧,已经不是个当前版本
>
> rn项目里面,我推荐使用yarn, npm有时候会出现依赖不全的问题

在已经初始化完成,并且确保可以运行的rn项目里面,输入一下命令

```
yarn add react-navigation
yarn add react-native-gesture-handler
react-native link react-native-gesture-handler
```

在已经搭建好的项目里面,运行上面的命令,这都是必须的,详情请看文档[React navigation安装](https://reactnavigation.org/docs/zh-Hans/getting-started.html#%E5%AE%89%E8%A3%85)

安装完成后启动项目(启动成功即意味着navigation安装成功了)



# 导航器

> 没有接触过原生开发的web开发者看到这些很react风格的导航器名称,一定很陌生,没关系,后面图示

rn上的导航器的编写就是类似 前端的路由的编写,通过rn的导航器来决定App的路由结构,以及个性化的页面

- **createStackNavigator**   最基本的页面 自带**上方导航栏**

  为你的应用程序提供一种在每个新屏幕放置在堆栈顶部的屏幕之间转换的方法。

- **createBottomTabNavigator**

  页面底部的标签栏，可让您在不同路由之间进行切换。 路由被懒加载 - 它们的屏幕组件只有在第一次获取焦点时才会被加载。

- **createMaterialTopTabNavigator**  

  功能上和 createBottomTabNavigator 一样,这个更加个性化,但是我们可以基于`createBottomTabNavigator`自定义任意底部导航栏

  屏幕底部的材料设计主题标签栏，可让您在不同路由之间切换。 路由被懒加载 - 它们的屏幕组件直到第一次获取焦点时才被加载。

- **createMaterialTopTabNavigator** 

  屏幕顶部左右滑动切换tab

  屏幕顶部的材料设计主题标签栏, 可通过点击路线或水平滑动来切换不同的路由。 默认情况下, 转换是动态的。 每个路由的屏幕组件将立即安装。

- **createDrawerNavigator**: 抽屉效果导航器,由侧边划出；

- **createSwitchNavigator**: 

  **SwitchNavigator**: 的用途是一次只显示一个页面。 默认情况下，它不处理返回操作，并在你切换时将路由重置为默认状态。(特定场合才会使用)



常用的导航器就这么多,下面将一一介绍给大家



#### 使用vscode开发一些必备的插件

工欲善其事,必先利其器,好的开发环境可以有效地加速开发速度,以及开发体验感

使用vscode开发,推荐安装[Full React/React Native/React Router/Redux/GraphQL/ES7/Testing/PropTypes snippets](https://marketplace.visualstudio.com/items?itemName=walter-ribeiro.full-react-snippets)

![](http://www.vkcyan.top/FpBFz3JsrT-tO1_zaWOH0JP2UB7I.gif)

另外开发react推荐插件

**React Native Snippet**

**React Native Tools**

**Reactjs code snippets**



以上插件安装完成后,就基本满足使用vscode进行react native的开发了 :wink:

安装好的项目我们稍微改造一下,

`one.js` `two.js` `three.js` 是页面 随便写点什么就好

`navigation`文件夹内部进行导航器的管理

![](http://www.vkcyan.top/Fhl1if4vi4CGsyOEFOuIF6a4t2Ez.png)

## createStackNavigator

这个是最常见的一个导航器,大部分页面都是通过他进行配置的,使用起来也很简单

先看看官方说明

![](http://www.vkcyan.top/FodYGHynMKB06Q-oYV_zHdP_NpuL.png)



现在我们在`navigation`/`index.js`进行路由的配置

```JavaScript
import { createStackNavigator, createAppContainer } from 'react-navigation'
import One from '../pages/One'
import Two from '../pages/Two'
import Three from '../pages/Three'

const Stack = createStackNavigator({
  One: {
    screen: One
  },
  Two: {
    screen: Two
  },
  Three: {
    screen: Three
  }
})

export default createAppContainer(Stack)
// createAppContainer是 react-navigation 的app容器,并将顶层的 navigator 链接到整个应用环境(后面再说)
```



现在我们需要在根节点导出这个导航器配置,所以需要修改根目录的`App.js`

```javascript
import React, { Component } from 'react'
import Navigation from './app/navigation'

export default class App extends Component {
  render() {
    return <Navigation />
  }
}
```

这个我们就导出导航器配置,接下来重启项目

![](http://www.vkcyan.top/FskPsuy1xDrozJ1wbHIUZ0VCqY-Z.png)

成功了!

但是目前还不能进行页面之前的切换,`react-navigation`提供了导航器之前的切换功能

> 关于切换路由 react-navigation 提供了很多api,下图是最基础的一部分

![](http://www.vkcyan.top/Ft_-dV6TaLL6Db0hSq8veANcK5FV.png)

还记得前面创建容器的API createAppContainer吗

他在props里面提供了navigation对象,用于进行导航器切换

在One.js里面添加切导航器的代码`One.js`

```js
import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'

export default class One extends Component {
  render() {
    return (
      <View>
        <Text> One </Text>
        <Button
          title="跳转到Two页面"
          onPress={() => {
            this.props.navigation.navigate('Two')
          }}
        />
      </View>
    )
  }
}
```

![](http://www.vkcyan.top/FhPtrFP_EK9kkGkHJPnQsGLQSHHg.gif)

原生的感觉真的棒~

我们不仅可以切换页面,还可以像原生一样配置页面,`react-navigation`提供了大量的导航的自定义配置

例如

我们可以添加页面标题,ios与android,导航栏会自适应

我们可以任意的选择显示或者不显示导航栏

设置导航栏颜色 等等你可以想到的个性化设置



更新`naviigation`/`index.js`

```JavaScript
import { createStackNavigator, createAppContainer } from 'react-navigation'
import One from '../pages/One'
import Two from '../pages/Two'
import Three from '../pages/Three'

const Stack = createStackNavigator({
  One: {
    screen: One,
    navigationOptions: {
      title: 'One'
    }
  },
  Two: {
    screen: Two,
    navigationOptions: {
      title: 'Two',
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  },
  Three: {
    screen: Three,
    navigationOptions: {
      title: 'Three'
    }
  }
},{

})

export default createAppContainer(Stack)
```

![](http://www.vkcyan.top/Fj1JROCB-ElUvWWRgkrcKh2pCYO3.gif)

更多的navigationOptions的配置请看官方文档的

[配置标题栏](https://reactnavigation.org/docs/zh-Hans/headers.html)

[导航选项](https://reactnavigation.org/docs/zh-Hans/navigation-options-resolution.html)

[导航器内部屏幕的选项](https://reactnavigation.org/docs/en/stack-navigator.html#navigationoptions-for-screens-inside-of-the-navigator)



## createBottomTabNavigator

