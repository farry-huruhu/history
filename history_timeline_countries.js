// DOM（HTML）の読み込みが完了したら実行
document.addEventListener('DOMContentLoaded', function() {

    // ★ 赤シート機能のコード ★
    const redSheetButton = document.getElementById('red-sheet-toggle');
    const mainContent = document.querySelector('main');

    if (redSheetButton) { // ボタンがあるページでのみ実行
        redSheetButton.addEventListener('click', function() {
            // 'red-sheet-active' クラスを main に付けたり消したりする
            mainContent.classList.toggle('red-sheet-active');
            
            // ボタンの状態とテキストを変更
            if (mainContent.classList.contains('red-sheet-active')) {
                redSheetButton.textContent = '赤シート化 停止';
                redSheetButton.classList.add('active');
            } else {
                redSheetButton.textContent = '赤シート化 始動';
                redSheetButton.classList.remove('active');
            }
        });
    }

});