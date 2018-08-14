##基本命令

cd  change directoy 切换目录

su 切换用户
cp -rv复制
mv 移动  也可以重命名
ls 查看目录 -l 详细信息 -a查看隐藏文件
rm 删除文件夹  -r 删除文件夹 -f强制删除
touch 创建文件
mkdir 创建文件夹
cat 查看文件内容
date 时间 date -s设置时间
root下 clock 查看硬件时间 cal 日历
uptime 查看系统运行时间
echo 输出
cat 显示文本内容 
more 查看内容带向下翻页 less上下翻页 q退出
head 查看前10行 -n指定行数
tail 查看后10行 -n指定行数 -f 查看日志 不会退出持续追踪
lspci 查看硬件pci信息 -v详细
lsuseb 查看usb信息 -v详细
lsmod 查看驱动
shutdown -h 关机 -r 重新启动
shutdown -h +10 10分钟后关机
shutdown -h 22:30 定时关机
zip 文件名 压缩包名 --压缩
unzip 压缩包名      --解压缩
tar -cvf 文件夹名 打包命令(不压缩)
tar -xvf 打开归档命名
tar -cvzf  归档并且压缩成gz文件
file 查看文件信息
locate 文件名 查找文件,数据库查找,不是系统
update 手动更新数据库
find.-name admin.* 
.表示当前目录  *通配符
/表示根目录
find /-perm 777
perm 权限
user 根据用户查找文件  等等
find. -name "a*" -exec ls -l {} \
查找a*的文件 执行ls -l命令

history 查看历史命令

##vim

vim 打开文本
i 进入插入模式
o 在下一行插入
dd 删除整行
u 撤销操作
yy 复制
行数 + yy 多行复制
找到要替换的文件,按 r 进入替换模式 
命令模式下 /进入查找模式  n键可以切换
noh 消除高亮
esc 退出插入模式 ex模式
w 保存当前修改
q 退出
q! 强制退出
x/wq  保存退出
set nu 显示行数
在命令模式 !  运行命令
shift+; q:不保存 wq 保存 wq! 强制保存
:sh 切换回终端 ctrl+d 切换回vim



fdisk /dev/sb.. 进入分区
n 进入分区

* e 拓展分区>创建逻辑分区 l(5-more)


* p 主分区

p 查看分区
t 修改id L查看具体id
w 保存 并退出
partprobe 更新分区信息

###创建文件系统  --格式化

mke2fs -t ext4(文件系统) 目录

mke2fs -t ext4 /dev/sdb6

* ​       -c 检查损坏

* ​       -L 卷标

* ​       -j创建日志 ext4 自带


mkfs.ext4 /dev/sdb3  快速创建一个文件系统

dumpe2fs /dev/sdb2  查看文件系统信息

### joupnal日志

e2label /路径 查看标签

e2label /dev/sdb6 spring(设置标签)(大写)

fsck /dev/sdb 检查文件时候损坏 必须卸载

* -r 默认全部不提示修复

### 挂载操作 mount

mouth /dev/sdb6 /mnt/

mount其他参数

* -t 指定挂载类型

* -o 指定挂载选项

* remount 修改挂载

  ro 只读 rw 读写

* async 使用缓冲,更快

* sync 不使用缓存 

* noatime 不更新访问时间

* atime 更新文件访问时间

//重新挂载,并且设置只读

mount -o remount , ro /dev/sdb6 /mnt/ 

mount -0 remount, rw,sync /dev/sdb6 /mnt/

#### 关闭挂载

umount  目录或者文件系统

在关闭挂载的时候如果线程被占用

查看被占用线程 fuser -m /dev/sdb (文件路径)

​			    lsof /mnt/也可以

#### 自动挂载

配置文件/ect/fstab 用来定义需要挂载的文件系统

自动挂载:

