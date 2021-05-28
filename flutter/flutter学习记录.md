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



## 状态管理

> flutter的状态管理与大前端解决方案类似大前端

### 自己管理自己的状态

```dart
class TapboxA extends StatefulWidget {
  TapboxA({Key key}) : super(key: key);
  _TapboxState createState() => new _TapboxState();
}

class _TapboxState extends State<TapboxA> {
  bool _active = false;
  void _handleTap() {
    setState(() {
      _active = !_active;
    });
  }

  Widget build(BuildContext context) {
    return new GestureDetector(
      onTap: _handleTap,
      child: Container(
        child: Center(
          child: Text(
            _active ? 'Active' : 'Inactive',
            textDirection: TextDirection.ltr,
            style: TextStyle(fontSize: 48.0, color: Colors.white),
          ),
        ),
        decoration: BoxDecoration(
            color: _active ? Colors.lightGreen[700] : Colors.grey[600]),
      ),
    );
  }
}
```



### 父管理子的状态

```dart

class ParentWidget extends StatefulWidget {
  _ParentWidgetState createState() => new _ParentWidgetState();
}

class _ParentWidgetState extends State<ParentWidget> {
  bool _active = false;
  void _handleTapboxChanged(bool newValue) {
    setState(() {
      _active = newValue;
    });
  }

  Widget build(BuildContext context) {
    return Container(
      child: TapboxB(active: _active, onChanged: _handleTapboxChanged),
    );
  }
}

class TapboxB extends StatelessWidget {
  TapboxB({Key key, this.active: false, @required this.onChanged})
      : super(key: key);
  final bool active;
  final ValueChanged<bool> onChanged;
  void _handTap() {
    onChanged(!active);
  }

  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: _handTap,
      child: Container(
        child: Center(
          child: Text(
            active ? 'active' : 'inactive',
            textDirection: TextDirection.ltr,
            style: TextStyle(
              fontSize: 32.0,
              color: Colors.white,
            ),
          ),
        ),
        decoration: BoxDecoration(
          color: active ? Colors.lightGreen[700] : Colors.grey[600],
        ),
      ),
    );
  }
}
```



### 同时存在父与子的状态

```dart
class ParentWidgetC extends StatefulWidget {
  _ParentWidgetC createState() => new _ParentWidgetC();
}

class _ParentWidgetC extends State<ParentWidgetC> {
  bool _active = false;
  void _handleTapboxChanged(bool newValue) {
    setState(() {
      _active = newValue;
    });
  }

  Widget build(BuildContext context) {
    return Container(
      child: Tapboxc(
        active: _active,
        onChanged: _handleTapboxChanged,
      ),
    );
  }
}

class Tapboxc extends StatefulWidget {
  Tapboxc({Key key, this.active: false, @required this.onChanged})
      : super(key: key);
  final bool active;
  final ValueChanged<bool> onChanged;

  _TapboxCState createState() => new _TapboxCState();
}

class _TapboxCState extends State<Tapboxc> {
  bool _highlight = false;
  void _handleTapDown(TapDownDetails details) {
    setState(() {
      _highlight = true;
    });
  }

  void _handleTapUp(TapUpDetails details) {
    setState(() {
      _highlight = false;
    });
  }

  void _handleTapCancel() {
    setState(() {
      _highlight = false;
    });
  }

  void _handleTap() {
    widget.onChanged(!widget.active);
  }

  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: _handleTapDown,
      onTapUp: _handleTapUp,
      onTap: _handleTap,
      onTapCancel: _handleTapCancel,
      child: Container(
        child: Center(
          child: Text(
            widget.active ? 'active' : 'inactive',
            textDirection: TextDirection.ltr,
            style: TextStyle(fontSize: 32, color: Colors.white),
          ),
        ),
        width: 200,
        height: 200,
        decoration: BoxDecoration(
            color: widget.active ? Colors.lightGreen[700] : Colors.grey[600],
            border: _highlight
                ? Border.all(color: Colors.teal[700], width: 10)
                : null),
      ),
    );
  }
}
```



## 基础组件

### 文本及样式

Text组件主要用于显示样式文本

