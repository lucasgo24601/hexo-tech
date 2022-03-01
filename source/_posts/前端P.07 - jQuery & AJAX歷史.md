---
title: 前端P.07 - jQuery & AJAX歷史
date: 
categories: 前端系列
comments: true
top_img: 
cover: https://i.imgur.com/K1rZ8kI.png
toc: true
toc_number: 150
copyright: true
hide:
tags: 
    - JavaScript
    - jQuery
    - AJAX
    - W3C
    - XMLHttpRequest
---

# jQuery:
而在前端開發過程中，免不了使用一個函示庫，可以說你如果不知道jQuery就無法寫前端，而jQuery你可以把它當作API或是第三方庫來使用，主要業務內容是 簡化HTML與JavaScript之間的操作，可至官方網站進行下載該庫：https://jquery.com/
根據維基百科jQuery採用工廠模式設計，所以凡是看到：$. 都是呼叫jQuery的函式，在以前前端世界如果你沒用過jQuery那就不能叫做前端，因為這個庫太好用了，但是最近jQuery也不見得是必要的函示庫，但是其設計概念很值得參考。

![](https://i.imgur.com/SadDbPL.png)

以上是jQuery提供的函示庫，此處就不再進行介紹，詳情請參考：https://www.w3school.com.cn/jquery/event_click.asp
後續介紹的AJAX將會使用jQuery來當作實作範例。

# AJAX：
AJAX是當前前端會經常使用的功能，也是網頁的特色之一，下載功能，要解釋AJAX是什麼我們先釐清在AJAX出現之前，前端到底是長怎樣
AJAX出現前：假設今天你在看股票網站，而股票大盤每一秒都在變化，如果你要看最新的大盤訊息，你就必須重新整理頁面才能看到最新的資料。
AJAX出現後：假設今天你在看股票網站，而股票大盤每一秒都在變化，而大盤畫面就會自動變化，你也不用重新整理頁面來刷新。

所以從上述可以得知AJAX是可以解決即時更動介面及內容，不需要重新讀取整個網頁，讓程式更快回應使用者的操作。其全名為 異步 JavaScript 及 XML（Asynchronous JavaScript and XML，AJAX）。最初微軟意識到這問題，於是開發了ActiveXObject給開發者使用，用了才知道原來這麼好用，很多開發者以此API開發了諸多著名軟體 Gmail就是其中一個AJAX應用代表，於是其他瀏覽器廠商也跟風發開發起類似接口，但是為了相容性，總不可能這功能在IE叫做ActiveXObject，而在火狐又叫做另一個名稱，這樣工程師還不發飆給你看，於是W3C組織開始統一為XMLHttpRequest，但是早期的瀏覽器像是IE 還是叫做 ActiveXObject，於是就有了以下寫法：

```
if (window.XMLHttpRequest) { // 如果當前支援W3C制定的標準名稱XMLHttpRequest的話 (其瀏覽器：Mozilla, Safari, IE7+ ...)
    httpRequest = new XMLHttpRequest();
} else if (window.ActiveXObject) { // 如果當前不支援XMLHttpRequest，那判斷是否為支援ActiveXObject (其瀏覽器：IE 6 and older)
    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
}
```