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

 >  在设定key值的时候,应该使用定值作为key 方便与建立对比的联系,用于diff算法的更新

 >  setState是异步的 多次的setState会被合并成为一个setSate进行vdom更新

 >  vdom发生变化,开始递归对比react一旦比对到虚拟dom的不同,将不会再继续进行比较,将不同的的同层虚拟dom进行替换



React中的ref的使用

ref主要是用来获取dom,返回操作dom用的东西

```
// 当ref属性是回调函数时，函数接收底层DOM元素或类实例（取决于元素的类型）作为其参数
// 这里的this.input 为render的this下面 那么可以获取到render的this方法都可以获取到ref的内容
// res属于操作dom 一般情况下不推荐使用 使用e.target 数据流进行获取dom
// 这里的this指向当前的render函数,所以 在render函数里面的方法都可以访问到
```

示例

```react
<input
            type="text"
            value={this.state.inputValue}
            onChange={this.updateInput.bind(this)}
            ref={input => { // 
              this.input = input; 
            }}
          />
// .......
updateInput(e) {
    console.log(e.target);
    console.log(this.input); // 与e.target一样 但是this.input可以操作原始dom
    console.log(this.ul.querySelectorAll('li').length);
    
    this.setState({
      inputValue: e.target.value
    });
  }
```



react的生命周期函数

> 生命周期函数指的是某一时刻组件会自动调用执行的函数

```JavaScript
// 初始化 Initializing 初始化也就是constructor的过程 初始化state props
```

```JavaScript
// 挂载 Mounting  
// componentDidMount> render > componentDidMount 

  componentWillMount () {
    console.log('即将被挂载到页面的时候执行');
  }
  render() {
    console.log('render 挂载执行'); // 每次改变都会执行render函数
  }
  componentDidMount () {
    console.log('被挂载完毕之后执行');
  }
```

```JavaScript
//更新 updation
	
// state / props
 shouldComponentUpdate () {
    //shouldComponentUpdate?? 组件需要被更新吗?
    console.log('shouldComponentUpdate  ','你的组件需要被更新吗? 我返回true,我需要被更新');
    return true
  }
  componentWillUpdate () {
    console.log('componentWillUpdate  ','组件被更新之前会自动执行,但是在 shouldComponentUpdate 之后执行 如果 shouldComponentUpdate 返回false 将不会被执行');
  }
  render() {
    console.log('render 挂载执行'); // 每次改变都会执行render函数
  }
// 子组件执行
  componentWillReceiveProps () {
    console.log('子组件 componentWillReceiveProps','当组件从父组件接受了参数 只要父组件的render      函数被重新执行 子组件的这个生命周期函数就会被执行 ');
   }
  render() {
    console.log('子组件render函数执行');
  }
  componentDidUpdate () {
    console.log('componentDidUpdate  ', '组件已经更新完成');
  }
// 当组件卸载的时候
  componentWillUnmount () {
    console.log('componentWillUnmount  ', '即将被卸载的时候执行');
  }
```

