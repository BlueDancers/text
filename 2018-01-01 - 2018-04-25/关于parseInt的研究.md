---
title: 关于parseInt的学习
date: 2018-07-26
tags: parselnt
categories: JavaScript
---

#关于parseInt的学习

​     前面在看题目的时候 偶然看到 使用parseInt 来进行整数判断 但是这里的parseInt是错误示范

之后了解了一下 发现这和函数 很有研究



##先看看 w3c怎么说这个的

````
parseInt() 函数可解析一个字符串，并返回一个整数。
string	必需。要被解析的字符串。
radix	
    可选。表示要解析的数字的基数。该值介于 2 ~ 36 之间。

    如果省略该参数或其值为 0，则数字将以 10 为基础来解析。如果它以 “0x” 或 “0X” 开头，将以 16 为基数。

    如果该参数小于 2 或者大于 36，则 parseInt() 将返回 NaN。
````

说实话 虽然我没有比较好的描述,但是觉的他的解释并不好 看不懂

## 我们来看看当没有 radix这个参数的时候 parseInt()是如何解析的

```
如果 string 以 "0x" 开头，parseInt() 会把 string 的其余部分解析为十六进制的整数

如果 string 以 0 开头，那么 ECMAScript v3 允许 parseInt() 的一个实现把其后的字符解析为八进制或十六进制的数字。

如果 string 以 1 ~ 9 的数字开头，parseInt() 将把它解析为十进制的整数。
```

 以及注意事项

```
注释：只有字符串中的第一个数字会被返回。

注释：开头和结尾的空格是允许的。

提示：如果字符串的第一个字符不能被转换为数字，那么 parseFloat() 会返回 NaN。
```

实例

```
parseInt('12',10)    //10
parseInt(11,2,10)    //3 只解析前两位   这里将 11 转化为2禁止 也就是 0011 也就是 3
parseInt(   11   ,2) //3 空格不影响结果
parseInt("dasas",2)  // NaN 运算发生错误
```



## 接下来让我们看看 为什么 parseInt不适合判断是否整数

```
parseInt(0.000001, 10)    // 0
parseInt(0.0000001, 10)   //5 为什么会是5 !
parseInt(10000000000000,10)    //10000000000000 
parseInt(10000000000000000000000000000,10)  // 1 
```

因为 0.0000001 会被科学计算转化为1e-7 于是parseInt就进行识别 1 认识 e不认识 返回 10进制的1 结果为 1 

10000000000000000000000000000  => 1e+28 所以为1

所有 这里数字过小 过大就不再适合 使用parseInt来进行判断

## 拓展

````
console.log(parseInt(1/0,19))      //18
console.log(parseInt(false,16))    //250
console.log(parseInt(parseInt,16)) //15
console.log(parseInt('0x10'))      //16
console.log(parseInt('10',2))      //2
````

 这是我在别人博客看到的 这些都会了 parseInt就没问题了 

##解释

####console.log(parseInt(1/0,19)) 

 首先计算 1/0 多少 控制台输出 `Infinity`  代码就变成了 

`parseInt("Infinity",19)`

19进制 ( 0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f,g,h,i )

进行解析 I 存在 19进制 解析为18 n不存在 直接返回  所以  = 18

####console.log(parseInt(false,16)) 

18进制 (0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f）

false parseInt不认识 于是 逐个解析

f 存在  a 存在 l不认识返回 16进制的fa   = > 10进制的 250

####console.log(parseInt(parseInt,16))  

和上面同理 parseInt被解析成为字符串

####console.log(parseInt('0x10'))  

没有第二参数 默认 10进制 0x 表示 16进制 0x10为 10 10进制为   => 16

####console.log(parseInt('10',2))

10 二进制 解析  => 2

