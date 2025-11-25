/**
 * Theme Module
 * Handles dark/light theme switching
 */

export class ThemeManager {
    constructor() {
        this.themeToggle = document.querySelector('.theme-toggle');
        this.html = document.documentElement;
        this.init();
    }

    init() {
        this.setTheme(this.getPreferredTheme());

        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => {
                const currentTheme = this.html.getAttribute('data-theme') || 'light';
                this.setTheme(currentTheme === 'dark' ? 'light' : 'dark');
            });
        }

        // Listen for system theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!localStorage.getItem('theme')) {
                    this.setTheme('dark');
                }
            });
        }
    }

    setTheme(theme) {
        this.html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (this.themeToggle) {
            this.themeToggle.setAttribute('data-theme', theme);
        }
    }

    getPreferredTheme() {
        const stored = localStorage.getItem('theme');
        if (stored) return stored;
        return 'dark';
    }
}

