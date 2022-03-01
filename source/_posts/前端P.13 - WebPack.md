---
title: 前端P.13 - WebPack
date: 
categories: 前端系列
comments: true
top_img: 
cover: https://i.imgur.com/NZmWawh.png
toc: true
toc_number: 150
copyright: true
hide:
tags: 
    - NodeJS
    - npm
    - packeage.json
    - TypeScript
    - Bable
    - Uglify
    - WebPack
---
# WebPack：
此處提供一些非常好用的工具，WebPack就是其中一個，他是前端自動化開發使用的工具。
對於早期的前端(NodeJS以前)來說，瀏覽器就只能單純識別3大元素(CSS、HTML、JavaScript)，但是NodeJS打破這規則，現在的前端使用了很多工具像是上述的範例，但是前端工具是新的技術，這些工具很多都是基於NodeJS的根本無法作業在瀏覽器，所以對瀏覽器是無法直接識別，那我如果要呼叫難道要

```
執行tsc
執行bable
執行gulp
執行....
```
明顯很愚蠢，每次我編譯一次看結果，都要輸入好幾行指令來產生，所以有了WebPack負責把這些東西自動轉換成瀏覽器能夠識別的產物，並且還能夠打包一起。
其次現在前端使用了很多庫，就像是jQuery一樣，使用別人的函數庫能夠減少自己德開發時間，所以有時候你可能引入了10幾個函數庫，每個函數庫都是一個JS檔案。
```
<script src="jQuery"> </script>
<script src="物理庫"> </script>
<script src="Tween"> </script>
<script src="特效庫"> </script>
<script src="廣告庫"> </script>
<script src="Index.js"> </script>
....etc

```
這樣會有一個問題，script標籤進行下載的會是非同步的操作，假設index.js使用到了jQuery，但是非同步關係，index.js下載好後發現找不到jQuery，於是就抱錯了，因為jQuery檔案比較大還在下載中。所以WebPack還能打包再一起，保證不會發生以上問題。
所以可以知道WebPAck主要功能就是幫你處理以上兩個問題，所以此處我們開始介紹怎麼使用WebPack解決該問題。

## TypeScript轉JavaScript：
首先我們主程式的入口叫做Main，而Main使用了display這個庫，詳細引用關係如下：

Main.ts：
```
import displayObj from "./display"; // 引入了display.ts，之後創立一個變數"displayObj"存取他。
import {titel} from "./display"; // 引入display.ts的titel變數，並且是直接調用，不用創立變數儲存。

var temp: number = 20;
var msg: string = "Heldlo";
displayObj.showMsg(msg + temp); // 透過變數displayObj呼叫 display.ts 導出的showMsg函數
displayObj.test();

```

display.ts：
```
var titel: String = "[display.ts] "; 

// 創立一個只能儲存函數的變數叫做showMsg
// 該變數存儲的是由ES6的箭頭函數語法所創立的函數
// 該函數需要傳入一個string的參數，該參數在函數裡名稱為 msg
var showMsg:Function = (msg: string) => {  
    console.warn(titel + msg);
    console.log(titel + msg);
}

const aa:Array<string>  = ["a", "b", "c"]; // 創立一個字串陣列
// 創立一個只能儲存函數的變數叫做test
// 該變數存儲的是由ES6的箭頭函數語法所創立的函數
// 該函數不需要傳入任何參數
// 該函數的實作內容是由ES5的Array的Map函數所構成
// Array Map的函數時做內容是 把這個Array每個items 顯示出來。
var test:Function = () => aa.map(function (obj) { console.log(obj) })

// 有什麼函數或是變數是可以給別人使用的，此處就將它塞入導出的列表內
// default 代表導出後，導入的使用者必須用一個變數儲存，之後透過該變數去操作導出的成員
export default { 
    showMsg, // 導出showMsg變數
    test
}

// 未使用 default導出，導入的使用者無須創立變數去儲存，如要使用就必須取同名參數，代表直接讀取
export {titel,aa};
```

