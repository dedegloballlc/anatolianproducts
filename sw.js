
self.addEventListener('install', (e)=>{
  e.waitUntil(caches.open('anatolian-v1').then(c=>c.addAll([
    '/', '/index.html', '/assets/styles.css?v=3', '/assets/app.js?v=3', '/assets/placeholder.jpg'
  ])));
});
self.addEventListener('fetch', (e)=>{
  e.respondWith(caches.match(e.request).then(r=> r || fetch(e.request)));
});
