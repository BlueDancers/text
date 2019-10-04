# React Native 使用IM库 解决即时通讯

市场上大部分APP,例如商城类的,几乎都需要聊天的功能,而这样的功能不论是UI还是功能都非常负责,成本很高

我经过调研,RN中有两个开源IM库比较优秀

[react-native-gifted-chat](https://github.com/FaridSafi/react-native-gifted-chat)

[aurora-imui](https://github.com/jpush/aurora-imui/blob/master/README_zh.md)

这里我选择了`极光`[aurora-imui](https://github.com/jpush/aurora-imui/blob/master/README_zh.md)



### 安装

[aurora-imui RN安装文档](https://github.com/jpush/aurora-imui/blob/master/ReactNative/README_zh.md)

```bash
npm install aurora-imui-react-native --save
react-native link aurora-imui-react-native
```

> 一般情况下 link会帮助我们添加好依赖,帮我们修改`gradle` 文件,但是这里不知道为什么,link后我检查文件发现`gradle` 文件没有修改,所以需要手动的去添加配置

然后在 app 的 `build.gradle`中引用：

```groovy
dependencies {
    compile project(':aurora-imui-react-native')
}
```

还需要手动修改一下 `settings.gradle` 中的引用路径：

```groovy
include ':app', ':aurora-imui-react-native'
project(':aurora-imui-react-native').projectDir = new File(rootProject.projectDir, '../node_modules/aurora-imui-react-native/ReactN
```

### android配置



MainApplication.java

```java
import cn.jiguang.imui.messagelist.ReactIMUIPackage;
// 引入package

@Override
protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
        new ReactIMUIPackage() // 添加
    );
}
```

#### Android release (打包 Release apk)

需要添加混淆代码到 app/proguard-rules.pro 文件中：

```
-keep class cn.jiguang.imui.** { *; }
```



到这里`android`已经安装完成了,我执行`react-native run android`,但是报错了

````bash
 Attribute application@allowBackup value=(false) from AndroidManifest.xml:22:7-34
        is also present at [cn.jiguang.imui:messagelist:0.7.4] AndroidManifest.xml:12:9-35 value=(true).
        Suggestion: add 'tools:replace="android:allowBackup"' to <application> element at AndroidManifest.xml:18:5-91:19 to override.
// .........................
建议：在AndroidManifest.xml：18：5-91：19中添加'tools：replace =“android：allowBackup”'到<application>元素以覆盖。
````

我按照报错提示添加了

```json
tools：replace =“android：allowBackup”
```

再次运行`react-native run android`,再次报错

````
与元素类型 "application
" 相关联的属性 "tools:replace" 的前缀 "tools" 未绑定。
````

这里不google不行的了,得到的解决方案是,**导入tools包**(我...........)

在AndroidManifest中最上方加入

```xml
xmlns:tools="http://schemas.android.com/tools"
```

最后如下图所示

````xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    package="com.ifuture.iagriculture">
````

再次启动`react-native run android`,启动成功,导入插件完成



### 使用aurora-imui



