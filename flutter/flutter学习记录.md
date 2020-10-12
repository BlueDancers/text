# Dart学习

### 程序入口

JavaScript中没有预定义的程序的入口，但是在dart中，每个app都必须有一个顶级的main函数作为程序的起点

```dart
main(){
	// ....  
}
```

#### 控制台输出





#### 变量

Dart的变量类型是自行退到的，他使用静态类型检查，和运行时的组合，检查以确保变量的值始终与变量的静态类型匹配，尽管类型是必须的，但是某些类型的备注是可选的，因为dart会执行类型推导

```dart
var a = 1; // var定义变量 并且他会自动推到类型
dynamic flybyObjects = [
  'Jupiter',
  'Saturn',
  'Uranus',
  'Neptune'
]; // dynamic为动态类型,相当于ts的any
int aaaa = 20; // 单精度类型
double bbbb = 20.0; // 双精度类型
var ccc; // 未定义的变量默认值为unll
final ddd = 1; // final 只能被设置一次
const eee = 1; // const为静态变量不可以再被设置
const int fff = 2; // final const与变量类型不冲突
var ggg = const []; // 这样写会被忽略
ggg = [1, 2, 3, 4]; // 没问题
```

##### 默认值

在JavaScript中，未初始化的变量为undefined

在dart中，未初始化的变量为unll

```dart
var name; // unll
int x // unll
```



### 检查unll与0

在JavaScript中，非零，存在的值都会被判断为true

```javascript
var one = 0
if(!one) {
	// 执行
}

var two = unll
if(two) {
	// 执行
}
```



dart中，只有布尔值true才被视为true

```dart
var one = 0
if(one == 0) {
	// 执行
}

var two = unll
if(two == unll) {
	// 执行
}
```



#### Dart null类型检查

与JavaScript的可选链操作符很相似

?.运算符在左边为unll的情况下会阻断右边的调用，??运算符主要作用在左侧表达式为unll时，将其设置为默认值

```dart
bool one = aaa?.contains() ?? false
```



#### 函数声明

dart的函数声明与JavaScript类似

JavaScript

```javascript
function(){
	return true
}
```

dart 不需要关键字  

```dart
fn (){
	return true
}
bool fn(){
  return true
}
```



异步编程

> 使用上基本上与JavaScript表现形式一致

JavaScript异步解决方案为promise

dart的异步解决方案为Futures

```

```





# Flutter学习

创建第一个flutter应用

```dart
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  Widget build(BuildContext context) {
    return MaterialApp(
      title: '你好,flutter',
      home: Scaffold(
        appBar: AppBar(
          title: Text('你好,flutter'),
        ),
        body: Center(
          child: Text('你好flutter'),
        ),
      ),
    );
  }
}

```



