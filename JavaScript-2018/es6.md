---
title: ES6 总结 技巧
date: 2018-8-15
tags: 
  - ES6
categories: JavaScript
---

# ES6 总结 技巧

## 模块化

前端在AMD之前都没有模块化的概念,当然这也是前人的经历,刚开始接触模块化还是比较模糊的概念,看到`熟悉[CommonJS](http://javascript.ruanyifeng.com/nodejs/module.html)的标准`,不明觉厉,后来慢慢深入,了解了前端模块化发展史 ,从require.js 的AMD 带SeaJs的的CMD 到现在的ES6模块化CommonJS统一江湖

​	说到模块化不得不说前端打包工具

- 一般情况下,大型web应用使用webpack打包   --   功能全面,但是学习成本高,
- 对于小型的web项目,可以使用rollup.js打包  --  功能只有一个 打包 学习成本低 快 打包体积小

视情况而定使用什么工具

## Class

>小工具 node本地启动http服务

之前我在本地文件夹启动静态服务器 都是通过python或者vscode的`live server` 现在可以使用node去启动

- 安装[http-server](https://www.npmjs.com/package/http-server)
	 启动本地服务	

```bash
npm install http-server -g
http-server -p 8881
```

Class是构造函数的升级

#### es5版本构造函数

```javascript
function mathHeadle(x,y){
  this.y = y,
  this.x = x
}
mathHeadle.prototype.add = function (){
  return this.x+this.y
}
var m = new mathHeadle(1,2)
console.log(m.add());
```

#### es6 class语法

```javascript
class mathHeadle {
  constructor (x,y) {
    console.log("我执行了");
    this.x = x,
    this.y = y
  }  
  add(){
    return this.x+this.y
  }
}
let r = new mathHeadle(1, 2)
console.log(typeof mathHeadle); //function
console.log(mathHeadle.prototype.constructor === mathHeadle);  //true
console.log(r.__proto__ === mathHeadle.prototype);             //true

console.log(r.add());

```

es6的class和java的class太像了,构造函数一样,完全使用面向对象去写js,当然**js里面并没有class**,这是一个构造函数的语法糖

#### Class 继承

ES5版本的继承,通过绑定原型实现继承

```javascript
function Animal(){
  this.eat = ()=>{
    console.log('eat');
  }
}
function Dog (){
  this.bark = ()=>{
    console.log('dark')
  }
}
Dog.prototype = new Animal();
var ha = new Dog();
ha.bark()
ha.eat()
```

ES6版本的继承

```JavaScript
class Animal {
  constructor (name) {
    console.log(`${name}是动物`);
    this.eat()
  }
  eat(){
    console.log('我会eat');
  }
}

class Dog extends Animal {
  constructor (name) {
    super(name)
    console.log(`${name}是小狗`);
    this.say()
  }
  say () {
    console.log('我会say');
  }
}
let ha = new Dog("哈士奇");

//哈士奇是动物
//我会eat
//哈士奇是小狗
//我会say
```

java转ES6无压力 和java面向对象写法一模一样



## Promise

### ES5异步加载图片

```JavaScript
function loadimg(src, callback, fail) {
  var img = document.createElement('img');
  img.onload = function () {
    callback(img)
  }
  img.onerror = function () {
    fail()
  }
  img.src = src
}
var src = 'https://secure.gravatar.com/avatar/7337a05ac8210b3f1b522818cd31b90d?s=86';
loadimg(src, 
  function (img) {
    console.log(img.width);
  }, 
  function () {
    console.log("失败");
  }
)
```

### ES6使用Promise加载图片

```JavaScript
  function loadImg (src) {
    return new Promise((resolve,reject)=> {
      var img = document.createElement('img');
      img.onload = ()=> {
        resolve(img)
      }
      img.onerror = ()=> {
        reject("失败")
      }
      img.src = src;
    })
  }
  var src = 'https://secure.gravatar.com/avatar/7337a05ac8210b3f1b522818cd31b90d?s=86';

  var load = loadImg(src)
  load.then(res=> {   
    console.log(res.width);
  })
  load.catch(res =>{
    console.log(res);
  })
  load.then(res=> {
    console.log(res.height);
  })
```

## ES6常用功能

- let/const

```JavaScript
//ES5
var i = 10;
i = 100
console.log(i);


//ES6  
const i = 10
i = 100; //会报错  const不可重新赋值
```

- 多行字符串/模板变量

```JavaScript
//ES5
var name = 'zhangsan'
var age = 20
var html = ''
html += '<div>'
html += '<p>' + name + '</p>'
html += '<p>' + age + '</p>'
html += '</div>'
//ES6
let name = 'zhangsan'
let age = 20
let html = `
<div>
  <p>${name}</p>
  <p>${age}</p>
</div>
`
```

- 解构赋值

```JavaScript
//ES5
var obj = {a:100,b:200}
var a = obj.a
var b = obj.b
var arr = ['xxx','yyy','zzz']
var x = arr[0]
var y = arr[1]
//ES6
let obj = {a:100,b:200}
let arr = ['xxx','yyy','zzz']
let {a,b} = obj
let [x,y,z] = arr

console.log(a,b,x,y,z);
```

- 块级作用域

```JavaScript
//ES5
var obj = {a:100,b:200}
for (var item in obj) {
  console.log(item);
}
console.log(item);  //这里访问到了 因为 var的作用域问题

//ES6
var obj = {a:100,b:200}
for (let item in obj) {
  console.log(item);
}
console.log(item);  //块作用域  会报错
```

- 函数默认参数

```JavaScript
//ES5
function fn(a, b) {
  if (b == null) {
    b = 0
  }
}
//ES6
function fn(a, b = 0) { //初始值

}
//这个转es5的时候,会这样处理
function a(){
  var b = arguments.length && arguments[1] !=undefined ? arguments[1]:0
}
```

- 箭头函数

```JavaScript
//ES5
[1, 2, 3, 4, 5].map(function (item) {
  return item
})
//this问题
function fn() {
  console.log('this指向',this);
  var arr = [1,2]
  arr.map(function (){
    console.log(this);    //这里面this执行windows  因为他是匿名函数 匿名函数默认指向windows
  })
}
fn.call({a:100});
//ES6
[1, 2, 3, 4, 5].map(item => item); //假如只有一行代码,并且是返回 那么函数就会自动return
[1, 2, 3, 4, 5].map((item, index) => {
  console.log(item)
  console.log(index)
})
//this问题
function fn() {
  console.log('this指向',this);
  var arr = [1,2]
  arr.map(()=>{
    console.log(this);    //箭头函数this指向上一级 上一级this是call过来的{a:100},解决了循环遍历里面的匿名函数this指向windows的问题
  })
}
fn.call({a:100});
```







