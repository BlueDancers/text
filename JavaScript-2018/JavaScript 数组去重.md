---
title: js数组去重(多种写法)
date: 2018-7-30
tags: 
  - array
  - 数组去重
categories: 数组去重
---



### 最基本的写法 使用indexOf()

```JavaScript
var arr = [1,1,5,77,32,54,2,4,5,2,2,4,52,2,2,2,2,2]
//比较常规的语法使用indexOf来判断是否已经存在
getFileArray(arr)
function getFileArray(arr){
  var array = [];
  arr.forEach(e => {
    if(array.indexOf(e) !== -1){
      return;
    }else {
      array.push(e)
    }
  });
  return array;
}
```

### 看起来性能还不错的去除方法

```javascript
// 通过遍历每次被值给到数组角标 适用于数组里面数量不太的数组
var arr = [1,1,5,77,32,54,2,4,5,2,2,4,52,2,2,2,2,2]
getFilterArray(arr)
function getFilterArray (array) {
    const res = [];
    const json = {};
    for (let i = 0; i < array.length; i++){
        const _self = array[i];    //获取迭代的数值
        if(!json[_self]){          //假如json在_self这个下标没有数值,就说明这个数据没有
            res.push(_self);       //没有的话就push
            json[_self] = 1;       //同时给这和匹配不到的下标一个值,保证下次进不来
        }                          // 这样写的话 不需要循环遍历 对性能要求更小
    }
    return res;
}
```

### 另类的写法

```js
var array = [1, 1, 5, 77, 32, 54, 2, 4, 5, 2, 2, 4, 52, 2, 2, 2, 2, 2]
arrtoObject(arr)
function arrtoObject(arrs) {
  //var obj={};
  var obj = new Object();
  for (var i = 0; i < arrs.length; i++) {
    obj[arrs[i]] = true;
  }
  objectToarr(obj)
}

function objectToarr(obj){
  console.log(obj);
  var arr = [];
  for (const i in obj) {
    arr.push(i)
  }
  console.log(arr);
  return arr
}
```

### ES5 filter过滤函数

```JavaScript
var array = [1,1,5,77,32,54,2,4,5,2,2,4,52,2,2,2,2,2]
function unique(array) {
  var res = array.filter(function (item, index, array) {
    return array.indexOf(item) === index;   //因为array.indexOf返回数组的下标 如果这里的下标和index不一样说明已经存在了,就直接退出了
  })
  return res;
}

console.log(unique(array));
```

### ES6 Set  这简直就是为过滤而生的  过滤 排序

```JavaScript
var arr = [1, 1, 5, 77, 32, 54, 2, 4, 5, 2, 2, 4, 52, 2, 2, 2, 2, 2]

function FilterArray(arr) {
  set = new Set(arr)
  let arrays = Array.from(set)
  arrays.sort((a, b) => {
    return a - b
  })
  return arrays
}
FilterArray(arr)
```

假如只要排序的话

### 我们可以用一行代码实现

```JavaScript
var arr = [1, 1, 5, 77, 32, 54, 2, 4, 5, 2, 2, 4, 52, 2, 2, 2, 2, 2]
var FilterArray = (arr) => [...new Set(arr)]   //
FilterArray(arr)
```

js越来越强大