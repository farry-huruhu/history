document.addEventListener('DOMContentLoaded', function() {

    // ----- 1. 問題データ (★ 100問のリストは削除しました) -----
    // (localStorageから直接読み込むため、ここでは不要)

    // ----- 2. グローバル変数 & 要素取得 -----
    let QUIZ_LENGTH = 0; // ★ 復習問題の数 (動的に変化)
    const quizContainer = document.getElementById('quiz-container');
    const checkButton = document.getElementById('check-answers-btn');
    const reloadButton = document.getElementById('reload-quiz-btn');
    const resultsArea = document.getElementById('results-area');
    const resetInputsButton = document.getElementById('reset-inputs-btn');
    
    // 答えを見るボタン（ロック用）
    const showAnswersButton = document.getElementById('show-answers-btn');
    const showPartialButton = document.getElementById('show-partial-btn');

    // モーダル用要素
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalContent = document.getElementById('modal-content');
    const modalCheckboxesContainer = document.getElementById('modal-checkboxes-container');
    const modalConfirmBtn = document.getElementById('modal-confirm-btn');
    const modalCancelBtn = document.getElementById('modal-cancel-btn');
    
    let currentQuizSet = []; 
    let displayedQuestions = []; // ★ `mistakeQuizSet` がここに入る

    // ----- 3. 関数定義 -----

    /**
     * クイズを生成して表示する (★復習専用ロジック)
     */
    function generateQuiz() {

        // ★★★ (ここから) 復習ロジック ★★★
        // 1. `mistakeQuizSet` (問題オブジェクトの配列) を読み込む
        displayedQuestions = JSON.parse(localStorage.getItem('mistakeQuizSet')) || [];
        QUIZ_LENGTH = displayedQuestions.length; // 問題数をセット

        if (QUIZ_LENGTH === 0) {
            // 2. 復習問題が 0件 の場合、ページをロック
            quizContainer.innerHTML = ''; 
            resultsArea.textContent = 'おめでとうございます！復習する問題は残っていません。';
            resultsArea.style.color = '#28a745'; // 緑色
            
            // すべての操作ボタンを無効化
            if(checkButton) checkButton.disabled = true;
            if(reloadButton) reloadButton.disabled = true;
            if(resetInputsButton) resetInputsButton.disabled = true;
            if(showAnswersButton) showAnswersButton.disabled = true;
            if(showPartialButton) showPartialButton.disabled = true;
            
            // メニューに戻るリンクを表示
            const menuLink = document.createElement('a');
            menuLink.href = 'history_comprehensive_menu.html'; 
            menuLink.textContent = '総合問題メニューに戻る';
            menuLink.className = 'back-to-menu-link';
            
            resultsArea.appendChild(document.createElement('br'));
            resultsArea.appendChild(menuLink);

            return; // ★ クイズ生成をここで中断
        }
        // ★★★ (ここまで) 復習ロジック ★★★


        // (↓) 以下は、復習問題が 1件以上 ある場合のみ実行される
        quizContainer.innerHTML = '';
        resultsArea.textContent = `復習問題が ${QUIZ_LENGTH} 問あります。`;
        currentQuizSet = [];

        if(showAnswersButton) showAnswersButton.disabled = true;
        if(showPartialButton) showPartialButton.disabled = true;
        if(checkButton) checkButton.disabled = false; 

        // 3. HTML生成
        const ol = document.createElement('ol');
        displayedQuestions.forEach((q, index) => {
            currentQuizSet.push({
                inputId: `q${index}`,
                correctAnswers: q.answers.split(','), 
                questionId: q.id 
            });
            const li = document.createElement('li');
            const themeTag = document.createElement('span');
            themeTag.className = 'quiz-theme-tag';
            themeTag.textContent = q.theme;
            const label = document.createElement('label');
            label.htmlFor = `q${index}`;
            label.textContent = q.question;
            const input = document.createElement('input');
            input.type = 'text';
            input.id = `q${index}`;
            input.className = 'quiz-input';
            li.appendChild(themeTag);
            li.appendChild(label);
            li.appendChild(input);
            ol.appendChild(li);
        });
        quizContainer.appendChild(ol);
    }

    /**
     * 答え合わせ (★復習専用ロジック)
     */
    function checkAnswers() {
        let correctCount = 0;
        let remainingMistakes = []; // ★ まだ間違えている問題リスト

        displayedQuestions.forEach((question, index) => {
            const item = currentQuizSet[index]; 
            const inputElement = document.getElementById(item.inputId);
            const userAnswer = inputElement.value.trim();
            
            inputElement.readOnly = true;
            
            if (item.correctAnswers.includes(userAnswer)) {
                // 正解
                inputElement.classList.remove('incorrect');
                inputElement.classList.add('correct');
                correctCount++;
                // ★ 正解した問題は、remainingMistakes に「追加しない」（＝リストから削除）
            } else {
                // 不正解
                inputElement.classList.remove('correct');
                inputElement.classList.add('incorrect');
                // ★ 不正解だった問題は、remainingMistakes に「追加する」（＝リストに残す）
                remainingMistakes.push(question); 
            }
        });

        // ★★★ (ここが最重要) 新しい復習リストを上書き保存 ★★★
        localStorage.setItem('mistakeQuizSet', JSON.stringify(remainingMistakes));
        // ★★★ ここまで ★★★

        // 結果表示
        const clearedCount = QUIZ_LENGTH - remainingMistakes.length;
        resultsArea.textContent = `結果：${QUIZ_LENGTH}問中、${correctCount}問正解しました。\n（${clearedCount} 問を復習リストから削除しました）`;
        
        if (remainingMistakes.length === 0) {
             resultsArea.textContent += '\nおめでとうございます！すべての復習が完了しました。';
             // メニューに戻るリンクを表示
            const menuLink = document.createElement('a');
            menuLink.href = 'history_comprehensive_menu.html'; 
            menuLink.textContent = '総合問題メニューに戻る';
            menuLink.className = 'back-to-menu-link';
            resultsArea.appendChild(document.createElement('br'));
            resultsArea.appendChild(menuLink);
        }

        // ボタンの状態を変更
        if(checkButton) checkButton.disabled = true;
        if(showAnswersButton) showAnswersButton.disabled = false;
        if(showPartialButton) showPartialButton.disabled = false;
        if(reloadButton) reloadButton.disabled = false; // リロード（次の復習）を許可
    }

    /**
     * （すべての）答えを表示する
     */
    function showAnswers() {
        if (!confirm('本当にすべての答えを表示しますか？')) { return; }
        currentQuizSet.forEach(item => {
            const inputElement = document.getElementById(item.inputId);
            const answer = item.correctAnswers[0]; 
            inputElement.value = answer;
            inputElement.classList.remove('correct', 'incorrect');
        });
        resultsArea.textContent = 'すべての答えを表示しました。';
    }

    /**
     * 回答リセット (答えを見るボタンは有効なまま)
     */
    function resetInputs() {
        if (!confirm('本当に入力内容をすべてリセットしますか？\n（採点結果が消去されます）')) {
            return;
        }

        currentQuizSet.forEach(item => {
            const inputElement = document.getElementById(item.inputId);
            inputElement.value = ''; 
            inputElement.classList.remove('correct', 'incorrect');
            inputElement.readOnly = false; 
        });

        resultsArea.textContent = `復習問題が ${QUIZ_LENGTH} 問あります。`;

        if(checkButton) checkButton.disabled = false; // 再度「答え合わせ」可能に
    }
    
    /**
     * 1. モーダルを開く関数
     */
    function openPartialModal() {
        modalCheckboxesContainer.innerHTML = '';
        for (let i = 0; i < QUIZ_LENGTH; i++) {
            const questionNumber = i + 1;
            const label = document.createElement('label');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox'; checkbox.value = i; checkbox.id = `chk-${i}`;
            label.htmlFor = `chk-${i}`;
            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(` ${questionNumber}`));
            modalCheckboxesContainer.appendChild(label);
        }
        modalBackdrop.style.display = 'block';
        modalContent.style.display = 'block';
    }

    /**
     * 2. モーダルを閉じる関数
     */
    function closePartialModal() {
        modalBackdrop.style.display = 'none';
        modalContent.style.display = 'none';
    }

    /**
     * 3. 選択された答えを表示する関数
     */
    function showPartialAnswers() {
        const checkedCheckboxes = document.querySelectorAll('#modal-checkboxes-container input[type="checkbox"]:checked');
        if (checkedCheckboxes.length === 0) {
            alert('問題番号が選択されていません。'); return;
        }
        checkedCheckboxes.forEach(checkbox => {
            const index = parseInt(checkbox.value, 10);
            const item = currentQuizSet[index];
            if (item) {
                const inputElement = document.getElementById(item.inputId);
                const answer = item.correctAnswers[0]; 
                inputElement.value = answer;
                inputElement.classList.remove('correct', 'incorrect');
            }
        });
        closePartialModal();
    }

    // ----- 4. イベントリスナーの設定 -----
    
    if (checkButton) checkButton.addEventListener('click', checkAnswers);
    if (showAnswersButton) showAnswersButton.addEventListener('click', showAnswers); 
    if (resetInputsButton) resetInputsButton.addEventListener('click', resetInputs);

    if (reloadButton) {
        reloadButton.addEventListener('click', function() {
            location.reload(); 
        });
    }

    // モーダル用リスナー
    if (showPartialButton) showPartialButton.addEventListener('click', openPartialModal);
    if (modalCancelBtn) modalCancelBtn.addEventListener('click', closePartialModal);
    if (modalConfirmBtn) modalConfirmBtn.addEventListener('click', showPartialAnswers);

    // ----- 5. 初期化 -----
    generateQuiz(); // ★ ここで復習ロジックが実行されます
});