# 作用域

前言:

​	这是每天看github上面的一位大佬 [冴羽](https://github.com/mqyqingfeng/Blog)[的博客 自己加以自己的理解总结的

#### `作用域` 是指程序源码中定义变量的区域

作用域决定了如何查找变量,也就是度额定当前执行代码对变量的访问权限

JavaScript 使用的是 `词法作用域` (lexical scoping)  也就是静态作用域

## 静态作用域与动态作用域

因为JavaScript采用的是词法作用域,函数的作用域在函数定义的时候就决定了

而与词法作用域相对的是动态作用域

函数的作用域是在函数被调用的时候决定的

```javascript
var value = 1;

function foo() {
    console.log(value);
}

function bar() {
    var value = 2;
    foo();
}

bar();
//这里打印的是什么 1? 2?
```

静态作用域:

​	执行 foo()函数内部作用域找value 找不到 在全局变量里面找 找到了 打印出 1

动态作用域

​	执行 foo() 函数内部作用域找value 找不到 进入调用函数(bar)作用域 找到了value 打印  2

因为js是静态作用域所以这里是1

这里参照《JavaScript权威指南》 P183 

```JavaScript
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f();
}
checkscope();
```

假如理解了JavaScript的静态作用域 可以很轻易的判断出 这里打印的是 '局部变量' local scope



那么这里我们返回函数内嵌套的一个函数对象 而不是直接返回结果 

```JavaScript
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}
checkscope()();
```

依旧是 "local scope"

JavaScript函数的执行用到了`作用域链`,这个作用域链是函数定义的时候创建,嵌套的函数f()定义在这个作用域链上面,里面的变量scope一定是局部变量,,不管什么情况下执行f() 局部变量的绑定依旧有效,,因此打印出来依旧是

local scope

 



