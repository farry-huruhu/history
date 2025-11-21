// --- 1. 国データ (全25問のプール) ---
const countryData = [
    { fullName: ["アメリカ","アメリカ合衆国"], kanji: "米" },
    { fullName: "イギリス", kanji: "英" },
    { fullName: "フランス", kanji: "仏" },
    { fullName: "ドイツ", kanji: "独" },
    { fullName: "イタリア", kanji: "伊" },
    { fullName: "ロシア", kanji: "露" },
    { fullName: ["中国","中華人民共和国"], kanji: "中" },
    { fullName: "韓国", kanji: "韓" },
    { fullName: "インド", kanji: "印" },
    { fullName: "オーストラリア", kanji: "豪" },
    { fullName: "カナダ", kanji: "加" },
    { fullName: "スペイン", kanji: "西" },
    { fullName: "ポルトガル", kanji: "葡" },
    { fullName: "オランダ", kanji: "蘭" },
    { fullName: "ベルギー", kanji: "白" },
    { fullName: "スウェーデン", kanji: "端" },
    { fullName: "ベトナム", kanji: "越" },
    { fullName: "タイ", kanji: "泰" },
    { fullName: "フィリピン", kanji: "比" },
    { fullName: "トルコ", kanji: "土" },
    { fullName: "ギリシャ", kanji: "希" },
    { fullName: "メキシコ", kanji: "墨" },
    { fullName: "ブラジル", kanji: "伯" },
    { fullName: ["北朝鮮","北朝鮮民主主義人民共和国"], kanji: "朝" },
    { fullName: "プロイセン", kanji: "普" },
    { fullName: "オーストリア", kanji: "墺" },
    { fullName: "ブルガリア", kanji: "勃" },
    { fullName: "デンマーク", kanji: "丁" },
    { fullName: "ノルウェー", kanji: "諾" },
    { fullName: "ハンガリー", kanji: "洪" },
    { fullName: "フィンランド",kanji: "芬" },
    { fullName: "ペルー", kanji: "秘" },
    { fullName : "モンゴル", kanji: "蒙" },
    { fullName: "ポーランド", kanji: "波"},
    { fullName: "マレーシア",kanji: "馬"},
    { fullName: "ミャンマー", kanji: "緬"},
    
];

// --- 2. HTML要素の取得 ---
// (script.jsがbodyの最後で読み込まれるため、この時点で要素は存在します)
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

/** 配列をシャッフルする関数 (Fisher-Yates) */
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

/** ゲームを開始（リセット）する関数 */
function startGame() {
    correctScore = 0;
    incorrectScore = 0;
    
    const shuffledData = shuffleArray(countryData);
    availableQuestions = shuffledData.slice(0, QUIZ_LENGTH);
    
    updateScore();
    loadNextQuestion();
}

/** 次の問題を読み込む関数 */
function loadNextQuestion() {
    // もし全問解き終わったら
    if (availableQuestions.length === 0) {
        questionEl.textContent = `全${QUIZ_LENGTH}問 終了！`;
        
        // 最終スコアを表示
        resultEl.innerHTML = `最終スコア: ${correctScore} / ${QUIZ_LENGTH} 問正解`;
        resultEl.className = 'correct'; // 緑色で表示

        inputEl.style.display = 'none'; // 入力欄を隠す
        checkBtn.textContent = 'もう一度挑戦する'; // ボタンの文字を変える
        checkBtn.disabled = false; // ボタンを有効化
        checkBtn.onclick = () => location.reload(); // リロードして再開
        // 1. 現在のクリア回数を取得 (なければ 0)
        const currentCount = parseInt(localStorage.getItem('gameReversePlayCount') || 0);
        // 2. 回数を+1して保存
        localStorage.setItem('gameReversePlayCount', currentCount + 1);
        // 3. ログ（確認用）
        console.log(`「逆ゲーム」のクリア回数を ${currentCount + 1} に更新しました。`);

        return;
    }

    // 次の問題を取得
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions.splice(randomIndex, 1)[0];

    // 画面に表示
    questionEl.textContent = currentQuestion.fullName;
    
    // 入力欄とボタンをリセット
    inputEl.value = '';
    inputEl.disabled = false;
    resultEl.textContent = '';
    resultEl.className = '';
    inputEl.focus(); // 入力欄に自動でカーソルを合わせる

    checkBtn.disabled = false; // 「判定！」ボタンを有効化
}

/** 答えを判定する関数 */
function checkAnswer() {
    const userAnswer = inputEl.value.trim();
    const correctAnswer = currentQuestion.kanji;

    if (userAnswer === '') return; // 何も入力されていなければ何もしない

    // 判定中はボタンと入力欄を無効化 (連打防止)
    inputEl.disabled = true;
    checkBtn.disabled = true;

    let waitTime; // 待機時間

    // 正解・不正解の処理
    if (userAnswer === correctAnswer) {
        resultEl.textContent = '正解！';
        resultEl.className = 'correct';
        correctScore++;
        waitTime = CORRECT_WAIT_TIME; // 1秒
    } else {
        // 不正解時は答えを表示
        resultEl.innerHTML = `不正解... <br> 答えは「${correctAnswer}」です。`;
        resultEl.className = 'incorrect';
        incorrectScore++;
        waitTime = INCORRECT_WAIT_TIME; // 2秒
    }

    // スコア更新
    updateScore();

    // 指定時間 (waitTime) が経過した後、次の問題へ
    setTimeout(loadNextQuestion, waitTime);
}

/** スコアを画面に反映する関数 */
function updateScore() {
    correctScoreEl.textContent = correctScore;
    incorrectScoreEl.textContent = incorrectScore;
}

// --- 5. イベントリスナーの設定 ---

// ページが読み込まれたらゲーム開始
// (script.jsはDOMの読み込み *後* に実行されるが、念のため DOMContentLoaded を使う)
document.addEventListener('DOMContentLoaded', startGame);

// 「判定！」ボタンを押した時
checkBtn.addEventListener('click', checkAnswer);

// 入力欄でEnterキーを押した時も判定する
inputEl.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        // 入力欄が有効な時 (disabledじゃない時) だけEnterを有効にする
        if (!inputEl.disabled) {
            checkAnswer();
        }
    }
});