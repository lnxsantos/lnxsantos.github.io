/**
 * Smooth Scroll Module
 * Handles smooth scrolling for anchor links
 */

export class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        // Event delegation for anchor links
        document.addEventListener('click', (e) => {
            const anchor = e.target.closest('a[href^="#"]');
            if (!anchor) return;

            const href = anchor.getAttribute('href');
            if (href === '#' || href.length <= 1) return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
}

