document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // 1. 設定データ
    // ==========================================
    const SAVE_KEY = 'history_achievements'; // ブラウザ保存用キー
    
    // スペシャル実績（全コンプリート報酬）
    const SPECIAL_SAVE_ID = 'achv_grand_master_5'; 
    const SPECIAL_DOM_ID  = 'item-master-collector';

    // ★HTMLにある5つの実績IDを登録
    // (学習ページのJSで保存するIDと一致させています)
    const normalAchievements = [
        { domId: 'item-learning-prep',   saveId: 'achv_learning_prep' },        // 1. ペン
        { domId: 'item-colonial',        saveId: 'achv_colonial_quiz_master' }, // 2. 植民地
        { domId: 'item-asia-awakening',  saveId: 'achv_asia_awakening_master' },// 3. アジアの覚醒
        { domId: 'item-mass-society',    saveId: 'achv_mass_society_master' },  // 4. 大衆社会
        { domId: 'item-ww1',             saveId: 'achv_ww1_master' } ,           // 5. WW1
        { domId: 'achv_usa_society_master', saveId: 'achv_usa_society_master' }, // 6. ★今回追加：アメリカ繁栄
        { domId: 'achv_asia_migration_master', saveId: 'achv_asia_migration_master' }, // 7. アジアの成長と移民
        { domId: 'achv_anti_colonial_master', saveId: 'achv_anti_colonial_master' }

    ];

    // HTML要素の取得
    const notificationBox = document.getElementById('achievement-box'); // 右から出る通知
    const resetBtn = document.getElementById('reset-data-btn');         // リセットボタン
    
    // プログレスバー（進捗）用の要素
    const progressCountEl = document.getElementById('progress-count');
    const progressFillEl = document.getElementById('progress-fill');


    // ==========================================
    // 2. メイン処理
    // ==========================================

    // (1) データを取得
    let myData = JSON.parse(localStorage.getItem(SAVE_KEY)) || [];
    console.log("現在の獲得データ:", myData);

    // (2) 画面更新 & 進捗計算
    updateScreen(myData);

    // (3) コンプリート判定 & 通知
    checkAndUnlockSpecial(myData);

    // (4) リセットボタンの動作
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            if(confirm("【警告】\n全ての学習記録と実績データを削除しますか？\n（元には戻せません）")) {
                localStorage.removeItem(SAVE_KEY);
                alert("データをリセットしました。");
                location.reload();
            }
        });
    }


    // ==========================================
    // 3. 関数定義
    // ==========================================

    /**
     * 画面のカード色とプログレスバーを更新する
     */
    function updateScreen(currentData) {
        let acquiredCount = 0; // 獲得した通常実績の数

        // A. 通常実績 + スペシャル実績 の見た目更新
        const allItems = [...normalAchievements, { domId: SPECIAL_DOM_ID, saveId: SPECIAL_SAVE_ID }];

        allItems.forEach(item => {
            if (currentData.includes(item.saveId)) {
                // 通常実績のカウントアップ
                if (item.saveId !== SPECIAL_SAVE_ID) {
                    acquiredCount++;
                }

                // カードの見た目を変える
                const card = document.getElementById(item.domId);
                if (card) {
                    card.classList.remove('locked');
                    card.classList.add('unlocked');
                    
                    const badge = card.querySelector('.status-badge');
                    if (badge) {
                        badge.textContent = '獲得済';
                        badge.style.backgroundColor = '#28a745';
                    }
                }
            }
        });

        // B. プログレスバーの更新
        if (progressCountEl && progressFillEl) {
            // テキスト更新 (例: 3 / 5)
            progressCountEl.textContent = acquiredCount;
            
            // バーの長さ更新 (例: 60%)
            const total = normalAchievements.length;
            const percentage = (acquiredCount / total) * 100;
            progressFillEl.style.width = percentage + '%';
        }
    }

    /**
     * コンプリート条件をチェックして通知を出す
     */
    function checkAndUnlockSpecial(currentData) {
        // すでにスペシャル実績を持っているなら何もしない
        if (currentData.includes(SPECIAL_SAVE_ID)) {
            return; 
        }

        // 必要な通常実績をすべて持っているかチェック
        const hasAllNormal = normalAchievements.every(item => currentData.includes(item.saveId));

        if (hasAllNormal) {
            console.log("コンプリート達成！");
            
            // 1. データに追加して保存
            currentData.push(SPECIAL_SAVE_ID);
            localStorage.setItem(SAVE_KEY, JSON.stringify(currentData));

            // 2. 画面（スペシャルカード）を即座に更新
            updateScreen(currentData);

            // 3. 右から通知をスライドさせる
            if (notificationBox) {
                // ページ表示から少し遅らせて通知を出す演出
                setTimeout(() => {
                    notificationBox.classList.add('show');
                    
                    // 5秒後に自動で隠す
                    setTimeout(() => {
                        notificationBox.classList.remove('show');
                    }, 5000);
                }, 800);
            }
        }
    }
});