# 定制化你的ReactNative底部导航栏

![](http://www.vkcyan.top/FsYnrzwEQzz_wQ9s6aJGGOBraNEk.png)

## 前言

​	接触过ReactNative(以下简称RN)的大概都知道,**react-navigation**提供了两种开箱即用的导航栏组件

- [createBottomTabNavigator](https://reactnavigation.org/docs/zh-Hans/bottom-tab-navigator.html)
- [createMaterialBottomTabNavigator](https://reactnavigation.org/docs/zh-Hans/material-bottom-tab-navigator.html)

分别是这样的

![createBottomTabNavigator](http://www.vkcyan.top/Fv2mukbunJbRPk-Bx79YR8_GRU4G.png)



![createMaterialBottomTabNavigator](https://reactnavigation.org/docs/assets/navigators/bottom-navigation.gif)





尽管官方提供了导航栏的开箱即用方案,但是实际开发里面,我们会遇到各种各样的导航栏,各种各样的动效,所以以上可能无法满足我们的开发需求,我们就需要定制化的去做我们导航栏



例如我们UI给我的导航栏样式

![](http://www.vkcyan.top/Fvkx5JrPHDj4dlhfIal7Di-bKvKp.png)





我的内心: 这他么中间凸起的我怎么做,老子只是一个小前端,app很渣啊啊啊

![](http://www.vkcyan.top/Ftv4D7vZ8vrafilNy8tWlhIi23Vz.webp)

借助可爱的google,我找到了解决方法

就是

![](http://www.vkcyan.top/FiWWMZ9yt_2FBEHxd7dFmrolpqve.png)

## TabBarComponent

> 这个api在文档资料很少,所以想要知道怎么用只能通过网络上的资源了
>
> 其中深受这篇文案的启发
>
> [Let's Create A Custom Animated Tab Bar With React Native](https://dev.to/hrastnik/lets-create-a-custom-animated-tab-bar-with-react-native-3496)

这位外国友人(话说reactnative在国外似乎还有点火),借助动画库`react-native-pose`,完成了这样的效果



![](http://www.vkcyan.top/Ft6Dkqi9vbedBXUCk341fyyM7M4I.gif)

虽然是英文博客,但是配合翻译基本阅读无障碍,借助他的博客,我完成了ReactNative的自定义导航栏,效果如下

![](http://www.vkcyan.top/FrDk_mHEwu1NwpxbaI04vDFdQ1pg.gif)



## 自定义底部导航栏

> 1. 自定义底部导航栏是基于`createBottomTabNavigator`,所以我们使用这个api来创建底部导航栏
> 2. 指定`createBottomTabNavigator`的tabBarComponent
> 3. tabBarComponent内部进行底部导航栏的编写



### 增加底部导航器

```js
import React from 'react'
import { createBottomTabNavigator } from 'react-navigation'
import Icon from '../Common/Icon' // 自定义图标库
import TabBar from '../Common/TabBar' // tabBarComponent 自定义组件
// 页面
import Category from '../View/TabBar/Category/Category'
import Main from '../View/TabBar/Main/Main'
import My from '../View/TabBar/My/My'
import OrderList from '../View/TabBar/OrderList/OrderList'
import OnlineDoctor from '../View/TabBar/OnlineDoctor/OnlineDoctor'
export default createBottomTabNavigator(
  {
    // 首页:
    one: {
      screen: Main,
      navigationOptions: () => {
        return {
          tabBarIcon: ({ tintColor }) => {
            var soureImge
            if (tintColor == '#CBCBCB') {
              soureImge = 'main'
            } else {
              soureImge = 'mainActive'
            }
            return <Icon name={soureImge} size={26} color={tintColor} />
          }
        }
      }
    },
    //分类:
     two: {
      screen: Category,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => {
          var soureImge
          if (tintColor == '#CBCBCB') {
            soureImge = 'Category'
          } else {
            soureImge = 'CategoryActive'
          }
          return <Icon name={soureImge} size={26} color={tintColor} />
        }
      }
    },
    //问诊:
    three: {
      screen: OnlineDoctor,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => {
          var soureImge
          if (tintColor == '#CBCBCB') {
            soureImge = 'onLine'
          } else {
            soureImge = 'onLineActive'
          }
          return <Icon name={soureImge} size={48} color={tintColor} />
        }
      }
    },
    // 购物篮: 
    four: {
      screen: OrderList,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => {
          var soureImge
          if (tintColor == '#CBCBCB') {
            soureImge = 'OrderList'
          } else {
            soureImge = 'OrderListActive'
          }
          return <Icon name={soureImge} size={26} color={tintColor} />
        }
      }
    },
    //我的:
    five: {
      screen: My,
      navigationOptions: () => {
        return {
          tabBarIcon: ({ tintColor }) => {
            var soureImge
            if (tintColor == '#CBCBCB') {
              soureImge = 'My'
            } else {
              soureImge = 'MyActive'
            }
            return <Icon name={soureImge} size={26} color={tintColor} />
          }
        }
      }
    }
  },
  {
    initialRouteName: 'one', // 初始化页面
    tabBarComponent: TabBar,
    tabBarOptions: {
      activeTintColor: '#F34C56',
      inactiveTintColor: '#CBCBCB'
    }
  }
)
        
```



### 工具函数

> 图标没有使用图标库,直接搞一个图标库比较得心应手

`../Common/Icon.js`

```js
import React from 'react'
import { Image } from 'react-native'
import { TabIcon } from './Image'

const Icon = ({ name, style, size }) => {
  const icon = TabIcon[name]
  return (
    <Image
      source={icon}
      style={[{ width: size, height: size }, style]}
    />
  )
}

export default Icon
```

> 而对于图片则进行统一管理

`../Common/Image.js`

```js
/**
 * 所有的图片资源都从这里统一管理
 */
// 底部导航栏的图片资源
export const TabIcon = {
  main: require('..'),
  mainActive: require('..'),
  Category: require('..'),
  CategoryActive: require('..'),
  onLine: require('..'),
  onLineActive: require('..'),
  OrderList: require('..'),
  OrderListActive: require('..'),
  My: require('..'),
  MyActive: require('..'),
}
```





### 自定义底部导航器

万事俱备,下面就是自定义底部导航器了,就和定义`React`组件一样

```js
import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Dimensions
} from 'react-native'
import posed from 'react-native-pose' // react-native 动画库

const Scaler = posed.View({ // 定义点击缩放
  active: { scale: 1 },
  inactive: { scale: 0.9 }
})

const TabBar = props => {
  const {
    renderIcon,
    getLabelText,
    activeTintColor,
    inactiveTintColor,
    onTabPress,
    onTabLongPress,
    getAccessibilityLabel,
    navigation
  } = props

  const { routes, index: activeRouteIndex } = navigation.state
  return (
    <Scaler style={Styles.container}>
      {routes.map((route, routeIndex) => {
        const isRouteActive = routeIndex === activeRouteIndex
        const tintColor = isRouteActive ? activeTintColor : inactiveTintColor
        return (
          <TouchableNativeFeedback
            key={routeIndex}
            style={Styles.tabButton}
            onPress={() => {
              onTabPress({ route })
            }}
            onLongPress={() => {
              onTabLongPress({ route })
            }}
            accessibilityLabel={getAccessibilityLabel({ route })}
          >
            {route.key == 'three' ? ( // 对特殊图标进行特殊处理
              <Scaler
                style={Styles.scalerOnline}
                pose={isRouteActive ? 'active' : 'inactive'}
              >
                {renderIcon({ route, focused: isRouteActive, tintColor })}
                <Text style={Styles.iconText}>{getLabelText({ route })}</Text>
              </Scaler>
            ) : ( // 普通图标普通处理
              <Scaler
                style={Styles.scaler}
                pose={isRouteActive ? 'active' : 'inactive'}
              >
                {renderIcon({ route, focused: isRouteActive, tintColor })}
                <Text style={Styles.iconText}>{getLabelText({ route })}</Text>
              </Scaler>
            )}
          </TouchableNativeFeedback>
        )
      })}
    </Scaler>
  )
}

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 53,
    borderWidth: 1,
    borderRadius: 1,
    borderColor: '#EEEEEE',
    shadowOffset: { width: 5, height: 10 },
    shadowOpacity: 0.75,
    elevation: 1
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  spotLight: {
    width: tabWidth,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  spotLightInner: {
    width: 48,
    height: 48,
    backgroundColor: '#ee0000',
    borderRadius: 24
  },
  scaler: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scalerOnline: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  iconText: {
    fontSize: 12,
    lineHeight: 20
  }
})

export default TabBar
```



最后实现的效果就是

![](http://www.vkcyan.top/FrDk_mHEwu1NwpxbaI04vDFdQ1pg.gif)

如果你也有这样的需求,可以看看老外发布的那篇博客

[Let's Create A Custom Animated Tab Bar With React Native](https://dev.to/hrastnik/lets-create-a-custom-animated-tab-bar-with-react-native-3496)

最后: 快要过年了,祝大家新年快乐

