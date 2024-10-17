# 🍪 Cookie Consent Banner

[![US](https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/16/country-4x3/us.png "Canada") English](/readme/en.md) -
[![Spain](https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/16/country-4x3/es.png "Spain") Español](/readme/es.md) -
[![France](https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/16/country-4x3/fr.png "France") Français](/readme/fr.md) -
[![Germany](https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/16/country-4x3/de.png "Germany") Deutschland](/readme/de.md) -
[![China](https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/16/country-4x3/cn.png "China") 中国](/readme/cn.md) -
[![India](https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/16/country-4x3/in.png "China") हिंदी](/readme/in.md) -
[![Korea](https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/16/country-4x3/kr.png "Korea") 한국어](/readme/kr.md)

<img src="https://github.com/Wurzo/CookieConsentBanner/blob/main/screenshot-1.png?raw=true"/>

Este proyecto implementa un banner de consentimiento de cookies personalizable utilizando HTML, CSS y JavaScript vanilla. A continuación, se detallan las principales funciones de JavaScript y cómo utilizarlas.

### Indice:
- 🚀 Uso
- ⚙️ Funciones Principales
  1. Abrir y Cerrar el Banner
  2. Gestión de Preferencias
  3. Manejo de Eventos
  4. Inicialización

<br>

## 🚀 Uso

Para implementar este banner de consentimiento de cookies en tu sitio web:

1. Incluye los archivos HTML, CSS y JavaScript en tu proyecto.
2. Asegúrate de que el script se cargue de forma asíncrona en el `<head>` de tu HTML:
   ```html
   <script src="script.js" async></script>
   ```
3. Modifica los arrays `policyLinks` y `cookieInfo` en el archivo JavaScript según tus necesidades.
4. Personaliza el contenido y estilos adicionales según sea necesario para que se ajusten a tu sitio web.

Esta implementación proporciona una solución rápida, flexible y fácilmente personalizable para gestionar el consentimiento de cookies, cumpliendo con las regulaciones de privacidad y ofreciendo a los usuarios control sobre sus preferencias de cookies desde el momento en que cargan la página.

<br>

## ⚙️ Funciones Principales

### 1. Abrir y Cerrar el Banner

#### Abrir el Banner

La función `openBanner()` se utiliza para mostrar el banner de consentimiento:

```javascript
function openBanner() {
    cookieBanner.style.display = 'block';
    consentTab.style.display = 'none';
    setTimeout(() => {
        cookieBanner.classList.remove('hidden');
    }, 50);
}
```

Esta función:
1. Hace visible el banner de cookies.
2. Oculta la pestaña de consentimiento.
3. Utiliza un pequeño retraso para asegurar una transición suave.

#### Cerrar el Banner

La función `closeBanner()` se utiliza para ocultar el banner de consentimiento:

```javascript
function closeBanner() {
    cookieBanner.classList.add('hidden');
    setTimeout(() => {
        cookieBanner.style.display = 'none';
        consentTab.style.display = 'flex';
    }, 300);
}
```

Esta función:
1. Añade la clase 'hidden' para iniciar la animación de cierre.
2. Después de un retraso (que coincide con la duración de la animación CSS), oculta completamente el banner.
3. Muestra la pestaña de consentimiento para permitir al usuario reabrir el banner si lo desea.

<br>

### 2. Gestión de Preferencias

#### Cargar Preferencias

La función `loadPreferences()` carga las preferencias guardadas del usuario:

```javascript
function loadPreferences() {
    const savedPreferences = localStorage.getItem('cookiePreferences');
    if (savedPreferences) {
        cookiePreferences = JSON.parse(savedPreferences);
        analyticsSwitch.checked = cookiePreferences.analytics;
        marketingSwitch.checked = cookiePreferences.marketing;
    }
}
```

Esta función:
1. Recupera las preferencias guardadas del localStorage.
2. Si existen preferencias guardadas, actualiza el estado de los interruptores en la interfaz de usuario.

#### Guardar Preferencias

La función `savePreferences()` guarda las preferencias del usuario:

```javascript
function savePreferences() {
    localStorage.setItem('cookiePreferences', JSON.stringify(cookiePreferences));
    localStorage.setItem('cookiesAccepted', 'true');
}
```

Esta función:
1. Guarda las preferencias actuales en el localStorage.
2. Marca que el usuario ha aceptado las cookies.

<br>

### 3. Manejo de Eventos

El script configura varios event listeners para manejar las interacciones del usuario:

```javascript
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
```

Estos event listeners manejan:
- Aceptación de todas las cookies
- Aceptación solo de cookies necesarias
- Mostrar el diálogo de preferencias
- Reabrir el banner desde la pestaña de consentimiento
- Guardar las preferencias personalizadas

<br>

### 4. Inicialización

El script se ejecuta inmediatamente después de cargarse:

```javascript
// Ejecutar la inicialización inmediatamente
init();
```

La función `init()` se encarga de:
1. Obtener referencias a los elementos del DOM necesarios.
2. Configurar los event listeners.
3. Cargar las preferencias guardadas.
4. Generar los enlaces de políticas y las tablas de información de cookies.
5. Determinar si se debe mostrar el banner o la pestaña de consentimiento.

#### Carga Asíncrona del Script

El script se carga de forma asíncrona para no bloquear el renderizado de la página:

```html
<script src="script.js" async></script>
```

Esta técnica permite que el script comience a cargarse inmediatamente sin esperar a que se analice el HTML completo.

#### Manejo Seguro de Elementos del DOM

Para evitar errores en caso de que el script se ejecute antes de que algunos elementos del DOM estén disponibles, se utiliza una función de ayuda:

```javascript
function getElement(id) {
    return document.getElementById(id) || { style: {}, classList: { add: () => {}, remove: () => {} } };
}
```

Esta función devuelve el elemento si existe, o un objeto con métodos vacíos si no existe, evitando errores y permitiendo que el script continúe ejecutándose.
