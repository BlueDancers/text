# React Hook的学习与总结

React16.8版本发布也有一段时间了,这个周六下午有时间正好看看React hook到底是什么,解决了什么问题



参考文章 [30分钟精通React Hooks](<https://juejin.im/post/5be3ea136fb9a049f9121014>)

### useState Hooks

在体验完useState之后,我感觉最大的不同就是,改变了原来以class的书写方式,而是全部改成了function的写法,解决了原本在代码里面

1. 方法需要绑定this的问题
2. 调用一个state需要`this.state.data`的形式

```react
import React, { useState } from 'react'

/**
 * 组件名字
 */
export default function HookOne() {
  const [count, setCount] = useState(0)
  const [fruit, setfruit] = useState('香蕉')
  const [todos, setTodos] = useState([{ text: '看这条信息' }])
  // 更新count
  function updateCount() {
    setCount(count + 1)
  }
  // react通过useState出现的顺序来定的,所以不能有if类似的逻辑来显示useState
  return (
    <div>
      <p>你点击了{count}次</p>
      <button onClick={updateCount}>添加</button>

      <p>今天吃的水果{fruit}</p>
      <button onClick={() => setfruit('苹果')}>添加</button>

      <div>
        {todos.map(e => (
          <div key={e.text}>{e.text}</div>
        ))}
      </div>
      <button onClick={() => setTodos([...todos, { text: '增加的' }])}>
        添加
      </button>
    </div>
  )
}
```



### Effect Hooks

```react
  useEffect(() => {
    console.log(`我更新或者初始了`)
  })
```

effect的作用是代替了class写法的`componentDidMount`与`componentDidUpdate`,`componentWillUnmount`,react首次渲染和之后的每次渲染都会调用一遍传给useEffect的函数,在刷新数据,以及卸载之前都会执行`return`里面的函数,达到卸载的目的

```react
useEffect(() => {
    console.log(`我更新或者初始了`)
    return () => {
      console.log('卸载');
    }
  })
```

在第一次进入的时候

```
> 我更新或者初始了
```

在更新代码的时候

```
> 卸载
> 我更新或者初始了
```

在卸载组件的时候

```
> 卸载
```

但是每次都进行不必要的代码更新的不好的,不需要莫名奇妙的卸载再加载useeffect里面的数据,怎么跳过必须要的副作用函数呢?

```react
  useEffect(() => {
    console.log(`我更新或者初始了`)
    return () => {
      console.log('卸载')
    }
  }, [count]) // 只有count这个函数值发生变化的时候才会执行上面的代码(不影响return)
```

 



