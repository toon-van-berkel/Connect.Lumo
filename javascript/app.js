import {Connect} from './connect.js';
import {addNotification} from './notification.js';

// Make a button to be able to manually connect
let connectButton = document.querySelector('#connect');
connectButton.addEventListener('click', function() {
    Connect();
});

// Add a notification about automatically trying to connect
addNotification('countingInformation', 'Automatically trying to connect in', 60, Connect);