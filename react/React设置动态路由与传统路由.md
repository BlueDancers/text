# React设置动态路由与传统路由

## 动态路由

> 例如 http://localhost:3000/detail/2

1. 在入口文件的地方,将需要设置动态路由的地方`path`参数进行配置

```react
<BrowserRouter>
          {/* 路由 */}
            <div>
              {/* 路由规则 */}
              <Header /> 
              {/* 头部组件进行路由要转 必须将自身放到路由定义里面 */}
              <Route path="/" exact component={Home} />
                {/* 配置动态id */}
              <Route path="/detail/:id" exact component={Detail} />
            </div>
          </BrowserRouter>
```

2. 如何传递参数

```react
{list.map((item, index) => (
    // to里面将参数传递出去
    <Link to={`/detail/${item.get('id')}`} key={index}>
        <ListItem >
            {/* key={item.get('id')} */}
            <img className="pic" src={item.get('imgUrl')} alt="" />
            <ListInfo>
                <h3 className="title">{item.get('title')}</h3>
                <p className="desc">{item.get('desp')}</p>
            </ListInfo>
        </ListItem>
    </Link>
))}
```

3. 如何接受参数

```react
componentDidMount () {
    // 路由的参数都在props里面 
    let {id} = this.props.match.params
    // 传递给后面用户传递给后台获取数据
    this.props.getDetail(id)
  }
```



````react

const mapState = state => ({
  title: state.detail.get('title'),
  content: state.detail.get('content')
})
const mapDispatch = dispatch => ({
    getDetail (id) {
      // 传递给redux
      dispatch(actionCreators.getDetail(id))
    }
})

export default connect(
  mapState,
  mapDispatch
)(Detail)

````



````react
function _getDetail(data) {
  return {
    // 传递给reducer
    type: actionType.GET_TEXT_DETAIL,
    data: fromJS(data)
  }
}

function getDetail (id) {
  return dispatch => {
    // 获取动态数据
    axios.get(`/textdetail?id=${id}`)
    .then(res => {
      console.log(res.data);
      dispatch(_getDetail(res.data))
    })
    .catch(res => {
      console.log(res);
    })
  }
}
````

## 传统路由

> 例如 http://localhost:3000/detail?id=2

1. 在入口文件的地方,将需要设置路由的地方`patch`进行设置

```react
<Provider store={store}>
    <BrowserRouter>
        {/* 路由 */}
        <div>
            {/* 路由规则 */}
            <Header /> 
            {/* 头部组件进行路由要转 必须将自身放到路由定义里面 */}
            <Route path="/" exact component={Home} />
            {/* 因为detail?id=2 乐意匹配到detail 所以这里不需要修改 */}
            <Route path="/detail" exact component={Detail} />
        </div>
    </BrowserRouter>
</Provider>
```

2. 如何传递参数

```react
{list.map((item, index) => (
    <Link to={`/detail?id=${item.get('id')}`} key={index}>
        <ListItem >
            {/* key={item.get('id')} */}
            <img className="pic" src={item.get('imgUrl')} alt="" />
            <ListInfo>
                <h3 className="title">{item.get('title')}</h3>
                <p className="desc">{item.get('desp')}</p>
            </ListInfo>
        </ListItem>
    </Link>
))}
```

3. 如何接受参数

```react
componentDidMount () {
    // ?id=3
    let param = this.props.location.search.split('=')
    // 这里的数据 需要我们自己来处理
    let id = param[param.length-1] // 获取数组最后一位
    this.props.getDetail(id)
  }
```



后面都是一样的 将他传递出去好了