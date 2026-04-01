import { addNotification } from './notification.js';

let notificationContainerElement = document.querySelector('#notificationContainer');
let containerElement = document.querySelector('#container');

let hasReloaded = false;
let isLoading = false;

let dots = '';

let loadingInterval;
let connectTimeout;
let clearContainerTimeout;
let loadingDotsElement;

// Content for loading 
const loadingContent = `
    <img src="./assets/Loading.gif" alt="Loading animation" class="loading">
    <h1>Connecting Lumo<span id="load"></span></h1>
    <p>We are connecting your Lumo, this might take a while. If it won't connect in 5 minutes <a href="#">make a ticket</a>.</p>
    <div class="badge">We are trying to connect you to our services.</div>
`;

function loadLoadingContent() {
    containerElement.innerHTML = loadingContent;
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

export function Connect() {
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