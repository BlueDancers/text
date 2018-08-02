---
title: var foo = function () {} 和 function foo() 有什么区别?
date: 2018-2-3
tags: 
  - JavaScript
categories: JavaScript
---



# JavaScript 中，定义函数时用 var foo = function () {} 和 function foo() 有什么区别？

参照文章: [知乎](https://www.zhihu.com/question/19878052/answer/32361868)

JavaScript 函数和变量声明的“提前”（hoist）行为

简单的说  如果我们使用 匿名函数  

```javascript
var a = {}
```

这种方式， 编译后变量声明a 会“被提前”了，但是他的赋值（也就是a）并不会被提前。
也就是，匿名函数只有在被调用时才被初始化。

如果使用

```javascript
function a () {}; 
```

 这种方式， 编译后函数声明和他的赋值都会被提前。
也就是说函数声明过程在整个程序执行之前的预处理就完成了，所以只要处于同一个作用域，就可以访问到，即使在定义之前调用它也可以。

看一个例子

```javascript
function hereOrThere() { //function statement
    return 'here';
}
console.log(hereOrThere()); // alerts 'there'

function hereOrThere() {
    return 'there';
}


```

![](http://on7r0tqgu.bkt.clouddn.com/FmeWe58STETmHhqnBO690siAnEbq.png)

我们会发现alert(hereOrThere) 语句执行时会alert('there')！这里的行为其实非常出乎意料，主要原因是JavaScript 函数声明的“提前”行为，简而言之，就是Javascript允许我们在变量和函数被声明之前使用它们，而第二个定义覆盖了第一种定义。换句话说，上述代码编译之后相当于

````javascript
function hereOrThere() { //function statement
  return 'here';
}

function hereOrThere() {//申明前置了，但因为这里的申明和赋值在一起，所以一起前置
  return 'there';
}

console.log(hereOrThere()); // alerts 'there'
````

我们期待的行为

```
var hereOrThere = function () { // function expression
    return 'here';
};

console.log(hereOrThere()); // alerts 'here'

hereOrThere = function () {
    return 'there';
};
```

![](http://on7r0tqgu.bkt.clouddn.com/Fhk-5E5Cn_3hC_x0Ackx30ekIRR2.png)

这段程序编译之后相当于：

````javascript
var hereOrThere；//申明前置了

hereOrThere = function() { // function expression
  return 'here';
};

console.log(hereOrThere()); // alerts 'here'

hereOrThere = function() {
  return 'there';
};
````



