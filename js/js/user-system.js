// 从URL获取用户ID
function getUserIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('userId');
}

// 保存用户ID到本地存储
function saveUserId(userId) {
    if (userId) {
        localStorage.setItem('lelandHealthUserId', userId);
        return true;
    }
    return false;
}

// 获取保存的用户ID
function getSavedUserId() {
    return localStorage.getItem('lelandHealthUserId');
}

// 检查用户是否已登录
function checkUserLogin() {
    const urlUserId = getUserIdFromUrl();
    const savedUserId = getSavedUserId();
    
    // 优先使用URL中的用户ID
    if (urlUserId) {
        saveUserId(urlUserId);
        return urlUserId;
    }
    
    // 其次使用保存的用户ID
    if (savedUserId) {
        return savedUserId;
    }
    
    // 如果都没有，则未登录
    return null;
}

// 预填充表单中的用户ID字段
function prefillUserId() {
    const userId = checkUserLogin();
    if (userId) {
        // 查找所有name或id包含'user'和'id'的输入字段
        const userIdFields = document.querySelectorAll('input[name*="user" i][name*="id" i], input[id*="user" i][id*="id" i]');
        userIdFields.forEach(field => {
            field.value = userId;
        });
    }
}

// 页面加载时执行
document.addEventListener('DOMContentLoaded', function() {
    // 检查用户登录状态
    const userId = checkUserLogin();
    
    // 如果在需要登录的页面但没有用户ID，重定向到注册页面
    const requiresLogin = document.body.classList.contains('requires-login');
    if (requiresLogin && !userId) {
        window.location.href = 'register.html';
    }
    
    // 预填充用户ID
    prefillUserId();
    
    // 显示用户ID（如果有显示区域）
    const userIdDisplay = document.getElementById('user-id-display');
    if (userIdDisplay && userId) {
        userIdDisplay.textContent = userId;
    }
});
