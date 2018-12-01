# react-navigation的超级大坑

> 本文针对react-navigation^3.0.0版本,版本不对的话,请不要看本文,直接看官方英文文档

​	最近一直在学习RN,没找到什么好的视频,所以一直看文档,一路上来虽然遇到一些乱七八糟的bug,但是能比较友好的解决掉

直到我使用`react-navigation`,这个官方文档上说`简单易用`的导航组件,搞的我心态爆照,调试了一下午



首先我按网上的例子来

```JavaScript
import {StackNavigator} from 'react-navigation';
const HomeScreen = () => (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home Screen</Text>
    </View>
);

const DetailScreen = () => (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Detail Screen</Text>
    </View>
);

const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScreen
  },
  Detail: {
    screen: DetailScreen
  }
});

export default RootNavigator;
```

上来就是报错

```bash
undefined is not a function (evaluating'_reactNavigation.StackNavigator....')
```

我一看,这说我导入的不是函数????

查看道路部分,发现新的文档,方法名字都变了???

````JavaScript
import {
  createStackNavigator,
} from 'react-navigation';

const App = createStackNavigator({
  Home: { screen: HomeScreen },
  Profile: { screen: ProfileScreen },
});

export default App;
````

重启

依旧报错

```
React Native - undefined is not an object(evaluating 'RNGestureHandlerModule.state')
```

在这里google查了半天,都没有看到解决方案

因为一直这看中文文档,狗中文文档根本就不是3.0.0版本,最后直接去看英文文档!!

[react-navigation英文文档](https://reactnavigation.org/docs/en/getting-started.html)

文档上有一句

> Next, install react-native-gesture-handler. If you’re using Expo you don’t need to do anything here, it’s included in the SDK. Otherwise:
>
> 接下来，安装react-native-gesture-handler。 如果你正在使用Expo，你不需要在这里做任何事情，它包含在SDK中。 除此以外
>
> // 我完全不知道Expo指什么,但是我还是跑了他下面的命令

```
yarn add react-native-gesture-handler
react-native link
```



我们看看官方的demo

```JavaScript
import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  }
});

export default createAppContainer(AppNavigator);
```

这demo怎么和我看过的都不一样???

于是我改动了写的代码

**App.js**

```react
import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import HomeScreen from './pages/HomeScreen'
import ProfileScreen from './pages/ProfileScreen'


const navigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Profile: { screen: ProfileScreen }
})

const App = createAppContainer(navigator)

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
})

```



**pages/ProfileScreen**

```react
import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default class ProfileScreen extends Component {
  static navigationOptions = {
    title: 'ProfileScreen'
  }
  render() {
    return (
      <View>
        <Text> 2 </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({})


```



**pages/HomeScreen**

```
import React, { Component } from 'react'
import { Text, StyleSheet, View, Button } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation';
export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'HomeScreen'
  }
  render() {
    return (
      <View>
        <Text> one </Text>
        <Button title="go to two" onPress={() => this.props.navigation.navigate('Profile')} />
      </View>
    )
  }
}

const styles = StyleSheet.create({})

```



终于使用成功了