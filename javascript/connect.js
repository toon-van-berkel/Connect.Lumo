// ============================================================================
// ============================================================================
// ============================= Import functions =============================
// ============================================================================
// ============================================================================
import { content } from "./data/content.js";
import { preferredLanguage } from "./preferences.js";
import { addNotification } from './notification.js';
import { generateConnectingComponent } from './generateContent.js';

// ============================================================================
// ============================================================================
// ============================== Select elements =============================
// ============================================================================
// ============================================================================
let notificationContainerElement = document.querySelector('#notificationContainer');
let containerElement = document.querySelector('#container');

// ============================================================================
// ============================================================================
// ================================= Variables ================================
// ============================================================================
// ============================================================================
export let isLoading = false;
let hasReloaded = false;
let loadingInterval;
let connectTimeout;
let clearContainerTimeout;
let loadingDotsElement;
let dots = '';
const CONNECT_TIMEOUT_MS = 5000;
const RELOAD_COUNTDOWN_SECONDS = 20;
const CLEAR_CONTAINER_DELAY_MS = RELOAD_COUNTDOWN_SECONDS * 1000;

// ============================================================================
// ============================================================================
// =============== Load the section of the loading animation ==================
// ============================================================================
// ============================================================================
function loadLoadingContent() {
    generateConnectingComponent();
    loadingDotsElement = document.querySelector('#load');
}

// ============================================================================
// ============================================================================
// ============== Load the animation of the dots next to title ================
// ============================================================================
// ============================================================================
function startLoadingAnimation() {
    clearInterval(loadingInterval);

    dots = '';

    loadingInterval = setInterval(() => {
        if (!isLoading || !loadingDotsElement) return;

        dots += '.';

        if (dots.length > 3) {
            dots = '';
        }

        loadingDotsElement.innerHTML = dots;
    }, 500);
}

// ============================================================================
// ============================================================================
// ================ Stop the loading animation of the dots ====================
// ============================================================================
// ============================================================================
function stopLoadingAnimation() {
    isLoading = false;
    clearInterval(loadingInterval);

    if (loadingDotsElement) {
        loadingDotsElement.innerHTML = '';
    }
}

// ============================================================================
// ============================================================================
// =============== Place for the future real connecting code ==================
// ============================================================================
// ============================================================================
function startConnecting() {
    clearTimeout(connectTimeout);
    clearTimeout(clearContainerTimeout);

    connectTimeout = setTimeout(() => {
        addNotification(
            'countingWarning',
            content[preferredLanguage].notifications.connectA,
            RELOAD_COUNTDOWN_SECONDS,
            connect
        );

        clearContainerTimeout = setTimeout(() => {
            stopLoadingAnimation();

            if (containerElement) {
                containerElement.innerHTML = '';
            }

            clearContainerTimeout = null;
        }, CLEAR_CONTAINER_DELAY_MS);

        connectTimeout = null;
    }, CONNECT_TIMEOUT_MS);
}

// ============================================================================
// ============================================================================
// ============= Function to load everything needed to connect ================
// ============================================================================
// ============================================================================
export function connect() {
    clearInterval(loadingInterval);
    clearTimeout(connectTimeout);
    clearTimeout(clearContainerTimeout);
    
    if (notificationContainerElement) {
        notificationContainerElement.innerHTML = '';
    }

    if (hasReloaded) {
        console.log(content[preferredLanguage].notifications.connectB)
        addNotification('success', content[preferredLanguage].notifications.connectB);
    }

    hasReloaded = true;
    console.log(addNotification('information', content[preferredLanguage].notifications.connectC));

    isLoading = true;

    loadLoadingContent();
    startLoadingAnimation();
    startConnecting();

    return true;
}