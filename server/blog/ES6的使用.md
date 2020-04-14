---
title: ES6的使用
date: 2018-05-08 19:15:01
tags:
    - ES
---
# var、let、const
## var 和 let 关键字之间的差异
使用var关键字来声明变量，会出现重复声明导致变量被覆盖却不会报错的问题：
```js
var camper = 'James';
var camper = 'David';
console.log(camper);
// 打印出 'David'
```
与var不同的是，当使用let的时候，同一名字的变量只能被声明一次。
```js
let camper = 'James';
let camper = 'David'; // 报错
```
"use strict"代表着开启了严格模式，用于检测常见的代码错误以及"不安全"的行为，例如：
```js
"use strict";
x = 3.14; // x 没有声明导致了报错
```

## 比较 var 和 let 关键字的作用域
使用var关键字来声明一个变量的时候，这个变量会被声明成全局变量，或是函数内的局部变量。

let关键字的作用类似，但会有一些额外的特性。如果在代码块、语句或表达式中使用关键字let声明变量，这个变量的作用域就被限制在当前的代码块，语句或表达式之中。举个例子：
```js
var numArray = [];
for (var i = 0; i < 3; i++) {
  numArray.push(i);
}
console.log(numArray);
// 返回 [0, 1, 2]
console.log(i);
// 返回 3
```
当使用var关键字的时候，i会被声明成全局变量。当i++执行的时候，它会改变全局变量的值。

如果在for循环中创建了使用i变量的函数，那么在后续调用函数的时候，上面提到的这种行为就会导致问题。这是因为函数存储的值会因为全局变量i的变化而不断的改变。
```js
var printNumTwo;
for (var i = 0; i < 3; i++) {
  if(i === 2){
    printNumTwo = function() {
      return i;
    };
  }
}
console.log(printNumTwo());
// 返回 3
```
printNumTwo()打印了 3 而不是 2。这是因为i发生了改变，并且函数printNumTwo()返回的是全局变量i的值，而不是for循环中创建函数时i的值。let关键字就不会有这种现象：
```js
'use strict';
let printNumTwo;
for (let i = 0; i < 3; i++) {
  if (i === 2) {
    printNumTwo = function() {
      return i;
    };
  }
}
console.log(printNumTwo());
// 返回 2
console.log(i);
// 返回 "没有定义 i 变量"
```
i在全局作用域中没有声明，所以它没有被定义，它的声明只会发生在for循环内。在循环执行的时候，let关键字创建了三个不同的i变量，他们的值分别为 0、1 和 2，所以printNumTwo()返回了正确的值。


## 用 const 关键字声明只读变量
const拥有let的所有优点，所不同的是，通过const声明的变量是**只读**的。这意味着通过const声明的变量只能被赋值一次，而不能被再次赋值。
```js
"use strict"
const FAV_PET = "Cats";
FAV_PET = "Dogs"; // 报错
```
给通过const声明的变量再次赋值会报错。使用const关键字来对所有不打算再次赋值的变量进行声明。避免给一个常量进行额外的再次赋值。
一个最佳实践是对所有常量的命名采用**全大写字母**，并在单词之间使用**下划线**进行分隔。
## 改变一个用 const 声明的数组
如果在后续的代码中修改某个值，那在声明的时候就会用let。
然而，对象（包括数组和函数）在使用const声明的时候依然是可变的。使用const来声明只会保证它的标识不会被重新赋值。
```js
"use strict";
const s = [5, 6, 7];
s = [1, 2, 3]; // 试图给 const 变量赋值，报错
s[2] = 45; // 与用 var 或 let 声明的数组一样，这个操作也会成功
console.log(s); // 返回 [5, 6, 45]
```
从以上代码看出，可以改变[5, 6, 7]自身，所以s变量指向了改变后的数组[5, 6, 45]。和所有数组一样，数组s中的数组元素是可以被改变的，但是因为使用了const关键字，**不能使用赋值操作符将变量标识s指向另外一个数组。**

## 防止对象改变
为了确保数据不被改变，JavaScript 提供了一个函数 **Object.freeze** 来防止数据改变。

当一个对象被冻结的时候，你不能再对它的属性再进行增、删、改的操作。任何试图改变对象的操作都会被阻止，却不会报错。
```js
let obj = {
  name:"FreeCodeCamp",
  review:"Awesome"
};
Object.freeze(obj);
obj.review = "bad"; // obj 对象被冻结了，这个操作会被忽略
obj.newProp = "Test"; // 也会被忽略，不允许数据改变
console.log(obj); 
// { name: "FreeCodeCamp", review:"Awesome"}
```

