# React-Redux-进阶 / 组件类别

**普通组件**:	也就是UI以及逻辑为一体的普通组件,普通组件可以拆分为 UI组件 容器组件,降低组件复杂度

**ui组件**:	也被称为傻瓜组件,因为不负责逻辑

**容器组件**:	也被称为聪明组件,因为不负责页面,只负责功能



**无状态组件**:	无状态组件是将react类里面的jsx的内容提到一个函数里面,这样做更加节省性能,因为不需要执行react的UI组件的生命周期

```react
export default (props) => {
  return (
    <div>
          // this.props  改为 props(箭头函数没有this)
    </div>
  )
}
```



Redux发送异步请求

Redux-thunk 的配置 

```JavaScript
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose; // 来自于 redux
const enhancer = composeEnhancers(
  applyMiddleware(thunk)
  // other store enhancers if any
);
export default createStore(
  reducer /* 构建初始数据 */,
  enhancer // 对中间件进行注册
);

```

这就完成中间件的使用

redux-thunk将action原本只能传递对象的局限去除了,现在可以在action里面return一个对象出去,在对象里面执行异步代码

> 将 异步请求放到action里面去

````JavaScript
function getTodoList() {
  return (dispatch) => { // 回调函数 接收到dispatch
    axios.get('/list')
    .then(res => {
      console.log(res);
      let data = res.data
      let action = initListAction(data)
      dispatch(action) // 执行store里面的方法
    })
    .catch(res => {
      console.log(res);
    })
  }
}
````

在生命周期里面进行调用

```JavaScript
updateInputChange(e) {
    const action = actionCreators.getInputChangeAction(e.target.value);
    store.dispatch(action); // 当发送给store的时候 action会被自动执行
  }
```

React-thunk赋予了redux执行异步的能力

react的中间件就是对dispatch进行一个升级 当dispatch参数是对象的时候,就会走中间件

![](https://s1.ax2x.com/2018/11/12/5zzhN6.jpg) 

redux-saga

saga将action也接收过来,并且对action进行匹配,这样做将异步代码与action进行解耦,我觉的是比thunk更好的做法

saga的使用方法

1. 配置saga中间价

```JavaScript
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import reducer from "./reducer";
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose; // 来自于 redux
const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware)
);

export default createStore(
  reducer /* 构建初始数据 */,
  enhancer // 对中间件进行注册
);

sagaMiddleware.run(sagas) // 匀巡sagas
```

2. 创建sagas.js

````JavaScript
/* eslint-disable require-yield */
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import actionType from './actionTypes'
// 迭代器函数
function* getInitList () {
	// ....
}

// 迭代器
function* mySaga() {
    yield takeEvery(actionType.GET_INIT_LIST, getInitList); 
    // 当匹配到actionType.GET_INIT_LIST 的时候执行getInitList 
}

export default mySaga;
````

3. index里面进行执行store.dispatch(action) 请求新的store

```
componentDidMount() {
    const action = {
		type: 'get_init_list
	}
    store.dispatch(action);
  }
```

执行dispatch的时候被中间件拦截

```JavaScript
import axios from "axios";
function* getInitList() {
  try {
    const res = yield axios.get("/list");
    const action = actions.initListAction(res.data);
    yield put(action);
  } catch (error) {
    console.log('list.json 请求失败');
  }
}

// 迭代器
function* mySaga() {
  yield takeEvery(actionType.GET_INIT_LIST, getInitList);
}
```

最后put出去异步处理后的数据,store开始处理数据,订阅组件属性数据



React-Redux的使用

`React-Redux`感觉主要作用是将原本 react与 redux之间的数据交换层去除了,不需要再组件里面的方法里面去操作state的方法

首先使用`Provider`进行state的注入

```JavaScript
import { Provider } from 'react-redux';
import store from './react-redux/store';

const Todo = (
  <Provider store={store}>
    <App/>
  </Provider>
);

// 程序入口
ReactDOM.render(Todo, document.getElementById('root'));
```

在组件内部,使用connect进行数据的交互 不再需要在`constructor`里面getStore() 也不需要引入store的去执行dispatch了

```react
import React, { Component } from "react";
import { connect } from "react-redux";
class reactRedux extends Component {
  render() {
    return (
      <div>
        <input type="text" value={this.props.inputValue} onChange={this.props.changInputValue} name="" id="" />
        <button onClick={this.handClick.bind(this)}>提交</button>
        <ul>
          <li>111</li>
        </ul>
      </div>
    );
  }
  handClick (e) {
    
  }
}

const mapStateProps = state => { // 赋值
  return {
    inputValue: state.inputValue
  };
};
//store.dispatch 挂载到props
const mapDispatchToProps = (dispatch) => {
  return {
    changInputValue (e) {
      console.log(e.target.value);
      let action = {
        type: 'change_input_value',
        value: e.target.value
      }
      dispatch(action)
    }
  }
}

export default connect(
  mapStateProps,
  mapDispatchToProps
)(reactRedux);

```

