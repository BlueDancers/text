# JavaScript -vdom

在说虚拟dom之前,先说说jQuery才做dom是如何实现的

````JavaScript
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    table,
    tr,
    td,
    th {
      border: 1px solid black
    }
  </style>
</head>

<body>
  <div id="container"></div>
  <button id="bin-change">点击</button>
  <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.js"></script>
  <script>
    var data = [{
        name: '张三',
        age: '20',
        address: '北京'
      },
      {
        name: '李四',
        age: '22',
        address: '上海'
      },
      {
        name: '王五',
        age: '21',
        address: '广州'
      }
    ]

    //渲染函数
    function render(data) {
      var container = $("#container");
      //清空容器
      container.html('')
      //拼接table
      let h =
        `<table>
        <tr>
          <th>name</th>
          <th>age</th>
          <th>address</th>
        </tr>`
      data.forEach(item => {
        h +=
          `<tr>
              <td>${item.name}</td>
              <td>${item.age}</td>
              <td>${item.address}</td>
            </tr>`
      });
      h += `</table>`
      container.append(h)
    }
    $("#bin-change").click(() => {
      data[1].age = "20",
      data[2].address = '深圳',
        //4
        render(data)
    })
    //页面加载完成 初次渲染
    render(data)
  </script>
</body>

</html>
````

//使用append进行动态输出html,但是这样左右一个很浪费性能的地方

这里写了一个动态变更数据的方法 但是 这里请看控制台 每次变更,都会刷新整个table,浪费性能

使用虚拟dom进行dom操作

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
  <div id="container"></div>
  <button id="bin-change">点击</button>
  <script src="https://cdn.bootcss.com/snabbdom/0.7.1/snabbdom.js"></script>
  <script src="https://cdn.bootcss.com/snabbdom/0.7.1/snabbdom-class.js"></script>
  <script src="https://cdn.bootcss.com/snabbdom/0.7.1/snabbdom-props.js"></script>
  <script src="https://cdn.bootcss.com/snabbdom/0.7.1/snabbdom-style.js"></script>
  <script src="https://cdn.bootcss.com/snabbdom/0.7.1/snabbdom-eventlisteners.js"></script>
  <script src="https://cdn.bootcss.com/snabbdom/0.7.1/h.js"></script>
  <script>
    var snabbdom = window.snabbdom;
    //定义patch
    var patch = snabbdom.init({
      snabbdom_class,
      snabbdom_props,
      snabbdom_style,
      snabbdom_eventlisteners
    })
    //定义h
    var h = snabbdom.h

    var container = document.getElementById('container')


    var vnode = h('ul#list', {}, [
      h('li.item', {}, 'Item1'),
      h('li.item', {}, 'Item2')
    ])

    patch(container, vnode)

    document.getElementById('bin-change').addEventListener('click', function () {
      console.log(container);

      var newvnode = h('ul#list', {}, [
        h('li.item', {}, 'Item1'),
        h('li.item', {}, 'Item3'),
        h('li.item', {}, 'Item4')
      ])
      patch(vnode, newvnode)
    })
  </script>

</body>

