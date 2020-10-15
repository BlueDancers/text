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

### 跳转页面

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



### 路由传值（非命名路由）

> 在子页面有2个方法可以返回到上个页面,第一个就是pop,第二个就是导航栏自带的导航
> 区别是pop的可以携带数据到上一层,而导航栏自带的返回键无法携带数据

```dart

class TipRouter extends StatelessWidget {
  // 获取上级页面传入的值
  TipRouter({@required this.text});
  final String text;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('提示')),
      // Padding widget似乎是用来定义padding的
      body: Padding(
        padding: EdgeInsets.all(20),
        child: Center(
          child: Column(
            children: [
              Text(text),
              RaisedButton(
                // 在子页面有2个方法可以返回到上个页面,第一个就是pop,第二个就是导航栏自带的导航
                // 区别是pop的可以携带数据到上一层,而导航栏自带的返回键无法携带数据
                onPressed: () => Navigator.pop(context, '返回去一个寂寞'),
                child: Text('返回'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class RouterTestRoute extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(50),
      child: Center(
          child: Column(
        children: [
          RaisedButton(
              onPressed: () async {
                var result = await Navigator.push(context,
                    MaterialPageRoute(builder: (context) {
                  return TipRouter(text: '测试文字');
                }));
                print('路由返回值,$result');
              },
              child: Text('打开提示页面')),
          RaisedButton(
              onPressed: () async {
                Navigator.pop(context);
              },
              child: Text('返回上一页'))
        ],
      )),
    );
  }
}
```



### 路由传值（命名路由）

> 最外层的routers里面可以定义每个页面的路由

```dart
class App extends StatelessWidget {
  @override
  // widget的主要工作就是提供一个build方法你描述ui页面
  Widget build(BuildContext context) {
    return MaterialApp(
      title: '标题',
      initialRoute: '/', // 默认路由
      routes: {
        'new_page': (context) => NewRoute(),
        'router_test_route': (context) => RouterTestRoute(),
        'tip_router': (context) {
          // 如果页面存在参数接收的情况下,则需要这么写
          return TipRouter(text: ModalRoute.of(context).settings.arguments);
        },
        '/': (context) => MyHomePage(title: ''),
      },
      theme: ThemeData(primaryColor: Colors.blue),
    );
  }
}
//跳转页面
Navigator.pushNamed(context, 'router_test_route');
// 跳转页面携带参数
var result = await Navigator.pushNamed(context, 'tip_router',arguments: '我是参数');
// 与无命名路由一致，命名路由也可以获取pop携带的返回数据
```





### 路由生成钩子

```dart
onGenerateRoute: (RouteSettings settings) {
  // 如果使用了了onGenerateRoute,我们甚至不需要再使用路由表了,因为路由表里面不存在的路由就会走到这个函数中
  // 我们可以在这个函数中进行判断是否给予通过,只需要创建一个路由映射表即可
  // 例如未登录情况下,只允许访问基本的路由
  print(settings);
  return MaterialPageRoute(builder: (context) => NewRoute()); // 通过映射寻找页面
},
```



## 包管理

```dart
name：应用或包名称。
description: 应用或包的描述、简介。
version：应用或包的版本号。
dependencies：应用或包依赖的其它包或插件。
dev_dependencies：开发环境依赖的工具包（而不是flutter应用本身依赖的包）。
flutter：flutter相关的配置选项。
```





## 资源管理

flutterApp安装包中包含代码与资源（assets）两部分，静态资源会被打包进入安装包中，可以在运行时候被访问

常见的静态资源：json。png，jpg，webp，gif，等等



### 指定assets

​	在flutter中，静态资源，或者目录是需要进行配置

```yaml
  assets:
    - assets/images/
    - assets/static/
```

注册了之后才可以被访问到



### 加载文本assets

通过`rootBundle`对象加载

```dart
Future<String> loadAsset() async {
  return await rootBundle.loadString('assets/static/1.json');
}
loadAsset().then((value) => print(value));
```



### 加载图片

> AssetsImage会根据当前设备的像素比进行动态的选择

```dart
Widget build(BuildContext context) {
  return Image.asset('assets/images/1.jpg');
}
```



特定资源-设置app图标

> : android/app/src/main/res android设置app图标

