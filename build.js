#!/usr/bin/env node

/**
 * Build script for JavaScript and CSS
 */

const { build } = require('esbuild');
const { execSync } = require('child_process');

const isProduction = process.env.NODE_ENV === 'production';

// Build JavaScript
function buildJS() {
    console.log('📦 Building JavaScript...');
    
    try {
        build({
            entryPoints: ['themes/tech-blog-theme/static/js/main.js'],
            bundle: true,
            format: 'esm',
            outfile: 'themes/tech-blog-theme/static/js/main.bundle.js',
            minify: isProduction,
            sourcemap: !isProduction,
            target: 'es2020',
            platform: 'browser',
        }).then(() => {
            console.log('✅ JavaScript built successfully!');
        }).catch((error) => {
            console.error('❌ JavaScript build failed:', error);
            process.exit(1);
        });
    } catch (error) {
        console.error('❌ JavaScript build failed:', error);
        process.exit(1);
    }
}

// Build CSS
function buildCSS() {
    console.log('🎨 Building CSS...');
    
    try {
        execSync('npx postcss themes/tech-blog-theme/static/css/*.css --dir themes/tech-blog-theme/static/css/dist --map', {
            stdio: 'inherit',
        });
        console.log('✅ CSS built successfully!');
    } catch (error) {
        console.warn('⚠️  CSS build skipped (postcss not available)');
    }
}

// Main
function main() {
    console.log('🚀 Starting build process...\n');
    
    buildJS();
    buildCSS();
    
    console.log('\n✨ Build complete!');
}

main();

