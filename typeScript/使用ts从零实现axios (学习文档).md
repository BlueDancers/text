# TS

#### 元祖

> 在ts里面,元祖与数组比较相似

```ts
let xcat: [string, number] = ['313123', 312313];
```

可以赋值,也可以获取到值,并使用对应类型的方法

```
xcat[0].slice(1); // 对应类型调用对应方法
xcat.push('312313');
// 目前来看不可以通过下标来添加越界元素
// 但是push操作可以实现
// 还是不要使用元祖越界为好
// xcat[2] = 'eqweqe';
console.log(xcat);
```

### 断言

> 断言用于强制指定类型,一般有两种实现方法

```
let someValue:any = '3123123123'
// let pushsomeValue = <string>someValue // 断言
// let pushsomeValue = (someValue as string).length // 第二种断言方式(在jsx里面推荐这个)
```

### 枚举

> 枚举类型用于将取值限定在一定范围内,可以用值取键,用键取值,用于固定变量(感觉不常用)

```
enum Days {
  '星期一',
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六',
  '星期日'
}
console.log(Days[0]); // 星期一
console.log(Days['星期一']); // 0 

```

下标是可以自定义的,也就是替换当前下标

````
enum Days {
  '星期一' = 8,
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六',
  '星期日'
}
console.log(Days[8]); // 星期一
````

具体看中文文档[ts枚举](https://ts.xcatliu.com/advanced/enum)





### 接口

> 接口可以说是ts里面最常用的功能了

#### 可选属性

```ts
interface printLabel {
  label:string,
  size: string|number, // 常规属性
  color?:string // 可选属性
}

function printLabel(labelObj:printLabel) {
  console.log(labelObj.label)
}
let myObj = {size:10,label:'我是要打印的数据'}
printLabel(myObj)
```

#### 只读属性

```ts
interface printTest {
  readonly text:string, // readonly是只读属性的
  readonly  num: number
}
let printTestData:printTest = { text:'eqeq',num:3123123 }
printTestData.num = 20 // 报错
```

#### 额外属性

````ts
interface test10 {
  one:string,
  two:string,
  [interName:string]:any // 创建一个任意属性名 来完成额外属性检查的通过
}
````

### 函数类型检查

```ts
interface searchFunc {
  (source: string,subString:string):boolean
}
// 这个函数只能
let mySearch:searchFunc = ((source,sub)=> {
  return false
})

mySearch('1','1')
```



### 类类型

```typescript
interface ClockInterFace {
  tick(): void;
}

interface ClockConstructor {
  new (hour: number, minute: number): ClockInterFace;
}

function creactClock(
  ctor: ClockConstructor,
  hour: number,
  minute: number
): ClockInterFace {
  return new ctor(hour, minute);
}

class OneClock implements ClockInterFace {
  constructor(h: number, m: number) {}
  tick() {
    console.log('keep keep');
  }
}

class TowClock implements ClockInterFace {
  constructor(h: number, m: number) {}
  tick() {
    console.log('two two');
  }
}

let one = creactClock(OneClock,12,12)
let towClock = creactClock(TowClock,12,32);
```

