# 使用Prettier完成代码提交的自动格式化



## 最终效果

1. 执行git commit
2. 代码自动完成我们定制规则的格式化功能，并提交到本地

![](https://images.591wsh.com/2021/10/26/thumb_1635216616567.png)



## 使用的npm包

**prettier**：功能依赖包

**husky**：提供gitHook相关功能

**lint-staged**：让命令只对发生更改的文件生效



## 为什么做（WhyHow）

​	在未建立规范之前，每个人的代码风格都是不一致的，并且开发过程中可能会出现忘记格式化，手误的问题，如果在提交之前，可以自动抹平差异统一多人开发风格，这时候作用就体现出来了

​	代码风格是每一个程序员都要面对的问题，不论是在个人开发还是在团队协作中，都明白较好的代码风格是保证日后可维护性的关键，所以连不懂的开发或许都知道，要注意代码风格

## 怎么做（How）

​	到了正在的推进时期，就会面对很多难题，无法确定一个所有人都满意的方案，而就算是少数服从多数，在实际开发中落实也会遇到一大堆问题，例如，编辑器的不同，格式化工具不同，或者说完全没这个习惯，好不容易决定推进了，每次代码审核都需要修改这种细节问题，一来二去就搁置了，实在是头疼，到底该如何将事情完美的落实下去呢？

​	这里我们就需要一个权威的规范来帮助我们约束成为一个风格，Prettier表示我先给一个规范，大家先用起来，保证代码的可读性与可维护性，然后大家都遵循这和规则。

​	而prettier本身是一个`An opinionated code formatter	`的格式化工具，我是一个规矩非常严格的框架，并不会给你很多的配置项，喜欢用就用，不喜欢就不用，绝大部分的编辑器集成了prettier，在编辑器的约束下，大家都遵循这个方案就好了

## 具体配置（What）

### Vscode下载插件 prettier

![](https://images.591wsh.com/2021/10/25/thumb_1635150615622.png)

### 项目按下依赖prettier，按文档完成步骤

[prettier官网](https://prettier.io/)

![](https://images.591wsh.com/2021/10/25/thumb_1635150614848.png)

### 配置commit钩子

![](https://images.591wsh.com/2021/10/25/thumb_1635150613564.png)





​		安装好之后，会在项目下生成文件`.husky`，并修改你的`package.json`，到目前为止，其实已经配置好了，他会在你每次commit之前执行`npx lint-staged`，这个命令会执行`prettier --write`，并且只对本次修改的文件生效



## 具体命令（躲懒不看文档的看这里~）

> 当前的prettier版本是2.4.1，如果版本号不一致，建议还是看官网

1. vscode安装prettier
2. 项目安装prettier

```
npm install --save-dev --save-exact prettier
```

3. 创建配置文件

```
echo {}> .prettierrc.json
```

4. 创建说明不需要格式化的文件
   1. 创建文件[.prettierignore](https://prettier.io/docs/en/ignore.html)
   2. 写入内容

```json
# Ignore artifacts:
build
coverage
```

5. 执行命令`npx prettier --write .`,格式化现有代码，测试功能是否正常

6. 编写配置文件

```js
// json文件改为js文件（看个人习惯）写入内容
module.exports = {
  singleQuote: true, // 单引号
  trailingComma: 'es5', // 对象属性最后有 ","
  semi: false, // 是否需要分号
  printWidth: 110, // 一行最多120
  jsxSingleQuote: true, // jsx使用单引号
  tabWidth: 2, // 一个tab代表几个空格数，默认就是2
  useTabs: false, // 不使用缩进符，而使用空格
  jsxBracketSameLine: true,
}
```

7. 再次执行`npx prettier --write .`，对格式化规则有建议参考文档对配置进行修改，知道自己满意
8. 配置gitHook钩子(必须先加入git仓库，不然会无效果)

```bash
npx mrm@2 lint-staged
```

9. 将代码格式改乱，尝试commit一下，查看功能是否正常（提交之前会被自动格式化）



## 一些注意事项

### win电脑.prettierrc.json写入失败

这个问题在同事电脑上发现的，使用vscode中powershell执行`echo {}> .prettierrc.json`,会无写入内容，后面执行的命令也会失败，这里请使用电脑的cmd打开目标文件夹，执行该命令，这样测试是可行的



### 配置gitHook之后 commit不会自动格式化vue文件

这里需要修改在`package.json`中默认写入的lint-staged中的命令

> 这里根据项目中是否存在eslint，会写入不太一致，但是问题不打

```json
"lint-staged": {
  "*.js": "eslint --cache --fix"
}
```

统一改成

```json
"lint-staged": {
  "*.{js,css,md,vue}": "prettier --write"
}
```

这样每次commit的时候就会自动格式化代码了



## 结语

​	如果查看本文遇到了一些问题，请到QQ群 530496237，一起吹吹水~

