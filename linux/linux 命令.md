#linux命令总结

##mkdir

```bash
 -m, --mode=模式，设定权限<模式> (类似 chmod)，而不是 rwxrwxrwx 减 umask

 -p, --parents  可以是一个路径名称。此时若路径中的某些目录尚不存在,加上此选项后,系统将自动建立好那些尚不存在的目录,即一次可以建立多个目录; 

 -v,  --verbose  每次创建新目录都显示信息

      --help   显示此帮助信息并退出

      --version  输出版本信息并退出
```

## brctl--常用命令

```bash
yum install bridge-utils -y  //安装bridge
brctl addbr bridge           //创建网桥
brctl delbr bridge           //删除网桥
brctl addif bridge eth0      //将eth0入网桥bridge
brctl delif bridge etho      //将eth0加入网桥bridge
brctl show                   //查询网桥信息
brctl show bridge            //查看网桥bridge命令
```

## vi命令

按「ctrl」+「b」：屏幕往“后”移动一页。
按「ctrl」+「f」：屏幕往“前”移动一页。
按「ctrl」+「u」：屏幕往“后”移动半页。
按「ctrl」+「d」：屏幕往“前”移动半页。

按「$」：移动到光标所在行的“行尾”。

按「^」：移动到光标所在行的“行首”

按「#l」：光标移到该行的第#个位置，如：5l,56l

</hr>

## supermin5

```bash
supermin5 -v  //启用调试信息,可以理解为配置镜像文件
supermin5 -o  //设置输出目录
supermin5 -prepare //准备一个supermin装载器

```

```
service docker stop //关闭docker服务  
ip link set dev docker0 down //关闭docker0网桥   
ip link del dev docker0       //删除docker0网桥 
```

