const CACHE_NAME = 'vidyut-v1';
const urlsToCache = [
  'index.html',
  'dashboard.html',
  'vidyut_auth.html',
  'manifest.json',
  'maskable_icon_x192.png',
  'maskable_icon_x512.png',
  // Add CSS or JS here if needed
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate event — clean old caches (optional but nice)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});

// Fetch event — smarter caching
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(cachedResponse => {
        const fetchPromise = fetch(event.request).then(networkResponse => {
          // Only cache successful responses
          if (networkResponse.ok) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(() => cachedResponse); // fallback to cache if offline

        return cachedResponse || fetchPromise;
      });
    })
  );
});
