document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. 赤シート機能（修正版） ---
    // CSSに合わせて、bodyではなく「mainタグ」に「red-sheet-active」クラスをつけます
    const redSheetButton = document.getElementById('red-sheet-toggle');
    const mainContent = document.querySelector('main'); // mainタグを取得

    if (redSheetButton && mainContent) {
        redSheetButton.addEventListener('click', function() {
            // mainタグにクラスをつけ外しする
            mainContent.classList.toggle('red-sheet-active');
            
            // クラスがついているかでボタンの文字を変える
            if (mainContent.classList.contains('red-sheet-active')) {
                redSheetButton.textContent = '赤シート化 解除';
                redSheetButton.classList.add('active');
            } else {
                redSheetButton.textContent = '赤シート化 始動';
                redSheetButton.classList.remove('active');
            }
        });
    }

    // --- 2. クイズ機能（ここは以前と同じ） ---
    
    const correctAnswers = [
        "総力戦",                      // q1
        "大衆社会",                    // q2
        "教育,教育の義務",             // q3
        "マスメディア,マス・メディア",  // q4
        "普通選挙",                    // q5
        "ゆりかご,揺り籠"              // q6
    ];

    const ACHIEVEMENT_ID = 'achv_mass_society_master'; 
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

    // (B) 実績解除関数
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