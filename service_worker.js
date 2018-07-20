if (navigator.serviceWorker) {
    navigator.serviceWorker.register('service_worker.js')
        .then(registration =>
            console.log(`Registration succeeded with ${registration.scope}`)
        ).catch(error =>
            console.log(`Registration failed with + ${error}`)
        )
};

const cacheVersion = 'cache-v1';

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheVersion).then(cache =>
            cache.addAll([
            './',
            './js/main.js',
            './js/dbhelper.js',
            './js/restaurant_info.js',
            './css/styles.css',            
            './data/restaurants.json',
            './img/1.jpg',
            './img/2.jpg',
            './img/3.jpg',
            './img/4.jpg',
            './img/5.jpg',
            './img/6.jpg',
            './img/7.jpg',
            './img/8.jpg',
            './img/9.jpg',
            './img/10.jpg',
            './index.html',
            './restaurant.html'            
            ]))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

