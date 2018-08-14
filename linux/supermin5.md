## supermin5

```bash 
yum install supermin5 -y   //安装supermin5
supermin -v --prepare bash net-tools initscript vi coreutils -o supermin.d
						-v  配置supermin基本配置
						--prepare 系统安装内容
						coreutils 核心工具结束标志
                          -o supermin.d 写入supermin.d里面
supermin5 -v --build --format chroot supermin.d -o appliance.d
						--build   构建镜像
                          --format  指定镜像格式为chroot
echo 7 > appliance.d/etc/yum/vars/releasever    #写入版本号
tar --numeric-owner -cpf centos.tar -C appliance.d .
					--numeric-owner        总是以数字代表用户/组的名称
					-cpf    
					-C 解压到指定目录
					
```

