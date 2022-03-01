---
title: 前端P.12 - NodeJS
date: 
categories: 前端系列
comments: true
top_img: 
cover: https://i.imgur.com/XCPqTPw.png
toc: true
toc_number: 150
copyright: true
hide:
tags: 
    - NodeJS
    - V8
    - NVM
    - npm
    - packeage.json
    - TypeScript
    - Bable
    - Uglify
---
# NodeJS：
* NodeJS對於後端來說可以當作Server
* NodeJS對於前端來說可以當作開發環境

首先要解釋NodeJS，我們必須在簡單介紹一下V8引擎，V8除了对JavaScript性能的大幅提升，還提供了"嵌入"的功能，簡單說就是能夠使用JavaScript語言來實現C++功能，其中包含讀取本地文件功能。
而NodeJS就是使用V8來實作，對於後端可以當作Server但是此處不討論，此處我們討論很多人使用NodeJS開發初一些特出的工具，而這些工具是什麼？要怎麼下載？要怎麼呼叫？ ... 等等一系列問題。

## NVM：
首先NodeJS一直改版，所以如果使團隊開發的話我們必須統一使用什麼版本，所以有種工具應運而生NVM。
NVM開源庫：https://github.com/nvm-sh/nvm
NVM Windows版本的Release：https://github.com/coreybutler/nvm-windows/releases
使用者可以去NVM Windows版本的Release下載該工具的安裝程式，根據Git Hub說明進行操作：

![](https://i.imgur.com/3t5I8FB.png)

根據團隊規定要使用哪種版本，輸入nvm install 版本號。即可。

## 如何初始化和安裝工具：
安裝完NodeJS後，NodeJS對於我們前端就是一個開發環境，所以我們先創立任意資料夾，之後於command line 形式輸入 npm init -y 
![](https://i.imgur.com/pWUEvJ0.png)
輸入完後會自動創立一個packeage.json的檔案，該檔案紀載了當前你創立專案的詳細資料。

那麼NodeJS專案能夠提供給我們什麼幫助？
因為NodeJS是個能夠讓JavaScript脫離瀏覽器還能執行的環境，所以很多大老基於NodeJS寫了很好用的工具，這些工具可以說讓前端更容易的運維、部屬，更容易的實現CI/CD，而這些工具要如何下載和使用呢？答案：NPM(熟悉Python的人可以把它當作pip、熟悉C#的人可以把它當作NuGet)。
一樣使用command line，

```
npm install XXXXX：就可以下載你要的工具，但是通常我們還會增加一些參數。
npm install -d XXXX：代表我下載的工具是局部的，只能在我的專案資料夾工作。
npm install -g XXXX：代表我下載的工具是全域的，能夠在任何資料夾工作。
XXXX就是工具註冊NPM的空間名稱，詳情可以去https://www.npmjs.com/ 搜尋或是看看什麼工具最多人用
```

其中 npm install -d 是能夠把你下載的工具紀載到package.json裏頭，所以下次要給別人你的專案時後只用給他，你寫的程式碼 + package.json，不用給他這些工具的下載位置等等。收到的人只要用 npm install 就可以自動把你使用的工具還原到電腦裡。

## 如何使用工具：

知道如何下載工具後我當然要知道怎麼使用工具，而TypeScript其實也是一種工具，根據官網我們也知道該如何下載他，那我要怎麼讓tsc將TypeScript轉換成JavaScript呢？
![](https://i.imgur.com/WgrltXC.png)
上圖這是package.json的內容，其中script裡的成員你可以把它當作一個任務，一個task，在預設中有個任務叫做test，這個任務是去呼叫echo 之後丟入一些文字，所以可以知道這個test的任務就是輸出"Error： no test ..."在畫面上，所以我們也可以新增自己的任務。
```
"build" : "tsc",
"watch" : "tsc -w"
```
上述功能就是新增一個任務叫做
build：執行一次tsc，而tsc會根據tsConfig.json去選擇要編譯的TS檔案在哪
watch：偵測tsConfig.json紀載的要編譯TS檔案，如果其中一個檔案被修改並儲存就會自動幫你編譯，你就不用修改->儲存->tsc 一次，因為你按下儲存瞬間tsc就會自動執行了。
好了我們定義了任務，而根據不同的任務會呼叫不同的tsc功能，那怎麼呼叫任務呢？
```
npm run build
```
以上就是如何透過NodeJS去需叫工具的使用，那麼這邊推薦一些好用的工具。

# Bable：
此處提供一些非常好用的工具，Bable就是其中一個，JavaScript有很多ES版本，每次改版都會推出非常好用和簡潔的API使用方法，但是如果今天我使用ES6版本來開發，很多瀏覽器都支援，但要是使用者用IE這個不支援ES6的瀏覽器造訪你的網頁，不就看不了嗎，於是Bable能夠幫你把ES6版本轉換成IE能看得懂的版本，故與聖經中的巴別塔同名。 詳細使用教學以後會補充。
# Uglify:
詳細使用教學以後會補充。

# TypeScript(NPM) ：
今天因為NodeJS的發明，以至於我們可以直接使用npm 下載tsc編譯器，就不用去官網gitHub下載。 在安裝時後可以選擇npm i -g typescript，將它安裝成全域的工具，這樣你在任何地方寫的TS都可以直接被編譯。 詳細使用教學以後會補充。