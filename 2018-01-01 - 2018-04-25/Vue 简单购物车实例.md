# Vue购物车实例

![](http://on7r0tqgu.bkt.clouddn.com/FtiWOz6cVECwi7iN2JZq9SP2qsm9.png)

> 这是效果图  看起来很简单是不是  之前一直写Jquery代码 总是想着 DOM 操作 思维感觉没有切换过来 想了很久,最后使用Vue的属性进行控制,实现了多选计算属性的功能

> 直接上源码!

- index.html

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>购物车示例</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" media="screen" href="style.css" />
</head>

<body>
    <div id="app" v-cloak>
        <template v-if="list.length">
            <table>
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox" @click="allCheck()">
                        </th>
                        <th>编号</th>
                        <th>商品名称</th>
                        <th>商品单价</th>
                        <th>购买数量</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in list">
                        <td>
                            <input type="checkbox" :checked="isAllCheck" @click="tab(index)">
                        </td>
                        <td> {{ index+1 }} </td>
                        <td> {{ item.name }} </td>
                        <td> {{ item.price }} </td>
                        <td>
                            <button @click="deleteto(index)">-</button>
                            {{ item.count }}
                            <button @click="add(index)"> +</button>
                        </td>
                        <td>
                            <button @click="remove(index)">移除</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div> 总价:$ {{ totalPrice }} </div>
        </template>
        <div v-else>
            购物车为空
        </div>
    </div>
    <script src="../vue.js"></script>  //这个路径要修改,就不多说了
    <script src="index.js"></script>
</body>
</html>
```

- index.js

```javascript
var app = new Vue({
    el: "#app",
    data: {
        list: [{ //模拟ajax获取的数据
                id: 1,
                name: "iphone7",
                price: 6188,
                count: 1,
                isCheck: false
            },
            {
                id: 2,
                name: "ipad pro",
                price: 5888,
                count: 1,
                isCheck: false
            },
            {
                id: 1,
                name: "Mac",
                price: 21488,
                count: 1,
                isCheck: false
            }
        ],
        isAllCheck: false
    },
    computed: {
        totalPrice() {
            if (!this.isAllCheck) return 0  //全选取消 返回0
            //filter 它用于把Array的某些元素过滤掉，然后返回剩下的元素
            let check = this.list.filter(item => item.isCheck) //传入list 在进行判断list.isCheck true/false  
            if (check.length == 0) return 0 //全部没有选中返回0
            let total = 0;
            for (var i = 0; i < check.length; i++) {
                var item = check[i];
                total += item.price * item.count; //价格*数量
            }
            return total;
        }
    },
    methods: {
        deleteto(index) {
            if (this.list[index].count == 1) {} else {
                this.list[index].count--;
            }
        },
        add(index) {
            this.list[index].count++;
        },
        remove(index) {
            this.list[index].count = 0
        },
        tab(index) {
            this.list[index].isCheck = this.list[index].isCheck ? false : true //切换是否选中
        },
        allCheck() {
            this.isAllCheck = !this.isAllCheck
            if (this.isAllCheck) {
                this.list.map(item => {
                    item.isCheck = true
                })
            }
        }
    }
})
```

- style.css

```css
[v-cloak]{
    display: none;
}
table{
    border: 1px solid #e9e9e9;
    border-collapse: collapse;
    border-spacing: 0;
    empty-cells: show;
}

th,td{
    padding: 8px 16px;
    border: 1px solid #e9e9e9;
    text-align: left;
}
th{
    background: #f7f7f7;
    color: #5c6b77;
    font-weight: 600;
    white-space: nowrap;
}
```

> 这样的功能使用Vue,代码简单易懂,相对于原生代码,无论是可读性还是代码量都要简单,希望大家看到这个案例,勤加学习,不要虚度光阴,尤其是大学生

今晚太晚了,就此结束