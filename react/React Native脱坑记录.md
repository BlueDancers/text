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



### React Native中的样式表

[布局属性](https://reactnative.cn/docs/layout-props/)



### 安装axios出现无法运行的情况?!

可能是npm的原因,这里主要看报错信息,看是不是缺少依赖包,实在不行就重新 `react-native init 新项目 `



### 写到一半的应用再次打开白屏???

目前还不知道根本原因是什么,但是还算可以解决

```bash
1. 设置ip地址
	adb shell input keyevent 82
	ipconfig // 查看ip地址
2. 在虚拟器里面设置
	功能菜单里面的 `Dev Setting` > Debug server host & port for device 填入 ip:8081
	
3. 卸载上一个应用,重启 `react-native run-android`
```



### RN中监听键盘的打开关闭事件

```react
componentDidMount() {
    this.KeyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow
    )
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide
    )
  }
  componentWillUnmount() {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  _keyboardDidShow() {
    console.log('Keyboard Shown')
  }

  _keyboardDidHide() {
    console.log('Keyboard Hidden')
  }
```





> 不知道为什么,不管安装什么插件,都会报错,甚至难以解决

安装使用`react-native-image-picker` 这个组件用于解决类似`设置头像`的需求

```
yarn add react-native-image-picker
react-native link react-native-image-picker
```

安装完了启动

```bash
FAILURE: Build failed with an exception.                                                                                     
                                                                                                                             
* What went wrong:                                                                                                           
A problem occurred configuring project ':react-native-image-picker'.                                                         
> Could not resolve all files for configuration ':react-native-image-picker:classpath'.                                      
   > Could not download lint-checks.jar (com.android.tools.lint:lint-checks:25.2.3)                                          
      > Could not get resource 'https://jcenter.bintray.com/com/android/tools/lint/lint-checks/25.2.3/lint-checks-25.2.3.jar'
.                                                                                                                            
         > Could not HEAD 'https://jcenter.bintray.com/com/android/tools/lint/lint-checks/25.2.3/lint-checks-25.2.3.jar'.    
            > Remote host closed connection during handshake                                                                 
                                                                                                                             
* Try:                                                                                                                       
Run with --stacktrace option to get the stack trace. Run with --info or --debug option to get more log output. Run with --sca
n to get full insights.                                                                                                      
                                                                                                                             
* Get more help at https://help.gradle.org                                                                                   
                                                                                                                             
BUILD FAILED in 1m 2s                                                                                                        
Could not install the app on the device, read the error above for details.                                                   
Make sure you have an Android emulator running or a device connected and have                                                
set up your Android development environment:                                                                                 
https://facebook.github.io/react-native/docs/getting-started.html                                                            
```

复制 打开google 粘贴,看到一个人遇到差不多的问题,lssues已经关闭,看了貌似解决方法的回答

[Could not resolve all dependencies for configuration ':react-native-image-crop-picker:_debugPublishCopy'.](https://github.com/ivpusic/react-native-image-crop-picker/issues/574)

````JavaScript
// and if you keep BOTH maven lines? Like this. It worked for me.

maven {
  // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
  url "$rootDir/../node_modules/react-native/android"
}
maven { url "https://jitpack.io" }
````

于是我改了`/android/build.gradle`

```JavaScript
allprojects {
    repositories {
        mavenLocal()
        google()
        jcenter()
        maven {
            // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
            url "$rootDir/../node_modules/react-native/android"
        }
+        maven { url "https://jitpack.io" } // 
    }
}
```

再次启动,报错了

````JavaScript
FAILURE: Build failed with an exception.                                                                                     
                                                                                                                             
* What went wrong:                                                                                                           
Failed to capture snapshot of output files for task ':app:processDebugResources' property 'sourceOutputDir' during up-to-date
 check.                                                                                                                      
> Could not read path 'D:\code\react-native\demo4\android\app\build\generated\source\r\debug\android\arch\core'.             
                                                                                                                             
* Try:                                                                                                                       
Run with --stacktrace option to get the stack trace. Run with --info or --debug option to get more log output. Run with --sca
n to get full insights.                                                                                                      
                                                                                                                             
* Get more help at https://help.gradle.org                                                                                   
                                                                                                                             
BUILD FAILED in 24s                                                                                                          
73 actionable tasks: 60 executed, 13 up-to-date                                                                              
Could not install the app on the device, read the error above for details.                                                   
Make sure you have an Android emulator running or a device connected and have                                                
set up your Android development environment:                                                                                 
https://facebook.github.io/react-native/docs/getting-started.html                                                            
````

复制 打开google 粘贴,在`stackoverflow`看到现实的问题

[Error:Execution failed for task ':app:processDebugResources'. > java.io.IOException: Could not delete folder “” in android studio](https://stackoverflow.com/questions/35674066/errorexecution-failed-for-task-appprocessdebugresources-java-io-ioexcept)

````bash
I guess some of the files in the target build directory is open in another tool you use. Just a file handle open in the folder which has to be cleaned. The build task 'clean' wants to delete all the files in the build directory(normally 'target') and when it fails, the build fails.


From your react native folder run:

cd android && gradlew clean

THEN

cd .. && react-native run-android
````

打包明白了. 执行`gradlew clean`

执行`gradlew clean`,再次启动,没有报错了

### 点击拍照 打开图库闪退的问题

因为没有给予应用权限,在`android/app/src/AndroidManifest.xml`里面加权限

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
```



### 二维码扫插件`react-native-camera`的踩坑

首先安装

```bash
npm install react-native-camera --save
react-native link react-native-camera
```

添加权限

```xml
<uses-permission android:name="android.permission.CAMERA" />  
<uses-permission android:name="android.permission.RECORD_AUDIO"/>
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

启动`react-native run-android` 报错

````bash
> Task :app:mergeDebugAssets FAILED
Could not merge source set folders:
Error: There were multiple failures while executing work items


>任务：app：mergeDebugAssets FAILED
无法合并源集文件夹：
错误：执行工作项时出现多个故障
````

没头绪,再次启动,项目启动成功了.........

[仿ofo项目](https://github.com/MarnoDev/react-native-ofo),这个项目结构值得参考学习

![](https://camo.githubusercontent.com/6d8f978492abcec89233a26c50bc704cdd79efdf/687474703a2f2f75706c6f61642d696d616765732e6a69616e7368752e696f2f75706c6f61645f696d616765732f3936303238332d656534663837366431363833616361352e6a70673f696d6167654d6f6772322f6175746f2d6f7269656e742f7374726970253743696d61676556696577322f322f772f31323430)



