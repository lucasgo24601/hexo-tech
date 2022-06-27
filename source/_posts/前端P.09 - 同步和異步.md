---
title: 前端P.09 - 同步和異步
date: 2020-02-19 13:00:00
categories: 前端系列
comments: true
top_img: 
cover: https://i.imgur.com/zx052BP.gif
type: post
toc: true
toc_number: 150
copyright: true
hide:
tags: 
    - JavaScript
    - 同步
    - 異步
    - Promise
    - Await
    - Async
---
# 同步和異步：
上回我們講了網頁中的下載是如何實施，而其中有個關鍵字異步，我們這邊就進行解釋同步和異步是什麼？用最簡單和粗糙的說法：
假設今天你要打電話問書局老闆說「人類簡史」賣光了沒：

![](https://i.imgur.com/ylgccQg.png)

同步：老闆會說等一下我去找找，你就拿著電話筒等了1小時，之後老闆說賣光了。
異步：老闆會說等一下我去找找，有結果的話我再打給你A號碼的手機，沒結果的話我再打給你B號碼的手機，之後你把電話掛掉，一小時候老闆打電話給你A電話，你就知道結果了

以上就是同步和異步的概念，這兩種概念在程式語言佔據很重要的一部分，想想如果我是要下載1GB的檔案，沒有異步的話，你就不能邊看影片邊下載，而程式語言預設都是同步的，所以此處不介紹同步，那麼異部我們用JavaScript來當作範例，await/async是撰寫異步的寫法，是基於Promise的寫法，所以在撰寫異步範例之前，我們需要知道那麼Promise是什麼？

## Promise：
今天要談異步操作，那我們看上述書局異步Case，Promise 就是老闆承諾有結果會通知你A電話，沒結果就通知B電話，這是老闆給你的方案。當先前承諾的工作完成時，就來通知我們「工作完成了！來進行下一步的任務吧」，這就是Promise的功能之一「循序執行」，而根據通知結果，有結果(Yes or No)或是沒結果(老闆在找的過程中被暗殺了)，那這兩種方案在程式碼都可以用對應的函數來表達，所以使用Promise時候可以傳入兩個函數，這兩個函數分別代表有結果就執行第一個，沒結果就執行第二個，當然也可以只傳一個函數，以下我們用傳兩個函數的當作範例。

### Promise範例 循序執行範例：
```
console.log("我：老闆請幫我找一下，「人類簡史」這本書")
console.log("老闆：好的，有結果的話我會通知第一個電話答錄機，沒結果我會通知第二個電話答錄機，那麼再麻煩你給我這兩個電話答錄機的名字")
console.log("我：好，我現在去找這兩個電話答錄機");

function Sucess (strAns) {console.log("您好Lucas，這是第一台答錄機，您有一則留言：" + strAns)}
function Fail (strAns) {console.log("您好Lucas，這是第二台答錄機，您有一則留言：" + strAns)}

console.log("我：我處理好了，第一個叫做 Sucess ，第二個叫做 Fail。那再麻煩老闆嚕")
console.log("老闆：好，我現在就去準備，找到後會再透過這兩個其中一個來通知你。")

console.log("此時老闆開始準備找書，於是老闆開始找書的前置動作，生成剛剛的承諾，Promise");

function FindBookProcess() (resolve, reject) { // resolve 就是有結果函數。 reject 就是沒結果函數
  setTimeout(function() {  // 使用延遲N毫秒後做某件事情的函數，來模擬老闆找書花的時間
    try{
        // doSomething() 執行找書動作，如果這中途發生意外就會跳到Catch，如果沒有意外就會掉到下面一行
         resolve("同學同學，我有結果了，Yes I Do 我找到了，你聽到這則留言後就可以來找我了"); // 老闆有結果後會執行函數並傳入"他想說的話" 
    }
    catch(e)
    {
        reject("同學同學，我發生意外了，剛剛我老婆跟我離婚了，書局被法拍了，我不知道你要的書有沒有在裡面")
    }
  }, 10000); // 我們假設老闆花了10秒(10000毫秒)找書
}
const promise1 = new Promise(FindBookProcess);

console.log("老闆OS：剛剛同學說第一個叫做Sucess，第二個叫做Fail，我記下了，這樣前置動作都完成")
promise1.then(Sucess , Fail);
console.log("老闆OS：好從現在開始，我開始找拉");
```

![](https://i.imgur.com/Uniebnt.png)

在上述的案例，老闆採用有結果就通知Sucess，至於結果有可能是 Yes or No，沒結果就通知Fail。那麼我可不可有結果才通知，沒結果就不通知？這也是可以的 promise1.then(Sucess); 就可以。
而當我收到通知後我就必須去老闆的店，所以還可以這樣寫
promise1.then(Sucess).then(拿錢包).then(搭捷運).then(到老闆的店).then(按電鈴).then...etc ; 這就是循序執行的Promise運用

### Promise範例 併發執行範例：
在上述的Case，你問老闆 -> 老闆找 -> 老闆的回應，這是一個循序程序，那麼如果今天情況是：
你問老闆 -> 老闆問同行A、B、C -> 老闆自己沒有 但是同行A、B、C還沒有結果 -> 老闆等同行A、B、C回應 ->  都有回應，通知你結果
很明顯情況變複雜了，因為此時有4個人幫你找，並且就算其中一個人有你還是必須等其他人的回應，因為你必須知道最近的書局在哪邊，這種Case會變得複雜一點，你可能需要一個計數器算當前回報的人有幾個，如果回報的人數是4個就代表有結果了。

但其實不用這麼麻煩，只要Promise有提供一個便利的方法。

```
function sucess (所有的老闆回應) { 
    console.log("您好Lucas，這是第一台答錄機，您有" +所有的老闆回應.length + "則留言：")
    for(var i = 0 ; i < 所有的老闆回應.length ; i++) 
        console.log("這是第" + i +"個老闆的留言：" + 所有的老闆回應[i])
}; // 輸出所有老闆的回應訊息

function sucess_one (最快老闆的回應) {console.log("您好Lucas，這是第一台答錄機，您有一則留言：" + strAns)}


const promise老闆 = new Promise(.... 請參考上個範例這邊不重新打了);
const promise老闆A = new Promise(.... 請參考上個範例這邊不重新打了);
const promise老闆B = new Promise(.... 請參考上個範例這邊不重新打了);
const promise老闆C = new Promise(.... 請參考上個範例這邊不重新打了);

Promise.all([promise老闆, promise老闆A,promise老闆B,promise老闆C]).then(success); // 所有老闆的回應都結束，就會呼叫success函數
// Promise.race([promise老闆, promise老闆A,promise老闆B,promise老闆C]).then(sucess_one); // 四個當中誰最先回應，就執行Sucee_one函數，此處就不補充文字說明了，因為顯而易見
```

###### 還有很多用途，這邊不舉例，詳情請看：https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Promise 

### Promise範例 錯誤處理範例：
Promise可以併發執行 加上 循序執行 像是： Promise.all([promise老闆, promise老闆A,promise老闆B,promise老闆C]).then(sucess).then(拿錢包).then(搭捷運).then(到老闆的店).then(按電鈴);
很明顯會執行到很多函數，複雜度提高很多，所以我們可以加上Catch進行捕捉錯誤。

```
 Promise.all([promise老闆, promise老闆A,promise老闆B,promise老闆C]).then(sucess).then(拿錢包).then(搭捷運).catch(發生意外叫我弟幫我拿)
```

## Await/Async：
上述的程式碼我們知道如何撰寫異步的JS程式碼，很明顯如果要實現 併發執行 + 循序執行，這樣程式碼會很醜很難Debug，就連我自己也懶得寫所以在範例中寫虛擬碼，Promis是屬於ES6時代的產物，但隨著時代演進尤其是Node.js，人們需要更便利的異步處理，於是在ES7加入Await/Async。
首先它的誕生是為了讓Promise的可讀性提高，並且更靈活方便的使用異步，所以你如果要函數裡的某一行使用await，就必須在該函數加上 async 的修飾詞，之後就可以使用Await，來讓程式碼變得好看點。

```
function FindBookProcess() (resolve) { 
  setTimeout(function () { return resolve("同學同學，我有結果了，Yes I Do 我找到了，你聽到這則留言後就可以來找我了"); }, 1000);
    }

function Shopkeeper_FindBook(BookName) {
    return new Promise(FindBookProcess);
}

async function Main () {
    var res = await Shopkeeper_FindBook("人類簡史"); // res = "同學同學，我有結果了，Yes I Do 我找到了，你聽到這則留言後就可以來找我了"
    if (res.search("Yes I Do") != -1) { // 如果老闆有找到的話
        await TakeMoney(); // 此處不寫函數了，因為我懶惰
        await GoToMRT();
        await KnockDoor();
        var Book = await GetBook();
        console.log("當前拿到書了，書本內容 = " + Book);
    }
};

Main():
```