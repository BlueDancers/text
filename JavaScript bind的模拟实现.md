# JavaScript bind的模拟实现

bind:根据MDN上面的解释

>  bind() 方法会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数。

由此我们可以首先得出 bind 函数的两个特点： 

1. 可以传入参数
2. 返回一个函数

```javascript
var foo = {
    value: 1
}
function bar(){
    console.log(this.value)
}
var bindFoo = bar.bind(foo)   //返回一个函数
bindFoo()
```

关于指定this的指向 我们可以使用call apply 来实现,我们只要返回一个函数出去就可以实现类似bind的效果

```JavaScript
Function.prototype.bind2 = function (context) {
    var self = this;
    return function () {    //这里返回一个函数
        return self.apply(context);
    }
}
```

传参的实现

bind的传参并不是只能在bind的时候传参数,在执行bind的返回函数的时候也可以传参,这应该如何实现?

```JavaScript
var foo = {
    value: 1
};

function bar(name, age) {
    console.log(this.value);
    console.log(name);
    console.log(age);

}

var bindFoo = bar.bind(foo, 'daisy');
bindFoo('18');
// 1
// daisy
// 18
```

这里在返回结果处有传入了一个参数,这应该怎么实现呢

```JavaScript
Function.prototype.bind2 = function(context) {
  var self = this //这里bar调用他,所以指向bar
  var args = Array.prototype.slice.call(arguments, 1) //这里参数是 { value: 1 } "daisy" ,很明显 后面的参数是我们想要的,所以用[].prototype.slice转数组拿到参数daisy
  return function() {
    var bindArgs = Array.prototype.slice.call(arguments)  //return出去的对象用于执行函数的时候 获取到参数,也就是说这里获取的"18"
    return self.apply(context, args.concat(bindArgs))
    //这里context foo 第一个参数 args是第一个参数 bindArgs是第二个参数 进行拼接 
    //self指向bar 最后变成了 return出去一个 
    //bar.apply(foo,["daisy",'18'])
  }
}
var foo = {
  value: 1
}
function bar(name, age) {
  console.log(this.value)
  console.log(name)
  console.log(age)
}

var bindFoo = bar.bind2(foo, 'daisy')
bindFoo('18')

```

//这里多多少少利用了js的特性,相信看过上面代码都能感觉到

## 构造函数效果的模拟实现

一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。 

```JavaScript
var value = 2;

var foo = {
    value: 1
};

function bar(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}

bar.prototype.friend = 'kevin';

var bindFoo = bar.bind(foo, 'daisy');

var obj = new bindFoo('18');
// undefined
// daisy
// 18
console.log(obj.habit);
console.log(obj.friend);
// shopping
// kevin
```

尽管在全局和 foo 中都声明了 value 值，最后依然返回了 undefind，说明绑定的 this 失效了，如果大家了解 new 的模拟实现，就会知道这个时候的 this 已经指向了 obj。 

们可以通过修改返回的函数的原型来实现 

````JavaScript
Function.prototype.bind2 = function (context) {
  var self = this; //bar对象
  var args = Array.prototype.slice.call(arguments, 1); //"daisy"

  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments);
    //this 是 bar 假如new bindFoo()  bindFoo 就是 bar的构造函数
    // 当作为构造函数时 ，this 指向实例，此时结果为 true，将绑定函数的 this 指向该实例，可以让实例获得来自绑定函数的值
    // 以上面的是 demo 为例，如果改成 `var obj = bindFoo('18')`，实例只是一个空对象，将 null 改成 this ，实例会具有 habit 属性
    // 当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
    console.log(this instanceof fBound);
    return self.apply(this instanceof fBound ? this : context, args.concat(bindArgs));
  }
  // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
  fBound.prototype = this.prototype; //this指向bar 为了让 fBound 构造的实例能够继承绑定函数的原型中的值
  return fBound;
}
````





最终代码

```JavaScript
Function.prototype.bind2 = function (context) {

    if (typeof this !== "function") {
      throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fNOP = function () {};

    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    }

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
}
```

基本和源码很相似

bind的实现很难理解=====