# 箭头函数
## 简写
```js
FBPosts.filter(function(post) {
      return post.thumbnail !== null && post.shares > 100 && post.likes > 500;
})
```
用箭头函数来写同样的代码：
```js
FBPosts.filter((post) => post.thumbnail !== null && post.shares > 100 && post.likes > 500)
```
## 高价箭头函数
计算数组里**正整数**的平方：
方法一：（使用正则）
```js
const realNumberArray = [4, 5.6, -9.8, 3.14, 42, 6, 8.34];
const squareList = (arr) => {
    "use strict";
    const regex = /^[0-9]*[1-9][0-9]*$/;
    const squaredIntegers = arr.filter((item) => regex.test(item)).map((num) => Math.pow(num,2));
    return squaredIntegers;
};
const squaredIntegers = squareList(realNumberArray);
console.log(squaredIntegers);  //[16, 1764, 36]
```
方法二：
```js
const squareList = (arr) => {
      "use strict";
      const squaredIntegers = arr.filter( (num) => num > 0 && num % parseInt(num) === 0 ).map( (num) => Math.pow(num, 2) );
      return squaredIntegers;
    };
```
# 默认参数
```js
function greeting(name = "Anonymous") {  
    return "Hello " + name;
}
console.log(greeting("John")); // Hello John
console.log(greeting()); // Hello Anonymous
```
```js
const increment = (function() {
    "use strict";
    return function increment(number, value = 1) {
        return number + value;
    };
})();
console.log(increment(5, 2)); // 返回 7
console.log(increment(5)); // 返回 6
```
# rest和spread
## rest 剩余操作符(...)
```js
function howMany(...args) {  
    return "You have passed " + args.length + " arguments.";
}
console.log(howMany(0, 1, 2)); // 输出：You have passed 3 arguments.
console.log(howMany("string", null, [1, 2, 3], { })); // 输出：You have passed 4 arguments.
```
rest操作符可以避免查看args数组的需求，并且允许我们在参数数组上使用map(),fiter()，和reduce()。

```js
const sum = (function() {
    "use strict";
    return function sum(...args) {
        return args.reduce((a, b) => a + b, 0);
    };
})();
console.log(sum(1, 2, 3)); // 6
```
## spread 扩展运算符(...)

下面的 ES5 代码使用了apply()来计算数组的最大值：
```js
var arr = [6, 89, 3, 45];
var maximus = Math.max.apply(null, arr); // 返回 89
```
我们必须使用Math.max.apply(null,arr)，是因为**直接调用Math.max(arr)会返回NaN**。
Math.max()函数需要传入的是一系列由逗号分隔的参数，而不是一个数组。

展开操作符可以提升代码的可读性，这对后续的代码维护是有积极作用的。
```js
const arr = [6, 89, 3, 45];
const maximus = Math.max(...arr); // 返回 89
```
...arr返回了一个“打开”的数组。或者说它展开了数组。

然而，展开操作符只能够在函数的参数中，或者数组之中使用。下面的代码将会报错：
```js
const spreaded = ...arr; // 将会发生语法错误
```

```js
const arr1 = ['JAN', 'FEB', 'MAR', 'APR', 'MAY'];
let arr2;
(function() {
    "use strict";
    arr2 = [...arr1]; // 改变这一行
})();
console.log(arr2);
```
# 解构赋值
## 使用解构赋值从对象中分配变量
解构赋值 就是可以从对象中直接获取对应值的语法。
ES5 的代码：
```js
var voxel = {x: 3.6, y: 7.4, z: 6.54 };
var x = voxel.x; // x = 3.6
var y = voxel.y; // y = 7.4
var z = voxel.z; // z = 6.54
```
使用 ES6 的解构语法可以完成同样的赋值语句：
```js
const { x, y, z } = voxel; // x = 3.6, y = 7.4, z = 6.54
```
如果想将voxel.x,voxel.y,voxel.z的值分别赋给a,b,c，可以用以下这种很棒的方式：
```js
const { x : a, y : b, z : c } = voxel // a = 3.6, b = 7.4, c = 6.54
```
可以理解为：将x地址中的值拷贝到a当中去。

例子：
```js
var basicOjb = {x: 40};
const { x: bigX } = basicOjb;
consle.log(bigX) // ans = 40 
```

