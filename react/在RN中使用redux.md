# RN项目中使用Redux

### 前言

网上别人的文档都是 直接 就是上`redux` `redux-thunk` `react-redux` ,`immutable`这样的一套,这个有经验的看还行,新手看就很吃力了,需要了解一步一步的安装redux达到开发要求

我觉得这需要一个学习的过程,拔苗助长不是好事

这是我写项目的逐步搭建的过程,欢迎查看源代码[github-pinduoduo](https://github.com/vkcyan/RN-code)



## Redux

1. 安装redux(后面再安装(react-redux)

> 因为`redux`是js的部分 所以不需要link

```bash
 npm install redux--save 
```

安装完成后确认可以正常启动

2. 创建store

我的项目结构

![](http://pj4xfr92l.bkt.clouddn.com/FtPu0Qtsu-yKQlFXO0ntsmJKOlHC.png)

和React项目一样的项目结构

index.js

````react
import { createStore } from 'redux'
import reducer from './reducer'

export default createStore(reducer) // 导入state
````

reducer.js

```react
import actionTypes from './actionTypes'
const defaultState = { // 初始化state
  data: 'my is redux!!!!' 
}

export default (state = defaultState, action) => {
  console.log(action)
  if (action.type == actionTypes.CHANGE) { // 修改state
    const newState = JSON.parse(JSON.stringify(state))
    newState.data = 'change data!!!'
    return newState
  }
  return state
}
```

actionTypes.js

```react
export default {
  CHANGE: 'change' // 定义统一的type
}
```

actionCreators.js

```react
import actionTypes from './actionTypes'
export function change() { // 统一管理action
  return {
    type:  actionTypes.CHANGE
  }
}
```

最后在页面里面

```react
import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  Dimensions,
  Button
} from 'react-native'
import store from '../../../store/index' // 导入store
import { change } from '../../../store/actionCreators'  // 导入action
export default class Popular extends Component {
  constructor(props) {
    super(props)
    this.state = store.getState() // 初始化state,获取redux里面数据
    store.subscribe(() => { // 订阅state的改变
      this.setState(store.getState())
    }) 
  }
  render() {
    return (
      <View>
        <Text>{this.state.data}</Text>
        <Button
          title="更新state"
          onPress={() => {
            store.dispatch(change())
          }}
        />
        <Button
          title="查看state"
          onPress={() => {
            console.log(store.getState())
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({})

```

最基础的`redux`就使用成功了,但是这个还达不到我们的开发要求,下面将引入`react-redux`

## Redux + React-redux

> 如果不了解`React-redux`,请学习后再说,不然肯定看不懂,[React-redux文档]()

[React-redux文档](https://cn.redux.js.org/docs/react-redux/)

之前我们在组件里面使用Redux直接去获取数据,加入每个页面都这样写,会很麻烦,所以我们要借助`react-redux`来帮我们处理store

修改之前写的页面代码,去掉之前页面使用`state`的地方

````react
import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  Dimensions,
  Button
} from 'react-native'
import { change } from '../../../store/actionCreators'
class Popular extends Component {
  render() {
    return (
      <View>
        <Text>{this.props.data}</Text>
        <Button title="更新state" onPress={() => {
            //..
          }} />
        <Button
          title="获取state"
          onPress={() => {
            //..
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({})

export default Popular
````



修改程序的挂载入口

index.js

```react
/** @format */
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { AppRegistry } from 'react-native'
import store from './app/store'
import App from './app/routes/App'
import { name } from './app.json'

class Apps extends Component {
  render() {
    return (
       // 挂载store,让app内部所有组件都可以使用
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

AppRegistry.registerComponent(name, () => Apps)
```

这里我们就可以在组件里面通过`connent`来接收了

```react
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  Button
} from 'react-native'
import { change } from '../../../store/actionCreators'
class Popular extends Component {
  render() {
    return (
      <View>
        <StatusBar
          translucent={true} // 设置沉浸式状态栏 正常情况下 状态栏高度为20 这里的20 需要页面元素距离最上面 paddingTop:20
          backgroundColor={'rgba(0,0,0,0.1)'} // 设置状态栏颜色
          animated={true} // 允许动画切换效果
        />
        <Text>{this.props.data}</Text>
        <Button title="更新state" onPress={this.props.changeData} />
        <Button
          title="获取state"
          onPress={() => {
            console.log(this.props.data)
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({})

const mapState = state => ({
  data: state.data
})

const mapDispatch = dispatch => ({
  changeData() {
    dispatch(change())
  }
})

export default connect(
  mapState,
  mapDispatch
)(Popular)
```

这里我们`React-redux`再次获取并修改了redux里面的数据,相对之下,使用`React-redux`后,页面逻辑更加清楚



## Redux + React-redux+immutable

[immutable](https://facebook.github.io/immutable-js/)在日常开发里面很常见,让我们的数据更加严谨

很简单,首先安装

```
npm install immutable
```

处理我们store的数据

```react
import actionTypes from './actionTypes'
import {fromJS} from 'immutable' 
const defaultState = fromJS({ // 将对象转成immutable对象
  data: 'my is redux!!!!'
})

export default (state = defaultState, action) => {
  if (action.type == actionTypes.CHANGE) {
    return state.set('data','change Redux!!!')
  }
  return state
}
```

然后处理我们页面里面引用数据的地方

```react
const mapState = state => ({
  data: state.get('data') // immutable对象使用get获取
})
```

## redux的分离

将大量的store数据放在一起是非常不好的行为,我们要将每个组件之间的`store`尽可能的分离

> 这里用的是redux给我们提供的 combineReducers 将store进行合并

修改页面目录结构,在页面目录里面创建store

![](http://pj4xfr92l.bkt.clouddn.com/FkfbbCbLmUjn7tZ8XZjbZwmhKexq.png)

组件内部的sore代码

**Popular/store/reducer**

````react
import actionTypes from './actionTypes'
import {fromJS} from 'immutable'
const defaultState = fromJS({
  data: 'my is redux!!!!'
})

export default (state = defaultState, action) => {
  if (action.type == actionTypes.CHANGE) {
    return state.set('data','change Redux!!!')
  }
  return state
}

````

**Popular/store/actionTypes**

```react
export default {
  CHANGE: 'change'
}
```

**Popular/store/actionCreators**

```react
import actionTypes from './actionTypes'
export function change() {
  return {
    type:  actionTypes.CHANGE
  }
}
```

**Popular/store/index**

```react
import reducer from './reducer'
import actionCreators from './actionCreators'
import actionTypes from './actionTypes'

export { reducer, actionCreators, actionTypes }
// 使用入口
```

这样我们就在组件内部新建了一个store,接下来我们要把组件内部的store合并store里面

**./store/reducer**

```react
import { combineReducers } from 'redux'
import { reducer as homePopular } from '../src/home/Popular/store/index'

export default combineReducers ({
  homePopular: homePopular
})
```

这就完成了store的合并,这里store变了,自然访问就变了

**Popular.js**

```react

const mapState = state => ({
  data: state.homePopular.get('data')
})
```

## 最后引入`redux`中间件 

> 我一般情况下使用`redux-thunk`

```bash
npm install redux-thunk
```

````react
import { createStore,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'


export default createStore(
  reducer,
  applyMiddleware(thunk)
)
````

这里不做样式了,会的人自然会,不会的学习一下,学会使用很简单