// 1. 먼저 HTML에 있는 입력창(input) 요소를 찾아와야 해.
const nameInput = document.getElementById('name-input');   // 이름 입력창
const emailInput = document.getElementById('email-input'); // 이메일 입력창
const passwordInput = document.getElementById('pw-input'); // 비밀번호 입력창

// 2. 사용자가 입력한 '값(value)'을 변수에 저장하자.
// 여기서 'const email = ...' 이라고 선언을 해줘야 에러가 안 나! 
const email = emailInput.value; 
const password = passwordInput.value;

// 3. 이제 준비된 반찬(변수)들로 도시락(객체)을 싸보자!
const user = {
  name: name,     // 왼쪽은 도시락 칸 이름, 오른쪽은 우리가 위에서 만든 변수야.
  email: email,   
  password: password
};

// 참고: 변수 이름과 객체 키 이름이 같으면 { name, email, password } 처럼 줄여 쓸 수 있어! (단, 선언이 먼저 되어있을 때만!)

localStorage.setItem('moodmentUser', JSON.stringify(user));

message.textContent = '회원가입이 완료되었습니다. 로그인을 시도해보십시오.';
setTimeout(() => {
  window.location.href = 'my_home.html';
}, 1000);