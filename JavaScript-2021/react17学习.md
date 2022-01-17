# React17学习记录

## 为什么学习React17

​		公司使用的是vue技术栈，并且因为历史原因，以及外部因素，可能不会使用react来做生产环境的项目，最近vue3走上正轨，大家都需要抛弃vue2.x的编码思想，在vue3中，hook思想开始越发明显，所以学习react17也是想借此加深对hook的理解，同时取长补短，综合vue与react的优点，在实际的开发中更好的完成开发任务



## useState的疑问

​    关于react的useState有一个疑问，useState里面是一个对象，我想要修改对象里面的某一个字段，每次都需要`...state`,把之前的数据预先填入，这做法感觉有点傻





## 自定义hook

hook是在特定换下调用自己的代码

实现自定义hook必须使用关键字`use`开头，这是ESLint的规则

自定义hook一般用于需要持续监听的值，而针对纯工具函数则不需要进行处理



### 实现一个hook风格的防抖函数

```react
const [param, setParam] = useState('ha ha');
const debounceParam = useDebounce(param, 2000);

useEffect(() => {
  console.log('log log')
}, [debounceParam]);

/**
 * 去抖函数
 * @param value 监听的值
 * @param delay 防抖时间
 * @returns 变化后变量
 */
export function useDebounce(value, delay) {
  // 声明一个保存防抖结果的字段
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    // 每次value,delay发生变化的时候生成一个定时器
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    // 在执行下一个useEffect之前,会执行上一个useEffect的返回函数
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debounceValue;
}
```

- useDebounce是一个hook风格的函数
- 每次param发生变化都会触发useDebounce中的useEffect
- 而在2000ms时间内如果重复触发就会执行上一个effect return的函数
- 进而不修改debounceValue，直到2000ms内无任何操作，触发setDebounceValue修改属性，改变了debounceParam
- 第一个useEffect触发，触发打印`log log`





## react中使用TS做代码静态检查

- 函数类型 `fn: () => void`
- any类型是危险的，应当尽量不用，但是对于模糊的类型，我们可以在标注类型为unknown，这样就不会对赋值做任何校验，但是ts不允许我们对unknown类型做出任何处理，所以可以吧unknown理解成为加强版any
- 针对参数不固定，返回值不确定的场景，应当使用泛型，在方法名称后面加<T>,然后在参数上指定某一个为T，则T跟这参数的类型而变化



## 自定义hook useArray

> 传入一个hook，我们返回针对这个hook的可使用的对应方法，总体来说实现一个hook还是一个比较简单

```react
/**
 * hook处理的Array
 * @param value
 * @returns
 */
export function useArray<V>(value: V[]) {
  const [arrayValue, setArrayValue] = useState(value);
  const clear = () => {
    setArrayValue([]);
  };
  const add = (value: V) => {
    setArrayValue([...arrayValue, value]);
  };
  const removeIndex = (index: number) => {
    let value = [...arrayValue];
    value.splice(index, 1);
    setArrayValue(value);
  };

  return {
    value: arrayValue,
    add,
    clear,
    removeIndex,
  };
}
```



## 关于TS中interface的属性继承

```javascript
interface a {
  a: number;
}

interface b extends a {
  b: number;
}

let c: b = {
  a: 1,
  b: 2,
};

function test(p: a) {
  console.log(p);
}

test(c); // 不会报错，因为b包含了a，所以这个传入b也不会出现错误
```

## useContext

> useContext主要用于多个组件之间共享状态

在**parent**组件中存在**child1**.**child2**，**child3**组件，我们希望这些组件之前都共享一个状态1

1. 生成createContext

```javascript
const TestContext = React.createContext({});
```

2. 使用createContext.Provider包裹**parent**组件

```react
<TestContext.Provider 
	value={{
		username: '我是变量',
	}}
>
	<div className="parent">
		<Child1 />
		<Child2 />
    <Child3 />
	</div>
<TestContext.Provider/>
```

3. 在子组件中就可以使用useContext来获取父级创建的TestContext

```react
const Child1 = () => {
	const { username } = useContext(TestContext);
	return (
		<div className="child1">
      		<p>1 message for {username}</p>
		</div>
	)
}
```

通过useContext就可以做到子组件共享一个状态，如果状态被改变，所有使用变量的都放都会发生变化



## TS类型的一些知识

### Parameters

> 获取函数的全部参数，并且以元祖类型进行返回,Utiltity Types

```ts
function test(a: string, b: number, c: number[], d: any) {}

// 直接继承test函数的全部参数类型
function testPlus(...[a, b, c, d]: Parameters<typeof test>) {
  console.log(a, b, c, d);
}
```

### 联合类型

```tsx
let a:string | number; // 可以是多种类型

// 抽象联合类型
type aType:string | number;
let a:aType

// 也可以通过interface可以实现类型功能，但是指定单个类型是无法实现的，但是interface的全部功能type都可以实现
// 例如：
interface aaa  {
	a:string
}

type aaa = {
  a:string
}
// 以上2种效果都是一致的
```



### js的typeof与ts的typeof

```tsx
// js: typeof runtime阶段运行 检查参数的类型
// ts: typeof 静态检查阶段运行 识别函数的参数

```



### Partial与Omit关键字

