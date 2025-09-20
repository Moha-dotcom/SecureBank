import { loginUser, getUsers, registerUser } from  './src/services/userService.js';


document.addEventListener('DOMContentLoaded', () => {
  const emailInput = document.querySelector('#emailaddress');
  const passwordInput = document.querySelector('#password'); 
  const nameInput = document.querySelector('#username');
  const locationInput = document.querySelector('#location');
  const registerForm = document.querySelector('#register');

  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const name = nameInput.value;
    const location = locationInput.value;
    const password = passwordInput.value;
   

    try {
      const result = await registerUser(name, email,  password, location);
     
      window.location.href = "/client/public/src/pages/login.html"
    } catch (err) {
        console.error('Login failed:', err.message);
        emailInput.value = ""
        nameInput.value =""
        locationInput.value = ""
        passwordInput.value = ""


    }
  });
});
