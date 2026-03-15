/* 전역 변수 설정 */
let failCount = 0;

/* 만능 메시지 함수 */
function showMessage(element, text, type) {
    if (!element) return;
    element.textContent = text;
    element.className = `form-message ${type}`; 
}

/* 화면 상태 렌더링 함수 */
function renderLoginState() {
    const currentUser = localStorage.getItem('moodmentCurrentUser');
    const loginForm = document.querySelector('.login-container'); 
    const statusBox = document.querySelector('.status-box');    
    const statusText = document.querySelector('.status-text');
    const signupLink = document.querySelector('.signup-btn');

    if (currentUser) {
        if(loginForm) loginForm.style.display = 'none';
        if(signupLink) signupLink.style.display = 'none';
        if(statusBox) statusBox.style.display = 'block';
        if(statusText) statusText.innerText = `현재 ${currentUser} 계정으로 로그인되어 있습니다.`;
    } else {
        if(loginForm) loginForm.style.display = 'block';
        if(signupLink) signupLink.style.display = 'inline-block';
        if(statusBox) statusBox.style.display = 'none';
    }
}

/* 입력 감지 시 메시지 초기화 */
function setupInputListeners() {
    const inputs = document.querySelectorAll('input');
    const messageBox = document.getElementById('login-message');

    inputs.forEach(input => {
        input.addEventListener('input', () => {
            // 사용자가 타이핑을 시작하면 메시지를 투명하게 비움
            showMessage(messageBox, "", ""); 
        });
    });
}

/* 로그인 체크 함수 */
function loginCheck() {
    const emailInput = document.querySelector('input[name="email"]').value;
    const passwordInput = document.querySelector('input[name="password"]').value;
    const messageBox = document.getElementById('login-message');

    const mockData = { email: "test@test.com", pw: "12345678" };

    if (emailInput === mockData.email && passwordInput === mockData.pw) {
        localStorage.setItem('moodmentCurrentUser', emailInput);
        showMessage(messageBox, "로그인 정보가 확인되었습니다. 메인 페이지로 이동합니다.", "success");
        
        failCount = 0;
        setTimeout(() => {
            window.location.href = "my_home.html"; 
        }, 1000);
    } 
    else {
        failCount++;
        if (failCount >= 3) {
            const goToSignup = confirm("가입된 정보가 없는 것 같습니다. 회원가입 페이지로 이동할까요?");
            if (goToSignup) window.location.href = "signup.html";
            failCount = 0;
        } 
        else {
            let errorText = (emailInput !== mockData.email) 
                ? `입력하신 계정을 찾을 수 없습니다. 다시 한 번 확인해 주세요. (${failCount}/3)`
                : `비밀번호가 다르게 입력되었습니다. 다시 확인해 주세요. (${failCount}/3)`;
            
            showMessage(messageBox, errorText, "error");
        }
    }
}

/* 로그아웃 함수 */
function logout() {
    localStorage.removeItem('moodmentCurrentUser');
    const statusText = document.querySelector('.status-text');
    if (statusText) statusText.innerText = "로그아웃되었습니다. 다시 로그인해주세요.";

    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) logoutBtn.style.display = 'none';

    setTimeout(() => {
        alert("안전하게 로그아웃 되었습니다.");
        location.reload(); 
    }, 1000); 
}

/* 테스트 데이터 초기화 */
function resetAllData() {
    if(confirm("모든 계정과 로그인 정보를 삭제할까요?")) {
        localStorage.removeItem('moodmentUser');
        localStorage.removeItem('moodmentCurrentUser');
        alert("데이터가 초기화되었습니다.");
        location.reload();
    }
}

/* 페이지가 로드될 때 모든 감시자와 초기화 함수 작동 */
window.addEventListener('DOMContentLoaded', () => {
    renderLoginState();   
    setupInputListeners(); 
});