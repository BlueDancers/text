#koa2 连接 mongdb 写入数据 

现在前端全栈里面有一种技术栈比较火 

前端使用 vue 或者react 后端使用 koa2 mysql数据库 或者mongdb做数据储存 

但是基本这样的全栈教程 都要收费 收费就收费吧 但是 有没有遇到非常好的教程 

于是 准备硬着头皮看别人项目的源码 自己摸索 一步一步完成 koa + mongdb的后端学习

下面就写一个很简单的koa + mongdb 的数据库写入

##user.js //这个页面写数据库连接

```JavaScript
var mongoose = require('mongoose')
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/m_data')   //m_data是我的数据库名字 需要自己创建

mongoose.connection.once('open',()=> {
  console.log("[mongoose]mongdb is start");     //监听启动
})

var userSchema  = new Schema({                  //建表
  username: {
    type: String
  },
  password: {
    type: String
  },
  call: {
    type: Number
  },
  email: {
    type: String
  }
})

var user = mongoose.model('User',userSchema);  //返回另一个Model实例


module.exports = user    //导出
```

## data.js

```JavaScript
let koa = require('koa')
var mongoose = require('mongoose')
let User = require('./user')    //导入上一个页面的数据库模块
var bodyParser = require('koa-bodyparser');    //用于接受post请求的中间件
let app = new koa();
app.use(bodyParser());
app.use(async (ctx) => {
  if (ctx.url === '/' && ctx.method == 'GET') {
    //显示表单页面
    let html = `
      <h1>this is POST</h1>
       <form action="http://localhost/" method="POST">
      <p>姓名: <input type="text" name="name"></p>
      <p>年龄: <input type="text" name="age"></p>
      <p>电话: <input type="text" name="call"></p>
      <p>邮箱: <input type="text" name="email"></p>
      <input type="submit" value="提交">
    </form>
    `
    ctx.body = html
  } else if (ctx.url === '/' && ctx.method == 'POST') {
    let postData = ctx.request.body;
    ctx.body = postData;
    console.log(postData);
    User.create({
      username: postData.name,
      password: postData.age,
      call: postData.call,
      email: postData.email
    },(err) => {
      if(err) return
      console.log('插入成功');
    })
  } else {
    ctx.body = '<h1>404</h1>'
    let data = '';

  }
})
app.listen(80,()=>{
  console.log('[koa] is start');
})

```

对于有node基础的人来说 这应该不难 稍微都能看懂 ,就是很简单的数据库写入

假如你刚刚学习koa mongdb node也不太熟练

可以看我的github上面

https://github.com/boold/Small-code/tree/master/Small%20demo%20koa%20mongdb