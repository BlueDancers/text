# 使用gitlabCI/CD完成前端自动化部署

<img src="https://images.591wsh.com/2021/10/18/thumb_1634553431259.png" style="zoom:20%;" />

2021年11月16日更新 

- 静态数据提取为变量

- 增加备份版本



## 前言

为什么使用CI/CD？

​	目前我们公司更新使用的[轻量化更新脚本](https://juejin.cn/post/7020322286565589029)，更新操作虽然简单,但是不够规范，并且敏感信息存在开发者电脑中，虽然我们`git`上进行了配置文件忽略，但是依旧存在泄密的风险，为了防止以上情况出现，我们将敏感信息移植到gitlab中，并且将更新操作从人工变为自动化



## CI/CD的优点

自动构建并且状态是每个人都可见的

减少手工的错误，解放了重复劳动力

更好，更快，更加安全，更加稳定的交付

- 在CI的过程中可以进行代码质量的自动检测，减少人工检查的劳动力
- 打包环境一致，不会出现编译后代码异常

减少等待时间，更快的交付成果



## 前置概念

#### CI

​		持续集成（continuous Integration）频繁的将代码继承到主干。目的是让产品可以快速迭代，同时还能保证高质量，他的核心措施就是代码继承到主干之前，必须通过自动化测试，只有存在失败，就不能集成。"持续继承并不能消除bug，而是让他非常容易发现和修改"

#### CD

​		持续交付（continuous Delivery）与持续部署（continuous Deployment）频繁的将软件的新版本，交付给质量团队或者用户，以供评审。如果评审通过就会进入生产阶段，持续交付可以看做持续集成的下一步，它强调的是不论怎么更新，软件都是随时随地可以交付的；代码通过评审之后，自动部署到生产环境，持续部署是持续交付的下一步，持续部署的目标是，软件在任何时刻都是可以部署的，可以进入生产阶段



#### gitLab

​		gitLab是一个开源的应用程序，他可以实现私有化的Gti项目仓库，可以通过web界面进行访问公开或者私人项目



#### gitLab CI/CD

​	gitLab持续集成，只要在仓库的根目录添加`.gitlab-ci.yml`文件，并且配置了gitLab runner（运行器），每次代码发生变成的时候就会执行`.gitlab-ci.yml`中的配置



#### gitLab Runner

​	gitLab Runner是一个开源项目，支持多平台运行，他的作用是每次代码发生变更的时候gitlab CI会根据`.gitlab-ci.yml`，配置文件执行流水线（Pipeline）中每个阶段Stages中的Jobs，并将结果发送回gitLab。gitLab Runner是基于gitLab CI的API进行构建的相互隔离的机器，所以gitLab Runner 与gitlab本身不需要安装在同一台机器上，并且考虑到执行Runner对资源的消耗，以及安全性问题，所以并不建议安装在同一台机器上



#### Pipelines

​	流水线，是分阶段的构建任务，比如安装依赖，运行测试，打包部署，流水线由gitLab Runner进行触发，流水线运行的依据是`gitlab-ci.yml`



#### Stages

​		构建阶段,也就是流水线的每一个环节，我们可以在 Pipelines中建立多个Stages，所有Stages都会按顺序同步进行，只有当所有的Stages都完成了Pipelines才算成功，默认情况下上一个Stages失败，这条流水线则为失败



#### Jobs

​	表示构建阶段的作业，关于jobs的设置有很多，比如指定手动触发，指定分支触发，同时运行多个jobs，等等，相同的Stages中的jobs会异步进行，Stages中的jobs全部成功了，Stages才为成功，默认情况下存在jobs失败，这条流水线则为失败



####  .gitlab-ci.yml

​		在gitLab CI/CD中，具体如何运行流水线，是由` .gitlab-ci.yml`来管理的，这个文件放在项目仓库的根目录

实例代码：

````yaml
# stages：定义Pipeline中的各个构建阶段，并且定义Stages名称
stages:
  - install
  - build

# 定义 install 阶段的一个 job
install-job:
  stage: install
  script:
    - echo "hello install"

# 定义 build 阶段的一个 job
build-job:
  stage: build
  script:
    - echo "Hello, build"
````



## 环境搭建

​	此类文章太多了，请自行查找，本文不做搭建介绍

​	针对已经搭建好的gitLab以及runner，为了适应前端开发环境，需要安装了node，cnpm，等等依赖



## 前置技能

git：不会git可以退出直播间了，赶快去学吧

linux：常用命令必须会，不然配置runner，以及编写ci.yml脚本的时候会寸步难行



## 创建组织，导入git的项目

> 创建组织主要是为了方便配置CI/CD的全局变量，也方便项目的集中管理

​	在使用gitlab之前，我们的项目可能会在github，gitee，等等其他代码仓库，为了保留之前记录，我们需要将git仓库移植过来

![image-20211014140909840](https://images.591wsh.com/2021/10/14/1634192962342.png)

我们之前使用的是gitee，gitlab没有对此做快捷支持，所以我们使用`Repo URL`,填写好地址与账号，就可以将git仓库导入进来

## 更新git文件

我们将git迁移到gitlab之后，现有项目中的.git文件都需要进行更换，不能再向之前的仓库提交代码。

- 停止代码提交

- 获取最新代码，切换到master分支
- clone 新的gitlab的仓库
- 获取新的.git文件，覆盖原本项目中的.git，完成迁移



到目前为止，我们就可以完成git项目的迁移操作

## 配置组织的CI/CD变量

​	组织中的项目大部分都是更新到一个服务器，例如服务器地址与密码，我们可以将这部分数据统一配置到全局变量，这样组织中的项目则无需再次进行设置

![image-20211014140044915](https://images.591wsh.com/2021/10/14/thumb_1634191321809.png)

注意：

- 因为我们的项目不仅仅是master分支会运行runner，如果这里不关闭State，除了master（受保护的分支）其他的分支都访问不了这个变量
- CI/CD的变量功能可以很好的保护项目的隐私数据，可以隔离使用者与项目更新配置

## 配置gitlab-runner（linux）

> 注意：本文无搭建gitlab以及gitlab-runner相关教程，一切都是在已经搭建完成的基础上进行使用的

​	我们针对项目就要注册一个runner，来完成我们接下来配置中的命令操作，这部分界面操作无法完成，需要对gitlab runner的服务器进行操作

### 获取配置相关数据

![](https://images.591wsh.com/2021/10/14/1634192961446.png)

![](https://images.591wsh.com/2021/10/14/thumb_1634192960394.png)



### 注册自定义runner

我们需要注册一个特定的runner，这里官方提示顺序为

1. 安装runner
2. 注册一个runner，并且URL指定为xxx，token指定为xxx

接下来我们就要去runner宿主机上面注册

使用终端工具链接宿主机

输入命令

```bash
gitlab-runner register
```

![](https://images.591wsh.com/2021/10/14/thumb_1634195014873.png)

完成配置之后，在回到项目CI/CD部分的设置,就会发现下面多一个runner

> 注：刚刚注册的runner状态是黑色的，等会就会变成绿色

![](https://images.591wsh.com/2021/10/14/thumb_1634195127162.png)



 到此为止，runner已经准备就绪，他会执行我们项目中的`.gitlab-ci.yml`文件中的配置

## 编写.gitlab-ci.yml

> 具体编写过程请查看官方教程

**ps：注意一点，线上静态文件最好不要命名为dist，CI脚本中dist为中转站文件夹，命名为dist会出现问题**

```bash
stages: # 分段
  - install
  - build
  - deploy

cache: # 缓存
  paths:
    - node_modules
    - admin

install-job:
  stage: install
  only:
    - prod-pre
  script:
    - echo "开始install🔥🔥🔥"
    - npm install
    - echo "完成install🔥🔥🔥"

build-job:
  stage: build
  only:
    - prod-pre
  script:
    - echo "开始代码打包💪💪💪"
    - npm run build
    - echo "完成代码打包💪💪💪"

deploy-job:
  stage: deploy
  only:
    - prod-pre
  before_script:
    - echo "发射到目标服务器✨✨✨"
  script:
    - sshpass -p $PASSWORD scp -o StrictHostKeyChecking=no -r ./dist $USERNAME@$HOST:$UPLOADDIR/   # 将打包完成的文件复制到目标服务器
    - sshpass -p $PASSWORD ssh -o StrictHostKeyChecking=no $USERNAME@$HOST rm -rf $UPLOADDIR/xxxx # 删除原有文件
    - sshpass -p $PASSWORD ssh -o StrictHostKeyChecking=no $USERNAME@$HOST mv $UPLOADDIR/dist $UPLOADDIR/xxxx # 将目标文件改为服务端真正文件
  after_script:
    - echo "完成更新👏👏👏"

```



在配置文件中配置了执行的分支，当我们在prod-pre分支上提交代码的时候，脚本就会**自动执行**

- install项目依赖
- build项目
- 发射到目标服务器

![image-20211014154621451](https://images.591wsh.com/2021/10/14/thumb_1634197592199.png)



这样就完成我们项目的自动化部署

##  CI脚本的优化

### 优化自动化部署速度

上面我们完成了一个简单的流水线，他可以完成 install build delay，已经满足了基本要求，但是还存在一些小问题

- 流水线任务时间过长
- 频繁install存在失败的概率

我们需要优化我们的CI，让速度更快更加稳定

build环节与delay环节没有太大的操作空间，并且大部分的时间都花在install环节，我们启用了gitlab的cache，实际上并不需要每次都打包，针对这个思路我们修改我们job中的 **install**，在job中增加当前是否存在**node_modules/**的判断

```yaml
install-job:
  stage: install
  only:
    refs:
      - prod-pre
  script:
    - echo "开始install🔥🔥🔥"
    - if [ ! -d "./node_modules/" ];then   npm install;   else   echo "缓存存在,跳过install"; fi
    - echo "完成install🔥🔥🔥"
```

 		这样存在缓存的时候就会跳过install阶段，但是这样还存在一个问题，我们修改了依赖，但是gitlab里面缓存还在，必然会出现打包异常的情况，针对package.json发生变化，我们再增加一个job，监听package.json 是否发生变化

### 静态数据提取为变量

> 假如存在多个项目，使用本脚本只需要修改此处的variables即可，不需要改script部分

```yaml
variables:
  BUILDDIR: dist # 打包文件名
  PRODDIR: dist # 线上文件名
  BACKUPDIR: dist_back # 备份文件夹
```



### 增加备份功能

- 删除原有备份文件(仅在生产环境)
- 删除原有文件 备份原本的代码(仅在生产环境)
- 将打包完成的文件复制到目标服务器
- 将目标文件改为服务端真正文件

## .gitlab-ci.yml（正式版本）

> 指定了prod分支，根据实际项目进行修改

```yaml
stages: # 分段
  - repInstall
  - install
  - build
  - deploy

variables:
  BUILDDIR: dist # 打包文件名
  PRODDIR: dist # 线上文件名
  BACKUPDIR: dist_back # 备份文件夹

cache: # 缓存
  paths:
    - node_modules
    - dist

repInstall-job:
  stage: repInstall
  only:
    refs:
      - prod
    changes:
      - package.json
  script:
    - echo "依赖发生变化,开始install🔥🔥🔥"
    - cnpm install
    - echo "完成install🔥🔥🔥"

install-job:
  stage: install
  only:
    refs:
      - prod
  script:
    - echo "开始install🔥🔥🔥"
    - if [ ! -d "./node_modules/" ];then   npm install;   else   echo "缓存存在,跳过install"; fi
    - echo "完成install🔥🔥🔥"

build-job:
  stage: build
  only:
    - prod
  script:
    - echo "开始代码打包💪💪💪"
    - npm run build
    - echo "完成代码打包💪💪💪"

deploy-job:
  stage: deploy
  only:
    - prod
  before_script:
    - echo "发射到目标服务器✨✨✨"
  script:
    - echo "发射到目标服务器✨✨✨"
    - sshpass -p $PASSWORD ssh -o StrictHostKeyChecking=no $USERNAME@$HOST rm -rf $UPLOADDIR/backup/$BACKUPDIR # 删除原有备份文件(仅在生产环境)
    - sshpass -p $PASSWORD ssh -o StrictHostKeyChecking=no $USERNAME@$HOST mv $UPLOADDIR/$PRODDIR/ $UPLOADDIR/backup/$BACKUPDIR/ # 删除原有文件 备份原本的代码(仅在生产环境)
    - sshpass -p $PASSWORD scp -o StrictHostKeyChecking=no -r ./$BUILDDIR/. $USERNAME@$HOST:$UPLOADDIR/dist # 将打包完成的文件复制到目标服务器
    - sshpass -p $PASSWORD ssh -o StrictHostKeyChecking=no $USERNAME@$HOST mv $UPLOADDIR/dist $UPLOADDIR/$PRODDIR # 将目标文件改为服务端真正文件
    - echo "完成更新👏👏👏"
  after_script:
    - echo "完成更新👏👏👏"

```





## .gitlab-ci.yml（简化）

> 指定了prod-pre分支，根据实际项目进行修改

```yaml
stages: # 分段
  - preInstall
  - install
  - build
  - deploy

variables:
  BUILDDIR: dist # 打包文件名
  PRODDIR: dist_test # 线上文件名

cache: # 缓存
  paths:
    - node_modules
    - dist

preInstall-job:
  stage: preInstall
  only:
    refs:
      - prod-pre
    changes:
      - package.json
  script:
    - echo "依赖发生变化,开始install🔥🔥🔥"
    - cnpm install
    - echo "完成install🔥🔥🔥"

install-job:
  stage: install
  only:
    refs:
      - prod-pre
  script:
    - echo "开始install🔥🔥🔥"
    - if [ ! -d "./node_modules/" ];then   npm install;   else   echo "缓存存在,跳过install"; fi
    - echo "完成install🔥🔥🔥"

build-job:
  stage: build
  only:
    - prod-pre
  script:
    - echo "开始代码打包💪💪💪"
    - npm run build
    - echo "完成代码打包💪💪💪"

deploy-job:
  stage: deploy
  only:
    - prod-pre
  before_script:
    - echo "发射到目标服务器✨✨✨"
  script:
    - sshpass -p $PASSWORD scp -o StrictHostKeyChecking=no -r ./$BUILDDIR/. $USERNAME@$HOST:$UPLOADDIR/dist/ # 将打包完成的文件复制到目标服务器
    - sshpass -p $PASSWORD ssh -o StrictHostKeyChecking=no $USERNAME@$HOST rm -rf $UPLOADDIR/$PRODDIR # 删除原有文件
    - sshpass -p $PASSWORD ssh -o StrictHostKeyChecking=no $USERNAME@$HOST mv $UPLOADDIR/dist $UPLOADDIR/$PRODDIR # 将目标文件改为服务端真正文件
  after_script:
    - echo "完成更新👏👏👏"
```



## 代码地址：

[github](https://github.com/vkcyan/code-fragment/tree/master/gitlab%20CI)



## 结语

​		除了使用gitlabCI/CD来完成自动化部署之外也可以使用Jenkins+webHook来完成，效果都是一样的，如果这两种方案对你，或者你的公司来说都比较复杂，那么我建议试试[轻量化更新方案](https://juejin.cn/post/7020322286565589029)，我们也在实际项目上使用过很久，可以确保不会出现稳定性，是可以在生产环境使用的



如果使用中遇到了什么问题，请到QQ群 530496237，一起吹吹水

也可以添加我的微信：carpediem-rollin，加入微信群