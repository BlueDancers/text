# Vue组件化的一些记录

## 在js文件中使用vue

### 创建组件的方式

1. 在全局注册component

```JavaScript
import Vue from 'vue'

const component = {
  template: '<div>this is {{ text }}</div>'
}

Vue.component('Comp', component)

new Vue({
  el: '#root',
  template: `
  <div>
    <comp> </comp>
  </div>`,
  data: {}
})

```

在局部注册组件

```JavaScript
import Vue from 'vue'

const component = {
  template: '<div>this is {{ text }}</div>'
}

new Vue({
  components: {
    Comp: component
  },
  el: '#root',
  template: `
  <div>
    <comp> </comp>
  </div>`,
  data: {}
})
```

### 关于组件里面data的使用

```javascript
const component = {
  template: '<div>this is {{ text }}</div>',
  data () {
    return {
      text: 123
    }
  }
}
```

在组件里面我们只能是对象的方式进行创建data

假如我们使用常规的data:{},即使用一个对象

```JavaScript
const data = {
  text: 123
}
const component = {
  template: `
  <div>
    <input v-model='text' />
  </div>`,
  data () {
    return data
  }
}
```

使用两个组件,这里就会发现

![](http://on7r0tqgu.bkt.clouddn.com/FiDAkTsuLTHkogKjY5jImVsacfAt.png )

上面发生变化,下面也会发生变化,这不是我们想看到你的,所以我们要每次使用组件都返回一个独一无二的对象

````javascript
const component = {
  template: `
  <div>
    <input v-model='text' />
  </div>`,
  data () {
    return {
      text: 123
    }
  }
}
````

### props

Prop 是你可以在组件上注册的一些自定义特性。当一个值传递给一个 prop 特性的时候，它就变成了那个组件实例的一个属性。 

```javascript
props: {
    active: Boolean
  },
```

props可以检查变量类型

> 不要在子组件去修改父组件的data vue会警告,这是不合理的行为
>
> 这里我们可以传递给父组件,让父组件去修改

```JavaScript
import Vue from 'vue'

const component = {
  props: {
    active: Boolean,
    propOne: String,
    onChange: Function
  },
  template: `
  <div>
    <input v-model='text' />
    <span @click="handleChange">this is me</span>
    <span v-show="active"> {{ propOne }}</span>
  </div>`,
  data () {
    return {
      text: 123
    }
  },
  methods: {
    handleChange () {
      this.onChange()
    }
  }
}

new Vue({
  components: {
    Comp: component
  },
  el: '#root',
  template: `
  <div>
    <comp :active="!active" prop-one="111" :on-change="onChange"> </comp>
    <comp :active="active" prop-one="222"> </comp>
  </div>`,
  data: {
    active: true
  },
  methods: {
    onChange () {
      this.active = !this.active
    }
  }
})
```

通过props的父组件方法去告诉父组件 这样就可以实现,当然我们可以使$emit

```JavaScript
import Vue from 'vue'

const component = {
  props: {
    active: Boolean,
    propOne: String
  },
  template: `
  <div>
    <input v-model='text' />
    <span @click="handleChange">this is me</span>
    <span v-show="active"> {{ propOne }}</span>
  </div>`,
  data () {
    return {
      text: 123
    }
  },
  methods: {
    handleChange () {
      this.$emit('onChange')
    }
  }
}

new Vue({
..........
  template: `
  <div>
    <comp :active="!active" prop-one="111" @onChange="onChange"> </comp>
    <comp :active="active" prop-one="222"> </comp>
  </div>`,
 ..............
})

```

props可以简写

```JavaScript
props: ['active', 'propOne'],
```

如果想更加严谨的props

```JavaScript
 props: {
    active: {
      type: Boolean,
      required: true, // 必须存在
      // default: true, // 默认值为true,但是注意required和default不会同时存在
      // default () { // 假如是方法必须要return 防止数据发生冲突
      //   return {

      //   }
      // }
      //
      validator (value) { // 通过validator自定义规则
        return typeof value === 'boolean'
      }
    },
    propOne: {
      type: String
    }
  },
```

组件的继承

组件继承的关键字是extend,会把组件整个及成果来,并且生命周期在组件后

````javascript
import Vue from 'vue'

const component = {
  props: {
    active: Boolean,
    propOne: String
  },
  template: `
  <div>
    <input v-model='text' />
    <span @click="handleChange">this is me</span>
    <span v-show="active"> {{ propOne }}</span>
  </div>`,
  data () {
    return {
      text: 123
    }
  },
  mounted () {
    console.log('数据挂载完成')
  },
  methods: {
    handleChange () {
      this.$emit('onChange')
    }
  }
}

const CompVue = Vue.extend(component) // extend 组件的拓展

new CompVue({
  el: '#root',
  propsData: { // 注意这里是propsData
    propOne: '我是CompVue', // 可以覆盖原有的数据
    active: true
  },
  mounted () {
    console.log('组件数据挂载完成')
  },
  data: {
    text: 111 // 也会覆盖
  }
})
````

还有其他的声明方式

```JavaScript
import Vue from 'vue'

const component = {
  props: {
    active: Boolean,
    propOne: String
  },
  template: `
  <div>
    <input v-model='text' />
    <span @click="handleChange">this is me</span>
    <span v-show="active"> {{ propOne }}</span>
  </div>`,
  data () {
    return {
      text: 123
    }
  },
  mounted () {
    console.log('数据挂载完成')
  },
  methods: {
    handleChange () {
      this.$emit('onChange')
    }
  }
}

const component2 = {
  extends: component,
  data () {
    return {
      text: 22222
    }
  }
}

new Vue({
  el: '#root',
  components: {
    Comp: component2
  },
  data () {
    return {
      propOne: 'component2', // 可以覆盖原有的数据
      active: true
    }
  },
  template: `
  <div>
    <comp :active="active" prop-one="111" @onChange="onChange"> </comp>
  </div>`,
  methods: {
    onChange () {
      this.active = !this.active
    }
  }
})
```

和上面的写法一样的

extend主要是帮助我们拓展组件

```JavaScript
import Vue from 'vue'

const component = {
  props: {
    active: Boolean,
    propOne: Number
  },
  template: `
  <div>
    <input v-model='text' />
    <span @click="handleChange">this is me</span>
    <span v-show="active"> {{ propOne }}</span>
  </div>`,
  data () {
    return {
      text: 123
    }
  },
  mounted () {
    console.log('数据挂载完成')
  },
  methods: {
    handleChange () {
      this.$emit('onChange')
    }
  }
}

const component2 = {

  extends: component,
  mounted () {
    console.log(this.$parent.$options.name) // 获取父组件的名称
    this.$parent.text = 2333333 // 通过$parent可以直接修改父组件的值
  }
}

new Vue({
  name: 'root',
  el: '#root',
  components: {
    Comp: component2
  },
  data () {
    return {
      propOne: 'component2', // 可以覆盖原有的数据
      active: true,
      text: 22222
    }
  },
  template: `
  <div>
    <comp :active="active" :prop-one="text" @onChange="onChange"> </comp>
  </div>`,
  methods: {
    onChange () {
      this.active = !this.active
    }
  }
})
```

通过parent可以指定父组件的$parent的指向

```
const parent = new Vue({
  name: 'parent'
})
new Vue({
  name: 'root',
  parent: parent,
  el: '#root',
  components: {
    Comp: component2
  },
  mounted () {
    console.log(this.$parent.$options.name) // 这里获取parent
  },
  data () {
    return {
      propOne: 'component2', // 可以覆盖原有的数据
      active: true,
      text: 22222
    }
  },
  template: `
  <div>
    <comp :active="active" :prop-one="text" @onChange="onChange"> </comp>
  </div>`,
  methods: {
    onChange () {
      this.active = !this.active
    }
  }
})
```

slot插槽的使用

> 具名标签

```JavaScript
const component = {
  props: ['value'],
  template: `
    <div :style="style">
      <div class="header">
        <slot name='header'>

        </slot>
      </div>
      <div class="body">
        <slot name='body'>

        </slot>
      </div>
    </div>
  `,
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
      }
    }
  },
  methods: {}
}

new Vue({
  el: '#root',
  components: {
    comp: component
  },
  template: `
  <div>
    <comp>
      <span slot="header">this is header</span>
      <span slot="body">this is body</span>
    </comp>
  </div>`,
  data: {},
  methods: {}
})
```

scopeslot

在slot里面的data变量都会是父组件的data数据,如果我们想使用组件自己的数据就要使scopeslot

> 使用父组件的data数据

```JavaScript
const component = {
  props: ['value'],
  template: `
    <div :style="style">
    <slot>

    </slot>
    </div>
  `,
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
      }
    }
  },
  methods: {}
}

new Vue({
  el: '#root',
  components: {
    comp: component
  },
  template: `
  <div>
    <comp>
      <span>{{value}}</span>
    </comp>
  </div>`,
  data: {
    value: '我是父组件'
  },
  methods: {}
})
```

> 使用子组件的data数据

```JavaScript
const component = {
  props: ['value'],
  template: `
    <div :style="style">
    <slot value="我是子组件">

    </slot>
    </div>
  `,
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
      }
    }
  },
  methods: {}
}

new Vue({
  el: '#root',
  components: {
    comp: component
  },
  template: `
  <div>
    <comp>
      <span slot-scope="props">{{props.value}}</span>
    </comp>
  </div>`,
  data: {
    value: '我是父组件'
  },
  methods: {}
})

```

我们使用scope插槽

```JavaScript
const component = {
  props: ['value'],
  template: `
    <div :style="style">
    <slot :value="values">

    </slot>
    </div>
  `,
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
      },
      values: '我是子组件'
    }
  },
  methods: {}
}

new Vue({
  el: '#root',
  components: {
    comp: component
  },
  template: `
  <div>
    <comp ref="comp">
      <span slot-scope="props" ref="span">{{props.value}}</span>
    </comp>
  </div>`,
  data: {
    value: '我是父组件'
  },
  mounted () {
    console.log(this.$refs.comp.values = 'dsadas') // 可以操作子组件,但是最好不要这么做
    console.log(this.$refs.span)
  },
  methods: {}
})

```

这里假如爷爷级别或者更高级别的组件我们应该怎么直接获取父级的数据呢

我需要找父级定义一个provide

```JavaScript
provide () {
    return {
      yeye: this,
      value: this.value
    }
  }
```

 在某个子集里面定义inject 来进行获取

```JavaScript
inject: ['yeye', 'value'],
  mounted () {
    console.log(this.yeye, this.value) // 获取父级名称
  }
```

这样才可以获取到

的当时要注意,这样的写法vue不服提供rerender的方法

```JavaScript
const ChildComponent = {
  template: `
    <div>
      Child component {{value}}
    </div>
  `,
  inject: ['yeye', 'value'],
  mounted () {
    console.log(this.yeye, this.value) // 获取父级名称
  }
}

const component = {
  name: 'components',
  components: {
    ChildComponent
  },
  props: ['value'],
  template: `
    <div :style="style">
    <slot :value="values">

    </slot>
    <ChildComponent></ChildComponent>
    </div>
  `,
  data () {
    return {
      style: {
        width: '200px',
        border: '1px solid #aaa'
      },
      values: '我是子组件'
    }
  },
  methods: {}
}

new Vue({
  el: '#root',
  components: {
    comp: component
  },
  provide () {
    return {
      yeye: this,
      value: this.value
    }
  },
  template: `
  <div>
    <comp ref="comp">
      <span slot-scope="props" ref="span">
      {{props.value}}

      </span>
    </comp>
    <input v-model="value">
  </div>`,
  data: {
    value: '我是父组件'
  },
  mounted () {
    // console.log(this.$refs.comp.values = 'dsadas') // 可以操作子组件,但是最好不要这么做
    console.log(this.$refs.span)
  },
  methods: {}
})
```

使用defineProperty来进行对象定义就好了

```javascript
provide () {
    const data = {}
    Object.defineProperty(data, 'value', {
      get: () => {
        return this.value
      }
    })
    return {
      yeye: this,
      data
    }
  },
```

这样就完成了数据的绑定



render方法

所有的complate最后都会变成render函数想进行dom的创建,修改的时候会触发re-render,这是vdom的工作,可以了解一下render函数的工作

````javascript
import Vue from 'vue'

const ChildComponent = {
  template: `
    <div>
      Child component {{data.value}}
    </div>
  `,
  inject: ['yeye', 'data'],
  mounted () {
    console.log(this.yeye, this.data) // 获取父级名称
  }
}

const component = {
  name: 'components',
  components: {
    ChildComponent
  },
  props: ['value', 'prop1'],
  // template: `
  //   <div :style="style">
  //   <slot></slot>
  //   </div>
  // `,
  render (createElement) {
    return createElement('div', {
      style: this.style,
      on: {
        click: () => { this.$emit('click') }
      }
    }, [this.$slots.name, this.prop1])
  },
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
      },
      values: '我是子组件'
    }
  },
  methods: {}
}

