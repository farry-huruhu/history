

    // ----- 1. 全問題データベース (全71問) -----
    window.addEventListener('load', function() {
        const allQuestions = [
        // --- テーマ1: 近代東アジア史 (13問) ---
        {id: 1, theme: "近代東アジア史", question: "1873年、西郷隆盛らの征韓論に対し、国内の近代化優先を唱えた中心人物は誰か？", answers: "大久保利通" },
        {id: 2, theme: "近代東アジア史", question: "日本が琉球の領有権を清に認めさせるきっかけとなった、1874年の軍事行動は？", answers: "台湾出兵" },
        {id: 3, theme: "近代東アジア史", question: "江華島事件をきっかけに1876年に結ばれ、朝鮮を「自主の国」と定めた条約は？", answers: "日朝修好条規" },
        {id: 4, theme: "近代東アジア史", question: "1882年、朝鮮の旧式軍隊が起こした反乱で、清の影響力が強まるきっかけとなった事件は？", answers: "壬午軍乱" },
        {id: 5, theme: "近代東アジア史", question: "1884年、金玉均ら独立党が日本の支援で起こしたクーデターで、清軍に鎮圧された事件は？", answers: "甲申事変" },
        {id: 6, theme: "近代東アジア史", question: "甲申事変とほぼ同時期に、ベトナムの宗主権をめぐり清が戦った相手国は？", answers: "フランス" },
        {id: 7, theme: "近代東アジア史", question: "甲申事変の事後処理で結ばれ、日清両国の朝鮮への共同出兵権を定めた条約は？", answers: "天津条約" },
        {id: 8, theme: "近代東アジア史", question: "清仏戦争後、フランスがベトナム・カンボジア・ラオスを統合して成立させた植民地の名称は？", answers: "フランス領インドシナ連邦,フランス領インドシナ" },
        {id: 9, theme: "近代東アジア史", question: "1871年、日本と清が対等な立場で結んだ条約は？", answers: "日清修好条規" },
        {id: 10, theme: "近代東アジア史", question: "1879年、日本が軍隊を派遣して琉球藩を廃止し、沖縄県を設置した出来事を何というか？", answers: "琉球処分" },
        {id: 11, theme: "近代東アジア史", question: "日朝修好条規が結ばれるきっかけとなった、1875年に日本が朝鮮の首都付近で起こした事件は？", answers: "江華島事件" },
        {id: 12, theme: "近代東アジア史", question: "甲申事変を主導した、朝鮮の親日派（独立党）の指導者は誰か？", answers: "金玉均" },
        {id: 13, theme: "近代東アジア史", question: "天津条約で、朝鮮半島への出兵権を日清両国が持つことを定めた相手国は？", answers: "清" },
        
        // --- テーマ2: 立憲制の広まり (11問) ---
        {id: 14, theme: "立憲制の広まり", question: "普仏戦争に勝利し、ドイツ帝国を成立させたプロイセンの宰相は誰か？", answers: "ビスマルク" },
        {id: 15, theme: "立憲制の広まり", question: "1861年にイタリア統一の中心となった王国は？", answers: "サルディニア王国,サルディニア,サルデーニャ王国,サルデーニャ" },
        {id: 76, theme: "立憲制の広まり", question: "1861年にサルディニア王国がイタリア統一後に変えた国名は？", answers: "サルディニア王国,サルディニア,サルデーニャ王国,サルデーニャ" },
        {id: 16, theme: "立憲制の広まり", question: "ドイツとの講和に反対したパリ民衆が蜂起して樹立した自治政府は？", answers: "パリ・コミューン,パリコミューン" },
        {id: 17, theme: "立憲制の広まり", question: "1876年にアジア初の憲法（ミドハト憲法）を発布したオスマン帝国の宰相は？", answers: "ミドハト・パシャ,ミドハトパシャ" },
        {id: 18, theme: "立憲制の広まり", question: "1881年、自由民権運動の高まりを受け、天皇が10年後の国会開設を約束した宣言は？", answers: "国会開設の勅諭" },
        {id: 19, theme: "立憲制の広まり", question: "伊藤博文が憲法草案のモデルとした、君主権の強いヨーロッパの国は？", answers: "プロイセン,ドイツ" },
        {id: 20, theme: "立憲制の広まり", question: "1889年に発布された、天皇が定めて国民に与える形式の憲法を何と呼ぶか？", answers: "欽定憲法" },
        {id: 21, theme: "立憲制の広まり", question: "大日本帝国憲法において、主権を持っていたのは誰か？", answers: "天皇" },
        {id: 22, theme: "立憲制の広まり", question: "ドイツ帝国憲法下で、皇帝を補佐し、議会に対してではなく皇帝に対してのみ責任を負う役職は？", answers: "宰相,帝国宰相" },
        {id: 23, theme: "立憲制の広まり", question: "パリ・コミューン鎮圧後、1875年憲法によって確立したフランスの政治体制は？", answers: "第三共和政" },
        {id: 24, theme: "立憲制の広まり", question: "ミドハト・パシャが発布した、オスマン帝国（アジア）初の近代的な憲法は？", answers: "ミドハト憲法" },
        {id: 73, theme: "立憲制の広まり", question: "日本で1889年に発布され、アジア初の近代憲法憲法は？", answers: "大日本帝国憲法" },

        // --- テーマ3: 帝国主義と植民地 (12問) ---
        {id: 25, theme: "帝国主義と植民地", question: "産業国が余剰資本の投資先を求め、植民地などに輸出したことを何というか？", answers: "資本の輸出" },
        {id: 26, theme: "帝国主義と植民地", question: "自国の力を強めるために、他国や他民族を政治的・経済的・軍事的に支配・抑圧し、領土や勢力を拡大しようとする思想や政策は？", answers: "帝国主義" },
        {id: 27, theme: "帝国主義と植民地", question: "植民地支配を正当化するために利用された、自らの人種の優越性を信じる思想は？", answers: "人種的優越意識" },
        {id: 28, theme: "帝国主義と植民地", question: "1882年、イギリスが占領したことでアフリカ分割の引き金となった国は？", answers: "エジプト" },
        {id: 29, theme: "帝国主義と植民地", question: "1884年、ビスマルクが提唱し、アフリカ分割の原則を定めた会議は？", answers: "ベルリン会議" },
        {id: 30, theme: "帝国主義と植民地", question: "アフリカ分割の中で、イタリアを破り独立を維持した国は？", answers: "エチオピア,エチオピア帝国" },
        {id: 31, theme: "帝国主義と植民地", question: "イギリスがエジプトと南アフリカを拠点として南北を貫く植民地の形成を出した政策はなんですか？", answers: "アフリカ縦断政策" },
        {id: 32, theme: "帝国主義と植民地", question: "イギリスの政治家でアフリカの植民地建設で活躍した人物は誰ですか", answers: "セシル・ローズ,セシルローズ" },
        {id: 33, theme: "帝国主義と植民地", question: "フランスがアルジェリアからサハラ砂漠を横断して東岸を目指した政策は？", answers: "アフリカ横断政策" },
        {id: 34, theme: "帝国主義と植民地", question: "アメリカ解放奴隷によって建国され、アフリカ分割の中で独立を維持した国は？", answers: "リベリア,リベリア共和国" },
        {id: 35, theme: "帝国主義と植民地", question: "アフリカ縦断政策を推進した国は？", answers: "イギリス" },
        {id: 36, theme: "帝国主義と植民地", question: "アフリカ横断政策を推進した国は？", answers: "フランス" },
        {id: 37, theme: "帝国主義と植民地", question: "露土戦争の講和条約に不満な英・墺の介入でドイツの宰相ビスマルクが開らいた会議は？", answers: "ベルリン会議" },
        {id: 71, theme: "帝国主義と植民地", question: "アフリカ横断政策を行った国は？", answers: "フランス" },
        {id: 72, theme: "帝国主義と植民地", question: "アフリカ縦断政策を行った国は？", answers: "イギリス" },

        // --- テーマ4: 日清戦争 (15問) ---
        {id: 38, theme: "日清戦争", question: "1894年、日清戦争の直接的なきっかけとなった朝鮮の農民反乱は？", answers: "甲午農民戦争" },
        {id: 39, theme: "日清戦争", question: "日清戦争の講和条約（1895年）を何というか？", answers: "下関条約" },
        {id: 40, theme: "日清戦争", question: "下関条約で日本に割譲されたが、三国干渉で清に返還することになった半島は？", answers: "遼東半島" },
        {id: 41, theme: "日清戦争", question: "下関条約で、清は朝鮮をどのような国として承認したか？", answers: "独立国,独立" },
        {id: 42, theme: "日清戦争", question: "下関条約に対し、ロシア・ドイツ・フランスが日本に介入した出来事は？", answers: "三国干渉" },
        {id: 43, theme: "日清戦争", question: "日清戦争直前、日本がイギリスと改正し、撤廃に成功した不平等な権利は？", answers: "治外法権,領事裁判権" },
        {id: 44, theme: "日清戦争", question: "日清戦争後、朝鮮半島で日本と対立し、影響力を強めた国は？", answers: "ロシア" },
        {id: 45, theme: "日清戦争", question: "1897年、朝鮮が華夷秩序からの脱退を宣言し、改めた新しい国号は？", answers: "大韓帝国" },
        {id: 46, theme: "日清戦争", question: "日清戦争の敗北後、清で康有為らが進めたが失敗に終わった改革運動は？", answers: "戊戌の政変,戊戌の変法" },
        {id: 47, theme: "日清戦争", question: "軍備拡張の予算案を通すため、議会との協力を目指した伊藤博文が結成した政党は？", answers: "立憲政友会" },
        {id: 48, theme: "日清戦争", question: "下関条約で清が日本に支払った賠償金は、主に何に使われたか？（2つ）", answers: "軍備拡張・八幡製鉄所の設立" },
        {id: 49, theme: "日清戦争", question: "戊戌の政変を弾圧し、保守派の中心となった清の皇太后は誰か？", answers: "西太后,西太后" },
        {id: 50, theme: "日清戦争", question: "甲午農民戦争をきっかけに勃発した、朝鮮の支配権をめぐる戦争は？", answers: "日清戦争" },
        {id: 51, theme: "日清戦争", question: "下関条約で日本が得た遼東半島の返還を要求した3カ国はどこか？(１カ国でも丸）", answers: "ロシア・ドイツ・フランス,ロシア,ドイツ,フランス,ロシア・フランス・ドイツ,ドイツ・ロシア・フランス,ドイツ・フランス・ロシア,フランス・ロシア・ドイツ,フランス・ドイツ・ロシア" },
        {id: 67, theme: "日清戦争", question: "下関条約で日本が得た遼東半島の返還を要求した3カ国はどこか？（完全回答）", answers: "ロシア・ドイツ・フランス,ロシア・フランス・ドイツ,ドイツ・ロシア・フランス,ドイツ・フランス・ロシア,フランス・ロシア・ドイツ,フランス・ドイツ・ロシア" },
        {id: 52, theme: "日清戦争", question: "戊戌の政変を主導した、康有為や梁啓超ら改革派がモデルとした国は？", answers: "日本" },
        {id: 76, theme: "日清戦争", question: "下関条約で出席した清の代表は？", answers: "李鴻章" },
        {id: 77, theme: "日清戦争", question: "下関条約で出席した日本の代表は？", answers: "伊藤博文" },

        // --- テーマ5: 帝国主義諸国の競合 (20問) ---
        {id: 53, theme: "帝国主義諸国の競合", question: "ビスマルク辞職後、海軍増強と世界政策を進めたドイツ皇帝は？", answers: "ヴィルヘルム2世" },
        {id: 54, theme: "帝国主義諸国の競合", question: "ドイツ・オーストリア・イタリアが結んだ同盟は？", answers: "三国同盟" },
        {id: 55, theme: "帝国主義諸国の競合", question: "ドイツの台頭を受け、イギリスが転換した伝統的な外交政策は？", answers: "光栄ある孤立" },
        {id: 56, theme: "帝国主義諸国の競合", question: "フランスとロシアが結んだ同盟は？", answers: "露仏同盟" },
        {id: 57, theme: "帝国主義諸国の競合", question: "イギリスとフランスが対立を解消して結んだ協商は？", answers: "英仏協商" },
        {id: 58, theme: "帝国主義諸国の競合", question: "米西戦争に勝利したアメリカが1898年に植民地化したアジアの地域は？", answers: "フィリピン" },
        {id: 59, theme: "帝国主義諸国の競合", question: "アメリカが中国市場への進出を求め、機会均等を主張した宣言は？", answers: "門戸開放宣言" },
        {id: 60, theme: "帝国主義諸国の競合", question: "「扶清滅洋」を掲げ、北京の公使館を包囲した農民組織は？", answers: "義和団" },
        {id: 61, theme: "帝国主義諸国の競合", question: "ロシアの満州占領に対抗するため、日本が1902年に結んだ同盟は?", answers: "日英同盟"},
        {id: 62, theme: "帝国主義諸国の競合", question: "日露戦争の講和条約は?", answers: "ポーツマス条約"},
        {id: 63, theme: "帝国主義諸国の競合", question: "ポーツマス条約で日本がロシアから得た領土（南半分）は?", answers: "樺太,南樺太"},
        {id: 64, theme: "帝国主義諸国の競合", question: "イギリス・フランス・ロシアが結成した協力関係を何というか？", answers: "三国同盟"},
        {id: 65, theme: "帝国主義諸国の競合", question: "イギリスとロシアが対立を解消した協商は？", answers: "英露協商"},
        {id: 66, theme: "帝国主義諸国の競合", question: "平和的な交渉を装いながらも、圧倒的な軍事力を背景にして自国の要求を強引に押し通す姿勢を指すアメリカの外交政策は？", answers: "棍棒外交"},
        {id: 68, theme: "帝国主義諸国の競合", question: "ロシアと日本の戦争を仲介した国は？", answers: "アメリカ、アメリカ合衆国"},
        {id: 69, theme: "帝国主義諸国の競合", question: "ポーツマス条約の調印を行った場所は？", answers: "ポーツマス,アメリカ,アメリカ合衆国"},
        {id: 70, theme: "帝国主義諸国の競合", question: "ロシアと日本の戦争を仲介したアメリカの大統領は？", answers: "ルーズベルト,ローズベルト"},
        {id: 74, theme: "帝国主義諸国の競合", question: "ハワイ諸島を初めて統一してハワイ王国を建国した初代国王は？", answers: "カメハメハ,カメハメハ大王"},
        {id: 75, theme: "帝国主義諸国の競合", question: "義和団が掲げたスローガンは？", answers: "扶清滅洋" },

        
        
        
    ];
    const QUIZ_LENGTH = 20; // 100問から20問を選んで出題
    const quizContainer = document.getElementById('quiz-container');
    const checkButton = document.getElementById('check-answers-btn');
    const reloadButton = document.getElementById('reload-quiz-btn');
    const resultsArea = document.getElementById('results-area');
    const resetInputsButton = document.getElementById('reset-inputs-btn');
    const fixButton = document.getElementById('fix-quiz-btn');
    
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
    let displayedQuestions = []; 

    // ----- 3. 関数定義 -----

    /**
     * 配列をシャッフルする
     */
    function shuffleArray(array) {
        const newArray = [...array]; 
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    /**
     * ボタンの状態を更新する (固定化/解除)
     */
    function updateButtonState(isFixed) {
        if (!fixButton || !reloadButton) return;
        if (isFixed) {
            fixButton.textContent = '固定解除';
            fixButton.classList.add('is-fixed'); 
            fixButton.disabled = false;
            reloadButton.disabled = true; 
        } else {
            fixButton.textContent = 'この問題を固定化';
            fixButton.classList.remove('is-fixed');
            fixButton.disabled = false;
            reloadButton.disabled = false;
        }
    }

    /**
     * クイズを生成して表示する
     */
    function generateQuiz() {

        // ★★★ (ここから) ロック機能 ★★★
        // (※これが「ランダム問題」の正しいロジックです)
        const mistakeList = JSON.parse(localStorage.getItem('mistakeQuizSet')) || [];

        if (mistakeList.length > 0) {
            // 復習問題が残っている場合、ページをロックする
            quizContainer.innerHTML = ''; // クイズを空にする
            resultsArea.textContent = `間違えた問題が ${mistakeList.length} 問残っています。\n先に「問題の復習」ページで復習を完了してください。`;
            resultsArea.style.color = '#dc3545'; // 赤色
            
            // すべての操作ボタンを無効化
            if(checkButton) checkButton.disabled = true;
            if(reloadButton) reloadButton.disabled = true;
            if(fixButton) fixButton.disabled = true;
            if(resetInputsButton) resetInputsButton.disabled = true;
            if(showAnswersButton) showAnswersButton.disabled = true;
            if(showPartialButton) showPartialButton.disabled = true;
            
            // 復習ページへのリンクを追加
            const reviewLink = document.createElement('a');
            reviewLink.href = 'history_comprehensive_review.html'; // 復習ページへのリンク
            reviewLink.textContent = '復習ページへ移動する';
            reviewLink.className = 'quiz-review-link';
            
            resultsArea.appendChild(document.createElement('br'));
            resultsArea.appendChild(reviewLink);

            return; // ★ クイズ生成をここで中断
        }
        // ★★★ (ここまで) ロック機能 ★★★


        // (↓) 以下は、復習問題が 0 件の場合のみ実行される
        quizContainer.innerHTML = '';
        resultsArea.textContent = '';
        currentQuizSet = [];

        if(showAnswersButton) showAnswersButton.disabled = true;
        if(showPartialButton) showPartialButton.disabled = true;
        if(checkButton) checkButton.disabled = false; 

        // 1. 固定化された問題セットを読み込む
        let savedQuestions = [];
        try {
            const savedQuestionsJSON = localStorage.getItem('fixedQuizSet');
            if (savedQuestionsJSON) {
                const parsedData = JSON.parse(savedQuestionsJSON);
                if (Array.isArray(parsedData) && parsedData.length === QUIZ_LENGTH) {
                    savedQuestions = parsedData;
                }
            }
        } catch (e) { localStorage.removeItem('fixedQuizSet'); } 

        // 2. 固定データがあるかで分岐
        if (savedQuestions.length === QUIZ_LENGTH) {
            displayedQuestions = savedQuestions; 
            updateButtonState(true);
        } else {
            // ★ 100問のプールからランダムに20問選ぶ
            const shuffledQuestions = shuffleArray(allQuestions);
            displayedQuestions = shuffledQuestions.slice(0, QUIZ_LENGTH); 
            updateButtonState(false);
        }

        // 3. HTML生成
        const ol = document.createElement('ol');
        displayedQuestions.forEach((q, index) => {
            currentQuizSet.push({
                inputId: `q${index}`,
                correctAnswers: q.answers.split(','), // カンマ区切りで複数の答えに対応
                questionId: q.id // ★ 間違い保存用にIDも保持
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
     * 答え合わせ
     */
    function checkAnswers() {
    let correctCount = 0;
    let newMistakeQuestions = []; // ★ 間違えた「問題オブジェクト」を保存

    // ★ 記号(・、,スペース)を全部消すための関数
    function normalize(str) {
        if (typeof str !== 'string') return "";
        // 中点・全角読点・半角カンマ・全角スペース・半角スペースを全て削除
        return str.replace(/・/g, "")
                  .replace(/、/g, "")
                  .replace(/,/g, "")
                  .replace(/　/g, "") // 全角スペース
                  .replace(/ /g, "");  // 半角スペース
    }

    displayedQuestions.forEach((question, index) => {
        const item = currentQuizSet[index]; 
        const inputElement = document.getElementById(item.inputId);
        const userAnswer = inputElement.value.trim();
        
        // ★ ユーザーの入力から記号を消す (例: "ロシア、ドイツ" -> "ロシアドイツ")
        const normalizedUserAnswer = normalize(userAnswer);

        inputElement.readOnly = true;
        
        // ★ 正解リスト(correctAnswers)を1つずつ取り出し、
        // ★ 記号を消したものがユーザー入力と一致するかチェック
        const isCorrect = item.correctAnswers.some(ans => {
            return normalize(ans) === normalizedUserAnswer;
        });

        if (isCorrect) {
            inputElement.classList.remove('incorrect');
            inputElement.classList.add('correct');
            correctCount++;
        } else {
            inputElement.classList.remove('correct');
            inputElement.classList.add('incorrect');
            // ★ 間違えた問題(q)を丸ごと保存
            newMistakeQuestions.push(question); 
        }
    });

    resultsArea.textContent = `結果：${QUIZ_LENGTH}問中、${correctCount}問正解です。`;

    // ボタンの状態を変更
    if(checkButton) checkButton.disabled = true;
    if(fixButton) fixButton.disabled = true;
    if(showAnswersButton) showAnswersButton.disabled = false;
    if(showPartialButton) showPartialButton.disabled = false;

    // ★★★ 'mistakeQuizSet' で保存 (重要) ★★★
    if (newMistakeQuestions.length > 0) {
        const oldMistakes = JSON.parse(localStorage.getItem('mistakeQuizSet')) || [];
        
        // ★ IDをキーにしてマージ（重複削除）
        const combinedMap = new Map();
        oldMistakes.forEach(q => combinedMap.set(q.id, q));
        newMistakeQuestions.forEach(q => combinedMap.set(q.id, q));
        
        const uniqueMistakes = Array.from(combinedMap.values());
        
        localStorage.setItem('mistakeQuizSet', JSON.stringify(uniqueMistakes));
        
        resultsArea.textContent += `\n（間違えた${newMistakeQuestions.length}問が「問題の復習」に追加されました）`;
        
        // 間違っていたら再挑戦もロック
        if (reloadButton) {
            reloadButton.disabled = true;
            reloadButton.title = '間違えた問題を先に復習してください';
        }
    }
}
    /**
     * （すべての）答えを表示する
     */
    function showAnswers() {
        if (!confirm('本当にすべての答えを表示しますか？')) { return; }
        currentQuizSet.forEach(item => {
            const inputElement = document.getElementById(item.inputId);
            const answer = item.correctAnswers[0]; // 代表の答えを一つ表示
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

        resultsArea.textContent = '';

        if(checkButton) checkButton.disabled = false; // 再度「答え合わせ」可能に
        
        // (答えを見るボタンは有効なまま)
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

    if (fixButton) {
        fixButton.addEventListener('click', function() {
            const isCurrentlyFixed = !!localStorage.getItem('fixedQuizSet');
            if (isCurrentlyFixed) {
                localStorage.removeItem('fixedQuizSet');
                updateButtonState(false);
                alert('固定を解除しました。');
            } else {
                localStorage.setItem('fixedQuizSet', JSON.stringify(displayedQuestions));
                updateButtonState(true);
                alert('この問題セットを固定しました。');
            }
        });
    }

    if (reloadButton) {
        reloadButton.addEventListener('click', function() {
            const mistakeList = JSON.parse(localStorage.getItem('mistakeQuizSet')) || [];
            if (mistakeList.length > 0) {
                alert('間違えた問題を先に復習してください。');
                return;
            }
            if (confirm('現在の問題セットを破棄して、新しい問題で再挑戦しますか？')) {
                localStorage.removeItem('fixedQuizSet'); // 固定を解除
                location.reload(); 
            }
        });
    }

    // モーダル用リスナー
    if (showPartialButton) showPartialButton.addEventListener('click', openPartialModal);
    if (modalCancelBtn) modalCancelBtn.addEventListener('click', closePartialModal);
    if (modalConfirmBtn) modalConfirmBtn.addEventListener('click', showPartialAnswers);

    // ----- 5. 初期化 -----
    generateQuiz(); // ★ ここでロック機能が実行されます
});