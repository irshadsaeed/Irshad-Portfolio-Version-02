self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('irshad-portfolio-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        'css/portfolio.css',
        'js/portfolio.js',
        'manifest.json',
        'images/icon-192.png',
        'images/icon-512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});