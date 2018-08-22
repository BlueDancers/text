# JavaScript - 异步的前世今生

​	在开始接触JavaScript的时候,书上有一句话我记忆深刻,**JavaScript是一门单线程语言**,不管从什么途径去获取这个消息,前端开发者都会记住,哦~~,JavaScript是一门单线程语言,所以alert()会卡住

​	 **为什么JavaScript是一门单线程语言?因为什么原因让JavaScript出生就是单线程语言?**

​	提出问题,必然解决问题,从JavaScript出生说起,最开始JavaScript是配合html去完成对dom的控制,优化用户交互,于是问题来了

- js可以修改Dom结构
- 浏览器渲染Dom结构

假如同时执行,会发生什么,假如同时操作同一个Dom怎么办,

同理 两段js都修改Dom结构,假如同时操作Dom会发生什么

js没有执行的时候,浏览器Dom渲染,js执行的时候,浏览器Dom停止渲染,html结构树本来是就是从上往下渲染,也就是说,浏览器渲染Dom本身就是单线程,js为了避免发生Dom冲突,没有办法只能成为单线程语言

但是单线程的硬伤出现了,单线程意味着页面加载会卡顿,线程被占用浏览器卡死

```JavaScript
  var sum = 0;
    console.log("start");
    
    for (let i = 0; i < 1000000000; i++) {  //单线程占用
      sum++
    }
  console.log(sum);
  alert("100")   //单线程占用
  console.log("我终于执行啦");
```

​	例如上面的代码,浏览器资源类占用,就会发生可怕的事情,浏览器卡死,也许这里for循环不形式,但是现实开发里面同步ajax请求慢的时候页面卡死是正常事

### 同步解决方案 - 异步

说到异步,不得不谈大名鼎鼎的event-loop(事件轮询)

