---
title: call apply的模拟实现
date: 2018-7-30
tags: 
  - JavaScript
  - this
categories: JavaScript
---

## call apply的功能类似,先从call说起

借助大神的话: call()方法在使用一个指定this值和若干个指定的参数值的前提下调用某个函数和方法(真的难理解)

```javascript
var foo = {
	value :1
}
function bar(){
	console.log(this.value)
}
bar.call(foo)
```

这里的this就指向foo了 改变JavaScript对象的this就这么简单

于是是不是就像下面的代码,实现一样的功能

```JavaScript
var foo = {
    value: 1,
    bar: function() {
        console.log(this.value)
    }
};

foo.bar(); // 1
```

这里this就指向foo了, 虽然实现了功能, 但是添加了一个属性, 这是不允许的, 所以要在最后删除这个属性

分析一下怎么实现类似call的功能:

1. 将函数设为对象的属性
2. 指定该函数
3. 删除该函数

假如我要自己实现是不是这样的思路?

那么内部应该是这样的代码

```
foo.fun = bar	//设置为对象
foo.fun()	    //执行函数
delete foo.fun  //删除函数
```

fun是对象名字,随便起

### 第一版本的模拟call()实现

```JavaScript
Function.prototype.call2 = function (context){
  //首先获取call函数  用this,因为这里是bar调用了他 所以this指向bar
  context.fun = this      //这里将this里面的方法加入到了context里面去了
                          //相当与context变成这样
                          /*context = {
                            value: 1,
                            fun: function (){
                              console.log(this.value)
                            }
                          }*/
  context.fun()
  delete context.fun;
}

var foo = {
  value:1
}
function bar(){
  console.log(this.value);
}

bar.call2(foo)
```



后面还要考虑给定参数执行函数

```JavaScript
var foo = {
    value: 1
};

function bar(name, age) {
    console.log(name)
    console.log(age)
    console.log(this.value);
}

bar.call(foo, 'kevin', 18);
```

这里第一问题 参数不固定怎么办?

办法:Arguments 对象里面取值,取出第二个到最后一个(这里实现方法是重点),然后放入数组

还有一点需要注意 当传入null的时候 给他指定为windos

### 第二版本

```javascript
Function.prototype.call2 = function (context){
  context.fun = this || window  //这里的this是bar函数
  var datas = [];
  for (let i = 1; i < arguments.length; i++) {  //这里这里默认第一个参数为对象 所以取1后面
    datas.push('arguments[' + i + ']'); //最主要就是通过arguments[' + i + ']来过去参数字符串 再使用eval来解开,实现传参
  }
  eval('context.fun('+datas+')')

  /*
  var foo = {
    value: 1,
    fun: function (name,age){
      console.log("name---" + name)
      console.log("age---" + age)
      console.log(this.value);
    }
  }
  */
  delete context.fun
}

var foo = {
  value:1
}

function bar(name, age) {
  console.log("name---"+name)
  console.log("age---"+age)
  console.log(this.value);
}

bar.call2(foo, 'kevin', 18);

------------------------------------------------------------------------------------------------
name---kevin
age---18
1
```

这里基本已经完成了大致call的核心代码



## 后面是apply的是模拟实现代码

```JavaScript
Function.prototype.apply1 = function (context,arr){
  //let context = Object(context) || window
  context.fun = this
  var result;
  if(!arr){   //假如arr不存在直接执行
    result = context.fun()
  }else {
    let args = []
    for (let i = 0; i < arr.length; i++) {
      args.push('arr['+i+']');
    }
    eval('context.fun('+args+')')
  }
  
}

var foo = {
  value:1
}

function bar(name, age) {
  console.log("name---"+name)
  console.log("age---"+age)
  console.log(this.value);
}

bar.apply1(foo, ['kevin', 18]);
```

每次看[冴羽](https://github.com/mqyqingfeng)大神的github都深有启发,看完每个小结都会有一个疑问

这些大佬是怎么学习的,怎么做到对js理解的如此透彻,....( = = )







