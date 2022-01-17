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



## 栈

<img src="http://www.vkcyan.top/FvYN06r8pWTduGsadbodsBBjfaAt.png" style="zoom:25%;" />



一个**后进先出**的数据结构,例如蜂窝煤，先放进去的蜂窝煤是被后拿出来的，后放进去的先拿出来，放进去（push）拿出来（pop）

JavaScript虽然没有栈，但是可以通过array进行实现

```js
const stack = []
stack.push(1)
stack.push(2)

const item1 = stack.pop()
const item2 = stack.pop()
```



### 题目 有效括号

https://leetcode-cn.com/problems/valid-parentheses/

思路：使用栈的特性实现

时间复杂度：O(n)

空间复杂度：O(n)

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var obj = {
  '(': ')',
  '{': '}',
  '[': ']'
}
var isValid = function (s) {
  if (s.length % 2 === 1) {
    return false
  }
  const stack = []
  for (let i = 0; i < s.length; i++) {
    if (obj[s[i]]) {
      stack.push(s[i])
    } else {
      if (obj[stack[stack.length - 1]] === s[i]) {
        stack.pop()
      } else {
        return false
      }
    }
  }
  return stack.length === 0
};
```



### 函数调用堆栈

<img src="http://www.vkcyan.top/Fpu3ghHU6YPQrteXnfM8YnULDMIc.png" style="zoom: 25%;" />





## 队列

- 一个先进先出的数据结构，先放进去的后拿出来，先进先出，保持有序

- JavaScript中虽然没有队列但是可以通过array进行实现



```js
const stack = []
stack.push(1)
stack.push(2)

const item1 = stack.shift()
const item2 = stack.shift()
```



### 题目 最近请求次数

https://leetcode-cn.com/problems/number-of-recent-calls/

思路： 使用栈实现

时间复杂度：O(n)

空间复杂度：O(n)

```js
var RecentCounter = function () {
  this.q = []
};

/** 
 * @param {number} t
 * @return {number}
 */
RecentCounter.prototype.ping = function (t) {
  this.q.push(t)
  while (this.q[0] + 3000 < t) {
    this.q.shift()
  }
  return this.q.length
};
```



### 事件循环于任务队列

<img src="http://www.vkcyan.top/FrtzKYbQZRRHtsMGVyFsQ-Ebjq_8.png" style="zoom:33%;" />



​	如果执行事件的过程中，如果遇到了异步任务，比如dom操作，ajax，setTimeout，就会将事件交给webApi执行， 不会加入任务队列

​	直到异步任务结束，回调函数加入任务队列，如果回调函数里面还有异步任务，就继续做放入wenAPI里面做事件循环





## 链表

数组：增加或者删除非首尾元素时，需要移动元素

链表：增加或者删除非首尾元素时，不需要移动元素，只需要修改其next的指向即可



> 注： JavaScript 没有链表结构，所以我们需要用Object来模拟链表



### 题目 删除链表中的节点

https://leetcode-cn.com/problems/delete-node-in-a-linked-list/

时间复杂度：O(1)

空间复杂度：O(1)

```js
/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function (node) {
  node.val = node.next.val // 将自己变成别人
  node.next = node.next.next // 干掉别人，达到自己消失的目的
};
```



### 题目 反转链表

https://leetcode-cn.com/problems/reverse-linked-list/

时间复杂度：O(n)

空间复杂度：O(1) // p2里面都是p1的，所以不是新内存，temp因为是单个值，不是数组与矩阵，所以是O(1)

思路：每次循环的时候首先保存之后的链表，再讲当前链表指向新的链表，最后循环”之后的链表“，进而实现 

```
[1,2,3,4,5] => []
[2,3,4,5] => [1]
[3,4,5] => [1,2]
[4,5] => [1,2,3]
[5] => [1,2,3,4]
[] => [1,2,3,4,5]
```



#### 写法1 双指针

```js
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  let p1 = head // 链表
  let p2 = null
  while (p1) {
    const temp = p1.next // 首先保存当前的下一个指针 
    p1.next = p2 // 将当前指针指向新链表
    p2 = p1 // 替换之前的链表 [] => [1] => [2,1] => [3,2,1]
    p1 = temp // 为了下次循环,将下一个链表给p1(本次循环的已经被弹出) [1,2,3] => [2,3] => [3]
  }
  return p2 // 返回反转后的链表
};
```



#### 写法2 递归

```js
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  // 递归写法
  return reverse(null, head)

};

