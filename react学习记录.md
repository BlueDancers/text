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