使用解构语法去得到输入的str字符串的长度，并将长度赋值给len：
```js
function getLength(str) {
    "use strict";
    const {length:len} = str; 
    return len; 
}
console.log(getLength('FreeCodeCamp'));
```

## 使用解构赋值从嵌套对象中分配变量
可以将嵌套的对象解构到变量中。
```js
const a = {
      start: { x: 5, y: 8 },
      end: { x: 6, y: -9 }
};
const { start : { x: startX, y: startY }} = a;
console.log(startX, startY); // 5, 8
```
在上面的例子里，a.start将值赋给了变量start，start同样也是个对象。

使用解构赋值来得到forecast.tomorrow的max，并将其赋值给maxOfTomorrow：
```js
const LOCAL_FORECAST = {
    today: { min: 72, max: 83 },
    tomorrow: { min: 73.3, max: 84.6 }
};
function getMaxOfTmrw(forecast) {
    "use strict";
    const { tomorrow: { max: maxOfTomorrow }} = forecast; 
    return maxOfTomorrow;
}
console.log(getMaxOfTmrw(LOCAL_FORECAST)); // 84.6
```
## 使用解构赋值从数组中分配变量
在 ES6 里面，解构数组可以如同解构对象一样简单。

与数组解构不同，数组的扩展运算会将数组里的所有内容分解成一个由逗号分隔的列表。所以不能选择哪个元素来给变量赋值。

而对数组进行解构可以做到这一点：
```js
const [a, b] = [1, 2, 3, 4, 5, 6];
console.log(a, b); // 1, 2
```
变量a以及b分别被数组的第一、第二个元素赋值。

可以在数组解构中使用逗号分隔符，来获取任意一个想要的值：
```js
const [a, b,,, c] = [1, 2, 3, 4, 5, 6];
console.log(a, b, c); // 1, 2, 5
```

使用数组解构来交换变量a与b的值。使a、b能分别获得对方的值：
```js
let a = 8, b = 6;
(() => {
    "use strict";
    [b,a] = [a,b];
})();
console.log(a); // 应该等于 6
console.log(b); // 应该等于 8
```
## 使用解构赋值配合 rest 操作符来重新分配数组元素

将剩下的元素放进另一个数组里面。
以下代码的结果与使用Array.prototype.slice()相同：
```js
const [a, b, ...arr] = [1, 2, 3, 4, 5, 7];
console.log(a, b); // 1, 2
console.log(arr); // [3, 4, 5, 7]
```
变量a与b分别获取了数组的前两个元素的值。之后，因为rest操作符的存在，arr获取了原数组剩余的元素的值，并构成了一个新的数组。

rest操作只能对数组列表最后的元素起作用。不能使用rest操作符来截取原数组中间元素的子数组。
```js
const source = [1,2,3,4,5,6,7,8,9,10];
function removeFirstTwo(list) {
    "use strict";
    const [ , , ...arr] = list;   //或const [a, b, ...arr] = list; 
    return arr;
}
const arr = removeFirstTwo(source);
console.log(arr); // [3,4,5,6,7,8,9,10]
console.log(source); //  [1,2,3,4,5,6,7,8,9,10];
```
## 使用解构赋值将对象作为函数的参数传递
在某些情况下，可以在函数的参数里直接解构对象。请看以下代码：
```js
const profileUpdate = (profileData) => {
      const { name, age, nationality, location } = profileData;
  // 对这些变量执行某些操作
}
```
上面的操作解构了传给函数的对象。这样的操作也可以直接在参数里完成：
```js
const profileUpdate = ({ name, age, nationality, location }) => {
  /* 对这些参数执行某些操作 */
}
```
这样的操作去除了多余的代码，使代码更加整洁。

这样做还有个额外的好处：函数不需要再去操作整个对象，而仅仅是操作复制到函数作用域内部的参数。


对half的参数进行解构赋值，使得仅仅将max与min的值传进函数：
```js
const stats = {
    max: 56.78,
    standard_deviation: 4.34,
    median: 34.54,
    mode: 23.87,
    min: -0.75,
    average: 35.85
};
const half = (function() {
    "use strict"; 
    return function half({max, min}) {
        return (max + min) / 2.0;
    };
})();
console.log(stats); // 应该为 object
console.log(half(stats)); // 应该为 28.015
```
简写：
```js
const half = (function() {
      "use strict"; 
      return (({max, min}) => {
            return (max + min) / 2.0;
      });
})();
```
# 使用模板字面量创建字符串

