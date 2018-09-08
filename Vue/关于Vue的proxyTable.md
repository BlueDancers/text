# 关于Vue的proxyTable

这是我第三次使用proxyTable,处理跨域,调试了半小时才ok的,我决定好好总结一个文档出来,方便以后使用



在proxyTable里面这么配置

````JavaScript
proxyTable: {
  		//首先这里的api是替换后端的api,所以后端需要加上路由前缀
      '/api': {
        target: 'http://localhost:3000', //你要跨域的网址
        // secure: true,  // 如果是https接口，需要配置这个参数
        changeOrigin: true, // /这个参数是用来回避跨站问题的，配置完之后发请求时会自动修改http header里面的host，但是不会修改别的
        pathRewrite: {
          '^/api': '/api'
          //这里的配置是正则表达式，以/api开头的将会被用用‘/api’替换掉，
          //假如后台文档的接口是 /api/list 我们就访问 /api/list
          //最后实际访问的是：http://localhost:3000/api/list
        }
      }
    }
````



后端使用的是koa2

有一点需要注意,那就是

```
router.use('/api', router.routes()) 
```

需要写在所有路由的后面

这样就ok了