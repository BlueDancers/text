# JavaScript的迭代方法

​	说到迭代方法,最先想到的是什么?`forEach`还是`map`,JavaScript发展至今,迭代的方法ES5提供了5种方法

每个方法都接收两个参数,(在每一项上运行的函数,**运行该函数的作用域对象(影响this的值)**)

传入这些方法中的函数会接收3个参数,**数组项的值** **该项在数组的位置** **数组对象本身**

迭代函数执行后**可能会**也**可能不会**影响返回结果(这句话有点绕 雾..)



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
let array = [1,2,3,4,5,6,7,8,9]
let result = array.every(e => {})
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
let array = [1,2,3,4,5,6,7,8,9]
let result = array.some(e => {})
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



以上两个都不是很常用,但是毫无疑问这个要比用forEach代码要简介很多



## filter(过滤函数)

> 对数组中的每一项运行给定函数,该函数会返回true的项组成的数组

````javascript
let array = [1,2,3,4,5,6,7,8,9]
let result = array.filter(e => {
  return e>5
})
console.log(result);
> [6, 7, 8, 9]
````

上面的例子,array数组里面大于5的数会被过滤出来,`filter`函数在日常当中比较常用





## map(判断函数)

> 对数组中的每一项运行给定函数,返回每次函数调用的结果组成的数组

````javascript
var array = [1,2,3,4,5,6,7,8,9]
var result = array.map(e => {
  return e>5
})
console.log(result);
> [false, false, false, false, false, true, true, true, true]
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



## 实现forEach

首先明显forEach是Array上的原型链上的函数所以第一件事就是创建一个原型方法

```js
Array.prototype.MyforEach = function (){}
```

forEact 第一个参数为一个匿名函数 第二个参数为this指向

所以

```js
Array.prototype.MyforEach = function (fn,obj){
 	
}
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
var array = [1,2,3,4,5,6,7,8,9,]
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

