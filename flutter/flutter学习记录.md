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



#### 异步编程

> 使用上基本上与JavaScript表现形式一致

JavaScript异步解决方案为promise

dart的异步解决方案为Futures

##### 基本操作

```dart
// 状态变化
void aaa() {
  // future dart的异步解方案
  Future.delayed(new Duration(seconds: 2), () {
  // return 'hello';
  throw AssertionError('Error');
  })
    .then((value) => print(value))
    .catchError((err) => {print(err)})
    .whenComplete(() => print('执行完成'));
}
//

```

##### 等待多个异步函数

```dart
void bbb() {
  Future.wait([
    Future.delayed(new Duration(seconds: 1), () {
      return 'hello';
    }),
    Future.delayed(new Duration(seconds: 2), () {
      return 'flutter';
    })
  ]).then((value) => print(value));
  //  [hello, flutter]
}
```

##### 异步函数流

```dart
Stream.fromFutures([
  Future.delayed(new Duration(seconds: 1), () {
    return 'hello';
  }),
  Future.delayed(new Duration(seconds: 2), () {
    throw AssertionError('Error');
  }),
  Future.delayed(new Duration(seconds: 3), () {
    return 'word';
  })
]).listen((event) {
  print(event);
}, onError: (err) => {print(err)}, onDone: () => {print('函数流执行成')});
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



## flutter项目结构

```bast
┬
└ projectname
  ┬
  ├ android      - Android部分的工程文件
  ├ build        - 项目的构建输出目录
  ├ ios          - iOS部分的工程文件
  ├ lib          - 项目中的Dart源文件
    ┬
    └ src        - 包含其他源文件
    └ main.dart  - 自动生成的项目入口文件，类似RN的index.js文件
  ├ test         - 测试相关文件
  └ pubspec.yaml - 项目依赖配置文件类似于RN的 package.json 
```



## 计数器demo

```dart
// 导入包
import 'package:flutter/material.dart';

/// 程序入口,runApp用于启动flutter应用,runApp方法接受一个Widget参数
void main() => runApp(App());

// 应用继承于StatelessWidget,程序本身就是同一个widget(无状态组件)
class App extends StatelessWidget {
  // 注解表示重写父类方法
  @override
  // widget的主要工作就是提供一个build方法你描述ui页面
  Widget build(BuildContext context) {
    // MaterialApp是materiaapp库提供的一个flutter App框架,通过他可以设置应用的名称,语言,首页,以及路由表
    // 他本身也是一个widget
    return MaterialApp(
      title: '标题',
      theme: ThemeData(primaryColor: Colors.blue),
      // home为应用的首页
      home: MyHomePage(title: '哈哈哈哈'),
    );
  }
}

// MyHomePage是指定的首页,,他继承与ful类,表示他是提个有状态的组件
// statefluWidget可以拥有状态,,这些状态在生命周期内是可以改变的
class MyHomePage extends StatefulWidget {
  // MyHomePage({Key key, this.title}) : super(key: key);
  MyHomePage({this.title});
  final String title;

  _MyHomePageState createState() => _MyHomePageState();
}

// 将build方法放在State中，可以给开发带来很大的灵活性 目前不好理解
class _MyHomePageState extends State<MyHomePage> {
  // 点击次数
  int _counter = 0;
  // 定义方法进行点击次数的改变
  void _changeCounter() {
    // setState通知flutter框架,有状态发生变化,flutter会重新执行Build方法,来根据新的状态重新构建页面
    setState(() {
      _counter++;
    });
  }

  // 构建ui
  Widget build(BuildContext context) {
    // scaffold(骨架) 是material库提供的页面脚手架,他提供了默认的状态栏,标题,包含主屏幕的widget树
    // 路由通常都是scaffold进行创建的
    return Scaffold(
      // 头部
      appBar: AppBar(
        title: Text(widget.title),
      ),
      // Center组件 可以将其组件数对齐屏幕中心
      // Column组件 将其所有子组件样屏幕垂直方向依次排列
      body: Center(
        child: Column(
          // 垂直排列的布局方式
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text('点击按钮增加次数'),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headline4,
            )
          ],
        ),
      ),
      // 页面右下角的悬浮按钮
      floatingActionButton: FloatingActionButton(
        onPressed: _changeCounter, // 点击触发事件
        tooltip: '点击增加', // 长按提示文字
        child: Icon(Icons.add), // 加好
      ),
    );
  }
}
```



## flutter的路由

跳转页面

````dart
// 新建一个页面
class NewRoute extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('新的页面')),
      body: Center(
        child: Text('这是一个新页面'),
      ),
    );
  }
}

// 跳转到新页面
 void gotoPage() {
      // 添加一个路由栈
      // Navigator是路由管理组件,他提供了打开和退出路由的方法
      // push为进入 pop为返回
			// 写法 1 
      Navigator.push(
          // MaterialPageRoute继承自PageRoute,表示占用整个屏幕空间的模态路由页面
          // 可以定义路由构建以及切换是过渡动画的相关属性
          //  MaterialPageRoute({
          //   WidgetBuilder builder, // 他的作用是构建路由页面的具体内容没返回一个widget
          //   RouteSettings settings, // 路由配置信息 路由名称 是否初始路由
          //   bool maintainState = true, // 将此参数设置为false,将会销毁上一个页面
          //   bool fullscreenDialog = false, // 为true页面将从底部划出,false为侧边
          // })
          context,
          MaterialPageRoute(
              builder: (context) => NewRoute(), fullscreenDialog: true));
      // 实例方法写法（写法2）
      Navigator.of(context).push(MaterialPageRoute(
          builder: (context) => NewRoute(), fullscreenDialog: true));
    }
````

