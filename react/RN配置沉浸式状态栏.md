## 配置沉浸式状态栏

> 没有测试过IOS的 本人使用android测试的

首先在入口组件类,或者任意组件内,全局修改`StausBar`

> **StausBar** 是全局设置,一个地方设置了,全局生效

```react
render() {
    return (
      <View>
        <StatusBar
          translucent={true} // 设置沉浸式状态栏 正常情况下 状态栏高度为20 这里的20 需要页面元素距离最上面 paddingTop:20 
          backgroundColor={'rgba(0,0,0,0.1)'} // 设置状态栏颜色
          animated={true} // 允许动画切换效果
        />
        <Text> Popular </Text>
      </View>
    )
  }
```

我查了一下,一般状态栏高度为20

所有 注册`tabbar`的页面,都是需要将页面布局重置一下,例如

```react
export default class ChatWith extends Component {
  render() {
    return (
      <View style={styles.containers}>
        <Text> ChatWith </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  containers: {
    paddingTop: 20 // 否则状态栏会覆盖页面文字
  }
})
```

这里有一点需要注意,`createMaterialTopTabNavigator`也许要设置一下,这里需要查一下API,

```react
{
    initialRouteName: 'Popular',
    lazy: true,
    tabBarOptions: {
      scrollEnabled: true,
      upperCaseLabel: false, // 是否大写
      activeTintColor: 'white', // 活动选项卡
      inactiveTintColor: 'white', // "非活动" 选项卡
      tabStyle: {
        // 选项卡样式
        width: 60,
        paddingTop: 20 // 设置topBar的padding
      },
      style: {
        backgroundColor: 'red' // 头部导航栏样式
      },
      indicatorStyle: {
        backgroundColor: 'white' // 指示器样式
      }
    }
  }
```

沉浸式状态栏设置完成