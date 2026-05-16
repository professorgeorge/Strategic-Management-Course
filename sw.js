// Strategic Management — Service Worker v3
// Network-first strategy: always serve fresh content when online,
// fall back to cache only when offline.

const CACHE_NAME = 'smc-course-v3';

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

// ── Install: pre-cache, skip waiting immediately ──────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting()) // take over immediately
  );
});

// ── Activate: delete ALL old caches, claim all clients ───────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(key => caches.delete(key)))) // delete ALL old caches
      .then(() => self.clients.claim()) // control all open pages now
  );
});

// ── Fetch: NETWORK-FIRST — always try network, cache as fallback ──────────
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // If we got a valid response, cache it and return it
        if (response && response.status === 200 && response.type !== 'opaque') {
          const cloned = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, cloned));
        }
        return response;
      })
      .catch(() => {
        // Network failed — serve from cache (offline mode)
        return caches.match(event.request);
      })
  );
});

// ── Message handler ───────────────────────────────────────────────────────
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