function reverse(now, old) {
  if (!old) { // 老数据没了,递归反转完成
    return now
  }
  let temp = old.next // 首先保存链表(除了自己)
  old.next = now // 将当前指针指向新链表
  return reverse(old, temp) // 将2个链表再执行一遍
}
```



### 题目 两数相加

https://leetcode-cn.com/problems/add-two-numbers/

时间复杂度：O(n)

空间复杂度：O(n)

思路：同时循环两个链表，在将数据放入一个新的链表中，对十位数需要进行额外的处理

```js
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let all = new ListNode(0) // 新建空链表
  let three = all  // 向新链表追加元素是需要指针,直接用all,链表头就没了
  let carry = 0 // 记录超出的十位数
  while (l1 || l2) { // 同时循环2个链表
    let val = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + carry // 同位数相加,并且加上上一位的超出的十位数
    carry = Math.floor(val / 10) // 获取超出的十位数
    three.next = new ListNode(val % 10) // 记录当前的余数
    three = three.next // 指向下一个链表
    if (l1) { // 2个链表长度不一致,需要判断
      l1 = l1.next
    }
    if (l2) {
      l2 = l2.next
    }
  }
  // 最后一位可能存在余数
  if (carry) {
    three.next = new ListNode(carry)
    three = three.next
  }
  return all.next
};
```



### 题目 删除排序链表中的重复元素

https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/

时间复杂度：O(n)

空间复杂度：O(1)

思路：遇到同样的，删除自己，没遇到，指针向后一位

```js
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  let all = head // 当前指针
  while (all && all.next) {
    if (all.val == all.next.val) {
      // 和下个一个节点一致,删除本阶段
      all.next = all.next.next
    } else {
      // 没有重复的,指针到下一个
      all = all.next
    }
  }
  return head
}
```



### 题目 环形链表

https://leetcode-cn.com/problems/linked-list-cycle/

题目解析: 给定一个特殊的链表，链表的最后一位再次指向链表中的某一个，这样会形成一个环，pos参数是未知的，通过算法判断该链表是否有环

#### 写法1 特殊值法

时间复杂度:O(n)

空间复杂度：O(1)

> 特殊值一定要保证不能在链表中出现

```js
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {

  	let all = head;
    while(all) {
      // 定一个特殊值，将遇到的每一项都变成这个特殊值
      //	如果有遇到了，就说明是存在环
      if(all.val == '123456789') {
        all = null
        return true
      } else {
        all.val = '123456789'
        all = all.next
      }
     
    }
  // 如果一次都没遇到这说明没有环
    return false
};
```



#### 写法2 快慢指针



> 1. 为什么快指针与慢指针一定会相遇?
>
>    一旦快指针进入环中，每次都离慢指针进一步，因为到了追上的时候，要么相隔1步，下一步相遇，要么相隔2步，下下次一定相遇
>
> 2. 快指针与慢指针相遇的时候，慢指针是否绕环超过了一圈
>
>     不会，假设环长为N，环外长度为n，N一定大于n；并且根据第一题可知每次快指针都距离慢指针进一步，所以N与n最终会距离n，所以N>n

时间复杂度:O(n)

空间复杂度：O(1)

```js
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
  let p1 = head
  let p2 = head
  while(p1 && p2 && p2.next) {
    p1 = p1.next
    p2 = p2.next.next
    if(p1 === p2) {
      return true
    }
  }
  return false
};
```



### JavaScript原型链

```
obj -> Object.prototype -> null // 对象
func -> Function.prototype -> Object.prototype -> null // 方法
arr -> Array.prototype -> Object.prototype -> null // 数组
```

#### 如果A沿着原型链能找到B.protype，那么 A instanceof B一定为true

<img src="http://www.vkcyan.top/Fr1oscC6eoFWDQ-E29bDbcp7wTbC.png" style="zoom:33%;" />

如果A对象上面没有找到X属性，那么就会沿着原型链找到X属性

例如：Object.prototype.x = 'x',那么函数func.x也会为x,因为Function.prototype指向Object.prototype



#### instanceof如何实现？（遍历原型链）

> 遍历链表，寻找是否存在一致的

```js
function instanceOf(params, type) {
  let p = params
  while (p) {
    if (p === type.prototype) {
      return true
    }
    p = p.__proto__
  }
  return false
}
```



### 应用 使用链表获取json的值

> 在知道全部键的情况下，或者说知道json中数据的的某个值，可以使用链表，嵌套for过于暴力

```js
const json = {
  a: {
    b: {
      c: 1
    }
  }
}
const path = ['a', 'b', 'c']

let p = json
path.map(e => {
  p = p[e]
})

console.log(p);
```



### 总结

- 链表中的元素不是连续的，而是通过next指针连接的
- JavaScript没有链表，但是Object可有模拟链表
- 常用操作：遍历链表，修改链表next
- JavaScript的原型链也是链表，使用`__proto__`进行连接





## 集合

- 一种无序且唯一的数据结构
- ES6增加了集合，Set
- 常用操作：去重 判断是否在集合中，求交集，差集



```js
// 去重
const arr = [1,2,3,4,4,4,4]
const arr2 = [...new Set(arr)]

// 判断是否在集合中
const set = new Set(arr)
const has = set.has(2)

