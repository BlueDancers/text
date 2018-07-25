# boold的文档存放区

关于学前端写文档博客是从2017年12月开始的

初衷就是记录在学习上面遇到的文字 对难点 重点的总结

其二是希望可以帮助到其他人

按时间排序,没有进行分类

主要分为 

**JavaScript** 

- vue
- es6
- webpack

**node.js** 

- koa2

 **Java** 

**docker**

 **等等一些日常问题**

### 不会后端的前端不是好前端

# git 

使用git困扰了我很久,对于第一次使用github的人来说并不友好  对于一路踩的坑纯手打一个git傻瓜式教程

### 1.安装Git(windows)

http://gitforwindows.org/  安装 一路确认

进入bash界面 

![](http://on7r0tqgu.bkt.clouddn.com/FnsTRVxzxPL4iAdexgNE7VSlQmU8.png)

自己想存放github文件的地方 自己研究吧 默认在 pwd查看

### 2.检查 SSH keys的设置

 ```bsah
cd ~/.ssh
 ```

如果提示：No such file or directory 说明你是第一次使用 git。

### 3.生成新的 SSH Key：

```
ssh-keygen -t rsa -C "邮件地址@youremail.com"
```

后面回车就好,英语可以的就好好看看

然后系统会要你输入密码：

```\
Enter passphrase (empty for no passphrase):<输入加密串>
Enter same passphrase again:<再次输入加密串>
```

在回车中会提示你输入一个密码，这个密码会在你提交项目时使用，如果为空的话提交项目时则不用输入。这个设置是防止别人往你的项目里提交内容。

最后看到这样的界面，就成功设置ssh key了：

![](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525151101226&di=91e252e0ea5d4eab09262eef7cd34423&imgtype=0&src=http%3A%2F%2Fimage.mamicode.com%2Finfo%2F201801%2F20180111150543823071.png)

### 4.添加 SSH Key 到 GitHub

在本机设置 SSH Key 之后，需要添加到 GitHub上，以完成 SSH 链接的设置。

- 1、打开本地 id_rsa.pub 文件（ 参考地址 C:\Documents and Settings\Administrator.ssh\id_rsa.pub）。此文件里面内容为刚才生成的密钥。如果看不到这个文件，你需要设置显示隐藏文件。准确的复制这个文件的内容，才能保证设置的成功。
- 2、登陆 GitHub 系统。点击右上角的 Account Settings—>SSH Public keys —> add another public keys
- 3、把你本地生成的密钥复制到里面（ key 文本框中）， 点击 add key 就ok了

![测试](http://on7r0tqgu.bkt.clouddn.com/Frt5Dvh_2N6fYW-6OjUJ-n6wC56f.png)

SSH Key 配置成功

### 5.测试

可以输入下面的命令，看看设置是否成功，git@GitHub.com 的部分不要修改

```bash
ssh -T git@GitHub.com
```

如果是下面的反馈：

```
The authenticity of host 'GitHub.com (207.97.227.239)' can't be established. RSA key fingerprint is 16:27:ac:a5:76:28:2d:36:63:1b:56:4d:eb:df:a6:48. Are you sure you want to continue connecting (yes/no)? 
```

不要紧张，输入 yes 就好，然后会看到：

```
Hi boold! You've successfully authenticated, but GitHub does not provide shell access. 
```

### 6.设置用户信息

现在你已经可以通过 SSH 链接到 GitHub 了，还有一些个人信息需要完善的。

Git 会根据用户的名字和邮箱来记录提交。GitHub 也是用这些信息来做权限的处理，输入下面的代码进行个人信息的设置，把名称和邮箱替换成你自己的，名字必须是你的真名，而不是GitHub的昵称。

```
 git config --global user.name "boold"//用户名
 git config --global user.email  "boold@gmail.com"//填写自己的邮箱
```

这里已经创建成功了,连接git储存库

![](http://on7r0tqgu.bkt.clouddn.com/FmMMaFD1GvNa14sUwqyKhWkPjuFO.png)

命名储藏库,就添加名字就好

![](http://on7r0tqgu.bkt.clouddn.com/Fp1uS8mdwvpTxxr4QT-7bMTtnxjI.png)

逐行输入你的bash里面 , 连接仓库成功



###7.最最日常使用

更新代码/添加md:

```
git add README.md
git commit -m "xxx"
git push
```

删除代码(md)

```
git rm 我的文件       git rm -r 我的文件夹/
$ git commit -m"修改"
git push
```



