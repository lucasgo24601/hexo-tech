---
title: 前端P.11 - 模組
date: 
categories: 前端系列
comments: true
top_img:
cover: https://i.imgur.com/k6MPEOu.gif
toc: true
toc_number: 150
copyright: true
hide:
tags: 
    - ES6
    - ES5
    - JavaScript
    - ServerJS
    - CommonJS
    - NodeJS
    - AMD
    - RequireJS
    - CMD
    - seaJS
    - runtime
    - 靜態優化
    - require
    - exports
    - import
    - export
---
# 模組：
在污染變數那一章中，我們提到使用別人的模組亂操作的下場，所以應該使用閉包來避免讓別人亂操作，但是模組這東西在JavaScript又是個災難。
因為在ES6之前還沒有模組化標準給大家用，在ES6之前都是如果你include兩份JS模組：

第一份為SayHello模組宣告了 temp 在window這個作用域上
第二份為SayHell 模組宣告了 temp 在window這個作用域上

根據上述作用域問題我們知道需叫 temp.Say();，原本預計會是Hello，但是你不知道第二份模組物件名稱衝突了，於是變成Hell。
所以呢在ES6之前熱心的JavaScript社群們提出一些模組化加載方案，主要可以分為兩派：CommonJS  和 AMD 流派，而ES6之後推出官方標準，所以我們當前JavaScript在加載模組時候有三種標準(1個官方、兩個野雞自幹派)，但是ES6是後來官方才推出的標準所以實現了完全取代CommonJS 和 AMD流派，並且ES6官方設計能夠達到靜態優化。

## 模組化的歷史：
大概在2009年當時有個社群叫做CommonJS，該社群有很多大佬，這群大佬推出了 ServerJS 的規範，用於處理模塊加載，這個規範在NodeJS上實踐了並且效果不錯，於是這群大佬又推出了新版本，並且要讓這規範能夠支援瀏覽器，所以把 ServerJS 改名為 CommonJS ，這次新版本不是那麼順利，內部爭議不斷於是分歧就產生了。

分歧產生了 Modules/Async 流派，這個流派提議，當前瀏覽器特徵不應該直接使用這個規範，並提出自己的規範，但是該規範被受社群內部爭議，於是這個流派被CommonJS社群獨立出去了，該流派的人把規範取名為同名AMD並且自創了一個社群同名AMD社群，就是第二個流派的規範，他們的runtime 是 RequireJS，當然這其中還有一些爭議，像是CommonJS說你不能在說明文檔打著CommonJS的名號或標誌。

分歧產生了 Modules/2.0 流派，這個流派跟AMD那夥人差不多但是應該盡可能與舊版規範保持一致。所以該派也獨立了，成立CMD規範，但很可惜當時 RequireJS 非常火，被打敗了。其中作者把GitHub和官網清空，只留下一句話「我會回來的，帶著更好的東西」，就此消失。這句話給一個工程師有很大的影響，於是那個人將CMD實做在seaJS。

上述歷史中總共有三個野雞流派，但是只有一人生存至今，CommonJS負責Sever的NodeJS部分，而後續官方推出的ES6模塊標準則負責瀏覽器端。故以下我們用這兩者進行比對和範例。

## 靜態優化：
首先CommonJS 和 AMD 在加載模組時候都只能在運行時才能確定這些東西，舉個範例：

```
let { stat, exists, readFile } = require('./fs');

// 等同於以下操作
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;
```
這種加載方式會有個問題，只有運行到時候才能得到這個物件，導致沒辦法在編譯階段進行優化，簡稱無法進行靜態優化。
那麼ES6官方版的模組化加載方案是如何做到：

```
這是ES6官方版本的模塊加載方案：
import { stat, exists, readFile } from 'fs';
```

上面的程式碼是直接去fs模組加載這三個函數，而其他沒指定的函數就不會進行加載，這種方式可以實現在編譯時後就進行編譯，就導致模組加載的效率會比CommonJS快，因為不是執行到那行時候才加載。

## CommonJS：
該規範主要運用於服務器端，也就是NodeJS，他新增了一個函數叫做：「require」 以及 「exports」這個物件，對應了導入和導出功能。

```
// Math.js
exports.add = function(a,b) {return a + b};
```

```
// Main.js
var MathObj = require('./Math');
console.log(MathObj.add(2,3));
```

