console.log('%c let 与 vart', 'color:red;font-size:20px')  

//在es5里面当变量被定义 就会发生变量提升

//使用let语法就可以把变量限制在当前代码块中,不会发生变量提升(块级声明)

function varTest() {

​    var x = 1;

​    if (true) {

​        var x = 2;  // 同样的变量!

​        console.log(x);  // 2

​    }

​    console.log(x);  // 2

} 

varTest();

function letTest() {

​    let x = 1;

​    if (true) {

​        let x = 2;  // 不同的变量   

​        console.log(x);  // 2

​    }

​    console.log(x);  // 1

}

letTest();

(function score(){

​    var score = 20;

​    if(true){

​        let score=25;

​        console.log(score);  // 25   关键字被声明两次,var 与let如果在当前作用域嵌套另一个作用域,便可以在嵌套里面使用let声明变量

​    }else{

​        

​    }

​    console.log(score); // 20

}());

//在这里的let在if里面声明变量,不会抛出错误,里面的score不在一个作用域,所以不报错

(function (){

​    const docker = 23;

​    if(true){

​       let docker = 20;   //此处的docker可以被在此声明,因为内存域里面

​        console.log(docker);

​    }

​    console.log(docker);  

​    //var docker =25;   //此处的变量docker 无法被在此声明,因为const类型的变量一旦被声明就无法被更改 

​    //console.log(docker);

})();

//有一点需要注意,虽然const的绑定无法被改变,但是允许修改里面的值

const peron = {

​    name:"score"

}

console.log(peron.name);

peron.name = "zz";

console.log(peron.name);

if(true){

​    console.log(typeof blue);

​      var vlue = 20;   //let const 与var最大的不同是 不会被变量提升  使用var 会打印出nudefined 因为变量提升 如果是let与const就会直接报错

​    //let blue = 20;   //此时的blue处于临时死区

}

console.log('%c 循环中的块作用域', 'color:red;font-size:20px')  

//for(var i=0; i<5;i++){ 

//   console.log(i) 0,1,2,3,4    //这里定义i是for循环变量 但是因为变量提升 所以导致 在全局里面依旧可以访问到i 

//}

//console.log(i)  5

/*for(let i=0;i<5;i++){

​    console.log(i);  0,1,2,3,4   //因为let是局部的,此时外部已经访问不到了

}*/

//console.log(i);

var funcs = [];

for (var i = 0; i < 5; i++){ 

​    funcs.push(function(){  //将i函数的形式储存进入funcs,

​        console.log(i);

​    });

​    console.log(function () {

​        console.log(i);

​    })

}

funcs.forEach(function(ls){

​    ls() //5 5 5 5 5 这里循环里面的每次迭代都会共享变量I 循环内部创建的变量全部都保留了对相同变量的引用循环结束变量是10,所以每次调用console.log(i)都是5

})

var funcs1 = [];

for (var i = 0; i < 5; i++) {

​    funcs1.push((function (ss) { 

​        return function () {

​            console.log(ss)

​        }

​    }(i)));

}

funcs1.forEach(function (ls) {

​    ls()   // 0 1 2 3 4 在循环内部IIFE表达式为接受的每一个变量,都创建一个副本来存储他,这和变量的值就是相应迭代创建函数使用的值,所以调用函数就会逐个打印出来 

})

//使用块级作用域就避免了这样的问题

var funcs2 = [];

for (let i = 0; i < 5; i++) {

​    funcs2.push(function () { //使用let来循环就避免了变量被叠加的问题,每次迭代都会创建新的变量,并以之前迭代中同名的变量值进行初始化

​        console.log(i);

​    });

}

funcs2.forEach(function (ls) {

​    ls() 

})

var font1 = [];

var font2 = {

​        a: true,

​        b: true,

​        c: true

​    };

for(let i in font2){

​    font1.push(function () {

​        console.log(i);

​    })

}

font1.forEach(function(ls){

​    console.log(ls());

})    //在每次循环let都会创建一个新的变量,循环内部创建的每个函数都能有属于他的i,这里使用var就会发生错误

console.log("循环里面的const声明")

var font3 = [];

/*for(const i=0;i<5;i++){

​    console.log(i)

}*/  //抛出错误,在循环里面const值发生了改变 

var font4 = [];

