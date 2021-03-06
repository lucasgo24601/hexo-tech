---
title: 通訊P.04 - 實體層、傳輸技術
date: 2020-03-04 13:00:00
categories: 通訊協定系列
comments: true
top_img: 
cover: https://i.imgur.com/Ra8XMqH.png
type: post
toc: true
toc_number: 150
copyright: true
hide:
tags: 
    - WebSocket
    - 協定
    - OSI
    - 實體層
    - TCP/IP協定
    - 無線通訊
    - 有線通訊
    - 電磁波
    - 調變
    - 多工
    - 雙工
    - 類比
    - 數位
    - AM
    - FM
    - PM
    - 1G
    - 2G
    - 3G
    - 4G
    - 5G
    - ASK
    - FSK
    - PSK 
    - BPSK 
    - QPSK 
    - 16PSK 
    - QAM
    - 雜訊
    - RS-232C編碼
    - 差動式零補差編碼
    - 曼徹斯特編碼
    - 差動式曼徹斯特編碼
    - 線路交換
    - 封包交換
    - TDMA
    - FDMA
    - CDMA
    - OFDM
    - 單工
    - 半雙工
    - 全雙工
---
# 資料傳輸：
在上一章我們提到了無論是有線還是無線，工程師研發了很多技術，來讓使用效率、可靠性、公平性等等來提高，那麼在這些複雜技術的背後，就是基於三個基本概念，調變、多工、雙工。

## 調變：
發送端將原始資料混入高頻率的波，透過高頻率的波傳送出去，被稱為「調變(Modulation)」，而高頻率的波最容易產生的方式就是電磁波，所以以下調變技術的高頻率的波都是在說電磁波。
                            
### 解調：
接收端將接收的高頻率的波，取出其中的原始資料稱為「解調(Demodulation)」。

### 多工：
多人共同使用一條資訊通道的方法，就像是家裡的WIFI AP，你也連線，你爸也連線，你哥也連線，請問只有一條資訊通道要怎麼同時給這麼多人用，多工就是為了解決這問題，主要負責讓這條通道更有效率的使用並且更公平的分配。

