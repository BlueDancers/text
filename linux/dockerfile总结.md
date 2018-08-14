# dockerfile

###nginx -- dockerfile

官方:

```bash
FROM 10.0.6.83:5000/centos-7
MAINTAINER Xiandian
RUN rm -fv /etc/yum.repos.d/*
ADD local.repo /etc/yum.repos.d/
RUN yum install -y nginx
RUN rm -fv /etc/nginx/nginx.conf
ADD nginx.conf /etc/nginx/
EXPOSE 9090
ENTRYPOINT /usr/sbin/nginx
```

本地

```bash
FROM 192.168.200.104:5000/centos-7:latest
MAINTAINER xiandian
RUN rm -rf /etc/yum.repos.d/*
ADD local.repo  /etc/yum.repos.d/local.repo
RUN echo nameserver 114.114.114.114 >> /etc/resolv.conf
RUN yum install -y nginx
RUN rm -rf /etc/nginx/nginx.conf
ADD nginx.conf /etc/nginx/
EXPOSE 9090
ENTRYPOINT nginx -c /etc/nginx/nginx.conf & /bin/bash
```

1. `关于nginx的dockerfile,需要注意nginx文件在etc下面`
2. `本地搭建需要写入nameserver 114.114.114.114 到 reoslv.conf`

###mysql -- dockerfile

官方 -- 本地

```
FROM 192.168.200.104:5000/centos-7
MAINTAINER xiandian
RUN rm -fv /etc/yum.repos.d/*
ADD local.repo /etc/yum.repos.d/
RUN yum install -y mariadb-server
RUN mysql_install_db --user=mysql
ENV LC_ALL en_US.UTF-8
ENV MYSQL_USER xiandian
ENV MYSQL_PASS xiandian
ADD build_table.sh /root/build_table.sh
RUN chmod +x /root/build_table.sh
RUN /root/build_table.sh
ADD run.sh /root/run.sh
RUN chmod u+x /root/run.sh
EXPOSE 3306
CMD mysqld_safe
```

`mysql的dockerfile文件里面注意权限`

### apache-tomcat-6  -- dockerfile 

官方 -- 本地 

```
FROM 192.168.200.104:5000/centos-7
MAINTAINER xiandian
RUN rm -rf /etc/yum.repos.d/*
ADD local.repo /etc/yum.repos.d/local.repo
RUN yum install -y httpd php php-mysql
WORKDIR /root/
RUN mkdir -p /var/log/httpd
RUN mkdir -p /var/www/html
ENV MYSQL_ADDR 
ENV MYSQL_USER xiandian
ENV MYSQL_PASS xiandian
ENV LC_ALL=en_US.UTF-8
ENV TERM=linux
ADD test.php /var/www/html/test.php
EXPOSE 80
ADD run.sh /root/run.sh
RUN chmod u+x /root/run.sh
CMD /root/run.sh
```

`一定要注意ENV TROM=linux,不知道这有什么用,题目没有提及  `

### apache-tomcat

官方 -- 本地

```
FROM 192.168.200.104:5000/centos-7
MAINTAINER xiandian
RUN rm -rf /etc/yum.repos.d/*
ADD local.repo /etc/yum.repos.d/local.repo
RUN yum install -y java unzip
ENV LC_ALL en_US.UTF-8
ADD apache-tomcat.zip /root/apache-tomcat.zip
RUN unzip /root/apache-tomcat.zip -d /root/
EXPOSE 8080
ADD index.html /root/apache-tomcat-6/webapps/ROOT/index.html
ENV CATALINA_HOME /root/apache-tomcat-6
CMD ${CATALINA_HOME}/bin/catalina.sh run
```

`在安装之后一定要设置字符集 ENV LC_ALL en_US.UTF-8 并且在最后一定要 run一下脚本!         1    `  



