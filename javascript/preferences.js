import { isDevModeEnabled } from './helpers.js';
import { generateContent, generateConnectingComponent } from './generateContent.js';

export let preferredLanguage = '';
export let preferredTheme = '';

const languageSelector = document.getElementById("languageSelector");

languageSelector.addEventListener("change", (event) => {
    preferredLanguage = event.target.value;
    generateContent();
    isDevModeEnabled(true, `INFO: Changed language to '${event.target.value}'.`);
});

// ============================================================================
// ============================================================================
// ========================== Preferences languages ===========================
// ============================================================================
// ============================================================================
export function findPreferredLanguage(lan) {
    switch (lan.toLowerCase()) {
        case 'en-gb':
            preferredLanguage = lan;
            isDevModeEnabled(true, 'INFO: Found preffered language en-gb');
            break;
        case 'nl-nl':
            preferredLanguage = lan;
            isDevModeEnabled(true, 'INFO: Found preffered language nl-nl');
            break;
        default:
            preferredLanguage = 'en-gb';
            isDevModeEnabled(true, 'WARNING: Could not find preffered language, set to en-gb');
            break;
    }
}

export function setPreferredLanguage() {
    switch (localStorage.getItem('language')) {
        case null:
            isDevModeEnabled(true, 'WARNING: Could not find localStorage language');
            isDevModeEnabled(true, 'INFO: Using navigator language');
            findPreferredLanguage(navigator.language);
            break;
        default:
            findPreferredLanguage(localStorage.getItem('language'));
            break;
    }
}

// ============================================================================
// ============================================================================
// ============================ Preferences theme =============================
// ============================================================================
// ============================================================================
export function findPreferredTheme(theme) {
    switch (theme) {
        case 'dark':
            preferredTheme = theme;
            isDevModeEnabled(true, 'INFO: Found preffered theme dark');
            break;
        case 'light':
            preferredTheme = theme;
            isDevModeEnabled(true, 'INFO: Found preffered theme light');
            break;
        default:
            preferredTheme = 'dark';
            isDevModeEnabled(true, 'WARNING: Could not find preffered theme, set to dark');
            break;
    }
}

export function setPreferredTheme() {
    switch (localStorage.getItem('theme')) {
        case null:
            isDevModeEnabled(true, 'WARNING: Could not find localStorage theme');
            isDevModeEnabled(true, 'INFO: Using window theme');
            findPreferredTheme((window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
            break;
        default:
            findPreferredTheme(localStorage.getItem('language'));
            break;
    }
}