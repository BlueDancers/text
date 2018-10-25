# Typescript+Vue

第一次使用Typescript+Vue来写代码,比较喜欢typescript将js变成了类似java的原因,可维护性大大提高,在Vue里面官方提供了 Vue Property Decorator 这个装饰器, Vue的代码更加简化了

提供了7个解析器

@Prop // 装饰prop

```JavaScript
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class YourComponent extends Vue {
  @Prop(Number) propA!: number
  @Prop({ default: 'default value' }) propB!: string
  @Prop([String, Boolean]) propC: string | boolean
}


----------------------------------------------------------------------------------------
export default {
  props: {
    propA: {
      type: Number
    },
    propB: {
      default: 'default value'
    },
    propC: {
      type: [String, Boolean]
    },
  }
}
```



@Watch // 装饰 watch 的装饰器  监听数据变化

```JavaScript
import { Vue, Component, Watch } from 'vue-property-decorator'

@Component
export default class YourComponent extends Vue {
  @Watch('child')
  onChildChanged(val: string, oldVal: string) { }

  @Watch('person', { immediate: true, deep: true })
  onPersonChanged(val: Person, oldVal: Person) { }
}


----------------------------------------------------------------------------------------
export default {
  watch: {
    'child': {
      handler: 'onChildChanged',
      immediate: false,
      deep: false
    },
    'person': {
      handler: 'onPersonChanged',
      immediate: true,
      deep: true
    }
  },
  methods: {
    onChildChanged(val, oldVal) { },
    onPersonChanged(val, oldVal) { }
  }
}

```

@Component  这是来源于 `vue-class-component` 装饰器

在Component里面可以写Vue的里面的所有函数

````
@Component({
  components: {
    pageHeader
  },
  mounted () {
    console.log('生命周期启动');
    
  }
})
````





