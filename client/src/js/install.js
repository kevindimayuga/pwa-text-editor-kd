const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    window.deferredPrompt = event;
    // This will first show the install button to the user
    // then, below it will show the install prompt and hide the install button
    butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    console.log('test');
    const promptEvent = window.deferredPrompt;
    console.log(promptEvent);

    if (!promptEvent) {
        console.log('none');
        return;
    }
    // This will show the install prompt to the user
    promptEvent.prompt();

    window.deferredPrompt = null;
    // This will hide the install button once the app has been installed for the user
    butInstall.classList.toggle('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
// This event occurs when the app is installed
window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
});