而以上就是CommonJS這個規範所制定的模組加載部分，而規範就是規範，還是要有人實做，於是NodeJS跳出來說我將實現這個規範，於是我們可以在NodeJS這個runtime實現該規範的加載方案。
而在模組部分，CommonJS 輸出的是一個值的拷貝，並且是運行時加載。

### 快取緩存值的問題：

```
// lib.js
var counter = 3;
function incCounter() { counter++; }
module.exports = {
  counter: counter,
  incCounter: incCounter,
};
```

```
var mod = require('./lib');

console.log(mod.counter);  // 3
mod.incCounter();
console.log(mod.counter); // 3
```

理論上應該要是被累加輸出成4，但是因為他是拷貝，mod.counter在一開始require時後就被快取緩存下來了，所以不受到內部影響，因為這邊是獲取緩存的結果，這是因為這是個值而不是函數，所以被快取下來。

```
// lib.js
var counter = 3;
function incCounter() { counter++; }
module.exports = {
  get counter() { return counter },
  incCounter: incCounter,
};
```
我們將 mod.counter 對外導出，並且是個存取子是個函數，無法被快取，就可以獲得正確被累加的結果。

### CommonJS如何實現在瀏覽器端？
由上述歷史和例子我們可以知道，今天如果你專案採用CommonJS來加載模組，那麼你的runtime不就只能在NodeJS嗎？ 瀏覽器只認得ES標準，誰會處理CommonJS這個野雞派的規範，於是有人利用NodeJS開發一個工具叫做 Babel 同名於 聖經中的巴別塔，其用法後續會介紹。

利用Babel 可以把CommonJS的模塊加載改成瀏覽器認得的 ES6模塊加載規則，而Babel 功能不只如此，不然怎麼敢跟巴別塔同名的膽子，他還可以把高版本的ES轉成低版本的ES，也就是我不用管瀏覽器支援哪個版本，我一慮用ES10爽爽寫，Babel 會幫我翻譯成瀏覽器能認得的ES版本。

## ES6模組標準：
該規範主要運用於瀏覽器端，他新增了兩個函數叫做：「import」 以及 「export」，對應了導入和導出功能。

### export：

```
// profile.js
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;
export function sayHello() { console.log("hello")}
```

以上寫法等價於下方寫法：

```
// profile.js
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;
function sayHello() { console.log("hello") }

export { firstName, lastName, year, sayHello };
```

以上寫法等價於下方寫法：

```
// profile.js
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;
function sayHello() { console.log("hello") }

export {
    firstName as FName,
    lastName as LName,
    year as Year,
    sayHello as LogHello
};
```

第四種 export default 寫法：

```
// profile.js
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;
function sayHello() { console.log("hello") }
export default {
    firstName,
    lastName,
    year,
    sayHello
}
```

以上就是export 的寫法，而ES6 export 不像是 CommonJS 的 exports 會有快取緩存問題
```
export var foo = 'bar';
setTimeout(() => foo = 'baz', 500);  // 該行功能是一開始是bar 經過0.5 秒後會真的變成baz
```

### import：

```
// main.js 對應於第一、二、三種export方法
import { firstName, lastName, year , sayHello} from './profile.js';
sayHello();
```

其中import的變數名稱必須跟export一模一樣，如果只想導入其中一個並且想改名可以使用以下方法：

```
// main.js 對應於第一、二、三種export方法
import { sayHello as sayMyName} from './profile.js';
sayMyName();
```

而如果想import所有項目的話可以使用以下方法：

```
// main.js
import * as Obj_profile from './profile';
Obj_profile.sayHello();
```

而第四種export 方式 可以使用以下import 方式使用：

```
// main.js
import Obj_profile from "./profile"; // 引入了profile.js
Obj_profile.sayHello();
```

### ES6模組標準如何實現在NodeJS？
NodeJS改版後也開始支援ES6模塊語法，但是原本NodeJS就有自己的模塊標準 CommonJS ，現在還要相容另一種 ES6模塊標準，所以NodeJS要求

在package.json 未開啟type或 type為commonjs的情況，採用ES6標準模組的檔案必須命名為 .mjs ，並且會自動開啟嚴格模式。
在package.json 未開啟type或 type為commonjs的情況，採用CommonJS的檔案必須命名為 .js。

在package.json 開啟type為module的情況，採用ES6標準模組的檔案必須命名為 .js。
在package.json 開啟type為module的情況，採用CommonJS的檔案必須命名為 .cjs。

這樣NodeJS就會採取不同的模組標準去解釋該文件，而 commonjs 和 ES6混用 為不推薦做法，因為兩者在靜態優化的差異，可能會有BUG