```ts
type Preson = {
  name: string;
  age: String;
  sex: string;
};

// Partial关键字会将传入的类型处理成为非必填
const xiaoMin: Partial<Preson> = {
  age: "非必填",
  name: "非必填",
  sex: "非必填",
};

// Omit 会删除第一个参数 类型 中的第二个参数中的变量 并返回结果 例如这里删除 name age
const shenMiRen: Omit<Preson, "age" | "name"> = { sex: "男" };
```



## 关于css一些不知道的

#### 关于rem

em表示相对于父级的font-size

rem表示相对于根元素html的font-size

正常默认font-size为16px，那么1rem === 16px

如果希望rem的比例自定义只需要将html的font-size设置为对应的百分就行，例如设置为62.5的时候1rem === 10px



### 关于vh

vh的全称为viewport height，100vh就是代表视口的高度



## emotion

> emotion是一个css in js的方案，也就是使用js来写css代码，这样的话就可以在css中直接写逻辑

````tsx
import styled from "@emotion/styled";

export const Row = styled.div<{
  gap: number;
}>`
  display: flex;
  align-items: center;
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) => `${props.gap}rem`};
  }
`;
````



## 自定义hook useAsync的实现

> useAsync可以理解为针对请求体再次封装，经过封装之后的请求体，自带请求进度，以及针对catch更加优雅的处理方式

```tsx
import { useState } from "react";

interface State<D> {
  error: Error | null;
  data: D | null;
  status: "idle" | "loading" | "error" | "success";
}

// 建立初始化的值
const defaultState: State<null> = {
  data: null,
  error: null,
  status: "idle",
};

// 实现函数
export const useAsync = <D>(initState?: State<D>) => {
  // 默认状态
  const [state, setState] = useState<State<D>>({
    ...defaultState,
    ...initState,
  });
  // 请求成功的调用
  const setData = (data: D) => {
    setState({
      data,
      status: "success",
      error: null,
    });
  };
  // 请求失败的调用
  const setError = (error: Error) => {
    setState({
      data: null,
      error: error,
      status: "error",
    });
  };
  // 请求开始的调用
  const setLoading = () => {
    setState({
      data: null,
      error: null,
      status: "loading",
    });
  };
  // 对外实际执行的函数
  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error("请传入 promise 类型数据");
    }
    setLoading();
    return promise
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        setError(err);
      });
  };
  return {
    isIdle: state.status == "idle",
    isLoading: state.status == "loading",
    isError: state.status == "error",
    isSuccess: state.status == "success",
    run,
    setData,
    setLoading,
    setError,
    ...state,
  };
};
```



**使用阶段**

```jsx
// 逻辑顶部应用相关逻辑
  const projectData = useAsync<any[]>(); // 泛型为后台返回的数据的类型

//  启动请求，传入请求体
projectData.run(request);

// 请求完成后，projectData中的数据状态会被同步更新
let { data, isLoading,isError,...other} = projectData 
```

## react中实现捕捉边界错误

> 关于错误边界的概念在react官网中是这样描述的，组件内的JavaScript错误会导致React的内部状态被破坏，并且在下一次的渲染时会产生**可能无法追踪的错误**，但是部分ui的JavaScript错误不应该导致整个应用的崩溃，所以react16中引入了错误边界的概念，
>
> 错误边界是一种react组件，最终组件可以捕获发生在其朱组件树任何位置的JavaScript错误，并打印错误，同时展示降级ui，而并不会渲染发生崩溃的子组件树，错误边界在渲染期间，生命周期方法和整个组件数的构造函数中捕获错误

```jsx
import React, { ReactNode } from "react";

type FallBackRender = (props: { error: Error | null }) => React.ReactElement;

// 1 2 两种写法一致
type Components1 = { children: ReactNode; fallbackRender: FallBackRender };
type Components2 = React.PropsWithChildren<{ fallbackRender: FallBackRender }>;

export class ErrorBoundary extends React.Component<
  Components2,
  { error: Error | null }
> {
  state = {
    error: null,
  };
  // 当子组件抛出异常, state中的errir就会被调用
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;
    if (error) {
      console.log("错误执行", error);
      return fallbackRender(error);
    } else {
      return children;
    }
  }
}
```



使用**App.tsx**

```tsx
<ErrorBoundary fallbackRender={fallPageErrorFallback}>
	{user ? <AuthenicatedApp /> : <UnAuthenicated />}
</ErrorBoundary>


// 发生错误的时候就会渲染这个dom
export const fallPageErrorFallback = ({ error }: { error: Error | null }) => (
  <p>请求失败了,错误信息{error}</p>
);
```





## 阶段性结束

  关于react hook的理念学习已经结束了，这段时间学习来看，确实react在很多方面更加易于理解，更加工程化，同时也学会了很多ts的知识，一直以来ts在我手中都是anyscript，本次学习让我对ts的运用更加熟练；在这个过程中也学会了很多hook相关的理念以及实例，并且可以带着这思想去优化项目代码

  可惜我是一名vuer，继续学习react的实际编码，意义已经不是很大，所以关于这个课程的学习，本次告一段落；通过本次学习，非常深刻的体会到了hook的优雅，后面会深入学习vue3，在vue3中将hook与业务结合，让代码更加健壮

