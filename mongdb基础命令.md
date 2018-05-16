#mongdb命令

cls 清屏

show dbs   //显示当前所有数据库

use 数据库名   //进入指定数据库  如果不存在就创建一个

db   //显示当前数据库

show collections  //显示数据库中的合集

 给school表里面出入数据 student 

```
> use school
switched to db school
> db
school
> db.student.insert({id:"01", name:"admin", sex:"boy"})
WriteResult({ "nInserted" : 1 })
```

####插入数据

db.student.insert({})

####插入多条数据

db.student.insert([{},{}]) 

####查询数据

db.student.find()

####条件查询数据

db.student.find({name: 'admin'})   //查询集合student里面 名字是admin的数据

db.student.findOne({name: 'admin'})



####更新数据

db.student.update({name: ''张三'},{age: '20'})    第一个参数是 查询的值 第二个参数是改变的值 

但是这里没有添加修饰符 **将全部内容修改**

db.student.update({'age': '女'}, { $set : {id:'02'} })
$ .set 更新操作符

####增加字段

db.student.update({'age': '女'}, { $set : {lang:'java'} })   直接写就是添加

####删除字段

db.student.update({'age': '女'},{ $unset : {score: 'admin'} }) 

$.unzet 删除字段

#### 更新多条数据

db.student.updateMany({name: 'admin'},{ $set : {name: 'one'} })

updateMany方法

使用update也可以,但是要加参数 

db.student.update( { name :  'one' } , { $set : { name : 'admin' } } , { multi : true } )

**multi : true**

删除数据

db.student.remove({age:'女'})

删除age: '女'的所有数据

db.student.remove({name: 'local'},true)

删除name为local的数据 但是只删除一条



向内嵌文档 数组里面加数据

$push 无差别添加

db.college.update({name:'html5'},{$push:{"classes.base":'微信小程序'}})

$addToSet 存在就不添加 不存在就添加

db.college.update({name:'html5'},{$addToSet:{"classes.base":"web移动端"}})

$pop 删除内嵌文档里面的一条数据

db.college.update({name:'html5'},{$pop:{"classes.base":"web移动端"}})

删除数据库

db.college.remove({})

db.college.drop({})



插入10000条数据

```
var arr = [];
for(var i=0;i<10000;i++){
  arr.push({counter:i})
}
db.college.insert(arr);
```

查询counter为666的文档

db.college.find({counter:665})

查询counter小于666的文档

db.college.find({counter:{$lt:666}})

$lt 小于查询符

查询counter大于4900的文档

db.college.find({counter:{$gt:4900}})

查询counter在60 70之间的文档

db.college.find({counter:{\$gt:60,$lt: 70}})

查询集合的前10行

```
db.college.find().limit(10)
```

查询集合 10 - 20 条

```
db.college.find().skip(10).limit(10)  10开始 插 10个
```



#### 多表查询

var cno = db.user.findOne({cname:'html学院'}).cno; 变量储存
db.section.find({cno:cno})   基于变量查询



查询wages小于13000 大于13000的所有集合

```
db.section.find({ $or : [ { wages: {$lte:"13000"}},{wages: {$gte:"13000"}} ] } )
```

给所有wanges小于13000的增加1000

db.section.updateMany({wages:{\$lte: 13000}},{$inc:{wages:1000}})

指定文档的排序规则 例如 按wages为升序db.getCollection('section').find({}).sort({wages:1})

1 为升序 -1 为降序

按wages为升序 假如 wages相同 就按name排序

db.getCollection('section').find({}).sort({wages:-1,name:-1})

索引查询某一列

只显示wages这一列

db.getCollection('section').find({},{wages:1})

显示wages,name 字段

db.getCollection('section').find({},{wages:1,name:1})

只不显示wages这一列

db.getCollection('section').find({},{wages:0})