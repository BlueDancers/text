# vscode自定义代码片段,让编码起飞

![](http://www.vkcyan.top/FoDZ3XVV16dPuwbHwTMNuq8qwncB.jpg)



​	转眼之间已经到了2020年,已经是是写代码的第三个年头了,奈何技术深度仍然尚浅,想要独当一面还需要努力

​	最近在写uniapp的时候有个烦恼,也就是代码提示实在是让人非常难受

​	![](http://www.vkcyan.top/FqWvOsbmgPPT3KPBJ9fuJ6kd2Ewv.gif)

写`view`标签之前必须要打`<`,实在是让人难受,而直接写view也咩有提示,编码体验很差



我们能不能让敲出`view`的时候就给我提示`<view class=''></view>`呢,这样一定会编码飞起

所以我们要借助vscode提供的**自定义代码片段功能**

![](http://www.vkcyan.top/FpuY2mvBtKISEp2JNP5w3MWAbkWY.png)

首先我们点击到**文件>首选项>用户代码片段**

![](http://www.vkcyan.top/FkYTY_awInPXaWhVyBBuIJwiPXza.png)

找到当前语言对应的配置文件,例如我当前项目是vue的,并且需要的是`template`的提示,所以我需要编辑`vue-html.json`

在自定义代码判断之前需要了解他的字段含义

```
prefix      :代码片段名字，即输入此名字就可以调用代码片段。
body        :这个是代码段的主体.需要编写的代码放在这里,　　　　　 
$1          :生成代码后光标的初始位置.
$2          :生成代码后光标的第二个位置,按tab键可进行快速切换,还可以有$3,$4,$5.....
${1,字符}    :生成代码后光标的初始位置(其中1表示光标开始的序号，字符表示生成代码后光标会直接选中字符。)
description :代码段描述,输入名字后编辑器显示的提示信息。
```

以及书写规则

```json
"Print to console": {
    "prefix": "log",
    "body": [
        "console.log('$1');",
        "$2"
    ],
    "description": "Log output to console"
}
```

我们会主需要了解其简单的规则就可以去完成我们的目标了

```json
{
	// Place your snippets for vue-html here. Each snippet is defined under a snippet name and has a prefix, body and 
	// description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
	// $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the 
	// same ids are connected.
	// Example:
	"view": {
		"prefix": "view",
		"body": [
			"<view class='$0'></view>"
		],
		"description": "uni基础视图组件"
	},
	"text": {
		"prefix": "text",
		"body": [
			"<text class='$0'></text>"
		],
		"description": "uni基础文字组件"
	},
	"button": {
		"prefix": "button",
		"body": [
			"<button class='$0'></button>"
		],
		"description": "uni基础按钮组件"
	},
	"image": {
		"prefix": "image",
		"body": [
			"<image class='$0'/>"
		],
		"description": "uni基础图片组件"
	}
}
```

当我们保存完毕之后,再试使用就会发现输入`view`就会发现我们自定义的代码片段完成了

![](http://www.vkcyan.top/Fr73WvNZBi8zxIc02z2HC6ptLefY.gif)



自定义代码片段还可以定义很多常用的代码片段

例如自定义一段vue的代码模板(注意不是vue-html.json)

**vue.json**

```json
{
	// Place your snippets for vue here. Each snippet is defined under a snippet name and has a prefix, body and 
	// description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
	// $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the 
	// same ids are connected.
	// Example:
	"baseVue": {
		"prefix": "baseVue",
		"body": [
			"<script lang='ts'>",
			"import Vue from 'vue';",
			" export default Vue.extend ({",
			"   data () {",
			"     return {\n",
			"     }",
			"   },",
			"   components: {\n",
			"   }",
			" })",
			"</script>\n",
		],
		"description": "vuets基础模板"
	},
}
```

![](http://www.vkcyan.top/Ft3X_oJLM2e5mMPhplc6Dz_FxdNs.gif)

​			

是不是非常好用呢~~~

如果想了解更多请看官方文档[Visual Studio代码中的代码片段](https://code.visualstudio.com/docs/editor/userdefinedsnippets)

自定义代码判断就是下载的插件的功能,也就是`自定义snippet`,你学会了吗?











