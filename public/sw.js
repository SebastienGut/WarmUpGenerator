const CACHE = 'warmup-v5';

// Pages-outils : statiques, elles calculent tout dans le navigateur à partir
// de l'URL. En cache, elles fonctionnent sans réseau.
const PRECACHE = [
  '/',
  '/plan',
  '/series-approche',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(PRECACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  if (
    url.pathname === '/robots.txt' ||
    url.pathname === '/sitemap.xml' ||
    url.pathname === '/manifest.webmanifest' ||
    url.pathname.startsWith('/_next/server/')
  ) {
    return;
  }

  const isDocument =
    event.request.mode === 'navigate' ||
    event.request.headers.get('accept')?.includes('text/html');

  if (isDocument) {
    // Réseau d'abord ; la copie en cache est rangée sans query string, pour
    // qu'un /plan?s=… jamais visité s'ouvre quand même hors ligne.
    const key = url.origin + url.pathname;
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE).then((cache) => cache.put(key, clone));
          }
          return response;
        })
        .catch(() =>
          caches.match(key).then((cached) => cached ?? caches.match('/'))
        )
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request).then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE).then((cache) => cache.put(event.request, clone));
        }
        return response;
      });
    })
  );
});
