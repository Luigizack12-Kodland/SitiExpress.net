document.addEventListener('DOMContentLoaded', function() {
    const welcomeMessage = document.getElementById('welcome-message');
    const okButton = document.getElementById('ok-button');
    const usernameSpan = document.getElementById('welcome-username');
    const username = 'NomeUtente'; // Questo dovrebbe essere dinamico, sostituire con il nome dell'utente registrato.

    // Mostra il messaggio di benvenuto
    usernameSpan.textContent = username;
    welcomeMessage.style.display = 'block';

    // Nasconde il messaggio di benvenuto dopo il click sul pulsante OK
    okButton.addEventListener('click', function() {
        welcomeMessage.classList.add('fade-out');
        setTimeout(function() {
            welcomeMessage.style.display = 'none';
            window.location.href = 'index.html'; // Reindirizza alla pagina index.html
        }, 500);
    });
});
