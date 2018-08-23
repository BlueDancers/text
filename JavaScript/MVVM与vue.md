# MVVM与Vue

在谈vue,mvvm之前一样的,先说说jquery时代的和现在的mvvm的区别

### jQuery与Vue的区别

- 数据和视图的分离,也就是解耦
- 以数据驱动视图,只关心数据变化,dom操作被封装

### MVVM的理解

- MVC

[MVC](https://draveness.me/mvx)这个岁数比我都大的架构,网上的资料太多了,相对的MVC的架构也有很多种,但是有一点不变

(相对来话说,我个人感觉这样的构架对于B/S架构更加合理)

![](http://on7r0tqgu.bkt.clouddn.com/FkmRRl55zrAkFKAklb2mDMCiqOIc.png )

各种架构模式的作用就是分离关注,将属于不同模块的功能分散到合适的位置中,同时尽量降低各个模块的相互依赖并且减少需要联系的胶水代码

- MVVM VM即使ViewModel

model - 模型,数据

view 视图,模板
ViewModel 连接model和view

![](http://on7r0tqgu.bkt.clouddn.com/FrLFse-8tNj6Zu-OGJIUfQJnzbUo.PNG )

MVVM不能算是创新,因为很大程度上面和MVC是相似的,但是ViewModel是一种创新

Vue可以通过事件绑定的方式影响到model

model可以通过数据绑定影响到Vue

View 和 Model 之间并没有直接的联系，而是通过ViewModel进行交互。 

MVVM三要素

- 响应式 vue如何监听data的每个属性
- 模板引擎 vue的模板如何被解析,指令如何处理
- 渲染 vue模板是如何被渲染成html的,以及渲染过程

#### 响应式

```JavaScript
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>

<body>
  <p>Object.defineProperty test</p>
  <script>
    var obj = {}
    var _name = "张三";
    Object.defineProperty(obj, "name", {    //监听属性
      get() {
        console.log("获取");
        return _name;
      },
      set(newVlaue) {
        console.log("设置");
        _name = newVlaue;
      }
    })
  </script>
</body>

</html>
```

对Vue响应式的简单模拟实现

````html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>

<body>
  <script>
    var mv = {}
    var data = {
      name: '张三',
      age: 20
    }
    for (const key in data) {
      console.log(key);
      Object.defineProperty(mv, key, {
        get() {
          console.log("获取");
          return data[key]
        },
        set(newVal) {
          console.log("赋值");
          data[key] = newVal
        }
      })
    }
  </script>
</body>

</html>
````

响应式关键是`defineProperty`,以及将data属性进行代理到vm上面去

#### 模板解析

模板的本质是字符串,但是有一定的逻辑(v-for..)

[with](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/with)

在vue源码里面的10831行 或者搜索`code.render `打印出来看一下就知道了render渲染后的模板

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <!-- <script src="https://cdn.bootcss.com/vue/2.5.16/vue.js"></script> -->
  <script src="vue.js"></script>
</head>

<body>
  <div id="app">
    <p>{{ price }}</p>
  </div>

  <script>
    var vm = new Vue({
      el: "#app",
      data: {
        price: 100
      }
    })


    //render函数
    function render() {
      with(this) { //this就是vm
        return _c(
          'div', {
            attrs: {
              'id': 'app'
            }
          }, [
            _c('p', [
              _v(_s(price))
            ])
          ]
        )
      }
    }

    //不使用with的情况
    function render() {
      return vm._c( //createElement创建节点
        'div', {
          attrs: {
            'id': 'app'
          }
        }, [
          vm._c('p', [
            vm._v(vm._s(vm.price)) //vm._v创建文本节点 vm._s  VM.toString
          ])
        ]
      )
    }
  </script>
</body>

</html>
```





















