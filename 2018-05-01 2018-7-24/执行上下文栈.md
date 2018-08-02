# JavaScript执行上下文

一直一来,对JavaScript的代码执行顺序,大部分人都会认为 `顺序执行`

```JavaScript
var foo = function () {

    console.log('foo1');

}

foo();  // foo1

var foo = function () {

    console.log('foo2');

}

foo(); // foo2
```

这里看起来似乎都很合理,但是 没有想象的那么简单

在看这一段代码

```JavaScript
function foo() {

    console.log('foo1');

}

foo();  

function foo() {

    console.log('foo2');

}

foo(); 
```

两次都会打印出foo2 

这里涉及到两个问题   变量提升(之前写过) 函数提升

JavaScript引擎并不是一行一行分析 执行程序 而是一段一段的执行 ,当执行一段代码的时候，会进行一个“准备工作”,变量提升 函数提升 就是准备工作

这一段一段JavaScript是怎么划分的?

## 可执行代码

这就要说到 JavaScript 的可执行代码(executable code)的类型有哪些了？

就三种，全局代码、函数代码、eval代码(转义字符串为对象)。

举个例子，当执行到一个函数的时候，就会进行准备工作，这里的“准备工作”，
让我们用个更专业一点的说法，就叫做"执行上下文(execution context)"。

## 执行上下文栈

接下来问题来了，我们写的函数多了去了，如何管理创建的那么多执行上下文呢？

所以 JavaScript 引擎创建了执行上下文栈（Execution context stack，ECS）来管理执行上下文

为了模拟执行上下文栈的行为，让我们定义执行上下文栈是一个数组：

```
ECStack = [];
```

试想当 JavaScript 开始要解释执行代码的时候，最先遇到的就是全局代码，

所以初始化的时候首先就会向执行上下文栈压入一个全局执行上下文，

我们用 `globalContext` 表示它，并且只有当整个应用程序结束的时候，

ECStack 才会被清空，所以程序结束之前， ECStack 最底部永远有个 globalContext：

```
ECStack = [
    globalContext     //全局代码
];
```

现在 JavaScript 遇到下面的这段代码了：

```
function fun3() {
    console.log('fun3')
}

function fun2() {
    fun3();
}

function fun1() {
    fun2();
}

fun1();
```

既然是栈,必定是先进后出 上面这段代码可以这样处理

```JavaScript
//上面代码执行完毕
//遇到fun1执行 加入栈
ECStack.push(<fun1> functionContext);
//fun1里面执行fun2 加入栈
ECStack.push(<fun2> functionContext);
//fun1里面执行fun2里面执行fun3 加入栈 
ECStack.push(<fun3> functionContext);
//fun3里面执行代码 fun3 弹出栈
ECStack.pop();
//fun2 执行完毕 弹出栈
ECStack.pop();
//fun1 执行完毕 弹出栈
ECStack.pop();
// javascript接着执行下面的代码，但是ECStack底层永远有个globalContext
```

## 解答思考题

上一篇博客讲了静态作用域的问题,那么使用 执行上下文栈的怎么处理呢?

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

```
ECStack.push(<checkscope> functionContext);
ECStack.push(<f> functionContext);
ECStack.pop();
ECStack.pop();
```

```
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

```
ECStack.push(<checkscope> functionContext);
ECStack.pop();
ECStack.push(<f> functionContext);
ECStack.pop();
```

虽然结果一样但是代码的执行却并不一样

为了更详细讲解两个函数执行上的区别，我们需要探究一下执行上下文到底包含了哪些内容

今后更新

