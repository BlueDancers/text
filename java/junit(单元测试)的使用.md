---
title: junit的使用
date: 2018-7-27
tags: 
  - java
  - 单元测试
categories: java
---

测试对象是 是一个类中的方法

juint不是javase的一部分，想要使用导入jar包(新版本的eclipse都自带了)

1. 在想进行单元测试的java项目里面新建一下 `Source Folder`名为Text(意为测试包)
2. 在Text里面创建和你想测试的相同的包名
3. 在那里面新建一个java文件里作为测试文件

这里我测试File里面的一个类

![](http://on7r0tqgu.bkt.clouddn.com/FtYdwm3SIFpMSeRYfATNBJCOlRkU.png)

@Test：表示方法进行单元测试

@Before: 在每个方法执行运行

@After：在每个方法之后运行

@Ignore ：表示这个方法不进行单元测试

断言  Assert.assertEquals("测试期望的值", "方法运行的实际的值")

选中方法名称，右键运行 点击run as --- junit  
test当出现绿色条，表示方法测试通过