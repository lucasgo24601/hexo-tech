---
title: 前端P.05 - TypeScript
date: 
categories: 前端系列
comments: true
top_img: 
cover: https://i.imgur.com/wj7kiui.png
toc: true
toc_number: 150
copyright: true
hide:
tags: 
    - JavaScript
    - TypeScript
    - 弱型別
    - 強型別
    - tsconfig.json
    - tsc
    - CodeStyle
    - 抽象檔案.d.ts
    - VSCode
---
承接P.03，JavaScript的其中一個缺陷由TypeScript去彌補。
# TypeScript：
首先沒有瀏覽器能夠識別TypeScript語言，這很重要的概念所以必須先提出來。
TypeScript這是一種JavaScript的嚴格超集語言，為的就是要解決弱型別的問題，他新增了強型別功能，你可以在宣告變數時候新增強型別寫法：

```
var temp:number = 20; // 賦予型別
temp = "hello" // 因為型別不對，會失敗
```

以上就是TypeScript的寫法，可以透過TypeScript編譯器把這段轉換成JavaScript，之後在丟給瀏覽器識別，而今天這Case編譯器會發現你型別錯誤，所以會報錯讓你知道你犯了弱型別的問題。
TypeScript就是由此來解決弱型別的問題，但是TypeScript是JavaScript的超集，所以你可以用純JavaScript的方式開發，像是以下寫法：

```
var temp = 20;
temp = "hello" 
```

你寫這段程式碼把他丟給TypeScript編譯器，編譯器不會抱錯，因為TypeScript是JavaScipt的超集，任何的JavaScript程式碼，在TypeScript都是合法的語言。

## 編譯器：
TypeScipt編譯器，以下簡稱為tsc，所以由上述可以知道，tsc是構成TypeScript的關鍵核心，今天就算我寫了符合TypeScript的語法，但是沒編譯器幫助還是沒有瀏覽器能看懂，所以我們來介紹編譯器。
首先呢tsc是開源的，微軟tsc GitHub：https://github.com/Microsoft/TypeScript
而根據TypeScript官網的使用說明，我們可以知道tsc會吃一個配置文件，這個文件叫做tsconfig.json。這個配置文件紀載了很多編譯條件，我們可以透過新增一些編譯條件來控管編譯嚴格程度，以此達到控管CodeStyle。

而基本tsconfig.json大概長這樣：
```
{
    "compilerOptions": {
        "target": "es5",
        "outDir": "bin-debug",
        "removeComments": true,
        "experimentalDecorators": true,
        "lib": [
            "es5",
            "dom",
            "es2015.iterable",
            "es2015.promise"
        ],
        "types": []
    },
    "include": [
        "src",
        "libs"
    ]
}
```

target：編譯出來的JavaScript是什麼版本(版本問題後續會講，這是個大坑)
outDir：編譯出來的JavaScript檔案要放在哪個資料夾
lib：撰寫的TypeScript使用了什麼JavaScript API(後續會講)
include：我要編譯的TypeScript檔案有哪些(資料夾或是指定XXXX.ts都可以)

首先呢compilerOptions裡面可以新增一些編譯條件，來控管CodeStyle，這邊舉例一些好用的編譯條件，其他有什麼編譯條件可以參考：https://www.typescriptlang.org/docs/handbook/compiler-options.html

```
    "strictNullChecks": true, // 啟用嚴格的 null 檢查
    "noUnusedLocals": true, // 有未使用的變量時，拋出錯誤
    "noUnusedParameters": true, // 有未使用的參數時，拋出錯誤
    "noImplicitReturns": true // 並不是所有函數里的代碼都有返回值時，拋出錯誤
```

以上，就是呼叫tsc時候可以加選的項目。 至於如何使用tsc請參考後面的教學「如何使用工具」篇

# 版本問題：
由於ECMAScript一直改版，每次改版就會有新的API或是新的語法，但是開發瀏覽器JavaScript引擎的四大廠商：Edge(微軟)、Chrome(Google)、FireFox(Mozilla)、Safari(蘋果)。他們卻未能馬上更新，畢竟頻繁改版會造成穩定性和安全性的隱患。所以就算現在出到ES10，但也沒有任何一個瀏覽器能支援到ES10的版本。

