document.addEventListener('DOMContentLoaded', function() {
    
    // アンロックに必要なクリア回数
    const UNLOCK_THRESHOLD = 5;

    // 1. localStorageから各ゲームのクリア回数を取得
    // ( '|| 0' は、まだ記録がない場合に 0 を使うための処理)
    const reversePlayCount = parseInt(localStorage.getItem('gameReversePlayCount') || 0);
    const originalPlayCount = parseInt(localStorage.getItem('gameOriginalPlayCount') || 0);

    console.log(`逆ゲーム プレイ回数: ${reversePlayCount}`);
    console.log(`順ゲーム プレイ回数: ${originalPlayCount}`);

    // 2. 条件をチェック
    if (reversePlayCount >= UNLOCK_THRESHOLD && originalPlayCount >= UNLOCK_THRESHOLD) {
        
        // 3. 条件を満たしていたら、ミックスボタンのセクションを取得
        const mixGameSection = document.getElementById('mix-game-section');
        
        if (mixGameSection) {
            // 4. display: none; を解除して表示する
            mixGameSection.style.display = 'block';
            console.log('ミックスゲームをアンロックしました！');
        }
    }
});