var font5 = {

​    a:true,

​    b:true,

​    c:true

}

for(const i in font5){

​    font4.push(function(){

​        console.log(i);

​    })

}

font4.forEach(function(ls){

​    console.log(ls())

})   //为什么可以执行成功,因为在for-in里面,每次迭代不会修改已经有的绑定,而是会创建新的绑定

console.log("全局块作用域绑定")

let score1 = "Hi";   

window.score1 = "hahahaha"  

console.log(score1);        //Hi

console.log(window.score1); //undefined   

//let与const与var 最大区别就是它们在全局函数里面的不同当var被作用与全局,会创建一个全新的全局变量,不会去改变window对象的属性

//let与const不能覆盖全局变量,只能去遮蔽他,如果不想创建全局变量,使用let和const要好的多

console.log('%c 字符串与正则表达式', 'color:red;font-size:20px')  

let score2 = "域值";

console.log(score2.length);    //2

console.log(score2.charAt(0))  //域  

//然而这里使用的是utf-8 

//在es6里面新增charCodeAt方法 返回与字符串中给定位置对应得码位

//对于在BMP字符集里面的字符,sharCodeAt与 codePointAt 作用是一样的

console.log(score2.charCodeAt(0));  //22495

console.log(score2.codePointAt(0)); //22495

//判断一个字符占用编码单位最简单的方法

function ss(score) {

​    return score.codePointAt(0) > 0xFFFF;

}

console.log(ss(score2));  //都返回false 证明都是单编码字符

console.log(ss("1"));

console.log(String.fromCodePoint(22495))

console.log(String.fromCharCode(22495))

//通过codePointAt来检索字符串字符码,同样可以通过对应的方法进行生成字符(fromCharCode)

console.log("正则表达式的u修饰符 > 将编码单元操作模式切换为字符模式");

let score3 = 0123456;           //数字无法使用includes,必须是字符串

let score4 = "xiandian";

console.log(score4.includes("x"));  //includes("x") 检测到匹配的字符就会返回true 检测不到返回false

console.log(score4.includes("z"));  

console.log(score4.startsWith("xian")); //startsWith() 对字符串的起始部分与指定文本相同就返回true,反之返回false

console.log(score4.startsWith("cc"))  

console.log(score4.endsWith("dian"));   //对字符串的结尾进行匹配 相同就返回rtue 反之返回false

console.log(score4.endsWith("xian")); 

console.log(score4.indexOf("n"))   //include 还有startsWith endsWith 都是只能进行判断 看位置还是使用indexOf()

console.log(score4.includes("x",5))   //在include后面可以添加检索的起始位置,减少代码的检索范围

console.log("xiandian ".repeat("2")); //repeat()表示操作字符的重复次数

let indent  =  ".".repeat(4)

indentLevel = 0;

let newIndent = indent.repeat(++indentLevel);

console.log(newIndent)

//什么鬼..

console.log("正则的es6不做深究")

console.log('%c 模板字面量', 'color:red;font-size:15px')  

let message = `message`;

console.log(message);

let messages  = `\`message\` xiandian`; //如果想在字符串里面使用\进行转义就可以解决

console.log(messages); 

//模板字面量的出现,HTML转义的实现 > 插入经过安装转化的HTML字符串的能力 基本字符串格式化 

var score5 = "xiandian\

sssss"

 //es6之前开发者想使用一种创建多行字符串的方法,使用单引号 双引号 就一定在同一行 es5代码长期a存在的bug 在新的一行最前面添加\可以承接上一行代码 

 //\ 这里是是代码的延续不是新的一行

console.log(score5);

var score6 = "xiandian\n\

sssss"  //输入新的一行要加\n\才可以

console.log(score6);

//反而这样的行为被称为js引擎的bug 

//正常实现的多行字符串

let score7 = [

​    "score",

​    "font"

].join("\n");

console.log(score7);  //以数组分割后面夹

console.log("在es6里面进行简化");

let mess = `score 

zzzz`

console.log(mess+"--"+"字符长度为"+mess.length);  //极大的简化了多行字符的创建过程

//也可以这样

let messa = `score\nzzzzz`

console.log(messa + "--" + "字符长度为" + messa.length);  //\nz在``里面会被认为是换行 增加美观性

let score8 = `score

​            string`;

