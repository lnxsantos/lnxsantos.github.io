/**
 * Navigation Module
 * Handles mobile menu toggle and navigation interactions
 */

export class Navigation {
    constructor() {
        this.navToggle = document.querySelector('.nav-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.init();
    }

    init() {
        if (!this.navToggle || !this.navMenu) return;

        // Event delegation for nav toggle
        document.addEventListener('click', (e) => {
            if (e.target.closest('.nav-toggle')) {
                this.toggleMenu();
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navToggle.contains(e.target) && !this.navMenu.contains(e.target)) {
                this.closeMenu();
            }
        });

        // Close menu on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.navMenu.classList.contains('active')) {
                this.closeMenu();
                this.navToggle.focus();
            }
        });

        // Close menu when clicking nav links (event delegation)
        this.navMenu.addEventListener('click', (e) => {
            if (e.target.closest('.nav-link')) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        const isExpanded = this.navToggle.getAttribute('aria-expanded') === 'true';
        this.navToggle.setAttribute('aria-expanded', !isExpanded);
        this.navMenu.classList.toggle('active');
    }

    closeMenu() {
        this.navToggle.setAttribute('aria-expanded', 'false');
        this.navMenu.classList.remove('active');
    }
}