首先呢，這是一份ts檔案，沒有人能認得，所以參考 如何使用工具，進行以下前置動作把TS轉成JS檔案：
1. 創立資料夾，隨便取但不能中文：
2. 使用Cammand Line 輸入 npm init -y：
3. 創立子資料夾名為src，把Main.ts和display.ts 丟到該資料夾
4. 使用Cammand Line 輸入 npm i -g typescript：
![](https://i.imgur.com/0TFr78g.png)

5. 使用Cammand Line 輸入 tsc --init：
6. 修改tsconfig.json內容：
![](https://i.imgur.com/pXf8bL7.png)

7. 使用Cammand Line 輸入 tsc 進行編譯：
![](https://i.imgur.com/UMZS5O8.png)

###### 此處把tsc安裝成全域的，然後直接透過工具的呼叫方法來執行，所以可以不用寫 npm run 之類的內容，要寫也是可以只是我懶。

## WebPack的合併使用：
上述操作完成後會有個資料夾叫做bin-debug，裡面就是TS轉成JS的檔案，而現在我們要把它們整合，就必須使用WebPack。
首先根據官方網站說明必須要有個檔案叫做webpack.config.js，其檔案裡面應該要寫這些配置。
![](https://i.imgur.com/JWCuKDd.png)
這些配置主要就是敘述：程式的入口是entry，進行合併後把檔案放到path(如果沒有預先創資料夾會自動創)，之後把合併檔案取名為 filename。
所以首先我們要修改entry，將它改成

```
entry: './bin-debug/Main.js',

```

之後filename通常建議改為跟原檔案同名+bundle，也就是

```
filename: 'Main.bundle.js'
```

這些配置輸入完成後，我們就可以新增任務在package.json

```
"build" : webpack
```

只要輸入npm run build就可以執行了，WebPack就會自動判斷Main.js系列文件到底用了什麼檔案，都會自動打包成一個JS。

## Loader：
而在上述Case在使用之前還要自己打tsc進行轉換，這不是很麻煩嗎，所以WebPack第二個功能是能夠整合工具進入流程，而這邊用兩個工具來模擬前端現在開發的數個工具。

### TypeScript Loader：

要將tsc加入WebPack的話你需要下載一個工具，叫做ts-loader，可以參考該工具的GitHub說明：https://github.com/TypeStrong/ts-loader
在官網中敘述了，如果要將ts-loader加入WebPack，必須加入這些Webpack.Config設定。
![](https://i.imgur.com/dEC2ffN.png)
設定完還必須要加入tsconfig.json 還必須要加入sourceMap 選項
![](https://i.imgur.com/aAuSJrq.png)

這些都完成後你的WebPack.Config應該長這樣：
![](https://i.imgur.com/D4T3jC5.png)

### Babel Loader：
上面的教學講了很多Babel的用途和好處，所以Babel也算是必要的工具，可以參考該工具的GitHub說明：https://github.com/babel/babel-loader
首先是要下載很多工具。

```
npm install -D babel-loader @babel/core @babel/preset-env webpack
```

之後如果要將這個工具加入WebPack，必須加入這些WebPack.Config設定。
![](https://i.imgur.com/8eVev4o.png)
而如果你要設定Babel的選項的話，你可以採用這種加入方式。
![](https://i.imgur.com/TNOAG58.png)
那今天我們要Babael將 箭頭函數 轉換成標準化的函數，可以從 options 點進去看說明。
![](https://i.imgur.com/jBMBR9j.png)
所以我們Babel Loader 的WebPack.Config設定應該是長這樣：
![](https://i.imgur.com/Uuw0r5A.png)

## Plugin：
上述是一種WebPack引入工具的方式，加入Loader，但是WebPack的強大不是沒有原因，因為他本身就內建很熱門的工具，而要使用內建的話就要用Plugin方式呼叫。
首先有什麼很夯的工具被WebPack整合過呢？請參考WebPack官網：https://webpack.js.org/plugins
那今天我們用另外一個工具來示範，就是另一個好用的Uglifyjs工具。
![](https://i.imgur.com/UYihfKW.png)
根據官方網站說明，你應該要下載該工具：
```
npm install uglifyjs-webpack-plugin --save-dev
```
之後WebPack必須加入這些配置：
```
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
};
```
而該工具也有選項可以開啟，詳細可以去官網看或是中文翻譯的文檔： https://github.com/LiPinghai/UglifyJSDocCN
![](https://i.imgur.com/5fTFEEb.png)

![](https://i.imgur.com/0YeOcLH.png)

而今天我們使用 compress 的 pure_funcs，該功能很好用，能夠幫你把某一個函數剃除，像是我正式版本我不需要console.log，所以我可以利用該功能把console.log進行剔除，或是把我自己的測試函數剃除。
選定功能後我們可以在WebPack的官網查到，如何使用該選項

![](https://i.imgur.com/TbQlxLr.png)

所以我們 Uglifyjs Plugin 的WebPack.Config設定應該長這樣：
![](https://i.imgur.com/K9FUsDh.png)

而總和上述三個工具的WebPack設定應該長這樣：
![](https://i.imgur.com/mr4UOhR.png)

之後我們執行webpack的任務就可以一條龍的處理這三個工具。