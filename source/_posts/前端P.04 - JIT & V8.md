---
title: 前端P.04 - JIT & V8
date: 2020-02-14 13:00:00
categories: 前端系列
comments: true
top_img: 
cover: https://i.imgur.com/KxzND1e.png
toc: true
toc_number: 150
copyright: true
hide:
tags: 
    - JavaScript
    - JIT
    - V8
    - 解釋型
    - Google
    - runtime
---
承接P.03，JavaScript的其中一個缺陷由JIT去彌補。
# 即時編譯：JIT(Just-in-time compilation) & V8：
今天JavaScript如何在瀏覽器上工作的，在電影「降臨」外星人降臨地球了，人們為了理解外星人為何降臨於是雙方進行了溝通，但是很明顯外星人聽不懂我們的話，於是有了翻譯的存在，情況像是下面：
![](https://i.imgur.com/6slRuv5.png)
而解釋型就是執行一行翻譯一行，給你看：
![](https://i.imgur.com/Z34RZTN.png)
而編譯型就是全部翻譯完，給你看：
![](https://i.imgur.com/wcW3Qc5.png)
而解釋型對於頻繁執行的重複代碼有缺陷，還是會重新解釋一次，所以JIT就是解決這問題

JIT這個單字其實不是JavaScript專有 C#、Java、Python等等也皆有使用JIT，但最早使用的是在20世紀Toyota汽車工業中提出生產管理的方法學：

```
在20世紀後半期，整個汽車市場進入了一個市場需求多樣化的新階段，而且對質量的要求也越來越高，隨之給製造業提出的新課題即是，如何有效地組織多品種小批量生產，否則的話，生產過剩所引起的只是設備、人員、非必須費用等一系列的浪費，從而影響到企業的競爭能力以至生存。
```

由上述例子可以看到他們提出當時遇到的問題，以此為基礎提出了解決方法就是減少庫存進而減少儲存費用，「讓正確的物資，在正確的時間，流動到正確的地方，數量是剛剛好的數量。」。

那麼程式語言對於當前解釋器遇到的問題引用該概念，「重複解釋相同指令」就是庫存。

JIT是混合了編譯器和解釋器這二者，一字一句編譯成原始碼，但是能夠將編譯過的代碼快取儲存以降低效能損耗(下面會詳細介紹)。相對於編譯型，JIT的代碼可以處理延遲繫結並增強安全性。
    
那麼這樣新型態的JavaScript是如何實現在瀏覽器的呢？

今天我們寫的JS程式碼，寄宿在HTML網頁並丟到瀏覽器執行顯示，此時瀏覽器就會有專門處理JavaScript指令碼的虛擬機器，這種東西我們稱之為「JavaScript引擎」。
在2008年以前JavaScript引擎一直被當作一門解釋器，用於將JavaScript轉換成各種CPU能夠識別的組語檔(CPU會有各種架構，每種架構都有對應自己的組合語言，而不論編譯還是解釋都會轉成組語檔)。
而2008年時Google提出了鼎鼎大名的V8引擎
![](https://i.imgur.com/mY8OZZZ.png)

V8的工作可不是單純的解釋器，它還要負責執行代碼、分配內存、垃圾回收、JIT等等各種技術來優化JavaScript。所以我們知道V8使用各種技術來優化JavaScript解釋器的缺陷，這邊我們舉個範例：

即時編譯新增了一個監視器，這個監視器監視著程式碼的運行情況，記錄該行程式碼一共運行了多少次，如何運行的等信息。
![](https://i.imgur.com/9n4XnL7.png)
當某一行程式碼被執行多次，監視器就會給予一個標籤 warm，JIT就會把這段代碼的編譯結果儲存下來。
當某一行程式碼被執行很多次，監視器就會給予一個標籤 hot，JIT就會把這段代碼的編譯結果進行優化。

當下次又執行到該行發現是warm為已經解釋過的程式碼時候，JIT就會把結果丟出來給你，並且說：不要再解釋了，上次解釋過了，結果長這樣。
當下次又執行到該行發現是hot為已經解釋過並且優化的程式碼時候，JIT就會把結果丟出來給你，並且說：不要再解釋了，上次解釋過了，結果長這樣。

其優化手段如下：

未優化的程式碼：
```
 class Calculator {
     Wrapper wrapper;
     public void calculate() {
         y = wrapper.get();
         z = wrapper.get();
         sum = y + z;
     }
 }

 class Wrapper {
     final int value;
     final int get() {
         return value;
     }
 }
```
針對 Class Calculator 進行第一步優化會變成：
```
 class Calculator {
     Wrapper wrapper;
     public void calculate() {
         y = wrapper.value; // 此處直接用屬性獲取，不透過函數呼叫減少延遲
         z = wrapper.value; // 術語稱為 Inlining 為 程式碼注入
         sum = y + z;
     }
 }
```
針對 Class Calculator 進行第二步優化會變成：
```
 class Calculator {
     Wrapper wrapper;
     public void calculate() {
         y = wrapper.value; // 根據 「因為解釋型關係篇」 的文章可以知道，用區域變數存取會減少延遲
         z = y;
         sum = y + z;
     }
 }
```
針對 Class Calculator 進行第三步優化會變成：
```
 class Calculator {
     Wrapper wrapper;
     public void calculate() {
         y = wrapper.value; 
         y = y; // 用 y = y 取代 z = y， 沒有必要再用一個變數 z，因為 z 跟 y 會是相等的。
         sum = y + y;
     }
 }
```
針對 Class Calculator 進行第四步優化會變成：
```
 class Calculator {
     Wrapper wrapper;
     public void calculate() {
         y = wrapper.value; 
         sum = y + y; // 根據第三步 優化成這樣之後發現 y = y 是多餘的程式碼，於是進行剃除就長這樣。 
     }
 }
```
# runtime：
JavaScript的runtime是在腳本化語言定義中所提到的「已存在的實體或系統」。程式碼通過 JavaScript 引擎傳遞，一旦被解析和被理解之後，實體或系統將會執行解釋行為。
而對於Client端 這個存在的實體就是瀏覽器，不同瀏覽器提供各自的引擎來解析，告訴瀏覽器要執行對應的行為。然而對於Server開發者就是NodeJS了(後續會介紹)。

簡單說：JavaScript引擎、虛擬機、runtime  大部分時候三者是通用的，你可以把它當作JavaScript實作的環境，但詳細區別可以看：https://www.zhihu.com/question/39499036