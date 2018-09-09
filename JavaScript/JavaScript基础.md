# JavaScript

本文就和名字一样,很重要,会将我一直一来可以想到的基础知识都写进来,虽然说是基础,但是我不觉得这就不重要相反,熟练所有基础,在写代码上将会事半功倍

## Js

### 内置类型

JavaScript有七个内置 `null` `undefined` `String` `Number` `Boolean` `Symbol`以及 `Object`

> 关于js的Number的需要注意,是基于 IEEE 754标准实现 所以在运行的时候存在bug,NaN是Number类型
>
> 但是NaN !=NaN

```javascript
NaN == NaN
false
NaN === NaN
false
```

### typeof

> typeof 可以显示基本类型,除了null

````JavaScript
typeof 1
> "number"
typeof '1'
> "string"
typeof null
> "object"
typeof true
> "boolean"
typeof Symbol()
> "symbol"
typeof fun
> "undefined"
````

对于 `null` 来说，虽然它是基本类型，但是会显示 `object`，这是一个存在很久了的 Bug 

> typeof对于对象,函数都是Object,原型属性都是function

```JavaScript
typeof {}
> "object"
typeof []
> "object"
typeof alert
> "function"
```

如果你决定typeof还不够好用,可以使用原型属性toString,她回返回数据的正确类型

```JavaScript
Object.prototype.toString.call(1)
> "[object Number]"
Object.prototype.toString.call({})
> "[object Object]"
Object.prototype.toString.call([])
> "[object Array]"
Object.prototype.toString.call("1")
> "[object String]"
Object.prototype.toString.call(null)
> "[object Null]"
Object.prototype.toString.call(undefined)
> "[object Undefined]"
```

### 类型转换

在条件判断上面除了 `undefined` `null` `false` `NaN` `''` `0` `-0`

其他所有值都是true

````JavaScript
new Boolean(undefined)
> Boolean {false}
new Boolean(null)
> Boolean {false}
new Boolean(false)
> Boolean {false}
new Boolean(NaN)
> Boolean {false}
new Boolean('')
> Boolean {false}
new Boolean(0)
> Boolean {false}
new Boolean(-0)
> Boolean {false}
new Boolean(1)
> Boolean {true}
new Boolean("字符串")
> Boolean {true}
````

### 对象转基本类型

在对象转为基本类型的时候,JavaScript会首先调用valueOf,然后调用toString,这些方法都可以重写

```JavaScript
let a = {
    valueOf() {
    	return 0
    }
}
```

```javascript
a.valueOf()
> 0
```

### 四则运算

> 只有当加法运算时，其中一方是字符串类型，就会把另一个也转为字符串类型。 
>
> 其他运算只要其中一方是数字，那么另一方就转为数字。 
>
> 并且加法运算会触发三种类型转换：将值转换为原始值，转换为数字，转换为字符串。 

```
1+'1'
"11"
11-'1'
10
[1,2]+[3,4]
"1,23,4"
[1,2].valueOf().toString()+[3,4].valueOf().toString()
"1,23,4"
```

还有很多奇怪的写法,这是语言的特性

````
'a' + + 'b'
"aNaN"
// 因为b并不是number + 'b' -> NaN
````

### `==` 操作符

基本类型 除了NaN == NaN为false,其他都是正常逻辑

![](http://on7r0tqgu.bkt.clouddn.com/FkWrooLvhsG5sdrf7aPnCpT4ejc1.png )

说一个例子`[] == ![]  true`,这要是那个面试官出这样的题目绝对是没水平的前端

```
// [] 转成 true，然后取反变成 false
[] == false
// 根据第 8 条得出
[] == ToNumber(false)
[] == 0
// 根据第 10 条得出
ToPrimitive([]) == 0
// [].toString() -> ''
'' == 0
// 根据第 6 条得出
0 == 0 // -> true
```

### 原型链

[原型链](https://github.com/vkcyan/text/blob/master/JavaScript/JavaScript%E6%B7%B1%E5%85%A5%E4%B9%8B%E5%8E%9F%E5%9E%8B%E4%B8%8E%E5%8E%9F%E5%9E%8B%E9%93%BE.md)



