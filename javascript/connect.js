import { addNotification } from './notification.js';
import { generateConnectingComponent } from './generateContent.js';

let notificationContainerElement = document.querySelector('#notificationContainer');
let containerElement = document.querySelector('#container');

let hasReloaded = false;
export let isLoading = false;

let dots = '';

let loadingInterval;
let connectTimeout;
let clearContainerTimeout;
let loadingDotsElement;

function loadLoadingContent() {
    generateConnectingComponent();
    loadingDotsElement = document.querySelector('#load');
}

function startLoadingAnimation() {
    clearInterval(loadingInterval);

    isLoading = true;
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

function stopLoadingAnimation() {
    isLoading = false;
    clearInterval(loadingInterval);

    if (loadingDotsElement) {
        loadingDotsElement.innerHTML = '';
    }
}

function startConnecting() {
    clearTimeout(connectTimeout);
    clearTimeout(clearContainerTimeout);

    connectTimeout = setTimeout(() => {
        addNotification('countingWarning', 'Unable to connect, attempting reload in', 20, Connect);

        clearContainerTimeout = setTimeout(() => {
            stopLoadingAnimation();
            containerElement.innerHTML = '';
        }, 19950);
    }, 5000);
}

export function connect() {
    clearInterval(loadingInterval);
    clearTimeout(connectTimeout);
    clearTimeout(clearContainerTimeout);

    notificationContainerElement.innerHTML = '';

    if (hasReloaded) {
        addNotification('Succes', 'Successfully reloaded');
    }

    hasReloaded = true;

    loadLoadingContent();
    startLoadingAnimation();
    startConnecting();

    return true;
}