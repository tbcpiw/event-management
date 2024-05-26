document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Проверка условий для имени пользователя
    if (username.length < 3 || username.length > 20) {
        alert('Username must be between 3 and 20 characters.');
        return;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        alert('Username can only contain letters, numbers, and underscores.');
        return;
    }
    if (users.find(user => user.username === username)) {
        alert('Username already exists.');
        return;
    }

    // Проверка условий для пароля
    if (password.length < 6 || password.length > 30) {
        alert('Password must be between 6 and 30 characters.');
        return;
    }
    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*]/.test(password)) {
        alert('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
        return;
    }

    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful');
    window.location.href = 'login.html';
});
