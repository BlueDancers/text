# React-router-dom

## BrowserRouter

`<BrowserRouter>` 使用 HTML5 提供的 history API (`pushState`, `replaceState` 和 `popstate` 事件) 来保持 UI 和 URL 的同步。

```
import { BrowserRouter } from 'react-router-dom';

<BrowserRouter
  basename={string}
  forceRefresh={bool}
  getUserConfirmation={func}
  keyLength={number}
>
  <App />
</BrowserRouter>
```

#### basename: string

所有位置的基准 URL。如果你的应用程序部署在服务器的子目录，则需要将其设置为子目录。`basename` 的正确格式是前面有一个前导斜杠，但不能有尾部斜杠。

```
<BrowserRouter basename="/calendar">
  <Link to="/today" />
</BrowserRouter>
```

上例中的 `<Link>` 最终将被呈现为：

```
<a href="/calendar/today" />
```

#### forceRefresh: bool

如果为 `true` ，在导航的过程中整个页面将会刷新。一般情况下，只有在不支持 HTML5 history API 的浏览器中使用此功能。

```
const supportsHistory = 'pushState' in window.history;

<BrowserRouter forceRefresh={!supportsHistory} />
```

#### getUserConfirmation: func

用于确认导航的函数，默认使用 [window.confirm](https://link.jianshu.com?t=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FWindow%2Fconfirm)。例如，当从 `/a` 导航至 `/b` 时，会使用默认的 `confirm` 函数弹出一个提示，用户点击确定后才进行导航，否则不做任何处理。译注：需要配合 `<Prompt>` 一起使用。

```
// 这是默认的确认函数
const getConfirmation = (message, callback) => {
  const allowTransition = window.confirm(message);
  callback(allowTransition);
}

<BrowserRouter getUserConfirmation={getConfirmation} />
```

#### keyLength: number

`location.key` 的长度，默认为 `6`。

```
<BrowserRouter keyLength={12} />
```

#### children: node

要呈现的[单个子元素（组件）](https://link.jianshu.com?t=https%3A%2F%2Freactjs.org%2Fdocs%2Freact-api.html%23react.children.only)。

## HashRouter

`<HashRouter>` 使用 URL 的 `hash` 部分（即 `window.location.hash`）来保持 UI 和 URL 的同步。

```
import { HashRouter } from 'react-router-dom';

<HashRouter>
  <App />
</HashRouter>
```

> 注意： 使用 `hash` 记录导航历史不支持 `location.key` 和 `location.state`。在以前的版本中，我们视图 shim 这种行为，但是仍有一些问题我们无法解决。任何依赖此行为的代码或插件都将无法正常使用。由于该技术仅用于支持旧式（低版本）浏览器，因此对于一些新式浏览器，我们鼓励你使用 `<BrowserHistory>` 代替。

#### basename: string

所有位置的基准 URL。`basename` 的正确格式是前面有一个前导斜杠，但不能有尾部斜杠。

```
<HashRouter basename="/calendar">
  <Link to="/today" />
</HashRouter>
```

上例中的 `<Link>` 最终将被呈现为：

```
<a href="#/calendar/today" />
```

#### getUserConfirmation: func

用于确认导航的函数，默认使用 [window.confirm](https://link.jianshu.com?t=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FWindow%2Fconfirm)。

```
// 这是默认的确认函数
const getConfirmation = (message, callback) => {
  const allowTransition = window.confirm(message);
  callback(allowTransition);
}

<HashRouter getUserConfirmation={getConfirmation} />
```

#### hashType: string

`window.location.hash` 使用的 `hash` 类型，有如下几种：

-  `slash` - 后面跟一个斜杠，例如 #/ 和 #/sunshine/lollipops
-  `noslash` - 后面没有斜杠，例如 # 和 #sunshine/lollipops
-  `hashbang` - Google 风格的 [ajax crawlable](https://link.jianshu.com?t=https%3A%2F%2Fdevelopers.google.com%2Fwebmasters%2Fajax-crawling%2Fdocs%2Flearn-more)，例如 #!/ 和 #!/sunshine/lollipops

默认为 `slash`。

#### children: node

要呈现的[单个子元素（组件）](https://link.jianshu.com?t=https%3A%2F%2Freactjs.org%2Fdocs%2Freact-api.html%23react.children.only)。

## Link

为你的应用提供声明式的、可访问的导航链接。

```
import { Link } from 'react-router-dom';

<Link to="/about">About</Link>
```

#### to: string

一个字符串形式的链接地址，通过 `pathname`、`search` 和 `hash` 属性创建。

```
<Link to='/courses?sort=name' />
```

#### to: object

一个对象形式的链接地址，可以具有以下任何属性：

-  `pathname` - 要链接到的路径
-  `search` - 查询参数
-  `hash` - URL 中的 hash，例如 #the-hash
-  `state` - 存储到 location 中的额外状态数据

```
<Link to={{
  pathname: '/courses',
  search: '?sort=name',
  hash: '#the-hash',
  state: {
    fromDashboard: true
  }
}} />
```

#### replace: bool

当设置为 `true` 时，点击链接后将替换历史堆栈中的当前条目，而不是添加新条目。默认为 `false`。

```
<Link to="/courses" replace />
```

#### innerRef: func

允许访问组件的底层引用。

```
const refCallback = node => {
  // node 指向最终挂载的 DOM 元素，在卸载时为 null
}

<Link to="/" innerRef={refCallback} />
```

#### others

你还可以传递一些其它属性，例如 `title`、`id` 或 `className` 等。

```
<Link to="/" className="nav" title="a title">About</Link>
```

## NavLink

一个特殊版本的 `<Link>`，它会在与当前 URL 匹配时为其呈现元素添加样式属性。

```
import { NavLink } from 'react-router-dom';

<NavLink to="/about">About</NavLink>
```

#### activeClassName: string

当元素处于激活状态时应用的类，默认为 `active`。它将与 `className` 属性一起使用。

```
<NavLink to="/faq" activeClassName="selected">FAQs</NavLink>
```

#### activeStyle: object

当元素处于激活状态时应用的样式。

```
const activeStyle = {
  fontWeight: 'bold',
  color: 'red'
};

<NavLink to="/faq" activeStyle={activeStyle}>FAQs</NavLink>
```

#### exact: bool

如果为 `true`，则只有在位置完全匹配时才应用激活类/样式。

```
<NavLink exact to="/profile">Profile</NavLink>
```

#### strict: bool

如果为 `true`，则在确定位置是否与当前 URL 匹配时，将考虑位置的路径名后面的斜杠。有关更多信息，请参阅 [](https://link.jianshu.com?t=https%3A%2F%2Freacttraining.com%2Freact-router%2Fweb%2Fapi%2FRoute%2Fstrict-bool) 文档。

```
<NavLink strict to="/events/">Events</NavLink>
```

#### isActive: func

添加额外逻辑以确定链接是否处于激活状态的函数。如果你要做的不仅仅是验证链接的路径名与当前 URL 的路径名相匹配，那么应该使用它。

```
// 只有当事件 id 为奇数时才考虑激活
const oddEvent = (match, location) => {
  if (!match) {
    return false;
  }
  const eventID = parseInt(match.params.eventID);
  return !isNaN(eventID) && eventID % 2 === 1;
}

<NavLink to="/events/123" isActive={oddEvent}>Event 123</NavLink>
```

#### location: object

`isActive` 默认比较当前历史位置（通常是当前的浏览器 URL）。你也可以传递一个不同的位置进行比较。

## Prompt

用于在位置跳转之前给予用户一些确认信息。当你的应用程序进入一个应该阻止用户导航的状态时（比如表单只填写了一半），弹出一个提示。

```
import { Prompt } from 'react-router-dom';

<Prompt
  when={formIsHalfFilledOut}
  message="你确定要离开当前页面吗？"
/>
```

#### message: string

当用户试图离开某个位置时弹出的提示信息。

```
<Prompt message="你确定要离开当前页面吗？" />
```

#### message: func

将在用户试图导航到下一个位置时调用。需要返回一个字符串以向用户显示提示，或者返回 `true` 以允许直接跳转。

```
<Prompt message={location => {
  const isApp = location.pathname.startsWith('/app');

  return isApp ? `你确定要跳转到${location.pathname}吗？` : true;
}} />
```

> 译注：上例中的 `location` 对象指的是下一个位置（即用户想要跳转到的位置）。你可以基于它包含的一些信息，判断是否阻止导航，或者允许直接跳转。

#### when: bool

在应用程序中，你可以始终渲染 `<Prompt>` 组件，并通过设置 `when={true}` 或 `when={false}` 以阻止或允许相应的导航，而不是根据某些条件来决定是否渲染 `<Prompt>` 组件。

> 译注：`when` 只有两种情况，当它的值为 `true` 时，会弹出提示信息。如果为 `false` 则不会弹出。见[阻止导航](https://link.jianshu.com?t=https%3A%2F%2Freacttraining.com%2Freact-router%2Fweb%2Fexample%2Fpreventing-transitions)示例。

```
<Prompt when={true} message="你确定要离开当前页面吗？" />
```

## <MemoryRouter>

将 URL 的历史记录保存在内存中的 `<Router>`（不读取或写入地址栏）。在测试和非浏览器环境中很有用，例如 [React Native](https://link.jianshu.com?t=https%3A%2F%2Ffacebook.github.io%2Freact-native%2F)。

```
import { MemoryRouter } from 'react-router-dom';

<MemoryRouter>
  <App />
</MemoryRouter>
```

#### initialEntries: array

历史堆栈中的一系列位置信息。这些可能是带有 `{pathname, search, hash, state}` 的完整位置对象或简单的字符串 URL。

```
<MemoryRouter
  initialEntries={[ '/one', '/two', { pathname: '/three' } ]}
  initialIndex={1}
>
  <App/>
</MemoryRouter>
```

#### initialIndex: number

`initialEntries` 数组中的初始位置索引。

#### getUserConfirmation: func

用于确认导航的函数。当 `<MemoryRouter>` 直接与 `<Prompt>` 一起使用时，你必须使用此选项。

#### keyLength: number

`location.key` 的长度，默认为 `6`。

#### children: node

要呈现的[单个子元素（组件）](https://link.jianshu.com?t=https%3A%2F%2Freactjs.org%2Fdocs%2Freact-api.html%23react.children.only)。

## Redirect

使用 `<Redirect>` 会导航到一个新的位置。新的位置将覆盖历史堆栈中的当前条目，例如服务器端重定向（HTTP 3xx）。

```
import { Route, Redirect } from 'react-router-dom';

<Route exact path="/" render={() => (
  loggedIn ? (
    <Redirect to="/dashboard" />
  ) : (
    <PublicHomePage />
  )
)} />
```

#### to: string

要重定向到的 URL，可以是 [path-to-regexp](https://link.jianshu.com?t=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fpath-to-regexp) 能够理解的任何有效的 URL 路径。所有要使用的 URL 参数必须由 `from` 提供。

```
<Redirect to="/somewhere/else" />
```

#### to: object

要重定向到的位置，其中 `pathname` 可以是 [path-to-regexp](https://link.jianshu.com?t=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fpath-to-regexp) 能够理解的任何有效的 URL 路径。

```
<Redirect to={{
  pathname: '/login',
  search: '?utm=your+face',
  state: {
    referrer: currentLocation
  }
}} />
```

上例中的 `state` 对象可以在重定向到的组件中通过 `this.props.location.state` 进行访问。而 `referrer` 键（不是特殊名称）将通过路径名 `/login` 指向的登录组件中的 `this.props.location.state.referrer` 进行访问。

#### push: bool

如果为 `true`，重定向会将新的位置推入历史记录，而不是替换当前条目。

```
<Redirect push to="/somewhere/else" />
```

#### from: string

要从中进行重定向的路径名，可以是 [path-to-regexp](https://link.jianshu.com?t=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fpath-to-regexp) 能够理解的任何有效的 URL 路径。所有匹配的 URL 参数都会提供给 `to`，必须包含在 `to` 中用到的所有参数，`to` 未使用的其它参数将被忽略。

只能在 `<Switch>` 组件内使用 `<Redirect from>`，以匹配一个位置。有关更多细节，请参阅 [](https://link.jianshu.com?t=https%3A%2F%2Freacttraining.com%2Freact-router%2Fweb%2Fapi%2FSwitch%2Fchildren-node)。

```
<Switch>
  <Redirect from='/old-path' to='/new-path' />
  <Route path='/new-path' component={Place} />
</Switch>
// 根据匹配参数进行重定向
<Switch>
  <Redirect from='/users/:id' to='/users/profile/:id' />
  <Route path='/users/profile/:id' component={Profile} />
</Switch>
```

#### exact: bool

完全匹配，相当于 [Route.exact](https://link.jianshu.com?t=https%3A%2F%2Freacttraining.com%2Freact-router%2Fweb%2Fapi%2FRoute%2Fexact-bool)。

#### strict: bool

严格匹配，相当于 [Route.strict](https://link.jianshu.com?t=https%3A%2F%2Freacttraining.com%2Freact-router%2Fweb%2Fapi%2FRoute%2Fstrict-bool)。

## Route

`<Route>` 可能是 React Router 中最重要的组件，它可以帮助你理解和学习如何更好的使用 React Router。它最基本的职责是在其 `path` 属性与某个 [location](https://link.jianshu.com?t=https%3A%2F%2Freacttraining.com%2Freact-router%2Fweb%2Fapi%2Flocation) 匹配时呈现一些 UI。

请考虑以下代码：

```
import { BrowserRouter as Router, Route } from 'react-router-dom';

<Router>
  <div>
    <Route exact path="/" component={Home} />
    <Route path="/news" component={News} />
  </div>
</Router>
```

如果应用程序的位置是 `/`，那么 UI 的层次结构将会是：

```
<div>
  <Home />
  <!-- react-empty: 2 -->
</div>
```

或者，如果应用程序的位置是 `/news`，那么 UI 的层次结构将会是：

```
<div>
  <!-- react-empty: 1 -->
  <News />
</div>
```

其中 `react-empty` 注释只是 React 空渲染的实现细节。但对于我们的目的而言，它是有启发性的。路由始终在技术上被“渲染”，即使它的渲染为空。只要应用程序的位置匹配 `<Route>` 的 `path`，你的组件就会被渲染。

#### Route render methods

使用 `<Route>` 渲染一些内容有以下三种方式：

- [](https://link.jianshu.com?t=https%3A%2F%2Freacttraining.com%2Freact-router%2Fweb%2Fapi%2FRoute%2Fcomponent)
- [](https://link.jianshu.com?t=https%3A%2F%2Freacttraining.com%2Freact-router%2Fweb%2Fapi%2FRoute%2Frender-func)
- [](https://link.jianshu.com?t=https%3A%2F%2Freacttraining.com%2Freact-router%2Fweb%2Fapi%2FRoute%2Fchildren-func)

在不同的情况下使用不同的方式。在指定的 `<Route>` 中，你应该只使用其中的一种。请参阅下面的解释，了解为什么有三个选项。大多数情况下你会使用 `component`。

#### Route props

三种渲染方式都将提供相同的三个路由属性：

- [match](https://link.jianshu.com?t=https%3A%2F%2Freacttraining.com%2Freact-router%2Fweb%2Fapi%2Fmatch)
- [location](https://link.jianshu.com?t=https%3A%2F%2Freacttraining.com%2Freact-router%2Fweb%2Fapi%2Flocation)
- [history](https://link.jianshu.com?t=https%3A%2F%2Freacttraining.com%2Freact-router%2Fweb%2Fapi%2Fhistory)

#### component

指定只有当位置匹配时才会渲染的 React 组件，该组件会接收 [route props](https://link.jianshu.com?t=http%3A%2F%2Freacttraining.cn%2Fweb%2Fapi%2FRoute%2FRoute-props) 作为属性。

```
const User = ({ match }) => {
  return <h1>Hello {match.params.username}!</h1>
}

<Route path="/user/:username" component={User} />
```

当你使用 `component`（而不是 `render` 或 `children`）时，Router 将根据指定的组件，使用 `React.createElement` 创建一个新的 React 元素。这意味着，如果你向 `component` 提供一个内联函数，那么每次渲染都会创建一个新组件。这将导致现有组件的卸载和新组件的安装，而不是仅仅更新现有组件。当使用内联函数进行内联渲染时，请使用 `render` 或 `children`（见下文）。

#### render: func

使用 `render` 可以方便地进行内联渲染和包装，而无需进行上文解释的不必要的组件重装。

你可以传入一个函数，以在位置匹配时调用，而不是使用 `component` 创建一个新的 React 元素。`render` 渲染方式接收所有与 `component` 方式相同的 [route props](https://link.jianshu.com?t=https%3A%2F%2Freacttraining.com%2Freact-router%2Fweb%2Fapi%2FRoute%2Froute-props)。

```
// 方便的内联渲染
<Route path="/home" render={() => <div>Home</div>} />

// 包装
const FadingRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    <FadeIn>
      <Component {...props} />
    </FadeIn>
  )} />
)

<FadingRoute path="/cool" component={Something} />
```

> 警告：`<Route component>` 优先于 `<Route render>`，因此不要在同一个 `<Route>` 中同时使用两者。

#### children: func

有时候不论 `path` 是否匹配位置，你都想渲染一些内容。在这种情况下，你可以使用 `children` 属性。除了不论是否匹配它都会被调用以外，它的工作原理与 `render` 完全一样。

`children` 渲染方式接收所有与 `component` 和 `render` 方式相同的 [route props](https://link.jianshu.com?t=https%3A%2F%2Freacttraining.com%2Freact-router%2Fweb%2Fapi%2FRoute%2Froute-props)，除非路由与 URL 不匹配，不匹配时 `match` 为 `null`。这允许你可以根据路由是否匹配动态地调整用户界面。如下所示，如果路由匹配，我们将添加一个激活类：

```
const ListItemLink = ({ to, ...rest }) => (
  <Route path={to} children={({ match }) => (
    <li className={match ? 'active' : ''}>
      <Link to={to} {...rest} />
    </li>
  )} />
)

<ul>
  <ListItemLink to="/somewhere" />
  <ListItemLink to="/somewhere-else" />
</ul>
```

这对动画也很有用：

```
<Route children={({ match, ...rest }) => (
  {/* Animate 将始终渲染，因此你可以利用生命周期来为其子元素添加进出动画 */}
  <Animate>
    {match && <Something {...rest} />}
  </Animate>
)} />
```

> 警告：`<Route component>` 和 `<Route render>` 优先于 `<Route children>`，因此不要在同一个 `<Route>` 中同时使用多个。

#### path: string

可以是 [path-to-regexp](https://link.jianshu.com?t=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fpath-to-regexp) 能够理解的任何有效的 URL 路径。

```
<Route path="/users/:id" component={User} />
```

没有定义 `path` 的 `<Route>` 总是会被匹配。

#### exact: bool

如果为 `true`，则只有在 `path` 完全匹配 `location.pathname` 时才匹配。

```
<Route exact path="/one" component={OneComponent} />
```

[图片上传失败...(image-d86957-1526486128879)]

#### strict: bool

如果为 `true`，则具有尾部斜杠的 `path` 仅与具有尾部斜杠的 `location.pathname` 匹配。当 `location.pathname` 中有附加的 URL 片段时，`strict` 就没有效果了。

```
<Route strict path="/one/" component={OneComponent} />
```

[图片上传失败...(image-4289b9-1526486128879)]

> 警告：可以使用 `strict` 来强制规定 `location.pathname` 不能具有尾部斜杠，但是为了做到这一点，`strict` 和 `exact` 必须都是 `true`。

[图片上传失败...(image-e932c7-1526486128879)]

#### location: object

一般情况下，`<Route>` 尝试将其 `path` 与当前历史位置（通常是当前的浏览器 URL）进行匹配。但是，也可以传递具有不同路径名的位置进行匹配。

当你需要将 `<Route>` 与当前历史位置以外的 `location` 进行匹配时，此功能非常有用。如[过渡动画](https://link.jianshu.com?t=https%3A%2F%2Freacttraining.com%2Freact-router%2Fweb%2Fexample%2Fanimated-transitions)示例中所示。

如果一个 `<Route>` 被包含在一个 `<Switch>` 中，并且需要匹配的位置（或当前历史位置）传递给了 `<Switch>`，那么传递给 `<Route>` 的 `location` 将被 `<Switch>` 所使用的 `location` 覆盖。

#### sensitive: bool

如果为 `true`，进行匹配时将区分大小写。

```
<Route sensitive path="/one" component={OneComponent} />
```

[图片上传失败...(image-2be4d5-1526486128879)]

## Router

所有 Router 组件的通用低阶接口。通常情况下，应用程序只会使用其中一个高阶 Router：



- [BrowserRouter](https://link.jianshu.com?t=https%3A%2F%2Freacttraining.com%2Freact-router%2Fweb%2Fapi%2FBrowserRouter)
- [HashRouter](https://link.jianshu.com?t=https%3A%2F%2Freacttraining.com%2Freact-router%2Fweb%2Fapi%2FHashRouter)
- [MemoryRouter](https://link.jianshu.com?t=https%3A%2F%2Freacttraining.com%2Freact-router%2Fweb%2Fapi%2FMemoryRouter)
- [NativeRouter](https://link.jianshu.com?t=https%3A%2F%2Freacttraining.com%2Freact-router%2Fnative%2Fapi%2FNativeRouter)
- [StaticRouter](https://link.jianshu.com?t=https%3A%2F%2Freacttraining.com%2Freact-router%2Fweb%2Fapi%2FStaticRouter)

使用低阶 <Router> 的最常见用例是同步一个自定义历史记录与一个状态管理库，比如 Redux 或 Mobx。请注意，将 React Router 和状态管理库一起使用并不是必需的，它仅用于深度集成。

```
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

<Router history={history}>
  <App />
</Router>
```

#### history: object

用于导航的历史记录对象。

```
import createBrowserHistory from 'history/createBrowserHistory';

const customHistory = createBrowserHistory();

<Router history={customHistory} />
```

#### children: node

要呈现的[单个子元素（组件）](https://link.jianshu.com?t=https%3A%2F%2Freactjs.org%2Fdocs%2Freact-api.html%23react.children.only)。

```
<Router>
  <App />
</Router>
```

## StaticRouter

一个永远不会改变位置的 `<Router>`。

这在服务器端渲染场景中非常有用，因为用户实际上没有点击，所以位置实际上并未发生变化。因此，名称是 `static`（静态的）。当你只需要插入一个位置，并在渲染输出上作出断言以便进行简单测试时，它也很有用。

以下是一个示例，node server 为 `<Redirect>` 发送 302 状态码，并为其它请求发送常规 HTML：

```
import { createServer } from 'http';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';

createServer((req, res) => {
  // 这个 context 对象包含了渲染的结果
  const context = {};

  const html = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  // 如果使用 <Redirect>，context.url 将包含要重定向到的 URL
  if (context.url) {
    res.writeHead(302, {
      Location: context.url
    });
    res.end();
  } else {
    res.write(html);
    res.end();
  }
}).listen(3000);
```

#### basename: string

所有位置的基准 URL。`basename` 的正确格式是前面有一个前导斜杠，但不能有尾部斜杠。

```
<StaticRouter basename="/calendar">
  <Link to="/today" />
</StaticRouter>
```

上例中的 `<Link>` 最终将被呈现为：

```
<a href="/calendar/today" />
```

#### location: string

服务器收到的 URL，可能是 node server 上的 `req.url`。

```
<StaticRouter location={req.url}>
  <App />
</StaticRouter>
```

#### location: object

一个形如 `{pathname, search, hash, state}` 的位置对象。

```
<StaticRouter location={{ pathname: '/bubblegum' }}>
  <App />
</StaticRouter>
```

#### context: object

一个普通的 JavaScript 对象。在渲染过程中，组件可以向对象添加属性以存储有关渲染的信息。

```
const context = {};

<StaticRouter context={context}>
  <App />
</StaticRouter>
```

当一个 `<Route>` 匹配时，它将把 context 对象传递给呈现为 `staticContext` 的组件。查看[服务器渲染指南](https://link.jianshu.com?t=https%3A%2F%2Freacttraining.com%2Fweb%2Fguides%2Fserver-rendering)以获取有关如何自行完成此操作的更多信息。

渲染之后，可以使用这些属性来配置服务器的响应。

```
if (context.status === '404') {
  // ...
}
```

#### children: node

要呈现的[单个子元素（组件）](https://link.jianshu.com?t=https%3A%2F%2Freactjs.org%2Fdocs%2Freact-api.html%23react.children.only)。

## Switch

用于渲染与路径匹配的第一个子 `<Route>` 或 `<Redirect>`。

这与仅仅使用一系列 `<Route>` 有何不同？

`<Switch>` 只会渲染一个路由。相反，仅仅定义一系列 `<Route>` 时，每一个与路径匹配的 `<Route>` 都将包含在渲染范围内。考虑如下代码：

```
<Route path="/about" component={About} />
<Route path="/:user" component={User} />
<Route component={NoMatch} />
```

如果 URL 是 `/about`，那么 `<About>`、`<User>` 和 `<NoMatch>` 将全部渲染，因为它们都与路径匹配。这是通过设计，允许我们以很多方式将 `<Route>` 组合成我们的应用程序，例如侧边栏和面包屑、引导标签等。

但是，有时候我们只想选择一个 `<Route>` 来呈现。比如我们在 URL 为 `/about` 时不想匹配 `/:user`（或者显示我们的 404 页面），这该怎么实现呢？以下就是如何使用 `<Switch>` 做到这一点：

```
import { Switch, Route } from 'react-router';

<Switch>
  <Route exact path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route path="/:user" component={User} />
  <Route component={NoMatch} />
</Switch>
```

现在，当我们在 `/about` 路径时，`<Switch>` 将开始寻找匹配的 `<Route>`。我们知道，`<Route path="/about" />` 将会被正确匹配，这时 `<Switch>` 会停止查找匹配项并立即呈现 `<About>`。同样，如果我们在 `/michael` 路径时，那么 `<User>` 会呈现。

这对于动画转换也很有用，因为匹配的 `<Route>` 与前一个渲染位置相同。

```
<Fade>
  <Switch>
    {/* 这里只会渲染一个子元素 */}
    <Route />
    <Route />
  </Switch>
</Fade>

<Fade>
  <Route />
  <Route />
  {/* 这里总是会渲染两个子元素，也有可能是空渲染，这使得转换更加麻烦 */}
</Fade>
```

#### location: object

用于匹配子元素而不是当前历史位置（通常是当前的浏览器 URL）的 [location](https://link.jianshu.com?t=https%3A%2F%2Freacttraining.com%2Freact-router%2Fweb%2Fapi%2Flocation) 对象。

#### children: node

所有 `<Switch>` 的子元素都应该是 `<Route>` 或 `<Redirect>`。只有第一个匹配当前路径的子元素将被呈现。

`<Route>` 组件使用 `path` 属性进行匹配，而 `<Redirect>` 组件使用它们的 `from` 属性进行匹配。没有 `path` 属性的 `<Route>` 或者没有 `from` 属性的 `<Redirect>` 将始终与当前路径匹配。

当在 `<Switch>` 中包含 `<Redirect>` 时，你可以使用任何 `<Route>` 拥有的路径匹配属性：`path`、`exact` 和 `strict`。`from` 只是 `path` 的别名。

如果给 `<Switch>` 提供一个 `location` 属性，它将覆盖匹配的子元素上的 `location` 属性。

```
<Switch>
  <Route exact path="/" component={Home} />
  <Route path="/users" component={Users} />
  <Redirect from="/accounts" to="/users" />
  <Route component={NoMatch} />
</Switch>
```