# ionic学习记录

ioinc调用原生是借助cordova进行实现的

ioinc = cordova + angular + ioincUI

### 安装

```bash
npm install -g @ionic/cli

ionic start myApp tabs

ionic serve
```



#### 页面的基本组成结构（页面组件）

```html
头部内容写在这里面
<ion-header></ion-header>
页面内部内容写在这里面
<ion-content></ion-content>
```

#### 页面的基本组成结构（根组件）

```js
// angular ioinc  核心包
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouteReuseStrategy } from '@angular/router'
import { IonicModule, IonicRouteStrategy } from '@ionic/angular'
// 启动屏 以及 导航条服务
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx'
// 路由模块 以及 核心组件
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

@NgModule({
  declarations: [AppComponent], // 声明组件
  entryComponents: [], // 配置不会在模板中使用的组件
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule], // 引入的模块 依赖的模块
  providers: [
    // 需要的服务
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent], // 组件
})
export class AppModule {}
```





#### 创建公共组件

````
1. 创建一个模块module
2. 创建一个组件component
3. 编写组件代码
4. module中进行组件导出export
5. 使用的组件里面进行import
````





#### 按钮组件

````html
<!-- 
block 圆角
full 直角
-->
<ion-button expand="block"> 圆角 </ion-button>
<ion-button expand="full"> 直角 </ion-button>
<!-- 
outline 镂空
clear 无背景颜色
-->
<ion-button expand="full" fill="outline"> 镂空 </ion-button>
<ion-button expand="full" fill="clear"> 无 </ion-button>
<!-- 
图片加文字组合
通过插槽的形式放置的
正常的图片都应该这样
-->
<ion-button>
  <ion-icon slot="start" name="add"></ion-icon>
  前置
</ion-button>

<!-- 单图片 无文字 -->
<ion-button fill="clear">
  <ion-icon slot="icon-only" name="add"></ion-icon>
</ion-button>
<!-- 
按钮大小
large 大按钮
small 小按钮
-->
<ion-button size="large"> 大按钮 </ion-button>
<ion-button size="small"> 大按钮 </ion-button>

<ion-button mode="ios"> 平台 </ion-button>
<ion-button mode="md"> 平台 </ion-button>
````



#### 布局组件

````html
<!-- 顶部状态栏都写在这里面 -->
<ion-header>
  <!-- 固定布局用,必须要加上 -->
  <ion-toolbar>
    <!-- 左侧插槽 -->
    <ion-buttons slot="start">
      <ion-back-button defaultHref="/" [text]="'返回'"></ion-back-button>
    </ion-buttons>
    <!-- 标题 -->
    <ion-title>整体布局学习</ion-title>
    <!-- 右侧插槽 -->
    <ion-buttons slot="end" fill="clear">
      <ion-button>
        <ion-icon slot="icon-only" name="add"></ion-icon>
      </ion-button>
      <ion-button>
        <ion-icon slot="icon-only" name="add"></ion-icon>
      </ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>

<!-- 主要内容都写在这里面 -->
<ion-content>
  <ion-list>
    <ion-item>
      <ion-label>Awesome Label</ion-label>
    </ion-item>
    <ion-item>
      <ion-label>Awesome Label</ion-label>
    </ion-item>
    <ion-item>
      <ion-label>Awesome Label</ion-label>
    </ion-item>
  </ion-list>
</ion-content>

<!-- 固定在页面底部的元素 -->
<ion-footer>
  <!-- 用户固定位置 -->
  <ion-toolbar>
    <ion-title>底部</ion-title>
  </ion-toolbar>
</ion-footer>
````



#### 列表组件

```html
<!--
  下划线铺满 
  增加链接，自动增加右侧箭头按钮
  增加分组功能
  增加小头像功能
  增加大头像功能
  滑动列表功能
-->
<ion-list lines="full">
  <ion-item [routerLink]="'/toolbar'">
    <!-- 给列表价图标 -->
    <ion-icon slot="start" name="search"></ion-icon>
    <ion-label>1</ion-label>
  </ion-item>
  <ion-item>
    <ion-label>2</ion-label>
  </ion-item>
  <ion-item>
    <ion-label>3</ion-label>
  </ion-item>
  <ion-item>
    <ion-label>4 </ion-label>
  </ion-item>
  <ion-item-divider>
    <ion-label>分组</ion-label>
  </ion-item-divider>
  <ion-item>
    <ion-label>5 </ion-label>
  </ion-item>
  <ion-item>
    <ion-label>6 </ion-label>
  </ion-item>
</ion-list>
<!-- 列表中的图片 -->
<ion-list>
  <!-- 左侧图片 -->
  <ion-item>
    <ion-avatar slot="start">
      <img src="../../assets/icon/favicon.png" />
    </ion-avatar>
    <ion-label>头像</ion-label>
  </ion-item>
  <!-- 右侧图片 -->
  <ion-item>
    <ion-avatar slot="end">
      <img src="../../assets/icon/favicon.png" />
    </ion-avatar>
    <ion-label>头像</ion-label>
  </ion-item>
</ion-list>
<!-- 列表中的大图片 -->
<ion-list>
  <ion-item>
    <ion-thumbnail slot="start">
      <img src="../../assets/icon/favicon.png" />
    </ion-thumbnail>
    <ion-label>大图片</ion-label>
  </ion-item>
  <ion-item>
    <ion-thumbnail slot="end">
      <img src="../../assets/icon/favicon.png" />
    </ion-thumbnail>
    <ion-label>大图片</ion-label>
  </ion-item>
</ion-list>
<!-- 滑动菜单 -->
<ion-list>
  <ion-list>
    <ion-item-sliding>
      <!-- 显示文字 -->
      <ion-item>
        <ion-label>可滑动组件</ion-label>
      </ion-item>
      <!-- 左侧按钮 -->
      <ion-item-options side="start">
        <ion-item-option color="success">电话</ion-item-option>
        <ion-item-option color="primary">视频</ion-item-option>
      </ion-item-options>
      <!-- 右侧按钮 -->
      <ion-item-options side="end">
        <ion-item-option>
          <ion-icon slot="top" name="add"></ion-icon>
          删除
        </ion-item-option>
      </ion-item-options>
    </ion-item-sliding>
  </ion-list>
</ion-list>
```



