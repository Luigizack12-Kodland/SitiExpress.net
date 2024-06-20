document.addEventListener('DOMContentLoaded', function() {
    const modal = document.querySelector('.modal');
    const closeButton = document.querySelector('.close-button');
    const registerButton = document.querySelector('.register-button');
    const loginButton = document.querySelector('.login-button');
    const tablinks = document.querySelectorAll('.tablinks');
    const usernameInput = document.querySelector('#username');
    const passwordInput = document.querySelector('#password');
    const errorMessage = document.querySelector('.error-message');
    const users = new Map();
    let isAuthenticated = false;

    function validateInputs() {
        return usernameInput.value.trim() !== '' && passwordInput.value.trim() !== '';
    }

    function validatePassword(password) {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Min 8 chars, 1 letter, 1 number
        return regex.test(password);
    }

    function isUsernameUnique(username) {
        return !users.has(username);
    }

    function displayErrorMessage(message) {
        errorMessage.style.display = 'block';
        errorMessage.textContent = message;
    }

    function clearErrorMessage() {
        errorMessage.style.display = 'none';
        errorMessage.textContent = '';
    }

    function clearInputs() {
        usernameInput.value = '';
        passwordInput.value = '';
    }

    function switchToRegisterTab() {
        tablinks.forEach(tab => tab.classList.remove('active'));
        tablinks[0].classList.add('active');
        registerButton.classList.remove('hidden');
        loginButton.classList.add('hidden');
        clearInputs();
        clearErrorMessage();
    }

    function switchToLoginTab() {
        tablinks.forEach(tab => tab.classList.remove('active'));
        tablinks[1].classList.add('active');
        loginButton.classList.remove('hidden');
        registerButton.classList.add('hidden');
        clearInputs();
        clearErrorMessage();
    }

    function handleRegistration() {
        if (!validateInputs()) {
            displayErrorMessage('Per favore, completa tutti i campi.');
            return;
        }

        if (!validatePassword(passwordInput.value)) {
            displayErrorMessage('La password deve essere di almeno 8 caratteri, con almeno una lettera e un numero.');
            return;
        }

        const username = usernameInput.value.trim();
        if (!isUsernameUnique(username)) {
            displayErrorMessage('Il nome utente è già in uso. Scegline un altro.');
            return;
        }

        users.set(username, passwordInput.value.trim());
        alert('Registrazione avvenuta con successo!');
        switchToLoginTab();
    }

    function handleLogin() {
        if (!validateInputs()) {
            displayErrorMessage('Per favore, completa tutti i campi.');
            return;
        }

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (users.has(username) && users.get(username) === password) {
            isAuthenticated = true;
            alert('Accesso avvenuto con successo!');
            localStorage.setItem('username', username); // Salva il nome utente
            modal.classList.add('fade-out');
            setTimeout(() => {
                modal.style.display = 'none';
                redirectToIndex(); // Reindirizza solo dopo l'accesso avvenuto
            }, 500);
        } else {
            displayErrorMessage('L\'account non è stato trovato o le credenziali sono errate. Riprova.');
        }
    }

    function handleClose() {
        if (isAuthenticated) {
            modal.classList.add('fade-out');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 500);
        } else {
            displayErrorMessage('Devi prima registrarti o accedere al sito.');
        }
    }

    tablinks[0].addEventListener('click', switchToRegisterTab);
    tablinks[1].addEventListener('click', switchToLoginTab);
    registerButton.addEventListener('click', handleRegistration);
    loginButton.addEventListener('click', handleLogin);
    closeButton.addEventListener('click', handleClose);

    // Aggiungere il reindirizzamento alla pagina index solo dopo l'accesso avvenuto
    function redirectToIndex() {
        window.location.href = 'index.html';
    }

    switchToRegisterTab();
});
