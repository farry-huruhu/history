document.addEventListener('DOMContentLoaded', function() {

    // 1. すべてのアコーディオンボタン（.accordion-toggle）を取得
    const toggles = document.querySelectorAll('.accordion-toggle');

    // 2. 各ボタンにクリックイベントを設定
    toggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            
            // 2-1. ボタン自身の 'active' クラスを付け外し
            this.classList.toggle('active');
            
            // 2-2. 矢印（<span>）のテキストを切り替え
            const arrow = this.querySelector('.accordion-arrow');
            if (this.classList.contains('active')) {
                arrow.textContent = '↑';
            } else {
                arrow.textContent = '↓';
            }

            // 2-3. 対応するコンテンツ（<div class="index-content">）を取得
            // HTMLの data-target="#index-a-content" の値を取得
            const targetId = this.getAttribute('data-target');
            const content = document.querySelector(targetId);

            if (content) {
                // 2-4. コンテンツの表示/非表示を切り替え
                if (content.style.display === 'block') {
                    content.style.display = 'none';
                } else {
                    content.style.display = 'block';
                }
            }
        });
    });

    // --- ページ内ジャンプの挙動を調整 ---
    // （ジャンプしたときに、対応するアコーディオンを自動で開く）
    const hash = window.location.hash; // URLの #index-a などを取得
    
    if (hash) {
        // #index-a に対応するボタンを探す (例: h3#index-a の中の button)
        const targetButton = document.querySelector(hash + ' .accordion-toggle');
        
        if (targetButton) {
            // ボタンをクリックした時と同じ動作を実行
            targetButton.click();
        }
    }
    
});