那麼我們今天來討論如何實現這些技術，首先根據介質主要分為有線和無線，而資料也可以區分為類比(麥克風、溫度)和數位(文字、數字)，故總共會有4種搭配，其每種搭配都有其數據傳輸的技術：
![](https://i.imgur.com/vCA3z0z.png)

### ➤類比訊號->類比傳輸：
科學家發現低頻率的波無法傳遞得很遠，很容易被干擾，於是研發了振幅調變(AM)、頻率調變(FM)、相位調變(PM)等三種，都是屬於「高頻載波技術」，就是把一個低頻率的波用高頻率的波裝載他，就像是人的跑速很慢，要提高速度就去做高鐵，高鐵就是高頻率的波，人就是被裝載的低頻率的波，AM、FM、PM 就是木箱、鐵箱、紙箱，分別有不同的裝載方式，其中現實世界中使用這些最出名的產品有：傳統電話、傳統收音機、傳統無線電視、無線對講機、黑金剛(第一代手機)。

#### AM：
使用電磁波依照「振幅大小」載著低頻訊號傳送出去。聲音大的時候「振幅大」，聲音小的時候「振幅小」。
![](https://i.imgur.com/a4Z0Fm4.png)

#### FM：
使用電磁波依照「頻率高低」載著低頻訊號傳送出去。聲音大的時候「頻率高」，聲音小的時候「頻率低」。
![](https://i.imgur.com/jaQpo67.png)

#### PM：
使用電磁波依照「相位不同(波形不同)」載著低頻訊號傳送出去。聲音大的時候「相位270度」，聲音小的時候「相位0度」。
![](https://i.imgur.com/rtwP6Bj.jpg)

以上是類比通訊(類比訊號->類比傳輸)的實作方法，但不論哪種方法，都會產生以下問題
![](https://i.imgur.com/Q8YucMy.png)
如果今天傳送過程中有雜訊，那麼雜訊就會干擾到原低頻訊號，就像是小時候下雨天收音機會有嘶嘶嘶嘶嘶嘶的聲音、電視會有嘶嘶嘶嘶和雪花的問題，這些都是雜訊干擾的結果，類比通訊無法消除雜訊，於是為了改進該問題，就有了數位訊號->類比傳輸

### ➤數位訊號->類比傳輸：

為了解決類比通訊的缺點：無法加密、無法剔除雜訊等等問題，於是改用數位訊號進行類比傳輸，將「數位訊號(0與1)」混入「高頻的載波」稱為「數位訊號調變技術」，常見的方法包括：振幅位移鍵送(ASK)、頻率位移鍵送(FSK)、相位位移鍵送(PSK)、變形的PSK、正交振幅調變(QAM)，這些是目前甚至未來通訊的主角，包括過去的第二代(2G)、第三代(3G)行動電話，現在的第四代(4G)行動電話，甚至未來的第五代(5G)行動電話都是使用這種技術

#### ASK：
使用電磁波依照「振幅大小」載著數位訊號傳送出去。1的時候「振幅大」，0的時候「振幅小」。

#### FSK：
使用電磁波依照「頻率高低」載著數位訊號傳送出去。1的時候「頻率高」，0的時候「頻率低」。

#### PSK：
使用電磁波依照「相位不同(波形不同)」載著數位訊號傳送出去。具體什麼相位代表0，什麼相位代表1，請參考變形PSK。

以上的傳輸方式，PSK是最優秀的，抗雜訊能力最好，因此最常被使用。

![](https://i.imgur.com/oG1Hdi4.png)

#### 變形的PSK - BPSK：

PSK使用相位0度(先上後下的波形)代表0，項位180度(先下後上的波形)代表1，則稱為BPSK，上面的PSK範例圖，就是採用BPSK，其抗雜訊能力很高，並且在工程設備實施會比較簡單。

#### 變形的PSK - QPSK：

根據上面的BPSK分法，0度 = 0，180度 = 1，那麼我們為何不分得更仔細

![](https://i.imgur.com/E1flGZq.png)

這就叫做四相位位移鍵送(QPSK)，這樣做的好處就是，傳輸量會增加，如果今天是同一長度的波，BPSK只能傳輸1和0，但是QPSK能傳輸00、01、10、11

如果今天我有份資料，用BPSK估計要傳2秒，但是QPSK就只用1秒，因為QPSK攜帶的資訊比BPSK多，但是因為抗雜訊能里不如BPSK，因為誤差允許範圍由180變成90，直接砍半，並且工程設備實施會比較複雜，但以現在半導體製程，也不會太複雜

#### 變形的PSK - 16PSK：
既然能把項位分割成4份，那麼為何我們不可以分割成16份，這樣一次就攜帶更多的資料，此技術就叫做16PSK

#### 變形的PSK - 64PSK：
既然能把項位分割成16份，那麼為何我們不可以分割成64份，這樣一次就攜帶更多的資料，此技術就叫做64PSK

根據上面的變形PSK可以知道，理論上應該可以分割出無限多個PSK，那麼傳輸速度不就超級快嗎，其實不然，因為今天你要手機要產生這些相位波形，那麼射頻元件(發送訊號的元件)，就必須非常精準的切割出來，並且接收端收到後，要能夠區分相位角度得出代表的數位資訊，如果360PSK，接收端要區分167度和168度，這是非常困難的，需要非常精準的接收IC元件，並且要能夠區分雜訊，所以精度越高就代表越貴越難製作。

#### QAM：
同時利用電磁波的「振幅大小」與「相位不同（波形不同）」載著數位訊號（0 與 1）傳送出去，就是混血兒，PSK和ASK的混合體，其變形運用就像PSK命名一樣，其參考圖如下。
![](https://i.imgur.com/4GMxQcO.png)

###### 所謂的手機通訊世代：1G、2G、3G、4G、5G等等，就是採用不同的傳輸方案，其中4G採用64-QAM或256-QAM，5G採用512-QAM或1024-QAM。

以上就是數位訊號用類比傳輸的調變方案，而傳輸操作使用ASK示範如下
![](https://i.imgur.com/8Z71CMF.png)
由此可以知道，今天就算有雜訊干擾，我依然可以數位的特性判斷波形是0還是1，所以數位的抗雜訊較優，以前的電視機都是類比通訊，當有雜訊干擾，就會有雪花和嘶嘶嘶嘶嘶的聲音，但是數位不會，可是數位通訊可能會因為雜訊干擾，畫面就卡住，因為接收到的數位訊號被雜訊干擾無法轉換成圖像，電視就無法得到下一秒的畫面。

### ➤類比訊號->數位傳輸：
如何將連續的類比訊號用數位方式來傳輸和呈現，就必然需要將類比訊號轉換成數位，其轉換請參考音檔的誕生篇，此處不再進行描述。

### ➤數位訊號->數位傳輸：
數位訊號的1就是高電壓5V，0就是0V，然後透過導線傳輸電壓的組合(0和1的組合)，主要用於PCB版上，IC與IC之間的訊息傳輸，但是根據物理法則，導線越長，電阻越大，那麼傳輸的5V，因為導線電阻太大，接收端拿到只剩下0.2V，於是接收端判斷為該數據是0，而不是1(詳細半導體架構請參考程式的誕生)，故這種數位訊號，數位傳輸，只能運用在小範圍的距離。
而為了讓資料傳輸得更遠，並且可靠性更高，於是有了幾種編碼方式是：
#### RS-232C 編碼： 
上述範例使用5V代表1，0V代表0，這樣差距太小，容易衰變導致0.2V問題，於是提高差距
0：正電壓（+12V）。 
1：負電壓（-12V)。

#### 差動式零補差編碼：
0：位元時間內電位由高電位變低電位，或由低電位變為高電位
1：位元時間內無電位變化。

#### 曼徹斯特編碼：
0：位元中間由高電位變化到低電位（high → low）。
1：位元中間由低電位變化到高電位（low → high）。

#### 差動式曼徹斯特編碼：
在每一位元時間的中間都有電位變化（high →low 或 low →high）。
0：位元時間的起始有變化，起始時間可能由高電位轉換到低電位，或由低電位變化到高電位（high →  low 或 low →  high）。
1：位元的時間起始沒有變化。
![](https://i.imgur.com/BS6SsQQ.png)

上面介紹了調變的技術，在介紹多工前我們先理解，資料通訊的類型有什麼

### 線路交換：
指傳送端與接收端之間先建立一條專用的連線，再使用不同的調變技術進行通訊，傳統的「語音通信(Telecom)」都是屬於線路交換，
Ex：台北的有線電話在使用前必須先撥號，經由長途電話交換中心轉接到高雄的有線電話，使用者才能通話。
傳統的國內電話與國際電話、行動電話等在通話之前都必須先撥號，等交換機將電話接通之後才可以通話，就是使用線路交換的方式，通常費用是以「使用時間」計算，例如：撥打市內電話或行動電話，使用愈久費用愈高。

### 封包交換：
是指傳送端與接收端之間共用一條線路，必須先將要傳送的資料切割成許多較小的「封包(Packet)」，再使用不同的多工技術進行通訊，目前的「資料通信(Datacom)」都是屬於封包交換

![](https://i.imgur.com/9Npf0SB.png)

由圖可以知道，如果今天你和你哥共用同一個WIFI 熱點，你哥要下載1G的檔案，你也要下載1M的檔案，而沒有多工技術的話，你就必須等他下載完1G才輪到你，根本沒道理阿!!!
於是把1G分成1000個1M封包，你哥先下載第一個1M，再換你下載1M，這樣才叫做公平!!!，更何況天空只有一個，你要丟你的電磁波，我也要丟，要如何公平並且區分誰是誰的呢，所以下面介紹各種多工技術

### 分時多工(TDMA)：
使用者依照「時間先後」輪流使用一條資訊通道，我們稱為「分時多工接取(TDMA)」。假設資料通道只有一個，但是有三個人要使用，則最簡單的方法就是A先傳送資料，再換B、再換C、再輪回A，再換B、再換C，依此類推。

Ex：就好像有一條很窄的吊橋，同時只能讓一個人正面通過，但是有三個人要過橋，最簡單的方法就是A先過、再換B、再換C囉

![](https://i.imgur.com/BsD8gPC.png)

使用該技術最出名的產品是： 2G(GSM)，第二代行動通訊，Nokia 3310就是2G手機

### 分頻多工(FDMA)：
使用者依照「頻率不同」同時使用一條資訊通道，我們稱為「分頻多工接取(FDMA)」。假設資料通道只有一個，但是有三個人要使用，而且三個人都要同時傳送，則只好先將資料通道依照不同的頻率切割成三等分，再將A、B、C的資料同時傳送，由於資料通道被切割成三等分，所以每個人只能使用原來1/3的頻寬來傳送資料，需要比較長的時間。就好像有一條很窄的吊橋，同時只能讓一個人正面通過，但是同時有三個人要過橋，而且三個人又互不相讓，怎麼辦呢？只好委屈一點，側身走，但是速度比較慢。

![](https://i.imgur.com/6X4jZdw.png)

使用該技術最出名的產品是： 電視，電視有某個頻率，然後電視把頻率分成好幾個小頻率，每個小頻率就是一個電視台，中天、台視等等。


###### 但是因為分開頻率，為避免兩者頻率有干擾，所以需要保護帶，就是51台和52台中間其實有段頻譜是不能使用，避免干擾問題。

### 分碼多工(CDMA)：
將不同使用者的資料分別與特定的「密碼(Code)」運算以後，再傳送到資料通道，接收端以不同的密碼來分辨要接收的訊號，使用在CDMA上的密碼又稱為「正交展頻碼(Orthogonal spreading code)」。假設資料通道只有一個，但是有三個人要使用，而且三個人都要同時傳送，又不想要將頻率切割成三等分，真是又要馬兒跑又要馬兒不吃草，怎麼辦呢？由於手機的元件都是「只認頻率不認人」，如果三個人都使用相同的頻率，則手機無法分辨(會同時聽到三個人的聲音)，科學家們想到，如果能夠在A、B、C傳送的數位訊號裡加入特定的密碼，則接收端只要分辨不同的密碼就可以選擇接收正確的數位訊號囉！


![](https://i.imgur.com/uZyI8so.png)

CDMA技術對於頻寬的使用效率比FDMA或TDMA更好，因為CDMA可以讓多個使用者同時使用相同的頻寬來傳送資料，再由接收端根據不同的密碼解讀資料，不像FDMA或TDMA都必須分配一個固定的頻寬或固定頻寬中的某一段時間，因此CDMA技術可以大幅增加原本FDMA或TDMA技術所能容納的使用者數目。

使用該技術最出名的產品是： 3G手機，但是也因為加密關係，他會從十幾個封包每個進行解密計算，確認其中哪一個是屬於你的，而這過程會更浪費電力，CPU會更耗電，所以把網路關閉會節約很多電量。

###### 因為CDMA原本是美國軍方開發的，後來開放，被改良成WCDMA，如今大部分都使用WCDMA而不是CDMA

### 正交分頻多工(OFDM)：
上述多工，都不是效率最高的多工技術，目前效率最高的多工技術就是OFDM，該多工是改良FDMA，而改良方法是正交的多載波傳輸技術，指的是將可用的頻譜分割成多個子載波，每個子載波可以載送一低速資料流程，並且相互正交，所以不需要保護帶，頻譜利用率更高，如下。
![](https://i.imgur.com/OE3M6qL.png)
使用該技術最出名的產品是： 4G手機、Wifi。


上述介紹了多工技術，如何使用這些技術讓頻譜的使用率更高。
在兩個通訊設備之間的連線稱之為『通訊鏈路』，因為接收和傳送裝置的不同，像是麥克風要傳送，那麼它有接收功能嗎?，所以其通訊鏈路的方向性就不同，於是我們釐清一下三種方向性：

### 單工：
資料只能單向傳送，由一端傳送到另一端，EX：電視、收音機、外帶號碼呼叫牌，等等
### 半雙工：
半雙工是指資料可以雙向傳送，但是同一個時間只有一個方向可以傳送，EX：無線對講機，講完一句話都要講Over，之後放開按鈕等對方說話，無法在對方講話時後加入話題，只能等他講完
### 全雙工：
全雙工是指資料可以同時雙向傳送，EX：電話

![](https://i.imgur.com/lWtSVK5.png)

上述講述了實體層的定義，以及各種實體電子元件是怎麼傳送資料給別人的，那麼我們繼續看OSI第二層資料連結層。
