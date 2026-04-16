import { content } from "./data/content.js";
import { isDevModeEnabled } from './helpers.js';
import { generateContent } from './generateContent.js';
import { addNotification } from './notification.js';

export let preferredLanguage = '';
export let preferredTheme = '';

const languageSelector = document.getElementById("languageSelector");

languageSelector.addEventListener("change", (event) => {
    preferredLanguage = event.target.value.toLowerCase().trim();

    localStorage.setItem('language', preferredLanguage);

    addNotification('information', `${content[preferredLanguage].notifications.preferencesA} ${preferredLanguage}`);
    isDevModeEnabled(true, `INFO: Changed language to '${preferredLanguage}'.`);

    generateContent();
});

// ============================================================================
// ============================================================================
// ========================== Preferences languages ===========================
// ============================================================================
// ============================================================================
export function findPreferredLanguage(lan) {
    const language = lan?.toLowerCase().trim();

    switch (language) {
        case 'en-gb':
        case 'nl-nl':
        case 'de-de':
        case 'fr-fr':
        case 'en-gb-na':
        case 'nl-nl-na':
        case 'de-de-na':
        case 'fr-fr-na':
            preferredLanguage = language;
            isDevModeEnabled(true, `INFO: Found preferred language ${language}`);
            break;

        default:
            preferredLanguage = 'en-gb';
            isDevModeEnabled(true, 'WARNING: Could not find preferred language, set to en-gb');
            break;
    }

    localStorage.setItem('language', preferredLanguage);

    if (languageSelector) {
        languageSelector.value = preferredLanguage;
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
            findPreferredTheme(localStorage.getItem('theme'));
            break;
    }
}