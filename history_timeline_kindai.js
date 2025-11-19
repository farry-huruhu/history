document.addEventListener('DOMContentLoaded', function() {
    
    // 赤シート機能
    const toggleButton = document.getElementById('red-sheet-toggle');
    const mainContent = document.querySelector('main');

    if (toggleButton && mainContent) {
        toggleButton.addEventListener('click', function() {
            // main要素に 'red-sheet-active' クラスを付けたり外したりする
            mainContent.classList.toggle('red-sheet-active');

            // ボタンの表示を「始動」「停止」で切り替える
            if (mainContent.classList.contains('red-sheet-active')) {
                toggleButton.textContent = '赤シート化（停止）';
                toggleButton.classList.add('active'); // CSSで色を変える
            } else {
                toggleButton.textContent = '赤シート化（始動）';
                toggleButton.classList.remove('active');
            }
        });
    }

});