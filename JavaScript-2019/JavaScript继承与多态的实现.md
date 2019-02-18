# JavaScript继承与多态的实现

虽然更多的日常编码中JavaScript多以**面向过程 **的形式进行编码,但是 **JavaScript**是一门正规的**面向对象**的个语言,

JavaScript(es5)没有类的概念,因此它的对象与基于类的对象又有所不同,所以继承与多态的实现与传统的面向对象语言有很大的差别

我们可以尝试使用JavaScript (ES5)版本进行继承的实现



## ES5实现继承与多态

```JavaScript
function Animal() { // 父类
  this.name = '动物'
  this.say = `我是${this.name}`
  this.property = true  
}

Animal.prototype.getToName = function () { // 父类方法
  return this.property
}
Animal.prototype.getSuperValue = function () { // 父类方法
  return this.property
}
function Dog() { // 之类
  this.age = 30
}
Dog.prototype.getToName = function () { // 重写父类,实现多态
  return `我是子类${this.age}`
}
Dog.prototype = new Animal() // 子类
Dog.prototype.prototype.getToName = function () { // 父类方法
  return this.age
}
Dog.prototype.constructor = Dog // 因为上方的prototype的替换,导致Dog的constructor指向了父类

var dog = new Dog()
console.log(dog.name); // 动物
console.log(dog.age); // 30
console.log(dog.getToName()); // 父类方法
console.log(dog.constructor);  // Dog()
```

可以看到js实现继承还是非常复杂的,需要进行原型链的继承,以及constructor的修正

多态的实现和大部分oo语言差不多,都是可以进行父类重写





## ES6实现继承与多态

> es6引入了class的写法,让JavaScript这个面向对象语言变得更加规范

```JavaScript
class Animal {
  constructor() {
    this.name = '张三' // 定义父类变量
  }
  getName() { // 定义父类方法
    return this.name
  }
  getAge() { 
    return 18
  }
}

class Dog extends Animal { // 继承父类
  constructor() {
    super()
    this.age = '30'
  }
  getAge() { // 重写父类
    return this.age
  }
}

var install = new Dog()
console.log(install.getName()) // 张三
console.log(install.getAge()) // 30
console.log(Dog.prototype) // 原型指向Dog
```



使用class语法可以清晰的完成es6的继承与多态,你会了吗?