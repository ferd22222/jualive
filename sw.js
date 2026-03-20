const CACHE_NAME = 'jualive-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/app.html',
  '/script.html',
  '/practice.html',
  '/timer.html',
  '/css/style.css',
  '/css/app.css',
  '/js/app.js',
  '/js/gemini.js',
  '/js/script-gen.js',
  '/js/practice.js',
  '/js/timer.js',
  '/js/storage.js',
  '/manifest.json'
];

// Install — cache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS).catch(() => {
        // If some assets fail, still install
        console.log('Some assets failed to cache, continuing...');
      });
    })
  );
  self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch — network first, fallback to cache
self.addEventListener('fetch', (event) => {
  // Skip non-GET and API requests
  if (event.request.method !== 'GET' || event.request.url.includes('generativelanguage.googleapis.com')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone and cache the fresh response
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, clone);
        });
        return response;
      })
      .catch(() => {
        // Fallback to cache
        return caches.match(event.request).then((cached) => {
          return cached || new Response('Offline — Koneksi internet diperlukan.', {
            headers: { 'Content-Type': 'text/plain' }
          });
        });
      })
  );
});
