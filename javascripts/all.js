
// DOM 物件
// 手機時間
const phone_clock = document.querySelector('.phone-clock');

// 顯示輸出結果
const output_val = document.querySelector('#output_val');

// 功能按鈕
const clear_btn = document.querySelector('#calc-clear');
const plusAndMinus_btn = document.querySelector('#calc-plusAndMinus');
const percent_btn = document.querySelector('#calc-percent');

// 小數點按鈕
const decimal_btn = document.querySelector('#calc-decimal');

// 等於按鈕
const equal_btn = document.querySelector('#calc-equal');

// 選取所有按鈕
// 所有數字按鈕
const numberBtns = document.querySelectorAll('[data-num]');
// 所有運算按鈕
const operatorBtns = document.querySelectorAll('[data-operator]');


// 儲存資料狀態
// 儲存輸出字串資料
let storeValStr = null;
// 儲存運算資料
let storeOperator = null;



// 製作手機時間
// 網頁初始化
window.onload = function () {
    update_time();
    //重覆每秒執行時間更新
    setInterval(update_time, 1000);
};


function update_time() {
    // 使用 toLocaleString()方法 取得台灣本地當前日期時間
    const currentTime = new Date().toLocaleString("zh-TW", { hour12: false, timeStyle: "short" });

    // 呈現目前時間
    phone_clock.innerHTML = `<span>${currentTime}</span>`;
};




// 製作計算機

// 取得輸出欄位字串資料
function get_outputValStr() {
    // 將有 ','號的字串資料分切成陣列再利用join()重組成字串資料
    return output_val.textContent.split(',').join('');
};

// 取得輸出欄位數字資料
function get_outputValNum() {
    //將輸出欄位字串型別轉型成數字型別
    return parseFloat(get_outputValStr());
};

// 取得運算結果資料
function get_operatorResultStr() {

    // 取得 '當前轉型成數字型別的數字字串'
    const currentOutputNum = get_outputValNum();
    // 將儲存的字串資料轉型成數字型別
    const storeValNum = parseFloat(storeValStr);
    // 宣告新數字值變數
    let newValueNum;


    if (storeOperator === 'plus') {
        newValueNum = storeValNum + currentOutputNum;
    } else if (storeOperator === 'minus') {
        newValueNum = storeValNum - currentOutputNum;
    } else if (storeOperator === 'multiply') {
        newValueNum = storeValNum * currentOutputNum;
    } else if (storeOperator === 'divide') {
        newValueNum = storeValNum / currentOutputNum;
    };



    //  回傳運算後結果並轉為字串型別
    //  計算 JS小數精度運算
    //   1. toPrecision()方法，將數字型別內的小數點後的數字，設定有效位數12位， 超過的部分會四捨五入，最後會回傳String型態資料
    //   2. 使用 parseFloat() 方法，將 newValueNum.toPrecision(12)，在轉型成數字型別，就會過濾掉小數點後面的 0
    return parseFloat(newValueNum.toPrecision(12)).toString();
};


// 處理輸出資料轉換
function set_outputValStr(valueStr) {

    // 如果輸入的字串資料最後一個是 '.' ，就只出現一次
    if (valueStr[valueStr.length - 1] === '.') {
        output_val.textContent += '.';
        return;
    }

    // 處理小數點後面點擊新的數字按鈕會被進位
    // 解決方法將小數點前後數字字串分切處理

    // 使用解構賦值將 valueStr.split('.')回傳的陣列賦予到左邊陣列中
    const [wholeNumStr, decimalstr] = valueStr.split('.');

    // 如果有小數點後面數字字串的話，重組數字字串
    if (decimalstr) {
        output_val.textContent = parseFloat(wholeNumStr).toLocaleString() + '.' + decimalstr;
    } else {
        // 如果沒有小數點後面數字字串的話，維持原本數字字串
        output_val.textContent = parseFloat(wholeNumStr).toLocaleString();
    }


    // 依據目前輸出的資料長度改變字串大小
    changeStrSize(valueStr);
};


// 點擊數字函式
function numberPress(numStr) {

    // 當前輸出欄位的數字字串，預設為 '0'
    const currentValStr = get_outputValStr();


    // 如果當前資料狀態為 0 的話，只顯示點擊到的數字按鈕
    if (currentValStr === '0') {
        set_outputValStr(numStr);
    } else {

        // 如果當前資料狀態不是 0 的話，將 '當前數字字串' 和 '點擊到數字字串'相加
        set_outputValStr(currentValStr + numStr);
    };
};


