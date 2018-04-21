#JavaScript的常见坑

##判断一个变量时候是null

不可以单纯使用`typeof`来检测变量是否是对象

```JavaScript
var a = null;
console.log(typeof bar === "object");
>true
```

 因为null也是对象

那么应该怎么判断呢?

只要清楚这一点，同时检查 `bar` 是否为 `null`，就可以很容易地避免问题：

```JavaScript
var bar = null;
var bar = null;console.log(typeof bar === "object" && bar !== null);
> false
```

这里加入变量是 function(){} 怎么办?

```JavaScript
var bar = function () {};console.log(typeof bar)
> function
var bar = function () {};console.log(typeof bar === "object" && bar !== null);
> false
```

可以看到 function () {} 类型是function 所以如果想函数返回true的话

```JavaScript
var bar = function () {};
console.log(typeof bar === "object" || typeof bar === 'function' && (bar !== null));
> true
```

 如果想[] 返回flase 的话

```javascript
var bar = []
console.log((bar !== null) && (typeof bar === "object") && (toString.call(bar) !== "[object Array]"));
> false
```

## 下面的代码将输出什么到控制台，为什么？

```javascript
(function (){  
	var a = b = 3;
})();
console.log((typeof a !== 'undefined'));console.log((typeof b !== 'undefined'));
```

可能很多人都会认为是  a b 都是不存在 因为在闭包里面执行

但是事实上

```javascript
(function (){  
	var a = b = 3;
})();
console.log((typeof a !== 'undefined'));console.log((typeof b !== 'undefined'));
> false
> true
```

显示b不是不存在的 打印出来是 3 

问题在于 错误的把var a = b = 3 以为成为 > var a = 3 var b = 3

实际上是 b = 3; var a = b

 `b` 最终成为了一个全局变量（因为它没有前缀 `var` 关键字），因此仍然在范围内甚至封闭函数之外。

```

```

## **下面的代码将输出什么到控制台，为什么？**

```JavaScript
var myObject = {
	foo: "bar",
	func: function() {
		var self = this;
		console.log("outer func:  this.foo = " + this.foo);
		console.log("outer func:  self.foo = " + self.foo);
		(function() {
			console.log("inner func:  this.foo = " + this.foo);
			console.log("inner func:  self.foo = " + self.foo);
		}());
	}
};
myObject.func();
```









上面的代码将输出以下内容到控制台：

```
outer func:  this.foo = bar
outer func:  self.foo = bar
inner func:  this.foo = undefined
inner func:  self.foo = bar
```

​        第一个 第一个 都是指向myObject 没问题 所以都是bar 但是在闭包里面 this 指向 windows 所以出现了undefined

self因为储存了myobject ,顺利打印了bar

## **4.封装JavaScript源文件的全部内容到一个函数块有什么意义及理由？**

​        这是越来越普遍的做法,被很多流行的JavaScript库 采用,这种技巧创建了一个围绕文件全部内容的`闭包` , 最终重要的是创建一个私有空间,避免与其他JavaScript库之前潜在的命名冲突

## **5.在JavaScript源文件的开头包含 use strict 有什么意义和好处？**

use strict 是一种JavaScript代码运行时自动实时更加严格的解析和处理错误的方法,通常而言，这是一个很好的做法。

如果没有严格模式，将值分配给一个未声明的变量会自动创建该名称的全局变量。这是JavaScript中最常见的错误之一。

在严格模式下，这样做的话会抛出错误。

消除 `this` 强制。如果没有严格模式，引用null或未定义的值到 `this` 值会自动强制到全局变量。这可能会导致许多令人头痛的问题和让人恨不得拔自己头发的bug。在严格模式下，引用 null或未定义的 `this` 值会抛出错误。



不允许重复的属性名称或参数值。当检测到对象（例如，`var object = {foo: "bar", foo: "baz"};`）中重复命名的属性，或检测到函数中（例如，`function foo(val1, val2, val1){}`）重复命名的参数时，严格模式会抛出错误，因此捕捉几乎可以肯定是代码中的bug可以避免浪费大量的跟踪时间。

## **6.考虑以下两个函数。它们会返回相同的东西吗？ 为什么相同或为什么不相同？**

```JavaScript
function foo1 () {  
  return {
    bar: "hello"
  }
};
function foo2 () {  
  return
{
    bar: "hello"
  }
}
console.log(foo1());
console.log(foo2());
```

打印出来的结果是

```JavaScript
> {bar: "hello"}
> undefined
```

很诧异 为什么第二是undefined 也没有抛出错误

原因是因为这个和JavaScript 运行机制有关 foo2() 遇到只有return的代码行 之后 会立即插入分号

代码就成了这样

```JavaScript
function foo1 () {  
  return {
    bar: "hello"
  }
};
function foo2 () {  
  return;
}
```

所以foo2()就成了undefined

## **7. NaN 是什么？它的类型是什么？你如何可靠地测试一个值是否等于 NaN ？**

`NaN`表示一个`不是数字`的值,这个特殊的值是因为运算不能执行导致,不能执行的原因要么是因为是其中的运算对象之非数字("abc/*4")  要么就是因为运算的结果非数字 (整数/0)

NaN类型是`number`

```JavaScript
console.log(typeof NaN === "number");
> true
```

比较可靠的判断方法

```
Number.isNaN(NaN)
> true
```

## **8.****实现函数 isInteger(x) 来判断 x 是否是整数**

这个的方法很多 首先 使用 Math的.round()这样的方法

```
function isInteger(x) {
    return Math.round(x) === x
}
```

还要比较高的方法

```
function isInteger(x) {
	return (x^0) === x
}
```

不可以使用paeseInt 详情见 http://www.cnblogs.com/wuvkcyan/p/8899250.html

## **9.下列代码将输出什么？并解释原因。**

```javascript
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 == 0.3);
> 0.30000000000000004
> false
```

JavaScript中的数字和浮点精度的处理相同，因此，可能不会总是产生预期的结果。

## **10.下列代码行1-4如何排序，使之能够在执行代码时输出到控制台？ 为什么？**

```javascript
(function() {    
	console.log(1); 
    setTimeout(function () {
		console.log(2)
	}, 1000); 
    setTimeout(function () {
    console.log(3)
    }, 0); 
    console.log(4);
})();
```







结果

```
1
4

3
2
```

因为 

1 4 首先打印 没有什么文图 就是简单调用 console.log 2 在 3 后面是因为 2 延迟了1000 3 是0毫秒输出 

既然3是0毫秒输出为什么在 14 后面呢 

要回答这么问题 需要正确理解 JavaScript的事件和时间的设置

浏览器有一个时间循环 会检查事件队列和未处理事件,例如,例入事件发生在后台(例如脚本的loadl事件),浏览器正忙(例如click事件),那么事件会添加到到队列,当onclick时间接触 检查队列,然后处理该事件,setTimeout会将其引用的函数放入事件队列,

当`setTimeout()`的第二个参数为0的时候，它的意思是“尽快”执行指定的函数。具体而言，函数的执行会放置在事件队列的下一个计时器开始。但是请注意，这不是立即执行：函数不会被执行除非下一个计时器开始。这就是为什么在上述的例子中，调用 `console.log(4)` 发生在调用 `console.log(3)` 之前（因为调用 `console.log(3)` 是通过setTimeout被调用的，因此会稍微延迟）。

