/**
 * Service Worker for PWA
 */

const CACHE_NAME = 'blog-v1';
const STATIC_CACHE = 'blog-static-v1';
const DYNAMIC_CACHE = 'blog-dynamic-v1';

const STATIC_ASSETS = [
    '/',
    '/css/variables.css',
    '/css/reset.css',
    '/css/layout.css',
    '/css/components.css',
    '/css/home.css',
    '/css/content.css',
    '/css/code.css',
    '/css/responsive.css',
    '/js/main.bundle.js',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(STATIC_CACHE).then((cache) => {
            return cache.addAll(STATIC_ASSETS);
        })
    );
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== STATIC_CACHE && name !== DYNAMIC_CACHE)
                    .map((name) => caches.delete(name))
            );
        })
    );
    return self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Skip chrome-extension and other non-http requests
    if (!request.url.startsWith('http')) {
        return;
    }

    event.respondWith(
        caches.match(request).then((cachedResponse) => {
            // Return cached version if available
            if (cachedResponse) {
                return cachedResponse;
            }

            // Fetch from network
            return fetch(request)
                .then((response) => {
                    // Don't cache non-successful responses
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // Clone the response
                    const responseToCache = response.clone();

                    // Cache dynamic content
                    caches.open(DYNAMIC_CACHE).then((cache) => {
                        cache.put(request, responseToCache);
                    });

                    return response;
                })
                .catch(() => {
                    // Return offline page if available
                    if (request.headers.get('accept').includes('text/html')) {
                        return caches.match('/');
                    }
                });
        })
    );
});

