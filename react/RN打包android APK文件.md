# RN打包android APK文件

## 前言

​	公司最近有一个APP项目，我之前听说过`react-native` `weex` ，主动请缨，想试试写原生APP，后来选择了RN，因为RN的文档比较简单易(手动狗头)，于是开始了RN的学习与实践，所有的RN代码在我[github](https://github.com/vkcyan/react-native-demo)中







​	今天打包RN项目成功了，因为我的电脑是`win`的系统，所以没办法去尝试`ios`的app，虽然打包成功都有点迷迷糊糊的，但是按照别人的流程走，中间报了几个错，都google解决了，也算是确定了RN写原生APP是可信的，这里记录一下我打包成功了流程

> 看了这个大佬的博客[008-React-Native-Android-打包，修改名称图标](https://www.jianshu.com/p/b8811669bcb6)

> 前提条件 打包的项目必须可以跑起来 - _ - 

### 修改APP名称

```xml
<!-- .\android\app\src\main\res\values\strings.xml -->
<resources>
    <string name="app_name">app名称</string>
</resources>
```

### 修改APP图标

```xml
<!-- .\android\app\src\main\res\mipmap-xxdpi xx适配不同大小屏幕 替换掉图片即可 -->
```



## 打包生成android APP

### 生成一个签名秘钥

> 用keytool命令生成一个私有密钥，keytool是android studio自带的工具
>
> 在 `Android\Android Studio\jre\jre\bin` 目录里面

在该目录下启动cmd，输入一下命令

```bash
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

> 命令里面会要求输入密码 一些信息，随便输就行了，密码记着，后面有用，最后会在当前目录生成一个 `my-release-key.keystore`

这条命令会要求你输入密钥库（keystore）和对应密钥的密码，然后设置一些发行相关的信息。最后它会生成一个叫做my-release-key.keystore的密钥库文件。

在运行上面这条语句之后，密钥库里应该已经生成了一个单独的密钥，有效期为10000天。--alias参数后面的别名是你将来为应用签名时所需要用到的，所以记得记录这个别名。



最后将放到工程里面的.\android\app目录下

### 设置gradle变量

在`C:\Users\用户名\.gradle`下 新建文件 `gradle.properties` 有的话就不用新建了

添加以下代码

````properties
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=******(你设置的密码)
MYAPP_RELEASE_KEY_PASSWORD=******(你设置的密码)
````

上面的这些会作为全局的gradle变量



### 添加签名秘钥到项目的gradle配置文件里面

```groovy
android {
	// ...
    signingConfigs {
        release {
            storeFile file(MYAPP_RELEASE_STORE_FILE)
            storePassword MYAPP_RELEASE_STORE_PASSWORD
            keyAlias MYAPP_RELEASE_KEY_ALIAS
            keyPassword MYAPP_RELEASE_KEY_PASSWORD
        }
    }
    buildTypes {
        release {
            // ...
            signingConfig signingConfigs.release
        }
    }
}

```

到这里配置打包APK也就完成了

接下来就是打包了

进入项目里面的`android`目录下

```bash
gradlew assembleRelease
```

就会开始打包ing...........

### 出现的报错

这里我报错了....

````bash
error: failed to read PNG signature: file does not start with PNG signature.
````

看了一会，因为我的项目里面用了PNG格式的文件 找到了问题 [Failed to read PNG signature: file does not start with PNG signature](https://github.com/youngjuning/youngjuning.github.io/issues/123)

#### 解决

在 `android/app/build.gradle` 中加入下面的代码：

````groovy
buildTypes {
    release {
      // ...
      aaptOptions.cruncherEnabled=false // here
    }
  }
````

#### 可能的原因

gradle打包检查时报错编译通不过的。我们通过 `aaptOptions.cruncherEnabled=false` 来禁止 Gradle 检查png的合法性



然后就不打包androidAPK成功啦



