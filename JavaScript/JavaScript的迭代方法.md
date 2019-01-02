# JavaScript的迭代方法

​	说到迭代方法,最先想到的是什么?`forEach`还是`map`,JavaScript发展至今,迭代的方法ES5提供了5种方法

每个方法都接收两个参数,(在每一项上运行的函数,运行该函数的作用域对象(影响this的值))

传入这些方法中的函数会接收3个参数,**数组项的值** **该项在数组的位置** **数组对象本身**

迭代函数执行后**可能会**也**可能不会**影响返回结果(这句话有点绕 雾..)

ES5提供的迭代函数



- **forEach**(): 对数组中的每一项运行给定函数,无返回值
- **every**(): 对数组中的每一项运行给定函数,如果该函数每一项都返回`true`,则返回`true`
- **some**(): 对数组中的每一项运行给定函数,如果该函数任意一项返回`true`,则返回`true`
- **map**(): 对数组中的每一项运行给定函数,返回每次函数调用的结果组成的数组
- **filter**(): 对数组中的每一项运行给定函数,该函数会返回true的项组成的数组

## forEach

```JavaScript
let array = [1,2,3,4,5,6,7,8,9]
array.forEach((element,index,array) => {
  console.log(`当前遍历元素${element}`);
  console.log(`当前元素位置${index}`);
  console.log(`数组本身${array}`);
})
> 当前遍历元素1
> 当前元素位置0
> 数组本身1,2,3,4,5,6,7,8,9
> 当前遍历元素2
> 当前元素位置1
> 数组本身1,2,3,4,5,6,7,8,9
> 当前遍历元素3
> 当前元素位置2
> 数组本身1,2,3,4,5,6,7,8,9
```



forEach可以说是最常用的一个迭代方法了,该方法没有返回值,与for循环的效果一样



forEach的第二个参数

```js
let obj2 = {
  name: '张三',
  times:[1,2,3],
  print:function () {
    this.times.forEach(function(res) {
      console.log(this.name);
    },this)
  }
}
obj2.print()

```



## every

```

```