// 點擊運算函式
function operatorPress(operation) {
    // 取得當前輸出字串資料
    const currentValStr = get_outputValStr();


    // 如果有點擊到運算按鈕的話，將'字串資料' 和 '運算資料儲存'
    if (!storeOperator) {
        storeValStr = currentValStr;
        storeOperator = operation;
        // 並設定初始值為 '0'
        set_outputValStr('0');
        console.log(operation, storeValStr);
        return;
    };

    // 儲存運算後結果
    storeValStr = get_operatorResultStr();
    storeOperator = operation;
    set_outputValStr('0');
};


// 檢驗目前計算機字串的資料長度
function changeStrSize(valueStr) {

    //正規表達式 
    // String.prototype.replace()：取代內容，回傳置換後的新字串，不會改變原本的字串
    // /.../g  全域匹配，只要符合就會回傳
    // [ ] 比對中括號內任意字元
    // \W 匹配所有非文字字元(標點符號、特殊字元)

    let trim_string = valueStr.replace(/[\W_]/g, ''); //把非數字字串都去除掉，回傳純數字字串
    let valueStr_length = trim_string.length;



    // 字串長度超過六以上就改變 文字大小
    if (valueStr_length >= 9) {
        output_val.style.fontSize = '40px';
    } else if (valueStr_length === 8) {
        output_val.style.fontSize = '45px';
    } else if (valueStr_length === 7) {
        output_val.style.fontSize = '50px';
    } else {
        output_val.style.fontSize = '60px';
    };
};





//------------- 監聽事件 -------------------

// 所有數字按鈕綁定監聽
numberBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {

        // 取得目前點擊到按鈕的值
        const numBtn_value = e.target.dataset.num;

        // 取得當前去除非數字後的字串資料
        const trim_currentValStr = get_outputValStr().replace(/[\W_]/g, '');

        let valueStr_length = trim_currentValStr.length;


        // 如果開始輸入第一個數字按鈕的話，就把清除按鈕內容改為 'C'
        if (numBtn_value) {
            clear_btn.textContent = 'C';
        };


        // 如果當前的輸出數字字串長度達到 9 ，就中斷數字按鈕點擊
        if (valueStr_length === 9) return;


        // 使用 toString() 將值轉為字串
        numberPress(numBtn_value.toString());
    });
});


// 所有運算按鈕綁定監聽
operatorBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        // 取的目前點擊到按鈕的值
        const operatorBtn_value = e.target.dataset.operator;

        operatorPress(operatorBtn_value);
    });
});


// 小數點按鈕綁定監聽
decimal_btn.addEventListener('click', () => {
    const currentValStr = get_outputValStr();

    // 當輸出數字字串長度達到 9 的時候，中斷小數點輸入
    if (currentValStr.length === 9) {
        return;
    }

    // 設置防呆，限制 '.'只能輸入一次
    if (!currentValStr.includes('.')) {
        //如果當前字串資料裡面沒有 '.'，就補上
        set_outputValStr(currentValStr + '.');
    };
});


//  清除按鈕綁定監聽
clear_btn.addEventListener('click', () => {

    // 恢復預設值
    set_outputValStr('0');
    clear_btn.textContent = 'AC';
    storeValStr = null;
    storeOperator = null;
});

// // 正負按鈕綁定監聽
plusAndMinus_btn.addEventListener('click', () => {
    const currentOutputNum = get_outputValNum();
    const currentOutputStr = get_outputValStr();

    // 避免出現 --0 的狀況出現 NaN狀況
    if (currentOutputStr === '-0') {
        set_outputValStr('0');
        return;
    };

    // 如果當前數字大於等於 0 可以加上 ' - '
    if (currentOutputNum >= 0) {
        set_outputValStr('-' + currentOutputStr);
    } else {
        // 如果當前數字小於 0 ，使用slice() 方法提取字串位置 1到結束的資料，
        // 意思等於取消 ' - '
        set_outputValStr(currentOutputStr.slice((1)));
    };
});


// 百分比按鈕綁定監聽
percent_btn.addEventListener('click', () => {
    // 取得 '當前轉型成數字型別的數字字串'
    const currentOutputNum = get_outputValNum();

    // 資料要變成 '數字型別' 才能運算
    const newValueNum = parseFloat((currentOutputNum / 100).toPrecision(12));

    // 最後將運算完的 '數字型別轉型為字串'
    set_outputValStr(newValueNum.toString());


    // 將儲存資料狀態恢復初始值
    storeValStr = null;
    storeOperator = null;
});


// 等於按鈕綁定監聽
equal_btn.addEventListener('click', () => {

    // 如果按下等於按鈕，有儲存字串資料的話，就回傳運算結果
    if (storeValStr) {
        set_outputValStr(get_operatorResultStr());

        //按下等於並清空暫存 字串和運算符
        storeValStr = null;
        storeOperator = null;
    };
});










