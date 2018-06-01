# 关于webpack代理的问题

在现在前后端分离的,对应的后端端口 和前端 会存在跨域问题,目前使用的解决办法是在webopack 的dev 里面的proxyTable 里面

但是发现一个问题,webpack里面的proxyTable里面设置跨域似乎是匹配到就会进入 

比如 这样写

```bash
'/todo': {
        target: 'http://localhost:80',
        changeOrigin: true
}
```

这时候我访问 localhost:8080/todolist 也会访问后端 似乎匹配到后端的todo 

百度搜索竟然搜索不到 这个问题暂时难以解决