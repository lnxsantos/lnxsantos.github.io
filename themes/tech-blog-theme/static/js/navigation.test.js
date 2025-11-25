/**
 * Navigation Module Tests
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Navigation } from './navigation.js';

describe('Navigation', () => {
    let nav;
    let navToggle;
    let navMenu;

    beforeEach(() => {
        // Setup DOM
        document.body.innerHTML = `
            <button class="nav-toggle" aria-expanded="false">
                <span class="nav-toggle-icon"></span>
            </button>
            <ul class="nav-menu">
                <li><a href="#" class="nav-link">Home</a></li>
            </ul>
        `;
        
        navToggle = document.querySelector('.nav-toggle');
        navMenu = document.querySelector('.nav-menu');
        nav = new Navigation();
    });

    it('should initialize navigation', () => {
        expect(nav).toBeDefined();
        expect(navToggle).toBeDefined();
        expect(navMenu).toBeDefined();
    });

    it('should toggle menu on click', () => {
        const clickEvent = new MouseEvent('click', { bubbles: true });
        navToggle.dispatchEvent(clickEvent);
        
        expect(navToggle.getAttribute('aria-expanded')).toBe('true');
        expect(navMenu.classList.contains('active')).toBe(true);
    });

    it('should close menu on Escape key', () => {
        navMenu.classList.add('active');
        navToggle.setAttribute('aria-expanded', 'true');
        
        const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true });
        document.dispatchEvent(escapeEvent);
        
        expect(navToggle.getAttribute('aria-expanded')).toBe('false');
        expect(navMenu.classList.contains('active')).toBe(false);
    });
});

