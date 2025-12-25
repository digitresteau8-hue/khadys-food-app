const CACHE_NAME = 'khadys-food-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

// Activation et nettoyage des anciens caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interception des requêtes réseau (Stratégie: Cache falling back to Network)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Retourne la réponse en cache si trouvée, sinon fait la requête réseau
        return response || fetch(event.request);
      })
      .catch(() => {
        // Fallback optionnel si tout échoue (ex: page hors ligne)
        // Pour une SPA, on pourrait retourner index.html
        if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
        }
      })
  );
});