#### form表单组件

> 输入框 单选框 多选框 弹出选择框 切换组件 文本域 

```html
<ion-list>
  <ion-item>
    <ion-label>账号</ion-label>
    <ion-input placeholder="请输入账号"></ion-input>
  </ion-item>
  <ion-item>
    <ion-label>密码</ion-label>
    <ion-input placeholder="请输入密码"></ion-input>
    <ion-icon slot="end" name="close" color="success"></ion-icon>
  </ion-item>
</ion-list>
<ion-list>
  <ion-item-divider>
    <ion-label>表单测试</ion-label>
  </ion-item-divider>
  <ion-item>
    <ion-label>姓名</ion-label>
    <ion-input type="text" [(ngModel)]="peopleInfo.username"></ion-input>
  </ion-item>
  <ion-item>
    <ion-label>年纪</ion-label>
    <ion-input type="number" [(ngModel)]="peopleInfo.age"></ion-input>
  </ion-item>
  <ion-item>
    <ion-label>汉族</ion-label>
    <ion-toggle slot="end" [(ngModel)]="peopleInfo.flag"></ion-toggle>
  </ion-item>
  <ion-item-divider>
    <ion-label>单选</ion-label>
  </ion-item-divider>
  <ion-list>
    <ion-radio-group name="auto" [(ngModel)]="peopleInfo.payType">
      <ion-item>
        <ion-label>支付宝</ion-label>
        <ion-radio value="1"></ion-radio>
      </ion-item>
      <ion-item>
        <ion-avatar>
          <img src="../../assets/icon/favicon.png" />
        </ion-avatar>
        <ion-label>微信</ion-label>
        <ion-radio value="2"></ion-radio>
      </ion-item>
    </ion-radio-group>
  </ion-list>
  <ion-item-divider>
    <ion-label>多选</ion-label>
  </ion-item-divider>
  <ion-item *ngFor="let item of peopleInfo.checkBoxList">
    <ion-label>{{item.val}}</ion-label>
    <ion-checkbox slot="end" [(ngModel)]="item.isChecked"></ion-checkbox>
  </ion-item>
  <ion-item>
    <ion-label>选择城市</ion-label>
    <ion-item>
      <ion-select [(ngModel)]="peopleInfo.city">
        <ion-select-option
           *ngFor="let item of peopleInfo.cityList"
           [value]="item">
          {{item}}
        </ion-select-option>
      </ion-select>
    </ion-item>
  </ion-item>
  <ion-item>
    <ion-label>描述</ion-label>
    <ion-textarea placeholder="请输入文字" [(ngModel)]="peopleInfo.text"></ion-textarea>
  </ion-item>
</ion-list>

 peopleInfo = {
    username: '',
    age: 20,
    flag: true,
    payType: '1',
    checkBoxList: [
      { val: '吃饭', isChecked: false },
      { val: '睡觉', isChecked: false },
      { val: '打豆豆', isChecked: false },
    ],
    cityList: ['北京', '上海', '广州'],
    city: '北京',
    text: '',
  }

```





#### 轮播图

> ionic的轮播图组件是基于swiper.js的那个东西比较难用，所以有问题需要看那个文档

```html
<ion-slides [options]="slideOptions" #slide1 (ionSlideTouchEnd)="slideChangeEnd()">
  <ion-slide>
    <img src="../../assets/icon/favicon.png" alt="" />
  </ion-slide>
  <ion-slide>
    <h1>Awesome Slide Content</h1>
  </ion-slide>
  <ion-slide>
    <h1>Awesome Slide Content</h1>
  </ion-slide>
</ion-slides>

<ion-slides #slide2>
  <ion-slide>
    <img src="../../assets/icon/favicon.png" alt="" />
  </ion-slide>
  <ion-slide>
    <h1>Awesome Slide Content</h1>
  </ion-slide>
  <ion-slide>
    <h1>Awesome Slide Content</h1>
  </ion-slide>
</ion-slides>
<ion-button (click)="slideNest()" expand="block" fill="clear" shape="round">
  点击
</ion-button>
```



```js
@ViewChild('slide1') slide1: any
@ViewChild('slide2') slide2: any

slideOptions = {
  effect: 'flip', // 轮播效果
  autoplay: {
    delay: 300,
  },
  loop: true, // 循环
}
constructor() {}

ngOnInit() {}
slideNest() {
  //  下一个的api
  this.slide2.slideNext()
}
slideChangeEnd() {
  console.log('再次开启')
  this.slide1.startAutoplay()
}
```