```dart
import 'package:flutter/material.dart';

void main() => runApp(App());

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('文本组件'),
        ),
        body: Column(
          children: [
            Text(
              '你好世界',
              textAlign: TextAlign.left,
            ),
            Text(
              '你好世界,我是vkcyan' * 4,
              maxLines: 1, // 最多几行
              overflow: TextOverflow.ellipsis, // 超出后如何显示
            ),
            Text(
              '你好世界',
              textScaleFactor: 1.5,
            ), // textScaleFactor表示缩放比例
            Text(
              '你好世界',
              style: TextStyle(
                  color: Colors.blue,
                  fontSize: 18.0,
                  height: 1.2, //该属性用于指定行高,但是他不是一个绝对值,具体的高度是height*fontSize
                  fontFamily: 'Courier',
                  background: new Paint()..color = Colors.yellow,
                  decoration: TextDecoration.underline,
                  decorationStyle: TextDecorationStyle.dashed),
            ),
            Text.rich(TextSpan(children: [
              // Text.rich可以显示widget组件
              TextSpan(text: 'home:'),
              TextSpan(
                text: '111',
                style: TextStyle(color: Colors.blue),
                // recognizer: _tapRecognizer
              ),
            ])),
            // 如果很多的text的样式都是一样的,那就使用defaulttextstyle组件,里面的text组件,只要未指定inherit为false,就会继承样式
            DefaultTextStyle(
                style: TextStyle(color: Colors.red, fontSize: 20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('hello word'),
                    Text('I am jack'),
                    Text(
                      'i am jack',
                      style: TextStyle(inherit: false, color: Colors.grey),
                    ),
                  ],
                ))
          ],
        ),
      ),
    );
  }
}
```



### 按钮

```dart
import 'package:flutter/material.dart';

void main() => runApp(App());

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('按钮'),
        ),
        body: Column(
          children: [
            // 水波纹按钮
            RaisedButton(
              onPressed: () {},
              child: Text('水波纹按钮'), // 水波纹按钮默认有颜色,按下有水波纹
            ),
            // 扁平按钮,未点击没颜色,点击会置灰并存在水波纹
            FlatButton(onPressed: () {}, child: Text('扁平按钮')),
            // 带边框的按钮,水波纹的都有
            OutlineButton(
              onPressed: () {},
              child: Text('带边框'),
            ),
            // 可以点击的icon
            IconButton(icon: Icon(Icons.thumb_up), onPressed: () {}),
            // 所有的按钮都存在icon的构造函数,可以使用他添加带图标的按钮
            RaisedButton.icon(
                onPressed: () {}, icon: Icon(Icons.info), label: Text('发送')),
            // 自定义按钮 // 如果需要点击阴影就需要使用RaisedButton,这个组件支持
            FlatButton(
              color: Colors.blue, // 按钮背景颜色
              highlightColor: Colors.blue[700], // 按钮按下时候的背景色
              colorBrightness: Brightness.dark, // 按钮主题,
              splashColor: Colors.grey, // 点击时候的水波纹颜色
              child: Text('点击'), // 显示文字
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(20)), // 外形
              onPressed: () {},
            ),
          ],
        ),
      ),
    );
  }
}
```

### 文本组件

```dart
class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('文本组件'),
        ),
        body: Column(
          children: [
            Text(
              '你好世界',
              textAlign: TextAlign.left,
            ),
            Text(
              '你好世界,我是vkcyan' * 4,
              maxLines: 1, // 最多几行
              overflow: TextOverflow.ellipsis, // 超出后如何显示
            ),
            Text(
              '你好世界',
              textScaleFactor: 1.5,
            ), // textScaleFactor表示缩放比例
            Text(
              '你好世界',
              style: TextStyle(
                  color: Colors.blue,
                  fontSize: 18.0,
                  height: 1.2, //该属性用于指定行高,但是他不是一个绝对值,具体的高度是height*fontSize
                  fontFamily: 'Courier',
                  background: new Paint()..color = Colors.yellow,
                  decoration: TextDecoration.underline,
                  decorationStyle: TextDecorationStyle.dashed),
            ),
            Text.rich(TextSpan(children: [
              // Text.rich可以显示widget组件
              TextSpan(text: 'home:'),
              TextSpan(
                text: '名邦西城国际',
                style: TextStyle(color: Colors.blue),
                // recognizer: _tapRecognizer
              ),
            ])),
            // 如果很多的text的样式都是一样的,那就使用defaulttextstyle组件,里面的text组件,只要未指定inherit为false,就会继承样式
            DefaultTextStyle(
                style: TextStyle(color: Colors.red, fontSize: 20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('hello word'),
                    Text('I am jack'),
                    Text(
                      'i am jack',
                      style: TextStyle(inherit: false, color: Colors.grey),
                    ),
                  ],
                ))
          ],
        ),
      ),
    );
  }
}
```



