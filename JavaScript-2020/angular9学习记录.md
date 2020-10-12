# angular9学习记录

看了angular也有好几天了，还会有些不解的地方，但是总体基本没什么压力，与日常的vue+ts的语法几乎一致

本文主要记录学习angular8的一些知识，心得与注意事项



#### 模板循环

> 语法与v-for很相似，不一样的是ng提供了一些快捷的数值

```js
*ngFor="let item of tabs;
				let index = index;
				let first = first;
				let last = last;
				let even = even;
				let odd = odd"
```



#### 模板判断

> 语法与v-if的语法很像

```html
<ng-container *ngIf="index === selectId; else elseTemplate">
// ......
</ng-container>

<ng-template #elseTemplate>
// ......
</ng-template>
```



#### 向子组件传入值

```
// 父组件html
[tabs]="tabs"  // 将tabs这个变量传入子组件 子组件使用tabs进行接收


// 子组件 ts
@Input() tabs: menuInter[]; //接收到父组件的值，并进行接口限制
```



#### 子组件通知父组件函数执行

```
  // 子组件
  // 创建通知
  @Output() tabSelectd = new EventEmitter(); // 创建输出方法
  
  // 执行
  this.tabSelectd.emit(...); // 向父组件传递 tabSelectd 这个方法 并携带参数
   
   
  父组件html
  (tabSelectd)="tabSelected($event)" 通过tabSelectd进行接收，并传递到本来的方法里面，参数通过$event传递
  
```



绑定css，style值

```
[class.active]="true" // 绑定class
[ngClass]="{active:true}" // 绑定class
[ngStyle]="{color:'white'}" // 绑定css
```



#### 生命周期

