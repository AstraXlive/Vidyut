const CACHE_NAME = 'vidyut-v1';
const urlsToCache = [
  'index.html',
  'dashboard.html',
  'vidyut_auth.html',
  'manifest.json',
  'maskable_icon_x192.png',
  'maskable_icon_x512.png',
  // Add CSS or JS files here if needed
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
