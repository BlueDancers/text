# JS数据结构与算法



数据结构为算法提供服务，算法围绕数据结构操作



## 时间复杂度

- 一个函数用大O表示，比如O(1)，O(n)，O(logN)...
- 定性描述该算法的运行时间

<img src="http://www.vkcyan.top/FjHw8lvXEnVrgeNMLJ15aEQWZX7G.png" style="zoom:30%;" />

### O(1) 

```js
let a = 1
a += 1
```

每次执行改逻辑的时候，之后执行一次，复杂度不会随着时间的变化而变化

### O(n)

```
for (let i = 0; i < n; i += 1) {
	console.log(i)
}
```

for循环里面的代码执行n次



### O(1)  + O(n) = O(n)

```js
let a = 1
a += 1

for (let i = 0; i < n; i += 1) {
	console.log(i)
}
```

两个时间复杂度先后排列就需要相加，相加的情况下低的的忽略不计，取更高的时间复杂度



### O(n)  * O(n) = O(n ^ 2)

```js
for (let i = 0; i < n; i += 1) {
	for (let j = 0; j < n; j += 1) {
		console.log(i, j)
	}
}
```

两个时间复杂度嵌套排列，时间复杂度就需要相乘



### O(logN)

$$
对数函数：如果ax=N（a>0，且a≠1），那么数x叫做以a为底N的对数，记作x=loga
$$

```js
let i = 1
while(i < n) {
	console.log(i)
	i *= 2
}
```

这里的logN以2为底数，目的是就是求2的多少次方为N，  上面的代码while循环每次*2，实际上就是求2的多少次方为N，所以时间复杂度就是O(logN)





## 空间复杂度

- 一个函数用O表示，比如O(1)，O(n)，O(n^2)
- 算法在运行过程中临时占用存储空间的大小的量度



### O(1)

```js
let i = 0
i += 1
```

声明了变量i，单个变量所占用的内存为1，所以空间复杂度为O(1)



### O(n)

```js
let list = []
for (let i = 0; i < n; i += 1) {
	list.push(i)
}
```

声明了变量list，通过循环我们增加了n个值，相当于占用了n个内存单元，所以这段代码的空间复杂度为O(n)



### O(n^2)

```js
const matrix = []
for (let i = 0; i < n; i += 1) {
  matrix.push([])
	for (let j = 0; j < n; j += 1) {
		matrix[i].push(j)
	}
}
```

O(n^2)实际上就是一个矩阵，矩阵的本质就是一个二维数据，存储了n的二次方的变量



## 小知识

### 调试工具栏每个图标的作用

<img src="http://www.vkcyan.top/FvPzD6xek5NzfA-Sa2wAfTKkT8nH.png" style="zoom:50%;" />

第一个箭头：程序运行到下一个断点，没有断点，程序执行完毕

第二个图标：一行一行执行代码

第三个图标：当前处如果调用了fun，点击此图标就会进入函数里面

第四个图标：点击跳出当前函数

第五个图标：重启调试

第六个图标：停止调试