new Vue({
  el: '#root',
  components: {
    comp: component
  },
  provide () {
    const data = {}
    Object.defineProperty(data, 'value', {
      get: () => {
        return this.value
      }
    })
    return {
      yeye: this,
      data
    }
  },
  // template: `
  // <div>
  //   <comp ref="comp">
  //     <span ref="span">{{ value }}</span>
  //   </comp>
  // </div>`,
  render (createElement) {
    return createElement(
      'comp',
      {
        ref: 'comp',
        props: {
          prop1: '我是prop1'
        },
        on: {
          click: this.headleclick
        },
        nativeOn: {
          click: this.headleclick // 会自动绑定到更加点上面,就不需要子组件触发了
        }
      },
      [createElement('span', {
        ref: 'span',
        slot: 'name', // 指定插槽,需要子节点指定this.$slots.name
        domProps: {
          innerHTML: '<span>111111</span>' // 指定dom
        },
        attrs: {
          id: 'myid' // 指定id
        }
      }, this.value)])
  },
  data: {
    value: '我是父组件'
  },
  mounted () {
    // console.log(this.$refs.comp.values = 'dsadas') // 可以操作子组件,但是最好不要这么做
    console.log(this.$refs.span)
  },
  methods: {
    headleclick () {
      console.log('执行')
    }
  }
})

````

























