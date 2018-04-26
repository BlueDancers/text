# VUE

vue官网指南 > https://cn.vuejs.org/v2/guide/index.html

vue在线库

```javascript
 <script src="https://cdn.jsdelivr.net/npm/vue"></script>
```

Vue -- Hello word

```javascript
HTML代码: 
<div id="app">
        {{ message }}
    </div>

js代码:
var app = new Vue({
    el: '#app',  //el指定位置 css选择器
    data: {
        message: 'Hello Vue!'   //加载数据  app.message可以直接访问
    }
})
```

> 我们要怎么确认呢？打开你的浏览器的 JavaScript 控制台 (就在这个页面打开)，并修改 `app.message` 的值，你将看到上例相应地更新

