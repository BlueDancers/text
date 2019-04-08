# react中使用redux的最佳实践

​	标题有点托大了,不过这一套是我总结的最佳实践方法

1. 使用react-redux

> 将redux的数据 操作state的方法全部挂载到prop上面

```JavaScript
const mapStateToProps = state => {
  return {
     // focused 被挂载到props上
    focused: state.header.focused
  };
};
const mapDuspatchToProps = dispatch => {
  return {
    handInputFocus() {
      const action = {
        //....
      };
      dispatch(action);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDuspatchToProps
)(Header);

```

store下面分成

````
actionTypes.js // 存储type类型
index.js // redux的创建 导出处
reducer.js // 数据管理处
state.js // 公用数据管理处
````

组件内部的数据

在组件内部创建一个store/reducer.js

```react
import actionTypes from '../../../store/actionTypes';
// 组件内部的数据年比较小 一般情况下 组件内部的state不拆分出去
const defaultState = {
  focused: false
}

export default (state = defaultState, action) => {

  if (action.type === actionTypes.OPEN_FOCUS) {
    // ....
  }
  if (action.type === actionTypes.CLOSE_FOCUS) {
    //....
  }
  return state
}
```

建立独立的reducer,最后在store下面的reducer里面使用redux的 [combineReducers](https://cn.redux.js.org/docs/api/combineReducers.html) 进行拆分管理

```react
import { combineReducers } from 'redux'
import headerReducer from '../common/header/store/reducer';

// combineReducers就可以对数据进行拆分管理
export default combineReducers ({ 
  header: headerReducer // 数据在state下的header管理
})
```

这样的话 数据就在state里面header里面
所以这么写的话 获取数据学法就要该改变一下

````react

const mapStateToProps = state => {
  return {
    focused: state.header.focused // state下的header
  };
};
````

这样做 组件不涉及一点逻辑 变成无状态组件 性能得到提升

数据与视图拆分 数据与数据之前拆分 更加利于维护

### 一些小优化

写到这里我们应该注意到

store里面的reducer对子store的引入路径很长,我们可以改造一下目录



````javascript
// header/store/新建 index.js 
// 起到一个这中转的作用

// src\common\header\store\index.js

import reducer from "./reducer";

export { reducer };
````

在store里面的reducer里面,引入代码进行修改,减少目录结构

```JavaScript
import {reducer as headerReducer} from '../common/header/store';
```



创建actionCreators分离action的创建

```js
import actionTypes from '../../../store/actionTypes'

function closeFocus () {
  return {
    type: actionTypes.CLOSE_FOCUS
  }
}

function openFocus () {
  return {
    type: actionTypes.OPEN_FOCUS
  }
}


export default {
  closeFocus,
  openFocus
}
```

在index.js里面

```react
const mapDuspatchToProps = dispatch => {
  return {
    handInputFocus() {
      const action = actionCreators.openFocus() // 创建action
      dispatch(action);
    },
    handInputBlur() {
      const action = actionCreators.closeFocus()
      dispatch(action);
    }
  };
};
```

### 更加细化拆分

将actionTypes移植到组件内部的sore里面

在store下面的index进行统一的管理

```JavaScript
import reducer from "./reducer";
import actionTypes from "./actionTypes";
import actionCreators from "./actionCreators";


export { reducer, actionTypes, actionCreators };

```

这样做的话 所有store相关的文件全部从index.js下面走

例如

header.js的引入 actionCreators

```JavaScript
import { actionCreators } from "./store";
```

actionCreators.js 里面引入actiontypes

```JavaScript
import { actionTypes } from "./index";
```

reducer.js里面引入actionTypes

```JavaScript
import { actionTypes } from "./index";
```



最后store在reducer里面引入组件里面的store状态

````JavaScript
import {reducer as headerReducer} from '../common/header/store';
````



这样做 

hader这个组件

header.js成为ui组件

header.js内部的connent成为ui组件的逻辑区

数据来源于header组件内部的reducer的defaultState

改变数据的方法来源于header组件内部的reducer

type也定义在组件内部,完全的解开了耦合

使用immutable.js进行数据的修改

> 使用immutable将state转成immutable对象 操作对象里面的数据就变成了 set get 大量减少代码量

```react
import { actionTypes } from "./index";
import { fromJS } from 'immutable'
// 组件内部的数据年比较小 一般情况下 组件内部的state不拆分出去
const defaultState =fromJS({
  focused: false
});

export default (state = defaultState, action) => {
  if (action.type === actionTypes.OPEN_FOCUS) {
    // immutable对象的set方法,会结合之前的immutable对象的值
    // 和设置的值,返回一个全新的对象代码量减少很多
    return state.set('focused',true)
  }
  if (action.type === actionTypes.CLOSE_FOCUS) {
    return state.set('focused',false)
  }
  return state;
};

```

在index里面修改数据

```react
const mapStateToProps = state => {
  return {
    focused: state.header.get('focused') // 使用get方法获取数据
  };
};
```

