import { loginUser, getUsers, registerUser } from  './src/services/userService.js';


document.addEventListener('DOMContentLoaded', () => {
  const emailInput = document.querySelector('#emailaddress');
  const passwordInput = document.querySelector('#password'); 
  const nameInput = document.querySelector('#name');
  const locationInput = document.querySelector('#location');
  const registerForm = document.querySelector('#register');

  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const name = nameInput.value;
    const location = locationInput.value;
    const password = passwordInput.value;
    console.log(email, nameInput, location, password)

    try {
      const result = await registerUser(name, email,  password, location);
      console.log('Login success:', result);
    //   window.location.href = "http://google.com"
    } catch (err) {
      console.error('Login failed:', err.message);

    }
  });
});
