// Configuración de enlaces de políticas
const policyLinks = [
    { href: '/politica-cookies', text: 'Política de Cookies' },
    { href: '/politica-privacidad', text: 'Política de Privacidad' },
    { href: '/aviso-legal', text: 'Aviso Legal' },
    { href: '/terminos-condiciones', text: 'Términos y Condiciones' }
];

// Configuración de información de cookies
const cookieInfo = {
    necessary: [
        { name: 'session_id', purpose: 'Mantener la sesión del usuario', duration: 'Sesión' },
        { name: 'csrf_token', purpose: 'Prevenir ataques CSRF', duration: 'Sesión' }
    ],
    analytics: [
        { name: '_ga', purpose: 'Distinguir usuarios únicos', duration: '2 años' },
        { name: '_gid', purpose: 'Almacenar y actualizar un valor único para cada página visitada', duration: '24 horas' }
    ],
    marketing: [
        { name: 'ads_id', purpose: 'Mostrar anuncios relevantes', duration: '3 meses' },
        { name: 'social_id', purpose: 'Rastrear visitas desde redes sociales', duration: '1 mes' }
    ]
};

// Función para obtener elementos del DOM de manera segura
function getElement(id) {
    return document.getElementById(id) || { style: {}, classList: { add: () => {}, remove: () => {} } };
}

// Variables globales
let cookieBanner, consentTab, preferencesDialog, acceptAllButton, acceptNecessaryButton, showPreferencesButton, savePreferencesButton, necessarySwitch, analyticsSwitch, marketingSwitch;

let cookiePreferences = {
    necessary: true,
    analytics: false,
    marketing: false
};

// Funciones principales
function openBanner() {
    cookieBanner.style.display = 'block';
    consentTab.style.display = 'none';
    setTimeout(() => {
        cookieBanner.classList.remove('hidden');
    }, 50);
}

function closeBanner() {
    cookieBanner.classList.add('hidden');
    setTimeout(() => {
        cookieBanner.style.display = 'none';
        consentTab.style.display = 'flex';
    }, 300);
}

function loadPreferences() {
    const savedPreferences = localStorage.getItem('cookiePreferences');
    if (savedPreferences) {
        cookiePreferences = JSON.parse(savedPreferences);
        analyticsSwitch.checked = cookiePreferences.analytics;
        marketingSwitch.checked = cookiePreferences.marketing;
    }
}

function savePreferences() {
    localStorage.setItem('cookiePreferences', JSON.stringify(cookiePreferences));
    localStorage.setItem('cookiesAccepted', 'true');
}

function togglePreferencesDialog() {
    preferencesDialog.classList.toggle('visible');
}

function generatePolicyLinks() {
    const footerContainer = document.querySelector('.footer .container');
    if (footerContainer) {
        footerContainer.innerHTML = '';
        policyLinks.forEach(link => {
            const a = document.createElement('a');
            a.href = link.href;
            a.textContent = link.text;
            footerContainer.appendChild(a);
        });
    }
}

function generateCookieTables() {
    Object.entries(cookieInfo).forEach(([category, cookies]) => {
        const tableBody = getElement(`${category}-cookies`);
        if (tableBody) {
            tableBody.innerHTML = '';
            cookies.forEach(cookie => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${cookie.name}</td>
                    <td>${cookie.purpose}</td>
                    <td>${cookie.duration}</td>
                `;
                tableBody.appendChild(row);
            });
        }
    });
}

// Inicialización y configuración de eventos
function init() {
    cookieBanner = getElement('cookie-banner');
    consentTab = getElement('consent-tab');
    preferencesDialog = getElement('preferences-dialog');
    acceptAllButton = getElement('accept-all');
    acceptNecessaryButton = getElement('accept-necessary');
    showPreferencesButton = getElement('show-preferences');
    savePreferencesButton = getElement('save-preferences');
    necessarySwitch = getElement('necessary-switch');
    analyticsSwitch = getElement('analytics-switch');
    marketingSwitch = getElement('marketing-switch');

    acceptAllButton.addEventListener('click', () => {
        cookiePreferences = { necessary: true, analytics: true, marketing: true };
        savePreferences();
        closeBanner();
    });

    acceptNecessaryButton.addEventListener('click', () => {
        cookiePreferences = { necessary: true, analytics: false, marketing: false };
        savePreferences();
        closeBanner();
    });

    showPreferencesButton.addEventListener('click', togglePreferencesDialog);
    consentTab.addEventListener('click', openBanner);

    savePreferencesButton.addEventListener('click', () => {
        cookiePreferences.analytics = analyticsSwitch.checked;
        cookiePreferences.marketing = marketingSwitch.checked;
        savePreferences();
        togglePreferencesDialog();
        closeBanner();
    });

    document.querySelectorAll('.accordion-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const content = trigger.nextElementSibling;
            if (content) {
                content.classList.toggle('visible');
            }
        });
    });

    loadPreferences();
    generatePolicyLinks();
    generateCookieTables();

    if (localStorage.getItem('cookiesAccepted')) {
        cookieBanner.style.display = 'none';
        consentTab.style.display = 'flex';
    } else {
        cookieBanner.style.display = 'block';
        consentTab.style.display = 'none';
    }
}

// Ejecutar la inicialización inmediatamente
init();
