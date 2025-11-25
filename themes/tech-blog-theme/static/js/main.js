document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });
        
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
            });
        });
        
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
            }
        });
        
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) {
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
                navToggle.focus();
            }
        });
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
    
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;
    
    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (themeToggle) {
            themeToggle.setAttribute('data-theme', theme);
        }
    }
    
    function getPreferredTheme() {
        const stored = localStorage.getItem('theme');
        if (stored) return stored;
        return 'dark';
    }
    
    setTheme(getPreferredTheme());
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = html.getAttribute('data-theme') || 'light';
            setTheme(currentTheme === 'dark' ? 'light' : 'dark');
        });
    }
    
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
            if (!localStorage.getItem('theme')) {
                setTheme('dark');
            }
        });
    }
    
    function addCopyButtons() {
        const codeBlocks = document.querySelectorAll('pre');
        
        codeBlocks.forEach(function(pre) {
            if (pre.querySelector('.copy-code-button')) {
                return;
            }
            
            const button = document.createElement('button');
            button.className = 'copy-code-button';
            button.textContent = 'Copiar';
            button.setAttribute('aria-label', 'Copiar código');
            
            button.addEventListener('click', function() {
                const code = pre.querySelector('code') || pre;
                const text = code.textContent || code.innerText;
                
                navigator.clipboard.writeText(text).then(function() {
                    button.textContent = 'Copiado!';
                    button.classList.add('copied');
                    
                    setTimeout(function() {
                        button.textContent = 'Copiar';
                        button.classList.remove('copied');
                    }, 2000);
                }).catch(function(err) {
                    console.error('Erro ao copiar:', err);
                    button.textContent = 'Erro';
                    setTimeout(function() {
                        button.textContent = 'Copiar';
                    }, 2000);
                });
            });
            
            pre.style.position = 'relative';
            pre.appendChild(button);
        });
    }
    
    addCopyButtons();
    
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                addCopyButtons();
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    const contentSearchInput = document.getElementById('contentSearchInput');
    const contentSearchClear = document.getElementById('contentSearchClear');
    const categoryTagCheckboxes = document.querySelectorAll('.category-tag-checkbox');
    const articleCards = document.querySelectorAll('.article-card');
    const yearGroups = document.querySelectorAll('.year-group');
    
    const categoryMap = {};
    if (categoryTagCheckboxes.length > 0) {
        categoryTagCheckboxes.forEach(function(checkbox) {
            const categorySlug = checkbox.getAttribute('data-category');
            const tagText = checkbox.closest('.category-tag-filter').querySelector('.category-tag-text');
            const categoryName = tagText ? tagText.textContent : '';
            categoryMap[categorySlug] = categoryName;
        });
    }
    
    function getSelectedCategories() {
        const selected = [];
        categoryTagCheckboxes.forEach(function(checkbox) {
            if (checkbox.checked) {
                selected.push(checkbox.getAttribute('data-category'));
            }
        });
        return selected;
    }
    
    function updateUI() {
    }
    
    function applyFilters() {
        const selected = getSelectedCategories();
        const searchTerm = contentSearchInput ? contentSearchInput.value.toLowerCase().trim() : '';
        
        articleCards.forEach(function(card) {
            const itemCategories = card.getAttribute('data-categories') || '';
            const cardTitle = (card.getAttribute('data-title') || '').toLowerCase();
            const cardDescription = (card.getAttribute('data-description') || '').toLowerCase();
            const cardContent = (card.getAttribute('data-content') || '').toLowerCase();
            
            let categoryMatch = selected.length === 0 || selected.some(function(category) {
                return itemCategories.includes(category);
            });
            
            let contentMatch = true;
            if (searchTerm !== '') {
                const searchWords = searchTerm.split(/\s+/).filter(function(word) {
                    return word.length > 0;
                });
                if (searchWords.length > 0) {
                    contentMatch = searchWords.some(function(word) {
                        return cardTitle.includes(word) || 
                               cardDescription.includes(word) || 
                               cardContent.includes(word);
                    });
                }
            }
            
            if (categoryMatch && contentMatch) {
                if (card.style.display === 'none') {
                    card.style.display = '';
                    card.style.opacity = '0';
                    setTimeout(function() {
                        card.style.transition = 'opacity 0.3s ease';
                        card.style.opacity = '1';
                    }, 10);
                } else {
                    card.style.opacity = '1';
                }
            } else {
                if (card.style.display !== 'none') {
                    card.style.transition = 'opacity 0.3s ease';
                    card.style.opacity = '0';
                    setTimeout(function() {
                        card.style.display = 'none';
                    }, 300);
                }
            }
        });
        
        setTimeout(function() {
            yearGroups.forEach(function(yearGroup) {
                const cardsInYear = yearGroup.querySelectorAll('.article-card');
                const visibleInYear = Array.from(cardsInYear).filter(function(card) {
                    return window.getComputedStyle(card).display !== 'none';
                });
                
                const hasActiveFilters = selected.length > 0 || (searchTerm && searchTerm !== '');
                
                if (visibleInYear.length === 0 && hasActiveFilters) {
                    yearGroup.style.transition = 'opacity 0.3s ease';
                    yearGroup.style.opacity = '0';
                    setTimeout(function() {
                        yearGroup.style.display = 'none';
                    }, 300);
                } else if (visibleInYear.length > 0) {
                    yearGroup.style.display = '';
                    yearGroup.style.opacity = '0';
                    setTimeout(function() {
                        yearGroup.style.transition = 'opacity 0.3s ease';
                        yearGroup.style.opacity = '1';
                    }, 10);
                } else if (!hasActiveFilters) {
                    yearGroup.style.display = '';
                    yearGroup.style.opacity = '0';
                    setTimeout(function() {
                        yearGroup.style.transition = 'opacity 0.3s ease';
                        yearGroup.style.opacity = '1';
                    }, 10);
                }
            });
        }, 50);
    }
    
    function clearAllFilters() {
        categoryTagCheckboxes.forEach(function(checkbox) {
            checkbox.checked = false;
        });
        updateUI();
        applyFilters();
    }
    
    if (contentSearchInput && articleCards.length > 0) {
        contentSearchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.trim();
            
            if (contentSearchClear) {
                contentSearchClear.style.display = searchTerm !== '' ? 'flex' : 'none';
            }
            
            applyFilters();
        });
        
        if (contentSearchClear) {
            contentSearchClear.addEventListener('click', function() {
                contentSearchInput.value = '';
                contentSearchClear.style.display = 'none';
                applyFilters();
            });
        }
    }
    
    if (categoryTagCheckboxes.length > 0) {
        categoryTagCheckboxes.forEach(function(checkbox) {
            checkbox.addEventListener('change', function() {
                updateUI();
                applyFilters();
            });
            
            const tagFilter = checkbox.closest('.category-tag-filter');
            const tagClose = tagFilter ? tagFilter.querySelector('.category-tag-close') : null;
            
            if (tagClose) {
                tagClose.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    checkbox.checked = false;
                    updateUI();
                    applyFilters();
                });
            }
        });
    }
    
    updateUI();
});


