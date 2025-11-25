#!/usr/bin/env node

/**
 * Build script for JavaScript and CSS
 */

import { build } from 'esbuild';
import { execSync } from 'child_process';
import { cpSync, mkdirSync, existsSync, readdirSync, statSync, copyFileSync } from 'fs';
import { join } from 'path';

const isProduction = process.env.NODE_ENV === 'production';

// Copy CSS files to static (Hugo needs them there to serve)
// JS files don't need to be copied - we only use the bundle
function copyCSSFiles() {
    console.log('📋 Copying CSS files to static...');
    
    const srcCss = 'themes/app/css';
    const themeCss = 'static/css';
    
    // Create directory if it doesn't exist
    if (!existsSync(themeCss)) mkdirSync(themeCss, { recursive: true });
    
    // Copy CSS files (Hugo serves from static/)
    if (existsSync(srcCss)) {
        const files = readdirSync(srcCss);
        for (const file of files) {
            if (!file.endsWith('.css')) continue;
            const srcPath = join(srcCss, file);
            const destPath = join(themeCss, file);
            if (statSync(srcPath).isFile()) {
                copyFileSync(srcPath, destPath);
            }
        }
    }
    
    console.log('✅ CSS files copied!');
}

// Build JavaScript
async function buildJS() {
    console.log('📦 Building JavaScript...');
    
    try {
        await build({
            entryPoints: ['themes/app/js/main.js'],
            bundle: true,
            format: 'iife',
            outfile: 'static/js/main.bundle.js',
            minify: isProduction,
            sourcemap: !isProduction,
            target: 'es2020',
            platform: 'browser',
        });
        console.log('✅ JavaScript built successfully!');
    } catch (error) {
        console.error('❌ JavaScript build failed:', error);
        process.exit(1);
    }
}

// Build CSS
function buildCSS() {
    console.log('🎨 Building CSS...');
    
    try {
        execSync('npx postcss themes/app/css/*.css --dir static/css/dist --map', {
            stdio: 'inherit',
        });
        console.log('✅ CSS built successfully!');
    } catch (error) {
        console.warn('⚠️  CSS build skipped (postcss not available)');
    }
}

// Main
async function main() {
    console.log('🚀 Starting build process...\n');
    
    copyCSSFiles();
    await buildJS();
    buildCSS();
    
    console.log('\n✨ Build complete!');
}

main().catch((error) => {
    console.error('❌ Build process failed:', error);
    process.exit(1);
});

