/**
 * Theme Manager Tests
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ThemeManager } from './theme.js';

describe('ThemeManager', () => {
    let themeManager;
    let themeToggle;

    beforeEach(() => {
        localStorage.clear();
        document.documentElement.removeAttribute('data-theme');
        
        document.body.innerHTML = `
            <button class="theme-toggle"></button>
        `;
        
        themeToggle = document.querySelector('.theme-toggle');
        themeManager = new ThemeManager();
    });

    it('should initialize with dark theme by default', () => {
        expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });

    it('should toggle theme on click', () => {
        const clickEvent = new MouseEvent('click', { bubbles: true });
        themeToggle.dispatchEvent(clickEvent);
        
        expect(document.documentElement.getAttribute('data-theme')).toBe('light');
        expect(localStorage.getItem('theme')).toBe('light');
    });

    it('should persist theme preference', () => {
        themeManager.setTheme('light');
        expect(localStorage.getItem('theme')).toBe('light');
        
        const newManager = new ThemeManager();
        expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });
});