![](http://www.vkcyan.top/FkXF0BF06Xvsq6Ms8qzn7f13SY39.png)



```js
 // 此api有点类似于watch的监听函数,父组件传入的数值一旦发生改变都会被这个函数监听,并实时进行数据的回调
  ngOnChanges(changes: SimpleChanges): void {
    console.log("组件数值字变化", changes);
  }
  // 组件初始化
  ngOnInit(): void {
    console.log("组件初始化");
  }
  // 脏值检测 这个挺复杂的
  ngDoCheck(): void {
    console.log("子组件,脏值检测");
  }
  // 组件内容初始化 组件内容为例如插槽
  ngAfterContentInit(data): void {
    console.log("组件内部数据初始化", data);
  }
  /**
   * 组件内容脏值检测
   */
  ngAfterContentChecked(): void {
    console.log("组件内容脏值检测");
  }
  /**
   * 组件包括所有的子组件全部初始化完成
   */
  ngAfterViewInit(): void {
    console.log("子组件全部视图初始化完成");
  }
  /**
   * 组件完成的脏值检测
   */
  ngAfterViewChecked(): void {
    console.log("子组件视图的脏值检测");
  }
  // 页面卸载
  ngOnDestroy(): void {
    console.log('页面卸载.进行内存的一些清理');
  }
```



#### 对dom进行操作



```js
// 获取dom
// 在组件上加#imgSlider 对指定dom进行获取  static为true代表组件为静态组件 false表示为动态组件
@ViewChild("imgSlider", { static: true }) imgSlider: ElementRef; 
// 获取指定ng组件的dom
@ViewChild("ImageSliderComponent") imgSlider: ImageSliderComponent; 
// 获取多个dom #img
@ViewChildren('img') imgs:QueryListK<ElementRef>
  
  
  
 // 对dom进行操作
 ngAfterViewInit(): void {
    // dom初始化的时候获取dom更加合理
  console.log("单个轮播图", this.swiperImg);
  this.swiperImg.map((e) => {
      // e.nativeElement.style.height = "100px";
      // 使用rd2进行dom的操作相对于直接修改dom是更加安全的,这是恩家推荐的的写法
    this.rd2.setStyle(e.nativeElement,'height','100px');  
  });
}

@ViewChild总结
@ViewChild用来值类中引用dom节点，可以是angular组件也可以是html组件
dom操作建议在ngAfterViewInit进行处理，因为这时候必定是生命周期完成的时候
```



#### 双向绑定

主要语法: [(ngModel)]

这个语法糖实际上是 [ngModel]与（ngModelChange）方法的简写

````html
<!-- 传统写法 -->
<input type="text" [value]="username" (input)="changeUserName($event)">
<span>你好:{{ username }}</span>
<!-- 双向绑定语法糖写法 -->
<input type="text" [(ngModel)]="username" />
<span>你好:{{ username }}</span>

<!-- 双向绑定简略 -->
<input type="text" [ngModel]="username" (ngModelChange)="modelUserName($event)" />
<span>你好:{{ username }}</span>
````



组件数据的双向绑定语法糖

````js
// 子组件得到父组件的username 
// 父组件通过usernameChange将变化的值告诉父组件
@Input() username: string = ""; // 父组件的值
@Output() usernameChange = new EventEmitter(); // 

modelUserName(value: string): void {
  this.usernameChange.emit(value);
}

<!-- [(username)]是下面的语法糖,帮助我们完成自动的绑定事件以及赋值 -->
<app-horizontal-grid [(username)]="username"></app-horizontal-grid>
<app-horizontal-grid [username]="username" (usernameChange)="usernameChange($event)"></app-horizontal-grid>
````



#### 模块

declarations：模块拥有的组件，指令或者管道。注意每个组件，指令，管道只能在一个模块中声明

Prociders：模块中需要使用的服务

exports：白鹭给其他模块的组件，指令，管道

imports：导入本模块需要的依赖模块



创建模块：ng g m Home --routing

··· 





#### 装饰器(注解)

装饰器就是一个函数，但是他会返回一个函数

装饰器是ts实现的，不是angular特有的

```js
@Emoji() emojiData: string = "表情";

/**
 * 变量注解的实现
 */
export function Emoji() {
  return (target: object, key: string) => {
    console.log("注解", target, key);
    let val = target[key];
    const getters = () => {
      return val;
    };

    const setter = (value: string) => {
      val = `💰${value}💰`;
    };

    Object.defineProperty(target, key, {
      get: getters,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
}


@confirmable('您确认要执行嘛')
modelUserName(value: string): void {
	this.usernameChange.emit(value);
}

/**
 * 函数注解
 * @param message 提示文字
 */
export function confirmable(message: string) {
  // desc 就是代指这个方法
  return (target: object, key: string, desc: PropertyDescriptor) => {
    const orginal = desc.value;
    desc.value = function (...args: any) {
      const allow = window.confirm(message);
      let result;
      if (allow) {
        result = orginal.apply(this, args);
      } else {
        result = null;
      }
      return result;
    };
    return desc;
  };
}
```



#### 指令

结构型指令 ngIf ngFor ngSwitch(改变文档结构)

属性型指令 ngClass ngStyle ngModel（改变行为，改变class改变value）

```js
import { Directive, ElementRef, Renderer2, Output, Input } from "@angular/core";

@Directive({
  selector: "[appGridItemImage]",
})
export class GridItemImageDirective {
  @Input() imageSize = "1rem";
  constructor(private ref: ElementRef, private rd2: Renderer2) {}
  ngOnInit(): void {
    console.log(this.imageSize);
    this.rd2.setStyle(this.ref.nativeElement, "grid-area", "image");
    this.rd2.setStyle(this.ref.nativeElement, "width", this.imageSize);
    this.rd2.setStyle(this.ref.nativeElement, "height", this.imageSize);
  }
}


<img appGridItemImage [imageSize]="'2rem'" [src]="item.icon" alt="">
```

属性型指令不关心节点元素，但是可以通过指令进行样式的修改，并且进行数值的传入，达到动态设置样式的功能

#### 指令注解

指令设置样式，监听方法都可以通过指令的方式去实现

> 样式使用注解 **HostBinding**进行宿主样式的绑定
>
> 方法使用注解**HostListener**进行宿主事件监听

```js
@Directive({
  selector: "[appGridItemImage]",
})
export class GridItemImageDirective {
  @Input() imageSize = "1rem";
  @HostBinding("style.grid-area") gridArea = "image";
  @HostBinding("style.width") get width() {
    return this.imageSize;
  }
  @HostBinding("style.height") get height() {
    return this.imageSize;
  }
  @HostListener("click", ["$event.target"])
  handleClick(event: Element) {
    console.log(event);
  }
} 
```



#### 投影组件

> angular的投影组件就是vue中的插槽

```html
<!-- angular中的投影组件为 ng-content-->
<!-- 无插槽 -->
<!-- <ng-content></ng-content> -->
<!-- 标签插槽 -->
<!-- <ng-content select="span"></ng-content> -->
<!-- 指令插槽 -->
<!-- <ng-content select="[appGridItem]"></ng-content> -->
<!-- 选择器插槽 -->
<!-- <ng-content select=".add"></ng-content> -->
```







#### 路由

angular的路由有点vue路由的高级版本的意思

首先全局可以先注册路由

`app.routing.module.ts`

```js
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [{ path: "", redirectTo: "home", pathMatch: "full" }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```



每个模块也可以注册路由,最后通过自身模块导出，最后挂载到根模块

`home-routing.module.ts`

```js
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeContainerComponent } from "./components/home-container/home-container.component";
import { HomeDetailComponent } from "./components/home-detail/home-detail.component";

const routes: Routes = [
  {
    path: "home",
    component: HomeContainerComponent,
    children: [
      {
        path: "",
        redirectTo: "11",
        pathMatch: "full",
      },
      {
        path: ":tabLink",
        component: HomeDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
```



页面跳转函数

首先将方法通过construction注入进来，然后使用navigate进行跳转，这里意为跳转到`home/11`并且携带query的参数

```js
// 注入
constructor(private router: Router) {}
// 跳转
this.router.navigate(["home", '11', { queryParams: { aaa: 11 } });
// 跳转后路由
http://localhost:4200/home/33?aaa=11
```

接收路由参数

```js
constructor(private router: ActivatedRoute) {}

this.router.paramMap.subscribe((params) => {
  // 获取路由对象定义的路由参数
  console.log(params);
});
this.router.queryParamMap.subscribe((params) => {
  // 获取url后面跟的普通参数
  console.log(params);
});
```



在模板中的路由使用

```html

<a [routerLink]="['grand']">跳转</a>
<!-- routerLinkActive 如果是当前路由 css类名 就会生效 -->
<!-- [queryParams]="{ data: 1111, dddd: 22 }" -->
<a [routerLink]="['grand']" routerLinkActive="router_active">name</a>
<a [routerLink]="[{ outlets: { zore: ['aux'] } }]">同级容器</a>
```





关于pathMatch

pathMatch： 设置路由的匹配规则 默认为perfix

perfix：只匹配前缀，当路由是home的时候，/home /home/all，都会匹配到

full：表示需要进行完成的匹配才可以进行，比如当路由为home，只有匹配到/home，才会生效，

当路由设置为`{path: '',redirectTo: '/home'}`的时候，angular会报错，因为默认的pathMatch为`perfix`，如果为`perfix`的时候会只匹配前缀，所有路由的前缀都是''，所以就会都被匹配到，所以这种写法是会被警告的



#### 管道

> 管道在模板中的用法非常像vue的计算属性，主要用于对源数据进行处理，变成我们想要的样子，我觉得应该叫加工器

````html
<P> json格式化管道 {{ obj | json }}</P>
<p>时间管道 {{ date | date: "yyyy-MM-dd HH:mm:ss" }}</p>
<!-- currency为价格格式化管道 参数symbol 中 5为最小几位数 5为小数最小几位数 10 小数最大几位数 -->
<p>价格{{ price | currency: "CNY":"symbol":"5.5-10" }}</p>
<p>切割 {{ dataSlice | slice: 1:3 }}11</p>
<p>自定义管道 {{ date | appAge }}</p>
````



自定义管道

> 自定义管道很简单，就是一个函数，处理数据，然后返回数据

```html
<!-- 内置的一些比较好用点管道 -->
<P> json格式化管道 {{ obj | json }}</P>
<p>时间管道 {{ date | date: "yyyy-MM-dd HH:mm:ss" }}</p>
<!-- currency为价格格式化管道 参数symbol 中 5为最小几位数 5为小数最小几位数 10 小数最大几位数 -->
<p>价格{{ price | currency: "CNY":"symbol":"5.5-10" }}</p>
<p>切割 {{ dataSlice | slice: 1:3 }}11</p>
<p>自定义管道 {{ date | appAge }}</p>
```



```js
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "appAge" })
export class AgoPipe implements PipeTransform {
  transform(value: any): any {
    console.log("管道得到的值", value);
    const seconds = Math.floor(+new Date() - +new Date(value)) / 1000;
    if (seconds < 30) {
      return "刚刚";
    }
    const intervals = {
      年: 3600 * 24 * 365,
      月: 3600 * 24 * 30,
      周: 3600 * 24 * 7,
      天: 3600 * 24,
      小时: 3600,
      分钟: 60,
      秒: 1,
    };
    let counter = 0;
    for (const unit in intervals) {
      if (Object.prototype.hasOwnProperty.call(intervals, unit)) {
        const element = intervals[unit];
        counter = Math.floor(seconds / element);
        console.log(counter);

        if (counter > 0) {
          return `${counter} ${unit}`;
        }
      }
    }
    return value;
  }
}
```







#### 依赖注入

依赖注释就是预先将一个类实例化，便于后面模块使用

```js
router: Router;
service: HomeService;
constructor(router: Router, service: HomeService) {
	this.router = router;
	this.service = service;
}
// 依赖注入简单写法 
constructor(private router: Router, private service: HomeService) {}
```



`home.service.ts`

```ts
// 使用注解Injectable的类，就会被标识为可以被依赖注入的对象
// providedIn标识为注入到什么地方，一般官方推荐使用"root"，如果没有使用的话，就需要找module里面的provides里面进行手动注入
// 注入的模块在constructor里面进行类型指定即可
@Injectable({
  providedIn: "root",
})
export class HomeService {
  private tabs: menuInter[] = [];
  private sliders: ImageSlider[] = [];
  private channels: channel[] = [];
  getMenu() {
    return this.tabs;
  }
  getsliders() {
    return this.sliders;
  }
  getchannels() {
    return this.channels;
  }
}
```





#### 脏值检测

###### 脏值检测触发机制

<img src="http://www.vkcyan.top/Fv2NOJyQk0xvZoYSrH09yl00yS0N.png" style="zoom:30%;" />



###### 组件脏值检测生命周期

> 这里需要注意的是，由下面的组件生命周期可以得出在ngAfterViewChecked,AfterViewInit里面是不可以改变this里面的值的，不然就会出现无限循环的情况
>
> 



![](http://www.vkcyan.top/FhwXZI1VItFhESgcRAZ0tV5v3Lic.png)



如果变量的值不是一个定值，是类似于时间时间戳的，那么2次的脏值检查一定不会是一样的，就会发生错误，这时候就要借助，ngzone来帮我们完成动态数据的变化，zone会帮我们将数据放在另一个内存区域，不会让ng检查到，只有手动的触发脏值检测的时候才会进行页面数据的变化，这样就避免了动态渲染值的文字



对于快速的dom变化，不推荐进行脏值检查，推荐使用ViewChild的方式进行dom的更新



###### 脏值检测dom更新策略

![](http://www.vkcyan.top/FrI155_WtIjiZuTAcjc_jSYA70Zp.png)





对于一些志存制@input属性的显示组件推荐将其变为静态组件

````js
@Component({
  selector: "app-scroll-tab",
  templateUrl: "./scroll-tab.component.html",
  styleUrls: ["./scroll-tab.component.scss"],
  changeDetection:ChangeDetectionStrategy.OnPush // 只会监听@input变化的情况下才会进行脏值检测
})
````

这样就不会因为本身数据的变化而进行脏值检测，而是会根据传入数据变化进行脏值检测



#### RestAPI

![](http://www.vkcyan.top/Fq41BDbDHv8ybduazjgeGlP8prUA.png)



#### angular的http服务

![](http://www.vkcyan.top/Fm98WsPnspNXMwDVhpfEYYwX3rGr.png)

##### 导入http服务

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

@NgModule 里面进行impots里面进行注入

```js
// 在使用的地方就可以进行依赖注入
constructor(private http: HttpClient) {
    this.http.get("url；", { params: { aaa: "11" } }).subscribe((res) => {
      console.log(res);
    });
}

// 存在request方法，与axios方法有点相似

// 但是这是一个observer对象不是promise对象，observer对象只有调用subscribe的时候才会被调用，并获得回调函数

// 拦截器的应用
// ng的http拦截器是通过注入的方式进行实现的，所以需要写注入类，并在app.module.ts里面进行注册
app.module.ts
providers: [
  // 注入全局的http拦截器
  { provide: HTTP_INTERCEPTORS, useClass: ParamsInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: NotificationInterceptor, multi: true },
]
```



`前置拦截器`

```js
import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";

@Injectable()
export class ParamsInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log("请求拦截器");
    const reqNext = req.clone({
      // 动态修改request的信息
      setParams: { icode: "12313313131312" },
      setHeaders: {
        aaaaa: "12312312312",
      },
    });
    console.log("处理后的http", reqNext);

    return next.handle(reqNext);
  }
}
```



`后置拦截器`

````js
import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from "@angular/common/http";
import { tap } from "rxjs/operators";

@Injectable()
export class NotificationInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && event.status >= 200 && event.status < 300) {
          console.log("后置拦截器成功", event);
        }
      }),
    );
  }
}
````

