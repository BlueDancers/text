# TypeScript

​	学习typeScript,我觉得是前端必备技能吧,看了文档的介绍后,感觉typeScript的却是很强大的语言工具,弥补了js的语言本身的确定

### 安装TypeScript

```bash
npm install -g typescript
```

### 使用TypeScript

```bash
tsc hello.ts
```

tsc会将ts文件编译成为js文件,在编译上面也很人性化,因为ts只会进行代码检查

```JavaScript
function sayHello (person:string) {
    return 'hello'+person
}
let user = "Tom"
console.log(sayHello(user));
```

编译后

````javascript
function sayHello(person) {
    return 'hello' + person;
}
var user = "Tom";
console.log(sayHello(user));

````

如果这过程里面,ts语法检查出现了错误,会井盖,但是还是会编译成功

```JavaScript
function sayHello (person:string) {
    return 'hello'+person
}
let user = [1,2,3]
console.log(sayHello(user));

```

编译 >>> 

```JavaScript
hello.ts:5:22 - error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'string'.

5 console.log(sayHello(user));
```

抱错,告知语法检查出现错误,编译依旧通过

```JavaScript
function sayHello(person) {
    return 'hello' + person;
}
var user = [1, 2, 3];
console.log(sayHello(user));

```

## 基础

### 数据类型

```JavaScript
let booleanData: boolean = false;
let numberData: number = 6;
let stringData: string = 'vkcyan';
let unusable: void = undefined; // 声明void类型变量只能赋值undefined与null
```

### 函数

````javascript
function fun() : void {
    console.log('this is typeScript')
}
````

### Null与Undefined

```javascript
let u : undefined = undefined // undefined类型只能是undefined
let n : null = null // null类型只能是null
```

与void的区别在于undefined和null是所有类型的子类型,也就是所有类型都可以是undefined

```javascript
let u: undefined
let num: number = u 
//但是void不不可以赋值给其他类型的变量
let u: void
let num: number = u // 会报错
```

### 任意值

```
let anyNumber: any = 'seven'
anyNumber = 7
```

声明一个变量为任意值后,可以对他进行任何操作,返回的内容都是任意值

#### 未申明类型的变量

> 变量在申明的时候未申明类型,就回来识别未any类型

```javascript
let some;
some = 'event'
some = 7
```

等价与

```JavaScript
let some: any
some = 'event'
some = 7
```

#### 类型推论

> 在编译期间没有指定类型,但是typeScript会自动添加类型

```javascript
let m = 'sevent'
m = 7 // 会报错
```

上面的代码相当与

```JavaScript
let m : string = 'sevent'
m = 7 // 自然会报错
```

#### 联合类型

联合类型:也就是表示取值可以为多种类型的一种

```javascript
let myFavoriteNumber : string | number;
myFavoriteNumber = 'server'
myFavoriteNumber = 7
//可以赋值两种类型
function getLength(something: string | number ):string {
    return something.toString();
}
// 
let mys : string | number;
mys = 'server'
console.log(mys.length)
mys = 7
// console.log(mys.length); 因为数字没有length属性
const user: String = 1
String user = 1
```

### 接口

基本和java很相似

作用就是对行为进行抽象,在typeScript里面常用于对 [ 对象的形状 ] 进行描述

```Java
interface Person {
    name: string;
    age: number;
}

let tom:Person = {
    name: 'Tom',
    age: 25
}
```





