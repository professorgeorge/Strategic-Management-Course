// Strategic Management — Service Worker
// Cache-first for static assets, network-first for external resources

const CACHE_NAME = 'smc-course-v2';
const CACHE_VERSION = 1;

const STATIC_ASSETS = [
  './Strategic Management.html',
  './app.css',
  './manifest.json',
  './data/course-meta.js',
  './data/course-content.js',
  './data/course-assessments.js',
  './components/Sidebar.jsx',
  './components/Dashboard.jsx',
  './components/LessonView.jsx',
  './components/Quiz.jsx',
  './components/Certificate.jsx',
  './components/Journal.jsx',
  './components/ModulePage.jsx',
  './App.jsx',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// ── Install: pre-cache all static assets ──────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// ── Activate: clean up old caches ─────────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch: cache-first for our assets, network-first for external ─────────
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // External requests (CDNs, Google Fonts) — network first, fall back to cache
  if (url.origin !== self.location.origin) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response && response.status === 200) {
            const cloned = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, cloned));
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Our own assets — cache first, then network
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response && response.status === 200) {
          const cloned = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, cloned));
        }
        return response;
      });
    })
  );
});

// ── Message: force cache refresh ──────────────────────────────────────────
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
