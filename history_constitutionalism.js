// DOM（HTML）の読み込みが完了したら実行
document.addEventListener('DOMContentLoaded', function() {
    const redSheetButton = document.getElementById('red-sheet-toggle');
    const mainContent = document.querySelector('main');

    if (redSheetButton) { // ボタンがあるページでのみ実行
        redSheetButton.addEventListener('click', function() {
            // 'red-sheet-active' クラスを main に付けたり消したりする
            mainContent.classList.toggle('red-sheet-active');
            
            // ボタンの状態とテキストを変更
            if (mainContent.classList.contains('red-sheet-active')) {
                redSheetButton.textContent = '赤シート化 停止';
                redSheetButton.classList.add('active');
            } else {
                redSheetButton.textContent = '赤シート化 始動';
                redSheetButton.classList.remove('active');
            }
        });
    }

    // (1) 正解の答えを配列で定義
    const correctAnswers = [
        "ビスマルク", // q1
        "サルデーニャ王国,サルデーニャ,サルディニア王国,サルディニア", // q2
        "パリ・コミューン,パリコミューン", // q3
        "ミドハト・パシャ,ミドハトパシャ", // q4
        "国会開設の勅諭", // q5
        "プロイセン,ドイツ", // q6
        "欽定憲法", // q7
        "天皇" // q8
    ];

    // (2) 必要なHTML要素を取得
    const checkButton = document.getElementById('check-answers-btn');
    const quizInputs = document.querySelectorAll('.quiz-input');
    const resultsArea = document.getElementById('results-area');
    const showAnswersButton = document.getElementById('show-answers-btn');
    const resetInputsButton = document.getElementById('reset-inputs-btn');

    // (3) ボタンがクリックされたときの動作を定義
    checkButton.addEventListener('click', function() {
        
        let correctCount = 0; // 正解数をカウントする変数

        // (4) 各入力ボックスをチェック
        quizInputs.forEach((input, index) => {
            const userAnswer = input.value.trim(); // 入力値の前後にある空白を削除
            const answers = correctAnswers[index].split(','); // 複数の正解を配列に分割

            // ユーザーの答えが、正解リストのどれか一つと一致するかチェック
            if (answers.includes(userAnswer)) {
                // 正解の場合
                input.classList.remove('incorrect');
                input.classList.add('correct');
                correctCount++;
            } else {
                // 不正解の場合
                input.classList.remove('correct');
                input.classList.add('incorrect');
            }
        });

        // (5) 結果を表示エリアに表示
        resultsArea.textContent = `結果：${quizInputs.length}問中、${correctCount}問正解です。`;
    });
    if (showAnswersButton) {
        showAnswersButton.addEventListener('click', function() {
            // 確認ダイアログを表示
            if (!confirm('本当にすべての答えを表示しますか？\n（現在入力中の内容は上書きされます）')) {
                return; // ユーザーが「キャンセル」を選んだら何もしない
            }

            quizInputs.forEach((input, index) => {
                if (index < correctAnswers.length) {
                    // 答えのリスト（カンマ区切り）から最初の答えを取得
                    const answer = correctAnswers[index].split(',')[0];
                    input.value = answer;
                    
                    // 答え合わせのスタイルはリセット
                    input.classList.remove('correct', 'incorrect');
                }
            });

            // 結果表示もリセット
            resultsArea.textContent = 'すべての答えを表示しました。';
        });
    }
    if (resetInputsButton) {
        resetInputsButton.addEventListener('click', function() {
            // 確認ダイアログを表示
            if (!confirm('本当に入力内容をすべてリセットしますか？')) {
                return; // ユーザーが「キャンセル」を選んだら何もしない
            }

            quizInputs.forEach((input) => {
                // 入力内容を空にする
                input.value = '';
                
                // 答え合わせのスタイルもリセット
                input.classList.remove('correct', 'incorrect');
            });

            // 結果表示もリセット
            resultsArea.textContent = '';
        });
    }
});