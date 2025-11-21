// --- 1. 国データ (全25問のプール) ---
const countryData = [
    { q: ["アメリカ","アメリカ合衆国"], a: "米" },
    { q: "イギリス", a: "英" },
    { q: "フランス", a: "仏" },
    { q: "ドイツ", a: "独" },
    { q: "イタリア", a: "伊" },
    { q: "ロシア", a: "露" },
    { q: ["中国","中華人民共和国"], a: "中" },
    { q: ["韓国","大韓民国"], a: "韓" },
    { q: "インド", a: "印" },
    { q: "オーストラリア", a: "豪" },
    { q: "カナダ", ai: "加" },
    { q: "スペイン", a: "西" },
    { q: "ポルトガル", a: "葡" },
    { q: "オランダ", a: "蘭" },
    { q: "ベルギー", a: "白" },
    { q: "スウェーデン", a: "端" },
    { q: "ベトナム", a: "越" },
    { q: "タイ", a: "泰" },
    { q: "フィリピン", a: "比" },
    { q: "トルコ", a: "土" },
    { q: ["ギリシャ","ギリシア"], a: "希" },
    { q: "メキシコ", a: "墨" },
    { q: "ブラジル", a: "伯" },
    { q: ["北朝鮮","北朝鮮民主主義人民共和国"], a: "朝" },
    { q: "プロイセン", a: "普" },
    { q: "オーストリア", a: "墺" },
    { q: "ブルガリア", a: "勃" },
    { q: "デンマーク", a: "丁" },
    { q: "ノルウェー", a: "諾" },
    { q: "ハンガリー", a: "洪" },
    { q: "フィンランド", a: "芬" },
    { q: "ペルー", a: "秘" },
    { q: "モンゴル", a: "蒙" },
    { q: "ポーランド", a: "波"},
    { q: "マレーシア", a: "馬"},
    { q: "ミャンマー", a: "緬"},
];

// ( ... ここまでは const countryData = [...] のデータリスト ... )


// --- 2. HTML要素の取得 ---
const questionEl = document.getElementById('question');
const questionLabelEl = document.getElementById('question-label');
const inputEl = document.getElementById('answer-input');
const checkBtn = document.getElementById('check-btn');
const resultEl = document.getElementById('result-container');
const correctScoreEl = document.getElementById('correct-score');
const incorrectScoreEl = document.getElementById('incorrect-score');

// --- 3. ゲームの状態 ---
const QUIZ_LENGTH_PER_TYPE = 10; // 各タイプ10問
const TOTAL_QUIZ_LENGTH = QUIZ_LENGTH_PER_TYPE * 2; // 合計20問
const CORRECT_WAIT_TIME = 1000;
const INCORRECT_WAIT_TIME = 2000;

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

/** ゲームを開始（リセット）する関数 */
// ★ (q/a 形式に修正済み) ★
function startGame() {
    correctScore = 0;
    incorrectScore = 0;
    
    // 1. 全データをシャッフル
    const shuffledData = shuffleArray(countryData);
    
    // 2. 「逆」の問題 (国名→漢字) を10問作成
    //    (q: item.a , a: item.q に変更)
    const reverseQuestions = shuffledData.slice(0, QUIZ_LENGTH_PER_TYPE).map(item => ({
        type: 'reverse', 
        q: item.q, // 問題に「国名」を使う
        a: item.a, // 答えに「漢字」を使う
        label: 'この国を漢字一文字で表すと？',
        placeholder: '漢字一文字を入力',
        maxLength: 1
    }));
    
    // 3. 「順」の問題 (漢字→国名) を10問作成
    //    (q: item.q , a: item.a に変更)
    const originalQuestions = shuffledData.slice(QUIZ_LENGTH_PER_TYPE, TOTAL_QUIZ_LENGTH).map(item => ({
        type: 'original', 
        q: item.a, // 問題に「漢字」を使う
        a: item.q, // 答えに「国名」を使う
        label: 'この漢字が表す国名は？',
        placeholder: '国名をカタカナで入力',
        maxLength: 20
    }));

    // 4. 20問を結合し、再度シャッフル
    availableQuestions = shuffleArray([...reverseQuestions, ...originalQuestions]);
    
    updateScore();
    loadNextQuestion();
}

/** 次の問題を読み込む関数 */
// ★ (q/a 形式に修正済み) ★
function loadNextQuestion() {
    if (availableQuestions.length === 0) {
        questionEl.textContent = `全${TOTAL_QUIZ_LENGTH}問 終了！`;
        questionLabelEl.style.display = 'none'; // ラベルを隠す
        resultEl.innerHTML = `最終スコア: ${correctScore} / ${TOTAL_QUIZ_LENGTH} 問正解`;
        resultEl.className = 'correct';
        inputEl.style.display = 'none';
        checkBtn.textContent = 'もう一度挑戦する';
        checkBtn.disabled = false;
        checkBtn.onclick = () => location.reload();
        return;
    }

    // 次の問題（ミックスされたもの）を取得
    currentQuestion = availableQuestions.pop();

    // 問題タイプに応じて画面表示を変更
    questionLabelEl.textContent = currentQuestion.label;
    
    // ★ qが配列だったら、最初の要素を表示 (例: "アメリカ")
    if (Array.isArray(currentQuestion.q)) {
        questionEl.textContent = currentQuestion.q[0];
    } else {
        questionEl.textContent = currentQuestion.q;
    }
    
    inputEl.placeholder = currentQuestion.placeholder;
    inputEl.maxLength = currentQuestion.maxLength;

    // リセット
    inputEl.value = '';
    inputEl.disabled = false;
    resultEl.textContent = '';
    resultEl.className = '';
    inputEl.focus();
    checkBtn.disabled = false;
}

/** 答えを判定する関数 */
// ★ (q/a 形式に修正済み) ★
function checkAnswer() {
    const userAnswer = inputEl.value.trim();
    // ★ カタカナ・ひらがなを区別しないように、両方カタカナに変換して比較
    const normalizedUserAnswer = toKatakana(userAnswer);
    const correctAnswer = currentQuestion.a; // 答えは配列か文字列

    if (userAnswer === '') return;

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

/** スコアを画面に反映する関数 */
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