![](http://www.vkcyan.top/FqvFcPF6GzXjIqxuLU_STU4cQS7a.png)



#### rxjs与angular

rxjs会把事件与数据看成一个流吗，随着事件流中的事件的变化随之做出相应的动作

在angular里面，针对rxjs进行了单独的优化

```js
tablink$: Observable<*string*>;

this.tablink$ = this.router.paramMap.pipe(
  filter((item) => item.has("tabLink")), // 从字典对象汇总获取键为这个的字段
  map((item) => item.get("tabLink")), // 将字段对象转为string类型
);

// 模板中 需要async修饰符进行修饰
<div *ngIf="(tablink$ | async) == '22'">url为22</div>

// 对于observeable对象，需要在ngOnDestroy里面进行订阅的取消
ngOnDestroy(): void {
    // 对于订阅的observeable需要进行手动的清除
  this.sub.unsubscribe()
}
```



#### rxjs

```js
rxjs主要需要理解的就是流的思想，pipe就是管道，流经过管道，最后流出来的是什么完全是我们流里面控制的

操作符
interval 计时器操作符
pipe 管道
map 加工器 可以将值进行出来
takeWhile 流必须满足条件，不满足则立刻结束流


ngOnInit() {
    this.countDown$ = interval(1000).pipe(
      map((data) => this.diffInSec(this.startDate, this.futurDate) - data),
      takeWhile((gap) => gap >= 0), // 如果为真 继续这个流 如果为假 结束这个流 filter 会过滤掉,但是不会结束
      map((data) => ({
        day: Math.floor(data / 3600 / 24),
        hour: Math.floor((data / 3600) % 24),
        minute: Math.floor((data / 60) % 60),
        second: Math.floor(data % 60),
      })),
      map((data) => `${data.hour}:${data.minute}:${data.second}`),
    );
  }

  private diffInSec(start: Date, future: Date) {
    const diff = future.getTime() - start.getTime();
    return Math.floor(diff / 1000);
  }
```









