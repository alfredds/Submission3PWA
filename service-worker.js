importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js'
);

workbox.precaching.precacheAndRoute ([
        {url: "/", revision: "1"},
        {url: "/index.html", revision: "1"},
        {url: "/nav.html", revision: "1"},
        {url: "/squad.html", revision: "1"},
        {url: "/manifest.json", revision: "1"},
        {url: "/icons/favicon.png", revision: "1"},
        {url: "/icons/apple-icon.png", revision: "1"},
        {url: "/icons/pwa-32.png", revision: "1"},
        {url: "/icons/pwa-192.png", revision: "1"},
        {url: "/icons/pwa-512.png", revision: "1"},
        {url: "/css/materialize.min.css", revision: "1"},
        {url: "/js/api.js", revision: "1"},
        {url: "/js/materialize.min.js", revision: "1"},
        {url: "/js/idb.js", revision: "1"},
        {url: "/js/db.js", revision: "1"},
        {url: "/js/nav.js", revision: "1"},
        {url: "/js/push.js", revision: "1"},
        {url: "/js/req.js", revision: "1"},
        {url: "/pages/team.html", revision: "1"},
        {url: "/pages/saved.html", revision: "1"},
        {url: "/pages/standing.html", revision: "1"},
        {url: "/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2", revision: "1"},
        {url: "https://fonts.googleapis.com/icon?family=Material+Icons", revision: "1"},
    ], {
        ignoreUrlParametersMatching : [/.*/],
    }
);

workbox.routing.registerRoute(
    new RegExp("/pages/"),
    workbox.strategies.staleWhileRevalidate({
        cacheName : "pages"
    })
);

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
        cacheName : "images",
        plugins : [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 30 * 24 * 60 * 60, //30 days
                maxEntries: 60,
            }),
        ],
    })
);

workbox.routing.registerRoute(
    new RegExp("https://api.football-data.org/v2/"),
    workbox.strategies.staleWhileRevalidate({
        cacheName: "football-api",
    })
);

self.addEventListener('push', event => {
    let body;
    if (event.data){
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    let options = {
        body: body,
        icon: 'icons/pwa-512.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});