### 按钮组件

```dart
class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('按钮'),
        ),
        body: Column(
          children: [
            // 水波纹按钮
            RaisedButton(
              onPressed: () {},
              child: Text('水波纹按钮'), // 水波纹按钮默认有颜色,按下有水波纹
            ),
            // 扁平按钮,未点击没颜色,点击会置灰并存在水波纹
            FlatButton(onPressed: () {}, child: Text('扁平按钮')),
            // 带边框的按钮,水波纹的都有
            OutlineButton(
              onPressed: () {},
              child: Text('带边框'),
            ),
            // 可以点击的icon
            IconButton(icon: Icon(Icons.thumb_up), onPressed: () {}),
            // 所有的按钮都存在icon的构造函数,可以使用他添加带图标的按钮
            RaisedButton.icon(
                onPressed: () {}, icon: Icon(Icons.info), label: Text('发送')),
            // 自定义按钮 // 如果需要点击阴影就需要使用RaisedButton,这个组件支持
            FlatButton(
              color: Colors.blue, // 按钮背景颜色
              highlightColor: Colors.blue[700], // 按钮按下时候的背景色
              colorBrightness: Brightness.dark, // 按钮主题,
              splashColor: Colors.grey, // 点击时候的水波纹颜色
              child: Text('点击'), // 显示文字
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(20)), // 外形
              onPressed: () {},
            ),
          ],
        ),
      ),
    );
  }
}
```



### 单选框复选框