![自动挂载](http://on7r0tqgu.bkt.clouddn.com/Fl5wd0bsIG9UJvXX6uZnRGMl8nEk.png)

### linux 获取帮助

* ls - -help

* man ls

* man -k pass 查看pass开头的文档

* info ls 更加详细的信息

* 可以通过 +/ + 关键字的方式

  ​




## 用户基础

1.root用户 id0

2.系统用户 1-499 没有sell

3.普通用户 500+

id 显示用户信息

passwd 修改用户密码

* /etc/passwd   -保存用户信息

* /etc/shadow  -保存用户密码

* /etc/group      -保存组信息

  ​

####查看用户

* whoami       显示当前用户
* who 显示有那些用户登录进入了系统
* w 显示登录的用户都在干什么

### 创建用户

useradd 用户名

- useradd 会执行 

  - 1.在/etc/passwd里面添加用户信息
  - 2.创建密码会保存在/etc/shadow/里面
  - 3.为用户创建新的家目录/home/0...\
  - 4.将**/etc/skel**的文件复制到用户家目录默认建立与用户名相同的组,skel文件每次都会进入新建用户

- useradd -d  指定家目录

  - -s  指定登录sell
  - -u  指定userid
  - -g 指定主族
  - -G 指定附属组

  将boold添加进入score i设置为600

  useradd -u 600 -G boold score

* passwd 用户名 设置用户密码

  ###修改用户信息  usermod

  - 修改用户id usermod -u 700 score
  - 修改用户名 usermod -l   新名 旧名

  ### 删除用户

  userdel 用户名 (保留用户目录)

  userdel -r 用户名   (同时删除用户名)

   ### 组 --管理用户

  - groupadd 组名 创建组
  - groupmod -g 500 zzzz 修改组 zzzzdi为500
  - groupmod -n new old  修改名字
  - groupdel name 删除组



 ## 文件权限

- r 读取
- w 写入
- x 执行  (目录必须有,否则无法查看)

文件权限:

 ![文件权限](http://on7r0tqgu.bkt.clouddn.com/Fp_DBTFLJC8PfBWJ91DKIEG8pyhd.png)



- chown 改变文件的所属用户

  - chown 新用户名 要改变的文件
  - 要递归修改里面的文件需要添加 -R
  - chgrp 新组名 要改变的文件 -R 同理

  ####修改权限:chmod

  ![修改权限](http://on7r0tqgu.bkt.clouddn.com/FvNsTvoTErcA6KscKd8rk8Epauv9.png)

-R参数递归改变所有的文件权限

命令chmod使用数字修改权限   

r = 4                                       rw = 4+2 = 6 

w = 2                                      rwx = 4+2+1 = 7 

x = 1                                        rx = 4+1 = 5\

chmod 666 score  score文件夹ugo为 rw-rw-rw\\









## 查找文件

**locate** 速度快 通过数据库搜索 ,添加的文件属性数据库,远程挂载,等等不适合使用

**find** 搜索 

-name 名称搜索

-size    大小搜索

find /etc -size +500M -size -5G   显示500M-5G的文件

* find /etc -size +500M -size -5G -exec du -sh {}  \;

 显示500M-5G的文件 外加内存大小

* find /home -user admin -ls

搜索/home目录里面 admin用户的文件

* find /home -user admin -or -user  user -ls

搜索/home里面 admin用户,和user用户的文件

* find /home -group boold -ls

搜索/home里面属于boold组里面的文件

* find /home -not -user admin -ls

  搜索/home里面不属于admin的文件

  ​

### 根据文件权限查找文件

find /home -perm 755 -ls

查找/home里面的755权限的用户

find /home -prem +222 -ls 

三者有任意一个2 都被匹配

find /home -prem -002

满足 用户 组 其他权限包含2都被匹配



### 根据文件日期时间查找文件



find /home -mmin -100;

查看之前100分钟内被查看过得文件 

find /home - ctime -3

查看三天之类权限被动过的文件

### 查找文件并且执行命令

find /home -name txt.txt -exec echo "{} /";

{}表示返回结果 echo打印出来

find / -size +5M -exec du {} \;|sort -nr

du 显示文件大小 

sort 排序 -n 按数字排序 -r 反向排序

find /home -name txt.txt -ok mv {} /linux/ \;

移动搜索到的txt.txt移动到linux文件夹下面



## grep

搜索单个文本 或者 递归搜索整个目录结构

grep ts /linux/txx.txt    -i  忽略大小写

搜索linux里面txt.txt里面ts的位置

grep -r ts /linux 

-r 递归查找文件夹linux里面含有ts的文件夹  

-l不显示文本

grep -ri --color ts /linux

递归查找linux文件夹下 包含ts文本,并且标红

ip addr show | grep inet

查看ip addr show 打印出来的里面的inet命令



### 如何打开,关闭,重启,检查一个服务

关闭 stop

打开 start

重启服务 restart

检查 status

ps 查看进程 

## 线程

- ps 查看线程 -u 详细显示\

  - rss 驻留内存大小
  - vsz 镜像进程大小
  - user 用户名
  - group 组
  - gid 组id
  - uid 用户id
  - comm 运行的完整命令行

- ps aux 查看所有线程 |less 上下查看文件

- ps -e  查看所有运行中的线程

  ps -eo pid,user,uid,group,gid,vsz,rss,comm |less

-o  可以自定义显示内容

- 添加sort 进行排序

ps -eo pid,user,group,gid,vsz,rss --sort=-rss |less

按照内存排序



#### top

面向屏幕的显示运行的进程

- 在top里面
  - M 按内存排序     P cpu使用情况排序
  - 1  切换查看所有cpu
  - R 反向排序
  - u admin  查看用户 admin的信息
  - ​