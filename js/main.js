// 检查是否存在用户ID
document.addEventListener('DOMContentLoaded', function() {
    const userId = localStorage.getItem('lelandHealthUserId');
    
    // 如果存在用户ID且当前在首页，显示"继续我的计划"按钮
    if (userId && (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/'))) {
        const ctaSection = document.querySelector('.cta');
        if (ctaSection) {
            const ctaButton = ctaSection.querySelector('.btn');
            if (ctaButton) {
                ctaButton.textContent = '继续我的计划';
                ctaButton.href = 'dashboard.html?userId=' + userId;
            }
        }
    }
});
