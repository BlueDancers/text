#compose解析

```bash
version: '2'
services:
  xd_db:
    image: mysql:latest
    restart: always
    volumes:
      - db_data:/var/lib/mysql
    environment:
      MYSQL_ROOT_PASSWORD: wp_xiandian
  xd_wp:
    image: wordpress:latest
    restart: always  //题目没有做出要求
    depends_on:
      - xd_db
    ports:
      - 8888:80
    environment:
      WORDPRESS_DB_HOST: xd_db:3306
      WORDPRESS_DB_PASSWORD: wp_xiandian
```

一份标准配置文件应该包含  `version`、`services`、`networks` 三大部分

> version -- 使用compose版本为多少
>
> services --在services下面都是要添加的服务
>
> image -- 在 services 标签下的第二级标签是 xd_db，这个名字是用户自己自定义，它就是服务名称。
>
> restart  -- always 设置永远启动
>
> volumes -- 设置挂载目录
>
> environment -- 这个标签的作用是设置镜像变量，它可以保存变量到镜像里面，也就是说启动的容器也会包含这些变量设置

在题目里面这里应该是link 链接数据库的功能就已经实现,但是题目用的是depends_on也用link的功能

> depends_on -- 例如在没启动数据库容器的时候启动了应用容器，这时候应用容器会因为找不到数据库而退出，为了避免这种情况我们需要加入一个标签，就是 depends_on，这个标签解决了容器的依赖、启动先后的问题。
>
> ports --  映射端口的标签。
>
> environment -- 这里的标签使用的很恰当,避免不必要的错误
>
> 

>tty:true 如果一个容器启动后不运行任何 shell 命令怎么办，可以通过 docker run -t 命令或 docker compose 文件中的 tty: true 配置解决。
>
>hostname: wordpress   指定容器名  类似于dockerfile里面 
>
>scale 设置为服务运行的容器数量。



compose!!!!!! 格式一定要注意

   每个命令根据大小 空2格  image restart environment :里面 都要在:后面加空格







