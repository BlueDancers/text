# webpack+Vue搭建手脚架

这里的代码是基于昨天的todolist的代码,这里就是对上一个demo的改动以及优化,让项目更加完善

首先配置webpack的配置,这里将webpack分文件编写,这样便于拓展以及更改





配置无效??????

关于vue-loader的配置都没有效果展示不知道为什么



配置eslint[github](https://github.com/standard/eslint-config-standard)

````
npm install --save-dev eslint-config-standard eslint-plugin-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node
````

因为.vue文件不会是纯js代码,所以,我们需要安装额外的解析的插件

```
npm install eslint-plugin-html
```

看webpack简直就是折磨..... :)

过程报了非常多的错误,基本步骤是这样的

```
npm install eslint -D
```

在根目录下配置 .eslintrc

```JavaScript
{
  "extends": "standard",
  "plugins":[
    "html"
  ]
}
```

最后在package里面加命令

```bash
    "lint": "eslint --ext .js --ext .jsx --ext .vue client/",
    "lint-fix": "eslint --fix --ext .js --ext .jsx --ext .vue client/"
```

这里的语法官方文档上面有,可以谷歌看看

配置eslint语法检查

```bash
npm install eslint-loader babel-eslint -D
```

安装eslint-loader 和 .eslintrc 使用的babel-eslint

改写配置文件

````JavaScript
{
  "extends": "standard",
  "plugins":[
    "html"
  ],
  "parser":"babel-eslint"
}
````

在webpack.config.base里面的module> rules 里面加一个字段

````JavaScript
{
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude:/node_modules/,
        enforce: 'pre'     //预处理
      }
````

启动项目,完成配置



配置.editorconfig[编辑器规范](http://www.alloyteam.com/2014/12/editor-config/)

```
root = true   //root：表明是最顶层的配置文件，发现设为true时，才会停止查找.editorconfig文件。

[*]
charset = utf-8        	//编码格式，支持latin1、utf-8、utf-8-bom、utf-16be和utf-16le，
indent_style = space    //
indent_size = 2         //tab为2空格
end_of_line = lf        //定义换行符，支持lf、cr和crlf。
insert_final_newline = true	//设为true表明使文件以一个空白行结尾，false反之。
trim_trailing_whitespace = true  //设为true表示会除去换行行首的任意空白字符，false反之。

```

注意:一些编译器并不是配置就生效,还需要安装插件

vscode需要安装插件[editorconfig](https://editorconfig.org/)

使用.gitgnore配置不需要git的文件

````
.DS_Store
node_modules/
/dist/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
````



基本的配置已经完成了,有一点,在使用git进行提交的时候,随着规模的扩大的新成员的加入，代码格式问题就不能只靠自觉和人工来解决，我们需要强制和自动化来确保每个成员提交的代码都是符合规范的。 

这里安装一个git钩子 husky`不是hasky` 可以在我们commit的时候检查我们的代码,帮我们自动规范代码

```
npm install husky -D
```

客户端钩子，它会在Git键入提交信息前运行。因此，我们可以利用这个时机来做代码风格检查。 查看husky文档 & husky对应[Git的钩子](https://git-scm.com/docs/githooks)，可以清楚看到 `precommit对应pre-commit` **编辑package.json**, 在scripts中加入如下命令： 

```bash
"lint": "eslint --ext .js --ext .jsx --ext .vue client/",
"lint-fix": "eslint --fix --ext .js --ext .jsx --ext .vue client/",
"precommit": "npm run lint-fix"
```

这样就会在提交的时候帮我们检查代码



