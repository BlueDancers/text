# Vue打开新标签页的方式

需求: 单页spa中打开新的标签页

### 1. 使用router-link的方式

```vue
<router-link tag="a" target="_blank" :to="{name:'selflifting'}"> 文字 </router-link>
```

### 2. 编程式导航

```JavaScript
goto() {
    let routeData = this.$router.resolve({
        name: "samecity",
    });
    window.open(routeData.href, '_blank');
}
```

以上两种方法效果是一样的,根据实际环境进行使用

