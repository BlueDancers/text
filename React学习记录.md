# React记录
 创建react-create-app
 ```
npx create-react-app my-app
cd my-app
npm start
 ```
 [首先 npx 是什么](https://juejin.im/entry/59f2bab06fb9a04511705fba)
 ```
npx 新的包管理机制,npx 会帮你执行依赖包里的二进制文件。我的理解 就是找不到就会帮你安装
 ```
 关于react-create-app里面的一些文件
 `public/manifest.json`
 > PWA的配置文件信息,例如什么图标名称 图标 等等
 `src/serviceWorker`
 ````
serviceWorker也是配置pwa的一些离线缓存的一些配置信息
 ````
 React定义一个组件
 ```
import React from 'react';
 class App extends React.Component {
  render() {
    return (
      <div>
          <p>
            Hello word
          </p>
      </div>
    );
  }
}
 export default App;
 ```
 在生成的上面写法是这样的
 ```
import React, { Component } from 'react';
 class App extends Component {
	// .....
}
 ```
 继承React.Component 就是一个react的组件
 render用于渲染视图
 ```JavaScript
import React, { Component } from 'react';
// 等价于
import React from 'react'
const Component = React.Component
 ```
 组件必须是大写字母开头
 在render函数里面 js代码使用{}进行包裹
 使用方法 function (){} 需要将this 绑定到方法上面 this.function.bind(this)
 react改变状态的方式使用的是this.setState({}) 与小程类似
 对展开运算符的应用
 ```JavaScript
 Btnclick () {
    let text = this.state.inputValue
    this.setState({
      list: [...this.state.list, text],
      inputValue: ''
    })
  }
 ```
以前的写法
 ```JavaScript
 Btnclick () {
    let text = this.state.inputValue
    let oldList = this.state.list
    oldList.push(text)
    this.setState({
      list: oldList,
      inputValue: ''
    })
  }
 ```
 关于react里面的循环
 ```React
 <ul>
     {
         this.state.list.map((e, index) => {
         	return <li key={index}>{e}</li>
         })
     }
 </ul>
 ```





React的google调试工具

`React Developer Tools`



组件的props可以做校验 和 默认值[官网教程](https://reactjs.org/docs/typechecking-with-proptypes.html)

在react里面使用propTypes和DefaultProp

```
import PropTypes from 'prop-types'

//.. 
//定props的类型
组件名.propTypes = {
    test: PropTypes.string, // 来自父组件的test srting类型的变量
    conten: PropTypes.func, // 方法
    index: PropTypes.number.isRqueired, //表示必须有这个参数 
    
}
// 定义默认值
组件名.defaultProps = {
	text: '默认值'
}
```



props , state 与 render函数

```
当props与state里面的数据发生变化  发生set/get事件 通过render函数更新页面
```

现代框架的一般渲染流程

1. 解析jsx模板 生成虚拟DOM树,渲染到到真实dom
2. state或者props的数据发生变化的时候,重新生成Vdom,与原始的Vdom进行对比,找到变化的地方,然后在真实dom上面,只改变那一部分的dom元素,达到节约性能的作用

