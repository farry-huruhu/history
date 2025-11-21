// --- 1. 国データ (ゲームB: 漢字→国名 専用) ---
const countryData = [
    { q: "米", a: ["アメリカ", "アメリカ合衆国"] },
    { q: "英", a: ["イギリス", "英国"] },
    { q: "仏", a: "フランス" },
    { q: "独", a: "ドイツ" },
    { q: "伊", a: "イタリア" },
    { q: "中", a: ["中国", "中華人民共和国"] },
    { q: "韓", a: ["韓国", "大韓民国"] },
    { q: "印", a: "インド" },
    { q: "豪", a: "オーストラリア" },
    { q: "露", a: "ロシア" },
    { q: "西", a: "スペイン" },
    { q: "蘭", a: "オランダ" },
    { q: "加", a: "カナダ" },
    { q: "伯", a: "ブラジル" },
    { q: "朝", a: ["北朝鮮", "朝鮮民主主義人民共和国"] },
    { q: "希", a: ["ギリシャ", "ギリシア"] },
    { q: "瑞", a: "スウェーデン" },
    { q: "泰", a: "タイ" },
    { q: "丁", a: "デンマーク" },
    { q: "土", a: "トルコ" },
    { q: "諾", a: "ノルウェー" },
    { q: "洪", a: "ハンガリー" },
    { q: "比", a: "フィリピン" },
    { q: "芬", a: "フィンランド" },
    { q: "勃", a: "ブルガリア" },
    { q: "普", a: "プロイセン" },
    { q: "越", a: "ベトナム" },
    { q: "秘", a: "ペルー" },
    { q: "墨", a: "メキシコ" },
    { q: "蒙", a: "モンゴル" },
    { q: "白", a: "ベルギー"},
    { q: "波", a: "ポーランド"},
    { q: "葡", a: "ポルトガル"},
    { q: "馬", a: "マレーシア"},
    { q: "緬", a: "ミャンマー"},
    { q: "墺", a: "オーストリア"},
];

// --- 2. HTML要素の取得 ---
const questionEl = document.getElementById('question');
const inputEl = document.getElementById('answer-input');
const checkBtn = document.getElementById('check-btn');
const resultEl = document.getElementById('result-container');
const correctScoreEl = document.getElementById('correct-score');
const incorrectScoreEl = document.getElementById('incorrect-score');

// --- 3. ゲームの状態 ---
const QUIZ_LENGTH = 10;
const CORRECT_WAIT_TIME = 1000; // 正解時の待ち時間 (1秒)
const INCORRECT_WAIT_TIME = 2000; // 不正解時の待ち時間 (2秒)

let correctScore = 0;
let incorrectScore = 0;
let currentQuestion = {};
let availableQuestions = []; // 出題リスト

// --- 4. 関数の定義 ---

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function startGame() {
    correctScore = 0;
    incorrectScore = 0;
    
    const shuffledData = shuffleArray(countryData);
    availableQuestions = shuffledData.slice(0, QUIZ_LENGTH);
    
    updateScore();
    loadNextQuestion();
}

function loadNextQuestion() {
    // もし全問解き終わったら
    if (availableQuestions.length === 0) {
        questionEl.textContent = `全${QUIZ_LENGTH}問 終了！`;
        
        resultEl.innerHTML = `最終スコア: ${correctScore} / ${QUIZ_LENGTH} 問正解`;
        resultEl.className = 'correct'; 

        inputEl.style.display = 'none'; 
        checkBtn.textContent = 'もう一度挑戦する'; 
        checkBtn.disabled = false; 
        checkBtn.onclick = () => location.reload(); 

        
        // ★★★ アンロック機能のための記録コード ★★★
        const currentCount = parseInt(localStorage.getItem('gameOriginalPlayCount') || 0);
        localStorage.setItem('gameOriginalPlayCount', currentCount + 1);
        console.log(`「順ゲーム」のクリア回数を ${currentCount + 1} に更新しました。`);
        // ★★★ ここまで ★★★

        return;
    }

    // 次の問題を取得
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions.splice(randomIndex, 1)[0];

    // 画面に表示
    questionEl.textContent = currentQuestion.q;
    
    // 入力欄とボタンをリセット
    inputEl.value = '';
    inputEl.disabled = false;
    resultEl.textContent = '';
    resultEl.className = '';
    inputEl.focus(); 

    checkBtn.disabled = false; 
}

/** 答えを判定する関数 */
function checkAnswer() {
    const userAnswer = inputEl.value.trim();
    const correctAnswer = currentQuestion.a; // 答えは配列か文字列

    if (userAnswer === '') return; 

    // ★ カタカナ・ひらがなを区別しないように、両方カタカナに変換して比較 (おまけ)
    const normalizedUserAnswer = toKatakana(userAnswer);

    inputEl.disabled = true;
    checkBtn.disabled = true;

    let waitTime;
    let isCorrect = false;

    // 答えのチェック (配列 or 文字列)
    if (Array.isArray(correctAnswer)) {
        // 配列の場合、配列内のどれか(をカタカナ変換したもの)と一致すればOK
        if (correctAnswer.some(ans => toKatakana(ans) === normalizedUserAnswer)) {
            isCorrect = true;
        }
    } else {
        // 文字列の場合
        if (toKatakana(correctAnswer) === normalizedUserAnswer) {
            isCorrect = true;
        }
    }

    if (isCorrect) {
        resultEl.textContent = '正解！';
        resultEl.className = 'correct';
        correctScore++;
        waitTime = CORRECT_WAIT_TIME;
    } else {
        // 不正解時は答えを表示 (配列の場合は最初の答えを表示)
        const displayAnswer = Array.isArray(correctAnswer) ? correctAnswer[0] : correctAnswer;
        resultEl.innerHTML = `不正解... <br> 答えは「${displayAnswer}」です。`;
        resultEl.className = 'incorrect';
        incorrectScore++;
        waitTime = INCORRECT_WAIT_TIME; 
    }

    updateScore();
    setTimeout(loadNextQuestion, waitTime);
}

function updateScore() {
    correctScoreEl.textContent = correctScore;
    incorrectScoreEl.textContent = incorrectScore;
}

/** ひらがなをカタカナに変換する関数 */
function toKatakana(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/[\u3041-\u3096]/g, char => 
        String.fromCharCode(char.charCodeAt(0) + 0x60)
    );
}

// --- 5. イベントリスナーの設定 ---
document.addEventListener('DOMContentLoaded', startGame);
checkBtn.addEventListener('click', checkAnswer);
inputEl.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !inputEl.disabled) {
        checkAnswer();
    }
});