</html>
```

这里观察控制台就会发现,虚拟Dom只更新变化的部分

这是[snabbdom](https://github.com/snabbdom/snabbdom)github地址,有兴趣可以看看

使用vDom对jQuery的代码进行改写

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
  <div id="container"></div>
  <button id="bin-change">点击</button>
  <script src="https://cdn.bootcss.com/snabbdom/0.7.1/snabbdom.js"></script>
  <script src="https://cdn.bootcss.com/snabbdom/0.7.1/snabbdom-class.js"></script>
  <script src="https://cdn.bootcss.com/snabbdom/0.7.1/snabbdom-props.js"></script>
  <script src="https://cdn.bootcss.com/snabbdom/0.7.1/snabbdom-style.js"></script>
  <script src="https://cdn.bootcss.com/snabbdom/0.7.1/snabbdom-eventlisteners.js"></script>
  <script src="https://cdn.bootcss.com/snabbdom/0.7.1/h.js"></script>
  <script>
   
      var data = [{
      name: '张三',
      age: '20',
      address: '北京'
    }, {
      name: '李四',
      age: '22',
      address: '上海'
    }, {
      name: '王五',
      age: '21',
      address: '广州'
    }]

    data.unshift({
      name: '姓名',
      age: '年龄',
      address: '地址'
    })


    var snabbdom = window.snabbdom;
    //定义patch
    var patch = snabbdom.init({
      snabbdom_class,
      snabbdom_props,
      snabbdom_style,
      snabbdom_eventlisteners
    })
    //定义h
    var h = snabbdom.h

    var container = document.getElementById('container')
    var vnode

    function render(data) {
      var newVnode = h('table', {}, data.map((item) => {
        //内圈循环获取table的子元素
        var tds = []
        var i
        for (i in item) {
          if (item.hasOwnProperty(i)) {
            //内内圈循环获取td元素的表示,并读取

            tds.push(h('td', {}, item[i] + ""))
          }
        }
        console.log(tds);
        
        return h('tr', {}, tds)
      }))
      if (vnode) {
        patch(vnode, newVnode) //再次渲染
      } else {
        patch(container, newVnode) //初次渲染
      }
      //存储当前vnode结果
      vnode = newVnode
    }
    render(data)
    document.getElementById('bin-change').addEventListener('click', function () {
      data[1].age = "20"
      data[2].address = '深圳'
      //re_render
      render(data)
    })
  </script>
</body>

</html>
```

最后对snabbdom的语法进行小小的总结

```JavaScript
h('标签名',{css属性},[子元素])
h('标签名',{css属性}," 元素里面的文本 ")
patch(id/class/挂载点,vnode)
path(vnode,newVnode)
```

## diff算法

diff linux一个基础命令,用于对比文件,并非前端独创

git diff是查看文本变动

vdom为什么使用diff算法

- dom操作是'昂贵'的,因此尽量减少dom操作
- 找出本地dom需要更新的地方,其他的不更新
- 怎么找出就必须依赖与diff算法

> 创建vdom的大致模拟实现

```JavaScript
function createElements(vnode) {
  var tag = vnode.tag //获取标签
  var attrs = vnode.attrs || {} //类名
  var children = vnode.children //内部内容

  if (!tag) {
    return null
  }

  var elem = document.createElement(tag) //创建节点
  //属性
  var attrName
  for (attrName in attrs) {
    if (attrs.hasOwnProperty(attrName)) {
      //给elem添加属性
      elem.setAttribute(attrName, attrs[attrName])
    }
  }
  //上面以及将当前的子元素添加经了dom里面
  //对于子元素
  children.forEach(childVnode => {
    //进行递归添加子元素
    elem.appendChild(createElements(childVnode))
  });

}
```

![](http://on7r0tqgu.bkt.clouddn.com/Fu0O2oq43Ude_B4dmgo5NzrIfp2w.png )

patch(vnode,newVnode) //patch是核心diff算法

```JavaScript

function updatechildren(vnode,newVnode){
  var children = vnode.children || []  //获取内部信息
  var newChildren = newVnode.children || []

  children.forEach((childVnode,index) => {
    var newChildVnode = newChildren[index]  //获取遍历当前新的dmo节点的属性
    
    if (childVnode.tag === newChildVnode.tag){
      //假如标签一样就递归遍历,直到找到不一样的
      updatechildren(childVnode,newChildVnode);
    }else {
      replaceNode(childVnode,newChildVnode)
    }
  })
}
function replaceNode(childVnode, newChildVnode) {
  //获取当前dom节点
  var ele = document.getElementsByTagName(childVnode);
  //创建新的dom节点
  var newEle = createElements(newChildVnode)
  //....替换 ...等等
}
```

什么是diff算法?

​	最初是linux基础命令,后来引用到vdom里面,因为vdom需要找出新的节点

diff算法的实现

​	patch(container,vnode) pathch(vnode,newVnode)

核心逻辑

​	创建元素(createElement) 更新元素(updatechildren)



vdom是什么?为什么存在vdom

vdom是虚拟dom,是使用js模拟的dom结构;因为dom操作很昂贵,所以将dom操作放在js层面,为了提高效率



vdom如何使用? 核心函数是什么

snabbdom为例子,上面的代码的简单实现

核心函数是h函数和patch函数



介绍diff算法

diff算法是对比算法,很多工具都有diff对比命令

vdom里面应用diff算法是为了找出所需更新你的节点

实现  patch(container,vnode)创建 pathch(vnode,newVnode)更新















