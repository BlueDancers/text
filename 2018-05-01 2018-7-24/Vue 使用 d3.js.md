# 在Vue项目里面使用d3.js

之前写一个 Demo里面 有些东西要使用d3实现一些效果 但是在很多论坛找资源都找不到可以在Vue里面使用D3.js的方法,npm 上面的D3相对来说 可以说是很不人性化了 完全没有说 在webpack上怎么使用D3.js

最后折腾很久 看到某位外国大佬 看他的案例 成功的实现了在Vue项目里面实现D3的使用

首先安装

```
npm install d3 --save-dev
```

以防万一,然后看`package.json`

![](http://on7r0tqgu.bkt.clouddn.com/FpAS_-6hI-pwW4rMUNwzjAhSHhz1.png)

安装完成



在我们开始之前，让我们渲染一个Vue组件，它使用常规的D3 DOM操作呈现一个简单的折线图：

```JavaScript

<script>
import * as d3 from 'd3';
const data = [99, 71, 78, 25, 36, 92];
export default {
  name: 'non-vue-line-chart',
  template: '<div></div>',
  mounted() {
    const svg = d3.select(this.$el)
      .append('svg')
      .attr('width', 500)
      .attr('height', 270)
      .append('g')
      .attr('transform', 'translate(0, 10)');
    const x = d3.scaleLinear().range([0, 430]);
    const y = d3.scaleLinear().range([210, 0]);
    d3.axisLeft().scale(x);
    d3.axisTop().scale(y);
    x.domain(d3.extent(data, (d, i) => i));
    y.domain([0, d3.max(data, d => d)]);
    const createPath = d3.line()
      .x((d, i) => x(i))
      .y(d => y(d));
    svg.append('path').attr('d', createPath(data));
  },
};
</script>
<style lang="sass">
svg
  margin: 25px;
  path
    fill: none
    stroke: #76BF8A
    stroke-width: 3px
</style>
```

代码简单易懂，但这仅仅是一个基本的例子。因为我们没有使用模板，所以需要更多操作和计算的更复杂的可视化会掩盖组件的设计和逻辑。上述方法的另一个警告是，我们不能使用`scoped`CSS 的属性，因为D3会动态地向DOM添加元素。

![](http://on7r0tqgu.bkt.clouddn.com/FvCwhvPxmr0ksouoBGcJAu6ETs4E.png)



可以使用比较奇怪,但是代码比较优雅的方式去实现

```
<template>
  <svg width="500" height="270">
    <g style="transform: translate(0, 10px)">
      <path :d="line" />
    </g>
  </svg>
</template>
<script>
import * as d3 from 'd3';
export default {
  name: 'vue-line-chart',
  data() {
    return {
      data: [99, 71, 78, 25, 36, 92],
      line: '',
    };
  },
  mounted() {
    this.calculatePath();
  },
  methods: {
    getScales() {
      const x = d3.scaleTime().range([0, 430]);
      const y = d3.scaleLinear().range([210, 0]);
      d3.axisLeft().scale(x);
      d3.axisBottom().scale(y);
      x.domain(d3.extent(this.data, (d, i) => i));
      y.domain([0, d3.max(this.data, d => d)]);
      return { x, y };
    },
    calculatePath() {
      const scale = this.getScales();
      const path = d3.line()
        .x((d, i) => scale.x(i))
        .y(d => scale.y(d));
      this.line = path(this.data);
    },
  },
};
</script>
<style lang="sass" scoped>
svg
  margin: 25px;
path
  fill: none
  stroke: #76BF8A
  stroke-width: 3px
</style>
```

非常酷，即使它没有公开任何属性并且数据是硬编码的，它很好地将视图从逻辑中分离出来，并且使用Vue钩子，方法和`data`对象,现象和上图一样的