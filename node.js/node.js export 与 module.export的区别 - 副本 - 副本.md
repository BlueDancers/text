# node.js export 与 module.export的区别

题外话 : 这两天准备上手 node.js 因为现在的使用 vue写的网站没有后端可以用,也不想用java做后端接口

开始学习的node.js

#####今天主要谈谈node.js上面 export 与 module.export的区别

首先来模拟一下  export  module.export

````JavaScript
let module = new Object();   


let export = module.export   //这一步建立的 module.export 与 export 的关联
export.name = '李四'
console.log(export.name)             //李四
console.log(module.export.name)      //李四
//因为函数是引用类型 所以 module里面的值变了

````

看起来没什么奇怪的是的 export 和 module的用法在传递非对象的用法是相同的 

请看这个例子

```
let module = new Object();   
module.export = new Object({name:'张三'})
let export = module.export   //这一步建立的 module.export 与 export 的关联
但是给export直接赋值呢?
export = {name = "李四"}      //直接赋对象
console.log(export.name)             //李四
console.log(module.export.name)      //张三
这相当与export 指向了新的对象 与 moudle.export的联系被新的{}取代了
这个例子很好的解释为什么export不可以直接赋值对象 
在require 引用的 export 实际上是 module.export 所以 找不到 export赋值的对象 
```

一句话:export 与 export default 的区别是 export default 是相对于 整个modal 导出 