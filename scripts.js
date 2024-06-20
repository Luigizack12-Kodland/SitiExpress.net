document.addEventListener('DOMContentLoaded', () => {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesButton = document.getElementById('accept-cookies');
    const rejectCookiesButton = document.getElementById('reject-cookies');
    const manageCookiesButton = document.getElementById('manage-cookies-button');
    const usernameSpan = document.getElementById('welcome-username');
    const welcomeMessage = document.getElementById('welcome-message');
    const okButton = document.getElementById('ok-button');
    const signupButton = document.getElementById('signupButton');
    const logoutButton = document.getElementById('logoutButton');
    const logoutConfirmModal = document.getElementById('logoutConfirmModal');
    const logoutConfirmYes = document.getElementById('logoutConfirmYes');
    const logoutConfirmNo = document.getElementById('logoutConfirmNo');
    const overlay = document.querySelector('.overlay');
    const contactLink = document.getElementById('contactLink');
    const accountButton = document.getElementById('accountButton');
    const accountOptions = document.getElementById('accountOptions');

    // Funzione per mostrare il banner dei cookie
    function showCookieBanner() {
        if (cookieBanner) cookieBanner.style.display = 'block';
    }

    // Funzione per nascondere il banner dei cookie
    function hideCookieBanner() {
        if (cookieBanner) cookieBanner.style.display = 'none';
    }

    // Funzione per mostrare l'overlay che blocca l'interazione con la pagina
    function showOverlay() {
        if (overlay) {
            overlay.classList.remove('hidden');
            overlay.classList.add('show');
        }
    }

    // Funzione per nascondere l'overlay
    function hideOverlay() {
        if (overlay) {
            overlay.classList.add('hidden');
            overlay.classList.remove('show');
        }
    }

    // Memorizzare la preferenza dell'utente nei cookie
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = `${name}=${value};${expires};path=/`;
    }

    // Leggere la preferenza dell'utente dai cookie
    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Mostra un messaggio di errore se l'utente tenta di interagire con la pagina prima di accettare/rifiutare i cookie
    function showError(event) {
        const target = event.target;
        if (target !== acceptCookiesButton && target !== rejectCookiesButton && target !== document.getElementById('discoverMore')) {
            alert('Devi accettare o rifiutare i cookie per poter interagire con la pagina.');
        }
    }

    // Rimuovi il listener per il messaggio di errore quando i cookies sono accettati o rifiutati
    document.removeEventListener('click', showError, true);
    document.removeEventListener('keydown', showError, true);

    // Gestione dei pulsanti di accettazione e rifiuto dei cookie
    if (acceptCookiesButton) {
        acceptCookiesButton.addEventListener('click', () => {
            setCookie('cookiesAccepted', 'true', 365);
            hideCookieBanner();
            hideOverlay();
            if (manageCookiesButton) manageCookiesButton.classList.add('show');
            document.removeEventListener('click', showError, true);
            document.removeEventListener('keydown', showError, true);
            checkAccountButtonAccessibility();
        });
    }

    if (rejectCookiesButton) {
        rejectCookiesButton.addEventListener('click', () => {
            setCookie('cookiesAccepted', 'false', 365);
            hideCookieBanner();
            hideOverlay();
            if (manageCookiesButton) manageCookiesButton.classList.add('show');
            document.removeEventListener('click', showError, true);
            document.removeEventListener('keydown', showError, true);
        });
    }

    // Gestione del pulsante "Gestisci cookies"
    if (manageCookiesButton) {
        manageCookiesButton.addEventListener('click', showCookieBanner);
    }

    // Mostra o nasconde il banner dei cookie e l'overlay in base alle preferenze dell'utente
    const cookiesAccepted = getCookie('cookiesAccepted');
    if (!cookiesAccepted) {
        showCookieBanner();
        showOverlay();
        document.addEventListener('click', showError, true);
        document.addEventListener('keydown', showError, true);
    } else {
        hideCookieBanner();
        hideOverlay();
        if (manageCookiesButton) manageCookiesButton.classList.add('show');
        checkAccountButtonAccessibility();
    }

    // Funzioni per mostrare/nascondere i pulsanti di iscrizione e logout
    function showLogoutButton() {
        if (signupButton) signupButton.classList.add('hidden');
        if (logoutButton) logoutButton.classList.remove('hidden');
    }

    function showSignupButton() {
        if (signupButton) signupButton.classList.remove('hidden');
        if (logoutButton) logoutButton.classList.add('hidden');
    }

    function checkAuthentication() {
        const username = localStorage.getItem('username');
        if (username) {
            if (usernameSpan) usernameSpan.textContent = username;
            showLogoutButton();
        } else {
            showSignupButton();
        }
    }

    // Mostra il messaggio di benvenuto se l'utente è autenticato
    const username = localStorage.getItem('username');
    if (username && welcomeMessage) {
        if (usernameSpan) usernameSpan.textContent = username;
        welcomeMessage.classList.remove('hidden');
    }

    // Gestione del pulsante OK nel messaggio di benvenuto
    if (okButton) {
        okButton.addEventListener('click', () => {
            if (welcomeMessage) {
                welcomeMessage.classList.add('fade-out');
                setTimeout(() => {
                    welcomeMessage.classList.add('hidden');
                }, 700);
            }
        });
    }

    // Gestione del pulsante di logout
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            document.cookie = "welcomeMessageDisplayed=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
            if (overlay) overlay.classList.remove('hidden');
            if (logoutConfirmModal) logoutConfirmModal.classList.remove('hidden');
        });
    }

    // Conferma del logout
    if (logoutConfirmYes) {
        logoutConfirmYes.addEventListener('click', () => {
            localStorage.removeItem('username');
            showSignupButton();
            document.cookie = "welcomeMessageDisplayed=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
            if (overlay) overlay.classList.add('hidden');
            if (logoutConfirmModal) logoutConfirmModal.classList.add('hidden');
        });
    }

    // Annullamento del logout
    if (logoutConfirmNo) {
        logoutConfirmNo.addEventListener('click', () => {
            if (overlay) overlay.classList.add('hidden');
            if (logoutConfirmModal) logoutConfirmModal.classList.add('hidden');
        });
    }

    // Chiusura del modal di conferma logout
    const closeButton = document.querySelector('.close-button');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            if (overlay) overlay.classList.add('hidden');
            if (logoutConfirmModal) logoutConfirmModal.classList.add('hidden');
        });
    }

    // Controllo del link di contatto per gli utenti non autenticati
    if (contactLink) {
        contactLink.addEventListener('click', (event) => {
            if (!localStorage.getItem('username')) {
                event.preventDefault();
                alert('Devi iscriverti al sito per accedere a questa sezione.');
            } else {
                window.location.href = 'contact.html';
            }
        });
    }

    // Controlla se il messaggio di benvenuto è stato mostrato
    const welcomeMessageCookie = document.cookie.split(';').some(item => item.trim().startsWith('welcomeMessageDisplayed='));
    if (!welcomeMessageCookie && welcomeMessage) {
        welcomeMessage.classList.remove('hidden');
    }

    // Gestione del menu account
    if (accountButton) {
        accountButton.addEventListener('click', () => {
            if (accountOptions.classList.contains('hidden')) {
                accountOptions.classList.remove('hidden');
                accountOptions.style.display = 'flex';
                accountOptions.style.maxHeight = accountOptions.scrollHeight + 'px';
            } else {
                accountOptions.style.maxHeight = '0';
                setTimeout(() => {
                    accountOptions.classList.add('hidden');
                    accountOptions.style.display = 'none';
                }, 300);
            }
        });
    }

    // Stato del pulsante di iscrizione e logout
    if (signupButton) {
        signupButton.addEventListener('click', () => {
            signupButton.disabled = true;
            signupButton.style.background = "#ccc";
            signupButton.style.cursor = "not-allowed";
            if (logoutButton) {
                logoutButton.disabled = false;
                logoutButton.classList.add('active');
                logoutButton.style.background = "linear-gradient(135deg, #ff4d4d, #ff0000)";
                logoutButton.style.cursor = "pointer";
            }
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            if (!logoutButton.disabled) {
                logoutConfirmModal.style.display = "flex";
            }
        });
    }

    if (logoutConfirmYes) {
        logoutConfirmYes.addEventListener('click', () => {
            logoutConfirmModal.style.display = "none";
            if (signupButton) {
                signupButton.disabled = false;
                signupButton.style.background = "";
                signupButton.style.cursor = "pointer";
            }
            if (logoutButton) {
                logoutButton.disabled = true;
                logoutButton.classList.remove('active');
                logoutButton.style.background = "#ccc";
                logoutButton.style.cursor = "not-allowed";
            }
            accountOptions.classList.add('hidden');
            setTimeout(() => {
                accountOptions.style.display = "none";
            }, 300);
        });
    }

    if (logoutConfirmNo) {
        logoutConfirmNo.addEventListener('click', () => {
            logoutConfirmModal.style.display = "none";
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target === logoutConfirmModal) {
            logoutConfirmModal.style.display = "none";
        }
    });

    // Verifica se siamo sulla pagina index.html per gestire i cookies
    const currentPage = window.location.pathname;
    if (currentPage.includes('index.html')) {
        const cookiesAccepted = getCookie('cookiesAccepted');

        if (!cookiesAccepted) {
            showCookieBanner();
            showOverlay();
            document.addEventListener('click', showError, true);
            document.addEventListener('keydown', showError, true);
        } else {
            hideCookieBanner();
            hideOverlay();
            if (manageCookiesButton) manageCookiesButton.classList.add('show');
            checkAccountButtonAccessibility();
        }
    } else if (currentPage.includes('products.html') || currentPage.includes('contact.html')) {
        const cookiesAccepted = getCookie('cookiesAccepted');

        if (cookiesAccepted) {
            hideCookieBanner();
            hideOverlay();
            if (manageCookiesButton) manageCookiesButton.classList.add('show');
            checkAccountButtonAccessibility();
        }
    } else if (currentPage.includes('cookies.html')) {
        const cookiesAccepted = getCookie('cookiesAccepted');

        if (!cookiesAccepted) {
            accountButton.disabled = true;
            accountButton.style.pointerEvents = 'none';
        }
    }

    function checkAccountButtonAccessibility() {
        const cookiesAccepted = getCookie('cookiesAccepted');
        if (!cookiesAccepted && accountButton) {
            accountButton.disabled = true;
            accountButton.style.pointerEvents = 'none';
        } else {
            accountButton.disabled = false;
            accountButton.style.pointerEvents = '';
        }
    }

    checkAuthentication();
});