相信开发者一定看过[阮一峰大神对Event loop的解释](http://www.ruanyifeng.com/blog/2014/10/event-loop.html),除了图有点看不懂之外,其他都讲的很请求

这里要说一道比较老的面试题

```javascript
 setTimeout(() => {
    console.log("我是定制器");
  });
  console.log("我是主进程");
```

很简单 先执行` console.log("我是主进程");` ,为什么呢?即使因为事件轮询

当浏览器从上往下解析,遇到setTimeout,setTimeout是异步任务,浏览器就会将他放入异步任务里面,然后执行主线程的代码,当主线程的代码执行完毕,事件轮询就是去查看异步任务,于是执行了setTimeout里面的函数

这就是事件轮询

这里借阅阮一峰大神的一段博客

```
单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等着。

如果排队是因为计算量大，CPU忙不过来，倒也算了，但是很多时候CPU是闲着的，因为IO设备（输入输出设备）很慢（比如Ajax操作从网络读取数据），不得不等着结果出来，再往下执行。

JavaScript语言的设计者意识到，这时主线程完全可以不管IO设备，挂起处于等待中的任务，先运行排在后面的任务。等到IO设备返回了结果，再回过头，把挂起的任务继续执行下去。

于是，所有任务可以分成两种，一种是同步任务（synchronous），另一种是异步任务（asynchronous）。同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；异步任务指的是，不进入主线程、而进入"任务队列"（task queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。

具体来说，异步执行的运行机制如下。（同步执行也是如此，因为它可以被视为没有异步任务的异步执行。）

（1）所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。

（2）主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。

（3）一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。

（4）主线程不断重复上面的第三步。
```



​	event-loop就像哨兵一样,监视着异步队列,一旦有异步代码,就会在主线程执行完毕将异步方法,读取到主线程,在回去监视异步队列,所以event-loop也叫事件轮询



### jQuery.deferred()

无法改变 JS 异步和单线程的本质 

只能从写法上杜绝 callback 这种形式 

他是语法糖,但是解构了代码

体现了编程思想 : 开放封闭原则

> 对拓展开放,对修改封闭,      越是深入模块化,越是体现这样的实现

```javascript
　$.ajax({
　　　　url: "test.html",
　　　　success: function(){
　　　　　　alert("哈哈，成功了！");
　　　　},
　　　　error:function(){
　　　　　　alert("出错啦！");
　　　　}
　　});
```

老版本的使用的是回调函数形式,那么假如我们想修改代码,势必要对$.ajax({})里面的所有代码进行变成 这就成了

对拓展封闭,对修改封闭,这是对在开发上非常不友好的变成方式,牵一发而动全身



当deferred出现后,ajax变成了链式调用

```JavaScript
　$.ajax("test.html")

　　.done(function(){ alert("哈哈，成功了！"); })

　　.fail(function(){ alert("出错啦！"); });
```

这里明显可以看到对修改封闭,对拓展开放

假如我们想拓展

```JavaScript
.done(function(){ alert("第二个回调函数！");} );
```

完全不影响之前的代码,代码耦合性低

在我最开始接触jquery的时候,ajax有三种写法

```javascript
$.ajax({
    url,
    success: function (){
        //成功回调
    },
    error: function (){
        //失败回调
    }
})
```

```javascript
$.ajax({url})
.done(()=> {
    //成功回调
})
.fail((0=> {
    //失败回调
})
```

```javascript
$.ajax({url})
.then(()=> {
    //成功回调
},
()=> {
    //失败回调
})
```

刚开始不解,为什么第一种是淘汰的写法.再后来渐渐深入才发现回调的局限性,

- 耦合性太高,
- 不支持链式调用,
- 不利于维护,回调里代码过于复杂会产生风险

这让我想探究一下,如何实现.done.fail,所以就不得不说jQuery的deferred

[阮一峰大神对deferred的讲解](http://www.ruanyifeng.com/blog/2011/08/a_detailed_explanation_of_jquery_deferred_object.html)

在使用jq我们可以使用deferred帮助我们控制异步

```JavaScript
function waitHandle() {
      var dtd = $.Deferred()
      var wait = function (dtd) {
        var task = function () {
          console.log("执行完成");
          dtd.resolve()
        }
        setTimeout(task, 2000);
        return dtd.promise()  //返回pomise对象 防止在回调里面执行控制回调的函数 例如reject()
      }
      return wait(dtd) //返回wait的执行结果
    }
    waitHandle()
      .then(function () {
        console.log(1);
      }, () => {
        console.log("hahah");

      })
      .then(() => {
        console.log(2);
      }, () => {
        console.log("hahah");
      })
```

这里我就不赘述了,前人已经全面的总结了;这里明显看到,这是已经初步提出了promise的概念,对日后的标准建立的基础

### Promise

对于低版本浏览器,想要使用第三方库,可以使用[bluebird.js](https://cdn.bootcss.com/bluebird/3.5.1/bluebird.min.js),对promise进行实现

老生长谈了,开发必须要会

> 这是jq的deferred的进阶版啊,,开发者卸磨杀驴,竟然说jq淘汰了,一叶障目

```JavaScript
  function loadImg(src){
    return new Promise((resolve,reject)=> {
      var img = document.createElement('img')
      img.onload = ()=> {
        resolve(img)
      }
      img.onerror = ()=> {
        reject("图片加载失败")
      }
      img.src = src
    })
  }

 var load1 = loadImg("https://secure.gravatar.com/avatar/7337a05ac8210b3f1b522818cd31b90d?s=86")
 var load2 = loadImg("https://avatars2.githubusercontent.com/u/33681955?s=460&v=4")
 load1.then(res=> {
   console.log(res.width);
   return load2   //后面的是load2的回调  对于请求串联 可以这么写 
 }).then(res=> {
   console.log(res.width);
 }).catch(res=> {
   console.log(res);
 })
```

Promise.all 

> 接受一个Promise对象的数组,待全部完成后,统一执行then,失败一个catch

```JavaScript
Promise.all([load1,load2])
  .then(res=> {
	console.log(res);
  })
  .catch (res=> {
    console.log(res); //假如有一个失败就会返回catch
  })
```

Pormise.race

> 接收一个包含多个Promise对象的数组,主要完成一个就执行then,失败一个catch

```JavaScript
Promise.race([load1, load2])
	.then(res => {
		console.log(res); //成功一个立马返回
	})
    .catch(res => {
         console.log(res); //假如有一个失败就会返回catch
     })
```

#### 在Peomise上还要说一点就是状态变化

三种状态: pending(待定的) fulfilled(满足的) rejected(拒绝) 

规则: **状态变化不可逆**

在初始状态下,Promise是pending 只有两种情况

- Promise执行成功 pending 成功状态变成fulfilled
- Promise执行成功 pending 失败状态变成rejected

了解一下

### async/await 

then是将callback进行拆分了

关于async/await 其实网上资料也挺多的,将异步代码同步进行,取消了.then这样的写法,回归本源

```JavaScript
let load = async function() {
  let result1 = await loadImg(load1)
  console.log(result1);
  let result2 = await loadImg(load2)
  console.log(result2);
}
```



##### 总结一下JavaScript异步的前世今生

- JavaScript是单线程,两段js不可以同时进行
- 原因是为了避免 DOM的渲染冲突
- 异步就是"无奈的解决方案",但是初期有很多问题
- 异步是event loop实现的,事件轮询 异步方法 进入的异步队列,主线程执行完毕才会去执行异步队列里面的代码
- jQuery Deferred,改变了异步只能由callback操作这个问题
- deferred和Promise 有区别的 Promise对deferred进行优化 ,让Promise对象只能被动监听结果,避免冲突
- Promise的出现成为了对异步的最佳解决方案相对于callback,极大的降低了耦合性
- async/await 配合Promise 成为终极解决方案,但是ES7为成为正式版,未来仍需参考



### 异步的解决方案

- 回调函数 - callback
- 初代链式 -  deferred (我觉得这个有必要提出来,改变js异步编程的关键)
- 成熟方案 - promise
- 终极方案 - async/await + promise
- 迭代器  Generator(同样实现异步,但是被async/await替代) 











