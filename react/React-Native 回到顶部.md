# React-Native - 回到顶部

移动端很多场景都有回到顶部的需求,我使用`ref`去实现的

大概流程是

父组件 获取`ScrollView` 的 `ref`

子组件通知父组件我点击`回到顶部`方法

在父组件的方法里面获取`ScrollView` 的 `ref` ,调用里面的`scrollTo`,定位到最顶部



以下是代码

子组件`TopButtonShow`

```react
													// 父组件方法
<TouchableHighlight style={styles.TopButtom} onPress={this.props.gotoTop}>
   //....
</TouchableHighlight>
```

父组件

````react
<ScrollView
    ref="textInputRefer" // 存储ref 会在初次渲染的时候执行
    >
    //......
</ScrollView>
<TopButtonShow gotoTop={this.gotoTop} />
//....

// 触发事件 调用ref内的scrollTo方法 定位到顶部
gotoTop = () => {
    // 定位到顶部
    this.refs.textInputRefer.scrollTo({ x: 0, y: 0, animated: true }, 1)
}
````