```dart
import 'package:flutter/material.dart';

void main() => runApp(App());

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('单选框复选框'),
        ),
        body: SwitchAndcheckTestRouter(),
        // body: FocusTestRouteState(),
      ),
    );
  }
}

// 单选 多选 输入框基本操作
class SwitchAndcheckTestRouter extends StatefulWidget {
  _SwitchAndcheckTestRouterState createState() =>
      new _SwitchAndcheckTestRouterState();
}

class _SwitchAndcheckTestRouterState extends State<SwitchAndcheckTestRouter> {
  bool _switchSelected = false; // 单选
  bool _checkboxSelected = false; // 复选框
  TextEditingController _unameController =
      TextEditingController(); // 定义一个text的控制器
  GlobalKey _formKey = new GlobalKey<FormState>();
  void initState() {
    // 通过设置controller进行文本框的监听
    _unameController.addListener(() {
      print(_unameController.text);
    });

    // controller与onChanged的区别
    // change仅仅是为了监听文本的变化
    // controller想到与得到了该文本框的控制权 设置默认值 选择文本 等等
    _unameController.text = '设置的文本'; // 设置文本
    // 默认选择什么地方到什么地方的文字 (这里是第二位到最后一位)
    _unameController.selection = TextSelection(
        baseOffset: 2, extentOffset: _unameController.text.length);
  }

  Widget build(BuildContext context) {
    return Column(
      children: [
        Switch(
            activeColor: Colors.black87, // 选中颜色
            value: _switchSelected,
            onChanged: (value) {
              setState(() {
                _switchSelected = value;
              });
            }),
        Checkbox(
            value: _checkboxSelected,
            onChanged: (value) {
              setState(() {
                _checkboxSelected = value;
              });
            }),

        Padding(
          padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 24),
          child: Form(
              key: _formKey, // 用户后面获取FormState,
              child: Column(
                children: [
                  TextFormField(
                      autofocus: true, // 自动获取焦点
                      controller: _unameController, // 通过设置controller进行更新
                      decoration: InputDecoration(
                          labelText: '用户名',
                          hintText: '用户名或者邮箱',
                          prefixIcon: Icon(Icons.person)),
                      // 校验用户名
                      validator: (v) {
                        return v.trim().length > 0 ? null : "用户名不能为空";
                      }),
                  TextFormField(
                    decoration: InputDecoration(
                        labelText: '密码', // 未得到焦点的提示文字
                        hintText: '您的登录密码', // 得到焦点的提示文字
                        prefixIcon: Icon(Icons.lock) // 输入框图标
                        ),
                    //校验密码
                    validator: (v) {
                      return v.trim().length > 5 ? null : "密码不能少于6位";
                    },
                    onChanged: (v) {
                      // 通过车子change回调更新
                      print(v);
                    },
                    obscureText: true, // 隐藏正在编辑的文本,输入密码的场景
                  ),
                  Padding(
                    padding: const EdgeInsets.only(top: 28),
                    child: Row(
                      children: [
                        // 通过Builder来获取Rausedbutton所在的widget树真正的context
                        Expanded(child: Builder(builder: (context) {
                          return RaisedButton(
                            onPressed: () {
                              // 由于本widget也是form的子类,所以可以直接通过formState获取到
                              if (Form.of(context).validate()) {
                                //验证通过提交数据
                              }
                              // if ((_formKey.currentState as FormState)
                              //     .validate()) {
                              //   //验证通过提交数据
                              // }
                            },
                            child: Text('登录'),
                            color: Theme.of(context).primaryColor,
                            textColor: Colors.white,
                          );
                        })),
                      ],
                    ),
                  )
                ],
              )),
        ),

        // 自定义边框
        Container(
          child: TextField(
            keyboardType: TextInputType.emailAddress,
            decoration: InputDecoration(
                labelText: 'Email',
                hintText: '电子邮件地址',
                prefixIcon: Icon(Icons.email),
                border: InputBorder.none),
          ),
          decoration: BoxDecoration(
            border:
                Border(bottom: BorderSide(color: Colors.grey[600], width: 1)),
          ),
        ),
      ],
    );
  }
}

class FocusTestRouteState extends StatefulWidget {
  _FocusTestRouteState createState() => new _FocusTestRouteState();
}

// 输入框操作 移动焦点 隐藏键盘
class _FocusTestRouteState extends State<FocusTestRouteState> {
  FocusNode focusNode1 = new FocusNode();
  FocusNode focusNode2 = new FocusNode();
  FocusScopeNode focusScopeNode;

  void initState() {
    // 监听当前的输入框是否市区了焦点
    focusNode1.addListener(() {
      print(focusNode1.hasFocus);
    });
  }

  onPressed1() {
    // 移动焦点到第二个
    // 方法1
    // FocusScope.of(context).requestFocus(focusNode2);
    // 方法2
    if (focusScopeNode == null) {
      focusScopeNode = FocusScope.of(context);
    }
    focusScopeNode.requestFocus(focusNode2);
  }

  onPressed2() {
    focusNode2.unfocus();
    focusNode1.unfocus();
  }

  @override
  Widget build(BuildContext context) {
    return Theme(
      // 由于提示文本的TextField在会值下划线时候使用的颜色是主题色里面的hintColor,但是提示文字的颜色也是hintColor,如果我直接修改lintColor,这都会发生变化
      // flutter中theme提供了设置提示文字的字段,覆盖子类样式
      data: Theme.of(context).copyWith(
          hintColor: Colors.grey[200],
          inputDecorationTheme: InputDecorationTheme(
              labelStyle: TextStyle(color: Colors.blue), // 定义未选中提示文本的字样
              hintStyle:
                  TextStyle(color: Colors.blue, fontSize: 24))), // 定义提示文本的字样
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          children: [
            TextField(
              autofocus: true,
              focusNode: focusNode1,
              decoration: InputDecoration(
                  labelText: '输入框1',
                  hintText: '请输入',
                  // 未选中的文本框颜色
                  enabledBorder: UnderlineInputBorder(
                      borderSide: BorderSide(color: Colors.grey)),
                  // 选中的文本框颜色
                  focusedBorder: UnderlineInputBorder(
                      borderSide: BorderSide(color: Colors.black))),
            ),
            TextField(
              focusNode: focusNode2,
              decoration: InputDecoration(labelText: '输入框2'),
            ),
            Builder(
              builder: (ctx) {
                return Column(
                  children: [
                    RaisedButton(
                      onPressed: onPressed1,
                      child: Text('移动焦点'),
                    ),
                    RaisedButton(
                      onPressed: onPressed2,
                      child: Text('隐藏键盘'),
                    )
                  ],
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
```



### 进度指示器

> 线性指示器
>
> 圆形指示器
>
> 可自定义颜色，与大小线条宽度 圆形指示器大小

