React Native脱坑记录

> React Native 以下简称RN

- 官网文档非常友好,按步骤来基本不会出错[搭建开发环境](https://reactnative.cn/docs/getting-started.html),但是必须翻墙,安装`java`,`python2.x`,`node最新版`,`android studio`

### adb怎么使用?

`android studio`自带adb,adb需要配置到path目录下面,一般在`安装目录\dependent\platform-tools\`,将他加入到path目录下即可

![5zodWp.png](https://s1.ax2x.com/2018/11/21/5zodWp.png)

### **http://localhost:8081/debugger-ui/**没有日志?

需要在调试里面打开调试选项(默认不打开真的是搞不懂),真机摇一摇打开调试菜单,android模拟器在项目目录下执行命令`adb shell input keyevent 82`,模拟器会打开调试菜单,打开`Debug JS Remotely`即可

### React-Native里面使用PropTypes报错??

react15.5版本里面PropTypes已经被移除,需要使用的话需要安装插件

```bash
npm install --save prop-types
```





### React Native中的点击事件相关

`TouchableWithoutFeedback`: 按钮,但是没有视觉变化

弹窗:

```JavaScript
Alert.alert('提示','确定删除吗',[
    {text:'取消',onPress: ()=> {//...}},
    {text:'确认',onPress: ()=> {//...}},
])
```



事件: 

`onPress`: 单击事件

`onLongPress`: 长按事件

`onPressIn`: 单击开始事件

`onPressOut`: 单击结束事件