// 求交集
const set1 = new Set([1,2,3,4])
const set2 = new Set([3,4,5,6])
const set3 = new Set([...set1].filter(e => set2.has(e))) // 将其中一个变成数组，另一个has，最终结果转为Set
```



### 题目 两个数组的交集

https://leetcode-cn.com/problems/intersection-of-two-arrays/

时间复杂度：O(n^2)

空间复杂度：O(1)

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function(nums1, nums2) {
  return [...new Set(nums1.filter(e => nums2.includes(e)))]
};
```



### JavaScript中Set的一些操作

```js
let my = new Set()

my.add(1) // 正常加入
my.add(2) // 正常加入
my.add(2) // set保证不会重复,依旧只有一个2
my.add('313') // 正常加入
let o = {
  a: 1
}
my.add(o) // 正常加入
my.add({ // 正常加入
  a: 1
})

const has1 = my.has({
  a: 1
}) // 返回false 引用类型不在内存的同一个地方

const has2 = my.has(o) // 返回true 
console.log(has1);

my.delete(1) // 正常删除

for (const item of my) { // 迭代函数 这个不使用my 使用my.values my.keys 都可以 都是一样的
  console.log(item);
}
```



## 字典

- 与集合类似，字段也是一种存储唯一值的数据结构吗，但是他是以键值对的形式来存储
- ES6中增加了字段，也就是Map

```js
let a = new Map([ // 默认值
  ['a', 'aa']
])
a.set('b', 'bb') // 加入值

a.delete('b', 'bb') // 删除
a.set('a', 'aaa') // 替换值

console.log(a.get('a'), a.get('b')); // 读取值
```



### 题目 两个数组的交集

时间复杂度：O(n)

空间复杂度：O(n)

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function(nums1, nums2) {
  // 集合的方式
  // return [...new Set(nums1.filter(e => nums2.includes(e)))]
  
  // 字典的方式
  const map = new Map();
  nums1.forEach(e => {
    map.set(e, true)
  })
  const res = []
  nums2.map(e => {
    if (map.get(e)) {
      res.push(e)
      map.delete(e)
    }
  })
  return res
};
```



### 题目 有效的括号

时间复杂度：O(n)

空间复杂度：O(n)

````js
/**
 * @param {string} s
 * @return {boolean}
 */

var isValid = function (s) {
  const stack = []
  var map = new Map([
    ['(', ')'],
    ['{', '}'],
    ['[', ']'],
  ])
  for (let i = 0; i < s.length; i++) {
    if (map.has(s[i])) {
      stack.push(s[i])
    } else {
      if (map.get(stack[stack.length - 1]) === s[i]) {
        stack.pop()
      } else {
        return false
      }
    }
  }
  return stack.length === 0
};
````



### 题目 两数之和

时间复杂度：O(n)

空间复杂度：O(n)

思路： 循环中每次判断map中，是否存在匹配项，如果没有，加入到map中，等到被匹配，如果匹配到了，直接返回被匹配到的与当前元素

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  let map = new Map()
  for (let i = 0; i < nums.length; i++) {
    let e = nums[i]
    let n = target - e
    if (map.has(n)) {
      return [map.get(n), i]
    } else {
      map.set(e, i)
    }
  }
};
```



### 题目 无重复字符的最长子串

时间复杂度：O(n)

空间复杂度：O(n)

思路：使用双指针 + 字典的方式实现，就像剪切视频时候的滑动窗口一张 右边指针不断向前，每次向前的时候，判断当前窗口中是否存在已有元素，如果存在，就将左边指针调整到存在的问题

同时每次都判断滑动窗口的长度，最终获取到最长子串

```js
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let res = 0 // 最长长度
  let a = 0 // 滑动窗口起点
  const map = new Map() // 存储字符的字典
  for (let b = 0; b < s.length; b++) {
    const e = s[b];
    if (map.has(e) && map.get(e) >= a) {
      // 如果存在重复元素
      // 如果是abba 这样的情况,需要防止滑动窗口起始点变小,已经在滑动窗口外面了,不应当考虑
      a = map.get(e) + 1 // 滑动窗口左边前进一位
    }
    map.set(e, b) // 存储当前值的最后的下标 用于下次计算起始点
    res = Math.max(res, b - a + 1) // 当前长度与已知最大长度
  }
  return res
}
```





## 小知识

### 调试工具栏每个图标的作用

<img src="http://www.vkcyan.top/FvPzD6xek5NzfA-Sa2wAfTKkT8nH.png" style="zoom:50%;" />

第一个箭头：程序运行到下一个断点，没有断点，程序执行完毕

第二个图标：一行一行执行代码

第三个图标：当前处如果调用了fun，点击此图标就会进入函数里面

第四个图标：点击跳出当前函数

第五个图标：重启调试

第六个图标：停止调试
