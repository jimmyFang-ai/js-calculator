# 製作 iPhone 計算機

- [] 動機
     
     計算機的應用廣泛，使用起來很方便，想透過製作計算機，

     學習邏輯思維和技術運用。
     

- [] 如何開始

   - 拆分邏輯

       - [] 畫面
           
           時間 

           計算機介面
             - 數字按鈕
             - 運算按鈕
             - 功能按鈕
             - 輸出結果欄位

       
         
        - [] 功能
              
           - 時間功能
  
           - 計算功能
             加、減、乘、除
             百分比
             運算結果
     
        - [] 細節
           - 0、00不得為數字數字開頭(小數點除外) 
           - 三位數補上一個逗號 (使用千分位做法)
           - 小數點只能出現一次 (使用千分位做法)
           - 運算符不得連續出現
           - 小數點運算精準度 ex: 0.1 + 0.2 = 0.3000000004 不合適
           - 資料型別轉換 ex: 字串轉數字 、數字轉字串

        - [] 優化
           - 六位數以上改變字體大小
           - 限制數字輸入
           - 鍵盤鍵和畫面鍵可同時運作

 


- [] 知識點與技術學習
     -[ ] 小數點問題 ex 0.1 + 0.2
     -[ ] 陣列方法 slice 、includes
     -[ ] 型別轉換 ， toString (數字轉字串) 、parseFloat  (字串轉數字) 、  toLocaleString (數字轉字串)
     -[ ] setInterval() 、setTimeout()
     -[ ] [JavaScript 取得各國的日期與時間](https://w3c.hexschool.com/blog/e69d8619)

        
- [] 製作中遇到的困難
     型別間轉換的問題
     各別按鈕邏輯
      
- []  完成專案




### parseFloatparseFloat(string)

parseFloat() 將字串轉換為以十進位表示的浮點數。parseFloat() 僅接受一個參數。

string
欲轉換的值。若第一個參數值的類型不是 String，會先使用 ToString 轉換成字串。
與 parseInt() 相同，會忽略前後空白。當遇到無法解析的字元，會忽略該字元及其後的所有字元，停止解析於此字元，並回傳目前為止的結果。若第一個字元就無法被解析，會回傳 NaN。

與 parseInt() 不同的是，parseFloat() 用以解析浮點數，因此會接受第一個小數點。且僅能分析 10 進位制。

```javaScript

parseFloat("55.44") // 55.44
parseFloat("33.44.55") //只接受第一個小數點，所以印出 33.44 

parseFloat("222,222,2") //遇到 ',' 無法解析，所以忽略 ','後面所有字元並停止解析，回傳 222

parseFloat("") // NaN

```



### toLocaleString(locales, options)

將數字型別轉成本地化字串型別

參數
locales和參數自定義函數的options行為，並讓應用程序指定應使用其格式約定的語言。

可用於處理各國貨幣、時間日期、數字、千分位

```javaScript

// 會四捨五入到小數點後第三位
// 會自動將數字四捨五入到小數點後第三位，再轉成字串
const number = 123.2286;

console.log(number.toLocaleString()); // '123.229'

// 千分位會加上','
const number = 1234.2286;

console.log(number.toLocaleString()); // '1,234.229'

```

處理 0.1 + 0.2 問題
### toPrecision(12)

parseFloat(newValueNum.toPrecision(12)).toString()