console.log(score8 + "--" + "字符长度为" + score8.length);  //在``里面空格不会被忽略

console.log("字符串占位符");

//模板字面量还提供了占位符的功能

let score9 = "Word";

let score10 = `Hello ${score9}`;  //在``里面${score9} 代表前面定义的

console.log(score10);

console.log();

let score11 = 10;

let score12 = 0.25;

let score13 = `${score11} items costs $${(score11*score12).toFixed(2)}`

console.log(score13); //10 items costs $2 .50  在``里面乐意执行函数调用以及运算式 

let name = "diandian";

let score14 = `hello , my name is ${name}`;

console.log(score14);

//模板标签    看不太懂

//这是es6实现的函数参数的默认值 避免了之前传值的判断空字符

function xincan(one, two, three = 2000) {

​    //two = two || 2000;

​    console.log(one+"--"+two+"--"+three);

}

xincan(20,50,"");

//es5写法

function es5xincan(a,s,d){

​    a = a || 10;

​    console.log(a+"--"+s+"--"+d);

}

es5xincan("",20,30);  //在a给定了空字符,但是却打印出了10 没有识别"""

//es是通过判断参数类型来解决的

function es5xincan1(a, s, d) {

​    a = (typeof a !== undefined)?a:2000;   //通过判断实现""不会被改成默认值

​    console.log(typeof a);

​    console.log(a + "--" + s + "--" + d);

}

es5xincan1("", 20, 30);  

let x=99;

function foo(p=x+1){

​    console.log(p);

}

foo()

foo() //每次调用函数foo()的时候,都会重新计算,而不是默认foo是100

//参数默认值不是传值的，而是每次都重新计算默认值表达式的值。也就是说，参数默认值是惰性求值的。

function mixArgs(first,second = "b"){

​    console.log(arguments.length)//当我们在js中在调用一个函数的时候，我们经常会给这个函数传递一些参数，js把传入到这个函数的全部参数存储在一个叫做arguments的东西里面

​    console.log(first === arguments[0]);  //true

​    console.log(second); 

​    console.log(arguments[0])

​    console.log(second === arguments[1]);  //false

​    first= 1;

​    second = 2;

​    console.log(first === arguments[0]);   //false

​    console.log(second === arguments[1]);  //false

​    //arguments并不会发生变化

}

mixArgs("a")

function getvalue(){

​    return 5;

}

function add(a,b=getvalue()){

​    console.log(a + b); 

}

add(1);      //6

add(1,2);    //3

//可以通过函数执行来获取默认参数的值

let score15 = 5;

function getscore15(){

​    return score15++;

​    //

}

function addscore15(a,b = getscore15()){

​    console.log(a+b);  //

​    console.log(score15); 

}

addscore15(1);      //6

addscore15(1);      //7

function addsacore(a,b=a) {

​    console.log(a+b);

}

//addsacore(1);       //输出2

//addsacore(1,1);     //输出2

function  checkArgs(...keys) {

​    let keyss=0;

   for(let i=0;i<keys.length;i++){

​       keyss+=keys[i]

   }

​    console.log(keyss);

}

checkArgs(9,9);

let addp = new Function("return 1+1");  //Function 是构造函数,以接受字符串的形式

console.log(addp());

//展开运算符

let value1 = 10;

let value2 = 25;

console.log(Math.max(value1,value2));

//两个值很简单处理,但是值很多呢,在es5里面

let valuess = [45,78,23,65,98,44];

console.log(Math.max.apply(Math,valuess));    //98 //看不懂  

//使用es6的不定参数

console.log(Math.max(...valuess));  //js会将参数数组分割陈各执独立的参数并依次传入

//如果你想限制最大值为100,可以单独传入数字

console.log(Math.max(...valuess,100));    //这是就会返回100

//默认参数   不定参数

//name属性

//由于在js中有太多定义函数的方式,因而辨别函数就是很重要的事,在js里面新增了name

function dosomething(){

}

var doanotherthing = function(){

}

console.log(dosomething.name);

console.log(doanotherthing.name);

//name的特殊情况

var dosome = function doSomeElse(){

};

var person = {

​    get firstName(){

​        return "asddasasasda";

​    },

​    sayname: function(){

​        console.log(this.name);

​    }

}

console.log(dosome.name);

