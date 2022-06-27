---
title: 前端P.01 - 網頁三兄弟
date: 2020-02-11 13:00:00
categories: 前端系列
comments: true
top_img: 
cover: https://i.imgur.com/w3wkrPQ.png
type: post
toc: true
toc_number: 150
copyright: true
hide:
tags: 
    - 前端歷史
    - W3C
    - Html
    - CSS
    - JavaScript
    - 瀏覽器
---
前端工程師，前端工作是什麼？
前端的工作用最粗略和簡單的說法就是，假設今天你想要把你的照片丟在網頁上給別人看，那麼要怎麼丟，要怎麼呈現，這就是前端的工作。

首先你要看網頁，你就必須要有瀏覽器，主流瀏覽器：Edge(微軟)、Chrome(Google)、FireFox(Mozilla)、Safari(蘋果)
![](https://i.imgur.com/S8z19lm.png)

而網頁需要用瀏覽器去觀看，就像是吃東西必須由嘴巴來咀嚼，而不是所有東西都能咀嚼，像是鋼鐵你能吃嗎？所以對於瀏覽器來說也是如此，當前瀏覽器只能識別三種程式語言所開發的產品：Html、Javascript、CSS。
![](https://i.imgur.com/1Yb84KH.png)
由上圖可以知道這三者都有負責不同的業務：
* Html負責把網頁的結構生出來，像是這邊需要一個按鈕之類的架構。
* CSS負責美化，讓網頁看起來漂亮一點。
* JavaScript負責控制交互邏輯、行為，像是按下按鈕後應該跑出什麼東西之類的。

而這些東西是誰制定的？答案：W3C 
![](https://i.imgur.com/gM9LDro.png)
跟網路通訊一樣，瀏覽器也是依靠一堆協定堆積出來的應用層產品(詳細請看OSI介紹)，而要制定這樣得組織就必須是全球很有話語權的人，這個人就是提姆·柏內茲-李
![](https://i.imgur.com/rdSDd3v.png)
也就是這個人規定了為什麼網址必須是http:// 為什麼一定要兩個斜線？就是這個人規定的。

```
柏內茲在接受泰晤士報採訪時，承認網址中的雙斜線（//）並非必要。
他還表示，他可以輕易設計出一種無需斜線的URL。柏內茲-李為掉以輕心道歉，並說「這個主意在那時看起來不錯。」。
```

![](https://i.imgur.com/h7b3BTK.png)

而隨著時代的演進
* Html也一直在改版，現在改到html 5 版本。
* Javascript也一直在改版，現在改到 ECMAScript 2019 （簡稱ES2019），第 10 版 (簡稱ES10)
* CSS也一直在改版，現在改到CSS2.1

而很多人以此三大類為基礎開發了延伸產品
* Html延伸出DOM
* JavaScript延伸出NodeJS
* CSS延伸出SASS和LESS

![](https://i.imgur.com/vCxLFMU.png)

而今天我們介紹的主角就是JavaScript，其他Html和CSS以後會在教學。
