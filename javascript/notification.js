let notificationContainerElement = document.querySelector('#notificationContainer')

export function addNotification(type, message, count = null, callback = null) {
    const validTypes = ['Succes', 'Information', 'Warning', 'countingWarning', 'countingInformation'];

    if (!validTypes.includes(type)) {
        const notification = document.createElement('div');
        notification.className = 'warning';
        notification.innerHTML = `
            <img src="./assets/WarningIcon.png" alt="Notification icon">
            This notification was not set properly.
        `;
        notificationContainerElement.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 5000);

        return notification;
    }

    if (type === 'countingSucces' || type === 'countingInformation' ||type === 'countingWarning') {
        const notification = document.createElement('div');
        
        if (type === 'countingSucces') {
            notification.className = 'succes';

            notification.innerHTML = `
                <img src="./assets/SuccesIcon.png" alt="Notification icon">
                ${message} <span class="count">${count}</span>
            `;
        } else if (type === 'countingInformation') {
            notification.className = 'normal';

            notification.innerHTML = `
                <img src="./assets/InformationIcon.png" alt="Notification icon">
                ${message} <span class="count">${count}</span>
            `;
        } else if (type === 'countingWarning') {
            notification.className = 'warning';

            notification.innerHTML = `
                <img src="./assets/WarningIcon.png" alt="Notification icon">
                ${message} <span class="count">${count}</span>
            `;
        }

        notificationContainerElement.appendChild(notification);

        const countElement = notification.querySelector('.count');
        let currentCount = Number(count);

        const interval = setInterval(() => {
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

        return notification;
    }

    const notification = document.createElement('div');
    notification.className = type.toLowerCase();
    notification.innerHTML = `
        <img src="./assets/${type}Icon.png" alt="Notification icon">
        ${message}
    `;

    notificationContainerElement.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 10000);

    return notification;
}