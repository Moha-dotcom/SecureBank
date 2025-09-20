


export async function getUsers() {
  try {
    const response = await fetch('http://localhost:3000/api/users/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data; // return data so caller can use it
  } catch (error) {
    console.error('Error fetching users:', error.message);
    throw error;
  }
}


export async function registerUser(name, email, password, location) {
  try {
    const response = await fetch('http://localhost:3000/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ name, email, password, location })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
  
    return data;
  } catch (error) {
    console.error('Error registering user:', error.message);
    throw error;
  }
}


export async function loginUser(email, password) {
  try {
    const response = await fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      throw new Error(`Login failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log(data)
    return data; // <-- return data so caller can use it
  } catch (error) {
    return `Wrong email address or password try gain`
    // console.error('Error during login:', error.message);
    // throw error; // rethrow if you want the caller to handle it
  }
}


// loginUser("TysonsBAlass@gmail.com", "tysonMike823");
