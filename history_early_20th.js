document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. 赤シート機能（CSS修正対応版） ---
    // bodyではなくmainタグにクラスをつける方式
    const redSheetButton = document.getElementById('red-sheet-toggle');
    const mainContent = document.querySelector('main');

    if (redSheetButton && mainContent) {
        redSheetButton.addEventListener('click', function() {
            mainContent.classList.toggle('red-sheet-active');
            
            if (mainContent.classList.contains('red-sheet-active')) {
                redSheetButton.textContent = '赤シート化 解除';
                redSheetButton.classList.add('active');
            } else {
                redSheetButton.textContent = '赤シート化 始動';
                redSheetButton.classList.remove('active');
            }
        });
    }

    // --- 2. クイズ機能 ---
    
    // 問題の正解リスト
    const correctAnswers = [
        "第2インターナショナル",    // q1
        "大逆事件",                // q2
        "血の日曜日事件",          // q3
        "ドゥーマ,国会",           // q4
        "三国協商",                // q5
        "青年トルコ革命",          // q6
        "孫文",                    // q7
        "中華民国",                // q8
        "袁世凱"                   // q9
    ];

    // 実績ID（achievements.jsに登録済みのものを使用）
    const ACHIEVEMENT_ID = 'achv_asia_awakening_master'; 
    const SAVE_KEY = 'history_achievements';

    const checkButton = document.getElementById('check-answers-btn');
    const quizInputs = document.querySelectorAll('.quiz-input');
    const resultsArea = document.getElementById('results-area');
    const showAnswersButton = document.getElementById('show-answers-btn');
    const resetInputsButton = document.getElementById('reset-inputs-btn');
    const achievementBox = document.getElementById('achievement-box');

    // (A) 答え合わせ
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

    // (B) 実績解除関数（スライド通知用）
    function unlockAchievement() {
        let myAchievements = JSON.parse(localStorage.getItem(SAVE_KEY)) || [];
        
        // まだ持っていない場合のみ処理
        if (!myAchievements.includes(ACHIEVEMENT_ID)) {
            myAchievements.push(ACHIEVEMENT_ID);
            localStorage.setItem(SAVE_KEY, JSON.stringify(myAchievements));
            
            // 通知ボックスを表示
            if(achievementBox) {
                achievementBox.classList.add('show');
                setTimeout(() => {
                    achievementBox.classList.remove('show');
                }, 4000); // 4秒後に引っ込む
            }
        }
    }

    // (C) 答えを見る
    if (showAnswersButton) {
        showAnswersButton.addEventListener('click', function() {
            if (!confirm('答えを表示しますか？')) return;
            quizInputs.forEach((input, index) => {
                if (index < correctAnswers.length) {
                    input.value = correctAnswers[index].split(',')[0];
                    input.style.backgroundColor = "";
                }
            });
        });
    }

    // (D) リセット
    if (resetInputsButton) {
        resetInputsButton.addEventListener('click', function() {
            if (!confirm('リセットしますか？')) return;
            document.getElementById('quiz-form').reset();
            resultsArea.textContent = '';
            quizInputs.forEach(input => input.style.backgroundColor = "");
        });
    }
});