---
title: 前端P.10 - Scope
date: 2020-02-20 13:00:00
categories: 前端系列
comments: true
top_img: 
cover: https://i.imgur.com/9tlzw6N.jpg
toc: true
toc_number: 150
copyright: true
hide:
tags: 
    - JavaScript
    - Scope
    - var
    - let
    - const
    - this
    - bind
    - call
    - apply
    - runtime
    - HTML
    - CallBack
    - 嚴格模式
    - Hoisting
    - 汙染變數
    - 閉包
---
# Scope：
接下來我們來看在JavaScripe裡 Scope 問題，JavaScript中Scope 是個必修的問題，在開發中一定會遇到的問題，首先介紹this：
## this：
首先我們回到C系列，今天我要讓我的全域變數snm = 函數傳入的一個數字參數，函數的參數叫做sum，請問我該如何處理？ 答案：使用this。

```
class Program
{
    private int sum = 20;
    private void Main()
    {
        test(10);
    }
    private void test(int sum)
    {
        this.sum = sum;
        Console.WriteLine(this.sum);
    }
}
```
上述可以得知this功能是指定我現在的作用域來源區域，以此Case是代表 Program Class。

在JavaScript中，因為它是由引擎所解釋，在瀏覽器執行環境中，一個分頁內所有JavaScript的操作都是在一個物件內執行，我們稱這個為 window，他是這個分頁的root點，並且所有的JavaScript 的API都是放在這個物件內，根據環境不同在瀏覽器內叫做window，而在NodeJS內稱為global。以下我們假定runtime在瀏覽器。

而JavaScript中，沒有上層物件的話，this 就是指 window，舉例：
```
function tellMeIsInWindow() 
{
    var msg = this == window ?  "Yes" : "No" ;
    console.log("當前作用域是否在Window內 = " + msg);
} 

function showTemp()
{
    console.log("當前this的temp = " + this.temp);
    console.log("當前window的temp = " + window.temp);
}

var temp = 20;
tellMeIsInWindow(); // 會輸出 Yes
showTemp(); // 會輸出20

// -----------開始測試有上層物件的情況----------
console.log("------Start Obj Test------")
var obj = {};
obj.temp = 50;
obj.obj_TellMe = tellMeIsInWindow;
obj.obj_showTemp = showTemp;

obj.obj_TellMe();
obj.obj_showTemp();
```

