// Funzione per verificare se il banner dei cookie deve essere mostrato
function checkCookieConsent() {
    const consent = localStorage.getItem('cookieConsent');
    if (consent) {
        document.getElementById('cookie-banner').style.display = 'none';
    }
}

// Event listeners per i pulsanti del banner dei cookie
document.getElementById('accept-button').addEventListener('click', function() {
    localStorage.setItem('cookieConsent', 'accepted');
    alert('Hai accettato tutti i cookies');
    window.location.href = 'index.html';
});

document.getElementById('reject-button').addEventListener('click', function() {
    localStorage.setItem('cookieConsent', 'rejected');
    alert('Hai rifiutato tutti i cookies');
    window.location.href = 'index.html';
});

// Controlla se mostrare il banner dei cookie al caricamento della pagina
document.addEventListener('DOMContentLoaded', function() {
    checkCookieConsent();
});
