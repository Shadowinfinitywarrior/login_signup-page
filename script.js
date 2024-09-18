// Load users from local storage or initialize an empty array
let users = JSON.parse(localStorage.getItem('users')) || [];

// Toggle between login and signup forms
document.getElementById('show-signup').addEventListener('click', function() {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('signup-form').classList.remove('hidden');
});

document.getElementById('show-login').addEventListener('click', function() {
    document.getElementById('signup-form').classList.add('hidden');
    document.getElementById('login-form').classList.remove('hidden');
});

// Signup form submission and validation
document.getElementById('signup').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    // Check if email already exists
    const emailExists = users.some(user => user.email === email);
    if (emailExists) {
        alert("Email already registered. Please use a different email.");
        return;
    }

    // Store user details in the array
    users.push({
        username: username,
        email: email,
        password: password
    });

    // Save updated users array to local storage
    localStorage.setItem('users', JSON.stringify(users));

    alert("Signup successful! You can now log in.");

    // Reset the form and switch to login form
    document.getElementById('signup').reset();
    document.getElementById('signup-form').classList.add('hidden');
    document.getElementById('login-form').classList.remove('hidden');
});

// Login form submission and validation
document.getElementById('login').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Check if email and password match any registered user
    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        alert("Invalid email or password");
    } else {
        alert(`Welcome, ${user.username}!`);
        // Perform further actions like redirecting to a dashboard
    }

    document.getElementById('login').reset();
});