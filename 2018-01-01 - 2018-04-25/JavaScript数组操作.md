---
title: 从输入一个url到浏览器页面展示都经历了哪些过程
date: 2018-07-26 16:27:59
tags: 网络编程
categories: 网络编程
---

# JavaScript数组操作

 最近看前端面试题 见到太多数组操作 一定要总结一下

- shift()  删除原数组第一项,  >> 返回删除元素的值,如果数组为空就会返回undefined

```javascript
var a = [1,2,3,4,5];
var b = a.shift();
console.log(a);  // [2, 3, 4, 5]  
console.log(b);  // 1     //返回被删除的值
```

- unshift()  将参数添加到原数组开头   >>  返回数组的长度

```JavaScript
var a = [1,2,3,4,5];
var b = a.unshift(0);
console.log(a);  //[0, 1, 2, 3, 4, 5]
console.log(b);  // 6   //返回数组长度
```

- pop()   删除原数组最后一个，  >>  返回删除元素的值；如果数组为空则返回undefined 

```JavaScript
var a = [1,2,3,4,5];
var b = a.pop();
console.log(a)  // [1, 2, 3, 4]
console.log(b)  //5     //返回删除的值
```

- push  将参数添加到原数组末尾，>>  返回数组的长度 

```javascript
var a = [1,2,3,4,5];
var b = a.push(0);
console.log(a)  //[1, 2, 3, 4, 5, 0] 
console.log(b)  //6     //返回数组的长度
```

- concat  

```javascript
var a = [1,2,3,4,5];
var b = [6,7,8,9];
var c = a.concat(b);
console.log(a);  // [1, 2, 3, 4, 5]
console.log(b);  // [6, 7, 8, 9]
console.log(c);  // [1, 2, 3, 4, 5, 6, 7, 8, 9]
// 之前的concat可用于数组的深拷贝  与空数组进行拼接
```

- splice(start,deleteCount,val1,val2,...):从start位置开始删除deleteCount项，并从该位置起插入val1,val2,... 

```javascript
var a = [1,2,3,4,5];
var b = a.splice(0,1) 					//shift   [2, 3, 4, 5]  
var c = a.splice(a.length-1,1) 			 //pop   [1, 2, 3, 4]
var d = a.splice(0,0,0)  				//unshift  [0, 1, 2, 3, 4, 5]  0开始删除0个 添加 0
var e = a.splice(a.length,0,6)  		 //push   [1, 2, 3, 4, 5, 6]
console.log(b)     					    //  [1] 返回被删除的
console.log(c)    					    //  [5]  返回添加的字符串
console.log(a)     					    //添加为空
console.log(a)     						//添加为空

```

- reverse()   将数组翻转


```JavaScript
var a = [1,2,3,4,5];
var b = a.reverse()      //[5, 4, 3, 2, 1]  
console.log(b)
```

`ps: reverse 翻转  revise 修改  server 服务器 service 服务  `

- sort(orderfunction):按指定的参数对数组进行排序 

```javascript
var a = [4,5,3,1,2];   
var b = a.sort();     //[1, 2, 3, 4, 5]  但是只能完成个位数排序 
console.log(b)

////多位数排序
var a = [4,5,3,12,2]; 
function b(a,b){
console.log(a,b);     //  
	return a-b;
}
var c = a.sort(b);
console.log(c)        //  [2, 3, 4, 5, 12]
```

- slice(start,end):返回从原数组中指定开始下标到结束下标之间的项组成的新数组 

```javascript
var a = [1,2,3,4,5];     // 数组本身不变
var b = a.slice(0,2);    //  [1, 2]  从0开始 返回 两位  
console.log(b);
var c = a.slice()     //深拷贝数组
```

- join(separator):将数组的元素变成一个字符串，以()内字符为分隔符，省略的话则用默认用逗号为分隔符 

```JavaScript
var a = [1,2,3,4,5];  
var b = a.join(",");     //  1,2,3,4,5
console.log(b)  
console.log(a)           //  [1, 2, 3, 4, 5] 数组本身不变
```

- 字符串变数组

```JavaScript
var a = '1,2,3,4,5';
var b= a.split(",")  //["1", "2", "3", "4", "5"]
console.log(b)
```

- 遍历数组

```
var a = ["一","二","三","四"];
a.forEach(function(data,index,array){
    console.log(data);           //  data 第一个参数表示当前遍历的值
    console.log(index);          //  index 表示当前遍历的下标
    console.log(array);          //返回数组本身
})
```

- map 转数组

```
var map = new Map([1,2,3,4,5,6,7,8]);
console.log(map);
```

indexOf()  返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。

```javascript
let a = [2, 9, 7, 8, 9]; 
a.indexOf(2); // 0 
a.indexOf(6); // -1
a.indexOf(7); // 2
a.indexOf(8); // 3
a.indexOf(9); // 1
```

lastIndexOf()  从数组的后面向前查找,找到一个给定元素的第一个索引，如果不存在，则返回-1。

```
var b = [2, 9, 7, 8, 9]; 
b.lastIndexOf(9);     //4  从后往前查找
```

toString()  方法返回一个表示该对象的字符串。  数组变字符串

```JavaScript
var b = [2, 9, 7, 8, 9]; 
console.log(b.toString())  //2,9,7,8,9
```

every() 测试数组的所有元素是否都通过了指定函数的测试。

```
function a(array){
    return array>10
}
var pass = [1,10,2,4,5,2,3,200].every(a)    / false 测试不通过
console.log(pass)
```

some() 方法测试数组中的某些元素是否通过由提供的函数实现的测试

```
function a(array){
    return array>10
}
var pass = [1,10,2,4,5,2,3,200].every(a)    // true 测试通过
console.log(pass)
```

#### every 是 检索到一个错就返回错 ||     some 是检索到一个正确就返回正确  &&

filter() 创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。

```javascript
var ages = [32, 33, 16, 40];

function checkAdult(age) {
    return age >= 18
}
var b = ages.filter(checkAdult)
console.log(b)   // [32, 33, 40]
```









