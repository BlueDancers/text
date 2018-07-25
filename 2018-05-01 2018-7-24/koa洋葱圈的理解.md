Koa洋葱圈模型的理解

```javascript
let Koa = require('koa');
let app = new Koa();

// app.use( async (ctx,next) => {
//   //ctx是什么? 封装了request和response的对象
//   //next()  下一个中间件
//   ctx.body = "koa"
// })
function delay() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("promise");
    }, 2000);
  })
}
app.use(async (ctx, next) => {
  ctx.body = "1"
  await next()
  //next()  //next()就是执行下一个中间件
  ctx.body += "2"
})

app.use(async (ctx, next) => {
  ctx.body += "3"
  await delay()
  next()
  ctx.body += "4"
})

app.use(async (ctx, next) => {
  ctx.body += "5"
  await next()
  ctx.body += "6"
})

app.listen(3000, () => {
  console.log("[Koa is success]");
})
```

ctx对象里面都有啥

```bash
{ request:
   { method: 'GET',
     url: '/',
     header:
      { host: 'localhost:3000',
        pragma: 'no-cache',
        'cache-control': 'no-cache',
        'upgrade-insecure-requests': '1',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
        dnt: '1',
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'zh-CN,zh;q=0.9',
        connection: 'close' } },
  response:
   { status: 200,
     message: 'OK',
     header:
      { 'content-type': 'text/plain; charset=utf-8',
        'content-length': '1' } },
  app: { subdomainOffset: 2, proxy: false, env: 'development' },
  originalUrl: '/dasdsdas',
  req: '<original node req>',
  res: '<original node res>',
  socket: '<original node socket>' }
```

