# Vue小记

## Vue-Router

```
 <router-link to="/one" tag="button">跳转</router-link> 
 <router-link to="/" replace>跳转回去</router-link>
```

to是一个prop.指定需要跳转的路径,也可以使用v-bind动态设置

tag可以指定渲染成标签,默认是a标签

replace 标签会不留下历史记录,使得回退键将无效

方法2:

```JavaScript
 methods: {
    handlerouter(){
      this.$router.push('/one')
      console.log(this.$router);
      
    }
  }
```



使用router控制在路由发生改变的时候的动作

```JavaScript
router.beforeEach((to, from, next) => {
  console.log(to);    //即将要进入的路由对象
  console.log(from);  //当前导航要离开的路由对象
  
  next();             //调用该方法,才能进入下一个钩子
})
```

## vue-Vuex

```javascript
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    count: 0, //数据都保存在state里面
    list:[1,2,3,34,4,5445,4]
  },
  getters: {
    filteredList: state =>{ 
      return state.list.filter(item=>item>10)   //类似计算属性 对数据进行处理
    },
    listCount: (state,getters) => {             //可以依赖其他的getters,把getters作为参数传进去
      return getters.filteredList.length;
    }
  
  },
  //在组件里面使用  {{$store.state.count}} 进行调用
  mutations: { //这和选项用于直接修改state里面的数据
    // increment (state,n=1){
    //   state.count+=n;
    // },
    // decrease (state,n=1) {
    //   state.count-=n;
    // }
    increment (state,n=1){
      state.count+=n;
    },
    decrease(state, params) {
      state.count -= params.count;   //第二种表现形式
    }
  },
  actions: {             //actions适应异步操作
    asyncIncrement (context) {
      return new Promise(resolve =>{
        setTimeout(() => {
           context.commit('increment')
           resolve();
        }, 2000);
      })
    }
  }
})

```

```JavaScript
 methods: {
    handlerouter(){
      this.$router.push('/one')
      console.log(this.$router);
    },
    headleIncremrnt () { 
      //this.$store.commit('increment',20)   //mutations调用写法
      //this.$store.dispatch('increment')      //actions 调用写法
      this.$store.dispatch('asyncIncrement').then(()=>{
        console.log(this.$store.state.count);
      })
    },
    headleDecrease () {
      this.$store.commit({
        type: 'decrease',
        count: 20     //第二种表现形式
      })
    }
  }
}
```

## Less

```
npm install less  --save-dev
npm install less-loader --save-dev
```

竟然不需要配置,,

## 在vue里面动态添加样式

```java
:style="{background:colors[item.color] 

colors: {

        '白色': '#ffffff',

        '金色': '#dac272',

        '蓝色': '#233472',

        '红色': '#f2352e'

      }

```

## Vue里面监听对象数组的操作

```
Vue里面数组的操作 使用vue.set触发监听

list[index] = newValue

Vue.set(list, index, newValue)

假如是[{a:1,b:2},{a:1,b:2}] 这样的结构

list[index].count = newValue

Vue.set(list[index],"count",newValue）   

```

