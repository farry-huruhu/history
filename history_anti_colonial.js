document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. 赤シート機能 ---
    const redSheetButton = document.getElementById('red-sheet-toggle');
    const mainContent = document.querySelector('main'); // main全体を対象にする

    if (redSheetButton && mainContent) {
        redSheetButton.addEventListener('click', function() {
            mainContent.classList.toggle('red-sheet-active');
            
            // ボタンの見た目切り替え
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
    
    // 正解データ
    const correctAnswers = {
        q1: ['ムスタファ・ケマル', 'ケマル・パシャ', 'ケマル'],
        q2: ['レザー・ハーン', 'レザーハーン'],
        q3: ['ガンディー', 'ガンジー', 'マハトマ・ガンディー'],
        q4: ['三・一独立運動', '3・1独立運動'],
        q5: ['五・四運動', '5・4運動'],
        q6: ['蔣介石', '蒋介石'], // 漢字の異体字に対応
        q7: ['南京'],
        q8: ['山東出兵']
    };

    // 実績ID（このページ固有のもの）
    const ACHIEVEMENT_ID = 'achv_anti_colonial_master'; 
    const SAVE_KEY = 'history_achievements';

    const checkButton = document.getElementById('check-answers-btn');
    const showAnswersButton = document.getElementById('show-answers-btn');
    const resetInputsButton = document.getElementById('reset-inputs-btn');
    const resultsArea = document.getElementById('results-area');
    const achievementBox = document.getElementById('achievement-box');

    // (A) 答え合わせ
    if (checkButton) {
        checkButton.addEventListener('click', function() {
            let correctCount = 0;
            const totalQuestions = Object.keys(correctAnswers).length;

            for (let id in correctAnswers) {
                const input = document.getElementById(id);
                if (input) {
                    const userVal = input.value.replace(/\s+/g, ''); // 空白除去
                    
                    if (correctAnswers[id].includes(userVal)) {
                        input.style.backgroundColor = "#d4edda";
                        input.style.borderColor = "#28a745";
                        correctCount++;
                    } else {
                        input.style.backgroundColor = "#f8d7da";
                        input.style.borderColor = "#dc3545";
                    }
                }
            }
            
            // 結果表示
            if (correctCount === totalQuestions) {
                resultsArea.innerHTML = `<span style="color:green; font-weight:bold;">全問正解です！よくできました！</span>`;
                unlockAchievement();
            } else {
                resultsArea.innerHTML = `<span style="color:#d9534f; font-weight:bold;">${totalQuestions}問中 ${correctCount}問 正解。教科書をもう一度確認しましょう。</span>`;
            }
        });
    }

    // (B) 実績解除関数
    function unlockAchievement() {
        let myAchievements = JSON.parse(localStorage.getItem(SAVE_KEY)) || [];
        if (!myAchievements.includes(ACHIEVEMENT_ID)) {
            myAchievements.push(ACHIEVEMENT_ID);
            localStorage.setItem(SAVE_KEY, JSON.stringify(myAchievements));
            
            // 通知表示
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
            for (let id in correctAnswers) {
                const input = document.getElementById(id);
                if (input) {
                    input.value = correctAnswers[id][0];
                    input.style.backgroundColor = "#fff3cd";
                }
            }
            resultsArea.textContent = "";
        });
    }

    // (D) リセット
    if (resetInputsButton) {
        resetInputsButton.addEventListener('click', function() {
            if (!confirm('リセットしますか？')) return;
            document.getElementById('quiz-form').reset();
            resultsArea.textContent = '';
            const inputs = document.querySelectorAll('.quiz-input');
            inputs.forEach(input => {
                input.style.backgroundColor = "";
                input.style.borderColor = "";
            });
        });
    }
});