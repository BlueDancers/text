# React-transition-group

类似Vue自带的动画插件,将div状态分成

.slide-enter {

   // 显示的时候的运行站台

  }

  .slide-enter-active {

​    // 显示的结果

  }

  .slide-exit {

​    // 离开运行状态

  }

  .slide-exit-active {

​    // 离开的结果

  }

```
// 在js里面使用 CSSTransition  进行动画的包裹
import { CSSTransition } from "react-transition-group";
 <SearchWrapper>
 <CSSTransition
     in={this.state.focused}
     timeout={500}
     classNames="slide"
 >
 <NavSearch
     className={this.state.focused ? "focused" : ""}
     onFocus={this.handInputFocus}
     onBlur={this.handInputBlur}
 />
 </CSSTransition>
 <i className={this.state.focused ? "focused iconfont" : "iconfont"}>&#xe614;</i>
 </SearchWrapper>
```

