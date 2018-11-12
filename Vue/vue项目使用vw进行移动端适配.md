# Vue项目的移动端适配

需要安装一下的插件

```
npm install postcss-aspect-ratio-mini postcss-px-to-viewport postcss-write-svg postcss-cssnext postcss-viewport-units cssnano cssnano-preset-advanced --S
// 这两个 根据自己生成的项目,我这里生成项目的时候没有安装
npm install postcss-import postcss-url --S 
```



`.postcssrc.js`配置

```javascript
module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-url': {},
    'postcss-aspect-ratio-mini': {},
    'postcss-write-svg': { utf8: false },
    'postcss-cssnext': {},
    'postcss-px-to-viewport': {
      viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
      viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
      unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: ['.ignore', '.hairlines'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
      mediaQuery: false // 允许在媒体查询中转换`px`
    },
    'postcss-viewport-units': {},
    cssnano: {
      preset: 'advanced',
      autoprefixer: false,
      'postcss-zindex': false
    }
  }
};
```



> 这里注意假如生成的项目里面没有.postcssrc.js 说明写在package.json里面,记得把package里面的部分配置删除

````
"postcss": {
  "plugins": {
    "autoprefixer": {}
    }
  },
````



最后在index.html里面进行引入viewport-units-buggyfill解决兼容问题

````JavaScript
<script src="//g.alicdn.com/fdilab/lib3rd/viewport-units-buggyfill/0.6.2/??viewport-units-buggyfill.hacks.min.js,viewport-units-buggyfill.min.js"></script>
// 建议下载到项目中
    <script>
      window.onload = function () { 
        window.viewportUnitsBuggyfill.init({ hacks: window.viewportUnitsBuggyfillHacks });
      }
    </script>
````

#### 注意

如果遇到图片无法正常显示

1.img图片不显示：

全局引入

```
img { 
	content: normal !important;
}
```

2.与第三方UI库兼容问题：

使用postcss-px-to-viewport-opt，然后使用exclude配置项，具体参考 [Vue+ts下的移动端vw适配（第三方库css问题）](https://zhuanlan.zhihu.com/p/36913200)