模板字符串是 ES6 的另外一项新的功能。这是一种可以轻松构建复杂字符串的方法。请看以下代码：
```js
const person = {
      name: "Zodiac Hasbro",
      age: 56
};
// string interpolation
const greeting = `Hello, my name is ${person.name}!
I am ${person.age} years old.`;

console.log(greeting); // 打印出
// Hello, my name is Zodiac Hasbro!
// I am 56 years old.
```
这段代码有许多的不同：
首先，上面使用的 **\${variable}** 语法是一个占位符。这样一来，你将不再需要使用+运算符来连接字符串。当需要在字符串里增加变量的时候，你只需要在变量的外面括上${和}，并将其放在字符串里就可以了。
其次，在例子使用了 **反引号（\`）**，而不是引号（'或者"）将字符串括了起来，并且这个字符串可以换行。
这个新的方式使你可以更灵活的创建复杂的字符串。


**示例：**
使用模板字符串的反引号的语法来展示result对象的failure数组内的每个条目。每个条目应该括在带有text-warning类属性的li标签中，并赋值给resultDisplayArray。
```js
const result = {
    success: ["max-length", "no-amd", "prefer-arrow-functions"],
    failure: ["no-var", "var-on-top", "linebreak"],
    skipped: ["id-blacklist", "no-dup-keys"]
};
function makeList(arr) {
    "use strict";
    const resultDisplayArray = [`<li class="text-warning">${arr[0]}</li>`, `<li class="text-warning">${arr[1]}</li>`, `<li class="text-warning">${arr[2]}</li>`] ;
    return resultDisplayArray;
}
const resultDisplayArray = makeList(result.failure);
```
# 使用简单字段编写简洁的对象字面量声明
ES6 添加了一些很棒的功能，以便于更方便地定义对象。
请看以下代码：
```js
const getMousePosition = (x, y) => ({
      x: x,
      y: y
});
```
getMousePosition是一个返回了拥有2个属性的对象的简单函数。

ES6 提供了一个语法糖，消除了类似x: x这种冗余的写法.你可以仅仅只写一次x，解释器会自动将其转换成x: x。

下面是使用这种语法重写的同样的函数：
```js
const getMousePosition = (x, y) => ({ x, y });
```
示例：
```js
const createPerson = (name, age, gender) => {
    "use strict";
    return {
        name,
        age,
        gender
    };
};
console.log(createPerson("Zodiac Hasbro", 56, "male")); // 返回正确的对象
```
# 用 ES6 编写简洁的函数声明

在 ES5 中，在对象中定义一个函数的时候，如下面这般使用function关键字：
```js
const person = {
      name: "Taylor",
      sayHello: function() {
        return `Hello! My name is ${this.name}.`;
      }
};
```
在 ES6 语法的对象中定义函数的时候，可以完全删除function关键字和冒号。看以下例子：
```js
const person = {
      name: "Taylor",
      sayHello() {
        return `Hello! My name is ${this.name}.`;
      }
};
```
示例：
```js
const bicycle = {
    gear: 2,
    setGear(newGear) {
        "use strict";
        this.gear = newGear;
    }
};
bicycle.setGear(3);
console.log(bicycle.gear);
```
# 使用 class 语法定义构造函数
ES6 提供了一个新的创建对象的语法，使用关键字class。

值得注意的是，class只是一个语法糖，它并不像 Java、Python 或者 Ruby 这一类的语言一样，严格履行了面向对象的开发规范。

在 ES5 里面，我们通常会定义一个构造函数，然后使用 new关键字来实例化一个对象：
```js
var SpaceShuttle = function(targetPlanet){
      this.targetPlanet = targetPlanet;
}
var zeus = new SpaceShuttle('Jupiter');
```
class的语法只是简单地替换了构造函数的写法：
```js
class SpaceShuttle {
      constructor(targetPlanet){
        this.targetPlanet = targetPlanet;
      }
}
const zeus = new SpaceShuttle('Jupiter');
```
注意class关键字声明了一个新的函数，并在其中添加了一个会在使用new关键字创建新对象时调用的构造函数。

示例：
```js
function makeClass() {
    "use strict";
    class Vegetable {
        constructor(name) {
            this.name = name;
    }
}
    return Vegetable;
}
const Vegetable = makeClass();
const carrot = new Vegetable('carrot');
console.log(carrot.name); // 'carrot'
```
# 使用 getter 和 setter 来控制对象的访问
可以从对象中获得一个值，也可以给对象的属性赋值。这些通常行为被称为 getters 以及 setters。

Getter 函数的作用是可以让返回一个对象私有变量的值给用户，而不需要直接去访问私有变量。

Setter 函数的作用是可以基于传进的参数来修改对象中私有变量的值。这些修改可以是计算，或者是直接替换之前的值。

```js
class Book {
      constructor(author) {
        this._author = author;
      }
      // getter
      get writer(){
        return this._author;
      }
      // setter
      set writer(updatedAuthor){
        this._author = updatedAuthor;
      }
}
const lol = new Book('anonymous');
console.log(lol.writer);  // anonymous
lol.writer = 'wut';
console.log(lol.writer);  // wut
```
注意我们调用 getter 和 setter 的语法，它们看起来并不像一个函数调用。

Getter 和 Setter 非常重要，因为它们隐藏了内部的实现细节。
```js
function makeClass() {
    "use strict";
    class Thermostat{
        constructor(farenheit) {
            this.farenheit = farenheit;
        }
        get temperature(){
            return 5/9 * (this.farenheit - 32);
        }
        set temperature(celsius) {
            this.farenheit = celsius * 9.0 / 5 + 32;
        }
    }
    return Thermostat;
}
const Thermostat = makeClass();
const thermos = new Thermostat(76); // 使用华氏温度来初始化
let temp = thermos.temperature; // 摄氏温度24.44度
thermos.temperature = 26;
temp = thermos.temperature; // 摄氏温度26度
```
# import、export
## 了解 import 和 require 之间的差异
过去使用require()函数来从外部文件或模块中引入函数或者代码，会遇到一个问题：有些文件或者模块会特别大，但却往往只需要引入其中的一些核心代码。

ES6 的import 能够从外部的文件或者模块中选择我们需要的部分进行引入，从而节约载入的时间和内存空间。

下面的例子：想象math_array_functions拥有大概20个函数，但是我只需要countItems这一个函数在我当前的文件里。使用老的require()方式会强制我引入所有20个函数。而使用新的import语法，我可以只引入需要的那个函数：
```js
import { countItems } from "math_array_functions"
```

下面是对于上面代码的语义描述：
```js
import { function } from "file_path_goes_here"
// 我们还可以用同样的方式来引入变量！
```
对import的使用，有许多的写法，但是上面的例子是最常用的写法。

注意：**在大括号里的函数名的两侧加上空格**是一个最佳实践——这可以帮助我们轻松的阅读import语句。

注意：在许多的例子中，**在文件的路径前会加上 ./** ；否则， node.js 会先尝试去node_modules目录中寻找依赖项。
```js
"use strict";
import { capitalizeString } from "string_functions";
capitalizeString("hello!");
```
## 用 export 来重用代码块
当我们想要一些代码——函数或者变量——在其他文件中使用，export将它们导出来供其他文件导入。

下面的例子阐述了如何进行一个命名导出。
```js
const capitalizeString = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
}
export { capitalizeString } //如何导出函数。
export const foo = "bar"; //如何导出变量。
```
将所有的export语句打包成一行：
```js
const capitalizeString = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const foo = "bar";
export { capitalizeString, foo }
```
例子：
```js
"use strict";
export const foo = "bar";
export const bar = "foo";
```
## 用 * 从文件中导入所有内容
用import语法从文件中导入所有的内容。
下面是一个从同目录下的"math_functions"文件中导入所有内容的例子：
```js
import * as myMathModule from "math_functions";
myMathModule.add(2,3);
myMathModule.subtract(5,3);
```
让我们来分析一下这段代码：
```js
import * as object_with_name_of_your_choice from "file_path_goes_here"
object_with_name_of_your_choice.imported_function
```
可以在import * as之后添加任意的名称。这个方法接收到的值是一个对象，可以使用点表示法来获取对象里具体的值。

```js
"use strict";
import * as str from "capitalize_strings";
```

## 用 export default 创建一个默认导出
另外一种被称为默认导出的export的语法。通常在文件中只有一个值需要导出的时候使用。它也常常用于给文件或者模块创建返回值。
下面是一个简单的export default例子：
```js
export default function add(x,y) {
  return x + y;
}
```
注意：当使用export default去声明一个文件或者模块的返回值，在每个文件或者模块中应当只默认导出一个值。
特别地，你能将export deafult与var，let与const一起使用。

## 导入一个默认的导出
例子：
```js
import add from "math_functions";
add(5,4); //将会返回 9
```
这个语法只有一处不同的地方 —— 被导入的add值，并没有被花括号{}所包围。与导出值的方法不同，导入默认导出的写法仅仅只是简单的讲变量名写在import之后。
