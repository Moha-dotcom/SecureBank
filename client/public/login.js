import { loginUser, getUsers, registerUser } from  '././src/services/userService.js';




document.addEventListener('DOMContentLoaded', () => {
  const emailInput = document.querySelector('#emailaddress');
  const passwordInput = document.querySelector('#password');
  const loginForm = document.querySelector('#loginForm');
  const registerForm = document.querySelector('#registerForm');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput.value;
    console.log(email)
    const password = passwordInput.value;
    console.log(password)

    try {
      const result = await loginUser(email, password);
      console.log('Login success:', result);
    //   window.location.href = "http://google.com"
    } catch (err) {
      console.error('Login failed:', err.message);

    }




    
  });
});
