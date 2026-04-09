import { setPreferredLanguage, setPreferredTheme } from './preferences.js';
import { generateContent } from './generateContent.js';
import { connect } from './connect.js';

let connectButton = document.querySelector('#connect');

// ============================================================================
// ============================================================================
// =============================== Load content ===============================
// ============================================================================
// ============================================================================
// Load on mount
setPreferredLanguage();
setPreferredTheme();
generateContent();

// Make a button to be able to manually connect
connectButton.addEventListener('click', function() {
    connect();
});