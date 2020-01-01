const cacheName = "cache-v1";
const staticAssets = [
    "./",
    "./img/..png",
    "./img/0.png",
    "./img/1.png",
    "./img/2.png",
    "./img/3.png",
    "./img/4.png",
    "https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css"
];

self.addEventListener('install', async event => {
    const cache = await caches.open(cacheName);
    await cache.addAll(staticAssets);
});

async function cacheFirst (req) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(req);
    return cachedResponse || fetch(req);
}

self.addEventListener('fetch', event => {
    const req = event.request;
    event.respondWith(cacheFirst(req));
});

