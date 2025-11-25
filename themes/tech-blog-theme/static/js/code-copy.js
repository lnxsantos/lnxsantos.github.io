/**
 * Code Copy Module
 * Adds copy buttons to code blocks
 */

export class CodeCopy {
    constructor() {
        this.observer = null;
        this.init();
    }

    init() {
        this.addCopyButtons();

        // Watch for dynamically added code blocks
        this.observer = new MutationObserver(() => {
            this.addCopyButtons();
        });

        this.observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    }

    addCopyButtons() {
        const codeBlocks = document.querySelectorAll('pre');

        codeBlocks.forEach((pre) => {
            if (pre.querySelector('.copy-code-button')) {
                return;
            }

            const button = document.createElement('button');
            button.className = 'copy-code-button';
            button.textContent = 'Copiar';
            button.setAttribute('aria-label', 'Copiar código');

            button.addEventListener('click', async () => {
                const code = pre.querySelector('code') || pre;
                const text = code.textContent || code.innerText;

                try {
                    await navigator.clipboard.writeText(text);
                    button.textContent = 'Copiado!';
                    button.classList.add('copied');

                    setTimeout(() => {
                        button.textContent = 'Copiar';
                        button.classList.remove('copied');
                    }, 2000);
                } catch (err) {
                    console.error('Erro ao copiar:', err);
                    button.textContent = 'Erro';
                    setTimeout(() => {
                        button.textContent = 'Copiar';
                    }, 2000);
                }
            });

            pre.style.position = 'relative';
            pre.appendChild(button);
        });
    }

    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}