更何況不是每個人都會更新，像是現在還有人用IE，根據使用者習慣不同，有些人使用的瀏覽器還不是上述四大廠商，像是中國就有很多瀏覽器：
![](https://i.imgur.com/V8rQkVB.png)
這就會導致今天我撰寫的JavaScript版本是ES6，但是你用的瀏覽器太舊了，無法識別ES6的語法或是API就無法執行，各瀏覽器能支援的版本請參考以下網站：
![](https://i.imgur.com/IUo43r1.png)

https://kangax.github.io/compat-table/es6/
https://caniuse.com/

# 如何使用JavaScript的API：

這邊的JavaScriptAPI不只是官方API，還包含了其他人寫的JavaScript的函示庫。
因為JavaScript橫行了很多年，很多人為了他寫了一些知名的API，最近幾年TypeScript才開始問世，然而從JavaScript轉換成純TypeScript是有段陣痛期的。所以很多人還是不願意使用TypeScript方式開發，畢竟只要你有良好CodeStyle，就不會犯了JavaScript的缺陷了。
但是對於我們TypeScript開發者來說不是很友善，因為一些知名大老寫的庫都是JavaScript，如果我直接呼叫會發生什麼情況：

```
大老用JavaScript寫的程式碼，檔案名稱叫做 大老.js：
function SayHello(msg) { console.log(msg) return msg + "你好"};
```

```
我自己在TypeScript寫的程式碼，檔案名稱叫做 Lucas.ts：
var Response:string = SayHello("Lucas");
```

這樣我直接把自己的TypeScript程式碼送去tsc處理，就會報錯說：找不到SayHello函數。
為什麼會發生這問題？因為tsc只負責編譯ts檔案，而你使用的API根本沒有導入到ts文件裡面，所以他才找不到，那怎麼解決呢？

1. 把大佬的JavaScript移植到TypeScript裡面，是其中一個方法，但是這樣就代表你要改寫大老的程式碼，你要如何確認這個型態是什麼？修改後有可能不會有Bug？
2. 那我根據TypeScript是JavaScript的超集這關係，我直接把大老的純JavaScript 貼在TypeScript內也不會有問題吧，的確不會有問題，但是純JavaScript沒有型別提示，你最後必定是用any型態去接大老回傳的東西，這不就違背了初心了嗎，當初你選擇TypeScript就是為了不要寫出弱型態的缺陷問題，但是今天你還是用弱型別方式去接收大老的資料，莫忘初心!!!。

那麼我該如何處理？
你應該使用最TypeScript的方式去處理這問題，你必須推測這個JavaScript的函數會回傳什麼資料型別，然後自己寫一個interface去建立一個於TypeScript抽象未實做的同名函數，而這種檔案通常都會跟源JS取名差不多，假設源JS叫做 大老.js ，你要寫一個抽象函數 那這隻抽象TypeScript檔案就必須叫做 大老.d.ts。所以以後看到.d.ts類型的檔案就知道，這些interface適用於處理TypeScript與JavaScipt溝通的橋樑。

![](https://i.imgur.com/yShkQoS.png)

使用程式語言的抽象概念，騙過我們的tsc編譯器。抽象概念不是由TypeScript研發出來的，只要是強型別語言都會有抽象語法，所以不懂的人請自行google。

# 開發工具：
有些人畫圖喜歡用小畫家，有些人喜歡用Photoshop，兩者都能夠畫圖，只是效率問題。而根據上述的Case，你必須寫好TS程式碼後送去tsc處理才能知道自己有沒有寫錯，這不是很笨嗎，如果我能夠在寫的瞬間就知道這寫法是錯誤的不就聰明點，像是圖中範例：
![](https://i.imgur.com/3AHouYT.png)
於是就微軟公司開發了 VSCode 工具。
![](https://i.imgur.com/bWhKNgu.png)

VSCode，也是一種程式開發工具，他整合了很多功能、開放擴充工具等等。由於是微軟開發的工具，對微軟自家的程式語言TypeScript具有非常友善的特性，特性之一你能夠在撰寫的瞬間就知道這寫法是否有問題，你可以當作VSCode裡面有套tsc，能夠隨時檢查你的語法，不至於寫完後丟給tsc才知道自己寫錯了。

那麼我安裝了VSCode就不用下載tsc了，因為VSCode裡面就有內建tsc隨時檢查我的語法？答案：No。首先JavaScript一直改版，就會導致TypeScript也跟著改版，更何況誰說TypeScript編譯器不會有Bug，所以你無法直接使用VSCode裡面的編譯器(嚴格說他也沒有編譯器在裡面。)，誰知道你在2010安裝後就一直沒有更新VSCode。所以你還是必須下載最新版本的tsc，更何況還有以下問題。

假設今天我是用了JavaScript ES5官方API，根據「如何使用JavaScript的API」可以知道，我之所以能夠呼叫是因為有.d.ts的存在，對於官方API也是如此，對於tsc來說.d.ts放置於 https://github.com/microsoft/TypeScript/tree/master/lib

而對於VSCode來說，為了要實現即時報錯的功能，所以必須自己也有一份.d.ts。
其位置：C:\Users\使用者\AppData\Local\Programs\Microsoft VS Code\resources\app\extensions\node_modules\typescript\lib
![](https://i.imgur.com/cupwbKJ.png)

以此為標準進行檢查你當前輸入的東西和.d.ts是否相符合，不符合就進行紅字警告。但是我們去造訪此資料夾可以發現，裡面最高版本的.d.ts是2017，也就是俗稱的ES 8。而tsc裡面已經支援到es2020了，很明顯VSCode的即時報錯功能在es8以上會失效，所以要處理這問題的話，我就必須把tsc的lib和VSCode的lib進行同步或是重新安裝最新版VSCode。

###### 當然失效的就只是VSCode的即時報錯，但對於tsc來說這東西還是合法的，不會有問題，還是可以順利轉換成JavaScript
###### 我安裝VSCode的時間很久了，這是在好幾年前安裝的必定不會有ES2020這鬼東西，而且我也沒主動去重新更新。