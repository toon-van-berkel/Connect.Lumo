// ============================================================================
// ============================================================================
// ========================= Code for notifications ===========================
// ============================================================================
// ============================================================================
// This code makes it so that notifications are visible and animated.

// Get the notification element by its id
let notificationContainerElement = document.querySelector('#notificationContainer')

// Create the element for the closing icon
let closeIcon = `
    <svg stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="10" y1="0" x2="0" y2="10"></line>
        <line x1="0" y1="0" x2="10" y2="10"></line>
    </svg>
`;

function addCloseButton(notification, extraAction = null) {
    const button = notification.querySelector('button');

    if (button) {
        button.addEventListener('click', () => {
            if (typeof extraAction === 'function') {
                extraAction();
            }
            notification.remove();
        });
    }
}

// Make global add notification function for this aplication
export function addNotification(type, message, count = null, callback = null) {
    const validTypes = ['succes', 'information', 'warning', 'countingsucces', 'countingwarning', 'countinginformation'];

    if (!validTypes.includes(type.toLowerCase())) {
        const notification = document.createElement('div');
        notification.className = 'warning';

        notification.innerHTML = `
            <img src="./assets/WarningIcon.png" alt="Notification icon">
            <div>
                <span>Warning</span>
                <span>This notification was not set properly.</span>
            </div>
            <button type="button">${closeIcon}</button>
        `;

        notificationContainerElement.appendChild(notification);
        addCloseButton(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);

        return notification;
    }

    if (type === 'countingSucces' || type === 'countingInformation' || type === 'countingWarning') {
        const notification = document.createElement('div');
        let interval;

        if (type === 'countingSucces') {
            notification.className = 'succes';
            notification.innerHTML = `
                <img src="./assets/SuccesIcon.png" alt="Notification icon">
                ${message} <span class="count">${count}</span>
                <button type="button">${closeIcon}</button>
            `;
        } else if (type === 'countingInformation') {
            notification.className = 'normal';
            notification.innerHTML = `
                <img src="./assets/InformationIcon.png" alt="Notification icon">
                ${message} <span class="count">${count}</span>
                <button type="button">${closeIcon}</button>
            `;
        } else if (type === 'countingWarning') {
            notification.className = 'warning';
            notification.innerHTML = `
                <img src="./assets/WarningIcon.png" alt="Notification icon">
                ${message} <span class="count">${count}</span>
                <button type="button">${closeIcon}</button>
            `;
        }

        notificationContainerElement.appendChild(notification);

        const countElement = notification.querySelector('.count');
        let currentCount = Number(count);

        interval = setInterval(() => {
            currentCount--;
            countElement.textContent = currentCount;

            if (currentCount <= 0) {
                clearInterval(interval);
                notification.remove();

                if (typeof callback === 'function') {
                    callback();
                }
            }
        }, 1000);

        addCloseButton(notification, () => clearInterval(interval));

        return notification;
    }

    const notification = document.createElement('div');
    notification.className = type.toLowerCase();
    notification.innerHTML = `
        <img src="./assets/${type}Icon.png" alt="Notification icon">
        <span>${message}</span>
        <button type="button">${closeIcon}</button>
    `;

    notificationContainerElement.appendChild(notification);
    addCloseButton(notification);

    setTimeout(() => {
        notification.remove();
    }, 10000);

    return notification;
}