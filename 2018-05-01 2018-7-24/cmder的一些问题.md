# cmder添加到右键菜单 以及一些问题

之前之中用 win自带的cmd 说实话 不太好用

现在使用 cmder 功能更加强大 更加美观 有Linux终端的感觉

### 1.**启动Cmder**

因为她是即压即用的存在，所以点击`Cmder.exe`即可运行。很显然这般打开她，不怎么快捷，即便用`Listary`高效搜索到她，然后点击，我们可以这样做：

###2.**添加 cmder 到右键菜单**

**打开一个管理员权限终端：**输入 Ctrl + t，或者点击下面控制条的绿色加号，勾选 Run as administrator

![](http://on7r0tqgu.bkt.clouddn.com/FrN0AD6d3lnQSwhCwxYWQfuRmd7F.png)

这就打开了一个管理员权限的终端, 在里面输入上述语句，就可在每个文件夹右键菜单中点击 `Cmder here`唤起Cmder，方便快捷。

不用打开文件夹就能打Cmder,并进入该目录;爽。

### 还有可能遇到

1、提示clink.lua文件找不到

cmder\vendor\clink\clink.lua: No such file or direct
原因分析：
这个是因为你的cmder的路径中有中文，将cmder文件夹移动到没有中文的目录下再重新打开，一切就恢复正常了。

2、ls命令中文路径/文件名乱码

win+ctrl+p打开Settings
在Settings > Startup > Environment里添加：set LANG=zh_CN.UTF8