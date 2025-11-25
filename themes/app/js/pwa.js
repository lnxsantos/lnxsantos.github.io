/**
 * PWA Module
 * Handles service worker registration and PWA features
 */

export class PWA {
    constructor() {
        this.init();
    }

    init() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                this.registerServiceWorker();
            });
        }

        // Handle install prompt
        let deferredPrompt;
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            this.showInstallButton(deferredPrompt);
        });
    }

    async registerServiceWorker() {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js', {
                scope: '/',
            });

            console.log('Service Worker registered:', registration.scope);

            // Check for updates
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        // New service worker available
                        this.showUpdateNotification();
                    }
                });
            });
        } catch (error) {
            console.error('Service Worker registration failed:', error);
        }
    }

    showInstallButton(deferredPrompt) {
        // Create install button (you can customize this)
        const installButton = document.createElement('button');
        installButton.textContent = 'Instalar App';
        installButton.className = 'pwa-install-button';
        installButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 12px 24px;
            background: var(--primary-color);
            color: var(--bg-color);
            border: none;
            border-radius: 8px;
            cursor: pointer;
            z-index: 1000;
            font-weight: 600;
        `;

        installButton.addEventListener('click', async () => {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log('User choice:', outcome);
            installButton.remove();
            deferredPrompt = null;
        });

        document.body.appendChild(installButton);
    }

    showUpdateNotification() {
        // Show notification that update is available
        console.log('New version available. Refresh to update.');
        // You can add a UI notification here
    }
}

