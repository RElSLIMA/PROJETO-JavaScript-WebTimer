const CACHE_NAME = "timer-cache-v1";
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/main.js",
  "/js/modules/timer.js",
  "/js/modules/i18n.js",
  "/audio/alarme.mp3",
  "/manifest.json"
];

self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((resp) => {
      return resp || fetch(evt.request);
    })
  );
});
