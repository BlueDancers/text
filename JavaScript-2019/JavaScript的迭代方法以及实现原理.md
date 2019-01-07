# JavaScript的迭代函数与迭代函数的实现

![Image result for JavaScript 迭代](http://www.vkcyan.top/Fk-nTStDUXi9PbFwLPeZ9z8Lfktl.png)

## 前言

​	如果对技术很自信,请直接看 实现的源码

​	如果想回顾一下基础,请按文章顺序阅读



说到迭代方法,最先想到的是什么?`forEach`还是`map`,迭代的方法ES5提供了5种方法



> 以下定义来自 JavaScript高级程序设计

每个方法都接收两个参数

1. 在每一项上运行的函数
2. **运行该函数的作用域对象(影响this的值)**

传入这些方法中的函数会接收3个参数

1. **数组项的值** 
2. **该项在数组的位置** 
3. **数组对象本身**

迭代函数执行后**可能会**也**可能不会**影响返回结果 (雾..)



ES5提供的迭代函数

- **forEach**(): 对数组中的每一项运行给定函数,无返回值
- **every**(): 对数组中的每一项运行给定函数,如果该函数每一项都返回`true`,则返回`true`
- **some**(): 对数组中的每一项运行给定函数,如果该函数任意一项返回`true`,则返回`true`
- **map**(): 对数组中的每一项运行给定函数,返回每次函数调用的结果组成的数组
- **filter**(): 对数组中的每一项运行给定函数,该函数会返回true的项组成的数组

## 参数说明

```JavaScript
let array = [1,2,3,4,5,6,7,8,9]
array.forEach((element,index,array) => {
  console.log(`当前遍历元素${element}`);
  console.log(`当前元素位置${index}`);
  console.log(`数组本身${array}`);
})
> 当前遍历元素1
> 当前元素位置0
> 数组本身1,2,3,4,5,6,7,8,9
> 当前遍历元素2
> 当前元素位置1
> 数组本身1,2,3,4,5,6,7,8,9
> 当前遍历元素3
> 当前元素位置2
> 数组本身1,2,3,4,5,6,7,8,9
```

forEach可以说是最常用的一个迭代方法了,该方法没有返回值,与for循环的效果一样



forEach的第二个参数,js高程上说明 是**运行该函数的作用域对象**,可以看一下经典的例子

```js
let obj2 = {
  name: '张三',
  times:[1,2,3],
  print:function () {
    this.times.forEach(function(res) {
      console.log(this.name);
    },this)
  }
}
// 迭代函数内部的function默认指向windows 第二个参数调整了this指向
obj2.print()
// 张三
// 张三
// 张三
```

如果这么写看不太懂的话,看箭头函数的写法一下子就能明白

```js
let obj2 = {
  name: '张三',
  times:[1,2,3],
  print:function () {
    this.times.forEach(res => {
      console.log(name);
    })
  }
}
// 箭头函数this指向父级,所以他不需要调整this
obj2.print()
// 张三
// 张三
// 张三
```



## every(判断函数)

> 对数组中的每一项运行给定函数,如果该函数每一项都返回`true`,则返回`true`

#### 默认返回false

```js
var array = [1,2,3,4,5,6,7,8,9]
var result = array.every(e => {})
console.log(result); // 
> false 
```

#### 全部ture才会返回true

```JavaScript
var array = [1,2,3,4,5,6,7,8,9]
var result = array.every(e => {
  return e > 0
})
console.log(result);
> true

var array = [1,2,3,4,5,6,7,8,9]
var result = array.every(e => {
  return e > 1
})
console.log(result);
> false
```



## some(判断函数)

> 对数组中的每一项运行给定函数,如果该函数任意一项返回`true`,则返回`true`

#### 默认返回false

```js
var array = [1,2,3,4,5,6,7,8,9]
var result = array.some(e => {})
console.log(result); // 
> false 
```

#### 全部false才会返回false

```JavaScript
var array = [1,2,3,4,5,6,7,8,9]
var result = array.some(e => {
  return e > 8
})
console.log(result);

var array = [1,2,3,4,5,6,7,8,9]
var result = array.some(e => {
  return e > 9
})
console.log(result);
> false
```

以上两个都不是很常用,但是毫无疑问在特定的需求下,这个要比用forEach代码要简洁很多



## filter(过滤函数)

> 对数组中的每一项运行给定函数,该函数会返回true的项组成的数组

````javascript
var array = [1,2,3,4,5,6,7,8,9]
var result = array.filter(e => {
  return e>5
})
console.log(result);
> [6, 7, 8, 9]
````

上面的例子,array数组里面大于5的数会被过滤出来,`filter`函数在日常当中比较常用





## map(处理函数)

> 对数组中的每一项运行给定函数,返回每次函数调用的结果组成的数组

````javascript
var array = [1,2,3,4,5,6,7,8,9]
var result = array.map(e => {
  return e>5
})
console.log(result);
> [false, false, false, false, false, true, true, true, true]

var array = [1,2,3,4,5,6,7,8,9]
var result = array.map(e => {
  return e*2
})
console.log(result);
> [2, 4, 6, 8, 10, 12, 14, 16, 18]
````



## forEach(迭代函数)

> 对数组中的每一项运行给定函数,无返回值

````JavaScript
var array = [1,2,3,4,5,6,7,8,9]
var arraypush = []
var result = array.forEach(e => {
  if (e > 5) {
    arraypush.push(e)
  }
})
console.log(arraypush);
> [6, 7, 8, 9]
````

最纯粹的迭代函数,似乎forEach是处理外部数组最好的选择



到这里,我想起了我第一次使用`filter`函数的时候,我惊呆了,这函数太强大了!

如此好用的工具函数,不自己实现一遍怎么能做到完全了解





> 以下函数为自己实现的,并不是源码,若有错误请指点!

## 实现forEach

首先明显forEach是Array上的原型链上的函数所以第一件事就是创建一个原型方法

```js
Array.prototype.MyforEach = function (){}
```

forEact 第一个参数为一个匿名函数 第二个参数为this指向 所以

```js
Array.prototype.MyforEach = function (fn,obj){}
```

forEach会迭代调用它的数组所以内部肯定是循环

```js
Array.prototype.MyforEach = function (fn,obj){
  let len = this.length
  for (let index = 0; index < len; index++) {
    fn(this[index],index,this)
  }
}
```

但是我们还没有考虑this指向的事情,所以还需要添加一些调整this的代码

```js
Array.prototype.MyforEach = function (fn,obj){
  let len = this.length
  if (obj !== 'undefined') {
    fn = fn.bind(obj)
  }
  for (let index = 0; index < len; index++) {
    fn(this[index],index,this)
  }
}
```



运行一下试试,就用之前的例子

```js
var array = [1,2,3,4,5,6,7,8,9]
Array.prototype.MyforEach = function (fn,obj){
  let len = this.length
  if (obj !== 'undefined') {
    fn = fn.bind(obj)
  }
  for (let index = 0; index < len; index++) {
    fn(this[index],index,this)
  }
}

var obj2 = {
  name: '张三',
  times:[1,2,3],
  print:function () {
    this.times.MyforEach(function(res) {
      console.log(this.name);
    },this)
  }
}
obj2.print()
> 张三
> 张三
> 张三
```



## 实现map

map与forEach的区别是 

1. map中如果是运算,会返回每次函数调用的新的结果组成的数组 
2. map中如果是判断,会返回每次迭代结果组成的数组

所以只要在迭代函数内部创建一个数组,每次迭代都push进去,最后返回出去就好啦

```JavaScript
Array.prototype.Mymap = function (fn,obj){
  var resultData = []
  var len = this.length
  if (obj !== 'undefined') {
    fn = fn.bind(obj)
  }
  for (let index = 0; index < len; index++) {
    resultData.push(fn(this[index],index,this))
  }
  return resultData
}
```

运行一下

```JavaScript
var array = [1,2,3,4,5,6,7,8,9,]
var result = array.Mymap(e => {
    return e*2
})
console.log(result);
> [2, 4, 6, 8, 10, 12, 14, 16, 18]
```



## 实现 some every

some与every都会有一个特点 默认返回false

不同的地方在于

​	 **some**要求 全部返回`false`返回`false`

​	 **every**要求 全部返回`true`返回`true ` 

````JavaScript
// -- every -- 
Array.prototype.Myevery = function (fn,obj) {
  var len = this.length
  if (obj !== 'undefined') {
    fn = fn.bind(obj)
  }
  for (let index = 0; index < len; index++) {
    if (fn(this[index],index,this) == undefined) { // 无返回值 默认返回false
      return false
    }else if (fn(this[index],index,this) !== true) { // 出现一个不为 true 就停止迭代 返回结果
      return false
    }
  }
  return true
}

// -- some -- 
Array.prototype.Mysome = function (fn,obj) {
  var len = this.length
  if (obj !== 'undefined') {
    fn = fn.bind(obj)
  }
  for (let index = 0; index < len; index++) {
    if (fn(this[index],index,this) == undefined) {
      return false
    } else if (fn(this[index],index,this) !== false) {
      return true
    }
  }
  return false
}
````



## 实现fliter

相信到这里,你也可以直接实现一个fliter函数了,仅仅是多添加一个数组

````js
Array.prototype.Myfilter = function (fn, obj) {
  let resultData = []
  var len = this.length
  if (obj !== 'undefined') {
    fn = fn.bind(obj)
  }
  for (let index = 0; index < len; index++) {
    if (fn(this[index],index,this) === true) {
      resultData.push(this[index]) // 注意不是push函数结果
    }
  }
  return resultData
}

// -- 运行 -- 

var array = [1,2,3,4,5,6,7,8,9]
var result = array.Myfilter(e => {
  return e>5
})
console.log(result);
>  [6, 7, 8, 9]
````

perfect!​ :stuck_out_tongue_closed_eyes:

原来很多东西,并没有想象的那么复杂



## 后记

想起了之前掘金上的 `停止学习框架` 一文,以及后面各位大佬的 `驳 ....停止学习框架`,说到底都是为了告诉我们,不管学习什么,都要打好基础,作为前端开发者,最最基础的就是打好`JavaScript`的基础,基础扎实,学习框架都不是困难事情