export let isDevMode = true;

export function isDevModeEnabled(isConsoleMessage, message, codeFunc) {
    if (isDevMode) {
        switch (isConsoleMessage) {
            case true:
                console.log(message);
                break;
            default:
                codeFunc;
                break;
        }
    }
}