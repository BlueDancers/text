---
title: JavaScript深入之参数按值传递
date: 2018-7-15
tags: JavaScript
categories: JavaScript
---



在《JavaScript高级程序设计》第三版 4.1.3，讲到传递参数： 

ECMAscript中所有函数的参数都是按值传递

### 按值传递

> 也就是,把函数外部的值复制给函数内部的参数,就和把值从一个变量复制到另一个变量一样

```JavaScript
var value = 1;
function foo(v) {
    v = 2;
    console.log(v); //2
}
foo(value);
console.log(value) // 1
```

当传递value给函数foo的时候,相当于拷贝一份value给foo假设拷贝的那份叫v,函数中修改的都是v,不会一项原来的value值

### 引用传递

按值传递里面的拷贝虽然好理解 但是当值是一个复杂的数据结构的时候,拷贝就会产生性能问题

所以还有另外的传递方式叫做按**引用传递**

所谓按引用传递,就是传递对象的引用,函数内部对参数的任何改变都会影响该对象的值,因为两者引用的是同一个对象

```JavaScript
var obj = {
      value : 1
    };
    let foo = (o)=> {
      o.value = 2;
      console.log(o.value);
    }
    foo(obj)
    console.log(obj.value);
```

这里产生了一个疑问?

红宝书都说了 ECMAScript 中所有函数的参数都是按值传递的，这怎么能按"引用传递"成功呢？ 

### 我们看第三个例子

```JavaScript
var obj = {
    value: 1
};
function foo(o) {
    o = 2;
    console.log(o); //2
}
foo(obj);
console.log(obj.value) // 1
```

如果 JavaScript 采用的是引用传递，外层的值也会被修改呐，这怎么又没被改呢？所以真的不是引用传递吗？ 

这就要讲到其实还有第三种传递方式，叫按共享传递。

而共享传递是指，在传递对象的时候，传递对象的引用的副本。

关键点:

> 运算符`=`就是**创建或修改**变量在内存中的指向.
> 初始化变量时为创建,重新赋值即为修改.

为了解释上面的共享传递 这里在看一个例子摸清楚内存中的分布

```JavaScript
var a = {b: 1};// a = {b: 1}
var c = a;// c = {b: 1}
a = 2;// 重新赋值a
console.log(c);// {b: 1}
```

1. 创建变量a指向对象{b:1}
2. 创建变量c指向对象{b:1}
3. a又重新指向常量2

但是这时候c依旧指向对象{b:1}

这样我们回头看第一个例子

```JavaScript
var value = 1;
function foo(value) {
    var v = value; // 创建变量v指向value所指向的值
    v = 2;// v重新指向另外的值
    console.log(v); //2
}
foo(value);
console.log(value) // 1,value从始至终都未改变指向.
```

现在吧第一个例子修改成对象

```JavaScript
var a = {b: 1};// a = {b: 1}
var c = a;// c = {b: 1}
a.b = 2;// 重新赋值对象a中的属性b
console.log(c);// {b: 2}
```

| 栈   | 堆       | 常量区 |
| ---- | -------- | ------ |
| a,c  | [object] |        |
| b    |          | 1      |

执行完`a.b = 2`后: 

| 栈   | 堆       | 常量区 |
| ---- | -------- | ------ |
| a,c  | []object |        |
| b    |          | 2      |

> a,c从始至终都没有改变指向,变的是b而已

现在再看第二个例子

```JavaScript
var obj = {
   value: 1
};
function foo() {
   var o = obj;
   o.value = 2;// 变量value改变了指向,而o并未改变
   console.log(o.value); //2
}
foo(obj);
console.log(obj.value) // 2
```

所以 js始终是按值传递,在这里称他为共享传递

