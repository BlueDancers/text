# node.js使用Sequelize 操作mysql

[Sequelize](http://docs.sequelizejs.com/)就是Node上的ORM框架 ,相当于java端的Hibernate 

是一个基于 promise 的 Node.js ORM, 目前支持 Postgres, MySQL, SQLite 和 Microsoft SQL Server. 它具有强大的事务支持, 关联关系, 读取和复制等功能.

首先看一下在node上面使用原生mysql

> npm install mysql --save

进入数据库 `create database greet` 创建数据库

/config/defaut

```JavaScript
let config = {
  port: 3000,
  database: {
    host: '127.0.0.1',			//根据当前环境填写
    port: 3306,
    user: 'root',
    password: '000000',
    database: 'greet'
  }
}
module.exports = config;
```



Schema/mysql.js

```JavaScript
let mysql = require('mysql');
let config = require('../config/defaut');  //这是配置信息

let connection = mysql.createConnection({    //链接数据库
  host: config.database.host,
  port: config.database.port,
  user: config.database.user,
  password: config.database.password,
  database: config.database.database
})

connection.connect(err => {                   //判断时候链接数据库
  if (err) {
    console.log("mysql is fail" + err);
    return;
  }
  console.log("mysql is success!"); //数据库链接成功标志
})

let select = "select * from users";             //查看时候有user这个表
connection.query(select, (err, done) => {
  if (done == undefined) { //创建之前进行判断 创建用户表
    let createUser = `
          create table if not exists users(
          user_id INT NOT NULL AUTO_INCREMENT,
          user_name VARCHAR(20) NOT NULL,
          user_password VARCHAR(20) NOT NULL,
          user_PhoneNumber VARCHAR(20) NOT NULL,
          PRIMARY KEY(user_id)
        )`
    connection.query(createUser, (err, result) => { //创建数据库表
      if (err) {
        console.error("create is err" + err);
        return;
      }
      console.log('create is success', result); //创建成功就返回创建的表
    })
  } else {
    console.log("表已经存在,query代码不再加载");
  }
})

module.exports = connection;



let addusers = 'insert into  users (user_id,user_name,user_password,user_PhoneNumber) values (?,?,?,?)';
    let addusersSql = [, '张三', '000000', '11111111111'];
    connection.query(addusers, addusersSql, (err, done) => {
      if (err) {
        console.log("[insert into is error]" + err.message);
        return;
      }
      console.log("-------------------------insert-----------------------------");
      console.log("Id to", done.insertId);
    })

```

因为是原生的sql语句操作,显得很麻烦,Sequelize 就出现了

在数据库的表中，每一行都可以用一个JavaScript对象表示，这就是ORM（Object-Realtional Mapping）技术，把关系数据库的表结构映射到对象上 

>npm install sequelize --save  
>
>npm install mysql2 --save 

因为 Sequelize 不能创建数据库，所以需要手动创建一个数据库： 

create database greet  

Schema/mysql.js

````javascript
let config = require('../config/defaut');  //数据库配置
let Sequelize = require('sequelize');
// new Sequelize(database, [username=null], [password=null], [options={}])
// class Sequelize 接收 4 个参数，后三个参数是可选的

let sequelize = new Sequelize(config.database.database, config.database.user, config.database.password,{
  host: config.database.host,
  dialect: 'mysql',
  pool: {
    max: 3,       //连接池最大链接数量
    min: 1,       //连接池最小链接数量
    idle: 10000   //线程10秒内没有被操作就会释放线程
  }
})


sequelize.authenticate() //连接测试
.then(()=> {
  console.log("mysql is Success");
})
.catch (err=> {
  console.log(err);
})

module.exports = sequelize;
````

下面我们创建表

```JavaScript
let mysql = require('./mysql');  //Sequelize 的数据库配置
let Sequelize = require('sequelize');

let Users = mysql.define('user', {
  user_name: {					//创建表字段
    type: Sequelize.STRING(100),	//Sequelize.String类型 参数不清楚什么 貌似是字段长度 不写也行
    //type: Sequelize.STRING,
    field: 'user_name' // 指定存储在表中的键名称
    // 没有指定 field，表中键名称则与对象键名相同，为 user_name
  },
  user_password: {
    type: Sequelize.STRING(50)
  },
  user_PhoneNumber: {
    type: Sequelize.STRING(50)
  }
}, {
  // 如果为 true 则表的名称和 model 相同，即 user
  // 为 false MySQL 创建的表名称会是复数 users
  // 如果指定的表名称本就是复数形式则不变
  freezeTableName: false
});

// 创建表
// User.sync() 会创建表并且返回一个 Promise 对象
// 如果 force = true 则会把存在的表（如果 users 表已存在）先销毁再创建表
// 默认情况下 force = false
Users.sync({
  force: false 
}).then(() => {
  console.log("[Users is success]");
})
//添加用户
Users.create({
    user_name: "张三",
    user_password: "000000",
    user_PhoneNumber: "138138138138"
})


//查看用户
let lookUser = async () => {
  //return await Users.findAll()         //返回一个查询的promise对象
    await Users.findAll().then(res => {
        console.log(JSON.parse(JSON.stringify(res)))  //查看数据库里面的全部字段
    })
}

module.exports = {
  addUSers,
  userlogin,
  lookUser
}
```

在项目里面的具体引用请看我的[github](https://github.com/boold/Vue-greet/tree/master/server)

