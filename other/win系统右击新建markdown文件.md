# Win系统右击创建markdown文件

 	本人也算是`markdown`的重度使用者,一直创建`md`文件都是 复制  粘贴 删除里面的内容 改名字 特别麻烦,无心之举google了一下`Win系统右击创建markdown文件`,得到了大佬的答案[知乎](https://www.zhihu.com/question/53075877/answer/207048009),本人记录一下

在任意地方创建一个`txt文件`,文件名都随便

```reg
Windows Registry Editor Version 5.00
[HKEY_CLASSES_ROOT\.md\ShellNew]
"NullFile"=""
"FileName"="template.md"
```

然后 另存为 -> text.reg 文件(文件名随便)

![](http://pj4xfr92l.bkt.clouddn.com/FrLFK3MnzWoIt7fkZ4175VLryB1V.png)

然后双击点击确认 添加到注册表 -> 重启 

重启就有了 右击创建 `md` 文件啦