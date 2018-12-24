# 入坑Python

## 字符串

转义的问题

```python
print(c:\not\ntest)
c:
ot
test
```

解决方法

```python
print(c:\\not\\ntest)
print(r'c:\not\ntest') # r 让字符串变成了原始字符串
```

### 字符串的运算

```python
'hello'*3 # 这竟然可以运算
#根据下标获取字符
'hello world'[0]  #竟然不需要转数组
#截取部分字符串
'hello world'[0:4] #截取0-4位
#
'hello world'[4:] # 截取4-最后一位
'hello world'[:5] # 截取第一位 - 第五位
```



## 组

#### 列表

```python
#嵌套数组
[[1,2],[3,4],[5,6]] 
#获取数组元素
['新月打击','苍白之瀑','月之降临','月神冲刺'][3] #与字符串用法相同
#合并列表
d = ['新月打击','苍白之瀑','月之降临','月神冲刺']
e = ['点燃','传送']
print(d + e) #简单暴力
```

元祖

```python
#字符串操作一致
(1,2,3,4,5)[1]
#元祖类型
print(type((1,2,3,4,5)))
<class 'tuple'>
#只有一位的元祖会被认为是普通括号
print(type((1)))
<class 'int'>
#只创建只有一个字符的元祖
print(type((1,))
#创建空的元祖
print(type(())  
```

> 目前已知的py类型 int float bool str list tuple   `str list tuple`都是序列 都能通过下标获取 