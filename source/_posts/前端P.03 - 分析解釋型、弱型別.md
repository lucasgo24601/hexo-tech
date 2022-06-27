---
title: 前端P.03 - 分析解釋型、弱型別
date: 2020-02-13 13:00:00
categories: 前端系列
comments: true
top_img: 
cover: https://i.imgur.com/N1AfYeJ.jpg
type: post
toc: true
toc_number: 150
copyright: true
hide:
tags: 
    - JavaScript
    - 解釋型
    - 弱型別
    - JIT
    - TypeScript
    - WebAssembly
---
# 為什麼是解釋型？
首先電腦只能看懂「機器語言」(詳情請看「程式語言的誕生」)，所有程式語言都可以分為兩類，編譯型、解釋型。這邊不詳細敘述編譯型和解釋型的流程(詳情請看「程式語言的誕生」)，此處就用粗略的比喻來解釋：

```
今天你是個導演，你寫了劇本，找了演員

編譯型：演員要花1小時背下來，思考1小時演藝技巧，然後開始演出
解釋型：演員先花2分鐘被一段台詞，思考2分鐘，然後開始演出一小段後演員說：導演暫停一下，我繼續背下一段，2分鐘就好 ... etc。
```

從上述結果來看編譯型應該是比較好的結果，但是如果今天劇組都找好了，你是演員會是如何處理呢：

```
編譯型：導演等等，我要花1小時背台詞，就算你現在全劇組準備好，你還是要等我背1小時。
解釋型：導演等等，我要花2分鐘背一小段台詞，就算你現在全劇組準備好，你還是要等我背2分鐘。
```

這樣看起來好像又是解釋型好一點。假設今天你的瀏覽器就是劇組，如果你要看一個網頁的話，你是想要等1小時後才能看到結果還是等2分鐘先看第一個頁面呢？答案昭然若揭。於是JavaScript就成為了解釋型語言，也更符合網頁的特色需求。

# 什麼是弱型別？
就是宣告變數時候不用給予資料型別，像是宣告變數a，你不用跟電腦說他是String還是Int。但是如果發生資料型別不符合的話，就會自動進行轉化強行執行。

強型別：
```
int a = 20;
string b = "40";
int sum = a + Convert.toInt32(a+b); // 一定要轉換不然編譯不了，其結果為 60
```

弱型別：
```
var a = 20;
var b = "40";
var sum = a + b // 2040 此時sum為字串
```

# 那弱型別和解釋型有什麼壞處？

1. 開發和維護不容易、不易於大型專案
2. Debug困難
3. 效能問題

針對這3點詳細展開來看
1. 因為它是弱型別所以可能某個變數在第10行還是int，經過一輪番操作，第1000行這個變數變成了string，並且這操作屬於合法操作，所以維護和Debug困難導致不適合大型專案，當然這還是跟開發者素質有關，素質好的開發者不會有這問題。
```
var temp = "50"
...... // 經過一系列的操作
console.log(type of (temp)) // temp變成了 int 
```
2. 因為弱型別關係：
![](https://i.imgur.com/pmE8DYk.png)
![](https://i.imgur.com/T1jGJQv.png)

3. 因為解釋型關係：
![](https://i.imgur.com/Uy4mnj2.png)

4. 因為解釋型關係：
```
console.log("Hello")
console.log("Hello")
console.log("Hello")
console.log("Hello")
console.log("Hello")
console.log("Hello")
....
```
上述程式碼，就只是一直輸出Hello，但其中一樣的程式碼我已經解釋過一次了，可是我是解釋器的關係還是重新解釋，這不就是效能低下的表現嗎？

綜上所述，可以知道JavaScript的設計對於效能很難有提高，因為語言本身缺陷，容易導致開發者寫出素質不好的程式碼。於是就有些專家提出一些解決方案：

1. 解釋型的問題，使用了JIT技術來優化，JIT的優化讓Javascript大大提升，如圖中所示：
![](https://i.imgur.com/yNWTLdC.png)
2. 弱型別的問題，微軟提出一個TypeScript的程式語言，該程式語言能夠支援JavaScript並且給予強型別的檢查效果。
3. JIT和TypeScript的問題，這兩者都是基於JavaScript開發出來的產品，雖然使用它們可以有效降低，但還是有一些效能本質問題，於是Mozilla、Google、Microsoft、Apple這四大瀏覽器開發商一起推出了瀏覽器能夠識別的第四種程式語言：WebAssembly

以上三種解決方案，請看下回分析。