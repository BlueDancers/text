# react-navigation图文攻略

接触`react-native`有一段时间了,感觉学习最大的难点就是 rn的国内资料不多,老外写的文档看起来不舒服

其中在`react-navigation`上面花了很长的时间,搞的心力憔悴,但是看国内的文章,都是2.x版本的,api不向下兼容,各种报错对象不存在,前期天天踩坑

![](http://www.vkcyan.top/FlTAWB0y0-gbstNSfXPbiA5lmUYV.png)

后来看了很长时间的文档,才搞清楚`react-navigation`的使用

所以在我感觉我现在已经踩过很多坑的情况下,我决定写这篇文章,来帮助`rn`开发者尽可能的跳过`react-navigation`的一些坑

本人使用react-native的一些练习代码[github](https://github.com/vkcyan/RN-code)

[react-native官网](https://reactnative.cn/)

[react-navigation官网](https://reactnavigation.org/zh-Hans/)

> 本文章基于 "react-navigation": "^3.0.9" 假如版本跨度比较大,本文可能就不适合了
>
> 另外,学习库或者插件最好的方式就官方阅读文档(感觉有点打脸自己)

## 安装

> 尽量不要看百度出来的文章,,例如**dn,比较陈旧,已经不是个当前版本,一定要看文档
>
> rn项目里面,我推荐使用yarn, npm有时候会出现依赖不全的问题

在已经初始化完成,并且确保可以运行的rn项目里面,输入一下命令

```
yarn add react-navigation
yarn add react-native-gesture-handler
react-native link react-native-gesture-handler
```

在已经搭建好的项目里面,运行上面的命令,这都是必须的,详情请看文档[React navigation安装](https://reactnavigation.org/docs/zh-Hans/getting-started.html#%E5%AE%89%E8%A3%85)

安装完成后启动项目(启动无报错即意味着navigation安装成功了)



# 导航器

> 没有接触过原生开发的web开发者看到这些很react风格的导航器名称,一定很陌生,没关系,后面图示

rn上的导航器的编写就是类似 前端的路由的编写,通过rn的导航器来决定App的路由结构,以及个性化的页面

- **createStackNavigator**   最基本的页面 自带**上方导航栏**

  为你的应用程序提供一种在每个新屏幕放置在堆栈顶部的屏幕之间转换的方法。

- **createBottomTabNavigator**

  页面底部的标签栏，可让您在不同路由之间进行切换。 路由被懒加载 - 它们的屏幕组件只有在第一次获取焦点时才会被加载。

- **createMaterialBottomTabNavigator**  

  功能上和 createBottomTabNavigator 一样,这个更加个性化,但是我们可以基于`createBottomTabNavigator`自定义任意底部导航栏

  屏幕底部的材料设计主题标签栏，可让您在不同路由之间切换。 路由被懒加载 - 它们的屏幕组件直到第一次获取焦点时才被加载。

- **createMaterialTopTabNavigator** 

  屏幕顶部左右滑动切换tab

  屏幕顶部的材料设计主题标签栏, 可通过点击路线或水平滑动来切换不同的路由。 默认情况下, 转换是动态的。 每个路由的屏幕组件将立即安装。

- **createDrawerNavigator**: 抽屉效果导航器,由侧边划出；

- **createSwitchNavigator**: 

  **createSwitchNavigator** 的用途是一次只显示一个页面。 默认情况下，它不处理返回操作，并在你切换时将路由重置为默认状态。(特定场合才会使用)



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

大部分的移动端项目都有底部导航栏,得益于单页应用,webapp更多的出现在原生端那么在react-native上,如何创建一个底部导航栏呢?

![](http://www.vkcyan.top/Ftca2HuQJO7Pi9AKKGwdIjsRL3_P.png)

从web的角度理解 就是 **通过底部导航栏进行组件的懒加载切换**

让我们根据官方文档创建一个导航栏试试

修改`navigation`/`index.js`

```JavaScript
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from 'react-navigation'
import One from '../pages/One'
import Two from '../pages/Two'
import Three from '../pages/Three'
const BottomBar = createBottomTabNavigator(
  {
    One: {
      screen: One,
      navigationOptions: {
        title: 'One'
      }
    },
    Two: {
      screen: Two,
      navigationOptions: {
        title: 'Two'
      }
    },
    Three: {
      screen: Three,
      navigationOptions: {
        title: 'Three'
      }
    }
  },
  {
    initialRouteName: 'One' // 初始化页面
  }
)
const Stack = createStackNavigator({
  BottomBar: {
    screen: BottomBar,
    navigationOptions: {
      header: null
    }
  }
})

export default createAppContainer(Stack)
```

我们引入了`createBottomTabNavigator`在`createBottomTabNavigator`里面加了3个页面,最后将导出的底部导航器对象再加入到`createStackNavigator`中,作为普通页面的形式

![](http://www.vkcyan.top/FuZGe3qf3pUkgaqfluNUPMkXul1L.gif)

基础的底部导航器实现了~

在基础API上面,我们可以做很多自定义的操作,自定义图标自定义文字,等等,具体请看[文档](https://reactnavigation.org/docs/zh-Hans/bottom-tab-navigator.html#bottomtabnavigatorconfig)

下面我们给我们的导航栏加一个图标,让他看起来更加美观

在项目里面添加几个小icon(图片用的是iconfont上面的)

![](http://www.vkcyan.top/FkQ6w7jv1rYhoMKMrboY2VYwf0Ct.png)

![](http://www.vkcyan.top/FsWOpIxCTfBKhb9XqwB0narfn9AS.png)



> 网络上9成的文章都说明了在rn项目里面使用 react-native-vector-icons 这个图标库进行图标的添加
> 我这里使用不常见的方案,使用本地png图片作为底部icon,当然这个使用在具体项目里面应该封装起来,这样类小程序的模式,我相信可以很好的帮助理解,以下编码方式仅供学习

修改`navigation`/`index.js`

```javascript
import React from 'react'
import { Image } from 'react-native'
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from 'react-navigation'

import One from '../pages/One'
import Two from '../pages/Two'
import Three from '../pages/Three'
const BottomBar = createBottomTabNavigator(
  {
    One: {
      screen: One,
      navigationOptions: {
        title: 'One',
        tabBarIcon: ({ tintColor }) => {
          let sourceImg
          if (tintColor == '#1296db') {
            sourceImg = require('../image/one-active.png')
          } else {
            sourceImg = require('../image/one.png')
          }
          return (
          <Image
            source={sourceImg}
            style={{ width: 24, height: 24 }}
            color={tintColor}
          />
        )}
      }
    },
    Two: {
      screen: Two,
      navigationOptions: {
        title: 'Two',
        tabBarIcon: ({ tintColor }) => {
          console.log(tintColor);
          let sourceImg
          if (tintColor == '#1296db') {
            sourceImg = require('../image/my-active.png')
          } else {
            sourceImg = require('../image/my.png')
          }
          return (
          <Image
            source={sourceImg}
            style={{ width: 24, height: 24 }}
            color={tintColor}
          />
        )}
      }
    },
    Three: {
      screen: Three,
      navigationOptions: {
        title: 'Three',
        tabBarIcon: ({ tintColor }) => {
          let sourceImg
          if (tintColor == '#1296db') {
            sourceImg = require('../image/message-active.png')
          } else {
            sourceImg = require('../image/message.png')
          }
          return (
          <Image
            source={sourceImg}
            style={{ width: 24, height: 24 }}
            color={tintColor}
          />
        )}
      }
    }
  },
  {
    initialRouteName: 'One', // 初始化页面
    tabBarOptions: {
      activeTintColor: '#1296db',
      inactiveTintColor: 'black'
    }
  }
)
const Stack = createStackNavigator({
  BottomBar: {
    screen: BottomBar,
    navigationOptions: {
      header: null
    }
  }
})

export default createAppContainer(Stack)
```


![](http://www.vkcyan.top/FpLV8ONgiAL3SK-UvISqK4E5MzZP.gif)



reactnavigation的导航栏只能做这些吗?当然不是,可以通过指定`tabBarComponent`,来自定义你的导航栏组件,这个比较复杂,我后期会写一篇文章出来详细说明

## createMaterialBottomTabNavigator

> 这个给人一种开箱即用的感觉,至于项目当中具体选择什么,这个要看需求

![](http://www.vkcyan.top/FloX6GryTWJ3zwhGubfR6VIMteng.png)

文档明确指出,需要安装以下库

```
yarn add react-navigation-material-bottom-tabs react-native-paper react-native-vector-icons
react-native link react-native-vector-icons
```

我们来实现一下官方案例的效果

修改`navigation`/`index.js`

```js
import React from 'react'
import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import One from '../pages/One'
import Two from '../pages/Two'
import Three from '../pages/Three'

const BottomMater = createMaterialBottomTabNavigator(
  {
    One: {
      screen: One,
      navigationOptions: {
        tabBarColor: '#3472EE', // 页面背景色
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-home" color={tintColor} size={24} />
        )
      }
    },
    Two: {
      screen: Two,
      navigationOptions: {
        tabBarColor: '#EC3E3E',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-options" color={tintColor} size={24} />
        )
      }
    },
    Three: {
      screen: Three,
      navigationOptions: {
        tabBarColor: '#0EA748',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-chatbubbles" color={tintColor} size={24} />
        )
      }
    }
  },
  {
    initialRouteName: 'One',
    activeColor: 'white',
    inactiveColor: 'gray',
    shifting: true
  }
)

const Stack = createStackNavigator({
  BottomMater: {
    screen: BottomMater,
    navigationOptions: {
      header: null
    }
  }
})

export default createAppContainer(Stack)

```

![](http://www.vkcyan.top/Fh6VSihEB8grj68z4A6MukdTzr6c.gif)

这样类似的效果,react-navitation都可以完成，发挥你的想象力🤣

关于底部导航器的配置很多,没办法通过一篇文章一一介绍,详情请看[官方文档](https://reactnavigation.org/docs/zh-Hans/material-bottom-tab-navigator.html)



## createMaterialTopTabNavigator

屏幕顶部的标签栏, 可通过点击路线或水平滑动来切换不同的路由。 默认情况下, 转换是动态的。 每个路由的屏幕组件将立即安装。

可以看一下我之前模拟拼多多的页面(当时是做技术验证)

![](http://www.vkcyan.top/FuR7M-gy3MTju4BPKJBefAqA-HnC.gif)



就这样的效果

下面我们可以根据文档在我们的demo项目里面自己实现一下这样的效果

新增两个页面 `Four.js` `Five.js` 随便写点什么就行



为了更加合理设置逻辑,我将TopBar的所有导航器配置代码放到一个文件当中

在`navigation`文件夹内新建文件`TopBar.js`

```js
import { createMaterialTopTabNavigator } from 'react-navigation'
import One from '../pages/One'
import Four from '../pages/Four'
import Five from '../pages/Five'

export default createMaterialTopTabNavigator(
  {
    One: {
      screen: One, // 配置页面
      navigationOptions: {
        tabBarLabel: 'One'
      }
    },
    Four: {
      screen: Four,
      navigationOptions: {
        tabBarLabel: 'Four'
      }
    },
    Five: {
      screen: Five,
      navigationOptions: {
        tabBarLabel: 'Five'
      }
    }
  },
  {
    initialRouteName: 'One',
    lazy: true,
    tabBarOptions: {
      scrollEnabled: true,
      upperCaseLabel: false, // 是否大写
      activeTintColor: 'red', // 活动选项卡
      inactiveTintColor: 'red', // "非活动" 选项卡
      tabStyle: {
        // 选项卡样式
        // width: 60,
        // paddingTop: 35,
        paddingBottom: 4
      },
      style: {
        backgroundColor: 'white' // 头部导航栏样式
      },
      indicatorStyle: {
        backgroundColor: 'red' // 指示器样式
      }
    }
  }
)

```

最后修改`navigation`/`index.js`,将我们新建的顶部导航器导入

```
import React from 'react'
import { Image } from 'react-native'
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from 'react-navigation'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import TopBar from './TopBar'
import Two from '../pages/Two'
import Three from '../pages/Three'

const BottomMater = createMaterialBottomTabNavigator(
  {
    TopBar: {
      screen: TopBar,
      navigationOptions: {
        tabBarColor: '#3472EE', // 页面背景色
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-home" color={tintColor} size={24} />
        )
      }
    },
    Two: {
      screen: Two,
      navigationOptions: {
        tabBarColor: '#EC3E3E',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-options" color={tintColor} size={24} />
        )
      }
    },
    Three: {
      screen: Three,
      navigationOptions: {
        tabBarColor: '#0EA748',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-chatbubbles" color={tintColor} size={24} />
        )
      }
    }
  },
  {
    initialRouteName: 'TopBar',
    activeColor: 'white',
    inactiveColor: 'gray',
    shifting: true
  }
)

const Stack = createStackNavigator({
  BottomMater: {
    screen: BottomMater,
    navigationOptions: {
      header: null
    }
  }
})

export default createAppContainer(Stack)

```





![](http://www.vkcyan.top/FnOzD9ltj1WLif1CAObXuQhlVXdp.gif)

是不是很简单,或者所,是不是学会了react-navigation的套路了 ~ 

## createDrawerNavigator

`createDrawerNavigator`是抽屉导航器,这个相对来说,配置简单一点

```JavaScript
const FiveDrawer = createDrawerNavigator( // 创建一个抽屉导航器
  {
    Five: {
      screen: Five,
      navigationOptions: {
        drawerLabel: 'Five'
      }
    },
    Six: {
      screen: Six,
      navigationOptions: {
        drawerLabel: 'Six' // 抽屉上显示的名称
      }
    }
  },
  {
    initialRouteName: 'Five', // 默认显示的页面
    drawerWidth: 200,
    contentOptions: {
      activeTintColor: '#e91e63'
    }
  }
)
```

```js
const Stack = createStackNavigator({
  BottomMater: {
    screen: BottomBar,
    navigationOptions: {
      header: null
    }
  },
  TopBar: {
    screen: TopBar,
    navigationOptions: {
      tabBarColor: '#3472EE', // 页面背景色
      header: null
    }
  },
  FiveDrawer: {
    screen: FiveDrawer, // 加入Stack当中
    navigationOptions: {
      header: null
    }
  }
})
```

我们需要在页面里面添加一些跳转

`One.js`

```js
import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'

export default class One extends Component {
  render() {
    return (
      <View>
        <Button
          title="跳转到Five页面"
          onPress={() => {
            this.props.navigation.navigate('Five')
          }}
        />
      </View>
    )
  }
}
```



`Five.js`

```js
import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'

export default class Five extends Component {
  render() {
    return (
      <View>
        <Text>Five页面</Text>
        <Button
          onPress={() => this.props.navigation.openDrawer()}
          title="打开抽屉"
        />
      </View>
    )
  }
}
```

`Six.js`

```js
import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'

export default class Six extends Component {
  render() {
    return (
      <View>
        <Button
          onPress={() => this.props.navigation.openDrawer()}
          title="打开抽屉"
        />
        <Text>six页面</Text>
      </View>
    )
  }
}
```

![](http://www.vkcyan.top/FpGGKUASRXYvVxQY_ygIr8Q9rOTR.gif)





到这里多联系,多理解,基本可以完成一般项目的搭建了,

你也可以看看我写过的其他文章,或者一些react-native的仓库代码,

**定位** **消息推送** **APP启动屏** **第三方集成** **RN配置全面屏** 都得到了比较好的解决



## RN相关文章

[React-Native项目中使用Redux](https://www.cnblogs.com/wuvkcyan/p/10081874.html)

[React-Native使用极光进行消息推送](https://github.com/vkcyan/text/blob/master/react/React-Native%E4%BD%BF%E7%94%A8%E6%9E%81%E5%85%89%E8%BF%9B%E8%A1%8C%E6%B6%88%E6%81%AF%E6%8E%A8%E9%80%81.md)

[RN打包android APK文件](https://github.com/vkcyan/text/blob/master/react/RN%E6%89%93%E5%8C%85android%20APK%E6%96%87%E4%BB%B6.md)

[**React Native样式的另类写法.md**](https://github.com/vkcyan/text/blob/master/react/React%20Native%E6%A0%B7%E5%BC%8F%E7%9A%84%E5%8F%A6%E7%B1%BB%E5%86%99%E6%B3%95.md)

[**React-Native 回到顶部.md**](https://github.com/vkcyan/text/blob/master/react/React-Native%20%E5%9B%9E%E5%88%B0%E9%A1%B6%E9%83%A8.md)

[React-native可能遇到的问题](https://github.com/vkcyan/text/blob/master/react/React%20Native%E8%84%B1%E5%9D%91%E8%AE%B0%E5%BD%95.md)



