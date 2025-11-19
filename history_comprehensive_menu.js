// ページの読み込みが完了したら実行
document.addEventListener('DOMContentLoaded', function() {

    // --- 1. ボタンの状態を制御する機能 ---
    
    // 各ボタンの要素を取得
    const randomButton = document.getElementById('random-quiz-btn');
    const reviewButton = document.getElementById('review-quiz-btn');
    const reviewCountDisplay = document.getElementById('review-count-display');

    // ★★★ テキスト入力式クイズが保存するキー名 'mistakeQuizSet' を参照 ★★★
    const mistakeList = JSON.parse(localStorage.getItem('mistakeQuizSet')) || [];
    
    // 間違えた問題の数を取得
    const reviewCount = mistakeList.length;

    // 件数を表示
    if (reviewCountDisplay) {
        reviewCountDisplay.textContent = `（${reviewCount}問）`;
    }

    // ★★★ ロック機能（ここから） ★★★

    if (reviewCount > 0) {
        // --- A. 復習問題がある場合 (reviewCountが1以上) ---

        // 1. ランダム出題ボタンを無効化（ロック）
        if (randomButton) {
            randomButton.classList.add('disabled');
            randomButton.href = '#'; // ランダム問題へのリンクを無効化
            randomButton.addEventListener('click', function(event) {
                event.preventDefault();
                alert('間違えた問題が残っています。\n先に「復習問題」をクリアしてください。');
            });
        }
        
        // 2. 復習問題ボタンは有効
        // (HTMLの href="history_comprehensive_review.html" が機能する)

    } else {
        // --- B. 復習問題が 0件 の場合 ---

        // 1. ランダム出題ボタンは有効
        // (HTMLの href="history_comprehensive_random.html" が機能する)

        // 2. 復習問題ボタンを無効化
        if (reviewButton) {
            reviewButton.classList.add('disabled');
            reviewButton.href = '#';
            reviewButton.addEventListener('click', function(event) {
                event.preventDefault();
                alert('復習できる問題がありません。\nまずは「ランダム出題」で問題を解いてください。');
            });
        }
    }
    // ★★★ ロック機能（ここまで） ★★★

});