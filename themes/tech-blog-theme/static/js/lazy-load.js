/**
 * Lazy Load Module
 * Enhances native lazy loading with intersection observer
 */

export class LazyLoad {
    constructor() {
        this.observer = null;
        this.init();
    }

    init() {
        // Check if IntersectionObserver is supported
        if (!('IntersectionObserver' in window)) {
            // Fallback: load all images immediately
            this.loadAllImages();
            return;
        }

        // Create observer for images without native lazy loading
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    if (img.dataset.srcset) {
                        img.srcset = img.dataset.srcset;
                        img.removeAttribute('data-srcset');
                    }
                    img.classList.add('loaded');
                    this.observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px',
        });

        // Observe images
        document.querySelectorAll('img[data-src]').forEach((img) => {
            this.observer.observe(img);
        });
    }

    loadAllImages() {
        document.querySelectorAll('img[data-src]').forEach((img) => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
        });
    }

    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}

