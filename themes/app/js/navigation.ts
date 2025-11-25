/**
 * Navigation Module
 * Handles mobile menu toggle and navigation interactions
 */

export class Navigation {
    private navToggle: HTMLElement | null;
    private navMenu: HTMLElement | null;

    constructor() {
        this.navToggle = document.querySelector('.nav-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.init();
    }

    init(): void {
        if (!this.navToggle || !this.navMenu) return;

        // Event delegation for nav toggle
        document.addEventListener('click', (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('.nav-toggle')) {
                this.toggleMenu();
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!this.navToggle?.contains(target) && !this.navMenu?.contains(target)) {
                this.closeMenu();
            }
        });

        // Close menu on Escape key
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.key === 'Escape' && this.navMenu?.classList.contains('active')) {
                this.closeMenu();
                this.navToggle?.focus();
            }
        });

        // Close menu when clicking nav links (event delegation)
        this.navMenu.addEventListener('click', (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('.nav-link')) {
                this.closeMenu();
            }
        });
    }

    toggleMenu(): void {
        if (!this.navToggle || !this.navMenu) return;
        const isExpanded = this.navToggle.getAttribute('aria-expanded') === 'true';
        this.navToggle.setAttribute('aria-expanded', String(!isExpanded));
        this.navMenu.classList.toggle('active');
    }

    closeMenu(): void {
        if (!this.navToggle || !this.navMenu) return;
        this.navToggle.setAttribute('aria-expanded', 'false');
        this.navMenu.classList.remove('active');
    }
}