以上程式碼可以按F12貼在於Console頁面的輸入欄執行，就可以看到結果長這樣：
![](https://i.imgur.com/xbEllv6.png)

所以我們釐清JavaScript的this操作規則：在沒有上層物件內 this == window，而在有上層物件內this == 上層物件，this 是相對的不是絕對的。

## this 操作：
這邊我們用更多的操作來說明this的操作情境：
### 1. 物件的屬性物件的函式：
```
var getName = function() {
    return this.name;
};

var player = {
  name: 'OneJar',
  f: getName,
  pet: {
    name: 'Totoro',
    f: getName,
  }
};

console.log(player.f());      // "OneJar"
console.log(player.pet.f());  // "Totoro"
```
分析：
* 輸出OneJar 因為上層物件是 player，所以輸出對象是player的name
* 輸出Totoro 因為上層物件是 pet ，而player則是他的上上層，所以根據規則應該是輸出 Totoro

### 2. 內部函數：
```
var x = 10;
var obj = {
    x: 20,
    f: function(){
        console.log('Output 1: ', this.x);
        var foo = function(){ console.log('Output 2: ', this.x); }
        foo();
    }
};

obj.f();
```

執行結果：
```
Output 1:  20
Output 2:  10
```

分析：
* 輸出20 因為上層物件是 obj，所以輸出對象是 obj.x
* 輸出10 因為它是由obj的f函數所呼叫，所以他沒有上層物件，這時後就會是window，就是10

### 3. HTML 事件處理：
onclick 裡的 this，指的就是 button 元素本身

```
    <button onclick="console.log(this);">
         Click to Remove Me!
    </button>
```

![](https://i.imgur.com/9Pe05X0.png)

但是如果是
![](https://i.imgur.com/PAcqbUo.png)
執行結果：

```
20
```

其實就是 內部函數 的變形，點下時後執行onclick，onclike又執行temp函數，所以就是內部函數。


### 4. bind方法：

ES5 導入了 Function.prototype.bind，可以為一個函數進行綁定參數，並且無法覆蓋已綁定的物件，只能進行擴充
* bind的第一個參數是綁定該函數的擁有物件(擁有者)。
* bind的第二個參數是綁定該函數的第一個參數。
* bind的第三個參數是綁定該函數的第二個參數。

換句話說，無論新的函數物件怎麼被呼叫，只要函數被bind一次，其函數內的 this 都會是當初綁定的那個擁有者物件。

```
var getFullName = function(lastName) {
    return this.firstName + " " + lastName;
}

var firstName = "One"
var lastName = "Jar";

var introIronMan = getFullName.bind( { firstName: "Tony" } , "Stark" );
var introCaptainAmerica = getFullName.bind( { firstName: "Steven" } , "Rogers" );
var introThanos = introIronMan.bind( { firstName: "IDonT" } , "Know" );

console.log(getFullName(lastName));   // "One Jar"
console.log(introIronMan());          // "Tony Stark"
console.log(introCaptainAmerica());   // "Steven Rogers"
console.log(introThanos());           // "Tony Stark" bind函數只能作用第一次，第二次綁定只是多塞傳入參數
```


### 5. call方法：
ES5 導入了 Function.prototype.call，可以為一個函數進行傳入參數
* call的第一個參數是綁定該函數的擁有物件(擁有者)。
* call的第二個參數是綁定該函數的第一個參數。
* call的第三個參數是綁定該函數的第二個參數。

```
var getFullName = function (lastName) {
    return this.firstName + " " + lastName;
}

var IronMan = { firstName: "Tony" };
var CaptainAmerica = { firstName: "Steven" }

console.log(getFullName.call(IronMan, "Stark"))            // "Tony Stark"
console.log(getFullName.call(CaptainAmerica, "Rogers"))    // "Steven Rogers"
```

### 6. apply方法：
ES5 導入了 Function.prototype.apply，可以為一個函數進行傳入參數
* call的第一個參數是綁定該函數的擁有物件(擁有者)。
* call的第二個陣列參數是綁定該函數的所有參數。

```
var getFullName = function (title, lastName, msg) {
    return title + this.firstName + " " + lastName + " " + msg;
}

var IronMan = { firstName: "Tony" };
var applyAry = ["[Lucas]", "Stark", "I Love You"]
console.log(getFullName.apply(IronMan, applyAry)) // [Lucas]Tony Stark I Love You
```
### 7.CallBack函數：

```
var name = "Hi I am Global";

function sayHi(){
  return this.name;
}

var hero = {
  name: "Hi I am a Hero",
  act: function(cbk){
    return cbk();
  }
};

console.log( sayHi() );           // Hi I am Global
console.log( hero.act(sayHi) );   // Hi I am Global
```
分析：
* 輸出第一次 Hi I am Global 也就是 sayHi() 很明顯沒問題
* 輸出第二次 Hi I am Global 也就是 hero.act(sayHi)，對於cbk作用域的上一層是Hero，但是他又執行了一次cbk，這又是典型的內部函數

## Scope 作用階層：

我們來看默認操作的Scope於JavaScript的影響，一樣這邊先使用C# 進行解說：

```
namespace WindowsFormsApp3
{
    class sum_0 {}
    class sum_1 {}
    class sum_2 {}
    class Program
    {
        private string sum_0;
        private string sum_1 = "";
       
        private void Main()
        {
            test(10);
        }
        private void test(int sum_0)
        {
            Console.WriteLine(sum_0.GetType()); // int
            Console.WriteLine(sum_1.GetType()); // string
            Console.WriteLine(sum_2.GetType()); // 會報錯，因為型別為Class無法GetType
        }
    }
}

```
根據上述Case，我們可以得出當你沒使用this來操作變數 sum，系統會依照這個優先順序來給你數值：

C#： 當前作用域(函數)的sum > 上層作用域(Class Program)的sum > 上上層作用域(namespace)的sum

那麼JavaScript的規則也是如此嗎？

```
function test_1() { console.log(sum) }
function test_2(sum) { console.log(sum) }
function test_3() { console.log(this.sum) }

var obj = {};
obj.demo_1 = test_1;
obj.demo_2 = test_2;
obj.demo_3 = test_3;

obj.sum = 20;
sum = 50;

obj.demo_1(); // 輸出 50
obj.demo_2(9527); // 輸出 9527
obj.demo_3(); // 輸出 20
```

根據上述Case，我們可以得出當你沒使用this來操作變數 sum，系統會依照這個優先順序來給你數值：

JavaScript： 當前作用域(函數)的sum > window 的sum。

![](https://i.imgur.com/86Mvb32.png)
看起來分為兩層，但事實卻是自從ES6後是分為三層，ES6加入let宣告方式，改變了層級定義，新增Block 層級。首先介紹一下層級：

* Global Level Scope -- 國際巨星阿湯哥
* Function Level Scope -- 香港喜劇天王星爺
* Block Level Scope -- 住在隔壁號稱歌神的里長阿伯

以下我們舉個例子：

### 1. 宣告在 Function 內 (使用 var、let)：
```
function myFunc(){
    var n1 = "OneJar";
    console.log("myFunc(): typeof n1=", typeof n1, " value=", n1);
}

myFunc();
console.log("Global: typeof n1=", typeof n1); 
```
執行結果：
```
myFunc(): n1= OneJar
Global: typeof n1= undefined
```
作用域範圍圖：
![](https://i.imgur.com/ND1rLDN.png)
紅色是 n1 宣告的地方，淺藍色部分就是 n1 的 Scope。

* 基本 Function Scope。
* 只有在自己這個 function 內有效，包含 function 內的子 Block。
* 別的 function 不認得。
* 主程式區也不認得。

### 2. 宣告在主程式區 (使用 var)：

```
function myFunc(){
    console.log("myFunc(): n1=", n1);
    console.log("myFunc(): this.n1=", this.n1);
    console.log("myFunc(): window.n1=", window.n1);
}

var n1 = "OneJar";
myFunc();
console.log("Global: n1=", n1);
```
執行結果：
```
myFunc(): n1= OneJar
myFunc(): this.n1= OneJar
myFunc(): window.n1= OneJar
Global: n1= OneJar
```
作用域範圍圖：
![](https://i.imgur.com/IFycsWz.png)
紅色是 n1 宣告的地方，淺藍色部分就是 n1 的 Scope。

* 基本 Global Scope。
* 主程式區內的所有子 Block 和函數都認得。

### 3. 宣告在主程式區 (使用 let)：

```
function myFunc(){
    console.log("myFunc(): n1=", n1);
    console.log("myFunc(): this.n1=", this.n1);
    console.log("myFunc(): window.n1=", window.n1);
}

let n1 = "OneJar";
myFunc();
console.log("Main: n1=", n1);
```
執行結果：
```
myFunc(): n1= OneJar
myFunc(): this.n1= undefined
myFunc(): window.n1= undefined
Main: n1= OneJar
```
作用域範圍圖：
![](https://i.imgur.com/WrW8Ta0.png)

* 在執行時，主程式區因為let存在會被包裝成一個 Function 去執行 (圖中隱藏的 Main())。
* 所以變數 n1 不會成為 Global Scope，而是 Function Scope / Block Scope。

### 4. 賦值給未宣告的變數，會自動產生的全域變數：

```
function myFunc(){
    n1 = "OneJar";  // 自動變成一個 Global 變數
    console.log("myFunc(): n1=", n1);
    console.log("myFunc(): this.n1=", this.n1);
    console.log("myFunc(): window.n1=", window.n1);
}

myFunc();
console.log("Global: n1=", n1);
```
執行結果：
```
myFunc(): n1= OneJar
myFunc(): this.n1= OneJar
myFunc(): window.n1= OneJar
Global: n1= OneJar
```
作用域範圍圖：
![](https://i.imgur.com/mcfB1Ef.png)

* 紫色代表 n1 = "OneJar"，也就是沒有宣告就對 n1 賦值的地方。
* 雖然賦值的地方是在 function 內，但因為沒有先宣告，JavaScript 的行為會自動將 n1 產生為 Global 變數，所以變成 Global Scope。

### 5. Global 和 Function 內同時存在同名變數：

```
function myFunc(){
    var n1 = "Stephen Chow";
    console.log("myFunc(): n1=", n1);
    console.log("myFunc(): this.n1=", this.n1);
    console.log("myFunc(): window.n1=", window.n1);
}

var n1 = "Tom Cruise";
myFunc();
console.log("Global: n1=", n1);
```
執行結果：
```
myFunc(): n1= Stephen Chow
myFunc(): this.n1= Tom Cruise
myFunc(): window.n1= Tom Cruise
Global: n1= Tom Cruise
```
作用域範圍圖：
![](https://i.imgur.com/xO04ZSB.png)

* 紅色是 var n1 = "Tom Cruise"，宣告在主程式區，屬於 Global Scope。
* 綠色是 var n1 = "Stephen Chow"，宣告在主程式區，屬於 Function Scope。
* 淺藍色區域，會生效的是紅色的 n1
* 黃色區域，會生效的是綠色的 n1

### 6. Block 內使用 var 宣告：

```
if(true){
   var x = 2;
   {
        console.log(x); // 2
   }
   console.log(x); // 2
}
console.log(x); // 2
```
執行結果：
```
2
2
2
```
作用域範圍圖：
![](https://i.imgur.com/OtwGCUq.png)


* 傳統 var 不支援 Block Scope。
* 若是宣告在主程式區的 Block，會是 Global Scope (如上圖所示)。
* 若是宣告在函數內的 Block 內 (例如 Block C 內)，會是 Function Scope。

### 7. Block 內使用 let 宣告：

```
if(true){
   let x = 2;
   {
        console.log(x); // 2
   }
   console.log(x); // 2
}
console.log(x); // ReferenceError: x is not defined
```
執行結果：
```
2
2
ReferenceError: x is not defined
```
作用域範圍圖：
![](https://i.imgur.com/f6mZEed.png)

* 使用 let 或 const 宣告變數，支援 Block Scope 效果。
* 變數 x 只會在被宣告的那個 Block 和其子 Block 被認得。

### 嚴格模式：
由上述可以知道JavaScript的語法很寬鬆，容易產生Bug，所以W3C定義了嚴格模式
![](https://i.imgur.com/Ms7yxdK.png)
只要你在主程式或函數的開頭加入  "use strict" 就會開啟嚴格模式。
```
"use strict";
x = 123;            // ReferenceError: x is not defined
console.log(x);
```

```
"use strict";

function f1(){
  return this;
}

console.log( f1() ); // undefined
```

如果是TypeScript可以在tsconfig.json開啟該模式。
![](https://i.imgur.com/15AZcFh.png)

## 變量、函數提升：
![](https://i.imgur.com/E7hxpyY.png)
根據W3C的規範，他們說JavaScript需要變量提升和函數提升。我們來看例子：

```
console.log(x); 
```

執行結果：
```
Uncaught ReferenceError: x is not defined
```

很明顯你使用了沒宣告的變數，當然報錯，這是基本程式語言概念。

```
console.log(x);
var x = "OneJar";
```

執行結果：
```
undefined
```
![](https://i.imgur.com/awSRM6k.png)
![](https://i.imgur.com/Gk58O6O.png)

其實背後的機制是變量提升，當上面寫法被變量提升後，它等同於下面這種寫法：
```
var x;
console.log(x);
x = "OneJar";
```
對於函數也是有提升效果：
```
sayHi();

function sayHi(){
	console.log('Hi');
}
```
執行結果：
```
Hi
```
但是 當你使用let 或是 const(ES6跟let一起加入的宣告方式)，就不具備提升效果，例子如下：
![](https://i.imgur.com/mYoYcYX.png)
```
console.log(x);
let x = "OneJar";
```
執行結果：
```
Uncaught ReferenceError: x is not defined
```
## 汙染變數：
假設今天obj是個模組，對於使用者來說只要使用setMsg 和 showMsg就足夠，但是很明顯 msg 和 getMsg 暴露了，這樣會導致不熟悉模組的人亂操作，就會汙染變數或是函數，讓模組安全性降低。

```
var obj = {};
obj.msg = "null";
obj.setMsg = function (newMsg) {this.msg = newMsg};
obj.getMsg = function () {return this.msg};
obj.showMsg = function () {console.log(this.getMsg())};

// ----------使用者場景----------
obj.setMsg("Lucas");
obj.showMsg();

// ----------汙染行為----------
obj.getMsg = function () { return "Fuck"};
obj.msg = "You";
```

或許會有人說 TypeScript的 private 和 Class 機制可以防止該問題，的確，但還是無法阻擋有心人：
```
class MsgManger
{
    private msg: string = "null";
    private getMsg(): string { return this.msg };

    public setMsg(newMsg): void { this.msg = newMsg };
    public showMsg(): void { console.log(this.getMsg()) };
}

var obj : MsgManger = new MsgManger();
obj.setMsg("Lucas");
obj["msg"] = "Fuck"; // 強制修改方法
obj.showMsg(); // 輸出為 Fuck
```

## 閉包：
針對這問題其中一個解決方法就是閉包
```
function Closure() {
    var msg = "Null";
    function getMsg() { return msg };
    return {
        setMsg: function (newMsg) { msg = newMsg },
        showMsg: function () { console.log(getMsg()) }
    }
}
var obj = Closure()

obj.setMsg("Lucas");
obj.showMsg();

console.log(obj.msg + " test")
```
執行結果：
![](https://i.imgur.com/XQdQcSC.png)

立即執行返回一個對象，主要利用 局部 Scope 和return來實現。