> : ios/Runner/Assets.xcassets/AppIcon.appiconset 设置app图标

 

## 启动页面

https://book.flutterchina.club/chapter2/flutter_assets_mgr.html





## widget简介

#### StatellessWidget

> StatellessWidget继承与widget，相对比较简单，主要用于不需要维护状态的场景，通常是通过嵌套其他widget的ui来构建ui

```dart
// StatelessWidget 静态类
class Echo extends StatelessWidget {
  const Echo({
    Key key,
    @required this.text,
  }) : super(key: key);

  final String text;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        color: Colors.grey,
        child: Text(text, textDirection: TextDirection.ltr),
      ),
    );
  }
}

// 获取父级的标题
class ContextRoute extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // context是BuildContext实例,表示当前节点的上下文,可以通过他获取父级的一些配置
    return Container(
      child: Builder(
        builder: (context) {
          // 获取标题
          Scaffold scaffold = context.findAncestorWidgetOfExactType<Scaffold>();
          return (scaffold.appBar as AppBar).title;
        },
      ),
    );
  }
}
```



#### StatefulWidget

> statelfulWidget同样也是继承与Widget类，但是相对于StatelessWidget来说，要复杂很多，并新增加了一个接口，createState()
>
> createState()用于创建和StatefulWidget相关的状态，每次生成的时候都会调用

```

```



### State生命周期

```dart
class CounterWidget extends StatefulWidget {
  CounterWidget({Key key, this.initValue: 0});
  final int initValue;
  _CounterWidgetState createState() => _CounterWidgetState();
}

class _CounterWidgetState extends State<CounterWidget> {
  int _counter;
  void initState() {
    super.initState();
    _counter = widget.initValue;
    print('initState');
  }

  @override
  Widget build(BuildContext context) {
    print('build');
    return Scaffold(
      body: Center(
        child: FlatButton(
            onPressed: () => setState(() => ++_counter),
            child: Text('$_counter')),
      ),
    );
  }

  void didUpdateWidget(CounterWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    print('didUpdateWidget');
  }

  void deactivate() {
    super.deactivate();
    print('deactivate');
  }

  void dispose() {
    super.dispose();
    print('dispose');
  }

  void reassbmble() {
    super.reassemble();
    print('reassbmble');
  }

  void didChangeDependencies() {
    super.didChangeDependencies();
    print('didChangeDependencies');
  }
}
```



#### 首次进入的时候

```dart
flutter: initState
flutter: didChangeDependencies
flutter: build 
```



#### 热更新的时候

```dart
flutter: reassemble
flutter: didUpdateWidget
flutter: build 
```



#### 卸载组件的时候

```dart
flutter: reassemble
flutter: deactivate
flutter: dispose 
```



生命周期

initState 当前widget初始化的时候会调用

didChangeDependencies 当State发生变化的时候会被调用

build widget进行渲染的时候，会在state，或者上层数据发生变化的时候调用

reassemble 开发模式提供，热更新会调用

didUpdateWidget 重新构建的时候，会对比key，决定时候更新组件

deactivate 当组件树被移除的时候触发

dispose 当确定对象从树永久移除的时候调用



### 在weiget树上面获取State对象

由于StatefulWidget的很多方法都在自己的state当中，所以，组件树想要调用，就需要通过一些方法来调用父级的State的方法

```dart
// 获取GlobalKey，用于获取当前State
static GlobalKey<ScaffoldState> _globalKey = GlobalKey();

@override
Widget build(BuildContext context) {
  print('build');

  return Scaffold(
    key: _globalKey,
    body: Center(
      child: Builder(builder: (context) {
        return RaisedButton(
          onPressed: () {
            // 第一个就是通过context获取到上层的state
            // 第二就是用过组件静态方法of获取到state
            // ScaffoldState _state =
            //     context.findRootAncestorStateOfType<ScaffoldState>();
            ScaffoldState _state = Scaffold.of(context);
            // _state.showSnackBar(
            //   SnackBar(content: Text('我是SnackBar')),
            // );
            // 通过全局方法GlobalKey获取当前weiget state(开销较大,不推荐)
            _globalKey.currentState.showSnackBar(
              SnackBar(content: Text('我是SnackBar')),
            );
          },
          child: Text('显示SnackBar'),
        );
      }),
    ),
  );
}
```

