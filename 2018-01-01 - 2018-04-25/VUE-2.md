# VUE-2

今天第二天学习Vue  晚上兴致勃勃想试试 webpack 配置 看官方文档做 但是总是失败报错,到现在都没找到没什么;

明天在看看百度百度,今年这几天几天解决一下 

开始今天的Vue学习总结吧

- Vue实例与数据绑定(接上一个)

Vue本身也代理data里面的所有属性

```javascript
<div id="app1">
        <input type="text" v-model="my">
        {{ my }}
</div>

var app1 =  new Vue({
    el:"#app1",
    data:{
        my:"欢迎来到Vue"
    }
})
console.log(app1.my)     //欢迎来到Vue
console.log(app1.$el)    //div#app1对象
```

> 上面例子也看出来Vue本身代理data里面的所有属性 el 可用$el来访问

除了显式的声明之外,也可以指向一个已有的变量,并且他们之间默认建立了双向绑定,当修改其中一个,就会一起变化

```javascript
<div id="app2">{{ a }}</div>

var app2 = new Vue({
    el:"#app2",
    data:datas,
    created:function(){
        console.log(this.a);    //1
    },
    mounted () {
        console.log(this.$el);  //div#app2
        this.a = 3;             //3
    }
})
console.log(app2.a);  //1
app2.a = 2;
console.log(app2.a);  //2  vue属性发生变化
```

> 这里出现了created mounted 是什么呢
>
> 每个Vue实例创建出来,都会经历一系列的初始化过程,同时也会调用相应的生命周期钩子,我们可以利用这些钩子,在合适的时期来执行我们的逻辑
>
> 