//console.log(peron.firstName.name);   //为啥会报错!!!!!

//console.log(peron.sayname.name);

console.log("明确函数的多重用途");

function persion(name){

​    this.name=name;

​    console.log(name);

}

var perssion = new persion("纳兰");

var presion2 = persion();

console.log(perssion);   //只用通过new才体现出了函数的能力,导致函数混乱的双重身份;

console.log(presion2);

/*

JavaScript 函数有两个不同的内部方法: [[Call] ]和[[Construct]]。

当通过new 关键字调用函数时，执行的是[[Construct]]函数，它负责创建一个通常被称作实例的新对象，然后再执行函数体，将this 绑定到实例上; 

如果不通过new 关键字调用函数，则执行[[Call]]函数，从而直接执行代码中的函数体。

具有[[Construct]] 方法的函数被统称为构造函数。

*/

//在es5里面判断函数时候被调用

/*

function persions(name){ 

​    if(this instanceof persion){

​        this.name = name;

​    }else{

​        throw new Error("必须通过new来调用persion")

​    }

}

var persions =new persions("score");

var notper = persions("score");

*/  //报错.........

//为了解决判断函数是不是通过new关键字判断的问题,es6引入了new.target 这个元数据  是构造函数都会新创建对象实例,如果不是就会返回undefined

function score16(name){

​    if(typeof new.target !== "undefined"){

​        this.name = name;

​       // console.log(new.target)

​    }else{

​        throw new Error("必须使用new");

​    }

}

var score17 = new score16("sda");   //四通typeof的new.target来判断时候使用了new

//var score18 = score16("sda");       //这里没用new 就会报错//

function score19(name){

​    if(typeof new.target === "function"){

​        this.name = name;

​    }else{

​        throw new Error("必须是new关键字调用score19");

​    }

}

function score20(name) {

​    this.name = name;

}

var score19 = new score19("score");

var score22 = new score20("name");

"use strict";

if(true){

​    console.log(typeof score55);

​    function score55(){

​        console.log("块级函数")

​    }     

}

console.log(typeof score55);   //function  在非严格模式下,score55()函数被提升至全局作用域

if (true) {

​    //console.log(typeof score56);

​    let score56 = function (){

​        console.log("块级函数")

​    }

}

console.log(typeof score56);

console.log('%c 箭头函数', 'color:red;font-size:20px');

console.log("1. 没有了this,super,arguments,new.target,这值由最外面一层非箭头函数决定")

console.log("2. 不可以new关键字调用");

console.log("3. 没有原型,不存在prototype");

console.log("4. 不可以改变this绑定");

console.log("5. 不支持argunemts对象");

console.log("6. 不支持重复的命名参数");

console.log("7. 箭头函数主要是减少错误,以及this指向混乱的问题")

console.log("8. 箭头函数语法")

let Arrow = value3 => console.log(value3);  //相当于

/*

let arrow = function (value3) {

​    return console.log(value3)

}

*/

Arrow(1);

let sum = (sum1,sum2) => sum1+sum2;

console.log(sum(1, 2))      //3

let getname = () => "这是箭头函数"; 

console.log(getname());

let persionss = ((name) => {

​    return {

​        getname: function () {

​            return name;

​        }

​    };

})("xiandian")

console.log(persionss.getname())

//箭头函数是没有this绑定,必须通过查找作用域内决定值,如果箭头函数被非箭头函数包含,则this绑定的是最近的一层非箭头函数,如果未免没非箭头函数,this1就是undefined

//箭头函数无法用new来调用

let values = [20,60,40,30];

var letsults11 = values.sort((zxzz,zzzz) => zxzz-zzzz);

console.log(letsults11);

//sort()  map()  reduce() 

var arr = [4, 3, 6, 5, 7, 2, 1];

arr.sort();

console.log(arr);

function score23(){

​    return () =>arguments[0];

}

var score24 = score23(5);

console.log(score24());   //看不太懂

//但是可以看出,箭头函数没有arguments绑定,后来传递的值及时不知作用域内依旧可以访问到arguments\

//箭头函数的识别方法

var comp = (a,b) => a+b;

console.log(comp(1,2))

console.log(typeof comp);                //function

console.log(comp instanceof Function);   //true

//在箭头函数里面 this1指向不会因为方法发生变化