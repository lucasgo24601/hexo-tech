---
title: 前端P.06 - WebAssembly
date: 2020-02-16 13:00:00
categories: 前端系列
comments: true
top_img: 
cover: https://i.imgur.com/1g9Gh4R.png
toc: true
toc_number: 150
copyright: true
hide:
tags: 
    - WebAssembly
    - C++
    - GC
---

# WebAssembly：
還記得JIT是如何解決效能低下的方式嗎，偵測到這段程式碼被頻繁呼叫，我就把解釋結果(機器語言)儲存起來，當下次又呼叫就不進行解釋直接將結果丟出來，走火入魔的工程師們認為這也是效能問題，為什麼要執行很多次才能被優化呢，而且優化過程還會浪費效能，所以就有人提出如果一開始網頁識別的文件就是機器語言呢。

還記得TypeScript是如何解決弱型別的問題嗎，使用強型別方式，最後把程式碼丟給tsc進行編譯轉換成JavaScript。但是TypeScript身為嚴格超集必定支援JavaScript，於是又犯了弱型別缺陷問題，走火入魔的工程師們認為這也是個問題，於是提出使用強型別語言進行開發，因為理論上所有強型別語言都可以被轉換成機器語言。很明顯TypeScript不是推薦的強型別。

因為JavaScript的垃圾回收機制(GC)，是無法控制的，時間到他就會自己進行清除，這也會是個問題，因為GC機制當GC清除時候，會把所有程式暫停住，之後開始清除物件挪出更多的記憶體，工程師們認為GC不可控是很糟糕的表現，要是我在畫面最華麗時候突然來個GC那不就卡卡的嗎。

綜合上述三者問題，工程們規劃出WebAssbly應該是能夠自主控制GC，並且是由真正的強型別的程式語言所開發，並且能夠在當前瀏覽器不支援WebAssbly時候轉換成JavaScript，所以當前四大龍頭組織推出C++為WebAssbly的核心，其大概長這樣：

![](https://i.imgur.com/EnsjTwX.png)

當然WebAssbly還沒有成熟，但是WebAssembly 於 2019 年 12 月 5 日成為全球資訊網協會（W3C）的推薦，與 HTML，CSS 和 JavaScript 一起，成為 Web 的第四種語言。(Form Wiki)。如果成熟的話前端又會再重新翻牌，而比這翻牌比TypeScript帶來的影響更多。