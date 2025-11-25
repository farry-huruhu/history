// DOM（HTML）の読み込みが完了したら、中のコードを実行する
document.addEventListener('DOMContentLoaded', function() {
    
    // --- 必要なHTML要素を取得 ---
    const yearInput = document.getElementById('year-input'); // 入力欄
    const calcButton = document.getElementById('calc-button'); // ボタン
    const resultText = document.getElementById('result-text'); // 結果表示

    // --- 計算を実行する関数を定義 ---
    function calculateEto() {
        
        // 入力欄から「西暦」を取得（整数に変換）
        const year = parseInt(yearInput.value, 10);

        // 入力が数字でない（NaN）か、空欄の場合はエラーを表示
        if (isNaN(year)) {
            resultText.textContent = '有効な西暦（半角数字）を入力してください。';
            return; // 処理を中断
        }

        // --- 1. 十干（じっかん）の計算 ---
        // (0=庚, 1=辛, 2=壬, 3=癸, 4=甲, 5=乙, 6=丙, 7=丁, 8=戊, 9=己)
        const JIKKAN_LIST = [
            "庚", "辛", "壬", "癸", "甲", "乙", "丙", "丁", "戊", "己"
        ];
        
        // 西暦を10で割った「余り」で十干が決まる
        const jikkan = JIKKAN_LIST[year % 10];
        
        // --- 2. 十二支（じゅうにし）の計算 ---
        // (0=申, 1=酉, 2=戌, 3=亥, 4=子, 5=丑, 6=寅, 7=卯, 8=辰, 9=巳, 10=午, 11=未)
        const JUNI_SHI_LIST = [
            "申", "酉", "戌", "亥", "子", "丑", "寅", "卯", "辰", "巳", "午", "未"
        ];
        
        // 西暦を12で割った「余り」で十二支が決まる
        const junishi = JUNI_SHI_LIST[year % 12];
        
        // --- 3. 結果を表示 ---
        // (例: 1980年は「庚申」です。)
        resultText.textContent = `西暦${year}年は「${jikkan}${junishi}」です。`;
    }

    // --- イベントリスナーを設定 ---
    
    // (A) 「計算する」ボタンがクリックされたら、calculateEto関数を実行
    calcButton.addEventListener('click', calculateEto);

    // (B) 入力欄でEnterキーが押されたら、calculateEto関数を実行
    yearInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            calculateEto();
        }
    });

});