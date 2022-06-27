---
title: 前端P.08 - AJAX & 跨域
date: 2020-02-18 13:00:00
categories: 前端系列
comments: true
top_img: 
cover: https://i.imgur.com/PJL2BeQ.png
type: post
toc: true
toc_number: 150
copyright: true
hide:
tags: 
    - JavaScript
    - jQuery
    - AJAX
    - XMLHttpRequest
    - 跨域
    - 緩存
    - CORS
    - Proxy
    - JSONP
    - W3C
---
# XMLHttpRequest：
上回解釋了AJAX的簡介，那這次我們來實作，根據MDN上的說明，可以使用以下程式碼來操作XMLHttpRequest。
###### MDN 是由瀏覽器四巨頭的Mozilla創建的JavaScript API文檔網站
1. 網站上說明，需要使用該方法進行初始化
![](https://i.imgur.com/nw2N3N3.png)
2. 可以使用open這個函數來初始化請求(就是你要互動的行為是什麼)
![](https://i.imgur.com/O5S5x1d.png)
3. open函數，有2個必填參數，1個可有可無的參數
![](https://i.imgur.com/NX7WFly.png)
4. method傳入String變數對應的功能：
![](https://i.imgur.com/L62odWM.png)
5. 傳送我的互動要求
![](https://i.imgur.com/Y3ABtDP.png)
6. 查詢我的結果
![](https://i.imgur.com/UrHBybe.png)

由上圖可以知道用程式碼來寫，初始化應該是這樣：

```
var xhr = new XMLHttpRequest(); // 初始化物件
xhr.open("GET" , "resource/config.json" , false) // 初始化指令，告知我需要與 resource/config.json 這個路徑進行獲取的互動，並且採用異步方式。
xhr.send(); // 傳送指令
console.log(xhr.response) // 把結果印出來
```

可以從圖中看出，已經正確發出請求了
![](https://i.imgur.com/Xq13s0V.png)
1. xhr 是說明使用 XMLHttpRequest 的請求方式 
2. status 是狀態碼
* 200 - 請求成功
* 301 - 資源（網頁等）被永久轉移到其它URL
* 404 - 請求的資源（網頁等）不存在
* 500 - 內部伺服器錯誤

# 緩存問題：
今天如果我跟Server請求一張圖片叫做A，Server丟給你後瀏覽器會自動幫你把圖快取下來，然後隔了10分鐘我又請求一次了，但是這時後瀏覽器認為我又要A這張圖，就會把我的請求擋住，並把快取裡面的A圖給你，這樣能夠有效節省請求消耗，這是一種優化效能手段。
但是也會產生，如果我要的A圖在這10分鐘被換掉，但是網頁機制還是認為我又要同張圖，把我請求擋掉，於是我就拿不到新的A圖，這問題就是緩存、快取問題，而這問題會導致今天要臨時更換驗證圖、監控系統的監控圖等等，無法順利替換。
為了解決這問題我們採用新增時間標籤，像是圖片叫做A，我們改為 A?v=20190203代表2月3日拿到的資料，而2月4日拿到的新圖片則取名為A?v=20190204，這樣系統就會認定這兩個東西是完全不同的東西，就不會有緩存的問題了。

或是加入CRC檢查碼、哈希值等等特殊數學運算碼，CRC檢查可以碼請參考「OSI七層」。

# 跨域問題：
何謂跨域，自從人們發明AJAX後發現一些安全性的問題，於是對AJAX設定了一個同源策略(https://zh.wikipedia.org/wiki/%E5%90%8C%E6%BA%90%E7%AD%96%E7%95%A5)，跨域就是當處於非同源時發起的請求，這種行為叫做跨域，首先我們先了解什麼是同源：

```
假設目前使用者在：http://store.company.com：

http://store.company.com/dir2/other.html	同源	 
http://store.company.com/dir/inner/another.html	同源	 
https://store.company.com/secure.html	不同源	協定不同
http://store.company.com:81/dir/etc.html	不同源	埠號不同
http://news.company.com/dir/other.html	不同源	主機位置不同
```

以上Case定義了什麼情況算是同源，什麼情況算是非同源，而如果你身在https://example.com 網址發起https://google.com 的請求資料，很明顯為非同源，於是就會產生跨域問題，瀏覽器為了安全性將這個動作視為失敗處理，也就是請求Error。

為什麼跨域這會是個問題？
設想這樣一種情況：使用者開啟了A網站，A網站是一家網路銀行，使用者登入以後，又去瀏覽駭客網站(A片網站之類的)。而駭客網站裡的程式碼，發出請求讀取A網站的 Cookie，會發生什麼？很顯然，如果 Cookie 包含隱私（比如存款總額、帳號資訊等等），這些資訊就會洩漏。
於是有了同源政策以此來保護使用者，但仍有一些駭客發現同源政策的漏洞進行攻擊：CSRF 、XSS、JSON Hijacking等等攻擊。

值得注意的是，跨域請求雖然會被瀏覽器擋下來，但攔截的是回應（Response），不是請求（Request），請求指定的內容仍然會完成，開發者要特別注意這點！

但如果要部份解決跨域問題還是可以的，以下提出三種方案：CORS、代理伺服器、JSONP

## CORS：
最標準、正確的解決方法是透過 W3C 規範 的「跨來源資源共用（Cross-Origin Resource Sharing，CORS）」，透過 伺服器在 HTTP Header 的設定，讓瀏覽器能取得不同來源的資源。
CORS 規範中，清楚定義了跨域存取控制的運作方式。

全球資訊網協會(W3C)，提出了CORS該規範紀載著只要發送請求時的 Origin 和回應的 header 中 Access-Control-Allow-Origin 的值相同，或是Access-Control-Allow-Origin: * （代表允許任何網域存取資源），此時就會放寬 CORS 的限制，允許存取跨域資源。於是製作瀏覽器的公司都會遵守這些規則。

```
Acess-Control-Allow-Origin: * // 任何人發起請求都可以無視同源規則。
Access-Control-Allow-Origin: http://store.company.com // 只有身處這個網址的人可以無視同源規則。
```

當然這是要請後端配合的，讓可以跨域的資源設定Header加入CORS，此處就不進行講述。

## 代理伺服器：
回憶一下，跨域請求為什麼會失敗嗎，因為W3C制定的規範，於是瀏覽器開發商就會遵守這規則，也就是「只有」瀏覽器會限制跨域，那麼我不用瀏覽器發請求，而是用代理伺服器呢，這樣就必定不會受到跨域影響。

代理伺服器有很多方案，自己架或是使用別人架好的伺服器並且提供API給你，此處我們使用別人架好的當作示範：

首先我要拿的資料是源自於：https://github.com/
而我選擇別人架好的代理伺服器是：[CORS-ANYWHER](https://cors-anywhere.herokuapp.com/)

根據代理伺服器官網的使用說明，只要將https://cors-anywhere.herokuapp.com/ 後面加入你要解析的URL就可以獲取非跨域的資料，像是https://cors-anywhere.herokuapp.com/https://github.com/。

而CORS-ANYWHER 設定所有人都可以跨域獲取這個網頁的資源，所以我們可以在任何地點發起請求這個代理伺服器API服務。
![](https://i.imgur.com/JHELeST.png)

之後我們再次使用xhr發起請求：

```
var xhr = new XMLHttpRequest(); // 初始化物件
xhr.open("GET" , "https://cors-anywhere.herokuapp.com/https://github.com/" , false)
xhr.send(); // 傳送指令
console.log(xhr.response) // 把結果印出來
```
![](https://i.imgur.com/KuEYTq0.png)

這樣雖然能解決跨域問題，但以此為延伸 
1. 效率低下 CORS-ANYWHER這個網站很夯，用的人很多而且是免費，執行速度超慢 
2. 因為是由代理伺服器發起，所以你自身其他網站(銀行網站)的Cookie並不會被獲取
3. 如果自己架代理伺服器，也會因為資料要轉第三手才能拿到，效率也是低，如果上線後用的人就變多的也就慢了，但還是比CORS-ANYWHER快

## JSONP：
在同源規範中(https://zh.wikipedia.org/wiki/%E5%90%8C%E6%BA%90%E7%AD%96%E7%95%A5)，HTML沒有跨域限制的標籤如 img、script 等等，也就是說使用這些標籤就可以進行跨域操作
![](https://i.imgur.com/lSoDpx9.png)
其實這就是透過JSONP(JSON with Padding)傳輸的，將JSON資料填入Padding(Padding就是要呼叫的函式)，說白了就是使用標籤漏洞去獲取指定的東西，之後自動去呼叫這個東西，以下為透過jQuery.ajax跨站請求為範例(要測試請自己去有下載jQuery的網站F12實作，Wiki就是不錯的選擇)：

被請求的東西： LucasTest.js
```
LucasCallBack("Here's ~~~~~~ Lucas");
temp="Here's ~~~~~~ Johnny"
```

請求端的程式碼：

```
var temp = "in F12"; // 先創立一個測試用的物件，默認值為 in F12
function LucasCallBack(res) { console.log("CallBackData = " + res) } // 在LucasTest.js紀載他會呼叫一個函數叫做LucasCallBack，所以我們在本域新增這函數
$.ajax({
    type: "get", // 發起請求方式為Get (詳情請看xhr有支援哪幾種方式)
    async: false, // async設定false會變成同步請求 要完成ajax後才會繼續執行 (同樣於xhr標準)
    url: "http://127.0.0.1:5022/src/LucasTest.js",
    dataType: "jsonp", // 當接收到跨域資料後，這個資料格式應該為JSONP格式，如果不符合該格式就算本域拿到也會跳到Error函數
    jsonpCallback: "LucasCallBack", // JSONP 拿到後要呼叫的函數，這個函數名稱應該要和LucasTest.js一模一樣
    success: function (res) { // 如果判斷拿到的資料符合我們設定的dataType，就會傳送到這邊        
        console.log("sucess = " + res); // log出拿到的資料
        alert("sucess"); // 提式成功的字眼在畫面上
        console.log("temp = " + temp); // 檢查temp有沒有被修改成功
    },
    error: function (XMLHttpRequest, textStatus) { // 當接收失敗或是檢查dataType失敗，就會傳送到這邊
        alert("error status = " + XMLHttpRequest.status + " , readyState = " + XMLHttpRequest.readyState + " , error type = " +textStatus);
    }
});
```
![](https://i.imgur.com/rr0UUtX.png)

由上圖可以看出JSONP的功能，簡單說就是跨域拿到資料後自動使用eval(資料)，如果只需要拿到資料但是不用自動執行，那就用普通的AJAX請求就可以了


被請求的東西： LucasTest.js
```
"我愛張學友"
```

請求端的程式碼：

```
var temp = "in F12"; // 先創立一個測試用的物件，默認值為 in F12
// function LucasCallBack(res) { console.log("CallBackData = " + res) } 今天既然不要自動執行，自動執行的函數也沒必要存在
$.ajax({
    type: "get", // 發起請求方式為Get (詳情請看xhr有支援哪幾種方式)
    async: false, // async設定false會變成同步請求 要完成ajax後才會繼續執行 (同樣於xhr標準)
    url: "http://127.0.0.1:5022/src/LucasTest.js",
    dataType: "text", // 當接收到跨域資料後，這個資料格式應該為JSONP格式，如果不符合該格式就算本域拿到也會跳到Error函數
    // textCallback: "LucasCallBack", 今天既然不要自動執行，自動執行的函數也沒必要存在
    success: function (res) { // 如果判斷拿到的資料符合我們設定的dataType，就會傳送到這邊        
        console.log("sucess = " + res); // log出拿到的資料
        alert("sucess"); // 提式成功的字眼在畫面上
        console.log("temp = " + temp); // 檢查temp有沒有被修改成功
    },
    error: function (XMLHttpRequest, textStatus) { // 當接收失敗或是檢查dataType失敗，就會傳送到這邊
        alert("error status = " + XMLHttpRequest.status + " , readyState = " + XMLHttpRequest.readyState + " , error type = " +textStatus);
    }
});
```

![](https://i.imgur.com/ofW7JJZ.png)

以上提供了三種解決跨域問題，但是於安全性規範還是無法拿到Cookie敏感資料。