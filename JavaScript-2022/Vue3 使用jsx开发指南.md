# Vue3 使用jsx开发指南



<img src="http://www.vkcyan.top/FuGdH5QngblNApxjW3YV8ozIsO0J.png" style="zoom:30%;" />



​	在2021年，`vue3`发布了正式版本，并且经过一年的维护已经越来越稳定，我们在公司项目中也小范围的上线了`vue3`的项目，总体还是很不错的

​	但是`setup`语法需要return比较麻烦，还有`.value`问题，尝试过`setup`语法糖，依旧觉得`setup`语法的api记忆负担比较重

​	所以下半年逐渐拾起了`jsx`的语法，并在开源项目中使用，总体感觉还是相当不错的，前人栽树后人乘凉，本文对jsx for vue的常见问题进行说明

- `jsx`学习成本更低，这么多年jsx没有大改动；

- 无记忆负担，同时足够灵活，如果你是vue开发者，同时对setup语法并不是太合得来， vue3 + jsx也是非常不错的选择~



## 前置知识

​	在vue3中使用jsx需要安装[@vitejs/plugin-vue-jsx](https://www.npmjs.com/package/@vitejs/plugin-vue-jsx)（webpack版本的不了解，有需要者执行搜索），根据文档配置一下就行了，官方提供了文档供参考，提供了相关示例[jsx-next](https://github.com/vuejs/jsx-next),有react基础的同学可以先看官方文档，在开发过程中出现问题再看本文



## 指令

### v-model

JSX  for vue是支持v-model语法的，这一点比react的setState,体验感确实要好

```jsx
// 正常写法
<input v-model="value" />  // vue
<input v-model={value} /> // jsx

// 指定值写法
<input v-model:modelValue="value" />  // vue
<input v-model={[value,'modelValue']} /> // jsx
  
// 修饰符写法
<input v-model:modelValue.trim="value" />  // vue
<input v-model={[value,'modelValue',['trim']]} /> // jsx
```



### v-show

这个api与在vue中的表现形式一致

```jsx
<div v-show="isShow"></div> // vue
<div v-show={isShow}></div> // jsx
```



### v-bind

```jsx
// vue
<a-modal
  :width="'400px'"
  :title="'设置组件名称'"
 >
	// ....
</a-modal>
// jsx
<a-modal
  width={"400px"}
  title={"设置组件名称"}
 >
	// ....
</a-modal>
```



### v-if

在jsx for vue中没有这个api，我们需要用jsx风格来实现v-if的效果

可以简单理解为jsx直接将if搬到html中

```jsx
<div v-if="isShow"> ... </div> // vue
{isShow && <div> ... </div>} // jsx
```



## 事件

### 事件语法

jsx for vue，所有的事件都按照react风格来

- 所有事件有on开头
- 所有事件名称首字母大写 

**例如：@click => onClick @change => onChange @drop => onDrop** 



### 事件修饰符

这里没有找到权威的资料，有小伙伴知道也请告知一下，目前建议大家通过原生JavaScript来实现vue事件修饰符的效果

.stop ： 阻止事件冒泡，在JSX中使用event.stopPropagation()来代替

.prevent：阻止默认行为，在JSX中使用event.preventDefault() 来代替



## API

### ref与reactive

vue3的template会自动解析ref的`.value`,在jsx中ref的`.value`是不会被自动解析的

```jsx
//声明变量 let type = ref(1)

<p>{{ type }}</p> // vue
<p>{type.value}</p> // jsx
```



### props

在jsx for vue中，props的语法使用的就是setup的语法，实际表现形式完全一致

```jsx
export default defineComponent({
  props: ['title'],
  setup(props) {
    onMounted(() => {
      console.log(props.title);
    })
    return () => (
      <div>{props.title}</div>
    )
  }
})
```



### emit

同样与vue3的setup语法保持一致，注意子父防范需要符合react规范

```html
emit('changeVisible', false) // 子组件 

<xxx onChangeVisible={(params) => xxxFun(params)}></xxx> // 父组件
```



## solt如何写插槽

这里以antd for vue的[Popover 气泡卡片](https://next.antdv.com/components/popover-cn)，为例子

### Vue3语法

```html
<a-popover title="Title">
  <template #content>
  	<span>Content</span>
  </template>
	<a-button type="primary">Hover me</a-button>
</a-popover>
```



### jsx for vue语法

```jsx
<a-popover
	title="Title"
	content={
    <>
    	<span>Content</span>
    </>
  }>
 	<a-button type="primary">Hover me</a-button>
</a-popover>
```



## 基础模板

```jsx
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  // props: ['xx'],
  setup(props,{ emit }) {
    onMounted(() => {
      // ...
    })
    return () => (
      <div></div>
    )
  }
})
```



## 结语

- 国内这方面资料比较少，查问题的时候注意vue版本，以及jsx的使用（render方式本文不适用）
- 如果代码里面存在问题，如果是ui框架，建议直接看react版本的代码，例如antdv的jsx版本直接看antd的实例代码
- 直接看jsx语法的项目代码，[H5-YD.v2](https://github.com/vkcyan/H5-YD.v2)
- 不接受杠精，例如写jsx为啥不去用使用react



如果在学习过程中遇到了解决不了的问题，请到QQ群 530496237，大佬解答疑惑~
