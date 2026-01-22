document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. 赤シート機能 ---
    const redSheetButton = document.getElementById('red-sheet-toggle');
    const mainContent = document.querySelector('main');

    if (redSheetButton) {
        redSheetButton.addEventListener('click', function() {
            document.body.classList.toggle('red-sheet-mode');
            
            if (document.body.classList.contains('red-sheet-mode')) {
                redSheetButton.textContent = '赤シート化 解除';
                redSheetButton.classList.add('active');
            } else {
                redSheetButton.textContent = '赤シート化 始動';
                redSheetButton.classList.remove('active');
            }
        });
    }

    // --- 2. クイズ機能 ---
    
    const correctAnswers = [
        "プランテーション",       // q1
        "ガンディー,ガンジー",    // q2
        "カースト,カースト制度",  // q3
        "韓国併合,日韓併合",      // q4
        "総督",                   // q5
        "憲兵警察,憲兵警察制度",  // q6
        "砂糖",                   // q7
        "米"                      // q8
    ];

    const checkButton = document.getElementById('check-answers-btn');
    const quizInputs = document.querySelectorAll('.quiz-input');
    const resultsArea = document.getElementById('results-area');
    const showAnswersButton = document.getElementById('show-answers-btn');
    const resetInputsButton = document.getElementById('reset-inputs-btn');

    // ★追加: アチーブメント設定
    const achievementBox = document.getElementById('achievement-box');
    const SAVE_KEY = 'history_achievements';
    
    // ▼▼▼ ここを修正しました（achievements.jsの saveId と一致させる） ▼▼▼
    const ACHIEVEMENT_ID = 'achv_colonial_quiz_master'; 
    // ▲▲▲ 修正ここまで ▲▲▲

    // (A) 答え合わせボタン
    if (checkButton) {
        checkButton.addEventListener('click', function() {
            let correctCount = 0;
            
            quizInputs.forEach((input, index) => {
                if (index < correctAnswers.length) {
                    const userAnswer = input.value.replace(/\s+/g, '');
                    const answers = correctAnswers[index].split(',');
                    
                    if (answers.includes(userAnswer)) {
                        input.style.backgroundColor = "#d4edda";
                        correctCount++;
                    } else {
                        input.style.backgroundColor = "#f8d7da";
                    }
                }
            });

            resultsArea.innerHTML = `<strong>結果：${correctAnswers.length}問中、${correctCount}問正解です。</strong>`;

            if (correctCount === correctAnswers.length) {
                unlockAchievement();
            }
        });
    }

    // (B) 実績解除の関数
    function unlockAchievement() {
        let myAchievements = JSON.parse(localStorage.getItem(SAVE_KEY)) || [];

        if (!myAchievements.includes(ACHIEVEMENT_ID)) {
            
            myAchievements.push(ACHIEVEMENT_ID);
            localStorage.setItem(SAVE_KEY, JSON.stringify(myAchievements));
            
            if(achievementBox) {
                achievementBox.classList.add('show');
                setTimeout(() => {
                    achievementBox.classList.remove('show');
                }, 4000);
            }
        }
    }

    // (C) 答えを見るボタン
    if (showAnswersButton) {
        showAnswersButton.addEventListener('click', function() {
            if (!confirm('答えを表示しますか？（入力内容は上書きされます）')) return;

            quizInputs.forEach((input, index) => {
                if (index < correctAnswers.length) {
                    const answer = correctAnswers[index].split(',')[0];
                    input.value = answer;
                    input.style.backgroundColor = "";
                }
            });
            resultsArea.textContent = '答えを表示しました。';
        });
    }

    // (D) リセットボタン
    if (resetInputsButton) {
        resetInputsButton.addEventListener('click', function() {
            if (!confirm('入力内容をリセットしますか？')) return;

            document.getElementById('quiz-form').reset();
            resultsArea.textContent = '';
            quizInputs.forEach(input => input.style.backgroundColor = "");
        });
    }
});