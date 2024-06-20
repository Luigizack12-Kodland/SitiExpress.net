document.addEventListener('DOMContentLoaded', function() {
    const acceptCookiesButton = document.getElementById('acceptCookies');
    const rejectCookiesButton = document.getElementById('rejectCookies');
    const cookiesSection = document.querySelector('.cookies-section');
    const cookieBanner = document.querySelector('.cookie-banner');

    // Funzione per nascondere la sezione delle preferenze dei cookie
    function hideCookiesSection() {
        if (cookiesSection) {
            cookiesSection.style.display = 'none';
        }
    }

    // Funzione per accettare i cookie
    function acceptCookies() {
        document.cookie = "cookies_accepted=true; path=/; max-age=31536000";
        hideCookiesSection();
    }

    // Funzione per rifiutare i cookie
    function rejectCookies() {
        document.cookie = "cookies_accepted=false; path=/; max-age=31536000";
        hideCookiesSection();
    }

    // Controlla se i cookie sono stati accettati o rifiutati
    function checkCookiePreference() {
        const cookiesAccepted = document.cookie.split('; ').find(row => row.startsWith('cookies_accepted='));
        if (cookiesAccepted && (cookiesAccepted.split('=')[1] === 'true' || cookiesAccepted.split('=')[1] === 'false')) {
            hideCookiesSection();
        }
    }

    // Aggiungi gli event listener ai pulsanti
    acceptCookiesButton.addEventListener('click', acceptCookies);
    rejectCookiesButton.addEventListener('click', rejectCookies);

    // Controlla la preferenza dei cookie all'avvio
    checkCookiePreference();

    // Controlla se si sta tornando alla pagina Home
    window.addEventListener('load', function() {
        if (document.referrer && document.referrer.includes(window.location.origin)) {
            // Se si torna alla Home, nascondi il banner dei cookie
            if (cookieBanner) {
                cookieBanner.style.display = 'none';
            }
        }
    });
});