---
title: 前端P.02 - ECMA、腳本語言
date: 2020-02-12 13:00:00
categories: 前端系列
comments: true
top_img: 
cover: https://i.imgur.com/9qPDEZj.png
type: post
toc: true
toc_number: 150
copyright: true
hide:
tags: 
    - 前端歷史
    - ECMA
    - ECMAScript
    - JavaScript
    - 第一次瀏覽器大戰
    - IE
    - Netscape
    - 腳本語言
---
# JavaScript：
![](https://i.imgur.com/sC6usCg.png)
JavaScript是一門解釋型弱型別的程式語言，由ECMAScript規範的實現，所謂的解釋型請參考「程式語言的誕生」，這邊就不詳細討論(後面會簡單介紹)，讓我們先暫停在這。
![](https://i.imgur.com/KoC0wnI.jpg)

## 什麼是 ECMAScript？
ECMAScript是由ECMA組織制定的腳本語言規範，代號為TC39，你可以把它當作是一個腳本語言的規格書，這個規範紀載了

1. 腳本語言應該要有個關鍵字，只要被他賦予的變數，就無法修改了
2. 腳本語言應該要有個能夠異步操作的關鍵字
3. 腳本語言應該要有個更簡易的製作函數的寫法

在 ECMAScript 制定完成這些後，他們做了什麼？答案是：「ECMA 他們什麼都不幹」。於是就有了JavaScript 這語言把ECMAScript實做出來：

1. const temp = 20; 
2. new Promise( Fun:Function)
3. var Fun = ()=> {}; 

JavaScript根據規範制定了上述的3點。

而ECMA他們甚至想要定義時間的作用，應該也考慮進火星的時間，因為JavaScript被廣泛使用，甚至連NASA的太空服軟件也是JavaScript寫的。
![](https://i.imgur.com/xyi9Z9I.png)

![](https://i.imgur.com/TWXAGxd.png)

由上大概可以知道 ECMAScript 創立了 JavaScript ，但其實不盡然，在我還沒出生時那時第一次瀏覽器大戰已經開打，微軟 - IE VS 網景 - Netscape。
![](https://i.imgur.com/Ctzj7us.png)
在這場戰爭中還沒有標準化的概念，所以你用你的我用我的，造成很多網頁上寫明：

```
「用IE可達到最佳效果」
「用Netscape可達到最佳效果」
```

在大戰中網景公司認為網頁需要一種腳本語言，讓網頁設計師可以很容易地使用它來組裝圖片和外掛程式之類的元件，且程式碼可以直接編寫在網頁標記中。於是JavaScript因此而誕生。

而之所以取名"Java"Script只是因為當時Java很夯，沾點熱度而已，本質跟Java沒有任何關係。
![](https://i.imgur.com/jJvCXUX.png)

網景一推出大受好評，微軟也跟進自己設計了JScript，但也因此 你用你的、我用我的 這情況更嚴重，於是網景向ECMA提出標準，ECMA根據JavaScript制定了ECMAScript規範，當然ECMA會採用JScript和JavaScript的相容。

## 什麼是腳本語言？
假設我們要 "走" 、 "跑" 、 "跳" 等等，這些動作在程式碼中都可以被定義為一個命令或是函數，然而這些操作必須由某個東西來驅動，像是如果沒有人，何來的 "走" 、 "跑" 、 "跳" ？ 這專注於操縱外部實體的語言稱為腳本語言或是膠水語言。