```dart
import 'package:flutter/material.dart';

void main() => runApp(App());

class App extends StatelessWidget {
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
          appBar: AppBar(
            title: Text('进度指示器'),
          ),
          body: Column(
            children: [
              // 未指定进度就是一直在动
              LinearProgressIndicator(
                backgroundColor: Colors.grey[200],
                valueColor: AlwaysStoppedAnimation(Colors.blue),
              ),
              // 指定进度就是到指定位置
              LinearProgressIndicator(
                backgroundColor: Colors.grey[200],
                valueColor: AlwaysStoppedAnimation(Colors.blue),
                value: 0.5,
              ),
              // 圆形加载中进度条
              CircularProgressIndicator(
                backgroundColor: Colors.grey[200], // 底色
                valueColor: AlwaysStoppedAnimation(Colors.blue), // 加载中颜色
                strokeWidth: 5, // 进度条粗细
              ),
              // 原型指定进度进度条
              CircularProgressIndicator(
                backgroundColor: Colors.grey[200],
                valueColor: AlwaysStoppedAnimation(Colors.blue),
                value: 0.5,
              ),
              // 自定义尺寸
              // 关于line circular,并没有提供很多的指定的api,例如line1的线的粗细 circular 的圆的大小
              // 这两个组件都是取决于父容器的尺寸进行绘制的边界,所以可以通过只存限制类widget进行指定尺寸
              SizedBox(
                height: 13,
                child: LinearProgressIndicator(
                  backgroundColor: Colors.grey[200],
                  valueColor: AlwaysStoppedAnimation(Colors.blue),
                  value: 0.5,
                ),
              ),
              // 宽高不一致会变成椭圆
              SizedBox(
                height: 100,
                width: 90,
                child: CircularProgressIndicator(
                  backgroundColor: Colors.grey[200],
                  valueColor: AlwaysStoppedAnimation(Colors.blue),
                  value: 0.7,
                ),
              ),
              ProgressRoute(),
            ],
          )),
    );
  }
}

class ProgressRoute extends StatefulWidget {
  _ProgressRouteState createState() => _ProgressRouteState();
}

class _ProgressRouteState extends State<ProgressRoute>
    with SingleTickerProviderStateMixin {
  AnimationController _animationController;

  void initState() {
    _animationController =
        new AnimationController(duration: Duration(seconds: 3), vsync: this);
    _animationController.forward();
    _animationController.addListener(() {
      setState(() {});
    });
    super.initState();
  }

  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  Widget build(BuildContext context) {
    print(_animationController.value);
    return SingleChildScrollView(
      child: Column(
        children: [
          Padding(
            padding: EdgeInsets.all(16),
            child: LinearProgressIndicator(
              backgroundColor: Colors.grey[200],
              valueColor: ColorTween(begin: Colors.grey, end: Colors.blue)
                  .animate(_animationController),
              value: _animationController.value,
            ),
          )
        ],
      ),
    );
  }
}
```



## 布局类组件

widget树主要可以分为 

| 类型             | 例子         | widget                        |
| ---------------- | ------------ | ----------------------------- |
| 无叶子节点       | Image        | LeafRenderObjectWidget        |
| 包含一个叶子节点 | DecoratedBox | SingleChildRenderObjectWidget |
| 包含多个叶子节点 | Column，Row  | MultiChildRenderObjectWidget  |



container： 容器组件

row：横向组件

column：竖向组件

flex：row column的封装组件

Expanded：可以指定flex占用的组件

SizedBox： 盒子组件

*Container*：容器组件

Wrap：流式布局组件

Flow：高级流式布局组件

Stack：允许子组件堆叠的组件

Positioned：可以根据Stack四个角来进行绝对定位

Align：相对布局组件



```dart
    Wrap(
      spacing: 8, // 主轴(水平)方向间距
      runSpacing: 4, // 纵轴(垂直)方向间距
      alignment: WrapAlignment.center, // 布局方式 start 从左边开始排列 center 每行都居中
      children: [
        Chip(
          label: Text('第一312321312'),
          avatar: CircleAvatar(
            backgroundColor: Colors.blue,
            child: Text('A'),
          ),
        ),
        Chip(
          label: Text('第二'),
          avatar: CircleAvatar(
            backgroundColor: Colors.blue,
            child: Text('A'),
          ),
        ),
        Chip(
          label: Text('第三1'),
          avatar: CircleAvatar(
            backgroundColor: Colors.blue,
            child: Text('A'),
          ),
        ),
        Chip(
          label: Text('第四312312312'),
          avatar: CircleAvatar(
            backgroundColor: Colors.blue,
            child: Text('A'),
          ),
        )
      ],
    ),
```



