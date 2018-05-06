#GET POST 请求的详细区别

前言: 作为最常见的请求方式 在面试很有可能会被问到 所以在这里做一个简单总结

#### GET

* get方法向页面请求发送参数
* 地址和参数之间用?进行分割 例如 localhost:80/download.html?fileName=+"fileName"+"&filePath="+filePath
* 字符串会显示在地址栏的url上面 不安全 敏感信息 不可以用get (例如登录)
* get方法有大小限制 ,请求字符最多只能是1024字节
* get请求会被缓存
* get请求会被保存在浏览器记录里面
* get请求可以添加进书签
* get请求的编码类型为 application/x-www-from-urlencoded
* 只允许 ASCII数据类型 不允许二进制流(上传没办法使用get)
* 点击刷新 ,get请求数据不变 页面不会有变化
* get请求主要是用来获取数据

 POST

* post方法想页面请发带参数
* 使用post方法时,查询字符串在post信息里面单独存在 和HTTP一起发送到服务器
* 编码类型 为application/x-www-form-urlencoded 二进制为 multipart
* 没有历史记录
* 参数类型没有限制 可以是字符串 也可以是二进制流
* 数据不会被显示在地址栏,也不会缓存下来或者保存在浏览记录里面,所以post相对get来说比较安全,但也不是最安全的方式,如传输敏感数据还要使用加密方式传输
* post传输的数据量大 可以达到2M,而get因为url长度的限制 只能是1024字节



总地来说 

**POST适合将数据传送到服务器**

**GET 适合从服务器端获取数据**

