# 基于PromiseA+，从零实现Promise

> ECMAScript6中promise是划时代的API，他的出现解决了一直困扰前端开发者的异步问题，从此面对异步回调，我们有了更好的武器

![1_Bf17KrH3fJo09LTKHRYJcw](http://www.vkcyan.top/1_Bf17KrH3fJo09LTKHRYJcw.jpeg)

## 前言

​	面对天天都能见面的promise，不知道你是否有以下的一些问题

1. 我们new Promise((resolve,reject) =>{})，resolve，reject都是哪来的？
2. 为什么resolve之后才会执行then或者catch？
3. 为什么可以链式.then，并且还都会按同步进行？
4. 为什么执行promise.resolve()，后面的函数就支持promise了？
5. promise.all是如何实现的？
6. 是否被面试题中的promise题目迷惑的头晕目眩？

让我们了解Promise的实现原理，所有问题答案自然浮出水面~



​	promise在潜移默化之间帮助我们简化了复杂的异步代码，降低逻辑难度，说promise是划时代的异步解决方案也不为过，他很好的提现了**开放封闭原则**，解决耦合性过高的问题

​	说一个小知识，es6发布之前类似prmise的异步方案已经存在，在jquery的ajax中已经应用了类似的技术方案的jQuery.deferred()，感兴趣的同学可以去了解一下

```javascript
$.ajax("test.html")
.done(function(){ alert("哈哈，成功了！"); })
.fail(function(){ alert("出错啦！"); });
```

<img src="http://www.vkcyan.top/FqgRN77OCKkvYc0jP_nVYjch_kCx.png" style="zoom:33%;" />



## 简化版Primise

> 基础版本的实现虽然简单，但是解释了很多问题
>
> 建议将代码复制到本地，通过断点的方式查看代码的执行流程

````javascript
const PEDDING = 'pending' // 等待状态
const FULFILLED = 'fulfilled' // 成功状态
const REJECTED = 'rejected' // 失败状态

class APromise {
  constructor(executor) {
    this.status = PEDDING // 初始化状态
    this.value = undefined // 成功的数据
    this.reason = undefined // 失败的原因
    this.onFulfilledCallbacks = [] // 保存成功状态的回调队列
    this.onRejectCallbacks = [] // 保存失败状态的回调队列

    const resolve = (data) => {
      if (this.status == PEDDING) {
        this.status = FULFILLED
        this.value = data
      }
      this.onFulfilledCallbacks.map((e) => e())
    }

    const reject = (err) => {
      if (this.status == PEDDING) {
        this.status = REJECTED
        this.reason = err
      }
      this.onRejectCallbacks.map((e) => e())
    }
    try {
      executor(resolve, reject)
    } catch (error) {
      rejected(error)
    }
  }

  then(onFulfilled, onRejected) {
    if (this.status == FULFILLED) {
      onFulfilled(this.value)
    }
    if (this.status == REJECTED) {
      onRejected(this.reason)
    }
    if (this.status == PEDDING) {
      this.onFulfilledCallbacks.push(() => {
        onFulfilled(this.value)
      })
      this.onRejectCallbacks.push(() => {
        onRejected(this.reason)
      })
    }
  }
}

new APromise((resolve, reject) => {
  console.log('开始回调')
  setTimeout(() => {
    console.log('执行回调')
    resolve(11111)
  }, 1000)
}).then(
  (value) => {
    console.log('成功回调', value)
  },
  (err) => {
    console.log('失败回调', err)
  }
)
````



### 代码运行流程

1. 初始化APromise，开始执行class中的constructor
2. 在constructor中初始化当前promise的一些状态值以及resolve，reject函数
3. 最后将resolve函数与reject函数以参数的形式给promise的回调函数，同时执行函数，打印**开始回调**
4. 运行setTimeout，并且开始解析then函数
5. 如果是成功，或者失败状态，直接执行回调，如果是pedding状态，则存储成功与失败回调函数
6. 1s之后，setTimeout执行完毕，resolve执行触发constructor中的resolve
7. resolve函数中执行之前初始化.then时候存储的回调函数，打印 **成功回调，11111**或者**失败回调**

### 逻辑流程图

![基础版本逻辑流程流程图](http://www.vkcyan.top/Fn85w7D8S4hjZbpJpXQTpFLbUeKZ.png)



基础版本的实现，不支持链式调用，不支持then穿透，不支持catch，只实现了最基础的逻辑

我们在这里解答一下前言中提出的问题

1. 我们new Promise((resolve,reject) =>{})，resolve，reject都是哪来的？

   答：new的时候执行Promise中的constructor，声明了resolve与reject，并且在执行Promise回调函数的时候将参数传入到函数中

2. 为什么resolve之后才会执行then或者catch？

   答：因为在初始化阶段，pedding状态下，我们存储了当前Promise的成功与失败回调，当执行resolve的时候，当前Promise的状态发生变化，开始执行之前存储的回调函数，如果不是padding，则立即执行回调函数

后面的问题我们暂时还无法解释，但是随着我们进一步的实现，答案都会浮出水面



## 正式版（链式回调，then值穿透，.catch  等）

### 链式回调

​	我们一般写promise都会写多个.then，在多个.then中我们将异步代码变成同步代码块，但是我们基础版本的promise中无法显示链式调用，因为执行.then之后函数没有任何返回值，自然不会存在.then方法，在这个思路上，我们对promise的.then解析过程进行改写,尝试让其支持链式调用



1. 每次.then中都需要返回一个promise来触发下一个.then
2. 对then回调函数的各种情况需要进行判断，例如。then中返回的是一个string还是返回了一个promise，如果是则需要增加链式回调触发父级的resolve
3. then函数执行需要通过settimeout进行包裹，让其加入宏任务

```javascript
/**
 * then可能返回的是普通值,也可能返回一个promise，这里的写法参照PromiseA+标准进行完成
 * 逻辑较为复杂，可以先看静态变量代码逻辑，再看针对promise的处理逻辑
 * @param {*} promise 当前promise
 * @param {*} x 当前返回值
 * @param {*} resolve 成功回调
 * @param {*} reject 失败回调
 */
const resolvePromise = (promise, x, resolve, reject) => {
  if (promise === x) {
    return reject(new TypeError('检测到promise的循环调用')) // 'Chaining cycle detected for promise #<Promise>'
  }
  let called = false
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    try {
      const then = x.then
      if (typeof then === 'function') {
        then.call(
          x,
          (y) => {
            if (called) return
            called = true
            resolvePromise(promise, y, resolve, reject)
          },
          (r) => {
            if (called) return
            called = true
            reject(r)
          }
        )
      } else {
        resolve(x)
      }
    } catch (err) {
      if (called) return
      called = true
      reject(err)
    }
  } else {
    resolve(x)
  }
}

then(onFulfilled, onRejected) {
  let apromise = new APromise((resolve, reject) => {
    if (this.status === FULFILLED) {
      setTimeout(() => {
        try {
          const x = onFulfilled(this.value)
          resolvePromise(apromise, x, resolve, reject)
        } catch (err) {
          reject(err)
        }
      }, 0)
    }
    if (this.status === REJECTED) {
      setTimeout(() => {
        try {
          const x = onRejected(this.reason)
          resolvePromise(apromise, x, resolve, reject)
        } catch (err) {
          reject(err)
        }
      }, 0)
    }
    if (this.status === PEDDING) {
      this.onFulfilledCallbacks.push(() => {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value)
            resolvePromise(apromise, x, resolve, reject)
          } catch (err) {
            reject(err)
          }
        }, 0)
      })
      this.onRejectCallbacks.push(() => {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason)
            resolvePromise(apromise, x, resolve, reject)
          } catch (err) {
            reject(err)
          }
        }, 0)
      })
    }
  })
  return apromise
}
```

经过上面的内部promise处理，函数的运行逻辑发生了很大的变化

我们直观看到的逻辑是

![外在的运行逻辑](http://www.vkcyan.top/FvuUJMgXm4Pf2DgVK7bT8uolxp0i.png)

​	实际的运行逻辑是每次.then中都会再次创建一个Promise，以便于下次进行调用，并且对.then的回调函数进行处理，区分.then中返回了Promise对象还是普通对象，这样的思路实现了.then链式调用

![实际的运行逻辑](http://www.vkcyan.top/FlzdXO2ovUK36pdn5BGUpMVzNcsV.png)

当then中存在return promise的情况，逻辑会发生一些变化，这些主要体现在resolvePromise函数中

![Snipaste_2021-06-29_09-23-14](http://www.vkcyan.top/Fl5vlJvqk-NpsXmQY4cajAGo0VQp.png)



### then值穿透

首先查看一种场景

```javascript
new APromise((resolve, reject) => {
  resolve(11111);
})
  .then()
  .then()
  .then(data => {
    console.log('成功回调', data);
  }, err => {
    console.log('失败回调', err);
  })
```

​	这里我们就会发现，then的回调函数都不存在，自然无法将resolve的值传递到最下面的.then中，所以这里我们需要对这种情况做一些处理

```javascript
then(onFulfilled, onRejected) {
  // 值穿透问题 如果then是空的话,就手动的将上一个resolve的值带入到下一个then中
  onFulfilled = typeof onFulfilled == 'function' ? onFulfilled : (data) => data
  onRejected = typeof onRejected == 'function' ? onRejected : (err) => { throw err }
  let apromise = new APromise((resolve, reject) => {
    // ....
  })
  return apromise
}
```

当我们对then值中的回调函数进行处理后，实际运行的函数变成

```javascript
new APromise((resolve, reject) => {
  resolve(11111);
})
  .then((data) => data)
  .then((data) => data)
  .then(data => {
    console.log('成功回调', data);
  }, err => {
    console.log('失败回调', err);
  })
```

这样便实现了then穿透问题



### .catch

目前我们错误回调在.then的第二个参数中，并不支持.catch的写法，我们可以在原型链上面增加catch方法

> catch其实也是对.then方法的封装，只不过不存在成功回调，只有失败回调

```javascript
APromise.prototype.catch = function (errCallback) {
  return this.then(null, errCallback)
}
```



### .finally

> 由于finally无法预知promise的最终状态，所以finally的回调函数中不接受任何参数，他仅用于无论最终结果都要执行的情况
>
> 需要注意的一点是如果finally中存在Promise，这需要等待promise执行完毕

````javascript
APromise.prototype.finally = function (callBack) {
  return this.then(
    (data) => {
      return APromise.resolve(callBack()).then(() => data)
    },
    (err) => {
      return APromise.reject(callBack()).then(() => {
        throw err
      })
    }
  )
}
````

#### 关于finally的小知识

```javascript
Promise.resolve(2).then(() => {}, () => {}) // 此时传递下去的是undefined

Promise.resolve(2).finally(() => {}, () => {}) // 传递下去的是 2，finally本身未接收参数，但是将上次的回调数据放入到了下次的回调
```



### Promise.resolve()

> 调用Promise.resolve()就会返回一个真实的promise，并且直接返回成功回调

```javascript
APromise.resolve = function (data) {
  return new APromise((resolve, reject) => {
    resolve(data)
  })
}
```



### Promise.reject()

> 调用Promise.resolve()就会返回一个真实的promise，并且直接返回失败回调

```javascript
APromise.reject = function (data) {
  return new APromise((resolve, reject) => {
    reject(data)
  })
}
```



### Promise.race()

> 当调用race方法的时候，必须传入一个数组，数组中可以存在不同类型以及函数类型，在初始化过程中会再次创建一个promise，当数组中的某个promise对象最先执行的时候，触发自身的.then在回调函数中触发了race本身的resolve，后面执行完毕之后，因为race的状态已经发生了变化，自然无法再执行

```javascript
/**
 * 同时执行多个promise,但是最返回最先返回的结果
 * @param {*} promiseList
 * @returns
 */
APromise.race = function (promiseList) {
  if (!Array.isArray(promiseList)) {
    throw new TypeError('必须传递数组')
  }
  return new APromise((resolve, reject) => {
    promiseList.forEach((item) => {
      if (item && typeof item.then == 'function') {
        item.then(resolve, reject)
      } else {
        resolve(item)
      }
    })
  })
}


let p1 = new APromise((resolve, reject) => {
  setTimeout(() => {
    resolve('ok1')
  }, 3000)
})

let p2 = new APromise((resolve, reject) => {
  setTimeout(() => {
    reject('ok2')
  }, 2000)
})

APromise.race([1, p1, p2]).then(
  (data) => {
    console.log('success1', data)
  },
  (err) => {
    console.log('error1', err)
  }
)
```





### Promise.all()

> all的实现逻辑非常简单，all的时候创建一个promise，内部记录当前传入的列表状态成功的单个数据，当所有的then数据都成功，调用自己的resolve，当有一个失败的时候，调用自己的reject

```javascript
/**
 * 同时执行多个promise,会等待每次promise的结果,最后一起返回,有一个失败,这都不会返回
 * @param {} promiseList 
 * @returns 
 */
APromise.all = function (promiseList) {
  if (!Array.isArray(promiseList)) {
    throw new TypeError('必须是数组')
  }
  return new APromise((resolve, reject) => {
    const resulteArr = []
    const len = promiseList.length
    let currentIndex = 0
    const getResult = (key, val) => {
      resulteArr[key] = val
      if (++currentIndex == len) {
        resolve(resulteArr)
      }
    }
    for (let i = 0; i < len; i++) {
      const val = promiseList[i]
      if (val && typeof val.then === 'function') {
        val.then((data) => {
          getResult(i, data)
        }, reject)
      } else {
        getResult(i, val)
      }
    }
  })
}

let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('ok1');
  }, 1000);
})

let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('ok2');
  }, 2000);
})

Promise.all([1,2,3,p1,p2]).then(data => {
  console.log('success', data);
}, err => {
  console.log('error', err);
})
```



### Promise.any()

> 实现方法与all非常相似，是all完全相反的情况

```javascript
/**
 * any与all完全相反,只要有个一个成功就会返回成功,全部失败才会返回失败
 * @param {*} promiseList
 * @returns
 */
APromise.any = function (promiseList) {
  if (!Array.isArray(promiseList)) {
    throw new TypeError('必须是数组')
  }
  return new APromise((resolve, reject) => {
    const resultArr = []
    const len = promiseList.length
    let currentIndex = 0
    const getResult = (index, err) => {
      resultArr[index] = err
      if (++currentIndex == len) {
        reject(resultArr)
      }
    }
    promiseList.map((res, index) => {
      if (res && typeof res.then == 'function') {
        res.then(resolve, (err) => {
          getResult(index, err)
        })
      } else {
        resolve(res)
      }
    })
  })
}

let p3 = new APromise((resolve, reject) => {
  setTimeout(() => {
    reject('err3')
  }, 1000)
})

let p4 = new APromise((resolve, reject) => {
  setTimeout(() => {
    reject('err4')
  }, 2000)
})

APromise.any([p3, p4]).then(
  (data) => {
    console.log('success', data)
  },
  (err) => {
    console.log('error', err)
  }
)
```



### Promise.allSettled()

> allSettled是ES2020加入的工具方法，一句话总结：他是永远都不会失败处理的promise.all

```javascript
/**
 * 保存所有的成功与失败
 * @param {*} promiseList 
 * @returns 
 */
APromise.allSettled = function (promiseList) {
  if (!Array.isArray(promiseList)) {
    throw new TypeError('必须是数组')
  }
  return new APromise((resolve, reject) => {
    const resultArr = []
    const len = promiseList.length
    let currentIndex = 0
    const getResult = (index, data, status) => {
      if (status == FULFILLED) {
        resultArr.push({
          status: status,
          value: data,
        })
      }
      if (status == REJECTED) {
        resultArr.push({
          status: status,
          reason: data,
        })
      }
      if (++currentIndex == len) {
        resolve(resultArr)
      }
    }
    promiseList.map((res, index) => {
      if (res && typeof res.then == 'function') {
        res.then(
          (data) => {
            getResult(index, data, FULFILLED)
          },
          (err) => {
            getResult(index, err, REJECTED)
          }
        )
      } else {
        getResult(index, res, FULFILLED)
      }
    })
  })
}

let p1 = new APromise((resolve, reject) => {
  setTimeout(() => {
    resolve('ok1')
  }, 3000)
})
let p2 = new APromise((resolve, reject) => {
  setTimeout(() => {
    resolve('ok2')
  }, 2000)
})

let p3 = new APromise((resolve, reject) => {
  setTimeout(() => {
    reject('err3')
  }, 1000)
})

let p4 = new APromise((resolve, reject) => {
  setTimeout(() => {
    reject('err4')
  }, 2000)
})

APromise.allSettled([1, 2, 3, p1, p2, p3, p4]).then((res) => {
  console.log('success', res)
})
```



## 测试函数

首先需要安装测试脚本 **npm install -g promises-aplus-tests**

测试命令 **promises-aplus-tests xxxx.js**

> 测试文件末尾需要加入如下代码
>
> 不存在错误则为符合promiseA+标准

```javascript
APromise.defer = APromise.deferred = function () {
  let dfd = {}
  dfd.promise = new APromise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}

module.exports = APromise
```



## 源码地址

[github-promise](https://github.com/vkcyan/code-fragment/tree/master/promise)

可以通过chrome DevTool或者Vscode Debug的方式，加上断点，查看代码运行流程，便于理解promise运行逻辑

## 参考链接

[重学Promise，基于A+规范实现它](https://juejin.cn/post/6968843434006315016#heading-12)，感谢掘金@关er的promise解读文章，大大降低了深入promise的门槛

[PromiseA+规范](https://promisesaplus.com/)

[MDN-Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

[45道Promise面试题](https://juejin.cn/post/6844904077537574919)



