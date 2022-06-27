---
title: 前端P.14 - 單元測試Mocha
date: 2020-02-24 13:00:00
categories: 前端系列
comments: true
top_img: 
cover: https://i.imgur.com/J5cmkgz.png
type: post
toc: true
toc_number: 150
copyright: true
hide:
tags: 
    - NodeJS
    - npm
    - packeage.json
    - Mocha
    - 單元測試
    - CI/CD
    - CI
    - WebPack
---
# 單元測試（Unit Test）：
就是以程式中最小的邏輯單元寫測試程式，來驗證邏輯是否正確。一般來說，程式中最小的邏輯單元是函式(function)，或方法(method)。

# 為什麼要做 Unit Test？
* 今天流程是： 拿杯子 -> 裝熱水 -> 拿熱水壺 -> 倒入水杯，如果因為修改了拿杯子這個函數，導致後面三個函數都執行失敗，於是你從倒入水杯往回追，浪費一堆時間。所以為了避免Bug的連動性，盡早知道是 拿杯子 這個單元錯誤。
* 更快速指出問題點、並顯示正確的是什麼，減少Code Review時間。
* 先搞懂自己的code要做什麼。然後再讓它完成任務。
* 先寫測試強迫你寫code前先做規劃

# Mocha：
以上就是單元測試的說明，那麼我來回顧，首先我們知道怎麼運用WebPack將我們的程式打包再一起，但是沒有進行單元測試，所以只能靠電腦Run Porces時才知道有問題，知道問題後CodeReview一段時間才知道，哪個函數錯誤、應該要出現的結果等等，明顯浪費了一些時間。

Mocha就是一款基於NodeJS開發的工具，主要功能就是實現單源測，你可以輸入
```
npm init -y 
npm i -d mocha
```

進行下載並安裝，然後於package.json的任務加入以下實作內容：
```
{
  "name": "Demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "mocha 'test/**/test-*.js'"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "mocha": "^7.0.0"
  }
}
```

這邊完成後我們來布置環境，首先找出你的源碼：

MathObj.js丟入根目錄的src資料夾內：
```
function add(a, b) {
    return a + b;
}

exports.add = add;
```

然後我們開始撰寫測試碼：

test-MathObj.js丟入根目錄的test資料夾內：
```
const MathObj = require('./../src/MathObj');

describe('測試add函數', () => {
    it('測試5+5預期10', () => { if (MathObj.add(5, 5) !== 10) throw new Error("兩數相加結果不為兩數和"); })
    it("測試-2+2預期0", () => {
        var t = -2;
        var g = 2;
        if (MathObj.add(t, g) !== t + g)
            throw new Error("Not eq zero")
    })
});
```

describe描述狀態或圈出特定區塊，解釋測試的功能，就是解釋用的。
it是一個測試項目，必須於裡面丟出 error或是例外才能知道是否成功，否則當執行到函數壽命結束都算是成功。

以上就是簡單的測試範例，之後輸入指令
```
npm start
```
就可以順利執行獲得結果。
![](https://i.imgur.com/XSKnjvT.png)

# 導入WebPack：
上面的功能能夠讓你進行測試，但是如果能導入CI/CD就更好，更方便的自動化環境，並且如果測試範圍夠廣的話就具有很好的測試品質，而我們可以將測試功能加入自動化流程內，也就是WebPack

![](https://i.imgur.com/UcNtB3z.png)

![](https://i.imgur.com/GzHCR45.png)

上述是來自webpack的官網說明(還有很多擴充選項可以使用，這邊不進行示範)，我們依照上述說明並改寫成我們的檔案名稱，之後webpack.config.js應該會長這樣：

![](https://i.imgur.com/4ekN8NS.png)

package.json 會長這樣：
![](https://i.imgur.com/HwK3utH.png)

之後我們輸入指令進行執行，會得到dist資料夾內的一個bundle.js程式碼，這檔案就是使用Mocha處理指定的檔案後加上WebPack打包的程式碼，這程式碼是Mocha的一個結果報告，將這個報告用Html方式打開(LiveServer或是webpack的http系列工具)：

![](https://i.imgur.com/gID3dcP.png)
